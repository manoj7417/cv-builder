/** @format */

import { ResumeHeader } from "@/app/Layout/ResumeHeader";
import Footer from "../../Layout/Footer";
export const metadata = {
  title: "Expert Career Advisor for Career Change and Life Coach ",
  description:
    "Choose Career Counselling and Coach and get help from a professional job and career advisor on how to proceed with Career Change, Resume Services, and more.",
  alternates: {
    canonical: "https://www.geniescareerhub.com/coaches",
  },
};
const Layout = ({ children }) => {
  return (
    <main className='resume_dashboard'>
      <div className='resume_dashboard_container'>
        <div className='wrapper'>
          <ResumeHeader />
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Layout;
