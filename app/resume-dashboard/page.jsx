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
// import Footer from "../ui/newFooter";
import { redirect } from "next/dist/server/api-utils";
import Navbar from "../ui/newNav";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

export default function DashboardIdea() {
  return (
    <>
      {/* <header>
        <Navbar />
      </header> */}
      {/* <Header /> */}
      <main>
        <section
          className="flex min-h-screen flex-col items-center justify-center  "
          style={{
            backgroundImage: "url('/banner-bg.svg')",
            backgroundPosition: "center",
          }}
        >
          <div
            className="container  w-full h-screen"
            style={{ marginBottom: "-200px" }}
          >
            <div className="flex justify-between lg:px-24 px-10">
              <div className="space-y-2 mt-40">
                <h1 className="text-3xl font-bold mb-5 tracking-tighter text-gray-900 sm:text-5xl xl:text-6xl/none">
                  Crafted by industry experts
                </h1>
                <p className="text-gray-700 text-lg pe-10">
                  Crafted by seasoned professionals in the industry, our
                  portfolio builder is meticulously designed to cater to a
                  diverse range of needs and requirements, ensuring that every
                  aspect of your portfolio is addressed with expertise and
                  precision.
                </p>
                <div className="flex items-center space-x-4">
                  <button className="text-xl text-white bg-blue-900 rounded-md px-5 mt-5 py-3">
                    <a href="/resume-import">Build Resume for free</a>
                  </button>
                </div>
              </div>
                <Image
                  src="/ats friendly.png"
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
                Templates available for you to choose from
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
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/resume-temp-example.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/16.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/17.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/18.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/10.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/tab1_done.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/tab2_done.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/tab3_done.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/tab2_done.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/tab3_done.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/7.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/8.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/10.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/7.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/8.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                  {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Side Project 1</CardTitle>
                        <CardDescription>
                          A side project I worked on.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <img
                          alt="Project 1"
                          className="aspect-video w-full rounded-md object-cover"
                          height={300}
                          src="/placeholder.svg"
                          width={400}
                        />
                      </CardContent>
                      <CardFooter>
                        <Button variant="link">View Project</Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Side Project 2</CardTitle>
                        <CardDescription>
                          Another side project I worked on.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <img
                          alt="Project 2"
                          className="aspect-video w-full rounded-md object-cover"
                          height={300}
                          src="/placeholder.svg"
                          width={400}
                        />
                      </CardContent>
                      <CardFooter>
                        <Button variant="link">View Project</Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Side Project 3</CardTitle>
                        <CardDescription>
                          A third side project I worked on.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <img
                          alt="Project 3"
                          className="aspect-video w-full rounded-md object-cover"
                          height={300}
                          src="/placeholder.svg"
                          width={400}
                        />
                      </CardContent>
                      <CardFooter>
                        <Button variant="link">View Project</Button>
                      </CardFooter>
                    </Card>
                  </div> */}
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/az1.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#b9818a] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/11.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                            src="/18.png"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
                            <a
                              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                              href="/resume-builder"
                            >
                              Try Now
                            </a>
                          </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#8181b9] to-[#dcecff]">
                          <Image
                            alt="Product 1"
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                            src="/resume-temp-example.png"
                            height={900}
                            width={600}
                          />
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                          <div className="absolute bottom-0 right-0 flex h-full w-full items-center justify-center translate-y-full transition-all duration-300 group-hover:translate-y-0">
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
                Unable to find the right job? Genie can help you.
              </h2>
              <p className="max-w-[600px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                Genie will help you find the right job and provide you with the
                best career advice and builds your portfolio.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                href="#"
              >
                Contact Expert
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50    "
                href="#"
              >
                Learn more
              </Link>
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
