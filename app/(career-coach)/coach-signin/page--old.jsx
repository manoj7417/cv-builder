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
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CoachRegistration() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

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
        // toast.info("Verification link sent to your email address", { autoClose: 5000 });
        router.push("/coach-dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Error logging in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleSendResetEmail = async () => {
    console.log(hi);
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
            <h1>Reset Password</h1>
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
      <section class=" max-w-7xl mx-auto mt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-full w-full lg:block md:block hidden bg-[#007AFF]">
            <div className="pt-20">
              <h2 className="text-white text-center text-3xl">
                Join as a Coach and inspire the next generation of achievers!
              </h2>
            </div>
            <img
              className="mx-auto h-auto w-[400px] rounded-md object-contain"
              src="/coach-register.png"
              alt="coach-register"
            />
          </div>
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Coach Sign in
              </h2>
              <p className="mt-2 text-sm text-gray-600">
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
                      Email address{" "}
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
                    <div className="text-right mt-2">
                      <div
                        onClick={() => setShowDialog(true)}
                        className="text-sm font-semibold text-black hover:underline cursor-pointer"
                      >
                        {" "}
                        Forgot password?{" "}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-[#007AFF] hover:bg-[#007AFF] px-3.5 py-2.5 font-semibold leading-7 text-white"
                    >
                      {loading ? (
                        <>
                          Getting Started
                          <ImSpinner3 className="animate-spin ml-2" size={16} />
                        </>
                      ) : (
                        <>
                          Get Started
                          <MdOutlineKeyboardArrowRight
                            className="ml-2"
                            size={16}
                          />
                        </>
                      )}
                    </Button>
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
