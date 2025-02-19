/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { GetTokens } from "../actions";
import axios from "axios";
import Image from "next/image";

import { useUserStore } from "@/app/store/UserStore";
import Link from "next/link";
const AdminPage = () => {
  const { userdata } = useUserStore((state) => state.userState);
  const [coaches, setAllCoaches] = useState([]);

  useEffect(() => {
    fetchAllCoaches();
  }, []);

  const fetchAllCoaches = async () => {
    try {
      const response = await axios.get(`/api/getAllCoaches`);
      const data = await response.data;
      setAllCoaches(data.coaches);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="adminMain" className="to-blue-100">
        {/* START-HEADER */}
        <div id="adminHeader">
          <div
            id="adminLeft"
            className="flex flex-col sm:flex-col md:flex-col lg:flex-row p-10 items-center space-x-10"
          >
            <div className="w-52">
              <h1 className="text-xl font-bold text-[#000000]">
                Hello {userdata?.fullname} 👋🏼,
              </h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 p-5 sm:pl-10 md:pl-10 lg:pl-10 xl:pl-10 2xl:pl-10">
          <div className="bg-[#FFFFFF] border border-[#EAEEF4] p-4 rounded-xl text-left drop-shadow-md">
            <div className="text-[14px] font-bold text-[#7E92A2]">
              Total No. Of Resume
              <br />
              Created
            </div>
            <div className="flex justify-between w-full mt-7">
              <div className="text-[40px] font-bold text-[#092C4C]">0</div>
              <div>
                <Image
                  src="/total_no_of_resume_Icon.png"
                  alt="Profile Image"
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </div>
          <div className="bg-[#FFFFFF] border border-[#EAEEF4] p-4 rounded-xl text-left drop-shadow-md">
            <div className="text-[14px] font-bold text-[#7E92A2]">
              Total No. Of
              <br /> Students
            </div>
            <div className="flex justify-between w-full mt-7">
              <div className="text-[40px] font-bold text-[#092C4C]">0</div>
              <div>
                <Image
                  src="/total_students.png"
                  alt="ProfileImage"
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </div>
          <div className="bg-[#FFFFFF] border border-[#EAEEF4] p-4 rounded-xl text-left drop-shadow-md">
            <div className="text-[14px] font-bold text-[#7E92A2]">
              Total
              <br /> Appointment
            </div>
            <div className="flex justify-between w-full mt-7">
              <div className="text-[40px] font-bold text-[#092C4C]">0</div>
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
          <div className="bg-[#FFFFFF] border border-[#EAEEF4] p-4 rounded-xl text-left drop-shadow-md">
            <div className="text-[14px] font-bold text-[#7E92A2]">
              Total No. Of Resume
              <br />
              Downloaded
            </div>
            <div className="flex justify-between w-full mt-7">
              <div className="text-[40px] font-bold text-[#092C4C]">0</div>
              <div>
                <Image
                  src="/total_no_of_resume_downloded_Icon.png"
                  alt="Profile Image"
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </div>
          <div className="bg-[#FFFFFF] border border-[#EAEEF4] p-4 rounded-xl text-left drop-shadow-md">
            <div className="text-[14px] font-bold text-[#7E92A2]">
              Total No. Of Registered
              <br />
              Coach
            </div>
            <div className="flex justify-between w-full mt-7">
              <div className="text-[40px] font-bold text-[#092C4C]">
                {coaches?.length}
              </div>
              <div>
                <Image
                  src="/total_no_of_resume_downloded_Icon.png"
                  alt="Profile Image"
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </div>
        </div>

        {/* END-DASHBOARD TOP CARD */}

        {/* START-COACHES SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 2xl:grid-cols-12 gap-14 sm:pl-10 md:pl-10 lg:pl-10 xl:pl-10 2xl:pl-10 p-5 pt-10">
          <div
            id="left_section1"
            className="lg:col-span-8 xl:col-span-8 2xl:col-span-8 bg-white rounded-2xl p-5 drop-shadow-md"
          >
            <div className="flex flex-row justify-between bg-white">
              <div className="text-lg font-bold text-[#000000]">Coaches</div>
              <Link
                href="/admin/coach"
                className="text-sm text-[#1D4ED8] font-semibold"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 pt-3 bg-white ">
              {coaches?.length > 0 ? (
                coaches.slice(0, 10).map((coach) => {
                  const buttonStyle = {
                    approved: "bg-green-500 text-white",
                    pending: "bg-yellow-500 text-black",
                    cancelled: "bg-red-500 text-white",
                  };
                  const capitalizedStatus =
                    coach.approvalStatus?.charAt(0).toUpperCase() +
                      coach.approvalStatus?.slice(1).toLowerCase() || "Unknown";

                  return (
                    <div
                      key={coach.name}
                      className="bg-[#DDEDFF6B] mt-3 pl-3 rounded-2xl"
                    >
                      <div className="flex flex-col items-center">
                        <div className="pt-3 pb-3">
                          <img
                            className="h-16 w-16 rounded-full object-cover"
                            src={coach?.profileImage || "/default_coach.png"}
                            alt="coachImage"
                          />
                        </div>
                        <div className="font-bold text-base text-[#000000] text-center">
                          {coach?.name || "Unnamed Coach"}
                        </div>
                        <div className="text-[11px] text-[#000000]">
                          {coach?.typeOfCoaching?.slice(0, 20) ||
                            "Not specified"}
                          ...
                        </div>
                        <div className="pt-2 pb-3 text-[#4E5566]">
                          <Link
                            href={`/admin/coach`}
                            className={`border p-1 text-[12px] rounded-md ${
                              buttonStyle[
                                coach?.approvalStatus?.toLowerCase()
                              ] || ""
                            }`}
                          >
                            {capitalizedStatus}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-[#4E5566] mt-5">
                  No coaches available.
                </div>
              )}
            </div>
          </div>
          <div
            id="right_section"
            className=" lg:col-span-4 xl:col-span-4 2xl:col-span-4 bg-white rounded-2xl p-5 drop-shadow-md"
          >
            <div className=" bg-[#FFFFFF]">
              <div className="flex justify-between items-center mt-2">
                <div className="text-lg font-bold  text-[#092C4C]">
                  Approved Coaches
                </div>
                <div className="text-sm text-[#1D4ED8] font-semibold">
                  View All
                </div>
              </div>
              {coaches?.length > 0 ? (
                coaches
                  .filter(
                    (coach) =>
                      coach?.approvalStatus?.toLowerCase() === "approved"
                  )
                  .map((coach) => (
                    <div
                      key={coach?.name}
                      className="flex items-center mb-6 w-full mt-5 pr-5"
                    >
                      <div className="w-16 h-auto overflow-hidden rounded-full">
                        <img
                          className="xl:h-14 xl:w-16 w-12 h-12 rounded-full object-cover"
                          src={coach?.profileImage || "/default_coach.png"}
                          alt="CoachImage"
                        />
                      </div>
                      <div className="ml-1 flex justify-between w-full">
                        <div>
                          <div className="xl:text-[14px] text-[12px] font-bold text-[#092C4C]">
                            {coach?.name}
                          </div>
                          <div className="xl:text-[14px] text-[12px] text-[#7E92A2] xl:mt-2 mt-0">
                            {coach?.typeOfCoaching?.slice(0, 20)}...
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="xl:text-[14px] text-[12px] font-bold text-[#092C4C]">
                            {coach?.price}
                          </div>
                          <div className="xl:text-[14px] text-[12px] text-[#18A53F] xl:mt-2 mt-0 font-bold uppercase">
                            {coach?.approvalStatus}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center text-[#4E5566] mt-5">
                  No coaches available.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* END-COACHES SECTION */}
      </div>
    </>
  );
};

export default AdminPage;
