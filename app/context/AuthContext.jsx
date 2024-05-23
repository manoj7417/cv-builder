'use client'

import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()


const getInitialUserState = () => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem("userState")) || false;
    } else {
        return false;
    }
};


let initialValues = getInitialUserState()



export function AuthProvider({ children }) {
    const [userState, setUserState] = useState(initialValues)

    useEffect(() => {
        localStorage.setItem("userState", JSON.stringify(userState))
    }, [userState])

    const userlogin = (userdata) => {
        const authuserState = { isAuthenticated: true, userdata: userdata }
        setUserState(authuserState)
        localStorage.setItem("userState", JSON.stringify(authuserState))
    }

    const userlogout = () => {
        setUserState({
            ...userState,
            isAuthenticated: false,
            userdata: null
        })
        localStorage.removeItem("userState")
    }

    const value = {
        userState,
        userlogin,
        userlogout
    }

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    )
}