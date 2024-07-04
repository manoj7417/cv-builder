import React from "react";

export const metadata = {
  title: "Genies Pro Intelligent AI Based CV Match and CV Creators  ",
  description:
    "Match your job role with best professional curriculum vitae by Genies Career Hub’s CV Match services and AI-based CV Creators for impressive job application.  ",
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
