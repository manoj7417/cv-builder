"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "@/components/component/Slider";
import { useRef, useState } from "react";
import Loader from "../ui/AnalyserLoader";
import { AnalyzeAts } from "../pages/api/api";
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

import WorkTogether from "@/components/component/WorkTogether"
import Header from "../Layout/Header"

export default function DashboardIdea() {
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userState = useUserStore((state) => state.userState);
  const router = useRouter();
  const inputref = useRef();

  const handleOptimizeClick = async () => {
    const { accessToken } = await GetTokens();
    if (!accessToken) {
      router.push("/login?redirect=/resumeAnalyzer-dashboard");
      return;
    }
    inputref.current.click();
  };

  const handlepdfFileChange = async (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile.type !== "application/pdf")
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
        await getFeedback(text);
      } catch (error) {
      } finally {
        setIsAnalysing(false);
      }
    };
  };

  const getFeedback = async (message) => {
    try {
      const response = await AnalyzeAts(message);
      const value = JSON.parse(response[0].text.value);
      if (value.analysis.resume_score) {
        localStorage.setItem("feedback", JSON.stringify(value));
        router.push("/analyser/feedback");
      }
    } catch (error) {
    } finally {
      setIsAnalysing(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {userState?.isAuthenticated ? <NewResumeHeader /> : <Header/>}
      <main >
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
          <div className="container w-full h-full resume-dashboard">
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
                  <label className="flex flex-col items-start bg-transparent text-blue rounded-lg tracking-wide uppercase cursor-pointer hover:bg-blue">
                    <span
                      className="lg:mt-2 mt-1 text-sm leading-normal px-5 py-3 bg-blue-900 hover:bg-blue-700  rounded-md text-white font-semibold "
                      onClick={handleOptimizeClick}
                    >
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
                <input
                  type="file"
                  ref={inputref}
                  hidden
                  accept="application/pdf"
                  onChange={handlepdfFileChange}
                />
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
          <div className="w-full">
            <div className="rounded-t-3xl border-t-8 border-blue-900 bg-white">
              <Slider />
            </div>
          </div>
        </section>
        <WorkTogether />
      </main>
    </>
  );
}
