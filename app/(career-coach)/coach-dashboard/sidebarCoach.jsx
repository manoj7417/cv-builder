/** @format */

"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { HiMenu } from "react-icons/hi";

const SidebarCoach = () => {
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
      ? "flex items-center p-3 rounded-full bg-white text-blue-500 cursor-pointer"
      : "flex items-center p-3 rounded-full hover:bg-white hover:text-blue-500 cursor-pointer";
  };

  return (
    <div className='flex lg:h-full h-auto lg:sticky lg:top-0 relative'>
      {/* Mobile Hamburger Menu Button */}
      <button
        className='md:hidden p-4 focus:outline-none'
        onClick={toggleSidebar}>
        {/* <Image
          src="/icons/hamburger-icon.png" // Replace with your hamburger icon path
          alt="Menu"
          width={30}
          height={30}
        /> */}
        <HiMenu className='w-8 h-8' />
      </button>

      {/* Sidebar for Mobile and Desktop */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 bg-[#E0F2FF] p-4 transition-transform duration-300 ease-in-out z-50 w-full`}>
        {/* Close button for mobile sidebar */}
        <div className='flex justify-end mr-5'>
          <button
            className='md:hidden mb-4 focus:outline-none cursor-pointer'
            onClick={toggleSidebar}>
            <IoMdClose className='w-8 h-8' />
          </button>
        </div>

        {/* Profile Section */}
        <div className='flex items-center mb-6 w-full'>
          <div className='w-20 h-auto overflow-hidden rounded-full'>
            <Image
              src='/coach_photos.png' // Replace with your profile image path
              alt='Profile Image'
              width={64} // Width should match the container's width
              height={64} // Height should match the container's height
              className='object-cover'
            />
          </div>
          <div className='ml-2'>
            <p className='font-semibold text-gray-800'>Kevin Gilbert</p>
            <p className='text-gray-600'>Web Designer Coach</p>
          </div>
        </div>

        <nav>
          <ul className='space-y-4 lg:w-full w-[65%]'>
            {/* Highlighted Dashboard Item with Custom Icon */}
            <li className={getLinkClass("/coach-dashboard")}>
              <Link
                href='/coach-dashboard'
                className='flex items-center'
                onClick={() => handleSetActiveTab("/coach-dashboard")}>
                <Image
                  src='/coach_dashboard.png' // Replace with your custom icon path
                  alt='Dashboard Icon'
                  width={24}
                  height={24}
                  className='mr-3'
                />
                <span className='font-semibold text-gray-800'>Dashboard</span>
              </Link>
            </li>
            <li className={getLinkClass("/coach-dashboard/coach-details")}>
              <Link
                href={"/coach-dashboard/coach-details"}
                onClick={() =>
                  handleSetActiveTab("/coach-dashboard/coach-details")
                }
                className='flex items-center'>
                <Image
                  src='/coach_personal_detail_icon.png' // Replace with your custom icon path
                  alt='Personal Details Icon'
                  width={24}
                  height={24}
                  className='mr-3'
                />
                <span className='font-semibold text-gray-800'>Coach</span>
              </Link>
            </li>
            {/* Other Items with Custom Icons */}
            <li className={getLinkClass("/coach-dashboard/coach-blog")}>
              <Link
                href='/coach-dashboard/coach-blog'
                className='flex items-center'
                onClick={() =>
                  handleSetActiveTab("/coach-dashboard/coach-blog")
                }>
                <Image
                  src='/blog_icon.png' // Replace with your custom icon path
                  alt='Blog Icon'
                  width={24}
                  height={24}
                  className='mr-3'
                />
                <span className='font-semibold text-gray-800'>Blog</span>
              </Link>
            </li>
            <li className={getLinkClass("/coach-dashboard/coach-availabilty")}>
              <Link
                href={"/coach-dashboard/coach-availabilty"}
                className='flex items-center'
                onClick={() =>
                  handleSetActiveTab("/coach-dashboard/coach-availabilty")
                }>
                <Image
                  src='/coach_personal_detail_icon.png' // Replace with your custom icon path
                  alt='Appointments Icon'
                  width={24}
                  height={24}
                  className='mr-3'
                />
                <span className='font-semibold text-gray-800'>
                  Availability
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
