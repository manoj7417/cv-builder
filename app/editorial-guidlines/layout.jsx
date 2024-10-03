import Footer from "../Layout/Footer"
import NewResumeHeader from "../Layout/NewResumeHeader"
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  title: "Editorial Guidlines: Genies Career Hub",
  description:
    "Know everything about the Brand’s style, structure, and strategy consistency of the Genies Career Hub as you join our prestigious community of Professionals.",
    alternates: {
      canonical: "https://www.geniescareerhub.com/editorial-guidlines",
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