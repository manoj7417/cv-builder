import React from "react";
export const metadata = {
  title: "Professional CV Builder | Expert Curriculum Vitae Format",
  description:
    "Check out the best curriculum vitae templates that follow industry-standard CV Format and create your resume in minutes with our Curriculum Vitae CV Builder.",
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
