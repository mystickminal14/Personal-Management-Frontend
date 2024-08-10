import React from "react";
import MiniCard from "./MiniCard";
import BarCharts from "./BarCharts";
import { Avatar } from "@mui/material";
import img from "./../../assets/logo.png";
import { IoSettingsSharp } from "react-icons/io5";
import TaskTabs from "./TaskTabs";
import Navbar from "../../components/nav-bar/Navbar";
const HomeCard = () => {
  return (
    <>
    <Navbar/>
      <nav className="md:p-4 p-2 md:px-10  px-5 flex justify-between">
        <div>
        
          <h1 className="font-mono font-bold text-2xl md:text-4xl">
            DASHBOARD
          </h1>
          <p style={{ fontSize: "14px" }}>Welcome to your dashboard!</p>
        </div>
        <div className="flex justify-center md:gap-4 gap-1 items-center">
          <span className="setting flex justify-center items-center ">
            <IoSettingsSharp className="text-center text-2xl" />
          </span>
          <Avatar
            alt="Minal Pariyar"
            className=" avatar hover:cursor-pointer"
            src={img}
          />
        </div>
      </nav>
      <div className="p-8 grid grid-cols-1 h-auto  Justify-items-center place-content-center  md:flex md:gap-4">
        <div className="sm:flex sm:flex-col gap-4 sm:w-[100%] w-90%   ">
          <div className=" grid grid-cols-1 sm:flex-nowrap flex-wrap justify-between p-2 gap-6 sm:flex">
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </div>
        <div className="grid grid-cols-1 md:flex gap-6">
        <div className="mini-card p-2 md:w-[60%]">
            <BarCharts />
           
          </div>
          <div className="mini-card p-2 md:w-[40%]">
          <TaskTabs/>
           
          </div>
        </div>
       
          
        </div>
      </div>
    </>
  );
};

export default HomeCard;
