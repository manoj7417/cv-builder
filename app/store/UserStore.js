import { create } from 'zustand';

export const UserStore = create((set) => ({
    userState: { isAuthenticated: false, userdata: null },
    loginUser: (userdata) => set((state) => ({
        userState: { isAuthenticated: true, userdata: userdata }
    })),
    logoutUser: () => set((state) => ({
        userState: { isAuthenticated: false, userdata: null }
    }))
}))
