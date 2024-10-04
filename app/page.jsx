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
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
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
