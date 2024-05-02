'use client'
import React, { useState, useEffect } from 'react';
import { Hero } from "./home/Hero";
import { Steps } from "./home/Steps";
import Homepage from "./components/Homepage";
import Footer from "./ui/newFooter";
import LoaderUI from "./ui/LoaderUI";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Here you might check for specific resources or simply set a timer
    // Adjust this logic based on your actual loading conditions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0); // Adjust time based on your needs

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="">
      {isLoading ? (
        <LoaderUI />
      ) : (
        <>
          <Homepage />
          <Footer />
        </>
      )}
    </main>
  );
}
