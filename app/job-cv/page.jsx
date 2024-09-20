"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useUserStore } from "../store/UserStore";
import Image from "next/image";
import SearchBar from "../ui/Searchbar";
import { RiAiGenerate } from "react-icons/ri";
import TabMenu from "../ui/TabMenu";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa";
import JobMultistepForm from "@/components/component/JobMultistepForm";
import { toast } from "react-toastify";
import { useResumeStore } from "../store/ResumeStore";
import { useRouter } from "next/navigation";
import pdfToText from "react-pdftotext";
import { GetTokens } from "../actions";
import { generateResumeOnFeeback } from "../api/api";
import Lottie from "lottie-react";
// import animation from "@/public/animations/job-cvLoader.json";
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

export default function Home() {
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
                        class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                <h2 className="text-4xl lg:text-5xl font-bold mb-2 text-[#101827] w-full pt-20">
                  Get a <span className="text-[#2C98CA]">Professional CV</span>{" "}
                  for Your
                </h2>
                <h2 className="text-4xl lg:text-5xl font-bold mb-2 text-gray-900 w-full pt-2 pb-20">
                  Job Description
                </h2>
              </div>
            </div>

            <div className="max-w-7xl mx-auto steps_intro lg:py-0 sm:p-5 p-5">
              {/* START-FIRST SECTION */}
              <div class="grid grid-cols-3 gap-14">
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
                    pre-made professional CV for yourself.
                  </p>
                </div>
              </div>
              <div className="max-w-7xl mx-auto mt-12">
                <div className="flex flex-row w-[100%]">
                  <div className="w-[16%]"></div>
                  <div className="w-[68%]">
                    <div className="grid grid-cols-2 gap-14">
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
                          AI, the CV Match prepares a professional curriculum
                          vitae of the same job role or title by modifying the
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
                  <div className="w-[16%]"></div>
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
                    6 simple steps to best professional CV-
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
                    {/* <h3 className="text-3xl text-black  py-3">
                      BASIC INFORMATION
                    </h3> */}
                    <p className="text-base py-3 text-[#1B1B1F]">
                      Go to the CV Match page for pre-made CVs. Enter your job
                      role or profession and click on Generate Now. 
                      <br />
                      This step is to get an idea of what job role you want your
                      pre-made CV for.
                    </p>
                  </div>
                  <div className="lg:w-[45%] w-full h-[250px] image_content flex flex-col justify-start items-center">
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

                  <div className="arrow absolute left-[40%] -bottom-40">
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
              <div className="step_2 relative mt-20">
                <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                  <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent ">
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
                    {/* <h3 className="text-3xl text-black  py-3">
                      PROFILE UPDATES
                    </h3> */}

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
                  <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent ">
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src="/CV_MATCH_Step 2.1.png"
                        alt="icon4"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:w-[50%] w-full steps_content mt-10">
                    {/*<h4 className="font-bold text-[#101827] text-2xl italic">
                      Step 2
                    </h4>
                     <h3 className="text-3xl text-black  py-3">
                      PROFILE UPDATES
                    </h3> */}

                    <p className="text-base py-3 text-[#1B1B1F]">
                      Start afresh by making a CV for yourself. Just fill in
                      basic details like your name, email, job role, city and
                      country.  This information will help build your
                      professional CV with professional insights and artificial
                      intelligence.
                    </p>
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
                      Do you wish to change the font style of the text? Yes, you
                      can! We provide you the choice of changing the font style
                      if you do not like the original one. 
                    </p>
                  </div> */}
                <div className="arrow absolute left-[35%] -bottom-45">
                  <img
                    src="/ats_step_arrow_2.png"
                    alt="arrow"
                    className="w-52 h-52 object-contain"
                  />
                </div>
              </div>
              <div className="step_3 relative">
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
                      professional curriculum vitae and help get the best jobs.
                    </p>
                  </div>
                  <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:bg-transparent">
                    <div className="flex justify-center items-center">
                      <img
                        src="/CV_MATCH_Step 3.png"
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
                      You can change the design of the templates anywhere in the
                      process of making your CV. 
                    </p>
                  </div> */}
                <div className="arrow absolute left-[56%] -bottom-50">
                  <img
                    src="/ats_step_arrow_2.png"
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
                  <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent">
                    <div className="flex justify-center items-center">
                      <img
                        src="/CV_MATCH_Step 4.png"
                        alt="icon4"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:w-[50%] w-full steps_content mt-16">
                    <h4 className="font-bold text-[#101827] text-2xl italic">
                      Step 4
                    </h4>
                    {/* <h3 className="text-3xl text-black  py-3">EXPERIENCE </h3> */}
                    <p className="text-base py-3 text-[#1B1B1F]">
                    The basic information of your education must be filled in the next step. Just fill in your school or university name, course and time duration of the course.
The employers will review your education status which will help you get better deserving jobs. 
                    </p>
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
                      provided? Go ahead and click on the selected color, change
                      the shade by doodling around, and set it 
                    </p>
                  </div> */}
                <div className="arrow absolute left-[37%] -bottom-60">
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
              <div className="step_5 relative">
                <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                  <div className="lg:w-[50%] w-full steps_content mt-16">
                    <h4 className="font-bold text-[#101827] text-2xl italic">
                      Step 5
                    </h4>
                    {/* <h3 className="text-3xl text-[#1B1B1F]  py-3">
                      PROJECTS, SKILLS AND HOBBIES
                    </h3> */}
                    <p className="text-base py-3 text-[#1B1B1F]">
                    Adding your previous projects will give a clear picture to the employer of the different projects that you worked on in the past.
                    These are reviewed by the recruiters and help you get jobs if projects match their interests</p>
                  </div>
                  <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:bg-transparent">
                    <div className="flex  flex-col justify-center items-center">
                      <img
                        src="/CV_MATCH_Step 5.png"
                        alt="icon5"
                        className=" h-full object-cover w-[200px]"
                      />
                      <img
                        src="/CV_MATCH_Step 5.png"
                        alt="icon5"
                        className=" h-full object-cover w-[200px]"
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
                <div className="arrow absolute left-[57%] -bottom-40">
                  <img
                    src="/ats_step_arrow_2.png"
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
                  <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent">
                    <div className="flex flex-col gap-10 justify-start items-center mt-10">
                      <img
                        src="/profile_awards_certificates_language.png"
                        alt="icon5"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:w-[50%] w-full steps_content">
                    <h4 className="font-bold text-black text-2xl italic">
                      Step 6
                    </h4>
                    <h3 className="text-3xl text-black  py-3">
                      AWARDS, CERTIFICATES AND LANGUAGE
                    </h3>
                    <p className="text-base py-3">
                      If you have received any awards or certificates
                      previously, write them here.
                    </p>
                    <p className="text-base py-3">
                      If you know other languages, do mention them. This helps
                      and increases your chances of getting better
                      opportunities.
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

              <div className="step_7 w-[80%]">
                <h3 className="text-4xl text-black font-bold py-3">
                  Your ATS Resume Decoded 
                </h3>
                <p className="text-base py-3">
                  Our{" "}
                  <Link href="/resume-analyzer" className="font-bold">
                    enhanced CV
                  </Link>{" "}
                  maker is a tool that transforms your existing resume into an{" "}
                  <Link href="/resume-analyzer" className="font-bold">
                    Application Tracking System Resume
                  </Link>{" "}
                  . Genies Career Hub provides you with a transformation in a
                  <Link href="/resume-analyzer" className="font-bold">
                    resume ATS format
                  </Link>{" "}
                  by giving you an ATS score. This score will help the resume
                  get in a higher rank and will be placed above other
                  people&apos;s CVs
                </p>
                <p className="text-base py-3">
                  Analyse your{" "}
                  <Link href="/resume-analyzer" className="font-bold">
                    ATS Resume
                  </Link>{" "}
                  with 3-level optimisation.
                </p>
                <p className="text-base py-3">
                  Optimise your{" "}
                  <Link href="/resume-analyzer" className="font-bold">
                    Resume format
                  </Link>{" "}
                  Clarity, Relevance,  and Content with AI.
                </p>
              </div>
              {/*  */}
              <div className="max-w-7xl mx-auto mt-5 mb-10">
                <h3 className="text-3xl text-black font-bold py-3">
                  Our 3-level optimisation checker-
                </h3>

                {/* START- OUR THREE LEVEL OPTIMIZATION CHECKER */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
                  {/* Step 1 */}
                  <div className="relative w-[291px] h-[127px] bg-[url('/ats_3level_optimization_1.png')] bg-no-repeat bg-contain">
                    <div className="absolute inset-0 px-3 py-2 text-black">
                      <h6 className="text-[14px] font-bold text-[#2C98CA] mb-1">
                        1. CLARITY
                      </h6>
                      <p className="text-[14px] leading-relaxed  overflow-hidden text-wrap">
                        Gives you clarity of your resume in a clear and concise
                        manner
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative w-[291px] h-[127px] bg-[url('/ats_3level_optimization_2.png')] bg-no-repeat bg-contain">
                    <div className="absolute inset-0 px-3 py-2 text-black">
                      <h6 className="text-[14px] font-bold text-[#2C98CA] mb-1">
                        2. RELEVANCE
                      </h6>
                      <p className="text-[14px] leading-relaxed  overflow-hidden text-wrap">
                        Informs you about the relevance of your resume to the
                        job title.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative w-[291px] h-[127px] bg-[url('/ats_3level_optimization_3.png')] bg-no-repeat bg-contain">
                    <div className="absolute inset-0 px-3 py-2 text-black">
                      <h6 className="text-[14px] font-bold text-[#2C98CA] mb-1">
                        3. CONTENT
                      </h6>
                      <p className="text-[14px] leading-relaxed overflow-hidden text-wrap">
                        Gives you an idea if your content contains of the
                        relevant information to the job profile.
                      </p>
                    </div>
                  </div>
                </div>
                {/* END- OUR THREE LEVEL OPTIMIZATION CHECKER */}
              </div>
              {/*  */}
              {/*  */}
              <div className="pro_tips">
                <div className="pro_image relative">
                  <img src="/pro-tips.png" alt="pro-tips" />
                  <p className="text-[#FE2E12] font-bold absolute top-3 left-8 text-xl">
                    Pro Tips !
                  </p>
                </div>
                <p className="text-lg px-5">
                  Wish you had a better{" "}
                  <Link href="/resume-analyzer" className="font-bold">
                    ATS System
                  </Link>{" "}
                  Friendly Score! Do it right away. Our Optimiser results show
                  your score and suggestions in{" "}
                  <Link href="/resume-analyzer" className="font-bold">
                    resume ATS format
                  </Link>
                  . Follow the tips, and you can increase your{" "}
                  <Link href="/resume-analyzer" className="font-bold">
                    ATS Resume
                  </Link>{" "}
                  score.
                </p>
              </div>
              {/*  */}
              {/* step-1 */}
              <div className="step_6 relative">
                <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                  <div className="lg:w-[50%] w-full steps_content order-first lg:order-first ">
                    {/* <h4 className="font-bold text-black text-2xl">Step 6</h4> */}
                    <h3 className="text-3xl text-black font-bold py-3">
                      How to use our CV checker?
                    </h3>

                    <p className="text-base py-3 font-bold">
                      1. Go to CV Studio to Optimise Your CV and Click Optimise
                      CV Now. Upload Your Resume in PDF Form.
                    </p>
                    <p className="text-sm py-3">
                      Need an{" "}
                      <Link href="/resume-analyzer" className="font-bold">
                        enhanced resume
                      </Link>{" "}
                      ? You can go to the CV Creator and prepare your{" "}
                      <Link href="/resume-analyzer" className="font-bold">
                        ATS Resume
                      </Link>{" "}
                      in 4 easy steps. 
                    </p>
                  </div>
                  <div className="lg:w-[50%] w-full h-[250px] image_content flex justify-center items-center  lg:bg-transparent">
                    <div className="flex flex-col gap-10 justify-start items-center mt-0">
                      <img
                        src="/profile_ats_am_optimised_cv.png"
                        alt="icon5"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              {/* step-2 */}
              <div className="step_6 relative">
                <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                  <div className="lg:w-[50%] w-full steps_content">
                    <p className="text-base py-3 font-bold">
                      2. Check the{" "}
                      <Link href="/resume-analyzer" className="font-bold">
                        Resume format
                      </Link>{" "}
                      ATS Score in the CV Insights
                    </p>
                    <p className="text-sm py-3">
                      You must upload your resume in Optimise CV Now and let the
                      AI analyse the score. Your ATS score will appear at the
                      top. Our CV Optimiser will also provide you with feedback
                      based on the clarity, relevance, and quality of the
                      content.
                    </p>
                    <p className="text-sm py-3">
                      Our optimiser gives decent feedback and suggestions on how
                      to improve the score. It will guide you by suggesting
                      essential points to{" "}
                      <Link href="/resume-analyzer" className="font-bold">
                        enhance resume
                      </Link>
                      .
                    </p>
                  </div>
                  <div className="lg:w-[50%] w-full h-[250px] image_content flex justify-center items-center  lg:bg-transparent  order-last lg:order-first">
                    <div className="flex flex-col gap-10 justify-start items-center mt-0">
                      <img
                        src="/profile_cv_insights.png"
                        alt="icon5"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              {/*step-3  */}
              <div className="step_6 relative">
                <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                  <div className="lg:w-[50%] w-full steps_content order-first lg:order-first ">
                    <p className="text-base py-3 font-bold">
                      3. Review Your{" "}
                      <Link href="/resume-analyzer" className="font-bold">
                        ATS Resume
                      </Link>{" "}
                      Feedback or Suggestions and Start Making Corrections
                    </p>
                    <p className="text-base py-3">
                      Our CV Optimiser will provide recommendations to improve
                      your{" "}
                      <Link href="/resume-analyzer" className="font-bold">
                        enhanced CV
                      </Link>{" "}
                      , increasing your chances of getting hired. 
                    </p>
                    <p className="text-base py-3">
                      Go thoroughly through the issues in recommendations, and
                      accordingly make changes in your{" "}
                      <Link href="/resume-analyzer" className="font-bold">
                        ATS Resume
                      </Link>{" "}
                      .
                    </p>
                  </div>
                  <div className="lg:w-[50%] w-full h-auto image_content flex justify-center items-center  lg:bg-transparent ">
                    <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row  gap-5 justify-start items-center mt-0">
                      <img
                        src="/profile_clarity_ats.png"
                        alt="icon5"
                        className="w-full h-full object-cover"
                      />
                      <img
                        src="/profile_relevance_ats.png"
                        alt="icon5"
                        className="w-full h-full object-cover"
                      />
                      <img
                        src="/profile_content_ats.png"
                        alt="icon5"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              {/*step-4  */}
              <div className="step_6 relative">
                <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                  <div className="lg:w-[50%] w-full steps_content order-last lg:order-first ">
                    <p className="text-base py-3 font-bold">
                      4. Click on Fix My CV to Make Changes Manually.
                    </p>
                    <p className="text-sm py-3">
                      Make changes to your ATS-friendly resume by following the
                      recommendations that will make the CV an{" "}
                      <Link href="/resume-analyzer" className="font-bold">
                        enhanced CV
                      </Link>
                      , and achieve a more significant ATS score.  
                    </p>
                    <p className="text-sm py-3">
                      Take an overview of the details, the content, the
                      templates, and the color at the end. Make changes
                      according to your preferences, and you will be able to
                      download the improvised resume quickly.
                    </p>
                  </div>
                  <div className="lg:w-[50%] w-full h-[250px] image_content flex justify-center items-center  lg:bg-transparent hidden lg:block"></div>
                </div>
              </div>
              {/*  */}
              {/*  */}
              <div className="pro_tips">
                <div className="pro_image relative">
                  <img src="/pro-tips.png" alt="pro-tips" />
                  <p className="text-[#FE2E12] font-bold absolute top-3 left-8 text-xl">
                    Pro Tips !
                  </p>
                </div>
                <p className="text-lg px-5">
                  If you wish to recheck your resume for a better score after
                  making the changes once, just upload your improvised CV to our{" "}
                  <Link href="/resume-analyzer" className="font-bold">
                    ATS CV checker
                  </Link>{" "}
                  . Then, make more improvements with suggestions and download
                  the resume. 
                </p>
              </div>
              {/*  */}

              {/*  */}
              <div className="flex lg:flex-row flex-col gap-10 my-10">
                <div className="lg:w-[60%] w-full steps_content">
                  <h3 className="text-3xl text-black font-bold py-3">
                    Is our ATS Resume Checker successful in Improving the ATS
                    Score?
                  </h3>
                  <p className="text-base py-3">
                    Yes, Genies Career Hub provides job-seekers with a chance to
                    improve their{" "}
                    <Link href="/resume-analyzer" className="font-bold">
                      ATS Resume
                    </Link>{" "}
                    scores. This{" "}
                    <Link href="/resume-analyzer" className="font-bold">
                      ATS CV checker
                    </Link>{" "}
                    analyses your resume with AI and then bifurcates it based on
                    the clarity, relevance, and content of your resume format.  
                  </p>
                  <p className="text-base py-3">
                    After breaking down these into three, our optimiser gives
                    insights into the areas of improvement to increase each of
                    the scores. These insights can be some keywords or specific
                    details similar to your job profile meeting industry
                    standards.
                  </p>
                  <p className="text-base py-3">
                    By following the insights and making changes, you can
                    re-assess your{" "}
                    <Link href="/resume-analyzer" className="font-bold">
                      ATS Resume
                    </Link>{" "}
                    score and witness the change in score.
                  </p>
                  <p className="text-base py-3">
                    For a clear picture, we have provided an example of
                    witnessing the score change after following some
                    instructions.
                  </p>
                </div>
                <div className="lg:w-[40%] w-full h-auto image_content">
                  <img
                    src="/ats_resume_checker.png"
                    alt="icon4"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              {/*  */}
            </div>
          </section>
        </div>
        {/* NEW SECTION END */}

        {/* END-NEW STEPS CONTENT  */}
      </>
    </main>
  );
}
