import Footer from "../Layout/Footer"
import { ResumeHeader } from "../Layout/ResumeHeader"
export const metadata = {
  title: " Privacy Policy Details | Genies Career Hub",
  description:
    "Check out the Privacy Policy details of the Genies Career Hub to know everything about how we collect, use, and share your personal information and data.",
    alternates: {
      canonical: "https://www.geniescareerhub.com/privacy-policy", // Adding the canonical URL
    },
};

const Layout = ({ children }) => {
    return (
      <main className="terms_condition" >
        <div className="terms_condition_container">
          <div className="wrapper">
            <ResumeHeader/>
            {children}
            <Footer/>
          </div>
        </div>
      </main>
    )
  }
  
  export default Layout