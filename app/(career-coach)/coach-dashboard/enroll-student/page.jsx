"use client";
import { GetTokens } from "@/app/actions";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const EnrollStudentPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programs, setPrograms] = useState([]);




  const handleGetCoachProgramsBooking = async () => {
    const { accessToken } = await GetTokens();
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


  const dates = programs.map(item => new Date(item.date).toISOString().split('T')[0]);


  useEffect(() => {
    handleGetCoachProgramsBooking();
  }, []);


  return (
    <div className="max-w-7xl mx-auto my-20">
        <h1 className="text-3xl font-bold mb-10">Enroll Student Page</h1>
          {programs?.length > 0 &&
            programs?.map((item, index) => (
                <div key={item?._id}>
                  <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 w-[400px]" >
                    {/* Image */}
                    <figure>
                      <img
                        src={item?.programId?.programImage}
                        alt="card image"
                        className="aspect-video w-full"
                      />
                    </figure>
                    {/* Body */}
                    <div className="p-6">
                      <header className="mb-4">
                        <h3 className="text-xl font-medium text-slate-700">
                          {item?.programId?.title}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {" "}
                          {dates}
                        </p>
                      </header>
                      <p>{item?.programId?.description}</p>
                      <div className="flex items-center mt-2 border-t border-gray-200 py-5">
                        <img
                          className="w-10 h-10 object-cover rounded-full"
                          alt="User avatar"
                          src={item?.user?.profilePicture}
                        />

                        <div className="pl-3">
                          <div className="font-medium">{item?.user?.fullname}</div>
                          <div className="text-gray-600 text-sm">
                          {item?.user?.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
      </div>
  );
};

export default EnrollStudentPage;
