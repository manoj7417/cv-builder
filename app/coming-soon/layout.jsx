import Footer from "../Layout/Footer"
import Header from "../Layout/Header";
import NewResumeHeader from "../Layout/NewResumeHeader"
import { useUserStore } from "../store/UserStore";

const Layout = ({ children }) => {


  const userState = useUserStore((state) => state.userState);

    return (
      <main className="resume_dashboard" >
        <div className="resume_dashboard_container">
          <div className="wrapper">
          {userState?.isAuthenticated ? <NewResumeHeader /> : <Header/>}
            {children}
            <Footer/>
          </div>
        </div>
      </main>
    )
  }
  
  export default Layout