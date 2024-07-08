"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "@/components/component/Slider";
import { useRef, useState } from "react";
import Loader from "../ui/AnalyserLoader";
import { AnalyzeAts } from "../api/api";
import pdfToText from "react-pdftotext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Lottie from "lottie-react";
import animation from "@/public/animations/NonAtsLoaderAnimation.json";
import { GetTokens } from "../actions";
import { useUserStore } from "../store/UserStore";
import NewResumeHeader from "../Layout/NewResumeHeader";

import WorkTogether from "@/components/component/WorkTogether";
import Header from "../Layout/Header";

export default function DashboardIdea() {
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const userState = useUserStore((state) => state.userState)
  const updateRedirectPricingRoute = useUserStore(state => state.updateRedirectPricingRoute)

  const handlepdfFileChange = async (e) => {
    const { accessToken } = await GetTokens();
    if (!accessToken) {
      toast("Please login to use this template");
      return router.push("/login?redirect=/resumeAnalyzer-dashboard");
    }
    if (userState.userdata.subscription.status !== "Active") {
      return router.push("/pricing");
    }
    let selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (selectedFile?.type !== "application/pdf")
      return toast.error("Please select a valid PDF file");
    setIsAnalysing(true);
    let reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async () => {
      try {
        const text = await pdfToText(selectedFile);
        if (!text) {
          setIsAnalysing(false);
          setIsDialogOpen(true);
          return;
        }
        localStorage.setItem("newResumeContent", text);
        await getFeedback(text, accessToken.value);
      } catch (error) {
      } finally {
        setIsAnalysing(false);
      }
    };
  };

  const getFeedback = async (message, token) => {
    try {
      const response = await AnalyzeAts(message, token);
      if (response.status === "SUCCESS") {
        router.push(`/analyser/${response.analysisId}`)
      }
      const value = JSON.parse(response[0].text.value);
    } catch (error) {
      if (
        error.response.status === 400 &&
        error.response.data.error === "Insufficient tokens"
      ) {
        router.push("/pricing");
      }
    } finally {
      setIsAnalysing(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {userState?.isAuthenticated ? <NewResumeHeader /> : <Header />}
      <main>
        {/* <Header /> */}
        {isAnalysing && <Loader />}
        <section className="flex min-h-screen flex-col items-center justify-center pt-12 bg-gradient-to-t from-[#bde3f2] to-[white]">
          <Dialog open={isDialogOpen} onClose={handleDialogClose}>
            <DialogContent
              onClick={handleDialogClose}
              className="w-[450px]"
              showCloseButton={true}
            >
              <DialogTitle>
                <div>
                  <Lottie
                    animationData={animation}
                    loop={true}
                    style={{ height: "300px" }}
                  />
                </div>
                Non ATS friendly resume found
              </DialogTitle>
              <DialogDescription>
                Your resume is not ATS friendly. You should use an ATS-friendly
                resume. This is the main reason you are not getting shortlisted.
              </DialogDescription>
              <div className="flex w-full justify-end">
                <Link href="/resume-dashboard" className="inline">
                  <Button>View Templates</Button>
                </Link>
              </div>
            </DialogContent>
          </Dialog>
          <div className="container  w-full h-full resume-dashboard">
            <div className="flex lg:px-24 px-10 justify-between">
              <div className="space-y-2 2xl:mt-40 lg:mt-32">
                <h1 className="text-3xl font-bold mb-5 tracking-tighter text-gray-900 sm:text-5xl 2xl:text-6xl">
                  An <span className="text-[#2C98CA]">Optimised CV </span> goes
                  a Long Way
                </h1>
                <p className="text-gray-700 text-lg pe-10">
                  Wondering why your CV does not get through the initial rounds
                  of selection? Analyse your CV with our AI-based CV Optimiser
                  and get industry expertise integrated to create a flawless
                  application profile.
                </p>
                <div className="flex items-center space-x-4 ">
                  <label className="flex flex-col items-start bg-transparent text-blue rounded-lg  uppercase cursor-pointer hover:bg-blue">
                    <span className="lg:mt-2 mt-1 text-sm leading-normal px-5 py-3 bg-blue-900 hover:bg-blue-700  rounded-md text-white font-semibold">
                      Optimise CV Now
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="application/pdf"
                      onChange={handlepdfFileChange}
                    />
                  </label>
                </div>
              </div>
              <Image
                src="/1enhance.png"
                className="px-7 pt-7 rounded-t-3xl lg:block hidden"
                alt="@shadcn"
                width={600}
                height={100}
                priority
              />
            </div>
          </div>
          <div className="w-full  ">
            <div className="rounded-t-3xl border-t-8 border-blue-500  bg-gradient-to-b from-[#dcecff] to-[white]">
              <Slider />
            </div>
          </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32 border-t   scroll-mt-20" style={{ backgroundImage: "url('/banner-bg.svg')", backgroundPosition: "center" }}>
          <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10" >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight" >
                Get Matched to the Job that is Right for You!
              </h2>
              <p className="max-w-[600px] text-gray-700 md:text-base/relaxed lg:text-base/relaxed xl:text-base/relaxed ">
                Find the perfect profession and get matched with the best job profile with the AI-Based Job Assistance Programme.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                href="#"
              >
                Contact Expert
              </Link>
              {/* <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50    "
                href="#"
              >
                Learn more
              </Link> 
            </div>
          </div>
        </section> */}
        <WorkTogether />
        {/* <Footer /> */}
      </main>
    </>
  );
}

function LinkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function LocateIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}
