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

import BlockTitle from "../../../components/task-components/BlockTitle";
import TodoBlock from "../../../components/task-components/TodoBlock";

import Subtask from "./../Subtask/Subtask";
import Customize from "../Board/Customize";

export default function Tasks() {
  const { setIsLoading, refresh, setRefreshData } = useContext(AppContext);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [drawerMode, setDrawerMode] = useState(null);
  const handleError = useHandleError();
  const [statusList, setStatus] = useState([]);
  const [taskData, setTask] = useState([]);
  const [openTask, setOpenTask] = useState(false);
  const [indTask, setTaskInd] = useState();
  const onOpen = (value) => {
    setOpenTask(!openTask);
    setTaskInd(value);
  };
  const onClose = () => {
    setOpenTask(false);
  };
  const getData = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`/task-management/boards/${id}`);
      setData(response.data.data[0]);
      setStatus(response.data.data[0].taskStatus);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, [id, handleError, setIsLoading]);
  const [taskId, setTaskId] = useState();
  const getTask = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`/task-management/boards/tasks/${id}`);
      setTask(response.data.data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, [id, handleError, setIsLoading]);
  const [dynamic, setDynamic] = useState();
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
  const[opCu,setOpcu]=useState(false)
  const handleCustomise = () => {

    setOpcu(true);
  };

  const handleCloseCustomise = useCallback(() => {
    setOpcu(false);

  }, []);
  useEffect(() => {
    getData();
    getTask();
    if (refresh) {
      getData();
      setRefreshData(false);
    }
  }, [getData, getTask, refresh]);

  return (
    <div
      className="relative"
      style={{
        backgroundImage: data ? `url(${data.background})` : "none",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md" />
      {openTask && <Subtask board={data} onClose={onClose} task={indTask} />}
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
          taskId={taskId}
          dynamic={dynamic}
          bId={id}
          mode={drawerMode}
          onClose={handleCloseDrawer}
        />
      </Drawer>
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
        open={opCu}
        onClose={handleCloseDrawer}
      >
        <Customize  onClose={handleCloseCustomise} />
      </Drawer>

      <div className="glass-overlay relative z-10 p-4">
        {data && (
          <div>
            <div className="bg-black bg-opacity-40 rounded-lg">
              <div className="flex justify-between py-2 h-16 px-4 gap-3 items-center border-b border-slate-800">
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

              <div className="flex p-4 justify-start flex-wrap">
                <h1 className="text-2xl text-white">Tasks</h1>
              </div>
              <div
                style={{ marginTop: "-20px" }}
                className="p-4 flex flex-col  gap-2 sm:flex-row justify-between"
              >
                <div className="flex gap-3">
                  <button className="rounded-sm p-1 px-3 hover:bg-slate-800 bg-black bg-opacity-50 text-white shadow-slate-100">
                    Board
                  </button>
                  <button className="rounded-sm p-1 px-3 hover:bg-slate-800 bg-black bg-opacity-50 text-white shadow-slate-100">
                    List
                  </button>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={handleCustomise}
                    className="text-white p-1 transition-all px-3 border border-red-400 rounded-sm bg-red-500 flex items-center gap-2"
                  >
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
            </div>
            <div className="flex h-full overflow-x-auto scroll-smooth no-scrollbar gap-5 p-4">
              {statusList.map((status) => (
                <div key={status._id} className="flex flex-col gap-3">
                  <BlockTitle
                    setDynamic={setDynamic}
                    title={status.status}
                    onAddTask={handleAdd}

                    // onViewTask={onViewTask}
                  />
                  {taskData
                    .filter((task) => task.status === status.status)
                    .map((task) => (
                      <TodoBlock
                        onAddTask={handleAdd}
                        setTaskId={setTaskId}
                        data={data}
                        onOpen={onOpen}
                        key={task._id}
                        task={task}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
