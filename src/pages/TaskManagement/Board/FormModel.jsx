import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../../context/ContextApp";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import boardSchema from "./board-formik.schema";
import { AiFillCloseSquare } from "react-icons/ai";
import { usePost } from "../../../hooks/usePost";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "800px",
  maxHeight: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  zIndex: "999999",
  overflowY: "auto",
};

export default function FormDialog() {
  const { openModel, setModel, setIsLoading } = useContext(AppContext);
  const [data, setData] = useState({
    boardName: "",
    description: "",
    startDate: "",
    endDate: null,
    status: "",
    background: "",
  });
  const url = "taskManagement/boards/create";
  const { post } = usePost(url);
  const handleSubmit = (values) => {
    setIsLoading(true);
    if (values) {
      post(values);
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    setModel(false);
  };
  const [show, setShow] = useState("");

  const formik = useFormik({
    initialValues: data,
    validationSchema: boardSchema,
    onSubmit: handleSubmit,
  });

  const datePickerStyles = {
    "& .MuiInputLabel-root": {
      color: "black",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: "black",
      opacity: 1,
    },
  };

  return (
    <React.Fragment>
      <Modal
        open={openModel}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        aria-describedby="form-dialog-description"
      >
        <Box sx={style}>
          <div className="flex justify-between cursor-pointer">
            {" "}
            <h2
              className="font-bold font-sans uppercase text-2xl"
              id="form-dialog-title"
            >
              Create New Board
            </h2>
            <AiFillCloseSquare onClick={handleClose} className="text-3xl" />
          </div>
          <br />
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                id="boardName"
                name="boardName"
                className="w-full"
                label="Board Name"
                autoComplete="boardName"
                required
                InputProps={{
                  style: { color: "black" },
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "black",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "black",
                    opacity: 1,
                  },
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.boardName}
                error={
                  formik.touched.boardName && Boolean(formik.errors.boardName)
                }
                helperText={formik.touched.boardName && formik.errors.boardName}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  label="Start Date"
                  value={formik.values.startDate}
                  onChange={(date) => formik.setFieldValue("startDate", date)}
                  slotProps={{
                    textField: {
                      sx: datePickerStyles,
                      error:
                        formik.touched.startDate &&
                        Boolean(formik.errors.startDate),
                      helperText:
                        formik.touched.startDate && formik.errors.startDate,
                    },
                  }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  label="End Date"
                  value={formik.values.endDate}
                  onChange={(date) => formik.setFieldValue("endDate", date)}
                  slotProps={{
                    textField: {
                      sx: datePickerStyles,
                      error:
                        formik.touched.endDate &&
                        Boolean(formik.errors.endDate),
                      helperText:
                        formik.touched.endDate && formik.errors.endDate,
                    },
                  }}
                />
              </LocalizationProvider>

              <FormControl required className="w-full">
                <InputLabel id="status-label" sx={{ color: "black" }}>
                  Status
                </InputLabel>
                <Select
                  id="status"
                  name="status"
                  label="Status"
                  autoComplete="status"
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "black",
                    },
                    "& .MuiOutlinedInput-input::placeholder": {
                      color: "black",
                      opacity: 1,
                    },
                  }}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                >
                  <MenuItem value="">
                    <em>Select Status</em>
                  </MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
                {formik.touched.status && formik.errors.status ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.status}
                  </div>
                ) : null}
              </FormControl>
            </div>
            <br />
            <TextField
              id="description"
              name="description"
              className="w-full"
              label="Description"
              variant="outlined"
              autoComplete="description"
              required
              multiline
              rows={4}
              InputProps={{
                style: { color: "black" },
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                },
                "& .MuiOutlinedInput-input::placeholder": {
                  color: "black",
                  opacity: 1,
                },
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <div className="w-full">
              <label className="ml-1 text-gray-500" htmlFor="background">
                Board Image
              </label>
              <input
                id="background"
                name="background"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  formik.setFieldValue("background", file);
                  setData((prev) => {
                    return { ...prev, background: file };
                  });
                  setShow(file ? URL.createObjectURL(file) : "");
                }}
                onBlur={formik.handleBlur}
                className="mt-1 file:mr-3 w-full file:py-2 file:px-4 file:rounded-md file:border-0 text-sm border rounded-md file:bg-black file:text-white shadow-md hover:bg-gray-200"
              />
              {show && (
                <div className="w-full h-auto overflow-auto mt-4">
                  <img
                    src={show}
                    className="w-full h-auto object-cover"
                    alt="Selected Background Image"
                  />
                </div>
              )}
            </div>
          </form>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={formik.handleSubmit}
              sx={{ cursor: "pointer" }}
            >
              Create Board
            </Button>
            <Button
              variant="contained"
              sx={{ cursor: "pointer" }}
              style={{ background: "black" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
