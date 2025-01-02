/** @format */

import { ResumeHeader } from "@/app/Layout/ResumeHeader";
import Footer from "../../Layout/Footer";
export const metadata = {
  title: "Explore Career Coach & Advisor: Genies Career Hub",
  description:
    "Sort your Life and Career with expert job and career coaching, resume services, life coach, career change advice, developing skills for life, and more",
  alternates: {
    canonical: "https://www.geniescareerhub.com/career-coaching",
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
