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
      <div className="pt-[10px]">
        <div
          className="bg-white border border-gray-300 p-5 flex justify-between items-start cursor-pointer gap-5"
          onClick={toggle}
        >
          <div>
            <p className="lg:text-base text-sm font-semibold">
              1st Septembar, 2021 at 11:30 PM
            </p>
            <ul className="flex gap-10 mt-2">
              <li className="text-sm text-gray-800 flex items-center gap-1">
                <FaRegCirclePlay className="text-sm text-blue-500" />3 Courses
              </li>
              <li className="text-sm text-gray-800  flex items-center gap-1">
                <FaDollarSign className="text-sm text-orange-500" />
                $75.00 USD
              </li>
              <li className="text-sm text-gray-800 flex items-center gap-1">
                <FaRegCreditCard className="text-sm text-green-500" />
                Credit Card
              </li>
            </ul>
          </div>
          <div className="text-sm bg-[#FF6636] text-white p-2">
            {open ? <IoArrowUp /> : <IoArrowDown />}
          </div>
        </div>
        <Collapse isOpened={open}>
          <div className="bg-white lg:text-[15px] text-[12px] font-medium">
            <div className="ansers_section border border-gray-300">
              <div className="grid grid-cols-2 place-items-center">
                <div className="user_history p-5">
                  <ul className="flex flex-col divide-y divide-gray-200">
                    {products.map((product) => (
                      <li
                        key={product.id}
                        className="flex flex-col py-6 sm:flex-row sm:justify-between"
                      >
                        <div className="flex w-full space-x-2 sm:space-x-4">
                          <img
                            className="h-32 w-36 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-40"
                            src={product.imageSrc}
                            alt={product.name}
                          />
                          <div className="flex w-full flex-col justify-between pb-4">
                            <div className="flex w-full justify-between space-x-2 pb-2">
                              <div className="space-y-1">
                                <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                                  {product.name}
                                </h3>
                                <p className="text-sm">
                                  <span className="text-gray-400">
                                    Course by
                                  </span>
                                  : {product.course}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-semibold text-[#FF6636]">
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
                <div className="user_time">
                  <div>
                    <p className="lg:text-base text-sm font-semibold">
                      1st Septembar, 2021 at 11:30 PM
                    </p>
                    <ul className="flex gap-10 mt-2 pl-0">
                      <li className="text-sm text-gray-800 flex items-center gap-1">
                        <FaRegCirclePlay className="text-sm text-blue-500" />3
                        Courses
                      </li>
                      <li className="text-sm text-gray-800  flex items-center gap-1">
                        <FaDollarSign className="text-sm text-orange-500" />
                        $75.00 USD
                      </li>
                      <li className="text-sm text-gray-800 flex items-center gap-1">
                        <FaRegCreditCard className="text-sm text-green-500" />
                        Credit Card
                      </li>
                    </ul>
                  </div>
                   <div className="user_purchase_name">
                    <div className="name">
                        <p>Kevin Gilbert</p>
                    </div>
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
