import React, { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import CalendarComponent from "./CalendarComponent";
import SingleSelectCalendar from "./SingleSelectCalendar";
import axios from "axios";
import { GetTokens } from "@/app/actions";

const DateOverrides = ({ timeSlot, dateOverrides, setDateOverrides }) => {
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control } = useForm();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [mode, setMode] = useState("multiple");
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentSelectedDates, setCurrentSelectedDates] = useState([]);
  const [selectedDatesTimes, setSelectedDatesTimes] = useState([
    {
      startTime: "9:00 AM",
      endTime: "5:00 PM",
    },
  ]);
  const [singleSelectDate, setSingleSelectDate] = useState(null);

  const handleTimeChange = (fieldName, value, index) => {
    const updatedSlots = selectedDatesTimes.map((slot, i) => {
      if (i === index) {
        slot[fieldName] = value;
      }
      return slot;
    });
    setSelectedDatesTimes(updatedSlots);
  };

  const addTimeSlot = () => {
    const i = selectedDatesTimes.length - 1;
    const updateTimeSlots = [
      ...selectedDatesTimes,
      {
        startTime: selectedDatesTimes[i].endTime,
        endTime: "",
      },
    ];
    setSelectedDatesTimes(updateTimeSlots);
  };
  const removeTimeSlot = (index) => {
    const updateTimeSlots = selectedDatesTimes.filter((_, i) => i !== index);
    setSelectedDatesTimes(updateTimeSlots);
  };

  const getFilteredSecondTimeSlots = (firstSelectedTime) => {
    const firstTimeIndex = selectedDatesTimes.findIndex(
      (slot) => slot.startTime === firstSelectedTime
    );
    if (firstTimeIndex !== -1) {
      return timeSlot.slice(firstTimeIndex + 1);
    }
    return [];
  };

  const handlesaveDateOverrides = async (newDateOverrides) => {
    const mergedOverrides = [...dateOverrides, ...newDateOverrides];
    const sortedOverrides = mergedOverrides.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setDateOverrides(sortedOverrides);
    await handleUpdateDateOverride(sortedOverrides);
  };

  const handleSaveChanges = () => {
    const newDateOverRides = currentSelectedDates.map((date) => ({
      date,
      slots: selectedDatesTimes,
      isUnavailable,
    }));
    handlesaveDateOverrides(newDateOverRides);
    handleDialogClose();
  };

  const handleDeleteDateOverride = async (i) => {
    const newDateOverRides = dateOverrides.filter((_, index) => index !== i);
    setDateOverrides(newDateOverRides);
    await handleUpdateDateOverride(newDateOverRides);
  };

  const handleEditDateOverride = (i) => {
    const dateOverride = dateOverrides[i];
    setSingleSelectDate(dateOverride.date);
    setSelectedDatesTimes(dateOverride.slots);
    setIsUnavailable(dateOverride.isUnavailable);
    setMode("single");
    setIsModalOpen(true);
  };

  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
  };

  const handleDialogClose = () => {
    setCurrentSelectedDates([]);
    setSelectedDatesTimes([
      {
        startTime: "9:00 AM",
        endTime: "5:00 PM",
      },
    ]);
    setCurrentMonth(new Date());
    setIsModalOpen(false);
    setIsUnavailable(false);
    setMode("multiple");
  };

  const UpdateOverrideDate = async (date, newDate, slots, isUnavailable) => {
    const newDateOverRides = dateOverrides.map((dateOverride, index) => {
      if (dateOverride.date === date) {
        return {
          ...dateOverride,
          date: newDate,
          slots: slots,
          isUnavailable: isUnavailable,
        };
      }
      return dateOverride;
    });
    const sortedOverrides = newDateOverRides.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setDateOverrides(sortedOverrides);
    await handleUpdateDateOverride(sortedOverrides);
  };

  const handleupdateOverride = () => {
    UpdateOverrideDate(
      singleSelectDate,
      currentSelectedDates[0],
      selectedDatesTimes,
      isUnavailable
    );
    handleDialogClose();
  };

  const handleUpdateDateOverride = async (data) => {
    const { accessToken } = await GetTokens(true);
    try {
      const response = await axios.patch("/api/updatedateOverride", data, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        toast.success("Date override updated");
      }
    } catch (error) {
      toast.error("Error updating date override");
    }
  };

  return (
    <>
      <div className="main_title">
        <h2 className="text-base font-bold text-blue-950">Date overrides</h2>
        <p className="text-sm text-gray-500">
          Add dates when your availability changes from your daily hours.
        </p>
        <div className="date_button">
          <button
            className="bg-blue-950 text-white px-4 py-2 rounded mt-5 text-sm flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
            type="button"
          >
            <FaPlus />
            Add an override
          </button>

          <Dialog open={isModalOpen}>
            <DialogContent
              className="max-w-3xl border-none"
              onClick={handleDialogClose}
              showCloseButton={true}
            >
              <DialogHeader>
                <DialogTitle className="text-blue-950 ">
                  Select the dates to override
                </DialogTitle>
              </DialogHeader>
              <div className="flex w-full lg:flex-row flex-col justify-center">
                <div className="lg:w-[50%] w-full calendar">
                  {mode === "multiple" ? (
                    <CalendarComponent
                      currentMonth={currentMonth}
                      handleMonthChange={handleMonthChange}
                      mode={mode}
                      selectedDates={selectedDates}
                      setSelectedDates={setSelectedDates}
                      selectedDatesTimes={selectedDatesTimes}
                      setSelectedDatesTimes={setSelectedDatesTimes}
                      currentSelectedDates={currentSelectedDates}
                      setCurrentSelectedDates={setCurrentSelectedDates}
                      handleSaveChanges={handleSaveChanges}
                      dateOverrides={dateOverrides}
                    />
                  ) : (
                    <SingleSelectCalendar
                      currentMonth={currentMonth}
                      currentSelectedDates={currentSelectedDates}
                      dateOverrides={dateOverrides}
                      handleMonthChange={handleMonthChange}
                      setCurrentSelectedDates={setCurrentSelectedDates}
                    />
                  )}
                </div>
                <div className="lg:w-[50%] w-full select_time">
                  {currentSelectedDates.length > 0 && (
                    <h3 className="text-sm text-black my-2">
                      Which hours are you free?
                    </h3>
                  )}

                  {currentSelectedDates.length > 0 && (
                    <div className="my-4">
                      {isUnavailable ? (
                        <div className="mt-4">
                          <input
                            type="text"
                            placeholder="Unavailable all day"
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                          />
                        </div>
                      ) : (
                        selectedDatesTimes.map((slot, index) => (
                          <div
                            key={index}
                            className="flex gap-4 mb-2 items-center"
                          >
                            <div className="flex-1">
                              <Controller
                                control={control}
                                name={`startTime-${index}`}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={(value) =>
                                      handleTimeChange(
                                        "startTime",
                                        value,
                                        index
                                      )
                                    }
                                    value={slot.startTime}
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

                            <div className="flex-1">
                              <Controller
                                control={control}
                                name={`endTime-${index}`}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={(value) =>
                                      handleTimeChange("endTime", value, index)
                                    }
                                    value={slot.endTime}
                                  >
                                    <SelectTrigger className="w-[150px]">
                                      <SelectValue placeholder="Select a time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {getFilteredSecondTimeSlots(
                                          slot.startTime
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

                            {index > 0 ? (
                              <button
                                onClick={() => removeTimeSlot(index)}
                                className="text-red-500"
                              >
                                <FaTrashAlt className="text-sm" />
                              </button>
                            ) : (
                              <button
                                onClick={() => addTimeSlot(index)}
                                className="text-blue-950 flex items-center gap-1"
                              >
                                <FaPlus className="text-sm" />
                              </button>
                            )}
                          </div>
                        ))
                      )}
                      {/* Mark unavailable toggle */}
                      <div className="mark_unavailable flex gap-2 mt-10">
                        <Switch
                          className="bg-gray-300"
                          checked={isUnavailable}
                          onCheckedChange={(checked) =>
                            setIsUnavailable(checked)
                          }
                        />
                        <p className="text-sm">Mark unavailable (All day)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter className="flex gap-5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDialogClose}
                >
                  Cancel
                </Button>
                {currentSelectedDates.length > 0 ? (
                  mode === "multiple" ? (
                    <Button
                      type="button"
                      className="bg-blue-950 text-white"
                      onClick={handleSaveChanges}
                    >
                      Save changes
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="bg-blue-950 text-white"
                      onClick={handleupdateOverride}
                    >
                      Update override
                    </Button>
                  )
                ) : null}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="show_dataoverrides rounded-md p-5 mt-5">
          {dateOverrides.length > 0 &&
            dateOverrides.map((date, index) => (
              <div key={index} className="shadow-md px-3 py-4 flex rounded-md">
                <div className="w-1/2">
                  <p className="font-bold text-gray-600">
                    {dayjs(date.date).format("dddd, MMMM D")}
                  </p>
                  {date.isUnavailable
                    ? "Unavailable"
                    : date.slots.map((slot, index) => (
                        <div key={index}>
                          <p className="text-sm text-gray-500">
                            <span>{slot.startTime}</span> -{" "}
                            <span>{slot.endTime}</span>
                          </p>
                        </div>
                      ))}
                </div>
                <div className="w-1/2 flex justify-end items-center">
                  <Button
                    type="button"
                    className="bg-white hover:bg-gray-100 hover:shadow-sm"
                    onClick={() => handleDeleteDateOverride(index)}
                  >
                    <RiDeleteBin5Line className="text-red-500 text-xl" />
                  </Button>
                  <Button
                    type="button"
                    className="bg-white hover:bg-gray-100 ml-2 hover:shadow-sm"
                    onClick={() => handleEditDateOverride(index)}
                  >
                    {" "}
                    <MdOutlineModeEditOutline className="text-blue-500 text-xl" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default DateOverrides;
