/** @format */

import Header from "./Header";
import SidebarCoach from "./sidebarCoach";
export const metadata = {
  title: "Coach Dashboard",
  description: "Coach Dashboard.",
};
const Layout = ({ children }) => {
  return (
    <main className="w-full flex">
      <div className="w-full md:w-[16%] lg:w-[20%] lg:sticky fixed top-0 lg:h-screen h-auto z-50">
        <SidebarCoach className="w-full" />
      </div>
      <div className="w-full md:w-[84%] lg:w-[80%] bg-white h-auto z-10">
        {children}
      </div>
    </main>
  );
};

export default Layout;
