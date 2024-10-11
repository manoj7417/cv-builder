'use client';
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ResumeHeader } from "../../Layout/ResumeHeader";
import { CoachHeader } from "../../../components/component/CoachHeader";
import moment from 'moment-timezone';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    // Booked appointments
    {
      id: 1,
      title: "Career Coaching with Joy",
      start: new Date(2024, 8, 5, 10, 0),
      end: new Date(2024, 8, 5, 11, 0),
      isAvailable: false,
      coachId: 101,  // Example coach ID
    },
    {
      id: 2,
      title: "Resume Review",
      start: new Date(2024, 8, 7, 14, 0),
      end: new Date(2024, 8, 7, 15, 0),
      isAvailable: false,
      coachId: 101,  // Example coach ID
    },
    // Available slots with unique IDs
    ...Array.from({ length: 1 }, (_, index) => ({
      id: index + 3,
      title: `Available Slot ${index + 1}`,
      start: new Date(2024, 8, 2, 9, 0), // September 2
      end: new Date(2024, 8, 2, 10, 0),
      isAvailable: true,
      coachId: 101,  // Example coach ID
    })),
    ...Array.from({ length: 2 }, (_, index) => ({
      id: index + 4,
      title: `Available Slot ${index + 1}`,
      start: new Date(2024, 8, 3, 9 + index, 0), // September 3
      end: new Date(2024, 8, 3, 10 + index, 0),
      isAvailable: true,
      coachId: 101,  // Example coach ID
    })),
    ...Array.from({ length: 3 }, (_, index) => ({
      id: index + 6,
      title: `Available Slot ${index + 1}`,
      start: new Date(2024, 8, 4, 9 + index, 0), // September 4
      end: new Date(2024, 8, 4, 10 + index, 0),
      isAvailable: true,
      coachId: 101,  // Example coach ID
    })),
    ...Array.from({ length: 4 }, (_, index) => ({
      id: index + 9,
      title: `Available Slot ${index + 1}`,
      start: new Date(2024, 8, 5, 9 + index, 0), // September 5
      end: new Date(2024, 8, 5, 10 + index, 0),
      isAvailable: true,
      coachId: 101,  // Example coach ID
    })),
  ]);

  const [date, setDate] = useState(new Date());
  const [showSlotPopup, setShowSlotPopup] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [clickedDate, setClickedDate] = useState(null);

  // Get the user's current timezone
  const userTimezone = moment.tz.guess();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleSelectSlot = (slot) => {
    const slots = appointments.filter(
      (appointment) =>
        appointment.isAvailable &&
        appointment.start.getFullYear() === slot.start.getFullYear() &&
        appointment.start.getMonth() === slot.start.getMonth() &&
        appointment.start.getDate() === slot.start.getDate()
    );

    if (slots.length > 0) {
      setClickedDate(slot.start);
      setAvailableSlots(slots);
      setShowSlotPopup(true);
    }
  };

  const handleSlotClick = (slot) => {

    setAppointments(appointments.map(app =>
      app.id === slot.id ? { ...app, isAvailable: false } : app
    ));

    toast.success(`Slot booked from ${format(slot.start, "hh:mm a")} to ${format(slot.end, "hh:mm a")}`);

    setShowSlotPopup(false); 
  };

  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: "#3174ad",  // Default color for booked slots
      color: "white",
    };

    if (event.isAvailable) {
      style.backgroundColor = "green";  // Green color for available slots
    } else {
      style.backgroundColor = "red";  // Red color for booked slots
    }

    return { style };
  };

  const handleEventClick = (event) => {
    if (event.isAvailable) {
      const slots = appointments.filter(
        (appointment) =>
          appointment.isAvailable &&
          appointment.start.getFullYear() === event.start.getFullYear() &&
          appointment.start.getMonth() === event.start.getMonth() &&
          appointment.start.getDate() === event.start.getDate()
      );

      if (slots.length > 0) {
        setClickedDate(event.start);
        setAvailableSlots(slots);
        setShowSlotPopup(true);
      }
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
            className="w-full lg:w-[75%] bg-white h-full"
          >
            {activeTab === "appointment" && (
              <div>
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
                    onSelectEvent={handleEventClick} // Handle event click to show slots
                    views={['month']} // Only show the month view
                    defaultView={Views.MONTH} // Set default view to month
                    toolbar={true} // Display the toolbar with navigation controls
                    eventPropGetter={eventStyleGetter}  // Apply custom styles to events
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

        {showSlotPopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Available Slots for {format(clickedDate, "MMM d, yyyy")}</h2>
              {availableSlots.length > 0 ? (
                <div>
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleSlotClick(slot)}
                      className={`block w-full text-left px-4 py-2 mb-2 ${
                        slot.isAvailable ? "bg-green-500" : "bg-red-500"
                      } text-white rounded hover:bg-green-600`}
                      disabled={!slot.isAvailable} // Disable if the slot is booked
                    >
                      {format(slot.start, "hh:mm a")} - {format(slot.end, "hh:mm a")}
                    </button>
                  ))}
                </div>
              ) : (
                <p>No available slots for this date.</p>
              )}
              <button
                onClick={() => setShowSlotPopup(false)}
                className="mt-4 bg-gray-700 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </>
  );
};

export default CoachAppointmentPage;
