'use client'
import Footer from "../Layout/Footer"
import Header from "../Layout/Header";
import NewResumeHeader from "../Layout/NewResumeHeader"


const Layout = ({ children }) => {



  return (
    <main className="resume_dashboard">
      <div className="resume_dashboard_container">
        <div className="wrapper">
          
          {children}
          <Footer />
        </div>
      </div>
    </main>
  )
}

export default Layout