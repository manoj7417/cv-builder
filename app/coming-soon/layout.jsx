/** @format */

import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";

export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Coming Soon - Exciting Career Services Await You!",
  description:
    "We're working hard to bring you innovative career services and tools. Stay tuned for our launch and get ready to explore your potential with GCH!",
  alternates: {
    canonical: "https://www.geniescareerhub.com/coming-soon",
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
