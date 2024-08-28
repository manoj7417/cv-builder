"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { usePathname } from 'next/navigation'
import { FaHistory, FaRegUserCircle } from 'react-icons/fa';

function ProfileSidebar() {
    const pathname = usePathname()
    const links = [
        { href: "/settings/profile", label: "Profile", icon: <FaRegUserCircle /> },
        { href: "/settings/cvanalysis", label: "Analyser History", icon: <FaHistory /> },
        { href: '/settings/pyschometric-test', label: "Psychometric Test", icon: <FaHistory /> },
        // { href: '', label: "Subscription" } // Update href as needed
    ];
    return (
        <div
            className='w-1/6 h-full rounded-2xl  overflow-hidden shadow-lg bg-white py-5'
            aria-label="Sidebar"
        >
            <div className='w-full px-3'>
                <h1 className='text-2xl text-blue-900 font-bold'>Settings</h1>
            </div>
            <div className="h-full px-3 py-4 overflow-y-auto bg-white ">
                <ul className="space-y-2 font-medium">
                    {links.map(({ href, label, icon }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`flex items-center px-4 p-2 my-2 rounded-lg hover:bg-gray-100 group h-10 ${pathname === href ? 'text-blue-900 border-r-8 border-blue-900 shadow-md rounded-tl-lg rounded-bl-lg rounded-none' : 'text-gray-900'
                                    }`}
                            >
                                { icon}
                                <span className="ms-3">{label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default ProfileSidebar