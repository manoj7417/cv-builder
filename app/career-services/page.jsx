/** @format */

"use client";
import React from "react";
import WorkTogether from "@/components/component/WorkTogether";
import GetStartedModal from "@/components/component/GetStartedModal";
import a1 from "../../public/animations/ai-career-coach.json";
import a2 from "../../public/animations/1-1-career.json";
import a3 from "../../public/animations/pschometric-test.json";
import Lottie from "lottie-react";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";

const CareerServices = () => {
  const cvStudio = [
    {
      title: "AI Career Coaching",
      image: a1,
      description:
        "Take a personalised quick session with the advanced AI Career Coach anytime and anywhere.",
      link: "/career-counselling",
    },
    {
      title: "1 to 1 Career Coaching",
      image: a2,
      description:
        "Find the best guidance from our esteemed global community of Career Coaches!",
      link: "/career-coaching",
    },
    {
      title: "Psychometric Test Tool",
      image: a3,
      description:
        "Assess your professional traits and cognitive abilities to make the best of your skill set.",
      current: false,
      link: "/pshycometric-test",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Organization",
    url: "https://www.geniescareerhub.com/",
    logo: "https://geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
    name: "geniescareerhub.com",
    description:
      "Genies Career Hub creates your resume in an easy going process. We provide more than 23+ professional approved ATS-friendly resume templates and features like CV Creator, CV Optimiser and CV Match. Additionally, our new features of Psychometric Test with incorporating AI and Career Coach feature providing best expertise in creating professional resumes.",
  };

  const jsonLd1 = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Career Coach",
        item: "https://www.geniescareerhub.com/career-services",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Career Counseling",
        item: "https://www.geniescareerhub.com/career-services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Career Advisor",
        item: "https://www.geniescareerhub.com/career-services",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Define Career",
        item: "https://www.geniescareerhub.com/career-services",
      },
    ],
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd1) }}
      />
      <section
        className='flex lg:items-center items-start pb-0 justify-center  w-full pt-40 md:pt-16 lg:pt-40  px-5 relative'
        id='free'>
        <div className='container '>
          <h1 className='text-2xl md:text-3xl font-bold text-center mb-2 md:mb-1'>
            <span className='text-[#2C98CA]'>Get Coached,</span> Your
            For Perfection!
          </h1>
          <h2 className='lg:w-[60%] w-full mx-auto text-center text-gray-500 text-sm md:text-lg mb-6 md:mb-10'>
          Find Career Coaches, take Psychometric Tests, or consult the AI Career Coach to find answers to your professional queries and grow past the limitations of your career.
          </h2>

          <div className='flex justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10'>
              {cvStudio.map((animation, index) => (
                <div key={index}>
                  <div className='max-w-[400px] min-h-[450px] h-[400px] rounded-md border flex flex-col justify-between shadow-lg'>
                    <Lottie
                      animationData={animation?.image}
                      loop={true}
                      autoplay={true}
                      style={{ height: 200, width: "100%" }}
                    />
                    <div className='flex-grow p-4 text-center'>
                      <h3 className='text-2xl font-semibold'>
                        {animation?.title}
                      </h3>
                      <p className='my-4 text-sm text-gray-600'>
                        {animation?.description}
                      </p>
                    </div>
                    <div className='p-4'>
                      <Link
                        href={animation?.link}
                        className='mt-auto block w-[60%] mx-auto rounded-sm bg-blue-950 p-3 text-sm font-semibold text-white shadow-sm text-center'>
                        Try Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <WorkTogether />
    </>
  );
};

export default CareerServices;
