"use client";

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
    <div className="flex  items-center">
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
            className="text-blue-600"
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
        <span className="text-xl font-semibold text-blue-600">
          {percentage}%
        </span>
      </div>
      <span className="mt-2 ml-4 text-gray-600 w-[40%]">{label}</span>
    </div>
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
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
  return (
    <>
      <div className="w-full my-20">
        {/* Hero Section */}
        <div className="relative w-full bg-white">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
            <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
              <h1 className="mt-8 text-3xl font-bold -tight text-[#005599] md:text-4xl lg:text-6xl">
                We Envisage your Growth with You!
              </h1>
              <p className="mt-8 text-lg text-gray-700">
                We aim to be the bridge between you and your progressive career.
                We dream with you and assist you as strive to achieve every step
                of success.
              </p>
              <form action="" className="mt-8 flex items-start space-x-2">
                <div className="w-full">
                  <input
                    className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                  ></input>
                </div>
                <div className=" w-full">
                  <button
                    type="button"
                    className="rounded-md bg-[#005599] px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-[#005599] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Connect with us!
                  </button>
                </div>
              </form>
            </div>
            <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
              <img
                className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3]  xl:aspect-[16/9]"
                src="/cgabout.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto max-w-7xl  lg:gap-x-8 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="acard rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4">
                <FaRocket className="aicon w-12 h-12" />
              </div>
              <h2 className="text-xl font-bold mb-2">Career Growth</h2>
              <p className="apara">
                Start your Career progression effortlessly, with Us!
              </p>
            </div>

            {/* Card 2 */}
            <div className="acard rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4">
                <FaBriefcase className="aicon w-12 h-12" />
              </div>
              <h2 className="text-xl font-bold mb-2">Job Transition</h2>
              <p className="apara">
                Easily switch jobs with expert guidance and no hassle.
              </p>
            </div>

            {/* Card 3 */}
            <div className="acard rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4">
                <FaLightbulb className="aicon w-12 h-12" />
              </div>
              <h2 className="text-xl font-bold mb-2">
                Performance Enhancement
              </h2>
              <p className="apara">
                Achieve heights professionally by elevating performance.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex lg:items-center items-start justify-center w-full pt-12 md:pt-16 lg:pt-20 px-5 relative">
        <div className="max-w-6xl mx-auto  py-10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full text-center md:text-left sm:text-left mt-8 md:mt-0 md:pl-8">
              <h2 className="trust font-bold text-gray-800">
                Organisational{" "}
                <span className="text-[#0D3572]">Connect for </span>
                {""}
                <span className="text-[#0D3572]"> </span>Career Coach
              </h2>
              <p className="mt-4 text-gray-600">
                At Genies Career Hub, we are dedicated to helping you build
                successful professional journeys. Our comprehensive set of
                services includes Job Application, Career Assistance, Job Match,
                and more. Over time, we have adopted a global approach that
                promotes a strategic path to career progress. Our Career
                Coaching service is specifically designed to help you achieve
                your goals with the guidance of internationally aware and
                experienced professionals. We have built a community for you to
                connect with and receive comprehensive consultation.
              </p>
              <p className="mt-4 text-gray-600">
                In an organizational setting, it is essential for employees to
                continually grow their skills to meet the increasing demands and
                opportunities in the market. This growth can only be achieved if
                employees consistently upskill themselves. Our Career Coaching
                support is designed to assist businesses in upgrading their
                employees&rsquo; skill sets. Our Career Coaches are adept at
                helping you achieve this.
              </p>

              <p className="mt-4 text-gray-600">
                With years of experience handling candidates and organizations,
                the Career Coaches at Genies Career Hub are committed to
                providing the best consultation. Our services have enhanced the
                professional journeys of many individuals and organizations,
                leading to high levels of satisfaction.
              </p>
              <p className="mt-4 text-gray-600">
                In today&apos;s globalized world, balanced guidance is crucial
                for your professional growth. At Genies Career Hub, we ensure
                that your organization receives the meticulous coaching needed
                to advance and stand out in the market with skill and
                professional expertise.
              </p>
            </div>
            {/* Left Column - Image */}

            {/* Right Column - Text */}
          </div>
        </div>
      </section>
      <section className="flex lg:items-center items-start justify-center w-full pt-12 md:pt-16 lg:pt-20 px-5 relative">
        <div className="max-w-6xl mx-auto  py-10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full text-center md:text-left sm:text-left md:w-1/2 mt-8 md:mt-0 md:pl-8">
              <h2 className="trust font-bold text-gray-800">
                Coaching that is inspired by{" "}
                <span className="text-[#0D3572]">Experience</span> and{" "}
                <span className="text-[#0D3572]">Expertise </span>
              </h2>
              <p className="mt-4 text-gray-600">
                Our community of Career Coaches is not only expertly trained in
                assisting candidates with distinctive professional dreams and
                aspirations, but also has experience in comprehending different
                mindsets.
              </p>
              <ul className="space-y-2 py-8">
                <li className="flex items-center">
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
                <li className="flex items-center">
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
              </ul>
              <div className="flex gap-2">
                <PercentageCircle
                  percentage={92}
                  label="Clients Satisfaction"
                />
                <PercentageCircle percentage={99} label="Instant Support " />
              </div>
            </div>
            {/* Left Column - Image */}
            <div className="w-full text-center md:w-1/2 flex justify-center md:justify-start parallax-container">
              <img
                src="/cgabout2.png"
                alt="Description of the image"
                className="parallax-image"
              />
            </div>

            {/* Right Column - Text */}
          </div>
        </div>
      </section>
      <section className="flex lg:items-center items-start justify-center w-full pt-12 md:pt-16 lg:pt-20 px-5 relative">
        <div className="max-w-6xl mx-auto  py-10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full text-center md:text-left sm:text-left mt-8 md:mt-0 md:pl-8">
              <h2 className="trust font-bold text-gray-800">
                We Bring{" "}
                <span className="text-[#0D3572]">Professional Advisors</span> to
                your Table, <span className="text-[#0D3572]">Instantly!</span>
              </h2>
              <p className="mt-4 text-gray-600">
                Genies Career Hub is established with a envision to
                revolutionize the linearity of the professional career coaching
                industry. The traditional career consultation methods are very
                inefficient given the requirements of the students,
                professionals, and employers today. Our services in Career
                Coaching are very well developed to offer a compelling solution
                to any such gaps that a candidate might experience with the
                available services. <br></br>
                <br></br>Limited options in Career Counselling and Coaching have
                always been an obstacle to career development and progression.
                The prime issue with the Career Consultation Services that are
                prominent in the existing marketing is that the services are
                channelled towards figuring out the right career. However, with
                the Genies Career Hub, the focus is dynamically on all sorts of
                Career relevant issues such as Performance Enhancement, Career
                Transitions, Professional Alignment Identification, and much
                more.<br></br>
                <br></br>The community of Career Coaches at the Genies Career
                Hub has eclectic knowledge. The Coaches are equipped with
                expertise and experience beyond the normality. The curated list
                of Consultants is specifically devised to provide you with the
                most suitable assistance. All you need to do is connect with us
                and we shall assist in connecting you with the best possible
                resource that can help you solve your problems. With the Genies
                Career Hub, your Career Problems are solved in a flicker of a
                moment because we ensure that the best resources depending on
                your requisites are brought to your table.
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
