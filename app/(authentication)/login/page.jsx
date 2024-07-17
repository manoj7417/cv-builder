"use client";
import React, { useRef, useState, useContext, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { SetTokens } from '../../actions';
import { useUserStore } from "@/app/store/UserStore";
import axios from "axios";
import Link from "next/link";
import { ImSpinner3 } from "react-icons/im";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LoginUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const loginUser = useUserStore((state) => state.loginUser);
  const [showDialog, setShowDialog] = useState(false);
  const email = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setIsLoading] = useState(false);
  const [sendingMail, setIsSendingMail] = useState(false)

  const handleDialogClose = () => {
    setShowDialog(false);
  }



  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/login', { data });
      if (response.status === 200) {
        toast.success(response.data.message);
        const { accessToken, refreshToken, userdata } = response.data.data;
        await SetTokens({ accessToken, refreshToken });
        loginUser(userdata);
        router.push(redirect || "/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || 'Error logging in');
    } finally {
      setIsLoading(false);
      
    }
  };

  const handleSendResetEmail = async () => {
    const userEmail = email.current.value
    setIsSendingMail(true);
    try {
      const response = await axios.post('/api/resetpassword', { email: userEmail });
      if (response.status === 200) {
        email.current.value = null
        toast.success('Reset password link sent to your email');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error sending reset password email');
    } finally {
      setIsSendingMail(false);
      setShowDialog(false)
    }
  }

  return (
    <>
      <Dialog open={showDialog} >
        <DialogContent className=" w-96" onClick={handleDialogClose} showCloseButton >
          <div>
            <h1>Reset Password</h1>
            <Input placeholder="Enter your email address" className="mt-4" ref={email} />
            <div className="w-full my-3 flex justify-end items-center">
              <Button className=" disabled:bg-opacity-85" disabled={sendingMail} onClick={handleSendResetEmail}>{sendingMail ?
                <>
                  Sending<ImSpinner3 className="animate-spin ml-2" size={16} />
                </>
                : "Send"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-blue-900 sm:text-4xl">
                Sign in
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-black transition-all duration-200 hover:underline"
                >
                  Sign Up for Free!
                </Link>
              </p>
              <form className="mt-8" onSubmit={handleSubmit(handleLogin)}>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email Address"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email is required",
                          },
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email is Invalid",
                          },
                        })}
                      />
                      <div className="text-red-500 text-sm">
                        {errors?.email?.message}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        autoComplete='true'
                        placeholder="Password"
                        {...register("password", {
                          required: {
                            value: true,
                            message: "Password is  required",
                          },
                          minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters",
                          },
                        })}
                      />
                      <div className="text-red-500 text-sm">
                        {errors?.password?.message}
                      </div>
                    </div>
                  </div>
                  <div >
                    <p className="text-14px text-blue-950 hover:underline cursor-pointer" onClick={() => setShowDialog(true)}>Forgot password?</p>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-blue-900 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-700 disabled:bg-opacity-85"
                      disabled={loading}
                    >
                      {
                        loading ?
                          <>
                            Getting Started
                            <ImSpinner3 className="animate-spin ml-2" size={16} />
                          </>
                          :
                          <>
                            Get Started
                            <MdOutlineKeyboardArrowRight className="ml-2" size={16} />
                          </>
                      }
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
            <div className="absolute inset-0">
              <Image
                width={500}
                height={500}
                className="h-full w-full rounded-md object-cover object-center"
                src="/newlogo12.png"
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
                    <span className="bg-gradient-to-r from-blue-600 via-green-200 to-indigo-400 inline-block text-transparent bg-clip-text">Genies Career Hub!</span>
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
        </div>
      </section>
    </>
  );
}

export default function Login() {
  return (
    <Suspense>
      <LoginUser />
    </Suspense>
  );
}
