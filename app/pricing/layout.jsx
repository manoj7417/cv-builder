import Footer from "../Layout/Footer";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  title: "Pricing: Genies Career Hub",
  description:
    "Love what we have to offer? Check out Pricing quotation for Genies Career Hub and all the distinctive plans. Opt for the best plan and pay with convenience.",
    alternates: {
      canonical: "https://www.geniescareerhub.com/pricing",
    },
};

const Layout = ({ children }) => {
  return (
    <main className="terms_condition">
      <div className="terms_condition_container">
        <div className="wrapper">
          <ResumeHeader/>
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Layout;
