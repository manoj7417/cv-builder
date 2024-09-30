import React from "react";
import Link from "next/link";
export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
      <>
        <footer className='bg-[#ffffff] relative'>
          <div className='mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8'>
             
            <p className='text-sm text-black'>
              &copy; {currentYear}. Genies career hub . All rights reserved.
              <br />
              <br />
              powered by
              <Link
                href='https://www.glassfrogtech.com/'
                target='_blank'
                className='hover:underline pl-1'>
                Glassfrog Technologies
              </Link>
            </p>
          </div>
        </footer>
      </>
    );
  }