"use client";
import React, { useEffect, useRef, useState } from "react";
import ResumeForm from "./ResumeForm";
import ResumeView from "./ResumeView";
import Link from "next/link";
import { MdDownload, MdLogout, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Image from "next/image";
import { useUserStore } from "../store/UserStore";
import ContentDialog from "./ContentDialog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RemoveTokens } from "../actions";
import { toast } from "react-toastify";
import { IoSettingsOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";

const ResumeBuilderPage = () => {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const { userState } = useUserStore((state) => state);
  const logoutUser = useUserStore((state) => state.logoutUser);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const userdata = userState?.userdata || {}; // Ensure userdata is defined
  const userImage =
    userdata?.profilePicture || "https://via.placeholder.com/150";

  const handleLogout = async () => {
    await RemoveTokens();
    toast.success("User logout successfully", {
      position: "top-right",
    });
    logoutUser();
    router.push("/");
  };

  const handlePreviewClick = () => {
    setIsContentVisible(true);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop === 0 || scrollTop + clientHeight >= scrollHeight) {
      setShowText(true);
      setIsAnimating(true);
    } else {
      setShowText(false);
      setIsAnimating(false);
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
      <div className="flex md:flex-row flex-col w-full h-full relative">
        <div className="actions_button bg-gray-100 p-1 flex flex-row 2xl:justify-evenly 2xl:p-2 justify-evenly items-center fixed top-0 left-0 w-full h-[50px] z-20">
          <div className="w-full mx-[40px] flex flex-row lg:justify-between lg:mt-0 mt-3 justify-end items-center">
            <div className="header_section w-full md:block hidden">
              <Button
                onClick={() => router.back()}
                className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-blue-950 px-8 py-1 rounded-md font-medium text-white bg-white shadow-md transition duration-300 ease-out"
              >
                <span className="ease absolute inset-0 flex h-full w-full translate-x-full items-center justify-center bg-blue-950 text-white duration-300 group-hover:translate-x-0">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </span>
                <span className="ease absolute flex h-full w-full text-sm transform items-center justify-center text-blue-950 font-bold transition-all duration-300 group-hover:-translate-x-full">
                  Back
                </span>
                <span className="invisible relative text-blue-900 font-bold">
                  Back
                </span>
              </Button>
            </div>
            <div className="profile_section">
              <div className="ml-auto flex items-center px-6 lg:ml-4 lg:p-0">
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsToggleOpen(!isToggleOpen)}
                    className="relative inline-flex h-[2.4rem] w-10 items-center justify-center rounded-full text-white focus:outline-none"
                  >
                    <img
                      src={
                        userImage ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
                      }
                      alt="user-name"
                      title="user-name"
                      className="w-full h-full rounded-full object-cover p-1 border-2 border-blue-800 "
                    />
                    <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 p-1 text-sm text-white">
                      <span className="sr-only"> 7 new emails </span>
                    </span>
                  </button>
                  {isToggleOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <div className="py-1" role="none">
                        <Link
                          href="/settings/profile"
                          className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          role="menuitem"
                        >
                          <IoSettingsOutline className="mr-2" />
                          Settings
                        </Link>
                        <div
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          role="menuitem"
                          onClick={handleLogout}
                        >
                          <MdLogout className="mr-2" />
                          Logout
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[50%] w-full h-full overflow-auto forms_section">
          <ResumeForm />
        </div>
        <div className="lg:w-[50%] w-full h-screen overflow-hidden resume_templates_section lg:fixed top-0 lg:right-0 lg:block hidden">
          <ResumeView setIsContentVisible={setIsContentVisible} />
        </div>
        <div
          className={`preview_button bg-blue-950 text-white fixed bottom-10 right-5 p-3 rounded-full lg:hidden block cursor-pointer transition-all duration-300`}
          onClick={handlePreviewClick}
        >
          <span
            className={`text-sm ${showText
              ? "bgNdnL"
              : "epiSoF"
              }`}
          >
            Preview and Download
          </span>
          <MdDownload className="text-xl inline-flex mx-1 animate-bounce" />
        </div>
        <ContentDialog
          isContentVisible={isContentVisible}
          setIsContentVisible={setIsContentVisible}
        />
      </div>
    </>
  );
};

export default ResumeBuilderPage;
