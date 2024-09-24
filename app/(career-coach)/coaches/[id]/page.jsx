"use client";
import React, { useEffect, useState } from "react";
// import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ResumeHeader } from "@/app/Layout/ResumeHeader";
import { CoachHeader } from "@/components/component/CoachHeader";
import moment from "moment-timezone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";
/******************************************** */
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useCoachesDetailStore from "@/app/store/coachDetailStore";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const schema = yup.object().shape({
  first_name: yup
    .string()
    .matches(/^[A-Za-z]+$/, "First name should only contain letters")
    .required("First name is required"),
  last_name: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Last name should only contain letters")
    .required("Last name is required"),
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  careerCoaching: yup.string().required("Career Coaching topic is required"),
  message: yup.string().required("Message is required"),
  agree: yup
    .boolean()
    .oneOf([true], "You must agree with the terms and conditions")
    .required(),
});

const onSubmit = (data) => {
  console.log(data);
  // Handle form submission logic here
};
/************************************************ */

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

const CoachDetailsPage = () => {
  /************************ */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
  const [activeTab, setActiveTab] = useState("blogs");
  const [date, setDate] = useState(new Date());

  const selectedDay = format(date, "EEEE");

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

  console.log("availability", availability);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const CoachAvailability = [
    {
      coachName: "John Doe",
      schedule: [
        {
          date: "23 September 2024",
          dayOfWeek: "Monday",
          timeZone: "UTC +1",
          slots: [
            {
              startTime: "09:00 AM",
              endTime: "03:00 PM",
            },
          ],
        },
        {
          date: "24 September 2024",
          dayOfWeek: "Tuesday",
          timeZone: "UTC +1",
          slots: [
            {
              startTime: "09:00 AM",
              endTime: "03:00 PM",
            },
          ],
        },
        {
          date: "25 September 2024",
          dayOfWeek: "Wednesday",
          timeZone: "UTC +1",
          slots: [
            {
              startTime: "09:00 AM",
              endTime: "03:00 PM",
            },
          ],
        },
        {
          date: "26 September 2024",
          dayOfWeek: "Thursday",
          timeZone: "UTC +1",
          slots: [
            {
              startTime: "10:00 AM",
              endTime: "04:00 PM",
            },
          ],
        },
        {
          date: "27 September 2024",
          dayOfWeek: "Friday",
          timeZone: "UTC +1",
          slots: [
            {
              startTime: "11:00 AM",
              endTime: "05:00 PM",
            },
          ],
        },
        {
          date: "28 September 2024",
          dayOfWeek: "Saturday",
          timeZone: "UTC +1",
          slots: [
            {
              startTime: "09:00 AM",
              endTime: "01:00 PM",
            },
          ],
        },
        {
          date: "29 September 2024",
          dayOfWeek: "Sunday",
          timeZone: "UTC +1",
          slots: [
            {
              startTime: "09:00 AM",
              endTime: "03:00 PM",
            },
          ],
        },
      ],
    },
    {
      coachName: "Jane Smith",
      schedule: [
        {
          date: "30 September 2024",
          dayOfWeek: "Monday",
          timeZone: "UTC +1",
          slots: [
            {
              startTime: "10:00 AM",
              endTime: "04:00 PM",
            },
          ],
        },
        {
          date: "1 October 2024",
          dayOfWeek: "Tuesday",
          timeZone: "UTC +1",
          slots: [
            {
              startTime: "08:00 AM",
              endTime: "12:00 PM",
            },
          ],
        },
        {
          date: "2 October 2024",
          dayOfWeek: "Wednesday",
          timeZone: "UTC +1",
          slots: [
            {
              startTime: "09:00 AM",
              endTime: "03:00 PM",
            },
          ],
        },
        {
          date: "3 October 2024",
          dayOfWeek: "Thursday",
          timeZone: "UTC +1",
          slots: [
            {
              startTime: "10:00 AM",
              endTime: "04:00 PM",
            },
          ],
        },
        {
          date: "4 October 2024",
          dayOfWeek: "Friday",
          timeZone: "UTC +1",
          slots: [
            {
              startTime: "11:00 AM",
              endTime: "05:00 PM",
            },
          ],
        },
        {
          date: "5 October 2024",
          dayOfWeek: "Saturday",
          timeZone: "UTC +1",
          slots: [
            {
              startTime: "09:00 AM",
              endTime: "01:00 PM",
            },
          ],
        },
        {
          date: "6 October 2024",
          dayOfWeek: "Sunday",
          timeZone: "UTC +1",
          slots: [
            {
              startTime: "09:00 AM",
              endTime: "03:00 PM",
            },
          ],
        },
      ],
    },
  ];

  const disablePastDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getDayOfWeek = (date) => {
    // Get the day of the week from the date object
    const options = { weekday: "long" }; // Use 'short' for abbreviated names
    return date.toLocaleDateString("en-US", options);
  };

  // // Function to format the date
  // const formatDate = (date) => {
  //   const options = { month: 'numeric', day: 'numeric' };
  //   return date.toLocaleDateString('en-US', options);
  // };

  // Function to get the day of the month
  const getDayOfMonth = (date) => {
    return date.getDate(); // Returns only the day of the month (1-31)
  };

  // Check if a specific day is available based on the provided data
  const isDayAvailable = (day) => {
    const dayOfWeek = getDayOfWeek(day);
    const availability = singleCoach?.availability?.date?.find(
      (item) => item.dayOfWeek === dayOfWeek
    );
    return availability?.isAvailable;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllCoaches();
    };

    fetchData();
  }, [fetchAllCoaches]);

  useEffect(() => {
    if (id) {
      console.log("Filtering coach with id:", id); // Debugging log
      filterCoachById(id);
    }
  }, [id, filterCoachById]);

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
                    {/* <p className="text-[#6E7485] pb-5 text-sm">
                      He decided to work on his dream: be his own boss, travel
                      the world, only do the work he enjoyed, and make a lot
                      more money in the process. No more begging for vacation
                      days and living from paycheck to paycheck. After trying
                      everything from e-commerce stores to professional poker
                      his lucky break came when he started freelance design.
                      Vako fell in love with the field that gives him the
                      lifestyle of his dreams.
                    </p>
                    <p className="text-[#6E7485] pb-5 text-sm">
                      Vako realizes that people who take courses on Udemy want
                      to transform their lives. Today with his courses and
                      mentoring Vako is helping thousands of people transform
                      their lives, just like he did once.
                    </p> */}
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
                  className={`cursor-pointer p-3 ${
                    activeTab === "blogs"
                      ? "font-bold border-b-2 border-[#FF6636]"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick("blogs")}
                >
                  Blogs
                </div>
                <div
                  className={`cursor-pointer p-3 ${
                    activeTab === "appointment"
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
                    {!showForm ? (
                      <div
                        id="book_an_appointment_tab"
                        className="flex gap-10 items-baseline justify-around"
                      >
                        <div id="showCalender">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                            disabled={disablePastDates}
                            weekStartsOn={1} // Start week on Monday
                            showOutsideDays={false}
                            components={{
                              Day: ({ date }) => {
                                const dayOfWeek = getDayOfWeek(date);
                                const dayOfMonth = getDayOfMonth(date); // Get only the day of the month
                                const isAvailable = isDayAvailable(date);

                                return (
                                  <div
                                    className={`p-2 rounded ${
                                      isAvailable
                                        ? "bg-green-300 text-white"
                                        : ""
                                    }`}
                                    title={dayOfWeek} // Optional: display the day of the week as a tooltip
                                  >
                                    <div>{dayOfMonth}</div>{" "}
                                  </div>
                                );
                              },
                            }}
                          />
                        </div>
                        {/* <div>
                          {selectedDateInfo ? (
                            <div className="selected-date-info">
                              <h4 className="text-black font-bold text-base">
                                Available Slots:
                              </h4>
                              <p className="text-gray-500 font-medium text-sm my-2">
                                {selectedDateInfo.date},
                                {selectedDateInfo.dayOfWeek}
                              </p>
                              <p className="text-gray-500 font-medium text-sm my-2">
                                {selectedDateInfo.timeZone}
                              </p>
                              <div>
                                {selectedDateInfo.timeSlots.map(
                                  (slot, index) => (
                                    <p
                                      key={index}
                                      className="text-sm bg-blue-950 text-white py-2 text-center  rounded-md font-medium my-2 cursor-pointer"
                                    >
                                      {slot.startTime} - {slot.endTime}
                                    </p>
                                  )
                                )}  
                              </div>
                            </div>
                          ) : (
                            <p>No available slots.</p>
                          )}
                        </div> */}
                      </div>
                    ) : (
                      <div
                        id="appointment_confirm_form"
                        className="max-w-lg mx-auto p-4"
                      >
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="flex space-x-4">
                            <div className="flex-1">
                              <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                First Name
                              </label>
                              <input
                                type="text"
                                {...register("first_name")}
                                id="first_name"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="First name..."
                              />
                              {errors.first_name && (
                                <p className="text-red-500 text-sm">
                                  {errors.first_name.message}
                                </p>
                              )}
                            </div>
                            <div className="flex-1">
                              <label
                                htmlFor="last_name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Last Name
                              </label>
                              <input
                                type="text"
                                {...register("last_name")}
                                id="last_name"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Last name..."
                              />
                              {errors.last_name && (
                                <p className="text-red-500 text-sm">
                                  {errors.last_name.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="mt-4">
                            <label
                              htmlFor="username"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Username
                            </label>
                            <input
                              type="text"
                              {...register("username")}
                              id="username"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Username..."
                            />
                            {errors.username && (
                              <p className="text-red-500 text-sm">
                                {errors.username.message}
                              </p>
                            )}
                          </div>

                          <div className="mt-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email
                            </label>
                            <input
                              type="text"
                              {...register("email")}
                              id="email"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Email address..."
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm">
                                {errors.email.message}
                              </p>
                            )}
                          </div>

                          <div className="mt-4">
                            <label
                              htmlFor="careerCoaching"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Career Coaching
                            </label>
                            <input
                              type="text"
                              {...register("careerCoaching")}
                              id="careerCoaching"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Topics"
                            />
                            {errors.careerCoaching && (
                              <p className="text-red-500 text-sm">
                                {errors.careerCoaching.message}
                              </p>
                            )}
                          </div>

                          <div className="mt-4">
                            <label
                              htmlFor="message"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Message
                            </label>
                            <input
                              type="text"
                              {...register("message")}
                              id="message"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Message"
                            />
                            {errors.message && (
                              <p className="text-red-500 text-sm">
                                {errors.message.message}
                              </p>
                            )}
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                id="agree"
                                type="checkbox"
                                {...register("agree")}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="agree"
                                className="ml-2 block text-sm text-gray-900"
                              >
                                I Agree with all of your{" "}
                                <a href="#">Terms & Conditions</a>
                              </label>
                              {errors.agree && (
                                <p className="text-red-500 text-sm">
                                  {errors.agree.message}
                                </p>
                              )}
                            </div>
                            <button
                              type="submit"
                              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              Book Appointment
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* {showSlotPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              Available Slots for {format(clickedDate, "MMM d, yyyy")}
            </h2>
            {availableSlots.length > 0 ? (
              <div>
                {availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleSlotClick(slot)}
                    className={`block w-full text-left px-4 py-2 mb-2 ${
                      slot.isAvailable ? "bg-green-500" : "bg-red-500"
                    } text-white rounded hover:bg-green-600`}
                    disabled={!slot.isAvailable}
                  >
                    {format(slot.start, "hh:mm a")} -{" "}
                    {format(slot.end, "hh:mm a")}
                  </button>
                ))}
              </div>
            ) : (
              <p>No available slots for this date.</p>
            )}
            <button
              onClick={() => setShowSlotPopup(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )} */}

      <ToastContainer />
    </>
  );
};

export default CoachDetailsPage;
