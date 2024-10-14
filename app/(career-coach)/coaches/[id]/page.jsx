/** @format */

"use client";
import React, { useEffect, useState } from "react";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { ResumeHeader } from "@/app/Layout/ResumeHeader";
import { CoachHeader } from "@/components/component/CoachHeader";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
/******************************************** */
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useCoachesDetailStore from "@/app/store/coachDetailStore";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import timeSlots from "@/constants/TimeSlots";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { GetTokens } from "@/app/actions";
import { ChevronRight } from "lucide-react";
import { ImSpinner3 } from "react-icons/im";
import { Skeleton } from "@/components/ui/skeleton";
import ReactPlayer from "react-player";
import CoachSkeltonCard from "@/components/component/CoachSkeltonCard";
import { CiHeart } from "react-icons/ci";
import {
  FaCertificate,
  FaCode,
  FaDownload,
  FaNewspaper,
  FaVideo,
} from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaPlayCircle, FaFileAlt, FaTrophy } from "react-icons/fa";
/************************************************ */

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const courseDetails = [
  {
    icon: <FaVideo className='text-blue-500' />,
    text: "65 hours on-demand videos",
  },
  {
    icon: <FaDownload className='text-green-500' />,
    text: "49 downloadable resources",
  },
  {
    icon: <FaMobileAlt className='text-purple-500' />,
    text: "Access on mobile and TV",
  },
  { icon: <FaNewspaper className='text-yellow-500' />, text: "89 articles" },
  { icon: <FaCode className='text-red-500' />, text: "8 coding exercises" },
  {
    icon: <FaCertificate className='text-teal-500' />,
    text: "Certificate of completion",
  },
];

const courseWeeks = [
  {
    week: "Week 1",
    level: "Beginner",
    title: "Introduction to UX Designing",
    lessons: [
      {
        title: "How to Download the Course Resources",
        duration: "02:43",
        icon: <FaDownload className='text-blue-500' />,
      },
      {
        title: "HTML Heading Elements",
        duration: "14:24",
        icon: <FaFileAlt className='text-purple-500' />,
      },
      {
        title: "HTML Paragraph Elements",
        duration: "08:40",
        icon: <FaFileAlt className='text-purple-500' />,
      },
      {
        title: "Self Closing Tags",
        duration: "11:40",
        icon: <FaFileAlt className='text-purple-500' />,
      },
      {
        title: "[Project] Movie Ranking",
        duration: "05:43",
        icon: <FaTrophy className='text-red-500' />,
      },
      {
        title: "How to Ace this Course",
        duration: "",
        icon: <FaPlayCircle className='text-green-500' />,
      },
    ],
  },
  {
    week: "Week 2",
    level: "Beginner",
    title: "Introduction to HTML and CSS",
    lessons: [
      {
        title: "Basic HTML Structure",
        duration: "10:20",
        icon: <FaFileAlt className='text-purple-500' />,
      },
      {
        title: "CSS Basics and Selectors",
        duration: "15:50",
        icon: <FaFileAlt className='text-purple-500' />,
      },
      {
        title: "[Project] Personal Portfolio Page",
        duration: "08:30",
        icon: <FaTrophy className='text-red-500' />,
      },
      {
        title: "Responsive Design",
        duration: "09:55",
        icon: <FaPlayCircle className='text-green-500' />,
      },
    ],
  },
  {
    week: "Week 3",
    level: "Intermediate",
    title: "Advanced HTML and CSS",
    lessons: [
      {
        title: "Semantic HTML",
        duration: "12:00",
        icon: <FaFileAlt className='text-purple-500' />,
      },
      {
        title: "CSS Grid and Flexbox",
        duration: "18:40",
        icon: <FaFileAlt className='text-purple-500' />,
      },
      {
        title: "[Project] Responsive Web Layout",
        duration: "20:00",
        icon: <FaTrophy className='text-red-500' />,
      },
      {
        title: "Media Queries and Breakpoints",
        duration: "11:30",
        icon: <FaPlayCircle className='text-green-500' />,
      },
    ],
  },
  {
    week: "Week 4",
    level: "Intermediate",
    title: "JavaScript Basics",
    lessons: [
      {
        title: "Introduction to JavaScript",
        duration: "14:00",
        icon: <FaFileAlt className='text-purple-500' />,
      },
      {
        title: "Variables and Data Types",
        duration: "12:30",
        icon: <FaFileAlt className='text-purple-500' />,
      },
      {
        title: "Functions and Scope",
        duration: "17:00",
        icon: <FaFileAlt className='text-purple-500' />,
      },
      {
        title: "[Project] Interactive To-Do List",
        duration: "13:45",
        icon: <FaTrophy className='text-red-500' />,
      },
      {
        title: "JavaScript in Web Development",
        duration: "10:15",
        icon: <FaPlayCircle className='text-green-500' />,
      },
    ],
  },
  {
    week: "Week 5",
    level: "Advanced",
    title: "JavaScript DOM Manipulation",
    lessons: [
      {
        title: "The Document Object Model (DOM)",
        duration: "13:30",
        icon: <FaFileAlt className='text-purple-500' />,
      },
      {
        title: "Selecting and Manipulating Elements",
        duration: "18:15",
        icon: <FaFileAlt className='text-purple-500' />,
      },
      {
        title: "[Project] Dynamic Content Creation",
        duration: "15:00",
        icon: <FaTrophy className='text-red-500' />,
      },
      {
        title: "Event Handling and Listeners",
        duration: "12:45",
        icon: <FaPlayCircle className='text-green-500' />,
      },
    ],
  },
  {
    week: "Week 6",
    level: "Advanced",
    title: "UX Design Principles and Best Practices",
    lessons: [
      {
        title: "User-Centered Design",
        duration: "09:50",
        icon: <FaFileAlt className='text-purple-500' />,
      },
      {
        title: "Wireframing and Prototyping",
        duration: "16:40",
        icon: <FaFileAlt className='text-purple-500' />,
      },
      {
        title: "[Project] Design a User Interface",
        duration: "19:00",
        icon: <FaTrophy className='text-red-500' />,
      },
      {
        title: "Designing for Accessibility",
        duration: "11:15",
        icon: <FaPlayCircle className='text-green-500' />,
      },
    ],
  },
];

const CoachDetailsPage = () => {
  /************************ */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { singleCoach, filterCoachById, updateSingleCoach, isLoading } =
    useCoachesDetailStore();

  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("programs");
  const [activeProgramTab, setActiveProgramTab] = useState("program1");
  const [date, setDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDaySlots, setSelectedDaySlots] = useState(null);
  const [modalSelectedSlot, setModalSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState({
    date: new Date(),
    dayOfWeek: "",
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [geoData, setGeoData] = useState(null);
  const [isBookingSlot, setIsBookingSlot] = useState(false);
  const handleTabClick = async (tab) => {
    const { accessToken } = await GetTokens();
    if (tab === "appointment") {
      if (!accessToken || !accessToken.value) {
        return router.push(`/login?redirect=/coaches/${id}`);
      }
    }
    setActiveTab(tab);
  };

  // Function to handle program tab click
  const handleProgramTabClick = (tab) => {
    setActiveProgramTab(tab);
  };

  const handleSlotClick = (slot) => {
    setModalSelectedSlot({ slot, selectedDate });
    setIsDialogOpen(true); // Open the dialog
  };

  const disablePastDates = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure we compare only the date, not time
    return day < today; // Disable all days before today
  };

  const getDayOfWeek = (date) => {
    // Get the day of the week from the date object
    const options = { weekday: "long" }; // Use 'short' for abbreviated names
    return date.toLocaleDateString("en-US", options);
  };

  // Function to get the day of the month
  const getDayOfMonth = (date) => {
    return date.getDate();
  };

  // Check if a specific day is available based on the provided data
  const isDayAvailable = (dayOfWeek) => {
    const availableDay = singleCoach?.availability?.dates?.find(
      (day) => day.dayOfWeek === dayOfWeek
    );
    return availableDay ? availableDay.isAvailable : false;
  };

  // Function to handle date selection and fetch available slots
  const handleDateSelect = (dayOfWeek, date) => {
    setSelectedDate({
      date,
      dayOfWeek,
    });
    const selectedDay = singleCoach?.availability.dates.find(
      (day) => day.dayOfWeek === dayOfWeek
    );
    if (selectedDay?.isAvailable) {
      const newSlots = createOneHourTimeSlotsForRange(selectedDay?.slots);
      setSelectedDaySlots(newSlots);
    } else {
      setSelectedDaySlots(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { day: "numeric", month: "long", year: "numeric" }; // Day, full month, and year
    return date?.toLocaleDateString("en-GB", options); // 'en-GB' for day-first format
  };

  const isSameMonth = (date1, date2) => {
    return (
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
  };

  function createOneHourTimeSlotsForRange(slots) {
    const updatedSlots = [];
    slots.forEach((slot) => {
      const startIndex = timeSlots.indexOf(slot.startTime);
      const endIndex = timeSlots.indexOf(slot.endTime);

      if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
        throw new Error("Invalid start or end time in the slot");
      }

      // Break the current range into 1-hour intervals
      for (let i = startIndex; i < endIndex; i++) {
        updatedSlots.push({
          startTime: timeSlots[i],
          endTime: timeSlots[i + 1],
        });
      }
    });

    return updatedSlots;
  }

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setGeoData(data);
      })
      .catch((error) => {
        console.error("Error fetching geo information:", error);
      });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    reset();
  };

  const handleConfirmSlot = async (data) => {
    const { accessToken } = await GetTokens();
    if (!accessToken || !accessToken.value) {
      return router.push(`/login?redirect=/coaches/${id}`);
    }
    setIsBookingSlot(true);
    const obj = {
      coachId: id,
      timezone: geoData.timezone,
      country: geoData.country_name,
      state: geoData.region,
      city: geoData.city,
      notes: data?.message,
      date: modalSelectedSlot?.selectedDate?.date,
      slotTime: modalSelectedSlot?.slot,
    };
    try {
      const response = await axios.post("/api/confirmSlots", obj, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 201) {
        toast.success("Slot booked successfully");
        handleCloseDialog();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error booking slot");
    } finally {
      setIsBookingSlot(false);
    }
  };

  const handleFetchCoachDetailsById = async (id) => {
    try {
      const response = await axios.get(`/api/getCoachDetails/${id}`);
      if (response.status === 200) {
        updateSingleCoach(response.data.coach);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGeoInfo();
  }, []);

  useEffect(() => {
    handleFetchCoachDetailsById(id);
  }, [id]);

  return (
    <>
      <ResumeHeader />
      <div className='mt-20 bg-[#E0F2FF] h-40 w-full flex justify-center '></div>
      <div className='max-w-7xl mx-auto'>
        <div
          id='Main'
          className='mt-10 bg-white w-full h-auto flex flex-col items-center'>
          <CoachHeader id={singleCoach?._id} />
          <div className='container bg-[#FFF] h-auto mt-10 w-full flex flex-col lg:flex-row mb-20 border border-[#FFDDD1]'>
            <div
              id='blog_left_side'
              className='w-full lg:w-[25%] bg-white h-full relative'>
              {activeTab === "programs" && (
                <>
                  <div className='tabs_content'>
                    <div>
                      <div className='p-5'>
                        <div className='border-b border-[#FFDDD1] p-5'>
                          <h3 className='text-[#1D2026] pb-2 font-semibold text-2xl'>
                            All Programs
                          </h3>
                        </div>
                        <ul className='space-y-2 mt-5'>
                          <li>
                            <button
                              className={`w-full text-left p-2 ${
                                activeProgramTab === "program1"
                                  ? "bg-gray-200 font-bold"
                                  : "text-gray-600"
                              }`}
                              onClick={() => handleProgramTabClick("program1")}>
                              Program 1
                            </button>
                          </li>
                          <li>
                            <button
                              className={`w-full text-left p-2 ${
                                activeProgramTab === "program2"
                                  ? "bg-gray-200 font-bold"
                                  : "text-gray-600"
                              }`}
                              onClick={() => handleProgramTabClick("program2")}>
                              Program 2
                            </button>
                          </li>
                          <li>
                            <button
                              className={`w-full text-left p-2 ${
                                activeProgramTab === "program3"
                                  ? "bg-gray-200 font-bold"
                                  : "text-gray-600"
                              }`}
                              onClick={() => handleProgramTabClick("program3")}>
                              Program 3
                            </button>
                          </li>
                          <li>
                            <button
                              className={`w-full text-left p-2 ${
                                activeProgramTab === "program4"
                                  ? "bg-gray-200 font-bold"
                                  : "text-gray-600"
                              }`}
                              onClick={() => handleProgramTabClick("program4")}>
                              Program 4
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "appointment" && (
                <>
                  <div className='border-b border-[#FFDDD1] p-5'>
                    <h3 className='text-[#1D2026] pb-2 font-semibold text-2xl'>
                      Book Appointment <br />
                      <span className='font-normal'>
                        with {singleCoach?.name}
                      </span>
                    </h3>
                  </div>
                  <div className=' p-5 h-full relative z-50 mb-10'>
                    <h2 className='text-md font-bold  text-[#1D2026]'>
                      Career Development Coaching
                    </h2>
                    <p className='flex items-center pt-5 text-md'>
                      <img src='/careerRightBullet.png' className='mr-2' />1
                      Hour
                    </p>

                    <p className='flex items-center pt-5 text-md'>
                      <img src='/careerRightBullet.png' className='mr-2' />
                      Web Conferencing details provided upon confirmation
                    </p>
                  </div>
                </>
              )}
            </div>

            <div
              id='blog_right_side'
              className='w-full lg:w-[75%] bg-white h-auto p-5 border-l border-[#FFDDD1]'>
              <div
                id='blog_tab_page_head'
                className='flex border-b border-gray-300 mb-5'>
                <div
                  className={`cursor-pointer p-3 ${
                    activeTab === "programs"
                      ? "font-bold border-b-2 border-[#FF6636]"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick("programs")}>
                  Enroll in Program
                </div>
                <div
                  className={`cursor-pointer p-3 ${
                    activeTab === "appointment"
                      ? "font-bold border-b-2 border-[#FF6636]"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick("appointment")}>
                  Book An Appointment
                </div>
              </div>

              {activeTab === "programs" && (
                <>
                  {/* Tab Content */}
                  <div className='p-5'>
                    {activeProgramTab === "program1" && (
                      <div className='tabs_content flex lg:flex-row flex-col'>
                        <div className='program_content_1 lg:w-[60%] w-full'>
                          <h2 className='text-xl font-bold mb-4'>
                            The Complete 2024 Web Development Bootcamp
                          </h2>
                          <p className='text-sm'>
                            Become a Full-Stack Web Developer with just ONE
                            course. HTML, CSS, Javascript, Node, React,
                            PostgreSQL, Web3 and DApps
                          </p>
                          <div className='weekly_content pr-3 mt-5'>
                            <h2 className='text-xl font-bold mb-1'>
                              Course content
                            </h2>
                            <div className='course_content'>
                              <ul className='flex text-xs gap-2'>
                                <li>44 sections</li>
                                <li>• 373 lectures </li>
                                <li>• 61h 44m total length</li>
                              </ul>
                            </div>

                            <Accordion
                              type='single'
                              collapsible
                              defaultValue='item-0'
                              className='w-full my-2 border border-gray-300 p-4 rounded-md'>
                              {courseWeeks.map((weekContent, index) => (
                                <AccordionItem
                                  key={index}
                                  value={`item-${index}`}
                                  className='py-5 border-b border-gray-200'>
                                  <AccordionTrigger>
                                    {weekContent.week} - {weekContent.level} -{" "}
                                    {weekContent.title}
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <ul className='space-y-2 mt-5'>
                                      {weekContent.lessons.map(
                                        (lesson, idx) => (
                                          <li
                                            key={idx}
                                            className='flex items-center space-x-3 py-2'>
                                            {lesson.icon}
                                            <span className='flex-1 text-gray-700'>
                                              {lesson.title}
                                            </span>
                                            {lesson.duration && (
                                              <span className='text-gray-500'>
                                                {lesson.duration}
                                              </span>
                                            )}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </div>
                        </div>
                        <div className='program_content_video lg:w-[40%] w-full lg:order-none order-first'>
                          <div className='border border-[#E9EAF0]'>
                            <div>
                              <img
                                src='/blogImage1.png'
                                alt='Blog'
                                className='w-full'
                              />
                            </div>
                            <div
                              id='row3'
                              className='flex justify-between text-sm text-gray-500 p-3'>
                              <div className='flex items-center space-x-1'>
                                <span className='text-[#1D2026] font-bold'>
                                  $549.00{" "}
                                  <span className='text-gray-400 line-through'>
                                    $3,099
                                  </span>
                                </span>
                              </div>
                              <div className='flex items-center space-x-1'>
                                <span className='text-[#fb8130] font-bold'>
                                  85% off
                                </span>
                              </div>
                            </div>
                            <div
                              id='row3'
                              className='flex justify-between p-3 border-b-2 border-gray-300'>
                              <div className='flex items-center space-x-1'>
                                <Button className='w-[250px]'>Buy Now</Button>
                              </div>
                              <div className='flex items-center space-x-1'>
                                <span className='font-bold shadow-lg p-2'>
                                  <CiHeart />
                                </span>
                              </div>
                            </div>
                            <div className='course-details-list p-5'>
                              <h2 className='text-xl font-semibold mb-4'>
                                Course Details
                              </h2>
                              <ul className='space-y-3'>
                                {courseDetails.map((detail, index) => (
                                  <li
                                    key={index}
                                    className='flex items-center space-x-2'>
                                    {detail.icon}
                                    <span className='text-gray-700'>
                                      {detail.text}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeProgramTab === "program2" && (
                      <div className='tabs_content'>
                        <h2 className='text-lg font-bold mb-4'>Program 2</h2>
                        <p>Details and information about Program 2...</p>
                      </div>
                    )}
                    {activeProgramTab === "program3" && (
                      <div className='tabs_content'>
                        <h2 className='text-lg font-bold mb-4'>Program 3</h2>
                        <p>Details and information about Program 3...</p>
                      </div>
                    )}
                    {activeProgramTab === "program4" && (
                      <div className='tabs_content'>
                        <h2 className='text-lg font-bold mb-4'>Program 4</h2>
                        <p>Details and information about Program 4...</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeTab === "appointment" && (
                <>
                  <div>
                    <div
                      id='book_an_appointment_tab'
                      className='flex gap-10 items-baseline justify-around'>
                      <div id='showCalender'>
                        <Calendar
                          mode='single'
                          selected={date}
                          onSelect={handleDateSelect}
                          onMonthChange={handleMonthChange}
                          className='shadow-lg'
                          weekStartsOn={1}
                          showOutsideDays={false}
                          components={{
                            Day: ({ date }) => {
                              const dayOfWeek = getDayOfWeek(date);
                              const dayOfMonth = getDayOfMonth(date);
                              const isAvailable = isDayAvailable(dayOfWeek);
                              const isDisabled = disablePastDates(date);
                              const isInCurrentMonth = isSameMonth(
                                date,
                                currentMonth
                              );

                              const handleDayClick = () => {
                                if (!isDisabled) {
                                  handleDateSelect(dayOfWeek, date);
                                }
                              };

                              const dayClasses = isDisabled
                                ? "text-gray-400 cursor-not-allowed bg-transparent"
                                : "text-gray-800 cursor-pointer bg-gray-100 rounded-full";
                              return isInCurrentMonth ? (
                                <Button
                                  className={`w-9 h-9 p-2 rounded-md ${dayClasses}`}
                                  title={dayOfWeek}
                                  onClick={handleDayClick}>
                                  <span className='flex flex-col items-center justify-center'>
                                    <span className='text-sm '>
                                      {dayOfMonth}
                                    </span>

                                    {isAvailable && !isDisabled && (
                                      <span className='inline-block w-1 h-1 rounded-full bg-blue-500 mt-1' />
                                    )}
                                  </span>
                                </Button>
                              ) : null;
                            },
                          }}
                        />
                      </div>
                      {selectedDate.date && (
                        <div>
                          {selectedDaySlots ? (
                            <div className='selected-date-info'>
                              <p className='text-gray-500 font-medium text-sm my-2'>
                                {selectedDate?.dayOfWeek},
                                {formatDate(selectedDate?.date)}
                              </p>
                              <p className='text-gray-600 font-medium text-sm my-2'>
                                TimeZone: {singleCoach?.availability?.timeZone}
                              </p>
                              <div>
                                {selectedDaySlots.map((slot, index) => (
                                  <p
                                    key={index}
                                    onClick={() => handleSlotClick(slot)}
                                    className='text-sm bg-blue-950 text-white py-2 px-5 text-center  rounded-md font-medium my-2 cursor-pointer'>
                                    {slot.startTime}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h4 className='text-black font-bold text-base'>
                                No Slots available
                              </h4>
                              <p className='text-gray-500 font-medium text-sm my-2'>
                                {formatDate(selectedDate?.date)},
                                {selectedDate?.dayOfWeek}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      <Dialog open={isDialogOpen}>
                        <DialogContent
                          onClick={handleCloseDialog}
                          showCloseButton>
                          <DialogHeader>
                            <DialogTitle>Confirm Slot</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleSubmit(handleConfirmSlot)}>
                            <div className='space-y-2'>
                              <p className='text-gray-500 font-medium text-sm'>
                                {modalSelectedSlot?.selectedDate?.dayOfWeek},{" "}
                                {formatDate(
                                  modalSelectedSlot?.selectedDate?.date
                                )}
                              </p>

                              <div className='slots_available flex flex-wrap'>
                                <p className='text-sm bg-blue-950 text-white py-2 px-5 text-center rounded-md font-medium my-2'>
                                  {modalSelectedSlot?.slot?.startTime} -{" "}
                                  {modalSelectedSlot?.slot?.endTime}
                                </p>
                              </div>

                              <Textarea
                                {...register("message", {
                                  required: "Message is required",
                                })} // Registering the input with validation
                                placeholder='Type your message here.'
                                className='w-full'
                              />
                              {errors.message && (
                                <p className='text-red-500 text-sm'>
                                  {errors.message.message}
                                </p>
                              )}

                              <div className='confrm_button flex justify-end mt-4'>
                                <Button
                                  type='submit'
                                  disabled={isBookingSlot}
                                  className='flex justify-center items-center'>
                                  {isBookingSlot ? (
                                    <>
                                      Booking Slot{" "}
                                      <ImSpinner3 className='animate-spin ml-2 h-4 w-4' />
                                    </>
                                  ) : (
                                    <>
                                      Book Slot
                                      <ChevronRight className='ml-2 h-4 w-4' />
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachDetailsPage;
