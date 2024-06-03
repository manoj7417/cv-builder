'use client'
import Image from "next/image";
import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { useUserStore } from "@/app/store/UserStore";

const ProfilePage = () => {

  const userState = useUserStore((state) => state.userState);
  console.log("userState:::",userState)


  return (
    <>
      <section className="bg-gradient-to-r from-white to-[#dcecff] py-20">
        <div className="container mx-auto px-5">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 mb-4 p-5">
              <div className="bg-white rounded shadow p-4 text-center">
                <img
                  src="/pic.jpg"
                  alt="avatar"
                  className="rounded-full mx-auto mb-4 w-32 h-32"
                />
                <h5 className="text-xl font-medium mb-3">Marie</h5>
                <p className="text-gray-500 mb-1 text-sm">Full Stack Developer</p>
                <p className="text-gray-500 mb-4 text-sm">
                  Bay Area, San Francisco, CA
                </p>
                {/* <div className="flex justify-center space-x-2 mb-2">
                  <button className="bg-blue-900 text-white py-2 px-4 rounded text-sm">
                    Follow
                  </button>
                  <button className="border border-blue-900 text-blue-900 py-2 px-4 rounded text-sm">
                    Message
                  </button>
                </div> */}
              </div>
              <div className="bg-white rounded shadow p-0 mt-4">
                <ul className="divide-y divide-gray-200">
                  <li className="flex justify-between items-center p-3">
                    <FaGlobe className="text-yellow-500 text-xl" />
                    <p className="mb-0 text-sm font-semibold">https://mdbootstrap.com</p>
                  </li>
                  <li className="flex justify-between items-center p-3">
                    <FaGithub className="text-gray-800 text-xl" />
                    <p className="mb-0 text-sm font-semibold">mdbootstrap</p>
                  </li>
                  <li className="flex justify-between items-center p-3">
                    <FaTwitter className="text-blue-400 text-xl" />
                    <p className="mb-0 text-sm font-semibold">@mdbootstrap</p>
                  </li>
                  <li className="flex justify-between items-center p-3">
                    <FaInstagram className="text-pink-600 text-xl" />
                    <p className="mb-0 text-sm font-semibold">mdbootstrap</p>
                  </li>
                  <li className="flex justify-between items-center p-3">
                    <FaFacebook className="text-blue-600 text-xl" />
                    <p className="mb-0 text-sm font-semibold">mdbootstrap</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-2/3 p-5">
              <div className="bg-white rounded shadow mb-4 p-4">
                <div className="flex flex-wrap items-center my-3">
                  <div className="w-full sm:w-1/3">
                    <p className="font-semibold text-base">Full Name</p>
                  </div>
                  <div className="w-full sm:w-2/3">
                    <p className="text-gray-500">Johnatan Smith</p>
                  </div>
                </div>
                <hr />
                <div className="flex flex-wrap my-3 items-center">
                  <div className="w-full sm:w-1/3">
                    <p className="font-semibold text-base">Email</p>
                  </div>
                  <div className="w-full sm:w-2/3">
                    <p className="text-gray-500">example@example.com</p>
                  </div>
                </div>
                <hr />
                <div className="flex flex-wrap my-3 items-center">
                  <div className="w-full sm:w-1/3">
                    <p className="font-semibold text-base">Phone</p>
                  </div>
                  <div className="w-full sm:w-2/3">
                    <p className="text-gray-500">(097) 234-5678</p>
                  </div>
                </div>
                <hr />
                <div className="flex flex-wrap my-3 items-center">
                  <div className="w-full sm:w-1/3">
                    <p className="font-semibold text-base">Mobile</p>
                  </div>
                  <div className="w-full sm:w-2/3">
                    <p className="text-gray-500">(098) 765-4321</p>
                  </div>
                </div>
                <hr />
                <div className="flex flex-wrap my-3 items-center">
                  <div className="w-full sm:w-1/3">
                    <p className="font-semibold text-base">Address</p>
                  </div>
                  <div className="w-full sm:w-2/3">
                    <p className="text-gray-500">Bay Area, San Francisco, CA</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full md:w-1/2 mb-4">
                  <div className="bg-white rounded shadow p-4">
                    <p className="mb-4 text-black font-semibold italic">
                      My Free Templates
                    </p>
                    <div className="grid grid-cols-2 place-items-center gap-5">
                      <div className="image_section_1 ">
                        <Image
                          src="/5.png"
                          alt="pic1"
                          className="cursor-pointer hover:border-sky-700 hover:border-2"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="image_section_2">
                        <Image
                          src="/6.png"
                          alt="pic1"
                          className="cursor-pointer hover:border-sky-700 hover:border-2"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="image_section_1 ">
                        <Image
                          src="/7.png"
                          alt="pic1"
                          className="cursor-pointer hover:border-sky-700 hover:border-2"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="image_section_2">
                        <Image
                          src="/8.png"
                          alt="pic1"
                          className="cursor-pointer hover:border-sky-700 hover:border-2"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 mb-4">
                  <div className="bg-white rounded shadow p-4">
                    <p className="mb-4 text-black font-semibold italic">
                      My Premium Templates
                    </p>
                    <div className="grid grid-cols-2 place-items-center gap-5">
                      <div className="image_section_1 ">
                        <Image
                          src="/10.png"
                          alt="pic1"
                          className="cursor-pointer hover:border-sky-700 hover:border-2"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="image_section_2">
                        <Image
                          src="/11.png"
                          alt="pic1"
                          className="cursor-pointer hover:border-sky-700 hover:border-2"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="image_section_1 ">
                        <Image
                          src="/15.png"
                          alt="pic1"
                          className="cursor-pointer hover:border-sky-700 hover:border-2"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="image_section_2">
                        <Image
                          src="/16.png"
                          alt="pic1"
                          className="cursor-pointer hover:border-sky-700 hover:border-2"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
