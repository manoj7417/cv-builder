"use client";
export const dynamic = "force-dynamic";
import { GetTokens } from "@/app/actions";
import CoachTableSkeleton from "@/components/component/AdminDashboard/CoachTableSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaLongArrowAltRight,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Coach = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [coaches, setAllCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  const handleCoachDetails = (id) => {
    router.push(`/admin/coach/${id}`);
  };

  const fetchAllCoaches = async () => {
    try {
      const response = await axios.get(`/api/getAllCoaches`);
      const data = await response.data;
      setAllCoaches(data.coaches);
      setData(data.coaches);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterData = (type) => {
    setIsLoading(true);
    if (type === "editRequests") {
      setData(requests);
      setIsLoading(false);
      return;
    }
    if (type === "all") {
      setData(coaches);
      setIsLoading(false);
      return;
    }
    const filteredData = coaches.filter(
      (coach) => coach.approvalStatus === type
    );
    setData(filteredData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllCoaches();
    handlegetEditCoach();
  }, []);

  return (
    <div className="bg-white px-10">
      <h1 className="text-2xl p-5 font-bold">Coaches</h1>
      <Tabs defaultValue="all">
        <TabsList className="flex space-x-4">
          <TabsTrigger value="all" onClick={() => handleFilterData("all")}>
            All
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            onClick={() => handleFilterData("approved")}
          >
            Approved
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            onClick={() => handleFilterData("pending")}
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            onClick={() => handleFilterData("rejected")}
          >
            Rejected
          </TabsTrigger>
          <TabsTrigger
            value="editRequests"
            onClick={() => handleFilterData("editRequests")}
          >
            Edit Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="inline-block min-w-full py-2 align-middle">
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
                      className="px-4 py-3.5 text-sm font-normal text-gray-700 text-center"
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
                      {data.length > 0 &&
                        data?.map((coach) => (
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
                            <td className="px-4 py-4 text-center w-[25%]">
                              <div className="flex gap-1 items-center justify-center text-sm text-gray-900">
                                <FaDollarSign className="text-orange-500" />{" "}
                                {coach?.ratesPerHour?.charges}
                              </div>
                            </td>
                            <td className="px-4 py-4 w-[25%]">
                              <div className="flex justify-center">
                                {coach.isApproved ? (
                                  <span className="text-xs text-green-800 px-2 py-1 rounded-lg bg-green-100">
                                    Approved
                                  </span>
                                ) : (
                                  <span className="text-xs text-red-800 px-2 py-1 rounded-lg bg-red-100">
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
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="inline-block min-w-full py-2 align-middle">
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
                      className="px-4 py-3.5 text-sm font-normal text-gray-700 text-center"
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
                      {data.length > 0 &&
                        data?.map((coach) => (
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
                            <td className="px-4 py-4 text-center w-[25%]">
                              <div className="flex gap-1 items-center justify-center text-sm text-gray-900">
                                <FaDollarSign className="text-orange-500" />{" "}
                                {coach?.ratesPerHour?.charges}
                              </div>
                            </td>
                            <td className="px-4 py-4 w-[25%]">
                              <div className="flex justify-center">
                                {coach.isApproved ? (
                                  <span className="text-xs text-green-800 px-2 py-1 rounded-lg bg-green-100">
                                    Approved
                                  </span>
                                ) : (
                                  <span className="text-xs text-red-800 px-2 py-1 rounded-lg bg-red-100">
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
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="inline-block min-w-full py-2 align-middle">
            {/* Similar table content as "all", but filtered by "pending" */}
          </div>
        </TabsContent>

        <TabsContent value="rejected">
          <div className="inline-block min-w-full py-2 align-middle">
            {/* Similar table content as "all", but filtered by "rejected" */}
          </div>
        </TabsContent>

        <TabsContent value="editRequests">
          <div className="inline-block min-w-full py-2 align-middle">
            {/* Similar table content as "all", but filtered by "editRequests" */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Coach;
