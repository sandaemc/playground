import React, { useState } from "react";
import { useInterval } from "react-use";
import * as fx from "../../lib/fx";
import "./pomodoro.css";

export enum PomodoroColor {
  blue = "blue",
  orange = "orange",
  green = "green"
}

export type PomodoroComponentProps = {
  onDone: any;
  onMinuteCycle: any;
  initial: number;
  color: string;
};

export function PomodoroComponent(props: PomodoroComponentProps) {
  const [minutes, setMinutes] = useState(props.initial);
  const [seconds, setSeconds] = useState(0);

  useInterval(() => {
    fx.tick.play();
    setSeconds(seconds - 1);

    if (seconds <= 0) {
      setSeconds(59);
      setMinutes(minutes - 1);

      if (minutes <= 0) {
        fx.tick.stop();
        props.onDone();
      }
    }
  }, 1000);

  function getPercentage(minutes: number, seconds: number) {
    const secondsPercentage = seconds / 60;
    return Math.ceil(((minutes + secondsPercentage) / props.initial) * 100);
  }

  function pad(value: number) {
    return value.toString().padStart(2, "0");
  }

  function formatTime(minutes: number, seconds: number) {
    return `${pad(minutes)}:${pad(seconds)}`;
  }

  return (
    <div className={`c100 p${getPercentage(minutes, seconds)} ${props.color}`}>
      <span>{formatTime(minutes, seconds)}</span>
      <div className="slice">
        <div className="bar" />
        <div className="fill" />
      </div>
    </div>
  );
}
