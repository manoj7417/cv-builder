"use client";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useUserStore } from "../store/UserStore";
import NewResumeHeader from "../Layout/NewResumeHeader";
import Header from "../Layout/Header";
import { FaStar } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaRocket, FaCrown } from "react-icons/fa";
import { useEffect, useState } from "react";
import "../components/HomepageNew/Homepage.css";
import Link from "next/link";
import { ResumeHeader } from "../Layout/ResumeHeader";

const Page = () => {
  const userState = useUserStore((state) => state.userState);
  const tools = [
    {
      title: "Positive Personality Traits",
      description:
        "Estimate the Personality of the potential candidates with a Positive Personality Test that examines the cultural fitment, demeanour, and socialising traits of the candidates.",
      linkText: "POSITIVE PERSONALITY TRAITS",
      link: "#",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200",
    },
    {
      title: "Negative Personality Traits",
      description:
        "Dodge the unpredictability and lack of cognizance of Negative Personality Traits of your candidates with Psychometric Tests that analyse the negative and darker character traits.",
      linkText: "Negative Personality Traits",
      link: "#",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-200",
    },
    {
      title: "Motivation, Value, Preferences",
      description:
        "Uncover the secret of the Motivation and Drive of your ideal candidate by measuring their perception and employment of traits within Motivational, Values, and Preferential aspects. ",
      linkText: "MOTIVATION, VALUE, PREFERENCES",
      link: "#",
      bgColor: "bg-pink-100",
      borderColor: "border-pink-200",
    },
    {
      title: "Cognitive Ability",
      description:
        "Comprehension, Application, and Conceptual capabilities of a candidate will go a long way and to filter out the perfect candidates, examine the cognitive abilities with specialised tests. ",
      linkText: "COGNITIVE ABILITY",
      link: "#",
      bgColor: "bg-green-100",
      borderColor: "border-green-200",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <>
      <ResumeHeader/>
      <section
        className="flex lg:items-center items-start pb-0 justify-center  w-full pt-10 md:pt-16 lg:pt-20  px-5 relative"
        style={{ background: "url(/ptest.jpg)" }}
      >
        <div className="container lg:pt-0 pt-10">
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
            <div className="space-y-2 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 lg:py-0 py-10">
              <h1 className="text-[30px] md:text-[62px] sm:text-[62px] mt-4 pt-5 flex flex-col md:flex-row sm:flex-row text-center justify-center items-center font-extrabold text-black">
                Comprehend Your Career with the <br></br>Power of Science!
              </h1>

              <p className="max-w-[800px]  mx-auto text-center text-[#7C7C7C] text-[18px]">
                Make Informed Decisions, Join 1 Million candidates who are
                almost there!
              </p>
              <div className="flex lg:flex-row flex-col gap-4 md:gap-8 sm:gap-8 justify-center items-center pt-8 pb-6">
                {/* Try it Free Button */}
                <a href="#free">
                  <button className="flex items-center bg-blue-950 text-white lg:py-4 lg:px-8 p-3 rounded shadow-lg hover:bg-blue-950 transition duration-300 transform hover:scale-105">
                    <FaRocket className="mr-2" />
                    Try it Free
                  </button>
                </a>

                {/* Premium Button */}
                <Link href="/career-counselling">
                  {" "}
                  <button className="flex items-center bg-gradient-to-r from-[#3c5087] to-[#3873b7] text-white lg:py-4 lg:px-8 p-3 rounded shadow-lg hover:bg-gradient-to-l  transition duration-300 transform hover:scale-105">
                    <FaCrown className="mr-2 animate-pulse" />
                    Premium
                  </button>
                </Link>
              </div>
              <div className="flex gap-4 md:gap-8 sm:gap-8 justify-center items-center">
                <img src="/students.png" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="flex lg:items-center items-start pb-0 justify-center  w-full pt-10 md:pt-16 lg:pt-20  px-5 relative"
        id="free"
      >
        <div className="container lg:pt-0 pt-10">
          <div className="  space-y-2  mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <h3 className="text-[30px] md:text-[52px] sm:text-[52px] font-bold">
              Witness the Magic of Science <br></br> inspire your Career
            </h3>
            <p className="text-[#7C7C7C] font-bold">
              Try and Test the free psychometric examination to explore the
              possibilities of an organised career.
            </p>
          </div>
          <div className="  flex pt-4 justify-center">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="bg-white p-6 rounded-lg shadow-lg group overflow-hidden relative">
                  <h2 className="text-xl font-bold mb-2">
                    Numerical Reasoning
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Discover your adeptness with Numerical Values and
                    Mathematical Calculations by testing your conceptual basics
                    with the Numerical Reasoning Psychometric Test.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">1 TEST</p>
                      <p className="text-gray-500">10 QUESTIONS</p>
                    </div>
                    <a href="/mcq?name=NumericalReasoning">
                      <button className="text-blue-500 font-semibold">
                        Start Now!
                      </button>
                    </a>
                  </div>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-blue-950 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg group overflow-hidden relative">
                  <h2 className="text-xl font-bold mb-2">Verbal Reasoning</h2>
                  <p className="text-gray-700 mb-4">
                    Check your compatibility with language comprehension and
                    communicative skills with the Verbal Personality Assessment
                    Test to figure out your strengths and weaknesses.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">1 TEST</p>
                      <p className="text-gray-500">10 QUESTIONS</p>
                    </div>
                    <a href="/mcq?name=VerbalReasoning">
                      <button className="text-blue-500 font-semibold">
                        Start Now!
                      </button>
                    </a>
                  </div>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-blue-950 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg group overflow-hidden relative">
                  <h2 className="text-xl font-bold mb-2">
                    Diagrammatic Reasoning
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Initiate your career dynamically with the Diagrammatic
                    Reasoning aptitude questions by analysing your aptitude with
                    image-based patterns and pictorial representations.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">1 TESTS</p>
                      <p className="text-gray-500">5 QUESTIONS</p>
                    </div>
                    <a href="/mcq?name=DiagrammaticReasoning">
                      <button className="text-blue-500 font-semibold">
                        Start Now!
                      </button>
                    </a>
                  </div>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-blue-950 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                {/* Add more cards as needed */}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4  mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative bg-white p-6 rounded-lg shadow-lg group overflow-hidden">
                  <h2 className="text-xl font-bold mb-2">
                    Situational Judgement
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Test your ability to navigate through tough situations and
                    challenges that come up in the workplace by opting for the
                    Situational Judgement Psychometric Test.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">1 TESTS</p>
                      <p className="text-gray-500">10 QUESTIONS</p>
                    </div>
                    <a href="/mcq?name=SituationalJudgement">
                      <button className="text-blue-500 font-semibold">
                        Start Now!
                      </button>
                    </a>
                  </div>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-blue-950 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                <div className="relative bg-white p-6 rounded-lg shadow-lg group overflow-hidden">
                  <h2 className="text-xl font-bold mb-2">Abstract Reasoning</h2>
                  <p className="text-gray-700 mb-4">
                    Check your skills with abstract and inductive reasoning with
                    the Abstract Psychometric Career Exam which is based on the
                    logic that requires your professional judgement.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">1 TESTS</p>
                      <p className="text-gray-500">9 QUESTIONS</p>
                    </div>
                    <a href="/mcq?name=AbstractReasoning">
                      <button className="text-blue-500 font-semibold">
                        Start Now!
                      </button>
                    </a>
                  </div>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-blue-950 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                <div className="relative bg-white p-6 rounded-lg shadow-lg group overflow-hidden">
                  <h2 className="text-xl font-bold mb-2">Spatial Reasoning</h2>
                  <p className="text-gray-700 mb-4">
                    Unlock your understanding of 3D movements and find out the
                    due gaps with Psychometric Tests that analyse your Spatial
                    Reasoning capabilities.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">1 TESTS</p>
                      <p className="text-gray-500">10 QUESTIONS</p>
                    </div>
                    <a href="/mcq?name=SpatialReasoning">
                      <button className="text-blue-500 font-semibold">
                        Start Now!
                      </button>
                    </a>
                  </div>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-blue-950 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                {/* Add more cards as needed */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4  mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative bg-white p-6 rounded-lg shadow-lg group overflow-hidden">
                  <h2 className="text-xl font-bold mb-2">Logical Reasoning</h2>
                  <p className="text-gray-700 mb-4">
                    Examine your proficiency in Logically analysing situations
                    and finding out the best solutions by attempting the Logical
                    Reasoning Psychometric Assessment Test.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">1 TESTS</p>
                      <p className="text-gray-500">10 QUESTIONS</p>
                    </div>
                    <a href="/mcq?name=LogicalReasoning">
                      <button className="text-blue-500 font-semibold">
                        Start Now!
                      </button>
                    </a>
                  </div>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-blue-950 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                <div className="relative bg-white p-6 rounded-lg shadow-lg group overflow-hidden">
                  <h2 className="text-xl font-bold mb-2">
                    Mechanical Reasoning
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Check your compatibility with Machine-based situations and
                    reasoning activities with the Mechanical Psychometric
                    Examination and identify the potential gaps in no time!
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">1 TESTS</p>
                      <p className="text-gray-500">10 QUESTIONS</p>
                    </div>
                    <a href="/mcq?name=MechanicalReasoning">
                      <button className="text-blue-500 font-semibold">
                        Start Now!
                      </button>
                    </a>
                  </div>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-blue-950 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                {/* Add more cards as needed */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex lg:items-center items-start pb-0 justify-center  w-full pt-24 md:pt-16 lg:pt-20  px-5 relative">
        <div className="container lg:pt-0 pt-20">
          <div className="flex  space-y-2  mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="w-full">
              <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-center mb-6">
                  Tests that Call out, and Indicate
                </h2>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    <div>
                      <ul className="space-y-4">
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          24/7 Accessibility
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Myriad and Updated Questions
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Formulated by Accredited Psychometricians
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Industry and Profession-Specific Tests
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-4">
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Descriptive Results for Clarity
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Electronically Timed Test Stimulator
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Intelligent Logics for Total Comprehension
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Performance Tracking Dashboard
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-4">
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Recommendations for Assisting Resources
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Just a Click Away!
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Recommendations from Industry Experts
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Relative Money Back Guarantee Policy
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="flex lg:items-center items-start pb-0 justify-center  w-full   px-5 relative"
        id="premium"
      >
        <div className="container lg:pt-0 pt-20">
          <div className="flex  space-y-2  mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className=" flex items-center justify-center py-12">
              <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                  <h1 className="text-4xl font-bold mb-4">
                    Talent Assessments Powered by AI for Flawless Judgement
                  </h1>
                  <p className="text-gray-700 mb-6">
                    Hire candidates that are worthy of selection and escape the
                    matrix of faulty hiring by analysing the relative skills of
                    your candidates with a professionally accredited
                    Psychometric Examination by Genies Career Hub.
                  </p>
                  <div className="flex justify-center md:justify-start space-x-4">
                    {/* <button className="bg-yellow-500 text-white py-2 px-4 rounded shadow hover:bg-yellow-600 transition duration-200">
                      WATCH VIDEO
                    </button> */}
                    <a href="/career-counselling">
                      <button className="bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-700 transition duration-200">
                        TRY NOW
                      </button>
                    </a>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center md:justify-end">
                  <img
                    src="/aipowered2.gif"
                    alt="AI Assessment"
                    className="w-full "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center pb-0 justify-center w-full px-5 relative">
        <div className="container ">
          <div className="flex flex-col lg:flex-row space-y-2 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="w-full">
              <div className="min-h-screen p-6">
                <div className="text-center mb-12">
                  <h1 className="text-3xl font-bold">
                    Perfect Hiring and Progressive Employee <br></br>{" "}
                    Development with Psychometric Assessment Tools
                  </h1>
                  <p className="mt-2 text-lg">
                    Employ the perfect four Psychometric Assessment Test Tools to filter
                    out perfect candidates and inspire competent employees.
                  </p>
                </div>
                <div className="flex flex-col lg:flex-row justify-center">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="space-y-8">
                      {tools.slice(0, 2).map((tool, index) => (
                        <div
                          key={index}
                          className={`p-6 rounded-lg shadow-md border-t-4 ${tool.bgColor} ${tool.borderColor}`}
                        >
                          <h3 className="text-xl font-semibold mb-2">
                            {tool.title}
                          </h3>
                          <p className="mb-4">{tool.description}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center items-center">
                      <div>
                        <img
                          src="/brain.gif"
                          alt="Brain"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="space-y-8">
                      {tools.slice(2).map((tool, index) => (
                        <div
                          key={index}
                          className={`p-6 rounded-lg shadow-md border-t-4 ${tool.bgColor} ${tool.borderColor}`}
                        >
                          <h3 className="text-xl font-semibold mb-2">
                            {tool.title}
                          </h3>
                          <p className="mb-4">{tool.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-12 flex justify-center">
                  <a href="/career-counselling">
                    <button className="flex items-center bg-gradient-to-r from-[#3c5087] to-[#3873b7] text-white py-4 px-8 rounded shadow-lg hover:bg-gradient-to-l  transition duration-300 transform hover:scale-105">
                      <FaCrown className="mr-2 animate-pulse" />
                      TRY WITH US
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
