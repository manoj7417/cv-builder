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
              <a href="#" className="desktop-item hover:font-bold text-blue-950 text-base">
                CV Studio
                <IoIosArrowDown className="inline ml-1" />
              </a>

              <input type="checkbox" id="resume" />
              <label htmlFor="resume" className="mobile-item">
                CV
              </label>
              {/* <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <header>CV Templates</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#" className="pointer-events-none">
                          <FiCamera className="inline mr-1 mt-0" />
                          Creative Templates
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pointer-events-none">
                          <FiPenTool className="inline mr-1 mt-0" />
                          Traditional Templates
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pointer-events-none">
                          <FiBox className="inline mr-1 mt-0" />
                          Modern Templates
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pointer-events-none">
                          <FiColumns className="inline mr-1 mt-0" /> Simple
                          Templates
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>CV Writing Guides </header>
                    <ul className="mega-links pointer-events-none">
                      <li>
                        <a href="#">
                          <FiPenTool className="inline mr-1 mt-0" />
                          Writing a CV
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiColumns className="inline mr-1 mt-0" />
                          CV Summary
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiCamera className="inline mr-1 mt-0" />
                          Choosing a CV Format
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiBox className="inline mr-1 mt-0" />
                          Fitting Experience
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>CV Examples</header>
                    <ul className="mega-links pointer-events-none">
                      <li>
                        <a href="#">
                          <FiBox className="inline mr-1 mt-0" />
                          Project Manager
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiCamera className="inline mr-1 mt-0" />
                          Data Scientist
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiColumns className="inline mr-1 mt-0" />
                          Designer
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiPenTool className="inline mr-1 mt-0" />
                          Software Engineer
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>CV Curator</header>
                    <ul className="mega-links pointer-events-none">
                      <li>
                        <a href="#">
                          <FiBox className="inline mr-1 mt-0" />
                          CV Curator
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiCamera className="inline mr-1 mt-0" />
                          CV Checker
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiColumns className="inline mr-1 mt-0" />
                          CV Skills
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiPenTool className="inline mr-1 mt-0" />
                          CV Analayser
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </li>
            {/* Cover Letter  */}
            {/* <li>
              <a href="#" className="desktop-item hover:font-bold text-blue-950 text-base">
                Cover
                <IoIosArrowDown className="inline ml-1" />
              </a>
              <input type="checkbox" id="cover" />
              <label htmlFor="cover" className="mobile-item">
                Cover Letter
              </label>
              <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <header>Cover Letter Writing Guides</header>
                    <ul className="mega-links pointer-events-none">
                      <li>
                        <a href="#">
                          <FiPenTool className="inline mr-1 mt-0" />
                          Writing a Cover Letter
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiColumns className="inline mr-1 mt-0" />
                          Cover Letter Formats
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiPenTool className="inline mr-1 mt-0" />
                          Ending a Cover Letter
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiCamera className="inline mr-1 mt-0" />
                          Cover Letter Design
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Cover Letter Examples</header>
                    <ul className="mega-links pointer-events-none">
                      <li>
                        <a href="#">
                          <FiBox className="inline mr-1 mt-0" />
                          Designer
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiCamera className="inline mr-1 mt-0" />
                          Product Manager
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiColumns className="inline mr-1 mt-0" />
                          Business Analyst
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiPenTool className="inline mr-1 mt-0" />
                          Software Engineer
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Cover Letter Builder</header>
                    <ul className="mega-links pointer-events-none">
                      <li>
                        <a href="#">
                          <FiBox className="inline mr-1 mt-0" />
                          QA Engineer
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiCamera className="inline mr-1 mt-0" />
                          QA Analyst
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiColumns className="inline mr-1 mt-0" />
                          Data Analyst
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiPenTool className="inline mr-1 mt-0" />
                          UI/UX Designer
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li> */}
            {/* Career  */}
            <li>
              <a href="#" className="desktop-item hover:font-bold text-blue-950 text-base">
                CV Analyzer
                <IoIosArrowDown className="inline ml-1" />
              </a>
              <input type="checkbox" id="career" />
              <label htmlFor="career" className="mobile-item">
                Career
              </label>
              {/* <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <header>Career Coaching Services</header>
                    <ul className="mega-links pointer-events-none">
                      <li>
                        <a href="#">
                          <AiOutlineFileText className="inline mr-1" />
                          CV Writing
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiUsers className="inline mr-1" />
                          CV Review
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiFeather className="inline mr-1" />
                          Cover Letter Writing
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiMessageSquare className="inline mr-1" />
                          Interview Prepation
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Career Coaching Guides</header>
                    <ul className="mega-links pointer-events-none">
                      <li>
                        <a href="#">
                          <FiMessageSquare className="inline mr-1" />
                          Job Interview Questions
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiFeather className="inline mr-1" />
                          Job Interview Guides
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Resources</header>
                    <ul className="mega-links pointer-events-none">
                      <li>
                        <a href="#">
                          <FiColumns className="inline mr-1 mt-0" />
                          CV Resources
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiPenTool className="inline mr-1 mt-0" />
                          Cover Letter Resources
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FiBox className="inline mr-1 mt-0" />
                          Job Interview Resources
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </li>
            
            
            {/* FeedBack  */}
            <li>
              <a className="hover:font-bold text-blue-950 text-base" href="#">Job-Fit CV</a>
            </li>
            <li>
              <a className="hover:font-bold text-blue-950 text-base" href="#">Career Coaching</a>
            </li>
            <li>
              <a className=" text-blue-950 text-base hover:font-bold" href="https://www.careergenies.co.uk/blog" target="_blank">
                Blog
              </a>
            </li>
            {/* Auth buttons  */}
            
          </ul>
          <ul>
          <li>
              {/* <div className="auths_button ml-2">
                <button
                  className="custom-button hover:cursor-pointer"
                  onClick={handleLogin}
                >
                  <span>Sign In</span>
                  <div className="liquid"></div>
                </button>
              </div> */}
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
