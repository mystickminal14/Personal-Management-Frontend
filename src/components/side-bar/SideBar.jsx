import { useContext, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import SideBarButtons from "./SideBarButtons";
import SubMenu from "./SubMenu";
import "../../styles/sub-menu.css"; // Adjust path as per your project structure
import { AppContext } from "../../context/ContextApp";

export default function SideBar() {
  const { responsive, setResponsive } = useContext(AppContext);
  const [show, setShow] = useState(true);
  const [showMenu, setSubMenu] = useState({
    task: false,
    reports: false,
    expense: false,
    fitness: false,
  });
  const location = useLocation();

  const handleSubMenu = (value) => {
    setSubMenu((prevState) => ({
      ...prevState,
      [value]: !prevState[value],
    }));
  };

  const handleClose = () => {
    setShow(!show);
    setResponsive(!responsive);
  };

  const checkIsActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside
      style={{ background: "#1A1A1A", zIndex: "1000" }}
      className={`fixed left-0 h-screen transition-all ease-in-out ${
        show ? "w-72 p-2" : "w-12 p-0"
      } flex flex-col`}
    >
      <nav className="mt-2 p-2 flex justify-between items-center text-white">
        {show && <h1>MeTIME</h1>}
        <button
          onClick={handleClose}
          className="bg-slate-800 w-8 h-7 transition-all rounded-md ease-in-out flex justify-center items-center hover:bg-slate-400 hover:text-black"
        >
          {show ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </nav>
      <div className="p-2 mt-6 flex flex-col gap-4">
        <NavLink to="/app/dashboard">
          <SideBarButtons
            icon={<LuLayoutDashboard />}
            show={show}
            btnTitle="My Home"
            isActive={checkIsActive("/app/dashboard")}
          />
        </NavLink>
        <div className="flex flex-col gap-2">
          <NavLink to="/app/task-management">
            <SideBarButtons
              show={show}
              icon={<LuLayoutDashboard />}
              onClick={() => handleSubMenu("task")}
              arrow={showMenu.task ? <IoIosArrowUp /> : <IoIosArrowDown />}
              btnTitle="Manage Task"
              isActive={checkIsActive("/app/task-management")}
            />
          </NavLink>
          <div className={`open ${showMenu.task && show ? "click" : ""}`}>
            <div className="px-4 py-1">
              <ul className="border-l flex flex-col gap-4 border-slate-700 px-4">
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Boards" />
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Doing" />
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Completed" />
              </ul>
            </div>
          </div>

          <NavLink to="/app/expense-tracker">
            <SideBarButtons
              show={show}
              icon={<LuLayoutDashboard />}
              onClick={() => handleSubMenu("expense")}
              arrow={showMenu.expense ? <IoIosArrowUp /> : <IoIosArrowDown />}
              btnTitle="Expense Tracker"
              isActive={checkIsActive("/app/expense-tracker")}
            />
          </NavLink>
          <div className={`open ${showMenu.expense && show ? "click" : ""}`}>
            <div className="px-4 py-1">
              <ul className="border-l flex flex-col gap-4 border-slate-700 px-4">
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Todo" />
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Doing" />
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Completed" />
              </ul>
            </div>
          </div>

          <NavLink to="/app/fitness-tracker">
            <SideBarButtons
              show={show}
              icon={<LuLayoutDashboard />}
              onClick={() => handleSubMenu("fitness")}
              arrow={showMenu.fitness ? <IoIosArrowUp /> : <IoIosArrowDown />}
              btnTitle="Fitness Tracker"
              isActive={checkIsActive("/app/fitness-tracker")}
            />
          </NavLink>
          <div className={`open ${showMenu.fitness && show ? "click" : ""}`}>
            <div className="px-4 py-1">
              <ul className="border-l flex flex-col gap-4 border-slate-700 px-4">
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Todo" />
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Doing" />
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Completed" />
              </ul>
            </div>
          </div>

          <NavLink to="/app/reports">
            <SideBarButtons
              show={show}
              icon={<LuLayoutDashboard />}
              onClick={() => handleSubMenu("reports")}
              arrow={showMenu.reports ? <IoIosArrowUp /> : <IoIosArrowDown />}
              btnTitle="Reports"
              isActive={checkIsActive("/app/reports")}
            />
          </NavLink>
          <div className={`open ${showMenu.reports && show ? "click" : ""}`}>
            <div className="px-4 py-1">
              <ul className="border-l flex flex-col gap-4 border-slate-700 px-4">
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Todo" />
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Doing" />
                <SubMenu icon={<LuLayoutDashboard />} btnTitle="Completed" />
              </ul>
            </div>
          </div>
          <NavLink to="/app/profile">
            <SideBarButtons
              icon={<LuLayoutDashboard />}
              show={show}
              btnTitle="My Profile"
              isActive={checkIsActive("/app/profile")}
            /></NavLink>
        </div>
      </div>
      <div
        className={`text-white border-t border-slate-800 flex items-center gap-3 ${
          show ? "p-2" : "p-2"
        } mt-auto`}
      >
        <h1
          className={`bg-slate-700 cursor-pointer ${
            !show && "rotate-[360deg] duration-500"
          } w-10 text-center p-1`}
        >
          MP
        </h1>
        {show && (
          <div>
            <h2>Mystick Minal</h2>
            <h3>mystick14minal@gmail.com</h3>
          </div>
        )}
      </div>
    </aside>
  );
}
