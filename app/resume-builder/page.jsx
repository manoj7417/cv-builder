import React from "react";
import ResumeForm from "./ResumeForm";
import ResumeView from "./ResumeView";

const ResumeBuilderPage = () => {
  return (
    <div>
      <div className="flex md:flex-row flex-col w-full h-full relative">
        <div className="lg:w-[40%] w-full h-full overflow-auto forms_section">
          <ResumeForm />
        </div>
        <div className="lg:w-[60%] w-full h-screen overflow-hidden resume_templates_section lg:fixed top-0 lg:right-0 lg:block hidden">
          <ResumeView />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
