"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const CoachSliderData = [
  {
    id: 1,
    image: "/sliderImage.png",
    title: "Professional Resume Builder",
    description:
      "Create a polished and professional resume with easy-to-use templates and customization options.",
  },
  {
    id: 2,
    image: "/sliderImage.png",
    title: "Resume Templates Galore",
    description:
      "Choose from a variety of modern and creative resume templates tailored to your career needs.",
  },
  {
    id: 3,
    image: "/sliderImage.png",
    title: "AI-Powered Resume Assistant",
    description:
      "Get suggestions and tips powered by AI to make your resume stand out from the competition.",
  },
  {
    id: 4,
    image: "/sliderImage.png",
    title: "Custom Cover Letters",
    description:
      "Generate personalized cover letters that complement your resume for job applications.",
  },
  {
    id: 5,
    image: "/sliderImage.png",
    title: "Resume Analysis Tool",
    description:
      "Analyze your resume and get feedback on how to improve its readability and impact.",
  },
  {
    id: 6,
    image: "/sliderImage.png",
    title: "Export as PDF and More",
    description:
      "Download your resume in multiple formats like PDF, Word, and TXT for convenience.",
  },
  {
    id: 7,
    image: "/sliderImage.png",
    title: "One-Click LinkedIn Import",
    description:
      "Easily import your LinkedIn profile details to speed up the resume creation process.",
  },
  {
    id: 8,
    image: "/sliderImage.png",
    title: "Job-Specific Resumes",
    description:
      "Tailor your resume for specific job roles using pre-defined sections and keywords.",
  },
  {
    id: 9,
    image: "/sliderImage.png",
    title: "Skill-Based Resume Templates",
    description:
      "Highlight your skills effectively with templates designed for showcasing expertise.",
  },
  {
    id: 10,
    image: "/sliderImage.png",
    title: "Mobile-Friendly Resume Maker",
    description:
      "Build and edit your resume on the go with our mobile-friendly resume builder.",
  },
];

export default function CoachServiceSlider() {
  return (
    <>
      <div className="resume_slider">
        <Swiper
          slidesPerView={1.5}
          spaceBetween={40}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          navigation={false}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {CoachSliderData.map((card, index) => (
            <SwiperSlide key={index}>
              <div
                key={card.id}
                className="overflow-hidden rounded-lg bg-white text-gray-600 shadow-md shadow-gray-200 min-h-[420px]"
              >
                <figure>
                  <img
                    src={card.image}
                    alt={`${card.title} image`}
                    className="aspect-video w-full object-cover"
                  />
                </figure>
                <div className="p-6">
                  <header className="mb-4 flex gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        By Jk Jones
                      </p>
                    </div>
                  </header>
                  <p className="text-sm">{card.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
