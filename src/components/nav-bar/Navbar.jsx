import React, { useState, useEffect, useRef } from "react";
import logo from "./../../assets/logo2.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaQuestionCircle } from "react-icons/fa";
import Faq from "./Faq";
import ProfileInfo from "./ProfileInfo";
import useGet from "../../hooks/useGet";

const Navbar = () => {
  const [showFaq, setShowFaq] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const faqRef = useRef(null);
  const profileRef = useRef(null);
  const { data } = useGet(`/auth/users`);

  // Handle click outside for FAQ
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (faqRef.current && !faqRef.current.contains(event.target)) {
        setShowFaq(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className=" w-full flex justify-between px-4 top-0 h-14 items-center text-white"
      style={{ background: "#1A1A1A", zIndex: "100000" }}
    >
      <div className="flex items-center gap-3">
        <div
          className={` w-[140px] h-[70px] flex justify-center items-center text-xl p-1`}
        >
          <img
            src={logo}
            className=" w-[140px] h-[70px]  object-cover"
            alt="profile-image"
          />
        </div>
        <h1 className="hidden md:block">Task Management</h1>
        <h1 className="hidden md:block">Expense Tracker</h1>
      </div>
      <div className="flex items-center justify-between gap-5">
        <IoIosNotificationsOutline className="text-2xl" />
        <div className="relative">
          <FaQuestionCircle
            onClick={() => setShowFaq(!showFaq)}
            className={`text-2xl cursor-pointer ${
              showFaq
                ? "hover:shadow-md translate-y-1 scale-105 transition-all ease-in-out"
                : ""
            }`}
          />
          {showFaq && <Faq ref={faqRef} show={showFaq} />}
        </div>
        <div className="relative">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className={`cursor-pointer w-10 text-center p-1   ${
              showProfile
                ? "hover:shadow-md translate-y-1 scale-105 transition-all ease-in-out"
                : ""
            }`}
          >
            <img
              src={data?.data?.avatar}
              alt="profile"
              className="w-10 object-cover"
            />
          </div>
          {showProfile && (
            <ProfileInfo ref={profileRef} showProfile={showProfile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
