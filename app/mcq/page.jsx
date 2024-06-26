"use client";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const questions = [
  {
    question: "What is your role/position?",
    options: [
      "Experienced software developer",
      "Technical leader: I lead my team with technical decisions",
      "Engineering manager: I lead the team in both technical decisions and people management",
      "Senior software developer",
      "Software developer",
    ],
  },
  {
    question: "What is your preferred programming language?",
    options: ["JavaScript", "Python", "Java", "C#", "C++"],
  },
];

const Preloader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="loader">
      <div className="spinner"></div>
      <p className="text-gray-700 mt-4">Loading, please wait...</p>
    </div>
    <style jsx>{`
      .loader {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid rgba(0, 0, 0, 0.1);
        border-top-color: #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleOptionClick = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const answerStrings = answers.map((answer, index) => ({
      question: questions[index].question,
      answer: questions[index].options[answer],
    }));
    console.log("User's answers:", JSON.stringify(answerStrings));
    setIsSubmitted(true);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 relative">
      <div className="animated-bg"></div>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Work Experience Analysis</h1>
          <span className="text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="mb-6">
          <p className="text-lg">{questions[currentQuestion].question}</p>
        </div>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`w-full text-left p-4 border rounded-md ${
                answers[currentQuestion] === index
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className={`py-2 px-4 rounded-md ${
              currentQuestion === 0
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Next question
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>
      {isSubmitted && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded-md z-10">
          Answers successfully submitted! The page will refresh shortly.
        </div>
      )}
      <style jsx>{`
        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("/hexa.jpg") repeat;
          animation: move 40s linear infinite;
          z-index: 0;
        }
        @keyframes move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Page;
