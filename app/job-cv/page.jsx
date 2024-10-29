/** @format */

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
        name: "CV Creators",
        item: "https://www.geniescareerhub.com/job-cv",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Professional CV",
        item: "https://www.geniescareerhub.com/job-cv",
      },
    ],
  };

  const jsonLd2 = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the CV Match feature?",
        acceptedAnswer: {
          "@type": "Answer",
          text: 'The unique concept of the Genies Career Hub&rsquo;s CV Match feature is that it matches your job title or profession and prepares a <strong>Professional </strong><a href="https://www.geniescareerhub.com/resume"><strong>Curriculum Vitae Templates</strong></a>. We offer the option to start afresh or upload an existing CV, which will be analysed using AI to optimise and prepare your resume. Our AI feature asks for your basic details like name, education, skills, etc in short, after AI analysis, it creates sentences and profile descriptions most professionally.',
        },
      },
      {
        "@type": "Question",
        name: "How is this CV Match different from CV Creator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `<p>The below-mentioned points state the differences precisely-</p>
  <ol>
  <li>CV Creator helps make a new CV through a whole comprehensive process.</li>
  <li>CV Match makes a <strong>professional </strong><a href=\"https://www.geniescareerhub.com/resume\"><strong>CV Builder</strong></a> format template that asks for your primary information and prepares an entirely <a href=\"https://geniescareerhub.com/job-cv\"><strong>professional CV</strong></a>.</li>
  <li>It matches your job description with our 45+ pre-made templates, filling in the adequate information professionally.</li>
  </ol>`,
        },
      },
      {
        "@type": "Question",
        name: "How to get a pre-made Professional CV?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `<p>Follow these steps progressively to get a pre-made <a href=\"https://geniescareerhub.com/job-cv\"><strong>professional CV</strong></a>-</p>
  <ul>
  <li>1. Head to CV Studio and click on CV Match.</li>
  <li>2. Enter your job role or profession, and click Generate Now.</li>
  <li>3. Upload your existing <a href=\"https://www.geniescareerhub.com/resume-analyzer\">resume formatting</a> or start afresh by making one.</li>
  <li>4. Enter your name, email, job role, city, and country.</li>
  <li>5. Add experience if you have any, or select the fresher box.</li>
  <li>6. Add your education, add any previous projects, and add your skills.</li>
  <li>7. Review your details generated professionally by AI, and make changes if needed.</li>
  <li>8. Choose from <strong>professional CV</strong> templates and the colour of your choice.</li>
  <li>9. Download in text or PDF form.</li>
  </ul>`,
        },
      },
    ],
  };

  return (
    <main>
      <>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd1) }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd2) }}
        />
        <ResumeHeader />
        <section className='mt-16 py-20 bg-white text-black'>
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
              className='max-w-[92dvw] md:max-w-[60dvw] sm:max-w-[60dvw] p-0 rounded-xl'
              showCloseButton={true}
              onClick={() => setShowDialog(false)}>
              <h3 className='text-center pt-4 text-xl font-bold text-gray-500'>
                Upload and attach files, or start afresh!
              </h3>
              <p className='text-center px-6 md:px-12 sm:px-12 text-gray-500'>
                Drag and drop your resume file or upload from Google Drive or
                Dropbox. We can also send you an email to reply with your
                attachment whenever you are ready.
              </p>
              <div className='flex w-full flex-col md:flex-row sm:flex-row gap-8 bg-gradient-to-r bg-white p-6 rounded-xl justify-around'>
                <div className='flex items-center justify-center w-[100%] md:w-[100%] sm:w-[50%]'>
                  <label
                    htmlFor='dropzone-file'
                    className='flex flex-col items-center justify-center w-full sm:h-64 h-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50'>
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                      <svg
                        className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 16'>
                        <path
                          stroke='currentColor'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                        />
                      </svg>
                      <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                        <span className='font-semibold'>Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        PDF
                      </p>
                    </div>
                    <input
                      id='dropzone-file'
                      type='file'
                      className='hidden'
                      onChange={handleuploadResume}
                    />
                  </label>
                </div>
                <div
                  className='flex flex-col justify-center items-center  w-[100%] md:w-[100%] sm:w-[50%]  cursor-pointer border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                  onClick={handleOpenMultiStepForm}>
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <svg
                      className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'>
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 4v16m0 0-3-3m3 3 3-3M4 12h16m0 0-3 3m3-3-3-3'
                      />
                    </svg>
                    <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                      <span className='font-semibold'>Start Afresh...</span>
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400 text-center'>
                      Personalized career advice, CV building, and more.
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={generatingResume}>
            <DialogContent onClick={handleDialogClose}>
              <div className='mx-auto flex items-center flex-col'>
                <Lottie
                  animationData={animation}
                  className='w-[300px] h-[300px]'
                />
                <p className='mt-1'>Preparing your CV</p>
              </div>
            </DialogContent>
          </Dialog>
          <div className='max-w-[100rem] mx-auto flex flex-col lg:flex-row justify-center items-center px-4 lg:px-36'>
            <div className='flex flex-col items-center lg:items-start'>
              <h1
                className='font-extrabold text-[2rem] md:text-[3rem] lg:pe-20 mb-6 text-center lg:text-left'
                style={{ lineHeight: "1.3 !important" }}>
                Build a <span className='text-blue-900'>CV</span> that opens
                doors to your ideal{" "}
                <span className='text-blue-900'>career!</span>
              </h1>
              <div className='flex flex-col sm:flex-row gap-2 py-3 rounded-lg w-full'>
                <div className='w-full sm:px-0 px-4 mb-4 sm:mb-0'>
                  <SearchBar
                    jobRole={jobRole}
                    setJobRole={setJobRole}
                    options={options}
                  />
                </div>
                <div className='w-full flex items-center'>
                  <Dialog open={isServiceDialogOpen}>
                    <ServicesPopUp
                      isServiceDialogOpen={isServiceDialogOpen}
                      setIsServiceDialogOpen={setIsServiceDialogOpen}
                      serviceName='Create CV'
                    />
                  </Dialog>
                  <button
                    className='bg-blue-900 text-white px-5 py-2 rounded-lg flex items-center gap-2 mx-auto text-sm'
                    onClick={() => handleGenerateNow()}>
                    Generate Now{" "}
                    <RiAiGenerate className='text-base font-bold' />
                  </button>
                </div>
              </div>
            </div>
            <div className='mt-10 sm:mt-0 w-full lg:max-w-4xl sm:p-10 p-0'>
              <Image
                priority
                src='/cvgenerator.png'
                width={1300}
                height={700}
                alt='Job CV'
                className='w-full lg:max-w-4xl'
                style={{ height: "auto", width: "100%", maxHeight: "30rem" }}
              />
            </div>
          </div>
        </section>
        <section>
          <div className='container mx-auto py-12 px-4  '>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 items-center bg-[#f5f5f5] p-6 lg:p-12 rounded-3xl'>
              <div className='text-center md:text-left '>
                <h2
                  className='text-2xl md:text-[2rem] font-bold mb-6'
                  style={{ lineHeight: "1.3 !important" }}>
                  Connect with a
                  <span className='text-blue-900'> Career Coach </span>for
                  Expert Advice, Anytime, Anywhere!
                </h2>
                <button className='bg-blue-900 text-white px-4 py-2 rounded text-sm'>
                  <Link href='/contact-us'>Work With Coach</Link>
                </button>
              </div>
              <div className='flex flex-col sm:flex-col md:flex-row justify-around items-center bg-white p-4 lg:p-8 rounded-3xl gap-5'>
                <div className='text-2xl font-bold text-black mb-6 md:mb-0 text-center'>
                  <CountUp start={1} end={200} duration={2} />+
                  <p className='text-lg font-semibold'>Templates</p>
                </div>

                <div className='text-2xl font-bold text-black mb-6 md:mb-0 text-center'>
                  <CountUp start={1} end={40} duration={2} />
                  k+
                  <p className='text-lg font-semibold'>Users</p>
                </div>

                <div className='text-2xl font-bold text-black text-center'>
                  <CountUp start={1} end={50} duration={2} />+
                  <p className='text-lg font-semibold'>Coaches</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* START-NEW STEPS CONTENT */}
        {/* ***********************NEW SECTION START *****************/}
        <div id='mainDiv' className='w-full bg-white'>
          <section>
            <div className='steps_main_section max-w-7xl mx-auto relative lg:p-0 p-10 '>
              <div className='flex flex-col items-center justify-center text-center px-4 lg:px-20 xl:px-10 2xl:px-10'>
                <h2 className='text-4xl lg:text-5xl font-bold mb-2 text-[#101827] w-full md:pt-20 lg:pt-20 xl:pt-20 2xl:pt-20'>
                  Find your{" "}
                  <span className='text-[#2C98CA]'>Professional CV</span>{" "}
                </h2>
                <h2 className='text-4xl lg:text-5xl font-bold mb-2 text-gray-900 w-full pt-2 md:pb-20 lg:pb-20 xl:pb-20 2xl:pb-20'>
                  in Six Simple Steps!
                </h2>
              </div>
            </div>

            <div className='max-w-7xl mx-auto steps_intro lg:py-0 sm:p-5 p-5'>
              {/* START-FIRST SECTION */}
              <div className='grid grid-col-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-14'>
                <div className='bg-[#FFFCDC] p-7'>
                  <h2 className='text-[#2C98CA] text-lg font-semibold'>
                    Pre-written content
                  </h2>
                  <p className='text-base pt-3 text-[#1B1B1F]'>
                    Our database has numerous pre-written resumes tailored to
                    distinctive job descriptions, recruitment requirements, and
                    candidate capabilities. All you need to do is select the
                    resume that resonates with your <b>professional</b> profile
                    and job description. Just alter and add in little details to
                    get a more personalised <b>CV</b>.
                  </p>
                </div>
                <div className='bg-[#ECFFE7] p-7'>
                  <h2 className='text-[#2C98CA] text-lg font-semibold'>
                    Professional CV ensured
                  </h2>
                  <p className='text-base pt-3 text-[#1B1B1F]'>
                    Wondering how appropriate and impressive the pre-written
                    resumes are?
                  </p>
                  <p className='text-base pt-3 text-[#1B1B1F]'>
                    CV Match is an algorithm backed by data created by experts
                    and resume professionals from across the globe. The CVs that
                    we have in stock for you are not only compatible with
                    recruitment management systems but also are completely
                    constructed to match the needs of candidates. This is why we
                    match you with the best CV for your profile!  
                  </p>
                </div>
                <div className='bg-[#CEEFFF] p-5'>
                  <h2 className='text-[#2C98CA] text-lg font-semibold'>
                    45+ pre-written Resumes
                  </h2>
                  <p className='text-base pt-3 text-[#1B1B1F]'>
                    The CV match database is designed to help you get matched
                    with your perfect resume. To ensure this, we have myriad
                    options available for you. With more than 45+ pre-written
                    templates of resumes, our CV matching system caters to
                    different job profiles and descriptions. Does not matter if
                    you are an art teacher or a software engineer, CV Match has
                    something or the other in store for you
                  </p>
                </div>
              </div>
              <div className='max-w-7xl mx-auto mt-12'>
                <div className='flex flex-row w-[100%]'>
                  <div className='w-[0%] sm:w-[16%] md:w-[16%] lg:w-[16%] xl:w-[16%] 2xl:w-[16%]'></div>
                  <div className='w-[100%] sm:w-[68%] md:w-[68%] lg:w-[68%] xl:w-[68%] 2xl:w-[68%]'>
                    <div className='grid grid-col-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-14'>
                      <div className='bg-[#FFD9ED] p-5'>
                        <h2 className='text-[#2C98CA] text-lg font-semibold'>
                          AI expertise integrated
                        </h2>
                        <p className='text-base pt-3 text-[#1B1B1F]'>
                          We make the process easier for you with the help of
                          Artificial Intelligence. We understand how tiresome
                          and time-consuming the process of CV building can be.
                          Therefore, we have simplified the process with the
                          help of a CV-matching algorithm. You just need to
                          input relevant details pertaining to your professional
                          alignment and job description and we create a resume
                          for you that exactly fits your needs.
                        </p>
                      </div>
                      <div className='bg-[#D8DAFF] p-7'>
                        <h2 className='text-[#2C98CA] text-lg font-semibold'>
                          Edit your CV the way you want
                        </h2>
                        <p className='text-base pt-3 text-[#1B1B1F]'>
                          We completely comprehend the need for a personalised
                          resume. This is why we ensure that every step in your
                          CV creation process allows flexibility. After we match
                          you to the most appropriate resume from our database,
                          you can choose to edit the information. You can edit
                          details, eliminate sections, redesign the template,
                          and do everything you want before finally downloading
                          it. You can revamp your resume in ways you want
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='w-[0%] sm:w-[16%] md:w-[16%] lg:w-[16%] xl:w-[16%] 2xl:w-[16%]'></div>
                </div>
              </div>
              {/* END-FIRST SECTION */}

              {/* START-SECOND SECTION */}
              <div className='flex lg:flex-row flex-col gap-5 my-20'>
                <div className='lg:w-[67%] w-full steps_content'>
                  <h3 className='text-5xl text-[#1B1B1F] font-bold py-3 text-center md:text-left lg:text-left xl:text-left 2xl:text-left leading-normal'>
                    Maximise Impact by personalising your CV
                  </h3>
                  <p className='text-lg py-3 pl-0 md:pl-6 lg:pl-6 xl:pl-6 2xl:pl-0 text-center md:text-left lg:text-left xl:text-left 2xl:text-left text-[#1B1B1F]'>
                    Your <b>professional Curriculum Vitae</b> creation process
                    does not have to be hefty. You can get a job-winning CV in
                    just six simple steps. Follow, and build yours! -
                  </p>
                </div>
                <div className='lg:w-[33%] w-full h-auto'>
                  <div className='flex flex-row justify-between items-baseline'>
                    <div>
                      <img
                        src='/stand_out_and_personalize_your_cv.png'
                        alt='icon4'
                        className='w-full h-full  object-contain'
                      />
                    </div>
                    <div className='pb-10'>
                      <img
                        src='/Artboard_ats.png'
                        alt='icon4'
                        className='w-full h-full  object-contain'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* END-SECOND SECTION */}

              <div className='step_1'>
                <div className='flex lg:flex-row flex-col gap-10 my-20 relative lg:p-1 p-5'>
                  <div className='lg:w-[55%] w-full steps_content'>
                    <h4 className='font-bold text-[#101827] text-2xl italic'>
                      Step 1
                    </h4>
                    <p className='text-base py-3 text-[#1B1B1F]'>
                      To start with the CV creation process through the CV Match
                      tool, you need to simply enter your job role. The entered
                      job description is analysed by the tool in order to gain
                      cognizance regarding the type of content and format that
                      must be utilised for that CV.
                    </p>
                  </div>
                  <div className='lg:w-[45%] w-full h-auto image_content flex flex-col justify-start items-center'>
                    {/* <img
                      src="Artboard_ats.png"
                      alt="icon4"
                      className="object-contain mr-32"
                    /> */}
                    <div className='flex lg:flex-row flex-col justify-center items-center'>
                      <img
                        src='CV_MATCH_Step 1.png'
                        alt='icon4'
                        className='object-contain'
                      />
                    </div>
                  </div>

                  <div className='arrow absolute left-[38%] -bottom-40'>
                    <img
                      src='/ats_step_arrow_1.png'
                      alt='arrow'
                      className='w-52 h-52 object-contain lg:block hidden'
                    />
                    <img
                      src='/arrow2.png'
                      alt='arrow'
                      className='w-52 h-52 object-contain lg:hidden block'
                    />
                  </div>
                </div>
              </div>
              {/*START-STEP-2 FOR MOBILE ONLY  */}
              <div className=' block sm:block md:block lg:hidden xl:hidden 2xl:hidden step_2 relative mt-20'>
                <div className='flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5'>
                  <div className='lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent '>
                    <div className='flex flex-col justify-center items-center'>
                      <img
                        src='/CV_MATCH_Step 2.png'
                        alt='icon4'
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                  <div className='lg:w-[50%] w-full steps_content mt-10'>
                    <h4 className='font-bold text-[#101827] text-2xl italic'>
                      Step 2
                    </h4>

                    <p className='text-base py-3 text-[#1B1B1F]'>
                      The CV Match not only helps you make a new resume
                      instantly without any hassle but also rectifies your
                      present CV. All you need to do is make a choice if you
                      wish to make changes in the existing CV or start afresh by
                      building a new CV through the CV Match tool. The tool will
                      observe your details from your present and accordingly
                      craft a new resume for you, just based on that!
                    </p>
                  </div>
                </div>
                <div className='text-center'>
                  <p className='text-2xl font-bold text-[#2C98CA]'>Or</p>
                </div>
                <div className='flex lg:flex-row flex-col gap-10  lg:p-1 p-5'>
                  <div className='lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent '>
                    <div className='flex flex-col justify-center items-center'>
                      <img
                        src='/CV_MATCH_Step 2.1.png'
                        alt='icon4'
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                  <div className='lg:w-[50%] w-full steps_content mt-10'>
                    <p className='text-base py-3 text-[#1B1B1F]'>
                      If you end up choosing the “Start Afresh” option, there
                      are little pointers that you need to provide to our CV
                      Match tool. While creating a <b>professional CV</b> there
                      are many things that need to be taken into account such as
                      Job Profile, Educational Qualifications, Professional
                      Experiences, Special Skills, and so much more. You just
                      need to briefly provide all the details to the too by
                      answering the short questionnaire.
                    </p>
                  </div>
                </div>

                <div className='arrow absolute left-[35%] -bottom-45'>
                  <img
                    src='/ats_step_arrow_2.png'
                    alt='arrow'
                    className='w-52 h-52 object-contain'
                  />
                </div>
              </div>
              {/*END-STEP-2 FOR MOBILE ONLY  */}
              {/*START-STEP-2 FOR SM MD LG XL 2XL SCREENS  */}
              <div className='hidden sm:hidden md:hidden lg:block xl:block 2xl:block step_2 relative mt-32 mb-32'>
                <div className='flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5'>
                  <div className='lg:w-[40%] w-full steps_content mt-10'>
                    <h4 className='font-bold text-[#101827] text-2xl italic'>
                      Step 2
                    </h4>
                    <p className='text-base py-3 text-[#1B1B1F] '>
                      The CV Match not only helps you make a new resume
                      instantly without any hassle but also rectifies your
                      present CV. All you need to do is make a choice if you
                      wish to make changes in the existing CV or start afresh by
                      building a new CV through the CV Match tool. The tool will
                      observe your details from your present and accordingly
                      craft a new resume for you, just based on that!
                    </p>
                  </div>
                  <div className='lg:w-[10%] w-full '>
                    <p className='text-2xl font-bold text-[#2C98CA] mt-20 text-center'>
                      Or
                    </p>
                  </div>
                  <div className='lg:w-[40%] w-full steps_content mt-10'>
                    <p className='text-base py-3 text-[#1B1B1F]'>
                      If you end up choosing the “Start Afresh” option, there
                      are little pointers that you need to provide to our CV
                      Match tool. While creating a <b>professional CV</b> there
                      are many things that need to be taken into account such as
                      Job Profile, Educational Qualifications, Professional
                      Experiences, Special Skills, and so much more. You just
                      need to briefly provide all the details to the too by
                      answering the short questionnaire.
                    </p>
                  </div>
                </div>

                <div className='flex lg:flex-row flex-col gap-10  lg:p-1 p-5'>
                  <div className='lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent '>
                    ``
                    <div className='flex flex-col justify-center items-center'>
                      <img
                        src='/CV_MATCH_Step 2.png'
                        alt='icon4'
                        className='w-full h-80 object-cover'
                      />
                    </div>
                  </div>
                  <div className='lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent '>
                    <div className='flex flex-col justify-center items-center'>
                      <img
                        src='/CV_MATCH_Step 2.1.png'
                        alt='icon4'
                        className='w-full h-80 object-cover'
                      />
                    </div>
                  </div>
                </div>
                <div className='arrow absolute left-[35%] -bottom-35'>
                  <img
                    src='/ats_step_arrow_2.png'
                    alt='arrow'
                    className='w-52 h-52 object-contain'
                  />
                </div>
              </div>
              {/*END-STEP-2 FOR SM MD LG XL 2XL SCREENS  */}
              <div className='step_3 relative mt-30'>
                <div className='flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5'>
                  <div className='lg:w-[50%] w-full steps_content mt-10'>
                    <h4 className='font-bold text-[#101827] text-2xl italic'>
                      Step 3
                    </h4>
                    {/* <h3 className="text-3xl text-black  py-3">EDUCATION </h3> */}
                    <p className='text-base py-3 text-[#1B1B1F]'>
                      The Genies Career Hub’s CV Match tool is all about
                      personalisation and customisation. Your{" "}
                      <b>professional curriculum vitae</b> must look exactly the
                      way you want. To ensure that, we have enables complete
                      flexibility. Just enter the information that you think is
                      relevant and your CV must have and move on to the next
                      part. You can omit whatever sections you do not want your
                      CV to include.
                      <br />
                      Just enter your experience details or just go ahead and
                      click, “Next” if you are a fresher!
                    </p>
                  </div>
                  <div className='lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:bg-transparent'>
                    <div className='flex justify-center items-center'>
                      <img
                        src='/CV_MATCH_Step 3.png'
                        alt='icon4'
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                </div>

                <div className='arrow absolute left-[33%] -bottom-40'>
                  <img
                    src='/ats_step_arrow_1.png'
                    alt='arrow'
                    className='w-52 h-52 object-contain lg:block hidden'
                  />
                  <img
                    src='/arrow2.png'
                    alt='arrow'
                    className='w-52 h-52 object-contain lg:hidden block'
                  />
                </div>
              </div>
              <div className='step_4 relative'>
                <div className='flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5'>
                  <div className='lg:w-[40%] w-full h-auto image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent'>
                    <div className='flex justify-center items-center'>
                      <img
                        src='/CV_MATCH_Step 4.png'
                        alt='icon4'
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                  <div className='lg:w-[60%] w-full steps_content mt-16'>
                    <h4 className='font-bold text-[#101827] text-2xl italic'>
                      Step 4
                    </h4>
                    {/* <h3 className="text-3xl text-black  py-3">EXPERIENCE </h3> */}
                    <p className='text-base py-3 text-[#1B1B1F]'>
                      Adding education qualifications in your resume adds
                      academic value to it. Just mention all the important
                      details pertaining to your educational background such as
                      the course pursued, university affiliated, duration of the
                      course, any other relevant detail. Furthermore, if you
                      feel like you can also add your specific details such as
                      learnings acquired and certification obtained.
                    </p>
                  </div>
                </div>

                <div className='arrow absolute left-[30%] -bottom-40'>
                  <img
                    src='/ats_step_arrow_5.png'
                    alt='arrow'
                    className='w-52 h-52 object-contain lg:block hidden'
                  />
                  <img
                    src='/ats_step_arrow_2.png'
                    alt='arrow'
                    className='w-52 h-52 object-contain lg:hidden block'
                  />
                </div>
              </div>

              {/*START-STEP-5 FOR SM MD LG XL 2XL SCREENS  */}
              <div className='block sm:block md:block lg:block xl:block 2xl:block step_2 relative mt-32'>
                <div className='flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5'>
                  <div className='lg:w-[100%] w-full steps_content mt-10'>
                    <h4 className='font-bold text-[#101827] text-2xl italic'>
                      Step 5
                    </h4>
                    <p className='text-base py-3 text-[#1B1B1F] '>
                      Apart from educational and experience based backgrounds,
                      you can also add details pertaining to the previous
                      projects that you have pursued so far. This shall provide
                      a profound insight into the assignments that you have
                      undertaken. Things like these add value to your resume.
                      This shall make your resume more impressive and be like
                      the cherry on top!
                    </p>
                  </div>
                </div>

                <div className='flex lg:flex-row flex-col gap-10  lg:p-1 p-5'>
                  <div className='lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent '>
                    ``
                    <div className='flex flex-col justify-center items-center'>
                      <img
                        src='/CV_MATCH_Step 5.png'
                        alt='icon4'
                        className='w-full h-80 object-cover'
                      />
                    </div>
                  </div>
                  <div className='lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent '>
                    <div className='flex flex-col justify-center items-center'>
                      <img
                        src='/CV_MATCH_Step 5.1.png'
                        alt='icon4'
                        className='w-full h-80 object-cover'
                      />
                    </div>
                  </div>
                </div>
                <div className='arrow absolute left-[35%] -bottom-30 md:left-[58%] lg:left-[58%] xl:left-[58%] 2xl:left-[58%]'>
                  <img
                    src='/ats_step_arrow_2.png'
                    alt='arrow'
                    className='w-52 h-52 object-contain'
                  />
                </div>
              </div>
              {/*END-STEP-5 FOR SM MD LG XL 2XL SCREENS  */}
              <div className='step_6 relative'>
                <div className='flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5'>
                  <div className='lg:w-[50%] w-full h-auto image_content flex justify-center  lg:order-first order-last lg:bg-transparent'>
                    <div className='flex flex-col gap-10 justify-start  mt-10'>
                      <img
                        src='/CV_MATCH_Step 6.png'
                        alt='icon5'
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                  <div className='lg:w-[50%] w-full steps_content pt-20'>
                    <h4 className='font-bold text-black text-2xl italic'>
                      Step 6
                    </h4>
                    {/* <h3 className="text-3xl text-black  py-3">
                      AWARDS, CERTIFICATES AND LANGUAGE
                    </h3> */}
                    <p className='text-base py-3'>
                      CV Match analyses all the relevant details to provide you
                      with a Professional CV that helps you present your
                      professional case with adeptness. The presented CV shall
                      open up in the CV Creator page. You can choose to
                      straightaway download it or edit it and make it better as
                      per your preference. For us at Genies Career Hub, it’s all
                      about catering to your likes.
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
        <section className='faq py-20'>
          <div className='max-w-7xl mx-auto flex lg:flex-row flex-col'>
            <div className='faq_image lg:w-[50%] w-full lg:block hidden'>
              <div className='image_div w-[400px] h-[400px]'>
                <img
                  src='/faq_image.png'
                  alt='faq'
                  className='w-full h-full object-contain'
                />
              </div>
            </div>
            <div className='faq_content lg:w-[50%] w-full lg:p-1 p-5'>
              <h2 className='text-3xl text-center text-bold font-semibold my-5'>
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
