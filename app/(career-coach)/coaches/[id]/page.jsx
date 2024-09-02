/** @format */

"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ResumeHeader } from "@/app/Layout/ResumeHeader";
import { CoachHeader } from "@/components/component/CoachHeader";
import { useParams } from "next/navigation";

const CoachDetailsPage = () => {
  const { id } = useParams();
  console.log("id:::", id);
  const [activeTab, setActiveTab] = useState("blogs");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <ResumeHeader />
      <div className='mt-20 bg-[#E0F2FF] h-40 w-full flex justify-center '></div>
      <div className='max-w-5xl  mx-auto'>
        <div
          id='Main'
          className='mt-10 bg-white w-full h-auto flex flex-col items-center'>
          {/* START-COACH HEADER */}
          <CoachHeader />
          {/* END-COACH HEADER */}
          <div className='container bg-[#FFF] h-auto mt-10 w-full flex flex-col lg:flex-row'>
            <div
              id='blog_left_side'
              className='w-full lg:w-[25%] bg-white h-auto p-5 pl-5 sm:p-5 sm:pl-0 md:p-5 md:pl-5 lg:p-5 lg:pl-0 xl:p-5 xl:pl-0 2xl:p-5 2xl:pl-0'>
              <div className='border border-[#E9EAF0] p-5'>
                <h3 className='text-[#1D2026] pb-2 font-semibold text-lg'>
                  ABOUT ME
                </h3>
                <p className='text-[#6E7485] pb-5 text-sm'>
                  One day Vako had enough with the 9-to-5 grind, or more like
                  9-to-9 in his case, and quit his job, or more like got himself
                  fired from his own startup.
                </p>
                <p className='text-[#6E7485] pb-5 text-sm'>
                  He decided to work on his dream: be his own boss, travel the
                  world, only do the work he enjoyed, and make a lot more money
                  in the process. No more begging for vacation days and living
                  from paycheck to paycheck. After trying everything from
                  e-commerce stores to professional poker his lucky break came
                  when he started freelance design. Vako fell in love with the
                  field that gives him the lifestyle of his dreams.
                </p>
                <p className='text-[#6E7485] pb-5 text-sm'>
                  Vako realizes that people who take courses on Udemy want to
                  transform their lives. Today with his courses and mentoring
                  Vako is helping thousands of people transform their lives,
                  just like he did once.
                </p>
              </div>
            </div>

            <div
              id='blog_right_side'
              className='w-full lg:w-[75%] bg-white h-auto p-5'>
              <div
                id='blog_tab_page_head'
                className='flex border-b border-gray-300 mb-5'>
                <div
                  className={`cursor-pointer p-3 ${
                    activeTab === "blogs"
                      ? "font-bold border-b-2 border-[#FF6636]"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick("blogs")}>
                  Blogs
                </div>
                <div
                  className={`cursor-pointer p-3 ${
                    activeTab === "appointment"
                      ? "font-bold border-b-2 border-[#FF6636]"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick("appointment")}>
                  Book An Appointment
                </div>
              </div>

              {activeTab === "blogs" && (
                <>
                  <h1 className='text-2xl lg:text-xl font-bold pt-5 pb-5'>
                    Joy Career Development Blogs
                  </h1>
                  <div
                    id='blog_tab'
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>
                    {/* START-BLOG 1 */}
                    <div className='border border-[#E9EAF0]'>
                      <div>
                        <img
                          src='/blogImage1.png'
                          alt='Blog'
                          className='w-full'
                        />
                      </div>
                      <div className='flex items-center justify-center p-5'>
                        <span className='p-1 bg-[#EBEBFF] text-[10px]'>
                          DEVELOPMENTS
                        </span>
                      </div>
                      <div className='break-words p-5 text-lg lg:text-xl'>
                        Machine Learning A-Z™: Hands-On Python & R In Data
                        Science
                      </div>
                      <div
                        id='row3'
                        className='flex justify-between text-sm text-gray-500 p-5'>
                        <div className='flex items-center space-x-1'>
                          <img src='/Star.png' alt='Star' className='w-4 h-4' />
                          <span className='text-[#1D2026] font-bold'>5.0</span>
                        </div>
                        <div className='flex items-center space-x-1'>
                          <img
                            src='/Usercoach.png'
                            alt='Users'
                            className='w-4 h-4'
                          />
                          <span className='text-[#1D2026] font-bold'>
                            265.7k
                          </span>
                          <span className='text-[#6E7485]'>students</span>
                        </div>
                      </div>
                    </div>
                    {/* END-BLOG 1 */}
                    {/* START-BLOG 2 */}
                    <div className='border border-[#E9EAF0]'>
                      <div>
                        <img
                          src='/blogImage2.png'
                          alt='Blog'
                          className='w-full'
                        />
                      </div>
                      <div className='flex items-center justify-center p-5'>
                        <span className='p-1 bg-[#E1F7E3] text-[10px]'>
                          BUSINESS
                        </span>
                      </div>
                      <div className='break-words p-5 text-lg lg:text-xl'>
                        Selenium WebDriver with Java -Basics to
                        Advanced+Frameworks
                      </div>
                      <div
                        id='row3'
                        className='flex justify-between text-sm text-gray-500 p-5'>
                        <div className='flex items-center space-x-1'>
                          <img src='/Star.png' alt='Star' className='w-4 h-4' />
                          <span className='text-[#1D2026] font-bold'>5.0</span>
                        </div>
                        <div className='flex items-center space-x-1'>
                          <img
                            src='/Usercoach.png'
                            alt='Users'
                            className='w-4 h-4'
                          />
                          <span className='text-[#1D2026] font-bold'>
                            265.7k
                          </span>
                          <span className='text-[#6E7485]'>students</span>
                        </div>
                      </div>
                    </div>
                    {/* END-BLOG 2 */}
                    {/* START-BLOG 3 */}
                    <div className='border border-[#E9EAF0]'>
                      <div>
                        <img
                          src='/blogimage3.png'
                          alt='Blog'
                          className='w-full'
                        />
                      </div>
                      <div className='flex items-center justify-center p-5'>
                        <span className='p-1 bg-[#E1F7E3] text-[10px]'>
                          DEVELOPMENT
                        </span>
                      </div>
                      <div className='break-words p-5 text-lg lg:text-xl'>
                        Selenium WebDriver with Java -Basics to
                        Advanced+Frameworks
                      </div>
                      <div
                        id='row3'
                        className='flex justify-between text-sm text-gray-500 p-5'>
                        <div className='flex items-center space-x-1'>
                          <img src='/Star.png' alt='Star' className='w-4 h-4' />
                          <span className='text-[#1D2026] font-bold'>5.0</span>
                        </div>
                        <div className='flex items-center space-x-1'>
                          <img
                            src='/Usercoach.png'
                            alt='Users'
                            className='w-4 h-4'
                          />
                          <span className='text-[#1D2026] font-bold'>
                            265.7k
                          </span>
                          <span className='text-[#6E7485]'>students</span>
                        </div>
                      </div>
                    </div>
                    {/* END-BLOG 3 */}
                  </div>
                </>
              )}

              {activeTab === "appointment" && (
                <div id='book_an_appointment_tab'>
                  <h1 className='text-xl font-bold'>Book An Appointment</h1>
                  {/* Add content for appointment booking here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachDetailsPage;
