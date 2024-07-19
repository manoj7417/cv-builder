"use client";
import Lottie from "lottie-react";
import Countanimation from "@/public/animations/comingsoon.json";
import React from "react";
import Countdown from "react-countdown";

// Function to get the future date 20 days from now
const getFutureDate = () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 20);
  return futureDate;
};

// Renderer function for the countdown
const renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <ul className="countdown flex space-x-4 text-center justify-center">
      <li className="flex flex-col items-center">
        <span className="days text-6xl font-bold">{days}</span>
        <p className="days_ref">days</p>
      </li>
      <li className="flex flex-col items-center">
        <span className="hours text-6xl font-bold">{hours}</span>
        <p className="hours_ref">hours</p>
      </li>
      <li className="flex flex-col items-center">
        <span className="minutes text-6xl font-bold">{minutes}</span>
        <p className="minutes_ref">minutes</p>
      </li>
      <li className="flex flex-col items-center">
        <span className="seconds text-6xl font-bold">{seconds}</span>
        <p className="seconds_ref">seconds</p>
      </li>
    </ul>
  );
};

const ComingSoon = () => {
  const futureDate = getFutureDate();

  return (
    <div
      className="wrapper flex h-screen bg-gray-100 mt-16"
      style={{
        backgroundImage: "url(/coming-soon-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Lottie
            animationData={Countanimation}
            loop={true}
            style={{ height: "300px", margin: "0 auto" }}
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
