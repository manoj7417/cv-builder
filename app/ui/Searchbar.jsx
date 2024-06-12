import React, { useState } from "react";

const SearchBar = ({ options, setJobRole, jobRole }) => {
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setJobRole(value);
    if (value) {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleOptionClick = (option) => {
    setJobRole(option);
    setFilteredOptions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={jobRole}
        onChange={handleInputChange}
        className="p-2 border rounded w-full text-gray-500"
        placeholder="Keyword / Job Title / Job Role"
        style={{ zIndex: 20 }}
      />
      {filteredOptions.length > 0 && (
        <ul
          className="absolute left-0 right-0 bg-white text-gray-500 border mt-1 rounded shadow-lg z-10"
          style={{ maxHeight: '160px', overflowY: 'auto' }}
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

export default SearchBar;
