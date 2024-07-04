"use client";
import Footer from "../Layout/Footer";

export const metadata = {
  title: "Best Resumé Template, CV Building Tool, & CV Enhancer",
  description:
    "Create a Resume for Freshers with Resume Generator, Resume Editor, and Resume Enhancer at Genies Career Hub and skyrocket your chances of getting dream job. ",
};
const Layout = ({ children }) => {
  return (
    <main className="resume_dashboard">
      <div className="resume_dashboard_container">
        <div className="wrapper">
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Layout;
