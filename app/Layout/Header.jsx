"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FiBox,
  FiCamera,
  FiColumns,
  FiFeather,
  FiLayout,
  FiMessageSquare,
  FiPenTool,
  FiUsers,
} from "react-icons/fi";
import { AiOutlineFileText } from "react-icons/ai";
import {
  MdOutlineClose,
  MdOutlineKeyboardArrowDown,
  MdOutlineMenu,
} from "react-icons/md";
import "./header.css";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const TOP_OFFSET = 50;
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  const isActiveLink = (path) => (pathname === path ? "active-link" : "");

  return (
    <div
      className={`mobile_responsive_nav ${
        showBackground ? "mobile_black" : "mobile_white"
      }`}
      suppressHydrationWarning
    >
      <nav
        className={`py-1 border-b-2 mobile_responsive_nav ${
          showBackground ? "mobile_black" : "mobile_white"
        }`}
      >
        <div className="wrapper">
          <div className="logo">
            <Link href="/" className="flex items-center gap-2">
              <Image
                priority="true"
                src={"/genies-career-hub-logo.png"}
                width={100}
                height={100}
                alt="newlogo"
                className="logo-image"
              />
            </Link>
          </div>
          <input type="radio" name="slider" id="menu-btn" />
          <input type="radio" name="slider" id="close-btn" />
          <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn">
              <MdOutlineClose />
            </label>
            {/* Resume Navs  */}
            <li>
              <Link
                href="/resume"
                className={`desktop-item hover:font-bold text-blue-950 text-base nav-link-grow-up ${isActiveLink(
                  "/resume"
                )}`}
                prefetch={false}
              >
                CV Creator
              </Link>
            </li>
            <li>
              <Link
                href="/resume-analyzer"
                className={`desktop-item hover:font-bold text-blue-950 text-base nav-link-grow-up ${isActiveLink(
                  "/resume-analyzer"
                )}`}
                prefetch={false}
              >
                CV Optimiser
              </Link>
            </li>
            <li>
              <Link
                className={`hover:font-bold text-blue-950 text-base ${isActiveLink(
                  "/job-cv"
                )}`}
                href="/job-cv"
                prefetch={false}
              >
                CV Match
                <span className="text-sm font-bold ml-1 text-black">
                  (beta)
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/recruiter/auth/signin"
                className={`desktop-item hover:font-bold text-blue-950 text-base nav-link-grow-up ${isActiveLink(
                  "/recruiter/auth/signin"
                )}`}
                prefetch={false}
              >
                For Recruiters
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <div className="auths_button ml-2">
                <button
                  className="border-2 text-blue-950 border-gray-500 text-sm hover:cursor-pointer hover:bg-[#f76918] hover:border-blue-950 hover:text-white px-6 py-1 "
                  onClick={handleLogin}
                >
                  <span>Sign In</span>
                </button>
              </div>
            </li>
          </ul>
          <label htmlFor="menu-btn" className="btn menu-btn">
            <MdOutlineMenu className="text-black" />
          </label>
        </div>
      </nav>
    </div>
  );
};

export default Header;
