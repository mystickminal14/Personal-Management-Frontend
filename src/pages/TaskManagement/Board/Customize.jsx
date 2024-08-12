import React, { useContext, useState } from "react";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "../../../utils/api-client";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";
import useHandleError from "../../../hooks/useHandleError";
import { AppContext } from "../../../context/ContextApp";
import { MdDeleteForever } from "react-icons/md"; // Import MdDeleteForever for status deletion

const Customize = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [statusList, setStatusList] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const handleError = useHandleError();
  const { setIsLoading, setRefreshData } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleStatusChange = () => {
    if (newStatus && !statusList.includes(newStatus)) {
      const updatedStatusList = [...statusList, newStatus];
      setStatusList(updatedStatusList);
      setNewStatus("");
    }
  };

  const handleDeleteStatus = (index) => {
    const updatedStatusList = statusList.filter((_, i) => i !== index);
    setStatusList(updatedStatusList);
  };

  const handleSubmitBackground = async () => {
    setIsLoading(true);
    if (!file) {
      Swal.fire("Error", "Please select a file to upload", "error");
      setIsLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("background", file);

      const response = await axios.post(`/task-management/boards/update-background/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successful!",
        text: response.data?.message || "Request was successful!",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setRefreshData((prev) => !prev);
          navigate(`/app/task-management/board/${id}`);
        }
        const swalContainer = document.querySelector(".swal2-container");
        if (swalContainer) {
          swalContainer.style.zIndex = "9999";
        }
      });
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitStatus = async () => {
    if (!statusList.length) {
      Swal.fire("Error", "Status list cannot be empty", "error");
      return;
    }
    try {
      const response = await axios.post(`/task-management/boards/status/${id}`, { status: statusList });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successful!",
        text: response.data?.message || "Status added successfully!",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setRefreshData((prev) => !prev);
          navigate(`/app/task-management/board/${id}`);
        }
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex flex-col p-3 h-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Update Background</h1>
        <AiFillCloseSquare onClick={onClose} className="text-3xl cursor-pointer" />
      </div>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className="flex flex-col gap-4">
        <form className="flex flex-col p-2">
          <div>
            <label className="ml-1 text-gray-900" htmlFor="background">
              Board Image
            </label>
            <input
              id="background"
              name="background"
              type="file"
              onChange={handleFileChange}
              className="mt-1 file:mr-3 w-full file:py-2 file:px-4 file:rounded-md file:border-0 text-sm border rounded-md file:bg-black file:text-white shadow-md hover:bg-gray-200"
            />
          </div>
          <Button
            type="button" // Change type to button to avoid form submission
            onClick={handleSubmitBackground}
            sx={{
              mt: 4,
              background: "black",
              color: "white",
              "&:hover": {
                background: "slategray",
              },
            }}
          >
            Update Background
          </Button>
        </form>
        <div className=" flex flex-col justify-center items-center mt-4">
       
          <FormControl fullWidth>
            <InputLabel id="task-status-label">Task Status</InputLabel>
            <Select
              id="taskStatus"
              name="taskStatus"
              multiple
              value={statusList}
              onChange={(e) => setStatusList(e.target.value)}
              sx={{ mt: 2 }}
            >
              {statusList.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="flex gap-2 justify-center items-center mt-2">
            <TextField
              id="istatus"
              name="istatus"
              label="Add New Status"
              fullWidth
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleStatusChange}
              sx={{ height: "56px" }}
            >
              Insert
            </Button>
          </div>
          {statusList.map((status, index) => (
            <div
              key={index}
              className="flex bg-blue-600 text-white p-2 rounded-md justify-between items-center mt-2"
            >
              <span>{status}</span>
              <MdDeleteForever
                onClick={() => handleDeleteStatus(index)}
                className="cursor-pointer text-2xl"
              />
            </div>
          ))}
          
        </div>
      </div>
      <Button
            onClick={handleSubmitStatus}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Save Statuses
          </Button>
      <Button onClick={onClose} variant="contained" color="error" sx={{ mt: 2 }}>
        Cancel
      </Button>
    </div>
  );
};

export default Customize;
