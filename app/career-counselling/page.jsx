"use client";
import { useEffect, useState } from "react";
import UserData from "./UserData";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { GetTokens } from "../actions";
import { IoArrowBackCircleOutline } from "react-icons/io5";
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
import { generateCareerAdvice } from "../api/api";

export default function Page() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [userData, setUserData] = useState(true);
  const [apiResponse, setApiResponse] = useState(null);

  const [answers, setAnswers] = useState({
    "Current Pursuits and Activities": [
      {
        question:
          "Are you studying? If yes, what are you studying? If you are working, what is your role and describe your work?",
        answer: "",
        type: "input",
      },
      {
        question: "What is your highest level of education?",
        options: ["High School", "Bachelor's Degree", "Master's Degree", "PhD"],
        answer: "",
        type: "mcq",
      },
      {
        question: "Which subjects or areas do you feel most confident in?",
        answer: "",
        type: "input",
      },
      {
        question:
          "Can you share any notable achievements or activities you have participated in recently?",
        answer: "",
        type: "input",
      },
      {
        question:
          "What skills or knowledge are you currently working on improving?",
        options: [
          "Programming",
          "Project Management",
          "Language Skills",
          "Design",
        ],
        answer: "",
        type: "mcq",
      },
    ],
    "Hobbies and Interests": [
      {
        question: "What hobbies or activities do you enjoy in your free time?",
        answer: "",
        type: "input",
      },
      {
        question:
          "Are there any subjects or topics you are particularly passionate about?",
        options: ["History", "Environment", "Politics", "Healthcare"],
        answer: "",
        type: "mcq",
      },
    ],
    "Strengths and Weaknesses": [
      {
        question:
          "What do you consider to be your greatest strengths or skills?",
        answer: "",
        type: "input",
      },
      {
        question: "Are there any areas where you feel you need improvement?",
        options: [
          "Time Management",
          "Technical Skills",
          "Public Speaking",
          "Teamwork",
        ],
        answer: "",
        type: "mcq",
      },
    ],
    "Career Aspirations": [
      {
        question: "What are your career goals or aspirations?",
        options: [
          "Entrepreneurship",
          "Corporate Career",
          "Academia",
          "Nonprofit Sector",
        ],
        answer: "",
        type: "mcq",
      },
      {
        question: "Is there a specific career path you are interested in?",
        options: [
          "Software Development",
          "Marketing",
          "Healthcare",
          "Education",
        ],
        answer: "",
        type: "mcq",
      },
    ],
    "Location and Age": [
      {
        question: "Which country do you currently reside in?",
        options: ["United States", "United Kingdom", "Canada", "Other"],
        answer: "",
        type: "mcq",
      },
      {
        question: "How old are you?",
        options: ["Under 18", "18-25", "26-35", "Over 35"],
        answer: "",
        type: "mcq",
      },
    ],
  });

  const categories = Object.keys(answers);

  const handleInputChange = (category, questionIndex, newAnswer) => {
    setAnswers((prevAnswers) => {
      const updatedCategory = prevAnswers[category].map((q, i) =>
        i === questionIndex ? { ...q, answer: newAnswer } : q
      );
      return {
        ...prevAnswers,
        [category]: updatedCategory,
      };
    });
  };

  const handleNext = () => {
    window.scrollTo(0, 0);
    if (
      answers[categories[currentStep]].every(
        (questionObj) => questionObj.answer.trim() !== ""
      )
    ) {
      setIsValid(false);
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      setIsValid(true);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
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
        const content = categories.flatMap((category) =>
          answers[category].map((questionObj) => ({
            question: questionObj.question,
            answer: questionObj.answer,
          }))
        );
        const data = await generateCareerAdvice(content, token);
        console.log("Answers data::", data);
        setApiResponse(data);
      } catch (error) {
        console.log(error);
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

  console.log("apiResponse::::", apiResponse);

  return (
    <>
      <div className="flex min-h-screen w-full bg-background">
        <div className="flex flex-col flex-1 sm:gap-4 sm:py-4 sm:pl-14">
          <main className="flex flex-1 flex-col lg:flex-row gap-4 p-4 sm:px-6 sm:py-0">
            {showIntro && (
              <div className="flex justify-center items-center flex-1">
                <div className="text-center">
                  <h1 className="text-5xl font-bold text-blue-950">
                    Welcome to the Career Counselling
                  </h1>
                  <p className="mt-4 w-1/2 mx-auto">
                    Please take a few moments to answer the following questions.
                    Your responses will help us better understand your current
                    pursuits, hobbies, strengths, and career aspirations.
                  </p>
                  <button
                    onClick={() => setShowIntro(false)}
                    className="mt-6 bg-blue-950 text-white px-10 py-2 rounded"
                  >
                    Start
                  </button>
                </div>
              </div>
            )}
            {userData
              ? !showIntro && (
                  <UserData setAnswers={setAnswers} setUserData={setUserData} />
                )
              : !showIntro && (
                  <section className="flex flex-col flex-1 gap-6 overflow-y-auto px-4 sm:px-6 mt-24 ">
                    <div className="space-y-4">
                      <h2 className="text-4xl font-semibold">
                        {categories[currentStep]}
                      </h2>
                      {answers[categories[currentStep]].map(
                        (questionObj, quesIndex) => (
                          <div key={quesIndex} className="space-y-2">
                            <label className="block text-sm font-medium">
                              {questionObj.question}
                            </label>
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
                            {isValid && questionObj.answer.trim() === "" && (
                              <p className="text-red-500 text-sm">
                                Please provide an answer.
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>
                    <div className="flex justify-between p-4">
                      <button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {currentStep < categories.length - 1 ? (
                        <button
                          onClick={handleNext}
                          className="bg-blue-950 text-white px-4 py-2 rounded"
                        >
                          Next
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
                                        src="/aipowered2.gif"
                                        width={500}
                                        height={500}
                                        alt="ai"
                                        className="w-full h-auto"
                                      />
                                    </div>
                                    <div className="ai-content flex flex-col items-center justify-center gap-5 p-2">
                                      <p className="text-center mx-auto text-xl">
                                        Please wait for a moment... <br /> while
                                        we are generating the personalised test
                                        based on your input.
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
                  </section>
                )}
            <div className="w-full lg:w-1/3 mt-24">
              <Card className="h-full w-full overflow-hidden flex justify-center items-center flex-col bg-gray-100">
                <CardHeader className="">
                  <h1 className="xl:text-4xl text-2xl font-bold text-blue-950">
                    Career Counselor Steps
                  </h1>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center items-center flex-1 w-full h-full">
                    <div>
                      <p className="my-4 font-medium text-center">
                        Please follow these instructions to provide answers to
                        the questionnaire:
                      </p>
                      <ul className="list-disc pl-6">
                        <li className="mb-2 py-2 flex items-center font-medium">
                          <TiTick className="text-green-500 text-2xl mr-2" />
                          Click on <span className="font-bold mx-2">
                            Start
                          </span>{" "}
                          to start the quiz.
                        </li>
                        <li className="mb-2 py-2 flex items-center font-medium">
                          <TiTick className="text-green-500 text-2xl mr-2" />
                          Click on <span className="font-bold mx-2">
                            {" "}
                            Next
                          </span>{" "}
                          to move to the next question.
                        </li>
                        <li className="mb-2 py-2 flex items-center font-medium">
                          <TiTick className="text-green-500 text-2xl mr-2" />
                          Click on{" "}
                          <span className="font-bold mx-2">Previous</span> to go
                          back to the previous question.
                        </li>
                        <li className="mb-2 py-2 flex items-center font-medium">
                          <TiTick className="text-green-500 text-2xl mr-2" />
                          Fill in your answers in the text area provided for
                          each question.
                        </li>
                        <li className="mb-2 py-2 flex items-center font-medium">
                          <TiTick className="text-green-500 text-2xl mr-2" />
                          Once you have answered all questions, click on
                          <span className="font-bold mx-2">Submit.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
