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
// import ScrollButton from "@/shared/ScrollButton";

export default function Footer() {
  return (
    <>
      <footer
        className="bg-[#ffffff] z-20 relative"
      >
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-center">
            {/* <div>
              <a href="/" className="flex items-center gap-2 mobile_footer">
                <Image
                  src={"/genies-career-hub-logo.png"}
                  width={200}
                  height={100}
                  alt="newlogo"
                  className="w-50 h-auto object-contain"
                />
                <span className="text-black font-bold text-2xl">
                  Genies Career Hub
                </span>
              </a>
            </div> */}

            <ul className="mt-8 flex justify-center gap-6 sm:mt-0">
              <li>
                <a href="https://www.facebook.com/profile.php?id=61560696226983" target="_blank">
                  <div className="text-black  hover:text-blue-500">
                    <span className="sr-only">Facebook</span>

                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/genies_career_hub/" target="_blank">
                  <div className="text-black transition hover:text-pink-700">
                    <span className="sr-only">Instagram</span>
                    <BsInstagram className="h-6 w-6" />
                  </div>
                </a>
              </li>

              <li>
                <a href="" target="_blank">
                  <div className="text-black transition hover:text-sky-500">
                    <span className="sr-only">Twitter</span>
                    <FaXTwitter className="h-6 w-6" />
                  </div>
                </a>
              </li>
              <li>
                <div className="text-black transition hover:text-sky-500">
                  <a href="https://www.linkedin.com/company/100784711/admin/feed/posts/" target="_blank">
                    <span className="sr-only">LinkedIn</span>
                    <FaLinkedin className="h-6 w-6" />
                  </a>
                </div>
              </li>
              <li>
                <div className="text-black transition hover:text-red-700">
                  <a href="https://www.pinterest.co.uk/GeniesCareerHub/" target="_blank">
                    <span className="sr-only">Pinterest</span>
                    <FaPinterest className="h-6 w-6" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 border-t border-gray-300 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
            <div>
              <p className="font-bold text-gray-900">Services</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="/resume-builder" className="text-black transition">
                    CV Creator
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </a>
                </li>
                <li>
                  <a
                    href="/resumeAnalyzer-dashboard"
                    className="text-black transition"
                  >
                    CV Optimiser
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </a>
                </li>
                <li>
                  <a
                    href="/jobCv"
                    className="text-black transition"
                  >
                    CV Match(beta)
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </a>
                </li>
                <li>
                  <a href="/career-coaching" className="text-black transition">
                    Career Coaching
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </a>
                </li>
                <li>
                  <a
                    href="/pshycometric-test"
                    className="text-black transition"
                  >
                    Psycometric Test
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-gray-900">Company</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/about-us" className="text-black transition">
                    {" "}
                    About Us
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </Link>
                </li>

              </ul>
            </div>

            <div>
              <p className="font-bold text-gray-900">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/contact-us" className="text-black transition">
                    Contact
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </Link>
                </li>

                <li>
                  <a
                    href="#FAQS"
                    className="text-black transition pointer-events-none"
                  >
                    FAQs
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </a>
                </li> 
                <li>
                  <Link href="/pricing" className="text-black transition">
                    Pricing
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </Link>
                </li>

                <li>
                  <a
                    href="https://www.careergenies.co.uk/blog"
                    className="text-black transition"
                    target="_blank"
                  >
                    Blog
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-gray-900">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/return-policy" className="text-black transition">
                    {" "}
                    Returns Policy{" "}
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </Link>
                </li>

                <li>
                  <Link href="refund-policy" className="text-black transition">
                    {" "}
                    Refund Policy{" "}
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </Link>
                </li>

                
                <li>
                  <a href="/terms-condition" className="text-black transition">
                    Terms and Condition
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </a>
                </li>
                <li>
                  <a href="/gdpr" className="text-black transition">
                    GDPR
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </a>
                </li>
                <li>
                  <a
                    href="/editorial-guidlines"
                    className="text-black transition"
                  >
                    Editorial Guidlines
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </a>
                </li>
                <li>
                  <a
                    href="/cookies-&-tracking-policy"
                    className="text-black transition"
                  >
                    Cookies & tracking policy
                    <MdOutlineKeyboardArrowRight className="inline text-xl" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-black">
            &copy; 2024. Genies Career Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
