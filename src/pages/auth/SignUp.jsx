import React, { useState } from "react";
import "../../styles/login.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import { authStoreSchema } from "./AuthFormikSchema";
import { usePost } from "../../hooks/usePost";

const SignUp = () => {
  const [show, setShow] = useState(false);
const navigate=useNavigate()
  const data = {
    fullName: '',
    birthDate: dayjs(),
    gender: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
  };

  const { post,setPath } = usePost("/auth/register");
  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      birthDate: values.birthDate ? values.birthDate.format("YYYY-MM-DD") : "",
      avatar: values.avatar ? values.avatar : "",
    };
    await post(formattedValues);
    navigate(`/`)
  };

  const formik = useFormik({
    initialValues: data,
    validationSchema: authStoreSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="background flex justify-center text-black bg-slate-800 items-center h-full sm:h-screen">
      <div className="bg-sign-up max-w-xl w-[90%] h-auto justify-start bg-white flex flex-col gap-5 rounded-lg shadow-lg p-5">
        <div className="flex justify-center flex-col items-center p-4">
          <h1 className="text-blue-900 text-3xl font-bold w-full p-3 rounded-b-lg text-center">
            Sign Up
          </h1>
          <p className="text-xl text-center">Join now to organize your world</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-4 p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              id="fullName"
              name="fullName"
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              label="Full Name"
              autoComplete="fullName"
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helpertext={formik.touched.fullName && formik.errors.fullName}
            />
            <div className="mt-[-7px]">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    required
                    label="Select Birth Date"
                    value={formik.values.birthDate}
                    onChange={(date) => formik.setFieldValue("birthDate", date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={
                          formik.touched.birthDate &&
                          Boolean(formik.errors.birthDate)
                        }
                        helpertext={
                          formik.touched.birthDate && formik.errors.birthDate
                        }
                      />
                    )}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <FormControl required className="w-full">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                label="Gender"
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                autoComplete="gender"
              >
                <MenuItem value="">
                  <em>Select Gender</em>
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.gender}
                </div>
              ) : null}
            </FormControl>
            <TextField
              id="username"
              name="username"
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              label="Username"
              variant="outlined"
              error={formik.touched.username && Boolean(formik.errors.username)}
              helpertext={formik.touched.username && formik.errors.username}
              autoComplete="username"
            />
            <TextField
              id="email"
              name="email"
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              label="Email"
              variant="outlined"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helpertext={formik.touched.email && formik.errors.email}
              autoComplete="email"
            />
            <TextField
              id="password"
              name="password"
              type={show ? "text" : "password"}
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              label="Password"
              variant="outlined"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helpertext={formik.touched.password && formik.errors.password}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <div
                    onClick={() => setShow(!show)}
                    className="cursor-pointer"
                  >
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </div>
                ),
              }}
            />

          </div>
          
          <div className="w-full">
              <label className="ml-1 text-gray-500" htmlFor="avatar">
                Avatar
              </label>
              <input
                id="avatar"
                name="avatar"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  console.log(e.target.files);   formik.setFieldValue("avatar", file);
                 
                }}
                onBlur={formik.handleBlur}
                className="mt-1 file:mr-3 w-full file:py-2 file:px-4 file:rounded-md file:border-0 text-sm border rounded-md file:bg-black file:text-white shadow-md hover:bg-gray-200"
              />

            </div>
          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full self-center md:w-28"
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Sign Up
            </Button>
            <div className="text-center">
              <Link to="/" className="text-blue-500">
                Already have an account? Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
