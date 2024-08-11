import { useContext, useEffect, useState, useCallback } from "react";
import { BsThreeDots } from "react-icons/bs";
import { LuListTodo } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { AppContext } from "../../../context/ContextApp";
import "../../../styles/sub-menu.css";
import { useParams } from "react-router-dom";
import axios from "../../../utils/api-client";
import useHandleError from "../../../hooks/useHandleError";
import { Drawer } from "@mui/material";
import DrawerForm from "./TaskDrawerForm";
import TaskStatus from "./TaskStatus";

export default function Tasks() {
  const { setIsLoading } = useContext(AppContext);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [drawerMode, setDrawerMode] = useState(null);
  const handleError = useHandleError();

  const getData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`/task-management/boards/${id}`);
      setData(response.data.data[0]);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setCurrentId(null);
    setDrawerMode("create");
    setOpen(true);
  };

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
    setDrawerMode(null);
    setCurrentId(null);
  }, []);

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: data ? `url(${data.background})` : "none",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Drawer
        anchor="right"
        PaperProps={{
          sx: {
            width: {
              sm: "300px",
              md: "420px",
            },
          },
        }}
        open={open}
        onClose={handleCloseDrawer}
      >
        <DrawerForm
          id={currentId}
          bId={id}
          mode={drawerMode}
          onClose={handleCloseDrawer}
        />
      </Drawer>
      {data ? (
        <div>
          <div className="flex justify-between py-2 h-16 px-4 gap-3 items-center border-b border-slate-800 bg-black bg-opacity-50">
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl flex items-center text-white">
                <span className="rounded-md p-1 px-2 text-white bg-slate-700 mr-4">
                  {data.boardName.length > 1
                    ? data.boardName.substring(0, 2).toUpperCase()
                    : data.boardName.toUpperCase()}
                </span>
                {data.boardName.toUpperCase()}
              </h1>
            </div>
            <h1 className="hidden sm:block text-white">
              <span className="font-semibold">Board Timeframe:</span>{" "}
              {data.startDate} - {data.endDate}
            </h1>
          </div>

          <div className="flex p-4 justify-between flex-wrap">
            <h1 className="text-xl text-white">Tasks</h1>
            <div className="flex gap-2 items-center">
              <button className="text-white p-1 transition-all px-3 border border-red-400 rounded-sm bg-red-500 flex items-center gap-2">
                Customise
                <IoSettingsOutline className="rotate-[360deg] duration-500" />
              </button>
              <button
                onClick={handleAdd}
                className="text-white p-1 transition-all px-3 border border-blue-500 rounded-sm bg-blue-500 flex items-center gap-2"
              >
                Add Task
                <LuListTodo className="rotate-[360deg] duration-500" />
              </button>
            </div>
          </div>
          <div style={{ marginTop: "-20px" }} className="p-4 flex gap-3">
            <button className="rounded-sm p-1 px-3 hover:bg-slate-800 bg-black bg-opacity-50 text-white shadow-slate-100">
              Board
            </button>
            <button className="rounded-sm p-1 px-3 hover:bg-slate-800 bg-black bg-opacity-50 text-white shadow-slate-100">
              List
            </button>
          </div>
          <TaskStatus />
        </div>
      ) : (
        <p className="text-white">Loading...</p>
      )}
    </div>
  );
}
