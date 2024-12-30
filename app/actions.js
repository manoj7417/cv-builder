// 'use server'
// import { cookies } from 'next/headers'

// export async function SetTokens({ accessToken, refreshToken
// }) {
//     cookies().set({
//         name: 'accessToken',
//         value: accessToken,
//         httpOnly: true,
//         path: '/',
//         secure: true,
//         maxAge: 24 * 60 * 60 * 1000 * 30,
//         sameSite: "none"
//     })
//     cookies().set({
//         name: 'refreshToken',
//         value: refreshToken,
//         httpOnly: true,
//         secure: true,
//         path: '/',
//         maxAge: 10 * 24 * 60 * 60 * 1000 * 30,
//         sameSite: "none"
//     })
// }

// export async function RemoveTokens() {
//     cookies().delete('accessToken')
//     cookies().delete('refreshToken')
// }


// export async function GetTokens() {
//     const accessToken = cookies().get('accessToken')
//     const refreshToken = cookies().get('refreshToken')
//     return { accessToken, refreshToken }
// }




'use server';
import { cookies } from 'next/headers';

export async function SetTokens({ accessToken, refreshToken, isCoach = false }) {
    if (isCoach) {
        // Set coach tokens
        cookies().set({
            name: 'coachAccessToken',
            value: accessToken,
            httpOnly: true,
            path: '/',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 * 30,
            sameSite: "none",
        });
        cookies().set({
            name: 'coachRefreshToken',
            value: refreshToken,
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 10 * 24 * 60 * 60 * 1000 * 30,
            sameSite: "none",
        });
    } else {
        // Set user tokens
        cookies().set({
            name: 'accessToken',
            value: accessToken,
            httpOnly: true,
            path: '/',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 * 30,
            sameSite: "none",
        });
        cookies().set({
            name: 'refreshToken',
            value: refreshToken,
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 10 * 24 * 60 * 60 * 1000 * 30,
            sameSite: "none",
        });
    }
}

export async function RemoveTokens(isCoach = false) {
    if (isCoach) {
        // Remove coach tokens
        cookies().delete('coachAccessToken');
        cookies().delete('coachRefreshToken');
    } else {
        // Remove user tokens
        cookies().delete('accessToken');
        cookies().delete('refreshToken');
    }
}

export async function GetTokens(isCoach = false) {
    if (isCoach) {
        // Get coach tokens
        const coachAccessToken = cookies().get('coachAccessToken');
        const coachRefreshToken = cookies().get('coachRefreshToken');
        return { accessToken: coachAccessToken, refreshToken: coachRefreshToken };
    } else {
        // Get user tokens
        const accessToken = cookies().get('accessToken');
        const refreshToken = cookies().get('refreshToken');
        return { accessToken, refreshToken };
    }
}
