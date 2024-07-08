import Footer from "../Layout/Footer"
import NewResumeHeader from "../Layout/NewResumeHeader"
export const metadata = {
  title: "Cookies & Tracking Policy: Genies Career Hub",
  description:
    "Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information.",
};

const Layout = ({ children }) => {
    return (
      <main className="terms_condition" >
        <div className="terms_condition_container">
          <div className="wrapper">
            <NewResumeHeader/>
            {children}
            <Footer/>
          </div>
        </div>
      </main>
    )
  }
  
  export default Layout