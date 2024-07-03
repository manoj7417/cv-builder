"use client";
import { useState } from "react";
import { getCareerCounselling } from "../api/api";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomLoader from "../ui/CustomLoader";
import Image from "next/image";
import { GetTokens } from "../actions";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function UserData({ setAnswers, setUserData }) {
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [bioData, setBioData] = useState({
    "Current Pursuits and Activities": [
      {
        question:
          "Are you studying? If yes, what are you studying? If you are working, what is your role and describe your work?",
        answer: "",
        type: "input",
      },
      {
        question: "What is your highest level of education?",
        answer: "",
        type: "input",
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
        answer: "",
        type: "input",
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
        answer: "",
        type: "input",
      },
    ],
    "Career Aspirations": [
      {
        question: "What are your career goals or aspirations?",
        answer: "",
        type: "input",
      },
      {
        question: "Is there a specific career path you are interested in?",
        answer: "",
        type: "input",
      },
    ],
    "Location and Age": [
      {
        question: "Which country do you currently reside in?",
        answer: "",
        type: "input",
      },
      {
        question: "How old are you?",
        answer: "",
        type: "input",
      },
    ],
  });

  const categories = Object.keys(bioData);

  const transformApiResponse = (apiResponse) => {
    // Transform the API response to match the expected structure
    console.log("apiResponse:::", apiResponse?.data);
    const transformedResponse = {
      "Career Aptitude Assessment": apiResponse?.data?.[
        "Career Aptitude Assessment"
      ].map((q) => ({
        question: q.question,
        options: q.options || [],
        answer: "",
        type: q.type,
      })),
      "Interest Inventory": apiResponse?.data?.["Interest Inventory"].map(
        (q) => ({
          question: q.question,
          options: q.options || [],
          answer: "",
          type: q.type,
        })
      ),
      "Personality Assessment": apiResponse?.data?.[
        "Personality Assessment"
      ].map((q) => ({
        question: q.question,
        options: q.options || [],
        answer: "",
        type: q.type,
      })),
      "Values and Motivations": apiResponse?.data?.[
        "Values and Motivations"
      ].map((q) => ({
        question: q.question,
        options: q.options || [],
        answer: "",
        type: q.type,
      })),
    };
    return transformedResponse;
  };

  const handleInputChange = (category, questionIndex, newAnswer) => {
    setBioData((prevAnswers) => {
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
      bioData[categories[currentStep]].every(
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
      bioData[categories[currentStep]].every(
        (questionObj) => questionObj.answer.trim() !== ""
      )
    ) {
      setShowDialog(true);
      try {
        const { accessToken } = await GetTokens();
        const token = accessToken.value;
        const data = await getCareerCounselling(bioData, token);
        const transformedResponse = transformApiResponse(data);
        setAnswers(transformedResponse); // Update answers in the parent component
        setUserData(false);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setShowDialog(false);
      }
    } else {
      setIsValid(true);
    }
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <>
      <section className="flex flex-col flex-1 gap-6 overflow-y-auto px-4 sm:px-6 mt-24 ">
        <div className="space-y-4">
          <h2 className="text-4xl font-semibold">{categories[currentStep]}</h2>
          {bioData[categories[currentStep]].map((questionObj, quesIndex) => (
            <div key={quesIndex} className="space-y-2">
              <label className="block text-sm font-medium">
                {questionObj.question}
              </label>
              {questionObj.type === "input" && (
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
              )}
              {isValid && questionObj.answer.trim() === "" && (
                <p className="text-red-500 text-sm">
                  Please provide an answer.
                </p>
              )}
            </div>
          ))}
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
                            Please wait for a moment... <br /> while we are
                            generating the personalised test based on your
                            input.
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
    </>
  );
}
