"use client";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CustomLoader from "../ui/CustomLoader";
import Image from "next/image";
import { GetTokens } from "../actions";
import { useUserDataStore } from "@/app/store/useUserDataStore";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function UserData() {
  const [isValid, setIsValid] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(null); // Track open question

  const {
    bioData,
    setBioData,
    currentStep,
    nextStep,
    previousStep,
    answers,
    setAnswers,
    resetSteps,
    setContentType,
    resetData,
  } = useUserDataStore();

  const categories = Object.keys(bioData);

  const handleInputChange = (category, questionIndex, newAnswer) => {
    setBioData(category, questionIndex, newAnswer);
  };

  const handleNext = () => {
    if (
      bioData[categories[currentStep]].every(
        (questionObj) => questionObj.answer.trim() !== ""
      )
    ) {
      setIsValid(false);
      nextStep();
      setOpenQuestion(null); // Close any open question when moving to next step
      window.scrollTo(0, 0);
    } else {
      setIsValid(true);
    }
  };

  const handlePrevious = () => {
    setIsValid(false);
    previousStep();
    setOpenQuestion(null); // Close any open question when moving to previous step
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
        const data = await axios.post('/api/getCareerCounselling', bioData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const answerData = data?.data;
        setAnswers(answerData);
        setContentType("generateQuestions");
        resetSteps();
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setShowDialog(false);
      }
    } else {
      setIsValid(true);
    }
  };

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  useEffect(() => {
    localStorage.setItem("careerCounsellingData", JSON.stringify(bioData));
  }, [bioData]);

  return (
    <>
      <Dialog open={showDialog}>
        <DialogContent className="max-w-[90vw] lg:max-w-[50dvw] h-[60dvh] p-0">
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center w-full">
              <div className="ai-image">
                <Image priority="true"
                  src="/testpopup.png"
                  width={500}
                  height={500}
                  alt="ai"
                  className="w-full h-auto max-w-[80vw] lg:max-w-[500px]"
                />
              </div>
              <div className="ai-content flex flex-col items-center justify-center gap-5 p-2 w-full">
                <Image priority="true"
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
                  <span className="text-[#1E3A8A] font-semibold">
                    While we are generating the personalised test based on your
                    input...
                  </span>
                </p>
                <CustomLoader />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <section className="flex flex-col flex-1 gap-6 overflow-y-auto  sm:px-6 ">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-4xl text-[#1E3A8A] font-bold">
            {categories[currentStep]}
          </h2>
          <p className="font-semibold text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
            Please follow these instructions to provide answers to the
            questionnaire:
          </p>
          {bioData[categories[currentStep]].map((questionObj, quesIndex) => (
            <div
              key={quesIndex}
              className="space-y-2 border border-[#00000030] p-5 rounded-[17px]"
            >
              <div
                className="flex items-center cursor-pointer"
                onClick={() => toggleQuestion(quesIndex)}
              >
                <div className="w-[90%]">
                  <h3 className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg  text-[#1E3A8A] font-bold">
                    {questionObj.question}
                  </h3>
                </div>
                <div className="md:w-[10%]  flex justify-center">
                  <img src="/testarrow.png" className="h-8 md:h-12" />
                </div>
              </div>
              {isValid && questionObj.answer.trim() === "" && (
                <p className="text-red-500 text-sm">
                  Please provide an answer.
                </p>
              )}
              {openQuestion === quesIndex && (
                <>
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
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between p-4 items-center">
          <div>
            <Button onClick={() => resetData()}>Cancel</Button>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className=" px-4 py-2 rounded disabled:opacity-50 mr-3"
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
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}