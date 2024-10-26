"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import NewResumeLoader from "@/app/ui/newResumeLoader";
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
import axios from "axios";

import ServicesPopUp from "@/components/component/ServicesPopUp";
import { Button } from "@/components/ui/button";

const FeedbackFuction = () => {
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();
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
  const [formData, setFormData] = useState(initialState);
  const [showMultiStepDialog, setshowMultiStepDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const updateRedirectPricingRoute = useUserStore(state => state.updateRedirectPricingRoute)
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  // The resume you are looking for can not be found or is with restricted access.
  const fetchBetterResume = async () => {
    const { accessToken } = await GetTokens();
    const analysisId = content?._id;
    setShowDialog(false)
    setIsLoading(true)
    try {
      const response = await axios.post('/api/generateResumeOnFeedback', { analysisId, type: "optimizer" }, {
        headers: {
          Authorization: 'Bearer ' + accessToken.value
        }
      })
      if (response.status === 201) {
        replaceResumeData(response.data.data)
        updateUserData(response.data.userdata)
        router.push('/resume-builder')
      }
    } catch (error) {
      if (error.response.status === 403) {
        if (error.response.data.error === 'Insufficient optimizer tokens') {
          if (userdata.subscription.plan.includes('CVSTUDIO')) {
            return setIsServiceDialogOpen(true)
          } else {
            toast.info("Please subscribe to Genies Pro Suit to use this service", { autoClose: 10000 })
            return router.push('/pricing?scroll=1')
          }
        } else {
          toast.info("You do not have a valid plan.", { autoclose: 10000 })
          return router.push("/pricing?scroll=1")
        }
      }
    } finally {
      setIsLoading(false);
    }
  };



  const handleBetterResumeContent = async () => {
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


  const fetchAnalysisScore = async (id) => {
    const { accessToken } = await GetTokens();
    try {
      const response = await axios.post('/api/analysisScore', { id }, {
        headers: {
          Authorization: 'Bearer ' + accessToken.value
        }
      })
      setContent(response.data.data)
    } catch (error) {
      setIsError(true)
    }
  }

  useEffect(() => {
    fetchAnalysisScore(id)
  }, [id]);

  return (
    <>
      <Dialog open={isServiceDialogOpen}>
        <ServicesPopUp
          isServiceDialogOpen={isServiceDialogOpen}
          setIsServiceDialogOpen={setIsServiceDialogOpen}
          serviceName="Create CV"
        />
      </Dialog>
      <Dialog open={showDialog} >
        <DialogContent className="sm:max-w-[60dvw] w-96 sm:w-full rounded-xl" showCloseButton={true} onClick={() => setShowDialog(false)}>
          <h1 className="text-center pt-4 text-xl font-bold text-gray-500">
            Upload and attach files, or start afresh!
          </h1>
          <p className="text-center text-sm sm:text-lg md:px-12 sm:px-12 text-gray-500">
            Drag and drop your resume file or upload from Google Drive or
            Dropbox. We can also send you an email to reply with your
            attachment whenever you are ready.
          </p>
          <div className="flex w-full flex-col md:flex-row sm:flex-row gap-8 bg-gradient-to-r bg-white p-6 rounded-xl justify-around">
            <div
              className="flex items-center justify-center w-[100%] md:w-[100%] sm:w-[50%]"
              onClick={fetchBetterResume}
            >
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full sm:h-64 h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500">
                    <span class="font-semibold">Optimize</span> current resume
                  </p>
                </div>
              </label>
            </div>
            <div
              className="flex flex-col justify-center items-center  w-[100%] md:w-[100%] sm:w-[50%]  cursor-pointer border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 "
              onClick={handleShowMultiStepForm}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m0 0-3-3m3 3 3-3M4 12h16m0 0-3 3m3-3-3-3"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">
                    Start Afresh...
                  </span>
                </p>
                <p className="text-xs text-gray-500 text-center">
                  Personalized career advice, CV building, and more.
                </p>
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
          type={'optimizer'}
          setIsServiceDialogOpen={setIsServiceDialogOpen}
        />
      </Dialog>
      {
        isError ? (
          <div className="w-full h-[80dvh] flex flex-col items-center justify-center border p-10 sm:p-0">
            <p className="text-md text-center sm:text-xl">The resume feedback you are looking for can not be found or is with restricted access.</p>
            <Button onClick={() => router.push('/')} className="mt-4">Homepage</Button>
          </div >
        ) :
          (<section className="analyser_resume_section " suppressHydrationWarning>
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
                <p className="text-lg text-gray-500 text-center">
                  Get a better understanding of your resume and improve your chances
                  of getting hired.
                </p>
              </div>
            </div>

            <div
              className="w-full sm:w-4/5 mx-auto mb-10  rounded-2xl"
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
                    <p className="">
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
                              Utilise  our CV checker to compare your resume
                            </span>{" "}
                            against those from successful candidates hired at
                            leading global companies in our database.
                          </li>
                          <li className="text-sm">
                            <span className="text-black font-semibold">
                              Utilise  our CV checker to compare your resume
                            </span>{" "}
                            against those from successful candidates hired at
                            leading global companies in our database.
                          </li>
                          <li className="text-sm">
                            <span className="text-black font-semibold">
                              Utilise  our CV checker to compare your resume
                            </span>{" "}
                            against those from successful candidates hired at
                            leading global companies in our database.
                          </li>
                          <li className="text-sm">
                            <span className="text-black font-semibold">
                              Utilise  our CV checker to compare your resume
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
            {/* <div className="button_wrapper mb-5 fixed bottom-5 left-[20%] sm:left-[44%] md:left-[44%] lg:left-[44%] xl:left-[44%] 2xl:left-[44%] ">
            <button className="get_start_btn floating" onClick={() => setShowDialog(true)}>
              <span className="btn_text">Fix My CV</span>
              <div className="btn_overlay">
                             <FaCrown className="ml-1 text-yellow-500" />
              </div>
            </button>
          </div> */}
            <div className="button_wrapper mb-5 fixed bottom-5 left-1/2 transform -translate-x-1/2">
              <button className="get_start_btn floating" onClick={() => setShowDialog(true)}>
                <span className="btn_text">Fix My CV</span>
                <div className="btn_overlay">

                  <FaCrown className="ml-1 text-yellow-500" />
                </div>
              </button>
            </div>

          </section >)
      }

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
