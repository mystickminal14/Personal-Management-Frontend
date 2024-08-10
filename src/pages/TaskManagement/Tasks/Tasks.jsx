import { useContext } from "react";
import { BsThreeDots } from "react-icons/bs";
import { LuListTodo } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { AppContext } from "../../../context/ContextApp";
import "../.././styles/sub-menu.css";
import BlockTitle from "../../../components/task-components/BlockTitle";
import TodoBlock from "../../../components/task-components/TodoBlock";
export default function Board() {
  const { responsive } = useContext(AppContext);
  return (
    <>
      <div className="flex justify-between py-2 h-16 px-4 gap-3 items-center border-b border-slate-800">
        <div className={`flex items-center gap-3`}>
          <h1 className="text-xl md:text-2xl flex items-center">
            <span className="rounded-md p-1 px-2 bg-slate-700 mr-4"> ED</span>{" "}
            EDUSYS
          </h1>

          <button className="text-xl md:text-2xl">
            <BsThreeDots />
          </button>
        </div>
      </div>

      <div className="flex p-4 justify-between flex-wrap">
        <h1 className="text-xl">Tasks</h1>
        <div className="flex gap-2 items-center justify-between">
          <button className="text-white p-1 transition-all px-3 border border-red-400  rounded-sm bg-transparent hover:bg-red-500   flex items-center gap-2 ">
            {" "}
            Customise{" "}
            <b>
              <IoSettingsOutline className="rotate-[360deg] duration-500" />
            </b>
          </button>
          <button className="text-white p-1 transition-all px-3 border border-blue-500 rounded-sm bg-transparent  hover:bg-blue-500   flex items-center gap-2  ">
            {" "}
            Add Task{" "}
            <b>
              <LuListTodo className="rotate-[360deg] duration-500" />
            </b>
          </button>
        </div>
      </div>
      <div style={{ marginTop: "-20px" }} className="p-4 flex gap-3">
        <button className="rounded-sm p-1 px-3 t hover:bg-slate-800 bg-slate-600  shadow-slate-100">
          Board
        </button>
        <button className="rounded-sm p-1 px-3  hover:bg-slate-800 bg-slate-600  shadow-slate-100">
          List
        </button>
      </div>
      <div className="flex h-full  overflow-x-auto scroll-smooth no-scrollbar gap-5 p-4">
        <div className="card flex flex-col gap-3">
          <BlockTitle title="Todo" />
          <TodoBlock />
        </div>
        <div className="card flex flex-col gap-3">
          <BlockTitle title="Todo" />
          <div className='flex flex-col gap-3'>
            <TodoBlock />
            <TodoBlock />
            <TodoBlock />
            <TodoBlock />
            <TodoBlock />
            <TodoBlock />
          </div>
        </div>
        <div className="card flex flex-col gap-3">
          <BlockTitle title="Todo" />
          <TodoBlock />
          <TodoBlock />

          <TodoBlock />
        </div>
        <div className="card flex flex-col gap-3">
          <BlockTitle title="Todo" />
          <TodoBlock />
        </div>

        <div className="card flex flex-col gap-3">
          <BlockTitle title="Todo" />
          <TodoBlock />
          <TodoBlock />
          <TodoBlock />
        </div>
      </div>
    </>
  );
}