import Footer from "../../Layout/Footer";
export const metadata = {
  title: "Coach Appointment",
  description:
    "Coach Appointment.",
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