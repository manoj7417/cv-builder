import React from "react";
import { Collapse } from "react-collapse";
import { FaDollarSign } from "react-icons/fa";
import { FaRegCirclePlay, FaRegCreditCard } from "react-icons/fa6";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";

const PurchaseHistory = ({ open, toggle }) => {
  const products = [
    {
      id: 1,
      name: "Learn Ethical Hacking From Scratch",
      href: "#",
      price: "$13.99",
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
      price: "$49.00",
      originalPrice: "₹2,499",
      discount: "38% off",
      course: "Esther Howard",
      leadTime: "3-4 weeks",
      size: "8 UK",
      imageSrc: "/wishlist-2.png",
    },
  ];

  return (
    <div>
      <div className="pt-2">
        <div
          className="bg-white border border-gray-300 p-4 flex justify-between items-start cursor-pointer gap-3 sm:gap-5"
          onClick={toggle}
        >
          <div>
            <p className="text-xs sm:text-sm lg:text-base font-semibold">
              1st September, 2021 at 11:30 PM
            </p>
            <ul className="flex flex-wrap gap-5 sm:gap-10 mt-2">
              <li className="text-xs sm:text-sm text-gray-800 flex items-center gap-1">
                <FaRegCirclePlay className="text-xs sm:text-sm text-blue-500" />
                3 Courses
              </li>
              <li className="text-xs sm:text-sm text-gray-800 flex items-center gap-1">
                <FaDollarSign className="text-xs sm:text-sm text-orange-500" />
                $75.00 USD
              </li>
              <li className="text-xs sm:text-sm text-gray-800 flex items-center gap-1">
                <FaRegCreditCard className="text-xs sm:text-sm text-green-500" />
                Credit Card
              </li>
            </ul>
          </div>
          <div className="text-xs sm:text-sm bg-[#FF6636] text-white p-2 flex-shrink-0">
            {open ? <IoArrowUp /> : <IoArrowDown />}
          </div>
        </div>

        <Collapse isOpened={open}>
          <div className="bg-white text-xs sm:text-sm lg:text-base font-medium">
            <div className="ansers_section border border-gray-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center">
                <div className="user_history p-4">
                  <ul className="flex flex-col divide-y divide-gray-200">
                    {products.map((product) => (
                      <li
                        key={product.id}
                        className="flex flex-col py-4 sm:flex-row sm:justify-between"
                      >
                        <div className="flex w-full space-x-2 sm:space-x-4">
                          <img
                            className="h-24 sm:h-32 w-24 sm:w-36 flex-shrink-0 rounded object-contain"
                            src={product.imageSrc}
                            alt={product.name}
                          />
                          <div className="flex w-full flex-col justify-between">
                            <div className="flex w-full justify-between space-x-2">
                              <div className="space-y-1">
                                <h3 className="text-base sm:text-lg font-semibold leading-snug">
                                  {product.name}
                                </h3>
                                <p className="text-xs sm:text-sm">
                                  <span className="text-gray-400">
                                    Course by
                                  </span>
                                  : {product.course}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-base sm:text-lg font-semibold text-[#FF6636]">
                                  {product.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="user_time p-4">
                  <div>
                    <p className="text-xs sm:text-sm lg:text-base font-semibold">
                      1st September, 2021 at 11:30 PM
                    </p>
                    <ul className="flex flex-wrap gap-5 sm:gap-10 mt-2 pl-0">
                      <li className="text-xs sm:text-sm text-gray-800 flex items-center gap-1">
                        <FaRegCirclePlay className="text-xs sm:text-sm text-blue-500" />
                        3 Courses
                      </li>
                      <li className="text-xs sm:text-sm text-gray-800 flex items-center gap-1">
                        <FaDollarSign className="text-xs sm:text-sm text-orange-500" />
                        $75.00 USD
                      </li>
                      <li className="text-xs sm:text-sm text-gray-800 flex items-center gap-1">
                        <FaRegCreditCard className="text-xs sm:text-sm text-green-500" />
                        Credit Card
                      </li>
                    </ul>
                  </div>
                  <div className="user_purchase_name mt-2">
                    <p className="text-xs sm:text-sm lg:text-base font-semibold">
                      Kevin Gilbert
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default PurchaseHistory;
