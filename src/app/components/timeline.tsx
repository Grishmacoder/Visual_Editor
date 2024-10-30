import React, { useState, useEffect } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import DargList from "./dragList";
import { schedule } from "../data";
import { Play, Pause, Reset } from "./icons";

interface TimeInterface {
  time: number;
  setTime: any;
}

const TimeLine = ({ time, setTime }: TimeInterface) => {
  const [isRunning, setIsRunning] = useState(false);
  const [linePosition, setLinePosition] = useState(0);
  const millisecondsIncrease = 10;
  const pixelIncreaseRate = 1;
  const millisecondsPerPixel = millisecondsIncrease / pixelIncreaseRate;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime: number) => prevTime + millisecondsIncrease);
        setLinePosition((prevPosition) => prevPosition + pixelIncreaseRate);
      }, millisecondsIncrease);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setLinePosition(0);
    setIsRunning(false);
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setLinePosition(data.x);
    const timeOffset = Math.floor(data.x * millisecondsPerPixel);
    setTime(timeOffset);
  };

  const formatTime = (time: number) => {
    const milliseconds = (time % 1000) / 10;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 60000);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  const timeline = Array.from({ length: 20 });

  return (
    <div className="p-3 bg-black">

      <div className="flex justify-start bg-slate-700 p-2">
        {isRunning ? (
          <button className="mx-2" onClick={handleStop}>
            <Pause />
          </button>
        ) : (
          <button className="mx-2" onClick={handleStart}>
            <Play />
          </button>
        )}
        <button className="mx-2" onClick={handleReset}>
          <Reset />
        </button>
        <div className="mx-2">{formatTime(time)}</div>
      </div>

      <div className="relative overflow-auto no-scrollbar">

        <div className="absolute flex justify-start min-h-full py-2 pointer-events-none">
          {timeline.map((e, i) => (
            <span
              key={i}
              className="min-w-[100px] min-h-[25px] border-dashed border-l-2 border-white"
            ></span>
          ))}
        </div>

        <Draggable
          axis="x"
          bounds="parent"
          position={{ x: linePosition, y: 0 }}
          onDrag={handleDrag}
        >
          <div className="absolute bg-blue-600 w-[2px] h-full top-0 left-0 cursor-grab" />
        </Draggable>
        
        {schedule.map((frame, index) => (
          <DargList key={index} data={frame} />
        ))}
      </div>

    </div>
  );
};

export default TimeLine;
