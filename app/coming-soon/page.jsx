"use client";
import dynamic from 'next/dynamic'
import React from "react";
import Countdown from "react-countdown";
import Countanimation from "@/public/animations/comingsoon.json"

// Dynamic import for Lottie
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div className="h-[200px] sm:h-[300px] animate-pulse bg-gray-200 rounded-lg" />
});

// Function to get the future date 20 days from now
const getFutureDate = () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 20);
  return futureDate;
};

// Renderer function for the countdown
const renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <ul className="countdown flex space-x-2 sm:space-x-4 text-center justify-center">
      <li className="flex flex-col items-center">
        <span className="days text-4xl sm:text-6xl font-bold">{days}</span>
        <p className="days_ref text-sm sm:text-base">days</p>
      </li>
      <li className="flex flex-col items-center">
        <span className="hours text-4xl sm:text-6xl font-bold">{hours}</span>
        <p className="hours_ref text-sm sm:text-base">hours</p>
      </li>
      <li className="flex flex-col items-center">
        <span className="minutes text-4xl sm:text-6xl font-bold">{minutes}</span>
        <p className="minutes_ref text-sm sm:text-base">minutes</p>
      </li>
      <li className="flex flex-col items-center">
        <span className="seconds text-4xl sm:text-6xl font-bold">{seconds}</span>
        <p className="seconds_ref text-sm sm:text-base">seconds</p>
      </li>
    </ul>
  );
};

const ComingSoon = () => {
  const futureDate = getFutureDate();

  return (
    <div
      className="wrapper flex flex-col h-screen bg-gray-100 mt-16 sm:mt-0"
      style={{
        backgroundImage: "url(/coming-soon-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="hidden">Coming Soon</h1>
          <Lottie
            animationData={Countanimation}
            loop={true}
            style={{ height: "200px", sm: "300px", margin: "0 auto" }}
          />
          <div className="mt-6 text-center">
            <Countdown date={futureDate} renderer={renderer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
