import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import React from "react";

function SingleSelectCalendar({
  currentSelectedDates,
  dateOverrides,
  handleMonthChange,
  currentMonth,
  setCurrentSelectedDates
}) {
  const getDayOfWeek = (date) => {
    const options = { weekday: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  const getDayOfMonth = (date) => {
    return date.getDate();
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    const isInDateOverrides = dateOverrides.some(
      (override) => override.date === formattedDate
    );

    return date < today || isInDateOverrides;
  };

  const isSameMonth = (date1, date2) => {
    return (
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleDayClick = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setCurrentSelectedDates((prevDates) => [formattedDate]);
  };
  return (
    <Calendar
      onMonthChange={handleMonthChange}
      className="rounded-md w-[300px]"
      components={{
        Day: ({ date }) => {
          const dayOfWeek = getDayOfWeek(date);
          const dayOfMonth = getDayOfMonth(date);
          const isDisabled = isDateDisabled(date);
          const isInCurrentMonth = isSameMonth(date, currentMonth);
          const isCurrentDate = dayjs().isSame(date, "day");
          const formattedDate = dayjs(date).format("YYYY-MM-DD");
          const isSelected = currentSelectedDates.includes(formattedDate);

          const dayClasses = isDisabled
            ? "text-gray-400 cursor-not-allowed bg-transparent"
            : isSelected
            ? "text-white bg-blue-500 cursor-pointer rounded-lg shadow"
            : isCurrentDate
            ? "text-gray-800 bg-gray-100/70 cursor-pointer rounded-lg shadow"
            : "text-gray-800 cursor-pointer bg-gray-100/70 shadow-sm rounded-lg";
          return isInCurrentMonth ? (
            <Button
              className={`w-9 h-9 p-2 rounded-md relative ${dayClasses}`}
              title={dayOfWeek}
              onClick={() => !isDisabled && handleDayClick(date)}
            >
              <p className="flex flex-col items-center justify-center relative">
                <span className="text-sm">{dayOfMonth}</span>
              </p>
              {isCurrentDate && (
                <span className="absolute top-7 w-1 h-1 bg-gray-500 rounded-full"></span>
              )}
            </Button>
          ) : null;
        },
      }}
    />
  );
}

export default SingleSelectCalendar;
