import React from "react";
import { Button } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import SliderCard from "./slider";

const TaskDashboard = () => {
   
  return (
    <>
      <div className="flex justify-between  border-b-4 items-center p-3 px-5">
        <h1 className="font-semibold text-xl">My Boards</h1>
        <Button
          variant="contained"
          className="hover:bg-slate-500"
          endIcon={<IoMdAdd />}
        >
          Add Board
        </Button>
      </div>
      <div>
      <SliderCard/>
      </div>
     
     
    </>
  );
};

export default TaskDashboard;
