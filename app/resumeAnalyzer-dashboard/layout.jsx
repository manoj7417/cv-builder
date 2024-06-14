'use client'
import { useContext } from "react";
import Footer from "../Layout/Footer"
import dynamic from "next/dynamic";
const Header = dynamic(()=> import("../Layout/Header"),{ssr:false})
const NewResumeHeader = dynamic(()=>import("../Layout/NewResumeHeader"),{ssr:false})


const Layout = ({ children }) => {

    return (
      <main className="resume_analyser">
        <div className="resume_analyser_container">
          <div className="wrapper">
            {children}
            <Footer/>
          </div>
        </div>
      </main>
    )
  }
  
  export default Layout