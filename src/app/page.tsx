"use client";
import { useState } from "react";
import Player from "./components/player";
import TimeLine from "./components/timeline";

export default function Home() {
  const [time, setTime] = useState<number>(0);

  return (
    <div>
      <Player time={time} />
      <TimeLine time={time} setTime={setTime} />
    </div>
  );
}
