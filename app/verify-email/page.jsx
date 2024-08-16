"use client"
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react'
import { ImSpinner3 } from 'react-icons/im'
import { toast } from 'react-toastify';
import { SetTokens } from '../actions';
import { useUserStore } from '../store/UserStore';

function VerifyEmailComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || null;
    const loginUser = useUserStore((state) => state.loginUser);

    const handleVerifyEmail = async (token) => {
        try {
            const response = await axios.post('/api/verfiyEmail', { token })
            if (response.status === 200) {
                toast.success('Email verified successfully');
                await SetTokens({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken });
                loginUser(response.data.userdata);
                setTimeout(() => {
                    return router.push('/')
                }, 2000)
            }
        } catch (error) {
            toast.error('Failed to verify email')
            return router.push('/login')
        }
    }

    useEffect(() => {
        if (!token) {
            return router.push('/login')
        } else {
            handleVerifyEmail(token)
        }

    }, [token])
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <h1 className='text-3xl md:text-5xl mb-5'>Verifying Email</h1>
            <ImSpinner3 className='h-10 w-10 animate-spin' />
        </div>
    )
}

export default function VerifyEmail() {
    return (
        <Suspense   >
            <VerifyEmailComponent />
        </Suspense>
    )
}