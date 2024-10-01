import Footer from "@/app/Layout/Footer";
import { ResumeHeader } from "@/app/Layout/ResumeHeader";
export const metadata = {
    title: "Genies Career Hub Blog",
    description:
      "Explore the latest articles, tips, and insights on career development, coaching, and psychometric testing at Genies Career Hub. Stay updated with our expert advice and resources.",
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