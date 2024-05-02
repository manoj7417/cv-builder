import React from 'react';

const Navbar = () => {
  return (
    <nav className="relative border-gray-200 w-full border-b py-3 bg-white z-50  bg-inherit  border-b-default border-solid border-prime-gray-200 ">
      <div className="container mx-auto ">
        <div className="w-full flex  flex-col lg:flex-row">
          <div className=" flex justify-between  lg:flex-row">
            <a href="/" className="flex items-center">
              <svg width="164" height="33" viewBox="0 0 164 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* SVG paths */}
              </svg>
            </a>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                {/* SVG path */}
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-end lg:flex-1 lg:flex-row">
            <a href="/" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">Home</a>
            <a href="/about" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">About</a>
            <div className="relative group">
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">Services</a>
              <div className="absolute hidden bg-white rounded-lg shadow-lg mt-2 py-2 w-48 z-20">
                <a href="/service1" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Service 1</a>
                <a href="/service2" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Service 2</a>
                <a href="/service3" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Service 3</a>
              </div>
            </div>
            <a href="/contact" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
