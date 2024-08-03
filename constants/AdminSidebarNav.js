import { HiOutlineDocumentText } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";


export const AdminSidebarNav =  [
    {
      title: 'Blog',
      path: '/blogs',
      icon: <HiOutlineDocumentText  width="40" height="40" className="text-xl text-blue-950 font-semibold" />,
      submenu: true,
      subMenuItems: [
        { title: 'Create Blog', path: '/admin/createBlogs' },
        { title: 'View Blog', path: '/admin/viewBlogs' },
        { title: 'Update Blog', path: '/admin/updateBlog' },
      ],
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <IoSettingsOutline  width="40" height="40" className="text-xl text-blue-950 font-semibold"/>,
      submenu: true,
      subMenuItems: [
        { title: 'Account', path: '/settings/account' },
        { title: 'Privacy', path: '/settings/privacy' },
      ],
    },
  ];