"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useContext } from "react";
import HomepageNew from "./components/HomepageNew";
import LoaderUI from "./ui/LoaderUI";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useUserStore } from "./store/UserStore";
import { ResumeHeader } from "./Layout/ResumeHeader";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { userState, loginUser, logoutUser } = useUserStore();
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  
   // Conditionally render content only on the client
   if (!isClient) {
    return null; // Avoid rendering anything until client-side
  }

  return (
    <>
      <head>
        <title>
          Professional CV Templates for Perfect CVs on Genies CV Maker
        </title>
        <meta
          name="description"
          content="Find best Curriculum Vitae Template and Career Assistance on top CV Maker and CV Library Website, Genies Career Hub and create your CV best fit for Job Role."
        />
        <link rel="canonical" href="https://www.geniescareerhub.com" />
      </head>
      <main>
        {isLoading ? (
          <LoaderUI />
        ) : (
          <>
            <ResumeHeader />
            <HomepageNew />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
