"use client";
import { LinkBreak1Icon } from "@radix-ui/react-icons";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../context/AuthContext";
import "./header.css";

const Header = () => {
  const { userlogout, userState } = useContext(AuthContext);

  const {} = userState;
  const router = useRouter();
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
            <a href="/" className="flex items-center gap-2">
              <Image
                src={"/genies career hub logo.png"}
                width={100}
                height={100}
                alt="newlogo"
                className=" h-12 w-auto object-contain"
              />
            </a>
          </div>
          <input type="radio" name="slider" id="menu-btn" />
          <input type="radio" name="slider" id="close-btn" />
          <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn">
              <MdOutlineClose />
            </label>
            {/* Resume Navs  */}
            <li>
              <a
                href="#"
                className="desktop-item hover:font-bold text-blue-950 text-base nav-link-grow-up"
              >
                CV Studio
              </a>
            </li>
            <li>
              <a
                href="#"
                className="desktop-item hover:font-bold text-blue-950 text-base nav-link-grow-up"
              >
                CV Analyzer
              </a>
            </li>
            {/* FeedBack  */}
            <li>
              <a className="hover:font-bold text-blue-950 text-base" href="#">
                Job-Fit CV
              </a>
            </li>
            <li>
              <a className="hover:font-bold text-blue-950 text-base" href="#">
                Career Coaching
              </a>
            </li>
            <li>
              <a
                className=" text-blue-950 text-base hover:font-bold"
                href="https://www.careergenies.co.uk/blog"
                target="_blank"
              >
                Blog
              </a>
            </li>
            {/* Auth buttons  */}
          </ul>
          <ul>
            <li>
              <div className="auths_button ml-2">
                <button
                  className="border-2 text-blue-950 border-gray-500 text-sm hover:cursor-pointer hover:bg-blue-950 hover:border-blue-950 hover:text-white px-6 py-1 "
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
