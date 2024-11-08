/** @format */

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";

export function CoachHeader({ coachData }) {
  console.log("coachData", coachData);
  // const [singleCoach, setSingleCoach] = useState(null);

  // const fetchCoachDetails = async () => {
  //   try {
  //     const response = await axios.get(`/api/getAllCoaches`);
  //     const data = await response.data;
  //     const coach = data.coaches.find((coach) => coach._id === id); // Find the specific coach by ID
  //     if (coach) {
  //       setSingleCoach(coach); // Set the single coach data if found
  //     } else {
  //       toast.error("Coach not found");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Error fetching coach details");
  //   }
  // };

  // useEffect(() => {
  //   fetchCoachDetails(); // Fetch coach details on component mount
  // }, []);

  return (
    <>
      {/* <div className='mt-20 bg-[#E0F2FF] h-40 w-full flex justify-center '></div> */}
      <div className='sm:container md:container lg:container xl:container 2xl:container bg-[#FFF] h-auto -mt-20 w-full flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-between items-center border border-[#FFDDD1] p-4'>
        {/* Left Side */}
        <div
          id='blog_header_left_side'
          className='flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4'>
          <div id='coach_image' className='px-4 w-[200px] h-auto'>
            {coachData?.profileImage ? (
              <img
                src={coachData.profileImage}
                alt='Coach'
                className='w-full h-full object-cover'
              />
            ) : (
              <Skeleton className='w-full h-28' />
            )}
          </div>
          <div id='coach_details' className='pt-4 lg:pt-0'>
            <div
              id='row1'
              className='flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pb-3'>
              {coachData?.name ? (
                <h1 className='font-bold text-[#1D2026] text-2xl sm:text-3xl'>
                  {coachData?.name}
                </h1>
              ) : (
                <Skeleton className='w-[200px] h-6' />
              )}

              <div className='text-xs sm:text-[10px] bg-[#FFEEE8] text-[#FF6636] flex items-center space-x-1 p-1'>
                <img
                  src='/Crown.png'
                  alt='Crown'
                  className='w-3 sm:w-4 h-3 sm:h-4'
                />
                <span>Top Rated</span>
              </div>
            </div>
            <div
              id='row2'
              className='text-xs sm:text-sm text-[#6E7485] pb-3 sm:pb-5'>
              {coachData?.typeOfCoaching ? (
                <p>{coachData?.typeOfCoaching}</p>
              ) : (
                <Skeleton className='w-[100px] h-4' />
              )}
            </div>
            <div
              id='row3'
              className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500'>
              <div className='flex items-center space-x-1'>
                <img
                  src='/Star.png'
                  alt='Star'
                  className='w-3 sm:w-4 h-3 sm:h-4'
                />
                <span className='text-[#1D2026] font-bold'>4.8</span>
                <span className='text-[#6E7485]'>(134,633 reviews)</span>
              </div>
              <div className='flex items-center space-x-1'>
                <img
                  src='/Users.png'
                  alt='Users'
                  className='w-3 sm:w-4 h-3 sm:h-4'
                />
                <span className='text-[#1D2026] font-bold'>430,117</span>
                <span className='text-[#6E7485]'>students</span>
              </div>
              <div className='flex items-center space-x-1'>
                <img
                  src='/PlayCircle.png'
                  alt='Play Circle'
                  className='w-3 sm:w-4 h-3 sm:h-4'
                />
                <span className='text-[#1D2026] font-bold'>7</span>
                <span className='text-[#6E7485]'>courses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}

        {/* {coachData?.socialLinks > 0 && (
          <div
            id='blog_header_right_side'
            className='text-left sm:text-left md:text-right lg:text-right xl:text-right 2xl:text-right space-y-2 mt-4 sm:mt-0'>
            <div
              id='website_link'
              className='text-xs sm:text-sm text-blue-500 underline flex items-center justify-center sm:justify-center md:justify-end lg:justify-end xl:justify-end 2xl:justify-end  space-x-1'>
              <img
                src='/GlobeSimple.png'
                alt='Globe Icon'
                className='w-3 sm:w-4 h-3 sm:h-4'
              />
              <span className='text-[10px] sm:text-[12px] text-[#564FFD]'>
                http://www.com
              </span>
            </div>
            <div id='socialMediaIcons' className='flex space-x-2 justify-end'>
              <Link
                href='https://www.facebook.com'
                target='_blank'
                rel='noopener noreferrer'>
                <img
                  src='/facebook_icon.png'
                  alt='Facebook'
                  className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto'
                />
              </Link>
              <Link
                href='https://www.twitter.com'
                target='_blank'
                rel='noopener noreferrer'>
                <img
                  src='/twitter_icon.png'
                  alt='Twitter'
                  className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto'
                />
              </Link>
              <Link
                href='https://www.instagram.com'
                target='_blank'
                rel='noopener noreferrer'>
                <img
                  src='/instagram_icon.png'
                  alt='Instagram'
                  className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto'
                />
              </Link>
              <Link
                href='https://www.youtube.com'
                target='_blank'
                rel='noopener noreferrer'>
                <img
                  src='/youtube_icon.png'
                  alt='YouTube'
                  className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto'
                />
              </Link>
              <Link
                href='https://www.whatsapp.com'
                target='_blank'
                rel='noopener noreferrer'>
                <img
                  src='/whatsApp_icon.png'
                  alt='WhatsApp'
                  className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto'
                />
              </Link>
            </div>
          </div>
        )} */}
        {coachData?.socialLinks?.length > 0 && (
          <div
            id='blog_header_right_side'
            className='text-left sm:text-left md:text-right lg:text-right xl:text-right 2xl:text-right space-y-2 mt-4 sm:mt-0'>
            <div id='socialMediaIcons' className='flex space-x-2 justify-end'>
              {coachData.socialLinks.map((socialLink) => {
                const iconSrc = {
                  facebook: "/facebook_icon.png",
                  twitter: "/twitter_icon.png",
                  instagram: "/instagram_icon.png",
                  youtube: "/youtube_icon.png",
                  whatsapp: "/whatsapp_icon.png",
                };

                return (
                  <Link
                    key={socialLink.id} // Unique key for each social link
                    href={`https://${socialLink.link}`}
                    target='_blank'
                    rel='noopener noreferrer'>
                    <img
                      src={iconSrc[socialLink.name.toLowerCase()]}
                      alt={socialLink.name}
                      className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto'
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
