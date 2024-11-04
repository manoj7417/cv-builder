/** @format */

import AdminHeader from "./(AdminSidebar)/AdminHeader";
import Sidebar from "./(AdminSidebar)/Sidebar";
export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard.",
};
const Layout = ({ children }) => {
  return (
    <main className='resume_dashboard'>
      <div className='resume_dashboard_container'>
        <div className='wrapper'>
          <div id='mainDiv' className='flex flex-col h-screen'>
            {/* START-HEADER */}
            {/* <AdminHeader className='w-full' /> */}
            {/* END-HEADER */}
            <div className='flex flex-1 flex-col md:flex-row'>
              {/* Sidebar */}
              <div
                id='sidebarCoach'
                className='w-full md:w-[20%] lg:w-[20%] min-w-[220px] shadow-2xl  sticky top-0 lg:h-screen h-auto z-50'>
                {/* Sidebar content goes here */}
                <Sidebar className='w-full' />
              </div>
              {/* Main Content */}
              <div
                id='mainContent'
                className='w-full md:w-[80%] lg:w-[80%]  bg-[#E0F2FF] bg-gradient-to-r from-[#D9EBFE] via-[#D9EBFE] to-white  z-10'>
                {/* Coach Dashboard content goes here */}
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
