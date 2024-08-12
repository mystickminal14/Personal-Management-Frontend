import React from "react";
import { FaEdit,FaEye } from "react-icons/fa"
import { MdDeleteForever } from "react-icons/md";
import { FaRegWindowClose } from "react-icons/fa";

export default function TaskMenu({onClick,setTaskId, tid ,onAddTask}) {

  return (
    <div style={{ background: "#1A1A1A"}} className="right-0 transition-all duration-500c w-32 p-2 pt-4 py-2 flex rounded-lg justify-center pb-4  flex-col items-center gap-2 absolute top-0 ">
        <button onClick={onClick} className="absolute right-2 top-2 text-2xl text-white hover:bg-slate-500 hover:text-white"><FaRegWindowClose/></button>
       <button  onClick={(e) => {
          setTaskId(tid); 
          onAddTask()
          e.stopPropagation(); 
        }} className='mt-6 text-white p-1 flex-row-reverse hover:bg-slate-500 flex w-28 rounded-md justify-center gap-3 items-center'>Edit <FaEdit/></button>
       <button  onClick={() => {
          setTaskId(tid); 
          e.stopPropagation(); 
        }} className='text-white p-1 flex-row-reverse hover:bg-slate-500 flex w-28 rounded-md justify-center gap-3 items-center'>View <FaEye/></button>
       
    </div>
  );
}
