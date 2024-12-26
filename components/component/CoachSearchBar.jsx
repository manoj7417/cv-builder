import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useController } from "react-hook-form";

const CoachSearchBar = ({ name, control, options }) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: "", // Initial value for the controlled input
  });

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue); // Update React Hook Form state
    if (inputValue) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleOptionClick = (option) => {
    onChange(option); // Update React Hook Form state with selected option
    setFilteredOptions([]);
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="p-2 border rounded w-full text-gray-500 caret-blue-900"
        placeholder="Job Title / Job Role / Profession"
        style={{ zIndex: 20 }}
      />
      {filteredOptions.length > 0 && (
        <ul
          className="absolute left-0 right-0 bg-white text-gray-500 border mt-1 rounded shadow-lg z-10"
          style={{ maxHeight: "160px", overflowY: "auto" }}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoachSearchBar;
