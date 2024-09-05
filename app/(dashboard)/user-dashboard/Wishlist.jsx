import React from "react";
import { Trash, Heart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Learn Ethical Hacking From Scratch",
    href: "#",
    price: "₹47,199",
    originalPrice: "₹48,900",
    discount: "5% Off",
    course: "Marvin McKinney",
    size: "8 UK",
    imageSrc: "/wishlist-1.png",
  },
  {
    id: 2,
    name: "Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates",
    href: "#",
    price: "₹1,549",
    originalPrice: "₹2,499",
    discount: "38% off",
    course: "Esther Howard",
    leadTime: "3-4 weeks",
    size: "8 UK",
    imageSrc: "/wishlist-2.png",
  },
];

export default function Whishlist() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col space-y-4 p-4 sm:p-6 sm:px-2">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-blue-950 text-center sm:text-start">
        Wishlist
      </h2>
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius
        repellat ipsam, sit praesentium incidunt.
      </p>
      <ul className="flex flex-col divide-y divide-gray-200">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex flex-col py-4 sm:py-6 sm:flex-row sm:justify-between"
          >
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img
                className="h-24 sm:h-32 w-24 sm:w-36 flex-shrink-0 rounded object-contain"
                src={product.imageSrc}
                alt={product.name}
              />
              <div className="flex w-full flex-col justify-between pb-2 sm:pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-semibold leading-snug sm:pr-8">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm">
                      <span className="text-gray-400">Course by</span>:{" "}
                      {product.course}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-base sm:text-lg font-semibold">
                      {product.price}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4 text-xs sm:text-sm">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-2 py-1 pl-0"
                  >
                    <Trash size={16} />
                    <span>Remove</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-2 py-1"
                  >
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
        <p className="text-sm sm:text-base">
          Total amount: <span className="font-semibold">₹48,967</span>
        </p>
      </div>
      <div className="flex justify-end space-x-2 sm:space-x-4">
        <button
          type="button"
          className="rounded-md border border-[#FF6636] px-3 py-2 text-xs sm:text-sm font-semibold text-[#FF6636]"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
