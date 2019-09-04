import React, {useState} from "react";
import {useInterval} from "react-use";

export type PomodoroComponentProps = {
    onDone: any;
    initial: number;
};

export function PomodoroComponent(props: PomodoroComponentProps) {
    const [minutes, setMinutes] = useState(props.initial);
    const [seconds, setSeconds] = useState(59);

    useInterval(() => {
        setSeconds(seconds - 1);
        if (seconds <= 0) {
            setSeconds(59);
            setMinutes(minutes - 1);

            if (minutes <= 0) {
                props.onDone();
            }
        }
    }, 1000);

    function getPercentage(current: number) {
        return Math.ceil((current / props.initial) * 100);
    }

    function pad(value: number) {
        return value.toString().padStart(2, '0');
    }

    function formatTime(minutes: number, seconds: number) {
        return `${pad(minutes)}:${pad(seconds)}`;
    }

    return (
        <div className={`c100 p${getPercentage(minutes)} blue`}>
            <span>{formatTime(minutes, seconds)}</span>
            <div className="slice">
                <div className="bar"/>
                <div className="fill"/>
            </div>
        </div>
    );
}
