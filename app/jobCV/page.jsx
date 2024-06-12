'use client';
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
import { DialogContent,  } from "@/components/ui/dialog";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa";
import JobMultistepForm from "@/components/component/JobMultistepForm";
import { toast } from "react-toastify";
import { useResumeStore } from "../store/ResumeStore";
import { useRouter } from "next/navigation";
import pdfToText from 'react-pdftotext'
import { GetTokens } from "../actions";
import { generateResumeOnFeeback } from "../pages/api/api";
import Lottie from "lottie-react";
import animation from '@/public/animations/JobCVLoader.json'

const NewResumeHeader = dynamic(() => import('../Layout/NewResumeHeader'), { ssr: false });

const options = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Designer",
  // Add more options as needed
];

const tabs = [
  { label: "Popular Job Roles", content: <div>Home Content</div> },
  { label: "Industry specific job", content: <div>Profile Content</div> }
  // Add more tabs as needed
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobRole, setJobRole] = useState('')
  const userState = useUserStore((state) => state.userState);
  const [showDialog, setShowDialog] = useState(false)
  const [showMultiStepDialog, setShowMultiStepDialog] = useState(false)
  const [steps, setSteps] = useState(1)
  const inputRef = useRef()
  const { userdata } = useUserStore(state => state.userState)
  const replaceResumeData = useResumeStore((state) => state.replaceResumeData)
  const router = useRouter()
  const updateUserData = useUserStore(state => state.updateUserData)
  const [generatingResume, setIsGeneratingResume] = useState(false)
  const [formData, setFormData] = useState({
    fullname: userdata?.fullname || '',
    email: userdata?.email || '',
    jobTitle: "",
    country: '',
    city: '',
    isFresher: false,
    experience: [],
    skills: [],
    education: [],
    projects: []
  })


  const handleDialogClose = () => {
    setShowDialog(false)
  }

  const handlefileupload = () => {
    inputRef.current.click()
  }

  const fetchBetterResume = async (message) => {
    message = message + `generate resume for this ${jobRole}`
    const { accessToken } = await GetTokens()
    try {
      const response = await generateResumeOnFeeback(message, accessToken.value);
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleuploadResume = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile.type !== 'application/pdf') return toast.error("Please select a valid PDF file")
    let reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    setShowDialog(false)
    reader.onloadend = async () => {
      try {
        const text = await pdfToText(selectedFile)
        if (!text) {
          toast.error("Non ATS friendly resume found")
          return;
        }
        setIsGeneratingResume(true)
        const { data, userData } = await fetchBetterResume(text);
        if (data) {
          replaceResumeData(data)
          updateUserData(userData)
          router.push("/builder");
        }
      } catch (error) {
        console.log(error)
        toast.error("Unable to generate your CV");
      } finally {
        setIsGeneratingResume(false)
      }
    };
  }

  const handleCloseMultistepForm = () => {
    setShowMultiStepDialog(false)
    setFormData({
      fullname: userdata?.fullname || '',
      email: userdata?.email || '',
      jobTitle: "",
      country: '',
      city: '',
      isFresher: false,
      experience: [],
      skills: [],
      education: [],
      projects: []
    })
  }

  const handleDontHaveCV = () => {
    setShowDialog(false)
    setShowMultiStepDialog(true)
  }

  const handleGenerateNow = () => {
    if (!jobRole) {
      return toast.error("Please select a job role")
    }
    setShowDialog(true)
  }

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
        <section className=" mt-16 py-10 bg-blue-900 text-white">
          <Dialog open={showDialog}>
            <DialogContent onClick={handleDialogClose}>
              <div className="w-full flex">
                <div className="w-1/2 h-48 shadow-lg flex flex-col items-center justify-center cursor-pointer rounded-md mr-5 hover:scale-105 duration-300 delay-400" onClick={handlefileupload}>
                  <IoDocumentTextOutline className="text-9xl text-blue-900" />
                  Upload CV
                  <input type="file" hidden ref={inputRef} accept="application/pdf" onChange={handleuploadResume} />
                </div>
                <div className="w-1/2 h-48  shadow-lg flex flex-col items-center justify-center cursor-pointer rounded-md hover:scale-105 duration-300 delay-400" onClick={handleDontHaveCV}>
                  <FaWpforms className="text-9xl text-blue-900" />
                  Dont have a CV?
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showMultiStepDialog}>
            <JobMultistepForm showMultiStepDialog={showMultiStepDialog} onClick={handleCloseMultistepForm} steps={steps} setSteps={setSteps} formData={formData} setFormData={setFormData} jobRole={jobRole}/>
          </Dialog>
          <Dialog open={generatingResume}>
            <DialogContent onClick showCloseButton>
              <div className='mx-auto flex items-center flex-col'>
                <Lottie animationData={animation} className='w-[300px] h-[300px]' />
                <p className='mt-1'>Preparing your CV</p>
              </div>
            </DialogContent>
          </Dialog>
          <div className="flex justify-center items-center ">
            <div className="flex flex-col gap-4 w-2/3">
              <h1 className="font-extrabold text-5xl w-2/3">Generate <span className="text-blue-500">CV</span> that will land you the job you want.</h1>
              <div className="grid grid-cols-2 gap-10  bg-blue-900 py-3 rounded-lg">
                <div>
                  <SearchBar jobRole={jobRole} setJobRole={setJobRole} options={options} />
                </div>
                <div>

                  <button className="bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2" onClick={() => handleGenerateNow()}>Generate Now <RiAiGenerate className="text-xl font-bold" /></button>
                </div>
              </div>
            </div>
            <div>

              <Image src="/jobcv-img.webp" width={200} height={300} alt="Job CV" />
            </div>

          </div>

        </section>
        <section className="bg-blue-900 text-white">
          <div className=" ms-40 ">
            <TabMenu tabs={tabs} />

          </div>
        </section>
        <Footer />
      </>
    </main>
  );
}
