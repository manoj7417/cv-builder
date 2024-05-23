"use client";
import Image from "next/image";
import React from "react";
import { IoIosStar } from "react-icons/io";

export default function PricingPage() {
  return (
    <>
      <div>
        <div
          className="pricing_section bg-slate-100"
          // style={{
          //   backgroundImage: "url('/banner-bg.svg')",
          //   backgroundPosition: "center bottom",
          // }}
        >
          <section className="overflow-hidden border">
            <div className="mx-auto max-w-5xl p-10 m-10 bg-gradient-to-tr from-white to-[#dcecff] shadow-lg rounded-md">
              <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
                <Image
                  alt="template1"
                  className="w-full rounded object-cover lg:w-1/2"
                  src="/5.png"
                  width={500}
                  height={500}
                />
                <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                  <h2 className="text-base font-semibold tracking-widest text-blue-950">
                    Premium
                  </h2>
                  <h1 className="my-4 text-3xl font-bold text-blue-950">
                    Professional Templates
                  </h1>
                  <div className="my-4 flex items-center">
                    <span className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <IoIosStar
                          key={i}
                          size={16}
                          className="text-yellow-500"
                        />
                      ))}
                      <span className="ml-3 inline-block text-xs font-semibold">
                        4 Reviews
                      </span>
                    </span>
                  </div>
                  <p className="leading-relaxed text-gray-800">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Tenetur rem amet repudiandae neque adipisci eum enim, natus
                    illo inventore totam?
                  </p>
                  <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-600 pb-5"></div>
                  <div className="flex items-center justify-between">
                    <span className="title-font text-xl font-bold text-gray-900">
                      $50
                    </span>
                    <button
                      type="button"
                      className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Download to Premium
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="w-full h-full py-20 bg-gradient-to-r from-[white] to-[#dcecff]">
          <div>
            <h2 className="text-4xl font-bold tracking-tighter md:text-5xl/tight text-center">
              Some of Our Most Downloaded Templates
            </h2>
            <div className="w-full mt-10 flex lg:flex-row flex-col justify-center gap-5">
              <Image
                width={500}
                height={500}
                src="/5.png"
                alt="Templates"
                className="md:w-[22%] w-full"
              />
              <Image
                width={500}
                height={500}
                src="/6.png"
                alt="Templates"
                className="md:w-[22%] w-full"
              />
              <Image
                width={500}
                height={500}
                src="/7.png"
                alt="Templates"
                className="md:w-[22%] w-full"
              />
              <Image
                width={500}
                height={500}
                src="/8.png"
                alt="Templates"
                className="md:w-[22%] w-full"
              />
            </div>
            <div className="w-full mt-10 flex lg:flex-row flex-col gap-5 md:flex-row justify-center">
              <Image
                width={500}
                height={500}
                src="/9.png"
                alt="Templates"
                className="md:w-[22%] w-full"
              />
              <Image
                width={500}
                height={500}
                src="/10.png"
                alt="Templates"
                className="md:w-[22%] w-full"
              />
              <Image
                width={500}
                height={500}
                src="/11.png"
                alt="Templates"
                className="md:w-[22%] w-full"
              />
              <Image
                width={500}
                height={500}
                src="/15.png"
                alt="Templates"
                className="md:w-[22%] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
