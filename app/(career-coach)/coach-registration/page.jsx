"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";

export default function CoachRegistration() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState({
    length: false,
    upperAndLowercase: false,
    numbercase: false,
    specialChar: false,
  });

  const password = watch("password", "");
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const hasUpperAndLowerCase = (str) => /[A-Z]/.test(str) && /[a-z]/.test(str);
  const hasNumber = (str) => /\d/.test(str);

  useEffect(() => {
    const newValidation = {
      length: password.length >= 8,
      upperAndLowercase: hasUpperAndLowerCase(password),
      number: hasNumber(password),
      specialChar: format.test(password),
    };
    setValidation(newValidation);
  }, [password]);

  const handleCoachDetails = async(data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/registerCoach", { data });
      if (response.status === 200) {
        toast.success("Registration successful");
        toast.info("Verification link sent to your email address", { autoClose: 5000 });
        router.push("/coach-signin");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error logging in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 my-20">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Coach Sign Up
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?
              <Link
                href="/coach-signin"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            <form onSubmit={handleSubmit(handleCoachDetails)} className="mt-8">
              <div className="space-y-5">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Full Name{" "}
                  </Label>
                  <div className="mt-2">
                    <Input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      id="name"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                      })}
                    />
                    {errors?.name && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors?.name?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </Label>
                  <div className="mt-2">
                    <Input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                      })}
                    />
                    {errors?.email && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors?.email?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </Label>
                  </div>
                  <div className="mt-2 relative">
                    <Input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      id="password"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                      })}
                    />
                    {errors?.password && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors?.password?.message}
                      </p>
                    )}
                    <div className="top-0 right-0 absolute h-10 flex items-center justify-center pr-3">
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
                    <div className="mt-2">
                      <ul className="grid lg:grid-cols-2 grid-cols-1 list-disc pl-0 space-y-2 text-gray-700 whitespace-nowrap">
                        <li
                          className={`flex items-center space-x-2 text-sm ${
                            validation.length
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {validation.length ? (
                            <span className="w-3 h-3 flex items-center justify-center">
                              {validation.length && "✔"}
                            </span>
                          ) : (
                            <span
                              className={`w-3 h-3 flex items-center justify-center rounded-full border  border-gray-400`}
                            ></span>
                          )}
                          <span className="text-xs sm:text-sm">
                          Minimum 7 characters long
                          </span>
                        </li>
                        <li
                          className={`flex items-center space-x-2 text-sm ${
                            validation.upperAndLowercase
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {validation.upperAndLowercase ? (
                            <span className="w-3 h-3 flex items-center justify-center">
                              {validation.upperAndLowercase && "✔"}
                            </span>
                          ) : (
                            <span
                              className={`w-3 h-3 flex items-center justify-center rounded-full border  border-gray-400`}
                            ></span>
                          )}
                          <span className="text-xs sm:text-sm">
                             Uppercase & lowercase letters
                          </span>
                        </li>
                        <li
                          className={`flex items-center space-x-2 text-sm ${
                            validation.number
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {validation.number ? (
                            <span className="w-3 h-3 flex items-center justify-center">
                              {validation.number && "✔"}
                            </span>
                          ) : (
                            <span
                              className={`w-3 h-3 flex items-center justify-center rounded-full border  border-gray-400`}
                            ></span>
                          )}
                          <span className="text-xs sm:text-sm">At least 1 number</span>
                        </li>
                        <li
                          className={`flex items-center space-x-2 text-sm ${
                            validation.specialChar
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {validation.specialChar ? (
                            <span className="w-3 h-3 flex items-center justify-center">
                              {validation.specialChar && "✔"}
                            </span>
                          ) : (
                            <span
                              className={`w-3 h-3 flex items-center justify-center rounded-full border  border-gray-400`}
                            ></span>
                          )}
                          <span className="text-xs sm:text-sm">
                            At least 1 special character
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Phone Number
                    </Label>
                  </div>
                  <div className="mt-2">
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Phone number is required",
                        validate: (value) =>
                          value.length >= 10 ||
                          "Phone number must be at least 10 digits",
                      }}
                      render={({ field }) => (
                        <PhoneInput
                          {...field}
                          inputStyle={{ height: "40px", width: "100%" }}
                          country={"us"}
                          value={field.value} // Ensure value is set correctly
                          onChange={(value, countryData) => {
                            // Update value with full phone number including country code
                            field.onChange(value,countryData);
                          }}
                        />
                      )}
                    />
                    {/* Display validation errors */}
                    {errors.phone && (
                      <p className="text-red-500 mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-blue-950 hover:bg-blue-950 px-3.5 py-2.5 font-semibold leading-7 text-white"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
