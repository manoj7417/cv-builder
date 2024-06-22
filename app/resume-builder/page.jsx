import React from "react";
import ResumeForm from "./ResumeForm";
import ResumeView from "./ResumeView";

const ResumeBuilderPage = () => {
  return (
    <div>
      <div className="flex w-full h-full">
        <div className="lg:w-[40%] w-full forms_section">
          <ResumeForm />
        </div>
        <div className="lg:w-[60%] w-full resume_templates_section fixed top-0 right-0">
          <ResumeView />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
