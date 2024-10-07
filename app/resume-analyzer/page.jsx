"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "@/components/component/Slider";
import { useRef, useState } from "react";
import Loader from "../ui/AnalyserLoader";
import pdfToText from "react-pdftotext";
import { usePathname, useRouter } from "next/navigation";
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
import AccordionItem from "@/components/component/AccordionItem";
import parse from "html-react-parser";
import axios from "axios";
const faqData = [
  {
    id: 1,
    ques: "What is unique about Genies Career Hub’s CV Optimiser?",
    ans: `
     This CV Optimiser thoroughly analyses your resume with AI and provides you suggestions with the <a href="https://www.geniescareerhub.com/resume-analyzer" class="font-bold">ATS Resume Score</a>. This feedback contains the clarity, relevance, and content of your resume with a score and suggestions to improve the ATS of your resume. Following these insights, you can increase your score and get better and more opportunities.
    `,
  },
  {
    id: 2,
    ques: "How does this CV checker help in increasing the ATS score?",
    ans: `
      Genies Career Hub has the feature of analysing your CV by running it through an optimisation. After analysing, it gives you the feedback with a score in three steps:
      <ul>
        <li>Clarity</li>
        <li>Relevance</li>
        <li>Content</li>
      </ul>
      Follow the suggestions given below each of these to get a better score and get the best opportunities.
    `,
  },
  {
    id: 3,
    ques: "How can I optimise my CV without having an enhanced CV ?",
    ans: `
     Adhere to these six simple steps for smooth functioning:
     <ul>
       <li>Go to the CV Studio page to create an <a href="https://geniescareerhub.com/resume-analyzer" className="font-bold">enhanced CV</a>.</li>
       <li>Fill in the mandatory information. If you desire, AI can generate your profile description and ensure all fields completed.</li>
       <li>Choose a template that suits your style, and customize it with your desired colour.</li>
       <li>Download the CV.</li>
       <li>Go to Optimise CV, upload your CV, and get it analysed.</li>
       <li>Follow the feedback suggestions in case of a low <a href="https://www.geniescareerhub.com/resume-analyzer" class="font-bold">ATS CV Checker</a> and re-assess your <div className="font-bold">
                        enhanced resume
                  </div>.</li>
     </ul>
    `,
  },
];

export default function DashboardIdea() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  console.log("pathname::", pathname);
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
      const response = await axios.post(
        "/api/AnalyzeAts",
        { message: message },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
        router.push(`/analyser/${response.data.analysisId}`);
      }
    } catch (error) {
      if (error.response.status === 403) {
        if (error.response.data.message === "You have no analyser tokens") {
          if (userdata.subscription.plan.includes("CVSTUDIO")) {
            setIsServiceDialogOpen(true);
          } else {
            toast.info(
              "Please subscribe to Genies Pro Suit to use this service",
              { autoClose: 10000 }
            );
            return router.push("/pricing?scroll=1");
          }
        } else {
          toast.info("You do not have a valid plan.", { autoClose: 10000 });
          return router.push("/pricing?scroll=1");
        }
      } else {
        toast.error("Error while analysing your CV.");
      }
    } finally {
      setIsAnalysing(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
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
                Non{" "}
                <Link href="/resume-analyzer" className="font-bold">
                  ATS friendly resume
                </Link>{" "}
                found
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
                profile that gets passed through{" "}
                <Link href="/resume-analyzer" className="font-bold">
                  ATS CV checker
                </Link>{" "}
                .
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
                priority
                src="/1enhance.png"
                className="rounded-t-3xl w-full sm:w-1/2 mx-auto h-auto responsive-image"
                alt="@shadcn"
                width={600}
                height={100}
              />
            </div>
          </div>
          {/* ***********************NEW SECTION START *****************/}
          <div id="mainDiv" className="w-full bg-white">
            <section>
              <div className="steps_main_section max-w-7xl mx-auto relative lg:p-0 p-10 ">
                <div className="flex flex-col items-center justify-center text-center px-4 lg:px-20 xl:px-10 2xl:px-10">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-2 text-gray-900 w-full pt-20">
                    One Step Ahead of
                  </h2>
                  <h2 className="text-4xl lg:text-5xl font-bold  w-full pt-1  text-[#2C98CA]">
                    Conventional CV Checkers
                  </h2>

                  <p className="text-base text-black pt-10 w-[95%] sm:w-[85%] md:w-[85%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]">
                    Top companies across the globe utilise Applicant Tracking
                    Software to simplify their recruiting processes. It would
                    help if you had a compatible and optimised resume to make it
                    through the cracks of the application tracking process for
                    the job role you are targeting.
                  </p>
                  <p className="text-base text-black pt-10 w-[95%] sm:w-[85%] md:w-[85%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]">
                    At Genies Career Hub, we have decoded the nuances of the
                    Application Tracking Software to build a CV Optimiser that
                    pre-notifies you about potential gaps in your CV. With an
                    ATS optimised CV, you can make it to the top of the selected
                    application piles.
                  </p>
                </div>
              </div>
              <div className="max-w-7xl mx-auto lg:py-10 sm:p-5 p-5">
                <h3 className="text-3xl text-black font-bold py-3">
                  Optimise Your CV in just four simple steps:
                </h3>
                {/* START STEPS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
                  {/* Step 1 */}
                  <div className="relative w-[291px] h-[127px] bg-[url('/Stepper_1_ats.png')] bg-no-repeat bg-contain">
                    <div className="absolute inset-0 px-3 py-2 text-black">
                      <h6 className="text-[14px] font-bold text-[#2C98CA] mb-1">
                        Step 1
                      </h6>
                      <p className="text-[14px] leading-relaxed  overflow-hidden text-wrap">
                        Tap on the{" "}
                        <Link className="font-bold" href={"/resume-analyzer"}>
                          CV Optimiser
                        </Link>{" "}
                        page on the Genies Career Hub page to get a quick scan.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative w-[291px] h-[127px] bg-[url('/Stepper_2_ats.png')] bg-no-repeat bg-contain">
                    <div className="absolute inset-0 px-3 py-2 text-black">
                      <h6 className="text-[14px] font-bold text-[#2C98CA] mb-1">
                        Step 2
                      </h6>
                      <p className="text-[14px] leading-relaxed  overflow-hidden text-wrap">
                        Tap on the option to{" "}
                        <Link href={"/resume-analyzer"} className="font-bold">
                          Upload CV Now
                        </Link>{" "}
                        and then Upload your PDF to analyse it.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative w-[291px] h-[127px] bg-[url('/Stepper_3_ats.png')] bg-no-repeat bg-contain">
                    <div className="absolute inset-0 px-3 py-2 text-black">
                      <h6 className="text-[14px] font-bold text-[#2C98CA] mb-1">
                        Step 3
                      </h6>
                      <p className="text-[14px] leading-relaxed overflow-hidden text-wrap">
                        Get the Report with a detailed analysis of the aspects
                        of your CV with an analytical score.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative w-[291px] h-[127px] bg-[url('/Stepper_4_ats.png')] bg-no-repeat bg-contain">
                    <div className="absolute inset-0 px-3 py-2 text-black">
                      <h6 className="text-[14px] font-bold text-[#2C98CA] mb-1">
                        Step 4
                      </h6>
                      <p className="text-[14px] leading-relaxed  overflow-hidden text-wrap">
                        If you wish to get a better version of your CV, tap on
                        Fix My CV to create one!
                      </p>
                    </div>
                  </div>
                </div>
                {/* END STEPS */}
              </div>
              <div className="max-w-7xl mx-auto steps_intro lg:py-0 sm:p-5 p-5">
                <div className="flex lg:flex-row flex-col gap-10 my-10">
                  <div className="lg:w-[70%] w-full steps_content">
                    <h3 className="text-3xl text-black font-bold py-3">
                      What is ATS, and why do we need an ATS-friendly Resume?
                    </h3>
                    <p className="text-base py-3">
                      Wondering about the segregation process during CV
                      selection by the top recruiters across the globe? Well,
                      they use an ATS software.
                    </p>
                    <p className="text-base py-3">
                      <Link href={"/resume-analyzer"} className="font-bold">
                        Application Tracking System
                      </Link>
                      , alluded to as{" "}
                      <Link href={"/resume-analyzer"} className="font-bold">
                        ATS
                      </Link>
                      , is a pristine solution that scans and processes the
                      received job applications. ATS tracks the applications by
                      analysing the presence of relevant information and
                      presenting the data to the employer accordingly. Based on
                      the skills, experience, education, and more details, the
                      system provides an extensive overview of compatible
                      applications
                    </p>
                    <p className="text-base py-3">
                      An ATS Software simplifies the recruitment process. It
                      makes it easier for employers to find the best set of
                      candidates who are competent for the listed job position.
                      Resumes today need to be compatible with this system to
                      get picked out by the ATS. Therefore, creating an{" "}
                      <Link className="font-bold" href={"/resume-analyzer"}>
                        ATS friendly resume
                      </Link>{" "}
                      is the need of the hour. Genies Career Hub has
                      reverse-engineered this system to help you build the exact
                      resume that will attract the recruiters for your desired
                      job role.
                    </p>
                  </div>
                  <div className="lg:w-[30%] w-full h-auto image_content ">
                    <img
                      src="/ATS_Resume.png"
                      alt="icon4"
                      className="w-full h-full  object-contain"
                    />
                  </div>
                </div>

                {/*  */}
                <div className="flex lg:flex-row flex-col gap-5 my-20">
                  <div className="lg:w-[33%] w-full h-auto">
                    <img
                      src="/ResumeFormatForAppTracking.png"
                      alt="icon4"
                      className="w-full h-full  object-contain"
                    />
                  </div>
                  <div className="lg:w-[67%] w-full steps_content">
                    <h3 className="text-4xl text-black font-bold py-3 text-center md:text-right lg:text-right xl:text-right 2xl:text-right">
                      How to create a Resume compatible with ATS?
                    </h3>
                    <p className="text-base py-3">
                      At Genies Career Huh, we become the bridge between your
                      career approach and the volatile job market systems. We
                      help you understand if an ATS-friendly resume supports
                      your job application. By analysing your CV with the help
                      of Artificial Intelligence, trained by industry
                      professionals especially to find gaps in your resume, we
                      offer you insightful highlights and hints about your job
                      application.
                    </p>
                    <p className="text-base py-3">
                      But, the step prior to the optimisation is to create a
                      resume that is at least remotely relevant to the job
                      profile. Here is how you can make a CV that complies with
                      the Application Tracking System’s functionality!
                    </p>
                  </div>
                </div>

                {/*  */}

                <div className="step_1">
                  <div className="flex lg:flex-row flex-col gap-10 my-20 relative lg:p-1 p-5">
                    <div className="lg:w-[55%] w-full steps_content">
                      <h4 className="font-bold text-black text-2xl italic">
                        Step 1
                      </h4>
                      <h3 className="text-3xl text-black  py-3">
                        BASIC INFORMATION GOES IN
                      </h3>
                      <p className="text-base py-3">
                        Get your basic details such as Name, Job Title, Email
                        Address, Phone Number, Country, and City checked into a
                        suitable CV template.
                      </p>
                    </div>
                    <div className="lg:w-[45%] w-full h-[250px] image_content flex flex-col justify-start items-center">
                      <img
                        src="Artboard_ats.png"
                        alt="icon4"
                        className="object-contain mr-32"
                      />
                      <div className="flex lg:flex-row flex-col justify-center items-center">
                        <img
                          src="ats_basic_information.png"
                          alt="icon4"
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="arrow absolute left-[40%] -bottom-40">
                      <img
                        src="/ats_step_arrow_1.png"
                        alt="arrow"
                        className="w-52 h-52 object-contain lg:block hidden"
                      />
                      <img
                        src="/arrow2.png"
                        alt="arrow"
                        className="w-52 h-52 object-contain lg:hidden block"
                      />
                    </div>
                  </div>
                </div>
                <div className="step_2 relative">
                  <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                    <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent ">
                      <div className="flex justify-center items-center">
                        <img
                          src="/profile_update_ats.png"
                          alt="icon4"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="lg:w-[50%] w-full steps_content mt-10">
                      <h4 className="font-bold text-black text-2xl italic">
                        Step 2
                      </h4>
                      <h3 className="text-3xl text-black  py-3">
                        UPDATE THE PROFILE SECTION
                      </h3>

                      <p className="text-base py-3">
                        Your CV needs an abridgment of your professional
                        details, such as experiences, education, skills,
                        achievements, certifications, and much more, to actually
                        be an{" "}
                        <Link href={"/resume-analyzer"} className="font-bold">
                          ATS resume
                        </Link>
                        . The short description is fundamental as it offers a
                        profound understanding to your employers about your
                        professional journey. With our generate with AI option,
                        we assist you in writing each word of this summary. All
                        you need to do is enter basic information, such as job,
                        profile, timeline, brief highlights, and more, and the
                        AI will create the most fitting summary for you.
                      </p>
                      <p className="text-base py-3">
                        With Genius Career Hub, each step in the way of a career
                        pathway is made simpler. We uncomplicate every part of
                        the process for you to help you build a flawless
                        curriculum that passes through every ATS scan and
                        impresses each recruiter whose eyes it meets.
                      </p>
                    </div>
                  </div>
                  {/* <div className="pro_tips">
                    <div className="pro_image relative">
                      <img src="/pro-tips.png" alt="pro-tips" />
                      <p className="text-red-600 font-bold absolute top-3 left-8 text-xl">
                        Pro Tips !
                      </p>
                    </div>
                    <p className="text-xl px-5">
                      Do you wish to change the font style of the text? Yes, you
                      can! We provide you the choice of changing the font style
                      if you do not like the original one. 
                    </p>
                  </div> */}
                  <div className="arrow absolute left-[35%] -bottom-45">
                    <img
                      src="/ats_step_arrow_2.png"
                      alt="arrow"
                      className="w-52 h-52 object-contain"
                    />
                  </div>
                </div>
                <div className="step_3 relative">
                  <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                    <div className="lg:w-[50%] w-full steps_content mt-10">
                      <h4 className="font-bold text-black text-2xl italic">
                        Step 3
                      </h4>
                      <h3 className="text-3xl text-black  py-3">
                        ADD YOUR EDUCATIONAL BACKGROUND
                      </h3>
                      <p className="text-base py-3">
                        The next step in the process is to add your educational
                        background. In this section, you can mention the course
                        you have pursued, the affiliated institutions, and a
                        concise description of your academic experiences.
                      </p>
                      <p className="text-base py-3">
                        Using relevant keywords pertaining to job profile and
                        educational relevance is exactly how your resume becomes
                        compatible with the ATS intricacies.
                      </p>
                    </div>
                    <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:bg-transparent">
                      <div className="flex justify-center items-center">
                        <img
                          src="/profile_education_ats.png"
                          alt="icon4"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="pro_tips">
                    <div className="pro_image relative">
                      <img src="/pro-tips.png" alt="pro-tips" />
                      <p className="text-red-600 font-bold absolute top-3 left-8 text-xl">
                        Pro Tips !
                      </p>
                    </div>
                    <p className="text-xl px-5">
                      You can change the design of the templates anywhere in the
                      process of making your CV. 
                    </p>
                  </div> */}
                  <div className="arrow absolute left-[56%] -bottom-50">
                    <img
                      src="/ats_step_arrow_2.png"
                      alt="arrow"
                      className="w-52 h-52 object-contain lg:block hidden"
                    />
                    <img
                      src="/arrow2.png"
                      alt="arrow"
                      className="w-52 h-52 object-contain lg:hidden block"
                    />
                  </div>
                </div>
                <div className="step_4 relative">
                  <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                    <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent">
                      <div className="flex justify-center items-center">
                        <img
                          src="/profile_experience_ats.png"
                          alt="icon4"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="lg:w-[50%] w-full steps_content mt-16">
                      <h4 className="font-bold text-black text-2xl italic">
                        Step 4
                      </h4>
                      <h3 className="text-3xl text-black  py-3">
                        HIGHLIGHT PROFESSIONAL EXPERIENCES
                      </h3>
                      <p className="text-base py-3">
                        In a chronological or reverse chronological order, you
                        must fill in your professional experiences. Over the
                        years, the kind of cognizance you have gained at your
                        workspace must go in here. Add the essential details
                        such as job, title, employer, and specific description
                        of the experience to make this section professionally
                        richer.
                      </p>
                    </div>
                  </div>
                  {/* <div className="pro_tips">
                    <div className="pro_image relative">
                      <img src="/pro-tips.png" alt="pro-tips" />
                      <p className="text-red-600 font-bold absolute top-3 left-8 text-xl">
                        Pro Tips !
                      </p>
                    </div>
                    <p className="text-xl px-5">
                      Do you wish to change the shades other than the colors
                      provided? Go ahead and click on the selected color, change
                      the shade by doodling around, and set it 
                    </p>
                  </div> */}
                  <div className="arrow absolute left-[37%] -bottom-60">
                    <img
                      src="/ats_step_arrow_5.png"
                      alt="arrow"
                      className="w-52 h-52 object-contain lg:block hidden"
                    />
                    <img
                      src="/ats_step_arrow_2.png"
                      alt="arrow"
                      className="w-52 h-52 object-contain lg:hidden block"
                    />
                  </div>
                </div>
                <div className="step_5 relative">
                  <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                    <div className="lg:w-[50%] w-full steps_content mt-16">
                      <h4 className="font-bold text-black text-2xl italic">
                        Step 5
                      </h4>
                      <h3 className="text-3xl text-black  py-3">
                        PROJECTS, SKILLS, AND INTERESTS
                      </h3>
                      <p className="text-base py-3">
                        To make your CV more exciting and insightful, add the
                        details of the projects you have undertaken so far, the
                        skills that you have acquired, and the interests that
                        you have. Employers can assess your competency to fit
                        into the organisation and your possible compatibility
                        with the present team.
                      </p>
                    </div>
                    <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:bg-transparent">
                      <div className="flex justify-center items-center">
                        <img
                          src="/profile_skills_hobbies.png"
                          alt="icon5"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="pro_tips">
                <div className="pro_image relative">
                  <img src="/pro-tips.png" alt="pro-tips" />
                  <p className="text-red-600 font-bold absolute top-3 left-8 text-xl">
                    Pro Tips !
                  </p>
                </div>
                <p className="text-xl px-5">
                  Do you wish to change the shades other than the colors
                  provided? Go ahead and click on the selected color, change the
                  shade by doodling around, and set it 
                </p>
              </div> */}
                  <div className="arrow absolute left-[57%] -bottom-40">
                    <img
                      src="/ats_step_arrow_2.png"
                      alt="arrow"
                      className="w-52 h-52 object-contain lg:block hidden"
                    />
                    <img
                      src="/arrow2.png"
                      alt="arrow"
                      className="w-52 h-52 object-contain lg:hidden block"
                    />
                  </div>
                </div>
                <div className="step_6 relative">
                  <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                    <div className="lg:w-[50%] w-full h-[450px] image_content flex justify-center items-center lg:order-first order-last lg:bg-transparent">
                      <div className="flex flex-col gap-10 justify-start items-center mt-10">
                        <img
                          src="/profile_awards_certificates_language.png"
                          alt="icon5"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="lg:w-[50%] w-full steps_content">
                      <h4 className="font-bold text-black text-2xl italic">
                        Step 6
                      </h4>
                      <h3 className="text-3xl text-black  py-3">
                        AWARDS, REFERENCES, CERTIFICATIONS, AND LANGUAGES
                      </h3>
                      <p className="text-base py-3">
                        Creating a CV that is fun and functional at the same
                        time is precisely what you need to do. Hence, you can
                        add awards, professional references, essential
                        certifications, and language proficiencies to balance
                        out your CV. Resumes with complete details impose good
                        Imp ion on employers and widen the range of keywords
                        that the ATS software is precisely looking for.
                      </p>
                    </div>
                  </div>
                  {/* <div className="arrow absolute left-[35%] -bottom-40">
                    <img
                      src="/arrow2.png"
                      alt="arrow"
                      className="w-52 h-52 object-contain"
                    />
                  </div> */}
                </div>

                <div className="step_7 w-[80%]">
                  <h3 className="text-4xl text-black font-bold py-3">
                    YOUR ATS RESUME SCORE DECODED
                  </h3>
                  <p className="text-base py-3">
                    Are{" "}
                    <Link className="font-bold" href={"/resume-analyzer"}>
                      enhanced CV
                    </Link>{" "}
                    Creator helps you create a resume that is not only effulgent
                    but also efficacious. But our CV Optimiser translates your
                    present resume into an{" "}
                    <Link className="font-bold" href={"/resume-analyzer"}>
                      application tracking system resume
                    </Link>
                    . We provide you with an ATS score that helps you analyse
                    your resume quickly. We identify your gaps, constructively
                    criticize the content, and judge the relevance of your{" "}
                    <Link className="font-bold" href={"/resume-analyzer"}>
                      resume
                    </Link>{" "}
                    as per the{" "}
                    <Link className="font-bold" href={"/resume-analyzer"}>
                      ATS format
                    </Link>
                    . Higher the score, the higher the chances of your CV making
                    it through the initial rounds of selection.
                  </p>
                  <p className="text-base py-3">
                    We analyse your resume in three simple aspects. Further, we
                    help you optimise your{" "}
                    <Link className="font-bold" href={"/resume-analyzer"}>
                      resume format
                    </Link>{" "}
                    in these domains. To build an{" "}
                    <Link className="font-bold" href={"/resume-analyzer"}>
                      ATS resume
                    </Link>
                    , your CV must excel in all three of these sections.
                  </p>
                </div>
                {/*  */}
                <div className="max-w-7xl mx-auto mt-5 mb-10">
                  <h3 className="text-3xl text-black font-bold py-3">
                    A LEVELLING APPROACH TO CV OPTIMISATION
                  </h3>

                  {/* START- OUR THREE LEVEL OPTIMIZATION CHECKER */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
                    {/* Step 1 */}
                    <div className="relative w-[291px] h-[127px] bg-[url('/ats_3level_optimization_1.png')] bg-no-repeat bg-contain">
                      <div className="absolute inset-0 px-3 py-2 text-black">
                        <h6 className="text-[14px] font-bold text-[#2C98CA] mb-1">
                          1. CLARITY
                        </h6>
                        <p className="text-[14px] leading-relaxed  overflow-hidden text-wrap">
                          Gives you clarity of your resume in a clear and
                          concise manner
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative w-[291px] h-[127px] bg-[url('/ats_3level_optimization_2.png')] bg-no-repeat bg-contain">
                      <div className="absolute inset-0 px-3 py-2 text-black">
                        <h6 className="text-[14px] font-bold text-[#2C98CA] mb-1">
                          2. RELEVANCE
                        </h6>
                        <p className="text-[14px] leading-relaxed  overflow-hidden text-wrap">
                          Informs you about the relevance of your resume to the
                          job title.
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative w-[291px] h-[127px] bg-[url('/ats_3level_optimization_3.png')] bg-no-repeat bg-contain">
                      <div className="absolute inset-0 px-3 py-2 text-black">
                        <h6 className="text-[14px] font-bold text-[#2C98CA] mb-1">
                          3. CONTENT
                        </h6>
                        <p className="text-[14px] leading-relaxed overflow-hidden text-wrap">
                          Gives you an idea if your content contains of the
                          relevant information to the job profile.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* END- OUR THREE LEVEL OPTIMIZATION CHECKER */}
                </div>
                {/*  */}
                {/*  */}
                <div className="pro_tips">
                  <div className="pro_image relative">
                    <img src="/pro-tips.png" alt="pro-tips" />
                    <p className="text-[#FE2E12] font-bold absolute top-3 left-8 text-xl">
                      Pro Tip !
                    </p>
                  </div>
                  <p className="text-lg px-5">
                    Bothered by a low{" "}
                    <Link className="font-bold" href={"/resume-analyzer"}>
                      ATS System
                    </Link>{" "}
                    Score? Hike it right away. Rectify your CV by working out
                    the Optimiser&#39;s suggestions in your current{" "}
                    <Link className="font-bold" href={"/resume-analyzer"}>
                      resume ATS format
                    </Link>{" "}
                    and increase your{" "}
                    <Link className="font-bold" href={"/resume-analyzer"}>
                      ATS resume score
                    </Link>{" "}
                    in no time!
                  </p>
                </div>
                {/*  */}
                {/* step-1 */}
                <div className="step_6 relative">
                  <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                    <div className="lg:w-[50%] w-full steps_content order-first lg:order-first ">
                      {/* <h4 className="font-bold text-black text-2xl">Step 6</h4> */}
                      <h3 className="text-3xl text-black font-bold py-3">
                        HERE&#39;S HOW CV OPTIMISER HELPS YOU
                      </h3>
                      <p className="text-base py-3 font-medium">
                        Want to build a flawless CV? This is how our CV
                        Optimiser can assist you detect gaps in your resume and
                        optimise it thoroughly for the Application Tracking
                        Systems.
                      </p>

                      <p className="text-base py-3 font-bold">
                        1.Head to the CV Studio to open up the CV Optimiser. Tap
                        on the option to Optimise CV Now and upload your CV in
                        the pdf format.
                      </p>
                      <p className="text-sm py-3">
                        Can&#39;t find a CV pdf upload? Use our CV Creator and
                        create your resume instantly!
                      </p>
                    </div>
                    <div className="lg:w-[50%] w-full h-[250px] image_content flex justify-center items-center  lg:bg-transparent">
                      <div className="flex flex-col gap-10 justify-start items-center mt-0">
                        <img
                          src="/profile_ats_am_optimised_cv.png"
                          alt="icon5"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/*  */}
                {/* step-2 */}
                <div className="step_6 relative">
                  <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                    <div className="lg:w-[50%] w-full steps_content">
                      <p className="text-base py-3 font-bold">
                        2.Wait for the magic to unfurl and check your{" "}
                        <Link className="font-bold" href={"/resume-analyzer"}>
                          ATS score
                        </Link>{" "}
                        in the CV insights section
                      </p>
                      <p className="text-sm py-3">
                        The uploaded CV will be carefully analysed by the
                        Artificial Intelligence that is integrated into the CV
                        Optimiser. With a quick scan, we will decode every
                        aspect of your resume to check its compatibility with
                        the leading Application Tracking Systems employed by
                        recruiters across the globe in order to manage job
                        applications. The analysed document shall be ramified
                        into three aspects: Clarity, Relevance, and Content. A
                        complete percentage-wise score shall be reflected on
                        your screen that will provide you a remote insight into
                        your CV&#39;s compatibility and impressionable status.
                      </p>
                    </div>
                    <div className="lg:w-[50%] w-full h-[250px] image_content flex justify-center items-center  lg:bg-transparent  order-last lg:order-first">
                      <div className="flex flex-col gap-10 justify-start items-center mt-0">
                        <img
                          src="/profile_cv_insights.png"
                          alt="icon5"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/*  */}
                {/*step-3  */}
                {/* <div className="step_6 relative">
                  <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                    <div className="lg:w-[50%] w-full steps_content order-first lg:order-first ">
                      <p className="text-base py-3 font-bold">
                        3.Check out the detailed pointers to get a profound
                        understanding of your CV's status.
                      </p>
                      <p className="text-base py-3">
                        In all three aspects, Clarity, Relevance, and Content,
                        we break down the format, correctness, and written
                        content, respectively, to help you with suggestions on
                        how to improve the quality of your job application. The
                        suggestions will help you rectify and create a resume
                        that entirely stands out. You can review all the
                        pointers to create an{" "}
                        <Link className="font-bold" href={"/resume-analyzer"}>
                          enhanced resume
                        </Link>{" "}
                        and increase your chances of getting hired.
                      </p>
                    </div>
                    <div className="lg:w-[50%] w-full h-auto image_content flex justify-center items-center  lg:bg-transparent ">
                      <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row  gap-5 justify-start items-center mt-0">
                        <img
                          src="/profile_clarity_ats.png"
                          alt="icon5"
                          className="w-full h-full object-cover"
                        />
                        <img
                          src="/profile_relevance_ats.png"
                          alt="icon5"
                          className="w-full h-full object-cover"
                        />
                        <img
                          src="/profile_content_ats.png"
                          alt="icon5"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="step_6 relative">
                  <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                    {/* Content Section */}
                    <div className="lg:w-[50%] w-full steps_content order-first lg:order-first">
                      <p className="text-base py-3 font-bold">
                        3. Check out the detailed pointers to get a profound
                        understanding of your CV&#39;s status.
                      </p>
                      <p className="text-base py-3">
                        In all three aspects, Clarity, Relevance, and Content,
                        we break down the format, correctness, and written
                        content, respectively, to help you with suggestions on
                        how to improve the quality of your job application. The
                        suggestions will help you rectify and create a resume
                        that entirely stands out. You can review all the
                        pointers to create an{" "}
                        <Link className="font-bold" href={"/resume-analyzer"}>
                          enhanced resume
                        </Link>{" "}
                        and increase your chances of getting hired.
                      </p>
                    </div>

                    {/* Image Section */}
                    <div className="lg:w-[50%] w-full h-auto image_content flex justify-center items-center lg:bg-transparent">
                      <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-5 justify-center items-center">
                        <img
                          src="/profile_clarity_ats.png"
                          alt="icon1"
                          className="w-[150px] h-[150px] object-cover"
                        />
                        <img
                          src="/profile_relevance_ats.png"
                          alt="icon2"
                          className="w-[150px] h-[150px] object-cover"
                        />
                        <img
                          src="/profile_content_ats.png"
                          alt="icon3"
                          className="w-[150px] h-[150px] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/*  */}
                {/*step-4  */}
                <div className="step_6 relative">
                  <div className="flex lg:flex-row flex-col gap-10 mt-20 lg:p-1 p-5">
                    <div className="lg:w-[50%] w-full steps_content order-last lg:order-first ">
                      <p className="text-base py-3 font-bold">
                        4.Want to incorporate all the suggestions? Let us do
                        that for you. Just tap on Fix My CV!
                      </p>
                      <p className="text-sm py-3">
                        Make changes to your{" "}
                        <Link className="font-bold" href={"/resume-analyzer"}>
                          ATS-friendly resume
                        </Link>{" "}
                        by following the recommendations that will make the CV
                        an{" "}
                        <Link className="font-bold" href={"/resume-analyzer"}>
                          enhanced CV
                        </Link>
                        , and achieve a more significant{" "}
                        <Link className="font-bold" href={"/resume-analyzer"}>
                          ATS score
                        </Link>
                        . Take an overview of the details, the content, the
                        templates, and the colour at the end. Make changes
                        according to your preferences, and you will be able to
                        download the improvised resume quickly
                      </p>
                    </div>
                    <div className="lg:w-[50%] w-full h-[250px] image_content flex justify-center items-center  lg:bg-transparent hidden lg:block"></div>
                  </div>
                </div>
                {/*  */}
                {/*  */}
                <div className="pro_tips">
                  <div className="pro_image relative">
                    <img src="/pro-tips.png" alt="pro-tips" />
                    <p className="text-[#FE2E12] font-bold absolute top-3 left-8 text-xl">
                      Pro Tip !
                    </p>
                  </div>
                  <p className="text-lg px-5">
                    To check the optimisation score of your rectified CV, rescan
                    it through the{" "}
                    <Link className="font-bold" href={"/resume-analyzer"}>
                      ATS CV Checker
                    </Link>
                    . Get the confirmation of your CV&#39;s compatibility before
                    you finally send it to the recruiters.
                  </p>
                </div>
                {/*  */}

                {/*  */}
                <div className="flex lg:flex-row flex-col gap-10 my-10">
                  <div className="lg:w-[60%] w-full steps_content">
                    <h3 className="text-3xl text-black font-bold py-3">
                      How successfully can we help you in optimising your CV and
                      improve the ATS Score?
                    </h3>
                    <p className="text-base py-3">
                      Genies Career Hub&#39;s CV Optimiser is built around the
                      recruiting standards prevalent globally. We are determined
                      to provide job-seekers with an opportunity to improve
                      their{" "}
                      <Link className="font-bold" href={"/resume-analyzer"}>
                        ATS Resume
                      </Link>{" "}
                      scores. The{" "}
                      <Link className="font-bold" href={"/resume-analyzer"}>
                        ATS CV checker
                      </Link>{" "}
                      follows an analytical approach while dissecting the
                      resumes. It carefully examines your resume with the help
                      of Artificial Intelligence. The three traits, Clarity,
                      Relevance, and Content of your resume tell you about the
                      comprehensibility of your curriculum vitae.
                    </p>
                    <p className="text-base py-3">
                      After an intricate analysis, we help you with insights
                      into the key areas of improvement. This can either be
                      keywords or particulars referring to your job profile or
                      resume format&#39;s compatibility. By integrating these
                      suggestions, you can quickly improve your{" "}
                      <Link className="font-bold" href={"/resume-analyzer"}>
                        ATS scores
                      </Link>
                    </p>
                    <p className="text-base py-3">
                      This structured strategy accurately optimises resumes,
                      confirming our CV Optimiser as one of the prime tools in
                      the CV-building process. We secure that your CV is
                      entirely consistent and impressive to help you bag the job
                      you are eyeing!
                    </p>
                  </div>
                  <div className="lg:w-[40%] w-full h-auto image_content">
                    <img
                      src="/ats_resume_checker.png"
                      alt="icon4"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                {/*  */}
              </div>
            </section>
          </div>
          {/* NEW SECTION END */}
          {/* <div className="w-full mt-10 lg:mt-0">
            <div className="rounded-t-3xl border-t-8 border-blue-500 bg-gradient-to-b from-[#dcecff] to-white">
              <Slider />
            </div>
          </div> */}
        </section>
        <section className="faq py-20">
          <div className="max-w-7xl mx-auto flex lg:flex-row flex-col">
            <div className="faq_image lg:w-[50%] w-full lg:block hidden">
              <div className="image_div w-[400px] h-[400px]">
                <img src="/faq_image.png" alt="faq" className="w-full h-full" />
              </div>
            </div>
            <div className="faq_content lg:w-[50%] w-full lg:p-1 p-5">
              <h2 className="text-3xl text-center text-bold font-semibold my-5">
                Frequently Asked Questions
              </h2>
              {faqData?.map((item, index) => (
                <AccordionItem
                  open={index === open}
                  key={index}
                  ques={item?.ques}
                  ans={parse(item?.ans)}
                  pathname={pathname}
                  toggle={() => toggle(index)}
                />
              ))}
            </div>
          </div>
        </section>
        <WorkTogether />
        <Footer />
      </main>
    </>
  );
}
