"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Progress } from "@/components/ui/progress";
import FeedbackModal from "@/components/component/FeedbackModal";
import NewResumeLoader from "@/app/ui/newResumeLoader";
import { generateResumeOnFeeback, getBetterResume } from "@/app/pages/api/api";
import { toast } from "react-toastify";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { WiStars } from "react-icons/wi";
import "./header.css";
import { useResumeStore } from "@/app/store/ResumeStore";
import { GetTokens } from "@/app/actions";

export default function ResumeFeedback() {
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const replaceResumeData = useResumeStore((state) => state.replaceResumeData)
  const [modalsView, setModalsView] = useState({
    clarity: false,
    relevance: false,
    content: false,
  });
  const percentage = 66;



  const fetchBetterResume = async (resume) => {
    const { accessToken } = await GetTokens()
    try {
      const response = await generateResumeOnFeeback(resume, accessToken.value);
      if (response.status === 201) {
        return response.data.data;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBetterResumeContent = async () => {
    setIsLoading(true);
    const resume = localStorage.getItem("newResumeContent");
    if (resume) {
      const data = await fetchBetterResume(resume);
      if (data) {
        replaceResumeData(data)
        router.push("/builder");
      } else {
        toast.error("Unable to optimize resume");
      }
    }
  };

  const handleModalClose = (name) => {
    setModalsView({
      ...modalsView,
      [name]: false,
    });
  };

  const handleOpenModal = (name) => {
    const modalView = {
      clarity: false,
      relevance: false,
      content: false,
      [name]: true,
    };

    setModalsView(modalView);
  };

  useEffect(() => {
    let value = JSON.parse(localStorage.getItem("feedback"));
    setContent(value);
  }, []);

  return (
    <>
      {/* <Header/> */}
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
        <div className="bg-blue-50 w-full h-[400px] flex items-center justify-center">
          <div className="main_heading_section">
            <h1 className=" text-center lg:text-6xl text-4xl font-bold leading-snug pb-5 text-blue-900 mt-24">
              CV Analyser Insights
            </h1>
            <div className="flex justify-center text-center mt-10">
              <button
                class="button button--pipaluk button--inverted button--round-l button--text-thick button--text-upper"
                onClick={handleBetterResumeContent}
              >
                Optimize Now <WiStars className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>

        <div className="calculation_section bg-[#F1F6FA] pb-20">
          <div className="flex align-center px-10">
            <div className="flex flex-col justify-around progress_bar p-5 w-2/3">
              <div className="prograss_bar_box bg-white shadow-lg p-8  rounded-md">
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
              <div className="recommendation_section bg-white shadow-lg py-10 px-5 mt-3 rounded-md">
                <h3 className="text-xl font-bold">RECOMMENDATIONS</h3>
                <p className="text-sm my-2">
                  Get assistance from our CV Analyser to get a profound analysis
                  as per industry standards and get recommendations accordingly.
                </p>
                <div className="recommandation_list border-l-4 border-[#F89A14] p-5">
                  {Object.keys(content).length > 0 &&
                    content?.analysis?.feedback?.length > 0 ? (
                    <ul className="custom-counter">
                      {Object.keys(content).length > 0 &&
                        content.analysis.feedback.map((content, index) => {
                          return (
                            <li
                              className="text-sm flex items-center my-4"
                              key={index}
                            >
                              <span className=" shadow-2xl w-[30px] h-[30px] p-2 border rounded-full mr-3 flex items-center justify-center">
                                {index + 1}
                              </span>
                              <p>{content}</p>
                            </li>
                          );
                        })}
                    </ul>
                  ) : (
                    <ul className="custom-counter">
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
            <div className="bg-[#F1F6FA] p-5 w-1/3">
              <div className="flex w-full justify-around">
                <div className="flex flex-col space-y-5 justify-between">
                  <div className="bg-white overflow-hidden transition-shadow border rounded-lg shadow-sm hover:shadow-lg group">
                    <div className="px-4 sm:p-3 sm:px-8">
                      <div className="text-center">
                        <dd className="uppercase text-md leading-5 font-medium text-black truncate mb-4">
                          OverAll
                        </dd>
                      </div>
                      <div>
                        <div
                          style={{ width: 100, height: 100, margin: " 0 auto" }}
                        >
                          <CircularProgressbar
                            value={
                              Object.keys(content).length > 0
                                ? content?.analysis?.resume_score
                                : "0"
                            }
                            text={`${Object.keys(content).length > 0
                              ? content?.analysis?.resume_score
                              : "0"
                              }%`}
                          />
                        </div>
                      </div>
                      <div
                        className="lg:w-[120px] w-1/2 p-2 mt-3 bg-[#FFE9E9] text-center text-red-600 font-bold rounded-md whitespace-nowrap text-sm"
                      >
                        ATS Score
                      </div>
                    </div>
                  </div>
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
                        <div className="flex justify-center items-center pt-2">
                          {Object.keys(content).length > 0 &&
                            content?.clarity?.score > 80 ? (
                            <div
                              className="lg:w-[120px] w-1/2 p-2 bg-[#FFE9E9] text-green-600 font-bold rounded-md whitespace-nowrap text-sm"
                              onMouseEnter={() => handleOpenModal("clarity")}
                              onMouseLeave={() => handleModalClose("clarity")}
                            >
                              Excellent
                            </div>
                          ) : (
                            <div
                              className="lg:w-[120px] w-1/2 p-2 mt-3 bg-[#FFE9E9] text-red-600 font-bold rounded-md whitespace-nowrap text-sm"
                              onMouseEnter={() => handleOpenModal("clarity")}
                              onMouseLeave={() => handleModalClose("clarity")}
                            >
                              Needs Work
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <FeedbackModal
                      showModal={modalsView.clarity}
                      content={content?.clarity?.pointers}
                      onClick={handleBetterResumeContent}
                      onClose={() => handleModalClose("clarity")}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-5">
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
                            <div
                              className="lg:w-[120px] w-1/2 p-2 bg-[#FFE9E9] text-green-600 font-bold rounded-md whitespace-nowrap text-sm"
                              onMouseEnter={() => handleOpenModal("relevance")}
                              onMouseLeave={() => handleModalClose("relevance")}
                            >
                              Excellent
                            </div>
                          ) : (
                            <div
                              className="lg:w-[120px] w-1/2 p-2 mt-3 bg-[#FFE9E9] text-red-600 font-bold rounded-md whitespace-nowrap text-sm"
                              onMouseEnter={() => handleOpenModal("relevance")}
                              onMouseLeave={() => handleModalClose("relevance")}
                            >
                              Needs Work
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <FeedbackModal
                      showModal={modalsView.relevance}
                      content={content?.relevancy?.pointers}
                      onClick={handleBetterResumeContent}
                      onClose={() => handleModalClose("relevance")}
                    />
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
                            <div
                              className="lg:w-[120px] w-1/2 p-2 bg-[#FFE9E9] text-green-600 font-bold rounded-md whitespace-nowrap text-sm"
                              onMouseEnter={() => handleOpenModal("content")}
                              onMouseLeave={() => handleModalClose("content")}
                            >
                              Excellent
                            </div>
                          ) : (
                            <div
                              className="lg:w-[120px] w-1/2 p-2 mt-3 bg-[#FFE9E9] text-red-600 font-bold rounded-md whitespace-nowrap text-sm"
                              onMouseEnter={() => handleOpenModal("content")}
                              onMouseLeave={() => handleModalClose("content")}
                            >
                              Needs Work
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <FeedbackModal
                      showModal={modalsView.content}
                      content={content?.content_quality?.pointers}
                      onClick={handleBetterResumeContent}
                      onClose={() => handleModalClose("content")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
