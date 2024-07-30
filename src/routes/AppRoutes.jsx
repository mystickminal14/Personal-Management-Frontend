import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/auth/SignIn'
import TaskManagement from './../pages/TaskManagement/TaskManagement';
import SignUp from '../pages/auth/SignUp';

export default function AppRoutes() {
  return (
    <>
    <Routes>
        <Route path='/'  element={<SignIn/>} index/>
        <Route path='/sign-up'  element={<SignUp/>} index/>
        <Route path='/dashboard'  element={<TaskManagement/>} index/>
    </Routes>

      
    </>
  )
}
