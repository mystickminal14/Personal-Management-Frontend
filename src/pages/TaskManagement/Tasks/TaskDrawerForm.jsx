import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/api-client";
import taskSchema from "./task-formik.schema";
import { AiFillCloseSquare } from "react-icons/ai";
import Swal from "sweetalert2";
import { AppContext } from "../../../context/ContextApp";
import useHandleError from "../../../hooks/useHandleError";
import useGet from "../../../hooks/useGet";
import { FormControl, InputLabel, Select } from "@mui/material";

const TaskDrawerForm = ({ id,taskId, onClose,dynamic, bId }) => {
  const { setRefreshData, setIsLoading } = useContext(AppContext);
  const navigate = useNavigate();
  const handleError = useHandleError();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      status: dynamic || "",
      boardId: bId || "",
    },
    validationSchema: taskSchema,
    onSubmit: (values) => {
      taskId ? handleUpdate(values) : handleSubmit(values);
    },
  });


  const setInitialData = async (id) => {
    if (!taskId) {
      formik.resetForm();
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/task-management/boards/tasks/view/${taskId}`
      );
      console.log(response)
      const data = response.data.data;
      formik.setValues({
        ...data,
        dueDate: dayjs(data.dueDate).format("YYYY-MM-DD"),
      });
 
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setInitialData(taskId);
 
  }, [taskId]);

  const handleDelete = async () => {
    const url = `/task-management/boards/tasks/delete/${taskId}`;
    if (taskId) {
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
          setRefreshData((prev) => !prev);
          navigate(`/app/task-management/board/${bId}`);

          Swal.fire({
            title: "Deleted!",
            text:
              response.data?.message || "The task was deleted successfully.",
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

  const handleUpdate = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `/task-management/boards/tasks/edit/${taskId}`,
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
          navigate(`/app/task-management/board/${bId}`);
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
  const { data } = useGet(`/task-management/boards/${bId}`);
  const handleSubmit = async (values) => {
    
    setIsLoading(true);
    try {
      const response = await axios.post(
        `/task-management/boards/tasks/create`,
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
          navigate(`/app/task-management/board/${bId}`);
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

  const dateInputStyles = {
    "& input[type='date']": { color: "black" },
  };

  return (
    <div style={{ height: "100%" }} className="flex p-3 h-screen flex-col">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">{id ? `Edit Task` : `Add Task`}</h1>
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
          id="title"
          name="title"
          label="Title"
          fullWidth
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <div>
          <label htmlFor="dueDate" className="block">
            Due Date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.dueDate && formik.errors.dueDate && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.dueDate}
            </div>
          )}
        </div>
        <FormControl required className="w-full">
          <InputLabel id="status-label">Task Status</InputLabel>

          <Select
            labelId="status-label"
            id="status"
            name="status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
            label="Status"
            error={formik.touched.status && Boolean(formik.errors.status)}
            autoComplete="status"
          >
            <MenuItem value="">
              <em>Select status</em>   </MenuItem>
              {data?.data[0].taskStatus.map((status) => (
                <MenuItem key={status._id} value={status.status}>
                  {status.status}
                </MenuItem>
              ))}
         
          </Select>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.gender}
            </div>
          ) : null}
        </FormControl>
        <FormControl required className="w-full">
          <InputLabel id="status-label">Select Priority</InputLabel>

          <Select
            labelId="status-label"
            id="priority"
            name="priority"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.priority}
            label="Priority"
            error={formik.touched.priority && Boolean(formik.errors.priority)}
            autoComplete="priority"
          >
            <MenuItem value="">
              <em>Select Priority</em>   </MenuItem>
              
                <MenuItem  value="High">
                  High
                </MenuItem>
                <MenuItem  value="Medium">
                  Medium
                </MenuItem>
                <MenuItem  value="Low">
                  Low
                </MenuItem>
            
         
          </Select>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.gender}
            </div>
          ) : null}
        </FormControl>
        <TextField
          id="description"
          name="description"
          label="Description"
          fullWidth
          required
          multiline
          rows={4}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
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
        {taskId ? "Update" : "Submit"}
      </Button>
      {taskId && (
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          sx={{ mt: 1 }}
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

export default TaskDrawerForm;
