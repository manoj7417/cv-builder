"use client";
import Form from "@/components/component/form";
import React, { useEffect, useState } from "react";
import ResumeViewPage from "../resume-viewer/ResumeViewer";
import Template1 from "@/components/resume-templates/Template1";
import Template2 from "@/components/resume-templates/Template2";
import MobileResumeViewPage from "@/components/resume-templates/MobileResumeViewPage";
import { IoDocumentOutline } from "react-icons/io5";
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
      content: "",
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

function Builder() {
  const [resumeData, setResumeData] = useState(initialState);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileContent, setMobileContent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleMobileContent = () => {
    // setIsMobile(false);
    setMobileContent(true);
    setIsOverlayOpen(!isOverlayOpen);
  };

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = window.innerWidth <= 768; // Adjust this value based on your definition of "mobile"
      setIsMobile(isMobileDevice);
      setMobileContent(false);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollBottom =
        document.documentElement.scrollHeight -
        window.innerHeight -
        window.scrollY;

      if (scrollTop < 100 || scrollBottom < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex md:flex-row flex-col w-full h-full relative ">
        <div className="lg:w-1/2 md:w-full w-full  h-full overflow-auto ">
          <Form resumeData={resumeData} setResumeData={setResumeData} />
          {
            <div
              className={`${
                isVisible ? "visibleButton" : "hiddenButton"
              }mobile_section flex justify-end mb-10 mx-10 fixed bottom-0 right-0 transition-all opacity-50 ease-in-out`}
            >
              <div>
                {isMobile && (
                  <button
                    className="p-3 bg-black text-white rounded-full flex items-center text-base justify-center"
                    onClick={handleMobileContent}
                  >
                    {isVisible && <span className="text-sm mr-2">Preview and Download </span>}
                    <IoDocumentOutline className="text-white w-5 h-5 text-xl inline" />
                  </button>
                )}
              </div>
              <div>
                {mobileContent && (
                  <MobileResumeViewPage
                    scale={scale}
                    resumeData={resumeData}
                    isOverlayOpen={isOverlayOpen}
                    setIsOverlayOpen={setIsOverlayOpen}
                  />
                )}
              </div>
            </div>
          }
        </div>
        <div
          className="resume_viewer md:w-1/2 w-full h-screen overflow-hidden lg:fixed lg:right-0 lg:block hidden"
          style={{
            background: `url(bigbg.svg)`,
            backgroundPosition: "bottom",
          }}
        >
          <ResumeViewPage
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        </div>
      </div>
    </>
  );
}

export default Builder;
