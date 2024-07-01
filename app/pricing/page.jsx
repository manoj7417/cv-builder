"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

import { useUserStore } from "../store/UserStore";
import Header from "../Layout/Header";

import { Switch } from "@headlessui/react";
const NewResumeHeader = dynamic(() => import("../Layout/NewResumeHeader"), {
  ssr: false,
});

const Pricing = () => {
  const [enabled, setEnabled] = useState(true);
  const userState = useUserStore((state) => state.userState);

  return (
    <>
      {userState?.isAuthenticated ? <NewResumeHeader /> : <Header />}
      <section
        className="flex lg:items-center items-start pb-0 justify-center  w-full pt-24 md:pt-16 lg:pt-20  px-5 relative"
        id="free"
      >
        <div className="container lg:pt-0 pt-20">
          <div className="py-16 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-base font-semibold text-blue-950 tracking-wide uppercase">
                  Pricing Page
                </h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Our pricing is simple with no hidden fees
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  Pricing plans for businesses at every stage of growth.
                </p>
              </div>

              <div className="mt-10 flex justify-center items-center">
                <span className="mr-2 text-sm font-medium text-gray-700">
                  Monthly
                </span>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${
                    enabled ? "bg-indigo-600" : "bg-gray-200"
                  } relative inline-flex items-center h-6 rounded-full w-11`}
                >
                  <span
                    className={`${
                      enabled ? "translate-x-6" : "translate-x-1"
                    } inline-block w-4 h-4 transform bg-white rounded-full`}
                  />
                </Switch>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Yearly
                  <span className="ml-1 text-green-500">(Get 30% OFF)</span>
                </span>
              </div>

              <div className="mt-10 flex  space-x-8">
                <div className=" p-6 w-full md:w-[50%] rounded-lg shadow-lg  border-gray-100">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    FREE
                  </h3>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">
                    ₹0
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Per member, per yearly
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      Unlimited resumes and cover letters
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      All premium templates and colors
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />1 Cv
                      Analyzer free
                    </li>{" "}
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      Free Psycometric Tests
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      24 X 7 Support Service
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaTimesCircle className="text-red-500 mr-2" /> No AI
                      Analyzer
                    </li>{" "}
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaTimesCircle className="text-red-500 mr-2" />
                      No AI Psycometric Tests
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaTimesCircle className="text-red-500 mr-2" />
                      No career coaching
                    </li>
                  </ul>
                  <button className="mt-6 w-full bg-blue-950 text-white py-2 rounded-md">
                    Current Plan
                  </button>
                </div>
                <div className=" p-6 rounded-lg shadow-lg  w-full md:w-[50%]">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    BASIC
                  </h3>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">
                    {enabled ? "₹1671.6" : "₹199"}
                    {enabled && (
                      <span className="text-xl line-through text-gray-500 ml-2">
                        ₹2388
                      </span>
                    )}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Per member, per {enabled ? "yearly" : "monthly"}
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      Download Unlimited resumes and cover letters
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      Download All premium templates and colors
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      10 Cv Analyzer free
                    </li>{" "}
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      Free Psycometric Tests
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      24 X 7 Support Service
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" /> 10 AI
                      Analyzer
                    </li>{" "}
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaTimesCircle className="text-red-500 mr-2" />
                      No AI Psycometric Tests
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaTimesCircle className="text-red-500 mr-2" />
                      No career coaching
                    </li>
                  </ul>
                  <button className="mt-6 w-full bg-blue-950 text-white py-2 rounded-md">
                    Upgrade Now!
                  </button>
                </div>

                <div className=" p-6 rounded-lg shadow-lg text-center w-full md:w-[50%]">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    PREMIUM
                  </h3>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">
                    {enabled ? "₹3,351.6" : "₹399"}
                    {enabled && (
                      <span className="text-xl line-through text-gray-500 ml-2">
                        ₹4788
                      </span>
                    )}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Per member, per {enabled ? "yearly" : "monthly"}
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      Download Unlimited resumes and cover letters
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      Download All premium templates and colors
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      Unlimited Cv Analyzer free
                    </li>{" "}
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      Free Psycometric Tests
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      24 X 7 Support Service
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" /> Unlimited
                      AI Analyzer
                    </li>{" "}
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      Unlimited AI Psycometric Tests
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaCheckCircle className="text-blue-950 mr-2" />
                      Unlimited career coaching
                    </li>
                  </ul>
                  <button className="mt-6 w-full bg-blue-950 text-white py-2 rounded-md">
                    Upgrade Now!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="flex lg:items-center items-start pb-0 justify-center  w-full pt-24 md:pt-16 lg:pt-20  px-5 relative"
        id="free"
      >
        <div className="container ">
          <div className="py-16 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-base font-semibold text-blue-950 tracking-wide uppercase">
                  Features
                </h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  All the features you need
                </p>
              </div>

              <div className="mt-10">
                <div className="mt-10 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-950">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Features
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Free
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Basic
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Premium
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Unlimited resumes and cover letters
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Download Unlimited resumes and cover letters
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-red-500">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-red-500">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Download All premium templates and colors
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-red-500">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-red-500">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Unlimited Cv Analyzer free
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-red-500">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-red-500">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Free Psycometric Tests
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Unlimited AI Analyzer
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-red-500">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-red-500">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          AI Psycometric Tests
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-red-500">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-red-500">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Career coaching
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-red-500">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-red-500">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="flex lg:items-center items-start pb-0 justify-center  w-full pt-24 md:pt-16 lg:pt-20   relative"
        id="free"
      >
        <div className="container lg:pt-0 pt-20">
          <div className="bg-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0">
              <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="#172554"
                  fillOpacity="1"
                  d="M0,32L48,48C96,64,192,96,288,106.7C384,117,480,107,576,122.7C672,139,768,181,864,186.7C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
            <div className="relative max-w-7xl z-10 flex flex-col md:flex-row justify-around items-center">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-extrabold mb-4">
                  Start your <span className="text-green-500">7-day</span> free
                  trial
                </h2>
                <p className="text-lg">From 300+ Customer Reviews</p>
                <div className="mt-4">
                  <button className="px-8 py-3 bg-white text-indigo-900 font-bold rounded">
                    Get Started
                  </button>
                </div>
              </div>
              <div className="mt-8 md:mt-0 text-center md:text-left">
                <h3 className="text-lg font-bold text-green-500 mb-2">
                  LETS TRY!
                </h3>
                <ul className="space-y-2">
                  <li>
                    <span className="text-green-500">&#10003;</span> Free 7-day
                    trial
                  </li>
                  <li>
                    <span className="text-green-500">&#10003;</span> No credit
                    card required
                  </li>
                  <li>
                    <span className="text-green-500">&#10003;</span> Cancel
                    anytime
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
