import { ResumeHeader } from "@/app/Layout/ResumeHeader"
import Footer from "../../Layout/Footer"
import NewResumeHeader from "../../Layout/NewResumeHeader"
import ProfileSidebar from "@/components/component/ProfileSidebar"


const Layout = ({ children }) => {
  return (
    <main className="resume_dashboard" >
      <div className="resume_dashboard_container">
        <div className="wrapper">
          <ResumeHeader />
          <div className=" h-screen w-full pt-20 px-10 flex border bg-slate-100">
            <div className=" w-full flex rounded-2xl overflow-hidden justify-between">
              <ProfileSidebar />
              <div className="w-4/5 h-full border rounded-2xl bg-white overflow-auto overflow-x-hidden">
                {children}
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </main>
  )
}

export default Layout