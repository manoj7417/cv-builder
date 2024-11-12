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



const Coach = () => {
  const router = useRouter();
  const [data, setData] = useState([])
  const [coaches, setAllCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState([])
  const [filter, setFilter] = useState('all')
  const handleCoachDetails = (id) => {
    if (filter === 'editRequests') {
      router.push(`/admin/coach/${id}/edit`)
      return;
    }
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
    const { accessToken } = await GetTokens()
    if (!accessToken && !accessToken.value) {
      toast("Please login")
      return
    }
    try {
      const response = await axios.get("/api/getEditCoachRequests", {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        }
      })
      if (response.status === 200) {
        setRequests(response.data.editCoaches)
      }
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterData = (type) => {
    setIsLoading(true)
    if (type === 'editRequests') {
      setData(requests)
      setFilter('editRequests')
      setIsLoading(false)
      return;
    }
    if (type === 'all') {
      setData(coaches)
      setFilter('all')
      setIsLoading(false)
      return;
    }
    const filteredData = coaches.filter(coach => coach.approvalStatus === type);
    setData(filteredData);
    setIsLoading(false)
    setFilter(type)
  }

  useEffect(() => {
    fetchAllCoaches();
    handlegetEditCoach()
  }, []);





  return (
    <div className='bg-white  px-10'>
      <h1 className='text-2xl p-5 font-bold'>Coaches</h1>
      {/* <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className='w-full h-screen flex flex-col'>
        <TabsList className='flex justify-start'>
          <TabsTrigger
            value='all'
            className='px-4 py-2 text-sm text-blue-500 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500'>
            All Coaches
          </TabsTrigger>
          <TabsTrigger
            value='accepted'
            className='px-4 py-2 text-sm text-green-500  data-[state=active]:bg-green-50 data-[state=active]:text-green-500'>
            Approved
          </TabsTrigger>
          <TabsTrigger
            value='declined'
            className='px-4 py-2 text-sm text-red-500  data-[state=active]:bg-red-50 data-[state=active]:text-red-500'>
            Declined{" "}
          </TabsTrigger>
          <TabsTrigger
            value='pending'
            className='px-4 py-2 text-sm text-yellow-500 data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-500'>
            Pending{" "}
          </TabsTrigger>
        </TabsList>
        <TabsContent value='all' className='flex-grow p-6'>
          <div className='inline-block min-w-full py-2 align-middle '>
            <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-center text-sm font-normal text-gray-700'>
                      <span>Coach</span>
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5  text-sm font-normal text-gray-700 text-center'>
                      Fees
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-center text-sm font-normal text-gray-700'>
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-center text-sm font-normal text-gray-700'></th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {isLoading ? (
                    <CoachTableSkeleton />
                  ) : (
                    <>
                      {coaches.length > 0 &&
                        coaches?.map((coach) => (
                          <tr key={coach?.name} className='w-full border'>
                            <td className='px-4 py-4 w-[25%]'>
                              <div className='flex items-center'>
                                <div className='h-10 w-10 flex-shrink-0'>
                                  <img
                                    className='h-10 w-10 rounded-full object-cover'
                                    src={coach?.profileImage}
                                    alt=''
                                  />
                                </div>
                                <div className='ml-4'>
                                  <div className='text-sm font-medium text-gray-900'>
                                    {coach?.name}
                                  </div>
                                  <div className='text-sm text-gray-700'>
                                    {coach?.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='px-4 py-4 text-center w-[25%]'>
                              <div className='flex gap-1 items-center justify-center text-sm text-gray-900'>
                                <FaDollarSign className='text-orange-500' />{" "}
                                {coach?.ratesPerHour?.charges}
                              </div>
                            </td>
                            <td className='px-4 py-4 w-[25%]'>
                              <div className='flex justify-center'>
                                {coach.isApproved ? (
                                  <span className='text-xs text-green-800  px-2 py-1  rounded-lg bg-green-100'>
                                    Approved
                                  </span>
                                ) : (
                                  <span className='text-xs text-red-800  px-2 py-1  rounded-lg bg-red-100'>
                                    Pending
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className='w-[25%] text-end px-5'>
                              <Button
                                className='bg-white text-blue-900 text-lg hover:bg-white'
                                onClick={() => handleCoachDetails(coach?._id)}>
                                View
                                <FaLongArrowAltRight className='ml-2' />
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
              <div className='w-full border h-56 bg-white flex flex-col items-center justify-center py-5'>
                <div className='w-20 h-20  rounded-full bg-slate-100 flex items-center justify-center'>
                  <FaUser className='text-4xl text-blue-800' />
                </div>
                <p className='flex justify-center items-center mt-5'>
                  No Coaches Found
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value='accepted' className='flex-grow p-6'>
          <div className='inline-block min-w-full py-2 align-middle '>
            <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-center text-sm font-normal text-gray-700'>
                      <span>Coach</span>
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5  text-sm font-normal text-gray-700 text-center'>
                      Fees
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-center text-sm font-normal text-gray-700'>
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-center text-sm font-normal text-gray-700'></th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
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
                            <tr key={coach?.name} className='w-full border'>
                              <td className='px-4 py-4 w-[25%]'>
                                <div className='flex items-center'>
                                  <div className='h-10 w-10 flex-shrink-0'>
                                    <img
                                      className='h-10 w-10 rounded-full object-cover'
                                      src={coach?.profileImage}
                                      alt=''
                                    />
                                  </div>
                                  <div className='ml-4'>
                                    <div className='text-sm font-medium text-gray-900'>
                                      {coach.name}
                                    </div>
                                    <div className='text-sm text-gray-700'>
                                      {coach.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className='px-4 py-4 text-center w-[25%]'>
                                <div className='flex gap-1 items-center justify-center text-sm text-gray-900'>
                                  <FaDollarSign className='text-orange-500' />{" "}
                                  {coach?.ratesPerHour?.charges}
                                </div>
                              </td>
                              <td className='px-4 py-4 w-[25%]'>
                                <div className='flex justify-center'>
                                  {coach.isApproved ? (
                                    <span className='text-xs text-green-800  px-2 py-1  rounded-lg bg-green-100'>
                                      Approved
                                    </span>
                                  ) : (
                                    <span className='text-xs text-red-800  px-2 py-1  rounded-lg bg-red-100'>
                                      Not Approved
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className='w-[25%] text-end px-5'>
                                <Button
                                  className='bg-white text-blue-900 text-lg hover:bg-white'
                                  onClick={() =>
                                    handleCoachDetails(coach?._id)
                                  }>
                                  View
                                  <FaLongArrowAltRight className='ml-2' />
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
              <div className='w-full border h-56 bg-white flex flex-col items-center justify-center py-5'>
                <div className='w-20 h-20  rounded-full bg-slate-100 flex items-center justify-center'>
                  <FaUser className='text-4xl text-blue-800' />
                </div>
                <p className='flex justify-center items-center mt-5'>
                  No Coaches Found
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value='declined' className='flex-grow p-6'></TabsContent>
        <TabsContent value='pending' className='flex-grow p-6'>
          <div className='inline-block min-w-full py-2 align-middle '>
            <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-center text-sm font-normal text-gray-700'>
                      <span>Coach</span>
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5  text-sm font-normal text-gray-700 text-center'>
                      Fees
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-center text-sm font-normal text-gray-700'>
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-center text-sm font-normal text-gray-700'></th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
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
                            <tr key={coach?.name} className='w-full border'>
                              <td className='px-4 py-4 w-[25%]'>
                                <div className='flex items-center'>
                                  <div className='h-10 w-10 flex-shrink-0'>
                                    <img
                                      className='h-10 w-10 rounded-full object-cover'
                                      src={coach?.profileImage}
                                      alt=''
                                    />
                                  </div>
                                  <div className='ml-4'>
                                    <div className='text-sm font-medium text-gray-900'>
                                      {coach?.name}
                                    </div>
                                    <div className='text-sm text-gray-700'>
                                      {coach?.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className='px-4 py-4 text-center w-[25%]'>
                                <div className='flex gap-1 items-center justify-center text-sm text-gray-900'>
                                  <FaDollarSign className='text-orange-500' />{" "}
                                  {coach?.ratesPerHour?.charges}
                                </div>
                              </td>
                              <td className='px-4 py-4 w-[25%]'>
                                <div className='flex justify-center'>
                                  {coach.isApproved ? (
                                    <span className='text-xs text-green-800  px-2 py-1  rounded-lg bg-green-100'>
                                      Approved
                                    </span>
                                  ) : (
                                    <span className='text-xs text-red-800  px-2 py-1  rounded-lg bg-red-100'>
                                      Pending
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className='w-[25%] text-end px-5'>
                                <Button
                                  className='bg-white text-blue-900 text-lg hover:bg-white'
                                  onClick={() =>
                                    handleCoachDetails(coach?._id)
                                  }>
                                  View
                                  <FaLongArrowAltRight className='ml-2' />
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
              <div className='w-full border h-56 bg-white flex flex-col items-center justify-center py-5'>
                <div className='w-20 h-20  rounded-full bg-slate-100 flex items-center justify-center'>
                  <FaUser className='text-4xl text-blue-800' />
                </div>
                <p className='flex justify-center items-center mt-5'>
                  No Coaches Found
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs> */}
      <div className=" flex items-center">
        <div className="mx-2">
          <Badge className={`bg-blue-200 text-blue-500 py-1 cursor-pointer ${filter === "all" ? "bg-blue-500 text-white shadow-xl px-3 py-2" : ""}`} onClick={() => handleFilterData("all")}>All</Badge>
        </div>
        <div className="mx-2">
          <Badge className={`bg-green-200 text-green-500 py-1 cursor-pointer ${filter === "approved" ? "bg-green-500 text-white shadow-xl px-3 py-2" : ""}`} onClick={() => handleFilterData("approved")}>Approved</Badge>
        </div>
        <div className="mx-2">
          <Badge className={`bg-yellow-200 text-yellow-500 py-1 cursor-pointer ${filter === "pending" ? "bg-yellow-500 text-white shadow-xl px-3 py-2" : ""}`} onClick={() => handleFilterData("pending")}>Pending</Badge>
        </div>
        <div className="mx-2">
          <Badge className={`bg-red-200 text-red-500 py-1 cursor-pointer ${filter === "rejected" ? "bg-red-500 text-white shadow-xl px-3 py-2" : ""}`} onClick={() => handleFilterData("rejected")}>Rejected</Badge>
        </div>
        <div className="mx-2">
          <Badge className={`bg-orange-200 text-orange-500 py-1 cursor-pointer ${filter === "editRequests" ? "bg-orange-500 text-white shadow-xl px-3 py-2" : ""}`} onClick={() => handleFilterData("editRequests")}>Edit Requests</Badge>
        </div>
      </div>
      <div className='inline-block min-w-full py-2 align-middle '>
        <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-4 py-3.5 text-center text-sm font-normal text-gray-700'>
                  <span>Coach</span>
                </th>
                <th
                  scope='col'
                  className='px-4 py-3.5  text-sm font-normal text-gray-700 text-center'>
                  Fees
                </th>
                <th
                  scope='col'
                  className='px-4 py-3.5 text-center text-sm font-normal text-gray-700'>
                  Status
                </th>
                <th
                  scope='col'
                  className='px-4 py-3.5 text-center text-sm font-normal text-gray-700'></th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white'>
              {isLoading ? (
                <CoachTableSkeleton />
              ) : (
                <>
                  {data.length > 0 &&
                    (data?.map((coach) => (
                      <tr key={coach?.name} className='w-full border hover:bg-gray-50 cursor-pointer' onClick={() => handleCoachDetails(coach?._id)}>
                        <td className='px-4 py-4 w-[25%]'>
                          <div className='flex items-center'>
                            <div className='h-10 w-10 flex-shrink-0'>
                              <img
                                className='h-10 w-10 rounded-full object-cover'
                                src={coach?.profileImage}
                                alt=''
                              />
                            </div>
                            <div className='ml-4'>
                              <div className='text-sm font-medium text-gray-900'>
                                {coach?.name}
                              </div>
                              <div className='text-sm text-gray-700'>
                                {coach?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-4 py-4 text-center w-[25%]'>
                          <div className='flex gap-1 items-center justify-center text-sm text-gray-900'>
                            <FaDollarSign className='text-orange-500' />{" "}
                            {coach?.ratesPerHour?.charges}
                          </div>
                        </td>
                        <td className='px-4 py-4 w-[25%]'>
                          <div className='flex justify-center'>
                            {coach.isApproved ? (
                              <span className='text-xs text-green-800  px-2 py-1  rounded-lg bg-green-100'>
                                Approved
                              </span>
                            ) : (
                              <span className='text-xs text-red-800  px-2 py-1  rounded-lg bg-red-100'>
                                Pending
                              </span>
                            )}
                          </div>
                        </td>
                        <td className='w-[25%] text-end px-5'>
                          <Button
                            className='bg-white text-blue-900 text-lg hover:bg-white'
                            onClick={() => handleCoachDetails(coach?._id)}>
                            View
                            <FaLongArrowAltRight className='ml-2' />
                          </Button>
                        </td>
                      </tr>
                    )))
                  }
                </>
              )}
            </tbody>
          </table>
        </div>
        {!isLoading && data.length === 0 && (
          <div className='w-full border h-56 bg-white flex flex-col items-center justify-center py-5'>
            <div className='w-20 h-20  rounded-full bg-slate-100 flex items-center justify-center'>
              <FaUser className='text-4xl text-blue-800' />
            </div>
            <p className='flex justify-center items-center mt-5'>
              {
                filter === "approved"
                  ? "No Approved Coaches Found"
                  : filter === "pending"
                    ? "No Pending Coaches Found"
                    : filter === "rejected"
                      ? "No Rejected Coaches Found"
                      : filter === "editRequests"
                        ? "No Edit Requests Found"
                        : "No Coaches Found"
              }
            </p>
          </div>
        )}
      </div>
    </div >
  );
};

export default Coach;
