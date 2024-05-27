import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'
const myMiddlewares = (f) => devtools(persist(f, { name: 'auth' }))

export const useUserStore = create(
    myMiddlewares(
        (set) => ({
            userState: { isAuthenticated: false, userdata: null },
            loginUser: (userdata) => set((state) => ({
                userState: { isAuthenticated: true, userdata: userdata }
            })),
            logoutUser: () => set((state) => ({
                userState: { isAuthenticated: false, userdata: null }
            }))
        })
    )

)
