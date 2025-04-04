"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import JobDetailsDialog from "../components/JobDetailsDialog";
import EditJobDialog from "../components/EditJobDialog";
import {
  ClockIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    location: "",
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const router = useRouter();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");

      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 10,
        sortBy,
        order,
        ...(searchTerm && { search: searchTerm }),
        ...(filters.type && { type: filters.type }),
        ...(filters.location && { location: filters.location }),
      });

      const response = await fetch(`/api/recruiters/jobs?${queryParams}`, {
        headers: {
          token: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();

      if (data.status === "success" && data.data) {
        setJobs(data.data.jobs || []);
        const pagination = data.data.pagination;
        setTotalPages(pagination.totalPages || 1);
      } else {
        setJobs([]);
        setTotalPages(1);
      }
    } catch (error) {
      setError(error.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [currentPage, sortBy, order, filters, searchTerm]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("desc");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const handleJobUpdated = async (updatedJob) => {
    if (!updatedJob) {
      console.error("No updated job data received");
      return;
    }

    // Update the jobs state immediately
    setJobs((prevJobs) => {
      const newJobs = prevJobs.map((job) =>
        job._id === updatedJob._id ? updatedJob : job
      );
      return newJobs;
    });

    // Update selected job if it's currently being viewed
    if (selectedJob && selectedJob._id === updatedJob._id) {
      setSelectedJob(updatedJob);
    }

    // Update editing job if it's currently being edited
    if (editingJob && editingJob._id === updatedJob._id) {
      setEditingJob(updatedJob);
    }

    // Close the edit dialog
    setEditingJob(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const JobCard = ({ job }) => {
    const isSelected = selectedJob && selectedJob._id === job._id;

    return (
      <div className="bg-white rounded-xl shadow-sm border-l-4 border border-blue-500 overflow-hidden hover:shadow-md transition-all duration-200">
        <div className="p-6">
          {/* Job Title and Status */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                job.status
              )}`}
            >
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>

          {/* Job Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-gray-600">
              <BuildingOfficeIcon className="h-5 w-5 mr-2 text-gray-400" />
              {job.company}
            </div>
            <div className="flex items-center text-gray-600">
              <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
              {job.location}
            </div>
            {job.salary && (
              <div className="flex items-center text-gray-600">
                <CurrencyDollarIcon className="h-5 w-5 mr-2 text-gray-400" />
                {job.salary.currency} {job.salary.min.toLocaleString()} -{" "}
                {job.salary.max.toLocaleString()}
              </div>
            )}
          </div>

          {/* Footer with Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-sm text-gray-500">
                <ClockIcon className="h-5 w-5 mr-1.5 text-gray-400" />
                Posted {new Date(job.createdAt).toLocaleDateString()}
              </span>
              {/* Applications count/link */}
              {job.totalApplications > 0 ||
              (job.applications && job.applications.length > 0) ? (
                <Link
                  href={`/recruiter/applications/${job._id}`}
                  className="flex items-center text-sm text-[#f76918] hover:text-blue-700 transition-colors group cursor-pointer"
                >
                  <UserGroupIcon className="h-5 w-5 mr-1.5 text-blue-500 group-hover:text-[#f76918]" />
                  <span className="border-b border-blue-600 border-opacity-0 group-hover:border-opacity-100 transition-all">
                    {job.totalApplications || job.applications?.length}{" "}
                    applications
                  </span>
                </Link>
              ) : (
                <span className="flex items-center text-sm text-gray-500">
                  <UserGroupIcon className="h-5 w-5 mr-1.5 text-gray-400" />
                  No applications yet
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedJob(job);
                }}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Details
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setEditingJob(job);
                }}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
              >
                <PencilIcon className="h-4 w-4 mr-1.5" />
                Edit Job
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Posted Jobs</h1>
          <Link
            href="/recruiter/jobs/post"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0d3572] hover:bg-[#0d3572]/90"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Job
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={handleSearch}
            className="rounded-lg border-gray-300 focus:ring-[#0d3572] focus:border-[#0d3572]"
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleFilter}
            className="rounded-lg border-gray-300 focus:ring-[#0d3572] focus:border-[#0d3572]"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <select
            name="location"
            value={filters.location}
            onChange={handleFilter}
            className="rounded-lg border-gray-300 focus:ring-[#0d3572] focus:border-[#0d3572]"
          >
            <option value="">All Locations</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="in-office">In-Office</option>
          </select>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d3572]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : !jobs || jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No jobs found</p>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    Job Title
                    {sortBy === "title" && (
                      <span className="ml-1">
                        {order === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    Posted Date
                    {sortBy === "createdAt" && (
                      <span className="ml-1">
                        {order === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Applications
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {job.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {job.recruiter?.company || "Company"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          job.type === "Full-time"
                            ? "bg-green-100 text-green-800 shadow-lg border border-green-400"
                            : job.type === "Part-time"
                            ? "bg-blue-100 text-[#f76918] shadow-lg border border-blue-400"
                            : job.type === "Contract"
                            ? "bg-yellow-100 text-yellow-800 shadow-lg border border-yellow-400"
                            : job.type === "Internship"
                            ? "bg-purple-100 text-purple-800 shadow-lg border border-purple-400"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(() => {
                        const locationLower = job.location.toLowerCase();

                        if (locationLower.startsWith("remote")) {
                          return (
                            <span className="px-3 shadow-lg py-1 text-xs font-medium border border-green-400 rounded-full bg-green-100 text-green-800">
                              Remote
                            </span>
                          );
                        } else if (locationLower.startsWith("hybrid")) {
                          const [, location] = job.location.split(" - ");
                          return (
                            <div className="space-y-1">
                              <span className="px-3 shadow-lg py-1 text-xs font-medium border border-blue-400 rounded-full bg-blue-100 text-[#f76918]">
                                Hybrid
                              </span>
                              {/* {location && <div className="text-xs text-gray-500">{location}</div>} */}
                            </div>
                          );
                        } else if (locationLower.startsWith("in-office")) {
                          const [, location] = job.location.split(" - ");
                          return (
                            <div className="space-y-1">
                              <span className="px-3 shadow-lg py-1 text-xs font-medium border border-yellow-400 rounded-full bg-yellow-100 text-yellow-800">
                                In-Office
                              </span>
                              {/* {location && <div className="text-xs text-gray-500">{location}</div>} */}
                            </div>
                          );
                        } else {
                          return (
                            <span className="text-sm text-gray-500">
                              {job.location}
                            </span>
                          );
                        }
                      })()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {job.totalApplications > 0 ||
                      (job.applications && job.applications.length > 0) ? (
                        <Link
                          href={`/recruiter/applications/${job._id}`}
                          className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-[#f76918] hover:bg-blue-200 transition-colors"
                        >
                          {job.totalApplications || job.applications?.length}{" "}
                          Applications
                        </Link>
                      ) : (
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          No Applications
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedJob(job);
                        }}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View Details
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setEditingJob(job);
                        }}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        <PencilIcon className="h-4 w-4 mr-1.5" />
                        Edit Job
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === i + 1
                      ? "z-10 bg-[#0d3572] border-[#0d3572] text-white"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Job Details Dialog */}
      <JobDetailsDialog
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
        onJobUpdated={handleJobUpdated}
      />

      {/* EditJobDialog */}
      <EditJobDialog
        isOpen={!!editingJob}
        onClose={() => setEditingJob(null)}
        job={editingJob}
        onJobUpdated={handleJobUpdated}
      />
    </div>
  );
};

export default JobsPage;
