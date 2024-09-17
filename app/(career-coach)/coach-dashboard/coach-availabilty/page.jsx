"use client";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DayFieldArray from "./DayFieldArray";
import TimeZone from "./TimeZone";
import DateOverrides from "./DateOverrides";

const CoachAvailability = () => {
  const [dateOverridesData, setDateOverridesData] = useState(null);
  const [formData,setFormData] = useState();


  console.log("formData",formData)

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const timeSlot = [
    "12:00 AM",
    "12:30 AM",
    "1:00 AM",
    "1:30 AM",
    "2:00 AM",
    "2:30 AM",
    "3:00 AM",
    "3:30 AM",
    "4:00 AM",
    "4:30 AM",
    "5:00 AM",
    "5:30 AM",
    "6:00 AM",
    "6:30 AM",
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
  ];

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      availability: daysOfWeek.map(() => [
        { firstSelectedTime: "", secondSelectedTime: "" },
      ]),
      timeZone: "",
    },
  });

  // State to handle availability toggle for each day
  const [availabilityStatus, setAvailabilityStatus] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = true;
      return acc;
    }, {})
  );

  const handleSwitchChange = (day) => {
    setAvailabilityStatus((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const handleDateOverridesUpdate = (data) => {
    setDateOverridesData(data);
  };

  const onSubmit = (data) => {
    // Filter out the data for only the days where availability is toggled on
    const selectedDaysData = daysOfWeek.reduce((acc, day, index) => {
      if (availabilityStatus[day]) {
        acc[day] = data.availability[index];
      }
      return acc;
    }, {});

    const result = {
      ...selectedDaysData,
      timeZone: data.timeZone, // Adding timeZone to submission
      dateOverrides: dateOverridesData,
    };
    setFormData(result)

    // Console log only the selected day's data
    console.log("result:", result);
  };

  const getFilteredTimeSlots = (selectedTime) => {
    if (!selectedTime) return timeSlot;
    const selectedIndex = timeSlot.indexOf(selectedTime);
    return timeSlot.filter((_, idx) => idx > selectedIndex); // Only show times after the selected time
  };

  return (
    <div className="max-w-7xl mx-auto mt-18 lg:p-0 p-5 lg:h-full h-[750px] lg:overflow-hidden overflow-y-scroll relative">
      <div className="main_heading my-5 mt-10">
        <h1 className="text-xl text-blue-950 font-bold">Time Availabilty</h1>
        <p className="text-sm font-semibold text-gray-600">
          Sun - Sat, 9:00 AM - 5:00 PM
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex lg:flex-row flex-col gap-5">
          <div className="lg:w-[70%] w-full form_calendar">
            <div className="calendar_section rounded-md border-2 border-gray-200 p-5">
              {daysOfWeek.map((day, dayIndex) => (
                <div
                  key={day}
                  className="available flex lg:flex-row flex-col lg:gap-0 gap-5 items-start mb-4"
                  style={{
                    minHeight: "55px",
                    transition: "min-height 0.3s ease, height 0.3s ease",
                  }}
                >
                  {/* Switch and Day Label */}
                  <div className="flex items-center gap-2 w-[200px]">
                    <Switch
                      className="bg-gray-300"
                      checked={availabilityStatus[day]}
                      onCheckedChange={() => handleSwitchChange(day)}
                    />
                    <p className="text-gray-800 font-semibold">{day}</p>
                  </div>

                  {/* Time Slot Selections */}
                  <DayFieldArray
                    control={control}
                    watch={watch}
                    dayIndex={dayIndex}
                    timeSlot={timeSlot}
                    availabilityStatus={availabilityStatus[day]}
                    getFilteredTimeSlots={getFilteredTimeSlots}
                    shouldRun={availabilityStatus[day]}
                  />
                </div>
              ))}
            </div>
            <div className="date_overrides mt-10">
              <DateOverrides
                timeSlot={timeSlot}
                getFilteredTimeSlots={getFilteredTimeSlots}
                onUpdateOverrides={handleDateOverridesUpdate}
              />
            </div>
          </div>
          <div className="lg:w-[30%] w-full time_zone">
            <Controller
              name="timeZone" // Registering timeZone with react-hook-form
              control={control}
              render={({ field }) => (
                <TimeZone value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
        </div>

        <div className="submit_button absolute top-0 right-10">
          <button
            type="submit"
            className="bg-blue-950 text-white px-4 py-2 rounded mt-5 text-sm"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CoachAvailability;
