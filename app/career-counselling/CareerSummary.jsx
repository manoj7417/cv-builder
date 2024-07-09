import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { RxComponent1, RxDashboard, RxPaperPlane } from "react-icons/rx";
import { useUserDataStore } from "../store/useUserDataStore";

const CareerSummary = () => {
  const { careerSummary } = useUserDataStore();

  return (
    <>
      <div>
        <div className="summary-title">
          <h1 className="text-4xl font-bold text-blue-950">Your Personalised Summary</h1>
        </div>
        <div className="section shadow-lg p-5 rounded-md my-2">
          <h2 className="text-2xl font-bold text-blue-950 flex items-center gap-3"><RxComponent1 />Summary</h2>
          <div className="mt-3 space-y-3">
            <p>
              <strong>Strengths:</strong> {careerSummary?.summary.strengths}
            </p>
            <p>
              <strong>Weaknesses:</strong> {careerSummary?.summary.weaknesses}
            </p>
            <p>
              <strong>Interests:</strong> {careerSummary?.summary.interests}
            </p>
            <p>
              <strong>Values:</strong> {careerSummary?.summary.values}
            </p>
          </div>
        </div>
        <div className="section shadow-lg p-5 rounded-md my-2">
          <h2 className="text-2xl font-bold text-blue-950 flex items-center gap-3">
            <RxDashboard />
            Career Suggestions
          </h2>
          <div className="mt-3 space-y-3">
            <ul>
              {careerSummary?.careerSuggestions.map((career, index) => (
                <li key={index} className="py-2 space-y-2">
                  <strong>Career:</strong> {career.career}
                  <br />
                  <strong>Reason:</strong> {career.reason}
                  <br />
                  <strong>Actions:</strong> {career.actions}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="section shadow-lg p-5 rounded-md my-2">
          <h2 className="text-2xl font-bold text-blue-950 flex items-center gap-3">
            <RxPaperPlane />
            Actionable Insights
          </h2>
          <div className="space-y-3 mt-3">
            <p>
              <strong>Training:</strong> {careerSummary?.actionableInsights.training}
            </p>
            <p>
              <strong>Skill Development:</strong>{" "}
              {careerSummary?.actionableInsights.skillDevelopment}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerSummary;
