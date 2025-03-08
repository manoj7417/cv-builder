/** @format */

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FiLogOut } from "react-icons/fi";
import { FaKey, FaUser } from "react-icons/fa";
import { LuUserSquare2 } from "react-icons/lu";
import { IoDocumentsOutline } from "react-icons/io5";
import { GetTokens, RemoveTokens } from "@/app/actions";
import { MdDashboard, MdEventAvailable } from "react-icons/md";
import { CgLoadbarDoc } from "react-icons/cg";
import { toast } from "react-toastify";
import axios from "axios";
import { useCoachStore } from "@/app/store/coachStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LibraryBig, BadgePlus, SquareDashedKanban } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { signOut } from "next-auth/react";

const SidebarCoach = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);
  const router = useRouter();
  const { updateUserData } = useCoachStore();
  const { userdata } = useCoachStore((state) => state.userState);
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
      ? "flex items-center rounded-md bg-blue-950 text-white cursor-pointer text-sm shadow-md font-bold w-full h-auto"
      : "flex items-center text-gray-500 rounded-md hover:bg-gray-200 cursor-pointer text-sm  font-bold w-full";
  };

  const getProgramLinkClass = (tab) => {
    return activeTab.includes(tab)
      ? "flex items-center rounded-md bg-blue-950 text-white cursor-pointer text-sm shadow-md font-bold w-full h-auto py-2 px-2"
      : "flex items-center text-gray-500 rounded-md hover:bg-gray-200 cursor-pointer text-sm  font-bold w-full py-2";
  };

  const getSubLinkClass = (tab) => {
    return activeTab === tab
      ? "flex items-center rounded-md bg-gray-100 text-blue-900 cursor-pointer text-sm shadow-md font-bold w-full h-auto my-1"
      : "flex items-center text-gray-500 rounded-md hover:bg-gray-100 cursor-pointer text-sm text-blue-700 font-bold w-full my-1";
  };

  const handleLogout = async () => {
    try {
      await RemoveTokens(true);
      await signOut({ redirect: false });
      toast.success("Logged out");
      router.push("/coach-signin");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const handleAccountRequest = async () => {
    const { accessToken, refreshToken } = await GetTokens(true);
    const data = {
      accessToken: accessToken?.value,
      refreshToken: refreshToken?.value,
    };
    try {
      const response = await axios.post("/api/coachAccount", data);
      if (response.status === 200) {
        updateUserData(response.data.data.userdata);
      }
    } catch (error) {
      await RemoveTokens(true);
      await signOut({ redirect: false });
      console.log(error);
      toast.error("Error logging in");
      router.push("/coach-signin");
    }
  };

  useEffect(() => {
    handleAccountRequest();
  }, []);

  return (
    <div className="flex lg:h-full h-auto lg:fixed lg:top-0 relative lg:shadow-xl shadow-none bg-gray-50/5">
      {/* Mobile Hamburger Menu Button */}
      <button
        className="lg:hidden block p-4 focus:outline-none"
        onClick={toggleSidebar}
      >
        <HiMenu className="w-8 h-8" />
      </button>

      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0 w-[300px]" : "-translate-x-full -w-10"
        } lg:relative lg:translate-x-0 bg-gray-50  transition-transform duration-300 ease-in-out z-50 w-[300px]`}
      >
        <div className="flex justify-between md:flex lg:hidden">
          <div className="dashboard_logo p-4">
            <Link href={"/"}>
              <Image
                src="/admin-logo.png"
                alt="logo"
                width={500}
                height={500}
                className="w-[200px] h-[100px] object-contain"
              />
            </Link>
          </div>
          <div className="close_icon p-2">
            <button
              className="focus:outline-none cursor-pointer"
              onClick={toggleSidebar}
            >
              <IoMdClose className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="dashboard_logo p-5 mb-5 lg:block hidden">
          <Link href={"/"}>
            <Image
              src="/admin-logo.png"
              alt="logo"
              width={200}
              height={200}
              className="w-[90%]"
            />
          </Link>
        </div>
        <nav className=" space-y-5 py-8">
          <ul className="space-y-4 lg:w-full p-2">
            <li className={getLinkClass("/coach-dashboard")}>
              <Link
                href="/coach-dashboard"
                className="flex items-center w-full h-full p-2 px-3"
                onClick={() => handleSetActiveTab("/coach-dashboard")}
              >
                <MdDashboard className="text-lg mr-3" />
                Dashboard
              </Link>
            </li>
            <li className={getLinkClass("/coach-dashboard/coach-availabilty")}>
              <Link
                href={"/coach-dashboard/coach-availabilty"}
                className="flex items-center w-full p-2 px-3"
                onClick={() =>
                  handleSetActiveTab("/coach-dashboard/coach-availabilty")
                }
              >
                <MdEventAvailable className="text-lg mr-3" />
                Availability
              </Link>
            </li>
            <li className={getLinkClass("/coach-dashboard/coach-profile")}>
              <Link
                href={"/coach-dashboard/coach-profile"}
                className="flex items-center w-full p-2 px-3"
                onClick={() =>
                  handleSetActiveTab("/coach-dashboard/coach-profile")
                }
              >
                <User className="h-5 mr-3" />
                My Profile
              </Link>
            </li>
            <li className={getLinkClass("/coach-dashboard/coach-calendar")}>
              <Link
                href={"/coach-dashboard/coach-calendar"}
                className="flex items-center w-full p-2 px-3"
                onClick={() =>
                  handleSetActiveTab("/coach-dashboard/coach-calendar")
                }
              >
                <MdEventAvailable className="text-lg mr-3" />
                My Appointment
              </Link>
            </li>
            {/* <li className={getLinkClass("/coach-dashboard/enroll-student")}>
              <Link
                href={"/coach-dashboard/enroll-student"}
                className='flex items-center w-full p-2 px-3'
                onClick={() =>
                  handleSetActiveTab("/coach-dashboard/enroll-student")
                }>
                <MdEventAvailable className='text-lg mr-3' />
                Enroll Students
              </Link>
            </li> */}
            <li>
              <Accordion className="w-full " type="single" collapsible>
                <AccordionItem value="item">
                  <AccordionTrigger
                    className={getProgramLinkClass("/coach-dashboard/programs")}
                  >
                    <div className="flex px-3">
                      <LibraryBig className="h-5 mr-3" />
                      <p>Programs</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-3 py-1">
                      <li
                        className={getSubLinkClass(
                          "/coach-dashboard/programs/create"
                        )}
                      >
                        <Link
                          href="/coach-dashboard/programs/create"
                          onClick={() =>
                            handleSetActiveTab(
                              "/coach-dashboard/programs/create"
                            )
                          }
                          className="flex p-2 w-full"
                        >
                          <BadgePlus className="h-5 mr-2" />
                          Create Program
                        </Link>
                      </li>
                      <li
                        className={getSubLinkClass("/coach-dashboard/programs")}
                      >
                        <Link
                          href="/coach-dashboard/programs"
                          className="flex p-2 w-full"
                          onClick={() =>
                            handleSetActiveTab("/coach-dashboard/programs")
                          }
                        >
                          <SquareDashedKanban className="h-5 mr-2" />
                          Manage Programs
                        </Link>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
          </ul>
        </nav>
        <div className="flex items-center justify-between  absolute l-0 bottom-5 w-full px-2">
          <TooltipProvider>
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={userdata?.profileImage}
                alt={userdata?.name || "avatar"}
              />
              <AvatarFallback>{userdata?.name?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="w-3/5">
              <p className="font-semibold text-gray-800 text-base ">
                {userdata?.name}
              </p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-gray-800"
                  onClick={handleLogout}
                >
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

export default SidebarCoach;
