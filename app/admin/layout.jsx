/** @format */

import AdminHeader from "./(AdminSidebar)/AdminHeader";
import Sidebar from "./(AdminSidebar)/Sidebar";
export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard.",
};
const Layout = ({ children }) => {
  return (
    <main className='w-full flex'>
      <div className='w-full md:w-[16%] lg:w-[16%] bg-white sticky top-0 lg:h-screen h-auto z-50 min-w-[220px]'>
        <Sidebar className='w-full' />
      </div>
      <div className='w-full md:w-[84%] lg:w-[84%] bg-white h-auto z-10'>
        {children}
      </div>
    </main>
  );
};

export default Layout;
