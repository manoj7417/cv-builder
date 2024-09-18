/** @format */

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { FaKey } from "react-icons/fa";
import { LuUserSquare2 } from "react-icons/lu";
import { IoDocumentsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useUserStore } from "@/app/store/UserStore";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { GetTokens, RemoveTokens } from "@/app/actions";
import { toast } from "react-toastify";
import axios from "axios";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);
  const { userdata } = useUserStore((state) => state.userState)
  const router = useRouter()
  const { updateUserData } = useUserStore()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSetActiveTab = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };


  const getLinkClass = (tab) => {
    return activeTab === tab
      ? "flex items-center p-3 rounded-md bg-[#1D4ED8] text-white cursor-pointer text-sm shadow-md"
      : "flex items-center p-3 text-gray-500 rounded-md hover:shadow-xl cursor-pointer text-sm text-blue-700";
  };

  const handleLogout = async () => {
    try {
      await RemoveTokens()
      toast.success("Logged out")
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleAccountRequest = async () => {
    const { accessToken } = await GetTokens();
    try {
      const response = await axios.get("/api/adminAccount", {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        updateUserData(response.data.data)
      }
    } catch (error) {
      await RemoveTokens()
      toast.error(error?.response?.data?.error)
      router.push('/login')
    }
  }

  useEffect(() => {
    // handleAccountRequest()
  }, [])

  return (
    <div className="flex lg:h-full h-auto lg:sticky lg:top-0 relative pb-5">
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
        <div className="dashboard_logo px-5 mb-5">
          <Image src="/admin-logo.png" alt="logo" width={200} height={200} />
        </div>
        {/* Links for the pages  */}
        <nav className=" space-y-5 py-8">
          <ul className="space-y-4 lg:w-full">
            {/* Highlighted Dashboard Item with Custom Icon */}
            <li className={getLinkClass("/admin")}>
              <Link
                href="/admin"
                className="flex items-center w-full"
                onClick={() => handleSetActiveTab("/admin")}
              >
                <FaKey className="w-4 h-4 mr-4" />
                <span className="font-semibold">Dashboard</span>
              </Link>
            </li>
            <li className={getLinkClass("/admin/coach")}>
              <Link
                href={"/admin/coach"}
                onClick={() => handleSetActiveTab("/admin/coach")}
                className="flex items-center w-full"
              >
                <LuUserSquare2 className="w-6 h-6 mr-4" />
                <span className="font-semibold">Coaches</span>
              </Link>
            </li>
            {/* Other Items with Custom Icons */}
            <li className={getLinkClass("/admin/viewBlogs")}>
              <Link
                href="/admin/viewBlogs"
                className="flex items-center w-full"
                onClick={() => handleSetActiveTab("/admin/viewBlogs")}
              >
                <IoDocumentsOutline className="w-6 h-6 mr-4" />
                <span className="font-semibold ">Blog</span>
              </Link>
            </li>
            <li className={getLinkClass("/admin/viewUsers")}>
              <Link
                href={"/admin/viewUsers"}
                className="flex items-center w-full"
                onClick={() => handleSetActiveTab("/admin/viewUsers")}
              >
                <LuUserSquare2 className="w-6 h-6 mr-4" />
                <span className="font-semibold">User</span>
              </Link>
            </li>
          </ul>
        </nav>
        {/* Profile Section */}
        <div className="flex items-center justify-between  absolute bottom-0 min-w-[200px] ">
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
                {userdata?.fullname}
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
