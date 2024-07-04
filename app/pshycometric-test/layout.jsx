import Footer from "../Layout/Footer";
export const metadata = {
  title: "Take a Psychometric Career Test and Decode Your Career Line ",
  description:
    "Opt for a personality assessment test at Genies Career and answer aptitude questions through the Career exam to find out exactly what profession yo must choose! ",
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
