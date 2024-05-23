"use client";
import Template3 from "@/components/resume-templates/Template3";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { printResume } from "@/app/pages/api/api";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { GetTemplate } from "@/components/resume-templates/GetTemplate";
import { AuthContext } from "@/app/context/AuthContext";
import { deleteCookie } from "cookies-next";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LiaTimesSolid } from "react-icons/lia";


const ResumeViewPage = ({ resumeData, setResumeData ,isOverlayOpen,setIsOverlayOpen}) => {
  const containerRef = useRef();
  const [scale,setScale] = useState(0.5)
  const { userState, userlogout } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const handleLogout = () => {
    if (userState?.isAuthenticated) {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      toast.success("User logout successfully", {
        position: "top-right",
      });
      userlogout();
      router.push("/");
    }
  };

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
      const response = await printResume(body);
      if (response.ok) {
        const blob = await response.blob(); // Get response body as blob
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "generated.pdf";
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log(error);
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
        className={`fixed inset-0 z-50 ${isOverlayOpen ? 'block' : 'hidden'}`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
      ></div>
       <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOverlayOpen ? 'block' : 'hidden'}`}>
       <div className="flex justify-center items-center w-full h-screen overflow-hidden">
        <div>
          <div className="actions_button bg-slate-100 p-1 flex flex-row 2xl:justify-evenly 2xl:p-2 justify-evenly items-center fixed top-0 left-0 w-full h-[50px] z-20">
            <div className="auth_section flex justify-between w-full gap-10 items-center">
              <button
                className="2xl:p-3 md:p-2 text-sm p-2 bg-blue-900 text-white disabled:bg-gray-600 font-semibold 2xl:text-sm md:text-sm text-[12px] flex items-center justify-around rounded-md"
                onClick={handleDownloadResume}
                disabled={isLoading}
              >
                {isLoading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Download PDF
              </button>
              <div>
                <LiaTimesSolid className="text-xl text-black mr-5 font-semibold cursor-pointer" onClick={()=>setIsOverlayOpen(false)}/>
              </div>
            </div>
          </div>
          <div>
            <div className="shadow-2xl" style={{
              scale:`${scale}`,
              background:"black"
            }}>
              <div
                id="resume"
                className={cn("relative bg-white")}
                style={{
                  width: `${pageSizeMap["a4"].width * MM_TO_PX}px`,
                  height: `${pageSizeMap["a4"].height * MM_TO_PX}px`,
                  overflow: "hidden",
                  overflowY:"scroll"
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
