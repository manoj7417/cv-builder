/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./user.css";
import { FaRegPlayCircle, FaStar } from "react-icons/fa";
import Profile from "../settings/profile/page";
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

const UserDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const { userdata } = useUserStore((state) => state.userState)
  const [bookings, setBookings] = useState([])

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };

  const puchaseHistory = [
    {
      id: 1,
      courses: "3",
      price: "$75.00 USD",
      paymentType: "Credit Card",
    },
  ];

  const coaches = [
    {
      id: 1,
      name: "Devon Lane",
      jobProfile: {
        title: "Web Developer",
        backgroundColor: "bg-blue-100",
        textColor: "text-blue-800",
      },
      href: "#",
      imageSrc: "/coach-1.png",
      rating: "5.0",
      students: "265.7k",
      price: "$49",
    },
    {
      id: 2,
      name: "Darrell Steward",
      jobProfile: {
        title: "React Native Developer",
        backgroundColor: "bg-green-100",
        textColor: "text-green-800",
      },
      href: "#",
      imageSrc: "/coach-2.png",
      rating: "4.9",
      students: "265.7k",
      price: "$49",
    },
    {
      id: 3,
      name: "Jane Cooper",
      jobProfile: {
        title: "Mobile Developer",
        backgroundColor: "bg-purple-100",
        textColor: "text-purple-800",
      },
      href: "#",
      imageSrc: "/coach-3.png",
      rating: "5.0",
      students: "265.7k",
      price: "$49",
    },
    {
      id: 4,
      name: "Albert Flores",
      jobProfile: {
        title: "Javascript Developer",
        backgroundColor: "bg-yellow-100",
        textColor: "text-yellow-800",
      },
      href: "#",
      imageSrc: "/coach-4.png",
      rating: "5.0",
      students: "265.7k",
      price: "$49",
    },
    {
      id: 5,
      name: "Leslie Alexander",
      jobProfile: {
        title: "UX/UI Designer",
        backgroundColor: "bg-blue-100",
        textColor: "text-blue-800",
      },
      href: "#",
      imageSrc: "/coach-5.png",
      rating: "4.8",
      students: "145.3k",
      price: "$49",
    },
    {
      id: 6,
      name: "Wade Warren",
      jobProfile: {
        title: "Full Stack Developer",
        backgroundColor: "bg-red-100",
        textColor: "text-red-800",
      },
      href: "#",
      imageSrc: "/coach-1.png",
      rating: "4.9",
      students: "320.1k",
      price: "$49",
    },
    {
      id: 7,
      name: "Kristin Watson",
      jobProfile: {
        title: "Data Scientist",
        backgroundColor: "bg-teal-100",
        textColor: "text-teal-800",
      },
      href: "#",
      imageSrc: "/coach-2.png",
      rating: "5.0",
      students: "180.2k",
      price: "$49",
    },
    {
      id: 8,
      name: "Cameron Williamson",
      jobProfile: {
        title: "DevOps Engineer",
        backgroundColor: "bg-orange-100",
        textColor: "text-orange-800",
      },
      href: "#",
      imageSrc: "/coach-3.png",
      rating: "4.7",
      students: "210.4k",
      price: "$49",
    },
    {
      id: 9,
      name: "Courtney Henry",
      jobProfile: {
        title: "Cybersecurity Specialist",
        backgroundColor: "bg-indigo-100",
        textColor: "text-indigo-800",
      },
      href: "#",
      imageSrc: "/coach-4.png",
      rating: "4.8",
      students: "170.8k",
      price: "$49",
    },
    {
      id: 10,
      name: "Brooklyn Simmons",
      jobProfile: {
        title: "Cloud Architect",
        backgroundColor: "bg-gray-100",
        textColor: "text-gray-800",
      },
      href: "#",
      imageSrc: "/coach-5.png",
      rating: "4.9",
      students: "140.5k",
      price: "$49",
    },
    {
      id: 11,
      name: "Darlene Robertson",
      jobProfile: {
        title: "Machine Learning Engineer",
        backgroundColor: "bg-cyan-100",
        textColor: "text-cyan-800",
      },
      href: "#",
      imageSrc: "/coach-6.png",
      rating: "4.8",
      students: "195.2k",
      price: "$59",
    },
    {
      id: 12,
      name: "Ronald Richards",
      jobProfile: {
        title: "AI Researcher",
        backgroundColor: "bg-pink-100",
        textColor: "text-pink-800",
      },
      href: "#",
      imageSrc: "/coach-7.png",
      rating: "5.0",
      students: "175.3k",
      price: "$69",
    },
    {
      id: 13,
      name: "Jerome Bell",
      jobProfile: {
        title: "Backend Developer",
        backgroundColor: "bg-lime-100",
        textColor: "text-lime-800",
      },
      href: "#",
      imageSrc: "/coach-8.png",
      rating: "4.9",
      students: "220.6k",
      price: "$49",
    },
    {
      id: 14,
      name: "Kathryn Murphy",
      jobProfile: {
        title: "Software Architect",
        backgroundColor: "bg-amber-100",
        textColor: "text-amber-800",
      },
      href: "#",
      imageSrc: "/coach-1.png",
      rating: "5.0",
      students: "160.8k",
      price: "$89",
    },
    {
      id: 15,
      name: "Annette Black",
      jobProfile: {
        title: "Database Administrator",
        backgroundColor: "bg-emerald-100",
        textColor: "text-emerald-800",
      },
      href: "#",
      imageSrc: "/coach-2.png",
      rating: "4.8",
      students: "210.2k",
      price: "$49",
    },
    {
      id: 16,
      name: "Jacob Jones",
      jobProfile: {
        title: "Network Engineer",
        backgroundColor: "bg-violet-100",
        textColor: "text-violet-800",
      },
      href: "#",
      imageSrc: "/coach-3.png",
      rating: "5.0",
      students: "140.9k",
      price: "$59",
    },
    {
      id: 17,
      name: "Arlene McCoy",
      jobProfile: {
        title: "System Administrator",
        backgroundColor: "bg-rose-100",
        textColor: "text-rose-800",
      },
      href: "#",
      imageSrc: "/coach-4.png",
      rating: "4.7",
      students: "180.3k",
      price: "$49",
    },
    {
      id: 18,
      name: "Esther Howard",
      jobProfile: {
        title: "Cloud Engineer",
        backgroundColor: "bg-fuchsia-100",
        textColor: "text-fuchsia-800",
      },
      href: "#",
      imageSrc: "/coach-5.png",
      rating: "4.9",
      students: "150.7k",
      price: "$69",
    },
    {
      id: 19,
      name: "Guy Hawkins",
      jobProfile: {
        title: "Blockchain Developer",
        backgroundColor: "bg-red-100",
        textColor: "text-red-800",
      },
      href: "#",
      imageSrc: "/coach-6.png",
      rating: "5.0",
      students: "130.5k",
      price: "$79",
    },
    {
      id: 20,
      name: "Eleanor Pena",
      jobProfile: {
        title: "Cybersecurity Analyst",
        backgroundColor: "bg-blue-100",
        textColor: "text-blue-800",
      },
      href: "#",
      imageSrc: "/coach-7.png",
      rating: "4.8",
      students: "165.4k",
      price: "$49",
    },
    {
      id: 21,
      name: "Guy Hawkins",
      jobProfile: {
        title: "Next.js Developer",
        backgroundColor: "bg-red-100",
        textColor: "text-red-800",
      },
      href: "#",
      imageSrc: "/coach-6.png",
      rating: "5.0",
      students: "130.5k",
      price: "$79",
    },
    {
      id: 20,
      name: "Eleanor Pena",
      jobProfile: {
        title: "UX/UI",
        backgroundColor: "bg-blue-100",
        textColor: "text-blue-800",
      },
      href: "#",
      imageSrc: "/coach-7.png",
      rating: "4.8",
      students: "165.4k",
      price: "$49",
    },
  ];

  const handleGetBookings = async () => {
    const { accessToken } = await GetTokens()
    if (!accessToken || !accessToken.value) {
      return router.push('/login?redirect=/user-dashboard')
    }
    try {
      const response = await axios.get('/api/getUserBookings', {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        }
      })
      if (response.status === 200) {
        setBookings(response.data.bookings)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetBookings()
  }, [])

  return (
    <>
      <div className="mt-20 bg-[#E0F2FF] h-40 w-full flex justify-center "></div>
      <div className="max-w-5xl mx-auto">
        <div className="profile_header">
          <div className='sm:container md:container lg:container xl:container 2xl:container bg-[#FFF] h-auto -mt-20 w-full flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-between items-center border border-[#FFDDD1] p-4'>
            {/* Left Side */}
            <div
              id='blog_header_left_side'
              className='flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4'>
              <div id='coach_image' className='px-4'>
                <img
                  src={userdata?.profilePicture || "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"}
                  alt='Coach'
                  className='w-full  object-cover w-44 h-44 rounded-full'
                />
              </div>
              <div id='coach_details' className='pt-4 sm:pt-10'>
                <div
                  id='row1'
                  className='flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pb-3'>
                  <h1 className='font-bold text-[#1D2026] text-2xl sm:text-3xl'>
                    {userdata?.fullname}
                  </h1>
                </div>
                {/* <div
                  id='row3'
                  className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500'>
                  <div className='flex items-center space-x-1'>
                    <img
                      src='/Star.png'
                      alt='Star'
                      className='w-3 sm:w-4 h-3 sm:h-4'
                    />
                    <span className='text-[#1D2026] font-bold'>4.8</span>
                    <span className='text-[#6E7485]'>(134,633 reviews)</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <img
                      src='/Users.png'
                      alt='Users'
                      className='w-3 sm:w-4 h-3 sm:h-4'
                    />
                    <span className='text-[#1D2026] font-bold'>430,117</span>
                    <span className='text-[#6E7485]'>students</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <img
                      src='/PlayCircle.png'
                      alt='Play Circle'
                      className='w-3 sm:w-4 h-3 sm:h-4'
                    />
                    <span className='text-[#1D2026] font-bold'>7</span>
                    <span className='text-[#6E7485]'>courses</span>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Right Side */}
            <div
              id='blog_header_right_side'
              className='text-left sm:text-left md:text-right lg:text-right xl:text-right 2xl:text-right space-y-2 mt-4 sm:mt-0'>
              <div
                id='website_link'
                className='text-xs sm:text-sm text-blue-500 underline flex items-center justify-center sm:justify-center md:justify-end lg:justify-end xl:justify-end 2xl:justify-end  space-x-1'>
                <img
                  src='/GlobeSimple.png'
                  alt='Globe Icon'
                  className='w-3 sm:w-4 h-3 sm:h-4'
                />
                <span className='text-[10px] sm:text-[12px] text-[#564FFD]'>
                  http://www.com
                </span>
              </div>
              <div id='socialMediaIcons' className='flex space-x-2 justify-end'>
                <img
                  src='/facebook_icon.png'
                  alt='Facebook'
                  className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto'
                />
                <img
                  src='/twitter_icon.png'
                  alt='Twitter'
                  className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto'
                />
                <img
                  src='/instagram_icon.png'
                  alt='Instagram'
                  className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto'
                />
                <img
                  src='/youtube_icon.png'
                  alt='YouTube'
                  className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto'
                />
                <img
                  src='/whatsApp_icon.png'
                  alt='WhatsApp'
                  className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto xl:w-auto xl:h-auto 2xl:w-auto 2xl:h-auto'
                />
              </div>
            </div>
          </div>
        </div>
        <div className="tabs_section mt-10">
          <Tabs className="w-full py-5" defaultValue="dashboard">
            <TabsList className="mb-4 flex w-full justify-center flex-wrap h-auto">
              <TabsTrigger
                value="dashboard"
                className={`tabs-trigger text-blue-950 rounded-md text-base ${activeTab === "dashboard" ? "active" : ""
                  } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="Bookings"
                className={`tabs-trigger text-blue-950 rounded-md text-base ${activeTab === "Bookings" ? "active" : ""
                  } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("Bookings")}
              >
                Bookings
              </TabsTrigger>
              <TabsTrigger
                value="coaching"
                className={`tabs-trigger text-blue-950 rounded-md text-base ${activeTab === "coaching" ? "active" : ""
                  } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("coaching")}
              >
                Coaching
              </TabsTrigger>
              <TabsTrigger
                value="whishlist"
                className={`tabs-trigger text-blue-950 rounded-md text-base ${activeTab === "whishlist" ? "active" : ""
                  } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("whishlist")}
              >
                Whishlist
              </TabsTrigger>
              <TabsTrigger
                value="purchaseHistory"
                className={`tabs-trigger text-blue-950 rounded-md text-base ${activeTab === "purchaseHistory" ? "active" : ""
                  } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("purchaseHistory")}
              >
                Purchase History
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className={`tabs-trigger text-blue-950 rounded-md text-base ${activeTab === "settings" ? "active" : ""
                  } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="mb-4">
              <div className="actions_section max-w-full md:max-w-5xl mx-auto">
                <div>
                  <h2 className="text-xl font-bold mb-6 text-blue-950 lg:text-start text-center">
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
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent className="mb-6" value="Bookings">
              <div className="career_section max-w-full md:max-w-5xl mx-auto">
                <div className="space-y-3">
                  <h2 className="lg:text-start text-center text-xl font-bold text-blue-950">
                    Bookings
                  </h2>
                  <div className="coach_section">
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {bookings.length > 0 && bookings.map((booking) => (
                          <Card key={booking._id} className="w-full">
                            <CardHeader>
                              <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                                <Avatar className="w-12 h-12 mb-2 sm:mb-0">
                                  <AvatarImage src={booking.coachId.profileImage} alt={booking.coachId.name} className="object-cover" />
                                  <AvatarFallback>{booking.coachId.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-base sm:text-lg font-semibold">{booking.coachId.name}</h3>
                                  <p className="text-xs sm:text-sm text-gray-500">{booking.slotTime.startTime} - {booking.slotTime.endTime}</p>
                                  <p className="text-xs sm:text-sm text-gray-500">{format(new Date(booking.date), 'MMM dd, yyyy')}</p>
                                  <p className="text-xs sm:text-sm text-gray-500">{booking.timezone}</p>
                                </div>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <Mail className="mr-2 h-4 w-4 flex-shrink-0" />
                                  <span className="text-xs sm:text-sm truncate">{booking.coachId.email}</span>
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="mr-2 h-4 w-4 flex-shrink-0" />
                                  <span className="text-xs sm:text-sm">{booking.coachId.ratesPerHour.charges}/hour</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent className="mb-6" value="coaching">
              <div className="career_section max-w-full md:max-w-5xl mx-auto">
                <div className="space-y-3">
                  <h2 className="lg:text-start text-center text-xl font-bold text-blue-950">
                    My Coaches
                  </h2>
                  <div className="coach_section">
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {coaches.slice(0, 4).map((item, index) => (
                          <div
                            key={item.id}
                            className="group relative bg-white cursor-pointer"
                          >
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                              <img
                                alt={item.imageAlt}
                                src={item.imageSrc}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                              />
                            </div>
                            <div className="coaching_name text-center mt-2">
                              <h3 className="text-sm text-gray-700">
                                {item.name}
                              </h3>
                              <p className="text-[12px] text-gray-700">
                                {item?.jobProfile?.title}
                              </p>
                            </div>
                            <div className="mt-4 p-5 flex justify-between border-t border-gray-200">
                              <div className="flex items-center gap-2">
                                <FaStar className="text-orange-500" />
                                <p className="text-sm text-gray-700">
                                  {item.rating}
                                </p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                {item.students}{" "}
                                <span className="text-gray-500 ml-1 text-sm">
                                  students
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent className="mb-6" value="whishlist">
              <div className="max-w-full md:max-w-5xl mx-auto summary_section">
                <div>
                  <Whishlist />
                </div>
              </div>
            </TabsContent>
            <TabsContent className="mb-6" value="purchaseHistory">
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
            </TabsContent>
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
