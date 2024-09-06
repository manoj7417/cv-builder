"use client";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="h-20 w-full bg-white flex items-center justify-between px-6 shadow-md">
        {/* <!-- Logo Section --> */}
        <div className="text-black text-xl font-bold">Coach Dashboard</div>

        {/* <!-- Search Bar Section --> */}
        <div className="flex items-center w-1/2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 hidden sm:block md:block lg:block xl:block 2xl:block"
          />
        </div>

        {/* <!-- Profile Section --> */}
        <div className="flex items-center space-x-6">
          {/* <!-- Notification Icon with Orange Dot --> */}
          <div className="relative">
            <button className="text-black hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.054-.595 1.437L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
                />
              </svg>
              {/* <!-- Orange Dot --> */}
              <span className="absolute top-0 right-0 block h-2 w-2 bg-orange-500 rounded-full"></span>
            </button>
          </div>

          {/* <!-- Wishlist Icon (Heart) --> */}
          {/* <button className="text-black hover:text-gray-600 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21C12 21 6 16.5 6 11c0-2.76 2.24-5 5-5 1.4 0 2.66.58 3.54 1.52A5 5 0 0118 6c2.76 0 5 2.24 5 5 0 5.5-6 10-6 10z"
              />
            </svg>
          </button> */}

          {/* <!-- Cart Icon (Basket) with Item Count --> */}
          {/* <button className="text-black hover:text-gray-600 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h12.2M7 13L5.4 5M16 21a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
          
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              2
            </span>
          </button> */}

          {/* <!-- Profile Icon --> */}
          <div className="relative">
            <button className="text-black hover:text-gray-600 flex items-center">
              <img
                src="/coach_photos.png"
                alt="User"
                className="rounded-full h-10 w-10"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
