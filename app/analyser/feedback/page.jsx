"use client";
// import AccordionSection from "@/src/shared/AccordionSection";
// import { Animate } from "@/src/shared/Animate";
// import ResumeBuilder from "@/src/shared/ResumeBuilder";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { Progress } from "@/components/ui/progress";

import FeedbackModal from "@/components/component/FeedbackModal";
import NewResumeLoader from "@/app/ui/newResumeLoader";
import { getBetterResume } from "@/app/pages/api/api";
import { toast } from "react-toastify";

export default function ResumeFeedback() {
  const [content, setContent] = useState({});
  const iframeRef = useRef(null);
  const [pdfFile, setPDFFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [modalsView, setModalsView] = useState({
    clarity: false,
    relevance: false,
    content: false,
  });

  useEffect(() => {
    const updateHeight = () => {
      if (iframeRef.current) {
        const width = iframeRef.current.offsetWidth;
        const height = width * 1.414; // Setting height to be 1.414 times the width
        iframeRef.current.style.height = `${height}px`;
      }
    };

    updateHeight(); // Call the function initially
    window.addEventListener("resize", updateHeight); // Update height on window resize

    return () => {
      window.removeEventListener("resize", updateHeight); // Clean up event listener
    };
  }, [pdfFile]);

  const fetchBetterResume = async (resume) => {
    try {
      const response = await getBetterResume(resume);
      let data;
      console.log(response.data);
      if (response.status === 200) {
        data = JSON.parse(response.data[0].text.value);
        return data.resume;
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
      if (data && Object.keys(data).length > 0) {
        let userResumeContent = JSON.parse(
          localStorage.getItem("resume-builder-parser-state")
        ) || { resume: {} };
        userResumeContent.resume = data;
        localStorage.setItem(
          "resume-builder-parser-state",
          JSON.stringify(userResumeContent)
        );
        router.push("/resume-builder");
      } else {
        toast.error("Something went wrong");
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
    console.log(modalView);
    setModalsView(modalView);
  };

  useEffect(() => {
    let pdfFile = JSON.parse(localStorage.getItem("pdfFile"));
    let value = JSON.parse(localStorage.getItem("feedback"));
    setPDFFile(pdfFile);
    setContent(value);
  }, []);

  return (
    <>
      {/* <Header/> */}
      <section className="analyser_resume_section" suppressHydrationWarning>
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
        <div
          className="bg-blue-50 w-full h-[500px] flex items-center justify-center"
          style={{
            backgroundImage: "url('/banner-bg.svg')",
            backgroundPosition: "center",
          }}
        >
          <div className="main_heading_section">
            <h1 className=" text-center lg:text-6xl text-3xl font-bold leading-snug pt-10 pb-5 text-blue-900">
              CV Analyser Insights
            </h1>
            <p className="lg:w-1/2 w-3/5 mx-auto text-center lg:text-base text-sm text-gray-600">
              Our CV Analyser is meticulously designed by a team of experienced
              professionals, recruiters, data analysts, and technical experts to
              curate compatible and optimized CVs. Check your CV Score, Content
              Suggestions, Recommendations, and more subsequently!
            </p>
          </div>
        </div>
        <div className="calculation_section py-10 bg-[#CCD8EE]">
          <div className="grid lg:grid-cols-12 grid-cols-1">
            <div className="lg:col-span-6 col-span-1">
              <div className="lg:pl-5 pl-0 grid grid-cols-1 lg:gap-1 gap-4 sm:grid-cols-4 px-5 mb-5">
                <div className="bg-white overflow-hidden shadow sm:rounded-lg ">
                  <div className="px-4 py-5 sm:p-6">
                    <dl className="mt-10 text-center">
                      <dd className="uppercase text-xl leading-5 font-medium text-black truncate">
                        OverAll
                      </dd>
                      <dd className="mt-1 text-base leading-9 font-bold text-black">
                        {Object.keys(content).length > 0
                          ? content?.analysis?.resume_score
                          : "0"}
                        /100
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-cyan-300 to-blue-200 overflow-hidden shadow sm:rounded-lg  group">
                  <div className="px-4 py-5 sm:p-6 group ">
                    <dl className="text-center">
                      <dt className="text-md leading-5 font-medium text-black truncate uppercase py-2">
                        Clarity
                      </dt>
                      <dd className="py-2 mt-1 text-base leading-5 font-bold text-black">
                        {Object.keys(content).length > 0 &&
                          content?.clarity?.score}
                        /100
                      </dd>
                      <dd className="pt-2">
                        {Object.keys(content).length > 0 &&
                        content?.clarity?.score > 80 ? (
                          <button
                            className="lg:w-[122px] w-1/2 p-3 bg-[#FFE9E9] text-green-600 font-bold rounded-md whitespace-nowrap text-base"
                            onClick={() => handleOpenModal("clarity")}
                          >
                            Excellent
                          </button>
                        ) : (
                          <button
                            className="lg:w-[122px] w-1/2 p-3 bg-[#FFE9E9] text-red-600 font-bold rounded-md whitespace-nowrap text-base"
                            onClick={() => handleOpenModal("clarity")}
                          >
                            Needs Work
                          </button>
                        )}
                      </dd>
                    </dl>
                  </div>
                  <FeedbackModal
                    showModal={modalsView.clarity}
                    content={content?.clarity?.pointers}
                    onClick={handleBetterResumeContent}
                    onClose={() => handleModalClose("clarity")}
                  />
                </div>
                <div className="bg-gradient-to-r from-cyan-300 to-blue-200 overflow-hidden shadow sm:rounded-lg group">
                  <div className="px-4 py-5 sm:p-6">
                    <dl className="text-center">
                      <dt className="text-md leading-5 font-medium text-black truncate uppercase py-2">
                        Relevance
                      </dt>
                      <dd className="py-2 mt-1 text-base leading-5 font-bold text-black">
                        {Object.keys(content).length > 0 &&
                          content?.relevancy?.score}
                        /100
                      </dd>
                      <dd className="pt-2">
                        {Object.keys(content).length > 0 &&
                        content?.relevancy?.score > 80 ? (
                          <button
                            className="lg:w-[122px] w-1/2 p-3 bg-[#FFE9E9] text-green-600 font-bold rounded-md whitespace-nowrap text-base"
                            onClick={() => handleOpenModal("relevance")}
                          >
                            Excellent
                          </button>
                        ) : (
                          <button
                            className="lg:w-[122px] w-1/2 p-3 bg-[#FFE9E9] text-red-600 font-bold rounded-md whitespace-nowrap text-base"
                            onClick={() => handleOpenModal("relevance")}
                          >
                            Needs Work
                          </button>
                        )}
                      </dd>
                    </dl>
                  </div>
                  <FeedbackModal
                    showModal={modalsView.relevance}
                    content={content?.relevancy?.pointers}
                    onClick={handleBetterResumeContent}
                    onClose={() => handleModalClose("relevance")}
                  />
                </div>
                <div className="bg-gradient-to-r from-cyan-300 to-blue-200 overflow-hidden shadow sm:rounded-lg group">
                  <div className="px-4 py-5 sm:p-6">
                    <dl className="text-center">
                      <dt className="text-md leading-5 font-medium text-black truncate uppercase py-2">
                        Content
                      </dt>
                      <dd className="py-2 mt-1 text-base leading-5 font-bold text-black">
                        {content?.content_quality?.score}/100
                      </dd>
                      <dd className="pt-2">
                        {Object.keys(content).length > 0 &&
                        content?.content_quality?.score > 80 ? (
                          <button
                            className="lg:w-[122px] w-1/2 p-3 bg-[#FFE9E9] text-green-600 font-bold rounded-md whitespace-nowrap text-base"
                            onClick={() => handleOpenModal("content")}
                          >
                            Excellent
                          </button>
                        ) : (
                          <button
                            className="lg:w-[122px] w-1/2 p-3 bg-[#FFE9E9] text-red-600 font-bold rounded-md whitespace-nowrap text-base"
                            onClick={() => handleOpenModal("content")}
                          >
                            Needs Work
                          </button>
                        )}
                      </dd>
                    </dl>
                  </div>
                  <FeedbackModal
                    showModal={modalsView.content}
                    content={content?.content_quality?.pointers}
                    onClick={handleBetterResumeContent}
                    onClose={() => handleModalClose("content")}
                  />
                </div>
              </div>
              <div className="progress_bar p-5 ">
                <div className="prograss_bar_box bg-white shadow-lg p-8 mb-8 rounded-md mt-2">
                  <p className="tracking-wider">
                    Your resume ATS score is{" "}
                    <span
                      className={`${
                        content?.analysis?.resume_score > 65
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
                        className={"h-5"}
                      />
                    </div>
                  </div>
                </div>
                <div className="recommendation_section bg-white shadow-lg py-10 px-5 mt-3 rounded-md ">
                  <h3 className="text-xl font-bold">RECOMMENDATIONS</h3>
                  <p className="text-sm my-2">
                    Get assistance from our CV Analyser to get a profound
                    analysis as per industry standards and get recommendations
                    accordingly.
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
                                <span className=" shadow-2xl w-[35px] h-[30px] p-2 border rounded-full mr-3 flex items-center justify-center">
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
                {/* <div className="recommandation_button my-10">
                                        <button className="text-sm my-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md">
                                            View Templates
                                        </button>
                                        <button className="lg:mx-3 mx-2 text-sm px-5 py-3 bg-transparent text-black rounded-md border border-gray-400">
                                            Check the Result by Genie
                                        </button>
                                    </div> */}
              </div>
            </div>
            <div className="lg:col-span-6 col-span-1 lg:w-full w-4/5 mx-auto h-full">
              <div>
                {pdfFile && (
                  <iframe
                    ref={iframeRef}
                    src={`${pdfFile}#toolbar=0`}
                    frameBorder="0"
                    className="w-full"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="resume_builder py-20">
                <ResumeBuilder />
            </div>
            <div className="referal_program">
                <Animate />
            </div>
            <div className="accordion_section py-10 bg-white">
                <AccordionSection />
            </div> */}
    </>
  );
}
