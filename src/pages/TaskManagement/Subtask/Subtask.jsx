import React, { useCallback, useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import useGet from "../../../hooks/useGet";
import SubTaskDrawer from "./SubtaskDrawer";
import { Drawer } from "@mui/material";

const Subtask = ({ board, onClose, task }) => {
  const [image, setImage] = useState("");

  const { data } = useGet(`task-management/boards/tasks/subtasks/${task._id}`);
  // useEffect(()=>{
  //   if (refresh) {
  //     getData();
  //     setRefreshData(false);
  //   }
  // }, [getData, getTask, refresh]);
  // })
  const colors = [
    { bg: 'bg-sky-500' },
    { bg: 'bg-red-500' },
    { bg: 'bg-green-500' },
    { bg: 'bg-blue-500' },
    { bg: 'bg-yellow-500' },
  ];
  const [open, setOpen] = useState(false);

  const [subId,setSubId]=useState(null)
  const handleAdd = (e) => {
   
    setOpen(true);
  };

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
   
  }, []);

  return (
    <div
      style={{ zIndex: "999" }}
      className="transition-all ease-in-out backdrop-blur-sm absolute flex justify-center items-center w-full h-full animate-fade-in"
    >  <Drawer
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
    <SubTaskDrawer
     id={subId}
      onClose={handleCloseDrawer}
    />
  </Drawer>
      <div className="bg-white relative  rounded-lg w-[90%] lg:w-[70%] h-[90%] lg:h-auto md:auto lg:p-4 p-2">
        <span
          onClick={() => onClose()}
          className="flex mb-2 cursor-pointer mr-1 absolute right-7 text-white top-6 text-2xl justify-end"
        >
          <FaWindowClose />
        </span>
        <div className="px-2">
          <div className="bg-slate-900 h-20 w-full lg:h-36 rounded-md mb-4">
            <img
              src={board?.background}
              className="w-full h-20 lg:h-36 object-cover"
              alt=""
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 h-full">
            {/* Subtask Section */}
            <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-[40%] lg:h-96 overflow-x-auto lg:overflow-y-auto">
             
              {data?.data?.map((subtask, index) => (
                <div
                onClick={()=>{
                  setSubId(subtask._id)
                  handleAdd()
                }}
                  key={subtask._id}
                  className={`flex cursor-pointer flex-col gap-2 w-full ${colors[index % colors.length].bg} text-white p-4 border rounded-lg border-[#3A1F1F] animate-slide-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h1 className="border-l-4 border-[#100707] pl-2">
                    {subtask.title}
                  </h1>
                  <div className="flex flex-col items-center gap-1 lg:flex-row lg:justify-between lg:items-end">
                    <span className="px-2 rounded-md bg-[#4A4A4A] text-white">
                      {subtask.status}
                    </span>
                    <span
                      style={{ fontSize: "0.9rem" }}
                      className="text-[#F5F5DC]"
                    >
                      {new Date(subtask.dueDate)
                        .toISOString()
                        .split("T")[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Details Section */}
            <div className="bg-white relative rounded-lg w-[90%] h-[90%] p-2">
              <h1 className="text-xl lg:text-3xl font-semibold uppercase">
                {task.title}
              </h1>
              <div className="px-2 flex gap-2 mt-4 justify-between items-center">
                <span className="flex gap-2">
                  <span className="px-2 rounded-md p-1 bg-red-500 text-white">
                    {task.status}
                  </span>
                  <span className="px-2 rounded-md p-1 bg-[#4A4A4A] text-white">
                    {task.priority}
                  </span>
                </span>
                <span>
                  Due Date:{" "}
                  {new Date(task.dueDate).toISOString().split("T")[0]}
                </span>
              </div>
              <p className="px-2 mt-1">{task.description}</p>

              <div className="w-full px-2 mt-1">
                <label className="ml-1 text-gray-900" htmlFor="images">
                  Upload Image
                </label>
                <div className="flex gap-1">
                  <input
                    id="images"
                    name="images"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setImage(file ? URL.createObjectURL(file) : "");
                    }}
                    className="mt-1 file:mr-3 w-full file:py-2 file:px-4 file:rounded-md file:border-0 text-sm border rounded-md file:bg-black file:text-white shadow-md hover:bg-gray-200"
                  />
                  <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Upload
                  </button>
                </div>
                {task.images &&
                  task.images.map((img) => (
                    <div
                      key={img._id}
                      className="mt-4 rounded-md w-32 h-16"
                    >
                      <img
                        src={img.image}
                        alt="Uploaded Preview"
                        className="w-32 h-16 rounded-md object-cover border border-gray-300"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subtask;
