'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, CalendarIcon, ClockIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useUserStore } from '../store/UserStore'

const JobDashboard = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const jobId = searchParams.get('jobId')
  
  // Set initial activeTab based on jobId presence
  const [activeTab, setActiveTab] = useState(jobId ? 'details' : 'available')
  const [selectedJob, setSelectedJob] = useState(null)
  const [appliedJobs, setAppliedJobs] = useState([])
  const [availableJobs, setAvailableJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [applicationJob, setApplicationJob] = useState(null)
  const { userState } = useUserStore()
  const [appliedJobsLoading, setAppliedJobsLoading] = useState(false)
  const [availableJobsLoading, setAvailableJobsLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        setLoading(true)
        
        // Add status=active parameter to the API call
        const fetchPromises = [
          fetch('/api/recruiters/alljobs?status=active'),
          userState?.userdata?._id ? fetchAppliedJobs(false) : Promise.resolve([])
        ]

        const [availableJobsResponse] = await Promise.all(fetchPromises)
        const availableJobsData = await availableJobsResponse.json()
        
        if (availableJobsData.status === 'success') {
          const jobs = availableJobsData.data.jobs || []
          // No need to filter here since we're getting only active jobs from API
          setAvailableJobs(jobs)
          
          // If jobId exists, find that specific job
          if (jobId) {
            const job = jobs.find(job => job._id === jobId)
            if (job) {
              setSelectedJob(job)
              setActiveTab('details')
            } else {
              toast.error('Job not found')
              setActiveTab('available')
            }
          }
        }
      } catch (error) {
        console.error('Error initializing dashboard:', error)
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    initializeDashboard()
  }, [jobId, userState?.userdata?._id])

  const fetchJobDetails = async (id) => {
    const job = availableJobs.find(job => job._id === id)
    if (job) {
      setSelectedJob(job)
      setActiveTab('details')
    } else {
      toast.error('Job not found')
      setActiveTab('available')
    }
  }

  const fetchAppliedJobs = async (showLoading = true) => {
    try {
      if (!userState?.userdata?._id) {
        console.error('User ID not found')
        return []
      }

      if (showLoading) {
        setAppliedJobsLoading(true)
      }

      const queryParams = new URLSearchParams({
        userId: userState.userdata._id,
        page: 1,
        limit: 10
      })

      const response = await fetch(`/api/users/applications?${queryParams}`)
      const data = await response.json()

      if (data.status === 'success') {
        const applications = data.data.data.applications || []
        setAppliedJobs(applications)
        return applications
      } else {
        throw new Error(data.message || 'Failed to fetch applications')
      }
    } catch (error) {
      console.error('Error fetching applied jobs:', error)
      toast.error('Failed to load your applications')
      return []
    } finally {
      if (showLoading) {
        setAppliedJobsLoading(false)
      }
    }
  }

  const handleApplyJob = (job) => {
    if (!job) {
      toast.error('Job not found')
      return
    }
    setApplicationJob(job)
    setIsApplicationModalOpen(true)
  }

  const filteredAppliedJobs = appliedJobs.filter(application => {
    if (statusFilter === 'all') return true;
    return application.applicationDetails.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 mb-10">
      {/* Dashboard Header */}
      <div className="bg-[#0d3572] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Job Dashboard</h1>
          <p className="mt-2 text-blue-100">Manage your job applications and explore opportunities</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Enhanced Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => {
                  setActiveTab('available')
                  router.push('/job-dashboard')
                }}
                className={`${
                  activeTab === 'available'
                    ? 'border-[#0d3572] text-[#0d3572] bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
              >
                <BriefcaseIcon className="w-5 h-5" />
                <span>Available Jobs</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('applied')
                  router.push('/job-dashboard')
                }}
                className={`${
                  activeTab === 'applied'
                    ? 'border-[#0d3572] text-[#0d3572] bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
              >
                <ClockIcon className="w-5 h-5" />
                <span>Applied Jobs</span>
                {appliedJobs.length > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-600 px-2.5 py-0.5 rounded-full text-xs">
                    {appliedJobs.length}
                  </span>
                )}
              </button>
              {selectedJob && (
                <button
                  onClick={() => setActiveTab('details')}
                  className={`${
                    activeTab === 'details'
                      ? 'border-[#0d3572] text-[#0d3572] bg-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
                >
                  <BuildingOfficeIcon className="w-5 h-5" />
                  <span>Job Details</span>
                </button>
              )}
            </nav>
          </div>

          {/* Loading and Error States */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d3572]"></div>
              <p className="mt-4 text-gray-500">Loading your dashboard...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-red-500">
                <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="mt-4 text-lg font-medium text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 text-[#0d3572] hover:text-[#0d3572]/80 font-medium"
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="p-6">
              {/* Tab Content */}
              {activeTab === 'available' && (
                <div>
                  {/* Search and Filters */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        className="rounded-lg border-gray-300 focus:ring-[#0d3572] focus:border-[#0d3572]"
                      />
                      <select className="rounded-lg border-gray-300 focus:ring-[#0d3572] focus:border-[#0d3572]">
                        <option>All Job Types</option>
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                      </select>
                      <select className="rounded-lg border-gray-300 focus:ring-[#0d3572] focus:border-[#0d3572]">
                        <option>All Locations</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                        <option>On-site</option>
                      </select>
                    </div>
                  </div>

                  {/* Jobs List */}
                  <div className="space-y-6">
                    {availableJobs.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-lg font-medium text-gray-900">No jobs available</p>
                        <p className="mt-2 text-gray-500">Check back later for new opportunities</p>
                      </div>
                    ) : (
                      availableJobs.map(job => (
                        <JobCard 
                          key={job._id} 
                          job={job} 
                          onApply={() => handleApplyJob(job)}
                          onViewDetails={() => {
                            setSelectedJob(job)
                            setActiveTab('details')
                          }}
                        />
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'applied' && (
                <div className="space-y-6">
                  {!userState.isAuthenticated ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-4 text-lg font-medium text-gray-900">Please login to view your applications</p>
                      <button
                        onClick={() => router.push('/login')}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0d3572] hover:bg-[#0d3572]/90"
                      >
                        Login to Continue
                      </button>
                    </div>
                  ) : appliedJobsLoading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0d3572]"></div>
                      <p className="mt-4 text-gray-500">Loading your applications...</p>
                    </div>
                  ) : appliedJobs.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-4 text-lg font-medium text-gray-900">No applications yet</p>
                      <p className="mt-2 text-gray-500">Start applying to jobs to track your applications here</p>
                      <button
                        onClick={() => setActiveTab('available')}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0d3572] hover:bg-[#0d3572]/90"
                      >
                        Browse Available Jobs
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                          <h2 className="text-lg font-medium text-gray-900">
                            Your Applications ({filteredAppliedJobs.length})
                          </h2>
                          <button
                            onClick={() => fetchAppliedJobs()}
                            disabled={appliedJobsLoading}
                            className="p-2 text-gray-500 hover:text-[#0d3572] disabled:opacity-50"
                            title="Refresh applications"
                          >
                            <svg className={`w-5 h-5 ${appliedJobsLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </button>
                        </div>
                        <select 
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="rounded-md border-gray-300 text-sm focus:ring-[#0d3572] focus:border-[#0d3572]"
                        >
                          <option value="all">All Applications</option>
                          <option value="pending">Pending</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        {filteredAppliedJobs.map(application => (
                          <AppliedJobCard
                            key={application._id}
                            application={application}
                            onViewDetails={() => {
                              setSelectedJob(application)
                              setActiveTab('details')
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'details' && selectedJob && (
                <JobDetails 
                  job={selectedJob} 
                  onApply={() => handleApplyJob(selectedJob)}
                  isApplied={appliedJobs.some(app => app._id === selectedJob._id)}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Application Modal - Only render when we have a job */}
      {applicationJob && (
        <ApplicationModal
          isOpen={isApplicationModalOpen}
          closeModal={() => {
            setIsApplicationModalOpen(false)
            setApplicationJob(null) // Clear the selected job when closing
          }}
          job={applicationJob}
          onSubmit={() => {
            setIsApplicationModalOpen(false)
            setApplicationJob(null) // Clear the selected job after submission
            fetchAppliedJobs()
          }}
        />
      )}
    </div>
  )
}

// Enhanced Job Card Component
const JobCard = ({ job, onApply, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 hover:text-[#0d3572] transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-600 mt-1 flex items-center">
              <BuildingOfficeIcon className="w-5 h-5 mr-2" />
              {job.recruiter?.company}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <BriefcaseIcon className="w-4 h-4 mr-1.5" />
              {job.type}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <MapPinIcon className="w-4 h-4 mr-1.5" />
              {job.location}
            </span>
            {job.salary && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                <CurrencyDollarIcon className="w-4 h-4 mr-1.5" />
                {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={onViewDetails}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={onApply}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#0d3572] hover:bg-[#0d3572]/90 transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 flex items-center">
        <CalendarIcon className="w-4 h-4 mr-1.5" />
        Posted {new Date(job.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })}
      </div>
    </div>
  )
}

// Add this component to show applied jobs
const AppliedJobCard = ({ application, onViewDetails }) => {
  // Destructure the application object to get the job and status
  const { applicationDetails, ...jobDetails } = application
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-4 flex-1">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{jobDetails.title}</h3>
            <p className="text-gray-600 mt-1 flex items-center">
              <BuildingOfficeIcon className="w-5 h-5 mr-2" />
              {jobDetails.company}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <BriefcaseIcon className="w-4 h-4 mr-1.5" />
              {jobDetails.type}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <MapPinIcon className="w-4 h-4 mr-1.5" />
              {jobDetails.location}
            </span>
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
              applicationDetails.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              applicationDetails.status === 'accepted' ? 'bg-green-100 text-green-800' :
              applicationDetails.status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              <ClockIcon className="w-4 h-4 mr-1.5" />
              {applicationDetails.status.charAt(0).toUpperCase() + applicationDetails.status.slice(1)}
            </span>
          </div>

          <div className="text-sm text-gray-500 flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1.5" />
            Applied on {new Date(applicationDetails.appliedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <button
            onClick={() => onViewDetails(jobDetails)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            View Job Details
          </button>
          {applicationDetails.status === 'accepted' && (
            <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg">
              ✓ Application Accepted
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// Enhanced Job Details Component
const JobDetails = ({ job, onApply, isApplied }) => {
  // Add this check to handle both job and application data structures
  const jobData = job.applicationDetails ? {
    ...job,
    recruiter: { company: job.company }
  } : job

  return (
    <div className="mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{jobData.title}</h2>
            <p className="text-lg text-gray-600 mt-2 flex items-center">
              <BuildingOfficeIcon className="w-6 h-6 mr-2" />
              {jobData.recruiter?.company || jobData.company}
            </p>
          </div>
          
          {!isApplied && (
            <button
              onClick={onApply}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#0d3572] hover:bg-[#0d3572]/90 transition-colors"
            >
              Apply Now
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <BriefcaseIcon className="w-5 h-5 mr-2" />
            {jobData.type}
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <MapPinIcon className="w-5 h-5 mr-2" />
            {jobData.location}
          </span>
          {jobData.salary && (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              <CurrencyDollarIcon className="w-5 h-5 mr-2" />
              {jobData.salary.currency} {jobData.salary.min.toLocaleString()} - {jobData.salary.max.toLocaleString()}
            </span>
          )}
        </div>

        <div className="mt-8 prose prose-blue max-w-none">
          <h3 className="text-lg font-semibold text-gray-900">Job Description</h3>
          <div dangerouslySetInnerHTML={{ __html: jobData.description }} />
        </div>

        <div className="mt-8 prose prose-blue max-w-none">
          <h3 className="text-lg font-semibold text-gray-900">Requirements</h3>
          <div dangerouslySetInnerHTML={{ __html: jobData.requirements }} />
        </div>

        {jobData.benefits && (
          <div className="mt-8 prose prose-blue max-w-none">
            <h3 className="text-lg font-semibold text-gray-900">Benefits</h3>
            <div dangerouslySetInnerHTML={{ __html: jobData.benefits }} />
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              Posted on {new Date(jobData.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            {!isApplied && (
              <button
                onClick={onApply}
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#0d3572] hover:bg-[#0d3572]/90 transition-colors"
              >
                Apply for this position
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Application Modal Component
const ApplicationModal = ({ isOpen, closeModal, job, onSubmit }) => {
  // Return null if no job is selected
  if (!job) return null;

  const { userState } = useUserStore()
  const userData = userState?.userdata || {}

  // Pre-fill form data with user details
  const [formData, setFormData] = useState({
    fullName: userData?.fullname || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    cv: null,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('fullName', formData.fullName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('userId', userData?._id) // Add user ID
      if (formData.cv) {
        formDataToSend.append('cv', formData.cv)
      }

      const response = await fetch(`/api/jobs/${job._id}/apply`, {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      if (data.status === 'success') {
        toast.success('Application submitted successfully!')
        closeModal()
        onSubmit()
      } else {
        throw new Error(data.message || 'Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error(error.message || 'Failed to submit application')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Apply for {job.title}
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0d3572] focus:ring-[#0d3572]"
                      disabled // Make it readonly since it's from user profile
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0d3572] focus:ring-[#0d3572]"
                      disabled // Make it readonly since it's from user profile
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0d3572] focus:ring-[#0d3572]"
                      disabled={!!userData?.phone} // Make it readonly if phone exists in profile
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CV/Resume
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={(e) => setFormData(prev => ({ ...prev, cv: e.target.files[0] }))}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cover Letter
                    </label>
                    <textarea
                      rows={4}
                      value={formData.coverLetter}
                      onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0d3572] focus:ring-[#0d3572]"
                      placeholder="Why should we hire you?"
                    />
                  </div> */}

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#0d3572] px-4 py-2 text-sm font-medium text-white hover:bg-[#0d3572]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default JobDashboard