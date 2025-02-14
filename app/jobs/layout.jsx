/** @format */

import { ResumeHeader } from "@/app/Layout/ResumeHeader";
import Footer from "../Layout/Footer";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  alternates: {
    canonical: "https://www.geniescareerhub.com/jobs",
  },
};

const Layout = ({ children }) => {
  return (
    <main className="resume_dashboard">
      <div className="resume_dashboard_container">
        <div className="wrapper">
          <ResumeHeader />
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Layout;
