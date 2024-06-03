import React from 'react';

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4 text-red-600">Payment Failed</h1>
        <p className="text-lg text-gray-700 mb-6">Unfortunately, your transaction could not be completed. Please try again.</p>
        <div className="flex justify-center mb-6">
          <svg className="w-16 h-16 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="stroke-current text-red-500" cx="26" cy="26" r="25" fill="none" strokeWidth="3" />
            <line className="stroke-current text-red-500" x1="16" y1="16" x2="36" y2="36" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <line className="stroke-current text-red-500" x1="36" y1="16" x2="16" y2="36" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Page;
