import React from "react";
import { FaEdit,FaEye } from "react-icons/fa"
import { MdDeleteForever } from "react-icons/md";
import { FaRegWindowClose } from "react-icons/fa";

export default function TaskMenu({onClick}) {

  return (
    <div className="right-0 transition-all duration-500c w-44 p-2 pt-4 py-2 flex bg-gray-800 justify-center pb-4  flex-col items-center gap-2 absolute top-0 ">
        <button onClick={onClick} className="absolute right-2 top-2 text-2xl text-white hover:bg-slate-500 hover:text-white"><FaRegWindowClose/></button>
       <button className='mt-6 text-white p-1 flex-row-reverse hover:bg-slate-500 flex w-36 justify-center gap-3 rounded-sm items-center'>Edit <FaEdit/></button>
       <button className='text-white p-1 flex-row-reverse hover:bg-slate-500 flex w-36 justify-center gap-3 rounded-sm items-center'>View <FaEye/></button>
       <button className='text-white p-1  flex-row-reverse hover:bg-slate-500 flex w-36 justify-center gap-3 rounded-sm items-center'>Edit <MdDeleteForever/></button>
        
    </div>
  );
}
