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
  DialogDescription,
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

const UserBookingSlot = ({ coach_Id, programId,onMeetUrlUpdate  }) => {
  /************************ */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [singleCoach, setSingleCoach] = useState(null);
  const id = coach_Id;
  const router = useRouter();
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

  const [meetUrl, setMeetUrl] = useState(null);

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
    setIsDialogOpen(true);
  };

  const disablePastDates = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  const getDayOfWeek = (date) => {
    const options = { weekday: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  // Function to get the day of the month
  const getDayOfMonth = (date) => {
    return date.getDate();
  };

  // Check if a specific day is available based on the provided data
  // const isDayAvailable = (dayOfWeek,date) => {

  //   const formattedDateToCheck = dayjs(date).format("YYYY-MM-DD");

  //   const checkIfDateExists = (date) => {
  //     return singleCoach?.availability?.dateOverrides.some(item => dayjs(item.date).format("YYYY-MM-DD") === formattedDateToCheck);
  //   };

  //   // Check if the date exists in dateOverrides
  // if (checkIfDateExists(formattedDateToCheck)) {
  //   console.log("Formatted Date found in dateOverrides:", formattedDateToCheck);
    
  //   // Fetch the dateOverride for the selected date
  //   const dateOverride = singleCoach?.availability?.dateOverrides?.find(
  //     (override) => dayjs(override.date).format("YYYY-MM-DD") === formattedDateToCheck
  //   );

  //   // Return the slots from the dateOverride if available
  //   if (dateOverride && dateOverride.slots) {
  //     console.log("Date Override Slots:", dateOverride.slots);
  //     return dateOverride.slots;
  //   }
  // }
     

    
  //   const availableDay = singleCoach?.availability?.dates?.find(
  //     (day) => day.dayOfWeek === dayOfWeek
  //   );

  //   return availableDay ? availableDay.isAvailable : false;

  // };
  const isDayAvailable = (dayOfWeek, date) => {
    const formattedDateToCheck = dayjs(date).format("YYYY-MM-DD");
  
    // Helper function to check if the date exists in dateOverrides
    const checkIfDateExists = (date) => {
      return singleCoach?.availability?.dateOverrides?.some(
        (item) => dayjs(item.date).format("YYYY-MM-DD") === date
      );
    };
  
    // Check if the date exists in dateOverrides
    if (checkIfDateExists(formattedDateToCheck)) {  
      // Fetch the dateOverride for the selected date
      const dateOverride = singleCoach?.availability?.dateOverrides?.find(
        (override) => dayjs(override.date).format("YYYY-MM-DD") === formattedDateToCheck
      );
  
      if (dateOverride) {
        // If `isUnavailable` is true, return false (no slots available)
        if (dateOverride.isUnavailable) {
          return false;
        }
  
        // Otherwise, return the slots from the dateOverride
        if (dateOverride.slots) {
          return dateOverride.slots;
        }
      }
    }
  
    // If no dateOverride is found, check the availability for the day of the week
    const availableDay = singleCoach?.availability?.dates?.find(
      (day) => day.dayOfWeek === dayOfWeek
    );
  
    return availableDay ? (availableDay.isAvailable ? availableDay.slots : false) : false;
  };
  
  

  // Function to handle date selection and fetch available slots
  // const handleDateSelect = (dayOfWeek, date) => {
  //   setSelectedDate({
  //     date,
  //     dayOfWeek,
  //   });
  //   console.log("date", date);
  //   const selectedDay = singleCoach?.availability.dates.find(
  //     (day) => day.dayOfWeek === dayOfWeek
  //   );
  //   if (selectedDay?.isAvailable) {
  //     const newSlots = createOneHourTimeSlotsForRange(
  //       selectedDay?.slots,
  //       coachBookings,
  //       date
  //     );
  //     setSelectedDaySlots(newSlots);
  //   } else {
  //     setSelectedDaySlots(null);
  //   }
  // };
  const handleDateSelect = (dayOfWeek, date) => {
    setSelectedDate({
      date,
      dayOfWeek,
    });
  
    // Check if the selected date has an override in dateOverrides
    const dateOverride = singleCoach?.availability?.dateOverrides?.find(
      (override) => dayjs(override.date).format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD")
    );
  
    // If the date is overridden and is unavailable, set slots to null
    if (dateOverride?.isUnavailable) {
      setSelectedDaySlots(null);
      return;
    }
  
    // Check availability for the day of the week
    const selectedDay = singleCoach?.availability?.dates.find(
      (day) => day.dayOfWeek === dayOfWeek
    );
  
    if (selectedDay?.isAvailable) {
      // Create slots based on availability and bookings
      const newSlots = createOneHourTimeSlotsForRange(
        dateOverride?.slots || selectedDay?.slots,
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
      return router.push(`/login?redirect=/user-dashboard`);
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
      programId: programId,
    };
    try {
      const response = await axios.post("/api/bookSlot", obj, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 201) {
        setMeetUrl(response.data?.data?.meetingLink);
        onMeetUrlUpdate(response.data?.data?.meetingLink)
        setIsDialogOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error booking slot");
    } finally {
      setIsBookingSlot(false);
    }
  };

  //function for total time

  // const handleConfirmSlot = async (data) => {
  //   setIsBookingSlot(true);
  //   const obj = {
  //     ...data,
  //     date: selectedDate?.date,
  //     slotTime: modalSelectedSlot?.slot,
  //   };
  //   const { accessToken } = await GetTokens();
  //   try {
  //     const response = await axios.post("/api/bookSlot", obj, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken.value}`,
  //       },
  //     });
  //   } catch (error) {}
  // };

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
      const coach = data.coaches.find((coach) => coach._id === id);
      if (coach) {
        setSingleCoach(coach);
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
      <div className="container mx-auto bg-[#FFF] w-full md:flex flex-col my-0 lg:flex-row border border-blue-200 rounded-md justify-center items-center lg:gap-10 lg:h-full h-screen lg:overflow-hidden overflow-y-auto">
        <div
          id="showCalender"
          className="flex flex-col items-center justify-center w-full lg:w-1/2"
        >
          <Calendar
            mode="single"
            onMonthChange={handleMonthChange}
            className="shadow-lg rounded-md w-[300px]"
            components={{
              Day: ({ date }) => {
                const dayOfWeek = getDayOfWeek(date);
                const dayOfMonth = getDayOfMonth(date);
                const isAvailable = isDayAvailable(dayOfWeek,date);
                const isDisabled = disablePastDates(date);
                const isInCurrentMonth = isSameMonth(date, currentMonth);
                const isCurrentDate = dayjs().isSame(date, "day");

                const handleDayClick = () => {
                  const formattedDate = dayjs(date).format("YYYY-MM-DD");
                  if (!isDisabled) {
                    handleDateSelect(dayOfWeek, formattedDate);
                  }
                };

                const isSelected =
                  selectedDate.date === dayjs(date).format("YYYY-MM-DD");


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
                            isSelected ? "bg-green-500" : "bg-green-500"
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
        {/* <div className="flex flex-col items-center justify-start w-full lg:w-1/2 mt-6 lg:mt-0">
          {selectedDate.date && (
            <div className="selected-date-container p-4 bg-white rounded-lg w-full">
              {selectedDaySlots ? (
                <div className="selected-date-info">
                  <div className="date-display text-center mb-4">
                      <p className="text-lg font-semibold text-gray-800">
                      {selectedDate?.dayOfWeek},{" "}
                      {dayjs(selectedDate?.date).format("MMMM D, YYYY")}
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
                        className="group relative bg-blue-950 text-white py-2 px-5 rounded-md font-medium text-center cursor-pointer transition duration-300 transform hover:bg-blue-700 h-10 flex items-center justify-center overflow-hidden"
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
                    {dayjs(selectedDate?.date).format("MMMM D, YYYY")},{" "}
                    {selectedDate?.dayOfWeek}
                  </p>
                </div>
              )}
            </div>
          )}
        </div> */}
        <div className="flex flex-col items-center justify-start w-full lg:w-1/2 mt-6 lg:mt-0">
          {meetUrl ? (
            // Show the "Join Meeting" button if meetUrl exists
            <div className="meeting-link-container text-center p-4 bg-white rounded-lg w-full">
              <div className="date-display text-center mb-4">
                <p className="text-lg font-semibold text-gray-800">
                  {selectedDate?.dayOfWeek},{" "}
                  {dayjs(selectedDate?.date).format("MMMM D, YYYY")}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  TimeZone: {singleCoach?.availability?.timeZone}
                </p>
              </div>
              <div className="flex gap-5 justify-center items-baseline">
                <h4 className="text-lg font-bold text-black mb-4">
                  Your Meeting Link
                </h4>
                <p className="text-lg  text-blue-500 font-medium transition duration-300 transform hover:bg-blue-700">
                  {meetUrl}
                </p>
              </div>
              <Link
                href={meetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-950 text-white py-2 px-4 rounded-md font-medium transition duration-300 transform hover:bg-blue-700"
              >
                Join Meeting
              </Link>
            </div>
          ) : (
            // Show the original slot selection UI if meetUrl does not exist
            selectedDate.date && (
              <div className="selected-date-container p-4 bg-white rounded-lg w-full">
                {selectedDaySlots ? (
                  <div className="selected-date-info">
                    <div className="date-display text-center mb-4">
                      <p className="text-lg font-semibold text-gray-800">
                        {selectedDate?.dayOfWeek},{" "}
                        {dayjs(selectedDate?.date).format("MMMM D, YYYY")}
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
                          className="group relative bg-blue-950 text-white py-2 px-5 rounded-md font-medium text-center cursor-pointer transition duration-300 transform hover:bg-blue-700 h-10 flex items-center justify-center overflow-hidden"
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
                      {dayjs(selectedDate?.date).format("MMMM D, YYYY")},{" "}
                      {selectedDate?.dayOfWeek}
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        <Dialog open={isDialogOpen}>
          <DialogContent onClick={handleCloseDialog} showCloseButton>
            <DialogHeader>
              <DialogTitle>Confirm Slot</DialogTitle>
              <DialogDescription></DialogDescription>
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
    </>
  );
};

export default UserBookingSlot;
