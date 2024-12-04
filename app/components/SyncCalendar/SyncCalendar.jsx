import { GetTokens } from "@/app/actions";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

function SyncCalendar({ calendarEvents, setCalendarEvents }) {
  const { data: session, status } = useSession();
  const [apiCalled, setApiCalled] = useState(false);

  const convertGoogleCalendarDataToFullCalendarEvents = (calendarData) => {
    console.log(calendarData);
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
        attendees: event.attendees?.map((attendee) => ({
          email: attendee.email,
          responseStatus: attendee.responseStatus,
        })) || [],
        organizer: event.organizer?.email || "Unknown Organizer", // Organizer info
        hangoutLink: event.hangoutLink || null, // Google Meet link if available
        conferenceData: event.conferenceData || null, // Additional conference data
      },
    }));
  };

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (status === "authenticated" && session?.idToken && !apiCalled) {
        setApiCalled(true);
        try {
          const response = await axios.post("/api/syncCoachCalendar", {
            idToken: session.idToken,
            accessToken: session?.user?.accessToken,
            refreshToken: session?.user?.refreshToken,
          });
          if (response.status === 200) {
            //  console.log(response.data.events)
            const formattedEvents = convertGoogleCalendarDataToFullCalendarEvents(
              response.data.events
            );
            setCalendarEvents([...calendarEvents, ...formattedEvents]);
            toast.success("Synced with Google Calendar");
          }
        } catch (error) {
          console.error("Google Login API Error:", error);
        }
      }
    };

    handleGoogleLogin();
  }, [status, session?.idToken, apiCalled]);
  return (
    <div>
      <Button type="button" onClick={() => signIn("google")}>
        <FcGoogle className="mr-2 h-4 w-4" />
        Sync calendar
      </Button>
    </div>
  );
}

export default SyncCalendar;
