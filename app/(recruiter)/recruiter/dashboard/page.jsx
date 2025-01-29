"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  BriefcaseIcon,
  UserGroupIcon,
  ChartBarIcon,
  PlusIcon,
  ClockIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";
import cookies from "js-cookie";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = cookies.get("token");
      setLoading(true);
      const response = await fetch(`/api/recruiters/alljobs?token=${token}`);
      const data = await response.json();

      if (data.status === "success") {
        setJobs(data.data.jobs || []);
      } else {
        throw new Error(data.message || "Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load jobs");
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  // Calculate dashboard statistics
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((job) => job.status === "active").length;
  const totalApplications = jobs.reduce(
    (sum, job) => sum + (job.applications?.length || 0),
    0
  );
  const recentApplications = jobs.reduce((sum, job) => {
    const recentApps =
      job.applications?.filter((app) => {
        const appDate = new Date(app.appliedAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return appDate >= weekAgo;
      }).length || 0;
    return sum + recentApps;
  }, 0);

  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Jobs</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {totalJobs}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <BriefcaseIcon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4 text-sm text-blue-600">
          {activeJobs} active jobs
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total Applications
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {totalApplications}
            </h3>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <UserGroupIcon className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4 text-sm text-green-600">
          {recentApplications} new this week
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Average Applications
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {totalJobs ? (totalApplications / totalJobs).toFixed(1) : 0}
            </h3>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <ChartBarIcon className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4 text-sm text-purple-600">Per job posting</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Response Rate</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {totalApplications
                ? ((recentApplications / totalApplications) * 100).toFixed(1)
                : 0}
              %
            </h3>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <ArrowTrendingUpIcon className="h-6 w-6 text-orange-600" />
          </div>
        </div>
        <div className="mt-4 text-sm text-orange-600">Last 7 days</div>
      </div>
    </div>
  );

  const RecentJobCard = ({ job }) => (
    <div className="bg-white rounded-xl shadow-sm border-l-4 border border-blue-500 overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {job.status}
          </span>
        </div>

        <div className="space-y-3">
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

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-sm text-gray-500">
              <ClockIcon className="h-5 w-5 mr-1.5 text-gray-400" />
              Posted {new Date(job.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <UserGroupIcon className="h-5 w-5 mr-1.5 text-gray-400" />
              {job.applications?.length || 0} applications
            </span>
          </div>
          <button
            onClick={() => router.push(`/recruiter/applications/${job._id}`)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View Applications →
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Recruiter Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your job postings and applications
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => router.push("/recruiter/jobs/post")}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Post New Job
            </button>
          </div>
        </div>

        <DashboardStats />

        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Job Postings
            </h2>
            <button
              onClick={() => router.push("/recruiter/jobs")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Jobs →
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <DocumentChartBarIcon className="mx-auto h-12 w-12 text-red-400" />
              <h3 className="mt-2 text-lg font-medium text-red-900">
                Error loading jobs
              </h3>
              <p className="mt-1 text-sm text-red-500">{error}</p>
              <button
                onClick={fetchJobs}
                className="mt-4 text-sm text-blue-500 hover:text-blue-700"
              >
                Try again
              </button>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No jobs posted
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by posting your first job
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.slice(0, 4).map((job) => (
                <RecentJobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
