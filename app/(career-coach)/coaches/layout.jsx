/** @format */

import { ResumeHeader } from "@/app/Layout/ResumeHeader";
import Footer from "../../Layout/Footer";
export const metadata = {
  title: "Career Coaches & Counselling: Genies Career Hub",
  description:
    " Find your Career Path, or effectively enhance present one, with ease through our platform by connecting with best Career Coaches from across the globe.",
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
