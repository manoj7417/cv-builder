/** @format */

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { FaKey } from "react-icons/fa";
import { LuUserSquare2 } from "react-icons/lu";
import { IoDocumentsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useUserStore } from "@/app/store/UserStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { GetTokens, RemoveTokens } from "@/app/actions";
import { toast } from "react-toastify";
import axios from "axios";
import { RiUserSettingsLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);
  const { userdata } = useUserStore((state) => state.userState);
  const router = useRouter();
  const { updateUserData } = useUserStore();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSetActiveTab = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  const getLinkClass = (tab) => {
    return activeTab === tab
      ? "flex items-center rounded-md bg-blue-950 text-white cursor-pointer text-sm shadow-md font-bold w-full h-auto"
      : "flex items-center text-gray-500 rounded-md hover:bg-gray-200 cursor-pointer text-sm  font-bold w-full";
  };

  const handleLogout = async () => {
    try {
      await RemoveTokens();
      toast.success("Logged out");
      router.push("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const handleAccountRequest = async () => {
    const { accessToken } = await GetTokens();
    try {
      const response = await axios.get("/api/adminAccount", {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        updateUserData(response.data.data);
      }
    } catch (error) {
      await RemoveTokens();
      toast.error(error?.response?.data?.error);
      router.push("/login");
    }
  };

  useEffect(() => {
    handleAccountRequest();
  }, []);

  return (
    <div className='flex lg:h-full lg:fixed lg:top-0  pb-5 shadow-xl w-[16%] absolute z-50 h-screen bg-white pt-5'>
      <button
        className='md:hidden p-4 focus:outline-none'
        onClick={toggleSidebar}>
        <HiMenu className='w-8 h-8' />
      </button>

      <div
        className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 bg-white  transition-transform duration-300 ease-in-out z-50 w-full`}>
        <div className='flex justify-end mr-5 md:hidden'>
          <button
            className=' mb-4 focus:outline-none cursor-pointer'
            onClick={toggleSidebar}>
            <IoMdClose className='w-8 h-8' />
          </button>
        </div>
        <div className='dashboard_logo px-5 mb-5'>
          <Image
            src='/admin-logo.png'
            alt='logo'
            width={200}
            height={200}
            className='w-[90%]'
          />
        </div>
        <nav className=' space-y-5 py-8 px-2'>
          <ul className='space-y-4 lg:w-full'>
            <li
              className={getLinkClass("/admin")}
              onClick={() => handleSetActiveTab("/admin")}>
              <Link href='/admin' className='flex items-center w-full h-full p-2 px-3'>
                <FaKey className='w-4 h-4 mr-4' />
                <span className='font-semibold'>Dashboard</span>
              </Link>
            </li>

            <li
              className={getLinkClass("/admin/coach")}
              onClick={() => handleSetActiveTab("/admin/coach")}>
              <Link href={"/admin/coach"} className='flex items-center w-full h-full p-2 px-3'>
                <LuUserSquare2 className='w-6 h-6 mr-4' />
                <span className='font-semibold'>Coaches</span>
              </Link>
            </li>
            <li
              className={getLinkClass("/admin/coach-program")}
              onClick={() => handleSetActiveTab("/admin/coach-program")}>
              <Link
                href={"/admin/coach-program"}
                className='flex items-center w-full h-full p-2 px-3'>
                <RiUserSettingsLine className='w-5 h-5 mr-4' />
                <span className='font-semibold'>Coach Program</span>
              </Link>
            </li>
            {/* <li className={getLinkClass("/admin/viewUsers")}>
              <Link
                href={"/admin/viewUsers"}
                className="flex items-center w-full"
                onClick={() => handleSetActiveTab("/admin/viewUsers")}
              >
                <LuUserSquare2 className="w-6 h-6 mr-4" />
                <span className="font-semibold">User</span>
              </Link>
            </li> */}
          </ul>
        </nav>
        {/* Profile Section */}
        <div className='flex items-center justify-between  absolute bottom-0 px-2 w-full'>
          <TooltipProvider>
            <Avatar className='h-10 w-10'>
              <AvatarImage
                src={userdata?.profilePicture}
                alt={userdata?.profilePicture || "avatar"}
              />
              <AvatarFallback>{userdata?.fullname?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className='w-3/5'>
              <p className='font-semibold text-gray-800 text-base '>
                {userdata?.fullname}
              </p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-gray-600 hover:text-gray-800'
                  onClick={handleLogout}>
                  <FiLogOut className='w-5 h-5' />
                  <span className='sr-only'>Logout</span>
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

export default Sidebar;
