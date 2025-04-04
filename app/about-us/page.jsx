/** @format */

"use client";

import Link from "next/link";
import React from "react";
import { FaRocket, FaBriefcase, FaLightbulb } from "react-icons/fa";

const menuItems = [
  {
    name: "Home",
    href: "#",
  },
  {
    name: "About",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
  {
    name: "Blogs",
    href: "#",
  },
];

const locations = [
  {
    title: "Head office",
    timings: "Mon-Sat 9am to 5pm.",
    address: "The Career Genies Group UK LTD ,124 City Road,London,EC1V 2NX",
    contactNo: "0203 476 7492",
  },
];
const PercentageCircle = ({ percentage, label }) => {
  const circleRadius = 34;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <>
      <div className="flex flex-col sm:flex-row  items-center">
        <div className="relative flex items-center justify-center w-24 h-24">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
            <circle
              className="text-gray-300"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r={circleRadius}
              cx="40"
              cy="40"
            />
            <circle
              className="text-[#f76918]"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={circleRadius}
              cx="40"
              cy="40"
            />
          </svg>
          <span className="text-xl font-semibold text-[#f76918]">
            {percentage}%
          </span>
        </div>
        <span className="mt-2 ml-4 text-gray-600 w-[40%]">{label}</span>
      </div>
    </>
  );
};

export default function AboutUs() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const Card = ({ icon, title, description }) => (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <div className="w-12 h-12 mb-4">{icon}</div>
      <p className="text-xl font-bold mb-2">{title} </p>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  //Schema
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Organization",
    url: "https://www.geniescareerhub.com/",
    logo: "https://geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
    name: "Genies Career Hub",
    description:
      "Genies Career Hub creates your resume in an easy-going process. We provide more than 23+ professional approved ATS-friendly resume templates and features like CV Creator, CV Optimiser, and CV Match. Additionally, our new Psychometric Test feature, incorporating AI, and Career Coach offer the best expertise in creating professional resumes.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full my-20">
        {/* Hero Section */}
        <div className="relative w-full bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:grid md:grid-cols-12 md:gap-x-8">
              <div className="flex flex-col justify-center items-center px-4 py-12  md:col-span-7 md:gap-x-6 md:px-6 md:py-24 xl:col-span-6">
                <h1 className="mt-8 text-3xl font-bold text-center sm:text-left md:text-left lg:text-left xl:text-left 2xl:text-left text-[#005599] md:text-4xl lg:text-5xl">
                  Powering your Career with Mentorship
                </h1>
                <p className="mt-8 text-lg text-center sm:text-left md:text-left lg:text-left xl:text-left 2xl:text-left text-gray-700">
                  Genies Career Hub is dedicated to assisting you in every step
                  of your career path journey through to successful job
                  placement with your chosen career. With goal-specific
                  mentorship and guidance, we help you reach your career
                  aspirations.
                </p>
                <div className="w-full mt-8 flex justify-center sm:justify-start md:justify-start lg:justify-start xl:justify-start 2xl:justify-start">
                  <Link
                    href={"/contact-us"}
                    className="rounded-md bg-[#005599] px-3 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Connect with us!
                  </Link>
                </div>
              </div>

              <div className="relative md:col-span-5 md:-mr-8 xl:col-span-6">
                <img
                  className="aspect-[3/2] bg-gray-50 object-cover w-full h-auto md:aspect-[4/3] xl:aspect-[16/9]"
                  src="/cgabout.png"
                  alt="cgabout"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto max-w-7xl  gap-x-8 px-8 sm:gap-x-8 sm:px-8 md:gap-x-8 md:px-8 lg:gap-x-8 lg:px-8 xl:gap-x-8 xl:px-8 2xl:gap-x-8 2xl:px-8">
          <div className="w-[70%] mx-auto">
            <h2 className="my-5 text-3xl font-bold text-center sm:text-left md:text-left lg:text-center xl:text-ceter 2xl:text-center text-[#005599] md:text-4xl lg:text-5xl">
              Comprehensive Services to Cater to all your Career Requirements
            </h2>
            <p className="my-8 text-lg text-center sm:text-center md:text-center lg:text-center xl:text-center 2xl:text-center text-gray-700">
              Our aim at Genies Career Hub is to help every aspiring career
              applicant achieve their Career goals. We offer services that
              address all your career requirements. Our services include the
              following:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
            <div className="acard rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4">
                <FaRocket className="aicon w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Job Application Services
              </h3>
              <p className="text-sm apara">
                From CV Creation to CV Optimisation, we help you build the
                perfect application for your dream career role and put your best
                foot forward to potential employers
              </p>
            </div>

            {/* Card 2 */}
            <div className="acard rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4">
                <FaBriefcase className="aicon w-12 h-12" />
              </div>
              <h4 className="text-xl font-bold mb-2">Career Assistance</h4>
              <p className="text-sm apara">
                Whether you are seeking job transition, career change, or
                looking to grow your career dynamically, we offer personalised
                support throughout the process.
              </p>
            </div>

            {/* Card 3 */}
            <div className="acard rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4">
                <FaLightbulb className="aicon w-12 h-12" />
              </div>
              <p className="text-xl font-bold mb-2">Job Match</p>
              <p className="text-sm apara">
                Finding the exact job that matches your career profile and
                skillset can be challenging. But, with expert support and
                customised profile analysis, we match you with the job that
                suits your aspirations, skill sets, and values.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex lg:items-center items-start justify-center w-full pt-12 md:pt-16 lg:pt-20 px-5 relative">
        <div className="max-w-6xl mx-auto  py-10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full text-center md:text-left sm:text-left mt-8 md:mt-0 md:pl-8">
              <p className="trust font-bold text-gray-800">
                Career Coaching: Your Key to Success
              </p>
              <p className="mt-4 text-gray-600">
                Our career coaching services are backed by years of expertise.
                The experienced Career Coaches you connect with through the
                Genies Career Hub platform will mentor you through the complex
                and sometimes frustrating path to your successful career
                placement. We help you create and shape your personal brand
                through our revolutionary Genies AI platform, which combines
                traditional career coaching methodologies with career coaches
                complemented by our newly developed AI suite of Genies Career
                Suite of AI-powered Tools.
              </p>
              <p className="mt-4 text-gray-600">
                <b>Internationally Acclaimed and Accredited Career Coaches</b>:
                Our professionals, who have years of expertise working alongside
                candidates of different backgrounds, understand the global
                professional trends. Leading organisations have accoladed their
                knowledge, and their strategies have been proven to have a high
                impact over time. They understand your requirements by getting
                to know you using sophisticated career coaching questionnaires
                and integrating their skills to help you with the best guidance
                that transcends beyond the limitations of your location to open
                worldwide opportunities for you around the globe. .
              </p>

              <p className="mt-4 text-gray-600">
                <b>Skill Development</b>: To grow with conviction, continuous
                learning is the key. In the fast-paced world of technology and
                rising trends, constant skill development is necessary. We help
                you upskill at every level of your career always to keep you one
                step ahead of the competition. Our coaching assists businesses
                and professionals in upskilling for improved efficiency and
                productivity. We ensure that you can adapt to every change
                quickly.
              </p>
              <p className="mt-4 text-gray-600">
                <b>Proven Results</b>: Genies Career Hub holds an impressive
                track record in the domain of Career development and eLearning.
                Our work speaks volumes about the effectiveness of our
                strategies in Career Coaching.
              </p>
            </div>
            {/* Left Column - Image */}

            {/* Right Column - Text */}
          </div>
        </div>
      </section>
      <section className="flex lg:items-center items-start justify-center w-full pt-12 md:pt-16 lg:pt-20 px-5 relative">
        <div className="max-w-6xl mx-auto  py-10">
          <div className="flex flex-col md:flex-row items-center gap-4 overflow-hidden">
            {/* Left Column - Text */}
            <div className="text-center md:text-left mt-8 md:mt-0">
              <p className="text-xl font-bold text-gray-800">
                Unlock your true potential with Career Guidance.
              </p>
              <p className="mt-4 text-gray-600">
                Understanding what suits your profile can be a challenge.
                However, with Genies Career Hub, this process is simplified. Our
                community of Career Coaches brings forth a wealth of experience
                and expertise to the table to offer you compelling solutions.
                Working with us can be highly advantageous. Here is why you will
                love working with us.
              </p>
              <p className="mt-4 text-gray-600">
                <b>Diverse Domains</b>: Whatever professional you bring to the
                table to seek assistance, we are here to help. Be it healthcare,
                technology, management, communications, the creative industry
                sectors, sports, or any other, we have you covered. Our career
                coaches are industry accredited and leading coaching
                professionals and have advanced knowledge of career progression
                within all domains of professions and careers.
              </p>
              <p className="mt-4 text-gray-600">
                <b>Global Trust</b>: We connect you with guidance resources from
                across the globe. For years, our career coaches have assisted
                students, professionals, and employers of different diverse
                backgrounds of all levels of seniority. They have acquired
                global trust over time. Join the ranks of satisfied clients
                who’ve achieved their career goals with the support of our
                outstanding community of professionals in Career Coaching.
              </p>
              {/* <ul className="space-y-2 py-8">
              <li className="flex items-center justify-center md:justify-start">
                  <svg
                    className="w-6 h-6 text-blue-950 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Coaches with Expertise in a myriad of professional domains.
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <svg
                    className="w-6 h-6 text-blue-950 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Trusted by Students, Professionals, and Employers worldwide.
                </li>
              </ul> */}
              <div className="flex justify-center md:justify-start gap-2 overflow-hidden mt-10">
                <PercentageCircle
                  percentage={92}
                  label="Clients Satisfaction"
                />
                <PercentageCircle percentage={99} label="Instant Support" />
              </div>
            </div>
            {/* Right Column - Image */}
            <div className="text-center flex justify-center md:justify-start overflow-hidden mt-4 md:mt-0">
              <img
                src="/cgabout2.png"
                alt="Description of the image"
                className="parallax-image max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex lg:items-center items-start justify-center w-full pt-12 md:pt-16 lg:pt-20 px-5 relative">
        <div className="max-w-6xl mx-auto  py-10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full text-center md:text-left sm:text-left mt-8 md:mt-0 md:pl-8">
              <h3 className="trust font-bold text-gray-800">
                Guiding, Empowering, and Fuelling your Growth with Expertise
              </h3>
              <p className="mt-4 text-gray-600">
                Take a stroll through our journey as we evolve from Career
                Genies to Genies Career Hub. Our story began with Career Genies,
                a division of The Career Genies Group. Established in 2021,
                Career Genies was set up with the aim to assist professionals,
                students, and employers in a plethora of different and diverse
                industry sectors of careers. The platform gained quick
                recognition as a renowned agency that successfully offers
                support to job seekers and businesses.<br></br>
                <br></br>The purpose of Career Genies was to sustain itself
                while offering support to job seekers and employers during the
                rising complexities in the job market. By assisting job seekers
                in building a suitable application and approaching the desired
                job, we have successfully met the growing demands of
                professionals navigating the complexities of the current job
                market and organisations refining the recruitment processes
                <br></br>
                <br></br>.
              </p>
            </div>
            {/* Left Column - Image */}

            {/* Right Column - Text */}
          </div>
        </div>
      </section>
      <section className="flex lg:items-center items-start justify-center w-full pt-12 md:pt-5 lg:pt-2 px-5 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full text-center md:text-left sm:text-left mt-8 md:mt-0 md:pl-8">
              <p className="trust font-bold text-gray-800">
                Diverse Expertise, Myriad Experience
              </p>
              <p className="mt-4 text-gray-600">
                The team of Career Genies holds rich experience in arenas such
                as Recruitment, Creative Writing, Career Coaching, Information
                Technology, and Psychology. This experience inspires our
                expertise in myriad domains. We can tackle a broad range of
                career challenges. Our objective is not just to help you find
                what path in your career you must choose. We aim to also help
                you with performance enhancement, easy and smooth job
                transitions, career alignment, skill development, job searching,
                and problem-solving. We have been and shall further assist you
                in every step of your career path
              </p>
            </div>
            {/* Left Column - Image */}

            {/* Right Column - Text */}
          </div>
        </div>
      </section>
      <section className="flex lg:items-center items-start justify-center w-full pt-12 md:pt-5 lg:pt-10 px-5 relative">
        <div className="max-w-6xl mx-auto pb-20">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full text-center md:text-left sm:text-left mt-8 md:mt-0 md:pl-8">
              <p className="trust font-bold text-gray-800">
                The Genies Career Hub: A New Chapter for The Career Genies
              </p>
              <p className="mt-4 text-gray-600">
                Launched in 2024, Genies Career Hub is an innovative and
                revolutionised career-developed platform that seamlessly
                integrates artificial intelligence and technology to offer
                traditional career coaching services methodologies with an
                advanced approach. By expanding on the expertise, intent, and
                experience of the Career Genies Team, this platform addresses
                all the problems that you might face while you are advancing on
                your path to achieve success in your career goals. Here are all
                the services that the Genies Career Hub platform offers
              </p>
              <p className="mt-4 text-gray-600">
                <b>Genies CV Studio</b>: Create standout CVs using AI-backed
                Genies Pro CV Creator and further optimise them with the Genies
                Pro CV Optimiser to ensure compatibility with prevalent
                Application Tracking Systems in the job market. You can also
                find the exact CV that is tailored to your profile with the help
                of AI with Genies Pro CV Match.
              </p>

              <p className="mt-4 text-gray-600">
                <b>Psychometric Tests</b>: Gain insights into your professional
                strengths and preferences by finding answers through
                Psychometric tests that are intelligently devised by leading
                psychometricians across the globe. Analyse your professional
                profile and experience clarity while making your career choices
              </p>
              <p className="mt-4 text-gray-600">
                <b>AI Career Coach</b>: Escape the matrix of time foundations
                with career assistance that is powered by AI. With AI Career
                Coach, witness the strength of personalised career guidance and
                excel with strategic ease.
              </p>
              <p className="mt-4 text-gray-600">
                <b>Accredited Career Coaches</b>: Still willing to rely on
                manual career coaching services? We have a community of
                accredited and experienced career professionals across the globe
                who can assist you with every step of your career path as you
                strive forward to your desired successful career.
              </p>
            </div>
            {/* Left Column - Image */}

            {/* Right Column - Text */}
          </div>
        </div>
      </section>
      <div className="rounded-lg bg-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="py-20">
            <div className="grid grid-cols-1 gap-x-20 gap-y-8 lg:grid-cols-2">
              <div className="space-y-4">
                <p className="w-full text-4xl font-bold text-gray-900">
                  Our Offices
                </p>
                <p className="w-full text-lg text-gray-600">
                  Find us at these locations.
                </p>
              </div>
              <div className="space-y-4 divide-y-2">
                {locations.map((location) => (
                  <div
                    key={location.title}
                    className="flex flex-col space-y-2 pt-4 first:pt-0 lg:w-full"
                  >
                    <p className="w-full text-xl font-semibold  text-gray-900">
                      {location.title}
                    </p>
                    <p className="w-full text-base  text-gray-600">
                      {location.timings}
                    </p>
                    <p className="text-sm font-semibold text-gray-600">
                      {location.address}
                    </p>
                    <p className="text-sm font-semibold text-gray-600">
                      {location.contactNo}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
