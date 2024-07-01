import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";

const Layout = ({ children }) => {
  return (
    <main className="terms_condition">
      <div className="terms_condition_container">
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
