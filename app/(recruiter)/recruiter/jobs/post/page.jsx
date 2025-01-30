"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { default as dynamicImport } from "next/dynamic";

// Dynamic import for React-Quill with SSR disabled
const ReactQuill = dynamicImport(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-gray-50 animate-pulse rounded-lg"></div>
  ),
});
import "react-quill/dist/quill.snow.css";

// Quill editor configurations
const editorModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const editorFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
];

const CURRENCIES = [
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar" },
];

// First, update the editor container styles
const editorStyles = {
  ".ql-container": {
    minHeight: "200px",
    height: "auto",
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  ".ql-editor": {
    minHeight: "200px",
    height: "auto",
    flex: "1",
    overflowY: "auto",
  },
};

export const dynamic = "force-dynamic";

export default function PostJob() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: "",
    salary: {
      min: "",
      max: "",
      currency: "USD",
    },
    workType: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "workType") {
      let locationValue = "";
      if (value === "remote") {
        locationValue = "Remote";
      }
      setFormData((prev) => ({
        ...prev,
        workType: value,
        location: value === "remote" ? locationValue : prev.location,
      }));
    } else if (name === "location") {
      const prefix =
        formData.workType === "hybrid"
          ? "Hybrid - "
          : formData.workType === "onsite"
          ? "In-Office - "
          : "";
      if (formData.workType === "hybrid" || formData.workType === "onsite") {
        setFormData((prev) => ({
          ...prev,
          location: value,
        }));
      }
    } else if (name.startsWith("salary.")) {
      const salaryField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        salary: {
          ...prev.salary,
          [salaryField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setFormData((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        currency: currency.code,
      },
    }));
  };

  const handleDescriptionChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const handleRequirementsChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      requirements: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      let formattedLocation;
      switch (formData.workType) {
        case "remote":
          formattedLocation = "Remote";
          break;
        case "hybrid":
          formattedLocation = `Hybrid - ${formData.location}`;
          break;
        case "onsite":
          formattedLocation = `In-Office - ${formData.location}`;
          break;
        default:
          formattedLocation = formData.location;
      }

      const jobData = {
        ...formData,
        location: formattedLocation,
        salary: {
          min: Number(formData.salary.min),
          max: Number(formData.salary.max),
          currency: formData.salary.currency,
        },
      };

      const response = await fetch("/api/recruiters/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to post job");
      }

      router.push("/recruiter/jobs");
    } catch (error) {
      console.error("Job posting error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-white border-b">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Create New Job Post
            </h1>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#0d3572] border border-[#0d3572] rounded-lg hover:bg-[#0d3572]/90"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Form */}
          <div className="lg:flex-1 min-w-0">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Job Overview Section */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Job Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Job Title*
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#0d3572] focus:ring-[#0d3572] sm:text-sm"
                      placeholder="e.g. Senior Software Engineer"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Name*
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#0d3572] focus:ring-[#0d3572] sm:text-sm"
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Work Type*
                    </label>
                    <select
                      name="workType"
                      value={formData.workType}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0d3572] focus:ring-[#0d3572]"
                      required
                    >
                      <option value="">Select Work Type</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="onsite">In-Office</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Location*
                    </label>
                    {formData.workType === "remote" ? (
                      <input
                        type="text"
                        name="location"
                        value="Remote"
                        disabled
                        className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm"
                      />
                    ) : formData.workType === "hybrid" ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="Enter office location for hybrid work"
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0d3572] focus:ring-[#0d3572]"
                          required
                        />
                        <p className="text-sm text-gray-500">
                          Will be displayed as: &quot;Hybrid -{" "}
                          {formData.location}&quot;
                        </p>
                      </div>
                    ) : formData.workType === "onsite" ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="Enter office location"
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0d3572] focus:ring-[#0d3572]"
                          required
                        />
                        <p className="text-sm text-gray-500">
                          Will be displayed as: &quot;In-Office -{" "}
                          {formData.location}&quot;
                        </p>
                      </div>
                    ) : (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Select work type first"
                        disabled
                        className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm"
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Employment Type*
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#0d3572] focus:ring-[#0d3572] sm:text-sm"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Salary Section */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Compensation
                </h2>
                <div className="space-y-4">
                  {/* Currency Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCurrency.code}
                        onChange={(e) => {
                          const currency = CURRENCIES.find(
                            (c) => c.code === e.target.value
                          );
                          handleCurrencyChange(currency);
                        }}
                        className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#0d3572] focus:ring-[#0d3572] sm:text-sm"
                      >
                        {CURRENCIES.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.code} - {currency.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="salary.min"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Minimum Salary*
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          {selectedCurrency.symbol}
                        </span>
                        <input
                          type="number"
                          id="salary.min"
                          name="salary.min"
                          required
                          value={formData.salary.min}
                          onChange={handleChange}
                          className="block w-full rounded-lg border border-gray-300 pl-8 pr-12 py-3 focus:border-[#0d3572] focus:ring-[#0d3572] sm:text-sm"
                          placeholder="0"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm">
                            {selectedCurrency.code}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="salary.max"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Maximum Salary*
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          {selectedCurrency.symbol}
                        </span>
                        <input
                          type="number"
                          id="salary.max"
                          name="salary.max"
                          required
                          value={formData.salary.max}
                          onChange={handleChange}
                          className="block w-full rounded-lg border border-gray-300 pl-8 pr-12 py-3 focus:border-[#0d3572] focus:ring-[#0d3572] sm:text-sm"
                          placeholder="0"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm">
                            {selectedCurrency.code}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section with Rich Text Editor */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Job Details
                </h2>
                <div className="space-y-6">
                  {/* Description Editor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description*
                    </label>
                    <div className="prose max-w-none">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="h-[300px] flex flex-col">
                          <ReactQuill
                            theme="snow"
                            value={formData.description}
                            onChange={handleDescriptionChange}
                            modules={editorModules}
                            formats={editorFormats}
                            className="flex-1 overflow-y-auto"
                            style={{
                              height: "250px",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {formData.description === "<p><br></p>" && (
                      <p className="mt-2 text-sm text-red-600">
                        Description is required
                      </p>
                    )}
                  </div>

                  {/* Requirements Editor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requirements*
                    </label>
                    <div className="prose max-w-none">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="h-[300px] flex flex-col">
                          <ReactQuill
                            theme="snow"
                            value={formData.requirements}
                            onChange={handleRequirementsChange}
                            modules={editorModules}
                            formats={editorFormats}
                            className="flex-1 overflow-y-auto"
                            style={{
                              height: "250px",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {formData.requirements === "<p><br></p>" && (
                      <p className="mt-2 text-sm text-red-600">
                        Requirements are required
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#0d3572] hover:bg-[#0d3572]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Posting...
                    </>
                  ) : (
                    "Post Job"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Preview/Tips */}
          <div className="lg:w-80 flex-shrink-0 space-y-4">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tips for a Great Job Post
              </h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex gap-3">
                  <svg
                    className="h-5 w-5 text-[#0d3572]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Be specific about requirements and responsibilities
                  </span>
                </li>
                <li className="flex gap-3">
                  <svg
                    className="h-5 w-5 text-[#0d3572]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Include salary range to attract qualified candidates
                  </span>
                </li>
                <li className="flex gap-3">
                  <svg
                    className="h-5 w-5 text-[#0d3572]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Highlight key benefits and growth opportunities</span>
                </li>
                <li className="flex gap-3">
                  <svg
                    className="h-5 w-5 text-[#0d3572]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Use clear, professional language</span>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Having trouble creating your job post? Our team is here to help!
              </p>
              <button
                type="button"
                onClick={() => router.push("/contact-us")}
                className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#0d3572] border border-[#0d3572] rounded-lg hover:bg-[#0d3572]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d3572]"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add these styles to your global CSS or in a style tag */}
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
      `}</style>
    </div>
  );
}
