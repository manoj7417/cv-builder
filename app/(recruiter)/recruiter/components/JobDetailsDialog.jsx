import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, ClockIcon, BuildingOfficeIcon, PencilIcon, ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

const JobDetailsDialog = ({ isOpen, onClose, job, onJobUpdated }) => {
  const router = useRouter()
  const [openSection, setOpenSection] = useState({
    description: true,
    requirements: true
  })
  
  // Update the dialog content when job changes
  useEffect(() => {
    if (job) {
      setOpenSection({
        description: true,
        requirements: true
      })
    }
  }, [job])

  const toggleSection = (section) => {
    setOpenSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Move the null check here after all hooks
  if (!isOpen) return null
  if (!job) return null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-[90%] lg:max-w-[1200px] transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-[#0d3572] text-white">
                  <div className="flex items-center justify-between">
                    <Dialog.Title as="h3" className="text-xl font-semibold">
                      Job Details
                    </Dialog.Title>
                    <button
                      type="button"
                      className="rounded-md bg-white/10 text-white hover:bg-white/20 p-1"
                      onClick={onClose}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <div className="px-8 py-6">
                  {/* Job Header Section */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-200">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <BuildingOfficeIcon className="h-5 w-5 mr-2 text-gray-400" />
                          {job.company}
                        </span>
                        <span className="flex items-center">
                          <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                          {job.location}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.status === 'active' 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p className="text-sm text-gray-500">Posted on</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(job.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Description Section */}
                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleSection('description')}
                          className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
                        >
                          <h3 className="text-lg font-semibold text-gray-900">Job Description</h3>
                          <ChevronDownIcon 
                            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                              openSection.description ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        <div
                          className={`transition-all duration-200 ease-in-out ${
                            openSection.description 
                              ? 'max-h-[1000px] opacity-100' 
                              : 'max-h-0 opacity-0 overflow-hidden'
                          }`}
                        >
                          <div className="prose max-w-none p-6 pt-0 [&>*]:text-left">
                            <div dangerouslySetInnerHTML={{ __html: job.description }} />
                          </div>
                        </div>
                      </div>

                      {/* Requirements Section */}
                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleSection('requirements')}
                          className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
                        >
                          <h3 className="text-lg font-semibold text-gray-900">Requirements</h3>
                          <ChevronDownIcon 
                            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                              openSection.requirements ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        <div
                          className={`transition-all duration-200 ease-in-out ${
                            openSection.requirements 
                              ? 'max-h-[1000px] opacity-100' 
                              : 'max-h-0 opacity-0 overflow-hidden'
                          }`}
                        >
                          <div className="prose max-w-none p-6 pt-0 [&>*]:text-left">
                            <div dangerouslySetInnerHTML={{ __html: job.requirements }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Job Details */}
                    <div className="space-y-6">
                      {/* Job Overview Card */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Overview</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <span className="text-sm text-gray-600">Job Type</span>
                            <span className="text-sm font-medium text-gray-900">{job.type}</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <span className="text-sm text-gray-600">Work Type</span>
                            <span className="text-sm font-medium text-gray-900">
                              {job.workType.charAt(0).toUpperCase() + job.workType.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <span className="text-sm text-gray-600">Salary Range</span>
                            <span className="text-sm font-medium text-gray-900">
                              {job.salary?.currency} {job.salary?.min.toLocaleString()} - {job.salary?.max.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Applications Stats Card */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <span className="text-sm text-gray-600">Total Applications</span>
                            <span className="text-sm font-medium text-gray-900">{job.applications?.length || 0}</span>
                          </div>
                          <button
                            onClick={() => router.push(`/recruiter/applications/${job._id}`)}
                            className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-[#0d3572] hover:bg-[#0d3572]/90"
                          >
                            View Applications
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default JobDetailsDialog 