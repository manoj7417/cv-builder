'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, CalendarIcon, UserGroupIcon, ChartBarIcon, FunnelIcon, UserIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import cookies from 'js-cookie'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const router = useRouter()

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {

      const token = cookies.get('token')

      setLoading(true)
      const response = await fetch(`/api/recruiters/alljobs?token=${token}`)
      const data = await response.json()

      if (data.status === 'success') {
        setApplications(data.data.jobs || [])
      } else {
        throw new Error(data.message || 'Failed to fetch applications')
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
      setError('Failed to load applications')
      toast.error('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  // Calculate statistics correctly
  const calculateStats = () => {
    let totalApplications = 0;
    let pendingApplications = 0;
    let acceptedApplications = 0;

    applications.forEach(job => {
      if (job.applications) {
        totalApplications += job.applications.length;
        pendingApplications += job.applications.filter(app => app.status === 'pending').length;
        acceptedApplications += job.applications.filter(app => app.status === 'accepted').length;
      }
    });

    return {
      total: totalApplications,
      pending: pendingApplications,
      accepted: acceptedApplications
    };
  };

  const ApplicationStats = () => {
    const stats = calculateStats();
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Applications</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <UserIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending Review</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Accepted</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.accepted}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const JobCard = ({ job }) => {
    const applicationCount = job.applications?.length || 0
    const statusColor = job.status === 'active' 
      ? 'bg-green-100 text-green-800 border border-green-200' 
      : 'bg-gray-100 text-gray-800 border border-gray-200'

    return (
      <div className="bg-white rounded-lg shadow-sm border-l-4 border border-blue-500 hover:shadow-md transition-all duration-200 group">
        <div className="flex items-center justify-between p-4">
          {/* Left Section: Job Info */}
          <div className="flex-1 min-w-0 mr-4">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1 text-gray-400" />
                {job.location}
              </span>
              <span className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1 text-gray-400" />
                {new Date(job.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              {job.salary && (
                <span className="flex items-center">
                  <CurrencyDollarIcon className="w-4 h-4 mr-1 text-gray-400" />
                  {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700">
              <UserGroupIcon className="w-4 h-4 mr-1.5" />
              <span className="text-sm font-medium whitespace-nowrap">
                {applicationCount} {applicationCount === 1 ? 'Application' : 'Applications'}
              </span>
            </div>
            <button
              onClick={() => router.push(`/recruiter/applications/${job._id}`)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
            >
              View Details
              <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">All Applications</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage all job applications across your listings
          </p>
        </div>

        {/* Stats Section */}
        <ApplicationStats />

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-lg border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Jobs</option>
                <option value="active">Active Jobs</option>
                <option value="closed">Closed Jobs</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <BriefcaseIcon className="mx-auto h-12 w-12 text-red-400" />
              <h3 className="mt-2 text-sm font-medium text-red-900">Error loading jobs</h3>
              <p className="mt-1 text-sm text-red-500">{error}</p>
              <button
                onClick={fetchApplications}
                className="mt-4 text-sm text-blue-500 hover:text-blue-700"
              >
                Try again
              </button>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven&apos;t received any applications yet.
              </p>
            </div>
          ) : (
            <div className="p-6 grid gap-4">
              {applications
                .filter(job => selectedStatus === 'all' || job.status === selectedStatus)
                .map((job) => (
                  <JobCard key={job._id} job={job} />
                ))
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplicationsPage 