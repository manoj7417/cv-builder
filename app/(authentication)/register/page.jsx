"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { toast } from "react-toastify";
import { ImSpinner3 } from "react-icons/im";
import { registerUser } from "../../api/api";
import { Input } from "@/components/ui/input";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (data) => {
    if (!data.terms) {
      toast.error("You must agree to the terms and conditions", { autoClose: 5000 }); // 5000ms = 5 seconds
      return;
    }
    setIsLoading(true);
    try {
      const response = await registerUser(data);
      if (response.status === 201) {
        toast.success("Registration successful");
        toast.info("Verification link sent to your email address", { autoClose: 5000 });
        router.push("/login");
      }
    } catch (error) {
      toast.error(error.response.data.error); // 20000ms = 20 seconds
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div className="relative items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24 hidden sm:flex">
          <div className="absolute inset-0">
            <Image
              width={500}
              height={500}
              className="h-full w-full rounded-md object-cover object-center"
              src="/newlogin.png"
              alt="register"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
              <h3 className="text-4xl font-bold text-white">
                Approach your Dream Profession with <br />
                <Link href={"/"}>
                  <span className="bg-gradient-to-r from-blue-600 via-green-200 to-indigo-400 inline-block text-transparent bg-clip-text">
                    Genies Career Hub!
                  </span>
                </Link>
              </h3>
              <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    Custom CVs
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    Skill Gaps Analyser
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    ATS Optimisation
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    AI-Based CV Creator
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex lg:items-center items-start justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md w-full  border-0 sm:border-0 shadow-blue-100 shadow-none  sm:shadow-none  py-12 sm:py-0 px-8 sm:px-0 rounded-2xl">
          <Link href={"/"} className="flex justify-center items-center mb-[60px]">
              <Image
                src="/genies-career-hub-logo.png"
                width={100}
                height={100}
                alt="white_logo"
                className="w-28 h-auto object-contain"
              />
            </Link>
            <h2 className="text-3xl font-bold leading-tight text-blue-900 sm:text-4xl">
              Sign up
            </h2>
            <form className="mt-5" onSubmit={handleSubmit(handleRegister)}>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="lg:text-base text-sm font-medium text-gray-900"
                  >
                    Full Name
                  </label>
                  <div className="lg:mt-2 mt-1">
                    <Input
                      className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 h-10"
                      type="text"
                      placeholder="Full Name"
                      id="name"
                      {...register("fullname", {
                        required: {
                          value: true,
                          message: "Full Name is required",
                        },
                      })}
                    />
                    <div className="text-red-500 text-sm my-2">
                      {errors?.fullname?.message}
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="lg:text-base text-sm font-medium text-gray-900"
                  >
                    Email Address
                  </label>
                  <div className="lg:mt-2 mt-1">
                    <Input
                      className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 h-10"
                      type="email"
                      placeholder="Email Address"
                      id="email"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                        pattern: {
                          value:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Email is Invalid",
                        },
                      })}
                    />
                    <div className="text-red-500 text-sm my-2">
                      {errors?.email?.message}
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="lg:text-base text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="lg:mt-2 mt-1 relative">
                    <Input
                      className="flex  w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 h-12"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      id="password"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters long",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                        },
                      })}
                    />

                    <div className="text-red-500 text-sm my-2">
                      {errors?.password?.message}
                    </div>
                    <div className="top-0 right-0 absolute h-12 flex items-center justify-center pr-3">
                      {
                        showPassword ? <IoEye className="cursor-pointer h-4 w-4" onClick={() => setShowPassword(false)} /> : <IoEyeOff className="cursor-pointer h-4 w-4" onClick={() => setShowPassword(true)} />
                      }
                    </div>
                  </div>
                </div>
                <div className="field field-checkbox flex items-center">
                  <input
                    id="checkbox"
                    type="checkbox"
                    name="terms"
                    className="form-checkbox lg:h-4 lg:w-4 h-3 w-3 text-blue-600"
                    {...register("terms", { required: true })}
                  />
                  <label
                    htmlFor="checkbox"
                    className="ml-2 lg:text-sm text-[12px] text-gray-700"
                  >
                    <p>
                      By signing up you are agreeing to our
                      <Link href="/terms-condition" className="text-blue-900 underline underline-offset-4 ml-1 font-semibold"> Terms and Conditions</Link>
                    </p>
                  </label>
                </div>
                {errors.terms && (
                  <div className="text-red-500 text-sm my-2">
                    You must agree to the terms and conditions
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-blue-900 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue/80 disabled:bg-opacity-80"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        Creating Account
                        <ImSpinner3 className="animate-spin ml-2" size={16} />
                      </>
                    ) : (
                      <>
                        Create Account
                        <MdOutlineKeyboardArrowRight
                          className="ml-2"
                          size={16}
                        />
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-2 lg:text-base text-sm text-gray-600 lg:text-start text-center">
                  Already have an account?
                  <Link
                    href="/login"
                    title=""
                    className="font-semibold text-black transition-all duration-200 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
