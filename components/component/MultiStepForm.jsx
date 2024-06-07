import { DatePicker } from "antd";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Textarea } from "../ui/textarea";
import AiGenerateLoader from "@/app/ui/AiGenerateLoader";

import React from "react";

export const MultiStepForm = ({
  steps,
  formData,
  setFormData,
  setSteps,
  isLoading,
  handleGenerateProfileSummary,
  handleCloseAIDialog
}) => {
  const handleJobTitleChange = (e) => {
    const newFormDate = { ...formData, jobTitle: e.target.value };
    setFormData(newFormDate);
  };

  const handleskillsChange = (e) => {
    const newFormDate = { ...formData, skills: e.target.value };
    setFormData(newFormDate);
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      experience: { ...formData.experience, [name]: value },
    };
    setFormData(newFormData);
  };

  if (steps === 1) {
    return (
      <DialogContent onClick={handleCloseAIDialog} className="sm:max-w-[425px]" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle>
            <div className=" flex items-center">
              <p className="mr-3">0%</p>
              <Progress value={1} className=" shadow-sm h-4 border" />
            </div>
          </DialogTitle>
          <DialogDescription>
            Enter your Job Profile here and tap on the Next option to save your
            details.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="name" className="text-right">
            Job Title
          </Label>
          <Input
            id="jobTitle"
            placeholder="Enter your job title"
            className="mt-2"
            onChange={handleJobTitleChange}
            value={formData.jobTitle}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => setSteps((prev) => prev + 1)}
            disabled={formData?.jobTitle.length == 0}
          >
            Next
          </Button>
        </DialogFooter>
      </DialogContent>
    );
  } else if (steps === 2) {
    return (
      <DialogContent className="sm:max-w-[425px]" onClick={handleCloseAIDialog} showCloseButton={true}>
        <DialogHeader>
          <DialogTitle>
            <div className=" flex items-center">
              <p className="mr-3">25%</p>
              <Progress value={25} className=" shadow-sm h-4 border" />
            </div>
          </DialogTitle>
          <DialogDescription>
            Enter the details of your Professional Experiences such as Job
            Title, Company Name, Start Date, End Date, and Job Description.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full">
            <Label htmlFor="name" className="text-right">
              Job Title{" "}
              <span className=" text-10px italic ml-1 text-gray-500">
                (optional)
              </span>
            </Label>
            <Input
              name="jobTitle"
              placeholder="Enter your job title"
              className="mt-2"
              value={formData.experience.jobTitle}
              onChange={handleExperienceChange}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="employer" className="text-right">
              Comapny
              <span className=" text-10px italic ml-1 text-gray-500">
                (optional)
              </span>
            </Label>
            <Input
              name="companyName"
              placeholder="Enter comapany name"
              className="mt-2"
            />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="employer" className="text-right">
                Start Date
                <span className=" text-10px italic ml-1 text-gray-500">
                  (optional)
                </span>
              </Label>
              <DatePicker placeholder="Start Date" name="startDate" />
            </div>
            <div>
              <Label htmlFor="employer" className="text-right">
                End Date
                <span className=" text-10px italic ml-1 text-gray-500">
                  (optional)
                </span>
              </Label>
              <DatePicker placeholder="End Date" name="endDate" />
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="employer" className="text-right">
            Job Description
            <span className=" text-10px italic ml-1 text-gray-500">
              (optional)
            </span>
          </Label>
          <Textarea placeholder="Job Description" />
        </div>
        <DialogFooter>
          <div className="flex justify-between items-center w-full">
            <Button onClick={() => setSteps((prev) => prev - 1)}>Back</Button>
            <Button onClick={() => setSteps((prev) => prev + 1)}>Next</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    );
  } else if (steps === 3) {
    return (
      <DialogContent className="sm:max-w-[425px]" onClick={handleCloseAIDialog} showCloseButton={true}>
        <DialogHeader>
          <DialogTitle>
            <div className=" flex items-center">
              <p className="mr-3">50%</p>
              <Progress value={50} className=" shadow-sm h-4 border" />
            </div>
          </DialogTitle>
          <DialogDescription>
            Enter your Relevant Skills that match your Job Profile here and
            Submit to generate your profile description with the Genie.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Textarea
            placeholder="Enter relevant skills "
            value={formData.skills}
            onChange={handleskillsChange}
          />
        </div>
        <DialogFooter>
          <div className="w-full flex justify-between items-center">
            <div>
              <Button onClick={() => setSteps((prev) => prev - 1)}>Back</Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  handleGenerateProfileSummary();
                  setSteps((prev) => prev + 1);
                }}
                disabled={formData.skills.length === 0}
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    );
  } else if (steps === 4) {
    return (
      <DialogContent className="sm:max-w-[425px]" onClick={handleCloseAIDialog} showCloseButton={true}>
        {isLoading ? (
          <div>
            <AiGenerateLoader />
            <p className="text-gray-500 text-sm">
              Generating presonalized profile summary with
              <span className=" text-violet-700 font-bold ml-2 text-base">AI</span>
            </p>
          </div>
        ) : (
          <DialogHeader>
            <DialogTitle>
              <div className=" flex items-center">
                <p className="mr-3">100%</p>
                <Progress value={100} className=" shadow-sm h-4 border" />
              </div>
            </DialogTitle>
            <DialogDescription>
              <div className="mt-5 text-center">
                AI has generated your personalised profile summary
              </div>
            </DialogDescription>
          </DialogHeader>
        )}
      </DialogContent>
    );
  }
};
