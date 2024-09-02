import Footer from "../../Layout/Footer";
export const metadata = {
  title: "Coach Details ",
  description:
    "Coach Details.",
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