"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function CoachWorksSlider({ data, slidesPerView,setFindCoachPopup }) {


  
  return (
    <>
      <div className="resume_slider lg:p-10 p-5">
        <Swiper
          slidesPerView={1}
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
              slidesPerView: slidesPerView || 3,
              spaceBetween: 50,
            },
            1280: {
              slidesPerView: slidesPerView || 4,
              spaceBetween: 20,
            },
          }}
          navigation={false}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {data.map((card, index) => (
            <SwiperSlide key={index}>
              <div
                key={card.id}
                className="overflow-hidden rounded-lg bg-white text-gray-600 shadow-md shadow-gray-200 lg:w-[300px] w-full lg:max-h-[600px] h-[600px] cursor-pointer"
                onClick={()=>setFindCoachPopup(true)}
              >
                <figure>
                  <img
                    src={card.image}
                    alt={`${card.title} image`}
                    className="w-[400px] h-[200px] object-cover"
                  />
                </figure>
                <div className="p-6">
                  <header className="mb-4 flex gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {card.title}
                      </h3>
                    </div>
                  </header>
                  <p className="text-sm leading-relaxed">{card.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
