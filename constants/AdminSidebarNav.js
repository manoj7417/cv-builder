/** @format */

import { FaUser } from "react-icons/fa";
import { IoDocuments, IoSettings } from "react-icons/io5";

export const AdminSidebarNav = [
  {
    title: "Blog",
    path: "/blogs",
    icon: (
      <IoDocuments
        width='40'
        height='40'
        className='text-xl text-blue-950 font-semibold'
      />
    ),
    submenu: true,
    subMenuItems: [
      { title: "Create Blog", path: "/admin/createBlogs" },
      { title: "View Blog", path: "/admin/viewBlogs" },
    ],
  },
  {
    title: "User",
    path: "/manageUser",
    icon: (
      <FaUser
        width='40'
        height='40'
        className='text-xl text-blue-950 font-semibold'
      />
    ),
    submenu: true,
    subMenuItems: [
      { title: "Create User", path: "/admin/createUser" },
      { title: "View User", path: "/admin/viewUsers" },
    ],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: (
      <IoSettings
        width='40'
        height='40'
        className='text-xl text-blue-950 font-semibold'
      />
    ),
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/settings/account" },
      { title: "Privacy", path: "/settings/privacy" },
    ],
  },
];
