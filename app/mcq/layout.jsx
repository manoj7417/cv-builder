/** @format */

import Footer from "../Layout/Footer";

export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Career Assessment MCQs - Test Your Skills with Genies Career Hub",
  description:
    "Challenge yourself with career-focused MCQs designed to help identify your skills, strengths, and areas for improvement. Take the next step toward your ideal career path with Genies Career Hub.",
  alternates: {
    canonical: "https://www.geniescareerhub.com/mcq",
  },
};

const Layout = ({ children }) => {
  return (
    <main className='resume_dashboard'>
      <div className='resume_dashboard_container'>
        <div className='wrapper'>
          {children}
          {/* <Footer/> */}
        </div>
      </div>
    </main>
  );
};

export default Layout;
