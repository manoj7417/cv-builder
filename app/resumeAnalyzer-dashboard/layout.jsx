"use client";
import { useContext } from "react";
import Footer from "../Layout/Footer";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../Layout/Header"), { ssr: false });
const NewResumeHeader = dynamic(() => import("../Layout/NewResumeHeader"), {
  ssr: false,
});

export const metadata = {
  title: "ATS CV Resume Checker Online for Best Resume Formatting  ",
  description:
    "Create an enhanced Application Tracking System ATS Friendly Resume with Genies Career Hub’s ATS Resume Checker and crack the job application code immediately.  ",
};
const Layout = ({ children }) => {
  return (
    <main className="resume_analyser">
      <div className="resume_analyser_container">
        <div className="wrapper">
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Layout;
