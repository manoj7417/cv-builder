"use client";
import React from "react";
import WorkTogether from "@/components/component/WorkTogether";
import GetStartedModal from "@/components/component/GetStartedModal";
import a1 from "../../public/animations/a1.json";
import a2 from "../../public/animations/a2.json";
import a3 from "../../public/animations/a3.json";
import Lottie from "lottie-react";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";

const CVStudioPage = () => {
  const cvStudio = [
    {
      title: "CV Creator",
      image: a1,
      description:
        "Create your CV with professional templates, powered by Artificial Intelligence.",
      link: "/resume",
    },
    {
      title: "CV Optimiser",
      image: a2,
      description:
        "Analyse your resume with AI and optimise it for your desired Job Profile.",
      link: "/resume-analyzer",
    },
    {
      title: "CV Match",
      image: a3,
      description:
        "Assess your personality traits and cognitive abilities to find the best career path.",
      current: false,
      link: "/job-cv",
    },
  ];

  return (
    <>
      <section className="mt-40">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 md:mb-1">
          <span className="text-[#2C98CA]">Genies Pro CV Studio,</span> Your
          Automated Resume Builder!
        </h1>
        <p className="text-center text-gray-500 text-sm md:text-lg mb-6 md:mb-10">
          Build tailored CVs and reach out to potential employers with
          confidence.
        </p>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10">
            {cvStudio.map((animation, index) => (
              <div key={index}>
                <div className="w-[400px] min-h-[450px] h-[400px] rounded-md border flex flex-col justify-between">
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
                      className="mt-auto block w-[60%] mx-auto rounded-sm bg-blue-950 hover:bg-blue-800 p-3 text-sm font-semibold text-white shadow-sm text-center"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WorkTogether />
    </>
  );
};

export default CVStudioPage;
