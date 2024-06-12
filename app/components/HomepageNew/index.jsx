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
    max: 35, // max tilt rotation (degrees)
    perspective: 3000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.01, // 2 = 200%, 1.5 = 150%, etc..
    speed: 2000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.50,.98,.52,.99)", // Easing on enter/exit.
  };

  return (
    <>
      {/* <Navbar /> */}
      <section className="flex lg:items-center items-start justify-center w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-[#2C98CA33] relative">
        <div className="container lg:pt-0 pt-20">
          <div className="flex flex-col justify-center space-y-4">
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
                WHERE
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
                  RIGHT JOB
                </span>
                <br />
                MEETS
                <span className="2xl:ml-3 lg:ml-2">RIGHT</span>
                <span className="2xl:ml-3 lg:ml-2">TALENT!</span>
              </h1>
              <p className="max-w-[800px] text-center text-[#7C7C7C] text-[18px]">
                Enriching Professional Experiences and Building Success Stories
                that Resonate with Dreams with Premium CV Templates and
                Industry-Focused Career Counselling.
              </p>
            </div>
            <div className="flex lg:flex-row justify-center  flex-col gap-2 min-[400px]:flex-row ">
              <div className="flex text-lg lh-lg items-center text-white rounded-full bg-[#2C98CA] pl-5 pr-1 py-1 mt-8 mb-10">
                GET STARTED
                <Image
                  className="ml-2 w-auto h-full"
                  src="/btn-arrow.svg"
                  width={42}
                  height={42}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Tilt
                options={defaultOptions}
                style={{ height: 700, width: 1200 }}
              >
                <Image
                  src="/banner-img-2.png"
                  height={700}
                  width={1200}
                  className="w-auto h-full"
                  alt="banner-image"
                />
              </Tilt>
            </div>
            {showFloatingButton && (
              <div className="floating_button flex justify-center text-center w-full">
                <button
                  className="px-10 py-2 text-white rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[20%] z-50"
                  onClick={handleButtonClick}
                >
                  Get Started
                </button>
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
