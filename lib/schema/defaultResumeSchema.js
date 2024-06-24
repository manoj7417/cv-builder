export const DefaultResumeSchema = {
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
            visible: true
        },
    },
    sections: {
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
            name: "Reference",
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
    metadata: {
        template: "Template9",
        page: {
            format: "a4",
        },
        theme: {
            background: "#ffffff",
            text: "#000000",
            primary: "#3797BA",
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
}