import Footer from "../Layout/Footer"
import NewResumeHeader from "../Layout/NewResumeHeader"
export const metadata = {
  title: "Refund Policy : Genies Career Hub",
  description:
    "Seeking a Refund for your recent purchase? Check our policies regarding refunds and get all the necessary information you must know before requesting a refund.",
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