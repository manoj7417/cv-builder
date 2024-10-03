import React from "react";
import { ResumeHeader } from "../Layout/ResumeHeader";
import Footer from "../Layout/Footer";

export const metadata = {
  title: "Professional Curriculum Vitate Match and Resume Coach",
  description:
    " Get a professional Curriculum Vitae in minutes with Genies Career Hub CV Match: intelligent CV alignment algorithm inspired by expert resume coach guidelines",
    alternates: {
      canonical: "https://www.geniescareerhub.com/job-cv",
    },
};
const Layout = ({ children }) => {
  return (
    <main className="resume_dashboard">
      <div className="resume_dashboard_container">
        <div className="wrapper">{children}</div>
        <Footer/>
      </div>
    </main>
  );
};

export default Layout;
