import Footer from "../Layout/Footer";
import {ResumeHeader} from "../Layout/ResumeHeader";
export const metadata = {
  title: "Professional CV Studio: Genies Career Hub",
  description:
    "Our CV Studio is an integrated solution comprising of Curriculum Vitae Builder, ATS Resume Checker, and Professional CV Match to help you build a perfect CV.",
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
