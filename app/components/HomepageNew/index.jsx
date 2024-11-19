/** @format */

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "../../../components/component/Slider";
import { ServiceSection } from "@/components/component/service-section";
import TabResume from "@/components/component/TabResume";
import FAQSection from "@/components/component/FAQSection";
import WorkTogether from "@/components/component/WorkTogether";
import GetStartedModal from "@/components/component/GetStartedModal";
import CourseSlider from "@/components/component/CourseSlider";
import "./Homepage.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function HomepageNew() {
  const router = useRouter();
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

  function renderServiceCards() {
    const services = [
      {
        src: "/s1.svg",
        alt: "Expert Advice 24/7",
        title: "Expert Advice 24/7",
        description:
          "Gain access to expert career advice anytime to excel in your chosen field.",
      },
      {
        src: "/s2 (2).svg",
        alt: "What Career is Best for You",
        title: "What Career is Best for You",
        description:
          "Discover the best career paths suited to your personality and skills.",
      },
      {
        src: "/s3.svg",
        alt: "Real Life Experts Talk",
        title: "Real Life Experts Talk",
        description:
          "Interact with industry leaders to get insights into professional success.",
      },
      {
        src: "/s4.svg",
        alt: "Write the CV that Gets You the Dream Job",
        title: "Write the CV that Gets You the Dream Job",
        description:
          "Create a resume that stands out and opens doors to new opportunities.",
      },
    ];

    return services.map((service, index) => (
      <div
        key={index}
        className="p-4 bg-white rounded-xl border-2 shadow-lg border-[#0d3572] sm:px-8 sm:py-4 sm:mt-16"
      >
        <div className="flex justify-center -mt-12 sm:-mt-16">
          <img
            className="w-16 h-16 border-2 bg-white border-[#0d3572] rounded-full sm:w-20 sm:h-20"
            src={service.src}
            alt={service.alt}
          />
        </div>
        <p className="mt-2 text-lg font-bold text-black sm:text-2xl">
          {service.title}
        </p>
        <p className="mt-2 text-xs text-black sm:text-sm sm:text-md whitespace-normal">
          {service.description}
        </p>
      </div>
    ));
  }

  const handleAtsButtonClick = () => {
    router.push("/resume?atsbutton=true");
  };

  return (
    <>
      <section className="w-full min-h-screen sm:top-0 p-4 pt-28 sm:p-18 bg-gray-100 text-black flex items-center">
        <div className="flex flex-col items-center justify-between gap-0 sm:gap-8 w-full mx-auto">
          <div className="flex flex-col xs:flex-row items-center max-w-6xl 2xl:mt-10 lg:mt-5">
            <div className="text-start">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] 2xl:text-8xl font-extrabold mb-4 sm:mb-6 xs:text-start text-center">
                Super Charge Your <span className="text-blue-700">Career</span>{" "}
                Potential
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium mb-4 sm:mb-10 lg:mb-5 max-w-4xl text-center xs:text-start mx-auto">
                We have a passion to mentor you on your entire career path, help
                you realize what you want to do, how to get into that career,
                and utilise experts to guide you on how to excel within it.
              </p>
              <div className="flex justify-center xs:justify-start">
                <button
                  onClick={handleButtonClick}
                  className="bg-blue-950 text-white py-3 px-8 rounded border-2 border-transparent transition duration-300 hover:bg-blue-700 hover:border-blue-500"
                >
                  Get Started
                </button>
              </div>
            </div>
            <Image
              priority
              src="/v1.png"
              alt="home-creative-down"
              height={300}
              width={450}
              className="2xl:w-[500px] 2xl:h-[400px] lg:w-[500px] lg:h-[300px] object-contain"
            />
          </div>
          <div className="flex-1 w-full overflow-hidden relative">
            <div className="hidden lg:flex animate-marquee whitespace-nowrap p-9">
              {Array(2)
                .fill()
                .map((_, index) => (
                  <div key={index} className="flex gap-8 me-8">
                    {renderServiceCards()}
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4 gap-y-10 lg:hidden pt-10 pb-10">
              {renderServiceCards()}
            </div>
          </div>
        </div>
      </section>
      <section className="ats_section bg-blue-50 relative bg-[url('/ats-bg.png')] bg-contain bg-right bg-no-repeat">
        <div className="max-w-7xl mx-auto py-10">
          <div className="grid md:grid-cols-2 grid-cols-1 h-full place-items-center md:gap-0 gap-10">
            <div className="grid-span-6 md:px-20 px-5">
              <h2 className="md:text-4xl text-[25px] text-black">
                Are you struggling to land a interview
                <span className="text-[#1D4ED8] font-medium ml-2">
                  try ATS friendly CV and land dream job
                </span>
              </h2>
              <p className="text-sm my-5">
                In today&apos;s competitive job market, your CV is your first
                impression—and it needs to pass not only human scrutiny but also
                Applicant Tracking Systems (ATS). Here&apos;s why an ATS-friendly CV
                could be the game-changer you&apos;ve been looking for:
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <strong className="text-[#1D4ED8]">
                    Increased Visibility
                  </strong>{" "}
                  - ATS scans and filters resumes before they reach recruiters.
                  An ATS-friendly CV ensures your application gets noticed by
                  aligning with job-specific keywords and formatting standards.
                </li>
                <li>
                  <strong className="text-[#1D4ED8]">
                    Enhanced Keyword Optimization
                  </strong>{" "}
                  - By integrating relevant keywords, your CV ranks higher in
                  searches, aligning perfectly with the role&apso;s requirements.
                </li>
                <li>
                  <strong className="text-[#1D4ED8]">
                    Professional Formatting
                  </strong>{" "}
                  - ATS systems often reject resumes with fancy fonts, graphics,
                  or unconventional layouts. A clean, structured format
                  increases your chances of passing the ATS filter.
                </li>
              </ul>
              <div className="buttons_actions mt-5">
                <Button onClick={handleAtsButtonClick}>
                  Build an ATS-friendly CV
                </Button>
              </div>
            </div>
            <div className="grid-span-6">
              <div className="resume_parent">
                <img className="resume_img_1" src="/15.png" />
                <img className="resume_img_2" src="/17.png" />
                <img className="resume_img_3" src="/18.png" />
                <img className="resume_img_4 md:block hidden" src="/16.png" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full z-40 relative">
        <div className="text-center xs:mt-5 z-50 p-10 border-t-2 lg:rounded-t-[50px] rounded-t-[20px] bg-white">
          <h2 className="lg:text-5xl text-3xl font-bold ">
            How Career Genies Hub helps you
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 sm:py-20 bg-white">
          <div className="lg:flex align-middle overflow-hidden hidden -ml-16">
            <Image
              src={"/home-creative-down.png"}
              width={2000}
              height={1500}
              alt="discover"
              className=" p-4 sm:p-10"
            />
          </div>
          <div className="my-auto p-4 sm:p-10">
            <CourseSlider />
          </div>
        </div>
        <Slider />
        <TabResume />
        <WorkTogether />
        {/* <FAQSection /> */}
        <ServiceSection />
      </section>

      {showModal && <GetStartedModal onClose={handleCloseModal} />}

      {showFloatingButton && (
        <div className="fixed bottom-4 left-0 right-0 w-full flex justify-center">
          <button
            className="bg-[#2C98CA] text-white py-3 px-8 rounded hover:bg-blue-700 transition duration-300 hidden xs:block"
            onClick={handleButtonClick}
          >
            <span>Explore Now</span>
            <div>
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
      )}
    </>
  );
}
