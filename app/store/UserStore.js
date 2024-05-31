import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'
const myMiddlewares = (f) => devtools(persist(f, { name: 'auth' }))

export const useUserStore = create(
    myMiddlewares(
        (set) => ({
            userState: { isAuthenticated: false, userdata: null, resumes: [] },
            loginUser: (userdata) => set((state) => ({
                userState: { isAuthenticated: true, userdata: userdata, resumes: [] }
            })),
            logoutUser: () => set((state) => ({
                userState: { isAuthenticated: false, userdata: null, resumes: [] }
            })),
            createResume: (resume) => set((state) => ({
                userState: {
                    ...state.userState,
                    resumes: [...(state?.userState?.resumes || []), resume]
                }
            })),
            readResumes: () => set((state) => ({
                userState: { ...state?.userState }
            })),
            updateResume: (resumeId, updatedResume) => set((state) => ({
                userState: {
                    ...state.userState,
                    resumes: state?.userState?.resumes?.map((resume) =>
                        resume?.id === resumeId ? updatedResume : resume
                    )
                }
            })),
            deleteResume: (resumeId) => set((state) => ({
                userState: {
                    ...state.userState,
                    resumes: state?.userState?.resumes.filter((resume) => resume?._id !== resumeId)
                }
            })),
            setResumes: (resumes) => set((state) => ({
                userState: {
                    ...state?.userState,
                    resumes: resumes
                }
            })),
            getResumeById: (resumeId) => {
                const state = useUserStore.getState();
                return state?.userState?.resumes?.find((resume) => resume?._id === resumeId);
            },
            updateResumeContentById: (resumeId, newData) => set((state) => ({
                userState: {
                    ...state.userState,
                    resumes: state?.userState?.resumes?.map((resume) =>
                        resume?.id === resumeId ? { ...resume, data: newData } : resume
                    )
                }
            }))
        })
    )

)
