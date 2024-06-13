import React, { useState } from "react";

const TabMenu = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div className=" px-20">
      <div className="flex border-b overflow-x-auto whitespace-nowrap mx-8 my-4" style={{ scrollbarWidth: "none" }}>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab.label)}
            className={`px-4 py-2 focus:outline-none rounded-t-lg mx-1 transition duration-300 ${
              activeTab === tab.label
                ? "bg-blue-600 text-white font-semibold border-blue-600"
                : "bg-gray-100 text-gray-600 hover:bg-blue-100"
            }`}
            style={{
              borderBottomRightRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 rounded-b-lg mx-8 bg-white shadow-md">
        {tabs.map((tab) =>
          activeTab === tab.label ? (
            <div key={tab.label} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tab.content.map((job, index) => (
                <div key={index} className="p-4 rounded-md bg-blue-50 hover:bg-blue-100 transition duration-300 text-gray-600  font-semibold shadow-sm">
                  {job}
                </div>
              ))}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default TabMenu;
