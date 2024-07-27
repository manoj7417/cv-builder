import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/app/components/HomepageNew/Homepage.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

export default function CourseSlider() {
  const stepsResumeData = [
    {
      id: 1,
      stepHeading: "CV CREATOR",
      stepDetails:
        "Looking to create a CV that impresses potential recruiters right away? Build a CV with our AI-enhanced Genies Pro CV Creator by exploring our curated collection of CV templates. Craft a resume with expert CV designs with the assistance of Artificial Intelligence meticulously developed to rectify errors, elevate structure, enrich content and finally, discover your Curriculum Vitae making it through the cut.",
      link: "/resume-dashboard",
    },
    {
      id: 2,
      stepHeading: "CV Optimiser",
      stepDetails:
        "Is your CV optimised for the job you are dreaming of? Analyse, optimise and enhance your resume with our Genies Pro CV Optimiser and stand out in the competitive job market. Ensure that your CV passes through every Application Tracking Software ATS Resume Checker and impresses the employer. Run it through the analyser and optimise it with the AI’s recommendations to match the exact requirements of the desired job profile.",
      link: "/resumeAnalyzer-dashboard",
    },
    {
      id: 3,
      stepHeading: "CV Match",
      stepDetails:
        "Searching for the exact CV that matches the job profile and description? Get the perfect curriculum vitae template crafted for the Job you are applying for with the power of Artificial Intelligence. Discover the strength of a CV that is precisely tailored to the Job Role you are aiming for. Simply share your requirements and let the Genies Pro CV Match find the best resumes that reflect your skills and purpose.",
      link: "/jobCV",
    },
  ];

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <div className="bg-gray-100 rounded-3xl p-10 steps_slider shadow-xl">
      <div className="steps_slider_title mb-5">
        <h2 className="lg:text-3xl text-xl text-blue-900 font-bold">
          A Step Closer to Your Dream Job with
          <span className="font-bold text-[#2C98CA]"> Genies Pro Studio</span>
        </h2>
        <p className="lg:text-base text-sm mt-3">
          Our AI-driven Genies CV Pro Studio is a comprehensive suite of three
          pioneering, revolutionary tools. It’s your personal all-in-one
          Curriculum Vitae CV builder. Broaden your professional journey with
          triple dynamics, the CV Creator, the CV Optimiser, and the CV Match.
        </p>
      </div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={pagination}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {stepsResumeData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="steps_content pt-10">
              <div className="title text-xl text-blue-900 font-bold my-3">
                {item.stepHeading}
              </div>
              <div className="steps_details lg:text-base text-sm font-medium mb-4">
                {item.stepDetails}
                <div className="button_wrapper mt-5">
                  <Link
                    href={item?.link}
                    className="get_start_btn course_button"
                  >
                    <span className="btn_text">Explore Now</span>
                    <div className="btn_overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
