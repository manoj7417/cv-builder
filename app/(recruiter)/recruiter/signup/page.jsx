"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

const RecruiterSignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    position: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/recruiters/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          company: formData.company,
          position: formData.position,
          phone: formData.phone,
        }),
      });

      const data = await response.json();
      console.log("data::", data);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (data.status === "success") {
        toast.success("Registration successful");
        toast.info("Verification link sent to your email address", {
          autoClose: 5000,
        });
        router.push("/recruiter/signin?registered=true");
      }
    } catch (error) {
      setError(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-10 sm:py-12">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/recruitment.jpg"
          alt="Recruitment"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/40" />
      </div>

      {/* Form Container */}
      <div className="relative w-full max-w-4xl mx-auto px-3 sm:px-6 md:px-8">
        <div className="bg-white/95 backdrop-blur-sm p-3 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-white/20">
          {/* Logo and Back Button Container */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6 mb-4 sm:mb-8">
            {/* Logo */}
            <div className="w-20 sm:w-28">
              <Image
                src="/beta-logo.png"
                alt="Logo"
                width={100}
                height={25}
                className="object-contain w-full h-auto"
              />
            </div>

            {/* Back Button */}
            <Link
              href="/"
              className="group flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-2.5 bg-white hover:bg-gray-50 rounded-full text-gray-700 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 group-hover:text-gray-700 transition-colors"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs sm:text-base font-medium group-hover:text-gray-900">
                Back to Website
              </span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="text-center space-y-1 sm:space-y-2 mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-gray-600">
              Join our platform to find the best talent
            </p>
          </div>

          <form
            className="mt-6 sm:mt-8 space-y-6 sm:space-y-8"
            onSubmit={handleSubmit}
          >
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
                <p className="flex items-center text-sm sm:text-base text-red-700">
                  <svg
                    className="w-5 h-5 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Name Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white hover:bg-gray-50/80"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-semibold text-gray-700"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white hover:bg-gray-50/80"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="block text-xs sm:text-sm font-semibold text-gray-700"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white hover:bg-gray-50/80"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Company Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="company"
                  className="block text-xs sm:text-sm font-semibold text-gray-700"
                >
                  Company Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white hover:bg-gray-50/80"
                    placeholder="Enter company name"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Position Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="position"
                  className="block text-xs sm:text-sm font-semibold text-gray-700"
                >
                  Position
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    id="position"
                    name="position"
                    type="text"
                    required
                    className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white hover:bg-gray-50/80"
                    placeholder="Enter your position"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white hover:bg-gray-50/80"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs sm:text-sm font-semibold text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white hover:bg-gray-50/80"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 sm:py-3 px-4 sm:px-6 text-xs sm:text-base font-medium text-white bg-primary hover:bg-primary-dark rounded-xl shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span className="text-xs sm:text-base">
                      Creating account...
                    </span>
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="mt-4 sm:mt-8 text-center">
            <Link
              href="/recruiter/signin"
              className="text-xs sm:text-base font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Already have an account?{" "}
              <span className="underline">Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterSignUp;
