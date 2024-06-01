"use client";
import React, { useEffect } from 'react';
import { usertemplatepurchase } from '../pages/api/api';


const Page = () => {

  useEffect(async() => {
    const purchasedItem = await localStorage.getItem("purchasedItem");
    if (purchasedItem) {
      const data = JSON.parse(purchasedItem);
      await usertemplatepurchase(data);
      localStorage.removeItem("purchasedItem");
      
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4 text-green-600">Payment Success</h1>
        <p className="text-lg text-gray-700 mb-6">Thank you for your purchase! Your transaction was successful.</p>
        <div className="flex justify-center mb-6">
          <svg className="w-16 h-16 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="stroke-current text-green-500" cx="26" cy="26" r="25" fill="none" strokeWidth="3" />
            <path className="stroke-current text-green-500" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        
      </div>
    </div>
  );
}

export default Page;
