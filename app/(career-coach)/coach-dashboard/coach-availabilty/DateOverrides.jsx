import React, { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";

const DateOverrides = ({ timeSlot, dateOverrides, setDateOverrides }) => {
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedDatesTimes, setSelectedDatesTimes] = useState({});
  const { control } = useForm();
  const [timeSlots, setTimeSlots] = useState([{
    startTime: "9:00 AM",
    endTime: "5:00 PM"
  }])


  const handleDialogClose = () => {
    setSelected([])
    setTimeSlots([{
      startTime: "9:00 AM",
      endTime: "5:00 PM"
    }])
    setIsModalOpen(false)
  }

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateSelect = (dates) => {
    setSelected(dates);
    const newDatesTimes = {};
    dates.forEach((date) => {
      const dateKey = date.toDateString();
      if (!selectedDatesTimes[dateKey]) {
        newDatesTimes[dateKey] = [
          { firstSelectedTime: "", secondSelectedTime: "" },
        ];
      } else {
        newDatesTimes[dateKey] = selectedDatesTimes[dateKey];
      }
    });
    setSelectedDatesTimes(newDatesTimes);
  };

  const handleTimeChange = (fieldName, value, index) => {
    const updatedSlots = timeSlots.map((slot, i) => {
      if (i === index) {
        slot[fieldName] = value;
      }
      return slot;
    })
    setTimeSlots(updatedSlots)
  };

  const addTimeSlot = () => {
    const i = timeSlots.length - 1
    const updateTimeSlots = [...timeSlots, {
      startTime: timeSlots[i].endTime,
      endTime: ""
    }
    ]
    setTimeSlots(updateTimeSlots)
  };
  const removeTimeSlot = (index) => {
    const updateTimeSlots = timeSlots.filter((_, i) => i !== index)
    setTimeSlots(updateTimeSlots)
  };

  const getFilteredSecondTimeSlots = (firstSelectedTime) => {
    const firstTimeIndex = timeSlot.indexOf(firstSelectedTime);
    if (firstTimeIndex !== -1) {
      return timeSlot.slice(firstTimeIndex + 1);
    }
    return [];
  };

  const handleSaveChanges = () => {
    const modifiedData = selected.map(date => ({
      date: date,
      slots: timeSlots
    }));
    setDateOverrides(modifiedData)
    handleDialogClose();
    toast.info("Date Overrides updated");
  };

  const handleDeleteDateOverride = (i) => {
    const newDateOverRides = dateOverrides.filter((_, index) => index !== i);
    setDateOverrides(newDateOverRides);
  }

  const handleEditDateOverride = (i) => {
    const dateOverride = dateOverrides[i];
    setSelected([dateOverride.date])
    setTimeSlots(dateOverride.slots)
    setIsModalOpen(true);
  }

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

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-3xl border-none" onClick={handleDialogClose}>
              <DialogHeader>
                <DialogTitle className="text-blue-950 ">
                  Select the dates to override
                </DialogTitle>
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
                        "bg-blue-700 text-white hover:bg-blue-700  rounded-md",
                    }}
                    disabled={isDateDisabled}
                    defaultMonth={new Date()}
                    fromDate={new Date()}
                  />
                </div>
                <div className="lg:w-[50%] w-full select_time">
                  {selected.length > 0 && (
                    <h3 className="text-sm text-black my-2">
                      Which hours are you free?
                    </h3>
                  )}

                  {/* {selected.length > 0 &&
                    Object.keys(selectedDatesTimes).map((dateKey) => (
                      <div key={dateKey} className="my-4">
                        {selectedDatesTimes[dateKey].map((slot, index) => (
                          <div
                            key={index}
                            className="flex gap-4 mb-2 items-center"
                          >
                            <div className="flex-1">
                              <Controller
                                control={control}
                                name={`firstSelectedTime-${index}`}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={(value) =>
                                      handleTimeChange(
                                        "firstSelectedTime",
                                        value,
                                        index,
                                        dateKey
                                      )
                                    }
                                    value={slot.firstSelectedTime}
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
                                name={`secondSelectedTime-${index}`}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={(value) =>
                                      handleTimeChange(
                                        "secondSelectedTime",
                                        value,
                                        index,
                                        dateKey
                                      )
                                    }
                                    value={slot.secondSelectedTime}
                                  >
                                    <SelectTrigger className="w-[150px]">
                                      <SelectValue placeholder="Select a time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {getFilteredSecondTimeSlots(
                                          slot.firstSelectedTime
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
                                onClick={() => removeTimeSlot(dateKey, index)}
                                className="text-red-500"
                              >
                                <FaTrashAlt className="text-sm" />
                              </button>
                            ) : (
                              <button
                                onClick={() => addTimeSlot(dateKey)}
                                className="text-black flex items-center gap-1"
                              >
                                <FaPlus className="text-sm" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ))} */}
                  {selected.length > 0 && (
                    <div className="my-4">
                      {/* Render a single set of time slots for all selected dates */}
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
                        timeSlots.map((slot, index) => (
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
                                      handleTimeChange(
                                        "endTime",
                                        value,
                                        index
                                      )
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
                                onClick={() =>
                                  removeTimeSlot(
                                    index
                                  )
                                }
                                className="text-red-500"
                              >
                                <FaTrashAlt className="text-sm" />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  addTimeSlot(
                                    index
                                  )
                                }
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
                </div >
              </div >
              <DialogFooter>
                <Button
                  type="button"
                  className="bg-blue-950 text-white"
                  onClick={handleSaveChanges}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent >
          </Dialog >
        </div >
        <div className="show_dataoverrides rounded-md p-5 mt-5">
          {dateOverrides.length > 0 && dateOverrides.map((date, index) => (
            <div key={index} className="shadow-md px-3 py-4 flex rounded-md">
              <div className="w-1/2">
                <p className="font-bold text-gray-600">{date.date.toDateString()}</p>
                {
                  date.slots.map((slot, index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-500"><span>{slot.startTime}</span> - <span>{slot.endTime}</span></p>
                    </div>
                  ))
                }
              </div>
              <div className="w-1/2 flex justify-end items-center">
                <Button className="bg-none hover:bg-gray-100 hover:shadow-sm" onClick={() => handleDeleteDateOverride(index)}><RiDeleteBin5Line className="text-red-500 text-xl" /></Button>
                <Button className="bg-none hover:bg-gray-100 ml-2 hover:shadow-sm"> <MdOutlineModeEditOutline className="text-blue-500 text-xl" onClick={() => handleEditDateOverride(index)} /></Button>
              </div>
            </div>
          ))}
        </div>
      </div >
    </>
  );
};

export default DateOverrides;
