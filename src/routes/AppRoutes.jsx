import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import TaskManagement from "./../pages/TaskManagement/TaskManagement";
import SignUp from "../pages/auth/SignUp";
import Home from "../pages/Home/Home";
import Profile from "../pages/profile/Profile";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/app">
          <Route path="dashboard" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="task-management" element={<TaskManagement />} />
        </Route>
      </Routes>
    </>
  );
}
