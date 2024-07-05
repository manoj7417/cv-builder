"use client";
import React from "react";

export const metadata = {
  title: "Advanced CV Maker | Build Your Resume Instantly ",
  description:
    "Try our Resume Builder to create your resume with perfection and build a flawless Curriculum Vitae application profile. Explore more features of CV Maker here.  ",
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
