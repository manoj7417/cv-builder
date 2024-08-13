"use client";

import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <section
        className="flex lg:items-center items-start pb-0 justify-center  w-full pt-24 md:pt-16 lg:pt-20  px-5 relative bg-gradient-to-r from-white to-[#dcecff]"
        id="free"
      >
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-bold mb-6">
            Editorial Guidelines for Professional Career Advice
          </h1>
          <section className="mb-8">
            <h2 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-2">
              Mission and Vision Inspiring
            </h2>
            <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
              Genies Career Hub offers reliable and free resources to empower
              millions of job-seekers on their journey toward a fulfilling
              career. Our platform provides expert articles with real-life
              illustrations and practical advice.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-2">
              Experts You Can Trust
            </h2>
            <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
              Our editorial team consists of career experts with years of
              experience, Certified Professional CV writers, and expert editors.
              Our goal is to provide you with the most current and relevant
              career advice.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-2">
              First-hand Experience
            </h2>
            <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
              As a result, they are credible career coaches. Our goal is to
              provide you with the confidence and knowledge to achieve your
              career goals.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-2">Diverse Backgrounds</h2>
            <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
              We have career advisers with diverse backgrounds, including
              marketing, psychology, and education. This allows us to look at
              job-searching issues from a different perspective.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-2">
              Professional Assistance
            </h2>
            <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
              Genies Career Hub places your individual career goals and needs
              first. We are committed to offering you personalized career
              advice, which will propel you in the direction you choose.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-2">
              Comprehensive Editorial Process
            </h2>
            <div className="space-y-4">
              <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                Each of our articles is subjected to rigorous quality control.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                  Research - We research relevant topics for your workplace.
                  Industry updates and the latest HR trends are kept up to date.
                </li>
                <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                  We use a variety of resources to check the accuracy of our
                  articles, including industry-specific surveys and reports,
                  websites for professional associations, survey results, etc.
                  Our main editor and staff review each piece.
                </li>
                <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                  We use strict guidelines to ensure that we are consistent,
                  organized, and focused.
                </li>
                <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                  Understanding - We know what motivates and inspires you,
                  whether you are a young professional in the early stages of
                  your career or a mid-career professional. Your feedback helps
                  us to create our content.
                </li>
                <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                  Our tips are aligned with industry standards and legal
                  requirements.
                </li>
                <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                  Before an article is published, it will be reviewed by a
                  professional editor. This editor checks for errors and
                  inaccuracies to ensure it meets the highest standards.
                </li>
                <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                  Our guides are checked for search engine optimization to make
                  sure they can be easily found online.
                </li>
                <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                  We regularly update and revise articles to ensure that they
                  are up-to-date.
                </li>
              </ul>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-2">
              We Value Your Opinion!
            </h2>
            <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
              You can comment on articles or ask questions. Our readers are
              engaged by our clarifications and insights as needed. If you
              prefer to keep your feedback private, feel free to reach out to us
              at{" "}
              <Link
                href="mailto:support@geniescareerhub.com"
                className="text-blue-500 hover:underline"
              >
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
