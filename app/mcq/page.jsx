"use client";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const tests = {
  NumericalReasoning: {
    title: "Work Experience Analysis - Numerical Reasoning",
    questions: [
      {
        question: "What is the sum of the first 10 prime numbers?",
        options: ["129", "140", "160", "170"],
        correct_option: "129",
        description:
          "The first 10 prime numbers are 2, 3, 5, 7, 11, 13, 17, 19, 23, and 29. Their sum is 129.",
      },
      {
        question:
          "If the ratio of boys to girls in a class is 3:2 and there are 18 boys, how many girls are there?",
        options: ["12", "15", "20", "24"],
        correct_option: "12",
        description:
          "If the ratio is 3:2, for every 3 boys, there are 2 girls. If there are 18 boys, there are 12 girls (18 / 3 * 2).",
      },
      {
        question:
          "A car travels 150 miles in 3 hours. What is its average speed in miles per hour?",
        options: ["45", "50", "55", "60"],
        correct_option: "50",
        description:
          "The average speed is calculated by dividing the distance by the time: 150 miles / 3 hours = 50 mph.",
      },
      {
        question:
          "If a product costs $45 and is marked up by 20%, what is the selling price?",
        options: ["$54", "$55", "$60", "$65"],
        correct_option: "$54",
        description:
          "A 20% markup on $45 is $9 (45 * 0.20). Adding this to the original price gives $54.",
      },
      {
        question:
          "A man invests $2000 at an interest rate of 5% per annum. How much will he have after 3 years?",
        options: ["$2150", "$2200", "$2300", "$2400"],
        correct_option: "$2300",
        description:
          "Simple interest calculation: 2000 * 0.05 * 3 = $300. Adding this to the principal gives $2300.",
      },
      {
        question:
          "If the population of a town increases by 10% every year, what will be its population after 2 years if the current population is 5000?",
        options: ["5500", "6050", "6100", "6250"],
        correct_option: "6050",
        description:
          "First year: 5000 * 1.10 = 5500. Second year: 5500 * 1.10 = 6050.",
      },
      {
        question:
          "A rectangle has a length of 10 cm and a width of 6 cm. What is its area?",
        options: ["60 cm²", "66 cm²", "70 cm²", "76 cm²"],
        correct_option: "60 cm²",
        description:
          "The area of a rectangle is length * width: 10 cm * 6 cm = 60 cm².",
      },
      {
        question: "If 5x - 3 = 2, what is the value of x?",
        options: ["1", "2", "3", "4"],
        correct_option: "1",
        description: "Solving the equation: 5x - 3 = 2; 5x = 5; x = 1.",
      },
      {
        question:
          "A store sells a product for $30 after a 25% discount. What was the original price?",
        options: ["$35", "$37.50", "$40", "$45"],
        correct_option: "$40",
        description:
          "Let the original price be x. After a 25% discount, the selling price is 0.75x = $30. Solving for x gives $40.",
      },
      {
        question:
          "If the average of five numbers is 18, what is their total sum?",
        options: ["85", "90", "95", "100"],
        correct_option: "90",
        description:
          "The average of five numbers is the total sum divided by 5. So, 18 * 5 = 90.",
      },
    ],
  },
  VerbalReasoning: {
    title: "Work Experience Analysis - Verbal Reasoning",
    questions: [
      {
        question:
          "Which word does not belong in the following list: Apple, Banana, Cherry, Potato?",
        options: ["Apple", "Banana", "Cherry", "Potato"],
        correct_option: "Potato",
        description:
          "Apple, Banana, and Cherry are fruits, while Potato is a vegetable.",
      },
      {
        question: "Find the synonym for the word 'Elicit':",
        options: ["Suppress", "Induce", "Suppress", "Conceal"],
        correct_option: "Induce",
        description: "Elicit means to draw out or induce.",
      },
      {
        question:
          "Select the word that best completes the following sentence: 'The storm caused widespread ____ to the infrastructure.'",
        options: ["Celebration", "Damage", "Improvement", "Innovation"],
        correct_option: "Damage",
        description:
          "The context of the sentence indicates that 'Damage' is the most appropriate word.",
      },
      {
        question:
          "Which of the following words is the most opposite in meaning to the word 'Obsolete'?",
        options: ["Modern", "Outdated", "Ancient", "Obscure"],
        correct_option: "Modern",
        description:
          "Obsolete means outdated or no longer in use; the opposite is modern.",
      },
      {
        question:
          "Identify the correct meaning of the phrase 'Hit the nail on the head':",
        options: [
          "To miss the point",
          "To get something exactly right",
          "To make a mistake",
          "To hammer a nail perfectly",
        ],
        correct_option: "To get something exactly right",
        description: "The phrase means to do or say something exactly right.",
      },
      {
        question:
          "Choose the word that best completes the analogy: 'Cat is to Feline as Dog is to ____.'",
        options: ["Canine", "Equine", "Reptile", "Rodent"],
        correct_option: "Canine",
        description:
          "The relationship is between the animal and its family. Cat is to Feline as Dog is to Canine.",
      },
      {
        question:
          "Select the word that best fits the blank: 'The CEO gave a very ____ speech to the employees.'",
        options: ["Inspirational", "Destructive", "Unintelligible", "Hesitant"],
        correct_option: "Inspirational",
        description:
          "The context suggests that 'Inspirational' is the most appropriate word.",
      },
      {
        question:
          "Which word does not belong in the following list: Cup, Plate, Knife, Table?",
        options: ["Cup", "Plate", "Knife", "Table"],
        correct_option: "Table",
        description:
          "Cup, Plate, and Knife are utensils, while Table is a piece of furniture.",
      },
      {
        question: "Find the antonym for the word 'Verbose':",
        options: ["Talkative", "Silent", "Wordy", "Articulate"],
        correct_option: "Silent",
        description:
          "Verbose means using more words than necessary; the opposite is silent.",
      },
      {
        question:
          "Select the word that best completes the sentence: 'The detective managed to ____ the suspect's alibi.'",
        options: ["Prove", "Disprove", "Enhance", "Ignore"],
        correct_option: "Disprove",
        description:
          "The context suggests that the detective was able to disprove the suspect's alibi.",
      },
    ],
  },
  SituationalJudgement: {
    title: "Work Experience Analysis - Situational Judgement",
    questions: [
      {
        question:
          "You are working on a team project and one of your team members is not contributing. What should you do?",
        options: [
          "Confront the team member aggressively.",
          "Discuss the issue with the team member privately.",
          "Ignore the situation and hope it improves.",
          "Complain to your supervisor.",
        ],
        correct_option: "Discuss the issue with the team member privately",
        description:
          "Addressing the issue directly with the team member in a private and respectful manner is the most effective approach.",
      },
      {
        question:
          "You notice a coworker has been taking long breaks and affecting the team's productivity. What is your course of action?",
        options: [
          "Report them to HR immediately.",
          "Talk to the coworker to understand the reason for their behavior.",
          "Ignore the behavior and focus on your work.",
          "Start taking longer breaks yourself.",
        ],
        correct_option:
          "Talk to the coworker to understand the reason for their behavior",
        description:
          "Understanding the coworker’s situation can help resolve the issue without escalating it unnecessarily.",
      },
      {
        question:
          "A client is unhappy with a product delivery and is becoming increasingly upset. How do you handle this?",
        options: [
          "Tell the client there is nothing you can do.",
          "Calmly listen to the client and offer a solution.",
          "Ignore the client until they calm down.",
          "Blame the issue on another department.",
        ],
        correct_option: "Calmly listen to the client and offer a solution",
        description:
          "Listening to the client and providing a solution demonstrates empathy and problem-solving skills.",
      },
      {
        question:
          "You are given a tight deadline for a project that requires a lot of work. What should you do?",
        options: [
          "Request an extension from your supervisor.",
          "Prioritize the tasks and manage your time effectively.",
          "Rush through the project and hope for the best.",
          "Delegate all your tasks to coworkers.",
        ],
        correct_option: "Prioritize the tasks and manage your time effectively",
        description:
          "Effective time management and task prioritization are key to meeting tight deadlines.",
      },
      {
        question:
          "You disagree with your manager's approach to a task. How do you address this?",
        options: [
          "Publicly criticize your manager's approach.",
          "Discuss your concerns with your manager privately.",
          "Do the task your way without informing your manager.",
          "Refuse to do the task.",
        ],
        correct_option: "Discuss your concerns with your manager privately",
        description:
          "Privately discussing your concerns with your manager shows respect and a willingness to find a mutually agreeable solution.",
      },
      {
        question:
          "A colleague is taking credit for your work. What is your response?",
        options: [
          "Confront the colleague in a team meeting.",
          "Discuss the issue with the colleague privately.",
          "Ignore it and continue working hard.",
          "Report the behavior to your supervisor.",
        ],
        correct_option: "Discuss the issue with the colleague privately",
        description:
          "Addressing the issue directly with the colleague can resolve the misunderstanding without escalating the situation.",
      },
      {
        question:
          "You are feeling overwhelmed with your workload. What do you do?",
        options: [
          "Take a day off without informing anyone.",
          "Talk to your supervisor about your workload.",
          "Ignore the stress and keep working.",
          "Complain to your coworkers about your situation.",
        ],
        correct_option: "Talk to your supervisor about your workload",
        description:
          "Discussing your workload with your supervisor can help find a solution to manage your tasks more effectively.",
      },
      {
        question:
          "A team member is consistently late to meetings, causing delays. How do you handle this?",
        options: [
          "Report them to HR.",
          "Talk to the team member privately about their tardiness.",
          "Ignore the behavior and continue with the meetings.",
          "Publicly reprimand the team member during a meeting.",
        ],
        correct_option:
          "Talk to the team member privately about their tardiness",
        description:
          "Privately discussing the issue with the team member shows professionalism and a willingness to resolve the problem.",
      },
      {
        question:
          "Your supervisor asks you to take on additional responsibilities that you are not familiar with. What do you do?",
        options: [
          "Refuse the additional responsibilities.",
          "Accept the responsibilities and ask for guidance.",
          "Ignore the request and continue with your current tasks.",
          "Delegate the new tasks to someone else.",
        ],
        correct_option: "Accept the responsibilities and ask for guidance",
        description:
          "Accepting new responsibilities and seeking guidance demonstrates a willingness to learn and adapt.",
      },
      {
        question:
          "You notice a mistake in a project that is due soon. How do you proceed?",
        options: [
          "Ignore the mistake and submit the project.",
          "Fix the mistake yourself immediately.",
          "Inform your supervisor about the mistake.",
          "Blame the mistake on a coworker.",
        ],
        correct_option: "Fix the mistake yourself immediately",
        description:
          "Correcting the mistake promptly ensures the quality of the project and demonstrates responsibility.",
      },
    ],
  },
};

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [currentTest, setCurrentTest] = useState("NumericalReasoning"); // Default to 'NumericalReasoning'
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const testName = params.get("name") || "NumericalReasoning"; // Default to 'NumericalReasoning' if not specified
    setCurrentTest(testName);

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
    if (currentQuestion < tests[currentTest].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const newResults = tests[currentTest].questions.map((question, index) => ({
      question: question.question,
      correct: question.options[answers[index]] === question.correct_option,
      description: question.description,
      selected_option: question.options[answers[index]],
      correct_option: question.correct_option,
    }));
    setResults(newResults);

    const correctAnswers = newResults.filter((result) => result.correct).length;
    const percentage = (correctAnswers / newResults.length) * 100;
    setScore(percentage);

    setIsSubmitted(true);
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 relative">
      <div className="animated-bg"></div>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full z-10">
        {!isSubmitted ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{tests[currentTest].title}</h1>
              <span className="text-gray-500">
                Question {currentQuestion + 1} of{" "}
                {tests[currentTest].questions.length}
              </span>
            </div>
            <div className="mb-6">
              <p className="text-lg">
                {tests[currentTest].questions[currentQuestion].question}
              </p>
            </div>
            <div className="space-y-4">
              {tests[currentTest].questions[currentQuestion].options.map(
                (option, index) => (
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
                )
              )}
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
              {currentQuestion < tests[currentTest].questions.length - 1 ? (
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
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 ">Result</h2>
            <div className="flex  items-center mb-6 w-full">
              <div className="h-[10%] w-[15%]">
                <CircularProgressbar
                  value={score}
                  text={`${Math.round(score)}%`}
                  styles={buildStyles({
                    textColor: "#000",
                    pathColor: "#00aaff",
                    trailColor: "#d6d6d6",
                  })}
                />
              </div>
            </div>
            <p className="text-xl font-semibold mb-6">
              Score: {score.toFixed(2)}%
            </p>
            <ul className="space-y-4">
              {results.map((result, index) => (
                <li
                  key={index}
                  className={`p-4 border rounded-md ${
                    result.correct
                      ? "bg-green-100 border-green-500"
                      : "bg-red-100 border-red-500"
                  }`}
                >
                  <p className="font-semibold">{result.question}</p>
                  <p>
                    <strong>Your answer:</strong> {result.selected_option}
                  </p>
                  <p>
                    <strong>Correct answer:</strong> {result.correct_option}
                  </p>
                  <p>{result.description}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Retake Test
              </button>
            </div>
          </div>
        )}
      </div>
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
