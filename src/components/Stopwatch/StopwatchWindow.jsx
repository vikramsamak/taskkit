"use client";
import React, { useEffect, useState } from "react";
import AppWindow from "../SharedComponents/AppWindow";
import AppWindowHeader from "../SharedComponents/AppWindowHeader";
import { STOPWATCH } from "@/helpers/Constants";
import AppMainSection from "../SharedComponents/AppMainSection";
import StopwatchDisplay from "./StopwatchDisplay";
import StopwatchControls from "./StopwatchControls";

function Stopwatchwindow() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <AppWindow>
      <AppWindowHeader windowName={STOPWATCH}></AppWindowHeader>
      <AppMainSection>
        <StopwatchDisplay time={formatTime(time)}></StopwatchDisplay>
        <StopwatchControls
          handleStartStop={handleStartStop}
          handleReset={handleReset}
          isRunning={isRunning}
        ></StopwatchControls>
      </AppMainSection>
    </AppWindow>
  );
}

export default Stopwatchwindow;
