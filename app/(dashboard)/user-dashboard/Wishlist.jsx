import React from 'react'
import { Trash, Heart } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'Learn Ethical Hacking From Scratch',
    href: '#',
    price: '₹47,199',
    originalPrice: '₹48,900',
    discount: '5% Off',
    course: 'Marvin McKinney',
    size: '8 UK',
    imageSrc:
      '/wishlist-1.png',
  },
  {
    id: 2,
    name: 'Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates',
    href: '#',
    price: '₹1,549',
    originalPrice: '₹2,499',
    discount: '38% off',
    course: 'Esther Howard',
    leadTime: '3-4 weeks',
    size: '8 UK',
    imageSrc:
      '/wishlist-2.png',
  },
]

export default function Whishlist() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
      <h2 className="text-3xl font-bold">Your Wishlist</h2>
      <p className="mt-3 text-sm font-medium text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius repellat ipsam, sit
        praesentium incidunt.
      </p>
      <ul className="flex flex-col divide-y divide-gray-200">
        {products.map((product) => (
          <li key={product.id} className="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img
                className="h-32 w-36 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-40"
                src={product.imageSrc}
                alt={product.name}
              />
              <div className="flex w-full flex-col justify-between pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">{product.name}</h3>
                    <p className="text-sm"><span className='text-gray-400'>Course by</span>: {product.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{product.price}</p>
                  </div>
                </div>
                <div className="flex divide-x text-sm">
                  <button type="button" className="flex items-center space-x-2 px-2 py-1 pl-0">
                    <Trash size={16} />
                    <span>Remove</span>
                  </button>
                  <button type="button" className="flex items-center space-x-2 px-2 py-1">
                    <Heart size={16} />
                    <span>Add to favorites</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 text-right">
        <p>
          Total amount:
          <span className="font-semibold"> ₹48,967</span>
        </p>
      </div>
      <div className="flex justify-end space-x-4">
        {/* <button
          type="button"
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Back to shop
        </button> */}
        <button
          type="button"
          className="rounded-md border border-[#FF6636] px-3 py-2 text-sm font-semibold text-[#FF6636]"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
