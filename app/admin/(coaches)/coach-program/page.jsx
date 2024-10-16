/** @format */
"use client";
import { GetTokens } from "@/app/actions";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminCoachProgram = () => {
  const [programData, setProgramData] = useState([]);

  const handleApprovalToggle = async (program) => {
    const { accessToken } = await GetTokens();
    const updatedStatus = !program.isapproved;

    try {
      await axios.put(
        `/api/editCoachProgram/${program._id}`,
        { isapproved: updatedStatus },
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      setProgramData((prevData) =>
        prevData.map((p) =>
          p._id === program._id ? { ...p, isapproved: updatedStatus } : p
        )
      );
    } catch (error) {
      console.error("Failed to update approval status:", error);
    }
  };

  const handleFetchCoachProgram = async () => {
    const { accessToken } = await GetTokens();
    try {
      const response = await axios.get(`/api/getAllProgram`, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      setProgramData(response?.data?.programs);
      console.log("response::", response?.data?.programs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchCoachProgram();
  }, []);

  console.log("programData:::", programData);

  return (
    <>
      <div className='card_coach max-w-5xl mx-auto mt-20'>
        <div className='grid grid-cols-3 gap-5'>
          {programData.length > 0 ? (
            programData.map((program, index) => (
              <div
                className='bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto h-[400px] flex flex-col justify-between'
                key={index}>
                <img
                  src={program.programImage}
                  alt={program.title}
                  className='w-full h-48 object-cover rounded-t-lg'
                />
                <div className='flex-grow'>
                  <h2 className='text-xl font-bold'>{program.title}</h2>
                  <p className='text-gray-600 mt-2'>{program.description}</p>
                </div>
                <div className='flex flex-col mt-4'>
                  <span className='text-black font-bold'>
                    Coach ID: {program.coachId}
                  </span>
                  <button
                    onClick={() => handleApprovalToggle(program)}
                    className={`${
                      program.isapproved ? "bg-green-500" : "bg-red-500"
                    } text-white px-4 py-2 rounded-lg mt-5`}>
                    {program.isapproved ? "Approved" : "UnApproved"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center text-gray-500'>No programs available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminCoachProgram;
