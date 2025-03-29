/** @format */

"use client";
import { useEffect, useState, Suspense } from "react";
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
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import { FaUserCheck, FaFileAlt, FaHeadset } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <p></p>,
});

const features = [
  {
    title: "Easy to Use",
    description:
      "You can easily choose a theme & update your information in our input fields and save it, then your required resume will be ready.",
    icon: <FaUserCheck className="text-[#1e3a8a] text-5xl mb-4" />,
  },
  {
    title: "Make CV Online",
    description:
      "You can easily choose a theme & update your information in our input fields and save it, then your required resume will be ready.",
    icon: <FaFileAlt className="text-[#1e3a8a] text-5xl mb-4" />,
  },
  {
    title: "Get Support 24/7",
    description:
      "You can easily choose a theme & update your information in our input fields and save it, then your required resume will be ready.",
    icon: <FaHeadset className="text-[#1e3a8a] text-5xl mb-4" />,
  },
];
const faqs = [
  {
    question: "What is ProjectX Resume?",
    answer:
      "ProjectX Resume is a platform to create, edit, and download professional resumes using customizable templates.",
  },
  {
    question: "Is ProjectX Resume really free?",
    answer:
      "Yes! ProjectX Resume offers free resume templates and tools to get started easily.",
  },
  {
    question:
      "Should I use a resume template? Can I create my own resume template?",
    answer:
      "You can choose from our templates or create your own – the choice is yours!",
  },
  {
    question: "Which is the best resume template?",
    answer:
      "The best template depends on your industry, experience, and preference. We provide several modern and professional options.",
  },
  {
    question: "Can you give me feedback on my resume?",
    answer:
      "Yes, ProjectX Resume offers AI-powered resume feedback to improve your content and formatting.",
  },
  {
    question: "Will my resume be made public?",
    answer:
      "No, your resume is private unless you choose to share or publish it.",
  },
];
const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

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
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
    router.push("/resume?ats=true");
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <section className="w-full min-h-[90vh] sm:top-0 p-4 pt-20 sm:p-18 bg-white text-black flex items-center">
        <div className="flex flex-col items-center justify-between gap-0 sm:gap-8 w-full mx-auto">
          <div className="flex flex-col xs:flex-row items-center max-w-6xl 2xl:mt-10 lg:mt-5">
            {/* <div className="text-start">
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
            </div> */}

            <div className="max-w-7xl mx-auto text-center">
              {/* #1 Resume Builder Badge */}
              <div>
                <div className="mb-4 text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  THE #1 RESUME BUILDER
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Create a Job-Ready Resume in Minutes
                </h1>
              </div>
              <div>
                {/* Description */}
                <p className="text-lg text-gray-500 mb-6">
                  Create your resume easily with our free builder and
                  professional templates.
                </p>

                {/* Button */}
                <button
                  onClick={handleButtonClick}
                  className="bg-[#1e3a8a] text-white py-3 px-8 rounded border-2 border-transparent transition duration-300 hover:bg-blue-700 hover:border-blue-500"
                >
                  Get Started
                </button>
              </div>
            </div>

            <Image
              priority="true"
              src="/cv.png"
              alt="home-creative-down"
              height={300}
              width={450}
              className="2xl:w-[500px] 2xl:h-[400px] lg:w-[500px] lg:h-[300px] object-contain"
            />
          </div>
          {/* <div className="flex-1 w-full overflow-hidden relative">
            <div className="hidden lg:flex animate-marquee  whitespace-nowrap p-9">
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
          </div> */}
        </div>
      </section>
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              {feature.icon}
              <h3 className="text-xl font-bold text-[#1e3a8a] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm max-w-xs">
                {feature.description}
              </p>
              <h1>dksfjslkdfjlksdj</h1>
            </div>
          ))}
        </div>
      </section>
      <section className=" py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left Image Block */}
          <div className="relative">
            <div className="w-full h-72 flex items-center justify-center">
              <Image
                src={"/banner2.png"}
                width={1500}
                height={1500}
                alt="discover"
                className=" p-4 sm:p-10"
              />
            </div>
          </div>

          <div>
            <p className="text-[#1e3a8a] font-semibold uppercase mb-2">
              How it works
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              3 Steps.
              <br />5 Minutes.
            </h2>
            <p className="text-gray-500 mb-6">
              Getting that dream job can seem like an impossible task. We are
              here to change that. Give yourself a real advantage with the best
              online resume maker: created by experts, improved by data, trusted
              by millions of professionals.
            </p>
            <button className="bg-[#1e3a8a] text-white px-6 py-2 rounded-lg shadow  transition">
              Create Resume Now
            </button>
          </div>
        </div>

        {/* Step Boxes */}
        <div className="mt-20 flex justify-center items-center ">
          {/* Step 1 */}
          <div className="max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 ">
            <div className="bg-gray-100 text-gray-900  p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-black text-white  font-bold text-xl w-10 h-10 flex items-center justify-center rounded-xl">
                  1.
                </div>
                {/* <div className="w-full h-1 bg-white rounded ml-4"></div> */}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Choose a Free Resume Template
              </h3>
              <p className="text-sm">
                You have got plenty of formatting and style options
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-100 text-gray-900 p-6 rounded-2xl shadow-md">
              <div className="bg-black text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-xl mb-4">
                2.
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Customize the Design
              </h3>
              <p className="text-sm text-gray-600">
                Make your own resume easily and customize all content
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-100 text-gray-900 p-6 rounded-2xl shadow-md">
              <div className="bg-black text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-xl mb-4">
                3.
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Download as PDF or Web
              </h3>
              <p className="text-sm text-gray-600">
                Download your resume or share your own online resume website
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="ats_section bg-blue-50 relative bg-[url('/ats-bg.png')] bg-contain bg-right bg-no-repeat">
        <div className="max-w-7xl mx-auto py-10">
          <div className="grid md:grid-cols-2 grid-cols-1 h-full place-items-center md:gap-0 gap-48">
            <div className="grid-span-6 md:px-20 px-5">
              <p className="md:text-4xl text-[25px] text-black font-bold">
                Facing CV Rejections? It&apos;s Time for You to start creating
                <span className="text-[#1D4ED8] font-bold ml-2">
                  ATS-Friendly CVs!
                </span>
              </p>
              <p className="text-sm my-5">
                Sending out CVs as a part of a job application is the first and
                non-negotiable step. However, many job applications get rejected
                in this very process because employers, recruiters, or companies
                now depend on <b>ATS scanner</b>. These are{" "}
                <b>Application Tracking System</b> scrutinises for your
                information before manual checks. But in case your CV is not
                compatible with the ATS, it gets rejected, irrespective of the
                quality of your profile.
              </p>
              <p className="text-sm my-5">
                Thus, you need to build <b>resume formatting</b> that passes
                through every <b>ATS Checker</b>. Genies Career Hub is the exact
                change in approach that you need. Here&apos;s how we amplify
                your CV-making process to eliminate rejection:
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <strong className="text-[#1D4ED8]">
                    Right ATS Resume Format
                  </strong>{" "}
                  -Templates that fit right into the <b>ATS system</b> and{" "}
                  <b>CV checker</b>
                  format.
                </li>
                <li>
                  <strong className="text-[#1D4ED8]">Optimisation</strong> -
                  <b>Enhanced CV</b> with keyword and format optimised content
                  for assured <b>ATS CV Checker</b> approval
                </li>
                <li>
                  <strong className="text-[#1D4ED8]">
                    Professional Insights Integrated
                  </strong>{" "}
                  - An <b>ATS friendly resume</b> that is created by carefully
                  integrating career professional insights
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
                <img
                  className="resume_img_1"
                  src="/15.png"
                  alt="15AtsImage"
                  sizes="100px"
                  width={100}
                  height={100}
                />
                <img className="resume_img_2" src="/17.png" alt="17AtsImage" />
                <img className="resume_img_3" src="/18.png" alt="18AtsImage" />
                <img
                  className="resume_img_4 md:block hidden"
                  src="/16.png"
                  alt="18AtsImage"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="w-full z-40 relative">
        {/* <div className="text-center xs:mt-5 z-50 p-10 border-t-2 lg:rounded-t-[50px] rounded-t-[20px] bg-white">
          <h2 className="lg:text-5xl text-3xl font-bold ">
            How Genies Career Hub helps you
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
        </div> */}
        <Slider />
        <TabResume />
        <WorkTogether />
        <ServiceSection />
        <div className="min-h-screen bg-white py-12 px-6 md:px-20">
          <h2 className="text-sm text-blue-600 text-center font-medium uppercase mb-2">
            FAQ
          </h2>
          <h1 className="text-4xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h1>

          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4">
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <span className="text-2xl transform transition-transform duration-200">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <p className="mt-3 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
            <div className="text-center text-sm text-gray-500 mt-8">
              More questions? Visit our{" "}
              <a href="#" className="text-blue-600 underline">
                FAQ library
              </a>
              .
            </div>
          </div>
        </div>
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
    </Suspense>
  );
}
