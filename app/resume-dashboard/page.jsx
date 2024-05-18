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

export default function DashboardIdea() {
  return (
    <>
      <main>
        <section
          className="flex min-h-screen flex-col items-center justify-center  "
          style={{
            backgroundImage: "url('/banner-bg.svg')",
          }}
        >
          <div className="container  w-full h-screen resume-dashboard">
            <div className="flex justify-between lg:px-24 px-10">
              <div className="space-y-2 2xl:mt-40 lg:mt-20">
                <h1 className="2xl:text-6xl lg:text-5xl text-3xl font-bold mb-5 tracking-tighter text-gray-900">
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
                  <button className="text-xl text-white bg-blue-900 hover:bg-blue-700 rounded-md px-5 mt-5 py-3">
                    <a href="/builder">Create CV Now!</a>
                  </button>
                </div>
              </div>
              <Image
                src="/resume.png"
                className="px-7 pt-7 rounded-t-3xl lg:block hidden"
                alt="@shadcn"
                width={600}
                height={100}
              />
            </div>
          </div>
          <div className="w-full  bg-white">
            <div className="rounded-t-3xl border-t-8 border-blue-500 p-6 shadow-xl ">
              <h2 className="text-3xl text-center font-semibold my-5">
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
                    <CarouselItem>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 pt-14">
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/3.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 3"
                            src="/4.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume1.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume1.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/6.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                    <div className="border-t mt-5 bg-gray-300"></div>
                    <CarouselItem>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 pt-8">
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/resume-temp-example.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card Start */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume2.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume2.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        {/* Premium Card  End*/}
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 3"
                            src="/4.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/5.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/15.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/15.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 pt-14">
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/resume-temp-example.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/3.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 3"
                            src="/4.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/5.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/6.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                    <div className="border-t mt-5 bg-gray-300"></div>
                    <CarouselItem>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 pt-8">
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/resume-temp-example.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/3.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 3"
                            src="/4.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/5.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/6.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  </Carousel>
                </TabsContent>
                <TabsContent value="simple">
                  <Carousel>
                    <CarouselItem>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 pt-14">
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/15.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume2.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume2.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 3"
                            src="/17.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume1.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume1.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/11.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                    <div className="border-t mt-5 bg-gray-300"></div>
                    <CarouselItem>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 pt-8">
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume2.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume2.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/3.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume1.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume1.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/10.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/11.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  </Carousel>
                </TabsContent>
                <TabsContent value="ats">
                  <Carousel>
                    <CarouselItem>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 pt-14">
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume1.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume1.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/tab2_done.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume2.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume2.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/tab4_done.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/tab5_done.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                    <div className="border-t mt-5 bg-gray-300"></div>
                    <CarouselItem>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 pt-14">
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/tab1_done.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume1.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume1.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 3"
                            src="/tab3_done.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/tab4_done.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume2.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume2.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  </Carousel>
                </TabsContent>
                <TabsContent value="designer">
                  <Carousel>
                    <CarouselItem>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 pt-14">
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/5.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/6.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card  */}
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 3"
                            src="/7.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9]  text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium cv now and enhance your
                                    job search?
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/7.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/8.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume2.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume2.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                    <div className="border-t mt-5 bg-gray-300"></div>
                    <CarouselItem>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 pt-8">
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume2.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume2.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/8.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 3"
                            src="/10.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume1.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume1.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/6.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  </Carousel>
                </TabsContent>
                <TabsContent value="professional">
                  <Carousel>
                    <CarouselItem>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 pt-14">
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/resume-temp-example.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 3"
                            src="/4.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/9.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume1.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume1.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                    <div className="border-t mt-5 bg-gray-300"></div>
                    <CarouselItem>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 pt-8">
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/newResume2.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/newResume2.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/18.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        {/* Premium Card  */}
                        <div className="group relative rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <div className="card_box">
                            <span></span>
                          </div>
                          <Image
                            alt="Product 2"
                            src="/6.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Dialog>
                              <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                Try Now
                              </DialogTrigger>
                              <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                <DialogHeader>
                                  <DialogTitle className="mt-1">
                                    Download our premium CV now and enhance your
                                    job search!
                                  </DialogTitle>
                                  <DialogDescription>
                                    <section className="overflow-hidden">
                                      <div className="mx-auto max-w-5xl py-10">
                                        <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                          <Image
                                            alt="template1"
                                            className="w-full rounded object-cover lg:w-1/2"
                                            src="/6.png"
                                            width={500}
                                            height={500}
                                          />
                                          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                            <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                              Premium
                                            </h2>
                                            <h1 className="my-1 text-2xl font-bold text-blue-950">
                                              Professional Templates
                                            </h1>
                                            <div className="my-2 flex items-center">
                                              <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <IoIosStar
                                                    key={i}
                                                    size={16}
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                  4 Reviews
                                                </span>
                                              </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-800">
                                              Lorem ipsum dolor, sit amet
                                              consectetur adipisicing elit.
                                              Tenetur rem amet repudiandae neque
                                              adipisci eum enim, natus illo
                                              inventore totam?
                                            </p>
                                            <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                            <div className="flex items-center justify-between">
                                              <span className="title-font text-xl font-bold text-gray-900">
                                                $50
                                              </span>
                                              <button
                                                type="button"
                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                              >
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 2"
                            src="/3.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-b from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 3"
                            src="/4.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  </Carousel>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 border-t  scroll-mt-20 bg-blue-100"
        // style={{
        //   backgroundImage: "url('/banner-bg.svg')",
        //   backgroundPosition: "center",
        // }}
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
