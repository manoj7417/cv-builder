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

const Page = () => {
  const userState = useUserStore((state) => state.userState);
  const tools = [
    {
      title: "Positive Personality Traits",
      description:
        "Psychometric personality test to assess & identify key personality traits that can influence cultural fitment, trainability and job performance.",
      linkText: "POSITIVE PERSONALITY TRAITS",
      link: "#",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200",
    },
    {
      title: "Dark Personality Traits",
      description:
        "Measure and identify the key negative traits that impact the safety of employees, customers and work culture as a whole.",
      linkText: "DARK PERSONALITY TRAITS",
      link: "#",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-200",
    },
    {
      title: "Motivation, Value, Preferences",
      description:
        "Understand what drives and motivates a person to perform at work by measuring motivation, values and preferences.",
      linkText: "MOTIVATION, VALUE, PREFERENCES",
      link: "#",
      bgColor: "bg-pink-100",
      borderColor: "border-pink-200",
    },
    {
      title: "Cognitive Ability",
      description:
        "Measures an individual capacity to think logically and their ability to analyse any given situation and derive logical conclusions.",
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
      {userState?.isAuthenticated ? <NewResumeHeader /> : <Header />}
      <section
        className="flex lg:items-center items-start pb-0 justify-center  w-full pt-24 md:pt-16 lg:pt-20  px-5 relative"
        style={{ background: "url(/ptest.jpg)" }}
      >
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
            <div className="space-y-2  mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
              <h1 className="text-[45px] md:text-[62px] sm:text-[62px] mt-4 pt-16 flex flex-col md:flex-row sm:flex-row text-center justify-center items-center font-extrabold text-[#0D3572]">
                {/* <span>
                  GROW {""}
                  <span className="text-[#3c72b9]">FASTER</span> <br></br>WITH A
                  COACH
                </span> */}
                Unlock the secrets of your true <br></br>self with our proven
                tests!
              </h1>

              <p className="max-w-[800px]  mx-auto text-center text-[#7C7C7C] text-[18px]">
                Discover the real you, 1M+ People has joined the test already
              </p>
              <div className="flex gap-4 md:gap-8 sm:gap-8 justify-center items-center pt-8 pb-6">
                {/* Try it Free Button */}
                <a href="#free">
                  <button className="flex items-center bg-blue-950 text-white py-4 px-8 rounded shadow-lg hover:bg-blue-950 transition duration-300 transform hover:scale-105">
                    <FaRocket className="mr-2" />
                    Try it Free
                  </button>
                </a>

                {/* Premium Button */}
                <a href="#premium">
                  {" "}
                  <button className="flex items-center bg-gradient-to-r from-[#3c5087] to-[#3873b7] text-white py-4 px-8 rounded shadow-lg hover:bg-gradient-to-l  transition duration-300 transform hover:scale-105">
                    <FaCrown className="mr-2 animate-pulse" />
                    Premium
                  </button>
                </a>
              </div>
              <div className="flex gap-4 md:gap-8 sm:gap-8 justify-center items-center">
                <img src="/students.png" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="flex lg:items-center items-start pb-0 justify-center  w-full pt-24 md:pt-16 lg:pt-20  px-5 relative"
        id="free"
      >
        <div className="container lg:pt-0 pt-20">
          <div className="  space-y-2  mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <h3 className="text-[45px] md:text-[52px] sm:text-[52px] font-bold">
              Watch your<br></br> confidence skyrocket
            </h3>
            <p className="text-[#7C7C7C] font-bold">
              Try an example of any of our aptitude packages for free.
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
                    Numerical reasoning tests gauge how adept you are at dealing
                    with a variety of different mathematical problems.
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
                    Verbal reasoning tests examine your ability to quickly read,
                    understand and pull out key information from dense passages
                    of text.
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
                    Diagrammatic reasoning tests are all about applying logic to
                    a series of different flow charts or diagrams.
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
                    Situational judgement tests assess how you deal with
                    scenarios and challenges that come up in the workplace.
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
                    Abstract reasoning tests are also known as diagrammatic or
                    inductive reasoning tests.
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
                    Spatial reasoning tests are also known as logical or
                    abstract reasoning tests.
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
                    Logical reasoning tests are designed to examine your logical
                    thinking skills.
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
                    Mechanical reasoning tests examine your ability to
                    understand mechanical and electrical concepts in order to
                    solve challenges.
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
                  Essential tests for exceptional roles
                </h2>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    <div>
                      <ul className="space-y-4">
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Flexible practice 24/7
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          1000s of up-to-date questions
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Written by accredited psychologists
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Industry and employer specific tests
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-4">
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Full solutions and explanations
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Online timed test simulator
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Intelligent learning platform
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Dashboard performance tracking
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-4">
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Tips, tricks, guides and resources
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          Available on any device, any time
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          98% recommend Psychometric Tests
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-950 mr-2" />
                          30 day money back guarantee
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
                    AI powered talent assessments for better people decisions
                  </h1>
                  <p className="text-gray-700 mb-6">
                    Know your candidates 10x better in just 10% of time and
                    costs! Measure job-fitment using soft skills, behavioural
                    and psychometric traits and spend time only with the best.
                  </p>
                  <div className="flex justify-center md:justify-start space-x-4">
                    <button className="bg-yellow-500 text-white py-2 px-4 rounded shadow hover:bg-yellow-600 transition duration-200">
                      WATCH VIDEO
                    </button>
                    <button className="bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-700 transition duration-200">
                      TRY NOW
                    </button>
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
                    Psychometric Assessment Tools Used in<br></br> Hiring and
                    Employee Development
                  </h1>
                  <p className="mt-2 text-lg">
                    Make Better Hiring Decisions Using the Four Types of
                    Psychometric Assessment Tools
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
                          <a
                            href={tool.link}
                            className="text-indigo-600 font-semibold"
                          >
                            {tool.linkText} &rarr;
                          </a>
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
                          <a
                            href={tool.link}
                            className="text-indigo-600 font-semibold"
                          >
                            {tool.linkText} &rarr;
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-12 flex justify-center">
                  <button className="flex items-center bg-gradient-to-r from-[#3c5087] to-[#3873b7] text-white py-4 px-8 rounded shadow-lg hover:bg-gradient-to-l  transition duration-300 transform hover:scale-105">
                    <FaCrown className="mr-2 animate-pulse" />
                    TRY WITH US
                  </button>
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
