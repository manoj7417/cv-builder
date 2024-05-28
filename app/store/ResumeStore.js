import { create } from 'zustand';
import { useStoreWithEqualityFn } from "zustand/traditional";
import _set from "lodash.set";


const initialState = {
    basics: {
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
            size: 64,
            aspectRatio: 1,
            borderRadius: 0,
            effects: {
                hidden: false,
                border: false,
                grayscale: false,
            },
        },
    },
    sections: {
        summary: {
            name: "Profile",
            columns: 1,
            visible: true,
            id: "profile",
            content: "Hello",
        },
        awards: {
            name: "Awards",
            columns: 1,
            visible: true,
            id: "awards",
            items: [],
        },
        certifications: {
            name: "Certifications",
            columns: 1,
            visible: true,
            id: "certifications",
            items: [],
        },
        education: {
            name: "Education",
            columns: 1,
            visible: true,
            id: "education",
            items: [],
        },
        experience: {
            name: "Experience",
            columns: 1,
            visible: true,
            id: "experience",
            items: [],
        },
        volunteer: {
            name: "Volunteering",
            columns: 1,
            visible: true,
            id: "volunteer",
            items: [],
        },
        interests: {
            name: "Interests",
            columns: 1,
            visible: true,
            id: "interests",
            items: [],
        },
        languages: {
            name: "Languages",
            columns: 1,
            visible: true,
            id: "languages",
            items: [],
        },
        profiles: {
            name: "Profiles",
            columns: 1,
            visible: true,
            id: "profiles",
            items: [],
        },
        projects: {
            name: "Projects",
            columns: 1,
            visible: true,
            id: "projects",
            items: [],
        },
        publications: {
            name: "Publications",
            columns: 1,
            visible: true,
            id: "publications",
            items: [],
        },
        references: {
            name: "References",
            columns: 1,
            visible: true,
            id: "references",
            items: [],
        },
        skills: {
            name: "Skills",
            columns: 1,
            visible: true,
            id: "skills",
            items: [],
        },
        custom: {
            w5x9jciqnkyyb1838abqsfgx: {
                name: "Custom Section",
                columns: 1,
                visible: true,
                id: "w5x9jciqnkyyb1838abqsfgx",
                items: [],
            },
        },
    },
    metadata: {
        template: "Template3",
        layout: [
            [
                [
                    "education",
                    "custom.w5x9jciqnkyyb1838abqsfgx",
                    "experience",
                    "languages",
                    "summary",
                    "interests",
                ],
                [
                    "references",
                    "skills",
                    "volunteer",
                    "certifications",
                    "projects",
                    "awards",
                    "profiles",
                ],
            ],
            [[], ["publications"]],
        ],
        css: {
            value:
                ".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
            visible: false,
        },
        page: {
            margin: 20,
            format: "a4",
            options: {
                breakLine: true,
                pageNumbers: false,
            },
        },
        theme: {
            background: "#ffffff",
            text: "#000000",
            primary: "#d97706",
        },
        typography: {
            font: {
                family: "IBM Plex Sans",
                subset: "latin",
                variants: ["regular"],
                size: 13.2,
            },
            lineHeight: 2.45,
            hideIcons: false,
            underlineLinks: true,
        },
    },
};


export const useResumeStore = create((set) => ({
    resumeData: initialState,
    setResumeData: (path, value) => set((state) => {
        const newResumeData = { ...state.resumeData };
        _set(newResumeData, path, value);
        return { resumeData: newResumeData };
    }),
    replaceResumeData: (newData) => set({ resumeData: newData })
}))

export const useTemporalResumeStore = (selector, equality) => {
    return useStoreWithEqualityFn(useResumeStore.temporal, selector, equality);
};
