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

const DateOverrides = ({ timeSlot, onUpdateOverrides }) => {
  const [dateOverridesData, setDateOverridesData] = useState(null);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedDatesTimes, setSelectedDatesTimes] = useState({});
  const { control } = useForm();

  console.log("dateOverridesData", dateOverridesData);

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

  const handleTimeChange = (fieldName, value, index, dateKey) => {
    const updatedDatesTimes = { ...selectedDatesTimes };
    updatedDatesTimes[dateKey][index][fieldName] = value;
    setSelectedDatesTimes(updatedDatesTimes);
  };

  const addTimeSlot = (dateKey) => {
    const updatedDatesTimes = { ...selectedDatesTimes };
    const previousSlot = updatedDatesTimes[dateKey].slice(-1)[0];
    const newFirstSelectedTime = previousSlot.secondSelectedTime || ""; // Use the second time of the previous slot

    updatedDatesTimes[dateKey].push({
      firstSelectedTime: newFirstSelectedTime, // Set the first time of the new slot
      secondSelectedTime: "",
    });

    setSelectedDatesTimes(updatedDatesTimes);
  };
  const removeTimeSlot = (dateKey, index) => {
    const updatedDatesTimes = { ...selectedDatesTimes };
    updatedDatesTimes[dateKey].splice(index, 1);
    setSelectedDatesTimes(updatedDatesTimes);
  };

  const getFilteredSecondTimeSlots = (firstSelectedTime) => {
    const firstTimeIndex = timeSlot.indexOf(firstSelectedTime);
    if (firstTimeIndex !== -1) {
      return timeSlot.slice(firstTimeIndex + 1);
    }
    return [];
  };

  const handleSaveChanges = () => {
    const data = {
      selectedDates: selected,
      selectedDateTimeSlots: selectedDatesTimes,
      isUnavailableAllDay: isUnavailable,
    };
    setDateOverridesData(data);
    onUpdateOverrides(data); // Send data to parent component
    setIsModalOpen(false);
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
          >
            <FaPlus />
            Add an override
          </button>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-3xl border-none">
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
                        "bg-blue-700 text-white hover:bg-blue-700 rounded-sm",
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
                        selectedDatesTimes[
                          Object.keys(selectedDatesTimes)[0]
                        ]?.map((slot, index) => (
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
                                        Object.keys(selectedDatesTimes)[0]
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
                                        Object.keys(selectedDatesTimes)[0]
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
                                onClick={() =>
                                  removeTimeSlot(
                                    Object.keys(selectedDatesTimes)[0],
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
                                    Object.keys(selectedDatesTimes)[0]
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
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  className="bg-blue-950 text-white"
                  onClick={handleSaveChanges}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="show_dataoverrides border-2 border-gray-500 rounded-md p-5 mt-5">
          {dateOverridesData?.selectedDateTimeSlots && (
            <div>
              {Object.keys(dateOverridesData?.selectedDateTimeSlots).map((date) => (
                <div key={date}>
                  <p className="font-semibold">{date}</p>
                  {dateOverridesData?.selectedDateTimeSlots[date].map((slot, index) =>
                    // Only show the time slot if both times are selected
                    slot.firstSelectedTime && slot.secondSelectedTime ? (
                      <p key={index}>
                        {slot.firstSelectedTime} - {slot.secondSelectedTime}
                      </p>
                    ) : null
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DateOverrides;
