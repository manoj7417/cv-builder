import React, { useState } from "react";

const TabMenu = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div className=" px-20 ">
      <div
        className="border-b mx-8 my-4 w-full flex justify-center flex-wrap gap-4 pb-5"
        style={{ scrollbarWidth: "none" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab.label)}
            className={`px-4 py-2 focus:outline-none rounded-full mx-1 transition duration-300 ${
              activeTab === tab.label
                ? "bg-blue-600 text-white font-semibold border-blue-600"
                : "bg-gray-100 text-gray-600 hover:bg-blue-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-b-lg mx-8 ">
        {tabs.map((tab) =>
          activeTab === tab.label ? (
            <div
              key={tab.label}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {tab.content.map((job, index) => (
                <div
                  key={index}
                  className="p-4 shadow-md rounded-md bg-white hover:bg-blue-50 transition duration-300 text-gray-600 font-semibold "
                >
                  <img
                    src="/se.webp"
                    alt={job.title}
                    className="w-full object-cover rounded-t-md mb-2"
                  />
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold mb-2">{job}</h3>
                    <button className="tnbutton">
                      <svg className="svgIcon" viewBox="0 0 384 512">
                        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
                      </svg>
                    </button>
                  </div>
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
