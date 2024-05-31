import { create } from 'zustand';
import { useStoreWithEqualityFn } from "zustand/traditional";
import _set from "lodash.set";
import { resumeSchema } from '@/lib/schema/resume/resume'
import { debouncedUpdateResume } from '../services/resume/update';
import { devtools } from 'zustand/middleware';


export const useResumeStore = create(devtools((set) => ({
    resume: resumeSchema,
    isUploading: false,
    setIsUploading: (isUploading) => set({ isUploading }),
    setResumeData: (path, value) => set((state) => {
        const newResumeData = { ...state.resume.data };
        state.resume.data = _set(newResumeData, path, value);
        debouncedUpdateResume(JSON.parse(JSON.stringify(state.resume)))
        return { resume: { ...state.resume, data: newResumeData } };
    }),
    replaceResumeData: (newData) => set((state) => {
        state.resume = newData;
        return { resume: newData };
    }
    )
})))

export const useTemporalResumeStore = (selector, equality) => {
    return useStoreWithEqualityFn(useResumeStore.temporal, selector, equality);
};
