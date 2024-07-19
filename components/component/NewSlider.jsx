"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ImageCarousel from "./ImageCarousel";

export const templateType = {
  free: "Free",
  premium: "Premium",
  dummy: "Dummy",
};

const templatesData = [
  {
    name: "Template3",
    src: "/Template3.png",
    alt: "Template3.png",
    type: templateType.free,
  },
  {
    name: "Template5",
    src: "/Template5.png",
    alt: "Template5.png",
    type: templateType.dummy,
  },
  {
    name: "Template4",
    src: "/Template4.png",
    alt: "Template4.png",
    type: templateType.premium,
  },
  {
    name: "Template6",
    src: "/Template6-1.png",
    alt: "Template6-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template1",
    src: "/Template1.png",
    alt: "Template1.png",
    type: templateType.premium,
  },
  {
    name: "Template7",
    src: "/Template7-1.png",
    alt: "Template7-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template8",
    src: "/Template8.png",
    alt: "Template8.png",
    type: templateType.dummy,
  },
  {
    name: "Template9",
    src: "/Template9.png",
    alt: "Template9.png",
    type: templateType.premium,
  },
  {
    name: "Template10",
    src: "/Template10-1.png",
    alt: "Template10-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template11",
    src: "/Template11-1.png",
    alt: "Template11-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template12",
    src: "/Template12-1.png",
    alt: "Template12-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template13",
    src: "/Template13-1.png",
    alt: "template13-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template14",
    src: "/Template14-1.png",
    alt: "Template14-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template15",
    src: "/Template15-1.png",
    alt: "Template15-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template16",
    src: "/Template16-1.png",
    alt: "Template16-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template17",
    src: "/Template17-1.png",
    alt: "Template17-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template18",
    src: "/Template18-1.png",
    alt: "Template18-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template19",
    src: "/Template19-1.png",
    alt: "Template19-1.png",
    type: templateType.free,
  },
  {
    name: "Template20",
    src: "/Template20-1.png",
    alt: "Template20-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template21",
    src: "/Template21.png",
    alt: "Template21.png",
    type: templateType.premium,
  },
  {
    name: "Template22",
    src: "/Template22-1.png",
    alt: "Template22-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template23",
    src: "/Template23.png",
    alt: "Template23.png",
    type: templateType.premium,
  },
  {
    name: "Template24",
    src: "/Template24.png",
    alt: "Template24.png",
    type: templateType.dummy,
  },
  {
    name: "Template25",
    src: "/Template25.png",
    alt: "Template25.png",
    type: templateType.dummy,
  },
  {
    name: "Template26",
    src: "/Template26.png",
    alt: "Template26.png",
    type: templateType.dummy,
  },
];

export default function NewSlider({ data }) {

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets:true
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {data.map((template, index) => (
          <SwiperSlide key={index}>
            <ImageCarousel data={template} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
