import React, { useEffect, useState } from "react";
import "./Homepage.css";
import Image from "next/image";
import { PiArrowLineUpRightBold } from "react-icons/pi";
import { FaRegCircleDot } from "react-icons/fa6";
import GetStartedModal from "@/components/component/GetStartedModal";

const HomeBanner = () => {
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      // Adjust the scroll value as needed
      setShowFloatingButton(true);
    } else {
      setShowFloatingButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="new_home_banner flex items-center justify-center w-full h-full border-t border-gray-50 relative z-10">
        <div className="banner_image mx-auto">
          <Image
            src={"/bg_circular.png"}
            alt="bg"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="side_content_1">
          {/* block1 */}
          <div className="absolute lg:top-[35%] top-[25%] left-8 2xl:left-[15%] flex justify-between items-center gap-8">
            <div className="flex items-center bg-gradient-to-b from-[#99A6D5] to-[#5B75FE] rounded-full lg:p-2 p-1 lg:w-[300px] w-[150px] cursor-pointer">
              <span className="relative inline-block bg-[#FBF1DD] p-1 rounded-full">
                <img
                  className="lg:h-8 h-4 lg:w-8 w-4 p-1"
                  src="/hero1.png"
                  alt="Dan_Abromov"
                />
              </span>
              <div className="mx-2 text-white text-start flex-1">
                <div className="lg:text-sm text-[8px]">CV Studio</div>
                <div className="lg:text-[10px] text-[6px] text-wrap lg:w-[80%] w-full">
                  Write the CV that gets you the dream job
                </div>
              </div>
              <div className="text-white mr-3">
                <PiArrowLineUpRightBold className="lg:text-xl text-[10px]" />
              </div>
            </div>
            <div className="image_icon lg:block hidden">
              <img src="/card-circle.png" alt="card" />
            </div>
          </div>
          {/* block2 */}
          <div className="absolute lg:top-[60%] top-[25%] 2xl:left-[18%] lg:left-10 right-10 flex justify-between items-center gap-8">
            <div className="flex items-center bg-gradient-to-b from-[#99A6D5] to-[#5B75FE] rounded-full lg:p-2 p-1 lg:w-[300px] w-[150px] cursor-pointer">
              <span className="relative inline-block bg-[#c4e8c7] p-1 rounded-full">
                <img
                  className="lg:h-10 h-4 lg:w-10 w-4 p-1"
                  src="/hero3.png"
                  alt="Dan_Abromov"
                />
              </span>
              <div className="mx-2 text-white text-start flex-1">
                <div className="lg:text-sm text-[8px]">Career Coaching</div>
                <div className="lg:text-[10px] text-[6px] text-wrap">Expert Advice 24*7</div>
              </div>
              <div className="text-white mr-3">
                <PiArrowLineUpRightBold className="lg:text-xl text-[10px]" />
              </div>
            </div>
            <div className="image_icon lg:block hidden">
              <img src="/card-circle.png" alt="card" />
            </div>
          </div>
        </div>
        {/* banner Content  */}
        <div className="banner_content absolute text-center space-y-4">
          <h1 className="lg:text-6xl text-3xl font-semibold text-white">
            Super Charge your{" "}
          </h1>
          <h1 className="lg:text-6xl text-3xl font-semibold text-white">
            Career Potential
          </h1>
          <p className="lg:w-[30%] w-[60%] mx-auto lg:text-base text-sm text-white">
            We have a passion to mentor you on your entire career path, help you
            realise what you want to do, how to get into that career and utilize
            experts to guide you on how to excel within it.
          </p>
          <p className="text-white">Let’s walk this path together</p>
          <div className="flex justify-center mt-5">
            <div className="button_wrapper">
              <button className="get_start_btn" onClick={handleButtonClick}>
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
        <div className="side_content_2">
          {/* block1 */}
          <div className="absolute lg:top-[35%] top-[72%] 2xl:right-[15%] right-6 flex justify-between items-center gap-8">
            <div className="image_icon lg:block hidden">
              <img src="/card-circle.png" alt="card" />
            </div>
            <div className="flex items-center bg-gradient-to-b from-[#99A6D5] to-[#5B75FE] rounded-full lg:p-2 p-1 lg:w-[300px] w-[150px] cursor-pointer">
              <span className="relative inline-block bg-[#FBF1DD] p-1 rounded-full">
                <img
                  className="lg:h-8 h-4 lg:w-8 w-4 p-1"
                  src="/hero2.png"
                  alt="Dan_Abromov"
                />
              </span>
              <div className="mx-2 text-white text-start flex-1">
                <div className="lg:text-sm text-[8px]">AI Career Coaching</div>
                <div className="lg:text-[10px] text-[6px] text-wrap">
                  What career is best for you
                </div>
              </div>
              <div className="text-white mr-3">
                <PiArrowLineUpRightBold className="lg:text-xl text-[10px]" />
              </div>
            </div>
          </div>
          {/* block2 */}
          <div className="absolute lg:top-[60%] top-[72%] 2xl:right-[18%] lg:right-10 left-6 flex justify-between items-center gap-8">
            <div className="image_icon lg:block hidden">
              <img src="/card-circle.png" alt="card" />
            </div>
            <div className="flex items-center bg-gradient-to-b from-[#99A6D5] to-[#5B75FE] rounded-full lg:p-2 p-1 lg:w-[300px] w-[150px] cursor-pointer">
              <span className="relative inline-block bg-[#f2c2c2] p-1 rounded-full">
                <img
                  className="lg:h-10 h-4 lg:w-10 w-4 p-1"
                  src="/hero4.png"
                  alt="Dan_Abromov"
                />
              </span>
              <div className="mx-2 text-white text-start flex-1">
                <div className="lg:text-sm text-[8px]">Hire Expert</div>
                <div className="lg:text-[10px] text-[6px] text-wrap">
                  Real life experts available to talk to
                </div>
              </div>
              <div className="text-white mr-3">
                <PiArrowLineUpRightBold className="lg:text-xl text-[10px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && <GetStartedModal onClose={handleCloseModal} />}
    </>
  );
};

export default HomeBanner;
