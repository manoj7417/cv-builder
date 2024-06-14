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
import { generateResumeOnFeeback } from "../pages/api/api";
import Lottie from "lottie-react";
import animation from "@/public/animations/JobCVLoader.json";
import CountUp from "react-countup";

const NewResumeHeader = dynamic(() => import("../Layout/NewResumeHeader"), {
  ssr: false,
});

const options = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Designer",
  "Marketing Manager",
  "Sales Executive",
  "HR Manager",
  "Financial Analyst",
  "Operations Manager",
  "Customer Support Specialist",
  "Content Writer",
  "Project Manager",
  "Business Analyst",
  "Network Engineer",
  "Graphic Designer",
  "UI/UX Designer",
  "Mobile App Developer",
  "DevOps Engineer",
  "Cloud Architect",
  "Cybersecurity Specialist",
  "Digital Marketing Specialist",
  "SEO Specialist",
  "Social Media Manager",
  "Accountant",
  "Auditor",
  "Consultant",
  "Research Scientist",
  "Data Analyst",
  "Mechanical Engineer",
  "Electrical Engineer",
  "Civil Engineer",
  "Chemical Engineer",
  "Biomedical Engineer",
  "Healthcare Administrator",
  "Pharmacist",
  "Nurse",
  "Doctor",
  "Teacher",
  "Professor",
  "Educational Consultant",
  "Event Planner",
  "Public Relations Specialist",
  "Lawyer",
  "Legal Assistant",
  "Paralegal",
  "Real Estate Agent",
  "Architect",
  "Interior Designer",
  "Construction Manager",
  "Supply Chain Manager",
  "Logistics Coordinator",
  "Retail Manager",
  "Store Manager",
  "Purchasing Manager",
  "Quality Assurance Engineer",
  "Environmental Engineer",
  "Safety Manager",
  "Production Manager",
  "Machine Learning Engineer",
  "AI Researcher",
  "Data Engineer",
  "Robotics Engineer",
  "Game Developer",
  "Animator",
  "Film Director",
  "Photographer",
  "Videographer",
  "Sound Engineer",
  "Music Producer",
  "Art Director",
  "Copywriter",
  "Editor",
  "Translator",
  "Interpreter",
  "Travel Agent",
  "Tour Guide",
  "Chef",
  "Pastry Chef",
  "Restaurant Manager",
  "Food Scientist",
  "Nutritionist",
  "Personal Trainer",
  "Fitness Instructor",
  "Sports Coach",
  "Athletic Trainer",
  "Psychologist",
  "Therapist",
  "Counselor",
  "Social Worker",
  "Community Service Manager",
];

const jobTabs = [
  {
    label: "Engineering",
    content: [
      "Software Engineer",
      "Data Scientist",
      "Product Manager",
      "Designer",
      "Mechanical Engineer",
      "Electrical Engineer",
      "Civil Engineer",
      "Chemical Engineer",
      "Biomedical Engineer",
      "Project Manager",
      "AI Researcher",
      "Machine Learning Engineer",
      "Data Engineer",
      "Network Engineer",
      "DevOps Engineer",
      "Cloud Architect",
      "Cybersecurity Specialist",
      "Robotics Engineer",
      "Environmental Engineer",
      "Quality Assurance Engineer",
      "Safety Manager",
      "Production Manager",
      "Mechanical Technician",
      "Electrical Technician",
    ],
  },
  {
    label: "Healthcare",
    content: [
      "Doctor",
      "Nurse",
      "Pharmacist",
      "Healthcare Administrator",
      "Biomedical Engineer",
      "Therapist",
      "Psychologist",
      "Counselor",
      "Dentist",
      "Surgeon",
      "Radiologist",
      "Physiotherapist",
      "Occupational Therapist",
      "Chiropractor",
      "Dietitian",
      "Nutritionist",
      "Veterinarian",
      "Medical Assistant",
      "Lab Technician",
      "Paramedic",
      "Healthcare Consultant",
    ],
  },
  {
    label: "Education",
    content: [
      "Teacher",
      "Professor",
      "Educational Consultant",
      "School Administrator",
      "Librarian",
      "Curriculum Developer",
      "Tutor",
      "Educational Therapist",
      "Instructional Coordinator",
      "Academic Advisor",
      "Career Counselor",
      "Special Education Teacher",
      "Early Childhood Educator",
      "Substitute Teacher",
      "Teaching Assistant",
    ],
  },
  {
    label: "Business",
    content: [
      "Marketing Manager",
      "Sales Executive",
      "HR Manager",
      "Financial Analyst",
      "Operations Manager",
      "Customer Support Specialist",
      "Business Analyst",
      "Consultant",
      "Accountant",
      "Auditor",
      "Project Manager",
      "Office Manager",
      "Supply Chain Manager",
      "Logistics Coordinator",
      "Retail Manager",
      "Store Manager",
      "Purchasing Manager",
      "Quality Assurance Manager",
    ],
  },
  {
    label: "IT & Software",
    content: [
      "Software Developer",
      "Systems Analyst",
      "Database Administrator",
      "IT Support Specialist",
      "Web Developer",
      "Network Administrator",
      "Cybersecurity Analyst",
      "Cloud Engineer",
      "Mobile App Developer",
      "DevOps Engineer",
      "Full Stack Developer",
      "Backend Developer",
      "Frontend Developer",
      "Game Developer",
      "IT Project Manager",
    ],
  },
  {
    label: "Creative Arts",
    content: [
      "Graphic Designer",
      "UI/UX Designer",
      "Animator",
      "Illustrator",
      "Video Editor",
      "Photographer",
      "Videographer",
      "Art Director",
      "Music Producer",
      "Sound Engineer",
      "Film Director",
      "Copywriter",
      "Content Writer",
      "Editor",
      "Translator",
      "Interpreter",
    ],
  },
  {
    label: "Marketing & Sales",
    content: [
      "Digital Marketing Specialist",
      "SEO Specialist",
      "Social Media Manager",
      "Content Strategist",
      "Brand Manager",
      "Advertising Manager",
      "Sales Representative",
      "Sales Manager",
      "Account Manager",
      "Business Development Manager",
      "Market Research Analyst",
      "Public Relations Specialist",
      "Event Planner",
    ],
  },
  {
    label: "Legal",
    content: [
      "Lawyer",
      "Legal Assistant",
      "Paralegal",
      "Judge",
      "Court Reporter",
      "Legal Secretary",
      "Compliance Officer",
      "Contract Manager",
      "Corporate Counsel",
      "Legal Consultant",
      "Mediator",
    ],
  },
  {
    label: "Real Estate & Construction",
    content: [
      "Real Estate Agent",
      "Architect",
      "Interior Designer",
      "Construction Manager",
      "Civil Engineer",
      "Building Inspector",
      "Property Manager",
      "Surveyor",
      "Landscape Architect",
      "Urban Planner",
    ],
  },
  {
    label: "Hospitality & Travel",
    content: [
      "Travel Agent",
      "Tour Guide",
      "Hotel Manager",
      "Event Coordinator",
      "Chef",
      "Pastry Chef",
      "Restaurant Manager",
      "Flight Attendant",
      "Cruise Director",
      "Concierge",
      "Bartender",
    ],
  },
  {
    label: "Fitness & Wellness",
    content: [
      "Personal Trainer",
      "Fitness Instructor",
      "Yoga Instructor",
      "Massage Therapist",
      "Sports Coach",
      "Athletic Trainer",
      "Wellness Coach",
      "Nutritionist",
      "Chiropractor",
    ],
  },
  {
    label: "Science & Research",
    content: [
      "Research Scientist",
      "Lab Technician",
      "Biologist",
      "Chemist",
      "Physicist",
      "Environmental Scientist",
      "Geologist",
      "Microbiologist",
      "Data Scientist",
      "Clinical Research Coordinator",
    ],
  },
];



export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobRole, setJobRole] = useState("");
  const userState = useUserStore((state) => state.userState);
  const [showDialog, setShowDialog] = useState(false)
  const [showMultiStepDialog, setShowMultiStepDialog] = useState(false)
  const [steps, setSteps] = useState(1)
  const inputRef = useRef()
  const { userdata } = useUserStore(state => state.userState)
  const initialState = {
    fullname: userdata?.fullname || '',
    email: userdata?.email || '',
    jobTitle: "",
    country: "",
    city: "",
    isFresher: false,
    experience: [],
    skills: [],
    education: [],
    projects: []
  }
  const replaceResumeData = useResumeStore((state) => state.replaceResumeData)
  const router = useRouter()
  const updateUserData = useUserStore(state => state.updateUserData)
  const [generatingResume, setIsGeneratingResume] = useState(false)
  const [formData, setFormData] = useState(initialState)


  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handlefileupload = () => {
    inputRef.current.click();
  };

  const fetchBetterResume = async (message, accessToken) => {
    message = message + `generate resume for this ${jobRole}`;

    try {
      const response = await generateResumeOnFeeback(
        message,
        accessToken.value
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
          router.push("/builder");
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
    setShowMultiStepDialog(true)
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
          <Dialog open={generatingResume}>
            <DialogContent onClick showCloseButton>
              <div className="mx-auto flex items-center flex-col">
                <Lottie
                  animationData={animation}
                  className="w-[300px] h-[300px]"
                />
                <p className="mt-1">Preparing your CV</p>
              </div>
            </DialogContent>
          </Dialog>
          <div className="flex justify-center items-center px-36">
            <div className="flex flex-col">
              <h1
                className="font-extrabold text-[3.9rem] pe-20 mb-6"
                style={{ lineHeight: "1 !important" }}
              >
                Build a <span className="text-blue-600">CV</span> that opens
                doors to your ideal{" "}
                <span className="text-blue-600">career</span>!
              </h1>
              <div className="grid grid-cols-2 gap-10   py-3 rounded-lg">
                <div>
                  <SearchBar
                    jobRole={jobRole}
                    setJobRole={setJobRole}
                    options={options}
                  />
                </div>
                <div>
                  <button
                    className="bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                    onClick={() => handleGenerateNow()}
                  >
                    Generate Now <RiAiGenerate className="text-xl font-bold" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/cvgenerator.png"
                width={1300}
                height={700}
                alt="Job CV"
                style={{ height: "19rem !important" }}
              />
            </div>
          </div>
        </section>
        <section>
          <div className="container mx-auto py-12 px-4 md:px-36 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-[#f5f5f5] p-12 rounded-3xl">
              <div className="text-center md:text-left ">
                <h2
                  className="text-2xl md:text-[2.7rem] font-bold mb-6"
                  style={{ lineHeight: "1.2 !important" }}
                >
                  Connect with a<span className="text-blue-600"> Career Coach </span>for Expert Advice, Anytime, Anywhere!
                </h2>
                <button
                  className="bg-blue-700 text-white px-4 py-2 rounded"
                  
                >
                  <a href="/contact-us">Work With Coach</a>
                </button>
              </div>
              <div className="flex justify-around items-center md:items-center h-[60%] bg-white w-[100%] rounded-3xl">
                <div className="text-4xl font-bold text-black">
                  <CountUp start={1} end={200} duration={2} />+
                  <p className="text-lg font-semibold">Templates</p>
                </div>

                <div className="text-4xl font-bold text-black ">
                  <CountUp start={1} end={40} duration={2} />
                  k+
                  <p className="text-lg font-semibold">Users</p>
                </div>

                <div className="text-4xl font-bold text-black ">
                  <CountUp start={1} end={50} duration={2} />+
                  <p className="text-lg font-semibold">Coaches</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white text-black">
          <div className="container mx-auto p-4">
              <TabMenu tabs={jobTabs} />
          </div>
        </section>
        <Footer />
      </>
    </main>
  );
}
