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
import axios from "axios";
import SignInGoogle from "../../components/SignInGoogle/SignInGoogle";
import { Button } from "@/components/ui/button";
import { GetTokens } from "@/app/actions";

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
  const [strength, setStrength] = useState("");
  const [validation, setValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    numbercase: false,
    specialChar: false,
  });
  const [OauthLoading, setOauthLoading] = useState(false);

  const password = watch("password", "");
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const hasUpperCase = (str) => /[A-Z]/.test(str);
  const hasLowerCase = (str) => /[a-z]/.test(str);
  const hasNumber = (str) => /\d/.test(str);

  useEffect(() => {
    const newValidation = {
      length: password.length >= 8,
      uppercase: hasUpperCase(password),
      lowercase: hasLowerCase(password),
      number: hasNumber(password),
      specialChar: format.test(password),
    };

    setValidation(newValidation);

    const validCount = Object.values(newValidation).filter(Boolean).length;
    if (validCount === 5) {
      setStrength("Excellent");
    } else if (validCount === 4) {
      setStrength("Strong");
    } else if (validCount === 3) {
      setStrength("Medium");
    } else if (validCount === 2) {
      setStrength("Weak");
    } else {
      setStrength("");
    }
  }, [password]);

  const handleRegister = async (data) => {
    if (!data.terms) {
      toast.error("You must agree to the terms and conditions", {
        autoClose: 5000,
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("/api/userRegisteration", data);
      if (response.status === 201) {
        toast.success("Registration successful");
        toast.info("Verification link sent to your email address", {
          autoClose: 5000,
        });
        router.push("/login");
      }
    } catch (error) {
      toast.error(error?.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpWithGoogle = async () => {
    setOauthLoading(true);
    try {
      const response = await axios.get("/api/googleRegisteration");
      if (response.status === 201) {
        toast.success("Registration successful");
        toast.info("Verification link sent to your email address", {
          autoClose: 5000,
        });
        router.push("/login");
      }
    } catch (error) {
      toast.error(error?.response.data.error);
    } finally {
      setOauthLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { accessToken } = await GetTokens();
      if (accessToken) {
        router.push("/");
      }
    };
    checkAuth();
  }, []);

  return (
    <section>
      <div className="w-full h-full mt-20">
        <div className="flex lg:items-center items-start justify-center px-4  sm:px-6  lg:px-8 ">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-lg w-full  border-0 sm:border-0 shadow-blue-100 shadow-none  sm:shadow-none  py-5   sm:py-0 px-2 sm:px-10  rounded-2xl">
            {/* <Link
              href={"/"}
              className="flex justify-center items-center mb-4 sm:mb-[60px]"
            >
              <Image
                priority="true"
                src="/genies-career-hub-logo.png"
                width={100}
                height={100}
                alt="white_logo"
                className="w-28 h-auto object-contain"
              />
            </Link> */}
            <h1 className="text-2xl font-bold leading-tight text-[#f76918] sm:text-4xl">
              Sign up
            </h1>
            <form className="mt-5" onSubmit={handleSubmit(handleRegister)}>
              <div className="space-y-2 sm:space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="lg:text-base text-sm font-medium text-gray-900 "
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
                          message:
                            "Password must be at least 8 characters long",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        },
                      })}
                    />

                    <div className="text-red-500 text-sm my-2">
                      {errors?.password?.message}
                    </div>
                    <div className="top-0 right-0 absolute h-12 flex items-center justify-center pr-3">
                      {showPassword ? (
                        <IoEye
                          className="cursor-pointer h-4 w-4"
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <IoEyeOff
                          className="cursor-pointer h-4 w-4"
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </div>
                    {/* Validation List */}
                    {watch("password") && (
                      <div className="mt-2">
                        <ul className="grid lg:grid-cols-2 grid-cols-1 list-disc pl-0 space-y-2 text-gray-700 whitespace-nowrap">
                          <li
                            className={`flex items-center space-x-2 text-sm ${
                              validation.length
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            <span
                              className={`w-3 h-3 flex items-center justify-center rounded-full ${
                                validation.length
                                  ? "text-green-500"
                                  : "border border-gray-400"
                              }`}
                            >
                              {validation.length ? "✔" : ""}
                            </span>
                            <span className="text-xs sm:text-sm">
                              Min 8 letters
                            </span>
                          </li>
                          {/* Uppercase validation */}
                          <li
                            className={`flex items-center space-x-2 text-sm ${
                              validation.uppercase
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            <span
                              className={`w-3 h-3 flex items-center justify-center rounded-full ${
                                validation.uppercase
                                  ? "text-green-500"
                                  : "border border-gray-400"
                              }`}
                            >
                              {validation.uppercase ? "✔" : ""}
                            </span>
                            <span className="text-xs sm:text-sm">
                              1 uppercase character
                            </span>
                          </li>

                          {/* Lowercase validation */}
                          <li
                            className={`flex items-center text-sm space-x-2 ${
                              validation.lowercase
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            <span
                              className={`w-3 h-3 flex items-center justify-center rounded-full ${
                                validation.lowercase
                                  ? "text-green-500"
                                  : "border border-gray-400"
                              }`}
                            >
                              {validation.lowercase ? "✔" : ""}
                            </span>
                            <span className="text-xs sm:text-sm">
                              1 lowercase character
                            </span>
                          </li>

                          {/* Number validation */}
                          <li
                            className={`flex items-center space-x-2 text-sm ${
                              validation.number
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            <span
                              className={`w-3 h-3 flex items-center justify-center rounded-full ${
                                validation.number
                                  ? "text-green-500"
                                  : "border border-gray-400"
                              }`}
                            >
                              {validation.number ? "✔" : ""}
                            </span>
                            <span className="text-xs sm:text-sm">1 number</span>
                          </li>

                          {/* Special character validation */}
                          <li
                            className={`flex items-center space-x-2 text-sm ${
                              validation.specialChar
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            <span
                              className={`w-3 h-3 flex items-center justify-center rounded-full ${
                                validation.specialChar
                                  ? "text-green-500"
                                  : "border border-gray-400"
                              }`}
                            >
                              {validation.specialChar ? "✔" : ""}
                            </span>
                            <span className="text-xs sm:text-sm">
                              1 special character
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="field field-checkbox flex items-center">
                  <input
                    id="checkbox"
                    type="checkbox"
                    name="terms"
                    className="form-checkbox lg:h-4 lg:w-4 h-3 w-3 text-[#f76918]"
                    {...register("terms", { required: true })}
                  />
                  <label
                    htmlFor="checkbox"
                    className="ml-2 text-xs sm:text-sm  text-[12px] text-gray-700"
                  >
                    <p>
                      By signing up you are agreeing to our
                      <Link
                        href="/terms-condition"
                        className="text-[#f76918] underline underline-offset-4 ml-1 font-semibold"
                      >
                        {" "}
                        Terms and Conditions
                      </Link>
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
                    className="inline-flex w-full items-center justify-center rounded-md bg-[#f76918] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-[#f76918] disabled:bg-opacity-80"
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

                <div className="google_button mt-5">
                  <SignInGoogle type="SignUp" />
                </div>

                <p className="mt-2 lg:text-base text-sm text-gray-600 text-center">
                  Already have an account?
                  <Link
                    href="/login"
                    title=""
                    className="font-semibold text-[#f76918] transition-all duration-200 hover:underline"
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
