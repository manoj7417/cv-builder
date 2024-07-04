import Footer from "../Layout/Footer";
export const metadata = {
  title: "Online Career Counselling | Business, Job and Career Coach ",
  description:
    "Try out the Resume Professional Career Counselling available at Genies Career Hub Job and Career Coach for Resume Help and other Job Counselling services. ",
};
const Layout = ({ children }) => {
  return (
    <main className="resume_dashboard">
      <div className="resume_dashboard_container">
        <div className="wrapper">
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Layout;
