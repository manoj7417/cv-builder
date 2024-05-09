"use client";
import React, { useState, useEffect, useContext } from "react";
import { Hero } from "./home/Hero";
import { Steps } from "./home/Steps";
import Homepage from "./components/Homepage";
// import Footer from "./ui/newFooter";
import LoaderUI from "./ui/LoaderUI";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { AuthContext } from "./context/AuthContext";
// import ResumeHeader from "./Layout/ResumeHeader";
import NewResumeHeader from "./Layout/NewResumeHeader";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const { userState } = useContext(AuthContext);


  useEffect(() => {
    // Here you might check for specific resources or simply set a timer
    // Adjust this logic based on your actual loading conditions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust time based on your needs

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {isLoading ? (
        <LoaderUI />
      ) : (
        <>
          {userState?.isAuthenticated ? <NewResumeHeader /> : <Header />}
          <Homepage />
          <Footer />
        </>
      )}
    </main>
  );
}
