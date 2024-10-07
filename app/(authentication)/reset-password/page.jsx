'use client'
import React, { Suspense, useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { TbLoader } from "react-icons/tb"
import axios from "axios";

const ResetPasswordFunc = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || null;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmShowPassword(!showConfirmPassword);
    };

    const formSchema = yup.object().shape({
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password length should be at least 8 characters"),
        cpassword: yup
            .string()
            .required("Confirm Password is required")
            .min(8, "Password length should be at least 8 characters")
            .oneOf([yup.ref("password")], "Passwords do not match"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
    });

    const hadleResetPassword = async (data) => {
        if (!token) return router.push('/login')
        // if (!token) return router.push('/login')
        const obj = {
            newPassword: data?.password,
            token
        }
        setIsLoading(true)
        try {
            const response = await axios.post('/api/resetPassword', obj)
            if (response.status === 200) {
                toast.success('Password changed successfully')
                router.push('/login')
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        if (!token) return router.push('/login')
    }, [token, router])


    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-blue-900 sm:text-4xl">
                            Reset Password
                        </h2>
                        <form onSubmit={handleSubmit(hadleResetPassword)} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="text-base font-medium text-blue-900"
                                        >
                                            New Password
                                        </label>
                                    </div>
                                    <div className="mt-2 relative">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            {...register("password")}
                                        />
                                        <div
                                            className="absolute top-3 right-2 cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {!showPassword ? <FaRegEyeSlash className="text-blue-900" onClick={() => setShowPassword(false)} /> : < FaEye className="text-blue-900" onClick={() => setShowPassword(true)} />}
                                        </div>
                                        <div className="text-red-500 text-sm m-2">
                                            {errors?.password?.message}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="text-base font-medium text-blue-900"
                                        >
                                            Confirm Password
                                        </label>
                                    </div>
                                    <div className="mt-2 relative">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            {...register("cpassword")}
                                        />
                                        <div
                                            className="absolute top-3 right-2 cursor-pointer"
                                            onClick={toggleConfirmPasswordVisibility}
                                        >
                                            {!showConfirmPassword ? <FaRegEyeSlash className="text-blue-900" onClick={() => setConfirmShowPassword(false)} /> : < FaEye className="text-blue-900" onClick={() => setConfirmShowPassword(true)} />}
                                        </div>
                                        <div className="text-red-500 text-sm m-2">
                                            {errors?.cpassword?.message}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-blue-900 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-700">
                                        {
                                            isLoading ?
                                                <>
                                                    <TbLoader className="mr-1  animate-spin text-white" /> Reseting Password
                                                </>
                                                :
                                                <>
                                                    Reset Password
                                                    <MdKeyboardArrowRight className="ml-2" size={16} />
                                                </>
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="h-full w-full">
                    <Image priority
                        width={500}
                        height={500}
                        className="mx-auto h-full w-full rounded-md object-cover"
                        src="/contact-us.jpg" // Make sure this points to a valid image path
                        alt="reset-password"
                    />
                </div>
            </div>
        </section>
    );
}


export default function ResetPassword() {
    return (
        <Suspense>
            <ResetPasswordFunc />
        </Suspense>
    )
}
