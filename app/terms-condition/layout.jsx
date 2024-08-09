import Footer from "../Layout/Footer"
import ResumeHeader from "../Layout/ResumeHeader"
export const metadata = {
  title: "Terms and Conditions: Genies Career Hub",
  description:
    "Read the important terms and conditions of the Genies Career Hub platform as you join our community. We are dedicated to ensuring your complete satisfaction.",
};

const Layout = ({ children }) => {
    return (
      <main className="terms_condition" >
        <div className="terms_condition_container">
          <div className="wrapper">
            {children}
            <Footer/>
          </div>
        </div>
      </main>
    )
  }
  
  export default Layout