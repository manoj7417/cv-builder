/** @format */

import React from "react";
import CoachForm from "./CoachForm";

const CoachFormPage = () => {
  return (
    <div>
      <div className='w-full mx-auto'>
        <div className='flex coach_form_section'>
          <div className='lg:w-[30%] w-full h-[1200px] bg-blue-500 lg:block hidden'></div>
          <div className='lg:w-[70%] w-full coach_form py-20 px-10'>
            <CoachForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachFormPage;
