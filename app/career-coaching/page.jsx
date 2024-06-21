"use client";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useUserStore } from "../store/UserStore";
import NewResumeHeader from "../Layout/NewResumeHeader";
import Header from "../Layout/Header";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import "../components/HomepageNew/Homepage.css";

const ComingSoonPage = () => {
  const userState = useUserStore((state) => state.userState);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 25, // max tilt rotation (degrees)
    perspective: 5000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.01, // 2 = 200%, 1.5 = 150%, etc..
    speed: 2000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.50,.98,.52,.99)", // Easing on enter/exit.
    padding: 0,
    margin: 0,
  };
  return (
    <>
      {userState?.isAuthenticated ? <NewResumeHeader /> : <Header />}
      <section className="flex lg:items-center items-start justify-center pb-8 w-full pt-24 md:pt-16 lg:pt-20  px-5 relative">
        <div className="container lg:pt-0 pt-20">
          <div className="flex flex-col justify-center ">
            <Image
              src={"/arrowright.png"}
              width={100}
              height={100}
              alt="arrowright"
              className="absolute top-[20%] left-0 w-auto h-auto"
            />
            <Image
              src={"/arrowleft.png"}
              width={100}
              height={100}
              alt="arrowright"
              className="absolute top-[30%] right-0 w-auto h-auto"
            />
            <div className="space-y-2 mx-auto">
              <h1
                className="text-[45px] md:text-[80px] sm:text-[80px] mt-4 pt-16 flex text-center justify-center  items-center  font-extrabold text-[#0D3572]"
                style={{ WebkitTextStrokeWidth: "thin", wordSpacing: "0.8rem" }}
              >
                <span>
                  GROW {""}
                  <span className="text-[#3c72b9]">FASTER</span> <br></br>WITH A
                  COACH
                </span>
                <span>
                  <img src="/coach.png" className="h-64 ml-4" />
                </span>
              </h1>

              <p className="max-w-[800px]  mx-auto text-center text-[#7C7C7C] text-[18px]">
                We believe in bridging the gap between your aspirations and the
                perfect job role that matches your skills. With our intuitive
                job matching system and dedicated support, we empower you to
                take the leap towards a career that ignites your professional
                drive.
              </p>
              <div className="flex gap-4 md:gap-8 sm:gap-8 justify-center items-center">
                <div className="button_wrapper mt-8">
                  <button className="get_start_btn">
                    <span className="btn_text">
                      <a href="/contact-us">Hire My Coach</a>
                    </span>
                    <div className="btn_overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
                <div className="button_wrapper mt-8 flex justify-center lg:justify-start">
                  <a href="#learnmore">
                    <button className="get_start_btn">
                      <span className="btn_text">Learn More</span>
                      <div className="btn_overlay">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-right"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex lg:items-center items-start justify-center w-full pt-12 md:pt-16 lg:pt-20 px-5 relative">
        <div className="max-w-6xl mx-auto  py-10">
          <div className="flex text-center md:text-left sm:text-left flex-col md:flex-row items-center gap-4">
            {/* Left Column - Image */}
            <div className="w-full text-center md:w-1/2 flex justify-center md:justify-start">
              <img src="/carrercoaching.webp" alt="Description of the image" />
            </div>

            {/* Right Column - Text */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8">
              <h2 className="trust font-bold text-gray-800">
                Trusted By <span className="text-[#0D3572]">Talent</span> From
                Around The Globe
              </h2>
              <p className="mt-4 text-gray-600">
                Trusted by talent from top companies across the globe. Work with
                a world-class coach to grow as a leader, find career clarity, or
                accelerate your job search
              </p>
              <div className="button_wrapper mt-8 flex justify-center lg:justify-start">
                <button className="get_start_btn">
                  <span className="btn_text">Learn More</span>
                  <div className="btn_overlay">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex lg:items-center items-start justify-center w-full pt-12 md:pt-16 lg:pt-20 px-5 relative">
        <div className="max-w-6xl mx-auto  py-10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full text-center md:text-left sm:text-left md:w-1/2 mt-8 md:mt-0 md:pl-8">
              <h2 className="trust font-bold text-gray-800">
                Coach For <span className="text-[#0D3572]">Businesses</span> &{" "}
                <span className="text-[#0D3572]">Organizations</span>
              </h2>
              <p className="mt-4 text-gray-600">
                Grow your leaders, retain star performers, and provide a benefit
                employees will love. Work with a world-class coach to grow as a
                leader, find career clarity, or accelerate your job search.
              </p>
              <div className="button_wrapper mt-8 flex justify-center lg:justify-start">
                <button className="get_start_btn">
                  <span className="btn_text">Learn More</span>
                  <div className="btn_overlay">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            {/* Left Column - Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <img src="/cghbo.png" alt="Description of the image" />
            </div>

            {/* Right Column - Text */}
          </div>
        </div>
      </section>
      <section className="flex lg:items-center px-5 items-start justify-center pb-8 mb:pb-24 lg:pb-32 w-full pt-12 md:pt-16 lg:pt-20 bg-[#0D3572] relative">
        <div className="container lg:pt-0 pt-20">
          <div className="flex flex-col justify-center">
            <div className="space-y-2 mx-auto">
              <h1 className="text-[45px] md:text-[80px] sm:text-[80px] mt-4 text-center justify-center flex items-center font-extrabold text-white ">
                99% Satisfaction
              </h1>
              <div className="flex justify-center mt-4">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FFD700" // gold color for stars
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#FFD700"
                    className="w-8 h-8 mx-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.988 3.003l2.016 6.606h6.907c.637 0 .903.816.391 1.181l-5.609 4.074 2.017 6.606c.178.582-.48.957-.98.638l-5.609-4.073-5.609 4.073c-.5.32-1.158-.056-.98-.638l2.017-6.606-5.609-4.074c-.512-.365-.246-1.181.391-1.181h6.907l2.016-6.606c.178-.582.982-.582 1.16 0z"
                    />
                  </svg>
                ))}
              </div>
              <p className="max-w-[800px] mx-auto text-center text-white text-[18px] pt-4">
                Regardless of job title, experience, or location, Placement has
                you<br></br> covered. Our 100% remote coaching experience has
                90%<br></br>
                satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="learnmore"
        className="flex lg:items-center px-5 items-start justify-center pb-8 mb:pb-24 lg:pb-32 w-full pt-12 md:pt-16 lg:pt-20 relative"
      >
        <div className="container lg:pt-0 pt-20">
          <div className="flex flex-col justify-center">
            <div className="space-y-2 mx-auto">
              <h1 className="text-[45px] md:text-[80px] sm:text-[80px] mt-4 text-center justify-center items-center font-extrabold">
                Coaching For Every <br />
                <span className="text-[#0D3572]">Career</span> Goal
              </h1>
              <div className="flex justify-center mt-4"></div>
              <p className="max-w-[800px] mx-auto text-center text-gray text-[18px] pt-4">
                Trusted by talent from top companies across the globe. Work with
                a <br />
                world-class coach to grow as a leader.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-6xl mx-auto py-10">
              <div className=" p-6 rounded-lg shadow-md bg-[#ceefd0]">
                <img
                  src="/careergrowth.png"
                  alt="Career Growth"
                  className="w-full h-96 object-cover rounded-md bg-[#88e48d]"
                />
                <h2 className="text-2xl font-bold mt-4">Career Growth</h2>
                <p className="mt-2 text-gray-600">
                  Discover the best strategies to enhance your career growth
                  with our expert coaching.
                </p>
                <div className="button_wrapper mt-8">
                  <button
                    className="get_start_btn "
                    style={{ background: "black" }}
                  >
                    <span className="btn_text">
                      <a href="/contact-us">Hire Coach</a>
                    </span>
                    <div className="btn_overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              <div className=" p-6 rounded-lg shadow-md bg-[#f1b38c]">
                <img
                  src="/leadership.png"
                  alt="Leadership Skills"
                  className="w-full h-96 object-cover rounded-md bg-[#ff914c]"
                />
                <h2 className="text-2xl font-bold mt-4">Leadership Skills</h2>
                <p className="mt-2 text-gray-600">
                  Develop your leadership skills with our comprehensive coaching
                  programs.
                </p>
                <div className="button_wrapper mt-8">
                  <button
                    className="get_start_btn "
                    style={{ background: "black" }}
                  >
                    <span className="btn_text">
                      <a href="/contact-us">Hire Coach</a>
                    </span>
                    <div className="btn_overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              <div className="p-6 rounded-lg shadow-md bg-[#ffe1e1]">
                <img
                  src="/jobtransition.png"
                  alt="Job Transition"
                  className="w-full h-96 object-cover rounded-md bg-[#fe9e9f]"
                />
                <h2 className="text-2xl font-bold mt-4">Job Transition</h2>
                <p className="mt-2 text-gray-600">
                  Navigate your job transitions smoothly with our tailored
                  coaching support.
                </p>
                <div className="button_wrapper mt-8">
                  <button
                    className="get_start_btn "
                    style={{ background: "black" }}
                  >
                    <span className="btn_text">
                      <a href="/contact-us">Hire Coach</a>
                    </span>
                    <div className="btn_overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              <div className=" p-6 rounded-lg shadow-md bg-[#bac2f1]">
                <img
                  src="/perfomance.png"
                  alt="Performance Enhancement"
                  className="w-full h-96 object-cover rounded-md bg-[#8d9df1]"
                />
                <h2 className="text-2xl font-bold mt-4">
                  Performance Enhancement
                </h2>
                <p className="mt-2 text-gray-600">
                  Boost your performance at work with our personalized coaching
                  solutions.
                </p>
                <div className="button_wrapper mt-8">
                  <button
                    className="get_start_btn "
                    style={{ background: "black" }}
                  >
                    <span className="btn_text">
                      <a href="/contact-us">Hire Coach</a>
                    </span>
                    <div className="btn_overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex lg:items-center px-5 items-start justify-center w-full pt-12 relative">
        <div className="max-w-6xl mx-auto py-10">
          <div className="flex flex-col justify-center text-center md:text-left sm:text-left md:flex-row items-center gap-4">
            {/* Left Column - Text */}
            <div className="w-full md:w-[40%] mt-8 md:mt-0 md:pl-8">
              <h2 className="trust font-bold text-gray-800">
                A seamless, <span className="text-[#0D3572]">Modern</span>{" "}
                Experience
              </h2>
              <p className="mt-4 text-gray-600">
                Trusted by talent from top companies across the globe. Work with
                a world-class coach to grow as a leader, find career clarity, or
                accelerate your job search.
              </p>
              <div className="button_wrapper mt-8 flex justify-center lg:justify-start">
                <button className="get_start_btn">
                  <span className="btn_text">Learn More</span>
                  <div className="btn_overlay">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            {/* Right Column - Image and Features */}
            <div className="w-full md:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="flex flex-col items-center sm:items-start gap-4">
                <div className="flex justify-center sm:justify-start w-full">
                  <img
                    src="/vetted.png"
                    alt="Vetted Coaches"
                    className="w-60 h-48"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center sm:text-left">
                  Vetted Coaches
                </h3>
                <p className="mt-2 text-gray-600 text-center sm:text-left">
                  Connect with highly vetted coaches to ensure quality guidance.
                </p>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-4">
                <div className="flex justify-center sm:justify-start w-full">
                  <img
                    src="/instantly.png"
                    alt="Instantly Schedule"
                    className="w-60 h-48"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center sm:text-left">
                  Instantly Schedule
                </h3>
                <p className="mt-2 text-gray-600 text-center sm:text-left">
                  Schedule meetings instantly without any hassle.
                </p>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-4">
                <div className="flex justify-center sm:justify-start w-full">
                  <img
                    src="/easymeeting.png"
                    alt="Easy Meeting"
                    className="w-60 h-48"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center sm:text-left">
                  Easy Meeting
                </h3>
                <p className="mt-2 text-gray-600 text-center sm:text-left">
                  Set up and attend meetings with ease.
                </p>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-4">
                <div className="flex justify-center sm:justify-start w-full">
                  <img
                    src="/easymessage.png"
                    alt="Easy Message"
                    className="w-60 h-48"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center sm:text-left">
                  Easy Message
                </h3>
                <p className="mt-2 text-gray-600 text-center sm:text-left">
                  Easily communicate with your coach through our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-blue-950">
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <section className="bg-blue-950 pt-4">
              <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <figure className="max-w-screen-md mx-auto">
                  <svg
                    className="h-12 mx-auto mb-3 text-white "
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                      fill="currentColor"
                    />
                  </svg>
                  <blockquote>
                    <p className="text-2xl font-medium text-white ">
                      Earlier, I was facing certain struggles with my job
                      applications. Perhaps my CV was not up to the mark. A
                      friend of mine suggested this new website named Genies
                      Career Hub. They use AI for CV Creation and it is so fine.
                      Every mistake gets corrected then and there and the
                      templates are crafted perfectly for the job roles. I
                      witnessed a rise in the callbacks for Interviews which was
                      very helpful. The pricing is better than many others in
                      the market. Really can not wait to use the other parts of
                      the services as well.
                    </p>
                  </blockquote>
                  <figcaption className="flex items-center justify-center mt-6 space-x-3">
                    <div className="flex items-center divide-x-2 divide-gray-500 ">
                      <div className="pr-3">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src="/user.png"
                          alt="User Avatar"
                        />
                      </div>
                      <div className="px-3 font-medium text-white">
                        Elizabeth
                      </div>
                      <div className="pl-3 text-sm font-light text-white">
                        Los Angeles, CA
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </section>
          </SwiperSlide>
          <SwiperSlide>
            <section className="bg-blue-950 pt-4">
              <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <figure className="max-w-screen-md mx-auto">
                  <svg
                    className="h-12 mx-auto mb-3 text-white "
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                      fill="currentColor"
                    />
                  </svg>
                  <blockquote>
                    <p className="text-2xl font-medium text-white ">
                      I was wondering why CV-making is so tough and I really get
                      lethargic during it. But Genies Career Hub was so quick
                      with it. The use of AI is good and it suggests you the
                      skills that your CV needs. Also, I did not know about the
                      ATS thing but maybe that is why my applications were not
                      getting accepted. I am sending out job applications and
                      receiving calls for interview. It really puts me out on
                      the spot.
                    </p>
                  </blockquote>
                  <figcaption className="flex items-center justify-center mt-6 space-x-3">
                    <div className="flex items-center divide-x-2 divide-gray-500 ">
                      <div className="pr-3">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src="/user.png"
                          alt="User Avatar"
                        />
                      </div>
                      <div className="px-3 font-medium text-white">
                        Elizabeth
                      </div>
                      <div className="pl-3 text-sm font-light text-white">
                        Los Angeles, CA
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </section>
          </SwiperSlide>
          <SwiperSlide>
            <section className="bg-blue-950 pt-4">
              <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <figure className="max-w-screen-md mx-auto">
                  <svg
                    className="h-12 mx-auto mb-3 text-white "
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                      fill="currentColor"
                    />
                  </svg>
                  <blockquote>
                    <p className="text-2xl font-medium text-white ">
                      Earlier, I was facing certain struggles with my job
                      applications. Perhaps my CV was not up to the mark. A
                      friend of mine suggested this new website named Genies
                      Career Hub. They use AI for CV Creation and it is so fine.
                      Every mistake gets corrected then and there and the
                      templates are crafted perfectly for the job roles. I
                      witnessed a rise in the callbacks for Interviews which was
                      very helpful. The pricing is better than many others in
                      the market.
                    </p>
                  </blockquote>
                  <figcaption className="flex items-center justify-center mt-6 space-x-3">
                    <div className="flex items-center divide-x-2 divide-gray-500 ">
                      <div className="pr-3">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src="/user.png"
                          alt="User Avatar"
                        />
                      </div>
                      <div className="px-3 font-medium text-white">
                        Elizabeth
                      </div>
                      <div className="pl-3 text-sm font-light text-white">
                        Los Angeles, CA
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </section>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default ComingSoonPage;
