'use client'

import React from 'react'
import { Menu, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { GetTokens } from '../actions'

const plans = [
  {
    name: 'CV Creator',
    price: '$10/mth',
    features: [
      'Access to all basic features ',
      'Reporting and analytics',
      '20 Pdf Download',
    ],
  },
  {
    name: 'CV Optimiser',
    price: '$20/mth',
    features: [
      'Access to all basic features ',
      'Reporting and analytics',
      '20 Pdf Download',
    ],
  },
  {
    name: 'CV Match',
    price: '$40/mth',
    features: [
      'Access to all basic features ',
      'Reporting and analytics',
      '20 Pdf Download',
    ],
  },
]


export default function AddCreditPage() {

  const handleAddMoreCredits = async (serviceName, amount) => {
    const { accessToken } = await GetTokens()
    const data = {
      serviceName,
      amount,
      currency,
      success_url : 'http://localhost:3000/',
      cancel_url : 'http://localhost:3000/',
      currency : 'USD'
    }
    try {
      const response = await axios.post('/api/buy-credits', data, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        }
      })
      if (response.status === 200) {
        const { url } = response.data;
        window.location = url;
      }
    } catch (error) {

    }
  }

  return (
    <div className="mx-auto max-w-7xl px-2 md:px-4 pt-20">
      <div>
        {/* Hero Section */}
        <div className="flex flex-col space-y-8 pb-10 pt-12 text-center md:pt-24">
          <p className="text-3xl font-bold text-blue-900 md:text-5xl md:leading-10">
            Simple, transparent pricing
          </p>
          <p className="mx-auto max-w-3xl text-base text-gray-600 md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veritatis voluptates
            neque itaque repudiandae sint, explicabo assumenda quam ratione placeat?
          </p>
        </div>
        <div className="mt-8 w-full space-y-4 md:mt-12">
          <div className="grid space-y-8 lg:grid-cols-3 lg:space-x-8 lg:space-y-0">
            {plans.map((plan) => (
              <div key={plan.name} className=" rounded-2xl border border-gray-200 bg-white shadow">
                <div className="flex w-full flex-col justify-start space-y-4 px-8 pt-10">
                  <p className="text-4xl font-bold leading-10 text-blue-900">{plan.price}</p>
                  <div className="flex w-full flex-col items-start justify-start space-y-1">
                    <p className="w-full text-2xl font-semibold leading-loose text-blue-900">
                      {plan.name}
                    </p>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start justify-start px-8 pb-10 pt-8">
                  <div className="flex w-full flex-col space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="inline-flex w-full space-x-3">
                        <div className="flex items-center justify-center rounded-full bg-gray-100 p-1">
                          <Check className="h-4 w-4 text-blue-900" />
                        </div>
                        <p className="w-full text-base leading-normal text-gray-800">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex w-full flex-col px-8 pb-8">
                  <div className="flex w-full flex-col items-start justify-start space-y-3">
                    <Button
                      type="button"
                      className="w-full rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                      onClick={() => handleAddMoreCredits(plan.name)}
                    >
                      Add Credit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
