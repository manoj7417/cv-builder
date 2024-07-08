import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import ResumeHeader from "../Layout/ResumeHeader";
export const metadata = {
  title: "Contact the Genies Career Hub Support Team",
  description:
    "Looking for more or seeking a solution for your education problems? Contact Us personally and get more information and support on Genies Career Hub now.",
};

const Layout = ({ children }) => {
  return (
    <main className="resume_dashboard">
      <div className="resume_dashboard_container">
        <div className="wrapper">
          <NewResumeHeader />
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Layout;
