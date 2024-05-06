// import { ChevronRight } from 'lucide-react'
import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
// import ScrollButton from "@/shared/ScrollButton";

export default function Footer() {
  return (
    <>
      <footer
        className="w-full lg:p-20 p-5 bg-gradient-to-b from-[#E0F2FE] to-[#dcecff] text-black"
        style={{
          backgroundImage: "url('/banner-bg.svg')",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto flex max-w-[71rem] flex-col items-start md:space-x-8 space-x-2 md:flex-row">
          <div className="w-full md:px-4 px-1 md:w-1/2 lg:px-0">
            <h1 className="max-w-sm text-3xl font-bold">Connect With Us</h1>
            <div className="social_icons flex items-center gap-5 mt-2">
              <FaInstagram className="text-2xl cursor-pointer" />
              <FaTwitter className="text-2xl cursor-pointer" />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-8 lg:mb-0">
                <p className="mb-6 text-lg font-semibold text-black ">
                  Company
                </p>
                <ul className="flex flex-col space-y-4 text-[14px] font-medium text-black">
                  <li>About us</li>
                  <li>Company History</li>
                  <li>Our Team</li>
                  <li>Our Vision</li>
                  <li>
                    <Link
                      href="https://www.careergenies.co.uk/blog"
                      target="_blank"
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-gray-500 pt-10">
          <div className="max-w-6xl mx-auto sm:flex sm:justify-between">
            <div className="inline-flex items-center gap-2">
              <Image
                src={"/gch_logo.png"}
                width={30}
                height={30}
                alt="newlogo"
                className="w-50 h-auto object-contain"
              />
              <span className="text-lg font-bold">Genies Career Hub</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm font-medium text-black">
                © 2024 Genies Career Hub . All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
