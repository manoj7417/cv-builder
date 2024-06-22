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
                People who care about your growth
              </h1>
              <p className="mt-8 text-lg text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur modi blanditiis dolores quasi eaque explicabo!
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
                Enhance your career with our expert coaching.
              </p>
            </div>

            {/* Card 2 */}
            <div className="acard rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4">
                <FaBriefcase className="aicon w-12 h-12" />
              </div>
              <h2 className="text-xl font-bold mb-2">Job Transition</h2>
              <p className="apara">
                Navigate job transitions smoothly with our support.
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
                Boost your performance with personalized coaching.
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
                Coach For <span className="text-[#0D3572]">Businesses</span>&{" "}
                <span className="text-[#0D3572]">Organizations</span>
              </h2>
              <p className="mt-4 text-gray-600">
                At GINIES CAREER HUB, we pride ourselves on being a trusted
                partner for professionals worldwide. Our comprehensive career
                counselling services and cutting-edge CV builder tools are
                designed to help you stand out in a competitive job market.
                Whether you are just starting your career or looking to make a
                significant leap, our expert guidance and personalized resources
                will empower you to achieve your goals. Our team of seasoned
                career coaches offers tailored advice and strategies, ensuring
                that your career path aligns with your aspirations and
                strengths. <br></br>
                <br></br>Our CV builder is more than just a template; it is a
                sophisticated tool that helps you highlight your unique skills
                and achievements, making you the ideal candidate for your dream
                job. With real-time feedback and industry-specific
                recommendations, you can craft a CV that truly reflects your
                potential. <br></br>
                <br></br>Join thousands of satisfied clients who have
                transformed their careers with our support. Our success stories
                range from recent graduates landing their first job to
                experienced professionals climbing the corporate ladder. We
                understand the nuances of different industries and job markets,
                providing you with insights that are both relevant and
                actionable.<br></br>
                <br></br> In todays globalized world, the competition for top
                positions is fiercer than ever. Thats why having a trusted ally
                like GINIES CAREER HUB is crucial. We are dedicated to helping
                you navigate the complexities of career advancement, ensuring
                that you are well-prepared and confident in your journey. Let us
                help you showcase your unique skills and experience, ensuring
                that you make a lasting impression on potential employers.
                Together, we can turn your career aspirations into reality.
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
                We Offer <span className="text-[#0D3572]">Career Coaching</span>{" "}
                From{" "}
                <span className="text-[#0D3572]">Professional advisors</span>
              </h2>
              <p className="mt-4 text-gray-600">
                Grow your leaders, retain star performers, and provide a benefit
                employees will love. Work with a world-class coach to grow as a
                leader, find career clarity, or accelerate your job search.
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
                  Grow your leaders, retain star performers
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
                  and provide a benefit employees will love.
                </li>
              </ul>
              <div className="flex gap-2">
                <PercentageCircle
                  percentage={82}
                  label="Clients Satisfaction"
                />
                <PercentageCircle percentage={90} label="Testing and Support" />
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
                We Offer <span className="text-[#0D3572]">Career Coaching</span>{" "}
                From{" "}
                <span className="text-[#0D3572]">Professional advisors</span>
              </h2>
              <p className="mt-4 text-gray-600">
                At GINIES CAREER HUB, we pride ourselves on being a trusted
                partner for professionals worldwide. Our comprehensive career
                counselling services and cutting-edge CV builder tools are
                designed to help you stand out in a competitive job market.
                Whether you are just starting your career or looking to make a
                significant leap, our expert guidance and personalized resources
                will empower you to achieve your goals. Our team of seasoned
                career coaches offers tailored advice and strategies, ensuring
                that your career path aligns with your aspirations and
                strengths. <br></br>
                <br></br>Our CV builder is more than just a template; it is a
                sophisticated tool that helps you highlight your unique skills
                and achievements, making you the ideal candidate for your dream
                job. With real-time feedback and industry-specific
                recommendations, you can craft a CV that truly reflects your
                potential. <br></br>
                <br></br>Join thousands of satisfied clients who have
                transformed their careers with our support. Our success stories
                range from recent graduates landing their first job to
                experienced professionals climbing the corporate ladder. We
                understand the nuances of different industries and job markets,
                providing you with insights that are both relevant and
                actionable.<br></br>
                <br></br> In todays globalized world, the competition for top
                positions is fiercer than ever. Thats why having a trusted ally
                like GINIES CAREER HUB is crucial. We are dedicated to helping
                you navigate the complexities of career advancement, ensuring
                that you are well-prepared and confident in your journey. Let us
                help you showcase your unique skills and experience, ensuring
                that you make a lasting impression on potential employers.
                Together, we can turn your career aspirations into reality.
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
