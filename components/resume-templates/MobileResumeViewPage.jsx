"use client";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import { GetTemplate } from "@/components/resume-templates/GetTemplate";
import { AuthContext } from "@/app/context/AuthContext";
import { deleteCookie } from "cookies-next";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LiaTimesSolid } from "react-icons/lia";
import axios from "axios";
import { useResumeStore } from "@/app/store/ResumeStore";

const ResumeViewPage = ({
  resumeData,
  setResumeData,
  isOverlayOpen,
  setIsOverlayOpen,
}) => {
  const containerRef = useRef();
  const [scale, setScale] = useState(0.5);
  const dropdownRef = useRef(null);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsToggleOpen(false);
    }
  };

  const handleDownloadResume = async () => {
    const el = document.getElementById("resume");
    const resume = el.innerHTML;
    const body = {
      html: resume,
    };
    setIsLoading(true);

    try {
      const response = await axios.post("/api/printResume", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer",
      });
      if (response.status === 200) {
        generateFunfact();
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "generated.pdf";
        link.click();
        return;
      }
    } catch (error) {
      if (
        error?.response?.status === 403 &&
        res.message === "You are not eligible for this feature"
      ) {
        toast.info("Subscribe to Genies Pro Suite to download your CV.", {
          autoclose: 3000,
        });
        updateRedirectPricingRoute("/resume-builder");
        return router.push("/pricing?scroll=1");
      }

      if (
        error?.response?.status === 403 &&
        res.message === "Your download CV tokens have expired"
      ) {
        toast.info("Your plan validity has expired.", { autoclose: 3000 });
        return router.push("/pricing?scroll=1");
      }
      if (
        error?.response?.status === 403 &&
        res.message === "You have no download CV tokens"
      ) {
        setIsServiceDialogOpen(true);
      }
      if (error?.response?.status === 500) {
        toast.error("Error downloading your CV , Please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateChange = (val) => {
    const updatedResumeData = {
      ...resumeData,
      metadata: {
        ...resumeData.metadata,
        template: val,
      },
    };
    setResumeData(updatedResumeData);
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const aspectRatio = 297 / 210;

        if (containerWidth / containerHeight > aspectRatio) {
          setSize({
            width: containerHeight * (210 / 297),
            height: containerHeight,
          });
        } else {
          setSize({
            width: containerWidth,
            height: containerWidth * (297 / 210),
          });
        }
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const pageSizeMap = {
    a4: {
      width: 210,
      height: 297,
    },
    letter: {
      width: 216,
      height: 279,
    },
  };

  const MM_TO_PX = 3.78;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 ${isOverlayOpen ? "block" : "hidden"}`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
      ></div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isOverlayOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-center items-center w-full h-screen overflow-hidden">
          <div>
            <div className="actions_button bg-slate-100 p-1 flex flex-row 2xl:justify-evenly 2xl:p-2 justify-evenly items-center fixed top-0 left-0 w-full h-[50px] z-20">
              <div className="auth_section flex justify-between w-full gap-10 items-center">
                <button
                  className="2xl:p-3 md:p-2 text-sm p-2 bg-[#f76918] text-white disabled:bg-gray-600 font-semibold 2xl:text-sm md:text-sm text-[12px] flex items-center justify-around rounded-md"
                  onClick={handleDownloadResume}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Download PDF
                </button>
                <div>
                  <LiaTimesSolid
                    className="text-xl text-black mr-5 font-semibold cursor-pointer"
                    onClick={() => setIsOverlayOpen(false)}
                  />
                </div>
              </div>
            </div>
            <div>
              <div
                className="shadow-2xl"
                style={{
                  scale: `${scale}`,
                  background: "black",
                }}
              >
                <div
                  id="resume"
                  className={cn("relative bg-white")}
                  style={{
                    width: `${pageSizeMap["a4"].width * MM_TO_PX}px`,
                    height: `${pageSizeMap["a4"].height * MM_TO_PX}px`,
                    overflow: "hidden",
                    overflowY: "scroll",
                  }}
                >
                  <GetTemplate
                    name={resumeData?.metadata?.template}
                    resumeData={resumeData}
                  />
                  <div className="absolute z-10  bottom-2 right-5 text-gray-500">
                    <p>@Career Genies Hub</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeViewPage;
