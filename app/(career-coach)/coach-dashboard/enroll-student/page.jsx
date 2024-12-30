"use client";
import { GetTokens } from "@/app/actions";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const EnrollStudentPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programs, setPrograms] = useState([]);

  const handleGetCoachProgramsBooking = async () => {
    const { accessToken } = await GetTokens(true);
    setIsLoading(true);
    try {
      const response = await axios.get("/api/getCoachProgramBooking", {
        headers: { Authorization: `Bearer ${accessToken?.value}` },
      });
      if (response.status === 200) {
        setPrograms(response?.data?.bookings);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const dates = programs.map(
    (item) => new Date(item.date).toISOString().split("T")[0]
  );

  useEffect(() => {
    handleGetCoachProgramsBooking();
  }, []);



  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-3xl font-bold mb-10">Enroll Student Page</h1>
      {programs?.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  User Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  User Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Program Enroll Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                   Program Title
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {programs.map((item) => (
                <tr key={item?._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <img
                        className="w-14 h-14 object-cover rounded-full"
                        alt="User avatar"
                        src={item?.user?.profilePicture}
                      />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item?.user?.fullname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item?.user?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {dates}{" "}
                    {/* Ensure dates is defined and formatted properly */}
                  </td>
                 
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 object-cover rounded-full"
                        alt="User avatar"
                        src={item?.programId?.programImage}
                      />
                      <div className="pl-3">
                        <div className="font-medium">
                          {item?.programId?.title.slice(0, 30)}...
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnrollStudentPage;
