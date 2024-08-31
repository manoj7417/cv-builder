"use client";
import React, { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { GetTokens } from '../actions';
import { useUserStore } from '../store/UserStore';


const PaymentSuccess = () => {
  const router = useRouter()
  const updateUserData = useUserStore(state => state.updateUserData)
  const userState = useUserStore(state => state.userState)

  const fetchUserDetials = async () => {
    const { accessToken } = await GetTokens()
    const token = accessToken?.value;
    try {
      const response = await axios.get("/api/getUserProfile", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      if (response.status === 200) {
        updateUserData(response.data.data)
        if (userState.pricingRedirectRoute) {
          return router.push(`/${userState.pricingRedirectRoute}`)
        }

      }
    } catch (error) {
  console.log(error)
    } finally {
      router.push('/')
    }
  }

  useEffect(() => {
    fetchUserDetials()
  })

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

const Page = () => {
  return <Suspense >
    <PaymentSuccess />
  </Suspense>
}

export default Page;
