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

const UserBookingSlot = () => {
  /************************ */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [singleCoach, setSingleCoach] = useState(null);
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("about");
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
  const [coachBookings, setCoachBookings] = useState([]);

  const checkCoursePurchased = async (programId) => {
    const { accessToken } = await GetTokens();
    if (!accessToken || !accessToken.value) {
      return;
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
          [programId]: true,
        }));
      }
    } catch (error) {}
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
      const newSlots = createOneHourTimeSlotsForRange(
        selectedDay?.slots,
        coachBookings,
        date
      );
      setSelectedDaySlots(newSlots);
    } else {
      setSelectedDaySlots(null);
    }
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

  function createOneHourTimeSlotsForRange(slots, coachBookings, date) {
    const updatedSlots = [];
    const selectedDateBookings = coachBookings.filter(
      (booking) => dayjs(booking.date).format("YYYY-MM-DD") === date
    );

    slots.forEach((slot) => {
      const startIndex = timeSlots.indexOf(slot.startTime);
      const endIndex = timeSlots.indexOf(slot.endTime);

      if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
        throw new Error("Invalid start or end time in the slot");
      }

      // Break the current range into 1-hour intervals
      for (let i = startIndex; i < endIndex; i++) {
        const newSlot = {
          startTime: timeSlots[i],
          endTime: timeSlots[i + 1],
        };

        const isBooked = selectedDateBookings.some(
          (booking) =>
            booking.slotTime.startTime === newSlot.startTime &&
            booking.slotTime.endTime === newSlot.endTime
        );

        if (!isBooked) {
          updatedSlots.push(newSlot);
        }
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
      date: selectedDate?.date,
      slotTime: modalSelectedSlot?.slot,
      success_url: `${window.location.origin}/user-dashboard`,
      cancel_url: window.location.href,
      currency: "USD",
      amount: singleCoach?.ratesPerHour?.charges,
    };
    try {
      const response = await axios.post("/api/bookSlot", obj, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        window.location.href = response.data.url;
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



  const handleFetchCoachDetailsById = async (id) => {
    try {
      const response = await axios.get(`/api/getCoachDetails/${id}`);
      if (response.status === 200) {
        setCoachBookings(response.data.coach.bookings);
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
        setActiveProgramTab(response?.data?.programs[0]._id);

        response?.data?.programs.forEach((program) =>
          checkCoursePurchased(program._id)
        );
      }
    } catch (error) {}
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

  const fetchCoachDetails = async () => {
    try {
      const response = await axios.get(`/api/getAllCoaches`);
      const data = response.data;
      const coach = data.coaches.find((coach) => coach._id === id); // Find the specific coach by ID
      if (coach) {
        setSingleCoach(coach); // Set the single coach data if found
      } else {
        toast.error("Coach not found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching coach details");
    }
  };

  useEffect(() => {
    fetchCoachDetails(); // Fetch coach details on component mount
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div
          id="Main"
          className="mt-10 bg-white w-full h-auto flex flex-col items-center"
        >
          <div className="container bg-[#FFF] h-auto mt-10 w-full flex flex-col lg:flex-row mb-20 border border-[#FFDDD1]">
            <div
              id="blog_right_side"
              className="w-full lg:w-[75%] bg-white h-auto p-5 border-l border-[#FFDDD1]"
            >
              <div>
                <div
                  id="book_an_appointment_tab"
                  className="flex gap-10 items-baseline justify-around"
                >
                  <div
                    id="showCalender"
                    className="w-1/2 flex justify-center items-center"
                  >
                    <Calendar
                      mode="single"
                      onMonthChange={handleMonthChange}
                      className="shadow-lg rounded-md w-[300px]"
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
                          const isCurrentDate = dayjs().isSame(date, "day");

                          const handleDayClick = () => {
                            const formattedDate =
                              dayjs(date).format("YYYY-MM-DD");
                            if (!isDisabled) {
                              handleDateSelect(dayOfWeek, formattedDate);
                            }
                          };

                          const isSelected =
                            selectedDate.date ===
                            dayjs(date).format("YYYY-MM-DD");

                          const dayClasses = isDisabled
                            ? "text-gray-400 cursor-not-allowed bg-transparent"
                            : isSelected
                            ? "text-white bg-blue-900 cursor-pointer rounded-full"
                            : isCurrentDate
                            ? "text-gray-800 bg-blue-500 text-white cursor-pointer rounded-full shadow"
                            : "text-gray-800 cursor-pointer bg-gray-100/70 shadow-sm rounded-full";
                          return isInCurrentMonth ? (
                            <Button
                              className={`w-9 h-9 p-2 rounded-md ${dayClasses}`}
                              title={dayOfWeek}
                              onClick={handleDayClick}
                            >
                              <p className="flex flex-col items-center justify-center relative">
                                <span className="text-sm ">{dayOfMonth}</span>

                                {isAvailable && !isDisabled && (
                                  <span
                                    className={`absolute w-1 h-1 rounded-full  top-5 ${
                                      isSelected
                                        ? "bg-green-500"
                                        : "bg-green-500"
                                    }`}
                                  />
                                )}
                              </p>
                            </Button>
                          ) : null;
                        },
                      }}
                    />
                  </div>
                  <div className="w-1/2  flex justify-center items-center">
                    {selectedDate.date && (
                      <div className="selected-date-container p-4 bg-white rounded-lg w-full">
                        {selectedDaySlots ? (
                          <div className="selected-date-info">
                            <div className="date-display text-center mb-4">
                              <p className="text-lg font-semibold text-gray-800">
                                {selectedDate?.dayOfWeek},{" "}
                                {dayjs(selectedDate?.date).format(
                                  "MMMM D, YYYY"
                                )}
                              </p>
                              <p className="text-sm text-gray-500 font-medium">
                                TimeZone: {singleCoach?.availability?.timeZone}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              {selectedDaySlots.map((slot, index) => (
                                <div
                                  key={index}
                                  onClick={() => handleSlotClick(slot)}
                                  className="group relative bg-blue-950 text-white py-2 px-5 rounded-md font-medium text-center cursor-pointer transition duration-300 transform hover:bg-blue-700 h-12 flex items-center justify-center overflow-hidden"
                                >
                                  <span className="slot-text transition-all duration-300 transform group-hover:-translate-x-full group-hover:opacity-0">
                                    {slot.startTime}
                                  </span>
                                  <span className="slot-book absolute inset-0 flex items-center justify-center transform translate-x-full opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                    Book slot
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="no-slots text-center">
                            <h4 className="text-lg font-bold text-black mb-2">
                              No Slots Available
                            </h4>
                            <p className="text-sm text-gray-500 font-medium">
                              {dayjs(selectedDate?.date).format("MMMM D, YYYY")}
                              , {selectedDate?.dayOfWeek}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <Dialog open={isDialogOpen}>
                    <DialogContent onClick={handleCloseDialog} showCloseButton>
                      <DialogHeader>
                        <DialogTitle>Confirm Slot</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit(handleConfirmSlot)}>
                        <div className="space-y-2">
                          <p className="text-gray-500 font-medium text-sm">
                            {modalSelectedSlot?.selectedDate?.dayOfWeek},{" "}
                            {modalSelectedSlot?.selectedDate?.date}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBookingSlot
