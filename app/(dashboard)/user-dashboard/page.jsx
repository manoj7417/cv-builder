'use client'
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const UserDashboardPage = () => {
  const { userlogout, userState } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    if (userState?.isAuthenticated) {
      toast.success("User logout successfully", {
        position: "top-right",
      });
      userlogout();
      router.push("/");
    }
  };
  return (
    <>
      <div>
        <div>
          <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50  text-black">
            {/* Header */}
            <div className="fixed w-full flex items-center justify-between h-14 text-white z-10 bg-white top-0">
              <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-white border-none text-black font-semibold">
                <img
                  className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
                  src="/pic.jpg"
                />
                <span className="hidden md:block">Maria</span>
              </div>
              <div className="bg-white rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
                  <button className="outline-none focus:outline-none">
                    <svg
                      className="w-5 text-gray-600 h-5 cursor-pointer"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <input
                    type="search"
                    name
                    id
                    placeholder="Search"
                    className="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent"
                  />
                </div>
              <div className="flex justify-between items-center h-14 bg-white header-right">
                <ul className="flex items-center">
                  <li>
                    <div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700" />
                  </li>
                  <li>
                    <a
                      className="flex items-center mr-4 hover:text-blue-500 text-black cursor-pointer"
                      onClick={handleLogout}
                    >
                      <span className="inline-flex mr-1">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                      </span>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* ./Header */}
            {/* Sidebar */}
            <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-white h-full text-black transition-all duration-300 border-none z-10 sidebar">
              <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                <ul className="flex flex-col py-4 space-y-1">
                  <li className="px-5 hidden md:block">
                    <div className="flex flex-row items-center h-8">
                      <div className="text-sm tracking-wide text-black font-semibold uppercase">
                        Main
                      </div>
                    </div>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 hover:text-white border-l-4 border-transparent pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Dashboard
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 hover:text-white border-l-4 border-transparent pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Board
                      </span>
                      <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">
                        New
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 hover:text-white border-l-4 border-transparent pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Messages
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 hover:text-white border-l-4 border-transparent pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Notifications
                      </span>
                      <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                        1.2k
                      </span>
                    </a>
                  </li>
                  <li className="px-5 hidden md:block">
                    <div className="flex flex-row items-center mt-5 h-8">
                      <div className="text-sm font-semibold tracking-wide text-black uppercase">
                        Settings
                      </div>
                    </div>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 hover:text-white border-l-4 border-transparent pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Profile
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 hover:text-white border-l-4 border-transparent pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Settings
                      </span>
                    </a>
                  </li>
                </ul>
                <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
                  Copyright @2021
                </p>
              </div>
            </div>
            {/* ./Sidebar */}
            <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
                <div className="bg-blue-300 shadow-lg rounded-md flex items-center justify-between p-3  font-medium group">
                  <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg
                      width={30}
                      height={30}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="stroke-current text-black/50 transform transition-transform duration-500 ease-in-out"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl text-white">15</p>
                    <p className="text-white">Projects</p>
                  </div>
                </div>
                <div className="bg-red-400 shadow-lg rounded-md flex items-center justify-between p-3  text-white font-medium group">
                  <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg
                      width={30}
                      height={30}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="stroke-current text-black/50 transform transition-transform duration-500 ease-in-out"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">8</p>
                    <p>Skills</p>
                  </div>
                </div>
                <div className="bg-orange-400 shadow-lg rounded-md flex items-center justify-between p-3  text-white font-medium group">
                  <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg
                      width={30}
                      height={30}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="stroke-current text-black/50 transform transition-transform duration-500 ease-in-out"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">11</p>
                    <p>Certifications</p>
                  </div>
                </div>
                <div className="bg-green-400 shadow-lg rounded-md flex items-center justify-between p-3  text-white font-medium group">
                  <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg
                      width={30}
                      height={30}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="stroke-current text-black/50 transform transition-transform duration-500 ease-in-out"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">75</p>
                    <p>Experience</p>
                  </div>
                </div>
              </div>
              {/* ./Statistics Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
                {/* Social Traffic */}
                <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-white  w-full shadow-lg rounded">
                  <div className="rounded-t mb-0 px-0 border-0">
                    <div className="flex flex-wrap items-center px-4 py-2">
                      <div className="relative w-full max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-gray-900">
                          Social Traffic
                        </h3>
                      </div>
                      <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                        <button
                          className="bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          See all
                        </button>
                      </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                      <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                          <tr>
                            <th className="px-4 bg-gray-600 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Referral
                            </th>
                            <th className="px-4 bg-gray-600  text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Visitors
                            </th>
                            <th className="px-4 bg-gray-600 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px" />
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-gray-700">
                            <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Facebook
                            </th>
                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              5,480
                            </td>
                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <div className="flex items-center">
                                <span className="mr-2">70%</span>
                                <div className="relative w-full">
                                  <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                    <div
                                      style={{ width: "70%" }}
                                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="text-gray-700">
                            <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Twitter
                            </th>
                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              3,380
                            </td>
                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <div className="flex items-center">
                                <span className="mr-2">40%</span>
                                <div className="relative w-full">
                                  <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                    <div
                                      style={{ width: "40%" }}
                                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="text-gray-700">
                            <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Instagram
                            </th>
                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              4,105
                            </td>
                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <div className="flex items-center">
                                <span className="mr-2">45%</span>
                                <div className="relative w-full">
                                  <div className="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                                    <div
                                      style={{ width: "45%" }}
                                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="text-gray-700">
                            <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Google
                            </th>
                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              4,985
                            </td>
                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <div className="flex items-center">
                                <span className="mr-2">60%</span>
                                <div className="relative w-full">
                                  <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                    <div
                                      style={{ width: "60%" }}
                                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="text-gray-700">
                            <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Linkedin
                            </th>
                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              2,250
                            </td>
                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <div className="flex items-center">
                                <span className="mr-2">30%</span>
                                <div className="relative w-full">
                                  <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                    <div
                                      style={{ width: "30%" }}
                                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-700"
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* ./Social Traffic */}
                {/* Recent Activities */}
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
                  <div className="rounded-t mb-0 px-0 border-0">
                    <div className="flex flex-wrap items-center px-4 py-2">
                      <div className="relative w-full max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-gray-900">
                          Recent Activities
                        </h3>
                      </div>
                      <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                        <button
                          className="bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          See all
                        </button>
                      </div>
                    </div>
                    <div className="block w-full">
                      <div className="px-4 bg-gray-600 text-white align-middle border border-solid border-gray-200  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Today
                      </div>
                      <ul className="my-1">
                        <li className="flex px-4">
                          <div className="w-9 h-9 rounded-full flex-shrink-0 bg-indigo-500 my-2 mr-3">
                            <svg
                              className="w-9 h-9 fill-current text-indigo-50"
                              viewBox="0 0 36 36"
                            >
                              <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                            </svg>
                          </div>
                          <div className="flex-grow flex items-center border-b border-gray-100 dark:border-gray-400 text-sm text-gray-600 py-2">
                            <div className="flex-grow flex justify-between items-center">
                              <div className="self-center">
                                <a
                                  className="font-medium text-gray-800"
                                  href="#0"
                                  style={{ outline: "none" }}
                                >
                                  Nick Mark
                                </a>
                                mentioned
                                <a
                                  className="font-medium text-gray-800"
                                  href="#0"
                                  style={{ outline: "none" }}
                                >
                                  Sara Smith
                                </a>{" "}
                                in a new post
                              </div>
                              <div className="flex-shrink-0 ml-2">
                                <a
                                  className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                  href="#0"
                                  style={{ outline: "none" }}
                                >
                                  View
                                  <span>
                                    <svg
                                      width={20}
                                      height={20}
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      className="transform transition-transform duration-500 ease-in-out"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="flex px-4">
                          <div className="w-9 h-9 rounded-full flex-shrink-0 bg-red-500 my-2 mr-3">
                            <svg
                              className="w-9 h-9 fill-current text-red-50"
                              viewBox="0 0 36 36"
                            >
                              <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
                            </svg>
                          </div>
                          <div className="flex-grow flex items-center border-gray-100 text-sm text-gray-600 py-2">
                            <div className="flex-grow flex justify-between items-center">
                              <div className="self-center">
                                The post
                                <a
                                  className="font-medium text-gray-800"
                                  href="#0"
                                  style={{ outline: "none" }}
                                >
                                  Post Name
                                </a>
                                was removed by
                                <a
                                  className="font-medium text-gray-800"
                                  href="#0"
                                  style={{ outline: "none" }}
                                >
                                  Nick Mark
                                </a>
                              </div>
                              <div className="flex-shrink-0 ml-2">
                                <a
                                  className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                  href="#0"
                                  style={{ outline: "none" }}
                                >
                                  View
                                  <span>
                                    <svg
                                      width={20}
                                      height={20}
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      className="transform transition-transform duration-500 ease-in-out"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Yesterday
                      </div>
                      <ul className="my-1">
                        <li className="flex px-4">
                          <div className="w-9 h-9 rounded-full flex-shrink-0 bg-green-500 my-2 mr-3">
                            <svg
                              className="w-9 h-9 fill-current text-light-blue-50"
                              viewBox="0 0 36 36"
                            >
                              <path d="M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z" />
                            </svg>
                          </div>
                          <div className="flex-grow flex items-center border-gray-100 text-sm text-gray-600 py-2">
                            <div className="flex-grow flex justify-between items-center">
                              <div className="self-center">
                                <a
                                  className="font-medium text-gray-800 hover:text-gray-900"
                                  href="#0"
                                  style={{ outline: "none" }}
                                >
                                  240+
                                </a>{" "}
                                users have subscribed to{" "}
                                <a
                                  className="font-medium text-gray-800"
                                  href="#0"
                                  style={{ outline: "none" }}
                                >
                                  Newsletter #1
                                </a>
                              </div>
                              <div className="flex-shrink-0 ml-2">
                                <a
                                  className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                  href="#0"
                                  style={{ outline: "none" }}
                                >
                                  View
                                  <span>
                                    <svg
                                      width={20}
                                      height={20}
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      className="transform transition-transform duration-500 ease-in-out"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* ./Recent Activities */}
              </div>
              {/* Client Table */}
              <div className="mt-4 mx-4">
                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                  <div className="w-full overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs font-semibold tracking-wide text-left text-black uppercase border-b bg-white">
                          <th className="px-4 py-3">Templates</th>
                          <th className="px-4 py-3">Amount</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y">
                        <tr className="bg-white text-black">
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div className="relative hidden w-20 h-20 mr-3 md:block">
                                <img
                                  className="object-cover w-full h-full"
                                  src="/5.png"
                                  alt
                                  loading="lazy"
                                />
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"
                                />
                              </div>
                              <div>
                                <p className="font-semibold">Designer Templates</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">$855.85</td>
                          <td className="px-4 py-3 text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                              {" "}
                              Paid
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">15-01-2021</td>
                        </tr>
                        <tr className="bg-white text-black">
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div className="relative hidden w-20 h-20 mr-3 md:block">
                                <img
                                  className="object-cover w-full h-full"
                                  src="/6.png"
                                  alt
                                  loading="lazy"
                                />
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"
                                />
                              </div>
                              <div>
                                <p className="font-semibold">Professional Template</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">$369.75</td>
                          <td className="px-4 py-3 text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                              {" "}
                              Pending{" "}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">23-03-2021</td>
                        </tr>
                        <tr className="bg-white text-black">
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div className="relative hidden w-20 h-20 mr-3  md:block">
                                <img
                                  className="object-cover w-full h-full"
                                  src="/8.png"
                                  alt
                                  loading="lazy"
                                />
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"
                                />
                              </div>
                              <div>
                                <p className="font-semibold">ATS Template</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">$775.45</td>
                          <td className="px-4 py-3 text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700">
                              {" "}
                              Expired{" "}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">09-02-2021</td>
                        </tr>
                        <tr className="bg-white text-black">
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div className="relative hidden w-20 h-20 mr-3 md:block">
                                <img
                                  className="object-cover w-full h-full"
                                  src="/15.png"
                                  alt
                                  loading="lazy"
                                />
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"
                                />
                              </div>
                              <div>
                                <p className="font-semibold">Simple Template</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">$1276.75</td>
                          <td className="px-4 py-3 text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                              {" "}
                              Paid
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">17-04-2021</td>
                        </tr>
                        <tr className="bg-white text-black">
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div className="relative hidden w-20 h-20 mr-3 md:block">
                                <img
                                  className="object-cover w-full h-full"
                                  src="/16.png"
                                  alt
                                  loading="lazy"
                                />
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"
                                />
                              </div>
                              <div>
                                <p className="font-semibold">Simple Template</p>0
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">$863.45</td>
                          <td className="px-4 py-3 text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                              {" "}
                              Denied{" "}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">11-01-2021</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-black uppercase border-t bg-gray-50 sm:grid-cols-9">
                    <span className="flex items-center col-span-3">
                      {" "}
                      Showing 21-30 of 100{" "}
                    </span>
                    <span className="col-span-2" />
                    {/* Pagination */}
                    <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                      <nav aria-label="Table navigation">
                        <ul className="inline-flex items-center">
                          <li>
                            <button
                              className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                              aria-label="Previous"
                            >
                              <svg
                                aria-hidden="true"
                                className="w-4 h-4 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                  fillRule="evenodd"
                                />
                              </svg>
                            </button>
                          </li>
                          <li>
                            <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                              1
                            </button>
                          </li>
                          <li>
                            <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                              2
                            </button>
                          </li>
                          <li>
                            <button className="px-3 py-1 text-white transition-colors duration-150 bg-black  border border-r-0 border-black rounded-md focus:outline-none focus:shadow-outline-purple">
                              3
                            </button>
                          </li>
                          <li>
                            <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                              4
                            </button>
                          </li>
                          <li>
                            <span className="px-3 py-1">...</span>
                          </li>
                          <li>
                            <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                              8
                            </button>
                          </li>
                          <li>
                            <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                              9
                            </button>
                          </li>
                          <li>
                            <button
                              className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                              aria-label="Next"
                            >
                              <svg
                                className="w-4 h-4 fill-current"
                                aria-hidden="true"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                  fillRule="evenodd"
                                />
                              </svg>
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </span>
                  </div>
                </div>
              </div>
              {/* ./Client Table */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboardPage;
