/** @format */

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
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { PiReadCvLogo } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";

const menuItems = [
  {
    name: "CV Studio",
    href: "/cv-studio",
  },
  {
    name: "Jobs",
    href: "/jobs",
  },
  {
    name: "Coaching",
    href: "/career-services",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
  {
    name: "About Us",
    href: "/about-us",
  },
  {
    name: "For Recruiters",
    href: "#",
    dropdown: [
      {
        name: "Post a Job",
        onClick: (router) => {
          const token = Cookies.get("token");
          if (token) {
            router.push("/recruiter/jobs/post");
          } else {
            router.push("/recruiter/signin?redirect=/recruiter/jobs/post");
          }
        },
      },
      {
        name: "Find Candidates",
        onClick: (router) => {
          const token = Cookies.get("token");
          if (token) {
            router.push("/recruiter/jobs");
          } else {
            router.push("/recruiter/signin?redirect=/recruiter/candidates");
          }
        },
      },
      {
        name: "Recruiter Login",
        onClick: (router) => router.push("/recruiter/signin"),
      },
      {
        name: "Register as Recruiter",
        onClick: (router) => router.push("/recruiter/signup"),
      },
    ],
  },
  {
    name: "Login as Coach",
    href: "/coach-signin",
    className:
      "inline-flex items-center font-bold text-base text-blue-950 font-medium hover:underline hover:underline-offset-8 hover:text-blue-600",
  },
];

const userStateDefault = {
  isAuthenticated: false,
  userdata: {
    fullname: "",
    profilePicture: "",
    subscription: {
      plan: "",
    },
  },
};

export function ResumeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const shouldHideBanner = pathname.includes("/analyser/");
  const logoutUser = useUserStore((state) => state?.logoutUser);
  const { userState = userStateDefault } = useUserStore((state) => state);
  const userdata = userState?.userdata || {};
  const userImage = userdata?.profilePicture;
  const [showBanner, setShowBanner] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isRecruiterDropdownOpen, setIsRecruiterDropdownOpen] = useState(false);

  const toggleRecruiterDropdown = () =>
    setIsRecruiterDropdownOpen(!isRecruiterDropdownOpen);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // Scrolling Down
      setShowBanner(false);
    } else {
      // Scrolling Up
      setShowBanner(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    await RemoveTokens();
    await signOut({ redirect: false });
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

  const handleCoupon = () => {
    router.push("/pricing?coupon=true");
  };

  const handleDropdownHover = (index) => {
    setActiveDropdown(index);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="new_resume_latest z-[100] fixed">
      <div className={`header_wrapper w-full h-[70px]`}>
        {/* {!shouldHideBanner && showBanner && (
          <div className="top_banner bg-blue-900 text-white py-3 px-4 text-center">
            <p className="text-xs sm:text-sm md:text-base font-medium lg:flex hidden flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 marquee-text">
              <span>
                🎉 Limited Time Offer! Free 14 Days Trial on Genies Pro CV
                Studio.
              </span>
              <span
                onClick={handleCoupon}
                className="underline font-semibold hover:no-underline cursor-pointer sm:ml-2"
              >
                Grab Now
              </span>
            </p>
            <p className="text-xs sm:text-sm md:text-base font-medium flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0  lg:hidden">
              <span>
                🎉 Limited Time Offer! Get 14% off on Genies Pro CV Studio.
              </span>
              <span
                onClick={handleCoupon}
                className="underline font-semibold hover:no-underline cursor-pointer sm:ml-2"
              >
                Grab Now
              </span>
            </p>
          </div>
        )} */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <Link href="/">
              <Image
                priority
                src="/beta-logo.png"
                alt="Genies Career Hub"
                width={100}
                height={100}
                className="w-20 h-16 object-contain"
              />
            </Link>
          </div>
          <div className="hidden lg:block">
            <ul className="ml-12 inline-flex space-x-8">
              {menuItems.map((item, index) => (
                <li key={item.name} className="relative group">
                  {item.dropdown ? (
                    <>
                      <button
                        className="inline-flex items-center text-base text-blue-950 font-medium hover:text-blue-700 transition"
                        onMouseEnter={() => handleDropdownHover(index)}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      <div
                        className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 transition-opacity duration-150 ${
                          activeDropdown === index
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        }`}
                        onMouseEnter={() => handleDropdownHover(index)}
                        onMouseLeave={() => handleDropdownLeave()}
                      >
                        <ul className="py-1">
                          {item.dropdown.map((dropdownItem) => (
                            <li key={dropdownItem.name}>
                              <button
                                onClick={() => dropdownItem.onClick(router)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {dropdownItem.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={
                        item.className ||
                        "inline-flex items-center text-base text-blue-950 font-medium hover:text-blue-700 transition"
                      }
                    >
                      {item.name}
                    </Link>
                  )}
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
                    {userImage ? (
                      <Image
                        src={userImage}
                        alt={`${userdata?.fullname || "User"}'s avatar`}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = "/avatar.png";
                        }}
                      />
                    ) : (
                      <Image
                        src="/avatar.png"
                        alt="Default avatar"
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                        priority
                      />
                    )}
                  </span>
                  <div className="mx-2">
                    <div className="text-sm font-medium text-gray-900">
                      {userdata?.fullname}
                    </div>
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <ul>
                      <Link href="/user-dashboard">
                        <li className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm flex items-center">
                          <FaUserCircle className="mr-2" /> Profile
                        </li>
                      </Link>
                      <Link href="/user-history">
                        <li className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm flex items-center  ">
                          <PiReadCvLogo className="mr-2" />
                          CV History
                        </li>
                      </Link>
                      {/* <Link href="/job-dashboard">
                        <li className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm flex items-center">
                          <PiReadCvLogo className="mr-2" />
                          Job Dashboard
                        </li>
                      </Link> */}
                      <li
                        className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm flex items-center"
                        onClick={handleLogout}
                      >
                        <MdLogout className="mr-2" /> Logout
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
          {/* Mobile Menu  */}
          <div className="ml-2 lg:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 cursor-pointer" />
            </button>
          </div>
          {isMenuOpen && (
            <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2">
                      <Link href={"/"}>
                        <Image
                          priority="true"
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
                    {/* <nav className="grid gap-y-4">
                      {menuItems.map((item) => (
                        <React.Fragment key={item.name}>
                          {item.dropdown ? (
                            <>
                              <div className="text-base font-medium text-blue-950 mb-2">
                                {item.name}
                              </div>
                              {item.dropdown.map((dropdownItem) => (
                                <button
                                  key={dropdownItem.name}
                                  onClick={() => dropdownItem.onClick(router)}
                                  className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50 pl-6 w-full"
                                >
                                  <span className="text-base font-medium text-gray-600">
                                    {dropdownItem.name}
                                  </span>
                                </button>
                              ))}
                            </>
                          ) : (
                            <Link
                              href={item.href}
                              className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                            >
                              <span className="text-base font-medium text-blue-950">
                                {item.name}
                              </span>
                            </Link>
                          )}
                        </React.Fragment>
                      ))}
                    </nav> */}
                    <nav className="mt-6 grid gap-y-2">
                      {menuItems.map((item) => (
                        <React.Fragment key={item.name}>
                          {item.dropdown ? (
                            <>
                              <button
                                className="text-base font-medium text-blue-950 flex items-center justify-between w-full p-3"
                                onClick={toggleRecruiterDropdown}
                              >
                                {item.name}
                                <ChevronDown
                                  className={`h-5 w-5 transition-transform ${
                                    isRecruiterDropdownOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              {isRecruiterDropdownOpen && (
                                <div className="pl-2">
                                  {item.dropdown.map((dropdownItem) => (
                                    <button
                                      key={dropdownItem.name}
                                      onClick={() =>
                                        dropdownItem.onClick(router)
                                      }
                                      className="block w-full text-left text-base text-gray-600 p-2 hover:bg-gray-50 rounded-md"
                                    >
                                      {dropdownItem.name}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <Link
                              href={item.href}
                              className="block text-base font-medium text-blue-950 p-3 hover:bg-gray-50 rounded-md"
                            >
                              {item.name}
                            </Link>
                          )}
                        </React.Fragment>
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
                              src={userdata?.profilePicture || "/avatar.png"}
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
                                <a href="/user-dashboard">Profile</a>
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
