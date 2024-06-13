import React, { useEffect, useState } from "react";
import a1 from "../../public/animations/a1.json";
import a2 from "../../public/animations/a2.json";
import a3 from "../../public/animations/a3.json";
import Lottie from "lottie-react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import "./getStarted.css"; // Import the CSS file

const GetStartedModal = ({ onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // Delay to match the transition duration
  };

  const animations = [a1, a2, a3];
  const descriptions = [
    {
      title: "CV Studio",
      description: "Create stunning resumes tailored to your job search.",
    },
    {
      title: "CV Analyzer",
      description: "Optimize your resume to get past ATS systems.",
    },
    {
      title: "Job Fit CV",
      description: "Customize your CV to match the job you're applying for.",
    },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-8 z-50 transition-transform duration-300 transform ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Modal content */}
        <h1 className="text-3xl font-bold text-center mb-1">
          Use the best <span className="text-blue-500">CV</span> generator tool
        </h1>
        <p className="text-center text-gray-500 text-lg mb-10">
          You can reach your dream job faster with Genies Career Hub
        </p>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 ">
            {animations.map((animation, index) => (
              <div
                key={index}
                className="card glass-card max-w-xs border-2  border-gray-200 rounded-xl shadow flex flex-col items-center hover:shadow-blue-500/50 transition-shadow duration-300"
              >
                <Lottie
                  animationData={animation}
                  loop={true}
                  autoplay={true}
                  style={{ height: 200, width: "100%" }}
                />
                <div className="p-5 border-t-2 border-gray-200 bg-white text-white rounded-b-lg">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    {descriptions[index].title}
                  </h5>
                  <div className="flex justify-between items-center">
                    <p className="mb-3 font-normal text-sm text-gray-700">
                      {descriptions[index].description}
                    </p>
                    <a href="#" className="read-more-button">
                      Try
                      <FaArrowAltCircleRight className="arrow-icon w-3.5 h-3.5 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStartedModal;
