/** @format */
// import { ChevronRight } from 'lucide-react'
import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
// import ScrollButton from "@/shared/ScrollButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className='bg-[#ffffff] relative'>
        <div className='mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8'>
          <div className='sm:flex sm:items-center sm:justify-center'>
            <ul className='mt-8 flex justify-center gap-6 sm:mt-0'>
              <li>
                <Link
                  href='https://www.facebook.com/profile.php?id=61560696226983'
                  target='_blank'>
                  <div className='text-black  hover:text-blue-500'>
                    <span className='sr-only'>Facebook</span>

                    <BsFacebook className='h-6 w-6' />
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href='https://www.instagram.com/genies_career_hub/'
                  target='_blank'>
                  <div className='text-black transition hover:text-pink-700'>
                    <span className='sr-only'>Instagram</span>
                    <BsInstagram className='h-6 w-6' />
                  </div>
                </Link>
              </li>
              <li>
                <div className='text-black transition hover:text-sky-500'>
                  <Link
                    href='https://www.linkedin.com/company/genies-career-hub/'
                    target='_blank'>
                    <span className='sr-only'>aedIn</span>
                    <FaLinkedin className='h-6 w-6' />
                  </Link>
                </div>
              </li>
              <li>
                <div className='text-black transition hover:text-red-700'>
                  <Link
                    href='https://www.pinterest.co.uk/GeniesCareerHub/'
                    target='_blank'>
                    <span className='sr-only'>Pinterest</span>
                    <FaPinterest className='h-6 w-6' />
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          <div className='grid grid-cols-1 gap-8 border-t border-gray-300 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16'>
            <div>
              <p className='font-bold text-gray-900'>Services</p>

              <ul className='mt-6 space-y-4 text-sm'>
                <li>
                  <Link href='/resume' className='text-black transition'>
                    CV Creator
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
                <li>
                  <Link
                    href='/resume-analyzer'
                    className='text-black transition'>
                    CV Optimiser
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
                <li>
                  <Link href='/job-cv' className='text-black transition'>
                    CV Match
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
                <li>
                  <Link href='/coaches' className='text-black transition'>
                    Career Coaching
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
                <li>
                  <Link
                    href='/pshycometric-test'
                    className='text-black transition'>
                    Psychometric Test
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className='font-bold text-gray-900'>Company</p>

              <ul className='mt-6 space-y-4 text-sm'>
                <li>
                  <Link href='/about-us' className='text-black transition'>
                    {" "}
                    About Us
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className='font-bold text-gray-900'>Helpful as</p>

              <ul className='mt-6 space-y-4 text-sm'>
                <li>
                  <Link href='/contact-us' className='text-black transition'>
                    Contact
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>

                <li>
                  <Link href='/faq' className='text-black transition '>
                    FAQs
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
                <li>
                  <Link href='/pricing' className='text-black transition'>
                    Pricing
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
                {/* <li>
                 <Link
                    href='https://geniescareerhub.com/'
                    className='text-black transition'
                    target='_blank'
                  >
                    Blog
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                 </Link>
                </li> */}
              </ul>
            </div>
            <div>
              <p className='font-bold text-gray-900'>Legal</p>
              <ul className='mt-6 space-y-4 text-sm'>
                <li>
                  <Link href='/return-policy' className='text-black transition'>
                    {" "}
                    Return Policy{" "}
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
                <li>
                  <Link
                    href='/privacy-policy'
                    className='text-black transition'>
                    {" "}
                    Privacy Policy{" "}
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
                <li>
                  <Link href='/refund-policy' className='text-black transition'>
                    {" "}
                    Refund Policy{" "}
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
                <li>
                  <Link
                    href='/terms-condition'
                    className='text-black transition'>
                    Terms & Conditions
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
                <li>
                  <Link href='/gdpr' className='text-black transition'>
                    GDPR
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
                <li>
                  <Link
                    href='/editorial-guidlines'
                    className='text-black transition'>
                    Editorial Guidlines
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
                <li>
                  <Link
                    href='/cookies-tracking-policy'
                    className='text-black transition'>
                    Cookies & Tracking Policy
                    <MdOutlineKeyboardArrowRight className='inline text-xl' />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <p className='text-sm text-black'>
            &copy; {currentYear}. Genies career hub . All rights reserved.
            <br />
            <br />
            powered by
            <Link
              href='https://www.glassfrogtech.com/'
              target='_blank'
              className='hover:underline pl-1'>
              Glassfrog Technologies
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
