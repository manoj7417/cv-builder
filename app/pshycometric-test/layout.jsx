/** @format */

import Footer from "../Layout/Footer";
export const metadata = {
  title: "Psychometric Assesment Career Exam and Aptitude Test",
  description:
    "Take a personality assessment test, psychometric exam, and different types of personality tests to decode your professional personality & job inclination.",
  alternates: {
    canonical: "https://www.geniescareerhub.com/pshycometric-test",
  },
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
