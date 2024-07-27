"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

import { useUserStore } from "../store/UserStore";
import Header from "../Layout/Header";

import { Switch } from "@headlessui/react";
import { GetTokens } from "../actions";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UpgradePricing } from "../api/api";
const NewResumeHeader = dynamic(() => import("../Layout/NewResumeHeader"), {
  ssr: false,
});

const Pricing = () => {
  const [enabled, setEnabled] = useState(true);
  const router = useRouter();
  const userState = useUserStore(state => state.userState);
  const planType = userState?.userdata?.subscription?.plan || "free"


  const UpgradePlan = async (plan) => {
    const { accessToken } = await GetTokens();
    if (!accessToken) {
      return router.push("/login?redirect=pricing");
    }
    const data = {
      email: userState?.userdata?.email,
      plan,
      success_url: "http://localhost:3000/paymentSuccess",
      cancel_url: window.location.href,
      duration: enabled ? "yearly" : "monthly",
    };
    try {
      const response = await UpgradePricing(data, accessToken.value);
      if (response.status === 200) {
        const { url } = response.data;
        window.location = url;
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                  Our Pricing
                </h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Simple Pricing, Easy Access, Better Career!
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  Our simple pricing with secured payment measures ensures
                  accessing the dream career has never been easier.
                </p>
              </div>

              <div className="mt-10 flex justify-center items-center">
                <span className="mr-2 text-sm font-medium text-gray-700">
                  Monthly
                </span>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${enabled ? "bg-indigo-600" : "bg-gray-200"
                    } relative inline-flex items-center h-6 rounded-full w-11`}
                >
                  <span
                    className={`${enabled ? "translate-x-6" : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white rounded-full`}
                  />
                </Switch>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Yearly
                  {/* <span className="ml-1 text-green-500">(Get 30% OFF)</span> */}
                </span>
              </div>

              <div className="mt-10 flex  space-x-8">
                <div className=" p-6 w-full md:w-[50%] rounded-lg shadow-lg  border-gray-100">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    FREE
                  </h3>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">
                    $0
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
                      <FaTimesCircle className="text-red-500 mr-2" />
                      Free Psycometric Tests
                    </li>
                    <li className="flex items-center  text-sm text-gray-600">
                      <FaTimesCircle className="text-red-500 mr-2" />
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
                  {
                    planType === 'free' &&
                    <button className="mt-6 w-full bg-blue-950 text-white py-2 rounded-md">
                      Current Plan
                    </button>
                  }
                </div>
                <div className=" p-6 rounded-lg shadow-lg  w-full md:w-[50%]">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    BASIC
                  </h3>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">
                    {enabled ? "$39.99" : "$3.99"}
                    {/* {enabled && (
                      <span className="text-xl line-through text-gray-500 ml-2">
                        $42.12
                      </span>
                    )} */}
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
                  {
                    planType === 'basic' ?
                      <button
                        className="mt-6 w-full bg-blue-950 text-white py-2 rounded-md"
                      >
                        Current plan
                      </button>
                      : <button
                        className="mt-6 w-full bg-blue-950 text-white py-2 rounded-md"
                        onClick={() => UpgradePlan("basic")}
                      >
                        Upgrade Now!
                      </button>
                  }
                </div>

                <div className=" p-6 rounded-lg shadow-lg text-center w-full md:w-[50%]">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    PREMIUM
                  </h3>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">
                    {enabled ? "$69.99" : "$6.99"}
                    {/* {enabled && (
                      <span className="text-xl line-through text-gray-500 ml-2">
                        $64.80
                      </span>
                    )} */}
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
                  {
                    planType === 'premium' ?
                      <button
                        className="mt-6 w-full bg-blue-950 text-white py-2 rounded-md"
                      >
                        Current plan
                      </button>
                      :
                      <button
                        className="mt-6 w-full bg-blue-950 text-white py-2 rounded-md"
                        onClick={() => UpgradePlan("premium")}
                      >
                        Upgrade Now!
                      </button>
                  }
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
              <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-[60%]  w-full text-center md:text-left mb-8 md:mb-0">
                  <h1 className="text-4xl font-bold mb-4">
                    Want to try out our Business Model Services? Connect with us
                    Today!
                  </h1>
                  <p className="text-gray-700 mb-6">
                    Want to integrate our services into your enterprise? Contact
                    us today and subscribe to the set of services personalised
                    for your relevance and requirements at appropriate pricing
                    solutions.
                  </p>
                  <div className="flex justify-center md:justify-start space-x-4">
                    {/* <button className="bg-yellow-500 text-white py-2 px-4 rounded shadow hover:bg-yellow-600 transition duration-200">
                      WATCH VIDEO
                    </button> */}
                    <a href="/contact-us">
                      <button className="bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-700 transition duration-200">
                        Contact Us
                      </button>
                    </a>
                  </div>
                </div>
                <div className="md:w-[40%] w-full flex justify-center md:justify-end">
                  <img
                    src="/enterprise.webp"
                    alt="AI Assessment"
                    className="w-full "
                  />
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
            <div className="relative  z-10 flex flex-col md:flex-row justify-center items-center">
              <div className="text-center">
                <h2 className="text-4xl font-extrabold mb-4">
                  Start your <span className="text-green-500">Journey</span>{" "}
                  Today!
                </h2>
                <p className="text-lg">From 300+ Customer Reviews</p>
                <div className="mt-4">
                  <button className="px-8 py-3 bg-white text-indigo-900 font-bold rounded">
                    Get Started
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

export default Pricing;
