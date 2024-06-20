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
            columns: 1,
            visible: true,
            id: "profile",
            content: "",
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
        projects: {
            name: "Projects",
            columns: 1,
            visible: true,
            id: "projects",
            items: [],
        },
        skills: {
            name: "Skills",
            columns: 1,
            visible: true,
            id: "skills",
            items: [],
        },
        hobbies: {
            name: "Hobbies",
            columns: 1,
            visible: true,
            id: "hobbies",
            items: [],
        }
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