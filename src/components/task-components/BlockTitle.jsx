import React from 'react'
import '../.././styles/sub-menu.css'
import { GoDotFill } from "react-icons/go";
import { FaPlus } from "react-icons/fa";

export default function BlockTitle({title}) {
  return (
    <div className='blockCard flex items-center px-6 justify-between bg-slate-800 w-96 h-12' >
      <h1 className='flex gap-2 items-center'><GoDotFill style={{color:'yellow'}}/>{title}</h1>
      <button className='hover:bg-slate-500 transition-all hover:text-black p-1'><FaPlus/></button>
    </div>
  )
}
