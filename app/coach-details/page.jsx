"use client";
import Image from "next/image";
import { ResumeHeader } from "../Layout/ResumeHeader";
import React, { useState } from "react";
const CoachDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("blogs");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <ResumeHeader />
      <div
        id="Main"
        className="mt-10 bg-white w-full h-auto flex flex-col items-center"
      >
        <div className="mt-20 bg-[#E0F2FF] h-40 w-full flex justify-center "></div>
        <div className="sm:container md:container lg:container xl:container 2xl:container bg-[#FFF] h-auto -mt-20 w-full flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-between items-center border border-[#FFDDD1] p-4">
          {/* Left Side */}
          <div
            id="blog_header_left_side"
            className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <div id="coach_image">
              <img
                src="./InstructorImages.png"
                alt="Coach"
                className="w-full sm:w-auto h-auto object-cover"
              />
            </div>
            <div id="coach_details" className="pt-4 sm:pt-10">
              <div
                id="row1"
                className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pb-3"
              >
                <h1 className="font-bold text-[#1D2026] text-2xl sm:text-3xl">
                  Joy
                </h1>
                <div className="text-xs sm:text-[10px] bg-[#FFEEE8] text-[#FF6636] flex items-center space-x-1 p-1">
                  <img
                    src="./Crown.png"
                    alt="Crown"
                    className="w-3 sm:w-4 h-3 sm:h-4"
                  />
                  <span>Top Rated</span>
                </div>
              </div>
              <div
                id="row2"
                className="text-xs sm:text-sm text-[#6E7485] pb-3 sm:pb-5"
              >
                Career Development Coach
              </div>
              <div
                id="row3"
                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500"
              >
                <div className="flex items-center space-x-1">
                  <img
                    src="./Star.png"
                    alt="Star"
                    className="w-3 sm:w-4 h-3 sm:h-4"
                  />
                  <span className="text-[#1D2026] font-bold">4.8</span>
                  <span className="text-[#6E7485]">(134,633 reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <img
                    src="./Users.png"
                    alt="Users"
                    className="w-3 sm:w-4 h-3 sm:h-4"
                  />
                  <span className="text-[#1D2026] font-bold">430,117</span>
                  <span className="text-[#6E7485]">students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <img
                    src="./PlayCircle.png"
                    alt="Play Circle"
                    className="w-3 sm:w-4 h-3 sm:h-4"
                  />
                  <span className="text-[#1D2026] font-bold">7</span>
                  <span className="text-[#6E7485]">courses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div
            id="blog_header_right_side"
            className="text-left sm:text-left md:text-right lg:text-right xl:text-right 2xl:text-right space-y-2 mt-4 sm:mt-0"
          >
            <div
              id="website_link"
              className="text-xs sm:text-sm text-blue-500 underline flex items-center justify-center sm:justify-center md:justify-end lg:justify-end xl:justify-end 2xl:justify-end  space-x-1"
            >
              <img
                src="GlobeSimple.png"
                alt="Globe Icon"
                className="w-3 sm:w-4 h-3 sm:h-4"
              />
              <span className="text-[10px] sm:text-[12px] text-[#564FFD]">
                http://www.com
              </span>
            </div>
            <div id="socialMediaIcons" className="flex space-x-2 justify-end">
              <img
                src="facebook_icon.png"
                alt="Facebook"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto"
              />
              <img
                src="twitter_icon.png"
                alt="Twitter"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto"
              />
              <img
                src="instagram_icon.png"
                alt="Instagram"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto"
              />
              <img
                src="youtube_icon.png"
                alt="YouTube"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto"
              />
              <img
                src="whatsApp_icon.png"
                alt="WhatsApp"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto"
              />
            </div>
          </div>
        </div>

        <div className="container bg-[#FFF] h-auto mt-10 w-full flex flex-col lg:flex-row">
          <div
            id="blog_left_side"
            className="w-full lg:w-[25%] bg-white h-auto p-5 pl-5 sm:p-5 sm:pl-0 md:p-5 md:pl-5 lg:p-5 lg:pl-0 xl:p-5 xl:pl-0 2xl:p-5 2xl:pl-0"
          >
            <div className="border border-[#E9EAF0] p-5">
              <h3 className="text-[#1D2026] pb-2 font-semibold text-lg">
                ABOUT ME
              </h3>
              <p className="text-[#6E7485] pb-5 text-sm">
                One day Vako had enough with the 9-to-5 grind, or more like
                9-to-9 in his case, and quit his job, or more like got himself
                fired from his own startup.
              </p>
              <p className="text-[#6E7485] pb-5 text-sm">
                He decided to work on his dream: be his own boss, travel the
                world, only do the work he enjoyed, and make a lot more money in
                the process. No more begging for vacation days and living from
                paycheck to paycheck. After trying everything from e-commerce
                stores to professional poker his lucky break came when he
                started freelance design. Vako fell in love with the field that
                gives him the lifestyle of his dreams.
              </p>
              <p className="text-[#6E7485] pb-5 text-sm">
                Vako realizes that people who take courses on Udemy want to
                transform their lives. Today with his courses and mentoring Vako
                is helping thousands of people transform their lives, just like
                he did once.
              </p>
            </div>
          </div>

          <div
            id="blog_right_side"
            className="w-full lg:w-[75%] bg-white h-auto p-5"
          >
            <div
              id="blog_tab_page_head"
              className="flex border-b border-gray-300 mb-5"
            >
              <div
                className={`cursor-pointer p-3 ${
                  activeTab === "blogs"
                    ? "font-bold border-b-2 border-[#FF6636]"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("blogs")}
              >
                Blogs
              </div>
              <div
                className={`cursor-pointer p-3 ${
                  activeTab === "appointment"
                    ? "font-bold border-b-2 border-[#FF6636]"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("appointment")}
              >
                Book An Appointment
              </div>
            </div>

            {activeTab === "blogs" && (
              <>
                <h1 className="text-2xl lg:text-xl font-bold pt-5 pb-5">
                  Joy Career Development Blogs
                </h1>
                <div
                  id="blog_tab"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
                >
                  {/* START-BLOG 1 */}
                  <div className="border border-[#E9EAF0]">
                    <div>
                      <img
                        src="./blogImage1.png"
                        alt="Blog"
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center justify-center p-5">
                      <span className="p-1 bg-[#EBEBFF] text-[10px]">
                        DEVELOPMENTS
                      </span>
                    </div>
                    <div className="break-words p-5 text-lg lg:text-xl">
                      Machine Learning A-Z™: Hands-On Python & R In Data Science
                    </div>
                    <div
                      id="row3"
                      className="flex justify-between text-sm text-gray-500 p-5"
                    >
                      <div className="flex items-center space-x-1">
                        <img src="./Star.png" alt="Star" className="w-4 h-4" />
                        <span className="text-[#1D2026] font-bold">5.0</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <img
                          src="./Usercoach.png"
                          alt="Users"
                          className="w-4 h-4"
                        />
                        <span className="text-[#1D2026] font-bold">265.7k</span>
                        <span className="text-[#6E7485]">students</span>
                      </div>
                    </div>
                  </div>
                  {/* END-BLOG 1 */}
                  {/* START-BLOG 2 */}
                  <div className="border border-[#E9EAF0]">
                    <div>
                      <img
                        src="./blogImage2.png"
                        alt="Blog"
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center justify-center p-5">
                      <span className="p-1 bg-[#E1F7E3] text-[10px]">
                        BUSINESS
                      </span>
                    </div>
                    <div className="break-words p-5 text-lg lg:text-xl">
                      Selenium WebDriver with Java -Basics to
                      Advanced+Frameworks
                    </div>
                    <div
                      id="row3"
                      className="flex justify-between text-sm text-gray-500 p-5"
                    >
                      <div className="flex items-center space-x-1">
                        <img src="./Star.png" alt="Star" className="w-4 h-4" />
                        <span className="text-[#1D2026] font-bold">5.0</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <img
                          src="./Usercoach.png"
                          alt="Users"
                          className="w-4 h-4"
                        />
                        <span className="text-[#1D2026] font-bold">265.7k</span>
                        <span className="text-[#6E7485]">students</span>
                      </div>
                    </div>
                  </div>
                  {/* END-BLOG 2 */}
                  {/* START-BLOG 3 */}
                  <div className="border border-[#E9EAF0]">
                    <div>
                      <img
                        src="./blogimage3.png"
                        alt="Blog"
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center justify-center p-5">
                      <span className="p-1 bg-[#E1F7E3] text-[10px]">
                        DEVELOPMENT
                      </span>
                    </div>
                    <div className="break-words p-5 text-lg lg:text-xl">
                      Selenium WebDriver with Java -Basics to
                      Advanced+Frameworks
                    </div>
                    <div
                      id="row3"
                      className="flex justify-between text-sm text-gray-500 p-5"
                    >
                      <div className="flex items-center space-x-1">
                        <img src="./Star.png" alt="Star" className="w-4 h-4" />
                        <span className="text-[#1D2026] font-bold">5.0</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <img
                          src="./Usercoach.png"
                          alt="Users"
                          className="w-4 h-4"
                        />
                        <span className="text-[#1D2026] font-bold">265.7k</span>
                        <span className="text-[#6E7485]">students</span>
                      </div>
                    </div>
                  </div>
                  {/* END-BLOG 3 */}
                </div>
              </>
            )}

            {activeTab === "appointment" && (
              <div id="book_an_appointment_tab">
                <h1 className="text-xl font-bold">Book An Appointment</h1>
                {/* Add content for appointment booking here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachDetailsPage;
