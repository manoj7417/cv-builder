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
    status: "approved",
  },
  {
    customerName: "Jane Smith",
    dateTime: "2024-09-10 11:00",
    phoneNumber: "+0987654321",
    email: "jane.smith@example.com",
    country: "Canada",
    status: "cancelled",
  },
  {
    customerName: "Emily Davis",
    dateTime: "2024-09-11 09:30",
    phoneNumber: "+14155552671",
    email: "emily.davis@example.com",
    country: "UK",
    status: "cancelled",
  },
  {
    customerName: "Michael Johnson",
    dateTime: "2024-09-12 15:45",
    phoneNumber: "+14155552672",
    email: "michael.johnson@example.com",
    country: "Australia",
    status: "approved",
  },
  {
    customerName: "Sarah Brown",
    dateTime: "2024-09-13 10:00",
    phoneNumber: "+14155552673",
    email: "sarah.brown@example.com",
    country: "New Zealand",
    status: "approved",
  },
  {
    customerName: "David Wilson",
    dateTime: "2024-09-14 13:15",
    phoneNumber: "+14155552674",
    email: "david.wilson@example.com",
    country: "South Africa",
    status: "approved",
  },
  {
    customerName: "Laura Garcia",
    dateTime: "2024-09-15 16:30",
    phoneNumber: "+14155552675",
    email: "laura.garcia@example.com",
    country: "Spain",
    status: "approved",
  },
  {
    customerName: "James Martinez",
    dateTime: "2024-09-16 11:00",
    phoneNumber: "+14155552676",
    email: "james.martinez@example.com",
    country: "Mexico",
    status: "approved",
  },
  {
    customerName: "Sophia Rodriguez",
    dateTime: "2024-09-17 14:45",
    phoneNumber: "+14155552677",
    email: "sophia.rodriguez@example.com",
    country: "Argentina",
    status: "approved",
  },
  {
    customerName: "William Anderson",
    dateTime: "2024-09-18 09:30",
    phoneNumber: "+14155552678",
    email: "william.anderson@example.com",
    country: "Brazil",
    status: "approved",
  },
  {
    customerName: "Olivia Thomas",
    dateTime: "2024-09-19 12:15",
    phoneNumber: "+14155552679",
    email: "olivia.thomas@example.com",
    country: "Colombia",
    status: "approved",
  },
  {
    customerName: "Benjamin Lee",
    dateTime: "2024-09-20 15:00",
    phoneNumber: "+14155552680",
    email: "benjamin.lee@example.com",
    country: "Chile",
    status: "approved",
  },
  {
    customerName: "Ava White",
    dateTime: "2024-09-21 10:30",
    phoneNumber: "+14155552681",
    email: "ava.white@example.com",
    country: "Peru",
    status: "approved",
  },
  {
    customerName: "Lucas Harris",
    dateTime: "2024-09-22 13:45",
    phoneNumber: "+14155552682",
    email: "lucas.harris@example.com",
    country: "Venezuela",
    status: "approved",
  },
  {
    customerName: "Mia Clark",
    dateTime: "2024-09-23 11:00",
    phoneNumber: "+14155552683",
    email: "mia.clark@example.com",
    country: "Ecuador",
    status: "approved",
  },
  {
    customerName: "Ethan Lewis",
    dateTime: "2024-09-24 16:15",
    phoneNumber: "+14155552684",
    email: "ethan.lewis@example.com",
    country: "Uruguay",
    status: "approved",
  },
  {
    customerName: "Isabella Walker",
    dateTime: "2024-09-25 09:30",
    phoneNumber: "+14155552685",
    email: "isabella.walker@example.com",
    country: "Paraguay",
    status: "approved",
  },
  {
    customerName: "Oliver Young",
    dateTime: "2024-09-26 14:00",
    phoneNumber: "+14155552686",
    email: "oliver.young@example.com",
    country: "Bolivia",
    status: "approved",
  },
  {
    customerName: "Charlotte Scott",
    dateTime: "2024-09-27 11:00",
    phoneNumber: "+14155552687",
    email: "charlotte.scott@example.com",
    country: "Guyana",
    status: "approved",
  },
  {
    customerName: "Liam Adams",
    dateTime: "2024-09-28 13:30",
    phoneNumber: "+14155552688",
    email: "liam.adams@example.com",
    country: "Suriname",
    status: "approved",
  },
  {
    customerName: "Amelia Turner",
    dateTime: "2024-09-29 10:00",
    phoneNumber: "+14155552689",
    email: "amelia.turner@example.com",
    country: "French Guiana",
    status: "approved",
  },
  {
    customerName: "Noah Baker",
    dateTime: "2024-09-30 15:00",
    phoneNumber: "+14155552690",
    email: "noah.baker@example.com",
    country: "Bermuda",
    status: "approved",
  },
  {
    customerName: "Noah Baker extra",
    dateTime: "2024-09-30 15:00",
    phoneNumber: "+14155552693",
    email: "noah.bakerextra@example.com",
    country: "india",
    status: "approved",
  },
  {
    customerName: "jagdish sharma",
    dateTime: "2024-09-30 15:00",
    phoneNumber: "+919897158687",
    email: "jagdish.sharma@example.com",
    country: "india",
    status: "approved",
  },
];

const CoachAppointmentPage = () => {
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  // Search and Sort State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and Sort Appointments
  const filteredAppointments = appointments
    .filter((appointment) => {
      const lowerCaseTerm = searchTerm.toLowerCase();
      return (
        appointment.customerName.toLowerCase().includes(lowerCaseTerm) ||
        appointment.phoneNumber.includes(lowerCaseTerm) ||
        appointment.email.toLowerCase().includes(lowerCaseTerm) ||
        appointment.country.toLowerCase().includes(lowerCaseTerm)
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.dateTime) - new Date(a.dateTime);
      } else {
        return new Date(a.dateTime) - new Date(b.dateTime);
      }
    });

  // Calculate total pages
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  // Calculate the current items to display based on pagination
  const currentItems = filteredAppointments.slice(
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
            className="flex flex-col md:flex-row justify-between items-center mb-6"
          >
            {/* Left Side: Title and Subtitle */}
            <div
              id="appointmentHeaderLeft"
              className="text-center md:text-left mb-4 md:mb-0"
            >
              <h1 className="font-bold text-lg md:text-xl mb-1 text-[#000000]">
                All Appointments
              </h1>
              <h2 className="text-[#16C098] text-sm">Active Members</h2>
            </div>

            {/* Right Side: Search and Sort */}
            <div
              id="appointmentHeaderRight"
              className="flex flex-col md:flex-row items-center md:space-x-4 w-full md:w-auto space-y-4 md:space-y-0"
            >
              {/* Search Input with Icon */}
              <div className="relative w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full">
                <input
                  type="text"
                  placeholder="Search by Name, Phone, Email, Country"
                  name="search"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full sm:min-w-96 md:min-w-0 lg:min-w-96 xl:min-w-96 2xl:min-w-96  focus:outline-none focus:ring-2 focus:ring-[#16C098] transition duration-200 "
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-search"></i>{" "}
                  {/* Font Awesome search icon */}
                </span>
              </div>

              {/* Sort By Label and Select Box with Unified Border */}
              <div className="flex items-center w-full md:w-full border border-gray-300 rounded-lg overflow-hidden">
                <label
                  htmlFor="sortBy"
                  className="bg-white px-1 py-2 text-gray-700 text-sm w-24 text-center"
                >
                  Sort by:
                </label>
                <select
                  name="sortBy"
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-1 py-2 w-full md:w-full focus:outline-none focus:ring-2 focus:ring-[#16C098] transition duration-200 text-sm border-l border-gray-300 border-0"
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
                          <button className="bg-[#007E76] text-white px-3 py-1 rounded hover:bg-[#00694F] transition duration-150">
                            <i className="fas fa-check"></i>{" "}
                            {/* Font Awesome check icon */}
                          </button>
                          <button className="bg-[#DF0404] text-white px-3 py-1 rounded hover:bg-[#B51C1C] transition duration-150">
                            <i className="fas fa-times"></i>{" "}
                            {/* Font Awesome times icon */}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* END-APPOINTMENT Listing */}

            {/* START-PAGINATION */}
            <div className="flex justify-end mt-4 space-x-2 text-[10px]">
              <button
                className={`px-3 py-1 rounded border ${
                  currentPage === 1
                    ? "bg-gray-300"
                    : "bg-white hover:bg-gray-200"
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
            {/* END-PAGINATION */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachAppointmentPage;
