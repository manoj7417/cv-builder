import { create } from 'zustand';
import { useStoreWithEqualityFn } from "zustand/traditional";
import _set from "lodash.set";
import { resumeSchema } from '@/lib/schema/resume/resume'


export const useResumeStore = create((set) => ({
    resume: resumeSchema,
    setResumeData: (path, value) => set((state) => {
        const newResumeData = { ...state.resume.data };
        _set(newResumeData, path, value);
        return { resume: { ...state.resume, data: newResumeData } };
    }),
    replaceResumeData: (newData) => set({ resume: { ...resumeSchema, data: newData } })
}))

export const useTemporalResumeStore = (selector, equality) => {
    return useStoreWithEqualityFn(useResumeStore.temporal, selector, equality);
};
