"use client";
import Form from "@/components/component/form";
import React, { useEffect, useState } from "react";
import ResumeViewPage from "../resume-viewer/ResumeViewer";
import MobileResumeViewPage from "@/components/resume-templates/MobileResumeViewPage";
import { IoDocumentOutline } from "react-icons/io5";
import FloatingSaveIcon from "@/components/ui/FloatingSaveIcon";

function Builder() {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileContent, setMobileContent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleMobileContent = () => {
    // setIsMobile(false);
    setMobileContent(true);
    setIsOverlayOpen(!isOverlayOpen);
  };

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = window.innerWidth <= 768; // Adjust this value based on your definition of "mobile"
      setIsMobile(isMobileDevice);
      setMobileContent(false);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollBottom =
        document.documentElement.scrollHeight -
        window.innerHeight -
        window.scrollY;

      if (scrollTop < 100 || scrollBottom < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex md:flex-row flex-col w-full h-full relative ">
        <div className="lg:w-1/2 md:w-full w-full  h-full overflow-auto ">
          <Form />
          {
            <div
              className={`${
                isVisible ? "visibleButton" : "hiddenButton"
              }mobile_section flex justify-end mb-10 mx-10 fixed bottom-0 right-0 transition-all ease-in-out`}
            >
              <div>
                {isMobile && (
                  <button
                    className="p-3 bg-black text-white rounded-full flex items-center text-base justify-center"
                    onClick={handleMobileContent}
                  >
                    {isVisible && <span className="text-sm mr-2">Preview and Download </span>}
                    <IoDocumentOutline className="text-white w-5 h-5 text-xl inline" />
                  </button>
                )}
              </div>
              <div>
                {mobileContent && (
                  <MobileResumeViewPage
                    scale={scale}
                    isOverlayOpen={isOverlayOpen}
                    setIsOverlayOpen={setIsOverlayOpen}
                  />
                )}
              </div>
            </div>
          }
        </div>
        <div
          className="resume_viewer md:w-1/2 w-full h-screen overflow-hidden lg:fixed lg:right-0 lg:block hidden"
          style={{
            background: `url(bigbg.svg)`,
            backgroundPosition: "bottom",
          }}
        >
          <ResumeViewPage />
          <FloatingSaveIcon  />
        </div>
      </div>
    </>
  );
}

export default Builder;
