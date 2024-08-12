import React, { useEffect, useContext, useState, useCallback } from "react";
import { Button, Drawer } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import SliderCard from "./slider";
import Deleted from "./Deleted";
import Navbar from "../../../../components/nav-bar/Navbar";
import DrawerForm from "./DrawerForm";
import { AppContext } from "../../../../context/ContextApp";
import { IoTimerOutline } from "react-icons/io5";
import { FaFlipboard } from "react-icons/fa6";
import useGet from "../../../../hooks/useGet";
import { FaEdit, FaOpencart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TaskDashboard = () => {
  const url = "/task-management/boards/latest";
  const { refresh, setRefreshData, setIsLoading } = useContext(AppContext);
  const { data, refetch } = useGet("/task-management/boards/latest");

  const navigate = useNavigate();
  
  useEffect(() => {
    if (refresh) {
      refetch();
      setRefreshData(false);
    }
  }, [refresh, refetch]);

  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [drawerMode, setDrawerMode] = useState(null);

  const handleAdd = (value) => {
    setCurrentId(value || null);
    setOpen(true);
    setDrawerMode(value ? 'edit' : 'create');

  };

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
    setDrawerMode(null);
    setCurrentId(null);
  }, []);

  const handleDivClick = () => {
    navigate(`/app/task-management/board/${data?.data?._id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); 
    handleAdd(data?.data?._id);
  };

  return (
    <>
      <Navbar />
      <Drawer anchor="right" open={open} onClose={handleCloseDrawer}>
        <DrawerForm id={currentId} mode={drawerMode} onClose={handleCloseDrawer} />
      </Drawer>
      <div className="p-3 px-5">
        <div className="flex justify-center sm:justify-start flex-col gap-6">
          <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2 items-center">
            <h1 className="flex text-xl sm:text-md items-center gap-2 font-semibold">
              <IoTimerOutline className="text-3xl font-bold" /> Recently Created
            </h1>
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                fontWeight: "semibold",
              }}
              onClick={() => handleAdd('')}
              className="hover:bg-slate-500 w-[100%] sm:w-auto font-semibold"
              endIcon={<IoMdAdd />}
            >
              Create Board
            </Button>
          </div>
          {data?.data ? (
            <div onClick={handleDivClick} className="relative h-40 cursor-pointer w-72 group rounded-lg overflow-hidden shadow-lg">
              <img
                src={data?.data?.background}
                className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-70"
                alt={data?.data?.boardName || "background"}
              />
              <div className="absolute inset-0 flex items-end justify-between uppercase p-2 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:bg-opacity-70">
                <h3 className="text-white text-lg font-semibold">{data?.data?.boardName}</h3>
                <div className='p-1 rounded-lg flex gap-3 justify-center items-center' style={{ background: 'black' }}>
                  <FaEdit onClick={handleEditClick} className=" text-white text-xl" />
                  {/* <FaOpencart className="text-white text-xl" /> */}
                </div>
              </div>
            </div>
          ) : (
            <h1>No Boards to display</h1>
          )}
        </div>
        <div className="flex justify-between mt-10 items-center">
          <h1 className="flex text-xl sm:text-2xl items-center gap-2 font-semibold">
            <FaFlipboard className="text-3xl font-bold" /> My Boards
          </h1>
        </div>
        <div className="px-4">
          <SliderCard handleAdd={handleAdd} />
        </div>
        <div className="flex justify-center sm:justify-start flex-col gap-6">
          <h1 className="flex text-xl sm:text-md items-center gap-2 font-semibold">
            <IoTimerOutline className="text-3xl font-bold" /> Recently Closed
          </h1>
          <div className="px-4">
            <Deleted />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDashboard;
