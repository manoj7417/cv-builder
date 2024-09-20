/** @format */

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import moment from "moment-timezone";

const TimeZone = ({ value, onChange }) => {
  const [timeZones, setTimeZones] = useState([]);
  const [defaultTimeZone, setDefaultTimeZone] = useState("");

  useEffect(() => {
    // Fetch all available time zones and their offsets
    const zones = moment.tz.names().map((zone) => {
      const offset = moment.tz(zone).format("Z"); // Get the GMT offset (e.g., "+05:00")
      const zoneLabel = `(GMT${offset}) ${zone}`; // Format as (GMT+05:00) Indian/Maldives
      return { zone, label: zoneLabel };
    });
    setTimeZones(zones);

    // Get the user's default timezone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setDefaultTimeZone(userTimeZone);
    onChange(userTimeZone); // Set the default value to user's timezone
  }, [onChange]);

  return (
    <div>
      <div className='time_zone_heading mb-2'>
        <h1 className='text-base font-bold text-blue-950'>TimeZone</h1>
      </div>
      <Select value={value || defaultTimeZone} onValueChange={onChange}>
        <SelectTrigger className='w-[300px]'>
          <SelectValue placeholder='Select your timezone' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {timeZones.map((zoneObj, index) => (
              <SelectItem key={index} value={zoneObj.zone}>
                {zoneObj.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeZone;
