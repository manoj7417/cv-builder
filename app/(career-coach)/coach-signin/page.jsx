/** @format */

"use client";
import React, { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { ImSpinner3 } from "react-icons/im";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

//
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import core Swiper styles
import "swiper/css/pagination"; // Import Swiper pagination module styles
import { Autoplay, Pagination } from "swiper/modules"; // Import Pagination module
import { SetTokens } from "@/app/actions";
import { useCoachStore } from "../../store/coachStore";
import CoachSignIn from "@/app/components/CoachGoogleSignIn/CoachSignIn";
import Image from "next/image";

//
export default function CoachLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser } = useCoachStore();

  const email = useRef(null);
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [sendingMail, setIsSendingMail] = useState(false);

  const handleCoachLogin = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/loginCoach", data);
      if (response.status === 200) {
        toast.success("Login successful");
        const { accessToken, refreshToken } = response.data.data;
        await SetTokens({ accessToken, refreshToken });
        loginUser(response.data.data.userdata);
        const { isApproved } = response.data.data.userdata;
        if (isApproved) {
          return router.push("/coach-dashboard");
        }
        router.push("/coach-form");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleSendResetEmail = async () => {
    setIsSendingMail(true);
    try {
      const response = await axios.post("/api/forgotCoachPassword", {
        email: email.current.value,
      });

      if (response.status === 200) {
        toast.success("Reset password link sent to your email");
        setShowDialog(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setIsSendingMail(false);
    }
  };

  return (
    <>
      <Dialog open={showDialog}>
        <DialogContent
          className=" w-96"
          onClick={handleDialogClose}
          showCloseButton
        >
          <div>
            <h1>The reset password link will be send to the entered email</h1>
            <Input
              placeholder="Enter your email address"
              className="mt-4"
              ref={email}
            />
            <div className="w-full my-3 flex justify-end items-center">
              <Button
                className=" disabled:bg-opacity-85"
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
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 place-items-center w-full h-screen">
          <div className="w-full hidden md:flex lg:flex flex-col items-center bg-[#007AFF] z-0 h-full justify-center">
            <div className="w-[70%] mt-14">
              <div className="text-white text-center text-2xl font-semibold">
                Thank you for joining as a Coach and inspire the next generation
                of achievers!
              </div>
            </div>

            {/* Swiper Slider with Pagination */}
            <Swiper
              modules={[Pagination, Autoplay]} // Use Pagination module
              pagination={{ clickable: true }} // Enable pagination with clickable dots
              autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay settings
              spaceBetween={20} // Space between slides
              slidesPerView={1} // Show one slide at a time
              className="mb-10 w-[60%] rounded-md"
            >
              <SwiperSlide>
                <div className="p-4 rounded-md">
                  <img
                    className="mx-auto h-auto  rounded-md object-contain"
                    src="/coachSignin1.png"
                    alt="coach-register"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="p-4 rounded-md ">
                  <img
                    className="mx-auto h-auto  rounded-md object-contain"
                    src="/coachSignin2.png"
                    alt="coach-register"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="p-4 rounded-md ">
                  <img
                    className="mx-auto h-auto rounded-md object-contain"
                    src="/coachSignin3.png"
                    alt="coach-register"
                  />
                </div>
              </SwiperSlide>
              {/* Add more slides as needed */}
            </Swiper>
            {/* Custom Pagination Styles */}
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center max-w-[500px] mx-auto">
            <Link
              href={"/"}
              className="flex justify-center items-center my-5"
            >
              <Image
                priority
                src="/genies-career-hub-logo.png"
                width={100}
                height={100}
                alt="white_logo"
                className="w-28 h-auto object-contain"
              />
            </Link>
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h1 className="text-3xl font-bold leading-tight text-black sm:text-4xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl">
                Sign in
              </h1>
              <p className="mt-2 text-[13px] text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/coach-registration"
                  title=""
                  className="font-semibold text-black transition-all duration-200 hover:underline"
                >
                  Create a free account
                </Link>
              </p>
              <form onSubmit={handleSubmit(handleCoachLogin)} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <Label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email{" "}
                    </Label>
                    <div className="mt-2">
                      <Input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
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
                        htmlFor=""
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
                      <div className="top-0 right-0 absolute h-10 md:h-10 flex items-center justify-center pr-3">
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
                    </div>
                    {/* <div className="text-right mt-2">
                      <div
                        onClick={() => setShowDialog(true)}
                        className="text-sm font-semibold text-[#007AFF] hover:underline cursor-pointer"
                      >
                        {" "}
                        Forgot password?{" "}
                      </div>
                    </div> */}
                  </div>
                  <div className="terms_condition">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="field field-checkbox flex items-center">
                          <input
                            id="rememberMe"
                            type="checkbox"
                            name="terms"
                            className="form-checkbox lg:h-4 lg:w-4 h-3 w-3"
                            {...register("rememberMe", { required: false })}
                          />
                          <label
                            htmlFor="rememberMe"
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
                      </div>
                      <div>
                        <div
                          onClick={() => setShowDialog(true)}
                          className="text-sm font-semibold text-[#007AFF] hover:underline cursor-pointer"
                        >
                          {" "}
                          Forgot password?{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="terms_condition">
                    <div className="field field-checkbox flex items-center">
                      <input
                        id="terms"
                        type="checkbox"
                        name="terms"
                        className="form-checkbox lg:h-4 lg:w-4 h-3 w-3"
                        {...register("terms", { required: true })}
                      />
                      <label
                        htmlFor="terms"
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
                    {errors.terms && (
                      <div className="text-red-500 text-sm my-2">
                        You must agree to the terms and conditions
                      </div>
                    )}
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-[#007AFF] hover:bg-[#007AFF] px-3.5 py-2.5 font-semibold leading-7 text-white"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          Login
                          <ImSpinner3 className="animate-spin ml-2" size={16} />
                        </>
                      ) : (
                        <>
                          Login
                          <MdOutlineKeyboardArrowRight
                            className="ml-2"
                            size={16}
                          />
                        </>
                      )}
                    </Button>
                    <CoachSignIn type="Sign In" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
