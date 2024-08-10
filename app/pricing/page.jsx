"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

import { useUserStore } from "../store/UserStore";
import Header from "../Layout/Header";
import { loadRazorpayScript } from "../utils/razorpayUtils";

import { Switch } from "@headlessui/react";
import { GetTokens } from "../actions";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UpgradePricing } from "../api/api";
import Link from "next/link";
const NewResumeHeader = dynamic(() => import("../Layout/NewResumeHeader"), {
  ssr: false,
});

const Pricing = () => {
  const [enabled, setEnabled] = useState(false);
  const router = useRouter();
  const userState = useUserStore((state) => state.userState);
  const planType = userState?.userdata?.subscription?.plan || "free";
  console.log(enabled);

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
      const response = await axios.post('/api/upgradePricing',{data},{
        headers: {
          Authorization: "Bearer " + accessToken.value,
          'Content-Type': 'application/json'
      },
      } );
      if (response.status === 200) {
        const { url } = response.data;
        window.location = url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UpgradePlanWithRazorpay = async (plan) => {
    const { accessToken } = await GetTokens();
    if (!accessToken) {
      return router.push("/login?redirect=pricing");
    }

    const data = {
      email: userState?.userdata?.email,
      plan,
      duration: enabled ? "yearly" : "monthly",
    };

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const response = await axios.post(
        "/api/pricing",
        { data },
        {
          headers: {
            Authorization: "Bearer " + accessToken.value,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { orderId, amount, currency, key } = response.data;

            const options = {
                key,
                amount,
                currency,
                name: "Genies Career Hub",
                description: "Upgrade Plan",
                order_id: orderId,
                handler: async (response) => {
                    const paymentData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    };
                    console.log(paymentData);
                    // try {
                    //     const verifyResponse = await axios.post('/api/pricing/verify', paymentData, {
                    //         headers: {
                    //             Authorization: "Bearer " + accessToken.value,
                    //             'Content-Type': 'application/json'
                    //         },
                    //     });

            //     if (verifyResponse.status === 200) {
            //         alert("Payment successful and verified!");
            //         // Handle successful payment and verification here
            //     } else {
            //         alert("Payment verification failed!");
            //     }
            // } catch (verifyError) {
            //     console.error('Verification error:', verifyError);
            //     alert("Payment verification error!");
            // }
          },
          prefill: {
            email: userState?.userdata?.email,
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <>
      <section
        className="flex lg:items-center items-start pb-0 justify-center  w-full pt-24 md:pt-16 lg:pt-20  px-5 relative"
        id="free"
      >
        <div className="container lg:pt-0 pt-20">
          <div className="sm:py-16">
            <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
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
                </span>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row sm:space-x-8">
                <div className="p-6 w-full md:w-[50%] rounded-lg shadow-lg border-gray-100 flex flex-col">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    FREE
                  </h3>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">
                    ₹0
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Per member, per yearly
                  </p>
                  <ul className="mt-4 space-y-2 flex-grow">
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Access to Professional and ATS Compatible CV Templates
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Download 1 CV in Text format
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      1 CV Template Choices with all Colours and Customisations
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Unlimited Modification in Created CV
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      1 CV Scan through CV Optimiser for passing the Recruiter’s
                      ATS Software
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      1 CV Upgrade through AI-based CV Match
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      One-on-one consultation with Career Coach
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Email Support Service
                    </li>
                  </ul>

                  {planType === "free" && (
                    <button className="w-full bg-blue-950 text-white py-2 rounded-md mt-10">
                      Current Plan
                    </button>
                  )}
                </div>

                <div className="p-6 rounded-lg shadow-lg w-full md:w-[50%] flex flex-col">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    BASIC
                  </h3>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">
                    {enabled ? "₹4,999" : "₹449"}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Per member, per {enabled ? "yearly" : "monthly"}
                  </p>
                  <ul className="mt-4 space-y-2 flex-grow">
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Access to Professional and ATS Compatible CV Templates
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Download 10 CVs in PDF format
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Template Choices with all Colours and Customisations
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Unlimited Modification in Created CV
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      10 CV Scan through CV Optimiser for passing the
                      Recruiter’s ATS Software
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      10 CV Upgrade through AI-Based CV Match
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Access to 1 Psychometric Tests
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      One-on-one consultation with Career Coach
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Email Support Service
                    </li>
                  </ul>
                  {planType === "basic" ? (
                    <button className="w-full bg-blue-950 text-white py-2 rounded-md mt-10">
                      Current plan
                    </button>
                  ) : (
                    <button
                      className="w-full bg-blue-950 text-white py-2 rounded-md mt-10"
                      onClick={() => UpgradePlanWithRazorpay("basic")}
                    >
                      Upgrade Now!
                    </button>
                  )}
                </div>

                <div className="p-6 rounded-lg shadow-lg w-full md:w-[50%] flex flex-col">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    PREMIUM
                  </h3>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">
                    {enabled ? "₹9,999" : "₹999"}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Per member, per {enabled ? "yearly" : "monthly"}
                  </p>
                  <ul className="mt-4 space-y-2 flex-grow">
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Access to Professional and ATS Compatible CV Templates
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Download 20 CVs in PDF format
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Template Choices with all Colours and Customisations
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Unlimited Modification in Created CV
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      20 CV Scan through CV Optimiser for passing the
                      Recruiter’s ATS Software
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Unlimited CV Upgrade through AI-based CV Match
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Access to 10 psychometric Tests
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      One-on-one consultation with Career Coach
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle
                        className="text-blue-950 mr-2"
                        style={{ minWidth: "15px", minHeight: "15px" }}
                      />
                      Email and On-Call Support Service
                    </li>
                  </ul>
                  {planType === "premium" ? (
                    <button className="w-full bg-blue-950 text-white py-2 rounded-md mt-10">
                      Current plan
                    </button>
                  ) : (
                    <button
                      className="w-full bg-blue-950 text-white py-2 rounded-md mt-10"
                      onClick={() => UpgradePlanWithRazorpay("premium")}
                    >
                      Upgrade Now!
                    </button>
                  )}
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
                    <Link href="/contact-us">
                      <div className="bg-blue-950 text-white py-2 px-4 rounded shadow">
                        Contact Us
                      </div>
                    </Link>
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
                          <span className="text-blue-950">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-blue-950">&#10060;</span>
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
                          <span className="text-blue-950">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-blue-950">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                         Unlimited CV Optimiser free
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-blue-950">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-blue-950">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Free Psychometric Tests
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
                          <span className="text-blue-950">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-blue-950">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-500">&#10003;</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                         AI Psychometric Tests
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-blue-950">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-blue-950">&#10060;</span>
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
                          <span className="text-blue-950">&#10060;</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-blue-950">&#10060;</span>
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
                <div className="mt-5">
                  <Link href={"/"} className="px-8 py-3 bg-white text-indigo-900 font-bold rounded text-sm">
                    Get Started
                  </Link>
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
