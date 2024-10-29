import { useEffect, useState } from "react";

export interface Time {
    day: number;
    hour: number;
    min: number;
    sec: number;
}

interface TimerProps {
    endedTime: string; // expected to be a date string like '2024-09-24T06:40:15.000Z'
}

export const Timer = ({ endedTime }: TimerProps) => {
    console.log("endedTime", endedTime)
    // Function to calculate the remaining time until the endTime
    const calculateRemainingTime = (endTime: Date): Time => {
        const now = new Date();
        const difference = endTime.getTime() - now.getTime();

        // If the difference is less than or equal to zero, return zero values
        if (difference <= 0) {
            return { day: 0, hour: 0, min: 0, sec: 0 };
        }

        const totalSeconds = Math.floor(difference / 1000); // Total seconds remaining
        const day = Math.floor(totalSeconds / (3600 * 24)); // Full days remaining
        const hour = Math.floor((totalSeconds % (3600 * 24)) / 3600); // Hours remaining after days
        const min = Math.floor((totalSeconds % 3600) / 60); // Minutes remaining after hours
        const sec = totalSeconds % 60; // Seconds remaining after minutes

        return { day, hour, min, sec };
    };

    // State to store the time remaining
    const [time, setTime] = useState<Time>(() => calculateRemainingTime(new Date(endedTime)));

    // Effect to set up the countdown timer
    useEffect(() => {
        const endTimeDate = new Date(endedTime); // Parse the endedTime into a Date object

        const intervalId = setInterval(() => {
            // Calculate the remaining time every second
            setTime(calculateRemainingTime(endTimeDate));
        }, 1000);

        return () => clearInterval(intervalId); // Clean up the interval on unmount
    }, [endedTime]); // Depend on endedTime to re-run the effect if it changes

    return (
        <div className="relative rounded-md bg-white p-6 shadow-lg border border-gray-200 sm:rounded-xl text-center">
            <h2 className="text-lg font-semibold text-gray-800">Time Remaining</h2>
            <p className="mt-2 text-3xl text-gray-700">
                {time.day > 0 && `D-${time.day} `}
                {`${time.hour.toString().padStart(2, "0")}:${time.min.toString().padStart(2, "0")}:${time.sec.toString().padStart(2, "0")}`}
            </p>
        </div>
    );
};
