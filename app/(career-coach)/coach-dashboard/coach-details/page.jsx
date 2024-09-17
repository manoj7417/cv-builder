/** @format */

import Image from "next/image";
import React from "react";
import { FaCheck, FaDollarSign, FaTimes } from "react-icons/fa";

const people = [
  {
    name: "John Doe",
    fees: "75.00 USD",
    role: "Career Development",
    image:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    name: "Jane Doe",
    fees: "75.00 USD",
    role: "Career Development",
    image:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
];

const CoachDetails = () => {
  return (
    <div>
      <div className='coach_section max-w-7xl mx-auto mt-10 p-5'>
        <div className='w-full h-full flex'>
          <div className='lg:w-[60%] w-full coach_request'>
            <div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
              <div>
                <h2 className='text-lg font-semibold'>Coach Request</h2>
                <p className='mt-1 text-sm text-gray-700'>
                  This is a list of all coaches. You can edit
                  or delete existing ones.
                </p>
              </div>
            </div>
            <div className='mt-6 flex flex-col'>
              <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                  <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm font-normal text-gray-700'>
                            <span>Coach</span>
                          </th>
                          <th
                            scope='col'
                            className='px-12 py-3.5 text-left text-sm font-normal text-gray-700'>
                            Fees
                          </th>

                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm font-normal text-gray-700'>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200 bg-white'>
                        {people.map((person) => (
                          <tr key={person.name}>
                            <td className='whitespace-nowrap px-4 py-4'>
                              <div className='flex items-center'>
                                <div className='h-10 w-10 flex-shrink-0'>
                                  <img
                                    className='h-10 w-10 rounded-full object-cover'
                                    src={person.image}
                                    alt=''
                                  />
                                </div>
                                <div className='ml-4'>
                                  <div className='text-sm font-medium text-gray-900'>
                                    {person.name}
                                  </div>
                                  <div className='text-sm text-gray-700'>
                                    {person.role}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap px-12 py-4'>
                              <div className='flex gap-1 items-center text-sm text-gray-900 '>
                                <FaDollarSign className='text-orange-500' />{" "}
                                {person.fees}
                              </div>
                            </td>
                            <td className='whitespace-nowrap px-12 py-4'>
                              <div className='flex items-center justify-start text-sm text-gray-700'>
                                {/* Department Name */}
                                <span>{person.department}</span>

                                {/* Icons for Approve and Delete */}
                                <div className='flex gap-5 space-x-2'>
                                  {/* Approve Icon */}
                                  <div
                                    className='bg-green-700 hover:bg-green-700 p-2 cursor-pointer'
                                    title='Approve Coach'>
                                    <FaCheck className='text-sm text-white' />
                                  </div>

                                  {/* Delete Icon */}
                                  <div
                                    className='bg-red-700 hover:bg-red-700 p-2 cursor-pointer'
                                    title='Delete Coach'>
                                    <FaTimes className='text-sm text-white' />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='lg:w-[40%] w-full coach_appointment'>
            <div className='grid grid-cols-1 gap-4 lg:ml-7'>
              <div className=' bg-[#FFFFFF] border border-[#EAEEF4] p-5 rounded-lg'>
                <div className='flex justify-between items-center mt-2'>
                  <div className='text-lg font-bold  text-[#092C4C]'>
                    Approve Coaches
                  </div>
                  <div className='text-sm text-[#514EF3]'>View All</div>
                </div>
                {/* START-APPOINTMENT  */}
                <div className='flex items-center mb-6 w-full mt-5'>
                  <div className='w-12 h-auto overflow-hidden rounded-full'>
                    <Image
                      src='/new_appointment_img.png'
                      alt='Profile Image'
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className='ml-1 flex justify-between w-full'>
                    <div className=''>
                      <div className='text-[14px] font-bold text-[#092C4C]'>
                        Coach Name
                      </div>
                      <div className='text-[13px] text-[#7E92A2] mt-2'>
                        For Career Development
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-[13px] font-bold text-[#092C4C]'>
                        $100
                      </div>
                      <div className='text-[13px] text-[#18A53F] mt-2'>
                        Approved
                      </div>
                    </div>
                  </div>
                </div>
                {/* END-APPOINTMENT  */}
                {/* START-APPOINTMENT  */}
                <div className='flex items-center mb-6 w-full mt-5'>
                  <div className='w-12 h-auto overflow-hidden rounded-full'>
                    <Image
                      src='/new_appointment_img.png'
                      alt='Profile Image'
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className='ml-1 flex justify-between w-full'>
                    <div className=''>
                      <div className='text-[14px] font-bold text-[#092C4C]'>
                        Coach Name
                      </div>
                      <div className='text-[13px] text-[#7E92A2] mt-2'>
                        For Career Development
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-[13px] font-bold text-[#092C4C]'>
                        $100
                      </div>
                      <div className='text-[13px] text-[#18A53F] mt-2'>
                        Approved
                      </div>
                    </div>
                  </div>
                </div>
                {/* END-APPOINTMENT  */}
                {/* START-APPOINTMENT  */}
                <div className='flex items-center mb-6 w-full mt-5'>
                  <div className='w-12 h-auto overflow-hidden rounded-full'>
                    <Image
                      src='/new_appointment_img.png'
                      alt='Profile Image'
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className='ml-1 flex justify-between w-full'>
                    <div className=''>
                      <div className='text-[14px] font-bold text-[#092C4C]'>
                        Coach Name
                      </div>
                      <div className='text-[13px] text-[#7E92A2] mt-2'>
                        For Career Development
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-[13px] font-bold text-[#092C4C]'>
                        $100
                      </div>
                      <div className='text-[13px] text-[#18A53F] mt-2'>
                        Approved
                      </div>
                    </div>
                  </div>
                </div>
                {/* END-APPOINTMENT  */}
                {/* START-APPOINTMENT  */}
                <div className='flex items-center mb-6 w-full mt-5'>
                  <div className='w-12 h-auto overflow-hidden rounded-full'>
                    <Image
                      src='/new_appointment_img.png'
                      alt='Profile Image'
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className='ml-1 flex justify-between w-full'>
                    <div className=''>
                      <div className='text-[14px] font-bold text-[#092C4C]'>
                        Coach Name
                      </div>
                      <div className='text-[13px] text-[#7E92A2] mt-2'>
                        For Career Development
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-[13px] font-bold text-[#092C4C]'>
                        $100
                      </div>
                      <div className='text-[13px] text-[#18A53F] mt-2'>
                        Approved
                      </div>
                    </div>
                  </div>
                </div>
                {/* END-APPOINTMENT  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDetails;
