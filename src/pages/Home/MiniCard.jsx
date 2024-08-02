import React from 'react';
import './../../styles/mini-card.css';
import { FaTasks } from "react-icons/fa";

const MiniCard = () => {
  return (
    <div className='mini-card h-auto  md:h-32 w-[100%]  md:w-[50%] relative flex flex-col items-end p-3 '>
      <div className='w-[50px] h-[50px] flex absolute top-[-15px] left-5 justify-center items-center rounded-lg bg-slate-700'>
        <FaTasks className='text-white rounded-sm text-3xl' />
      </div>
      <h1 className='font-medium  text-black font-sans'>Pending Task</h1>
      <h1 className="text-4xl text-black  font-bold">20</h1>
      <p className='self-start text-black '>Last Updated Yesterday</p>
    </div>
  );
};

export default MiniCard;
