"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useUserStore } from "../store/UserStore";
import NewResumeHeader from "../Layout/NewResumeHeader";
import Header from "../Layout/Header";

const ComingSoonPage = () => {


  const userState = useUserStore((state) => state.userState);



  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
    {userState?.isAuthenticated ? <NewResumeHeader /> : <Header/>}
      <div className="h-screen bg-white flex flex-col text-center items-center justify-center relative px-4">
        <div
          className="absolute bg-gray-200 top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url("/banner-bg.svg")',
          }}
        ></div>
        <div
          className="content"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <h1 className="text-5xl md:text-7xl text-black font-bold mb-8 z-10">
            Coming Soon
          </h1>
          <p className="text-black text-xl md:text-2xl">
            We are working hard to bring you something amazing. Stay tuned!
          </p>
        </div>
      </div>
    </>
  );
};

export default ComingSoonPage;
