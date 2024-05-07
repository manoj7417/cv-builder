"use client";
import { LinkBreak1Icon } from "@radix-ui/react-icons";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiBox, FiCamera, FiColumns, FiFeather, FiLayout, FiMessageSquare, FiPenTool, FiUsers } from "react-icons/fi";
import { AiOutlineFileText } from "react-icons/ai";
import {
  MdOutlineClose,
  MdOutlineKeyboardArrowDown,
  MdOutlineMenu,
} from "react-icons/md";

const Header = () => {
  const router = useRouter()
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

  const handleLogin = ()=>{
    router.push('/login')
  }

  return (
    <div
      className={`mobile_responsive_nav ${
        showBackground ? "mobile_black" : "mobile_white"
      }`}
    >
      <nav>
        <div className="wrapper">
          <div className="logo">
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
          </div>
          <input type="radio" name="slider" id="menu-btn" />
          <input type="radio" name="slider" id="close-btn" />
          <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn">
              <MdOutlineClose />
            </label>
            {/* Resume Navs  */}
            <li>
            <a href="#" className="desktop-item">
              Resume
              <IoIosArrowDown className="inline ml-1" />
            </a>
              
              <input type="checkbox" id="resume" />
              <label htmlFor="resume" className="mobile-item">
                Resume
              </label>
              <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <header>Resume Templates</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#"><FiCamera className="inline mr-1 mt-0"/>Creative Templates</a>
                      </li>
                      <li>
                        <a href="#"><FiPenTool className="inline mr-1 mt-0"/>Traditional Templates</a>
                      </li>
                      <li>
                        <a href="#"><FiBox className="inline mr-1 mt-0"/>Modern Templates</a>
                      </li>
                      <li>
                        <a href="#"><FiColumns className="inline mr-1 mt-0"/> Simple Templates</a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Resume Writing Guides </header>
                    <ul className="mega-links">
                      <li>
                        <a href="#"><FiPenTool className="inline mr-1 mt-0"/>Writing a Resume</a>
                      </li>
                      <li>
                        <a href="#"><FiColumns className="inline mr-1 mt-0"/>Resume Summary</a>
                      </li>
                      <li>
                        <a href="#"><FiCamera className="inline mr-1 mt-0"/>Choosing a Resume Format</a>
                      </li>
                      <li>
                        <a href="#"><FiBox className="inline mr-1 mt-0"/>Fitting Experience</a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Resume Examples</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#"><FiBox className="inline mr-1 mt-0"/>Project Manager</a>
                      </li>
                      <li>
                        <a href="#"><FiCamera className="inline mr-1 mt-0"/>Data Scientist</a>
                      </li>
                      <li>
                        <a href="#"><FiColumns className="inline mr-1 mt-0"/>Designer</a>
                      </li>
                      <li>
                        <a href="#"><FiPenTool className="inline mr-1 mt-0"/>Software Engineer</a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>CV Curator</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#"><FiBox className="inline mr-1 mt-0"/>CV Curator</a>
                      </li>
                      <li>
                        <a href="#"><FiCamera className="inline mr-1 mt-0"/>Resume Checker</a>
                      </li>
                      <li>
                        <a href="#"><FiColumns className="inline mr-1 mt-0"/>Resume Skills</a>
                      </li>
                      <li>
                        <a href="#"><FiPenTool className="inline mr-1 mt-0"/>Resume Analayser</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            {/* Cover Letter  */}
            <li>
            <a href="#" className="desktop-item">
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
                    <ul className="mega-links">
                      <li>
                        <a href="#"><FiPenTool className="inline mr-1 mt-0"/>Writing a Cover Letter</a>
                      </li>
                      <li>
                        <a href="#"><FiColumns className="inline mr-1 mt-0"/>Cover Letter Formats</a>
                      </li>
                      <li>
                        <a href="#"><FiPenTool className="inline mr-1 mt-0"/>Ending  a Cover Letter</a>
                      </li>
                      <li>
                        <a href="#"><FiCamera className="inline mr-1 mt-0"/>Cover Letter Design</a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Cover Letter Examples</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#"><FiBox className="inline mr-1 mt-0"/>Designer</a>
                      </li>
                      <li>
                        <a href="#"><FiCamera className="inline mr-1 mt-0"/>Product Manager</a>
                      </li>
                      <li>
                        <a href="#"><FiColumns className="inline mr-1 mt-0"/>Business Analyst</a>
                      </li>
                      <li>
                        <a href="#"><FiPenTool className="inline mr-1 mt-0"/>Software Engineer</a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Cover Letter Builder</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#"><FiBox className="inline mr-1 mt-0"/>QA Engineer</a>
                      </li>
                      <li>
                        <a href="#"><FiCamera className="inline mr-1 mt-0"/>QA Analyst</a>
                      </li>
                      <li>
                        <a href="#"><FiColumns className="inline mr-1 mt-0"/>Data Analyst</a>
                      </li>
                      <li>
                        <a href="#"><FiPenTool className="inline mr-1 mt-0"/>UI/UX Designer</a>
                      </li>
                    </ul>
                  </div>
                  {/* <div className="row">
                    <header>Security services</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#">Site Seal</a>
                      </li>
                      <li>
                        <a href="#">VPS Hosting</a>
                      </li>
                      <li>
                        <a href="#">Privacy Seal</a>
                      </li>
                      <li>
                        <a href="#">Website design</a>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
            </li>
            {/* Career  */}
            <li>
            <a href="#" className="desktop-item">
              Career
              <IoIosArrowDown className="inline ml-1" />
            </a>
              <input type="checkbox" id="career" />
              <label htmlFor="career" className="mobile-item">
                Career
              </label>
              <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <header>Career Coaching Services</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#"><AiOutlineFileText className="inline mr-1"/>Resume Writing</a>
                      </li>
                      <li>
                        <a href="#"><FiUsers className="inline mr-1"/>Resume Review</a>
                      </li>
                      <li>
                        <a href="#"><FiFeather className="inline mr-1"/>Cover Letter Writing</a>
                      </li>
                      <li>
                        <a href="#"><FiMessageSquare className="inline mr-1"/>Interview Prepation</a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Career Coaching Guides</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#"><FiMessageSquare className="inline mr-1"/>Job Interview Questions</a>
                      </li>
                      <li>
                        <a href="#"><FiFeather className="inline mr-1"/>Job Interview Guides</a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Resources</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#"><FiColumns className="inline mr-1 mt-0"/>Resume  Resources</a>
                      </li>
                      <li>
                        <a href="#"><FiPenTool className="inline mr-1 mt-0"/>Cover Letter Resources</a>
                      </li>
                      <li>
                        <a href="#"><FiBox className="inline mr-1 mt-0"/>Job Interview Resources</a>
                      </li>
                    </ul>
                  </div>
                  {/* <div className="row">
                    <header>Security services</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#">Site Seal</a>
                      </li>
                      <li>
                        <a href="#">VPS Hosting</a>
                      </li>
                      <li>
                        <a href="#">Privacy Seal</a>
                      </li>
                      <li>
                        <a href="#">Website design</a>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
            </li>
            {/* Blog  */}
            {/* <li>
              <a href="#" className="desktop-item">
                Blog
              </a>
              <input type="checkbox" id="blog" />
              <label htmlFor="blog" className="mobile-item">
              Blog
              </label>
              <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <header>Design Services</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#">Graphics</a>
                      </li>
                      <li>
                        <a href="#">Vectors</a>
                      </li>
                      <li>
                        <a href="#">Business cards</a>
                      </li>
                      <li>
                        <a href="#">Custom logo</a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Design Services</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#">Graphics</a>
                      </li>
                      <li>
                        <a href="#">Vectors</a>
                      </li>
                      <li>
                        <a href="#">Business cards</a>
                      </li>
                      <li>
                        <a href="#">Custom logo</a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Email Services</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#">Personal Email</a>
                      </li>
                      <li>
                        <a href="#">Business Email</a>
                      </li>
                      <li>
                        <a href="#">Mobile Email</a>
                      </li>
                      <li>
                        <a href="#">Web Marketing</a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Security services</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#">Site Seal</a>
                      </li>
                      <li>
                        <a href="#">VPS Hosting</a>
                      </li>
                      <li>
                        <a href="#">Privacy Seal</a>
                      </li>
                      <li>
                        <a href="#">Website design</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li> */}
            <li>
              <a href="https://www.careergenies.co.uk/blog" target="_blank">
                Blog
              </a>
            </li>
            {/* FeedBack  */}
            <li>
              <a href="#">Feedback</a>
            </li>
             {/* Auth buttons  */}
            <li>
              <div className="auths_button ml-2">
                <button className="px-4 py-2 bg-blue-900 hover:bg-blue-700  font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 text-white text-base rounded-md" onClick={handleLogin}>Login</button>
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
