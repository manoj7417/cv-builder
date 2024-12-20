import { create } from "zustand";

export const useCoachAuthStore = create((set, get) => ({
    coachAuthState: { isAuthenticated: false, userdata: null },
    loginUser: (userdata) =>
        set(() => ({
            coachAuthState: { isAuthenticated: true, userdata: userdata },
        })),
    logoutUser: () =>
        set(() => ({
            coachAuthState: { isAuthenticated: false, userdata: null },
        })),
    isAuthenticated: () => get().coachAuthState.isAuthenticated,
    userdata: () => get().coachAuthState.userdata,
}));
