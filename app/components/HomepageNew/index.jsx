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

  return (
    <>
      {/* <Navbar /> */}
      <section className="flex lg:items-center items-start justify-center w-full pt-12 md:pt-24 lg:pt-32 bg-gradient-to-b from-white to-[#5dcafd33] relative">
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
              <h1 className="text-[80px] mt-4 text-center   font-extrabold text-[#0D3572]">
                SKYROCKETING
                <span
                  className="text-[#2C98CA] ml-4"
                  style={{
                    display: "inline-block",
                    transform: "translateY(-10px) rotate(-2.76deg)",
                    border: "2px solid #808080",
                    padding: "0px 10px",
                    lineHeight: "1.2",
                  }}
                >
                  CAREER,
                </span>
                <br />
                WITH
                <span className="2xl:ml-3 lg:ml-2">AI-POWERED </span>
                <span className="2xl:ml-3 lg:ml-2">CV!</span>
              </h1>
              <p className="max-w-[800px]  mx-auto text-center text-[#7C7C7C] text-[18px]">
                We believe in bridging the gap between your aspirations and the
                perfect job role that matches your skills. With our intuitive
                job matching system and dedicated support, we empower you to
                take the leap towards a career that ignites your professional
                drive.
              </p>
            </div>
            <div className="flex lg:flex-row justify-center  flex-col  min-[400px]:flex-row ">
              {/* <div className="flex text-lg lh-lg items-center text-white rounded-full bg-[#2C98CA] pl-5 pr-1 py-1 mt-8 mb-10">
                GET STARTED
                <Image
                  className="ml-2 w-auto h-full"
                  src="/btn-arrow.svg"
                  width={42}
                  height={42}
                />
              </div> */}
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
                  src="/home-creative-top.png"
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
      </section>
      <Slider />
      <TabResume />
      <WorkTogether />
      <FAQSection />
      <ServiceSection />
    </>
  );
}
