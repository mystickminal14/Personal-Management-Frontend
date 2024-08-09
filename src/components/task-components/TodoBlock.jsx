import React, { useState } from "react";
import "../.././styles/sub-menu.css";
import { GoDotFill } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { CgAttachment } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import TaskMenu from "./TaskMenu";

export default function TodoBlock() {
  const [showMenu, setshow] = useState(false);
  return (
    <div
      draggable
      style={{ background: "#1A1A1A", cursor: "grab" }}
      className="card flex flex-col gap-2 0 w-96 n p-4 "
    >
      <div className="flex relative justify-between">
        <h1 className="flex gap-2 items-center">
          <GoDotFill style={{ color: "yellow" }} />
          Minal.
        </h1>
        <button className=" hover:bg-slate-500 hover:rounded-full transition-all hover:text-black p-1">
          <BsThreeDots
            onClick={() => {
              setshow(!showMenu);
            }}
          />
        </button>
        {showMenu ? <TaskMenu onClick={() => setshow(!showMenu)} /> : ""}
      </div>
      <span className="px-2"> 2024-01-44</span>
      <div className="px-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {" "}
          <h1 className="flex items-center gap-1">
            <FaTasks /> <span>0</span>
          </h1>
          <h1 className="flex items-center gap-1">
            <CgAttachment /> <span>5k</span>
          </h1>
        </div>
        <h1 className="bg-yellow-500 text-black rounded-full p-1">MP</h1>
      </div>
      <p className="px-2">descjhjadhshhghdgh</p>
      <button className="flex items-center gap-2 cursor p-2 rounded-sm mt-3 hover:bg-slate-400 hover:text-black">
        <FaPlus /> Add Sub Task
      </button>
    </div>
  );
}
