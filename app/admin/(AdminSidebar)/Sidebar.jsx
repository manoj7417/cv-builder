/** @format */

"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { FaKey } from "react-icons/fa";
import { LuUserSquare2 } from "react-icons/lu";
import { IoDocumentsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);

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
      ? "flex items-center p-3 rounded-md bg-[#1D4ED8] text-white cursor-pointer"
      : "flex items-center p-3 text-gray-500 rounded-md hover:bg-[#1D4ED8] hover:text-white cursor-pointer";
  };

  return (
    <div className="flex lg:h-full h-auto lg:sticky lg:top-0 relative p-5">
      {/* Mobile Hamburger Menu Button */}
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={toggleSidebar}
      >
        <HiMenu className="w-8 h-8" />
      </button>

      {/* Sidebar for Mobile and Desktop */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 bg-white p-4 transition-transform duration-300 ease-in-out z-50 w-full`}
      >
        {/* Close button for mobile sidebar */}
        <div className="flex justify-end mr-5">
          <button
            className="md:hidden mb-4 focus:outline-none cursor-pointer"
            onClick={toggleSidebar}
          >
            <IoMdClose className="w-8 h-8" />
          </button>
        </div>
        <div className="dashboard_logo my-5">
          <Image src="/admin-logo.png" alt="logo" width={200} height={200} />
        </div>
        {/* Links for the pages  */}
        <nav className="px-5 py-10 space-y-5">
          <ul className="space-y-4 lg:w-full w-[65%]">
            {/* Highlighted Dashboard Item with Custom Icon */}
            <li className={getLinkClass("/admin")}>
              <Link
                href="/admin"
                className="flex items-center"
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
                className="flex items-center"
              >
                <LuUserSquare2 className="w-6 h-6 mr-4" />
                <span className="font-semibold">Coach</span>
              </Link>
            </li>
            {/* Other Items with Custom Icons */}
            <li className={getLinkClass("/admin/viewBlogs")}>
              <Link
                href="/admin/viewBlogs"
                className="flex items-center"
                onClick={() => handleSetActiveTab("/admin/viewBlogs")}
              >
                <IoDocumentsOutline className="w-6 h-6 mr-4" />
                <span className="font-semibold ">Blog</span>
              </Link>
            </li>
            <li className={getLinkClass("/admin/viewUsers")}>
              <Link
                href={"/admin/viewUsers"}
                className="flex items-center"
                onClick={() => handleSetActiveTab("/admin/viewUsers")}
              >
                <LuUserSquare2 className="w-6 h-6 mr-4" />
                <span className="font-semibold">User</span>
              </Link>
            </li>
          </ul>
        </nav>
        {/* Profile Section */}
        <div className="flex items-center justify-between mb-6 w-full absolute bottom-0 px-5">
          <div className="image_section flex items-center">
            <div className="w-16 h-auto overflow-hidden rounded-full">
              <Image
                src="/coach_photos.png" // Replace with your profile image path
                alt="Profile Image"
                width={52} // Width should match the container's width
                height={52} // Height should match the container's height
                className="object-cover"
              />
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-gray-800 text-base">
                Kevin Gilbert
              </p>
              <p className="text-gray-600 text-sm">Web Designer Coach</p>
            </div>
          </div>
          <div className="logout">
            <button className="text-gray-600 hover:text-blue-700">
              <FiLogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
