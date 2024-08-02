import React, { useState } from "react";
import "../../styles/login.css";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { Formik } from 'formik';
const SignIn = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const url = "/login";
  const { isLoading, save } = useLogin(url, data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await save();
  };

  return (
    <div className="background flex justify-center text-black bg-slate-800 items-center h-screen">
      <div className="bg-sign-in max-w-md w-[90%]  justify-start bg-white flex flex-col gap-5 rounded-lg shadow-lg p-5">
        <div className="flex justify-center flex-col items-center p-4">
          <h1 className="text-blue-900 text-3xl font-bold w-full p-3 rounded-b-lg text-center">
            Sign In
          </h1>
          <p className="text-xl text-center">Sign in to stay connected</p>
        </div>
        <form
          className="flex flex-col p-3 gap-6 w-full"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            name="username"
            onChange={handleChange}
            className="w-full"
            label="Username or Email"
            variant="outlined"
            
          />
          <div className="relative w-full">
            <TextField
              id="outlined-password-input"
              label="Password"
              name="password"
              onChange={handleChange}
              type={show ? "text" : "password"}
              className="w-full"
              autoComplete="current-password"
            />
           
            {show ? (
              <FaEye
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShow(!show)}
              />
            ) : (
              <FaEyeSlash
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShow(!show)}
              />
            )}
          </div>
          <div className="flex justify-between items-center w-full mt-2">
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Link
              to="#"
              className="text-blue-700 hover:text-black transition-all"
            >
              Forget password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full self-center md:w-28"
            variant="contained"
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Link
            to="/sign-up"
            style={{marginTop:'-15px'}}
            className="text-blue-700 self-center hover:text-black transition-all mt-2"
          >
            Don't have an account? Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
