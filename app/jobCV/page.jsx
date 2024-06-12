'use client';
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useUserStore } from "../store/UserStore";
import Image from "next/image";
import SearchBar from "../ui/Searchbar";
import { RiAiGenerate } from "react-icons/ri";
import TabMenu from "../ui/TabMenu";

const NewResumeHeader = dynamic(() => import('../Layout/NewResumeHeader'), { ssr: false });

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
  "Community Service Manager"
];


const tabs = [
    { label: "Popular Job Roles", content: <div>Home Content</div> },
    { label: "Industry specific job", content: <div>Profile Content</div> }
    // Add more tabs as needed
  ];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const userState = useUserStore((state) => state.userState);

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
          <div className="flex justify-center items-center ">
            <div className="flex flex-col gap-4 w-2/3">
            <h1 className="font-extrabold text-5xl w-2/3">Generate <span className="text-blue-500">CV</span> that will land you the job you want.</h1>
            <div className="grid grid-cols-2 gap-10  bg-blue-900 py-3 rounded-lg">
                <div>

            <SearchBar options={options} />
                </div>
                <div>

            <button className="bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2">Generate Now <RiAiGenerate className="text-xl font-bold"/></button>
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
