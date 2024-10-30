import React from "react";
import { schedule } from "../data";

interface PlayerInterface {
  time: number;
}

const Player = ({ time }: PlayerInterface) => {
  return (
    <div className="grid grid-cols-2 min-h-[65vh] bg-white">
      {schedule.map((frame, index): any => (
        <div className="border-solid border-2 border-black p-3" key={index}>
          {frame.map(
            (e): any =>
              time / 1000 >= e.start &&
              time / 1000 < e.end && <img key={e.id} src={e.src} alt={e.name} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Player;
