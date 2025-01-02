/** @format */

"use client";
import React, { useState, useEffect } from "react";
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GetTokens } from "@/app/actions";
import axios, { all } from "axios";
import { useRouter } from "next/navigation";
import SyncCalendar from "@/app/components/SyncCalendar/SyncCalendar";

const CoachCalendar = () => {
  const [bookingSlot, setBookingSlot] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const router = useRouter();

  const handleGetBookings = async () => {
    const { accessToken } = await GetTokens(true);
    console.log("accessToken", accessToken);
    if (!accessToken || !accessToken.value) {
      return router.push("/coach-signin?redirect=/coach-dashboard/coach-calendar");
    }
    try {
      const response = await axios.get("/api/bookings", {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        const bookings = handleConvertBookingDataFormat(response.data.bookings);
        const googleEvents = convertGoogleCalendarDataToFullCalendarEvents(
          response.data.googleEvents
        );
        if (bookings.length > 0) {
          setCalendarEvents([ ...googleEvents, ...bookings]);
          return;
        }
        setCalendarEvents([...googleEvents]);
      }
    } catch (error) {}
  };

  const convertGoogleCalendarDataToFullCalendarEvents = (calendarData) => {
    return calendarData.map((event, index) => ({
      id: event.id,
      title: event.summary || "Untitled Event",
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      url: event.htmlLink,
      backgroundColor: index % 2 === 0 ? "#f5a623" : "#4caf50", // Alternating background colors
      borderColor: index % 2 === 0 ? "#f5a623" : "#4caf50", // Alternating border colors
      textColor: "#fff", // Text color
      allDay: Boolean(event.start.date), // True if it's an all-day event
      extendedProps: {
        attendees:
          event.attendees?.map((attendee) => ({
            email: attendee.email,
            responseStatus: attendee.responseStatus,
          })) || [],
        organizer: event.organizer?.email || "Unknown Organizer", // Organizer info
        hangoutLink: event.hangoutLink || null, // Google Meet link if available
        conferenceData: event.conferenceData || null, // Additional conference data
      },
    }));
  };

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00"; // 12 AM is 00 in 24-hour format
    }

    if (modifier === "PM" && hours !== "12") {
      hours = String(parseInt(hours, 10) + 12); // Convert PM to 24-hour format
    }

    // Ensure hours and minutes are always two digits
    hours = hours.padStart(2, "0");
    minutes = minutes.padStart(2, "0");

    return `${hours}:${minutes}:00`;
  };

  const handleConvertBookingDataFormat = (data) => {
    const events = data.map((event, index) => ({
      title: `${event.userId.fullname}`,
      start: `${event.date.split("T")[0]}T${convertTo24Hour(
        event.slotTime.startTime
      )}`,
      end: `${event.date.split("T")[0]}T${convertTo24Hour(
        event.slotTime.endTime
      )}`,
      backgroundColor: index % 2 === 0 ? "#f5a623" : "#4caf50",
      borderColor: index % 2 === 0 ? "#f5a623" : "#4caf50",
      textColor: "#fff",
      allDay: false,
    }));
    if (events.length > 0) {
      return events;
    }
    return [];
  };

  useEffect(() => {
    handleGetBookings();
  }, []);

  return (
    <>
      <div>
        <div className=" w-full px-10 justify-start items-start gap-8">
          <div className="py-2 flex justify-end">
            <SyncCalendar
              calendarEvents={calendarEvents}
              setCalendarEvents={setCalendarEvents}
            />
          </div>
          <div className="w-full mx-auto mt-8">
            <FullCalendar
              height={"85vh"}
              themeSystem="standard"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              initialEvents={calendarEvents}
              events={calendarEvents}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachCalendar;
