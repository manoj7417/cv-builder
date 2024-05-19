"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { setCookie } from 'cookies-next';
// import { ArrowRight } from 'lucide-react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { login } from "@/app/pages/api/api";
import { toast } from 'react-toastify'
import { AuthContext } from "@/app/context/AuthContext";
function LoginUser() {
    const router = useRouter();
    const { userlogin, userlogout } = useContext(AuthContext)
    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect')

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const handleLogin = async (data) => {
        try {
            const response = await login(data)
            if (response.status === 200) {
                toast.success(response.data.message)
                const { accessToken, refreshToken , userdata } = response?.data?.data;
                setCookie('accessToken', accessToken, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
                setCookie('refreshToken', refreshToken, { expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) });
                userlogin(userdata)
                router.push(redirect || '/')
            }
        } catch (error) {
            toast.error(error.response.data.error)
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
                                    title=""
                                    className="font-semibold text-black transition-all duration-200 hover:underline"
                                >
                                    Sign Up for Free!
                                </Link>
                            </p>
                            <form className="mt-8" onSubmit={handleSubmit(handleLogin)}>
                                <div className="space-y-5">
                                    <div>
                                        <label
                                            htmlFor=""
                                            className="text-base font-medium text-gray-900"
                                        >
                                            {" "}
                                            Email address{" "}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="email"
                                                placeholder="Email"
                                                {...register("email", {
                                                    required: {
                                                        value: true,
                                                        message: "Email is required",
                                                    },
                                                    pattern: {
                                                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                                        <div className="flex items-center justify-between">
                                            <label
                                                htmlFor=""
                                                className="text-base font-medium text-gray-900"
                                            >
                                                Password
                                            </label>
                                            <div
                                                className="cursor-pointer text-sm font-semibold text-black hover:underline"
                                                onClick={() => setShowModal(true)}
                                            >
                                                Forgot password?
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="password"
                                                autoComplete
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
                                            className="inline-flex w-full items-center justify-center rounded-md bg-blue-900 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                        >
                                            Get started
                                            <MdOutlineKeyboardArrowRight className="ml-2" size={16} />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="h-full w-full">
                        <Image
                            width={1000}
                            height={1000}
                            className="mx-auto h-full w-full rounded-md object-cover"
                            src="/newlogo12.png"
                            alt="login"
                            priority

                        />
                    </div>
                </div>
            </section>
            <div>
                {/* <div className="h-full flex items-center justify-center">
          <button
            className="bg-blue-500 p-2 rounded text-white"
            onClick={() => setShowModal(true)}
          >
            Open
          </button>
        </div> */}
            </div>
        </>
    );
}

export default function Login() {
    return (
        <Suspense>
            <LoginUser />
        </Suspense>
    )
}

