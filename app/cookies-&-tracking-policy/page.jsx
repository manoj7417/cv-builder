"use client";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaRocket, FaCrown } from "react-icons/fa";

import "react-circular-progressbar/dist/styles.css";

const Page = () => {
  return (
    <>
      <>
        <section className="bg-gradient-to-r from-white to-[#dcecff] text-gray-800 py-20">
          <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                A Brief Introduction to The Topic
              </h2>
              <p className="text-lg mb-4">
                Genies Career Hub is here! We respect your privacy and strive to
                provide a transparent service. This Cookie Policy describes how
                we use similar technologies and cookies on our website. You
                consent to our use of cookies by continuing to browse the site.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
              <p className="text-lg mb-4">
                When you visit a site, small text files are stored on your
                device. Cookies enhance your browsing by remembering your
                preferences and delivering relevant content.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Types of Cookies We Use
              </h2>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Essential Cookies
                </h3>
                <p className="text-lg">
                  These cookies are essential for navigation and security.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Analytics Cookies
                </h3>
                <p className="text-lg">
                  Google Analytics and other analytics tools collect anonymous
                  data on how our visitors interact with the site. We use the
                  information collected to improve our website and user
                  experience.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Functional Cookies
                </h3>
                <p className="text-lg">
                  These cookies improve your experience by saving your
                  preferences (e.g., language, region, and content).
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Third-Party Cookies
                </h3>
                <p className="text-lg">
                  Some pages use third-party cookies to display content from
                  third-party providers (e.g., social media plugins and embedded
                  videos). These services may use their own cookies. Please read
                  their privacy policies.
                </p>
              </div>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Managing Your Cookie Preferences
              </h2>
              <p className="text-lg mb-4">
                Cookies can be controlled through your browser settings. You can
                block or delete cookies in most browsers. If you disable
                cookies, certain features of our site may not work.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
              <p className="text-lg mb-4">
                We explain in our{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Privacy Policy
                </a>{" "}
                how we handle your personal data. If you have any questions or
                concerns about our cookie usage, feel free to contact us at{" "}
                <a
                  href="mailto:support@geniescareerhub.com"
                  className="text-blue-500 hover:underline"
                >
                  support@geniescareerhub.com
                </a>
                .
              </p>
            </section>
          </div>
        </section>
      </>
    </>
  );
};

export default Page;
