/** @format */

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoArrowRight } from "react-icons/go";

const WorkTogether = () => {
  return (
    <>
      <div className='bg-white'>
        <div className='max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 place-items-center py-10'>
          <div className='work-content lg:px-2 px-10'>
            <h3 className='text-black lg:text-5xl text-2xl font-bold text-center sm:text-center md:text-left lg:text-left xl:text-left 2xl:text-left'>
              Connect with Us,
              <br /> Join the Community
            </h3>
            <p className='text-sm mt-3 text-[#7C7C7C] text-center sm:text-center md:text-left lg:text-left xl:text-left 2xl:text-left'>
              Is your job helping others to find a job? Connect with Us and
              explore better opportunities as a Career Coach with the Genies
              Career Hub!
            </p>
            <div className='learn-more flex gap-1 items-center mt-5'>
              <Link
                className='text-blue-950 underline underline-offset-8 font-bold'
                href={"/contact-us"}>
                Contact Us
              </Link>
              <GoArrowRight className='text-blue-950 font-bold' />
            </div>
          </div>
          <div className='work_image lg:px-2 px-8'>
            <Image
              priority
              src={"/hybridwork.png"}
              width={500}
              height={500}
              alt='work'
              className='w-full'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkTogether;
