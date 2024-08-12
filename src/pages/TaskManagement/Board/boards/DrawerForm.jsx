import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../context/ContextApp";
import { boardStoreSchema, boardUpdateSchema } from "./board-formik.schema";
import { AiFillCloseSquare } from "react-icons/ai";
import axios from "../../../../utils/api-client";
import useHandleError from "../../../../hooks/useHandleError";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";

const DrawerForm = ({ id, onClose }) => {
  const { setRefreshData, setIsLoading, refresh } = useContext(AppContext);
  const navigate = useNavigate();
  const [show, setShow] = useState("");
  const url = "/task-management/boards/create";
  const handleError = useHandleError();

  const [statusList, setStatusList] = useState(["Todo", "Doing", "Completed"]);

  const formik = useFormik({
    initialValues: {
      boardName: "",
      description: "",
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: "",
      istatus: "",
      taskStatus: ["Todo", "Doing", "Completed"],
      status: "",
      background: null,
    },
    validationSchema: id ? boardUpdateSchema : boardStoreSchema,
    onSubmit: (values) => {
      id ? handleUpdate(values) : handleSubmit(values);
    },
  });

  const setInitialData = async (id) => {
    if (!id) {
      formik.resetForm();
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`/task-management/boards/${id}`);
      const data = response.data.data[0];
      formik.setValues({
        ...data,
        startDate: dayjs(data.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(data.endDate).format("YYYY-MM-DD"),
      });
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setInitialData(id);
  }, [id]);
  const handleDelete = async () => {
    const url = `/task-management/boards/delete/${id}`;
    if (id) {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
          setIsLoading(true);
          const response = await axios.delete(url);
          if (response) {
            setRefreshData((prev) => !prev);
            navigate("/app/task-management/board");
          }

          Swal.fire({
            title: "Deleted!",
            text:
              response.data?.message || "The board was deleted successfully.",
            icon: "success",
          }).then(() => {
            const swalContainer = document.querySelector(".swal2-container");
            if (swalContainer) {
              swalContainer.style.zIndex = "9999";
            }
          });
        }
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleDeleteStatus = (value) => {
    const newData = statusList.filter((data, key) => key !== value);
    setStatusList(newData);
  };
  const handleUpdate = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `/task-management/boards/edit/${id}`,
        values,
        { headers: { "Content-Type": "application/json" } }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successful!",
        text: response.data?.message || "Request was successful!",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setRefreshData((prev) => !prev);
          navigate("/app/task-management/board");
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

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `/task-management/boards/create`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successful!",
        text: response.data?.message || "Request was successful!",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setRefreshData((prev) => !prev);
          navigate("/app/task-management/board");
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
  }
  const handleStatusChange = () => {
    const newStatus = formik.values.istatus.trim();
    if (newStatus && !statusList.includes(newStatus)) {
      const newStatusList = [...statusList, newStatus];
      setStatusList(newStatusList);
      formik.setFieldValue("taskStatus", newStatusList);
      formik.setFieldValue("istatus", "");
    }
  };

  const dateInputStyles = {
    "& input[type='date']": { color: "black" },
  };

  return (
    <div style={{ height: "100%" }} className="flex p-3 flex-col">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">{id ? `Edit Board` : `Create Board`}</h1>
        <AiFillCloseSquare
          onClick={onClose}
          className="text-3xl cursor-pointer"
        />
      </div>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <form
        onSubmit={formik.handleSubmit}
        className="flex-1 overflow-scroll flex flex-col gap-4 p-2"
      >
        <TextField
          id="boardName"
          name="boardName"
          label="Board Name"
          fullWidth
          required
          sx={{ ...dateInputStyles }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.boardName}
          error={formik.touched.boardName && Boolean(formik.errors.boardName)}
          helperText={formik.touched.boardName && formik.errors.boardName}
        />

        <div>
          <label htmlFor="startDate" className="block">
            Start Date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
            style={dateInputStyles}
          />
          {formik.touched.startDate && formik.errors.startDate && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.startDate}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="block">
            End Date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
            style={dateInputStyles}
          />
          {formik.touched.endDate && formik.errors.endDate && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.endDate}
            </div>
          )}
        </div>

        <FormControl fullWidth required sx={{ mt: 2 }}>
          <InputLabel id="status-label" sx={{ color: "black" }}>
            Status
          </InputLabel>
          <Select
            id="status"
            name="status"
            label="Status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}
            sx={dateInputStyles}
          >
            <MenuItem value="">
              <em>Select Status</em>
            </MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
          {formik.touched.status && formik.errors.status && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.status}
            </div>
          )}
        </FormControl>

        {!id && (
          <>
            {" "}
            <FormControl fullWidth>
              <InputLabel id="task-status-label">Task Status</InputLabel>
              <Select
                id="taskStatus"
                name="taskStatus"
                multiple
                value={formik.values.taskStatus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={dateInputStyles}
              >
                {statusList.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="flex gap-2 items-center">
              <TextField
                id="istatus"
                name="istatus"
                label="Add New Status"
                fullWidth
                value={formik.values.istatus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={dateInputStyles}
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
                className="flex bg-blue-600 text-white p-2 rounded-md justify-between items-center"
              >
                <span>{status}</span>
                <MdDeleteForever
                  onClick={() => handleDeleteStatus(index)}
                  className="cursor-pointer text-2xl"
                />
              </div>
            ))}
          </>
        )}
        <TextField
          id="description"
          name="description"
          label="Description"
          fullWidth
          required
          multiline
          rows={4}
          sx={{ mt: 2, ...dateInputStyles }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />

        {!id && (
          <>
            <div className="w-full mt-4">
              <label className="ml-1 text-gray-900" htmlFor="background">
                Board Image
              </label>
              <input
                id="background"
                name="background"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  console.log(e.target.files[0]);
                  formik.setFieldValue("background", file);
                  setShow(file ? URL.createObjectURL(file) : "");
                }}
                onBlur={formik.handleBlur}
                className="mt-1 file:mr-3 w-full file:py-2 file:px-4 file:rounded-md file:border-0 text-sm border rounded-md file:bg-black file:text-white shadow-md hover:bg-gray-200"
              />
              {show && (
                <div className="w-[320px] h-[220px] mt-4">
                  <img
                    src={show}
                    className="w-[320px] h-[220px] object-cover"
                    alt="Selected Background Image"
                  />
                </div>
              )}
            </div>
          </>
        )}
      </form>
      <Button
        type="submit"
        onClick={() => formik.handleSubmit()}
        sx={{
          mt: 4,
          background: "black",
          color: "white",
          "&:hover": {
            background: "slategray",
          },
        }}
      >
        {id ? "Update" : "Submit"}
      </Button>
      {id && (
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          sx={{ mt: 2 }}
        >
          Delete
        </Button>
      )}
      <Button
        onClick={onClose}
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default DrawerForm;
