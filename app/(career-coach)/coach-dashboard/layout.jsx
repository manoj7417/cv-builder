import Header from "./Header";
import SidebarCoach from "./sidebarCoach";
export const metadata = {
  title: "Coach Dashboard",
  description:
    "Coach Dashboard.",
};
const Layout = ({ children }) => {
  return (
    <main className="resume_dashboard">
      <div className="resume_dashboard_container">
        <div className="wrapper">
        <div id="mainDiv" className="flex flex-col h-screen">
        {/* START-HEADER */}
        <Header className="w-full" />
        {/* END-HEADER */}
        <div className="flex flex-1 flex-col md:flex-row">
          {/* Sidebar */}
          <div
            id="sidebarCoach"
            className="w-full md:w-[20%] lg:w-[20%] bg-[#E0F2FF] sticky top-0 lg:h-screen h-auto z-50">
            {/* Sidebar content goes here */}
            <SidebarCoach className="w-full" />
          </div>
          {/* Main Content */}
          <div
            id="mainContent"
            className="w-full md:w-[80%] lg:w-[80%] bg-white z-10">
            {/* Coach Dashboard content goes here */}
            {children}
          </div>
        </div>
      </div>
          
          {/* <Footer /> */}
        </div>
      </div>
    </main>
  );
};

export default Layout;