import React, { useEffect, useState } from "react";
import a1 from "../../public/animations/a1.json";
import a2 from "../../public/animations/a2.json";
import a3 from "../../public/animations/a3.json";
import dynamic from 'next/dynamic';
import { FaArrowAltCircleRight } from "react-icons/fa";
import "./getStarted.css"; // Import the CSS file
import Link from "next/link";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <p></p>
});

const GetStartedModal = ({ onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling of the background content
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when modal is closed
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // Delay to match the transition duration
  };

  const animations = [a1, a2, a3];
  const descriptions = [
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
      <section>
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleClose}
        />
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 md:p-8 z-[100] transition-transform duration-300 transform ${
            visible ? "translate-y-0" : "translate-y-full"
          } overflow-auto max-h-[80%]`} // Added overflow-auto and max-h-[80%]
        >
          {/* Modal content */}
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
              {animations.map((animation, index) => (
                <div
                  key={index}
                  className="card glass-card max-w-xs border-2 border-gray-200 rounded-xl shadow flex flex-col items-center hover:shadow-blue-500/50 transition-shadow duration-300"
                >
                  <Lottie
                    animationData={animation}
                    loop={true}
                    autoplay={true}
                    style={{ height: 150, width: "100%" }}
                  />
                  <div className="py-3 md:py-5 px-2 md:px-3 border-t-2 border-gray-200 bg-white text-white rounded-b-lg flex flex-col justify-between">
                    <div>
                      <h5 className="mb-2 text-lg md:text-xl font-bold tracking-tight text-gray-900">
                        {descriptions[index]?.title}
                      </h5>
                      <p className="mb-3 font-normal text-sm text-gray-700">
                        {descriptions[index]?.description}
                      </p>
                    </div>
                    <Link
                      href={descriptions[index]?.link}
                      className="read-more-button mt-2 text-sm"
                    >
                      Try Now
                      <FaArrowAltCircleRight className="arrow-icon w-3.5 h-3.5 ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetStartedModal;
