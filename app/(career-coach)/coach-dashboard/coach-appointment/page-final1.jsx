"use client";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const appointments = [
  {
    customerName: "John Doe",
    dateTime: "2024-09-09 14:00",
    phoneNumber: "+1234567890",
    email: "john.doe@example.com",
    country: "USA",
    status: "approved", // or "cancelled"
  },
  {
    customerName: "Jane Smith",
    dateTime: "2024-09-10 11:00",
    phoneNumber: "+0987654321",
    email: "jane.smith@example.com",
    country: "Canada",
    status: "cancelled", // or "cancelled"
  },
  {
    customerName: "Alex Johnson",
    dateTime: "2024-09-11 16:00",
    phoneNumber: "+1029384756",
    email: "alex.johnson@example.com",
    country: "UK",
    status: "cancelled", // or "cancelled"
  },
  // More static data for demonstration
  {
    customerName: "Michael Brown",
    dateTime: "2024-09-12 10:30",
    phoneNumber: "+5647382910",
    email: "michael.brown@example.com",
    country: "Australia",
    status: "approved", // or "cancelled"
  },
  {
    customerName: "Emily Clark",
    dateTime: "2024-09-13 09:15",
    phoneNumber: "+2938475610",
    email: "emily.clark@example.com",
    country: "India",
    status: "approved", // or "cancelled"
  },
  {
    customerName: "David Wilson",
    dateTime: "2024-09-14 13:45",
    phoneNumber: "+4758392010",
    email: "david.wilson@example.com",
    country: "Germany",
    status: "approved", // or "cancelled"
  },
  {
    customerName: "David Wilson",
    dateTime: "2024-09-14 13:45",
    phoneNumber: "+4758392010",
    email: "david.wilson@example.com",
    country: "Germany",
    status: "approved", // or "cancelled"
  },
  {
    customerName: "David Wilson",
    dateTime: "2024-09-14 13:45",
    phoneNumber: "+4758392010",
    email: "david.wilson@example.com",
    country: "Germany",
    status: "approved", // or "cancelled"
  },
  {
    customerName: "David Wilson",
    dateTime: "2024-09-14 13:45",
    phoneNumber: "+4758392010",
    email: "david.wilson@example.com",
    country: "Germany",
    status: "approved", // or "cancelled"
  },
  {
    customerName: "David Wilson",
    dateTime: "2024-09-14 13:45",
    phoneNumber: "+4758392010",
    email: "david.wilson@example.com",
    country: "Germany",
    status: "approved", // or "cancelled"
  },
  {
    customerName: "David Wilson",
    dateTime: "2024-09-14 13:45",
    phoneNumber: "+4758392010",
    email: "david.wilson@example.com",
    country: "Germany",
    status: "approved", // or "cancelled"
  },
  {
    customerName: "David Wilson",
    dateTime: "2024-09-14 13:45",
    phoneNumber: "+4758392010",
    email: "david.wilson@example.com",
    country: "Germany",
    status: "approved", // or "cancelled"
  },
  {
    customerName: "David Wilson",
    dateTime: "2024-09-14 13:45",
    phoneNumber: "+4758392010",
    email: "david.wilson@example.com",
    country: "Germany",
    status: "approved", // or "cancelled"
  },
  {
    customerName: "David Wilson",
    dateTime: "2024-09-14 13:45",
    phoneNumber: "+4758392010",
    email: "david.wilson@example.com",
    country: "Germany",
    status: "approved", // or "cancelled"
  },
  {
    customerName: "David Wilson",
    dateTime: "2024-09-14 13:45",
    phoneNumber: "+4758392010",
    email: "david.wilson@example.com",
    country: "Germany",
    status: "approved", // or "cancelled"
  },
];

const CoachAppointmentPage = () => {
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Number of items per page

  // Calculate total pages
  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  // Calculate the current items to display based on pagination
  const currentItems = appointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // Function to format the date and time
  const formatDateTime = (dateTimeString) => {
    const options = {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-GB", options);
  };

  // Function to format phone number
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  return (
    <>
      <div className="m-10 bg-white">
        {/* Combined Header and Listing Container */}
        <div className="p-4 bg-white drop-shadow-md rounded-lg border-[#E2ECF980]">
          {/* START-HEADER */}
          <div
            id="appointmentHeader"
            className="flex flex-col md:flex-row justify-between items-center md:items-start mb-6"
          >
            <div id="appointmentHeaderLeft" className="mb-4 md:mb-0">
              <h1 className="font-bold text-xl md:text-xl mb-2 text-[#000000]">
                All Appointments
              </h1>
              <h2 className="text-[#16C098] text-sm">Active Members</h2>
            </div>
            <div
              id="appointmentHeaderRight"
              className="relative flex items-center space-x-4 w-full md:w-auto"
            >
              {/* <!-- Search Input with Icon --> */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  name="search"
                  id="search"
                  className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full md:w-96 lg:w-96 xl:w-96 2xl:w-96 focus:outline-none focus:ring-2 focus:ring-[#16C098] transition duration-200"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-search"></i>
                  {/* <!-- Font Awesome search icon --> */}
                </span>
              </div>

              {/* <!-- Short By Label and Select Box --> */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <label
                  htmlFor="shortBy"
                  className="bg-white px-4 py-2 text-gray-700 border-r border-gray-300"
                >
                  Short by:
                </label>
                <select
                  name="shortBy"
                  id="shortBy"
                  className="border-none rounded-lg px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-[#16C098] transition duration-200"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>
          </div>
          {/* END-HEADER */}

          {/* START-APPOINTMENT Listing */}
          <div id="appointmentBody">
            {/* Listing Header */}
            <div id="appointmentListingHeader" className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="text-[#B5B7C0] text-[14px] border-b border-[#EEEEEE] text-left font-normal">
                    <th className="px-4 py-2 w-[200px]">Customer Name</th>
                    <th className="px-4 py-2 w-[180px]">Date Time</th>
                    <th className="px-4 py-2 w-[180px]">Phone Number</th>
                    <th className="px-4 py-2 w-[240px]">Email</th>
                    <th className="px-4 py-2 w-[180px]">Country</th>
                    <th className="px-4 py-2 w-[160px]">Status</th>
                    <th className="px-4 py-2 w-[160px]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((appointment, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition duration-150 border-b border-[#EEEEEE]"
                    >
                      {/* Customer Name */}
                      <td className="px-4 py-2 text-[#292D32] text-sm">
                        {appointment.customerName}
                      </td>

                      {/* Date Time */}
                      <td className="px-4 py-2 text-[#292D32] text-sm">
                        {formatDateTime(appointment.dateTime)}
                      </td>

                      {/* Phone Number */}
                      <td className="px-4 py-2 text-[#292D32] text-sm">
                        {formatPhoneNumber(appointment.phoneNumber)}
                      </td>

                      {/* Email */}
                      <td className="px-4 py-2 text-[#292D32] text-sm">
                        {appointment.email}
                      </td>

                      {/* Country */}
                      <td className="px-4 py-2 text-[#292D32] text-sm">
                        {appointment.country}
                      </td>

                      {/* Status Buttons */}
                      <td className="px-4 py-2">
                        <div className="flex space-x-2">
                          {appointment.status === "approved" ? (
                            <button className="bg-green-200 text-[#008767] px-3 py-1 rounded hover:bg-green-300 transition duration-150 border border-[#00B087] text-[12px]">
                              Approved
                            </button>
                          ) : appointment.status === "cancelled" ? (
                            <button className="bg-[#FFC5C5] text-[#DF0404] px-3 py-1 rounded hover:bg-red-300 transition duration-150 border border-[#DF0404] text-[12px]">
                              Cancelled
                            </button>
                          ) : (
                            <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-[12px]">
                              Pending
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-4 py-2">
                        <div className="flex space-x-2">
                          <button className="bg-[#008767] text-white px-3 py-1 rounded hover:bg-green-600 transition duration-150 text-[12px] font-bold">
                            &#x2713; {/* Right Sign */}
                          </button>
                          <button className="bg-[#DF0404] text-white px-3 py-1 rounded hover:bg-red-500 transition duration-150 text-[12px] font-bold">
                            &#x2715; {/* Cross Sign */}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* END-APPOINTMENT Listing */}

          {/* Pagination Controls */}
          <div className="flex justify-end mt-4 space-x-2 text-[10px]">
            <button
              className={`px-3 py-1 rounded border ${
                currentPage === 1 ? "bg-gray-300" : "bg-white hover:bg-gray-200"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i> {/* Previous Icon */}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded border ${
                  currentPage === i + 1
                    ? "bg-[#1D4ED8] text-white"
                    : "bg-white hover:bg-gray-200"
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-white hover:bg-gray-200"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="fas fa-chevron-right"></i> {/* Next Icon */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachAppointmentPage;
