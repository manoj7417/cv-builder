"use client";
import React from "react";



const Layout = ({ children }) => {
  return (
    <main className="resume_dashboard">
      <div className="resume_dashboard_container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
