'use client'

import { createContext, useContext, useState } from "react"

export const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}
let initialValues = {
    isAuthenticated: false,
    user: null
};



export function AuthProvider({ children }) {
    const [userState, setUserState] = useState(initialValues)

    const userlogin = () => {
        const authuserState = { isAuthenticated: true, user: null }
        setUserState(authuserState)
    }

    const userlogout = () => {
        setUserState({
            ...userState,
            isAuthenticated: false,
            user: null
        })
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