/** @format */

import { ResumeHeader } from "@/app/Layout/ResumeHeader";
import Footer from "../Layout/Footer";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Find Your Dream Jobs - Genies Career Hub",
  description:
    "Finding dream jobs is made easy with the interactive interface by Genies Career Hub. Now, incorporated with filters to land the best suitable job profile.",
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
