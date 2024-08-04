import React from "react";
import "./../../styles/task-management.css";
import "./../../styles/mini-card.css";
const Board = ({ card }) => {
  return (
    <div className="p-3">
      <div className="board-container rounded-lg h-48 sm:h-56"></div>
      <div className="flex flex-col mt-[-50px] items-center justify-content-center">
        <div className="card bg-white w-[90%] h-[500px] rounded-md">{card}</div>
      </div>
    </div>
  );
};

export default Board;
