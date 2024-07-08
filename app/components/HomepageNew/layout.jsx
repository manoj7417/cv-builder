"use client";
import React from "react";

export const metadata = {
  title: "Professional CV Templates for Perfect CVs on Genies CV Maker",
  description:
    "Find best Curriculum Vitae Template and Career Assistance on top CV Maker and CV Library Website, Genies Career Hub and create your CV best fit for Job Role.",
};
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
