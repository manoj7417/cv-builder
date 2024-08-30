"use client";
import React, { useRef, useState, useContext, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { SetTokens } from "../../actions";
import { useUserStore } from "../../../app/store/UserStore";
import axios from "axios";
import Link from "next/link";
import { ImSpinner3 } from "react-icons/im";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { HiOutlineMailOpen } from "react-icons/hi";
import { Label } from "@/components/ui/label";
import { IoEye, IoEyeOff } from "react-icons/io5";

function LoginUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const loginUser = useUserStore((state) => state.loginUser);
  const [showDialog, setShowDialog] = useState(false);
  const email = useRef(null);
  const [showVerificationDilaog, setShowVerificationDilaog] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [loading, setIsLoading] = useState(false);
  const [sendingMail, setIsSendingMail] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false)
  const [isSendingVerificationEmail, setIsSendingVerificationEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/login", { data });
      if (response.status === 200) {
        toast.success(response.data.message);
        const { accessToken, refreshToken, userdata } = response.data.data;
        await SetTokens({ accessToken, refreshToken });
        loginUser(userdata);
        router.push(redirect || "/");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error logging in");
      if (error.response?.status === 403 && error.response?.data?.error === 'Email verification is required') {
        setShowVerificationDilaog(true)
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendResetEmail = async () => {
    const userEmail = email.current.value;
    setIsSendingMail(true);
    try {
      const response = await axios.post("/api/resetpassword", {
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

  const handleCloseVerificationDilaog = async () => {
    setShowVerificationDilaog(false);
    setIsSendingVerificationEmail(false)
    setShowResendButton(false)
  }

  const handleResendVerificationEmail = async (data) => {
    setIsSendingVerificationEmail(true)
    try {
      const response = await axios.post("/api/resendVerificationEmail", { email: data.verifyemail });
      if (response.status === 200) {
        toast.success("Verification email sent to your email");
        reset()
        setShowVerificationDilaog(false)
        setIsSendingVerificationEmail(false)
        setShowResendButton(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Error sending verification email")
    }
  }

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
      <Dialog open={showVerificationDilaog}>
        <DialogContent onClick={handleCloseVerificationDilaog} className="md:w-[400px] w-[300px]">
          <div>
            <div className="flex justify-center items-center w-20 h-20 mx-auto bg-gray-100 rounded-full">
              <HiOutlineMailOpen className="text-blue-950 h-16 w-16" />
            </div>
            <h1 className="text-center text-2xl">
              You&apos;re almost there!
            </h1>

            {
              showResendButton ?
                <div className=" py-5">
                  <form onSubmit={handleSubmit(handleResendVerificationEmail)}>
                    <div className="py-5">
                      <Label>Email</Label>
                      <Input {...register("verifyemail", {
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format",
                        },
                      })} placeholder="Enter your register email address" className="mt-1" />
                      <div className="py-1">
                        <p className="text-xs text-red-500">{errors?.verifyemail?.message}</p>
                      </div>
                    </div>
                    <Button className="w-full" type="submit" disabled={isSendingVerificationEmail}>
                      {
                        isSendingVerificationEmail ? <>
                          Sending <ImSpinner3 className="h-4 w-4 ml-2 animate-spin" />
                        </> :
                          "Resend"
                      }
                    </Button>
                  </form>
                </div>
                :
                <>
                  <p className='mt-5 text-md text-center text-gray-500'>Verify your email address in order to proceed to use all services</p>
                  <div className=" py-10">
                    <p className="my-2 text-sm text-gray-500">Unable to find the verification link?</p>
                    <Button className="w-full" onClick={() => setShowResendButton(true)}>Get verification email</Button>
                  </div>
                </>
            }
          </div>
        </DialogContent>
      </Dialog>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
          <div className="flex lg:items-center items-start justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md w-full sm:border-0 border-0 shadow-none shadow-blue-100 sm:shadow-none   sm:py-0 py-20 px-8 sm:px-0 rounded-2xl">
            <Link href={"/"} className="flex justify-center items-center mb-[60px]">
              <Image priority
                src="/genies-career-hub-logo.png"
                width={100}
                height={100}
                alt="white_logo"
                className="w-28 h-auto object-contain"
              />
            </Link>
              <h2 className="text-3xl font-bold leading-tight text-blue-900 sm:text-4xl mt-5">
                Sign in
              </h2>
              <form className="mt-5" onSubmit={handleSubmit(handleLogin)}>
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor=""
                      className="lg:text-base text-sm font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <Input
                        className="flex h-10 md:h-12 w-full "
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
                    <label
                      htmlFor=""
                      className="lg:text-base text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2 relative">
                      <Input
                        className="flex h-10 md:h-12 w-full "
                        type={showPassword ? "text" : "password"}
                        autoComplete="true"
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
                      <div className="top-0 right-0 absolute h-10 md:h-12 flex items-center justify-center pr-3">
                        {
                          showPassword ? <IoEye className="cursor-pointer h-4 w-4" onClick={() => setShowPassword(false)} /> : <IoEyeOff className="cursor-pointer h-4 w-4" onClick={() => setShowPassword(true)} />
                        }
                      </div>
                    </div>
                  </div>
                  <div>
                    <p
                      className="text-14px text-blue-950 hover:underline cursor-pointer"
                      onClick={() => setShowDialog(true)}
                    >
                      Forgot password?
                    </p>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-blue-900 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-700 disabled:bg-opacity-85"
                      disabled={loading}
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
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 lg:text-start text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-black transition-all duration-200 hover:underline"
                    >
                      Sign Up for Free!
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="relative items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24 hidden sm:flex">
            <div className="absolute inset-0">
              <Image priority
                width={500}
                height={500}
                className="h-full w-full rounded-md object-cover object-center"
                src="/newlogo12.png"
                alt="register"
                
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
