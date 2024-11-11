'use server'
import { cookies } from 'next/headers'

export async function SetTokens({ accessToken, refreshToken
}) {
    cookies().set({
        name: 'accessToken',
        value: accessToken,
        httpOnly: true,
        path: '/',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 * 30,
        sameSite: "none"
    })
    cookies().set({
        name: 'refreshToken',
        value: refreshToken,
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 10 * 24 * 60 * 60 * 1000 * 30,
        sameSite: "none"
    })
}

export async function RemoveTokens() {
    cookies().delete('accessToken')
    cookies().delete('refreshToken')
}


export async function GetTokens() {
    const accessToken = cookies().get('accessToken')
    const refreshToken = cookies().get('refreshToken')
    return { accessToken, refreshToken }
}