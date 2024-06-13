import Image from "next/image";
import React from "react";
import { GoArrowRight } from "react-icons/go";

const WorkTogether = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 place-items-center py-10">
        <div className="work-content">
          <h2 className="text-blue-900 text-5xl font-bold">
          Connect with Us, 
            <br /> Join the Community
          </h2>
          <p className="text-sm mt-3 w-3/4">
          Is your job helping others to find a job? Connect with Us and explore better opportunities as a Career Coach with the Genies Career Hub!
          </p>
          <div className="learn-more flex gap-1 items-center mt-5">
            <div className="text-blue-400 underline underline-offset-8">
              Learn More{" "}
            </div>
            <GoArrowRight className="text-blue-400" />
          </div>
        </div>
        <div className="work_image">
          <Image src={"/hybridwork.png"} width={500} height={500} alt="work" />
        </div>
      </div>
    </>
  );
};

export default WorkTogether;
