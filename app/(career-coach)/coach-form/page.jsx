/** @format */

import React from "react";
import CoachForm from "./CoachForm";

const CoachFormPage = () => {
  return (
    <div>
      <div className='max-w-7xl mx-auto mt-40 mb-20'>
        <div className='flex coach_form_section'>
          <div className='lg:w-[30%] w-full h-[1000px] bg-blue-500 lg:block hidden'></div>
          <div className='lg:w-[70%] w-full coach_form'>
            <CoachForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachFormPage;
