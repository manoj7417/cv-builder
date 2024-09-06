import Header from "./(AdminSidebar)/header";
import HeaderMobile from "./(AdminSidebar)/header-mobile";
import SideNav from "./(AdminSidebar)/Sidebar";

const Layout = ({ children }) => {
  return (
    <main className="resume_dashboard">
      <div className="resume_dashboard_container">
        <div className="flex">
          <SideNav />
          <main className="flex-1">
            <div className="flex flex-col md:ml-60 sm:border-r sm:border-zinc-700 min-h-screen">
              <Header />
              <HeaderMobile />
              <div className="flex flex-col pt-2 px-4 space-y-2 bg-zinc-100 flex-grow pb-4">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
};

export default Layout;
