/** @format */

"use client";
import Link from "next/link";
import NewNavbar from "../../ui/newNav";
import Slider from "../../../components/component/Slider";
import { ServiceSection } from "@/components/component/service-section";
import Footer from "../../ui/newFooter";
import Navbar from "../../ui/newNav";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Tilt } from "react-tilt";
import TabResume from "@/components/component/TabResume";
import FAQSection from "@/components/component/FAQSection";
import WorkTogether from "@/components/component/WorkTogether";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import GetStartedModal from "@/components/component/GetStartedModal";
import "./Homepage.css";
import CourseSlider from "@/components/component/CourseSlider";
import HomeBanner from "./HomeBanner";

export default function HomepageNew() {
  const [hovered, setHovered] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      // Adjust the scroll value as needed
      setShowFloatingButton(true);
    } else {
      setShowFloatingButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleHover = () => {
    setHovered(!hovered);
  };

  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 25, // max tilt rotation (degrees)
    perspective: 5000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.01, // 2 = 200%, 1.5 = 150%, etc..
    speed: 2000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.50,.98,.52,.99)", // Easing on enter/exit.
    padding: 0,
    margin: 0,
  };

  const words = [
    "Build your CV",
    "Find career path",
    "Identify skill gaps",
    "Get career coach",
    "Take personality test",
  ]; // Add more words as needed
  const images = [
    "/build-your-cv.png",
    "/find-career-path.png",
    "/identify-skill-gap.png",
    "/get-career-councelling.png",
    "/take-personality-test.png",
  ];
  const interval = 3000; // 2000ms or 2 seconds for each word
  const [index, setIndex] = useState(0);
  const [wordOpacity, setWordOpacity] = useState(1);

  //  Handle opacity transitions
  useEffect(() => {
    const fadeOut = setTimeout(() => {
      setWordOpacity(0);
    }, interval - 500); // Start fade-out 0.5s before interval ends

    return () => clearTimeout(fadeOut);
  }, [index, interval]);

  // Handle index cycling and reset opacity
  useEffect(() => {
    const cycle = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
      setWordOpacity(1); // Reset opacity when index changes
    }, interval);

    return () => clearInterval(cycle);
  }, [words.length, interval]);

  // useEffect(() => {
  //   const cycle = setInterval(() => {
  //     setIndex((prevIndex) => (prevIndex + 1) % words.length);
  //   }, interval);
  //   return () => clearInterval(cycle);
  // }, [words, interval]);

  // useEffect(() => {
  //   const fadeOut = setTimeout(() => {
  //     setWordOpacity(0);
  //   }, interval - 500); // Start fade-out 0.5s before interval ends

  //   const cycle = setInterval(() => {
  //     setIndex((prevIndex) => (prevIndex + 1) % words.length);
  //     setWordOpacity(1);
  //   }, interval);

  //   return () => {
  //     clearInterval(cycle);
  //     clearTimeout(fadeOut);
  //   };
  // }, [index, interval]);

  return (
    <>
      <HomeBanner />
      <section className="grid lg:grid-cols-2 grid-cols-1 py-20 bg-white border-t-4 rounded-lg shadow-xl">
        <div className="discover_image lg:flex align-middle overflow-hidden hidden">
          <Image
            src={"/home-creative-down.png"}
            width={2000}
            height={1500}
            alt="discover"
            loading="lazy"
            style={{
              marginLeft: "-150px",
            }}
          />
        </div>
        <div className="my-auto p-10">
          <CourseSlider />
        </div>
      </section>
      <Slider />
      <TabResume />
      <WorkTogether />
      <FAQSection />
      <ServiceSection />
    </>
  );
}
