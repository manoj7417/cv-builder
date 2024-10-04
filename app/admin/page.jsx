/** @format */
"use client";
import React, { useEffect } from "react";
import { GetTokens } from "../actions";
import axios from "axios";
import Image from "next/image";

import useCoachesDetailStore from "@/app/store/coachDetailStore";
import { useUserStore } from "@/app/store/UserStore";
const AdminPage = () => {
  //console.log("Admin Page")

  // return <div>AdminPage</div>;
  const { coaches, isLoading, fetchAllCoaches } = useCoachesDetailStore();
  console.log("coaches::", coaches);
  const { userdata } = useUserStore((state) => state.userState);
  useEffect(() => {
    fetchAllCoaches(); // Fetch coaches when the component mounts
  }, [fetchAllCoaches]);

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
              <h1 className="text-lg text-[#000000]">
                Hello {userdata?.fullname} 👋🏼,
              </h1>
            </div>
            <div className="relative w-[100%] mt-5 sm:mt-5 md:mt-5 lg:mt-0 xl:mt-0 2xl:mt-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img
                  src="/admin_dashboard_search.png"
                  width={24}
                  height={24}
                  alt="Search Icon"
                />
              </span>
              <input
                type="text"
                name="dashboardSearch"
                id="dashboardSearch"
                placeholder="Search"
                className="bg-white pl-12 pr-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100%] sm:w-[100%] md:w-[100%] lg:w-[497px] xl:w-[497px] 2xl:w-[497px]"
              />
            </div>
          </div>
        </div>

        {/* END-HEADER */}
        {/* START-DASHBOARD TOP CARD */}
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
                  alt="Profile Image"
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
                {coaches.length}
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
              <div className="text-sm text-[#1D4ED8] font-semibold">
                View all
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-4 pt-3 bg-white ">
              {coaches.length > 0 ? (
                coaches.slice(0, 10).map((coach) => {
                  // Define button styles based on approval status
                  const buttonStyle = {
                    approved: "bg-green-500 text-white",
                    pending: "bg-yellow-500 text-black",
                    cancelled: "bg-red-500 text-white",
                  };

                  // Capitalize the first letter of the approval status
                  const capitalizedStatus =
                    coach.approvalStatus.charAt(0).toUpperCase() +
                    coach.approvalStatus.slice(1).toLowerCase();

                  return (
                    <div
                      key={coach.name}
                      className="bg-[#DDEDFF6B] mt-3 pl-3 rounded-2xl"
                    >
                      <div className="flex flex-col items-center">
                        <div className="pt-3 pb-3">
                          <img
                            className="h-16 w-16 rounded-full object-cover"
                            src={coach.profileImage || "/default_coach.png"} // Use a default image if none is provided
                            alt="Coach Image"
                          />
                        </div>
                        <div className="font-bold text-base text-[#000000]">
                          {coach.name}
                        </div>
                        <div className="text-[11px] text-[#000000]">
                          {coach.typeOfCoaching}
                        </div>
                        <div className="pt-2 pb-3 text-[#4E5566]">
                          <button
                            className={`border p-1 text-[12px] rounded-md ${
                              buttonStyle[coach.approvalStatus.toLowerCase()]
                            }`}
                          >
                            {capitalizedStatus}
                          </button>
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

              {/* START-COACH 1 */}
              {/* <div className="bg-[#DDEDFF6B] mt-3 pl-3 rounded-2xl">
                <div className="flex flex-col items-center">
                  <div className="pt-3 pb-3">
                    <Image
                      alt="Coach Image"
                      src="/coaches_photo_1.png"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="font-bold text-base text-[#000000]">
                    Shawn Stone
                  </div>
                  <div className="text-sm text-[#000000]">UI/UX Designer</div>
                  <div className="pt-2 pb-3 text-[#4E5566]">
                    <button className="border p-1 text-[12px] rounded-md">
                      Middle
                    </button>
                  </div>
                </div>
              </div> */}
              {/* END-COACH 1 */}
              {/* START-COACH 2 */}
              {/* <div className="bg-[#DDEDFF6B] mt-3 pl-3 rounded-2xl">
                <div className="flex flex-col items-center">
                  <div className="pt-3 pb-3">
                    <Image
                      alt="Coach Image"
                      src="/coaches_photo_2.png"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="font-bold text-base text-[#000000]">
                    Shawn Stone
                  </div>
                  <div className="text-sm text-[#000000]">UI/UX Designer</div>
                  <div className="pt-2 pb-3 text-[#4E5566]">
                    <button className="border p-1 text-[12px] rounded-md">
                      Middle
                    </button>
                  </div>
                </div>
              </div> */}
              {/* END-COACH 2 */}
              {/* START-COACH 3 */}
              {/* <div className="bg-[#DDEDFF6B] mt-3 pl-3 rounded-2xl">
                <div className="flex flex-col items-center">
                  <div className="pt-3 pb-3">
                    <Image
                      alt="Coach Image"
                      src="/coaches_photo_3.png"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="font-bold text-base text-[#000000]">
                    Shawn Stone
                  </div>
                  <div className="text-sm text-[#000000]">UI/UX Designer</div>
                  <div className="pt-2 pb-3 text-[#4E5566]">
                    <button className="border p-1 text-[12px] rounded-md">
                      Middle
                    </button>
                  </div>
                </div>
              </div> */}
              {/* END-COACH 3 */}
              {/* START-COACH 4 */}
              {/* <div className="bg-[#DDEDFF6B] mt-3 pl-3 rounded-2xl">
                <div className="flex flex-col items-center">
                  <div className="pt-3 pb-3">
                    <Image
                      alt="Coach Image"
                      src="/coaches_photo_4.png"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="font-bold text-base text-[#000000]">
                    Shawn Stone
                  </div>
                  <div className="text-sm text-[#000000]">UI/UX Designer</div>
                  <div className="pt-2 pb-3 text-[#4E5566]">
                    <button className="border p-1 text-[12px] rounded-md">
                      Middle
                    </button>
                  </div>
                </div>
              </div> */}
              {/* END-COACH 4 */}
              {/* START-COACH 5 */}
              {/* <div className="bg-[#DDEDFF6B] mt-3 pl-3 rounded-2xl">
                <div className="flex flex-col items-center">
                  <div className="pt-3 pb-3">
                    <Image
                      alt="Coach Image"
                      src="/coaches_photo_4.png"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="font-bold text-base text-[#000000]">
                    Shawn Stone
                  </div>
                  <div className="text-sm text-[#000000]">UI/UX Designer</div>
                  <div className="pt-2 pb-3 text-[#4E5566]">
                    <button className="border p-1 text-[12px] rounded-md">
                      Middle
                    </button>
                  </div>
                </div>
              </div> */}
              {/* END-COACH 5 */}
              {/* START-COACH 6 */}
              {/* <div className="bg-[#DDEDFF6B] mt-3 pl-3 rounded-2xl">
                <div className="flex flex-col items-center">
                  <div className="pt-3 pb-3">
                    <Image
                      alt="Coach Image"
                      src="/coaches_photo_5.png"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="font-bold text-base text-[#000000]">
                    Shawn Stone
                  </div>
                  <div className="text-sm text-[#000000]">UI/UX Designer</div>
                  <div className="pt-2 pb-3 text-[#4E5566]">
                    <button className="border p-1 text-[12px] rounded-md">
                      Middle
                    </button>
                  </div>
                </div>
              </div> */}
              {/* END-COACH 6 */}
              {/* START-COACH 7 */}
              {/* <div className="bg-[#DDEDFF6B] mt-3 pl-3 rounded-2xl">
                <div className="flex flex-col items-center">
                  <div className="pt-3 pb-3">
                    <Image
                      alt="Coach Image"
                      src="/coaches_photo_6.png"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="font-bold text-base text-[#000000]">
                    Shawn Stone
                  </div>
                  <div className="text-sm text-[#000000]">UI/UX Designer</div>
                  <div className="pt-2 pb-3 text-[#4E5566]">
                    <button className="border p-1 text-[12px] rounded-md">
                      Middle
                    </button>
                  </div>
                </div>
              </div> */}
              {/* END-COACH 7 */}
              {/* START-COACH 8 */}
              {/* <div className="bg-[#DDEDFF6B] mt-3 pl-3 rounded-2xl">
                <div className="flex flex-col items-center">
                  <div className="pt-3 pb-3">
                    <Image
                      alt="Coach Image"
                      src="/coaches_photo_7.png"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="font-bold text-base text-[#000000]">
                    Shawn Stone
                  </div>
                  <div className="text-sm text-[#000000]">UI/UX Designer</div>
                  <div className="pt-2 pb-3 text-[#4E5566]">
                    <button className="border p-1 text-[12px] rounded-md">
                      Middle
                    </button>
                  </div>
                </div>
              </div> */}
              {/* END-COACH 8 */}
              {/* START-COACH 9 */}
              {/* <div className="bg-[#DDEDFF6B] mt-3 pl-3 rounded-2xl">
                <div className="flex flex-col items-center">
                  <div className="pt-3 pb-3">
                    <Image
                      alt="Coach Image"
                      src="/coaches_photo_8.png"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="font-bold text-base text-[#000000]">
                    Shawn Stone
                  </div>
                  <div className="text-sm text-[#000000]">UI/UX Designer</div>
                  <div className="pt-2 pb-3 text-[#4E5566]">
                    <button className="border p-1 text-[12px] rounded-md">
                      Middle
                    </button>
                  </div>
                </div>
              </div> */}
              {/* END-COACH 9 */}
              {/* START-COACH 10 */}
              {/* <div className="bg-[#DDEDFF6B] mt-3 pl-3 rounded-2xl">
                <div className="flex flex-col items-center">
                  <div className="pt-3 pb-3">
                    <Image
                      alt="Coach Image"
                      src="/coaches_photo_8.png"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="font-bold text-base text-[#000000]">
                    Shawn Stone
                  </div>
                  <div className="text-sm text-[#000000]">UI/UX Designer</div>
                  <div className="pt-2 pb-3 text-[#4E5566]">
                    <button className="border p-1 text-[12px] rounded-md">
                      Middle
                    </button>
                  </div>
                </div>
              </div> */}
              {/* END-COACH 10 */}
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
              {coaches.length > 0 ? (
                coaches
                  .filter(
                    (coach) => coach.approvalStatus.toLowerCase() === "approved"
                  )
                  .map((coach) => (
                    <div
                      key={coach.name}
                      className="flex items-center mb-6 w-full mt-5 pr-5"
                    >
                      <div className="w-16 h-auto overflow-hidden rounded-full">
                        <img
                          className="h-16 w-16 rounded-full object-cover"
                          src={coach.profileImage || "/default_coach.png"}
                          alt="Coach Image"
                        />
                      </div>
                      <div className="ml-1 flex justify-between w-full">
                        <div>
                          <div className="text-[14px] font-bold text-[#092C4C]">
                            {coach.name}
                          </div>
                          <div className="text-[13px] text-[#7E92A2] mt-2">
                            {coach.typeOfCoaching}{" "}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[13px] font-bold text-[#092C4C]">
                            {coach.price}
                          </div>
                          <div className="text-[13px] text-[#18A53F] mt-2 font-bold">
                            {coach.approvalStatus}{" "}
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

        {/* START-NEW COACHES REQUEST  */}
        <div id="newCoachesRequest" className="p-10">
          <div>
            <h1 className="font-bold text-xl text-[#1D2026]">
              New Coaches Request
            </h1>
          </div>
          {/* START-COACH REQUEST 1 */}
          <div className="flex flex-row justify-between items-center p-5 bg-white w-[100%] sm:w-[100%] md:w-[100%] lg:w-[68%] xl:w-[68%] 2xl:w-[68%] mt-5 drop-shadow-md">
            <div className="flex flex-col">
              <div className="text-[#1D2026] text-lg">Coach Name</div>
              <div className="flex flex-row justify-around space-x-2 text-xs mt-1">
                <div className="text-[#4E5566]">Career Development</div>
                <div className="text-[#4E5566]">
                  <Image
                    src="/CurrencyDollarSimple.png"
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
                <div>$75.00 USD</div>
              </div>
            </div>
            <div className="flex flex-row justify-items-end items-center space-x-2">
              <div>
                <Image
                  alt="coach_approved_request"
                  src="/coach_approved_request.png"
                  width={28}
                  height={28}
                />
              </div>
              <div>
                <Image
                  alt="coach_disapproved_request"
                  src="/coach_disapproved_request.png"
                  width={28}
                  height={28}
                />
              </div>
            </div>
          </div>
          {/* END-COACH REQUEST 1 */}
          {/* START-COACH REQUEST 2 */}
          <div className="flex flex-row justify-between items-center p-5  bg-white w-[100%] sm:w-[100%] md:w-[100%] lg:w-[68%] xl:w-[68%] 2xl:w-[68%] mt-1 drop-shadow-md">
            <div className="flex flex-col">
              <div className="text-[#1D2026] text-lg">Coach Name</div>
              <div className="flex flex-row justify-around space-x-2 text-xs mt-1">
                <div className="text-[#4E5566]">Career Development</div>
                <div className="text-[#4E5566]">
                  <Image
                    src="/CurrencyDollarSimple.png"
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
                <div>$75.00 USD</div>
              </div>
            </div>
            <div className="flex flex-row justify-items-end items-center space-x-2">
              <div>
                <Image
                  alt="coach_approved_request"
                  src="/coach_approved_request.png"
                  width={28}
                  height={28}
                />
              </div>
              <div>
                <Image
                  alt="coach_disapproved_request"
                  src="/coach_disapproved_request.png"
                  width={28}
                  height={28}
                />
              </div>
            </div>
          </div>
          {/* END-COACH REQUEST 2 */}
        </div>
        {/* END-NEW COACHES REQUEST  */}
      </div>
    </>
  );
};

export default AdminPage;
