import React, { useEffect, useRef } from "react";
import "./Homepage.css";
import a1 from "../../../public/animations/a1.json";
import a2 from "../../../public/animations/a2.json";
import a3 from "../../../public/animations/a3.json";
import Lottie from "lottie-react";

const HomeBanner = ({ setShowModal, showModal }) => {
  const descriptions = [
    {
      title: "CV Creator",
      description:
        "Create your CV with professional templates, powered by Artificial Intelligence.",
      image: "/cvgenerator.png",
    },
    {
      title: "CV Optimiser",
      description:
        "Analyse your resume with AI and optimise it for your desired Job Profile.",
      image: "/choice-worker-concept-illustrated.png",
    },
    {
      title: "CV Match",
      description:
        "Assess your personality traits and cognitive abilities to find the best career path.",
      image: "/find-career-path.png",
    },
    {
      title: "Career Counselling",
      description:
        "Create your CV with professional templates, powered by Artificial Intelligence.",
      image: "/identify-skill-gap.png",
    },
    {
      title: "Pschycometric Test",
      description:
        "Analyse your resume with AI and optimise it for your desired Job Profile.",
      image: "/take-personality-test.png",
    },
    {
      title: "Hire Coach",
      description:
        "Assess your personality traits and cognitive abilities to find the best career path.",
      image: "/vetted.png",
    },
    {
      title: "Skill Advancement",
      description:
        "Create your CV with professional templates, powered by Artificial Intelligence.",
      image: "/leadership.png",
    },
    {
      title: "Job Transition",
      description:
        "Analyse your resume with AI and optimise it for your desired Job Profile.",
      image: "/jobtransition.png",
    },
    {
      title: "Professional Refinement",
      description:
        "Assess your personality traits and cognitive abilities to find the best career path.",
      image: "/perfomance.png",
    },
    {
      title: "Career Development",
      description:
        "Assess your personality traits and cognitive abilities to find the best career path.",
      image: "/careergrowth.png",
    },
  ];

  const repeatedDescriptions = [
    ...descriptions,
    ...descriptions,
    ...descriptions,
    ...descriptions,
  ];

  const handleButtonClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="container 2lg:px-10 lg:px-5 mx-auto grid lg:grid-cols-2 grid-cols-1 w-full h-full place-items-center place-content-center">
        <div className="banner_content text-center space-y-4 lg:mt-20">
          <h1 className="2xl:text-6xl lg:text-5xl text-3xl font-semibold text-black">
            Super Charge your{" "}
          </h1>
          <h1 className="lg:text-6xl text-3xl font-semibold bg-gradient-to-r from-blue-900  to-cyan-600 inline-block text-transparent bg-clip-text">
            Career Potential
          </h1>
          <p className="lg:w-[80%] w-[60%] mx-auto lg:text-base text-sm text-black font-medium">
            We have a passion to mentor you on your entire career path, help you
            realise what you want to do, how to get into that career and utilize
            experts to guide you on how to excel within it.
          </p>
          <p className="text-white">Let’s walk this path together</p>
          <div className="flex justify-center mt-5">
            <div className="button_wrapper" onClick={handleButtonClick}>
              <button className="get_start_btn">
                <span className="btn_text">Explore Now</span>
                <div className="btn_overlay">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="card_scroll lg:flex gap-5 hidden">
          <div className="infinite-slide">
            <div className="card-container">
              {repeatedDescriptions.map((item, index) => (
                <div
                  key={index}
                  className="card glass-card max-w-xs border-2 border-gray-200 rounded-xl shadow flex flex-col my-5 items-center hover:shadow-blue-500/50 transition-shadow duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ height: 200, width: "100%" , objectFit:"contain"}}
                  />
                  <div className="py-5 px-3 border-t-2 border-gray-200 bg-white text-white rounded-b-lg flex flex-col justify-between">
                    <div>
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                        {item.title}
                      </h5>
                      <p className="mb-3 font-normal text-sm text-gray-700">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="infinite-slide">
            <div className="card-container-reverse">
              {repeatedDescriptions.map((item, index) => (
                <div
                  key={index}
                  className="card glass-card max-w-xs border-2 border-gray-200 rounded-xl shadow flex flex-col my-5 items-center hover:shadow-blue-500/50 transition-shadow duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ height: 200, width: "100%" }}
                  />
                  <div className="py-5 px-3 border-t-2 border-gray-200 bg-white text-white rounded-b-lg flex flex-col justify-between">
                    <div>
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                        {item.title}
                      </h5>
                      <p className="mb-3 font-normal text-sm text-gray-700">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
