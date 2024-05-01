import React from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";

function StopwatchControls({ handleStartStop, isRunning, handleReset }) {
  return (
    <div className="flex justify-center gap-6 items-center h-1/5 w-full">
      <button
        onClick={handleStartStop}
        className="w-10 h-10 flex justify-center items-center"
      >
        {isRunning ? <FaPause size={25} /> : <FaPlay size={25} />}
      </button>
      {isRunning && (
        <button
          onClick={handleReset}
          className="w-10 h-10 flex justify-center items-center"
        >
          <FaRedoAlt size={25} />
        </button>
      )}
    </div>
  );
}

export default StopwatchControls;
