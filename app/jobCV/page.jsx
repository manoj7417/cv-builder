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
import { Dialog } from "@radix-ui/react-dialog";
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
import animation from "@/public/animations/JobCVLoader.json";
import CountUp from "react-countup";
import axios from "axios";

const NewResumeHeader = dynamic(() => import("../Layout/NewResumeHeader"), {
  ssr: false,
});

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

  const handleDialogClose = () => {
    setIsGeneratingResume(false);
  };


  const fetchBetterResume = async (message, accessToken) => {
    message = message + `generate resume for this ${jobRole}`;
    try {
      const response = await axios.post(
        "/api/generateResumeOnFeedback",
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
      console.error(error);
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
          router.push("/login?redirect=/jobCV");
          return;
        }
        const { data, userData } = await fetchBetterResume(text, accessToken);
        if (data) {
          replaceResumeData(data);
          updateUserData(userData);
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
      router.push("/login?redirect=/jobCV");
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
        {userState?.isAuthenticated ? <NewResumeHeader /> : <Header />}
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
            />
          </Dialog>
          <Dialog open={showDialog}>
            <DialogContent
              className="max-w-[92dvw] md:max-w-[60dvw] sm:max-w-[60dvw] p-0"
              showCloseButton={true}
              onClick={() => setShowDialog(false)}
            >
              <h1 className="text-center pt-4 text-xl font-bold text-gray-500">
                Upload and attach files, or start with afresh!
              </h1>
              <p className="text-center px-6 md:px-12 sm:px-12 text-gray-500">
                Drag and drop your resume file or upload from Google Drive or
                Dropbox. We can also send you an email to reply with your
                attachment whenever you are ready.
              </p>
              <div className="flex w-full flex-col md:flex-row sm:flex-row gap-8 bg-gradient-to-r bg-white p-6 rounded-xl justify-around">
                <div
                  class="flex items-center justify-center w-[100%] md:w-[100%] sm:w-[50%]"
                >
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
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
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        PDF
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      class="hidden"
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
                        Start with a Fresh...
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
            <DialogContent onClick={handleDialogClose}  >
              <div className="mx-auto flex items-center flex-col">
                <Lottie
                  animationData={animation}
                  className="w-[300px] h-[300px]"
                />
                <p className="mt-1">Preparing your CV</p>
              </div>
            </DialogContent>
          </Dialog>
          <div className="flex flex-col lg:flex-row justify-center items-center px-4 lg:px-36">
            <div className="flex flex-col items-center lg:items-start">
              <h1
                className="font-extrabold text-[2rem] md:text-[3.9rem] lg:pe-20 mb-6 text-center lg:text-left"
                style={{ lineHeight: "1.3 !important" }}
              >
                Build a <span className="text-blue-900">CV</span> that opens
                doors to your ideal{" "}
                <span className="text-blue-900">career!</span>
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-10 gap-10 py-3 rounded-lg">
                <div className="w-full col-span-7">
                  <SearchBar
                    jobRole={jobRole}
                    setJobRole={setJobRole}
                    options={options}
                  />
                </div>
                <div className="w-full col-span-7 md:col-span-3 ">
                  <button
                    className="bg-blue-900 text-white 2xl:px-3 xl:px-2 py-2 rounded-lg flex items-center gap-2 mx-auto text-sm"
                    onClick={() => handleGenerateNow()}
                  >
                    Generate Now <RiAiGenerate className="text-xl font-bold" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 w-full lg:max-w-4xl">
              <Image
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
          <div className="container mx-auto py-12 px-4 md:px-32  ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-[#f5f5f5] p-6 lg:p-12 rounded-3xl">
              <div className="text-center md:text-left ">
                <h2
                  className="text-2xl md:text-[2.7rem] font-bold mb-6"
                  style={{ lineHeight: "1.3 !important" }}
                >
                  Connect with a
                  <span className="text-blue-900"> Career Coach </span>for
                  Expert Advice, Anytime, Anywhere!
                </h2>
                <button className="bg-blue-900 text-white px-4 py-2 rounded">
                  <a href="/contact-us">Work With Coach</a>
                </button>
              </div>
              <div className="flex flex-col md:flex-row justify-around items-center bg-white p-4 lg:p-8 rounded-3xl">
                <div className="text-4xl font-bold text-black mb-6 md:mb-0">
                  <CountUp start={1} end={200} duration={2} />+
                  <p className="text-lg font-semibold">Templates</p>
                </div>

                <div className="text-4xl font-bold text-black mb-6 md:mb-0">
                  <CountUp start={1} end={40} duration={2} />
                  k+
                  <p className="text-lg font-semibold">Users</p>
                </div>

                <div className="text-4xl font-bold text-black">
                  <CountUp start={1} end={50} duration={2} />+
                  <p className="text-lg font-semibold">Coaches</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Uncomment the following section if you want to include the TabMenu */}
        {/* <section className="bg-white text-black">
          <div className="container mx-auto p-4">
            <TabMenu tabs={jobTabs} />
          </div>
        </section> */}
        <Footer />
      </>
    </main>
  );
}
