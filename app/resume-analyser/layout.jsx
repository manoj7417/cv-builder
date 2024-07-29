import Footer from "../Layout/Footer"
import NewResumeHeader from "../Layout/NewResumeHeader"
import ResumeHeader from "../Layout/ResumeHeader"
import { useContext } from "react";

const Layout = ({ children }) => {
    return (
      <main className="resume_dashboard">
        <div className="resume_dashboard_container">
          <div className="wrapper">
            <ResumeHeader/>
            {/* <NewResumeHeader/> */}
            {children}
            <Footer/>
          </div>
        </div>
      </main>
    )
  }
  
  export default Layout