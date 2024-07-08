import React from "react";

export const metadata = {
  title: "Professional CV Creators, Resume Coach, and Curriculum Vitae",
  description:
    "Build best professional curriculum vitae with Professional CV Creators, Resume Coach, and Job Description relevant CVs with Genies Career Hub’s Pro CV Match.",
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
