"use client"; // This is a client component

import React, { useEffect, useState } from "react";

interface CountdownProps {
    validTo: Date | null; // Define the type for validTo
}

const Countdown: React.FC<CountdownProps> = ({ validTo }) => {
    const [timeRemaining, setTimeRemaining] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeRemaining = () => {
            if (validTo) {
                const now = new Date();
                const totalSeconds = Math.floor((validTo.getTime() - now.getTime()) / 1000); // Use getTime() to get milliseconds

                if (totalSeconds >= 0) {
                    const days = Math.floor(totalSeconds / 86400);
                    const hours = Math.floor((totalSeconds % 86400) / 3600);
                    const minutes = Math.floor((totalSeconds % 3600) / 60);
                    const seconds = totalSeconds % 60;

                    setTimeRemaining({ days, hours, minutes, seconds });
                } else {
                    setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                }
            }
        };

        // Initial calculation
        calculateTimeRemaining();

        // Update countdown every second
        const interval = setInterval(calculateTimeRemaining, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [validTo]);

    return (
        <div className="bg-green-500 px-4 py-2 rounded-md text-white font-semibold">
            Time Remaining: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
        </div>
    );
};

export default Countdown;