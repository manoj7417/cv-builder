import Footer from "../Layout/Footer"
import NewResumeHeader from "../Layout/NewResumeHeader"
import {ResumeHeader} from "../Layout/ResumeHeader"
export const metadata = {
  title: "About Us: Genies Career Hub",
  description:
    "Know everything about Genies Career Hub and its services. Create a stellar resume, take psychometric tests, find a Coach or consult AI Career Coach and more.",
};

const Layout = ({ children }) => {
    return (
      <main className="resume_dashboard" >
        <div className="resume_dashboard_container">
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