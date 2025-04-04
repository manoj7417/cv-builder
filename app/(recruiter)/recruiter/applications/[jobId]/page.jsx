"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentIcon,
  CalendarIcon,
  ArrowLeftIcon,
  BuildingOfficeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";

const JobApplicationsPage = ({ params }) => {
  const [applications, setApplications] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    status: "",
  });
  const router = useRouter();
  const { jobId } = params;

  useEffect(() => {
    fetchApplications();
  }, [jobId, currentPage]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/recruiters/jobs/${jobId}/applications?page=${currentPage}&limit=10`
      );
      const data = await response.json();

      if (data.status === "success") {
        const applications = data.data.data.applications || [];
        setApplications(applications);
        setJobDetails({
          title: data.data.data.jobTitle,
          company: data.data.data.company,
        });
        setPagination(data.data.data.pagination);
      } else {
        throw new Error(data.message || "Failed to fetch applications");
      }
    } catch (error) {
      setError("Failed to load applications");
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const token = Cookies.get("token");

      const response = await fetch(
        `/api/recruiters/jobs/${jobId}/applications/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        toast.success("Application status updated successfully");
        // Update local state or refetch applications
        fetchApplications();
      } else {
        throw new Error(data.message || "Failed to update status");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update application status");
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !filters.status || app.status === filters.status;

    return matchesSearch && matchesStatus;
  });

  const Stats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-sm p-4 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#f76918]">
              Total Applications
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {pagination?.totalApplications || 0}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <UserIcon className="h-6 w-6 text-[#f76918]" />
          </div>
        </div>
      </div>
      {/* Add more stats cards as needed */}
    </div>
  );

  const ApplicationCard = ({ application }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border-l-4 border border-blue-500 overflow-hidden hover:shadow-md transition-all duration-200">
        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-2xl font-bold text-white">
                {application.applicant.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {application.applicant.name}
                </h3>
                <div className="flex items-center text-sm text-[#f76918] mt-1">
                  <CalendarIcon className="w-4 h-4 mr-1.5" />
                  Applied{" "}
                  {new Date(application.appliedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                application.status === "pending"
                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  : application.status === "accepted"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {application.status.charAt(0).toUpperCase() +
                application.status.slice(1)}
            </span>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                <a
                  href={`mailto:${application.applicant.email}`}
                  className="text-[#f76918] hover:text-blue-700 font-medium"
                >
                  {application.applicant.email}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <PhoneIcon className="h-5 w-5 text-blue-500" />
                <a
                  href={`tel:${application.applicant.phone}`}
                  className="text-[#f76918] hover:text-blue-700 font-medium"
                >
                  {application.applicant.phone}
                </a>
              </div>
            </div>
            <div className="flex justify-end items-start space-x-3">
              {application.applicant.cv && (
                <a
                  href={application.applicant.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors group"
                >
                  <DocumentIcon className="h-5 w-5 mr-2 text-blue-500 group-hover:text-[#f76918]" />
                  Download CV
                </a>
              )}
              {application.status === "pending" && (
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      handleStatusChange(application.applicationId, "rejected")
                    }
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-red-600 bg-white hover:bg-red-50 transition-colors"
                  >
                    <XMarkIcon className="h-4 w-4 mr-1.5" />
                    Reject
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(application.applicationId, "accepted")
                    }
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    <CheckIcon className="h-4 w-4 mr-1.5" />
                    Accept
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Cover Letter */}
          {application.coverLetter && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <DocumentIcon className="h-5 w-5 text-blue-500" />
                <h4 className="text-sm font-semibold text-gray-900">
                  Cover Letter
                </h4>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-50 to-white rounded-lg p-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {application.coverLetter}
                  </p>
                </div>
                {application.coverLetter.length > 200 && (
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  Applications
                </h1>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-[#f76918]">
                  {applications.length} total
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {jobDetails?.title} • {jobDetails?.company}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-blue-50 text-[#f76918]"
                    : "text-gray-400"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${
                  viewMode === "list"
                    ? "bg-blue-50 text-[#f76918]"
                    : "text-gray-400"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <button
                onClick={() => router.back()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Jobs
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {applications.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <UserIcon className="h-6 w-6 text-[#f76918]" />
              </div>
            </div>
          </div>
          {/* Add more stat cards for different statuses */}
        </div>

        {/* Applications Grid/List View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.applicationId}
                application={application}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((application) => (
                    <tr
                      key={application.applicationId}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {application.applicant.name
                                  .charAt(0)
                                  .toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.applicant.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                            <span>{application.applicant.email}</span>
                          </div>
                          {application.applicant.phone && (
                            <div className="flex items-center space-x-2 mt-1">
                              <PhoneIcon className="h-4 w-4 text-gray-400" />
                              <span>{application.applicant.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                            application.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : application.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {application.status.charAt(0).toUpperCase() +
                            application.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(application.appliedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-4">
                          <a
                            href={application.applicant.cv}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#f76918] hover:text-blue-700 transition-colors"
                          >
                            <DocumentIcon className="h-4 w-4 mr-1.5" />
                            View CV
                          </a>
                          {application.status === "pending" && (
                            <div className="flex items-center space-x-2 border-l pl-4">
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    application.applicationId,
                                    "rejected"
                                  )
                                }
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-red-600 bg-white hover:bg-red-50 transition-colors"
                              >
                                <XMarkIcon className="h-4 w-4 mr-1.5" />
                                Reject
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    application.applicationId,
                                    "accepted"
                                  )
                                }
                                className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
                              >
                                <CheckIcon className="h-4 w-4 mr-1.5" />
                                Accept
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              {/* Pagination buttons */}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationsPage;
