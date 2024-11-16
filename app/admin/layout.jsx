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
      <div className='w-full md:w-[20%] lg:w-[20%] bg-white sticky top-0 lg:h-screen h-auto z-50 min-w-[220px]'>
        <Sidebar className='w-full' />
      </div>
      <div className='w-full md:w-[80%] lg:w-[80%] bg-white h-auto z-10'>
        {children}
      </div>
    </main>
  );
};

export default Layout;
