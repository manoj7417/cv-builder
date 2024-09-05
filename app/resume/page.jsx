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
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { GetTokens } from "@/app/actions";
import { createNewResume } from "../api/api";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ServicesPopIp from "@/components/component/ServicesPopUp";
import ServicesPopUp from "@/components/component/ServicesPopUp";
import FAQSection from "@/components/component/FAQSection";
import AccordionItem from "@/components/component/AccordionItem";
import parse from "html-react-parser";

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
    src: "/Template6-1.png",
    alt: "/Template6-1.png",
    type: templateType.free,
  },
  {
    name: "Template7",
    src: "/Template7-1.png",
    alt: "/Template7-1.png",
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
    src: "/Template10-1.png",
    alt: "/Template10-1.png",
    type: templateType.free,
  },
  {
    name: "Template11",
    src: "/Template11-(new).png",
    alt: "/Template11-(new).png",
    type: templateType.premium,
  },
  {
    name: "Template12",
    src: "/Template12-1.png",
    alt: "/Template.png",
    type: templateType.free,
  },
  {
    name: "Template13",
    src: "/Template13-1.png",
    alt: "/Template13-1.png",
    type: templateType.free,
  },
  {
    name: "Template14",
    src: "/Template14-1.png",
    alt: "/Template14-1.png",
    type: templateType.free,
  },
  {
    name: "Template15",
    src: "/Template15-1.png",
    alt: "/Template15-1.png",
    type: templateType.free,
  },
  {
    name: "Template16",
    src: "/Template16-1.png",
    alt: "/Template16-1.png",
    type: templateType.free,
  },
  {
    name: "Template17",
    src: "/Template17-1.png",
    alt: "/Template17-1.png",
    type: templateType.free,
  },
  {
    name: "Template18",
    src: "/Template18-1.png",
    alt: "/Template18-1.png",
    type: templateType.free,
  },
  {
    name: "Template19",
    src: "/Template19-(new).png",
    alt: "/Template19-(new).png",
    type: templateType.free,
  },
  {
    name: "Template20",
    src: "/Template20-1.png",
    alt: "/Template20-1.png",
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
    src: "/Template6-1.png",
    alt: "/Template6-1.png",
    type: templateType.premium,
  },
  {
    name: "Template7",
    src: "/Template7-1.png",
    alt: "/Template7-1.png",
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
    src: "/Template12-1.png",
    alt: "/Template12-1.png",
    type: templateType.free,
  },
  {
    name: "Template22",
    src: "/Template22-1.png",
    alt: "/Template22-1.png",
    type: templateType.free,
  },
  {
    name: "Template15",
    src: "/Template15-1.png",
    alt: "/Template15-1.png",
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
    src: "/Template12-1.png",
    alt: "/Template12-1.png",
    type: templateType.free,
  },
  {
    name: "Template22",
    src: "/Template22-1.png",
    alt: "/Template22-1.png",
    type: templateType.free,
  },
  {
    name: "Template15",
    src: "/Template15-1.png",
    alt: "/Template15-1.png",
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
    src: "/Template6-1.png",
    alt: "/Template6-1.png",
    type: templateType.premium,
  },
  {
    name: "Template7",
    src: "/Template7-1.png",
    alt: "/Template7-1.png",
    type: templateType.free,
  },
];

const DesignerTemplates = [
  {
    name: "Template18",
    src: "/Template18-1.png",
    alt: "Template18-1.png",
    type: templateType.premium,
  },
  {
    name: "Template20",
    src: "/Template20-1.png",
    alt: "/Template20-1.png",
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
    src: "/Template17-1.png",
    alt: "/Template17.png",
    type: templateType.free,
  },
  {
    name: "Template13",
    src: "/Template13-1.png",
    alt: "/Template13-1.png",
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
    src: "/Template14-1.png",
    alt: "/Template14-1.png",
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
    src: "/Template16-1.png",
    alt: "/Template16-1.png",
    type: templateType.premium,
  },
  {
    name: "Template22",
    src: "/Template22-1.png",
    alt: "/Template22-1.png",
    type: templateType.free,
  },
  {
    name: "Template20",
    src: "/Template20-1.png",
    alt: "/Template20-1.png",
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
    src: "/Template18-1.png",
    alt: "/Template18-1.png",
    type: templateType.free,
  },
  {
    name: "Template15",
    src: "/Template15-1.png",
    alt: "/Template15-1.png",
    type: templateType.free,
  },
  {
    name: "Template12",
    src: "/Template12-1.png",
    alt: "/Template12-1.png",
    type: templateType.premium,
  },
];

const faqData = [
  {
    id: 1,
    ques: "How do I use the Curriculum Vitae Template to make my Resume?",
    ans: `
      There are a variety of options available on the CV Creator to build your resume that matches your sets of skills and professional experience. In order to use the pre-existing Curriculum Vitae Template to create your resume, you can simply follow the following steps:
      <ul>
        <li>Head to the CV Creator section tab on the header and tap to open the Creator tool.</li>
        <li>On the following page, there shall be a variety of templates available under the categories of All Templates, Simple, ATS, Designer, and Professional.</li>
        <li>Click on the respective category to load the template options.</li>
        <li>Click on the “Try Now” button to build the CV in the selected template design.</li>
        <li>The template shall open up along with the CV Maker tool.</li>
        <li>Enter the required details. You can also use the assistance of the AI to input the necessary information and frame the content.</li>
        <li>Post the creation of the resume, you can easily Preview it and check the Resume Score simultaneously.</li>
        <li>Download the CV in the preferred Curriculum Vitae format through the Resume Generator tool.</li>
      </ul>
    `,
  },
  {
    id: 2,
    ques: "How do I make an ATS Friendly Resume using available CV Templates?",
    ans: `
      To make an ATS Friendly Resume, the simple hack is to employ an Application Tracking System ATS Resume Template. These templates are specifically designed to build an ATS System CV. This CV shall easily pass through the software that analyses resumes and compacts them for information. To create a resume that is compatible with the ATS CV Checker, follow these steps:
      <ul>
        <li>Tap on the CV Creator tab on the header of the website.</li>
        <li>In the templates section, tap on the category of ATS. The templates that are compatible with the Application Tracking Software shall appear on the screen. These templates are formatted according to the ATS System CV formatting.</li>
        <li>Click on the “Try Now” option to create the resume in the selected template CV format.</li>
        <li>Enter all the necessary details and information about your profile and experience.</li>
        <li>Tap on the Preview option to check the formatted and created resume.</li>
        <li>You can easily download your ATS friendly Resume, specially crafted to go through the Application Tracking Software.</li>
        <li>Further, you can easily run the prepared CV through the ATS CV Checker available in the CV Optimiser tool. This will help you analyse your Curriculum Vitae and easily check its compatibility.</li>
        <li>In case, your Resume does not appear compatible with the analyser, you can edit it with the AI.</li>
      </ul>
    `,
  },
  ,
  {
    id: 3,
    ques: "How can resume professionals and resume services help me write my CV?",
    ans: `
      Taking services from a Career Coach who also offers services in Resume creation and professional writing can be very insightful. Often, for very high-profile jobs, the candidates miss out on the exact details and keywords that an employer is looking for in the job application. Therefore, a resume professional and resume services Career Coach can help you format the perfect resume for the job you are applying for. Additionally, they can help you figure out various aspects as you seek to switch your job or find employment. You can easily contact the best career coach who can help you. All you need to do is head to the Career Coach and contact to get connected with a potential Career Coach who can guide you through professional problems.
    `,
  },
  {
    id: 4,
    ques: "What are the different types of personality tests and how can they help me?",
    ans: `
      There are distinctive types of personality tests that you can take in order to identify your professional strengths and weaknesses. Additionally, you can take Psychometric Tests in order to figure out your professional inclinations. The tests are curated specifically to suit distinct personalities and psychologies and are designed by professional psychometricians. The types of personality tests analyse different aspects. The following psychometric examinations are available for judging personality types:
      <ul class="styled-list">
        <li>Numerical Reasoning</li>
        <li>Verbal Reasoning</li>
        <li>Diagrammatic Reasoning</li>
        <li>Situational Judgement</li>
        <li>Abstract Reasoning</li>
        <li>Spatial Reasoning</li>
        <li>Logical Reasoning</li>
        <li>Mechanical Reasoning</li>
      </ul>
    `,
  },
  // Uncomment and format the rest of the entries similarly if needed
  // {
  //   id: 5,
  //   ques: "How can AI ensure my CV meets industry standards?",
  //   ans: "Our AI-driven CV creator ensures your resume meets industry standards and catches the eye of recruiters.",
  // },
  // {
  //   id: 6,
  //   ques: "What are the best ways to customize my CV for different job positions?",
  //   ans: "Use our AI services to customize your CV for any position, increasing your chances of landing an interview.",
  // },
  // {
  //   id: 7,
  //   ques: "Where can I find sample CVs to help create a standout resume?",
  //   ans: "Our sample CVs and AI enhancements provide the perfect starting point to create a standout resume.",
  // },
  // {
  //   id: 8,
  //   ques: "How can AI tools help format and polish my CV?",
  //   ans: "AI tools help you format and polish your CV to perfection, making it compelling and professional.",
  // },
  // {
  //   id: 9,
  //   ques: "How do I ensure my CV is error-free and impactful?",
  //   ans: "Ensure your CV is error-free and impactful with the help of our intelligent CV-making services.",
  // },
  // {
  //   id: 10,
  //   ques: "How can AI services adapt to my specific CV needs?",
  //   ans: "Our AI-based CV services adapt to your needs, helping you craft a resume that aligns perfectly with job requirements.",
  // },
];

export default function DashboardIdea() {
  // const userState = useUserStore((state) => state.userState);
  const [userState, setUserState] = useState({});
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userState"));
    if (user) {
      setUserState(user.userdata);
    }
  }, []);

  return (
    <>
      <ResumeHeader />
      <main>
        <section className="w-full flex flex-col items-center justify-center bg-gradient-to-t from-[#a7d9ee] to-[white]">
          <div className="container w-full h-full resume">
            <div className="flex flex-col items-center justify-center 2xl:px-24 px-5">
              <div className="space-y-2 2xl:mt-40 lg:mt-32 mt-20 px-2 sm:px-10 text-center sm:text-start">
                <h1 className="text-4xl lg:text-7xl font-bold mb-6 lg:mb-10 text-gray-900 text-center lg:px-20 xl:px-20 2xl:px-20">
                  Craft the <span className="text-[#2C98CA]">Perfect CV </span>{" "}
                  for Your Dream Job
                </h1>
                <p className="text-gray-700 text-sm lg:text-md sm:text-lg text-center lg:px-20 xl:px-20 2xl:px-20">
                  Created by Professionals and Industry Experts from all across
                  the globe and integrating Artificial Intelligence, we bring
                  forward Resume Template options that are custom-tailored to
                  the job you are applying for, to ensure that your CV gets
                  through every Application Tracking Software ATS CV Checker.
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    onClick={() => router.push("/user-history")}
                    className="lg:text-base text-sm text-white bg-blue-900 rounded-md px-5 mt-5 py-3"
                  >
                    Create CV Now
                  </Button>
                </div>
              </div>
              <Image
                priority
                src="/resume.png"
                className="w-50 h-50 px-7 mt-10 pt-7 rounded-t-3xl"
                alt="@shadcn"
                width={600}
                height={100}
              />
            </div>
          </div>
          <div className="pb-10 w-full bg-gradient-to-b from-[#edf4f8] to-[white]">
            <div className="rounded-t-xl border-t-8 border-blue-900 p-6">
              <h2 className="2xl:text-6xl lg:text-5xl text-2xl font-bold mt-10 text-black text-center">
                Choose From Our Detailed Templates Options
              </h2>
              <Tabs className="w-full py-5" defaultValue="all">
                <TabsList className="mb-4 flex w-full justify-center flex-wrap py-10 h-auto">
                  <TabsTrigger value="all">
                    <FaBorderAll className="text-pink-600 h-8 w-8 me-3" />
                    All templates
                  </TabsTrigger>
                  <TabsTrigger value="simple">
                    <PiFolderSimpleUser className="text-blue-700 h-8 w-8 me-3" />
                    Student
                  </TabsTrigger>
                  <TabsTrigger value="ats">
                    <MdQueryStats className="text-orange-600 h-8 w-8 me-3" />
                    Professional
                  </TabsTrigger>
                  <TabsTrigger value="designer">
                    <IoShirt className="text-green-700 h-8 w-8 me-3" />
                    Creative
                  </TabsTrigger>
                  <TabsTrigger value="professional">
                    <RiShirtFill className="text-red-700 h-8 w-8 me-3" />
                    Graduate
                  </TabsTrigger>
                </TabsList>
                <TabsContent className="py-7" value="all">
                  <NewSlider data={AllTemplates} />
                </TabsContent>
                <TabsContent className="py-7" value="simple">
                  <NewSlider data={SimpleTemplates} />
                </TabsContent>
                <TabsContent className="py-7" value="ats">
                  <NewSlider data={ATSTemplates} />
                </TabsContent>
                <TabsContent className="py-7" value="designer">
                  <NewSlider data={DesignerTemplates} />
                </TabsContent>
                <TabsContent className="py-7" value="professional">
                  <NewSlider data={ProfessionalTemplates} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        <section>
          <div className="steps_main_section max-w-7xl mx-auto relative lg:p-0 p-10">
            <h2 className="text-4xl lg:text-7xl font-bold mb-6 lg:mb-10 text-gray-900 text-justify lg:px-20 xl:px-10 2xl:px-10">
              Create a CV template for Your{" "}
              <span className="text-[#2C98CA]">Dream Job</span>
            </h2>
            <div className="left_icon absolute lg:bottom-32 top-38 lg:left-20 left-10">
              <img src="/resume-icon.png" alt="icon1" />
            </div>
            <div className="right_icon absolute bottom-20 right-10 lg:block hidden">
              <img
                src="/resume-icon3.png"
                alt="icon2"
                className="w-full h-32"
              />
            </div>
            <p className="text-base text-black text-start lg:px-20 xl:px-20 2xl:px-10 pt-20">
              Create your CV with our custom-made templates like experts and
              industry professionals and incorporate Artificial Intelligence
              with it. Match the modern recruitment standards with our
              customizable templates in the professional curriculum vitae
              format.
            </p>
          </div>
          <div className="max-w-7xl mx-auto steps_intro py-20 sm:p-5">
            <div className="flex lg:flex-row flex-col gap-10 my-10">
              <div className="lg:w-[30%] w-full h-[350px] image_content bg-[#ffc7bf]">
                <img
                  src="/resume-icon4.png"
                  alt="icon4"
                  className="w-full h-full p-10 object-contain"
                />
              </div>
              <div className="lg:w-[70%] w-full steps_content">
                <h3 className="text-3xl text-black font-bold py-3">
                  Use our CV Builder with customisable templates and make your
                  resume online
                </h3>
                <p className="text-base py-3">
                  Create a professional CV with our CV Builder in UK format
                  resume Template. Take the help of our Custom-made templates
                  made with the insights of professionals with combining
                  Artificial Intelligence.
                </p>
                <p className="text-base py-3">
                  These templates will make your CV layout UK stand out and
                  ensure every detail is flawless with proper highlighting of
                  your skills and achievements. This UK-style resume template
                  builder is tried and tested by experts with specialties like
                  skills, profiles, education, certificates, etc.
                </p>
                <p className="text-base py-3">
                  After quickly filling in your details in the template, you can
                  save it and use it for yourself. You can choose and customize
                  from your curriculum vitae templates.
                </p>
              </div>
            </div>
            <div className="step_1">
              <div className="flex lg:flex-row flex-col gap-10 my-20 relative lg:p-1 p-5">
                <div className="lg:w-[70%] w-full steps_content">
                  <h4 className="font-bold text-black text-2xl">Step 1</h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Choose a CV Template 
                  </h3>
                  <p className="text-base py-3">
                    When you reach the CV creator, we bring you the most
                    straightforward resume builder. Follow these simple steps to
                    create your professional CV layout UK.
                  </p>
                  <p className="text-base py-3">
                    We bring you the best templates approved by experts. You can
                    choose personalized designs from any of the 25 UK-style CV
                    templates. These allow you to fill in general details like
                    your profile, education, experience, projects, skills,
                    hobbies, awards, references, certificates, language, and the
                    color theme of your template.
                  </p>
                  <p className="text-base py-3">
                    Choose a template that matches your job professionalism and
                    proceed with filling in the details. This will proceed with
                    specifications and additional qualities you can fill in
                    yourself or take the help of Artificial Intelligence by
                    clicking on the Generate with AI option.
                  </p>
                  <p className="text-base py-3">
                    With the help of Artificial Intelligence, after you fill in
                    some details, it generates a proper professional profile
                    description. 
                  </p>
                  <div className="step_image">
                    <img src="/step12.png" alt="" />
                  </div>
                </div>
                <div className="lg:w-[30%] w-full h-[450px] image_content bg-[#d3e9f4] flex justify-center items-center">
                  <div className="flex lg:flex-row flex-col justify-center items-center">
                    <img
                      src="/step-1.png"
                      alt="icon4"
                      className="w-[200px] h-[200px] object-contain"
                    />
                    <img
                      src="/step-11.png"
                      alt="icon4"
                      className="w-[200px] h-[200px] object-contain"
                    />
                  </div>
                </div>
                <div className="arrow absolute left-[35%] -bottom-40">
                  <img
                    src="/arrow1.png"
                    alt="arrow"
                    className="w-52 h-52 object-contain lg:block hidden"
                  />
                  <img
                    src="/arrow2.png"
                    alt="arrow"
                    className="w-52 h-52 object-contain lg:hidden block"
                  />
                </div>
              </div>
            </div>
            <div className="step_2 relative">
              <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent bg-[#d3e9f4]">
                  <div className="flex justify-center items-center">
                    <img
                      src="/step2.png"
                      alt="icon4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="lg:w-[50%] w-full steps_content mt-10">
                  <h4 className="font-bold text-black text-2xl">Step 2</h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Enter basic details in CV Builder 
                  </h3>
                  <p className="text-base py-3">
                    Build your resume template with your basic details in our
                    curriculum vitae builder. In the Profile section, you can
                    either fill in the description of your profile or, by
                    entering some details, you can go for the Generate with AI
                    option. This feature is only provided by us which makes your
                    CV even more professional and ready for interview. 
                  </p>
                  <p className="text-base py-3">
                    The details that you fill in once get stopped in between due
                    to any unwanted conditions; you can go to the Back button
                    and leave the details; they will be saved automatically on
                    your next visit.
                  </p>
                </div>
              </div>
              <div className="pro_tips">
                <div className="pro_image relative">
                  <img src="/pro-tips.png" alt="pro-tips" />
                  <p className="text-red-600 font-bold absolute top-3 left-8 text-xl">
                    Pro Tips !
                  </p>
                </div>
                <p className="text-xl px-5">
                  Do you wish to change the font style of the text? Yes, you
                  can! We provide you the choice of changing the font style if
                  you do not like the original one. 
                </p>
              </div>
              <div className="arrow absolute left-[35%] -bottom-40">
                <img
                  src="/arrow2.png"
                  alt="arrow"
                  className="w-52 h-52 object-contain"
                />
              </div>
            </div>
            <div className="step_3 relative">
              <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                <div className="lg:w-[50%] w-full steps_content mt-10">
                  <h4 className="font-bold text-black text-2xl">Step 3</h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Add your education details 
                  </h3>
                  <p className="text-base py-3">
                    We provide you with a different section to input your
                    educational details, institutions you joined, and learnings
                    you had in your academic journey.  
                  </p>
                  <p className="text-base py-3">
                    Filling in some information-specific details is very
                    important for the recruiters as they will take care of these
                    details during analysis
                  </p>
                </div>
                <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:bg-transparent bg-[#d3e9f4]">
                  <div className="flex justify-center items-center">
                    <img
                      src="/step3.png"
                      alt="icon4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="pro_tips">
                <div className="pro_image relative">
                  <img src="/pro-tips.png" alt="pro-tips" />
                  <p className="text-red-600 font-bold absolute top-3 left-8 text-xl">
                    Pro Tips !
                  </p>
                </div>
                <p className="text-xl px-5">
                  You can change the design of the templates anywhere in the
                  process of making your CV. 
                </p>
              </div>
              <div className="arrow absolute left-[35%] -bottom-40">
                <img
                  src="/arrow1.png"
                  alt="arrow"
                  className="w-52 h-52 object-contain lg:block hidden"
                />
                <img
                  src="/arrow2.png"
                  alt="arrow"
                  className="w-52 h-52 object-contain lg:hidden block"
                />
              </div>
            </div>
            <div className="step_4 relative">
              <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent bg-[#d3e9f4]">
                  <div className="flex justify-center items-center">
                    <img
                      src="/step-4.png"
                      alt="icon4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="lg:w-[50%] w-full steps_content mt-16">
                  <h4 className="font-bold text-black text-2xl">Step 4</h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Fil in your experience and achievement details 
                  </h3>
                  <p className="text-base py-3">
                    Fill in your education details in the specified boxes with
                    your details. After this, you can describe your job
                    experience in the description box below the basic experience
                    details. Here, you can tell your experience of work and any
                    projects that you have worked on. You can aslo state the
                    achievements if you had any. In a very structured format
                    these will be presented on the CV Template 
                  </p>
                </div>
              </div>
              <div className="pro_tips">
                <div className="pro_image relative">
                  <img src="/pro-tips.png" alt="pro-tips" />
                  <p className="text-red-600 font-bold absolute top-3 left-8 text-xl">
                    Pro Tips !
                  </p>
                </div>
                <p className="text-xl px-5">
                  Do you wish to change the shades other than the colors
                  provided? Go ahead and click on the selected color, change the
                  shade by doodling around, and set it 
                </p>
              </div>
              <div className="arrow absolute left-[35%] -bottom-40">
                <img
                  src="/arrow2.png"
                  alt="arrow"
                  className="w-52 h-52 object-contain"
                />
              </div>
            </div>
            <div className="step_5 relative">
              <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                <div className="lg:w-[50%] w-full steps_content mt-16">
                  <h4 className="font-bold text-black text-2xl">Step 5</h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Build your skills and hobbies section 
                  </h3>
                  <p className="text-base py-3">
                    We provide you with this professional section to showcase
                    your hobbies and skills. By adding your skills and hobbies,
                    the employers take note of what you can do exceptionally.
                  </p>
                  <p className="text-base py-3">
                    These hobbies and skills will show what passions you have
                    beyond your workplace.
                  </p>
                </div>
                <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:bg-transparent bg-[#d3e9f4]">
                  <div className="flex justify-center items-center">
                    <img
                      src="/step-5.png"
                      alt="icon5"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="pro_tips">
                <div className="pro_image relative">
                  <img src="/pro-tips.png" alt="pro-tips" />
                  <p className="text-red-600 font-bold absolute top-3 left-8 text-xl">
                    Pro Tips !
                  </p>
                </div>
                <p className="text-xl px-5">
                  Do you wish to change the shades other than the colors
                  provided? Go ahead and click on the selected color, change the
                  shade by doodling around, and set it 
                </p>
              </div> */}
              <div className="arrow absolute left-[35%] -bottom-20">
                <img
                  src="/arrow1.png"
                  alt="arrow"
                  className="w-52 h-52 object-contain lg:block hidden"
                />
                <img
                  src="/arrow2.png"
                  alt="arrow"
                  className="w-52 h-52 object-contain lg:hidden block"
                />
              </div>
            </div>
            <div className="step_6 relative">
              <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent bg-[#d3e9f4]">
                  <div className="flex flex-col gap-10 justify-start items-center mt-10">
                    <img
                      src="/step6-1.png"
                      alt="icon5"
                      className="w-full h-full object-cover"
                    />
                    <img
                      src="/step6-2.png"
                      alt="icon5"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="lg:w-[50%] w-full steps_content">
                  <h4 className="font-bold text-black text-2xl">Step 6</h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Upload your certificates and language 
                  </h3>
                  <div className="certificate mt-3">
                    <h4 className="text-xl text-[#F0B000] font-medium">
                      Certificate
                    </h4>
                    <p className="text-base py-3">
                      This detail section makes your UK resume template look
                      professional and shows the essential qualities
                      <span>
                        Uploading the certificate will highlight your
                        achievements and embrace your expertise in it.
                      </span>
                    </p>
                  </div>
                  <div className="Language mt-3">
                    <h4 className="text-xl text-[#F0B000] font-medium">
                      Language
                    </h4>
                    <p className="text-base py-3">
                      Languages are a vital part of your CV in this era. Knowing
                      different languages with proficiency is essential for
                      communication across varied cultures
                      <span>
                        These credentials will let the employer know about you
                        in depth.
                      </span>
                    </p>
                  </div>
                  <p className="text-base py-3">
                    These hobbies and skills will show what passions you have
                    beyond your workplace.
                  </p>
                </div>
              </div>
              <div className="arrow absolute left-[35%] -bottom-40">
                <img
                  src="/arrow2.png"
                  alt="arrow"
                  className="w-52 h-52 object-contain"
                />
              </div>
            </div>
            <div className="step_7 relative">
              <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                <div className="lg:w-[50%] w-full steps_content mt-10">
                  <h4 className="font-bold text-black text-2xl">Step 7</h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Review your final CV 
                  </h3>
                  <p className="text-base py-3">
                    The final look through of your UK style CV template after
                    filling in the details at last is an important step. With a
                    free mind, you can have an overview of the whole CV and make
                    changes if required at the same time. The layout and visual
                    representation of knowledge will be presented forth you so
                    that you get an overview of the content in the templates.
                  </p>
                  <p className="text-base py-3">
                    Add the background color and text, change font size, bold or
                    italic-specific headings, etc
                  </p>
                </div>
                <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:bg-transparent bg-[#d3e9f4]">
                  <div className="flex justify-center items-center">
                    <img
                      src="/step3.png"
                      alt="icon4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="pro_tips">
                <div className="pro_image relative">
                  <img src="/pro-tips.png" alt="pro-tips" />
                  <p className="text-red-600 font-bold absolute top-3 left-8 text-xl">
                    Pro Tips !
                  </p>
                </div>
                <p className="text-xl px-5">
                  Get your CV downloaded in the form of a PDF or TXT file and
                  save it for future use. 
                </p>
              </div>
              <div className="arrow absolute left-[35%] -bottom-40">
                <img
                  src="/arrow1.png"
                  alt="arrow"
                  className="w-52 h-52 object-contain lg:block hidden"
                />
                <img
                  src="/arrow2.png"
                  alt="arrow"
                  className="w-52 h-52 object-contain lg:hidden block"
                />
              </div>
            </div>
            <div className="step_8 relative">
              <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-start items-center lg:order-first order-last lg:bg-transparent bg-[#d3e9f4]">
                  <div className="flex justify-start items-center">
                    <img
                      src="/step-8.png"
                      alt="icon4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="lg:w-[50%] w-full steps_content mt-10">
                  <h4 className="font-bold text-black text-2xl">Step 8</h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Download and Save your CV
                  </h3>
                  <p className="text-base py-3">
                    The downloading service that we provide will help you to
                    save it with you and reduce the chances of getting
                    misplaced. Give your CV a name and set a date for the file.
                  </p>
                  <p className="text-base py-3">
                    While downloading the CV, you can download it in PDF and TXT
                    files.
                  </p>
                  <p className="text-base py-3">
                    If, in the end, you change your mind and want to change the
                    template or edit something, well, go ahead and do it with
                    ease!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="w-full h-full relative">
          <div className="image_background">
            <img
              src="/background-image.png"
              alt="background-image"
              className="w-full h-[600px]"
            />
          </div>
          <div className="inner_content flex lg:flex-row flex-col absolute top-40 left-[20%] max-w-7xl mx-auto">
            <div className="lg:w-[50%] w-full relative">
              <h2 className="w-1/2 text-3xl lg:text-4xl font-bold text-gray-900">
                Build a perfect CV using our CV Creator
              </h2>
              <div className="image_section">
                <img
                  src="/resume-icon5.png"
                  alt="resume-icon"
                  className="w-52 h-52"
                />
              </div>
              <div className="lg:block hidden">
                <div className="bg_icon1 absolute -top-20 right-48">
                  <img src="/bg-icon1.png" alt="bg-icon1" />
                </div>
                <div className="bg_icon1 absolute top-28 right-48">
                  <img src="/bg-icon2.png" alt="bg-icon2" />
                </div>
                <div className="bg_icon1 absolute -bottom-38 left-44">
                  <img src="/bg-icon3.png" alt="bg-icon3" />
                </div>
              </div>
            </div>
            <div className="lg:w-[50%] w-full">
              <p className="my-3 text-black text-xl">
                Craft a professional and polished CV to make a strong impression
                on the employer. We provide you with a vast choice of curriculum
                vitae templates that contain portions for your specifications
                like profile, education, experience, skills, language, and other
                specifications.{" "}
              </p>
              <p className="text-black my-5 text-xl">
                Our unique feature of Artificial Intelligence added to the
                profile section helps you build your profile details
                professionally with AI. To add value, our CV enhancer has a
                skills, hobbies, and language section for you.
              </p>
            </div>
          </div>
        </section> */}
        <section className="w-full h-full relative">
          <div className="image_background">
            <img
              src="/background-image.png"
              alt="background-image"
              className="w-full h-[700px] md:h-[600px] object-cover"
            />
          </div>
          <div className="inner_content flex flex-col lg:flex-row absolute top-20 md:top-40 left-1/2 transform -translate-x-1/2 max-w-7xl w-full px-4 md:px-8">
            <div className="lg:w-[50%] w-full relative text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                Build a perfect CV using our CV Creator
              </h2>
              <div className="image_section my-4 md:my-6">
                <img
                  src="/resume-icon5.png"
                  alt="resume-icon"
                  className="w-32 h-32 md:w-52 md:h-52 mx-auto lg:mx-0"
                />
              </div>
              <div className="hidden lg:block">
                <div className="bg_icon1 absolute -top-20 right-16 md:right-48">
                  <img
                    src="/bg-icon1.png"
                    alt="bg-icon1"
                    className="w-20 h-20"
                  />
                </div>
                <div className="bg_icon2 absolute top-28 right-24 md:right-48">
                  <img
                    src="/bg-icon2.png"
                    alt="bg-icon2"
                    className="w-20 h-20"
                  />
                </div>
                <div className="bg_icon3 absolute -bottom-32 left-12 md:left-44">
                  <img
                    src="/bg-icon3.png"
                    alt="bg-icon3"
                    className="w-24 h-24"
                  />
                </div>
              </div>
            </div>
            <div className="lg:w-[50%] w-full mt-4 lg:mt-0 text-center lg:text-left">
              <p className="my-2 text-black text-base md:text-xl">
                Craft a professional and polished CV to make a strong impression
                on the employer. We provide you with a vast choice of curriculum
                vitae templates that contain sections for your specifications
                like profile, education, experience, skills, language, and other
                specifications.
              </p>
              <p className="text-black my-3 text-base md:text-xl">
                Our unique feature of Artificial Intelligence added to the
                profile section helps you build your profile details
                professionally with AI. To add value, our CV enhancer has a
                skills, hobbies, and language section for you.
              </p>
            </div>
          </div>
        </section>

        <section className="faq py-20">
          <div className="max-w-7xl mx-auto flex lg:flex-row flex-col">
            <div className="faq_image lg:w-[50%] w-full lg:block hidden">
              <div className="image_div w-[400px] h-[400px]">
                <img src="/faq_image.png" alt="faq" className="w-full h-full" />
              </div>
            </div>
            <div className="faq_content lg:w-[50%] w-full lg:p-1 p-5">
              <h2 className="text-3xl text-center text-bold font-semibold">
                Frequently Asked Questions
              </h2>
              {faqData?.map((item, index) => (
                <AccordionItem
                  open={index === open}
                  key={index}
                  ques={item?.ques}
                  ans={parse(item?.ans)}
                  toggle={() => toggle(index)}
                />
              ))}
            </div>
          </div>
        </section>
        <WorkTogether />
        <Footer />
      </main>
    </>
  );
}
