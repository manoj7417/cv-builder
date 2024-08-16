"use client";
import { useEffect, useState } from "react";
import UserData from "./UserData";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { GetTokens } from "../actions";
import { TiTick } from "react-icons/ti";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import CustomLoader from "../ui/CustomLoader";
import "./CareerCounselling.css";
import { generateCareerAdvice } from "../api/api";
import { useUserDataStore } from "../store/useUserDataStore";
import CareerSummary from "./CareerSummary";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ImSpinner3 } from "react-icons/im";
import { ResumeHeader } from "../Layout/ResumeHeader";

export default function Page() {
  const [showIntro, setShowIntro] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [userData, setUserData] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const [cardData, setCardData] = useState(null);
  const [testSummary, setTestSummary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startingTest, setStartingTest] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  console.log("popupData::", popupData);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const {
    answers,
    setAnswers,
    contentType,
    setContentType,
    nextStep,
    previousStep,
    currentStep,
    setSummary,
    careerSummary,
    resetData,
  } = useUserDataStore();
  const router = useRouter();
  const categories =
    Object.keys(answers).length > 0 ? Object.keys(answers) : null;

  const handleInputChange = (category, questionIndex, newAnswer) => {
    const newAnswers = {
      ...answers,
      [category]: answers[category].map((item, index) => {
        if (index === questionIndex) {
          return { ...item, answer: newAnswer };
        }
        return item;
      }),
    };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    window.scrollTo(0, 0);

    const currentCategory = categories[currentStep];
    const currentCategoryQuestions = answers[currentCategory] || [];

    // Check if every question in the current category has a non-empty answer
    const allAnswered = currentCategoryQuestions.every((questionObj) => {
      // First, check if the answer key exists
      if (!questionObj.hasOwnProperty("answer")) {
        return false;
      }
      // Then, check if the answer is not empty
      return questionObj.answer.trim() !== "";
    });

    if (allAnswered) {
      setIsValid(false);
      nextStep();
    } else {
      setIsValid(true);
    }
  };

  const handlePrevious = () => {
    previousStep();
    setIsValid(false);
  };

  const handleSubmit = async () => {
    if (
      answers[categories[currentStep]].every(
        (questionObj) => questionObj.answer.trim() !== ""
      )
    ) {
      setShowDialog(true);
      try {
        const { accessToken } = await GetTokens();
        const token = accessToken.value;

        // Transform answers into the format expected by the API
        let content = categories.map((category) =>
          answers[category].map((questionObj) => ({
            question: questionObj.question,
            answer: questionObj.answer,
          }))
        );

        content = JSON.stringify(content);
        const responseData = await generateCareerAdvice(content, token);
        const parsedData = JSON.parse(responseData.data[0].text.value);
        console.log(parsedData);
        setSummary(parsedData);
        setContentType("summary");
        setShowPopup(true);
        setCardData(parsedData);
        // Fetch the updated summary data
        await fetchSummary();
        resetData();
        setTestSummary(true);
      } catch (error) {
        console.log(error);
      } finally {
        setShowDialog(false);
      }
      // setApiResponse(data);
      setUserData(false);
    } else {
      setIsValid(true);
    }
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleReadMore = (e, data) => {
    e.stopPropagation();
    setCardData(data);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const fetchSummary = async () => {
    const { accessToken } = await GetTokens();
    if (!accessToken) return;
    const token = accessToken?.value;
    // Fetch user details from API or database
    try {
      const response = await axios.get("/api/getSummary", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setPopupData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartTest = async () => {
    setStartingTest(true);
    const { accessToken } = await GetTokens();
    const token = accessToken.value;
    try {
      const response = await axios.get("/api/checkEligibility", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        setContentType("userData");
      }
    } catch (error) {
      console.log(error.response.status === 403);
      error.response.status === 403 && router.push("/pricing");
    } finally {
      setStartingTest(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <>
      <ResumeHeader />
      <section className="career_counselling">
        <div className="flex min-h-[500px] w-full bg-background p-5">
          <div className="flex flex-col flex-1 sm:gap-4 sm:py-4 sm:pl-14">
            <main className="flex flex-1 flex-row lg:flex-col gap-4 p-4 sm:px-6 sm:py-0">
              <div className="w-full flex lg:flex-row flex-col mt-20">
                {contentType === "Intro" && (
                  <div className="flex justify-center items-center flex-1 mt-10">
                    <div className="text-center">
                      <h1 className="text-2xl lg:text-5xl  font-bold text-blue-950">
                        Welcome to the Career Counselling
                      </h1>
                      <p className="mt-4 lg:w-1/2 w-full mx-auto">
                        Please take a few moments to answer the following
                        questions. Your responses will help us better understand
                        your current pursuits, hobbies, strengths, and career
                        aspirations.
                      </p>
                      <Button
                        onClick={handleStartTest}
                        className="mt-6 bg-blue-900 text-white px-10 py-2 rounded"
                        disabled={startingTest}
                      >
                        {startingTest ? (
                          <>
                            Starting test{" "}
                            <ImSpinner3 className="w-3 h-3 ml-1 animate-spin" />
                          </>
                        ) : (
                          "Start Test"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
                {contentType === "userData" && <UserData />}
                {contentType === "generateQuestions" && (
                  <section className="flex flex-col flex-1 gap-6 overflow-y-auto  sm:px-6 ">
                    <div className="space-y-4">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-4xl font-semibold text-[#1E3A8A]">
                        {categories[currentStep]}
                      </h2>
                      <p className="font-semibold text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                        Please follow these instructions to provide answers to
                        the questionnaire:
                      </p>
                      {answers[categories[currentStep]].map(
                        (questionObj, quesIndex) => (
                          <div
                            key={quesIndex}
                            className="border border-gray-300 rounded-md mb-2"
                          >
                            <div
                              className="cursor-pointer p-4 flex  items-center  font-semibold text-gray-700"
                              onClick={() => toggleAccordion(quesIndex)}
                            >
                              <div className="w-[90%] text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                                {questionObj.question}
                              </div>
                              <div className="md:w-[10%]  flex justify-center">
                                <img
                                  src="/testarrow.png"
                                  className="h-8 md:h-12"
                                />
                              </div>
                            </div>
                            {openIndex === quesIndex && (
                              <div className="p-4">
                                {questionObj.type === "input" ? (
                                  <Textarea
                                    required
                                    value={questionObj.answer}
                                    onChange={(e) =>
                                      handleInputChange(
                                        categories[currentStep],
                                        quesIndex,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Type your answer here..."
                                    className="w-full resize-none"
                                  />
                                ) : (
                                  <div className="space-y-2">
                                    {questionObj.options.map(
                                      (option, optionIndex) => (
                                        <div key={optionIndex}>
                                          <label className="flex items-center space-x-3">
                                            <input
                                              type="radio"
                                              name={`question-${quesIndex}`}
                                              value={option}
                                              required
                                              checked={
                                                questionObj.answer === option
                                              }
                                              onChange={(e) =>
                                                handleInputChange(
                                                  categories[currentStep],
                                                  quesIndex,
                                                  e.target.value
                                                )
                                              }
                                              className="text-2xl circle-outer accent-blue-700 cursor-pointer"
                                            />
                                            <span>{option}</span>
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                            {isValid && questionObj.answer?.trim() === "" && (
                              <p className="text-red-500 text-sm">
                                Please provide an answer.
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>
                    <div className="flex items-center justify-between p-4 sdf">
                      <div className="cancel_button">
                        <div>
                          {contentType !== "Intro" && (
                            <div>
                              <Button onClick={() => resetData()}>
                                Cancel
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="action_button flex gap-5">
                        <button
                          onClick={handlePrevious}
                          disabled={currentStep === 0}
                          className=" px-4 py-2 rounded disabled:opacity-50"
                        >
                          <img src="/prevarrow.png" className="h-12 " />
                        </button>
                        {currentStep < categories.length - 1 ? (
                          <button
                            onClick={handleNext}
                            className=" text-white px-4 py-2 rounded"
                          >
                            <img src="/nextarrow.png" className="h-12 " />
                          </button>
                        ) : (
                          <>
                            <Dialog>
                              <DialogTrigger asChild>
                                <button
                                  onClick={handleSubmit}
                                  className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                  Submit
                                </button>
                              </DialogTrigger>
                              {showDialog && (
                                <DialogContent className="max-w-[50dvw] h-[60dvh] p-0">
                                  <div className="flex items-center space-x-2">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center">
                                      <div className="ai-image">
                                        <Image
                                          src="/testpopup.png"
                                          width={500}
                                          height={500}
                                          alt="ai"
                                          className="w-full h-auto"
                                        />
                                      </div>
                                      <div className="ai-content flex flex-col items-center justify-center gap-5 p-2">
                                        <Image
                                          src="/testtimer.png"
                                          width={80}
                                          height={100}
                                          alt="ai"
                                        />

                                        <p className="text-center mx-auto text-xl">
                                          <span className="text-[#FC0000] font-semibold">
                                            {" "}
                                            Please wait for a moment...{" "}
                                          </span>
                                          <br />{" "}
                                          <span className="text-[#1E3A8A] font-semibold">
                                            While we are generating the
                                            personalised test based on your
                                            input...
                                          </span>
                                        </p>
                                        <CustomLoader />
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              )}
                            </Dialog>
                          </>
                        )}
                      </div>
                    </div>
                  </section>
                )}
                {(contentType === "userData" ||
                  contentType === "generateQuestions") && (
                  <div className="w-full 2xl:w-1/3 lg:w-[45%] mt-24">
                    <Card className="h-full w-full overflow-hidden flex justify-center items-center flex-col bg-gray-50">
                      <img src="/teststep.png" className="h-48" />
                      <CardHeader className="">
                        <h1 className="xl:text-3xl text-2xl text-center font-bold text-blue-950">
                          Career Counselor Steps
                        </h1>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-center items-center flex-1 w-full h-full">
                          <div>
                            <p className="text-sm sm:font-medium md:font-medium lg:font-medium xl:font-medium 2xl:font-medium text-center">
                              Please follow these instructions to provide
                              answers to the questionnaire:
                            </p>
                            <ul className="list-disc pl-6">
                              <li className="mb-2 py-2 flex font-medium">
                                <TiTick className="text-green-500 text-2xl mr-2" />
                                <span>
                                  Click on{" "}
                                  <span className="font-bold mx-1">Start</span>
                                  to start the quiz.
                                </span>
                              </li>
                              <li className="mb-2 py-2 flex  font-medium">
                                <TiTick className="text-green-500 text-2xl mr-2" />
                                <span>
                                  Click on{" "}
                                  <span className="font-bold mx-1">Next</span>
                                  to move to the next question.
                                </span>
                              </li>
                              <li className="mb-2 py-2 flex  font-medium">
                                <TiTick className="text-green-500 text-2xl mr-2" />
                                <span>
                                  Click on
                                  <span className="font-bold mx-1">
                                    Previous
                                  </span>{" "}
                                  to go back to the previous question.
                                </span>
                              </li>
                              <li className="mb-2 py-2 flex  font-medium">
                                <TiTick className="text-green-500 text-2xl mr-2" />
                                <span>
                                  Fill in your answers in the text area provided
                                  for each question.
                                </span>
                              </li>
                              <li className="mb-2 py-2 flex  font-medium">
                                <TiTick className="text-green-500 text-2xl mr-2" />
                                <span>
                                  Once you have answered all questions, click on
                                  <span className="font-bold mx-1">
                                    Submit.
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>
      <section className="w-full h-full py-10 lg:px-20 px-10 bg-gray-100">
        <h1 className="text-blue-950 lg:text-5xl text-2xl py-5 font-bold text-center mb-6">
          Psychometric Test Summary
        </h1>
        <div className="summary_cards_wrapper">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
            {/* {loading ? (
              Array(5)
                .fill()
                .map((_, index) => (
                  <div className="w-[350px] mr-10 my-4 flex-1" key={index}>
                    <Skeleton width="100%" height={200} />
                  </div>
                ))
            ) : popupData?.length === 0 ? (
              <div className="w-[350px] mr-10 my-4">
                <Card className="w-full h-[200px] flex items-center justify-center">
                  <span>No Test Summary data yet</span>
                </Card>
              </div>
            ) : (
              popupData?.map((val, index) => (
                <div className="summary_cards relative" key={index}>
                  <div className="max-w-2xl  p-6 min-h-[220px] bg-white border border-gray-200 rounded-lg shadow">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold text-gray-900">
                        User Summary
                      </h5>
                    </a>
                    <p className="mb-5 font-normal text-sm text-gray-700">
                      <strong>Interests</strong>:{" "}
                      {val.summary.interests?.slice(0, 50)}
                    </p>
                    <div className="summary_card_footer absolute bottom-6 left-6 right-6 mt-5">
                      <div
                        className="inline-flex items-center px-2 py-2 text-sm text-white bg-blue-950 rounded-md cursor-pointer"
                        onClick={(e) => handleReadMore(e, val)}
                      >
                        Read more
                        <svg
                          className="rtl:rotate-180 w-2.5 h-2.5 ms-2 mt-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )} */}

            {loading ? (
              Array(4)
                .fill()
                .map((_, index) => (
                  <div className="w-[350px] mr-10 my-4 flex-1" key={index}>
                    <Skeleton width="100%" height={150} />
                  </div>
                ))
            ) : popupData?.length === 0 ? (
              <div className="w-[350px] mr-10 my-4">
                <Card className="w-full h-[200px] flex items-center justify-center">
                  <span>No Test Summary data yet</span>
                </Card>
              </div>
            ) : (
              popupData?.map((val, index) => (
                <div className="summary_cards relative" key={index}>
                  <div className="max-w-2xl  p-6 min-h-[220px] bg-white border border-gray-200 rounded-lg shadow">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold text-gray-900">
                        User Summary
                      </h5>
                    </a>
                    <p className="mb-5 font-normal text-sm text-gray-700">
                      <strong>Interests</strong>:{" "}
                      {val.summary.interests?.slice(0, 50)}
                    </p>
                    <div className="summary_card_footer absolute bottom-6 left-6 right-6 mt-5">
                      <div
                        className="inline-flex items-center px-2 py-2 text-sm text-white bg-blue-950 rounded-md cursor-pointer"
                        onClick={(e) => handleReadMore(e, val)}
                      >
                        Read more
                        <svg
                          className="rtl:rotate-180 w-2.5 h-2.5 ms-2 mt-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* {showPopup && popupData && (
              <div
                className="fixed top-0 inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 "
                onClick={closePopup}
              >
                <div
                  className="bg-white max-w-5xl min-h-[500px] w-full p-6 rounded-lg shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={closePopup}
                    className="absolute top-[5rem] right-[11rem] text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <Tabs
                    className="w-full py-5"
                    defaultValue="actionableInsights"
                  >
                    <TabsList className="mb-4 flex w-full justify-center flex-wrap h-auto bg-[#1e3a8a78] rounded-full">
                      <TabsTrigger
                        value="actionableInsights"
                        className="text-white  rounded-md text-base font-bold sumtab"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Actionable Insights
                      </TabsTrigger>
                      <TabsTrigger
                        value="careerSuggestions"
                        className=" text-white  rounded-md text-base font-bold sumtab"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Career Suggestions
                      </TabsTrigger>
                      <TabsTrigger
                        value="summary"
                        className="text-white   rounded-md text-base font-bold sumtab"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Summary
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="actionableInsights" className="mb-4">
                      <div className="actions_section max-w-4xl mx-auto">
                        <div>
                          <h2 className="text-xl font-bold mb-6 text-[#FC0000]">
                            Actionable Insights
                          </h2>
                          <ul className="space-y-3 text-sm">
                            {Object.entries(cardData?.actionableInsights).map(
                              ([key, value], idx) => (
                                <li key={idx} className="text-[#1E3A8A]">
                                  <strong>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                    :
                                  </strong>{" "}
                                  <p>{value}</p>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent className="mb-6" value="careerSuggestions">
                      <div className="career_section max-w-4xl mx-auto">
                        <div className="space-y-3">
                          <h2 className="text-xl font-bold text-[#FC0000] flex items-center gap-3">
                            Career Suggestions
                          </h2>
                          <ul className="space-y-3 text-sm">
                            {cardData?.careerSuggestions?.map(
                              (career, index) => (
                                <li
                                  key={index}
                                  className="py-2 space-y-2 text-[#1E3A8A]"
                                >
                                  <strong>Career:</strong> {career.career}
                                  <br />
                                  <strong>Reason:</strong> {career.reason}
                                  <br />
                                  <strong>Actions:</strong> {career.actions}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent className="mb-6" value="summary">
                      <div className="max-w-4xl mx-auto summary_section">
                        <div>
                          <h2 className="text-xl font-bold mb-6 text-[#FC0000]">
                            Summary
                          </h2>
                          <ul className="space-y-3 text-sm">
                            {Object.entries(cardData?.summary).map(
                              ([key, value], idx) => (
                                <li key={idx} className="text-[#1E3A8A]">
                                  <strong>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                    :
                                  </strong>{" "}
                                  <p>{value}</p>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )} */}
            {showPopup && popupData && (
              <div
                className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 mt-14"
                onClick={closePopup}
              >
                <div
                  className="bg-white w-full max-h-[40vh] min-h-[360px] p-6 rounded-lg shadow-lg relative z-60 overflow-y-scroll mx-4 sm:mx-6 md:mx-4 lg:mx-4 xl:mx-4 2xl:mx-4 max-w-5xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={closePopup}
                    className="absolute top-4 right-4 sm:top-6 sm:right-8 md:top-4 md:right-8 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <Tabs
                    className="w-full py-5"
                    defaultValue="actionableInsights"
                  >
                    <TabsList className="mb-4 flex w-full justify-center flex-wrap h-auto bg-[#1e3a8a78] rounded-full">
                      <TabsTrigger
                        value="actionableInsights"
                        className="text-white rounded-md text-base font-bold sumtab"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Actionable Insights
                      </TabsTrigger>
                      <TabsTrigger
                        value="careerSuggestions"
                        className="text-white rounded-md text-base font-bold sumtab"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Career Suggestions
                      </TabsTrigger>
                      <TabsTrigger
                        value="summary"
                        className="text-white rounded-md text-base font-bold sumtab"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Summary
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="actionableInsights" className="mb-4">
                      <div className="actions_section max-w-4xl mx-auto">
                        <div>
                          <h2 className="text-xl font-bold mb-6 text-[#FC0000]">
                            Actionable Insights
                          </h2>
                          <ul className="space-y-3 text-sm">
                            {Object.entries(cardData?.actionableInsights).map(
                              ([key, value], idx) => (
                                <li key={idx} className="text-[#1E3A8A]">
                                  <strong>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                    :
                                  </strong>{" "}
                                  <p>{value}</p>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent className="mb-6" value="careerSuggestions">
                      <div className="career_section max-w-4xl mx-auto">
                        <div className="space-y-3">
                          <h2 className="text-xl font-bold text-[#FC0000] flex items-center gap-3">
                            Career Suggestions
                          </h2>
                          <ul className="space-y-3 text-sm">
                            {cardData?.careerSuggestions?.map(
                              (career, index) => (
                                <li
                                  key={index}
                                  className="py-2 space-y-2 text-[#1E3A8A]"
                                >
                                  <strong>Career:</strong> {career.career}
                                  <br />
                                  <strong>Reason:</strong> {career.reason}
                                  <br />
                                  <strong>Actions:</strong> {career.actions}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent className="mb-6" value="summary">
                      <div className="max-w-4xl mx-auto summary_section">
                        <div>
                          <h2 className="text-xl font-bold mb-6 text-[#FC0000]">
                            Summary
                          </h2>
                          <ul className="space-y-3 text-sm">
                            {Object.entries(cardData?.summary).map(
                              ([key, value], idx) => (
                                <li key={idx} className="text-[#1E3A8A]">
                                  <strong>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                    :
                                  </strong>{" "}
                                  <p>{value}</p>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
