import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  title: "GDPR Policy: Genies Career Hub",
  description:
    "We completely comply with the General Data Protection Regulation GDPR. Read about the protection of your personal data and information at Genies Career Hub.",
};

const Layout = ({ children }) => {
  return (
    <main className="terms_condition">
      <div className="terms_condition_container">
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
