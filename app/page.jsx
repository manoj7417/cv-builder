"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useContext } from "react";
import Homepage from "./components/Homepage";
import HomepageNew from "./components/HomepageNew";
import LoaderUI from "./ui/LoaderUI";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useUserStore } from "./store/UserStore";
import { ResumeHeader } from "./Layout/ResumeHeader";
// const NewResumeHeader = dynamic(() => import('./Layout/NewResumeHeader'), { ssr: false })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const userState = useUserStore((state) => state.userState);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {}, []);

  return (
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
  );
}
