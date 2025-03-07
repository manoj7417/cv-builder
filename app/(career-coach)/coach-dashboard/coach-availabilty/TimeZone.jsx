/** @format */

import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import moment from "moment-timezone";

const TimeZone = ({ value, onChange }) => {
  const [timeZones, setTimeZones] = useState([]);
  const [filteredZones, setFilteredZones] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [defaultTimeZone, setDefaultTimeZone] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const zones = moment.tz.names().map((zone) => {
      const offset = moment.tz(zone).format("Z"); // Get the GMT offset (e.g., "+05:00")
      const zoneLabel = `(GMT${offset}) ${zone}`; // Format as (GMT+05:00) Indian/Maldives
      return { zone, label: zoneLabel };
    });

    setTimeZones(zones);
    setFilteredZones(zones);

    // Get the user's default timezone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setDefaultTimeZone(userTimeZone);
    onChange(userTimeZone); // Set the default value to user's timezone
  }, [onChange]);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredZones(timeZones);
    } else {
      const filtered = timeZones.filter((zoneObj) =>
        zoneObj.label.toLowerCase().includes(query)
      );
      setFilteredZones(filtered);
    }
  };

  // Handle selection
  const handleSelect = (zone) => {
    onChange(zone);
    setOpen(false); // Close the dropdown after selection
  };

  return (
    <div>
      <div className="time_zone_heading mb-2">
        <h1 className="text-base font-bold text-blue-950">TimeZone</h1>
      </div>

      {/* Popover for better dropdown control */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[300px] justify-start">
            {value ? (
              <span>
                {timeZones.find((tz) => tz.zone === value)?.label || value}
              </span>
            ) : (
              "Select your timezone"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-2">
          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search timezone..."
            value={searchQuery}
            onChange={handleSearch}
            className="mb-2"
          />

          {/* Scrollable List */}
          <ScrollArea className="h-60">
            {filteredZones.length > 0 ? (
              filteredZones.map((zoneObj, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-blue-100 rounded-md text-sm"
                  onClick={() => handleSelect(zoneObj.zone)}
                >
                  {zoneObj.label}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500 text-sm">No results found</div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimeZone;
