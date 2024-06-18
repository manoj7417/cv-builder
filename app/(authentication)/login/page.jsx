"use client";
import React, { useRef, useState, useContext, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { AuthContext } from "@/app/context/AuthContext";
import { SetTokens } from '../../actions';
import { useUserStore } from "@/app/store/UserStore";
import axios from "axios";
import Link from "next/link";

function LoginUser() {
  const router = useRouter();
  const { userlogin } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const loginUser = useUserStore((state) => state.loginUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const [loading, setIsLoading] = useState(false);

  const handleLogin = async (data) => {
    try {
      const response = await axios.post('/api/login', { data });
      if (response.status === 200) {
        toast.success(response.data.message);
        const { accessToken, refreshToken, userdata } = response.data.data;
        await SetTokens({ accessToken, refreshToken });
        loginUser(userdata);
        userlogin(userdata);
        router.push(redirect || "/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || 'Error logging in');
    }
  };

  return (
    <>
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
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-blue-900 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-700"
                    >
                      Get started
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
