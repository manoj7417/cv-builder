import Footer from "../Layout/Footer";
import {ResumeHeader} from "../Layout/ResumeHeader";
export const metadata = {
  title: "Career Services: Genies Career Hub",
  description:
    "Looking for a Career Services, Life Coach, or anything else? Check out our services in AI Career Coaching, 1 to 1 Career Coaching, and Psychometric Test Tool",
    alternates: {
      canonical: "https://www.geniescareerhub.com/career-services", // Adding the canonical URL
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
