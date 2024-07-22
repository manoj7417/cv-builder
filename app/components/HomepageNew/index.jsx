/** @format */

"use client";
import Link from "next/link";
import NewNavbar from "../../ui/newNav";
import Slider from "../../../components/component/Slider";
import { ServiceSection } from "@/components/component/service-section";
import Footer from "../../ui/newFooter";
import Navbar from "../../ui/newNav";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Tilt } from "react-tilt";
import TabResume from "@/components/component/TabResume";
import FAQSection from "@/components/component/FAQSection";
import WorkTogether from "@/components/component/WorkTogether";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import GetStartedModal from "@/components/component/GetStartedModal";
import "./Homepage.css";
import CourseSlider from "@/components/component/CourseSlider";

export default function HomepageNew() {
  const [hovered, setHovered] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      // Adjust the scroll value as needed
      setShowFloatingButton(true);
    } else {
      setShowFloatingButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleHover = () => {
    setHovered(!hovered);
  };

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

  const words = [
    "Build your CV",
    "Find career path",
    "Identify skill gaps",
    "Get career coach",
    "Take personality test",
  ]; // Add more words as needed
  const images = [
    "/build-your-cv.png",
    "/find-career-path.png",
    "/identify-skill-gap.png",
    "/get-career-councelling.png",
    "/take-personality-test.png",
  ];
  const interval = 3000; // 2000ms or 2 seconds for each word
  const [index, setIndex] = useState(0);
  const [wordOpacity, setWordOpacity] = useState(1);

  //  Handle opacity transitions
  useEffect(() => {
    const fadeOut = setTimeout(() => {
      setWordOpacity(0);
    }, interval - 500); // Start fade-out 0.5s before interval ends

    return () => clearTimeout(fadeOut);
  }, [index, interval]);

  // Handle index cycling and reset opacity
  useEffect(() => {
    const cycle = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
      setWordOpacity(1); // Reset opacity when index changes
    }, interval);

    return () => clearInterval(cycle);
  }, [words.length, interval]);

  // useEffect(() => {
  //   const cycle = setInterval(() => {
  //     setIndex((prevIndex) => (prevIndex + 1) % words.length);
  //   }, interval);
  //   return () => clearInterval(cycle);
  // }, [words, interval]);

  // useEffect(() => {
  //   const fadeOut = setTimeout(() => {
  //     setWordOpacity(0);
  //   }, interval - 500); // Start fade-out 0.5s before interval ends

  //   const cycle = setInterval(() => {
  //     setIndex((prevIndex) => (prevIndex + 1) % words.length);
  //     setWordOpacity(1);
  //   }, interval);

  //   return () => {
  //     clearInterval(cycle);
  //     clearTimeout(fadeOut);
  //   };
  // }, [index, interval]);

  return (
    <>
      <section className='flex flex-col lg:flex-row lg:items-center items-start justify-center w-full pt-12 md:pt-24 lg:pt-10 bg-gradient-to-b from-white to-[#5dcafd33] relative'>
        <div className='container lg:pt-32 pt-20'>
          <div className='flex flex-col justify-center items-center'>
            <Image
              src={"/arrowright.png"}
              width={100}
              height={100}
              alt='arrowright'
              className='absolute top-[20%] left-0 w-auto h-auto'
            />
            <Image
              src={"/arrowleft.png"}
              width={100}
              height={100}
              alt='arrowright'
              className='absolute top-[30%] right-0 w-auto h-auto'
            />
            <div className='space-y-2 mx-auto text-center h-[300px] mt-40'>
              <h1 className='text-[32px] md:text-[50px] lg:text-[70px] mt-4 flex lg:flex-row flex-col items-center justify-center font-extrabold text-[#0D3572] h-[100px]'>
                <span
                  className={`mx-2 md:mx-4 lg:mx-10 slide-text-container ${
                    wordOpacity === 1 ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-500`}>
                  <span className='slide-text fade-text' key={index}>
                    {words[index]}
                    <Image
                      src={images[index]}
                      width={500}
                      height={500}
                      alt={words[index]}
                      className='ml-4 min-h-[400px] min-w-[400px] md:min-h-[400px] md:min-w-[400px]'
                      priority
                    />
                  </span>
                </span>
              </h1>
              <h1 className='text-[30px] md:text-[60px] lg:text-[100px] font-extrabold text-[#0D3572] fixed_content'>
                <span className='2xl:ml-3 lg:ml-1 lg:px-0 px-2'>
                  with Genies Career Hub
                </span>
              </h1>
              <p className='max-w-[800px] mx-auto text-center text-[#7C7C7C] text-[14px] md:text-[16px] lg:text-[18px] lg:px-0 px-5'>
                Stand out in the Job Market with Genies Career Hub’s integrated
                services in Career Assistance. We help you find the right Career
                Path, maximise your professional skills, build your job-winning
                resume, and grow your career dynamically.
              </p>
            </div>
            <div className='flex flex-col lg:flex-row justify-center min-[400px]:flex-row mt-8'>
              <div className='button_wrapper'>
                <button className='get_start_btn' onClick={handleButtonClick}>
                  <span className='btn_text'>Explore Now</span>
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
              </div>
            </div>

            {/* <div className="flex justify-center mt-10">
              <Tilt options={defaultOptions}>
                <Image
                  src="/career genie website images (2) (1).png"
                  width={1300}
                  height={1000}
                  className="w-full h-auto max-w-full"
                  alt="banner-image"
                />
              </Tilt>
            </div> */}
            {showFloatingButton && (
              <div className='floating_button fixed bottom-0 left-0 right-0 w-full flex justify-center'>
                <div className='button_wrapper mb-5'>
                  <button
                    className='get_start_btn floating'
                    onClick={handleButtonClick}>
                    <span className='btn_text'>Explore Now</span>
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
                </div>
              </div>
            )}
          </div>
        </div>
        <div></div>
        {showModal && <GetStartedModal onClose={handleCloseModal} />}
      </section>
      <section className='grid lg:grid-cols-2 grid-cols-1 py-20 bg-gradient-to-t from-blue-100 to-[#5dcafd33]'>
        <div className='discover_image lg:flex align-middle overflow-hidden hidden'>
          <Image
            src={"/home-creative-down.png"}
            width={2000}
            height={1500}
            alt='discover'
            loading='lazy'
            style={{
              marginLeft: "-150px",
            }}
          />
        </div>
        <div className='my-auto p-10'>
          <CourseSlider />
        </div>
      </section>

      {/* <section className="flex lg:items-center items-start justify-center w-full pt-12 md:pt-24 lg:pt-32 bg-gradient-to-b from-white to-[#5dcafd33] relative">
        <div className="container lg:pt-0 pt-20">
          <div className="flex flex-col justify-center items-center">
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
            <div className="space-y-2 mx-auto text-center">
              <h1 className="text-[75px] mt-4 text-center flex  lg:flex-row flex-col items-center justify-center  font-extrabold text-[#0D3572]">
                <span
                  className="mx-10 slide-text-container"
                >
                  <span className="slide-text" key={index}>
                    {words[index]}
                    <Image
                      src={images[index]}
                      width={350}
                      height={350}
                      alt={words[index]}
                      className="ml-4 min-h-[200px] min-w-[200px]"
                    />
                  </span>
                </span>
              </h1>
              <h1 className="text-[100px] text-center font-extrabold text-[#0D3572]" style={{
                marginTop:"-75px"
              }}>
                <span className="2xl:ml-3 lg:ml-1">with Genies Career Hub</span>
              </h1>
              <p className="max-w-[800px]  mx-auto text-center text-[#7C7C7C] text-[18px]">
                Stand out in the Job Market with Genies Career Hub’s integrated
                services in Career Assistance. We help you find the right Career
                Path, maximise your professional skills, build your job-winning
                resume, and grow your career dynamically.
              </p>
            </div>
            <div className="flex lg:flex-row justify-center  flex-col  min-[400px]:flex-row ">
              <div className="button_wrapper mt-8">
                <button className="get_start_btn" onClick={handleButtonClick}>
                  <span className="btn_text">Explore Now</span>
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
            <div className="flex justify-center">
              <Tilt options={defaultOptions}>
                <Image
                  src="/career genie website images (2) (1).png"
                  width={1300}
                  height={1000}
                  className=""
                  alt="banner-image"
                />
              </Tilt>
            </div>
            {showFloatingButton && (
              <div className="floating_button fixed bottom-0 left-0 right-0 w-full flex justify-center">
                <div className="button_wrapper mb-5">
                  <button
                    className="get_start_btn floating"
                    onClick={handleButtonClick}
                  >
                    <span className="btn_text">Explore Now</span>
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
            )}
          </div>
        </div>
        <div></div>
        {showModal && <GetStartedModal onClose={handleCloseModal} />}
      </section> */}
      <Slider />
      <TabResume />
      <WorkTogether />
      <FAQSection />
      <ServiceSection />
    </>
  );
}
