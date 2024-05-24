'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserStore } from "../store/UserStore";

export default function ResumeHeader() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const dropdownRef = useRef(null);
  const logoutUser = UserStore((state) => state.logoutUser)
  const handleLogout = () => {
    logoutUser();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsToggleOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/*<!-- Header --> */}
      <header className="sticky top-0 border-b-1 z-20 w-full border-b border-slate-200 bg-[#fafbfd]    border border-b-[#fafbfd] shadow-lg shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-[80rem] 2xl:max-w-[82rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[4rem] p-5 items-center justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <a href="/" className="flex items-center gap-2">
              <Image
                src={"/gch_logo.png"}
                width={30}
                height={30}
                alt="newlogo"
                className="w-50 h-auto object-contain"
              />
              <span className="text-black font-bold text-2xl">Genies Career Hub</span>
            </a>
            <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
              {/* Avatar with Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsToggleOpen(!isToggleOpen)}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white focus:outline-none"
                >
                  <Image
                    src="/avatar.jpg"
                    alt="user name"
                    title="user name"
                    width={40}
                    height={40}
                    className="max-w-full rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 p-1 text-sm text-white">
                    <span className="sr-only"> 7 new emails </span>
                  </span>
                </button>
                {/* Dropdown */}
                {isToggleOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Settings
                      </a>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        role="menuitem"
                        onClick={handleLogout}
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* End Avatar with Dropdown */}
            </div>
          </nav>
        </div>
      </header>
      {/*<!-- End Navbar with Avatar--> */}
    </>
  );
}
