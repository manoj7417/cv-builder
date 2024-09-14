"use client";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const CoachAvailabilty = () => {

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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

  const { control, handleSubmit } = useForm({
    defaultValues: {
      availability: [{ firstSelectedTime: "", secondSelectedTime: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  // State to track the switch status
  const [isAvailable, setIsAvailable] = useState(false);

  // Function to handle switch toggle
  const handleSwitchChange = () => {
    setIsAvailable(!isAvailable); // Toggle the availability
  };

  // Helper function to find the next available time slot after the selected time
  const getNextTimeSlot = (time) => {
    const timeIndex = timeSlot.indexOf(time);
    return timeIndex >= 0 && timeIndex < timeSlot.length - 1
      ? timeSlot[timeIndex + 1]
      : null;
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-5xl mx-auto border-2 border-gray-200 p-5 relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="available flex items-center gap-4">
          {/* Switch and Day Label */}
          <div className="flex items-center gap-2">
            <Switch
              className="bg-gray-300"
              checked={isAvailable}
              onCheckedChange={handleSwitchChange}
            />
            <p className="text-gray-800 font-semibold">Sunday</p>
          </div>

          {/* Time Slot Selections */}
          {isAvailable && (
            <div className="w-full">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="time_slot flex gap-10 items-center justify-between ml-5 mb-3"
                >
                  {/* First Time Select */}
                  <div className="flex gap-4 items-center">
                    <Controller
                      control={control}
                      name={`availability.${index}.firstSelectedTime`}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
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
                    {/* Second Time Select */}
                    <Controller
                      control={control}
                      name={`availability.${index}.secondSelectedTime`}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
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
                    {/* Remove Button */}
                    {fields.length > 1 && index > 0 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-600 flex items-center"
                      >
                        <MdDeleteOutline className="text-base mr-1" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        append({
                          firstSelectedTime: "",
                          secondSelectedTime: "",
                        })
                      }
                      className="text-black px-4 py-2 rounded flex items-center text-sm"
                    >
                      <FiPlus className="mr-1 text-base" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="submit_button absolute top-0 right-10">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded mt-5 text-sm"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CoachAvailabilty;
