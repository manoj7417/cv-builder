"use client";
import React, { Suspense, useEffect } from 'react';
import { PurchaseTokens, usertemplatepurchase } from '../pages/api/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '../store/UserStore';
import { GetTokens } from '../actions';

const PaymentSuccess = () => {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const updateUserData = useUserStore(state => state.updateUserData)
  const router = useRouter()
  const purchaseItem = async () => {
    try {
      const purchasedItem = localStorage.getItem("purchasedItem");
      if (purchasedItem) {
        const data = JSON.parse(purchasedItem);
        const response = await usertemplatepurchase(data);
        if (response.data.userdata) {
          updateUserData(response.data.userdata)
          localStorage.removeItem("purchasedItem");
        }
      }
    } catch (error) {
      throw error;
    } finally {
      router.push('/builder')
    }
  }

  const purchaseTokens = async () => {
    const { accessToken } = await GetTokens()
    if(!accessToken ) {
      router.push('/login')
      return;
    }
    try {
      const response = await PurchaseTokens(accessToken.value)
      if (response.status === 200) {
        updateUserData(response.data.userdata)
      }
    } catch (error) {
      throw error
    } finally {
      router.push('/analyser/feedback?status=success')
    }
  }

  useEffect(() => {
    if (type) {
      purchaseTokens()
    } else {
      purchaseItem()
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

const Page = () => {
  return <Suspense >
    <PaymentSuccess />
  </Suspense>
}

export default Page;
