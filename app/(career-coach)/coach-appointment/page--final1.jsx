'use client';
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isValid } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ResumeHeader } from "../../Layout/ResumeHeader";
import { CoachHeader } from "../../../components/component/CoachHeader";
import moment from 'moment-timezone';

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CoachAppointmentPage = () => {
  const [activeTab, setActiveTab] = useState("Courses");
  const [appointments, setAppointments] = useState([
    {
      title: "Career Coaching with Joy",
      start: new Date(2024, 7, 5, 10, 0),
      end: new Date(2024, 7, 5, 11, 0),
    },
    {
      title: "Resume Review",
      start: new Date(2024, 7, 7, 14, 0),
      end: new Date(2024, 7, 7, 15, 0),
    },
  ]);

  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    start: "",
    end: "",
  });

  // Get the user's current timezone
  const userTimezone = moment.tz.guess();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setNewAppointment({
      title: "",
      start: format(start, "yyyy-MM-dd'T'HH:mm"),
      end: format(end, "yyyy-MM-dd'T'HH:mm"),
    });
    setShowBookingForm(true);
  };

  const handleBookingChange = (e) => {
    setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  };

  const handleSubmitBooking = () => {
    const { title, start, end } = newAppointment;
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (title && isValid(startDate) && isValid(endDate)) {
      setAppointments([...appointments, { title, start: startDate, end: endDate }]);
      setNewAppointment({ title: "", start: "", end: "" });
      setShowBookingForm(false);
      setSelectedSlot(null);
    } else {
      alert("Please fill in all the details correctly.");
    }
  };

  return (
    <>
      <ResumeHeader />
      <div
        id="Main"
        className="mt-10 bg-white w-full h-auto flex flex-col items-center"
      >
        <CoachHeader />
        <div className="container bg-[#FFF] h-auto mt-10 w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-[25%] bg-white h-auto "></div>
          <div className="w-full lg:w-[75%] bg-white h-auto">
            <div
              id="blog_tab_page_head"
              className="flex border-b border-gray-300 mb-5"
            >
              <div
                className={`cursor-pointer p-3 ${
                  activeTab === "Courses"
                    ? "font-bold border-b-2 border-[#FF6636]"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("Courses")}
              >
                Courses
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
          </div>
        </div>
        <div className="container bg-[#FFF] h-auto w-full flex flex-col lg:flex-row border border-[#FFDDD1]">
          <div
            id="blog_left_side"
            className="w-full lg:w-[25%] bg-white h-full "
          >
            <div className="border-b border-[#FFDDD1] p-5">
              <h3 className="text-[#1D2026] pb-2 font-semibold text-2xl">
                Book Appointment <br />
                <span className="font-normal">with Joy</span>
              </h3>
            </div>
            <div className=" p-5 h-full">
              <h2 className="text-xl font-bold w-[70%] text-[#1D2026]">
                Career Development Coaching
              </h2>
              <p className="pt-5 pb-5 pl-5">45 Min</p>
              <p className="pt-5 pb-5 pl-5">
                Web Conferencing details provided upon confirmation
              </p>
            </div>
          </div>

          <div
            id="blog_right_side"
            className="w-full lg:w-[75%] bg-white h-auto p-5 border-l border-[#FFDDD1]"
          >
            {activeTab === "Courses" && (
              <>
                <h1 className="text-2xl lg:text-xl font-bold pt-5 pb-5">
                  Joy Career Development Courses
                </h1>
                <div
                  id="blog_tab"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
                ></div>
              </>
            )}
            {activeTab === "appointment" && (
              <div id="book_an_appointment_tab">
                <h1 className="text-[16px] font-bold text-[#1D2026]">
                  Select A Date & Time
                </h1>
                <div id="showCalender">
                  <Calendar
                    localizer={localizer}
                    events={appointments}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    style={{ height: 500, margin: "50px" }}
                    date={date}
                    onNavigate={handleNavigate}
                    onSelectSlot={handleSelectSlot}
                    views={['month']} // Only show the month view
                    defaultView={Views.MONTH} // Set default view to month
                    toolbar={true} // Display the toolbar with navigation controls
                  />
                </div>
                <h1 className="text-[16px] font-bold text-[#1D2026]">
                  Current Time Zone
                </h1>
                <div id="timeZone">
                  <p>{userTimezone}</p>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/>
              </div>
            )}
          </div>
        </div>

        {showBookingForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
              <label className="block mb-2">
                Title:
                <input
                  type="text"
                  name="title"
                  value={newAppointment.title}
                  onChange={handleBookingChange}
                  className="w-full border p-2 rounded"
                />
              </label>
              <label className="block mb-2">
                Start Time:
                <input
                  type="datetime-local"
                  name="start"
                  value={newAppointment.start}
                  onChange={handleBookingChange}
                  className="w-full border p-2 rounded"
                />
              </label>
              <label className="block mb-2">
                End Time:
                <input
                  type="datetime-local"
                  name="end"
                  value={newAppointment.end}
                  onChange={handleBookingChange}
                  className="w-full border p-2 rounded"
                />
              </label>
              <button
                onClick={handleSubmitBooking}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              >
                Book
              </button>
              <button
                onClick={() => setShowBookingForm(false)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CoachAppointmentPage;
