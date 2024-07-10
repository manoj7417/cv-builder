"use client";
import { useState } from "react";
import UserData from "./UserData";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { GetTokens } from "../actions";
import { TiTick } from "react-icons/ti";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import CustomLoader from "../ui/CustomLoader";
import "./CareerCounselling.css";
import { generateCareerAdvice } from "../api/api";
import { useUserDataStore } from "../store/useUserDataStore";
import CareerSummary from "./CareerSummary";

export default function Page() {
  const [showIntro, setShowIntro] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [userData, setUserData] = useState(true);
  const [apiResponse, setApiResponse] = useState(null);
  const { answers, setAnswers, contentType, setContentType, nextStep, previousStep, currentStep, setSummary } = useUserDataStore();
  const categories = Object.keys(answers).length > 0 ? Object.keys(answers) : null;

  const handleInputChange = (category, questionIndex, newAnswer) => {
    const newAnswers = {
      ...answers, [category]: answers[category].map((item, index) => {
        if (index === questionIndex) {
          return { ...item, answer: newAnswer }
        }
        return item
      })
    }
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    window.scrollTo(0, 0);

    const currentCategory = categories[currentStep];
    const currentCategoryQuestions = answers[currentCategory] || [];

    // Check if every question in the current category has a non-empty answer
    const allAnswered = currentCategoryQuestions.every((questionObj) => {
      // First, check if the answer key exists
      if (!questionObj.hasOwnProperty('answer')) {
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
        setSummary(parsedData)
        setContentType('summary')
        setApiResponse(parsedData);
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


  return (
    <>
      <div className="flex min-h-screen w-full bg-background p-5">
        <div className="flex flex-col flex-1 sm:gap-4 sm:py-4 sm:pl-14">
          <main className="flex flex-1 flex-col lg:flex-row gap-4 p-4 sm:px-6 sm:py-0">
            {
              contentType === 'Intro' && (
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
                      onClick={() => setContentType('userData')}
                      className="mt-6 bg-blue-950 text-white px-10 py-2 rounded"
                    >
                      Start
                    </button>
                  </div>
                </div>
              )
            }
            {
              contentType === 'userData' && <UserData />
            }
            {
              contentType === 'generateQuestions' && (
                <section className="flex flex-col flex-1 gap-6 overflow-y-auto px-4 sm:px-6 mt-24">
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
                          {isValid &&
                            questionObj.answer?.trim() === "" && (
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
                                      Please wait for a moment... <br />{" "}
                                      while we are generating summary for
                                      this test.
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
              )
            }
            {contentType === 'summary' && (
              <section className="flex flex-col flex-1 gap-6 overflow-y-auto px-4 sm:px-6 mt-24">
                <CareerSummary data={apiResponse} />
              </section>
            )}
            <div className="w-full 2xl:w-1/3 lg:w-[45%] mt-24">
              <Card className="h-full w-full overflow-hidden flex justify-center items-center flex-col bg-gray-50">
                <CardHeader className="">
                  <h1 className="xl:text-4xl text-2xl font-bold text-blue-950">
                    Career Counselor Steps
                  </h1>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center items-center flex-1 w-full">
                    <div>
                      <p className="my-4 font-medium text-center">
                        Please follow these instructions to provide answers to
                        the questionnaire:
                      </p>
                      <ul className="list-disc pl-6">
                        <li className="mb-2 py-2 flex items-center font-medium">
                          <p className="flex">
                            <TiTick className="text-green-500 text-2xl mr-2" />
                            Click on <span className="font-bold mx-1">Start</span>
                            to start the quiz.
                          </p>
                        </li>
                        <li className="mb-2 py-2 flex items-center font-medium">
                          <p className="flex">
                            <TiTick className="text-green-500 text-2xl mr-2" />
                            Click on <span className="font-bold mx-1">Next</span>
                            to move to the next question.
                          </p>
                        </li>
                        <li className="mb-2 py-2 flex items-center font-medium">
                          <p className="flex">
                            <TiTick className="text-green-500 text-2xl mr-2" />
                            Click on
                            <span className="font-bold mx-1">Previous</span> to go
                            back to the previous question.
                          </p>
                        </li>
                        <li className="mb-2 py-2 flex items-center font-medium">
                          <p className="flex">
                            <TiTick className="text-green-500 text-2xl mr-2" />
                            Fill in your answers in the text area provided for
                            each question.
                          </p>
                        </li>
                        <li className="mb-2 py-2 flex items-center font-medium">
                          <p className="flex">
                            <TiTick className="text-green-500 text-2xl mr-2" />
                            Once you have answered all questions, click on
                            <span className="font-bold mx-1">Submit.</span>
                          </p>
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
