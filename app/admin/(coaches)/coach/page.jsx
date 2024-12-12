/** @format */
"use client";
export const dynamic = "force-dynamic";
import { GetTokens } from "@/app/actions";
import CoachTableSkeleton from "@/components/component/AdminDashboard/CoachTableSkeleton";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "react-toastify";

const Coach = () => {
  const router = useRouter();

  const [coaches, setAllCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  const handleCoachDetails = (id) => {
    router.push(`/admin/coach/${id}`);
  };

  const handleEditCoachRequests = (id) => {
    router.push(`/admin/coach/${id}/edit`);
  };

  const fetchAllCoaches = async () => {
    try {
      const response = await axios.get(`/api/getAllCoaches`);
      const data = await response.data;
      setAllCoaches(data.coaches);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlegetEditCoach = async () => {
    const { accessToken } = await GetTokens();
    if (!accessToken && !accessToken?.value) {
      toast("Please login");
      return;
    }
    try {
      const response = await axios.get("/api/getEditCoachRequests", {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        setRequests(response.data.editCoaches);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCoaches();
    handlegetEditCoach();
  }, []);

  return (
    <div className="bg-white  px-10">
      <h1 className="text-2xl p-5 font-bold">Coaches</h1>
      <div className="coach_tabs_section">
        <Tabs defaultValue="all" className="w-full h-screen flex flex-col">
          <TabsList className="flex">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-blue-300 data-[state=active]:text-blue-500"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              className="data-[state=active]:bg-green-300 data-[state=active]:text-green-500"
            >
              Approved
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-red-300 data-[state=active]:text-red-500"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="data-[state=active]:bg-orange-300 data-[state=active]:text-orange-500"
            >
              Rejected
            </TabsTrigger>
            <TabsTrigger
              value="editRequests"
              className="data-[state=active]:bg-yellow-300 data-[state=active]:text-yellow-500"
            >
              Edit Requests
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg mt-10">
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
                          <tr
                            key={coach?.name}
                            className="w-full border hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleCoachDetails(coach?._id)}
                          >
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
          </TabsContent>
          <TabsContent value="approved">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg mt-10">
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
                          ?.filter(
                            (coach) => coach.approvalStatus === "approved"
                          )
                          .map((coach) => (
                            <tr
                              key={coach?.name}
                              className="w-full border hover:bg-gray-50 cursor-pointer"
                              onClick={() => handleCoachDetails(coach?._id)}
                            >
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
          </TabsContent>
          <TabsContent value="pending">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg mt-10">
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
                          ?.filter(
                            (coach) => coach.approvalStatus === "pending"
                          )
                          .map((coach) => (
                            <tr
                              key={coach?.name}
                              className="w-full border hover:bg-gray-50 cursor-pointer"
                              onClick={() => handleCoachDetails(coach?._id)}
                            >
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
          </TabsContent>
          <TabsContent value="rejected">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg mt-10">
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
                  <tr>
                    <td colSpan="4" className="h-[250px]">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
                          <FaUser className="text-4xl text-blue-800" />
                        </div>
                        <p className="mt-5 text-gray-600 text-lg">
                          No Coaches Found
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="editRequests">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg mt-10">
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
                      {requests.length > 0 &&
                        requests.map((coach) => (
                          <tr
                            key={coach?.name}
                            className="w-full border hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleEditCoachRequests(coach?._id)}
                          >
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Coach;
