'use client'
import { useContext } from "react";
import Footer from "../Layout/Footer"
import Header from "../Layout/Header";
import NewResumeHeader from "../Layout/NewResumeHeader"
import { AuthContext } from "../context/AuthContext";

const Layout = ({ children }) => {

  const { userState } = useContext(AuthContext);

    return (
      <main className="resume_analyser">
        <div className="resume_analyser_container">
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