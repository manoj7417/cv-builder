import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoArrowRight } from "react-icons/go";

const WorkTogether = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-[#e4f5fc] to-[white] ">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 place-items-center py-10">
          <div className="work-content lg:px-2 px-10">
            <h2 className="text-blue-900 lg:text-5xl text-2xl font-bold">
              Connect with Us,
              <br /> Join the Community
            </h2>
            <p className="text-sm mt-3 w-3/4 text-[#7C7C7C]">
              Is your job helping others to find a job? Connect with Us and
              explore better opportunities as a Career Coach with the Genies
              Career Hub!
            </p>
            <div className="learn-more flex gap-1 items-center mt-5">
              <Link
                className="text-blue-400 underline underline-offset-8"
                href={"/contact-us"}
              >
                Learn More
              </Link>
              <GoArrowRight className="text-blue-400" />
            </div>
          </div>
          <div className="work_image lg:px-2 px-8">
            <Image
              src={"/hybridwork.png"}
              width={500}
              height={500}
              alt="work"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkTogether;
