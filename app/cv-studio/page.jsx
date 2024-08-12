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
      description:
        "Create your CV with professional templates, powered by Artificial Intelligence.",
      link: "/resume",
    },
    {
      title: "CV Optimiser",
      description:
        "Analyse your resume with AI and optimise it for your desired Job Profile.",
      link: "/resume-analyzer",
    },
    {
      title: "CV Match",
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20">
            {cvStudio.map((animation, index) => (
              <div className="w-[300px] min-h-[300px] rounded-md border">
                <img
                  src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                  alt="Laptop"
                  className="h-[200px] w-full rounded-md object-cover"
                />
                <div className="p-4">
                  <h1 className="text-lg font-semibold">{animation?.title}</h1>
                  <p className="mt-3 mb-3 text-sm text-gray-600">
                    {animation?.description}
                  </p>
                  <Link
                    href={"/"}
                    className="mt-5 rounded-sm bg-blue-950 px-3 py-2 text-[10px] font-semibold text-white shadow-sm"
                  >
                    Learn Morwe
                  </Link>
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
