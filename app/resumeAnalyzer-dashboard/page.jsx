'use client'
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Link from "next/link"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NewNavbar from "../ui/newNav"
import Image from "next/image"
import { FaBorderAll } from "react-icons/fa"
import { PiFolderSimpleUser } from "react-icons/pi";
import { MdQueryStats } from "react-icons/md"
import { IoShirt } from "react-icons/io5"
import { RiShirtFill } from "react-icons/ri"
import { Carousel, CarouselItem } from "@/components/ui/carousel"
import Footer from "../ui/newFooter";
import { redirect } from "next/dist/server/api-utils"
import { Steps } from "../home/Steps"
import Navbar from "../ui/newNav"
import Slider from "@/components/component/Slider"
import { useState } from "react"
import Loader from "../ui/AnalyserLoader"
import { AnalyzeAts } from "../pages/api/api"
import pdfToText from 'react-pdftotext'
import { useRouter } from "next/navigation"
import Header from "../Layout/Header"


export default function DashboardIdea() {
  const [isAnalysing, setIsAnalysing] = useState(false)
  const router = useRouter()
  const handlepdfFileChange = async (e) => {
    setIsAnalysing(true)
    let selectedFile = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async () => {
      // Store the data URL in state or dispatch it to Redux store
      localStorage.setItem("pdfFile", JSON.stringify(reader.result))
      // Perform any additional operations you need with the file data here
      // For example, you can pass it to your pdfToText function
      pdfToText(selectedFile)
        .then(async text => {
          await getFeedback(text);
        })
        .catch(error => console.error("Failed to extract text from pdf"));

    };
  }

  const getFeedback = async (message) => {
    try {
      const response = await AnalyzeAts(message)
      const value = JSON.parse(response[0].text.value)
      if (value.score) {
        localStorage.setItem('feedback', JSON.stringify(value))
        router.push('/analyser/feedback')
      }
    } catch (error) {

    } finally {
      setIsAnalysing(false)
    }
  }


  return (
    <>
      <main >
        {/* <Header /> */}
        {isAnalysing && <Loader />}
        <section className="flex min-h-screen flex-col items-center justify-center pt-12" style={{ backgroundImage: "url('/banner-bg.svg')", backgroundPosition: "center" }}>
          <div className="container  w-fullbg-blue-300 " style={{ marginBottom: "-200px" }}>
            <div className="flex px-24 justify-between">
              <div className="space-y-2 mt-40">
                <h1 className="text-3xl font-bold mb-5 tracking-tighter text-gray-900 sm:text-5xl xl:text-6xl/none">Scan your Resume or CV</h1>
                <p className="text-gray-700 text-lg pe-10">Scan your resume or CV with genie AI and get a detailed report. Help you know your ATS score and let you know your mistakes</p>
                <div className="flex items-center space-x-4">
                  <label className="flex flex-col items-start bg-transparent text-blue rounded-lg tracking-wide uppercase cursor-pointer hover:bg-blue">
                    <span className="lg:mt-2 mt-1 text-sm leading-normal px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-white font-semibold">
                      Upload your cv now
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="application/pdf"
                      onChange={
                        handlepdfFileChange
                      }
                    />
                  </label>
                </div>
              </div>
              <Image src="/ats friendly.png" className="px-7 pt-7 " alt="@shadcn" width={600} height={100} />
            </div>
          </div>
          <div className="w-full  " >
            <div className="rounded-t-3xl border-t-8 border-blue-500 shadow-xl  bg-gradient-to-b from-[#dcecff] to-[white]">

              <Steps />
              <Slider />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t   scroll-mt-20" style={{ backgroundImage: "url('/banner-bg.svg')", backgroundPosition: "center" }}>
          <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10" >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight" >
                Unable to find the right job? Genie can help you.
              </h2>
              <p className="max-w-[600px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                Genie will help you find the right job and provide you with the best career advice and builds your portfolio.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                href="#"
              >
                Contact Expert
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50    "
                href="#"
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>
        {/* <Footer /> */}
      </main>
    </>
  )
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
  )
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
  )
}
