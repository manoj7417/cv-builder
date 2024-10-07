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
  console.log("pathname::", pathname);
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
              CV Templates that fit your desired{" "}
              <span className="text-[#2C98CA]">Job Role</span>
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
              Our custom templates, designed by resume writing professionals and
              job coaches across the globe, cater to every job role. We
              incorporate artificial intelligence in our{" "}
              <Link href={"/resume"} className="font-bold">
                curriculum vitae format
              </Link>{" "}
              building to help you create a CV layout that matches modern
              recruitment standards. Start now with our{" "}
              <Link className="font-bold" href={"/resume"}>
                CV template
              </Link>{" "}
              options that empower your job application with excellence.
            </p>
          </div>
          <div className="max-w-7xl mx-auto steps_intro lg:py-20 sm:p-5 p-5">
            <div className="flex lg:flex-row flex-col gap-10 my-10">
              <div className="lg:w-[30%] w-full h-[350px] image_content">
                <img
                  src="/resume21.png"
                  alt="icon4"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:w-[70%] w-full steps_content">
                <h3 className="text-3xl text-black font-bold py-3">
                  Use our CV builder to create an exceptional job application in
                  minutes
                </h3>
                <p className="text-base py-3">
                  Utilise the professional{" "}
                  <Link href={"/resume"} className="font-bold">
                    UK CV Template
                  </Link>{" "}
                  to build a job-winning resume with our{" "}
                  <Link href={"/resume"} className="font-bold">
                    CV builder
                  </Link>
                  . Our templates, tailored to your requirements, are built by
                  integrating artificial intelligence and are inspired by
                  insights and suggestions from professionals with years of
                  experience and expertise.
                </p>
                <p className="text-base py-3">
                  Highlight your important skills, experiences, and educational
                  background by utilising our options in{" "}
                  <Link href={"/resume"} className="font-bold">
                    CV Layout UK
                  </Link>
                  . Engineered to suit global job application systems, this{" "}
                  <Link href={"/resume"} className="font-bold">
                    CV Builder
                  </Link>{" "}
                  is tried and tested by experts who have critically judged
                  candidates for a myriad of job applications.
                </p>
                <p className="text-base py-3">
                  All you need to do is just feed your information into the
                  Genies Career Hub CV Creator and the artificial
                  intelligence-based systems will automatically design your
                  superlative and ATS-compatible CV in no time!
                </p>
              </div>
            </div>
            <div className="step_1">
              <div className="flex lg:flex-row flex-col gap-10 my-20 relative lg:p-1 p-5">
                <div className="lg:w-[70%] w-full steps_content">
                  <h4 className="font-bold text-black text-2xl">
                    The First Step
                  </h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Select your CV Template 
                  </h3>
                  <p className="text-base py-3">
                    On the Genies Career Hub CV Creator, there are a variety of
                    CV templates that follow the{" "}
                    <Link href={"/resume"} className="font-bold">
                      CV Layout UK
                    </Link>{" "}
                    format. It is all that you need to build a resume that
                    outshines a number of job applications.
                  </p>
                  <p className="text-base py-3">
                    All you need to do is follow simple steps in order to build
                    a curriculum vitae that impresses the recruiters and passes
                    through job application tracking systems. The first and
                    foremost step in this process is to select a{" "}
                    <Link href={"/resume"} className="font-bold">
                      CV template
                    </Link>{" "}
                    that matches with your current job profile and also conforms
                    with the job role you are yearning for. We have handpicked
                    25 remarkable templates for you to choose from.
                  </p>
                  <p className="text-base py-3">
                    While selecting a resume template, you must look out for
                    important sections such as Profile Summary, Experience,
                    Education, Contact Details, Skills, Awards, Certifications,
                    Hobbies and Interests, Photograph, References, and more.
                    Additionally, your{" "}
                    <Link href={"/resume"} className="font-bold">
                      CV template
                    </Link>{" "}
                    must have the flexibility to let you omit certain disfavored
                    sections. The design of the template is what changes the
                    impression game for you.
                  </p>
                  <p className="text-base py-3">
                    Your CV formatting must not only look captivating but also
                    be compatible with the ATS software. Therefore, selecting an
                    exemplary is very vital. Choose the best template for your
                    job application with us!
                  </p>
                  <div className="step_image">
                    <img src="/Step-21.png" alt="step1" />
                  </div>
                  <div className="pro_tips">
                    <div className="pro_image relative">
                      <img src="/pro-tips.png" alt="pro-tips" />
                      <p className="text-red-600 font-bold absolute top-3 left-8 text-xl">
                        Pro Tip !
                      </p>
                    </div>
                    <p className="text-xl px-5">
                      Even after selecting your resume template, you can change
                      it during the creation process, by simply selecting
                      another from the menu.
                    </p>
                  </div>
                </div>
                <div className="lg:w-[30%] w-full h-[450px] image_content flex justify-center items-center">
                  <div className="flex lg:flex-row flex-col justify-center items-center">
                    <img
                      src="/resume22.png"
                      alt="icon4"
                      className="w-full h-full object-cover"
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
                      src="/Step-22.png"
                      alt="icon4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="lg:w-[50%] w-full steps_content mt-10">
                  <h4 className="font-bold text-black text-2xl">
                    The Second Step
                  </h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Adding your Basic Details 
                  </h3>
                  <p className="text-base py-3">
                    With Genies Career Hub’s CV Creator to either create a
                    curriculum vitae from scratch or simply use the AI for a
                    faster approach. You can choose any of the suitable options
                    in any phase of your CV-building process 
                  </p>
                  <p className="text-base py-3">
                    Simply fill in your details in the CV Creator, such as name,
                    job title, email, and more. You can write your summary as
                    per your cognizance or easily{" "}
                    <Link href={"/resume"} className="font-bold">
                      Generate with AI
                    </Link>{" "}
                    in seconds, The AI observes your details to create CV
                    content that is exactly how your potential recruiters wish
                    to read. You can add your picture too, in your selected
                    template to give your CV that little pictorial and personal
                    touch.
                  </p>
                </div>
              </div>
              <div className="pro_tips">
                <div className="pro_image relative">
                  <img src="/pro-tips.png" alt="pro-tips" />
                  <p className="text-red-600 font-bold absolute top-3 left-8 text-xl">
                    Pro Tip !
                  </p>
                </div>
                <p className="text-xl px-5">
                  Not satisfied with the font style of your CV? Change it! We
                  help you customise your resume as you wish. Simply modify the
                  font styling while adding information in the details box. 
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
                  <h4 className="font-bold text-black text-2xl">
                    The Third Step
                  </h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Enter your Educational Background
                  </h3>
                  <p className="text-base py-3">
                    Your educational background is an inevitable part of your
                    job application. With Genies Career Hub’s CV Creator, you
                    can easily add your educational details in order of your
                    preference. Be it in chronological order or a reverse
                    chronological one, our{" "}
                    <Link href={"/resume"} className="font-bold">
                      CV Builder
                    </Link>{" "}
                    flexibly helps you choose your preferred format. With the
                    help of our easy-to-track calendars, you can uncomplicate
                    your educational background timelines.
                  </p>
                  <p className="text-base py-3">
                    If you have any special educational specifications that you
                    want your recruiter to see, we have you covered. You can
                    easily add details about your academic experiences and
                    present your CV the way you want!
                  </p>
                </div>
                <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:bg-transparent bg-[#d3e9f4]">
                  <div className="flex justify-center items-center">
                    <img
                      src="/Step-23.png"
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
                    Pro Tip !
                  </p>
                </div>
                <p className="text-xl px-5">
                  You can add as many academic experiences as you want. All you
                  need to do is tap on the add sign!
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
                      src="/Step-24.png"
                      alt="icon4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="lg:w-[50%] w-full steps_content mt-16">
                  <h4 className="font-bold text-black text-2xl">
                    The Fourth Step
                  </h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Your Experience and Achievements Go In
                  </h3>
                  <p className="text-base py-3">
                    Your recruiters need to know what skills you have learned
                    and what value you have added to the previous organisations
                    upon collaboration. This is the section where you add that.
                    Our CV Creator is customised in a way that you can add,
                    omit, or simply maximise details into the selected{" "}
                    <Link href={"/resume"} className="font-bold">
                      CV template
                    </Link>{" "}
                    based on your intention. We let you take charge of your
                    resume while supporting you in the way you want.
                  </p>
                </div>
              </div>
              <div className="pro_tips">
                <div className="pro_image relative">
                  <img src="/pro-tips.png" alt="pro-tips" />
                  <p className="text-red-600 font-bold absolute top-3 left-8 text-xl">
                    Pro Tip !
                  </p>
                </div>
                <p className="text-xl px-5">
                  Want your CV to be of different hues? Go ahead and change the
                  colour of the template by selecting a different colour by
                  doodling around.
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
                  <h4 className="font-bold text-black text-2xl">
                    The Fifth Step
                  </h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Flaunt your Skills and Interests
                  </h3>
                  <p className="text-base py-3">
                    Your skills are what get you way higher on the pile of
                    applications on the recruiter’s table. Add your skills, and
                    we ensure that they get highlighted. The CV template designs
                    on our CV Creator are formatted in a way that they get
                    emphasised when a recruiter reads the resume or even an
                    Application Tracking System scans it. Bonus Point: You can
                    also add your interests to help your recruiters get
                    additional insight about your passions beyond work life!
                  </p>
                </div>
                <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:bg-transparent bg-[#d3e9f4]">
                  <div className="flex justify-center items-center">
                    <img
                      src="/Step-25.png"
                      alt="icon5"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
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
                      src="/Step-26-1.png"
                      alt="icon5"
                      className="w-full h-full object-cover"
                    />
                    <img
                      src="/Step-26-2.png"
                      alt="icon5"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="lg:w-[50%] w-full steps_content">
                  <h4 className="font-bold text-black text-2xl">
                    The Sixth Step
                  </h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Add Certifications and Language Skills
                  </h3>
                  <div className="certificate mt-3">
                    <h4 className="text-xl text-[#F0B000] font-medium">
                      Certificate
                    </h4>
                    <p className="text-base py-3">
                      Your{" "}
                      <Link href={"/resume"} className="font-bold">
                        UK Resume template
                      </Link>{" "}
                      can look effulgent and outstanding if you add
                      certifications to showcase your skills completely. This
                      shall provide an insight into your compatibility with
                      necessary industry-applicable aptitudes. While adding your
                      certifications, you can easily include essential details
                      such as dates, gained experiences, associated
                      organisations, and much more
                    </p>
                  </div>
                  <div className="Language mt-3">
                    <h4 className="text-xl text-[#F0B000] font-medium">
                      Language
                    </h4>
                    <p className="text-base py-3">
                      It is a brownie point if you are mulltilingual. With rapid
                      globalisation, employers look out for talents who have
                      some acknowledgement of supplementary languages. This
                      helps the organisations reach out to international
                      clients. You can not only add the languages in the Genies
                      Career Hub templates but also add your proficiency level.
                    </p>
                  </div>
                </div>
              </div>
              <div className="arrow absolute left-[35%] -bottom-40">
                <img
                  src="/arrow2.png"
                  alt="arrow"
                  className="w-52 h-52 object-contain"
                />
              </div>
              <div className="pro_tips">
                <div className="pro_image relative">
                  <img src="/pro-tips.png" alt="pro-tips" />
                  <p className="text-red-600 font-bold absolute top-3 left-8 text-xl">
                    Pro Tip !
                  </p>
                </div>
                <p className="text-xl px-5">
                  To make your CV more professionally accessible, you can add
                  links to important keywords and help them find the exact
                  sources of your certifications, and more.
                </p>
              </div>
            </div>
            <div className="step_7 relative">
              <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                <div className="lg:w-[50%] w-full steps_content mt-10">
                  <h4 className="font-bold text-black text-2xl">
                    The Seventh Step{" "}
                  </h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Review your Curriculum Vitae 
                  </h3>
                  <p className="text-base py-3">
                    Now that everything is assembled, all you are left to do is
                    just give the created resume a quick final view. Review the
                    information, revise the skills, proofread the content and
                    check the design elements. If everything fits, you are all
                    set to go. Otherwise, we help you with the re-edit as well.
                    You can edit information, rewrite the content, add sections,
                    remove details, change the template design, format the text
                    appearance, add your photograph, add links, and do all that
                    you want, our CV Builder shall assist you throughout
                  </p>
                </div>
                <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:bg-transparent bg-[#d3e9f4]">
                  <div className="flex justify-center items-center">
                    <img
                      src="/Step-27.png"
                      alt="icon4"
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
                  Get your CV downloaded in the form of a PDF or TXT file and
                  save it for future use. 
                </p>
              </div> */}
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
                      src="/Step-28.png"
                      alt="icon4"
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                </div>
                <div className="lg:w-[50%] w-full steps_content mt-10">
                  <h4 className="font-bold text-black text-2xl">
                    The Last Lap{" "}
                  </h4>
                  <h3 className="text-4xl text-black font-bold py-3">
                    Download your CV and you’re ready to fill out the
                    Applications
                  </h3>
                  <p className="text-base py-3">
                    The final step is to save the CV that you have created with
                    the help of your Resume builder. You can easily download the
                    created CV after carefully reviewing it. All you need to do
                    is select the format in which you seek to save your file.
                    Genies Career Hub offers you the option to either save your
                    CV in `PDF format or as a TXT file. The choice is yours!
                  </p>
                  <p className="text-base py-3">
                    Once you have followed all the aforementioned steps, you are
                    all set to go and apply for your desired job role. With a
                    complete CV, that is perfectly loomed to suit the job
                    description, you increase your chances of bagging an
                    interview by 67%. We make sure that this happens for you.
                    Get started on getting a lineup of interviews from your
                    hoped organisations
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
          <div className="inner_content flex flex-col lg:flex-row absolute top-20 md:top-40 left-1/2 transform -translate-x-1/2 max-w-7xl w-full px-4 md:px-8 gap-10">
            <div className="lg:w-[50%] w-full relative text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Why do you need our CV Creator to create your Resume?
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
              <p className="my-2 text-black text-base">
              In the end, it all boils down to why Genies Career Hub. Designed with an envisage to cater to your specific career needs, each service by the Genies Career Hub is yearned to make the challenging process of finding a job, switching profiles, choosing a career, developing professional skills, and so much more, a little easier for you. Our CV Creator follows the same vision. 
              </p>
              <p className="text-black my-3 text-base">
              Engineered to assist you create a CV that presents your job application with apt intent, our CV builder integrates Artificial Intelligence very carefully. The Genies Career Hub CV Creator not only offers you a selection of handpicked professional CV templates but also helps you with the customisable functionalities and constantly updated systems that comply with the modern global recruitment standards. We work on every little detail to ensure that your CV has no gaps! 
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
              <h2 className="text-3xl text-center text-bold font-semibold my-5">
                Frequently Asked Questions
              </h2>
              {faqData?.map((item, index) => (
                <AccordionItem
                  open={index === open}
                  key={index}
                  ques={item?.ques}
                  ans={parse(item?.ans)}
                  pathname={pathname}
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
