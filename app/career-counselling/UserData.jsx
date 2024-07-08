"use client";
import { useEffect, useState } from "react";
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
import { useUserDataStore } from "@/app/store/useUserDataStore";

export default function UserData() {
  const [isValid, setIsValid] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const {
    bioData,
    setBioData,
    currentStep,
    nextStep,
    previousStep,
    answers,
    setAnswers,
    resetSteps,
    setContentType
  } = useUserDataStore();





  const categories = Object.keys(bioData);


  const transformApiResponse = (apiResponse) => {
    // Initialize an empty object to store transformed data
    const transformedResponse = {};

    // Define the categories and their corresponding keys in the API response
    const categories = [
      {
        key: "Career Aptitude Assessment",
        possibleKeys: ["Career Aptitude Assessment"],
      },
      {
        key: "Interest Inventory",
        possibleKeys: [
          "Interest Inventory (RIASEC - Holland Codes)",
          "Interest Inventory",
        ],
      },
      {
        key: "Personality Assessment",
        possibleKeys: [
          "Personality Assessment (Big Five - OCEAN)",
          "Personality Assessment",
        ],
      },
      {
        key: "Values and Motivations",
        possibleKeys: ["Values and Motivations"],
      },
    ];

    // Check if apiResponse and apiResponse.data exist
    if (apiResponse && apiResponse.data) {
      // Process each category
      categories.forEach(({ key, possibleKeys }) => {
        // Find the first matching key in apiResponse.data
        const foundKey = possibleKeys.find(
          (apiKey) => apiKey in apiResponse.data
        );

        if (foundKey && Array.isArray(apiResponse.data[foundKey])) {
          transformedResponse[key] = apiResponse.data[foundKey].map((q) => ({
            question: q.question,
            options: q.options || [],
            answer: "",
            type: q.type,
          }));
        } else {
          // Handle case where category is missing or not an array
          transformedResponse[key] = [];
        }
      });
    } else {
      // Handle case where apiResponse or apiResponse.data is undefined or null
      console.error("API response or its data is undefined or null.");
      // Optionally throw an error or return a default transformedResponse
    }

    return transformedResponse;
  };

  // const handleInputChange = (category, questionIndex, newAnswer) => {
  //   setBioData((prevAnswers) => {
  //     const updatedCategory = prevAnswers[category].map((q, i) =>
  //       i === questionIndex ? { ...q, answer: newAnswer } : q
  //     );
  //     return {
  //       ...prevAnswers,
  //       [category]: updatedCategory,
  //     };
  //   });
  // };

  const handleInputChange = (category, questionIndex, newAnswer) => {
    setBioData(category, questionIndex, newAnswer);
  };

  const handleNext = () => {
    window.scrollTo(0, 0);
    if (
      bioData[categories[currentStep]].every(
        (questionObj) => questionObj.answer.trim() !== ""
      )
    ) {
      setIsValid(false);
      nextStep();
      // setCurrentStep((prevStep) => prevStep + 1);
    } else {
      setIsValid(true);
    }
  };

  const handlePrevious = () => {
    setIsValid(false);
    previousStep();
    // setCurrentStep((prevStep) => prevStep - 1);
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
        const answerData = data?.data
        setAnswers(answerData);
        setContentType('generateQuestions')
        resetSteps()
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

  useEffect(() => {
    localStorage.setItem("careerCounsellingData", JSON.stringify(bioData));
  }, [bioData]);

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
