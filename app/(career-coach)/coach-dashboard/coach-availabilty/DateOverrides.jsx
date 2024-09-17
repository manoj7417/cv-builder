import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";

const DateOverrides = ({ timeSlot, getFilteredTimeSlotss }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedDatesTimes, setSelectedDatesTimes] = useState({});
  const { control } = useForm();

  // Function to determine if a date should be disabled
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    return date < today;
  };

  const handleDateSelect = (dates) => {
    setSelected(dates);
    const newDatesTimes = {};
    dates.forEach((date) => {
      const dateKey = date.toDateString(); // Ensure a unique key for each date
      if (!selectedDatesTimes[dateKey]) {
        newDatesTimes[dateKey] = {
          firstSelectedTime: "",
          secondSelectedTime: "",
        };
      } else {
        newDatesTimes[dateKey] = selectedDatesTimes[dateKey];
      }
    });
    setSelectedDatesTimes(newDatesTimes);
  };

  const handleTimeChange = (fieldName, value) => {
    const updatedDatesTimes = { ...selectedDatesTimes };
    Object.keys(updatedDatesTimes).forEach((dateKey) => {
      updatedDatesTimes[dateKey][fieldName] = value;
    });
    setSelectedDatesTimes(updatedDatesTimes);
  };

  // Helper function to get available second time slots based on first selected time
  const getFilteredSecondTimeSlots = (firstSelectedTime) => {
    const firstTimeIndex = timeSlot.indexOf(firstSelectedTime);
    if (firstTimeIndex !== -1) {
      // Return time slots that are after the selected first time
      return timeSlot.slice(firstTimeIndex + 1);
    }
    return [];
  };

  // Determine the first selected time across all selected dates (if any)
  const firstSelectedTime =
    Object.values(selectedDatesTimes)[0]?.firstSelectedTime || "";

  return (
    <>
      <div className="main_title">
        <h2 className="text-base font-bold text-black">Date overrides</h2>
        <p className="text-sm">
          Add dates when your availability changes from your daily hours.
        </p>
        <div className="date_button">
          <button
            className="bg-black text-white px-4 py-2 rounded mt-5 text-sm flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus />
            Add an override
          </button>
          {/* ShadCN Dialog */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-3xl border-none">
              <DialogHeader>
                <DialogTitle>Select the dates to override</DialogTitle>
              </DialogHeader>
              <div className="flex w-full justify-center">
                <div className="lg:w-[50%] w-full calendar">
                  <Calendar
                    mode="multiple"
                    selected={selected}
                    onSelect={handleDateSelect}
                    classNames={{
                      day_today: "border border-blue-950",
                      day_selected:
                        "bg-blue-700 text-white hover:bg-blue-700 rounded-sm",
                    }}
                    disabled={isDateDisabled}
                    defaultMonth={new Date()}
                    fromDate={new Date()}
                  />
                </div>
                <div className="lg:w-[50%] w-full select_time">
                  <h3 className="text-sm text-black my-2">
                    Which hours are you free?
                  </h3>
                  {/* Display time selection only once for all selected dates */}
                  {selected.length > 0 && (
                    <div>
                      <div className="flex gap-4">
                        {/* First Time Select */}
                        <div className="flex-1">
                          <Controller
                            control={control}
                            name="firstSelectedTime"
                            render={({ field }) => (
                              <Select
                                onValueChange={(value) =>
                                  handleTimeChange("firstSelectedTime", value)
                                }
                                value={firstSelectedTime}
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
                            name="secondSelectedTime"
                            render={({ field }) => (
                              <Select
                                onValueChange={(value) =>
                                  handleTimeChange("secondSelectedTime", value)
                                }
                                value={
                                  Object.values(selectedDatesTimes).find(
                                    (time) => time.secondSelectedTime
                                  )?.secondSelectedTime || ""
                                }
                              >
                                <SelectTrigger className="w-[150px]">
                                  <SelectValue placeholder="Select a time" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {getFilteredSecondTimeSlots(
                                      firstSelectedTime
                                    ).map((time, idx) => (
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
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default DateOverrides;
