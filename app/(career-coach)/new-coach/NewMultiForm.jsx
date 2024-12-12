import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";

const formSteps = [
  {
    id: 1,
    ques: "What is your current educational or professional status?",
    answers: ["Student", "Graduate", "Already Working", "Looking for job"],
  },
  {
    id: 2,
    ques: "What challenges or obstacles are you currently facing in your career journey?",
    answers: [
      "Lack of Clarity",
      "Skill Gaps",
      "Difficulty in finding opportunities",
      "Weak Resume",
    ],
  },
  {
    id: 3,
    ques: "What specific area of expertise or field do you need guidance in?",
    answers: [
      "Marketing",
      "Engineering",
      "IT",
      "Designing",
      "Healthcare",
      "Development",
    ],
  },
  {
    id: 4,
    ques: "What level of experience are you aiming to achieve?",
    answers: [
      "Entry-Level",
      "Mid-Career",
      "Experienced",
      "Leadership Roles",
    ],
  },
  {
    id: 5,
    ques: "How do you prefer to learn or receive guidance?",
    answers: [
      "One-On-One Sessions",
      "Group Workshops",
      "Online Resources",
      "Hands On Practice",
    ],
  },
];

const MultiStepFormDialog = ({ setFindCoachPopup, findCoachPopUp }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const router = useRouter()

  const handleNext = () => {
    if (selectedValue) {
      setFormData((prev) => ({
        ...prev,
        [`step_${currentStep + 1}`]: selectedValue,
      }));
      setSelectedValue(null);
      if (currentStep < formSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedValue(formData[`step_${currentStep}`] || null);
    }
  };

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  const onSubmit = () => {
    const finalData = {
      ...formData,
      [`step_${currentStep + 1}`]: selectedValue,
    };
    router.push("/coachesNewPage")
    console.log("All Form Data: ", finalData);
    setFindCoachPopup(false);
  };

  return (
    <Dialog open={findCoachPopUp} onOpenChange={setFindCoachPopup}>
      <DialogContent
        className="max-w-5xl bg-blue-950 text-white"
        showCloseButton={true}
        onClick={() => setFindCoachPopup(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">Find Coach</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {formSteps[currentStep].ques}
            </h2>
            <RadioGroup
              value={selectedValue}
              onValueChange={handleRadioChange}
              className="grid grid-cols-2 gap-4 max-w-xl mx-auto"
            >
              {formSteps[currentStep].answers.map((answer) => (
                <div key={answer} className="flex items-center">
                  <RadioGroupItem
                    value={answer}
                    id={answer}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={answer}
                    className={`flex items-center justify-center w-full p-4 text-sm font-medium border rounded-lg cursor-pointer transition-colors ${
                      selectedValue === answer
                        ? "bg-[#5d6687] text-white border-[#5d6687]"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {answer}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <DialogFooter className="flex justify-between mt-6">
            {currentStep > 0 && (
              <Button
                type="button"
                className="bg-[#5d6687] text-white"
                onClick={handlePrevious}
              >
                Previous
              </Button>
            )}

            {currentStep < formSteps.length - 1 ? (
              <Button
                className="bg-white text-blue-950 font-bold"
                type="button"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button type="button" onClick={onSubmit} className="bg-[#7c84a2] text-white">
                Submit
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MultiStepFormDialog;
