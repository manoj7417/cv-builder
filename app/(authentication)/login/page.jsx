"use client";
import React, {
  useRef,
  useState,
  useContext,
  Suspense,
  useEffect,
} from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { GetTokens, SetTokens } from "../../actions";
import { useUserStore } from "../../../app/store/UserStore";
import axios from "axios";
import Link from "next/link";
import { ImSpinner3 } from "react-icons/im";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { HiOutlineMailOpen } from "react-icons/hi";
import { Label } from "@/components/ui/label";
import { IoEye, IoEyeOff } from "react-icons/io5";
import SignInGoogle from "../../components/SignInGoogle/SignInGoogle";
import Script from "next/script";

function LoginUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const loginUser = useUserStore((state) => state.loginUser);
  const [showDialog, setShowDialog] = useState(false);
  const [showVerificationDilaog, setShowVerificationDilaog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setIsLoading] = useState(false);
  const [sendingMail, setIsSendingMail] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [showResendButton, setShowResendButton] = useState(false);
  const [isSendingVerificationEmail, setIsSendingVerificationEmail] =
    useState(false);
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
        if (userdata.role === "admin") {
          return router.push("/admin");
        }
        router.push(redirect || "/");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error logging in");
      if (
        error.response?.status === 403 &&
        error.response?.data?.error === "Email verification is required"
      ) {
        setShowVerificationDilaog(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendResetEmail = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter email address");
      return;
    }

    setIsSendingMail(true);
    try {
      const response = await axios.post("/api/forgotPassword", {
        email: email,
      });

      if (response.status === 200) {
        setEmail("");
        toast.success("Reset password link sent to your email");
      }
    } catch (error) {
      toast.error("Failed to send reset email");
    } finally {
      setIsSendingMail(false);
      setShowDialog(false);
    }
  };

  const handleCloseVerificationDilaog = async () => {
    setShowVerificationDilaog(false);
    setIsSendingVerificationEmail(false);
    setShowResendButton(false);
  };

  const handleResendVerificationEmail = async (data) => {
    setIsSendingVerificationEmail(true);
    try {
      const response = await axios.post("/api/resendVerificationEmail", {
        email: data.verifyemail,
      });
      if (response.status === 200) {
        toast.success("Verification email sent to your email");
        reset();
        setShowVerificationDilaog(false);
        setIsSendingVerificationEmail(false);
        setShowResendButton(false);
      }
    } catch (error) {
      toast.error("Error sending verification email");
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
    <>
      <Dialog open={showDialog}>
        <DialogContent
          className="w-[400px] rounded-lg"
          onClick={handleDialogClose}
          showCloseButton
        >
          <div>
            <DialogTitle>
              <h2 className="text-xl font-semibold">Reset Your Password</h2>
              <p className="text-sm text-gray-400 font-normal">
                Enter the email associated with your account
              </p>
            </DialogTitle>
            <form onSubmit={handleSendResetEmail}>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="mt-4"
                value={email}
                onChange={handleEmailChange}
              />
              <div className="w-full my-3 flex justify-end items-center">
                <Button
                  className="disabled:bg-opacity-85 w-full"
                  disabled={sendingMail || !email.trim()}
                  type="submit"
                >
                  {sendingMail ? <>Sending...</> : "Send Reset Link"}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showVerificationDilaog}>
        <DialogContent
          onClick={handleCloseVerificationDilaog}
          className="md:w-[400px] w-[300px]"
        >
          <div>
            <div className="flex justify-center items-center w-20 h-20 mx-auto bg-gray-100 rounded-full">
              <HiOutlineMailOpen className="text-blue-950 h-16 w-16" />
            </div>
            <DialogTitle>
              <h2 className="text-center text-2xl">
                You&apos;re almost there!
              </h2>
            </DialogTitle>
            {showResendButton ? (
              <div className=" py-5">
                <form onSubmit={handleSubmit(handleResendVerificationEmail)}>
                  <div className="py-5">
                    <Label>Email</Label>
                    <Input
                      {...register("verifyemail", {
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format",
                        },
                      })}
                      placeholder="Enter your register email address"
                      className="mt-1"
                    />
                    <div className="py-1">
                      <p className="text-xs text-red-500">
                        {errors?.verifyemail?.message}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isSendingVerificationEmail}
                  >
                    {isSendingVerificationEmail ? (
                      <>
                        Sending{" "}
                        <ImSpinner3 className="h-4 w-4 ml-2 animate-spin" />
                      </>
                    ) : (
                      "Resend"
                    )}
                  </Button>
                </form>
              </div>
            ) : (
              <>
                <p className="mt-5 text-md text-center text-gray-500">
                  Verify your email address in order to proceed to use all
                  services
                </p>
                <div className=" py-10">
                  <p className="my-2 text-sm text-gray-500">
                    Unable to find the verification link?
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => setShowResendButton(true)}
                  >
                    Get verification email
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <section>
        <div className="w-full h-full mt-20">
          <div className="flex lg:items-center items-start justify-center px-4  sm:px-6  lg:px-8">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md w-full sm:border-0 border-0 shadow-none shadow-blue-100 sm:shadow-none   sm:py-0 py-20 px-8 sm:px-0 rounded-2xl">
              {/* <Link
                href={"/"}
                className="flex justify-center items-center mb-[60px]"
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
              <h1 className="text-3xl font-bold leading-tight text-[#f76918] sm:text-4xl mt-5">
                Sign in
              </h1>
              <h2 className="mt-2 text-sm text-gray-600 text-start">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[#f76918] transition-all duration-200 hover:underline"
                >
                  Sign Up for Free!
                </Link>
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
                  </div>
                  <div>
                    <p
                      className="text-14px text-[#f76918] hover:underline cursor-pointer"
                      onClick={() => setShowDialog(true)}
                    >
                      Forgot password?
                    </p>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-[#f76918] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-[#f76918  ] disabled:bg-opacity-85"
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

                    <div className="google_button mt-5">
                      <SignInGoogle type="Sign in" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <div className="relative items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24 hidden sm:flex">
            <div className="absolute inset-0">
              <Image
                priority="true"
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
                      CV Builder!
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
          </div> */}
        </div>
      </section>

      <Script
        id="google-conversion-event"
        dangerouslySetInnerHTML={{
          __html: `
      gtag('event', 'conversion', {'send_to': 'AW-16573743263/4bYaCLnbyPgZEJ-B_d49'});
    `,
        }}
      />
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
