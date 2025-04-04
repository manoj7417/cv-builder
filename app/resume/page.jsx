/** @format */

"use client";
import Link from "next/link";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaBorderAll } from "react-icons/fa";
import { PiFolderSimpleUser } from "react-icons/pi";
import { MdQueryStats } from "react-icons/md";
import { IoShirt } from "react-icons/io5";
import { RiShirtFill } from "react-icons/ri";
import { Carousel } from "@/components/ui/carousel";
import { templateType } from "@/components/component/Slider";
import dynamic from "next/dynamic";
import NewResumeHeader from "../Layout/NewResumeHeader";
import Header from "../Layout/Header";
import { useUserStore } from "../store/UserStore";
import WorkTogether from "@/components/component/WorkTogether";
import Footer from "../Layout/Footer";
import NewSlider from "@/components/component/NewSlider";
import { ResumeHeader } from "../Layout/ResumeHeader";
import { useEffect, useState } from "react";
import { useResumeStore } from "@/app/store/ResumeStore";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { GetTokens } from "@/app/actions";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ServicesPopIp from "@/components/component/ServicesPopUp";
import ServicesPopUp from "@/components/component/ServicesPopUp";
import FAQSection from "@/components/component/FAQSection";
import AccordionItem from "@/components/component/AccordionItem";
import parse from "html-react-parser";
import { GiBullseye } from "react-icons/gi";

const ImageCarousel = dynamic(
  () => import("@/components/component/ImageCarousel"),
  { ssr: false }
);

const AllTemplates = [
  {
    name: "Template1",
    src: "/Template1.png",
    alt: "Template1.png",
    type: templateType.premium,
  },
  {
    name: "Template3",
    src: "/Template3.png",
    alt: "/Template3.png",
    type: templateType.free,
  },
  {
    name: "Template4",
    src: "/Template4.png",
    alt: "/Template4.png",
    type: templateType.free,
  },
  {
    name: "Template5",
    src: "/Template5.png",
    alt: "/Template5.png",
    type: templateType.premium,
  },
  {
    name: "Template6",
    src: "/Template6.png",
    alt: "/Template6.png",
    type: templateType.free,
  },
  {
    name: "Template7",
    src: "/Template7.png",
    alt: "/Template7.png",
    type: templateType.free,
  },
  {
    name: "Template8",
    src: "/Template8.png",
    alt: "/Template8.png",
    type: templateType.premium,
  },
  {
    name: "Template9",
    src: "/Template9.png",
    alt: "/Template9.png",
    type: templateType.free,
  },
  {
    name: "Template10",
    src: "/Template10.png",
    alt: "/Template10.png",
    type: templateType.free,
  },
  {
    name: "Template11",
    src: "/Template11.png",
    alt: "/Template11.png",
    type: templateType.premium,
  },
  {
    name: "Template12",
    src: "/Template12.png",
    alt: "/Template.png",
    type: templateType.free,
  },
  {
    name: "Template13",
    src: "/Template13.png",
    alt: "/Template13.png",
    type: templateType.free,
  },
  {
    name: "Template14",
    src: "/Template14.png",
    alt: "/Template14.png",
    type: templateType.free,
  },
  {
    name: "Template15",
    src: "/Template15.png",
    alt: "/Template15.png",
    type: templateType.free,
  },
  {
    name: "Template16",
    src: "/Template16.png",
    alt: "/Template16.png",
    type: templateType.free,
  },
  {
    name: "Template17",
    src: "/Template17.png",
    alt: "/Template17.png",
    type: templateType.free,
  },
  {
    name: "Template18",
    src: "/Template18.png",
    alt: "/Template18.png",
    type: templateType.free,
  },
  {
    name: "Template19",
    src: "/Template19.png",
    alt: "/Template19.png",
    type: templateType.free,
  },
  {
    name: "Template20",
    src: "/Template20.png",
    alt: "/Template20.png",
    type: templateType.free,
  },
  {
    name: "Template21",
    src: "/Template21.png",
    alt: "/Template21.png",
    type: templateType.free,
  },
];

const SimpleTemplates = [
  {
    name: "Template3",
    src: "/Template3.png",
    alt: "Template3.png",
    type: templateType.premium,
  },
  {
    name: "Template4",
    src: "/Template4.png",
    alt: "/Template4.png",
    type: templateType.free,
  },
  {
    name: "Template5",
    src: "/Template5.png",
    alt: "/Template5.png",
    type: templateType.free,
  },
  {
    name: "Template6",
    src: "/Template6.png",
    alt: "/Template6.png",
    type: templateType.premium,
  },
  {
    name: "Template7",
    src: "/Template7.png",
    alt: "/Template7.png",
    type: templateType.free,
  },
  {
    name: "Template8",
    src: "/Template8.png",
    alt: "/Template8.png",
    type: templateType.free,
  },
  {
    name: "Template9",
    src: "/Template9.png",
    alt: "/Template9.png",
    type: templateType.premium,
  },
  {
    name: "Template12",
    src: "/Template12.png",
    alt: "/Template12.png",
    type: templateType.free,
  },
  {
    name: "Template22",
    src: "/Template22.png",
    alt: "/Template22.png",
    type: templateType.free,
  },
  {
    name: "Template15",
    src: "/Template15.png",
    alt: "/Template15.png",
    type: templateType.premium,
  },
];

const ATSTemplates = [
  {
    name: "Template8",
    src: "/Template8.png",
    alt: "/Template8.png",
    type: templateType.free,
  },
  {
    name: "Template9",
    src: "/Template9.png",
    alt: "/Template9.png",
    type: templateType.premium,
  },
  {
    name: "Template12",
    src: "/Template12.png",
    alt: "/Template12.png",
    type: templateType.free,
  },
  {
    name: "Template22",
    src: "/Template22.png",
    alt: "/Template22.png",
    type: templateType.free,
  },
  {
    name: "Template15",
    src: "/Template15.png",
    alt: "/Template15.png",
    type: templateType.premium,
  },
  {
    name: "Template3",
    src: "/Template3.png",
    alt: "Template3.png",
    type: templateType.premium,
  },
  {
    name: "Template4",
    src: "/Template4.png",
    alt: "/Template4.png",
    type: templateType.free,
  },
  {
    name: "Template5",
    src: "/Template5.png",
    alt: "/Template5.png",
    type: templateType.free,
  },
  {
    name: "Template6",
    src: "/Template6.png",
    alt: "/Template6.png",
    type: templateType.premium,
  },
  {
    name: "Template7",
    src: "/Template7.png",
    alt: "/Template7.png",
    type: templateType.free,
  },
];

const DesignerTemplates = [
  {
    name: "Template18",
    src: "/Template18.png",
    alt: "Template18.png",
    type: templateType.premium,
  },
  {
    name: "Template20",
    src: "/Template20.png",
    alt: "/Template20.png",
    type: templateType.free,
  },
  {
    name: "Template21",
    src: "/Template21.png",
    alt: "/Template21.png",
    type: templateType.free,
  },
  {
    name: "Template23",
    src: "/Template23.png",
    alt: "/Template23.png",
    type: templateType.premium,
  },
  {
    name: "Template24",
    src: "/Template24.png",
    alt: "/Template24.png",
    type: templateType.free,
  },
  {
    name: "Template25",
    src: "/Template25.png",
    alt: "/Template25.png",
    type: templateType.free,
  },
  {
    name: "Template26",
    src: "/Template26.png",
    alt: "/Template26.png",
    type: templateType.premium,
  },
  {
    name: "Template19",
    src: "/Template19-1.png",
    alt: "/Template19-1.png",
    type: templateType.free,
  },
  {
    name: "Template17",
    src: "/Template17.png",
    alt: "/Template17.png",
    type: templateType.free,
  },
  {
    name: "Template13",
    src: "/Template13.png",
    alt: "/Template13.png",
    type: templateType.premium,
  },
];

const ProfessionalTemplates = [
  {
    name: "Template1",
    src: "/Template1.png",
    alt: "Template1.png",
    type: templateType.premium,
  },
  {
    name: "Template14",
    src: "/Template14.png",
    alt: "/Template14.png",
    type: templateType.free,
  },
  {
    name: "Template11",
    src: "/Template11-1.png",
    alt: "/Template11-1.png",
    type: templateType.free,
  },
  {
    name: "Template16",
    src: "/Template16.png",
    alt: "/Template16.png",
    type: templateType.premium,
  },
  {
    name: "Template22",
    src: "/Template22.png",
    alt: "/Template22.png",
    type: templateType.free,
  },
  {
    name: "Template20",
    src: "/Template20.png",
    alt: "/Template20.png",
    type: templateType.free,
  },
  {
    name: "Template3",
    src: "/Template3.png",
    alt: "/Template3.png",
    type: templateType.premium,
  },
  {
    name: "Template18",
    src: "/Template18.png",
    alt: "/Template18.png",
    type: templateType.free,
  },
  {
    name: "Template15",
    src: "/Template15.png",
    alt: "/Template15.png",
    type: templateType.free,
  },
  {
    name: "Template12",
    src: "/Template12.png",
    alt: "/Template12.png",
    type: templateType.premium,
  },
];

const GraduateTemplates = [
  {
    name: "Template16",
    src: "/Template16.png",
    alt: "/Template16.png",
    type: templateType.premium,
  },
  {
    name: "Template22",
    src: "/Template22.png",
    alt: "/Template22.png",
    type: templateType.free,
  },
  {
    name: "Template1",
    src: "/Template1.png",
    alt: "Template1.png",
    type: templateType.premium,
  },
  {
    name: "Template3",
    src: "/Template3.png",
    alt: "/Template3.png",
    type: templateType.free,
  },
  {
    name: "Template20",
    src: "/Template20.png",
    alt: "/Template20.png",
    type: templateType.free,
  },
  {
    name: "Template3",
    src: "/Template3.png",
    alt: "/Template3.png",
    type: templateType.premium,
  },
  {
    name: "Template18",
    src: "/Template18.png",
    alt: "/Template18.png",
    type: templateType.free,
  },
  {
    name: "Template15",
    src: "/Template15.png",
    alt: "/Template15.png",
    type: templateType.free,
  },
  {
    name: "Template12",
    src: "/Template12.png",
    alt: "/Template12.png",
    type: templateType.premium,
  },
];

const faqData = [
  {
    id: 1,
    ques: "Can we make a professional CV template in this CV builder?",
    ans: `
      Yes, you can make your resume online using our Genies Career Hub <div class="font-bold">resume builder</div>. This online <div class="font-bold">resume generator</div> eases your work by allowing you to fill in some general and required information. Career Genies Hub builds <div class="font-bold">professional CV templates</div> for you to get through interviews quickly
    `,
  },
  {
    id: 2,
    ques: "What is unique about this resume builder?",
    ans: `
     The Genies Career Hub resume builder is a professionally approved online CV builder. Our <a href="https://www.geniescareerhub.com/resume" class="font-bold">CV Builder</a>, with the help of Artificial Intelligence, helps your CV profile to become error-free and extraordinary. AI and your input will together produce an outstanding resume that impresses the employer exceptionally. 
    `,
  },
  ,
  {
    id: 3,
    ques: "What is different about your curriculum vitae templates?",
    ans: `
     Our Curriculum vitae templates are customised templates that are made with the insights of professionals and AI. The AI improves your <div class="font-bold">CV format</div> content, making it the best for you. You can also change these <a href="https://www.geniescareerhub.com/resume" class="font-bold">CV template</a> in between or at the end whenever you want.
    `,
  },
];

export default function DashboardIdea() {
  // const userState = useUserStore((state) => state.userState);
  const [userState, setUserState] = useState({});
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [defaultTab, setDefaultTab] = useState("all");

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const ats = urlParams.get("ats");
      if (ats === "true") {
        setDefaultTab("ats");
      }
    }
  }, []); // Runs only once on component mount

  useEffect(() => {}, [defaultTab]); // Logs whenever defaultTab changes

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userState"));
    if (user) {
      setUserState(user.userdata);
    }
  }, []);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Organization",
    url: "https://www.geniescareerhub.com/",
    logo: "https://geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
    name: "geniescareerhub.com",
    description:
      "Genies Career Hub creates your resume in an easy going process. We provide more than 23+ professional approved ATS-friendly resume templates and features like CV Creator, CV Optimiser and CV Match. Additionally, our new features of Psychometric Test with incorporating AI and Career Coach feature providing best expertise in creating professional resumes.",
  };

  const jsonLd1 = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ATS Resume Checker",
        item: "https://www.geniescareerhub.com/resume-analyzer",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "ATS CV Checker",
        item: "https://www.geniescareerhub.com/resume-analyzer",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Resume Formatting",
        item: "https://www.geniescareerhub.com/resume-analyzer",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Application Tracking System Resume",
        item: "https://www.geniescareerhub.com/resume-analyzer",
      },
    ],
  };

  const jsonLd2 = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is unique about Genies Career Hub’s CV Optimiser?",
        acceptedAnswer: {
          "@type": "Answer",
          text: 'This CV Optimiser thoroughly analyses your resume with AI and provides you suggestions with the <a href="https://www.geniescareerhub.com/resume-analyzer"><strong>ATS Resume Score</strong></a>. This feedback contains the clarity, relevance, and content of your resume with a score and suggestions to improve the ATS of your resume. Following these insights, you can increase your score and get better and more opportunities.',
        },
      },
      {
        "@type": "Question",
        name: "How does this CV checker help in increasing the ATS score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Genies Career Hub features a tool in which your resume will be analysed through an optimisation process. After analysing, it delivers you the feedback with a score in three consecutive steps:
<ul>
<li>Clarity</li>
<li>Relevance</li>
<li>Content</li>
</ul>
Follow the suggestions given below the score to get a higher score and better career prospects."
    }
  },{
    "@type": "Question",
    "name": "How can I optimise my CV without having an enhanced CV?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "<p>Adhere to these six simple steps for smooth functioning:</p>
<ul>
<li>Go to the CV Studio page to create an <a href=\"https://geniescareerhub.com/resume-analyzer\"><strong>enhanced CV</strong></a>.</li>
<li>Fill in the mandatory information. If you desire, AI can generate your profile description and ensure all fields completed.</li>
<li>Choose a template that suits your style, and customize it with your desired colour.</li>
<li>Download the CV.</li>
<li>Go to Optimise CV, upload your CV, and get it analysed.</li>
</ul>
<p>Follow the feedback suggestions in case of a low <a href=\"https://www.geniescareerhub.com/resume-analyzer\"><strong>ATS CV Checker</strong></a> and re-assess your <strong>enhanced resume</strong>.</p>`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd1) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd2) }}
      />
      <ResumeHeader />
      <main>
        <section className="w-full flex flex-col items-center justify-center ">
          <div className="container w-full h-full resume">
            <div className="flex flex-col items-center justify-center 2xl:px-24 px-5">
              <div className="space-y-2 2xl:mt-40 lg:mt-32 mt-20 px-2 sm:px-10 text-center sm:text-start">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 lg:mb-10 text-gray-900 text-center lg:px-20 xl:px-20 2xl:px-20">
                  Find the <span className="text-[#f76918]">Perfect CV </span>{" "}
                  for Your Dream Job
                </h1>
                <p className="text-gray-700 text-sm lg:text-md sm:text-lg text-center lg:px-20 xl:px-20 2xl:px-20">
                  Created by Professionals and Industry Experts from all across
                  the globe and integrating Artificial Intelligence, our CV
                  Builder is everything you need to craft the perfect CV. We
                  bring forward CV Template options that are custom-tailored to
                  the job you are applying for to ensure that your CV gets
                  through every Application Tracking Software ATS CV Checker.
                </p>

                <div className="flex items-center justify-center">
                  <Button
                    onClick={() => router.push("/user-history")}
                    className="lg:text-base text-sm text-white bg-[#f76918] rounded-md px-5 mt-10 py-3"
                  >
                    Create CV Now
                  </Button>
                </div>
              </div>
              <Image
                priority="true"
                src="/easymessage.png"
                className="w-50 h-50 px-7 mt-10 pt-7 rounded-t-3xl"
                alt="@shadcn"
                width={600}
                height={100}
              />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
