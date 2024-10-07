"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useUserStore } from "../store/UserStore";
import Image from "next/image";
import SearchBar from "../ui/Searchbar";
import { RiAiGenerate } from "react-icons/ri";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import JobMultistepForm from "@/components/component/JobMultistepForm";
import { toast } from "react-toastify";
import { useResumeStore } from "../store/ResumeStore";
import { useRouter } from "next/navigation";
import pdfToText from "react-pdftotext";
import { GetTokens } from "../actions";
import Lottie from "lottie-react";
import animation from "@/public/animations/JobCVLoader.json";
import CountUp from "react-countup";
import axios from "axios";
import { ResumeHeader } from "../Layout/ResumeHeader";
import Link from "next/link";
import ServicesPopUp from "@/components/component/ServicesPopUp";
import { Button } from "@/components/ui/button";

const options = [
  "Accountant",
  "Administrative Assistant",
  "Advertising Manager",
  "Aerospace Engineer",
  "Agricultural Engineer",
  "Architect",
  "Art Director",
  "Attorney",
  "Auditor",
  "Biochemist",
  "Biomedical Engineer",
  "Brand Manager",
  "Business Analyst",
  "Business Development Manager",
  "Chemical Engineer",
  "Civil Engineer",
  "Clinical Psychologist",
  "Computer Programmer",
  "Construction Manager",
  "Content Writer",
  "Copywriter",
  "Customer Service Representative",
  "Data Analyst",
  "Data Scientist",
  "Database Administrator",
  "Dental Hygienist",
  "Dentist",
  "Digital Marketing Specialist",
  "Electrical Engineer",
  "Environmental Engineer",
  "Event Planner",
  "Fashion Designer",
  "Financial Analyst",
  "Financial Manager",
  "Graphic Designer",
  "Healthcare Administrator",
  "Human Resources Manager",
  "Industrial Designer",
  "Industrial Engineer",
  "Information Security Analyst",
  "Information Technology Manager",
  "Insurance Agent",
  "Interior Designer",
  "Investment Banker",
  "Journalist",
  "Lawyer",
  "Logistics Manager",
  "Management Consultant",
  "Market Research Analyst",
  "Marketing Manager",
  "Mechanical Engineer",
  "Medical Assistant",
  "Medical Doctor",
  "Microbiologist",
  "Network Administrator",
  "Nurse",
  "Occupational Therapist",
  "Operations Manager",
  "Pharmacist",
  "Physical Therapist",
  "Physician Assistant",
  "Product Manager",
  "Project Manager",
  "Public Relations Specialist",
  "Real Estate Agent",
  "Registered Nurse",
  "Research Scientist",
  "Retail Manager",
  "Sales Manager",
  "Sales Representative",
  "School Teacher",
  "Software Developer",
  "Software Engineer",
  "Speech-Language Pathologist",
  "Statistician",
  "Supply Chain Manager",
  "Systems Analyst",
  "Tax Advisor",
  "Technical Support Specialist",
  "Training and Development Specialist",
  "Translator",
  "User Experience (UX) Designer",
  "Veterinarian",
  "Video Editor",
  "Web Developer",
  "Web Designer",
  "Writer",
  "Zoologist",
];

const jobTabs = [
  // ... (your jobTabs here)
];
import { usePathname } from "next/navigation";
import AccordionItem from "@/components/component/AccordionItem";
import parse from "html-react-parser";
const faqData = [
  {
    id: 1,
    ques: "What is the CV Match feature?",
    ans: `
      The unique concept of the Genies Career Hub’s CV Match feature is that it matches your job title or profession and prepares a <a href="https://www.geniescareerhub.com/resume" className="font-bold"> Professional Curriculum Vitae Templates</a>. We even provide you with the option to start afresh or upload an existing CV, which will be analysed with AI and prepare your resume. Our AI feature asks for your basic details like name, education, skills, etc in short, after AI analysis, it creates sentences and profile descriptions most professionally.
    `,
  },
  {
    id: 2,
    ques: "How is this CV Match different from CV Creator?",
    ans: `
    <ol>
        <li>1. CV Creators help make a new CV through a whole detailed process.</li>
        <li>2. CV Match makes a <a href="https://www.geniescareerhub.com/resume" className="font-bold">professional CV Builder</a> format template that asks for your basic information and prepares an entirely <a href="https://geniescareerhub.com/job-cv" className="font-bold">professional CV</a>.</li>
        <li>3. It matches your job description with our 45+ pre-made templates, filling in the best information professionally.</li>
    </ol>
    `,
  },
  {
    id: 3,
    ques: "How to get a pre-made Professional CV?",
    ans: `
    Follow these simple steps to get a pre-made <a href="https://geniescareerhub.com/job-cv" className="font-bold">professional CV</a>-
     <ol>
        <li>1. Head to CV Studio and click on CV Match.</li>
        <li>2. Enter your job role or profession, and click Generate Now.</li>
        <li>3. Upload your existing <a href="https://www.geniescareerhub.com/resume-analyzer" class="font-bold">resume formatting</a> or start afresh by making one.</li>
        <li>4. Enter your name, email, job role, city, and country.</li>
        <li>5. Add experience if you have any, or select the fresher box.</li>
        <li>6. Add your education, add any previous projects, and add your skills.</li>
        <li>7. Review your details generated professionally by AI, and make changes if needed.</li>
        <li>8. Choose from <a href="https://geniescareerhub.com/job-cv" className="font-bold">professional CV</a> templates and the colour of your choice.</li>
        <li>9. Download in text or PDF form.</li>
    </ol>
    `,
  },
  {
    id: 4,
    ques: "Can you achieve your dream job with CV Match?",
    ans: `
    CV Match is your helping hand that will help you get that job that you waited for forever. It will make your task more manageable if you struggle with the professional way of writing a CV that meets your employer’s requirements. Just filling in some vital information will do so and get that job to you.
    `,
  },
  {
    id: 5,
    ques: "What kind of professional CV templates are there in CV Match?",
    ans: `
    Our CV Match feature incorporates more than 23+ professional <a href="https://www.geniescareerhub.com/resume" class="font-bold">CV templates</a>. A few of them are mentioned below.
    1. Graphic Designer<br/>
Get a professional-approved and AI-analysed resume that is appealing and highlights the critical skills and roles for you. <br/><br/>

2. Electrical Engineer<br/>
Your electrical engineer CV will have all the technical skills that you want like automation, circuit design etc. with the experience of using tools that you have.<br/><br/>

3. Registered Nurse<br/>
Get detailed nurse <a href="https://geniescareerhub.com/job-cv" className="font-bold">professional resume examples</a> with experience in clinical, and patient care skills, and specifications in the healthcare sector.<br/><br/>

4. Project Manager<br/>
We have CVs matching your profile of project manager’s management skills, leadership, experience and projects customisable by you. As a project manager, we showcase your risk managing, stakeholding and budgeting skills to attract recruiters.<br/><br/> 

5. Chartered Accountant<br/>
For a profile like a chartered accountant, we make sure the key qualifications like certifications, auditing, tax planning etc are being shown along with technical skills and experience.<br/><br/>

6. Teacher<br/>
A profile that is very common and has an important role in our lives is of a teacher. We make sure we talk effectively about your teaching experiences, planning of lessons, student development strategies, classroom management and use of educational technologies.<br/><br/>

And we have many more options in the types of CV that you might get matched too. Check out the CV Match tool and get started! 

    `,
  },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [jobRole, setJobRole] = useState("");
  const userState = useUserStore((state) => state.userState);
  const [showDialog, setShowDialog] = useState(false);
  const [showMultiStepDialog, setShowMultiStepDialog] = useState(false);
  const [steps, setSteps] = useState(1);
  const inputRef = useRef();
  const { userdata } = useUserStore((state) => state.userState);
  const initialState = {
    fullname: userdata?.fullname || "",
    email: userdata?.email || "",
    jobTitle: "",
    country: "",
    city: "",
    isFresher: false,
    experience: [],
    skills: [],
    education: [],
    projects: [],
  };
  const replaceResumeData = useResumeStore((state) => state.replaceResumeData);
  const router = useRouter();
  const updateUserData = useUserStore((state) => state.updateUserData);
  const [generatingResume, setIsGeneratingResume] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsGeneratingResume(false);
  };

  const fetchBetterResume = async (message, accessToken) => {
    message = message + `generate resume for this ${jobRole}`;
    try {
      const response = await axios.post(
        "/api/generateMultiStepFeedback",
        { message, type: "JobCV" },
        {
          headers: {
            Authorization: "Bearer " + accessToken.value,
          },
        }
      );
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 403) {
        if (error.response.data.error === "Insufficient JobCV tokens") {
          if (userdata.subscription.plan.includes("CVSTUDIO")) {
            return setIsServiceDialogOpen(true);
          } else {
            toast.info(
              "Please subscribe to Genies Pro Suit to use this service",
              { autoClose: 10000 }
            );
            return router.push("/pricing?scroll=1");
          }
        } else {
          toast.info("You do not have a valid plan.", { autoclose: 10000 });
          return router.push("/pricing?scroll=1");
        }
      }
      toast.error("Unable to generate your CV.");
    }
  };

  const handleuploadResume = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile.type !== "application/pdf")
      return toast.error("Please select a valid PDF file");
    let reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    setShowDialog(false);
    reader.onloadend = async () => {
      try {
        const text = await pdfToText(selectedFile);
        if (!text) {
          toast.error("Non ATS friendly resume found");
          return;
        }
        setIsGeneratingResume(true);
        const { accessToken } = await GetTokens();
        if (!accessToken) {
          router.push("/login?redirect=/job-cv");
          return;
        }
        const response = await fetchBetterResume(text, accessToken);
        if (response?.data && response?.userdata) {
          replaceResumeData(response?.data);
          updateUserData(response?.userdata);
          return router.push("/resume-builder");
        }
      } catch (error) {
        console.log(error);
        toast.error("Unable to generate your CV");
      } finally {
        setIsGeneratingResume(false);
      }
    };
  };

  const handleCloseMultistepForm = () => {
    setShowMultiStepDialog(false);
    setFormData({
      fullname: userdata?.fullname || "",
      email: userdata?.email || "",
      jobTitle: "",
      country: "",
      city: "",
      isFresher: false,
      experience: [],
      skills: [],
      education: [],
      projects: [],
    });
  };

  const handleGenerateNow = async () => {
    if (!jobRole) {
      return toast.error("Please select a job role");
    }
    const { accessToken } = await GetTokens();
    if (!accessToken) {
      router.push("/login?redirect=/job-cv");
      return;
    }
    setShowDialog(true);
  };

  const handleOpenMultiStepForm = () => {
    setShowMultiStepDialog(true);
    setShowDialog(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };
  return (
    <main>
      <>
        <ResumeHeader />
        <section className="mt-16 py-20 bg-white text-black">
          <Dialog open={showMultiStepDialog}>
            <JobMultistepForm
              showMultiStepDialog={showMultiStepDialog}
              handleCloseMultistepForm={handleCloseMultistepForm}
              steps={steps}
              setSteps={setSteps}
              formData={formData}
              setFormData={setFormData}
              jobRole={jobRole}
              type={"JobCV"}
              setIsServiceDialogOpen={setIsServiceDialogOpen}
            />
          </Dialog>
          <Dialog open={showDialog}>
            <DialogContent
              className="max-w-[92dvw] md:max-w-[60dvw] sm:max-w-[60dvw] p-0 rounded-xl"
              showCloseButton={true}
              onClick={() => setShowDialog(false)}
            >
              <h1 className="text-center pt-4 text-xl font-bold text-gray-500">
                Upload and attach files, or start afresh!
              </h1>
              <p className="text-center px-6 md:px-12 sm:px-12 text-gray-500">
                Drag and drop your resume file or upload from Google Drive or
                Dropbox. We can also send you an email to reply with your
                attachment whenever you are ready.
              </p>
              <div className="flex w-full flex-col md:flex-row sm:flex-row gap-8 bg-gradient-to-r bg-white p-6 rounded-xl justify-around">
                <div className="flex items-center justify-center w-[100%] md:w-[100%] sm:w-[50%]">
                  <label
                    for="dropzone-file"
                    className="flex flex-col items-center justify-center w-full sm:h-64 h-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleuploadResume}
                    />
                  </label>
                </div>
                <div
                  className="flex flex-col justify-center items-center  w-[100%] md:w-[100%] sm:w-[50%]  cursor-pointer border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  onClick={handleOpenMultiStepForm}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m0 0-3-3m3 3 3-3M4 12h16m0 0-3 3m3-3-3-3"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Start with Afresh...
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      Personalized career advice, CV building, and more.
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={generatingResume}>
            <DialogContent onClick={handleDialogClose}>
              <div className="mx-auto flex items-center flex-col">
                <Lottie
                  animationData={animation}
                  className="w-[300px] h-[300px]"
                />
                <p className="mt-1">Preparing your CV</p>
              </div>
            </DialogContent>
          </Dialog>
          <div className="max-w-[100rem] mx-auto flex flex-col lg:flex-row justify-center items-center px-4 lg:px-36">
            <div className="flex flex-col items-center lg:items-start">
              <h1
                className="font-extrabold text-[2rem] md:text-[3rem] lg:pe-20 mb-6 text-center lg:text-left"
                style={{ lineHeight: "1.3 !important" }}
              >
                Build a <span className="text-blue-900">CV</span> that opens
                doors to your ideal{" "}
                <span className="text-blue-900">career!</span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-2 py-3 rounded-lg w-full">
                <div className="w-full sm:px-0 px-4 mb-4 sm:mb-0">
                  <SearchBar
                    jobRole={jobRole}
                    setJobRole={setJobRole}
                    options={options}
                  />
                </div>
                <div className="w-full flex items-center">
                  <Dialog open={isServiceDialogOpen}>
                    <ServicesPopUp
                      isServiceDialogOpen={isServiceDialogOpen}
                      setIsServiceDialogOpen={setIsServiceDialogOpen}
                      serviceName="Create CV"
                    />
                  </Dialog>
                  <button
                    className="bg-blue-900 text-white px-5 py-2 rounded-lg flex items-center gap-2 mx-auto text-sm"
                    onClick={() => handleGenerateNow()}
                  >
                    Generate Now{" "}
                    <RiAiGenerate className="text-base font-bold" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-10 sm:mt-0 w-full lg:max-w-4xl sm:p-10 p-0">
              <Image
                priority
                src="/cvgenerator.png"
                width={1300}
                height={700}
                alt="Job CV"
                className="w-full lg:max-w-4xl"
                style={{ height: "auto", width: "100%", maxHeight: "30rem" }}
              />
            </div>
          </div>
        </section>
        <section>
          <div className="container mx-auto py-12 px-4  ">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 items-center bg-[#f5f5f5] p-6 lg:p-12 rounded-3xl">
              <div className="text-center md:text-left ">
                <h2
                  className="text-2xl md:text-[2rem] font-bold mb-6"
                  style={{ lineHeight: "1.3 !important" }}
                >
                  Connect with a
                  <span className="text-blue-900"> Career Coach </span>for
                  Expert Advice, Anytime, Anywhere!
                </h2>
                <button className="bg-blue-900 text-white px-4 py-2 rounded text-sm">
                  <Link href="/contact-us">Work With Coach</Link>
                </button>
              </div>
              <div className="flex flex-col sm:flex-col md:flex-row justify-around items-center bg-white p-4 lg:p-8 rounded-3xl gap-5">
                <div className="text-2xl font-bold text-black mb-6 md:mb-0 text-center">
                  <CountUp start={1} end={200} duration={2} />+
                  <p className="text-lg font-semibold">Templates</p>
                </div>

                <div className="text-2xl font-bold text-black mb-6 md:mb-0 text-center">
                  <CountUp start={1} end={40} duration={2} />
                  k+
                  <p className="text-lg font-semibold">Users</p>
                </div>

                <div className="text-2xl font-bold text-black text-center">
                  <CountUp start={1} end={50} duration={2} />+
                  <p className="text-lg font-semibold">Coaches</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* START-NEW STEPS CONTENT */}
        {/* ***********************NEW SECTION START *****************/}
        <div id="mainDiv" className="w-full bg-white">
          <section>
            <div className="steps_main_section max-w-7xl mx-auto relative lg:p-0 p-10 ">
              <div className="flex flex-col items-center justify-center text-center px-4 lg:px-20 xl:px-10 2xl:px-10">
                <h2 className="text-4xl lg:text-5xl font-bold mb-2 text-[#101827] w-full md:pt-20 lg:pt-20 xl:pt-20 2xl:pt-20">
                  Get a <span className="text-[#2C98CA]">Professional CV</span>{" "}
                  for Your
                </h2>
                <h2 className="text-4xl lg:text-5xl font-bold mb-2 text-gray-900 w-full pt-2 md:pb-20 lg:pb-20 xl:pb-20 2xl:pb-20">
                  Job Description
                </h2>
              </div>
            </div>

            <div className="max-w-7xl mx-auto steps_intro lg:py-0 sm:p-5 p-5">
              {/* START-FIRST SECTION */}
              <div className="grid grid-col-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-14">
                <div className="bg-[#FFFCDC] p-7">
                  <h1 className="text-[#2C98CA] text-lg font-semibold">
                    Pre-written content
                  </h1>
                  <p className="text-base pt-3 text-[#1B1B1F]">
                    Get the help of our new feature that has pre-made resumes
                    for different jobs around the world.
                  </p>
                  <p className="text-base pt-3 text-[#1B1B1F]">
                    Just select the resume that matches the description of your
                    job profile. Fill in some needed details and it&apos;s made.
                  </p>
                </div>
                <div className="bg-[#ECFFE7] p-7">
                  <h1 className="text-[#2C98CA] text-lg font-semibold">
                    Professional CV made 
                  </h1>
                  <p className="text-base pt-3 text-[#1B1B1F]">
                    Do you have doubts if the CV will turn out to be
                    professional or not?
                  </p>
                  <p className="text-base pt-3 text-[#1B1B1F]">
                    Do not think twice with our all-new feature of CV Match with
                    which you can select the related resume to your job profile
                    and go ahead with it. 
                  </p>
                </div>
                <div className="bg-[#CEEFFF] p-5">
                  <h1 className="text-[#2C98CA] text-lg font-semibold">
                    45+ pre-made resumes 
                  </h1>
                  <p className="text-base pt-3 text-[#1B1B1F]">
                    Out of all the jobs around the world, these are some
                    pre-made 45+ resumes of some selected job descriptions. The
                    jobs are from around the world of different job profiles.
                    Select your resume matching your job description and get a
                    pre-made{" "}
                    <Link href="/job-cv" className="font-bold">
                      {" "}
                      professional CV
                    </Link>{" "}
                    for yourself.
                  </p>
                </div>
              </div>
              <div className="max-w-7xl mx-auto mt-12">
                <div className="flex flex-row w-[100%]">
                  <div className="w-[0%] sm:w-[16%] md:w-[16%] lg:w-[16%] xl:w-[16%] 2xl:w-[16%]"></div>
                  <div className="w-[100%] sm:w-[68%] md:w-[68%] lg:w-[68%] xl:w-[68%] 2xl:w-[68%]">
                    <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-14">
                      <div className="bg-[#FFD9ED] p-5">
                        <h1 className="text-[#2C98CA] text-lg font-semibold">
                          AI and expert-approved profile description
                        </h1>
                        <p className="text-base pt-3 text-[#1B1B1F]">
                          Use our special feature of generating resume content
                          with AI and professional insights. Just fill in some
                          basic information like Job role, upload or start
                          afresh by forming a new CV, fill in the previous
                          projects if any and skills. After optimising it with
                          AI, the CV Match prepares a{" "}
                          <Link href="/job-cv" className="font-bold">
                            professional curriculum vitae
                          </Link>{" "}
                          of the same job role or title by modifying the
                          information professionally. 
                        </p>
                      </div>
                      <div className="bg-[#D8DAFF] p-7">
                        <h1 className="text-[#2C98CA] text-lg font-semibold">
                          CV edit information
                        </h1>
                        <p className="text-base pt-3 text-[#1B1B1F]">
                          After the customised CV with your information appears,
                          review the details and make changes if any.
                        </p>
                        <p className="text-base pt-3 text-[#1B1B1F]">
                          Then select your desired template colour and design
                          from our 25 different template designs. At last,
                          download your CV in text or PDF form. 
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[0%] sm:w-[16%] md:w-[16%] lg:w-[16%] xl:w-[16%] 2xl:w-[16%]"></div>
                </div>
              </div>
              {/* END-FIRST SECTION */}

              {/* START-SECOND SECTION */}
              <div className="flex lg:flex-row flex-col gap-5 my-20">
                <div className="lg:w-[67%] w-full steps_content">
                  <h3 className="text-5xl text-[#1B1B1F] font-bold py-3 text-center md:text-left lg:text-left xl:text-left 2xl:text-left leading-normal">
                    Stand Out and Personalize Your CV for The Best Impact
                  </h3>
                  <p className="text-lg py-3 pl-0 md:pl-6 lg:pl-6 xl:pl-6 2xl:pl-0 text-center md:text-left lg:text-left xl:text-left 2xl:text-left text-[#1B1B1F]">
                    6 simple steps to best{" "}
                    <Link href="/job-cv" className="font-bold">
                      {" "}
                      professional CV
                    </Link>
                    -
                  </p>
                </div>
                <div className="lg:w-[33%] w-full h-auto">
                  <div className="flex flex-row justify-between items-baseline">
                    <div>
                      <img
                        src="/stand_out_and_personalize_your_cv.png"
                        alt="icon4"
                        className="w-full h-full  object-contain"
                      />
                    </div>
                    <div className="pb-10">
                      <img
                        src="/Artboard_ats.png"
                        alt="icon4"
                        className="w-full h-full  object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* END-SECOND SECTION */}

              <div className="step_1">
                <div className="flex lg:flex-row flex-col gap-10 my-20 relative lg:p-1 p-5">
                  <div className="lg:w-[55%] w-full steps_content">
                    <h4 className="font-bold text-[#101827] text-2xl italic">
                      Step 1
                    </h4>
                    <p className="text-base py-3 text-[#1B1B1F]">
                      Go to the CV Match page for pre-made CVs. Enter your job
                      role or profession and click on Generate Now. 
                      <br />
                      This step is to get an idea of what job role you want your
                      pre-made CV for.
                    </p>
                  </div>
                  <div className="lg:w-[45%] w-full h-auto image_content flex flex-col justify-start items-center">
                    {/* <img
                      src="Artboard_ats.png"
                      alt="icon4"
                      className="object-contain mr-32"
                    /> */}
                    <div className="flex lg:flex-row flex-col justify-center items-center">
                      <img
                        src="CV_MATCH_Step 1.png"
                        alt="icon4"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="arrow absolute left-[38%] -bottom-40">
                    <img
                      src="/ats_step_arrow_1.png"
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
              {/*START-STEP-2 FOR MOBILE ONLY  */}
              <div className=" block sm:block md:block lg:hidden xl:hidden 2xl:hidden step_2 relative mt-20">
                <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                  <div className="lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent ">
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src="/CV_MATCH_Step 2.png"
                        alt="icon4"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:w-[50%] w-full steps_content mt-10">
                    <h4 className="font-bold text-[#101827] text-2xl italic">
                      Step 2
                    </h4>

                    <p className="text-base py-3 text-[#1B1B1F]">
                      Upload your existing resume. Select a resume and upload
                      its PDF.  This step will analyse the PDF and the details
                      will be filled accordingly.
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#2C98CA]">Or</p>
                </div>
                <div className="flex lg:flex-row flex-col gap-10  lg:p-1 p-5">
                  <div className="lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent ">
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src="/CV_MATCH_Step 2.1.png"
                        alt="icon4"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:w-[50%] w-full steps_content mt-10">
                    <p className="text-base py-3 text-[#1B1B1F]">
                      Start afresh by making a CV for yourself. Just fill in
                      basic details like your name, email, job role, city and
                      country.  This information will help build your{" "}
                      <Link href="/job-cv" className="font-bold">
                        {" "}
                        professional CV
                      </Link>{" "}
                      with professional insights and artificial intelligence.
                    </p>
                  </div>
                </div>

                <div className="arrow absolute left-[35%] -bottom-45">
                  <img
                    src="/ats_step_arrow_2.png"
                    alt="arrow"
                    className="w-52 h-52 object-contain"
                  />
                </div>
              </div>
              {/*END-STEP-2 FOR MOBILE ONLY  */}
              {/*START-STEP-2 FOR SM MD LG XL 2XL SCREENS  */}
              <div className="hidden sm:hidden md:hidden lg:block xl:block 2xl:block step_2 relative mt-32 mb-32">
                <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                  <div className="lg:w-[40%] w-full steps_content mt-10">
                    <h4 className="font-bold text-[#101827] text-2xl italic">
                      Step 2
                    </h4>
                    <p className="text-base py-3 text-[#1B1B1F] ">
                      Upload your existing resume. Select a resume and upload
                      its PDF.  This step will analyse the PDF and the details
                      will be filled accordingly.
                    </p>
                  </div>
                  <div className="lg:w-[10%] w-full ">
                    <p className="text-2xl font-bold text-[#2C98CA] mt-20 text-center">
                      Or
                    </p>
                  </div>
                  <div className="lg:w-[40%] w-full steps_content mt-10">
                    <p className="text-base py-3 text-[#1B1B1F]">
                      Start afresh by making a CV for yourself. Just fill in
                      basic details like your name, email, job role, city and
                      country.  This information will help build your
                      <Link href="/job-cv" className="font-bold">
                        {" "}
                        professional CV
                      </Link>{" "}
                      with professional insights and artificial intelligence.
                    </p>
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-10  lg:p-1 p-5">
                  <div className="lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent ">
                    ``
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src="/CV_MATCH_Step 2.png"
                        alt="icon4"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent ">
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src="/CV_MATCH_Step 2.1.png"
                        alt="icon4"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="arrow absolute left-[35%] -bottom-35">
                  <img
                    src="/ats_step_arrow_2.png"
                    alt="arrow"
                    className="w-52 h-52 object-contain"
                  />
                </div>
              </div>
              {/*END-STEP-2 FOR SM MD LG XL 2XL SCREENS  */}
              <div className="step_3 relative mt-30">
                <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                  <div className="lg:w-[50%] w-full steps_content mt-10">
                    <h4 className="font-bold text-[#101827] text-2xl italic">
                      Step 3
                    </h4>
                    {/* <h3 className="text-3xl text-black  py-3">EDUCATION </h3> */}
                    <p className="text-base py-3 text-[#1B1B1F]">
                      Are you a fresher? Have no experience? Do not worry. Click
                      on the box and move ahead.
                      <br />
                      Have an experience? Then go ahead and fill in your
                      experience details.  These details will help build
                      <Link href="/job-cv" className="font-bold">
                        {" "}
                        Professional curriculum vitae
                      </Link>{" "}
                      and help get the best jobs.
                    </p>
                  </div>
                  <div className="lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:bg-transparent">
                    <div className="flex justify-center items-center">
                      <img
                        src="/CV_MATCH_Step 3.png"
                        alt="icon4"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="arrow absolute left-[33%] -bottom-40">
                  <img
                    src="/ats_step_arrow_1.png"
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
                  <div className="lg:w-[40%] w-full h-auto image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent">
                    <div className="flex justify-center items-center">
                      <img
                        src="/CV_MATCH_Step 4.png"
                        alt="icon4"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:w-[60%] w-full steps_content mt-16">
                    <h4 className="font-bold text-[#101827] text-2xl italic">
                      Step 4
                    </h4>
                    {/* <h3 className="text-3xl text-black  py-3">EXPERIENCE </h3> */}
                    <p className="text-base py-3 text-[#1B1B1F]">
                      The basic information of your education must be filled in
                      the next step. Just fill in your school or university
                      name, course and time duration of the course. The
                      employers will review your education status which will
                      help you get better deserving jobs. 
                    </p>
                  </div>
                </div>

                <div className="arrow absolute left-[30%] -bottom-40">
                  <img
                    src="/ats_step_arrow_5.png"
                    alt="arrow"
                    className="w-52 h-52 object-contain lg:block hidden"
                  />
                  <img
                    src="/ats_step_arrow_2.png"
                    alt="arrow"
                    className="w-52 h-52 object-contain lg:hidden block"
                  />
                </div>
              </div>

              {/*START-STEP-5 FOR SM MD LG XL 2XL SCREENS  */}
              <div className="block sm:block md:block lg:block xl:block 2xl:block step_2 relative mt-32">
                <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                  <div className="lg:w-[100%] w-full steps_content mt-10">
                    <h4 className="font-bold text-[#101827] text-2xl italic">
                      Step 5
                    </h4>
                    <p className="text-base py-3 text-[#1B1B1F] ">
                      Adding your previous projects will give a clear picture to
                      the employer of the different projects that you worked on
                      in the past. These are reviewed by the recruiters and help
                      you get jobs if projects match their interests
                    </p>
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-10  lg:p-1 p-5">
                  <div className="lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent ">
                    ``
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src="/CV_MATCH_Step 5.png"
                        alt="icon4"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent ">
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src="/CV_MATCH_Step 5.1.png"
                        alt="icon4"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="arrow absolute left-[35%] -bottom-30 md:left-[58%] lg:left-[58%] xl:left-[58%] 2xl:left-[58%]">
                  <img
                    src="/ats_step_arrow_2.png"
                    alt="arrow"
                    className="w-52 h-52 object-contain"
                  />
                </div>
              </div>
              {/*END-STEP-5 FOR SM MD LG XL 2XL SCREENS  */}
              <div className="step_6 relative">
                <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                  <div className="lg:w-[50%] w-full h-auto image_content flex justify-center  lg:order-first order-last lg:bg-transparent">
                    <div className="flex flex-col gap-10 justify-start  mt-10">
                      <img
                        src="/CV_MATCH_Step 6.png"
                        alt="icon5"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:w-[50%] w-full steps_content pt-20">
                    <h4 className="font-bold text-black text-2xl italic">
                      Step 6
                    </h4>
                    {/* <h3 className="text-3xl text-black  py-3">
                      AWARDS, CERTIFICATES AND LANGUAGE
                    </h3> */}
                    <p className="text-base py-3">
                      After filling in all the required details, your
                      <Link href="/job-cv" className="font-bold">
                        {" "}
                        professional CV
                      </Link>{" "}
                      will be presented. Review the information made with AI and
                      add changes according to your needs.  Change the colour
                      and template designs from professional resume examples.
                      Download once completed.
                    </p>
                  </div>
                </div>
                {/* <div className="arrow absolute left-[35%] -bottom-40">
                    <img
                      src="/arrow2.png"
                      alt="arrow"
                      className="w-52 h-52 object-contain"
                    />
                  </div> */}
              </div>
            </div>
          </section>
        </div>
        {/* NEW SECTION END */}

        {/* START-FAQS */}
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
        {/* END-FAQS */}

        {/* END-NEW STEPS CONTENT  */}
      </>
    </main>
  );
}
