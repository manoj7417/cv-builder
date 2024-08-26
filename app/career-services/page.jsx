"use client";
import React from "react";
import WorkTogether from "@/components/component/WorkTogether";
import GetStartedModal from "@/components/component/GetStartedModal";
import a1 from "../../public/animations/ai-career-coach.json";
import a2 from "../../public/animations/1-1-career.json";
import a3 from "../../public/animations/pschometric-test.json";
import Lottie from "lottie-react";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";

const CareerServices = () => {
  const cvStudio = [
    {
      title: "AI Career Coaching",
      image: a1,
      description:
        "Receive personalized career guidance and actionable insights, powered by advanced AI algorithms.",
      link: "/coming-soon",
    },
    {
      title: "1 to 1 Career Coaching",
      image: a2,
      description:
        "Work directly with a professional career coach to strategize and achieve your career goals.",
      link: "/coming-soon",
    },
    {
      title: "Psychometric Test",
      image: a3,
      description:
        "Assess your personality traits and cognitive abilities to discover the career paths best suited to you",
      current: false,
      link: "/coming-soon",
    },
  ];

  return (
    <>
      <section
        className="flex lg:items-center items-start pb-0 justify-center  w-full pt-24 md:pt-16 lg:pt-40  px-5 relative"
        id="free"
      >
        <div className="container ">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 md:mb-1">
            <span className="text-[#2C98CA]">AI Career Coaching,</span> Your
            Personalized Career Guide!
          </h1>
          <p className="text-center text-gray-500 text-sm md:text-lg mb-6 md:mb-10">
            Receive expert career guidance powered by AI to help you achieve
            your goals and stand out in the job market.
          </p>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10">
              {cvStudio.map((animation, index) => (
                <div key={index}>
                  <div className="max-w-[400px] min-h-[450px] h-[400px] rounded-md border flex flex-col justify-between">
                    <Lottie
                      animationData={animation?.image}
                      loop={true}
                      autoplay={true}
                      style={{ height: 200, width: "100%" }}
                    />
                    <div className="flex-grow p-4 text-center">
                      <h1 className="text-2xl font-semibold">
                        {animation?.title}
                      </h1>
                      <p className="my-4 text-sm text-gray-600">
                        {animation?.description}
                      </p>
                    </div>
                    <div className="p-4">
                      <Link
                        href={animation?.link}
                        className="mt-auto block w-[60%] mx-auto rounded-sm bg-blue-950 p-3 text-sm font-semibold text-white shadow-sm text-center"
                      >
                        Try Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WorkTogether />
    </>
  );
};

export default CareerServices;
