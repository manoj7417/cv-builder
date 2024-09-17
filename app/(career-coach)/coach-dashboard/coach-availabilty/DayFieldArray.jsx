/** @format */

import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { FiPlus } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const DayFieldArray = ({
  control,
  watch,
  dayIndex,
  timeSlot,
  availabilityStatus,
  getFilteredTimeSlots,
  shouldRun,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `availability.${dayIndex}`,
  });

  // Run the logic only if shouldRun is true and availabilityStatus is true
  if (!shouldRun || !availabilityStatus) return null;

  const availability = watch(`availability.${dayIndex}`);

  const getLastSecondSelectedTime = () => {
    const lastField = availability[availability.length - 1];
    return lastField?.secondSelectedTime || "";
  }; // Only show when availabilityStatus is true

  return (
    <div className="w-full">
      {fields.map((item, index) => {
        const firstSelectedTime = watch(
          `availability.${dayIndex}.${index}.firstSelectedTime`
        );

        // Filter times for second slot based on the first selected time
        const filteredTimeSlots = getFilteredTimeSlots(firstSelectedTime);

        return (
          <div
            key={item.id}
            className="time_slot flex gap-10 items-center justify-between lg:ml-5 ml-0 mb-3"
          >
            <div className="flex lg:gap-4 gap-1 items-center">
              {/* First Time Select */}
              <div className="flex-1">
                <Controller
                  control={control}
                  name={`availability.${dayIndex}.${index}.firstSelectedTime`}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
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
                  control={control}
                  name={`availability.${dayIndex}.${index}.secondSelectedTime`}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {filteredTimeSlots.map((time, idx) => (
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

              {/* Remove Button */}
              {fields.length > 1 && index > 0 ? (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 flex items-center"
                >
                  <MdDeleteOutline className="text-base mr-1" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const lastSecondTime = getLastSecondSelectedTime();
                    append({
                      firstSelectedTime: lastSecondTime || "", // Prefill with last secondSelectedTime
                      secondSelectedTime: "",
                    });
                  }}
                  className="text-blue-950 flex items-center text-sm"
                >
                  <FiPlus className="mr-1 text-base" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayFieldArray;
