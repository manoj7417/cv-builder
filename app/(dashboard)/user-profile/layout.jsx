import { ResumeHeader } from "@/app/Layout/ResumeHeader"
import Footer from "../../Layout/Footer"
import NewResumeHeader from "../../Layout/NewResumeHeader"


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