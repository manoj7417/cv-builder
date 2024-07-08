import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const myMiddlewares = (config) => persist(config, { name: "user-data-store" });

export const useUserDataStore = create(
  myMiddlewares(
    devtools(
      (set) => ({
        bioData: {
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
              question:
                "Which subjects or areas do you feel most confident in?",
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
              question:
                "What hobbies or activities do you enjoy in your free time?",
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
              question:
                "Are there any areas where you feel you need improvement?",
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
              question:
                "Is there a specific career path you are interested in?",
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
        },
        answers: {},
        currentStep: 0,
        contentType: "Intro",
        setBioData: (category, questionIndex, newAnswer) =>
          set((state) => {
            const updatedCategory = state.bioData[category].map((q, i) =>
              i === questionIndex ? { ...q, answer: newAnswer } : q
            );
            return {
              bioData: {
                ...state.bioData,
                [category]: updatedCategory,
              },
            };
          }),
        nextStep: () =>
          set((state) => ({
            currentStep: state.currentStep + 1,
          })),
        previousStep: () =>
          set((state) => ({
            currentStep: state.currentStep - 1,
          })),
        setAnswers: (newAnswers) =>
          set((state) => ({
            answers: newAnswers,
          })),
        setContentType: (newContentType) =>
          set((state) => ({
            contentType: newContentType,
          })),
        resetSteps: () =>
          set((state) => ({
            currentStep: 0
          }))
      }),
      {
        enabled: true,
      }
    )
  )
);
