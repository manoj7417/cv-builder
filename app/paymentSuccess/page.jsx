"use client";
import React, { useEffect } from 'react'
import { usertemplatepurchase } from '../pages/api/api';

const Page = () => {

  useEffect(async() => {
    await purchasedItem();
  }, [])


  const purchasedItem = () =>{
    const purchasedItem = localStorage.getItem("purchasedItem");
    if (purchasedItem) {
      const data = JSON.parse(purchasedItem);
      usertemplatepurchase(data);
    }
  }

  return (
    <div>
        
        <h1>Payment Success</h1>

    </div>
  )
}

export default Page;