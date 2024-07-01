import Footer from "../Layout/Footer";

const Layout = ({ children }) => {
  return (
    <main className="terms_condition">
      <div className="terms_condition_container">
        <div className="wrapper">
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Layout;
