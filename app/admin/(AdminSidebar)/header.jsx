'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import useScroll from '@/app/hook/use-scroll';
import { cn } from '@/lib/utils';

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200 bg-white': selectedLayout,
        },
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl flex ">Career Genies Hub</span>
          </Link>
        </div>

        <div className="hidden md:block">
          {/* <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
            <span className="font-semibold text-sm">HQ</span>
          </div> */}
          <div className="relative" ref={dropdownRef}>
      <div className="hidden md:block" onClick={toggleDropdown}>
        <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center cursor-pointer">
          <span className="font-semibold text-sm">HQ</span>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => alert('Profile clicked')}>
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => alert('Logout clicked')}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
