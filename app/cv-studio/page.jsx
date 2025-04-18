/** @format */

"use client";
import React, { useEffect } from "react";
import WorkTogether from "@/components/component/WorkTogether";
import GetStartedModal from "@/components/component/GetStartedModal";
import a1 from "../../public/animations/a1.json";
import a2 from "../../public/animations/a2.json";
import a3 from "../../public/animations/a3.json";
import { default as dynamicImport } from "next/dynamic";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Lottie = dynamicImport(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div className="h-[200px] animate-pulse bg-gray-200" />,
});

export const dynamic = "force-dynamic";
export const dynamicParams = false;

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

  useEffect(() => {
    // document operations here
  }, []);

  return (
    <>
      <section
        className="flex lg:items-center items-start pb-0 justify-center  w-full pt-24 md:pt-16 lg:pt-40  px-5 relative"
        id="free"
      >
        <div className="container ">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 md:mb-1">
            <span className="text-[#f76918]">FREE JOB AI Pro CV Studio,</span>{" "}
            Your Automated Resume Builder!
          </h1>
          <h2 className="text-center text-gray-500 text-sm md:text-lg mb-6 md:mb-10">
            Build tailored CVs and reach out to potential employers with
            confidence
          </h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10">
              {cvStudio.map((animation, index) => (
                <div key={index}>
                  <div className="max-w-[400px] min-h-[250px] h-[400px] rounded-md border flex flex-col justify-between">
                    <Lottie
                      animationData={animation?.image}
                      loop={true}
                      autoplay={true}
                      style={{
                        height: 200,
                        width: "100%",
                      }}
                    />
                    <div className="p-4 text-center">
                      <h3 className="text-2xl font-semibold">
                        {animation?.title}
                      </h3>
                      <p className="my-1 text-sm text-gray-600">
                        {animation?.description}
                      </p>
                    </div>
                    <div className="pl-4 pr-4 pb-4">
                      <Link
                        href={animation?.link}
                        className="mt-auto block w-[60%] mx-auto rounded-sm bg-[#f76918] hover:bg-blue-800 p-3 text-sm font-semibold text-white shadow-sm text-center"
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

export default CVStudioPage;
