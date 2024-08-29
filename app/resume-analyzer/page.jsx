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
import { GetTokens, RemoveTokens } from "../actions";
import { useUserStore } from "../store/UserStore";
import NewResumeHeader from "../Layout/NewResumeHeader";
import WorkTogether from "@/components/component/WorkTogether";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { ResumeHeader } from "../Layout/ResumeHeader";
import ServicesPopUp from "@/components/component/ServicesPopUp";

export default function DashboardIdea() {
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const { userdata } = useUserStore((state) => state.userState);
  const logoutUser = useUserStore((state) => state.logoutUser);
  const updateRedirectPricingRoute = useUserStore(
    (state) => state.updateRedirectPricingRoute
  );
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const isCreditScore = true;


  const handlepdfFileChange = async (e) => {
    const { accessToken } = await GetTokens();
    if (!accessToken) {
      toast("Please login to use this template");
      return router.push("/login?redirect=/resume-analyzer");
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
        router.push(`/analyser/${response.analysisId}`);
      }
    } catch (error) {
      if (error.response.status === 403) {
        if (error.response.data.message === 'You have no analyser tokens') {
          if (userdata.subscription.plan.includes('CVSTUDIO')) {
            setIsServiceDialogOpen(true)
          } else {
            toast.info("Please subscribe to Genies Pro Suit to use this service", { autoClose: 10000 })
            return router.push('/pricing?scroll=1')
          }
        } else {
          toast.info("You do not have a valid plan.", { autoClose: 10000 })
          return router.push('/pricing?scroll=1')
        }
      } else {
        toast.error("Error while analysing your CV.")
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
      <ResumeHeader />
      <main>
        {/* <Header /> */}
        {isAnalysing && <Loader />}
        <section className="flex min-h-screen flex-col items-center justify-center pt-12 bg-gradient-to-t from-[#bde3f2] to-white">
          <Dialog open={isDialogOpen} onClose={handleDialogClose}>
            <DialogContent
              onClick={handleDialogClose}
              className="w-[90%] sm:w-[450px]"
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
                <Link href="/resume" className="inline">
                  <Button>View Templates</Button>
                </Link>
              </div>
            </DialogContent>
          </Dialog>
          <div className="flex flex-col max-w-8xl text-center px-8  lg:px-32 pt-16 sm:pt-28">
            <div className=" flex flex-col">
              <h1 className="text-4xl lg:text-7xl font-bold mb-6 lg:mb-10 text-gray-900 lg:px-32">
                An <span className="text-blue-600">Optimised CV</span> goes a
                Long Way
              </h1>
              <p className="text-gray-700 text-sm lg:text-md sm:text-lg lg:px-32">
                Wondering why your CV does not get through the initial rounds of
                selection? Analyse your CV with our AI-based CV Optimiser and
                get industry expertise integrated to create an Application
                Tracking System (ATS) friendly resume and flawless application
                profile that gets passed through ATS CV Checker.
              </p>
              <Dialog open={isServiceDialogOpen}>
                <ServicesPopUp
                  isServiceDialogOpen={isServiceDialogOpen}
                  setIsServiceDialogOpen={setIsServiceDialogOpen}
                  serviceName="Create CV"
                />
              </Dialog>
              <div className="flex justify-center mt-12">
                <label className="flex items-center space-x-4 bg-transparent text-blue rounded-lg uppercase cursor-pointer hover:bg-blue sm:mx-auto">
                  <span className="text-md px-10 py-3 bg-blue-900 hover:bg-blue-600 rounded-md text-white font-semibold">
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
            <div className="mt-10 lg:mt-0 flex justify-center lg:justify-start">
              <Image
                src="/1enhance.png"
                className="rounded-t-3xl w-full sm:w-1/2 mx-auto h-auto responsive-image"
                alt="@shadcn"
                width={600}
                height={100}
                priority
              />
            </div>
          </div>
          {/* <div className="w-full mt-10 lg:mt-0">
            <div className="rounded-t-3xl border-t-8 border-blue-500 bg-gradient-to-b from-[#dcecff] to-white">
              <Slider />
            </div>
          </div> */}
        </section>
        <WorkTogether />
        <Footer />
      </main>
    </>
  );
}
