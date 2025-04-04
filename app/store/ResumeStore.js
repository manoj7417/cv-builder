import { create } from 'zustand';
import { useStoreWithEqualityFn } from "zustand/traditional";
import _set from "lodash.set";
import { resumeSchema } from '@/lib/schema/resume/resume'
import { debouncedUpdateResume } from '../services/resume/update';
import { devtools, persist } from 'zustand/middleware'
import { temporal, TemporalState } from "zundo";
import { debouncedUpdateResumeTitle } from '../services/resume/updatedResumeTitle';
const myMiddlewares = (f) =>
    devtools(
        persist(
            temporal(f),
            { name: 'resume' }
        )
    );

export const useResumeStore = create(myMiddlewares((set) => ({
    resume: resumeSchema,
    isUploading: false,
    setIsUploading: (isUploading) => set({ isUploading }),
    setResumeTitle: (newTitle, id) => set((state) => {
        state.resume.title = newTitle;
        debouncedUpdateResumeTitle(JSON.parse(JSON.stringify({ title: newTitle, id })));
        return { resume: { ...state.resume, title: newTitle } };
    }),

    setResumeData: (path, value) => set((state) => {
        const newResumeData = { ...state?.resume?.data };
        state.resume.data = _set(newResumeData, path, value);
        debouncedUpdateResume(JSON.parse(JSON.stringify(state?.resume)))
        return { resume: { ...state?.resume, data: newResumeData } };
    }),
    replaceResumeData: (newData) => set((state) => {
        state.resume = newData;
        return { resume: newData };
    }
    ),
    updateResumeData: (newData) => set((state) => {
        state.resume.data = newData;
        debouncedUpdateResume(JSON.parse(JSON.stringify(state?.resume)))
        return { ...state.resume }
    }),
    updateBasicAndSectionsData: (basics, sections) => set((state) => {
        state.resume.data.basics = basics;
        state.resume.data.sections = sections;
        debouncedUpdateResume(JSON.parse(JSON.stringify(state?.resume)))
        return { resume: { ...state.resume } }
    }),
    clearResumeData: () => set((state) => {
        state.resume.data.basics = {
            name: "",
            email: "",
            phone: "",
            country: "",
            city: "",
            jobtitle: "",
            url: {
                label: "",
                href: "",
            },
            customFields: [],
            picture: {
                url: "",
                visible: true
            },
        };
        state.resume.data.sections = {
            summary: {
                name: "Profile",
                visible: true,
                id: "profile",
                content: "",
            },
            education: {
                name: "Education",
                visible: true,
                id: "education",
                items: [],
            },
            experience: {
                name: "Experience",
                visible: true,
                id: "experience",
                items: [],
            },
            projects: {
                name: "Projects",
                visible: true,
                id: "projects",
                items: [],
            },
            skills: {
                name: "Skills",
                visible: true,
                id: "skills",
                items: [],
            },
            hobbies: {
                name: "Hobbies",
                visible: true,
                id: "hobbies",
                items: [],
            },
            certificates: {
                name: "Certificates",
                visible: true,
                id: "certificates",
                items: [],
            },
            reference: {
                name: "References",
                visible: true,
                id: "reference",
                items: [],
            },
            language: {
                name: "Language",
                visible: true,
                id: "language",
                items: []
            },
            awards: {
                name: "Awards",
                visible: true,
                id: "awards",
                items: [],
            },
            custom: {}
        },
            debouncedUpdateResume(JSON.parse(JSON.stringify(state?.resume)))
        return { ...state.resume }
    })
})))

export const useTemporalResumeStore = (selector, equality) => {
    return useStoreWithEqualityFn(useResumeStore.temporal, selector, equality);
};
