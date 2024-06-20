"use client";
import { Fragment, useState, useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-hot-toast"; // Updated toast import
import { deleteCookie } from "cookies-next";
import { useUserStore } from "../store/UserStore";
import { RemoveTokens } from "../actions";
import "./header.css";

const navigation = [
  { name: "CV Creator", href: "/resume-dashboard", current: true },
  { name: "CV Optimiser", href: "/resumeAnalyzer-dashboard", current: false },
  { name: "CV Match", href: "/jobCV", current: false, isBeta: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NewResumeHeader() {
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();
  const logoutUser = useUserStore((state) => state.logoutUser);
  const { userState } = useUserStore((state) => state);
  const userdata = userState?.userdata || {}; // Ensure userdata is defined
  const userImage = userdata?.profilePicture || "https://via.placeholder.com/150"; // Fallback image

  const handleLogout = async () => {
    await RemoveTokens();
    toast.success("User logout successfully", {
      position: "top-right",
    });
    logoutUser();
    router.push("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`new_resume_header border-2 border-gray-200 fixed w-full top-0 z-30 transition-colors duration-300 ${scrollY > 0 ? "bg-white" : "bg-transparent"
        }`}
    >
      <Disclosure>
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start h-full">
                  <div>
                    <a href="/" className="flex items-center gap-2">
                      <Image
                        src="/genies-career-hub-logo.png"
                        width={100}
                        height={100}
                        alt="newlogo"
                        className="h-auto object-contain"
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="hidden sm:ml-6 sm:block h-full w-full">
                    <div className="flex justify-center items-center space-x-10 h-full">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? "text-blue-950" : "text-blue-950",
                            "rounded-md px-3 py-2 text-base flex items-center justify-center nav-link-grow-up nav-link"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                          {item.isBeta && (
                            <span className="text-sm font-bold ml-1 text-blue-900">(Beta)</span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-2 sm:pr-0">
                  {/* <Menu as="div" className="relative">
                    <div>
                      <MenuButton className="relative rounded-full bg-blue-900 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              No Notification 
                            </a>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>

                {
                  console.log(userImage)
                }           */}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex items-center justify-center w-8 h-8 rounded-full   text-sm overflow-hidden">
                        <span className="sr-only">Open user menu</span>
                        <img
                          src={userImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s'}
                          alt="User profile picture"
                          layout="fill"
                          className="rounded-full object-cover p-0.2 border-2 border-blue-800 "
                        />
                      </MenuButton>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          {({ active }) => (
                            <a
                              href="/user-profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Profile
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <a
                              href="/user-history"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              CV  History
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                              )}
                              onClick={handleLogout}
                            >
                              Logout
                            </a>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>


                </div>
              </div>
            </div>

            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 bg-white">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-800 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
