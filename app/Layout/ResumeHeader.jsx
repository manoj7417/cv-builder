"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import "./header.css";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "../store/UserStore";
import Link from "next/link";
import { RemoveTokens } from "../actions";
import { toast } from "react-toastify";

const menuItems = [
  {
    name: "CV Studio",
    href: "/cv-studio",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "About Us",
    href: "/about-us",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
  {
    name: "Career Coaching",
    href: "/coming-soon",
  },
];

export function ResumeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const logoutUser = useUserStore((state) => state?.logoutUser);
  const { userState } = useUserStore((state) => state);
  const userdata = userState?.userdata || {};
  const userImage = userdata?.profilePicture;

  const handleLogout = async () => {
    await RemoveTokens();
    toast.success("User logout successfully", {
      position: "top-right",
    });
    logoutUser();
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <section className="new_resume_latest z-[100] fixed" >
      <div className="header_wrapper w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <Link href={"/"}>
              <Image
                src="/genies-career-hub-logo.png"
                width={100}
                height={100}
                alt="white_logo"
                className="w-20 h-20 object-contain"
              />
            </Link>
          </div>
          <div className="hidden lg:block">
            <ul className="ml-12 inline-flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center text-base text-blue-950 font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="ml-2 hidden lg:block">
            {userState?.isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center bg-gray-200 rounded-full p-1 w-[180px] cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <span className="relative inline-block">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={
                        userdata?.profilePicture || "/profile-avatar-img.png"
                      }
                      alt="Dan_Abromov"
                    />
                  </span>
                  <div className="mx-2">
                    <div className="text-sm font-medium text-gray-900">
                      {userdata?.fullname}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {userdata?.subscription?.plan?.charAt(0).toUpperCase() + userdata?.subscription?.plan?.slice(1)}
                    </div>

                  </div>
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm">
                        <Link href="/user-profile">Profile</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm">
                        <Link href="/user-history">CV History</Link>
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="auths_button ml-2">
                <button
                  className="border-2 text-blue-950 border-gray-500 text-sm hover:cursor-pointer hover:bg-blue-950 hover:border-blue-950 hover:text-white px-6 py-1 rounded-md animate-bounce"
                  onClick={handleLogin}
                >
                  <span>Sign In</span>
                </button>
              </div>
            )}
          </div>
          <div className="ml-2 lg:hidden">
            <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
          </div>
          {isMenuOpen && (
            <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2">
                      <Link href={"/"}>
                        <Image
                          src="/genies-career-hub-logo.png"
                          width={50}
                          height={50}
                          alt="white_logo"
                          className="w-14 h-14 object-contain"
                        />
                      </Link>
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-4">
                      {menuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                        >
                          <span className="text-base font-medium text-blue-950">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                  {userState?.isAuthenticated ? (
                    <div className="mt-4 flex items-center space-x-2">
                      <div className="relative" ref={dropdownRef}>
                        <div
                          className="flex items-center bg-gray-100 rounded-full p-1 w-[180px] cursor-pointer"
                          onClick={toggleDropdown}
                        >
                          <span className="relative inline-block">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={
                                userdata?.profilePicture ||
                                "/profile-avatar-img.png"
                              }
                              alt="Dan_Abromov"
                            />
                          </span>
                          <div className="mx-2">
                            <div className="text-sm font-medium text-gray-900">
                              {userdata?.fullname}
                            </div>
                            <div className="text-[10px] text-gray-500">
                              {userdata?.fullname?.subscription?.plan}
                            </div>
                          </div>
                        </div>

                        {isDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <ul>
                              <li className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm">
                                <Link href="/user-profile">Profile</Link>
                              </li>
                              <li className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm">
                                <Link href="/user-history">CV History</Link>
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
                                onClick={handleLogout}
                              >
                                Logout
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="auths_button mt-4">
                      <button
                        className="border-2 text-blue-950 border-gray-500 text-sm hover:cursor-pointer hover:bg-blue-950 hover:border-blue-950 hover:text-white px-6 py-1 rounded-md animate-bounce"
                        onClick={handleLogin}
                      >
                        <span>Sign In</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
