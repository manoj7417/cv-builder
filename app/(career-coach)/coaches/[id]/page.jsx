"use client";
import React, { useEffect, useState } from "react";
// import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
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
    reset
  } = useForm();

  const {
    singleCoach,
    fetchAllCoaches,
    filterCoachById,
    isLoading,
    updateSingleCoach,
  } = useCoachesDetailStore();
  /************************ */
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams();
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("blogs");
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
  const [isBookingSlot, setIsBookingSlot] = useState(false)



  const {
    name,
    email,
    phone,
    bio,
    availability,
    coachingDescription,
    profileImage,
    dateofBirth,
    experience,
    address,
    city,
    country,
    zip,
    bankDetails,
    ratesPerHour,
    cv,
    signedAggrement,
    typeOfCoaching,
    skills,
  } = singleCoach;


  const handleTabClick = async (tab) => {
    const { accessToken } = await GetTokens();
    if (tab === 'appointment') {
      if (!accessToken || !accessToken.value) {
        return router.push(`/login?redirect=/coaches/${id}`)
      }
    }
    setActiveTab(tab);
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
    const availableDay = availability.dates.find(
      (day) => day.dayOfWeek === dayOfWeek
    );
    return availableDay ? availableDay.isAvailable : false;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllCoaches();
    };

    fetchData();
  }, [fetchAllCoaches]);

  useEffect(() => {
    if (id) {
      filterCoachById(id);
    }
  }, [id, filterCoachById]);

  // Function to handle date selection and fetch available slots
  const handleDateSelect = (dayOfWeek, date) => {
    setSelectedDate({
      date,
      dayOfWeek,
    });
    const selectedDay = availability.dates.find(
      (day) => day.dayOfWeek === dayOfWeek
    );
    if (selectedDay.isAvailable) {
      const newSlots = createOneHourTimeSlotsForRange(selectedDay.slots);
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
        setGeoData(data)
      })
      .catch((error) => {
        console.error("Error fetching geo information:", error);
      });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    reset()
  }

  const handleConfirmSlot = async (data) => {
    const { accessToken } = await GetTokens();
    if (!accessToken || !accessToken.value) {
      return router.push(`/login?redirect=/coaches/${id}`)
    }
    setIsBookingSlot(true)
    const obj = {
      coachId: id,
      timezone: geoData.timezone,
      country: geoData.country_name,
      state: geoData.region,
      city: geoData.city,
      notes: data?.message,
      date: modalSelectedSlot?.selectedDate?.date,
      slotTime: modalSelectedSlot?.slot
    }
    try {
      const response = await axios.post('/api/confirmSlots', obj, {
        headers: {
          'Authorization': `Bearer ${accessToken.value}`
        }
      })
      if (response.status === 201) {
        toast.success("Slot booked successfully")
        handleCloseDialog()
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error booking slot")
    } finally {
      setIsBookingSlot(false)
    }
  };



  useEffect(() => {
    getGeoInfo()
  }, [])





  return (
    <>
      <ResumeHeader />
      <div className="mt-20 bg-[#E0F2FF] h-40 w-full flex justify-center "></div>
      <div className="max-w-5xl mx-auto">
        <div
          id="Main"
          className="mt-10 bg-white w-full h-auto flex flex-col items-center"
        >
          <CoachHeader id={id} />
          <div className="container bg-[#FFF] h-auto mt-10 w-full flex flex-col lg:flex-row mb-20 border border-[#FFDDD1]">
            <div
              id="blog_left_side"
              className="w-full lg:w-[25%] bg-white h-full relative"
            >
              {activeTab === "blogs" && (
                <>
                  <div className=" p-5">
                    <h3 className="text-[#1D2026] pb-2 font-semibold text-lg">
                      ABOUT ME
                    </h3>
                    <p className="text-[#6E7485] pb-5 text-sm">{bio}</p>
                  </div>
                </>
              )}

              {activeTab === "appointment" && (
                <>
                  <div className="border-b border-[#FFDDD1] p-5">
                    <h3 className="text-[#1D2026] pb-2 font-semibold text-2xl">
                      Book Appointment <br />
                      <span className="font-normal">with Joy</span>
                    </h3>
                  </div>
                  <div className=" p-5 h-full relative z-50 mb-10">
                    <h2 className="text-xl font-bold w-[70%] text-[#1D2026]">
                      Career Development Coaching
                    </h2>
                    <p className="flex items-center pt-5 pb-5 pl-5">
                      <img src="/careerRightBullet.png" className="mr-2" />
                      45 Min
                    </p>

                    <p className="flex items-center pt-5 pb-5 pl-5">
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
                  className={`cursor-pointer p-3 ${activeTab === "blogs"
                    ? "font-bold border-b-2 border-[#FF6636]"
                    : "text-gray-500"
                    }`}
                  onClick={() => handleTabClick("blogs")}
                >
                  Blogs
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

              {activeTab === "blogs" && (
                <>
                  <h1 className="text-2xl lg:text-xl font-bold pt-5 pb-5">
                    Joy Career Development Blogs
                  </h1>
                  <div
                    id="blog_tab"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
                  >
                    {/* START-BLOG 1 */}
                    <div className="border border-[#E9EAF0]">
                      <div>
                        <img
                          src="/blogImage1.png"
                          alt="Blog"
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center justify-center p-5">
                        <span className="p-1 bg-[#EBEBFF] text-[10px]">
                          DEVELOPMENTS
                        </span>
                      </div>
                      <div className="break-words p-5 text-lg lg:text-xl">
                        Machine Learning A-Z™: Hands-On Python & R In Data
                        Science
                      </div>
                      <div
                        id="row3"
                        className="flex justify-between text-sm text-gray-500 p-5"
                      >
                        <div className="flex items-center space-x-1">
                          <img src="/Star.png" alt="Star" className="w-4 h-4" />
                          <span className="text-[#1D2026] font-bold">5.0</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <img
                            src="/Usercoach.png"
                            alt="Users"
                            className="w-4 h-4"
                          />
                          <span className="text-[#1D2026] font-bold">
                            265.7k
                          </span>
                          <span className="text-[#6E7485]">students</span>
                        </div>
                      </div>
                    </div>
                    {/* END-BLOG 1 */}
                    {/* START-BLOG 2 */}
                    <div className="border border-[#E9EAF0]">
                      <div>
                        <img
                          src="/blogImage2.png"
                          alt="Blog"
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center justify-center p-5">
                        <span className="p-1 bg-[#E1F7E3] text-[10px]">
                          BUSINESS
                        </span>
                      </div>
                      <div className="break-words p-5 text-lg lg:text-xl">
                        Selenium WebDriver with Java -Basics to
                        Advanced+Frameworks
                      </div>
                      <div
                        id="row3"
                        className="flex justify-between text-sm text-gray-500 p-5"
                      >
                        <div className="flex items-center space-x-1">
                          <img src="/Star.png" alt="Star" className="w-4 h-4" />
                          <span className="text-[#1D2026] font-bold">5.0</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <img
                            src="/Usercoach.png"
                            alt="Users"
                            className="w-4 h-4"
                          />
                          <span className="text-[#1D2026] font-bold">
                            265.7k
                          </span>
                          <span className="text-[#6E7485]">students</span>
                        </div>
                      </div>
                    </div>
                    {/* END-BLOG 2 */}
                    {/* START-BLOG 3 */}
                    <div className="border border-[#E9EAF0]">
                      <div>
                        <img
                          src="/blogimage3.png"
                          alt="Blog"
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center justify-center p-5">
                        <span className="p-1 bg-[#E1F7E3] text-[10px]">
                          DEVELOPMENT
                        </span>
                      </div>
                      <div className="break-words p-5 text-lg lg:text-xl">
                        Selenium WebDriver with Java -Basics to
                        Advanced+Frameworks
                      </div>
                      <div
                        id="row3"
                        className="flex justify-between text-sm text-gray-500 p-5"
                      >
                        <div className="flex items-center space-x-1">
                          <img src="/Star.png" alt="Star" className="w-4 h-4" />
                          <span className="text-[#1D2026] font-bold">5.0</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <img
                            src="/Usercoach.png"
                            alt="Users"
                            className="w-4 h-4"
                          />
                          <span className="text-[#1D2026] font-bold">
                            265.7k
                          </span>
                          <span className="text-[#6E7485]">students</span>
                        </div>
                      </div>
                    </div>
                    {/* END-BLOG 3 */}
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
                          selected={date}
                          // onSelect={setDate}
                          onSelect={handleDateSelect}
                          onMonthChange={handleMonthChange}
                          className="shadow-lg"
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
                                  onClick={handleDayClick}
                                >
                                  <span className="flex flex-col items-center justify-center">
                                    {/* Date (Day of the Month) */}
                                    <span className="text-sm ">
                                      {dayOfMonth}
                                    </span>

                                    {/* Dot below the date */}
                                    {isAvailable && !isDisabled && (
                                      <span className="inline-block w-1 h-1 rounded-full bg-blue-500 mt-1" />
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
                            <div className="selected-date-info">
                              <p className="text-gray-500 font-medium text-sm my-2">
                                {selectedDate?.dayOfWeek},
                                {formatDate(selectedDate?.date)}
                              </p>
                              <p className="text-gray-600 font-medium text-sm my-2">
                                TimeZone: {availability?.timeZone}
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
                          showCloseButton
                        >
                          <DialogHeader>
                            <DialogTitle>Confirm Slot</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleSubmit(handleConfirmSlot)}>
                            <div className="space-y-2">
                              {/* Display date and day of the week */}
                              <p className="text-gray-500 font-medium text-sm">
                                {modalSelectedSlot?.selectedDate?.dayOfWeek},{" "}
                                {formatDate(
                                  modalSelectedSlot?.selectedDate?.date
                                )}
                              </p>

                              {/* Available slot details */}
                              <div className="slots_available flex flex-wrap">
                                <p className="text-sm bg-blue-950 text-white py-2 px-5 text-center rounded-md font-medium my-2">
                                  {modalSelectedSlot?.slot?.startTime} -{" "}
                                  {modalSelectedSlot?.slot?.endTime}
                                </p>
                              </div>

                              {/* Textarea for message input */}
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

                              {/* Confirm Button */}
                              <div className="confrm_button flex justify-end mt-4">
                                <Button type="submit" disabled={isBookingSlot} className="flex justify-center items-center">
                                  {
                                    isBookingSlot ? <>
                                      Booking Slot <ImSpinner3 className="animate-spin ml-2 h-4 w-4" />
                                    </> :
                                      <>
                                        Book Slot
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                      </>
                                  }</Button>
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
