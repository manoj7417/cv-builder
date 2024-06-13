import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function CourseSlider() {
  const stepsResumeData = [
    {
      id: 1,
      stepHeading: "CV CREATOR",
      stepDetails:
        "Looking for an impressive CV Template? Discover limitless CV creation with our AI-enhanced CV Services. Explore our curated collection of CV templates to craft a resume that’s not just impressive, but a true reflection of your professional aspirations. Our AI-powered CV Maker is meticulously designed to rectify errors, elevate structure, and enrich content",
    },
    {
      id: 2,
      stepHeading: "CV Optimiser",
      stepDetails:
        "Is your CV optimised for the job you are dreaming of? Analyse, optimise and enhance your CV with our Genies Pro CV Optimizer and stand out in the competitive job market. Ensure that your CV passes through every Application Tracking Software and impresses the employer. Run it through the analyser and optimise it with the AI’s recommendations to match the exact requirements of the desired job profile.",
    },
    {
      id: 3,
      stepHeading: "Genie Assistant",
      stepDetails:
        "Looking to create a CV that impresses potential recruiters right away? Discover limitless CV creation with our AI-enhanced Genies Pro CV Creator by exploring our curated collection of CV templates. Craft a resume with expert CV designs with the assistance of Artificial Intelligence meticulously developed to rectify errors, elevate structure, enrich content and finally, discover your Curriculum Vitae making it through the cut.",
    },
  ];

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <div className="bg-white rounded-3xl p-10 steps_slider shadow-2xl">
      <div className="steps_slider_title mb-5">
        <h2 className="text-3xl text-blue-900 font-bold">
          A Step Closer to Your Dream Job with
          <span className="font-bold text-[#2C98CA]"> Genies Pro Studio</span>
        </h2>
        <p className="text-base mt-3">
          Our AI-driven Genie CV Pro Studio is a comprehensive suite of three
          pioneering, revolutionary tools. It’s your personal career coach.
          Broaden your professional journey with dual dynamics, the CV Creator
          and the CV Optimiser.
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
              <div className="steps_details text-base font-medium">
                {item.stepDetails}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
