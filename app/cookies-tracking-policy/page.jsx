/** @format */

"use client";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaRocket, FaCrown } from "react-icons/fa";

import "react-circular-progressbar/dist/styles.css";
import Link from "next/link";

const Page = () => {
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Organization",
    url: "https://www.geniescareerhub.com/",
    logo: "https://geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
    name: "geniescareerhub.com",
    description:
      "Genies Career Hub creates your resume in an easy going process. We provide more than 23+ professional approved ATS-friendly resume templates and features like CV Creator, CV Optimiser and CV Match. Additionally, our new features of Psychometric Test with incorporating AI and Career Coach feature providing best expertise in creating professional resumes.",
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className='bg-gradient-to-r from-white to-[#dcecff] text-gray-800 py-20'>
        <div className='max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-bold mb-6'>
            Cookie Policy
          </h1>
          <section className='mb-8'>
            <h2 className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              A Brief Introduction to The Topic
            </h2>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mb-4'>
              Genies Career Hub is here! We respect your privacy and strive to
              provide a transparent service. This Cookie Policy describes how we
              use similar technologies and cookies on our website. You consent
              to our use of cookies by continuing to browse the site.
            </p>
          </section>
          <section className='mb-8'>
            <h2 className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              What Are Cookies?
            </h2>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mb-4'>
              When you visit a site, small text files are stored on your device.
              Cookies enhance your browsing by remembering your preferences and
              delivering relevant content.
            </p>
          </section>
          <section className='mb-8'>
            <h3 className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              Types of Cookies We Use
            </h3>
            <div className='mb-6'>
              <p className='text-xl font-semibold mb-2'>Essential Cookies</p>
              <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                These cookies are essential for navigation and security.
              </p>
            </div>
            <div className='mb-6'>
              <h4 className='text-xl font-semibold mb-2'>Analytics Cookies</h4>
              <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                Google Analytics and other analytics tools collect anonymous
                data on how our visitors interact with the site. We use the
                information collected to improve our website and user
                experience.
              </p>
            </div>
            <div className='mb-6'>
              <h5 className='text-xl font-semibold mb-2'>Functional Cookies</h5>
              <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                These cookies improve your experience by saving your preferences
                (e.g., language, region, and content).
              </p>
            </div>
            <div className='mb-6'>
              <h6 className='text-xl font-semibold mb-2'>
                Third-Party Cookies
              </h6>
              <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                Some pages use third-party cookies to display content from
                third-party providers (e.g., social media plugins and embedded
                videos). These services may use their own cookies. Please read
                their privacy policies.
              </p>
            </div>
          </section>
          <section className='mb-8'>
            <p className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              Managing Your Cookie Preferences
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mb-4'>
              Cookies can be controlled through your browser settings. You can
              block or delete cookies in most browsers. If you disable cookies,
              certain features of our site may not work.
            </p>
          </section>
          <section className='mb-8'>
            <p className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              Our Commitment
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mb-4'>
              We explain in our{" "}
              <Link
                href='/privacy-policy'
                className='text-blue-500 hover:underline'>
                Privacy Policy
              </Link>{" "}
              how we handle your personal data. If you have any questions or
              concerns about our cookie usage, feel free to contact us at{" "}
              <Link
                href='mailto:support@geniescareerhub.com'
                className='text-blue-500 hover:underline'>
                support@geniescareerhub.com
              </Link>
              .
            </p>
          </section>
        </div>
      </section>
    </>
  );
};

export default Page;
