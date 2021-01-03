import React, {useState} from "react";
import { useInterval } from 'react-use';

export type TimerComponentProps = {
  initialValue: number;
  maxValue: number;
  label: string;
};

export function TimerComponent({ initialValue, label, maxValue }: TimerComponentProps) {
    const [currentValue, setCurrentValue] = useState(initialValue);

    useInterval(() => {
       setCurrentValue(currentValue + 1);
    }, 1000);

  return (
    <div className={`c100 p${Math.ceil((currentValue / maxValue) * 100)} blue`}>
      <span>{label} {Math.ceil((currentValue / maxValue) * 100)}</span>
      <div className="slice">
        <div className="bar"/>
        <div className="fill"/>
      </div>
    </div>
  );
}
