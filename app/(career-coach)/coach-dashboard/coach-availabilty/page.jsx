"use client";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import TimeZone from "./TimeZone";
import DateOverrides from "./DateOverrides";
import axios from "axios";
import { GetTokens } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ImSpinner3 } from "react-icons/im";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MdDeleteOutline } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCoachStore } from "@/app/store/coachStore";
import { toast } from "react-toastify";

const CoachAvailability = () => {
  const { userdata } = useCoachStore(state => state.userState)
  const [dateOverridesData, setDateOverridesData] = useState(null);
  const [dateOverrides, setDateOverrides] = useState([])
  const [isupdatingdata, setIsUpdatingData] = useState(false)
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
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM"
  ];

  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const defaultAvailabilityDays = daysOfWeek.map((day) => ({
    dayOfWeek: day,
    isAvailable: false,
    slots: [{ startTime: "9:00 AM", endTime: "5:00 PM" }],
  }));

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      availabilityDays: userdata?.availability?.dates?.length > 0 ? userdata.availability.dates : defaultAvailabilityDays,
      timeZone: currentTimeZone,
    },
  });


  const watchAvailabilityDays = watch("availabilityDays")

  const handleSwitchChange = (i) => {
    const updatedDays = [...watchAvailabilityDays];
    updatedDays[i].isAvailable = !updatedDays[i].isAvailable;
    setValue("availabilityDays", updatedDays);
  };

  const handleDateOverridesUpdate = (data) => {
    setDateOverridesData(data);
  };

  const onSubmit = async (data) => {
    const dates = data.availabilityDays
    setIsUpdatingData(true)
    const { accessToken } = await GetTokens()
    const result = {
      dates,
      timeZone: data.timeZone,
      dateOverrides,
    };
    try {
      const response = await axios.patch("/api/updateCoachAvailability", result, {
        headers: {
          Authorization: `Bearer ${accessToken?.value}`
        }
      })
      if (response.status === 200) {
        toast.success("Availability updated")
      }
    } catch (error) {
      toast.error("Error updating availability")
    } finally {
      setIsUpdatingData(false)
    }
  };

  const getFilteredTimeSlots = (selectedTime) => {
    if (!selectedTime) return timeSlot;
    const selectedIndex = timeSlot.indexOf(selectedTime);
    return timeSlot.filter((_, idx) => idx > selectedIndex);
  };


  const getLastEndTime = (dayIndex, index) => {
    const slotLength = watchAvailabilityDays[dayIndex]?.slots.length - 1
    const lastField = watchAvailabilityDays[dayIndex]?.slots[slotLength];
    return lastField?.endTime || "";
  };

  const handleAddSlots = (dayIndex, index) => {
    const lastEndTime = getLastEndTime(dayIndex, index);
    const updatedDays = [...watchAvailabilityDays];
    updatedDays[dayIndex].slots.push({
      startTime: lastEndTime,
      endTime: "",
    });
    setValue("availabilityDays", updatedDays);
  };

  const handleDeleteSlot = (dayIndex, slotIndex) => {
    const updatedDays = [...watchAvailabilityDays];
    updatedDays[dayIndex].slots.splice(slotIndex, 1);
    setValue("availabilityDays", updatedDays);
  };




  const handleSelectChange = (index, fieldName, value, dayIndex) => {
    setValue(`availabilityDays.${dayIndex}.slots.${index}.${fieldName}`, value);
  };

  const GetendTimeSlots = (time) => {
    const selectedTimeIndex = timeSlot.findIndex((slot) => slot === time);
    if (selectedTimeIndex === -1) return [];
    const availableEndTimes = timeSlot.slice(selectedTimeIndex + 1);
    return availableEndTimes
  }


  return (
    <div className="w-full mx-auto mt-18 lg:p-10 p-5 lg:h-full h-[750px] lg:overflow-hidden overflow-y-scroll relative">
      <div className="main_heading my-5 mt-10">
        
        <h1 className="text-xl text-blue-950 font-bold">Time Availabilty</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex lg:flex-row flex-col gap-5">
          <div className="lg:w-[70%] w-full form_calendar">
            <div className="calendar_section rounded-md border-2 border-gray-200 p-5">
              {watchAvailabilityDays.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className="available flex lg:flex-row flex-col lg:gap-0 gap-5 items-start mb-4"
                  style={{
                    minHeight: "55px",
                    transition: "min-height 0.3s ease, height 0.3s ease",
                  }}
                >
                  <div className="flex items-center gap-2 w-[200px]">
                    <Switch
                      className="bg-gray-300"
                      checked={day.isAvailable}
                      onCheckedChange={() => handleSwitchChange(dayIndex)}
                    />
                    <p className="text-gray-800 font-semibold">{day.dayOfWeek}</p>
                  </div>

                  {
                    day.isAvailable &&
                    <div className="w-full">
                      {day.slots.map((slot, index) => (
                        <div
                          key={slot.id}
                          className="time_slot flex gap-10 items-center justify-between lg:ml-5 ml-0 mb-3"
                        >
                          <div className="flex lg:gap-4 gap-1 items-center">
                            <div className="flex-1">
                              <Controller
                                name={`availability.${dayIndex}.slots.${index}.startTime`}
                                control={control}
                                render={({ field }) => (
                                  <Select {...field} value={slot.startTime} onValueChange={(value) => handleSelectChange(index, 'startTime', value, dayIndex)}>
                                    <SelectTrigger className="w-[150px]">
                                      <SelectValue placeholder="Select a time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {timeSlot.map((time, idx) => (
                                          <SelectItem key={idx} value={time}>
                                            {time}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>

                            {/* Second Time Select */}
                            <div className="flex-1">
                              <Controller
                                name={`availability.${dayIndex}.slots.${index}.endTime`}
                                control={control}
                                render={({ field }) => (
                                  <Select {...field} value={slot.endTime} onValueChange={(value) => handleSelectChange(index, 'endTime', value, dayIndex)}>
                                    <SelectTrigger className="w-[150px]">
                                      <SelectValue placeholder="Select a time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {GetendTimeSlots(slot.startTime, dayIndex).map((time, idx) => (
                                          <SelectItem key={idx} value={time}>
                                            {time}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>

                            <TooltipProvider>
                              {day.slots.length > 0 && index > 0 ? (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteSlot(dayIndex, index)}
                                      className="text-red-600 flex items-center justify-center hover:bg-gray-100 p-2 rounded-md"
                                      aria-label="Delete time slot"
                                    >
                                      <MdDeleteOutline className="text-xl" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Delete time slot</p>
                                  </TooltipContent>
                                </Tooltip>
                              ) : (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      type="button"
                                      onClick={() => handleAddSlots(dayIndex, index)}
                                      className="text-blue-950 flex items-center justify-center hover:bg-gray-100 p-2 rounded-md"
                                      aria-label="Add time slot"
                                    >
                                      <FiPlus className="text-xl" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Add time slot</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </TooltipProvider>
                          </div>
                        </div>
                      ))
                      }
                    </div >
                  }
                </div>
              ))}
            </div>
            <div className="date_overrides mt-10">
              <DateOverrides
                timeSlot={timeSlot}
                getFilteredTimeSlots={getFilteredTimeSlots}
                onUpdateOverrides={handleDateOverridesUpdate}
                dateOverrides={dateOverrides}
                setDateOverrides={setDateOverrides}
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

        <div className="submit_button absolute top-10 right-10">
          <Button
            type="submit"
            disabled={isupdatingdata}
            className="bg-blue-950 text-white px-5 py-2"
          >
            {
              isupdatingdata ?
                <>Saving <ImSpinner3 className="animate-spin text-xl ml-2" /></> :
                "Save"
            }
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CoachAvailability;
