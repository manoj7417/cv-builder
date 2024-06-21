"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import NewResumeLoader from "@/app/ui/newResumeLoader";
import { generateResumeOnFeeback, Payment } from "@/app/api/api";
import { toast } from "react-toastify";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./header.css";
import { useResumeStore } from "@/app/store/ResumeStore";
import { GetTokens } from "@/app/actions";
import { FaCrown } from "react-icons/fa";

import { useUserStore } from "@/app/store/UserStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import JobMultistepForm from "@/components/component/JobMultistepForm";
import "@/app/components/HomepageNew/Homepage.css";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa6";
import axios from "axios";
import Lottie from "lottie-react";
import uploadAnimation from '@/public/animations/uploadCVLoader.json'
import scratchAnimation from '@/public/animations/startfromStratch.json'

const FeedbackFuction = () => {
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const replaceResumeData = useResumeStore((state) => state.replaceResumeData);
  const { userdata } = useUserStore((state) => state.userState);
  const updateUserData = useUserStore((state) => state.updateUserData);
  const resumeData = useResumeStore((state) => state.resume.data);
  const initialState = {
    fullname: userdata?.fullname || "",
    email: userdata?.email || "",
    jobTitle: "",
    country: "",
    city: "",
    isFresher: false,
    experience: [],
    skills: [],
    education: [],
    projects: [],
  };
  const [steps, setSteps] = useState(1);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [formData, setFormData] = useState(initialState);
  const [showMultiStepDialog, setshowMultiStepDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const fetchBetterResume = async () => {
    const { accessToken } = await GetTokens();
    const message = localStorage.getItem('newResumeContent')
    setShowDialog(false)
    setIsLoading(true)
    try {
      const response = await axios.post('/api/generateResumeOnFeedback', { message }, {
        headers: {
          Authorization: 'Bearer ' + accessToken.value
        }
      })
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlepayment = async () => {
    const { accessToken } = await GetTokens();
    Payment(
      {
        amount: 10,
        email: userdata.email,
        name: "aman",
        url: "https://career-genies-frontend.vercel.app/paymentSuccess?type=feedback",
        cancel_url: window.location.href,
        templateName: resumeData.metadata.template,
      },
      accessToken.value
    )
      .then((response) => {
        const { url } = response.data;
        window.location = url;
      })
      .catch((error) => {
        console.error(
          error.response ? error.response.data.error : error.message
        );
      });
  };

  const handleBetterResumeContent = async () => {
    if (!userdata?.tokens) {
      return handlepayment();
    }
    setshowMultiStepDialog(true);
  };

  const handleCloseMultistepForm = () => {
    setshowMultiStepDialog(false);
    setFormData({
      fullname: userdata?.fullname || "",
      email: userdata?.email || "",
      jobTitle: "",
      country: "",
      city: "",
      isFresher: false,
      experience: [],
      skills: [],
      education: [],
      projects: [],
    });
    setSteps(1);
  };

  const handleShowMultiStepForm = () => {
    setshowMultiStepDialog(true);
    setShowDialog(false)
  }

  useEffect(() => {
    let value = JSON.parse(localStorage.getItem("feedback"));
    setContent(value);
  }, []);

  useEffect(() => {
    if (status === "success") {
      handleBetterResumeContent();
    }
  }, [status]);

  return (
    <>
      <Dialog open={showDialog} >
<DialogContent className="max-w-[60dvw]  p-0" showCloseButton={true} onClick={() => setShowDialog(false)}>
          <div className="flex w-full bg-gradient-to-r bg-gray-100 p-6 rounded-xl justify-around">
            <div className="flex flex-col  items-center w-[45%] shadow-lg rounded-lg transition delay-150 duration-300 hover:scale-105 ease-in-out cursor-pointer bg-white" onClick={fetchBetterResume}>
              <div className="w-full h-[70%]">
                <Lottie animationData={uploadAnimation} className="h-full w-full" />
              </div>
              <div className="w-full h-[30%]  justify-center items-center flex">
                <p className="font-bold text-2xl text-blue-900">Optimize current CV</p>
              </div>

            </div>
            <div className="flex flex-col justify-center items-center w-[45%] shadow-lg rounded-lg transition delay-150 duration-300 ease-in-out cursor-pointer hover:scale-105 bg-white" onClick={handleShowMultiStepForm}>
              <div className="w-full h-[70%]">
                <Lottie animationData={scratchAnimation} />
              </div>
              <div clas
                sName="w-full h-[30%] justify-center items-center flex">
                <p className="font-bold text-2xl text-blue-900">Build from scratch</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showMultiStepDialog}>
        <JobMultistepForm
          showMultiStepDialog={showMultiStepDialog}
          handleCloseMultistepForm={handleCloseMultistepForm}
          steps={steps}
          setSteps={setSteps}
          formData={formData}
          setFormData={setFormData}
        />
      </Dialog>
      <section className="analyser_resume_section " suppressHydrationWarning>
        {isLoading && (
          <div
            className="fixed w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center top-0 left-0"
            style={{
              zIndex: 9999,
            }}
          >
            <NewResumeLoader />
          </div>
        )}
        <div className="w-full mb-6 flex items-center justify-center">
          <div className="main_heading_section">
            <h1 className=" text-center lg:text-6xl text-4xl font-bold leading-snug mb-4 text-blue-400  mt-28">
              CV <span className="text-blue-950">Insights</span>
            </h1>
            <p className="text-lg text-gray-500">
              Get a better understanding of your resume and improve your chances
              of getting hired.
            </p>
          </div>
        </div>

        <div
          className="w-5/6 mx-auto mb-10  rounded-2xl"
          style={{
            borderWidth: "16px",
            borderColor: "#F1F6FA",
            borderRadius: "40px",
            borderStyle: "solid",
          }}
        >
          <div>
            <div className="recommendation_section pt-10 px-5 ">
              <div className="prograss_bar_box bg-white  rounded-md">
                <p className="tracking-wider">
                  Your resume ATS score is{" "}
                  <span
                    className={`${content?.analysis?.resume_score > 65
                      ? "text-green-400"
                      : "text-red-500"
                      } font-bold`}
                  >
                    {content ? content?.analysis?.resume_score : "0"}
                  </span>{" "}
                  out of 100.
                </p>
                <div className="w-full  my-2.5  overflow-hidden  ">
                  <div className=" relative h-7 w-full rounded-2xl">
                    <Progress
                      value={content?.analysis?.resume_score}
                      className={"h-5 bg-gray-200"}
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold">Feedback</h3>
              <p className="text-sm my-2">
                By following the recommendations below, you can improve your
                resume and increase your chances of getting hired.
              </p>
              <div className="flex flex-col space-y-5 justify-between">
                <div className="bg-white overflow-hidden transition-shadow border rounded-lg shadow-sm hover:shadow-lg group">
                  <div className="px-4 py-5 sm:p-3 sm:px-8">
                    <div className="text-center">
                      <div className="text-md leading-5 font-medium text-black truncate uppercase mb-2">
                        Clarity
                      </div>
                      <div>
                        <div
                          style={{
                            width: 100,
                            height: 100,
                            margin: " 0 auto",
                          }}
                        >
                          <CircularProgressbar
                            value={
                              Object.keys(content).length > 0
                                ? content?.clarity?.score
                                : "0"
                            }
                            text={`${Object.keys(content).length > 0
                              ? content?.clarity?.score
                              : "0"
                              }%`}
                          />
                        </div>
                      </div>
                      <div className="pt-2 flex justify-center items-center">
                        {Object.keys(content).length > 0 &&
                          content?.clarity?.score > 80 ? (
                          <div className="lg:w-[120px] w-1/2 p-2 bg-[#FFE9E9] text-green-600 font-bold rounded-md whitespace-nowrap text-sm">
                            Excellent
                          </div>
                        ) : (
                          <div className="lg:w-[120px] w-1/2 p-2 mt-3 bg-[#FFE9E9] text-red-600 font-bold rounded-md whitespace-nowrap text-sm">
                            Needs Work
                          </div>
                        )}
                      </div>
                      <div className="pt-2 text-left border-l-4 border-[#F89A14] p-5">
                        <ul className="custom-counter">
                          {content?.clarity?.pointers.map((pointer, index) => (
                            <li
                              key={index}
                              className="text-sm flex items-center my-4"
                            >
                              <span className="shadow-2xl w-[30px] h-[30px] p-2 border rounded-full mr-3 flex items-center justify-center">
                                {index + 1}
                              </span>
                              <p>{pointer}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden transition-shadow border rounded-lg shadow-sm hover:shadow-lg group">
                  <div className="px-4 py-5 sm:p-3 sm:px-8">
                    <div className="text-center">
                      <div className="text-md leading-5 font-medium text-black truncate uppercase mb-2">
                        Relevance
                      </div>
                      <div>
                        <div
                          style={{
                            width: 100,
                            height: 100,
                            margin: " 0 auto",
                          }}
                        >
                          <CircularProgressbar
                            value={
                              Object.keys(content).length > 0
                                ? content?.relevancy?.score
                                : "0"
                            }
                            text={`${Object.keys(content).length > 0
                              ? content?.relevancy?.score
                              : "0"
                              }%`}
                            styles={buildStyles({
                              textColor: "red",
                              pathColor: "turquoise",
                            })}
                          />
                        </div>
                      </div>
                      <div className="pt-2 flex justify-center items-center">
                        {Object.keys(content).length > 0 &&
                          content?.relevancy?.score > 80 ? (
                          <div className="lg:w-[120px] w-1/2 p-2 bg-[#FFE9E9] text-green-600 font-bold rounded-md whitespace-nowrap text-sm">
                            Excellent
                          </div>
                        ) : (
                          <div className="lg:w-[120px] w-1/2 p-2 mt-3 bg-[#FFE9E9] text-red-600 font-bold rounded-md whitespace-nowrap text-sm">
                            Needs Work
                          </div>
                        )}
                      </div>
                      <div className="pt-2 text-left border-l-4 border-[#F89A14] p-5">
                        <ul className="custom-counter">
                          {content?.relevancy?.pointers.map(
                            (pointer, index) => (
                              <li
                                key={index}
                                className="text-sm flex items-center my-4"
                              >
                                <span className="shadow-2xl w-[30px] h-[30px] p-2 border rounded-full mr-3 flex items-center justify-center">
                                  {index + 1}
                                </span>
                                <p>{pointer}</p>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden transition-shadow border rounded-lg shadow-sm hover:shadow-lg group">
                  <div className="px-4 py-5 sm:p-3 sm:px-8">
                    <div className="text-center">
                      <div className="text-md leading-5 font-medium text-black truncate uppercase mb-2">
                        Content
                      </div>
                      <div>
                        <div
                          style={{
                            width: 100,
                            height: 100,
                            margin: " 0 auto",
                          }}
                        >
                          <CircularProgressbar
                            value={
                              Object.keys(content).length > 0
                                ? content?.content_quality?.score
                                : "0"
                            }
                            text={`${Object.keys(content).length > 0
                              ? content?.content_quality?.score
                              : "0"
                              }%`}
                            styles={buildStyles({
                              textColor: "red",
                              pathColor: "#F89A14",
                            })}
                          />
                        </div>
                      </div>
                      <div className="pt-2 flex justify-center items-center">
                        {Object.keys(content).length > 0 &&
                          content?.content_quality?.score > 80 ? (
                          <div className="lg:w-[120px] w-1/2 p-2 bg-[#FFE9E9] text-green-600 font-bold rounded-md whitespace-nowrap text-sm">
                            Excellent
                          </div>
                        ) : (
                          <div className="lg:w-[120px] w-1/2 p-2 mt-3 bg-[#FFE9E9] text-red-600 font-bold rounded-md whitespace-nowrap text-sm">
                            Needs Work
                          </div>
                        )}
                      </div>
                      <div className="pt-2 text-left border-l-4 border-[#F89A14] p-5">
                        <ul className="custom-counter">
                          {content?.content_quality?.pointers.map(
                            (pointer, index) => (
                              <li
                                key={index}
                                className="text-sm flex items-center my-4"
                              >
                                <span className="shadow-2xl w-[30px] h-[30px] p-2 border rounded-full mr-3 flex items-center justify-center">
                                  {index + 1}
                                </span>
                                <p>{pointer}</p>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="recommendation_section bg-white shadow-lg pt-10 px-5 mt-3 rounded-md">
                <h3 className="text-xl font-bold">Your Resume Overview</h3>
                <p className="text-sm my-2">
                  Here is how your resume is currently performing in terms of
                  the ATS score, clarity, relevance and content.
                </p>
                <div className="recommandation_list border-l-4 border-[#F89A14] p-5 mb-5">
                  {Object.keys(content).length > 0 &&
                    content?.analysis?.feedback?.length > 0 ? (
                    <ul className="custom-counter">
                      {content.analysis.feedback.map((feedback, index) => (
                        <li
                          key={index}
                          className="text-sm flex items-center my-4"
                        >
                          <span className="shadow-2xl w-[30px] h-[30px] p-2 border rounded-full mr-3 flex items-center justify-center">
                            {index + 1}
                          </span>
                          <p>{feedback}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="custom-counter border-l-4 border-[#F89A14] p-5">
                      <li className="text-sm">
                        <span className="text-black font-semibold">
                          Utilize our CV checker to compare your resume
                        </span>{" "}
                        against those from successful candidates hired at
                        leading global companies in our database.
                      </li>
                      <li className="text-sm">
                        <span className="text-black font-semibold">
                          Utilize our CV checker to compare your resume
                        </span>{" "}
                        against those from successful candidates hired at
                        leading global companies in our database.
                      </li>
                      <li className="text-sm">
                        <span className="text-black font-semibold">
                          Utilize our CV checker to compare your resume
                        </span>{" "}
                        against those from successful candidates hired at
                        leading global companies in our database.
                      </li>
                      <li className="text-sm">
                        <span className="text-black font-semibold">
                          Utilize our CV checker to compare your resume
                        </span>{" "}
                        against those from successful candidates hired at
                        leading global companies in our database.
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <button
          className="fixed flex items-center bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-950 text-white py-2 px-4 rounded-full shadow-lg"
          onClick={handleBetterResumeContent}
        >
          Fix My CV <FaCrown className="ml-1 text-yellow-300" />
        </button> */}
        <div className="button_wrapper mb-5 fixed bottom-5 left-[44%]">
          <button className="get_start_btn floating" onClick={() => setShowDialog(true)}>
            <span className="btn_text">Fix My CV</span>
            <div className="btn_overlay">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg> */}
              <FaCrown className="ml-1 text-yellow-500" />
            </div>
          </button>
        </div>
      </section>
    </>
  );
};

export default function ResumeFeedback() {
  return (
    <Suspense>
      <FeedbackFuction />
    </Suspense>
  );
}
