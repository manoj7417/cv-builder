"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NewNavbar from "../ui/newNav";
import Image from "next/image";
import { FaBorderAll } from "react-icons/fa";
import { PiFolderSimpleUser } from "react-icons/pi";
import { MdQueryStats } from "react-icons/md";
import { IoShirt } from "react-icons/io5";
import { RiShirtFill } from "react-icons/ri";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { redirect } from "next/dist/server/api-utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoIosStar } from "react-icons/io";
import { templateType } from "@/components/component/Slider";
import ImageCarousel from "@/components/component/ImageCarousel";
import { useEffect, useState } from "react";
import NewResumeHeader from "../Layout/NewResumeHeader";
import Header from "../Layout/Header";
import { useUserStore } from "../store/UserStore";

const AllTemplates = [
  [
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate1",
      src: "/3.png",
      alt: "/3.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate2",
      src: "/4.png",
      alt: "/4.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate3",
      src: "/newResume1.png",
      alt: "/newResume1.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate4",
      src: "/6.png",
      alt: "/6.png",
      type: templateType.free,
    },
  ],
  [
    {
      name: "AllTempalte5",
      src: "/resume-temp-example.png",
      alt: "/resume-temp-example.png",
      type: templateType.free,
    },
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "/Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate7",
      src: "/4.png",
      alt: "/4.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate8",
      src: "/5.png",
      alt: "/5.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate9",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.premium,
    },
  ],
  [
    {
      name: "AllTempalte5",
      src: "/resume-temp-example.png",
      alt: "/resume-temp-example.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate6",
      src: "/3.png",
      alt: "/3.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate7",
      src: "/4.png",
      alt: "/4.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate8",
      src: "/5.png",
      alt: "/5.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate9",
      src: "/6.png",
      alt: "/6.png",
      type: templateType.free,
    },
  ],
  [
    {
      name: "AllTempalte5",
      src: "/resume-temp-example.png",
      alt: "/resume-temp-example.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate6",
      src: "/3.png",
      alt: "/3.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate7",
      src: "/4.png",
      alt: "/4.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate8",
      src: "/5.png",
      alt: "/5.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate9",
      src: "/6.png",
      alt: "/6.png",
      type: templateType.free,
    },
  ],
];

const SimpleTemplates = [
  [
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate1",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate2",
      src: "/17.png",
      alt: "/17.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate3",
      src: "/newResume1.png",
      alt: "/newResume1.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate4",
      src: "/11.png",
      alt: "/11.png",
      type: templateType.free,
    },
  ],
  [
    {
      name: "AllTempalte5",
      src: "/resume-temp-example.png",
      alt: "/resume-temp-example.png",
      type: templateType.free,
    },
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "/Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate7",
      src: "/4.png",
      alt: "/4.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate8",
      src: "/5.png",
      alt: "/5.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate9",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.premium,
    },
  ],
];

const ATSTemplates = [
  [
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate1",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate2",
      src: "/17.png",
      alt: "/17.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate3",
      src: "/newResume1.png",
      alt: "/newResume1.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate4",
      src: "/11.png",
      alt: "/11.png",
      type: templateType.free,
    },
  ],
  [
    {
      name: "AllTempalte5",
      src: "/resume-temp-example.png",
      alt: "/resume-temp-example.png",
      type: templateType.free,
    },
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "/Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate7",
      src: "/4.png",
      alt: "/4.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate8",
      src: "/5.png",
      alt: "/5.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate9",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.premium,
    },
  ],
];

const DesignerTemplates = [
  [
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate1",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate2",
      src: "/17.png",
      alt: "/17.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate3",
      src: "/newResume1.png",
      alt: "/newResume1.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate4",
      src: "/11.png",
      alt: "/11.png",
      type: templateType.free,
    },
  ],
  [
    {
      name: "AllTempalte5",
      src: "/resume-temp-example.png",
      alt: "/resume-temp-example.png",
      type: templateType.free,
    },
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "/Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate7",
      src: "/4.png",
      alt: "/4.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate8",
      src: "/5.png",
      alt: "/5.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate9",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.premium,
    },
  ],
];

const ProfessionalTemplates = [
  [
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate1",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate2",
      src: "/17.png",
      alt: "/17.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate3",
      src: "/newResume1.png",
      alt: "/newResume1.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate4",
      src: "/11.png",
      alt: "/11.png",
      type: templateType.free,
    },
  ],
  [
    {
      name: "AllTempalte5",
      src: "/resume-temp-example.png",
      alt: "/resume-temp-example.png",
      type: templateType.free,
    },
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "/Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate7",
      src: "/4.png",
      alt: "/4.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate8",
      src: "/5.png",
      alt: "/5.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate9",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.premium,
    },
  ],
];

export default function DashboardIdea() {
  const userState = useUserStore((state) => state.userState);
  return (
    <>
      {userState?.isAuthenticated ? <NewResumeHeader /> : <Header />}
      <main>
        <section
          className="w-full flex flex-col items-center justify-center  "
          style={{
            backgroundImage: "url('/banner-bg.svg')",
            backgroundSize: "cover",
          }}
        >
          <div className="container w-full h-full resume-dashboard">
            <div className="flex lg:px-24 px-5 justify-between">
              <div className="space-y-2 2xl:mt-40 lg:mt-32 mt-20">
                <h1 className="text-3xl font-bold mb-5 tracking-tighter text-gray-900 sm:text-5xl 2xl:text-6xl">
                  Craft the Perfect CV for Your Dream Job
                </h1>
                <p className="text-gray-700 text-lg pe-10">
                  Curated by Professionals and Industry Experts from all across
                  the globe and integrating Artificial Intelligence, we bring
                  forward CV Template options that are custom-tailored to the
                  job you are applying for, to ensure that your CV gets through
                  every Application Tracking Software.
                </p>
                <div className="flex items-center space-x-4">
                  <button className="text-base text-white bg-blue-900 hover:bg-blue-700 rounded-md px-5 mt-5 py-3">
                    <a href="/user-history">Create CV Now!</a>
                  </button>
                </div>
              </div>
              <Image
                src="/resume.png"
                className="w-50 h-50 px-7 mt-20 pt-7 rounded-t-3xl lg:block hidden"
                alt="@shadcn"
                width={600}
                height={100}
              />
            </div>
          </div>
          <div className="w-full  bg-white">
            <div className="rounded-t-xl border-t-8 border-blue-500 p-6 shadow-xl ">
              <h2 className="2xl:text-6xl lg:text-5xl text-3xl font-bold mt-5 tracking-tighter text-gray-900 text-center">
                Choose From Our Detailed Templates Options
              </h2>
              <Tabs className="w-full py-5" defaultValue="all">
                <TabsList className="mb-4 flex w-full justify-center flex-wrap py-10 h-auto">
                  <TabsTrigger value="all">
                    <FaBorderAll className="text-pink-600 h-8 w-8 me-3" />
                    All templates
                  </TabsTrigger>
                  <TabsTrigger value="simple">
                    <PiFolderSimpleUser className="text-blue-700 h-8 w-8 me-3" />
                    Simple
                  </TabsTrigger>
                  <TabsTrigger value="ats">
                    <MdQueryStats className="text-orange-600 h-8 w-8 me-3" />
                    Ats
                  </TabsTrigger>
                  <TabsTrigger value="designer">
                    <IoShirt className="text-green-700 h-8 w-8 me-3" />
                    Designer
                  </TabsTrigger>
                  <TabsTrigger value="professional">
                    <RiShirtFill className="text-red-700 h-8 w-8 me-3" />
                    Professional
                  </TabsTrigger>
                </TabsList>
                <TabsContent className="py-7" value="all">
                  <Carousel>
                    {AllTemplates.map((carousel, index) => {
                      return <ImageCarousel data={carousel} key={index} />;
                    })}
                  </Carousel>
                </TabsContent>
                <TabsContent value="simple">
                  <Carousel>
                    {SimpleTemplates?.map((carousel, index) => {
                      return <ImageCarousel data={carousel} key={index} />;
                    })}
                  </Carousel>
                </TabsContent>
                <TabsContent value="ats">
                  <Carousel>
                    {ATSTemplates?.map((carousel, index) => {
                      return <ImageCarousel data={carousel} key={index} />;
                    })}
                  </Carousel>
                </TabsContent>
                <TabsContent value="designer">
                  <Carousel>
                    {DesignerTemplates?.map((carousel, index) => {
                      return <ImageCarousel data={carousel} key={index} />;
                    })}
                  </Carousel>
                </TabsContent>
                <TabsContent value="professional">
                  <Carousel>
                    {ProfessionalTemplates?.map((carousel, index) => {
                      return <ImageCarousel data={carousel} key={index} />;
                    })}
                  </Carousel>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 border-t  scroll-mt-20 bg-blue-100"
          style={{
            backgroundImage: "url('/banner-bg.svg')",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Get Matched to the Job that is Right for You!
              </h2>
              <p className="max-w-[600px] text-gray-700 md:text-base/relaxed lg:text-base/relaxed xl:text-base/relaxed ">
                Find the perfect profession and get matched with the best job
                profile with the AI-Based Job Assistance Programme.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                href="#"
              >
                Contact Expert
              </Link>
              {/* <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50    "
                href="#"
              >
                Learn more
              </Link> */}
            </div>
          </div>
        </section>
        {/* <Footer /> */}
      </main>
    </>
  );
}

function LinkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function LocateIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}
