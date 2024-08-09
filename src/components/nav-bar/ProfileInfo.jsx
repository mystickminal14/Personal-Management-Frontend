import React, { forwardRef } from "react";
import useGet from "../../hooks/useGet";
import { useNavigate } from "react-router-dom";
import useHandleError from "../../hooks/useHandleError";
import { AppContext } from "../../context/ContextApp";
import axios from "../../utils/api-client";

const ProfileInfo = forwardRef(({ showProfile }, ref) => {
  const navigate = useNavigate();
  const { setIsLoading, showToast } = React.useContext(AppContext);
  const handleError = useHandleError();
  const { data } = useGet(`/auth/users`);

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/auth/logout");
      setIsLoading(false);
      navigate('/')
      showToast(`${response.data?.message}`,"success");
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      style={{ background: "#2C2C2C", left: "-270px" }}
      className={`absolute rounded-md z-50 top-14 flex flex-col justify-around px-4 ${
        showProfile ? "transition-all ease-in-out" : ""
      } items-center w-72 h-80`}
    >
      <div className="flex justify-center items-center gap-3 flex-col">
        <div className="flex items-center gap-3">
          <div
            className={`bg-slate-700 w-12 h-12 flex justify-center items-center text-xl p-1`}
          >
            <img
              src={data?.data?.avatar}
              className="w-12 h-12 object-cover"
              alt="profile-image"
            />
          </div>
          <div>
            <h2 className="capitalize">{data?.data?.fullName}</h2>
            <h3>{data?.data?.email}</h3>
          </div>
        </div>
        <div className="w-64 mt-4 grid grid-rows-1">
          <button className="bg-transparent hover:bg-[#1e1d1d] p-2 rounded-md">
            Manage Profile
          </button>
          <button className="bg-transparent hover:bg-[#1e1d1d] p-2 rounded-md">
            Manage Account
          </button>
        </div>
      </div>
      <div>
        <button
          onClick={handleLogOut}
          className="bg-transparent w-64 border-red-900 bg-red-900 hover:bg-red-800 p-2 rounded-md"
        >
          Logout
        </button>
        <p
          style={{ fontSize: "0.7rem" }}
          className="font-mono mt-3 border-t-2 pt-3"
        >
          © 2024 Minal Paryar. All Rights Reserved.
        </p>
      </div>
    </div>
  );
});

export default ProfileInfo;
