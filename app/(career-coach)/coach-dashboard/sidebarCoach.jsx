/** @format */

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FiLogOut } from "react-icons/fi";
import { FaKey, FaUser } from "react-icons/fa";
import { LuUserSquare2 } from "react-icons/lu";
import { IoDocumentsOutline } from "react-icons/io5";
import { GetTokens, RemoveTokens } from "@/app/actions";
import { MdDashboard, MdEventAvailable } from "react-icons/md";
import { CgLoadbarDoc } from "react-icons/cg";
import { toast } from "react-toastify";
import axios from "axios";
import { useCoachStore } from "@/app/store/coachStore";

const SidebarCoach = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);
  const router = useRouter();
  const { updateUserData } = useCoachStore();
  const { userdata } = useCoachStore(state => state.userState)
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSetActiveTab = (tab) => {
    setActiveTab(tab);
    setIsOpen(false); // Close sidebar on mobile after link click
  };

  // Function to apply active class based on activeTab
  const getLinkClass = (tab) => {
    return activeTab === tab
      ? "flex items-center p-3 rounded-md bg-[#1D4ED8] text-white cursor-pointer text-sm shadow-md font-bold w-full"
      : "flex items-center p-3 text-gray-500 rounded-md hover:bg-gray-200 cursor-pointer text-sm text-blue-700 font-bold w-full";
  };

  const handleLogout = async () => {
    try {
      await RemoveTokens()
      toast.success("Logged out")
      router.push('/coach-signin')
    } catch (error) {
      console.log(error)
    }
  }

  const handleAccountRequest = async () => {
    const { accessToken, refreshToken } = await GetTokens();
    const data = {
      accessToken: accessToken?.value,
      refreshToken: refreshToken?.value
    }
    try {
      const response = await axios.post("/api/coachAccount", data);
      if (response.status === 200) {
        updateUserData(response.data.data.userdata)
      }
    } catch (error) {
      console.log(error?.response?.data?.error)
      await RemoveTokens()
      toast.error("Error loggin in")
      router.push('/coach-signin')
    }
  }

  useEffect(() => {
    handleAccountRequest()
  }, [])

  return (

    <div className="flex lg:h-full h-auto lg:sticky lg:top-0 relative pb-5 shadow-xl">
      {/* Mobile Hamburger Menu Button */}
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={toggleSidebar}
      >
        <HiMenu className="w-8 h-8" />
      </button>

      {/* Sidebar for Mobile and Desktop */}
      <div
        className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 bg-white p-4 transition-transform duration-300 ease-in-out z-50 w-full`}
      >
        {/* Close button for mobile sidebar */}
        <div className="flex justify-end mr-5 md:hidden">
          <button
            className=" mb-4 focus:outline-none cursor-pointer"
            onClick={toggleSidebar}
          >
            <IoMdClose className="w-8 h-8" />
          </button>
        </div>
        <div className="dashboard_logo p-5 mb-5">
          <Image src="/admin-logo.png" alt="logo" width={200} height={200} className="w-[90%]" />
        </div>
        {/* Links for the pages  */}
        <nav className=" space-y-5 py-8">
          <ul className="space-y-4 lg:w-full">
            {/* Highlighted Dashboard Item with Custom Icon */}
            <li className={getLinkClass("/coach-dashboard")}>
              <Link
                href='/coach-dashboard'
                className='flex items-center w-full'
                onClick={() => handleSetActiveTab("/coach-dashboard")}>
                <MdDashboard className="text-xl mr-3" />
                Dashboard
              </Link>
            </li>
            {/* <li className={getLinkClass("/coach-dashboard/coach-details")}>
              <Link
                href={"/coach-dashboard/coach-details"}
                onClick={() =>
                  handleSetActiveTab("/coach-dashboard/coach-details")
                }
                className='flex items-center w-full'>
                <FaUser className="text-xl mr-3" />
                Coach
              </Link>
            </li>
            <li className={getLinkClass("/coach-dashboard/coach-blog")}>
              <Link
                href='/coach-dashboard/coach-blog'
                className='flex items-center w-full'
                onClick={() =>
                  handleSetActiveTab("/coach-dashboard/coach-blog")
                }>
                <CgLoadbarDoc className="text-xl mr-3" />
                Blog
              </Link>
            </li> */}
            <li className={getLinkClass("/coach-dashboard/coach-availabilty")}>
              <Link
                href={"/coach-dashboard/coach-availabilty"}
                className='flex items-center w-full'
                onClick={() =>
                  handleSetActiveTab("/coach-dashboard/coach-availabilty")
                }>
                <MdEventAvailable className="text-xl mr-3" />
                Availability
              </Link>
            </li>
            <li className={getLinkClass("/coach-dashboard/coach-profile")}>
              <Link
                href={"/coach-dashboard/coach-profile"}
                className='flex items-center w-full'
                onClick={() =>
                  handleSetActiveTab("/coach-dashboard/coach-profile")
                }>
                <MdEventAvailable className="text-xl mr-3" />
                 My Profile
              </Link>
            </li>
          </ul >
        </nav >
        {/* Profile Section */}
        < div className="flex items-center justify-between  absolute bottom-0 min-w-[200px] " >
          <TooltipProvider>
            <img
              src={userdata?.profilePicture || "/avatar.jpg"} // Replace with your profile image path
              alt="Profile Image"
              width={52} // Width should match the container's width
              height={52} // Height should match the container's height
              className="object-cover h-10 w-10"
            />
            <div>
              <p className="font-semibold text-gray-800 text-base">
                {userdata?.name}
              </p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800" onClick={handleLogout}>
                  <FiLogOut className="w-5 h-5" />
                  <span className="sr-only">Logout</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div >
      </div >
    </div >
  );
};

export default SidebarCoach;
