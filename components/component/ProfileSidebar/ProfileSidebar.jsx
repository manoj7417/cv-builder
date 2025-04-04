"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FaHistory, FaRegUserCircle, FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { HiMenuAlt1 } from "react-icons/hi";
import { FaCircleChevronRight } from "react-icons/fa6";

function ProfileSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: "/settings/profile", label: "Profile", icon: <FaRegUserCircle /> },
    {
      href: "/settings/cvanalysis",
      label: "Analyser History",
      icon: <FaHistory />,
    },
    {
      href: "/settings/pyschometric-test",
      label: "Psychometric Test",
      icon: <FaHistory />,
    },
    // { href: '', label: "Subscription" } // Update href as needed
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="icon lg:hidden block absolute top-24 left-2">
        <FaCircleChevronRight
          className="text-black text-3xl cursor-pointer animate-bounce"
          onClick={toggleSidebar}
        />
      </div>
      <div
        className={`fixed lg:top-0 top-18 rounded-md left-0 h-full z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:w-1/6`}
        aria-label="Sidebar"
      >
        <div className="w-full flex justify-between items-start px-3 py-5">
          <h1 className="text-2xl text-black font-bold ml-3">Settings</h1>
          <div className="close_icon lg:hidden block">
            <FaTimes
              className="text-xl"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
        </div>
        <div className="h-full px-3 py-4 overflow-y-auto bg-white ">
          <ul className="space-y-2 font-medium">
            {links.map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center px-4 p-2 my-2 rounded-lg hover:bg-gray-100 group h-10 ${
                    pathname === href
                      ? "text-black border-r-8 border-blue-900 shadow-md rounded-tl-lg rounded-bl-lg rounded-none"
                      : "text-gray-900"
                  }`}
                >
                  {icon}
                  <span className="ms-3">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProfileSidebar;
