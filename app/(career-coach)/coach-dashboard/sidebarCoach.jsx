"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SidebarCoach = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-full sticky top-0">
      {/* Mobile Hamburger Menu Button */}
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={toggleSidebar}
      >
        <Image
          src="/icons/hamburger-icon.png" // Replace with your hamburger icon path
          alt="Menu"
          width={30}
          height={30}
        />
      </button>

      {/* Sidebar for Mobile and Desktop */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 bg-[#E0F2FF] p-4 transition-transform duration-300 ease-in-out z-50 w-full`}
      >
        {/* Close button for mobile sidebar */}
        <button
          className="md:hidden mb-4 focus:outline-none"
          onClick={toggleSidebar}
        >
          <Image
            src="/icons/close-icon.png" // Replace with your close icon path
            alt="Close"
            width={24}
            height={24}
          />
        </button>

        {/* Profile Section */}
        <div className="flex items-center mb-6 w-full">
          <div className="w-20 h-auto overflow-hidden rounded-full">
            <Image
              src="/coach_photos.png" // Replace with your profile image path
              alt="Profile Image"
              width={64} // Width should match the container's width
              height={64} // Height should match the container's height
              className="object-cover"
            />
          </div>
          <div className="ml-2">
            <p className="font-semibold text-gray-800">Kevin Gilbert</p>
            <p className="text-gray-600">Web Designer Coach</p>
          </div>
        </div>

        <nav>
          <ul className="space-y-4">
            {/* Highlighted Dashboard Item with Custom Icon */}
            <li className="flex items-center p-3 rounded-full bg-white text-blue-500 cursor-pointer">
              <Link href="/coach-dashboard" className="flex items-center">
                <Image
                  src="/coach_dashboard.png" // Replace with your custom icon path
                  alt="Dashboard Icon"
                  width={24}
                  height={24}
                  className="mr-3"
                />
                <span className="font-semibold text-gray-800">Dashboard</span>
              </Link>
            </li>
            {/* Other Items with Custom Icons */}
            <li className="flex items-center p-3 rounded-full hover:bg-white hover:text-blue-500 cursor-pointer">
              <Link href="/coach-dashboard/coach-blog" className="flex items-center">
                <Image
                  src="/blog_icon.png" // Replace with your custom icon path
                  alt="Blog Icon"
                  width={24}
                  height={24}
                  className="mr-3"
                />
                <span className="font-semibold text-gray-800">Blog</span>
              </Link>
            </li>
            <li className="flex items-center p-3 rounded-full hover:bg-white hover:text-blue-500 cursor-pointer">
              <Link href={"/coach-appointment"} className="flex items-center">
                <Image
                  src="/coach_personal_detail_icon.png" // Replace with your custom icon path
                  alt="Appointments Icon"
                  width={24}
                  height={24}
                  className="mr-3"
                />
                <span className="font-semibold text-gray-800">
                  Appointments
                </span>
              </Link>
            </li>
            <li className="flex items-center p-3 rounded-full hover:bg-white hover:text-blue-500 cursor-pointer">
              <Link href={"/coach-dashboard/coach-details"} className="flex items-center">
                <Image
                  src="/coach_personal_detail_icon.png" // Replace with your custom icon path
                  alt="Personal Details Icon"
                  width={24}
                  height={24}
                  className="mr-3"
                />
                <span className="font-semibold text-gray-800">
                  Personal Details
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarCoach;
