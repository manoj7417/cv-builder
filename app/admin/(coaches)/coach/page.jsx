/** @format */
"use client";
import useCoachesDetailStore from "@/app/store/coachDetailStore";
import CoachTableSkeleton from "@/components/component/AdminDashboard/CoachTableSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaDollarSign,
  FaLongArrowAltRight,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const people = [
  {
    id: 1,
    name: "John Doe",
    fees: "75.00 USD",
    role: "Career Development",
    image:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    id: 2,
    name: "Jane Doe",
    fees: "75.00 USD",
    role: "Career Development",
    image:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
];

const Coach = () => {
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();
  const { coaches, isLoading, fetchAllCoaches } = useCoachesDetailStore();
  console.log("coaches::",coaches)

  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  const [allCoaches, setAllCoaches] = useState([]);

  const handleCoachDetails = (id) => {
    router.push(`/admin/coach/${id}`);
  };

  useEffect(() => {
    fetchAllCoaches(); // Fetch coaches when the component mounts
  }, [fetchAllCoaches]);

  return (
    <div className="bg-white  px-10">
      <h1 className="text-2xl p-5 font-bold">Coaches</h1>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full h-screen flex flex-col"
      >
        <TabsList className="flex justify-start">
          <TabsTrigger
            value="all"
            className="px-4 py-2 text-sm text-blue-500 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500"
          >
            All Coaches
          </TabsTrigger>
          <TabsTrigger
            value="accepted"
            className="px-4 py-2 text-sm text-green-500  data-[state=active]:bg-green-50 data-[state=active]:text-green-500"
          >
            Approved
          </TabsTrigger>
          <TabsTrigger
            value="declined"
            className="px-4 py-2 text-sm text-red-500  data-[state=active]:bg-red-50 data-[state=active]:text-red-500"
          >
            Declined{" "}
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="px-4 py-2 text-sm text-yellow-500 data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-500"
          >
            Pending{" "}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="flex-grow p-6">
          <div className="inline-block min-w-full py-2 align-middle ">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                    >
                      <span>Coach</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5  text-sm font-normal text-gray-700 text-center"
                    >
                      Fees
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isLoading ? (
                    <CoachTableSkeleton />
                  ) : (
                    <>
                      {coaches.length > 0 &&
                        coaches?.map((coach) => (
                          <tr key={coach?.name} className="w-full border">
                            <td className="px-4 py-4 w-[25%]">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={coach?.profileImage}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {coach?.name}
                                  </div>
                                  <div className="text-sm text-gray-700">
                                    {coach?.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center w-[25%]">
                              <div className="flex gap-1 items-center justify-center text-sm text-gray-900">
                                <FaDollarSign className="text-orange-500" />{" "}
                                {coach?.ratesPerHour?.charges}
                              </div>
                            </td>
                            <td className="px-4 py-4 w-[25%]">
                              <div className="flex justify-center">
                                {coach.isApproved ? (
                                  <span className="text-xs text-green-800  px-2 py-1  rounded-lg bg-green-100">
                                    Approved
                                  </span>
                                ) : (
                                  <span className="text-xs text-red-800  px-2 py-1  rounded-lg bg-red-100">
                                    Pending
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="w-[25%] text-end px-5">
                              <Button
                                className="bg-white text-blue-900 text-lg hover:bg-white"
                                onClick={() => handleCoachDetails(coach?._id)}
                              >
                                View
                                <FaLongArrowAltRight className="ml-2" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {!isLoading && coaches.length === 0 && (
              <div className="w-full border h-56 bg-white flex flex-col items-center justify-center py-5">
                <div className="w-20 h-20  rounded-full bg-slate-100 flex items-center justify-center">
                  <FaUser className="text-4xl text-blue-800" />
                </div>
                <p className="flex justify-center items-center mt-5">
                  No Coaches Found
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="accepted" className="flex-grow p-6">
          <div className="inline-block min-w-full py-2 align-middle ">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                    >
                      <span>Coach</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5  text-sm font-normal text-gray-700 text-center"
                    >
                      Fees
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isLoading ? (
                    <CoachTableSkeleton />
                  ) : (
                    <>
                      {coaches.length > 0 &&
                        coaches
                            .filter(
                            (coach) =>
                              coach.isApproved &&
                              coach.approvalStatus === "approved"
                          )
                          .map((coach) => (
                            <tr key={coach?.name} className="w-full border">
                              <td className="px-4 py-4 w-[25%]">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <img
                                      className="h-10 w-10 rounded-full object-cover"
                                      src={coach?.profileImage}
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {coach.name}
                                    </div>
                                    <div className="text-sm text-gray-700">
                                      {coach.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-center w-[25%]">
                                <div className="flex gap-1 items-center justify-center text-sm text-gray-900">
                                  <FaDollarSign className="text-orange-500" />{" "}
                                  {coach?.ratesPerHour?.charges}
                                </div>
                              </td>
                              <td className="px-4 py-4 w-[25%]">
                                <div className="flex justify-center">
                                  {coach.isApproved ? (
                                    <span className="text-xs text-green-800  px-2 py-1  rounded-lg bg-green-100">
                                      Approved
                                    </span>
                                  ) : (
                                    <span className="text-xs text-red-800  px-2 py-1  rounded-lg bg-red-100">
                                      Not Approved
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="w-[25%] text-end px-5">
                                <Button
                                  className="bg-white text-blue-900 text-lg hover:bg-white"
                                  onClick={() => handleCoachDetails(coach?._id)}
                                >
                                  View
                                  <FaLongArrowAltRight className="ml-2" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {!isLoading && coaches.length === 0 && (
              <div className="w-full border h-56 bg-white flex flex-col items-center justify-center py-5">
                <div className="w-20 h-20  rounded-full bg-slate-100 flex items-center justify-center">
                  <FaUser className="text-4xl text-blue-800" />
                </div>
                <p className="flex justify-center items-center mt-5">
                  No Coaches Found
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="declined" className="flex-grow p-6"></TabsContent>
        <TabsContent value="pending" className="flex-grow p-6">
          <div className="inline-block min-w-full py-2 align-middle ">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                    >
                      <span>Coach</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5  text-sm font-normal text-gray-700 text-center"
                    >
                      Fees
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isLoading ? (
                    <CoachTableSkeleton />
                  ) : (
                    <>
                      {coaches.length > 0 &&
                        coaches
                          .filter(
                            (coach) =>
                              !coach.isApproved &&
                              coach.approvalStatus === "pending"
                          )
                          .map((coach) => (
                            <tr key={coach?.name} className="w-full border">
                              <td className="px-4 py-4 w-[25%]">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <img
                                      className="h-10 w-10 rounded-full object-cover"
                                      src={coach?.profileImage}
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {coach?.name}
                                    </div>
                                    <div className="text-sm text-gray-700">
                                      {coach?.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-center w-[25%]">
                                <div className="flex gap-1 items-center justify-center text-sm text-gray-900">
                                  <FaDollarSign className="text-orange-500" />{" "}
                                  {coach?.ratesPerHour?.charges}
                                </div>
                              </td>
                              <td className="px-4 py-4 w-[25%]">
                                <div className="flex justify-center">
                                  {coach.isApproved ? (
                                    <span className="text-xs text-green-800  px-2 py-1  rounded-lg bg-green-100">
                                      Approved
                                    </span>
                                  ) : (
                                    <span className="text-xs text-red-800  px-2 py-1  rounded-lg bg-red-100">
                                      Pending
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="w-[25%] text-end px-5">
                                <Button
                                  className="bg-white text-blue-900 text-lg hover:bg-white"
                                  onClick={() => handleCoachDetails(coach?._id)}
                                >
                                  View
                                  <FaLongArrowAltRight className="ml-2" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {!isLoading && coaches.length === 0 && (
              <div className="w-full border h-56 bg-white flex flex-col items-center justify-center py-5">
                <div className="w-20 h-20  rounded-full bg-slate-100 flex items-center justify-center">
                  <FaUser className="text-4xl text-blue-800" />
                </div>
                <p className="flex justify-center items-center mt-5">
                  No Coaches Found
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <div className="coach_section max-w-7xl mx-auto mt-10 p-5">
        <div className="w-full h-full flex">
          <div className="lg:w-[60%] w-full coach_request">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <h2 className="text-lg font-semibold">Coach Request</h2>
                <p className="mt-1 text-sm text-gray-700">
                  This is a list of all coaches. You can edit or delete existing
                  ones.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                          >
                            <span>Coach</span>
                          </th>
                          <th
                            scope="col"
                            className="px-12 py-3.5  text-sm font-normal text-gray-700 text-center"
                          >
                            <span>Fees</span>
                          </th>
                          <th
                            scope="col"
                            className="px-12 py-3.5 text-sm font-normal text-gray-700 text-center"
                          >
                            <span>Status</span>
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {isLoading ? (
                          <>
                            <tr>
                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="flex items-center">
                                  <Skeleton className="h-10 w-10 rounded-full" />
                                  <div className="ml-4 space-y-2">
                                    <Skeleton className="h-4 w-[150px]" />
                                    <Skeleton className="h-4 w-[120px]" />
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-12 py-4">
                                <Skeleton className="h-4 w-[80px]" />
                              </td>
                              <td className="whitespace-nowrap px-12 py-4">
                                <Skeleton className="h-8 w-[100px]" />
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="flex items-center">
                                  <Skeleton className="h-10 w-10 rounded-full" />
                                  <div className="ml-4 space-y-2">
                                    <Skeleton className="h-4 w-[150px]" />
                                    <Skeleton className="h-4 w-[120px]" />
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-12 py-4">
                                <Skeleton className="h-4 w-[80px]" />
                              </td>
                              <td className="whitespace-nowrap px-12 py-4">
                                <Skeleton className="h-8 w-[100px]" />
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="flex items-center">
                                  <Skeleton className="h-10 w-10 rounded-full" />
                                  <div className="ml-4 space-y-2">
                                    <Skeleton className="h-4 w-[150px]" />
                                    <Skeleton className="h-4 w-[120px]" />
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-12 py-4">
                                <Skeleton className="h-4 w-[80px]" />
                              </td>
                              <td className="whitespace-nowrap px-12 py-4">
                                <Skeleton className="h-8 w-[100px]" />
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="flex items-center">
                                  <Skeleton className="h-10 w-10 rounded-full" />
                                  <div className="ml-4 space-y-2">
                                    <Skeleton className="h-4 w-[150px]" />
                                    <Skeleton className="h-4 w-[120px]" />
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-12 py-4">
                                <Skeleton className="h-4 w-[80px]" />
                              </td>
                              <td className="whitespace-nowrap px-12 py-4">
                                <Skeleton className="h-8 w-[100px]" />
                              </td>
                            </tr>
                          </>
                        ) : (
                          <>
                            {allCoaches.length > 0 &&
                              allCoaches.map((coach) => (
                                <tr key={coach.name}>
                                  <td className="whitespace-nowrap px-4 py-4">
                                    <div className="flex items-center">
                                      <div className="h-10 w-10 flex-shrink-0">
                                        <img
                                          className="h-10 w-10 rounded-full object-cover"
                                          src={coach.profileImage}
                                          alt=""
                                        />
                                      </div>
                                      <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                          {coach.name}
                                        </div>
                                        <div className="text-sm text-gray-700">
                                          {coach.email}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-12 py-4">
                                    <div className="flex gap-1 items-center text-sm text-gray-900 ">
                                      <FaDollarSign className="text-orange-500" />{" "}
                                      {coach.ratesPerHour.charges}
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-12 py-4 ">
                                    <Button className="bg-white text-blue-900 text-lg hover:bg-white">
                                      View
                                      <FaLongArrowAltRight className="ml-2" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {!isLoading && allCoaches.length === 0 && (
                    <div className="w-full border h-56 bg-white flex flex-col items-center justify-center py-5">
                      <div className="w-20 h-20  rounded-full bg-slate-100 flex items-center justify-center">
                        <FaUser className="text-4xl text-blue-800" />
                      </div>
                      <p className="flex justify-center items-center mt-5">
                        No Coaches Found
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[40%] w-full coach_appointment">
            <div className="grid grid-cols-1 gap-4 lg:ml-7">
              <div className=" bg-[#FFFFFF] border border-[#EAEEF4] p-5 rounded-lg">
                <div className="flex justify-between items-center mt-2">
                  <div className="text-lg font-bold  text-[#092C4C]">
                    Approve Coaches
                  </div>
                  <div className="text-sm text-[#514EF3]">View All</div>
                </div>
                {/* START-APPOINTMENT  */}
                <div className="flex items-center mb-6 w-full mt-5">
                  <div className="w-12 h-auto overflow-hidden rounded-full">
                    <Image
                      src="/new_appointment_img.png"
                      alt="Profile Image"
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className="ml-1 flex justify-between w-full">
                    <div className="">
                      <div className="text-[14px] font-bold text-[#092C4C]">
                        Coach Name
                      </div>
                      <div className="text-[13px] text-[#7E92A2] mt-2">
                        For Career Development
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-bold text-[#092C4C]">
                        $100
                      </div>
                      <div className="text-[13px] text-[#18A53F] mt-2">
                        Approved
                      </div>
                    </div>
                  </div>
                </div>
                {/* END-APPOINTMENT  */}
                {/* START-APPOINTMENT  */}
                <div className="flex items-center mb-6 w-full mt-5">
                  <div className="w-12 h-auto overflow-hidden rounded-full">
                    <Image
                      src="/new_appointment_img.png"
                      alt="Profile Image"
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className="ml-1 flex justify-between w-full">
                    <div className="">
                      <div className="text-[14px] font-bold text-[#092C4C]">
                        Coach Name
                      </div>
                      <div className="text-[13px] text-[#7E92A2] mt-2">
                        For Career Development
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-bold text-[#092C4C]">
                        $100
                      </div>
                      <div className="text-[13px] text-[#18A53F] mt-2">
                        Approved
                      </div>
                    </div>
                  </div>
                </div>
                {/* END-APPOINTMENT  */}
                {/* START-APPOINTMENT  */}
                <div className="flex items-center mb-6 w-full mt-5">
                  <div className="w-12 h-auto overflow-hidden rounded-full">
                    <Image
                      src="/new_appointment_img.png"
                      alt="Profile Image"
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className="ml-1 flex justify-between w-full">
                    <div className="">
                      <div className="text-[14px] font-bold text-[#092C4C]">
                        Coach Name
                      </div>
                      <div className="text-[13px] text-[#7E92A2] mt-2">
                        For Career Development
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-bold text-[#092C4C]">
                        $100
                      </div>
                      <div className="text-[13px] text-[#18A53F] mt-2">
                        Approved
                      </div>
                    </div>
                  </div>
                </div>
                {/* END-APPOINTMENT  */}
                {/* START-APPOINTMENT  */}
                <div className="flex items-center mb-6 w-full mt-5">
                  <div className="w-12 h-auto overflow-hidden rounded-full">
                    <Image
                      src="/new_appointment_img.png"
                      alt="Profile Image"
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className="ml-1 flex justify-between w-full">
                    <div className="">
                      <div className="text-[14px] font-bold text-[#092C4C]">
                        Coach Name
                      </div>
                      <div className="text-[13px] text-[#7E92A2] mt-2">
                        For Career Development
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-bold text-[#092C4C]">
                        $100
                      </div>
                      <div className="text-[13px] text-[#18A53F] mt-2">
                        Approved
                      </div>
                    </div>
                  </div>
                </div>
                {/* END-APPOINTMENT  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coach;
