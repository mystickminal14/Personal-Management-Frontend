import React, { forwardRef } from "react";
import logo from "../../assets/full-logo.png";

const Faq = forwardRef(({ show }, ref) => {
  return (
    <div
      ref={ref}
      style={{ background: "#2C2C2C", left: "-250px" }}
      className={`absolute rounded-md z-50 top-12 flex flex-col justify-center p-4 items-center w-80 h-auto ${show ? "transition-all ease-in-out" : ""}`}
    >
      <div className="w-64 h-52">
        <img src={logo} alt="logo" className="w-64 h-52 object-cover" />
      </div>
      <p className="font-serif text-center">
        "Organize, Track, Achieve, Simplify"
      </p>
      <p
        style={{ fontSize: "0.7rem" }}
        className="font-mono mt-3 border-t-2 pt-3"
      >
        © 2024 Minal Paryar. All Rights Reserved.
      </p>
    </div>
  );
});

export default Faq;
