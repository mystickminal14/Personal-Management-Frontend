import { useContext } from "react";
import SideBar from "../side-bar/SideBar";
import { AppContext } from "../../context/ContextApp";
import Navbar from "../nav-bar/Navbar"
export default function Dashboard({ mainContent }) {
  const { responsive } = useContext(AppContext);
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 mt-14">
        <SideBar />
        <div className={` ${responsive ? "md:ml-72" : "ml-12"}`}>
          {mainContent}
        </div>
      </div>
    </>
  );
}
