"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ImSpinner3 } from "react-icons/im";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import core Swiper styles
import "swiper/css/pagination"; // Import Swiper pagination module styles
import { Autoplay, Pagination } from "swiper/modules"; // Import Pagination module

//

export default function CoachRegistration() {
  const formSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().required("Email is required"),
    phone: yup.string().required("Phone is required"),
    terms: yup
      .boolean()
      .oneOf([true], "Please accept the terms and conditions")
      .required("Please accept the terms and conditions"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters"),
    cpassword: yup
      .string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  const handleCoachDetails = async (data) => {
    setIsLoading(true);
    const { firstName, lastName, email, phone, password } = data;
    const obj = {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      password,
    };
    try {
      const response = await axios.post("/api/registerCoach", obj);
      if (response.status === 200) {
        toast.success("Registration successful");
        // toast.info("Verification link sent to your email address", {
        //   autoClose: 5000,
        // });
        router.push("/coach-signin");
      }
    } catch (error) {
      console.log("error::", error);
      toast.error(error.response?.data?.error || "Error in register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className=" place-items-center h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 w-full h-full">
        <div className="h-full w-full hidden md:flex lg:flex flex-col items-center bg-[#007AFF] z-0">
          <div className="w-[70%] mt-14">
            <h2 className="text-white text-center text-2xl font-semibold">
              Join as a Coach and inspire the next generation of achievers!
            </h2>
          </div>

          {/* Swiper Slider with Pagination */}
          <Swiper
            modules={[Pagination, Autoplay]} // Use Pagination module
            pagination={{ clickable: true }} // Enable pagination with clickable dots
            autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay settings
            spaceBetween={20} // Space between slides
            slidesPerView={1} // Show one slide at a time
            className="mt-4 w-[60%] rounded-md"
          >
            <SwiperSlide>
              <div className="p-4 rounded-md shadow">
                <img
                  className="mx-auto h-auto  rounded-md object-contain"
                  src="/coach-register.png"
                  alt="coach-register"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-4 rounded-md shadow">
                <img
                  className="mx-auto h-auto  rounded-md object-contain"
                  src="/coach-register.png"
                  alt="coach-register"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-4 rounded-md shadow">
                <img
                  className="mx-auto h-auto rounded-md object-contain"
                  src="/coach-register.png"
                  alt="coach-register"
                />
              </div>
            </SwiperSlide>
            {/* Add more slides as needed */}
          </Swiper>
          {/* Custom Pagination Styles */}
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-xl">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl">
              Create account
            </h2>
            <p className="mt-2 text-[13px] text-gray-600">
              For business, band or celebrity.
            </p>
            <form onSubmit={handleSubmit(handleCoachDetails)} className="mt-8">
              <div className="space-y-5">
                <div className="flex gap-5">
                  <div className="lg:w-1/2 w-full">
                    <div>
                      <Label htmlFor="name" className="text-sm text-gray-900">
                        First Name
                      </Label>
                      <div className="mt-2">
                        <Input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none"
                          type="text"
                          placeholder="First Name"
                          {...register("firstName")}
                        />
                        {errors?.firstName && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors?.firstName?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2 w-full">
                    <div>
                      <Label htmlFor="name" className="text-sm text-gray-900">
                        {" "}
                        Last Name{" "}
                      </Label>
                      <div className="mt-2">
                        <Input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none"
                          type="text"
                          placeholder="Last Name"
                          {...register("lastName")}
                        />
                        {errors?.lastName && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors?.lastName?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="lg:w-1/2 w-full">
                    <div>
                      <Label htmlFor="email" className="text-sm text-gray-900">
                        {" "}
                        Email address{" "}
                      </Label>
                      <div className="mt-2">
                        <Input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="email"
                          placeholder="Email"
                          id="email"
                          {...register("email")}
                        />
                        {errors?.email && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors?.email?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2 w-full">
                    <div>
                      <div className="flex items-center justify-between mt-1">
                        <Label
                          htmlFor="password"
                          className="text-sm text-gray-900"
                        >
                          Phone Number
                        </Label>
                      </div>
                      <div>
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
                              inputStyle={{ height: "40px", width: "100%"}}
                              country={"us"}
                              value={field.value} // Ensure value is set correctly
                              onChange={(value, countryData) => {
                                // Update value with full phone number including country code
                                field.onChange(value, countryData);
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
                  </div>
                </div>
                {/*START-PASSWORD AND CONFIRM PASSWORD  */}
                <div className="flex gap-5">
                  <div className="lg:w-1/2 w-full">
                    <div>
                      <Label
                        htmlFor="password"
                        className="text-sm text-gray-900"
                      >
                        {" "}
                        Password{" "}
                      </Label>
                      <div className="mt-2">
                        <Input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          id="password"
                          {...register("password")}
                        />
                        {errors?.password && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors?.password?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2 w-full">
                    <div>
                      <Label
                        htmlFor="password"
                        className="text-sm text-gray-900"
                      >
                        {" "}
                        Confirm Password{" "}
                      </Label>
                      <div className="mt-2">
                        <Input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          id="password"
                          {...register("cpassword")}
                        />
                        {errors?.cpassword && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors?.cpassword?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/*END PASSWORD AND CONFIRM PASSWORD */}
                {/* <div className="remember">
                  <div className="field field-checkbox flex items-center">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      className="form-checkbox lg:h-4 lg:w-4 h-3 w-3 text-blue-600"
                      {...register("rememberMe", { required: true })}
                    />
                    <label
                      htmlFor="checkbox"
                      className="ml-2 text-xs sm:text-sm  text-[12px] text-gray-700"
                    >
                      <p>Remember me</p>
                    </label>
                  </div>
                  {errors.rememberMe && (
                    <div className="text-red-500 text-sm my-2">
                      You must remember me
                    </div>
                  )}
                </div> */}
                <div className="terms_condition">
                  <div className="field field-checkbox flex items-center">
                    <input
                      id="termsCondition"
                      type="checkbox"
                      className="form-checkbox lg:h-4 lg:w-4 h-3 w-3 text-blue-600"
                      {...register("terms", { required: true })}
                    />
                    <label
                      htmlFor="checkbox"
                      className="ml-2 text-xs sm:text-sm  text-[12px] text-gray-700"
                    >
                      <p>
                        I agree to all the
                        <Link
                          href="/terms-condition"
                          target="_blank"
                          className="text-[#007AFF] underline underline-offset-4 ml-1 font-semibold"
                        >
                          {" "}
                          Terms
                        </Link>
                        <span className="pl-1">and</span>
                        <Link
                          href="/privacy-policy"
                          target="_blank"
                          className="text-[#007AFF] underline underline-offset-4 ml-1 font-semibold"
                        >
                          {" "}
                          Privacy policy
                        </Link>
                      </p>
                    </label>
                  </div>
                  {errors?.terms && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors?.terms?.message}
                    </p>
                  )}
                </div>

                <div>
                  <Button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-[#007AFF] hover:[#007AFF] px-3.5 py-2.5 font-semibold leading-7 text-white"
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
                  </Button>
                  <p className="mt-10 text-sm text-gray-600 text-center">
                    Already have an account?
                    <Link
                      href="/coach-signin"
                      title=""
                      className="font-medium text-blue-500 transition-all duration-200 hover:underline"
                    >
                      Log In
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
