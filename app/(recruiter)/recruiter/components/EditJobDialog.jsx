import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import React from 'react'

// Dynamic import for React-Quill
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-50 animate-pulse rounded-lg"></div>,
})

// Basic editor configuration
const editorModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean']
  ]
}

const editorFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link'
]

const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar' },
]

const JOB_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' }
]

const EditJobDialog = ({ isOpen, onClose, job, onJobUpdated }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0])
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    salary: {
      min: '',
      max: '',
      currency: 'USD'
    },
    workType: '',
    status: 'active'
  })

  // Add state to track if editors should be rendered
  const [showEditors, setShowEditors] = useState(false)

  // Add new state for closure details
  const [showClosureDetails, setShowClosureDetails] = useState(false)
  const [closureDetails, setClosureDetails] = useState({
    candidateFound: false,
    closureReason: '',
    closureNote: ''
  })

  // First, add submitting state if not already present
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setShowEditors(false)
      return
    }

    const timer = setTimeout(() => {
      if (job) {
        // Extract the actual location from formatted string for hybrid/onsite
        let actualLocation = job.location
        if (job.workType === 'hybrid') {
          actualLocation = job.location.replace('Hybrid - ', '')
        } else if (job.workType === 'onsite') {
          actualLocation = job.location.replace('In-Office - ', '')
        }

        setFormData({
          title: job.title || '',
          company: job.company || '',
          location: actualLocation, // Set the cleaned location
          type: job.type || 'Full-time',
          description: job.description || '',
          requirements: Array.isArray(job.requirements) ? job.requirements[0] : job.requirements || '',
          salary: job.salary || { currency: 'USD', min: '', max: '' },
          workType: job.workType || '',
          status: job.status || 'active',
        })
        const currency = CURRENCIES.find(c => c.code === job.salary?.currency) || CURRENCIES[0]
        setSelectedCurrency(currency)
        setShowEditors(true)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [isOpen, job])

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'workType') {
      // Clear location when switching work types (except when it's remote)
      let locationValue = '';
      if (value === 'remote') {
        locationValue = 'Remote';
      }
      // Always reset location when changing work type
      setFormData(prev => ({
        ...prev,
        workType: value,
        location: locationValue // This will clear location when switching between hybrid/onsite
      }));
    } else if (name === 'location') {
      if (formData.workType === 'hybrid' || formData.workType === 'onsite') {
        setFormData(prev => ({
          ...prev,
          location: value
        }));
      }
    } else if (name.startsWith('salary.')) {
      const salaryField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        salary: {
          ...prev.salary,
          [salaryField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency)
    setFormData(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        currency: currency.code
      }
    }))
  }

  const handleDescriptionChange = (content) => {
    setFormData(prev => ({
      ...prev,
      description: content
    }))
  }

  const handleRequirementsChange = (content) => {
    setFormData(prev => ({
      ...prev,
      requirements: content
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);

      // Validate closure details if needed
      if (formData.status === 'closed') {
        if (!closureDetails.closureReason) {
          toast.error('Please select a closure reason');
          return;
        }
        if (!closureDetails.closureNote.trim()) {
          toast.error('Please provide a closure note');
          return;
        }
      }

      const response = await fetch(`/api/recruiters/jobs/${job._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            ...formData,
            ...(formData.status === 'closed' && {
              ...closureDetails
            })
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update job');
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        const updatedJob = {
          ...job,
          ...formData,
          ...(formData.status === 'closed' && {
            ...closureDetails
          })
        };

        // Update the local state first
        setFormData(updatedJob);
        
        // Call onJobUpdated with the updated job data
        if (onJobUpdated) {
          onJobUpdated(updatedJob);
        }

        toast.success('Job updated successfully');
        onClose();
      }
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error(error.message || 'Failed to update job');
    } finally {
      setSubmitting(false);
    }
  };

  // Add status change handler
  const handleStatusChange = (e) => {
    const newStatus = e.target.value
    setFormData(prev => ({ ...prev, status: newStatus }))
    
    if (newStatus === 'closed') {
      setShowClosureDetails(true)
    } else {
      setShowClosureDetails(false)
      setClosureDetails({
        candidateFound: false,
        closureReason: '',
        closureNote: ''
      })
    }
  }

  // Update the handleCandidateFoundChange function
  const handleCandidateFoundChange = (e) => {
    const isChecked = e.target.checked
    
    // Update closure details with a single state update
    setClosureDetails({
      candidateFound: isChecked,
      closureReason: isChecked ? 'hired' : '',
      closureNote: isChecked 
        ? 'Position filled through successful hire from this job posting.'
        : ''
    })
  }

  if (!isOpen || !job) return null

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
              <Dialog.Panel className="w-full max-w-[90%] lg:max-w-[1100px] transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                {/* Header with Status */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-[#0d3572]">
                  <div className="flex items-center space-x-4">
                    <Dialog.Title as="h3" className="text-xl font-semibold text-white">
                      Edit Job
                    </Dialog.Title>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleStatusChange}
                      required
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 bg-white focus:border-[#0d3572] focus:ring-[#0d3572] min-w-[120px]"
                    >
                      {JOB_STATUSES.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="px-6 py-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left Column - Main Info */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Basic Info Section */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                              Job Title*
                            </label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              required
                              value={formData.title}
                              onChange={handleChange}
                              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#0d3572] focus:ring-[#0d3572] text-sm"
                              placeholder="e.g. Senior Software Engineer"
                            />
                          </div>
                          <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                              Company Name*
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              required
                              value={formData.company}
                              onChange={handleChange}
                              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#0d3572] focus:ring-[#0d3572] text-sm"
                              placeholder="Your company name"
                            />
                          </div>
                        </div>

                        {/* Description Editor */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Description*
                          </label>
                          <div className="prose max-w-none">
                            {showEditors ? (
                              <div className="border rounded-lg overflow-hidden bg-white">
                                <div className="h-[350px] flex flex-col">
                                  <ReactQuill
                                    theme="snow"
                                    value={formData.description}
                                    onChange={(content) => setFormData(prev => ({ ...prev, description: content }))}
                                    modules={editorModules}
                                    formats={editorFormats}
                                    className="flex-1 overflow-y-auto"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="h-[350px] w-full bg-gray-50 animate-pulse rounded-lg" />
                            )}
                          </div>
                        </div>

                        {/* Requirements Editor */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Requirements*
                          </label>
                          <div className="prose max-w-none">
                            {showEditors ? (
                              <div className="border rounded-lg overflow-hidden bg-white">
                                <div className="h-[350px] flex flex-col">
                                  <ReactQuill
                                    theme="snow"
                                    value={formData.requirements}
                                    onChange={(content) => setFormData(prev => ({ ...prev, requirements: content }))}
                                    modules={editorModules}
                                    formats={editorFormats}
                                    className="flex-1 overflow-y-auto"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="h-[350px] w-full bg-gray-50 animate-pulse rounded-lg" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Additional Details */}
                      <div className="space-y-6">
                        {/* Work Details Card */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                          <h4 className="text-sm font-medium text-gray-900">Work Details</h4>
                          <div className="grid gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Work Type*
                              </label>
                              <select
                                name="workType"
                                value={formData.workType}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                              >
                                <option value="">Select Work Type</option>
                                <option value="remote">Remote</option>
                                <option value="hybrid">Hybrid</option>
                                <option value="onsite">On-site</option>
                              </select>
                            </div>

                            {formData.workType !== 'remote' && formData.workType && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Location*
                                </label>
                                <input
                                  type="text"
                                  name="location"
                                  value={formData.location}
                                  onChange={handleChange}
                                  required
                                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                  placeholder={`Enter ${formData.workType === 'hybrid' ? 'hybrid' : 'office'} location`}
                                />
                              </div>
                            )}

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Type*
                              </label>
                              <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                              >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Salary Card */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                          <h4 className="text-sm font-medium text-gray-900">Compensation</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Currency
                              </label>
                              <select
                                value={selectedCurrency.code}
                                onChange={(e) => {
                                  const currency = CURRENCIES.find(c => c.code === e.target.value)
                                  handleCurrencyChange(currency)
                                }}
                                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                              >
                                {CURRENCIES.map((currency) => (
                                  <option key={currency.code} value={currency.code}>
                                    {currency.code} - {currency.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Min Salary*
                                </label>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    {selectedCurrency.symbol}
                                  </span>
                                  <input
                                    type="number"
                                    name="salary.min"
                                    required
                                    value={formData.salary.min}
                                    onChange={handleChange}
                                    className="block w-full rounded-lg border border-gray-300 pl-7 pr-10 py-2 text-sm"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Max Salary*
                                </label>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    {selectedCurrency.symbol}
                                  </span>
                                  <input
                                    type="number"
                                    name="salary.max"
                                    required
                                    value={formData.salary.max}
                                    onChange={handleChange}
                                    className="block w-full rounded-lg border border-gray-300 pl-7 pr-10 py-2 text-sm"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Closure Details Modal */}
                    {showClosureDetails && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Job Closure Details
                        </h3>
                        
                        <div className="space-y-4">
                          {/* Candidate Found Checkbox */}
                          <div className="relative flex items-start">
                            <div className="flex items-center h-6">
                              <input
                                type="checkbox"
                                id="candidateFound"
                                name="candidateFound"
                                checked={closureDetails.candidateFound}
                                onChange={handleCandidateFoundChange}
                                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500
                                  appearance-none checked:bg-blue-600 checked:hover:bg-blue-700
                                  transition-colors cursor-pointer relative"
                              />
                            </div>
                            <div className="ml-3">
                              <label 
                                htmlFor="candidateFound" 
                                className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                              >
                                Candidate found through this posting
                              </label>
                              <p 
                                id="candidate-found-description" 
                                className="text-xs text-gray-500 mt-1"
                              >
                                This will automatically set the closure reason to &quot;hired&quot;
                              </p>
                            </div>
                          </div>

                          {/* Closure Reason - Disabled and auto-set if candidate found */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Reason for Closure *
                            </label>
                            <select
                              value={closureDetails.closureReason}
                              onChange={(e) => setClosureDetails(prev => ({
                                ...prev,
                                closureReason: e.target.value
                              }))}
                              disabled={closureDetails.candidateFound}
                              className={`w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 
                                ${closureDetails.candidateFound ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                              required
                            >
                              <option value="">Select a reason</option>
                              <option value="hired">Hired through this posting</option>
                              <option value="position_filled">Position filled through other means</option>
                              <option value="cancelled">Position cancelled</option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          {/* Closure Note - Pre-filled and editable if candidate found */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Closure Note *
                            </label>
                            <textarea
                              value={closureDetails.closureNote}
                              onChange={(e) => setClosureDetails(prev => ({
                                ...prev,
                                closureNote: e.target.value
                              }))}
                              className={`w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500
                                ${closureDetails.candidateFound ? 'bg-gray-50' : ''}`}
                              rows={3}
                              placeholder="Please provide details about the job closure..."
                              required
                            />
                            {closureDetails.candidateFound && (
                              <p className="mt-1 text-sm text-gray-500">
                                You can edit this note to add more details about the hire.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 text-sm font-medium text-white bg-[#0d3572] border border-transparent rounded-lg hover:bg-[#0d3572]/90"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
      <style jsx global>{`
        .ql-container {
          flex: 1;
          overflow-y: auto;
        }

        .ql-editor {
          min-height: 200px;
          max-height: none;
        }

        .ql-toolbar {
          border-bottom: 1px solid #e5e7eb;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 1;
        }

        input[type="checkbox"] {
          appearance: none;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          display: inline-block;
          vertical-align: middle;
          background-origin: border-box;
          user-select: none;
          flex-shrink: 0;
          height: 1.25rem;
          width: 1.25rem;
          background-color: #fff;
          border-color: #d1d5db;
          border-width: 1px;
          border-radius: 0.25rem;
        }

        input[type="checkbox"]:checked {
          background-color: #2563eb;
          border-color: #2563eb;
          background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
        }

        input[type="checkbox"]:checked:hover {
          background-color: #1d4ed8;
          border-color: #1d4ed8;
        }

        input[type="checkbox"]:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
          box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6;
        }

        input[type="checkbox"]:checked:focus {
          border-color: transparent;
        }
      `}</style>
    </Transition>
  )
}

export default EditJobDialog