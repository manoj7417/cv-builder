"use client";
import React from "react";
import { Tabs, Tab } from "./TabsContent";
import Link from "next/link";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdContentCopy, MdDelete, MdDownload } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

const TabsMain = () => {
  return (
    <>
      <div className="tabs_section">
        <h2 className="lg:text-3xl text-xl text-center font-semibold my-5">
          Welcome back, Manoj Bisht! You have 1 document
        </h2>
        <Tabs>
          <Tab label="All Documents">
            <section className="flex lg:flex-row flex-col lg:px-0 px-10 gap-10 justify-center">
              <div className="grid lg:grid-cols-2 grid-cols-1 border border-gray-400 p-5 rounded-md lg:w-4/5 my-5 gap-2 place-content-center place-items-center h-full">
                <div className="file">
                  <label htmlFor="input-file">
                    <FaCirclePlus className="mr-3 text-xl text-blue-900" />
                    Select a file
                  </label>
                  <input id="input-file" type="file" />
                </div>

                <div className="text-sm">
                  <p className="text-blue-900 my-3 font-bold text-base">
                    New CV
                  </p>
                  <b>TIP:</b>
                  <span>
                    {" "}
                    Did you know that if you tailor your resume to the job
                    description, you double your chances to get an interview?
                  </span>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 grid-cols-1 border border-gray-400 p-5 rounded-md lg:w-4/5 my-5 gap-2 place-content-center place-items-center h-full">
                <div className="file">
                  <label htmlFor="input-file">
                    <FaCirclePlus className="mr-3 text-xl text-blue-900" />
                    Select a file
                  </label>
                  <input id="input-file" type="file" />
                </div>

                <div className="text-sm">
                  <p className="text-blue-900 my-3 font-bold text-base">
                    New Cover Letter
                  </p>
                  <b>TIP:</b>
                  <span>
                    {" "}
                    Did you know that if you tailor your resume to the job
                    description, you double your chances to get an interview?
                  </span>
                </div>
              </div>
            </section>

            <section className="overflow-hidden">
              <div className="max-w-3xl bg-gray-50 hover:bg-gray-100 lg:p-5 p-10 rounded-md">
                <div className="mx-auto flex justify-center flex-wrap items-center lg:w-full">
                  <div className="w-full lg:w-1/2 text-center">
                    <CardContainer className="inter-var">
                      <CardBody className="relative group/card rounded-xl p-5 cursor-pointer">
                        <CardItem translateZ="100" className="w-full mt-4">
                          <img
                            alt="pic1"
                            className="w-[250px] rounded object-cover mx-auto"
                            src="/newResume.png"
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </div>
                  <div className="w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                    <div
                      className="flex items-center justify-between py-2 px-1"
                      contentEditable
                    >
                      <h2 className="text-base font-semibold tracking-widest text-blue-900">
                        CV #1
                      </h2>
                      <CiEdit className="inline mr-2 text-xl text-green-600 cursor-pointer font-bold" />
                    </div>
                    <p className="text-sm my-2">Edited few seconds ago</p>
                    <div className="my-2 flex items-center"></div>
                    <ul className="leading-relaxed text-gray-800 flex flex-col gap-5 cursor-pointer justify-center">
                      <li className="text-base">
                        <CiEdit className="inline mr-2 text-base text-green-600 font-bold" />{" "}
                        Edit
                      </li>
                      <li className="text-base">
                        <MdDelete className="inline mr-2 text-base text-red-500 font-bold" />
                        Delete
                      </li>
                    </ul>
                    <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                    <div className="flex items-center justify-between">
                      <span className="title-font text-sm text-gray-900">
                        Created on May 27, 2024
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Tab>
          <Tab label="CV">
            <section className="overflow-hidden">
              <div className="max-w-3xl bg-gray-50 hover:bg-gray-100 lg:p-5 p-10 rounded-md">
                <div className="mx-auto flex justify-center flex-wrap items-center lg:w-full">
                  <div className="w-full lg:w-1/2 text-center">
                    <CardContainer className="inter-var">
                      <CardBody className="relative group/card rounded-xl p-5 cursor-pointer">
                        <CardItem translateZ="100" className="w-full mt-4">
                          <img
                            alt="pic1"
                            className="w-[250px] rounded object-cover mx-auto"
                            src="/newResume.png"
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </div>
                  <div className="w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                    <div
                      className="flex items-center justify-between py-2 px-1"
                      contentEditable
                    >
                      <h2 className="text-base font-semibold tracking-widest text-blue-900">
                        CV #1
                      </h2>
                      <CiEdit className="inline mr-2 text-xl text-green-600 cursor-pointer font-bold" />
                    </div>
                    <p className="text-sm my-2">Edited few seconds ago</p>
                    <div className="my-2 flex items-center"></div>
                    <ul className="leading-relaxed text-gray-800 flex flex-col gap-5 cursor-pointer justify-center">
                      <li className="text-base">
                        <CiEdit className="inline mr-2 text-base text-green-600 font-bold" />{" "}
                        Edit
                      </li>
                      <li className="text-base">
                        <MdDelete className="inline mr-2 text-base text-red-500 font-bold" />
                        Delete
                      </li>
                    </ul>
                    <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                    <div className="flex items-center justify-between">
                      <span className="title-font text-sm text-gray-900">
                        Created on May 27, 2024
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Tab>
          <Tab label="Cover Letter">
          <h1 className="text-xl md:text-2xl font-bold my-1 z-10">
          Coming Soon
        </h1>
        <p className=" text-sm md:text-base">
          We are working hard to bring you something amazing.Stay tuned!
        </p>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default TabsMain;
