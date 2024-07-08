import Footer from "../Layout/Footer"
import NewResumeHeader from "../Layout/NewResumeHeader"
export const metadata = {
  title: "Returns Policy: Genies Career Hub",
  description:
    "Want to register a return or exchange an unwanted purchase? Check out terms, conditions, and policies for returns for complete details regarding your purchase.",
};

const Layout = ({ children }) => {
    return (
      <main className="terms_condition" >
        <div className="terms_condition_container">
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