'use client'
import Footer from "../Layout/Footer"
import Header from "../Layout/Header";
import NewResumeHeader from "../Layout/NewResumeHeader"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = ({ children }) => {

  const { userState } = useContext(AuthContext);

    return (
      <main className="resume_dashboard">
        <div className="resume_dashboard_container">
          <div className="wrapper">
            {userState?.isAuthenticated ? <NewResumeHeader /> : <Header />}
            {children}
            <Footer/>
          </div>
        </div>
      </main>
    )
  }
  
  export default Layout