"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ImageCarousel from "./ImageCarousel";

export default function NewSlider({ data }) {
  return (
    <>
      <div className="resume_slider">
        <Swiper
          slidesPerView={1.5}
          spaceBetween={40}
          autoplay={{
            delay: 7000,
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
              slidesPerView: 4,
              spaceBetween: 50,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          navigation={false}
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
      </div>
    </>
  );
}
