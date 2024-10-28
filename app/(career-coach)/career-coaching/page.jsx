/** @format */

"use client";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useUserStore } from "../../store/UserStore";
import NewResumeHeader from "../../Layout/NewResumeHeader";
import Header from "../../Layout/Header";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import "@/app/components/HomepageNew/Homepage.css";
import Link from "next/link";
import { ResumeHeader } from "../../Layout/ResumeHeader";

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

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [offset2, setOffset2] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;
    const centerX = offsetWidth / 2;
    const centerY = offsetHeight / 2;
    const moveX = (offsetX - centerX) / 20;
    const moveY = (offsetY - centerY) / 20;
    setOffset({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const handleMouseMove2 = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;
    const centerX = offsetWidth / 2;
    const centerY = offsetHeight / 2;
    const moveX = (offsetX - centerX) / 20;
    const moveY = (offsetY - centerY) / 20;
    setOffset2({ x: moveX, y: moveY });
  };

  const handleMouseLeave2 = () => {
    setOffset2({ x: 0, y: 0 });
  };

  return (
    <>
      {/* {userState?.isAuthenticated ? <NewResumeHeader /> : <Header />} */}
      <ResumeHeader/>
      <section className='flex lg:items-center items-start justify-center pb-8 w-full pt-10 md:pt-10 lg:pt-10  px-5 relative'>
        <div className='container lg:pt-0 pt-10'>
          <div className='flex flex-col justify-center '>
            <Image priority
              src={"/arrowright.png"}
              width={100}
              height={100}
              alt='arrowright'
              className='absolute top-[20%] left-0 w-auto h-auto'
            />
            <Image priority
              src={"/arrowleft.png"}
              width={100}
              height={100}
              alt='arrowright'
              className='absolute top-[30%] right-0 w-auto h-auto'
            />
            <div className='space-y-2 lg:mx-auto mx-0 lg:py-20 py-5'>
              <h1
                className='lg:text-[80px] text-[40px] mt-4 lg:py-10 py-5 flex flex-col md:flex-row sm:flex-row text-center justify-center items-center font-extrabold text-black'
                style={{
                  WebkitTextStrokeWidth: "thin",
                  wordSpacing: "0.8rem",
                }}>
                <span>
                  GROW {""}
                  <span className='text-[#3c72b9]'>FASTER</span> <br></br>WITH A
                  COACH
                </span>
                <span>
                  <img src='/coach.png' className='h-64 ml-4 image-animation' />
                </span>
              </h1>
              <p className='max-w-[800px]  mx-auto text-center text-[#7C7C7C] lg:text-[18px] text-sm'>
                If you are struggling to achieve your professional goals or
                successfully execute your plans, a career coach can guide you
                through career development, job transition, education
                progression, upskilling, and much more. Connect with yours
                today!
              </p>
              <div className='flex lg:flex-row flex-col gap-2 md:gap-8 sm:gap-8 justify-center items-center  py-8'>
                <div className='button_wrapper '>
                  <Link href='/coaches'>
                    <button className='get_start_btn'>
                      <span className='btn_text'>Hire Coach</span>
                      <div className='btn_overlay'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={24}
                          height={24}
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='lucide lucide-arrow-right'>
                          <path d='M5 12h14' />
                          <path d='m12 5 7 7-7 7' />
                        </svg>
                      </div>
                    </button>
                  </Link>
                </div>
                <div className='button_wrapper  flex justify-center lg:justify-start '>
                  <Link href='/coach-registration'>
                    <button className='get_start_btn hire_coach_button'>
                      <span className='btn_text '>Register as Coach</span>
                      <div className='btn_overlay'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={24}
                          height={24}
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='lucide lucide-arrow-right'>
                          <path d='M5 12h14' />
                          <path d='m12 5 7 7-7 7' />
                        </svg>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='flex lg:items-center items-start justify-center w-full pt-12 lg:pt-5 px-5 relative'>
        <div className='max-w-6xl mx-auto  py-10'>
          <div className='flex text-center md:text-left sm:text-left flex-col md:flex-row items-center gap-4'>
            {/* Left Column - Image */}
            <div
              className='w-full text-center md:w-1/2 flex justify-center md:justify-start parallax-container'
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}>
              <img
                src='/cghbo1.png'
                alt='Description of the image'
                className='parallax-image'
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px)`,
                  transition: "transform 0.1s",
                }}
              />
            </div>

            {/* Right Column - Text */}
            <div className='w-full md:w-1/2 mt-8 md:mt-0 md:pl-8'>
              <h2 className='trust font-bold text-gray-800'>
                Trusted By <span className='text-black'>Talent</span> From
                Around The Globe
              </h2>
              <p className='mt-4 text-gray-600'>
                We host a community of talented professionals with years of
                expertise and experience in career counselling for students,
                professionals, and employees worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='flex lg:items-center items-start justify-center w-full pt-12 lg:pt-5 px-5 relative'>
        <div className='max-w-6xl mx-auto  py-10'>
          <div className='flex flex-col md:flex-row items-center gap-4'>
            <div className='w-full text-center md:text-left sm:text-left md:w-1/2 mt-8 md:mt-0 md:pl-8'>
              <h2 className='trust font-bold text-gray-800'>
                Grow as
                <span className='text-black'> Organisations</span>
              </h2>
              <p className='mt-4 text-gray-600'>
                Are you looking to upskill employees with considerable
                potential? Connect with the Genies Career Hub and opt for a
                collaborative Career Coaching experience that focuses on your
                organisational goals.
              </p>
            </div>
            {/* Left Column - Image */}
            <div
              className='w-full text-center md:w-1/2 flex justify-center md:justify-start parallax-container order-first md:order-last'
              onMouseMove={handleMouseMove2}
              onMouseLeave={handleMouseLeave2}>
              <img
                src='/cghbo.png'
                alt='Description of the image'
                className='parallax-image'
                style={{
                  transform: `translate(${offset2.x}px, ${offset2.y}px)`,
                  transition: "transform 0.1s",
                }}
              />
            </div>

            {/* Right Column - Text */}
          </div>
        </div>
      </section>
      <section className='flex area lg:items-center px-5 items-start justify-center pb-8 md:pb-24 lg:pb-32 w-full pt-12 md:pt-16 lg:pt-20 relative'>
        <ul className='circles'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div className='container lg:pt-0 py-10 z-10'>
          <div className='flex flex-col justify-center'>
            <div className='space-y-2 mx-auto'>
              <h1 className='text-[45px] md:text-[80px] sm:text-[80px] mt-4 text-center justify-center flex items-center font-extrabold text-white'>
                Complete Satisfaction
              </h1>
              <div className='flex justify-center mt-4'>
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns='http://www.w3.org/2000/svg'
                    fill='#FFD700'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='#FFD700'
                    className='w-8 h-8 mx-1'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.988 3.003l2.016 6.606h6.907c.637 0 .903.816.391 1.181l-5.609 4.074 2.017 6.606c.178.582-.48.957-.98.638l-5.609-4.073-5.609 4.073c-.5.32-1.158-.056-.98-.638l2.017-6.606-5.609-4.074c-.512-.365-.246-1.181.391-1.181h6.907l2.016-6.606c.178-.582.982-.582 1.16 0z'
                    />
                  </svg>
                ))}
              </div>
              <p className='max-w-[800px] mx-auto text-center text-white text-[18px] pt-4'>
                Our expert solutions have assisted many students, professionals,
                and organisations.
                <br />
                Career Coaches within our reach have lateral experience and
                knowledge of different arenas of professions. <br />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id='learnmore'
        className='flex lg:items-center px-5 items-start justify-center pb-8 mb:pb-24 lg:pb-32 w-full pt-12 md:pt-16 lg:pt-20 relative'>
        <div className='container lg:pt-0 pt-20'>
          <div className='flex flex-col justify-center'>
            <div className='space-y-2 mx-auto'>
              <h1 className='text-[45px] md:text-[80px] sm:text-[80px] mt-4 text-center justify-center items-center font-extrabold'>
                We Offer Coaching For
                <br />
                <span className='text-black'>Every</span> Domain
              </h1>
              <div className='flex justify-center mt-4'></div>
              <p className='max-w-[800px] mx-auto text-center text-gray text-[18px] pt-4'>
                Our career coaching and consultation services cover all aspects
                of employment and education. We assist you after carefully
                analysing your skill set, goals, and current career profile.
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-6xl mx-auto py-10'>
              <div className='p-6 rounded-lg shadow-md bg-[#ceefd0] hover:shadow-custom-dark transition-shadow duration-300'>
                <img
                  src='/careergrowth.png'
                  alt='Career Growth'
                  className='w-full h-96 object-cover rounded-md bg-[#88e48d]'
                />
                <h2 className='text-2xl font-bold mt-4'>Career Development</h2>
                <p className='mt-2 text-gray-600'>
                  Confused about what line to pick, how to execute your career
                  goals, what university or school to target, or something else?
                  Our Career Coaches have all the answers you need.
                </p>
                <div className='button_wrapper mt-8'>
                  <Link href='/contact-us'>
                    <button
                      className='get_start_btn'
                      style={{ background: "#88e48d", border: "none" }}>
                      <span className='btn_text'>Hire Coach</span>
                      <div className='btn_overlay'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={24}
                          height={24}
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='lucide lucide-arrow-right'>
                          <path d='M5 12h14' />
                          <path d='m12 5 7 7-7 7' />
                        </svg>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>

              <div className='p-6 rounded-lg shadow-md bg-[#f1b38c] hover:shadow-custom-dark transition-shadow duration-300'>
                <img
                  src='/leadership.png'
                  alt='Leadership Skills'
                  className='w-full h-96 object-cover rounded-md bg-[#ff914c]'
                />
                <h2 className='text-2xl font-bold mt-4'>Skill Advancement</h2>
                <p className='mt-2 text-gray-600'>
                  Wondering how to move to greater positions within your
                  organisation? Our Career advisors interest you with guidance
                  and pick out the best resources for you to refer to and
                  upskill.
                </p>
                <div className='button_wrapper mt-8'>
                  <Link href='/contact-us'>
                    <button
                      className='get_start_btn'
                      style={{ background: "#ff914c", border: "none" }}>
                      <span className='btn_text'>Hire Coach</span>
                      <div className='btn_overlay'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={24}
                          height={24}
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='lucide lucide-arrow-right'>
                          <path d='M5 12h14' />
                          <path d='m12 5 7 7-7 7' />
                        </svg>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>

              <div className='p-6 rounded-lg shadow-md bg-[#ffe1e1] hover:shadow-custom-dark transition-shadow duration-300'>
                <img
                  src='/jobtransition.png'
                  alt='Job Transition'
                  className='w-full h-96 object-cover rounded-md bg-[#fe9e9f]'
                />
                <h2 className='text-2xl font-bold mt-4'>Job Transition</h2>
                <p className='mt-2 text-gray-600'>
                  Aiming for a Career Change or a Job Switch but not 100% sure
                  if this is the right path? Our Career Advisor will help you
                  through all the dilemmas and create a strategy for you.
                </p>
                <div className='button_wrapper mt-8'>
                  <Link href='/contact-us'>
                    {" "}
                    <button
                      className='get_start_btn'
                      style={{ background: "#fe9e9f", border: "none" }}>
                      <span className='btn_text'>Hire Coach</span>
                      <div className='btn_overlay'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={24}
                          height={24}
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='lucide lucide-arrow-right'>
                          <path d='M5 12h14' />
                          <path d='m12 5 7 7-7 7' />
                        </svg>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>

              <div className='p-6 rounded-lg shadow-md bg-[#bac2f1] hover:shadow-custom-dark transition-shadow duration-300'>
                <img
                  src='/perfomance.png'
                  alt='Performance Enhancement'
                  className='w-full h-96 object-cover rounded-md bg-[#8d9df1]'
                />
                <h2 className='text-2xl font-bold mt-4'>
                  Professional Refinement
                </h2>
                <p className='mt-2 text-gray-600'>
                  Seeking more from your Career as a Professional but wondering
                  what direction you must pick? Our Life Coach services can help
                  you with personalised advice and approach.
                </p>
                <div className='button_wrapper mt-8'>
                  <Link href='/contact-us'>
                    {" "}
                    <button
                      className='get_start_btn'
                      style={{ background: "#8d9df1", border: "none" }}>
                      <span className='btn_text'>Hire Coach</span>
                      <div className='btn_overlay'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={24}
                          height={24}
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='lucide lucide-arrow-right'>
                          <path d='M5 12h14' />
                          <path d='m12 5 7 7-7 7' />
                        </svg>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='flex lg:items-center px-5 items-start justify-center w-full pt-12 relative'>
        <div className='max-w-6xl mx-auto py-10'>
          <div className='flex flex-col justify-center text-center md:text-left sm:text-left md:flex-row items-center gap-4'>
            {/* Left Column - Text */}
            <div className='w-full md:w-[40%] mt-8 md:mt-0 md:pl-8'>
              <h2 className='trust font-bold text-gray-800'>
                A Traditional &{" "}
                <span className='text-black'>Transparent</span> Career
                Coaching
              </h2>
              <p className='mt-4 text-gray-600'>
                Experience the best of Career Consultancy with us at Genies
                Career Hub. Our supportive community of Career Advisors will
                assist you in achieving your career goals!
              </p>
              <div className='button_wrapper mt-8 flex justify-center lg:justify-start'>
                <Link href='/about-us'>
                  <button className='get_start_btn'>
                    <span className='btn_text'>Learn More</span>
                    <div className='btn_overlay'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-arrow-right'>
                        <path d='M5 12h14' />
                        <path d='m12 5 7 7-7 7' />
                      </svg>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
            {/* Right Column - Image and Features */}
            <div className='w-full md:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-10'>
              <div className='flex flex-col items-center sm:items-start gap-4'>
                <div className='flex justify-center sm:justify-start w-full'>
                  <img
                    src='/vetted.png'
                    alt='Vetted Coaches'
                    className='w-60 h-48'
                  />
                </div>
                <h3 className='text-xl font-bold text-gray-800 text-center sm:text-left'>
                  Vetted Coaches
                </h3>
                <p className='mt-2 text-gray-600 text-center sm:text-left'>
                  Connect with career coaches who have lateral experience in
                  numerous professions.
                </p>
              </div>
              <div className='flex flex-col items-center sm:items-start gap-4'>
                <div className='flex justify-center sm:justify-start w-full'>
                  <img
                    src='/instantly.png'
                    alt='Instantly Schedule'
                    className='w-60 h-48'
                  />
                </div>
                <h3 className='text-xl font-bold text-gray-800 text-center sm:text-left'>
                  Instantly Schedule
                </h3>
                <p className='mt-2 text-gray-600 text-center sm:text-left'>
                  Escape the scheduling and appointment hassle. With us, you
                  instantly schedule.
                </p>
              </div>
              <div className='flex flex-col items-center sm:items-start gap-4'>
                <div className='flex justify-center sm:justify-start w-full'>
                  <img
                    src='/easymeeting.png'
                    alt='Easy Meeting'
                    className='w-60 h-48'
                  />
                </div>
                <h3 className='text-xl font-bold text-gray-800 text-center sm:text-left'>
                  Easy Meeting
                </h3>
                <p className='mt-2 text-gray-600 text-center sm:text-left'>
                  Easy meeting structure decoded to ease and automate the
                  connection processes.
                </p>
              </div>
              <div className='flex flex-col items-center sm:items-start gap-4'>
                <div className='flex justify-center sm:justify-start w-full'>
                  <img
                    src='/easymessage.png'
                    alt='Easy Message'
                    className='w-60 h-48'
                  />
                </div>
                <h3 className='text-xl font-bold text-gray-800 text-center sm:text-left'>
                  Quick Texting
                </h3>
                <p className='mt-2 text-gray-600 text-center sm:text-left'>
                  Experience smooth connection flow with rapid and easy texting
                  with your coach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='bg-blue-950'>
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
          className='mySwiper'>
          <SwiperSlide>
            <section className='bg-blue-950 pt-4'>
              <div className='max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6'>
                <figure className='max-w-screen-md mx-auto'>
                  <svg
                    className='h-12 mx-auto mb-3 text-white '
                    viewBox='0 0 24 27'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z'
                      fill='currentColor'
                    />
                  </svg>
                  <blockquote>
                    <p className='lg:text-2xl text-sm font-medium text-white '>
                    I was having some real trouble with job applications; presumably, my CV was not that good. Then, one of my friends said something about a new website called Genies Career Hub. They use AI in making your CV, and it's simply incredible. It instantly corrects every error, frames perfect templates for the different types of job roles. And I started seeing an increase in interview callbacks, which really helped. The price is also more competitive when compared to many others in the market. I am actually looking forward to getting other services also.
                    </p>
                  </blockquote>
                  <figcaption className='flex items-center justify-center mt-6 space-x-3'>
                    <div className='flex items-center divide-x-2 divide-gray-500 '>
                      <div className='pr-3'>
                        <img
                          className='h-10 w-10 rounded-full object-cover'
                          src='/user.png'
                          alt='User Avatar'
                        />
                      </div>
                      <div className='px-3 font-medium text-white'>
                        Nicholas
                      </div>
                      <div className='pl-3 text-sm font-light text-white'>
                        Bath,UK
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </section>
          </SwiperSlide>
          <SwiperSlide>
            <section className='bg-blue-950 pt-4'>
              <div className='max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6'>
                <figure className='max-w-screen-md mx-auto'>
                  <svg
                    className='h-12 mx-auto mb-3 text-white '
                    viewBox='0 0 24 27'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z'
                      fill='currentColor'
                    />
                  </svg>
                  <blockquote>
                    <p className='lg:text-2xl text-sm font-medium text-white '>
                    I used to be like, "Why is it a hassle making a CV?", and I would always feel utterly unmotivated while doing it. But Genies Career Hub made this all so much easier. Its use of AI is brilliant; it even suggests the skills that should go on your CV. I'd heard about something called Applicant Tracking Systems, but I didn't know anything about them, and for a while, I thought that could be the reason my applications weren't getting through. Now, I send in applications and get interview calls; it's really put me in the spotlight!
                    </p>
                  </blockquote>
                  <figcaption className='flex items-center justify-center mt-6 space-x-3'>
                    <div className='flex items-center divide-x-2 divide-gray-500 '>
                      <div className='pr-3'>
                        <img
                          className='h-10 w-10 rounded-full object-cover'
                          src='/user.png'
                          alt='User Avatar'
                        />
                      </div>
                      <div className='px-3 font-medium text-white'>Debbie</div>
                      <div className='pl-3 text-sm font-light text-white'>
                        Brighton, UK
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </section>
          </SwiperSlide>
          <SwiperSlide>
            <section className='bg-blue-950 pt-4'>
              <div className='max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6'>
                <figure className='max-w-screen-md mx-auto'>
                  <svg
                    className='h-12 mx-auto mb-3 text-white '
                    viewBox='0 0 24 27'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z'
                      fill='currentColor'
                    />
                  </svg>
                  <blockquote>
                    <p className='lg:text-2xl text-sm font-medium text-white '>
                    I used to struggle with my job applications, and my CV probably wasn't that good. A pal recommended this website: Genies Career Hub. They use AI in the creation of your CV, and it's great. Every little mistake is corrected on the spot, and the templates are great, really tailored for each job position. I can also see an increase in interview callbacks, which helps a lot. It is a lot cheaper compared to many other services.
                    </p>
                  </blockquote>
                  <figcaption className='flex items-center justify-center mt-6 space-x-3'>
                    <div className='flex items-center divide-x-2 divide-gray-500 '>
                      <div className='pr-3'>
                        <img
                          className='h-10 w-10 rounded-full object-cover'
                          src='/user.png'
                          alt='User Avatar'
                        />
                      </div>
                      <div className='px-3 font-medium text-white'>Salome</div>
                      <div className='pl-3 text-sm font-light text-white'>
                        Livingston, CA
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
