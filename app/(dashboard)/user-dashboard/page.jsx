/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./user.css";
import { FaRegPlayCircle, FaStar, FaTimes } from "react-icons/fa";
import Profile from "./Profile";
import Whishlist from "./Wishlist";

import PurchaseHistory from "./PurchaseHistory";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { useUserStore } from "@/app/store/UserStore";
import axios from "axios";
import { GetTokens } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, DollarSign, Mail } from "lucide-react";
import { format } from "date-fns";
import { ResumeChart } from "./ResumeChart";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import UserBookingSlot from "./BookingSlot";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";

const UserDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { userdata } = useUserStore((state) => state.userState);
  const [bookings, setBookings] = useState([]);
  const [program, setProgram] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [showBooking, setShowBooking] = useState(false);
  const [selectedCoachId, setSelectedCoachId] = useState(null);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [meetUrl, setMeetUrl] = useState(null);

  const handleMeetUrlUpdate = (url) => {
    setMeetUrl(url);
  };

  const handleBookSlotClick = (id, programId) => {
    setSelectedCoachId(id);
    setSelectedProgramId(programId);
    // setShowBooking(true);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };

  const handleGetBookings = async () => {
    const { accessToken } = await GetTokens();
    if (!accessToken || !accessToken.value) {
      return router.push("/login?redirect=/user-dashboard");
    }
    try {
      const response = await axios.get("/api/getUserBookings", {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        setBookings(response.data.bookings);
      }
    } catch (error) {}
  };

  const handleGetUserProgram = async () => {
    const { accessToken } = await GetTokens();
    if (!accessToken || !accessToken.value) {
      return router.push("/login?redirect=/user-dashboard");
    }
    setIsLoading(true);
    try {
      const response = await axios.get("/api/getUserProgram", {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        setProgram(response?.data?.programs);
        setIsLoading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleGetUserProgram();
  }, []);

  useEffect(() => {
    handleGetBookings();
  }, []);

  return (
    <>
      <div className="mt-20 bg-[#E0F2FF] h-40 w-full flex justify-center "></div>
      <div className="max-w-5xl mx-auto">
        <div className="profile_header">
          <div className="sm:container md:container lg:container xl:container 2xl:container bg-[#FFF] h-auto -mt-20 w-full flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-between items-center border border-[#FFDDD1] p-4">
            <div
              id="blog_header_left_side"
              className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <div className="md:w-44 w-24 md:h-44 h-24 mx-auto">
                <img
                  src={
                    userdata?.profilePicture ||
                    "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                  }
                  alt="Coach"
                  className="w-full  object-cover h-full rounded-full "
                />
              </div>
              <div id="coach_details" className="pt-4 sm:pt-10">
                <div
                  id="row1"
                  className="flex flex-col md:items-start items-center space-y-2 sm:space-y-0 sm:space-x-2 pb-3 px-3"
                >
                  <h1 className="font-bold text-[#1D2026] text-2xl sm:text-3xl px-2">
                    {userdata?.fullname.charAt(0).toUpperCase() +
                      userdata?.fullname.slice(1)}
                  </h1>
                  <p className="text-sm text-gray-500 my-1">{userdata?.email}</p>
                  <p className="text-sm text-gray-500 ny-1">
                    {userdata?.occupation}
                  </p>
                  <p className="text-sm text-gray-500 my-1">{userdata?.address}</p>
                  <div className="my-3">
                    <Label className="text-gray-500">Plans</Label>
                    <p className="text-gray-500 my-2">
                      {userdata?.subscription?.plan &&
                        userdata.subscription.plan.map((item, index) => (
                          <span
                            key={index}
                            className="bg-[#FF6636] text-white px-2 py-1 rounded mr-2"
                          >
                            {item}
                          </span>
                        ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            {userdata?.links?.length > 0 && (
              <div
                id="blog_header_right_side"
                className="text-left sm:text-left md:text-right lg:text-right xl:text-right 2xl:text-right space-y-2 mt-4 sm:mt-0"
              >
                <div
                  id="socialMediaIcons"
                  className="flex space-x-2 justify-end"
                >
                  {userdata.links.map((socialLink) => {
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
                        href={`${
                          socialLink.link.startsWith("http")
                            ? socialLink.link
                            : `https://${socialLink.link}`
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={iconSrc[socialLink.name.toLowerCase()]}
                          alt={socialLink.name}
                          className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            {/* <div
              id="blog_header_right_side"
              className="text-left sm:text-left md:text-right lg:text-right xl:text-right 2xl:text-right space-y-2 mt-4 sm:mt-0"
            >
              <div
                id="website_link"
                className="text-xs sm:text-sm text-blue-500 underline flex items-center justify-center sm:justify-center md:justify-end lg:justify-end xl:justify-end 2xl:justify-end  space-x-1"
              >
                <img
                  src="/GlobeSimple.png"
                  alt="Globe Icon"
                  className="w-3 sm:w-4 h-3 sm:h-4"
                />
                <span className="text-[10px] sm:text-[12px] text-[#564FFD]">
                  http://www.com
                </span>
              </div>
              <div id="socialMediaIcons" className="flex space-x-2 justify-end">
                <img
                  src="/facebook_icon.png"
                  alt="Facebook"
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto"
                />
                <img
                  src="/twitter_icon.png"
                  alt="Twitter"
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto"
                />
                <img
                  src="/instagram_icon.png"
                  alt="Instagram"
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto"
                />
                <img
                  src="/youtube_icon.png"
                  alt="YouTube"
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto"
                />
                <img
                  src="/whatsApp_icon.png"
                  alt="WhatsApp"
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto"
                />
              </div>
            </div> */}
          </div>
        </div>
        <div className="tabs_section mt-10">
          <Tabs className="w-full py-5" defaultValue="dashboard">
            <TabsList className="mb-4 flex w-full justify-center flex-wrap h-auto">
              <TabsTrigger
                value="dashboard"
                className={`tabs-trigger text-blue-950 rounded-md text-base ${
                  activeTab === "dashboard" ? "active" : ""
                } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="Bookings"
                className={`tabs-trigger text-blue-950 rounded-md text-base ${
                  activeTab === "Bookings" ? "active" : ""
                } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("Bookings")}
              >
                Bookings
              </TabsTrigger>
              <TabsTrigger
                value="program"
                className={`tabs-trigger text-blue-950 rounded-md text-base ${
                  activeTab === "program" ? "active" : ""
                } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("program")}
              >
                Program
              </TabsTrigger>
              {/* <TabsTrigger
                value="whishlist"
                className={`tabs-trigger text-blue-950 rounded-md text-base ${activeTab === "whishlist" ? "active" : ""
                  } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("whishlist")}
              >
                Whishlist
              </TabsTrigger> */}
              {/* <TabsTrigger
                value="purchaseHistory"
                className={`tabs-trigger text-blue-950 rounded-md text-base ${
                  activeTab === "purchaseHistory" ? "active" : ""
                } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("purchaseHistory")}
              >
                Purchase History
              </TabsTrigger> */}
              <TabsTrigger
                value="settings"
                className={`tabs-trigger text-blue-950 rounded-md text-base ${
                  activeTab === "settings" ? "active" : ""
                } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="mb-4">
              <div className="actions_section max-w-full md:max-w-5xl mx-auto">
                <div>
                  {/* <h2 className="text-xl font-bold mb-6 text-blue-950 lg:text-start text-center">
                    Dashboard
                  </h2>
                  <div className="dashboard">
                    <div className="grid lg:grid-cols-4 grid-cols-1 gap-10 lg:p-0 p-5">
                      <div className="card border border-gray-200 shadow-lg bg-pink-200">
                        <div className="card-content p-4">
                          <div className="card-body">
                            <div className="flex items-center gap-5">
                              <div className="flex-shrink-0 bg-white p-2">
                                <FaRegPlayCircle className="text-2xl text-pink-400" />
                              </div>
                              <div className="flex-grow text-start">
                                <h3 className="text-xl">10</h3>
                                <span className="text-gray-500 text-sm">
                                  Live Coaching
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card border border-gray-200 shadow-lg bg-[#EBEBFF]">
                        <div className="card-content p-4">
                          <div className="card-body">
                            <div className="flex items-center gap-5">
                              <div className="flex-shrink-0 bg-white p-2">
                                <BsFileEarmarkCheck className="text-2xl text-blue-400" />
                              </div>
                              <div className="flex-grow text-start">
                                <h3 className="text-base">6</h3>
                                <span className="text-gray-500 text-sm">
                                  Build Resume
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card border border-gray-200 shadow-lg bg-[#f3c6b2]">
                        <div className="card-content p-4">
                          <div className="card-body">
                            <div className="flex items-center gap-5">
                              <div className="flex-shrink-0 bg-white p-2">
                                <BsFileEarmarkCheck className="text-2xl text-blue-400" />
                              </div>
                              <div className="flex-grow text-start">
                                <h3 className="text-base">92 % Score</h3>
                                <span className="text-gray-500 text-sm whitespace-nowrap">
                                  CV Analyser History
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="booking_data mt-10">
                    <h2 className="text-xl font-bold my-5 text-blue-950">
                      My Bookings
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                        <thead>
                          <tr className="bg-gray-100 border-b border-gray-200 text-gray-600 uppercase text-xs font-semibold text-left">
                            <th className="p-4">Coach</th>
                            <th className="p-4">Booking Time</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Timezone</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          {isLoading ? (
                            Array(5)
                              .fill("")
                              .map((_, index) => (
                                <tr
                                  key={index}
                                  className="border-b border-gray-200"
                                >
                                  <td className="p-4 flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="flex-1">
                                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                  </td>
                                  <td className="p-4 text-xs">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                                  </td>
                                  <td className="p-4 text-xs">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                                  </td>
                                  <td className="p-4 text-xs">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                                  </td>
                                  <td className="p-4 text-xs">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                                  </td>
                                  <td className="p-4 text-xs">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                                  </td>
                                </tr>
                              ))
                          ) : bookings.length > 0 ? (
                            bookings.map((booking) => (
                              <tr
                                key={booking._id}
                                className="border-b border-gray-200"
                              >
                                <td className="p-4 flex items-center space-x-3">
                                  <img
                                    src={booking?.coachId?.profileImage}
                                    alt={booking?.coachId?.name}
                                    className="w-10 h-10 object-cover rounded-full"
                                  />
                                  <div>
                                    <p className="text-sm font-semibold">
                                      {booking?.coachId?.name}
                                    </p>
                                  </div>
                                </td>

                                <td className="p-4 text-xs text-gray-700">
                                  {booking?.slotTime?.startTime} -{" "}
                                  {booking?.slotTime?.endTime}
                                </td>

                                <td className="p-4 text-xs text-gray-700">
                                  {format(
                                    new Date(booking?.date),
                                    "MMM dd, yyyy"
                                  )}
                                </td>

                                <td className="p-4 text-xs text-gray-700">
                                  {booking?.timezone}
                                </td>

                                <td className="p-4 text-xs text-gray-700 ">
                                  <span className="flex items-center">
                                    <Mail className="mr-2 h-4 w-4 flex-shrink-0 text-gray-500" />
                                    {booking?.coachId?.email}
                                  </span>
                                </td>

                                <td className="p-4 text-xs text-gray-700">
                                  <span className="flex items-center">
                                    <DollarSign className="mr-2 h-4 w-4 flex-shrink-0 text-gray-500" />
                                    {booking?.coachId?.ratesPerHour?.charges}
                                    /hour
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="6"
                                className="text-center py-4 text-gray-500"
                              >
                                No Data Available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div> */}
                  <div className="program_data mt-10">
                    <h2 className="text-xl font-bold my-5 text-blue-950 md:text-start text-center">
                      My Programs
                    </h2>
                    <div className="overflow-x-auto">
                      {isLoading ? (
                        // Skeleton loader for table rows
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                          <thead>
                            <tr className="bg-gray-100 border-b border-gray-200 text-gray-600 uppercase text-xs font-semibold text-left">
                              <th className="p-4">Program</th>
                              <th className="p-4">Description</th>
                              <th className="p-4">Coach</th>
                              <th className="p-4">Book Slot</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array(6)
                              .fill(0)
                              .map((_, index) => (
                                <tr
                                  key={index}
                                  className="border-b border-gray-200 animate-pulse"
                                >
                                  {/* Program Image */}
                                  <td className="p-4 flex items-center space-x-3">
                                    <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                                    <div className="w-full">
                                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                    </div>
                                  </td>
                                  {/* Description */}
                                  <td className="p-4">
                                    <div className="h-4 bg-gray-200 rounded mb-2 w-40"></div>
                                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                                  </td>
                                  {/* Coach */}
                                  <td className="p-4 flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <div className="w-full">
                                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="w-24 h-8 bg-gray-300 rounded animate-pulse"></div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      ) : program.length > 0 ? (
                        <>
                          <table className="hidden md:table min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                            <thead>
                              <tr className="bg-gray-100 border-b border-gray-200 text-gray-600 uppercase text-xs font-semibold text-left">
                                <th className="p-4">Program</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Coach</th>
                                <th className="p-4 whitespace-nowrap">
                                  Book Slot
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {program.map(
                                (item, index) =>
                                  item?.programId && (
                                    <tr
                                      key={index}
                                      className="border-b border-gray-200 flex flex-col md:table-row"
                                    >
                                      {/* Program Info */}
                                      <td className="p-4 flex items-center space-x-3">
                                        <img
                                          src={item.programId?.programImage}
                                          alt={item.programId?.title}
                                          className="w-16 h-16 object-cover rounded-md"
                                          priority
                                        />
                                        <div>
                                          <p className="text-sm font-semibold">
                                            {item.programId?.title}
                                          </p>
                                        </div>
                                      </td>

                                      {/* Description */}
                                      <td className="p-4 text-xs text-gray-700">
                                        {item.programId?.description?.slice(
                                          0,
                                          100
                                        )}
                                      </td>

                                      {/* Coach Info */}
                                      <td className="p-4 flex items-center space-x-3">
                                        <img
                                          src={item?.coachId?.profileImage}
                                          alt={item?.coachId?.name}
                                          className="w-16 h-16 object-cover rounded-full"
                                          priority
                                        />
                                        <div>
                                          <p className="text-sm font-semibold">
                                            {item.coachId?.name}
                                          </p>
                                        </div>
                                      </td>
                                      <td className="p-2 text-center">
                                        {meetUrl ? (
                                          <Link
                                            href={meetUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm bg-blue-950 text-white py-2 px-4 rounded-md font-medium transition duration-300 transform hover:bg-blue-700 whitespace-nowrap"
                                          >
                                            Join Meeting
                                          </Link>
                                        ) : (
                                          <Button
                                            className="text-xs p-2"
                                            onClick={() =>
                                              handleBookSlotClick(
                                                item?.coachId?.id,
                                                item?._id
                                              )
                                            }
                                          >
                                            Book Slot
                                          </Button>
                                        )}
                                      </td>
                                    </tr>
                                  )
                              )}
                            </tbody>
                          </table>

                          {/* Cards for Small Screens */}
                          <div className="md:hidden space-y-4 m-5">
                            {program.map(
                              (item, index) =>
                                item?.programId && (
                                  <div
                                    key={index}
                                    className="p-4 bg-white border border-gray-200 rounded-md shadow-sm flex flex-col space-y-4"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <img
                                        src={item.programId?.programImage}
                                        alt={item.programId?.title}
                                        className="w-10 h-10 object-cover rounded-md"
                                      />
                                      <div>
                                        <p className="text-xs font-semibold">
                                          {item.programId?.title}
                                        </p>
                                      </div>
                                    </div>
                                    <p className="text-xs text-gray-700">
                                      {item.programId?.description?.slice(
                                        0,
                                        50
                                      )}
                                    </p>
                                    <div className="flex items-center space-x-3">
                                      <img
                                        src={item?.coachId?.profileImage}
                                        alt={item?.coachId?.name}
                                        className="w-10 h-10 object-cover rounded-full"
                                      />
                                      <div>
                                        <p className="text-sm font-semibold">
                                          {item.coachId?.name}
                                        </p>
                                      </div>
                                    </div>
                                    {meetUrl ? (
                                      <Link
                                        href={meetUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm bg-blue-950 text-white py-2 px-4 rounded-md font-medium transition duration-300 transform hover:bg-blue-700 whitespace-nowrap"
                                      >
                                        Join Meeting
                                      </Link>
                                    ) : (
                                      <Button
                                        className="text-xs p-2 cursor-pointer"
                                        onClick={() =>
                                          handleBookSlotClick(
                                            item?.coachId?.id,
                                            item?._id
                                          )
                                        }
                                      >
                                        Book Slot
                                      </Button>
                                    )}
                                  </div>
                                )
                            )}
                          </div>

                          <Drawer
                            open={isDrawerOpen}
                            onOpenChange={setIsDrawerOpen}
                          >
                            <DrawerContent className="p-4 fixed bottom-0 w-full md:h-[550px] h-[90%] overflow-y-scroll">
                              <div className="flex md:justify-end justify-between mt-10">
                                <div className="main_title md:hidden block">
                                  <h2 className="text-2xl font-semibold text-center underline underline-offset-4">
                                    Book a Slot
                                  </h2>
                                </div>
                                <Button
                                  className="text-sm"
                                  onClick={handleCloseDrawer}
                                >
                                  <FaTimes className="" />
                                </Button>
                              </div>

                              <div className="main_title md:block hidden">
                                <h2 className="text-2xl font-semibold text-center underline underline-offset-4">
                                  Book a Slot
                                </h2>
                              </div>
                              <UserBookingSlot
                                coach_Id={selectedCoachId}
                                programId={selectedProgramId}
                                onMeetUrlUpdate={handleMeetUrlUpdate}
                              />
                            </DrawerContent>
                          </Drawer>
                        </>
                      ) : (
                        <Card className="w-full">
                          <CardHeader>
                            <CardTitle className="text-center text-lg font-semibold text-gray-500">
                              No Data Available
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-center items-center py-4">
                              <p className="text-sm text-gray-500">
                                There are no programs to display at the moment.
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent className="mb-6" value="Bookings">
              <div className="career_section max-w-full md:max-w-5xl mx-auto">
                <div className="space-y-3">
                  <h2 className="lg:text-start text-center text-xl font-bold text-blue-950">
                    My Bookings
                  </h2>
                  <div className="coach_section">
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {isLoading ? (
                          Array(6)
                            .fill(0)
                            .map((_, index) => (
                              <div key={index} className="animate-pulse">
                                <div className="w-full bg-gray-200 rounded-lg h-24"></div>
                                <div className="flex items-center space-x-4 mt-4">
                                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                                  <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                  </div>
                                </div>
                              </div>
                            ))
                        ) : bookings.length > 0 ? (
                          bookings.map((booking) => (
                            <Card key={booking._id} className="w-full">
                              <CardHeader>
                                <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                                  <Avatar className="w-12 h-12 mb-2 sm:mb-0">
                                    <AvatarImage
                                      src={booking?.coachId?.profileImage}
                                      alt={booking?.coachId?.name}
                                      className="object-cover"
                                    />
                                    <AvatarFallback>
                                      {booking?.coachId?.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-base sm:text-lg font-semibold">
                                      {booking?.coachId?.name}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                      {booking?.slotTime?.startTime} -{" "}
                                      {booking?.slotTime?.endTime}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                      {format(
                                        new Date(booking?.date),
                                        "MMM dd, yyyy"
                                      )}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                      {booking?.timezone}
                                    </p>
                                  </div>
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  <div className="flex items-center">
                                    <Mail className="mr-2 h-4 w-4 flex-shrink-0" />
                                    <span className="text-xs sm:text-sm truncate">
                                      {booking?.coachId?.email}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <DollarSign className="mr-2 h-4 w-4 flex-shrink-0" />
                                    <span className="text-xs sm:text-sm">
                                      {booking?.coachId?.ratesPerHour?.charges}
                                      /hour
                                    </span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <Card className="w-full">
                            <CardHeader>
                              <CardTitle className="text-center text-lg font-semibold text-gray-500">
                                No Data Available
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-center items-center py-4">
                                <p className="text-sm text-gray-500">
                                  There are no bookings to display at the
                                  moment.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent className="mb-6" value="program">
              <div className="career_section max-w-full md:max-w-5xl mx-auto">
                <div className="space-y-3">
                  <h2 className="lg:text-start text-center text-xl font-bold text-blue-950">
                    My Programs
                  </h2>
                  <div className="coach_section">
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                      <div>
                        {isLoading ? (
                          // Skeleton loader
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array(6)
                              .fill(0)
                              .map((_, index) => (
                                <div key={index} className="animate-pulse">
                                  <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 bg-gray-200"></div>
                                  <div className="bg-white p-4 mt-4">
                                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="flex items-center mt-4">
                                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                      <div className="pl-3">
                                        <div className="h-4 bg-gray-200 rounded mb-1 w-24"></div>
                                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : program.length > 0 ? (
                          program.map(
                            (item, index) =>
                              item?.programId && (
                                <div key={index}>
                                  <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer">
                                    <div className="w-full block h-full">
                                      <img
                                        alt="blog photo"
                                        src={item.programId?.programImage}
                                        className="max-h-40 w-full object-cover"
                                        priority
                                      />
                                      <div className="bg-white w-full p-4">
                                        <p className="text-gray-800 text-base font-medium mb-2">
                                          {item?.programId?.title}
                                        </p>
                                        <p className="text-gray-600 font-light text-sm">
                                          {item?.programId?.description.slice(
                                            0,
                                            100
                                          )}
                                        </p>
                                        <div className="flex items-center mt-2">
                                          <img
                                            className="w-10 h-10 object-cover rounded-full"
                                            alt="User avatar"
                                            src={item?.coachId?.profileImage}
                                            priority
                                          />
                                          <div className="pl-3">
                                            <div className="font-medium text-sm">
                                              {item?.coachId?.name}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                          )
                        ) : (
                          <Card className="w-full">
                            <CardHeader>
                              <CardTitle className="text-center text-lg font-semibold text-gray-500">
                                No Data Available
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-center items-center py-4">
                                <p className="text-sm text-gray-500">
                                  There are no programs to display at the
                                  moment.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            {/* <TabsContent className="mb-6" value="whishlist">
              <div className="max-w-full md:max-w-5xl mx-auto summary_section">
                <div>
                  <Whishlist />
                </div>
              </div>
            </TabsContent> */}
            {/* <TabsContent className="mb-6" value="purchaseHistory">
              <div className="max-w-full md:max-w-5xl mx-auto summary_section">
                <div>
                  <h2 className="text-xl font-bold mb-6 text-blue-950 lg:text-start text-center">
                    Purchase History
                  </h2>
                  <div className="purchase_section">
                    <PurchaseHistory open={open} toggle={toggle} />
                  </div>
                </div>
              </div>
            </TabsContent> */}
            <TabsContent className="mb-6" value="settings">
              <div className="max-w-full md:max-w-5xl mx-auto summary_section">
                <div>
                  <h2 className="text-xl font-bold mb-6 text-blue-950 lg:text-start text-center">
                    Settings
                  </h2>
                  <Profile />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default UserDashboardPage;
