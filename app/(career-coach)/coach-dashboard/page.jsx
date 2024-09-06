"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandRock,
  faThumbsUp,
  faClappingHands,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
const CoachDashboardPage = () => {
  return (
    <>
      <div className="h-full w-full bg-white p-7">
        <h1 className="text-lg">Hello Kevin 👋🏼,</h1>
        <div className="flex w-full mt-10">
          {/* START-PART 1 */}
          <div className="w-[40%]">
            <div className="grid grid-cols-2 gap-2">
              {/* start-sectin 1 */}
              <div className="h-72 w-64 bg-[#1d4ed8] rounded-lg p-5 relative overflow-hidden">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-[#FFF]">
                    Next Appointment
                  </div>
                  <div>
                    <img src="/coach_dot_icon.png" alt="" className="" />
                  </div>
                </div>
                <div className="flex items-center mb-6 w-full mt-5">
                  <div className="w-12 h-auto overflow-hidden rounded-full">
                    <Image
                      src="/new_appointment_img.png"
                      alt="Profile Image"
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className="ml-1">
                    <p className="text-[13px] font-bold text-white">
                      319 Haul Road
                    </p>
                    <p className="text-[13px] text-white mt-1">
                      Glenrock, WY 12345
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-[#FFF]">Appointment Date</div>
                  <div className="text-sm text-[#FFF]">Price</div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm font-bold text-[#FFF]">
                    Aug 3 2024, 17:00
                  </div>
                  <div className="text-sm font-bold text-[#FFF]">$ 10</div>
                </div>
                <div className="flex justify-between items-center mt-10">
                  <div className="text-sm font-bold text-[#FFF]">
                    <button className="rounded-full p-3 bg-white w-24 text-black">
                      Start
                    </button>
                  </div>
                  <div className="text-sm font-bold text-[#FFF]">
                    <button className="rounded-full p-3 bg-white w-24 text-black">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              {/* end-sectin 1 */}
              {/* start-sectin 2 */}
              <div className="h-72 w-64 bg-[#1d4ed8] rounded-lg p-5 relative overflow-hidden">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-[#FFF]">
                    Next Appointment
                  </div>
                  <div>
                    <img src="/coach_dot_icon.png" alt="" className="" />
                  </div>
                </div>
                <div className="flex items-center mb-6 w-full mt-5">
                  <div className="w-12 h-auto overflow-hidden rounded-full">
                    <Image
                      src="/new_appointment_img.png"
                      alt="Profile Image"
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className="ml-1">
                    <p className="text-[13px] font-bold text-white">
                      319 Haul Road
                    </p>
                    <p className="text-[13px] text-white mt-1">
                      Glenrock, WY 12345
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-[#FFF]">Appointment Date</div>
                  <div className="text-sm text-[#FFF]">Price</div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm font-bold text-[#FFF]">
                    Aug 3 2024, 17:00
                  </div>
                  <div className="text-sm font-bold text-[#FFF]">$ 10</div>
                </div>
                <div className="flex justify-between items-center mt-10">
                  <div className="text-sm font-bold text-[#FFF]">
                    <button className="rounded-full p-3 bg-white w-24 text-black">
                      Start
                    </button>
                  </div>
                  <div className="text-sm font-bold text-[#FFF]">
                    <button className="rounded-full p-3 bg-white w-24 text-black">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              {/* end-sectin 2 */}
            </div>
          </div>
          {/* END-PART 1 */}
          {/* START-PART 2 */}
          <div className="w-[40%]">
          <div className="grid grid-cols-1 gap-4">
              <div className=" bg-[#FFFFFF] border border-[#EAEEF4] p-5 rounded-lg">
                <div className="flex justify-between items-center mt-2">
                  <div className="text-lg font-bold  text-[#092C4C]">Today’ s Appointment</div>
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
                      <div className="text-[14px] font-bold text-[#092C4C]">319 Haul Road</div>   
                      <div className="text-[13px] text-[#7E92A2] mt-2">Glenrock, WY 12345</div>       
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-bold text-[#092C4C]">$10</div>   
                      <div className="text-[13px] text-[#18A53F] mt-2">Done</div>       
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
                      <div className="text-[14px] font-bold text-[#092C4C]">319 Haul Road</div>   
                      <div className="text-[13px] text-[#7E92A2] mt-2">Glenrock, WY 12345</div>       
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-bold text-[#092C4C]">$10</div>   
                      <div className="text-[13px] text-[#D10000] mt-2">Cancelled</div>       
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
                      <div className="text-[14px] font-bold text-[#092C4C]">319 Haul Road</div>   
                      <div className="text-[13px] text-[#7E92A2] mt-2">Glenrock, WY 12345</div>       
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-bold text-[#092C4C]">$10</div>   
                      <div className="text-[13px] text-[#D10000] mt-2">Cancelled</div>       
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
                      <div className="text-[14px] font-bold text-[#092C4C]">319 Haul Road</div>   
                      <div className="text-[13px] text-[#7E92A2] mt-2">Glenrock, WY 12345</div>       
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-bold text-[#092C4C]">$10</div>   
                      <div className="text-[13px] text-[#18A53F] mt-2">Done</div>       
                    </div>                    
                  </div>
                  
                </div>
                 {/* END-APPOINTMENT  */}
              </div>             
            </div>
          </div>
          {/* END-PART 2 */}
          {/* START-PART 3 */}
          <div className="w-[20%] pl-10">
            <div className="flex flex-col gap-7">
              
              <div className="bg-[#FFFFFF] border border-[#EAEEF4] p-5 rounded-lg text-left">
                <div className="text-[18px] font-bold text-[#7E92A2]">Total No. Of Students</div>
                <div className="flex justify-between w-full mt-7">
                  <div className="text-[48px] font-bold text-[#092C4C]">78</div>
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
              <div className="bg-[#FFFFFF] border border-[#EAEEF4] p-5 rounded-lg text-left">
                <div className="text-[18px] font-bold text-[#7E92A2]">Total Appointment</div>
                <div className="flex justify-between w-full mt-7">
                  <div className="text-[48px] font-bold text-[#092C4C]">136</div>
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
            </div>
          </div>
          {/* END-PART 3 */}
        </div>
      </div>
    </>
  );
};

export default CoachDashboardPage;
