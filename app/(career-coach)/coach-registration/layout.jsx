/** @format */

import { ResumeHeader } from "@/app/Layout/ResumeHeader";
import Footer from "../../Layout/Footer";
export const metadata = {
  title: "Coach Registration and Sign-Up: Genies Career Hub",
  description:
    "Register or Sign Up as a Coach on the Genies Career Hub Coach Registration page to get started with your journey as a Career Coach on our platform.",
  alternates: {
    canonical: "https://www.geniescareerhub.com/coach-registration",
  },
};
const Layout = ({ children }) => {
  return (
    <main className='resume_dashboard'>
      <div className='resume_dashboard_container'>
        <div className='wrapper'>{children}</div>
      </div>
    </main>
  );
};

export default Layout;
