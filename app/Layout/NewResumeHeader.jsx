"use client";
import { Fragment, useState, useEffect } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";
import { deleteCookie } from 'cookies-next';
import { useUserStore } from "../store/UserStore";
import { RemoveTokens } from "../actions";
import { FaUserLarge } from "react-icons/fa6";

const navigation = [
  { name: "CV Curator", href: "/builder", current: true },
  {
    name: "Resume Analyser",
    href: "/resumeAnalyzer-dashboard",
    current: false,
  },
  { name: "Psychometric Test", href: "/coming-soon", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NewResumeHeader() {
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();
  const logoutUser = useUserStore((state) => state.logoutUser)

  const handleLogout = async () => {
    await RemoveTokens()
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
    <div className={`fixed w-full top-0 z-50 transition-colors duration-300 ${scrollY > 0 ? 'bg-white' : 'bg-transparent'}`}>
      <Disclosure>
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <Bars3Icon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <a href="/" className="flex items-center gap-2">
                      <Image
                        src={"/gch_logo.png"}
                        width={30}
                        height={30}
                        alt="newlogo"
                        className="w-50 h-auto object-contain"
                      />
                      <span className="text-black font-bold md:text-2xl text-sm">
                        Genies Career Hub
                      </span>
                    </a>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? "text-black" : "text-black",
                            "rounded-md px-3 py-2 text-sm flex items-center justify-center font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                          <IoIosArrowDown className="inline ml-1 text-sm" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-2 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-blue-900 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon
                      className="h-6 w-6 text-white "
                      aria-hidden="true"
                    />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-blue-900 p-1.5 text-sm">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <FaUserLarge className="h-5 w-5 rounded-full text-white" />
                      </MenuButton>
                    </div>
                    <Transition
                      as={Fragment}
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
                              href="/user-dashboard"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Dashboard
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
