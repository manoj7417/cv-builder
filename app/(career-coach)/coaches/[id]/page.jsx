/** @format */
"use client";
import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ResumeHeader } from "@/app/Layout/ResumeHeader";
import { CoachHeader } from "@/components/component/CoachHeader";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
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
import { ChevronRight, X } from "lucide-react";
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
import Link from "next/link";
import {
  FaUserGraduate,
  FaInfoCircle,
  FaEnvelope,
  FaStar,
  FaChalkboardTeacher,
} from "react-icons/fa";
import dayjs from "dayjs";

/************************************************ */
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const CoachDetailsPage = () => {
  /************************ */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { singleCoach, filterCoachById, updateSingleCoach } =
    useCoachesDetailStore();

  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("about");
  const [isLoading, setIsLoading] = useState(true);
  const [activeProgramTab, setActiveProgramTab] = useState("program1");
  const [date, setDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDaySlots, setSelectedDaySlots] = useState(null);
  const [modalSelectedSlot, setModalSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    dayOfWeek: "",
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [geoData, setGeoData] = useState(null);
  const [isBookingSlot, setIsBookingSlot] = useState(false);
  const [programData, setProgramData] = useState([]);
  const [purchasedPrograms, setPurchasedPrograms] = useState({});
  const [videoUrl, setVideoUrl] = useState("");
  const [programAlreadyPurchased, setProgramAlreadyPurchased] = useState(false);

  const checkCoursePurchased = async (programId) => {
    const { accessToken } = await GetTokens();
    if (!accessToken || !accessToken.value) {
      return router.push(`/login?redirect=/coaches/${id}`);
    }
    try {
      const response = await axios.post(
        "/api/programStatus",
        { programId },
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );

      if (response.data.purchased) {
        setPurchasedPrograms((prevState) => ({
          ...prevState,
          [programId]: true, // Set purchased status for the specific program
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    console.log(dayOfWeek, date)
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
    // setIsBookingSlot(true);
    const obj = {
      coachId: id,
      timezone: geoData.timezone,
      country: geoData.country_name,
      state: geoData.region,
      city: geoData.city,
      notes: data?.message,
      date: selectedDate?.date,
      slotTime: modalSelectedSlot?.slot,
      success_url: window.location.href,
      cancel_url: window.location.href,
      currency: "USD",
      amount: 1
    };
    try {
      const response = await axios.post("/api/bookSlot", obj, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        window.location.href = response.data.url
        handleCloseDialog();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error booking slot");
    } finally {
      setIsBookingSlot(false);
    }
  };

  //function for total time
  const totalTime = programData?.map((item) =>
    item?.days?.reduce((total, day) => total + day.timeToComplete, 0)
  );
  const totalTimeInHours = (totalTime / 60).toFixed(1);

  const courseDetails = [
    {
      icon: <FaVideo className="text-blue-500" />,
      text: `${totalTimeInHours} hours on-demand videos`,
    },
    {
      icon: <FaMobileAlt className="text-purple-500" />,
      text: "Access on mobile and TV",
    },
  ];

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

  const handleFetchCoachProgramById = async (id) => {
    try {
      const response = await axios.get(`/api/getCoachProgram/${id}`);
      setProgramData(response?.data?.programs);
      setIsLoading(false);

      if (response?.data?.programs.length > 0) {
        // Set the first program as the default active tab
        setActiveProgramTab(response?.data?.programs[0]._id);

        // Check if each program is purchased
        response?.data?.programs.forEach((program) =>
          checkCoursePurchased(program._id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalTimeInHours = (program) => {
    if (!program || !program.days) return 0;

    const totalTimeInMinutes = program.days.reduce((total, day) => {
      return total + (day.timeToComplete || 0); // Add time for each day
    }, 0);

    return (totalTimeInMinutes / 60).toFixed(1); // Convert minutes to hours and format it
  };

  const showVideo = (video) => {
    setVideoUrl(video);
  };

  const handleBuyProgram = async (course) => {
    const { accessToken } = await GetTokens();
    if (!accessToken || !accessToken.value) {
      return router.push(`/login?redirect=/coaches/${id}`);
    }
    try {
      const response = await axios.post(
        "/api/buyprogram",
        {
          programId: course._id,
          coachId: course.coachId,
          amount: course.amount,
          currency: "USD",
          success_url: window.location.href,
          cancel_url: window.location.href,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken?.value}`,
          },
        }
      );

      // Open the received URL
      window.location.href = response.data.url; // Redirect to the URL
    } catch (error) {
      console.log(error);
      toast.error("Error buying program");
    }
  };

  useEffect(() => {
    getGeoInfo();
  }, []);

  useEffect(() => {
    handleFetchCoachDetailsById(id);
  }, [id]);

  useEffect(() => {
    handleFetchCoachProgramById(id);
  }, [id]);

  return (
    <>
      {/* {
        isPlayingVideo &&
        <FullScreen handle={handle}>
          <ReactPlayer
            url={singleCoach?.video} />
        </FullScreen>
      } */}
      {videoUrl && (
        <div className="bg-black/75 z-[200] h-screen w-full sticky top-0 ">
          <div className="relative">
            <X
              className="text-white absolute top-5 right-5 h-10 w-10 text-xl  cursor-pointer"
              onClick={() => setVideoUrl("")}
            />
            <div className=" h-screen w-full p-20">
              <ReactPlayer width={"100%"} height={"100%"} url={videoUrl} />
            </div>
          </div>
        </div>
      )}
      <ResumeHeader />
      <div className="mt-20 bg-[#E0F2FF] h-40 w-full flex justify-center "></div>
      <div className="max-w-7xl mx-auto">
        <div
          id="Main"
          className="mt-10 bg-white w-full h-auto flex flex-col items-center"
        >
          <CoachHeader id={singleCoach?._id} />
          <div className="container bg-[#FFF] h-auto mt-10 w-full flex flex-col lg:flex-row mb-20 border border-[#FFDDD1]">
            <div
              id="blog_left_side"
              className="w-full lg:w-[25%] bg-white h-full relative"
            >
              {activeTab === "about" && (
                <>
                  <div className="tabs_content">
                    <div>
                      <div className="p-5">
                        <div className="border-b border-[#FFDDD1] p-3 mb-4">
                          <h3 className="text-[#1D2026] pb-2 font-semibold text-2xl">
                            About
                          </h3>
                        </div>
                        {isLoading ? (
                          <ul className="space-y-2 mt-5">
                            {[1, 2, 3, 4].map((_, index) => (
                              <li key={index}>
                                <div className="w-full h-8 bg-gray-200 animate-pulse rounded"></div>
                              </li>
                            ))}
                          </ul>
                        ) : programData.length > 0 ? (
                          <>
                            <span className="font-bold mt-5">Coach Bio:</span>{" "}
                            <p className=" text-gray-600 text-sm mt-2">
                              {singleCoach?.bio}
                            </p>
                          </>
                        ) : (
                          <div className="mt-5 text-gray-600 text-xl">
                            No data available
                          </div> // Render "No data available" message if programData is empty
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "programs" && (
                <>
                  <div className="tabs_content">
                    <div>
                      <div className="p-5">
                        <div className="border-b border-[#FFDDD1] p-5">
                          <h3 className="text-[#1D2026] pb-2 font-semibold text-2xl">
                            All Programs
                          </h3>
                        </div>
                        {isLoading ? (
                          <ul className="space-y-2 mt-5">
                            {[1, 2, 3, 4].map((_, index) => (
                              <li key={index}>
                                <div className="w-full h-8 bg-gray-200 animate-pulse rounded"></div>
                              </li>
                            ))}
                          </ul>
                        ) : programData.length > 0 ? ( // Check if programData has items
                          <ul className="space-y-2 mt-5">
                            {programData.map((program) => (
                              <li key={program._id}>
                                <button
                                  className={`w-full text-left p-2 ${activeProgramTab === program._id
                                    ? "bg-gray-200 font-bold"
                                    : "text-gray-600"
                                    }`}
                                  onClick={() =>
                                    handleProgramTabClick(program._id)
                                  }
                                >
                                  {program.title}{" "}
                                  {/* Display the program title here */}
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="mt-5 text-gray-600 text-xl">
                            No data available
                          </div> // Render "No data available" message if programData is empty
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "appointment" && (
                <>
                  <div className="border-b border-[#FFDDD1] p-5">
                    <h3 className="text-[#1D2026] pb-2 font-semibold text-2xl">
                      Book Appointment <br />
                      <span className="font-normal">
                        with {singleCoach?.name}
                      </span>
                    </h3>
                  </div>
                  <div className=" p-5 h-full relative z-50 mb-10">
                    <h2 className="text-md font-bold  text-[#1D2026]">
                      Career Development Coaching
                    </h2>
                    <p className="flex items-center pt-5 text-md">
                      <img src="/careerRightBullet.png" className="mr-2" />1
                      Hour
                    </p>

                    <p className="flex items-center pt-5 text-md">
                      <img src="/careerRightBullet.png" className="mr-2" />
                      Web Conferencing details provided upon confirmation
                    </p>
                  </div>
                </>
              )}
            </div>

            <div
              id="blog_right_side"
              className="w-full lg:w-[75%] bg-white h-auto p-5 border-l border-[#FFDDD1]"
            >
              <div
                id="blog_tab_page_head"
                className="flex border-b border-gray-300 mb-5"
              >
                <div
                  className={`cursor-pointer p-3 ${activeTab === "about"
                    ? "font-bold border-b-2 border-[#FF6636]"
                    : "text-gray-500"
                    }`}
                  onClick={() => handleTabClick("about")}
                >
                  About
                </div>
                <div
                  className={`cursor-pointer p-3 ${activeTab === "programs"
                    ? "font-bold border-b-2 border-[#FF6636]"
                    : "text-gray-500"
                    }`}
                  onClick={() => handleTabClick("programs")}
                >
                  Enroll in Program
                </div>
                <div
                  className={`cursor-pointer p-3 ${activeTab === "appointment"
                    ? "font-bold border-b-2 border-[#FF6636]"
                    : "text-gray-500"
                    }`}
                  onClick={() => handleTabClick("appointment")}
                >
                  Book An Appointment
                </div>
              </div>

              {activeTab === "about" && (
                <>
                  {isLoading ? (
                    <div className="p-2">
                      <div className="animate-pulse">
                        <h3 className="bg-gray-200 h-8 w-1/2 rounded mb-2"></h3>
                      </div>
                      <div className="p-5">
                        <ul className="list-disc list-inside space-y-4">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <li key={index} className="flex items-center">
                              <div className="bg-gray-200 rounded-full h-6 w-6 mr-2"></div>
                              <div className="flex-1">
                                <div className="bg-gray-200 h-4 rounded mb-2 w-1/2"></div>
                                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="p-2">
                        <h3 className="text-[#1D2026] pb-2 font-semibold text-2xl">
                          About {singleCoach?.name}
                        </h3>
                      </div>
                      <div className="p-5">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                Detail
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                Information
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2 flex items-center">
                                <FaUserGraduate className="mr-2 text-blue-500" />
                                <span className="font-bold">
                                  Coaching Experience:
                                </span>
                              </td>
                              <td className="px-4 py-2">
                                {singleCoach?.experience} yrs
                              </td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2 flex items-center">
                                <FaInfoCircle className="mr-2 text-green-500" />
                                <span className="font-bold">
                                  Coaching Description:
                                </span>
                              </td>
                              <td className="px-4 py-2">
                                {singleCoach?.coachingDescription}
                              </td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2 flex items-center">
                                <FaEnvelope className="mr-2 text-red-500" />
                                <span className="font-bold">Coach Email:</span>
                              </td>
                              <td className="px-4 py-2">
                                {singleCoach?.email}
                              </td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2 flex items-center">
                                <FaStar className="mr-2 text-yellow-500" />
                                <span className="font-bold">Coach Skills:</span>
                              </td>
                              <td className="px-4 py-2">
                                {singleCoach?.skills}
                              </td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2 flex items-center">
                                <FaChalkboardTeacher className="mr-2 text-purple-500" />
                                <span className="font-bold">
                                  Type of Coaching:
                                </span>
                              </td>
                              <td className="px-4 py-2">
                                {singleCoach?.typeOfCoaching}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </>
              )}

              {activeTab === "programs" && (
                <>
                  {/* Tab Content */}
                  <div className="p-5">
                    {isLoading ? (
                      <>
                        <div className="tabs_content flex lg:flex-row flex-col animate-pulse">
                          {/* Left section skeleton */}
                          <div className="program_content_1 lg:w-[60%] w-full space-y-4">
                            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="weekly_content mt-5">
                              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                              <div className="space-y-3 mt-5">
                                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                              </div>
                            </div>
                          </div>

                          {/* Right section skeleton */}
                          <div className="program_content_video lg:w-[40%] w-full lg:order-none order-first">
                            <div className="h-[200px] bg-gray-200 rounded mb-3"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/2 mb-3"></div>
                            <div className="h-6 bg-gray-200 rounded w-full"></div>
                            <div className="space-y-3 mt-5">
                              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : programData?.length > 0 ? (
                      <>
                        {programData
                          ?.filter(
                            (program) => program._id === activeProgramTab
                          )
                          ?.map((course, courseIndex) => {
                            const totalTimeInHours =
                              calculateTotalTimeInHours(course); // Calculate total time for the selected course

                            // Construct the course details array inside the map function where the total time is available
                            const courseDetails = [
                              {
                                icon: <FaVideo className="text-blue-500" />,
                                text: `${totalTimeInHours} hours on-demand videos`,
                              },
                              {
                                icon: (
                                  <FaMobileAlt className="text-purple-500" />
                                ),
                                text: "Access on mobile and TV",
                              },
                            ];

                            return (
                              <div
                                className="tabs_content flex lg:flex-row flex-col"
                                key={courseIndex}
                              >
                                <div className="program_content_1 lg:w-[60%] w-full">
                                  <h2 className="text-xl font-bold mb-4">
                                    {course?.title}
                                  </h2>
                                  <p className="text-sm">
                                    {course?.description}
                                  </p>
                                  <div className="weekly_content pr-3 mt-5">
                                    <h2 className="text-xl font-bold mb-1">
                                      Course content
                                    </h2>
                                    <div className="course_content">
                                      <ul className="flex text-xs gap-2">
                                        <li>{course.sections} sections</li>
                                        <li>• {course.lectures} lectures</li>
                                        <li>
                                          • {totalTimeInHours} total hours
                                        </li>
                                      </ul>
                                    </div>

                                    <Accordion
                                      type="single"
                                      collapsible
                                      defaultValue="item-0"
                                      className="w-full my-2 border border-gray-300 p-4 rounded-md"
                                    >
                                      {course?.days?.map((item, index) => (
                                        <AccordionItem
                                          key={index}
                                          value={`item-${index}`}
                                          className="py-5 border-b border-gray-200"
                                        >
                                          <AccordionTrigger className="font-bold text-xl">
                                            {item.title}
                                          </AccordionTrigger>
                                          <AccordionContent>
                                            <ul className="space-y-2 mt-5">
                                              {item.subModules.map(
                                                (lesson, idx) => (
                                                  <li
                                                    key={idx}
                                                    className="flex items-center space-x-3 py-2"
                                                  >
                                                    <span className="flex-1 text-gray-700">
                                                      {lesson.title}
                                                    </span>
                                                    {lesson.timeToComplete && (
                                                      <span className="text-gray-500">
                                                        {lesson.timeToComplete}{" "}
                                                        min
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

                                    <div className="requirements">
                                      {course?.prerequisites?.length > 0 && (
                                        <div className="prerequisites">
                                          <h3 className="text-xl font-bold my-4">
                                            Prerequisites
                                          </h3>
                                          <ul>
                                            {course.prerequisites.map(
                                              (prerequisite, idx) => (
                                                <li
                                                  key={prerequisite._id}
                                                  className="text-sm my-2"
                                                >
                                                  <Link
                                                    href={
                                                      prerequisite.attachmentUrl
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline"
                                                  >
                                                    {prerequisite.description} (
                                                    {prerequisite.type})
                                                  </Link>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="program_content_video lg:w-[40%] w-full lg:order-none order-first">
                                  <div className="border border-[#E9EAF0]">
                                    <div>
                                      <img
                                        src={
                                          course?.programImage ||
                                          "/defaultImage.png"
                                        } // Dynamic image here
                                        alt={course?.title || "Program Image"}
                                        className="w-full"
                                      />
                                    </div>
                                    <div
                                      id="row3"
                                      className="flex justify-between text-sm text-gray-500 p-3"
                                    >
                                      <div
                                        className="flex flex-col items-start cursor-pointer"
                                        onClick={() =>
                                          showVideo(course?.programVideo)
                                        }
                                      >
                                        {course?.programVideo ? (
                                          <span className="flex items-center text-blue-700">
                                            Watch program demo{" "}
                                            <FaVideo className="ml-1 text-blue-500" />
                                          </span>
                                        ) : (
                                          <div></div>
                                        )}

                                        <span className="text-[#1D2026] font-bold">
                                          Price: ${course?.amount}
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      id="row3"
                                      className="flex justify-between p-3 border-b-2 border-gray-300"
                                    >
                                      <div className="flex items-center space-x-1 justify-center w-full">
                                        {!purchasedPrograms[course._id] ? (
                                          <Button
                                            className="w-[250px]"
                                            onClick={() =>
                                              handleBuyProgram(course)
                                            }
                                          >
                                            Buy Now
                                          </Button>
                                        ) : (
                                          <div className="text-green-600 font-bold">
                                            Already Purchased
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Course Details */}
                                    <div className="course-details-list p-5">
                                      <h2 className="text-xl font-semibold mb-4">
                                        Course Details
                                      </h2>
                                      <ul className="space-y-3">
                                        {courseDetails.map((detail, index) => (
                                          <li
                                            key={index}
                                            className="flex items-center space-x-2"
                                          >
                                            {detail.icon}
                                            <span className="text-gray-700">
                                              {detail.text}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </>
                    ) : (
                      <div className="mt-5 text-gray-600 text-xl text-center">
                        No programs yet explore more coaches{" "}
                        <a className="font-bold" href="/coaches">
                          View all coaches
                        </a>
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeTab === "appointment" && (
                <>
                  <div>
                    <div
                      id="book_an_appointment_tab"
                      className="flex gap-10 items-baseline justify-around"
                    >
                      <div id="showCalender">
                        <Calendar
                          mode="single"
                          onMonthChange={handleMonthChange}
                          className="shadow-lg"
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
                                const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                if (!isDisabled) {
                                  handleDateSelect(dayOfWeek, formattedDate);
                                }
                              };

                              const dayClasses = isDisabled
                                ? "text-gray-400 cursor-not-allowed bg-transparent"
                                : "text-gray-800 cursor-pointer bg-gray-100 rounded-full";
                              return isInCurrentMonth ? (
                                <Button
                                  className={`w-9 h-9 p-2 rounded-md ${dayClasses}`}
                                  title={dayOfWeek}
                                  onClick={handleDayClick}
                                >
                                  <p className="flex flex-col items-center justify-center relative" >
                                    <span className="text-sm ">
                                      {dayOfMonth}
                                    </span>

                                    {isAvailable && !isDisabled && (
                                      <span className="absolute w-1 h-1 rounded-full bg-blue-500 top-5" />
                                    )}
                                  </p>
                                </Button>
                              ) : null;
                            },
                          }}
                        />
                      </div>
                      {selectedDate.date && (
                        <div>
                          {selectedDaySlots ? (
                            <div className="selected-date-info">
                              <p className="text-gray-500 font-medium text-sm my-2">
                                {selectedDate?.dayOfWeek},
                                {selectedDate?.date}
                              </p>
                              <p className="text-gray-600 font-medium text-sm my-2">
                                TimeZone: {singleCoach?.availability?.timeZone}
                              </p>
                              <div>
                                {selectedDaySlots.map((slot, index) => (
                                  <p
                                    key={index}
                                    onClick={() => handleSlotClick(slot)}
                                    className="text-sm bg-blue-950 text-white py-2 px-5 text-center  rounded-md font-medium my-2 cursor-pointer"
                                  >
                                    {slot.startTime}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h4 className="text-black font-bold text-base">
                                No Slots available
                              </h4>
                              <p className="text-gray-500 font-medium text-sm my-2">
                                {selectedDate?.date},
                                {selectedDate?.dayOfWeek}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      <Dialog open={isDialogOpen}>
                        <DialogContent
                          onClick={handleCloseDialog}
                          showCloseButton
                        >
                          <DialogHeader>
                            <DialogTitle>Confirm Slot</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleSubmit(handleConfirmSlot)}>
                            <div className="space-y-2">
                              <p className="text-gray-500 font-medium text-sm">
                                {modalSelectedSlot?.selectedDate?.dayOfWeek},{" "}
                                {
                                  modalSelectedSlot?.selectedDate?.date
                                }
                              </p>

                              <div className="slots_available flex flex-wrap">
                                <p className="text-sm bg-blue-950 text-white py-2 px-5 text-center rounded-md font-medium my-2">
                                  {modalSelectedSlot?.slot?.startTime} -{" "}
                                  {modalSelectedSlot?.slot?.endTime}
                                </p>
                              </div>

                              <Textarea
                                {...register("message", {
                                  required: "Message is required",
                                })} // Registering the input with validation
                                placeholder="Type your message here."
                                className="w-full"
                              />
                              {errors.message && (
                                <p className="text-red-500 text-sm">
                                  {errors.message.message}
                                </p>
                              )}

                              <div className="confrm_button flex justify-end mt-4">
                                <Button
                                  type="submit"
                                  disabled={isBookingSlot}
                                  className="flex justify-center items-center"
                                >
                                  {isBookingSlot ? (
                                    <>
                                      Booking Slot{" "}
                                      <ImSpinner3 className="animate-spin ml-2 h-4 w-4" />
                                    </>
                                  ) : (
                                    <>
                                      Book Slot
                                      <ChevronRight className="ml-2 h-4 w-4" />
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
