import React, {useState} from "react";
import {useInterval} from "react-use";
import {ding, flow, tick} from "../lib/sounds";

export type PomodoroComponentProps = {
    onStop: any;
    onDone: any;
    onUpdate: any;
    initial: number;
};

ding.on('end', () => flow.play());

export function PomodoroComponent(props: PomodoroComponentProps) {

    const [timeSpent, setTimeSpent] = useState(-1);
    const [minutes, setMinutes] = useState(props.initial);
    const [seconds, setSeconds] = useState(0);

    useInterval(() => {
        tick.play();
        if (seconds <= 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
            setTimeSpent(timeSpent + 1);
            props.onUpdate({ timeSpent: timeSpent + 1 });

            if (minutes <= 0) {
                tick.stop();
                ding.play();
                props.onDone();
            }
        } else {
            setSeconds(seconds - 1);
        }
    }, 1000);

    function getPercentage(current: number, seconds: number) {
        const secondsPercentage = (seconds / 60);
        return Math.ceil(((current + secondsPercentage) / props.initial) * 100);
    }

    function pad(value: number) {
        return value.toString().padStart(2, '0');
    }

    function formatTime(minutes: number, seconds: number) {
        return `${pad(minutes)}:${pad(seconds)}`;
    }

    return (
        <div className={`c100 p${getPercentage(minutes, seconds)} blue`}>
            <span>{formatTime(minutes, seconds)}</span>
            <div className="slice">
                <div className="bar"/>
                <div className="fill"/>
            </div>
        </div>
    );
}
