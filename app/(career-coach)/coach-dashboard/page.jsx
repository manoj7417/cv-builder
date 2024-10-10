"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandRock,
  faThumbsUp,
  faClappingHands,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useCoachStore } from "@/app/store/coachStore";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetTokens } from "@/app/actions";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Skeleton from "react-loading-skeleton";

const CoachDashboardPage = () => {
  const { userdata } = useCoachStore((state) => state.userState);
  const [bookingSlot, setBookingSlot] = useState([]);
  const [loading, setLoading] = useState(true);

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  function formatDate(timestamp) {
    const date = new Date(timestamp);

    // Options for date formatting
    const options = {
      month: "short", // Short month name (e.g., "Aug")
      day: "numeric", // Day of the month (e.g., "3")
      year: "numeric", // Full year (e.g., "2024")
      hour: "2-digit", // Hour (e.g., "17")
      minute: "2-digit", // Minutes (e.g., "00")
      hour12: false, // Use 24-hour format
    };

    return date.toLocaleString("en-US", options).replace(",", ""); // Format and remove extra comma
  }

  const handleGetBookings = async () => {
    const { accessToken } = await GetTokens();
    if (!accessToken || !accessToken.value) {
      return router.push("/login?redirect=/user-dashboard");
    }
    setLoading(true);
    try {
      const response = await axios.get("/api/bookings", {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        setBookingSlot(response.data.bookings);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetBookings();
  }, []);

  return (
    <>
      <div className="w-full bg-white p-7">
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row w-full mt-10">
          {/* START-PART 1 */}
          <div className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[70%] 2xl:w-[70%]">
            <h2 className="text-2xl my-3 font-bold  text-[#092C4C]">
              Upcoming Appointment
            </h2>
            <div className="flex gap-5 flex-wrap">
              {loading
                ? Array.from({ length: 4 }).map(
                    (
                      _,
                      index // Render 4 skeleton cards
                    ) => (
                      <div key={index}>
                        <div className="h-auto w-full xl:w-[300px] lg:w-[300px] bg-gray-200 rounded-lg p-5 relative overflow-hidden">
                          {/* Skeleton for title and icon */}
                          <div className="flex justify-between items-center">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-6 rounded-full" />
                          </div>
                          {/* Skeleton for avatar and name */}
                          <div className="flex items-center mb-6 w-full mt-5">
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <Skeleton className="ml-2 h-4 w-20" />
                          </div>
                          {/* Skeleton for appointment date and country */}
                          <div className="flex justify-between items-center mt-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                          {/* Skeleton for buttons */}
                          <div className="flex justify-between items-center mt-10">
                            <Skeleton className="h-10 w-24 rounded-full" />
                            <Skeleton className="h-10 w-24 rounded-full" />
                          </div>
                        </div>
                      </div>
                    )
                  )
                : bookingSlot.length > 0 &&
                  bookingSlot.map((item, index) => (
                    <div key={index}>
                      <div className="h-auto w-full xl:w-[300px] lg:w-[300px] bg-[#1d4ed8] rounded-lg p-5 relative overflow-hidden">
                        <div className="flex justify-between items-center">
                          <div className="text-lg font-bold text-[#FFF]">
                            Next Appointment
                          </div>
                          <div>
                            <img
                              src="/coach_dot_icon.png"
                              alt=""
                              className=""
                            />
                          </div>
                        </div>
                        <div className="flex items-center mb-6 w-full mt-5">
                          <div className="w-12 h-auto overflow-hidden rounded-full">
                            <Image
                              src="/new_appointment_img.png"
                              alt="Profile Image"
                              width={44}
                              height={44}
                            />
                          </div>
                          <div className="ml-1">
                            <p className="text-[13px] font-bold text-white">
                              {item?.userId?.fullname}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-sm text-[#FFF]">
                            Appointment Date
                          </div>
                          <div className="text-sm text-[#FFF]">Country</div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-sm font-bold text-[#FFF]">
                            {formatDate(item?.date)}
                          </div>
                          <div className="text-sm font-bold text-[#FFF]">
                            {item?.country}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-10">
                          <div className="text-sm font-bold text-[#FFF]">
                            <button className="rounded-full p-3 xl:p-2 2xl:p-3 bg-white w-24 xl:w-20 text-black">
                              Start
                            </button>
                          </div>
                          <div className="text-sm font-bold text-[#FFF]">
                            <button className="rounded-full p-3 xl:p-2 2xl:p-3 bg-white w-24 xl:w-20 text-black">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          {/* END-PART 1 */}
          {/* START-PART 3 */}
          <div className="w-[100%] sm:w-[100%] pt-7 lg:pt-0 md:w-[100%] lg:w-[100%] xl:w-[30%] 2xl:w-[30%] lg:pl-10 xl:pl-10 2xl:pl-10">
            <div className="flex flex-col sm:flex-row md:flex-row lg:flex-col gap-7 justify-around">
              <div className="bg-[#FFFFFF] border border-[#EAEEF4] p-5 rounded-lg text-left">
                <div className="text-[18px] font-bold text-[#7E92A2]">
                  Total No. Of Students
                </div>
                <div className="flex justify-between w-full mt-7">
                  <div className="text-[48px] font-bold text-[#092C4C]">00</div>
                  <div>
                    <Image
                      src="/total_students.png"
                      alt="Profile Image"
                      width={80}
                      height={80}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-[#FFFFFF] border border-[#EAEEF4] p-5 rounded-lg text-left">
                <div className="text-[18px] font-bold text-[#7E92A2]">
                  Total Appointment
                </div>
                <div className="flex justify-between w-full mt-7">
                  <div className="text-[48px] font-bold text-[#092C4C]">
                    {bookingSlot.length}
                  </div>
                  <div>
                    <Image
                      src="/total_appointment.png"
                      alt="Profile Image"
                      width={80}
                      height={80}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END-PART 3 */}
        </div>
      </div>
      <div className="max-w-5xl ms-10 appointment">
        <div className="main_heading">
          <h2 className="text-2xl font-bold  text-[#092C4C]">
            Today’ s Appointment
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Slot Time</TableHead>
              <TableHead>Country</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map(
                  (
                    _,
                    index // Example: Render 5 skeleton rows
                  ) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Skeleton className="w-10 h-10 rounded-full" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                    </TableRow>
                  )
                )
              : bookingSlot.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={item.userId.avatar}
                            alt={item.userId.fullname}
                          />
                          <AvatarFallback>
                            {item.userId.fullname
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{item.userId.fullname}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-red-500">
                      {item.status}
                    </TableCell>
                    <TableCell>
                      {item.slotTime.startTime}-{item.slotTime.endTime}
                    </TableCell>
                    <TableCell>{item.country}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CoachDashboardPage;
