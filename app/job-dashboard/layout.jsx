/** @format */

import { ResumeHeader } from "@/app/Layout/ResumeHeader";
import Footer from "../Layout/Footer";


const Layout = ({ children }) => {
  return (
    <main className='resume_dashboard'>
      <div className='resume_dashboard_container'>
       
          <ResumeHeader />
          {children}
          <Footer />
      
      </div>
    </main>
  );
};

export default Layout;
