/** @format */
"use client";
import { GetTokens } from "@/app/actions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoachTableSkeleton from "@/components/component/AdminDashboard/CoachTableSkeleton";
import { FaDollarSign, FaUser } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AdminCoachProgram = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programData, setProgramData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();

  const handleTabChange = (value) => {
    setActiveTab(value);
  };



  const handleFetchCoachProgram = async () => {
    const { accessToken } = await GetTokens();
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/getAllProgram`, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      setProgramData(response?.data?.programs);
      setIsLoading(false);
    } catch (error) {
      
    }
  };

  const handleProgramDetails = (id) => {
    router.push(`/admin/coach-program/${id}`);
  };

  useEffect(() => {
    handleFetchCoachProgram();
  }, []);


  return (
    <>
      <div className="bg-white  px-10">
        <h1 className="text-2xl p-5 font-bold">Coach Programs</h1>
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
              All Coache Programs
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
                        <span>Program Name</span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5  text-sm font-normal text-gray-700 text-center"
                      >
                        Coach Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5  text-sm font-normal text-gray-700 text-center"
                      >
                        Amount
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
                        {programData.length > 0 &&
                          programData?.map((coach, index) => (
                            <tr key={index} className="w-full border">
                              <td className="px-4 py-4 w-[25%]">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <img
                                      className="h-10 w-10 rounded-full object-cover"
                                      src={coach?.programImage}
                                      alt="program"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {coach?.title}
                                    </div>
                                    <div className="text-sm text-gray-700">
                                      {coach?.description.slice(0, 20)}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-center w-[25%]">
                                <div className="flex gap-1 items-center justify-center text-sm text-gray-900">
                                  <FaUser className="text-orange-500" />{" "}
                                  {coach?.coachId?.name}
                                </div>
                              </td>
                              <td className="px-4 py-4 text-center w-[25%]">
                                <div className="flex gap-1 items-center justify-center text-sm text-gray-900">
                                  <FaDollarSign className="text-orange-500" />{" "}
                                  {coach?.amount}
                                </div>
                              </td>
                              <td className="px-4 py-4 w-[25%]">
                                <div className="flex justify-center">
                                  {coach.isapproved ? (
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
                                  onClick={() =>
                                    handleProgramDetails(coach?._id)
                                  }
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
              {!isLoading && programData.length === 0 && (
                <div className="w-full border h-56 bg-white flex flex-col items-center justify-center py-5">
                  <div className="w-20 h-20  rounded-full bg-slate-100 flex items-center justify-center">
                    <FaUser className="text-4xl text-blue-800" />
                  </div>
                  <p className="flex justify-center items-center mt-5">
                    No Coache Programs Found
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
                        <span>Program Name</span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5  text-sm font-normal text-gray-700 text-center"
                      >
                        Coach Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5  text-sm font-normal text-gray-700 text-center"
                      >
                        Amount
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
                        {programData.length > 0 &&
                          programData
                            .filter((coach) => coach.isapproved === true) // Filter where isapproved is true
                            .map((coach, index) => (
                              <tr key={index} className="w-full border">
                                <td className="px-4 py-4 w-[25%]">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                      <img
                                        className="h-10 w-10 rounded-full object-cover"
                                        src={coach?.programImage}
                                        alt="program"
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {coach?.title}
                                      </div>
                                      <div className="text-sm text-gray-700">
                                        {coach?.description.slice(0, 20)}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-center w-[25%]">
                                  <div className="flex gap-1 items-center justify-center text-sm text-gray-900">
                                    <FaUser className="text-orange-500" />{" "}
                                    {coach?.coachId?.name}
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-center w-[25%]">
                                  <div className="flex gap-1 items-center justify-center text-sm text-gray-900">
                                    <FaDollarSign className="text-orange-500" />{" "}
                                    {coach?.amount}
                                  </div>
                                </td>
                                <td className="px-4 py-4 w-[25%]">
                                  <div className="flex justify-center">
                                    {coach.isapproved && (
                                      <span className="text-xs text-green-800 px-2 py-1 rounded-lg bg-green-100">
                                        Approved
                                      </span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              {!isLoading && programData.length === 0 && (
                <div className="w-full border h-56 bg-white flex flex-col items-center justify-center py-5">
                  <div className="w-20 h-20  rounded-full bg-slate-100 flex items-center justify-center">
                    <FaUser className="text-4xl text-blue-800" />
                  </div>
                  <p className="flex justify-center items-center mt-5">
                    No Coache Programs Found
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="declined" className="flex-grow p-6">
            <h2>Declined</h2>
          </TabsContent>
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
                        <span>Program Name</span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5  text-sm font-normal text-gray-700 text-center"
                      >
                        Coach Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5  text-sm font-normal text-gray-700 text-center"
                      >
                        Amount
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
                        {programData.length > 0 &&
                          programData
                            .filter((coach) => coach.isapproved === false) // Filter where isapproved is true
                            .map((coach, index) => (
                              <tr key={index} className="w-full border">
                                <td className="px-4 py-4 w-[25%]">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                      <img
                                        className="h-10 w-10 rounded-full object-cover"
                                        src={coach?.programImage}
                                        alt="program"
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {coach?.title}
                                      </div>
                                      <div className="text-sm text-gray-700">
                                        {coach?.description.slice(0, 20)}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-center w-[25%]">
                                  <div className="flex gap-1 items-center justify-center text-sm text-gray-900">
                                    <FaUser className="text-orange-500" />{" "}
                                    {coach?.coachId?.name}
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-center w-[25%]">
                                  <div className="flex gap-1 items-center justify-center text-sm text-gray-900">
                                    <FaDollarSign className="text-orange-500" />{" "}
                                    {coach?.amount}
                                  </div>
                                </td>
                                <td className="px-4 py-4 w-[25%]">
                                  <div className="flex justify-center">
                                    {coach.isapproved ? (
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
                              </tr>
                            ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              {!isLoading && programData.length === 0 && (
                <div className="w-full border h-56 bg-white flex flex-col items-center justify-center py-5">
                  <div className="w-20 h-20  rounded-full bg-slate-100 flex items-center justify-center">
                    <FaUser className="text-4xl text-blue-800" />
                  </div>
                  <p className="flex justify-center items-center mt-5">
                    No Coache Programs Found
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
    </>
  );
};

export default AdminCoachProgram;
