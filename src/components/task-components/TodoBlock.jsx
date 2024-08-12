import React, { useState, useCallback } from "react";
import "../../styles/sub-menu.css";
import { GoDotFill } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { FaTasks, FaPlus } from "react-icons/fa";
import { CgAttachment } from "react-icons/cg";
import TaskMenu from "./TaskMenu";
import useGet from "../../hooks/useGet";
import { Drawer } from "@mui/material";
import SubtaskDrawer from "../../pages/TaskManagement/Subtask/SubtaskDrawer";
export default function TodoBlock({ onOpen, task, onAddTask, setTaskId }) {
  const { data } = useGet("/auth/users");
  const { data:count } = useGet(`/task-management/boards/tasks/subtasks-count/${task._id}`);
 
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [drawerMode, setDrawerMode] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const handleAdd = (e) => {
    setCurrentId(null);
    setDrawerMode("create");
    setOpen(true);
  };

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
    setDrawerMode(null);
    setCurrentId(null);
  }, []);

  const handleCardClick = (e) => {
    if (!e.defaultPrevented) {
      onOpen(task);
    }
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div
      draggable
      className="card flex flex-col gap-2 w-96 p-4 bg-gray-800 text-white cursor-grab"
    >
      <Drawer
        anchor="right"
        PaperProps={{
          sx: {
            width: {
              sm: "300px",
              md: "420px",
            },
            zIndex: "9999999999999",
          },
        }}
        open={open}
        onClose={handleCloseDrawer}
      >
        <SubtaskDrawer
          tasksId={task._id}
          bid={task.boardId}
          mode={drawerMode}
          onClose={handleCloseDrawer}
        />
      </Drawer>
      <div onClick={handleCardClick} className="flex flex-col gap-2 ">
        <div className="flex relative  justify-between">
          <h1 className="flex gap-2 items-center">
            <GoDotFill className="text-sky-400" />
            {task.title}
          </h1>
          <button
            className="hover:bg-slate-500 hover:rounded-full transition-all hover:text-black p-1"
            onClick={handleMenuClick} // Attach the click handler to the menu button
          >
            <BsThreeDots />
          </button>
          {showMenu && (
            <TaskMenu
              setTaskId={setTaskId}
              tid={task._id}
              onAddTask={onAddTask}
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
            />
          )}
        </div>
        <span className="px-2">{task.dueDate}</span>
        <div className="px-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="flex items-center gap-1">
              <FaTasks />
              <span>{count?.data}</span>
            </h1>
            <h1 className="flex items-center gap-1">
              <CgAttachment />
              <span className="bg-green-800 px-4 rounded-md flex items-center justify-center">
                {task.priority}
              </span>
            </h1>
          </div>
          <h1
            style={{ background: "skyblue" }}
            className=" text-black rounded-full p-1"
          >
            {data?.data.fullName.substring(0, 2).toUpperCase()}
          </h1>
        </div>
        <p className="px-2">{task.description}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAdd();
        }}
        className="flex items-center gap-2 cursor-pointer p-2 rounded-sm mt-3 bg-slate-400 hover:bg-slate-500 text-black"
      >
        <FaPlus /> Add Sub Task
      </button>
    </div>
  );
}
