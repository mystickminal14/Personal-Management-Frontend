import React, { useContext } from "react";
import { Button } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import SliderCard from "./slider";
import { AppContext } from "../../../context/ContextApp";
import FormDialog from "./FormModel"; 

const TaskDashboard = () => {
  const { openModel, setModel } = useContext(AppContext);

  const handleClickOpen = () => {
    setModel(true);
  };

  return (
    <>
      {openModel && <FormDialog />}
      <div className="flex justify-between items-center p-3 px-5">
        <h1 className="font-semibold text-xl">My Boards</h1>
        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
            fontWeight: "semibold",
          }}
          onClick={handleClickOpen}
          className="hover:bg-slate-500 font-semibold"
          endIcon={<IoMdAdd />}
        >
          Add Board
        </Button>
      </div>
      <div className="px-4">
        <SliderCard />
      </div>
    </>
  );
};

export default TaskDashboard;
