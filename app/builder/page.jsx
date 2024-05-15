"use client";
import Form from "@/components/component/form";
import React, { useEffect, useState } from "react";
import ResumeViewPage from "../resume-viewer/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MobileTemplate3 from "@/components/resume-templates/MobileTemplate3";
import Template1 from "@/components/resume-templates/Template1";
import Template2 from "@/components/resume-templates/Template2";

const initialState = {
  basics: {
    name: "Anuj Rawat",
    headline: "",
    email: "anujrawat@glassfrog.design",
    phone: "fdasfasdfasdf",
    country: "India",
    address: "Sudhowala",
    city: "Dehradun",
    jobtitle: "Web Dev",
    postalcode: "248001",
    url: {
      label: "",
      href: ""
    },
    customFields: [],
    picture: {
      url: "https://storage.rxresu.me/clvlwaeik0qf8fnw32i7lho6x/pictures/clvlwaeik0qf8fnw32i7lho6x.jpg",
      size: 64,
      aspectRatio: 1,
      borderRadius: 0,
      effects: {
        hidden: false,
        border: false,
        grayscale: false
      }
    }
  },
  sections: {
    summary: {
      name: "Profile",
      columns: 1,
      visible: true,
      id: "profile",
      content: "<p>fasdfasdfasdfasdffasdfasfadsfadsffasthfgdhdfg</p>"
    },
    awards: {
      name: "Awards",
      columns: 1,
      visible: true,
      id: "awards",
      items: []
    },
    certifications: {
      name: "Certifications",
      columns: 1,
      visible: true,
      id: "certifications",
      items: []
    },
    education: {
      name: "Education",
      columns: 1,
      visible: true,
      id: "education",
      items: [{
        institute: "THDC",
        degree: "B.Tech",
        startDate: "Aug 2016",
        endDate: "Dec 2020",
        description: ""
      }, {
        institute: "TWS",
        degree: "12th",
        startDate: "April 2015",
        endDate: "April 2016",
        description: ""
      }]
    },
    experience: {
      name: "Experience",
      columns: 1,
      visible: true,
      id: "experience",
      items: [{
        jobtitle: "Web dev",
        employer: "CEOITBOX",
        startDate: "Aug 2016",
        endDate: "Dec 2020",
        description: ""
      }, {
        jobtitle: "Web dev",
        employer: "CEOITBOX",
        startDate: "April 2015",
        endDate: "April 2016",
        description: ""
      }]
    },
    volunteer: {
      name: "Volunteering",
      columns: 1,
      visible: true,
      id: "volunteer",
      items: []
    },
    interests: {
      name: "Interests",
      columns: 1,
      visible: true,
      id: "interests",
      items: []
    },
    languages: {
      name: "Languages",
      columns: 1,
      visible: true,
      id: "languages",
      items: []
    },
    profiles: {
      name: "Profiles",
      columns: 1,
      visible: true,
      id: "profiles",
      items: []
    },
    projects: {
      name: "Projects",
      columns: 1,
      visible: true,
      id: "projects",
      items: []
    },
    publications: {
      name: "Publications",
      columns: 1,
      visible: true,
      id: "publications",
      items: []
    },
    references: {
      name: "References",
      columns: 1,
      visible: true,
      id: "references",
      items: []
    },
    skills: {
      name: "Skills",
      columns: 1,
      visible: true,
      id: "skills",
      items: []
    },
    custom: {
      w5x9jciqnkyyb1838abqsfgx: {
        name: "Custom Section",
        columns: 1,
        visible: true,
        id: "w5x9jciqnkyyb1838abqsfgx",
        items: []
      }
    }
  },
  metadata: {
    template: "pikachu",
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
    notes: "",
  },
}

function Builder() {
  const [resumeData, setResumeData] = useState(initialState);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileContent, setMobileContent] = useState(false);

  const handleMobileContent = () => {
    setIsMobile(false);
    setMobileContent(true);
  };

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = window.innerWidth <= 768; // Adjust this value based on your definition of "mobile"
      setIsMobile(isMobileDevice);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <div className="flex md:flex-row flex-col w-full h-full mb-20 relative">
      <div className="lg:w-1/2 md:w-full w-full  h-full overflow-auto border-2">
        <Form resumeData={resumeData} setResumeData={setResumeData} />
        <div className="mobile_section flex justify-end mb-10 mx-10">
          <div>
            {isMobile && (
              <button
                className="px-5 py-2 bg-black text-white rounded-lg"
                onClick={handleMobileContent}
              >
                Preview and Download
              </button>
            )}
          </div>
          <div className="mobileContent">
            {mobileContent && (
              <>
                <section className="w-screen h-screen absolute top-0 left-0 ">
                  <MobileTemplate3 />
                </section>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="lg:block hidden resume_viewer md:w-1/2 w-full h-screen overflow-hidden bg-gray-300 fixed right-0 top-0 bottom-0">
        <ResumeViewPage scale={scale} />
      </div>
    </div>
  );
}

export default Builder;
