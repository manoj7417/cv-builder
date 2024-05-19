import Footer from "@/app/Layout/Footer"
import NewResumeHeader from "@/app/Layout/NewResumeHeader"


const Layout = ({ children }) => {
    return (
      <main className="resume_dashboard" >
        <div className="resume_dashboard_container">
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