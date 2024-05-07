"use client";
import React, { useContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../lib/redux/store";
import Sidebar from "../components/Sidebar";
import { ResumeForm } from "../components/ResumeForm"; // Assuming you have an ATSComponent
import { Resume } from "../components/Resume";
import { TopNavBar } from "../components/TopNavBar";
import Ats from "../components/Ats";
import Aitab from "../components/AiTab";
import { ThemeForm } from "../components/ResumeForm/ThemeForm";
import Footer from "../ui/newFooter";
import { AIResumeForm } from "../components/AIResumeForm";
import Header from "../Layout/Header";
import AuthHook from "../hooks/AuthHook";
import { AuthContext } from "../context/AuthContext";

export default function Create() {
  // Possible values: 'DESIGN', 'ATS', 'NONE'
  const [activeTab, setActiveTab] = useState<string>("AIContent");


  console.log("activeTab:::",activeTab)

  AuthHook();

  return (
    <>
      <Provider store={store}>
        {/* <Header /> */}
        <main className="relative h-full overflow-hidden w-full bg-blue-50 py-20">
          <div className="grid grid-cols-3 md:grid-cols-9">
            <div className="col-span-2 pt-9">
              <Sidebar setActiveTab={setActiveTab} />
            </div>
            <div className="col-span-4 pt-5">
              <Resume />
            </div>
            <div className="col-span-3 pt-5">
              {activeTab === "Content" && <ResumeForm />}
              {activeTab === "Design" && (
                <div className="flex justify-between items-center px-8">
                  {" "}
                  <ThemeForm />
                </div>
              )}
              {activeTab === "AI" && <Aitab />}
              {activeTab === "ATS" && <Ats setActiveTab={setActiveTab} />}
              {activeTab === "AIContent" && <AIResumeForm />}
            </div>
          </div>
        </main>
      </Provider>
      {/* <Footer /> */}
    </>
  );
}
