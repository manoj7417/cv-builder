import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'
const myMiddlewares = (f) => devtools(persist(f, { name: 'coach' }))

export const useCoachStore = create(
    myMiddlewares(
        (set) => ({
            userState: { isAuthenticated: false, userdata: null },
            formData: {
                steps: 0,
                profileImage: null,
                name: null,
                email: null,
                phone: null,
                dateofBirth: null,
                placeofBirth: null,
                address: null,
                country: null,
                city: null,
                zip: null,
                experience: null,
                bio: null,
                coachingDescription: null,
                skills: null,
                typeOfCoaching: null,
                bankName: null,
                ifscCode: null,
                bankAccountNumber: null,
                charges: null,
                cvUpload: null,
                docsUpload: null,
            },
            workingDates: [],
            loginUser: (userdata) => set((state) => ({
                userState: { isAuthenticated: true, userdata: userdata }
            })),
            logoutUser: () => set((state) => ({
                userState: { isAuthenticated: false, userdata: null }
            })),
            setFormData: (newFormData) => set((state) => ({
                formData: newFormData
            })),
            updateUserData: (newUserData) => set((state) => ({
                userState: {
                    ...state.userState,
                    userdata: newUserData
                }
            })),
            setWorkingDates: (dates) => set({ workingDates: dates }),
        })
    )

)
