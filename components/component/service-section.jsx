'use client'
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GiMagicLamp } from "react-icons/gi";
import { FiBox } from "react-icons/fi";
import { useRef, useState } from "react";
import { sendSubscribeEmail } from "@/app/api/api";
import { GetTokens } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/UserStore";

export function ServiceSection() {
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const email = useRef('')
  const router = useRouter()
  const { userdata } = useUserStore(state => state.userState)

  const handleSubscribe = async () => {
    const { accessToken } = await GetTokens()
    if (!accessToken) {
      router.push('/login')
      return
    }
    setIsSubscribing(true)
    const obj = {
      name: userdata?.fullname,
      email: email.current.value
    }
    try {
      const response = await sendSubscribeEmail(obj)
      console.log(response)
      if (response.status === 200) {
        setIsSubscribed(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      email.current.value = ''
      setIsSubscribing(false)
    }
  }

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#e4f5fc] to-[white] ">
      <main className="flex-1">
        {/* <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-gradient-to-r from-[white] to-[#dcecff]  scroll-mt-20">
          <div className=" px-4 md:px-6 mb-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-2xl bg-gradient-to-b from-[#8181b9] to-[#131350] hover:bg-blue-900 text-white  px-5 py-1 mb-5">
                  CV Curator
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-950">
                  A Step Closer to Your Dream Job!
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                  You can get your CV engineered in minutes with seamless CV
                  Building. Start your job application process quickly while
                  ensuring that your profile reflects the exact requisites of
                  the job you have always dreamt of.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6 mb-10">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-950">
                        CV Curator
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Looking for an impressive CV Template? Find the best
                        Artificial Intelligence-Based Services in CV Making
                        here! Check out our Sample CVs UK to generate the
                        perfect resume that aligns with the job you are
                        targeting. Our CV Maker is equipped with Artificial
                        Intelligence and tools specially designed to help you
                        with the rectification of mistakes and improve the
                        structure and content of your resume. Build the perfect
                        CV and approach the job with confidence.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-950">
                        CV Analyser
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Not Sure if Your CV is Perfect for the Job you are
                        applying for? Get your CV analysed by Industry Experts
                        now! Focused on creating the best CV that helps you
                        crack the interview code, our British Resume Templates
                        are carefully designed to suit the job specifications.
                        However, if you need more specific insights on content
                        style, skill gaps, important keywords, and Application
                        Tracking Software compatibility, the CV Analyser is the
                        tool you must seek.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-950">Genie</h3>
                      <p className="text-gray-500 text-sm">
                        Simplify your approach to Job Applications with an
                        AI-based CV Maker that does all that you want while you
                        sit back and relax! This genie not only helps you create
                        your CV as a premium CV Maker but also provides a
                        solution to your queries. Providing you with resources
                        and suitable recommendations, the genie will assist you
                        in every step. Crafted with Artificial Intelligence
                        specifications and inspired by the knowledge of Industry
                        Experts, the genie is just exactly what you need!
                      </p>
                    </div>
                  </li>
                </ul>
                <div>
                  <button className=" px-7 py-2 rounded-md text-base text-white bg-blue-900 hover:bg-blue-700">
                    <a href="/resume-dashboard" className="flex items-center">
                      Curate Now
                      <FiBox className="h-5 w-5 ms-5 text-white" />
                    </a>
                  </button>
                </div>
              </div>
              <div className="lg:w-[600px] w-full h-auto shadow-lg rounded-md">
                <video
                  width="1000"
                  height="1000"
                  autoPlay
                  muted
                  loop
                  preload="none"
                >
                  <source src="/resumeBuilderVideo.mp4" type="video/mp4" />
                  <track
                    src="/path/to/captions.vtt"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2"></div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="lg:w-[550px] w-full h-auto shadow-lg rounded-md pr-10">
                <video
                  width="1000"
                  height="1000"
                  autoPlay
                  muted
                  loop
                  preload="none"
                >
                  <source src="/analyser.mp4" type="video/mp4" />
                  <track
                    src="/path/to/captions.vtt"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="flex flex-col justify-center space-y-4 lg:ps-20 ps-1">
                <div className="px-0 flex items-center rounded-2xl text-center py-1 ">
                  <h2 className="lg:text-4xl text-3xl font-bold text-blue-900">
                    CV Analyzer
                  </h2>
                  <GiMagicLamp className="h-14 w-14 ms-5 text-blue-900" />
                </div>
                <ul className="grid gap-6 mb-5">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-950">
                        ATS score
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Find out how well your CV performs with Applicant Tracking Systems (ATS). Our tool provides a detailed score, pinpointing areas for improvement to ensure your CV gets through automated screenings. Get practical tips to enhance your CV&apos;s structure, content, and formatting, making it more appealing to both ATS and hiring managers.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-950">
                        Suggestion for CV
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Get expert recommendations to perfect your CV. Our tool reviews your CV and offers personalized suggestions to make it more effective. Whether it&apos;s adjusting the format, refining the content, or highlighting key skills, get professional advice to make your CV stand out.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-950">
                        Optimize your CV
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Enhance your CV with our comprehensive optimization service. Our tool checks for errors, ensures contextual accuracy, and provides targeted improvements. From content alignment to skill presentation, optimize every aspect of your CV to increase your chances of landing your desired job.
                      </p>
                    </div>
                  </li>
                </ul>
                <div>
                  <button className="items-center flex px-7 py-2 rounded-md text-base text-white bg-blue-900 hover:bg-blue-700">
                    <a className="flex items-center" href="/genie-dashboard">
                      Analyze Now
                      <GiMagicLamp className="h-6 w-6 ms-5 text-white" />
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* <section
          className="w-full py-12 md:py-24 lg:py-32 border-t lg:px-20  scroll-mt-20 bg-gradient-to-r from-gray-100 to-[#cad7e8]"
          style={{
            backgroundImage: "url('/banner-bg.svg')",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto lg:max-w-[75rem] w-full grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Looking for More?
              </h2>
              <p className="max-w-[600px] text-gray-700 md:text-base/relaxed lg:text-base/relaxed xl:text-base/relaxed ">
                Contact our Industry Experts to get additional information for a
                more personalised approach to Career Counselling.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                href="/contact-us"
              >
                Contact Expert
              </Link>
            </div>
          </div>
        </section> */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-gradient-to-t from-white to-[#2C98CA33] scroll-mt-20">
          <div className=" grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="lg:text-5xl text-2xl font-bold text-[#0D3572]">
                Stay Ahead of the Curve!
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-sm">
                Subscribe to our newsletter and get the latest updates.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="flex lg:flex-row flex-col space-x-2 mb-5 gap-5">
                <input
                  className="max-w-lg lg:py-0 py-2 flex-1 px-3 bg-blue-900 bg-opacity-10 rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 opacity-55"
                  
                  placeholder="Enter your email"
                  type="email"
                  ref={email}
                  disabled={isSubscribed}
                />
                {
                  isSubscribed ?
                    <Button className="inline-flex h-10 items-center justify-center rounded-md bg-green-700 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 " >
                      Susbcribed
                    </Button>
                    :
                    <Button className="inline-flex h-10 items-center justify-center rounded-md bg-blue-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50" disabled={isSubscribing} onClick={handleSubscribe}>
                      {isSubscribing ? 'Subscribing..' : 'Subscribe'}
                    </Button>
                }
              </div>
              <p className="text-xs text-gray-500">
                <Link className="underline underline-offset-2" href="/terms-condition">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
