import React from "react";

export default function SideBarButtons({ icon, btnTitle, arrow ,show,onClick}) {
  return (
    <button onClick={onClick} className="rounded-md text-white w-full hover:bg-slate-400 transition-all hover:text-black flex items-center justify-between p-2 gap-2">
      <div className="flex items-center gap-2">
        {icon} {show && <span>{btnTitle}</span>}
      </div>
      {show && arrow  && <span>{arrow}</span>}
    </button>
  );
}
