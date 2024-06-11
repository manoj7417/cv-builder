import React, { useState } from "react";

const TabMenu = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab.label)}
            className={`px-4 py-2 focus:outline-none rounded-xl border-2 mx-1 ${
              activeTab === tab.label ? " border-blue-700 bg-blue-700 text-white font-semibold" : ""
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
      <div className="p-4">
        {tabs.map((tab) =>
          activeTab === tab.label ? <div key={tab.label}>{tab.content}</div> : null
        )}
      </div>
    </div>
  );
};

export default TabMenu;
