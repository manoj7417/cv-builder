/** @format */

"use client";
import { useEffect, useState } from "react";
import UserData from "./UserData";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { GetTokens, RemoveTokens } from "../actions";
import { TiTick } from "react-icons/ti";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import CustomLoader from "../ui/CustomLoader";
import "./CareerCounselling.css";
import { useUserDataStore } from "../store/useUserDataStore";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ImSpinner3 } from "react-icons/im";
import { ResumeHeader } from "../Layout/ResumeHeader";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { PricingData } from "@/constants/prices";
import { useUserStore } from "../store/UserStore";
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
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [geoinfo, setGeoInfo] = useState({
    ip: "",
    countryName: "",
    countryCode: "",
    city: "",
    timezone: "",
    currency: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pricingInfo, setPricingInfo] = useState({
    id: 2,
    cardTitle: "AI Career Coach",
    cardDescription:
      "Take career assistance anytime and anywhere in different domains with an Artificial Intelligence-based Career Coach",
    free: {
      title: "Free",
      link: "/coming-soon",
    },
    popUpDescription:
      "Find solutions to your career problems at any moment with Artificial Intelligence based Career Coach, designed by professionals and inspired by leading Career Coaches across the globe. Easy and quick to use, get help and insights into a myriad set of domains",
    features: [
      "Personalised Career Assistance from Artificial Intelligence-based Career Coach",
      "Get access to one-on-one online virtual coaching",
      "No need to schedule an appointment, take assistance anytime and anywhere",
      "Get one comprehensive session including addressing the issue, finding the right solution, and getting suggestions on the same",
      "Find the best possible solutions from a limitless range of career options",
    ],
    planName: "AICareerCoach",
    discount: 97,
    monthLabel: "per test",
    yearLabel: "per test",
    choosePlan: false,
    DP: PricingData["AICareerCoach"][geoinfo.currency || "USD"]["DP"],
    MP: PricingData["AICareerCoach"][geoinfo.currency || "USD"]["MP"],
  });
  const [upgradingPlan, setIsUpgradingPlan] = useState(false);
  const userState = useUserStore((state) => state.userState);

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
        const responseData = await axios.post(
          "/api/generateCareerAdvice",
          content,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const parsedData = JSON.parse(responseData.data[0].text.value);
        setSummary(parsedData);
        setContentType("summary");
        setShowPopup(true);
        setCardData(parsedData);
        // Fetch the updated summary data
        await fetchSummary();
        resetData();
        setTestSummary(true);
      } catch (error) {
        toast.error("Error generating summary");
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
    } catch (error) {}
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
      error.response.status === 403 && setIsDialogOpen(true);
    } finally {
      setStartingTest(false);
    }
  };

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        let currency = data.currency || "USD";
        setGeoInfo({
          ...geoinfo,
          ip: data.ip,
          countryName: data.country_name,
          countryCode: data.country_calling_code,
          city: data.city,
          timezone: data.timezone,
          currency: currency,
        });
        const DP = PricingData["AICareerCoach"][currency]["DP"];
        const MP = PricingData["AICareerCoach"][currency]["MP"];
        setPricingInfo({ ...pricingInfo, DP, MP });
      })
      .catch((error) => {
        console.error("Error fetching geo information:", error);
      });
  };

  const handleCloseAIDialog = () => {
    setIsDialogOpen(false);
  };

  const UpgradePlan = async (plan) => {
    const { accessToken } = await GetTokens();
    if (!accessToken) {
      return router.push("/login?redirect=pricing");
    }
    const data = {
      email: userState?.userdata?.email,
      plan,
      success_url:
        "https://geniescareerhub.com/paymentSuccess?redirect=career-counselling",
      cancel_url: window.location.href,
      duration: selectedPlan,
      currency: geoinfo?.currency || "USD",
      planName: plan.planName,
    };
    setIsUpgradingPlan(true);
    try {
      const response = await axios.post(
        "/api/upgradePricing",
        { data },
        {
          headers: {
            Authorization: "Bearer " + accessToken.value,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const { url } = response.data;
        window.location = url;
      }
    } catch (error) {
      if (
        error.response.status === 401 &&
        error.response.data.error === "Unauthorized"
      ) {
        await RemoveTokens();
        toast("Please login again to proceed");
        router.push("/login?redirect=pricing");
      }
    } finally {
      setIsUpgradingPlan(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  useEffect(() => {
    getGeoInfo();
  }, []);

  return (
    <>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          className="max-w-full lg:max-w-2xl 2xl:max-w-3xl mx-auto px-4 sm:px-6 py-6"
          showCloseButton={true}
          onClick={handleCloseAIDialog}
        >
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-xl sm:text-2xl lg:text-2xl my-2 text-center">
                {pricingInfo?.cardTitle}
              </h2>
            </DialogTitle>
            <DialogDescription>
              <p className="text-sm sm:text-sm text-justify">
                {pricingInfo?.popUpDescription}
              </p>
            </DialogDescription>
          </DialogHeader>
          {pricingInfo && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start ">
                <div className="modal_left">
                  <div className="modal_list">
                    <ul className="space-y-2">
                      {pricingInfo?.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-xs sm:text-sm text-gray-600"
                        >
                          <FaCheckCircle
                            className="text-blue-950 mr-2"
                            style={{ minWidth: "15px", minHeight: "15px" }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="modal_right bg-gray-100 px-4 py-6 sm:px-6 sm:py-8 relative">
                  <div className="text-center">
                    <p className=" text-xs text-center border rounded-lg border-violet-600 text-violet-600 bg-violet-100 px-2 w-20 absolute top-2 right-2">
                      {pricingInfo?.discount}% off
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center mt-4">
                      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 capitalize">
                        {`${pricingInfo["DP"].symbol}${pricingInfo["DP"].price}`}
                      </h1>
                      <p className="text-gray-500 text-xs sm:text-sm px-2 line-through">
                        {`${pricingInfo["MP"].symbol}${pricingInfo["MP"].price}`}
                      </p>
                      <p className="text-gray-500 text-xs  px-2">
                        {pricingInfo?.monthLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="mt-4 sm:mt-8">
            <Button
              className="bg-[#f76918] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base cursor-pointer w-full sm:w-auto"
              onClick={() => UpgradePlan(pricingInfo)}
              disabled={upgradingPlan}
            >
              {upgradingPlan ? (
                <>
                  Upgrading <FaSpinner className="animate-spin ml-2" />
                </>
              ) : (
                "Upgrade Now"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
                        Your Career Path, Defined in a Minute
                      </h1>
                      <p className="mt-4 lg:w-[60%] w-full mx-auto">
                        Find the answer to your Career Questions quickly with
                        Artificial Intelligence. Our AI Career Coaching feature
                        is inspired and trained by expert Career Coaches from
                        around the globe. This tool solves Career conundrums in
                        the easiest way. Just answer a few questions and enter
                        your details and your Career Plan will be ready!
                      </p>
                      <Button
                        onClick={handleStartTest}
                        className="mt-6 bg-[#f76918] text-white px-10 py-2 rounded"
                        disabled={startingTest}
                      >
                        {startingTest ? (
                          <>
                            Starting test{" "}
                            <ImSpinner3 className="w-3 h-3 ml-1 animate-spin" />
                          </>
                        ) : (
                          "Talk to AI Coach"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
                {contentType === "userData" && <UserData />}
                {contentType === "generateQuestions" && (
                  <section className="flex flex-col flex-1 gap-6 overflow-y-auto  sm:px-6 ">
                    <div className="space-y-4">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-4xl font-semibold text-[#f76918]">
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
                                <DialogContent className="max-w-[50dvw] h-[70dvh] p-0">
                                  <div className="flex items-center justify-center lg:space-x-2 space-y-4 lg:space-y-0 flex-col sm:flex-row md:flex-row lg:flex-row">
                                    <div className="grid grid-cols-1 place-items-center w-full">
                                      <div className="ai-image">
                                        <Image
                                          priority="true"
                                          src="/testpopup.png"
                                          width={200}
                                          height={200}
                                          alt="ai"
                                          className="w-full h-40"
                                        />
                                      </div>
                                      <div className="ai-content flex flex-col items-center justify-center gap-5 p-2 w-full">
                                        <Image
                                          priority="true"
                                          src="/testtimer.png"
                                          width={80}
                                          height={100}
                                          alt="ai"
                                          className="max-w-[20vw] lg:max-w-[80px]"
                                        />

                                        <p className="text-center mx-auto text-base lg:text-xl">
                                          <span className="text-green-500 font-semibold">
                                            Please wait for a moment...
                                          </span>
                                          <br />
                                          <span className="text-[#f76918] font-semibold">
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
                        className="inline-flex items-center px-2 py-2 text-sm text-white bg-[#f76918] rounded-md cursor-pointer"
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
                    <h5 className="mb-2 text-xl font-bold text-gray-900">
                      User Summary
                    </h5>
                    <p className="mb-5 font-normal text-sm text-gray-700">
                      <strong>Interests</strong>:{" "}
                      {val.summary.interests?.slice(0, 50)}
                    </p>
                    <div className="summary_card_footer absolute bottom-6 left-6 right-6 mt-5">
                      <div
                        className="inline-flex items-center px-2 py-2 text-sm text-white bg-[#f76918] rounded-md cursor-pointer"
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
                    <TabsList className="mb-4 flex w-full justify-center flex-wrap h-auto gap-0 md:gap-6 bg-[#f7691878] rounded-full">
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
                                <li key={idx} className="text-[#f76918]">
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
                          <ul className="space-y-3 text-sm h-48 overflow-scroll md:overflow-none md:h-full">
                            {cardData?.careerSuggestions?.map(
                              (career, index) => (
                                <li
                                  key={index}
                                  className="py-2 space-y-2 text-[#f76918]"
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
                                <li key={idx} className="text-[#f76918]">
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
                  className="bg-white w-full max-h-[40vh] min-h-[560px] p-6 rounded-lg shadow-lg relative z-60 overflow-y-scroll mx-4 sm:mx-6 md:mx-4 lg:mx-4 xl:mx-4 2xl:mx-4 max-w-5xl"
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
                    <TabsList className="mb-4 flex w-full justify-center flex-wrap h-auto  rounded-lg md:rounded-full lg:rounded-full xl:rounded-full 2xl:rounded-full">
                      <TabsTrigger
                        value="actionableInsights"
                        className="text-black rounded-md text-base font-bold bg-white
                        data-[state=active]:bg-[#f76918] data-[state=active]:text-white hover:bg-[#f76918] hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Actionable Insights
                      </TabsTrigger>
                      <TabsTrigger
                        value="careerSuggestions"
                        className="text-black rounded-md text-base font-bold bg-white
                        data-[state=active]:bg-[#f76918] data-[state=active]:text-white hover:bg-[#f76918] hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Career Suggestions
                      </TabsTrigger>
                      <TabsTrigger
                        value="summary"
                        className="text-black rounded-md text-base font-bold bg-white
                        data-[state=active]:bg-[#f76918] data-[state=active]:text-white hover:bg-[#f76918] hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Summary
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="actionableInsights" className="mb-4">
                      <div className="actions_section max-w-4xl mx-auto">
                        <div>
                          <h2 className="text-xl font-bold mb-6 text-blue-950">
                            Actionable Insights
                          </h2>
                          <ul className="space-y-3 text-sm">
                            {Object.entries(cardData?.actionableInsights).map(
                              ([key, value], idx) => (
                                <li key={idx} className="text-[#f76918]">
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
                          <h2 className="text-xl font-bold text-blue-950 flex items-center gap-3">
                            Career Suggestions
                          </h2>
                          <ul className="space-y-3 text-sm">
                            {cardData?.careerSuggestions?.map(
                              (career, index) => (
                                <li
                                  key={index}
                                  className="py-2 space-y-2 text-[#f76918]"
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
                          <h2 className="text-xl font-bold mb-6 text-blue-950">
                            Summary
                          </h2>
                          <ul className="space-y-3 text-sm">
                            {Object.entries(cardData?.summary).map(
                              ([key, value], idx) => (
                                <li key={idx} className="text-[#f76918]">
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
