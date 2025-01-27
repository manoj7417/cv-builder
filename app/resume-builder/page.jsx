"use client";
import React, { useEffect, useRef, useState } from "react";
import ResumeForm from "./ResumeForm";
import ResumeView from "./ResumeView";
import Link from "next/link";
import {
  MdDownload,
  MdLogout,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import Image from "next/image";
import { useUserStore } from "../store/UserStore";
import ContentDialog from "./ContentDialog";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RemoveTokens } from "../actions";
import { toast } from "react-toastify";
import { IoSettingsOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { LogOut, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useResumeStore } from "../store/ResumeStore";
import { signOut } from "next-auth/react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaUserLarge } from "react-icons/fa6";
import { default as DynamicImport } from "next/dynamic";
import ClientOnly from '@/app/components/ClientOnly'

export const dynamic = 'force-dynamic'
export const dynamicParams = false

const ResumeBuilder = () => {
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
  const searchParams = useSearchParams();
  const newResume = searchParams.get("newresume");
  const [showDialog, setShowDialog] = useState(newResume || false);
  const { clearResumeData } = useResumeStore((state) => state);
  const handleLogout = async () => {
    await RemoveTokens();
    await signOut({ redirect: false });
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
    const scrollHeight = window.innerHeight;
    const clientHeight = window.innerHeight;

    if (scrollTop === 0 || scrollTop + clientHeight >= scrollHeight) {
      setShowText(true);
      setIsAnimating(true);
    } else {
      setShowText(false);
      setIsAnimating(false);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleStartResumeFromScratch = () => {
    clearResumeData();
    setShowDialog(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ClientOnly>
      {/* <Dialog open={showDialog}>
        <DialogContent showCloseButton={true} onClick={handleCloseDialog}>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>

            </DialogDescription>
            <div className="flex flex-col items-center">
              <Button onClick={() => setShowDialog(false)}>Continue with dummy data</Button>
              <div className="flex w-full py-5 items-center justify-center">
                <hr className="w-1/3 bg-blue-900" /><p className="px-5">OR</p><hr className="w-1/3 bg-blue-900" />
              </div>
              <Button onClick={handleStartResumeFromScratch}>
                Start from scratch
              </Button>

            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}
      <div className="flex md:flex-row flex-col w-full h-full relative">
        <div className="actions_button bg-gray-100 p-1 flex flex-row 2xl:justify-evenly 2xl:p-2 justify-evenly items-center fixed top-0 left-0 w-full h-[70px] z-20">
          <div className="w-[76rem] mx-[40px] flex flex-row lg:justify-between lg:mt-0 mt-3 justify-end items-center">
            <div className="header_section w-full md:block hidden">
              {/* <Button
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
              </Button> */}
              <div className="inline-flex items-center space-x-2">
                <Link href="/">
                  <Image
                    priority="true"
                    src={"/beta-logo.png"}
                    width={100}
                    height={100}
                    alt="white_logo"
                    className="w-16 h-16 object-contain"
                  />
                </Link>
              </div>
            </div>
            <div className="profile_section">
              {/* <div className="back_icons flex gap-5">
                <div>
                  <RiArrowGoBackFill
                    className="text-blue-950 text-xl cursor-pointer"
                    onClick={() => router.back()}
                  />
                </div>
                <div>
                  <Link href="/user-dashboard" role="menuitem">
                    <FaUserLarge className="text-blue-950 text-xl cursor-pointer" />
                  </Link>
                </div>
                <div>
                  <MdLogout
                    className="text-blue-950 text-xl cursor-pointer"
                    onClick={handleLogout}
                  />
                </div>
              </div> */}
              <div className="back_icons items-center flex gap-5 relative">
                {/* Go Back Icon */}
                <div className="group relative">
                  <RiArrowGoBackFill
                    className="text-blue-950 text-xl cursor-pointer"
                    onClick={() => router.back()}
                  />
                  <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg">
                    Back
                  </span>
                </div>

                {/* User Dashboard Icon */}
                <div className="group relative">
                  <Link href="/user-dashboard" role="menuitem">
                    {/* <FaUserLarge className="text-blue-950 text-xl cursor-pointer" /> */}
                    <img
                      src={
                        userImage ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
                      }
                      alt="user-name"
                      className="w-10 h-7 rounded-full object-cover border-2 border-blue-800 "
                    />
                  </Link>
                  <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg">
                    User
                  </span>
                </div>

                {/* Logout Icon */}
                <div className="group relative">
                  <MdLogout
                    className="text-blue-950 text-xl cursor-pointer"
                    onClick={handleLogout}
                  />
                  <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg">
                    Logout
                  </span>
                </div>
              </div>

              {/* <div className="ml-auto flex items-center px-6 lg:ml-4 lg:p-0">
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
                          href="/user-dashboard"
                          className=" px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          role="menuitem"
                        >
                          <User className=" h-4 mr-2" />
                          Profile
                        </Link>
                        <div
                          className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          role="menuitem"
                          onClick={handleLogout}
                        >
                          <LogOut className=" h-4 mr-2" />
                          Logout
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div> */}
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
          <span className={`text-sm ${showText ? "bgNdnL" : "epiSoF"}`}>
            Preview and Download
          </span>
          <MdDownload className="text-xl inline-flex mx-1 animate-bounce" />
        </div>
        <ContentDialog
          isContentVisible={isContentVisible}
          setIsContentVisible={setIsContentVisible}
        />
      </div>
    </ClientOnly>
  );
};

export default ResumeBuilder;
