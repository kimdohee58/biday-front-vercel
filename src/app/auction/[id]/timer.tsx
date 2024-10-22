import { useEffect, useState } from "react";

export interface Time {
    day: number;
    hour: number;
    min: number;
    sec: number;
}

interface TimerProps {
    endedTime: string;
}

export const Timer = ({ endedTime }: TimerProps) => {
    const calculateRemainingTime = (endTime: Date): Time => {
        const now = new Date();
        const difference = endTime.getTime() - now.getTime();

        if (difference <= 0) {
            return { day: 0, hour: 0, min: 0, sec: 0 };
        }

        const totalSeconds = Math.floor(difference / 1000);
        const day = Math.floor(totalSeconds / (3600 * 24));
        const hour = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const min = Math.floor((totalSeconds % 3600) / 60);
        const sec = totalSeconds % 60;

        return { day, hour, min, sec };
    };

    const [time, setTime] = useState<Time>(() => calculateRemainingTime(new Date(endedTime)));

    useEffect(() => {
        const endTimeDate = new Date(endedTime);

        const intervalId = setInterval(() => {
            setTime(calculateRemainingTime(endTimeDate));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [endedTime]);

    return (
        <div className="relative rounded-md bg-white p-6 shadow-lg border border-gray-200 sm:rounded-xl text-center">
            <h2 className="text-lg font-semibold text-gray-800">Time Remaining</h2>
            <p className="mt-2 text-3xl text-gray-700">
                {time.day > 0 && `${time.day} day `}
                {`${time.hour.toString().padStart(2, "0")}:${time.min.toString().padStart(2, "0")}:${time.sec.toString().padStart(2, "0")}`}
            </p>
        </div>
    );
};
