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
      stepHeading: "CV Curator",
      stepDetails:
        "Looking to create a CV that impresses potential recruiters right away? Discover limitless CV creation with our AI-enhanced Genies Pro CV Creator by exploring our curated collection of CV templates. Craft a resume with expert CV designs with the assistance of Artificial Intelligence meticulously developed to rectify errors, elevate structure, enrich content and finally, discover your Curriculum Vitae making it through the cut.",
    },
    {
      id: 2,
      stepHeading: "CV Optimiser",
      stepDetails:
        "Looking to create a CV that impresses potential recruiters right away? Discover limitless CV creation with our AI-enhanced Genies Pro CV Creator by exploring our curated collection of CV templates. Craft a resume with expert CV designs with the assistance of Artificial Intelligence meticulously developed to rectify errors, elevate structure, enrich content and finally, discover your Curriculum Vitae making it through the cut.",
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
        <h3 className="text-xl text-blue-900 font-bold">
          A Step Closer to Your
        </h3>
        <h2 className="text-2xl text-[#2C98CA] font-bold">Dream Job</h2>
        <p className="text-base mt-3">
          You can get your CV engineered in minutes with seamless CV Building.
          Start your job application process quickly while ensuring that your
          profile reflects the exact requisites of the job you have always
          dreamt of.
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
