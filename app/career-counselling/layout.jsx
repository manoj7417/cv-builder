/** @format */

import Footer from "../Layout/Footer";
import ResumeHeader from "../Layout/ResumeHeader";

export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Personalized Career Counseling - Discover Your Path to Success",
  description:
    "Explore expert career counseling services to guide your career choices, build skills, and create a personalized path to achieve your professional goals. Get started today!",
};

const Layout = ({ children }) => {
  return (
    <main className='resume_dashboard'>
      <div className='resume_dashboard_container'>
        <div className='wrapper'>
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Layout;
