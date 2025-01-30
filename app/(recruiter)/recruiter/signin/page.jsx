"use client";
import React, { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RecruiterSignIn = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [sendingMail, setIsSendingMail] = useState(false);
  const email = useRef(null);

  const handleDialogClose = () => {
    setShowDialog(false);
  };

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

    try {
      const response = await fetch("/api/recruiters/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign in");
      }

      if (data.token) {
        Cookies.set("token", data.token, {
          expires: 7, // 7 days
          path: "/",
          sameSite: "lax",
        });
      }

      window.location.href = "/recruiter/dashboard";
    } catch (error) {
      console.error("Signin error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendResetEmail = async () => {
    const userEmail = email.current.value;
    setIsSendingMail(true);
    try {
      const response = await axios.post("/api/forgotPassword", {
        email: userEmail,
      });
      if (response.status === 200) {
        email.current.value = null;
        toast.success("Reset password link sent to your email");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Error sending reset password email"
      );
    } finally {
      setIsSendingMail(false);
      setShowDialog(false);
    }
  };

  return (
    <>
      <Dialog open={showDialog}>
        <DialogContent
          className="w-[400px] rounded-lg"
          onClick={handleDialogClose}
          showCloseButton
        >
          <div>
            <DialogTitle>
              <h1 className="text-xl font-semibold">Reset Your Password</h1>
              <p className="text-sm text-gray-400 font-normal">
                Enter the email associated with your account
              </p>
            </DialogTitle>
            <Input
              placeholder="Enter your email address"
              className="mt-4"
              ref={email}
            />
            <div className="w-full my-3 flex justify-end items-center">
              <Button
                className=" disabled:bg-opacity-85 w-full"
                disabled={sendingMail}
                onClick={handleSendResetEmail}
              >
                {sendingMail ? (
                  <>
                    Sending
                    <ImSpinner3 className="animate-spin ml-2" size={16} />
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex min-h-screen bg-gray-50">
        {/* Left side - Image Section */}
        <div className="hidden lg:block relative w-1/2 bg-gray-900">
          <Image
            src="/recruitment.jpg"
            alt="Recruitment"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/30" />

          {/* Logo */}
          <div className="absolute top-8 left-8 z-10">
            <Link href={"/"}>
              <Image
                src="/beta-logo.png"
                alt="Logo"
                width={100}
                height={25}
                className="object-contain filter brightness-0 invert"
              />
            </Link>
          </div>

          {/* Back button */}
          <Link
            href="/"
            className="absolute top-8 right-8 px-6 py-2.5 bg-white/95 hover:bg-white rounded-full text-gray-800 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Back to Website</span>
          </Link>

          {/* Welcome Text Overlay */}
          <div className="absolute bottom-16 left-8 right-8 text-white">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Your
              <br />
              Recruitment Journey
            </h1>
            <p className="text-lg text-gray-200">
              Find the perfect candidates for your team.
            </p>
          </div>
        </div>

        {/* Right side - Enhanced Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-white">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-6">
              <Link href={"/"}>
                <Image
                  src="/beta-logo.png"
                  alt="Logo"
                  width={100}
                  height={25}
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Enhanced Header Section */}
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-lg text-gray-600">
                Sign in to your recruiter account
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-gray-50/30 hover:bg-gray-50/70"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-gray-50/30 hover:bg-gray-50/70"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700 cursor-pointer select-none"
                    >
                      Remember me
                    </label>
                  </div>

                  <div
                    className="text-sm font-medium text-primary hover:text-primary-dark transition-colors cursor-pointer"
                    onClick={() => setShowDialog(true)}
                  >
                    Forgot password?
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-gray-600">Don&apos;t have an account?</p>
              <Link
                href="/recruiter/signup"
                className="inline-block font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterSignIn;
