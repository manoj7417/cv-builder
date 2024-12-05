/** @format */

import React from "react";
import CoachForm from "./CoachForm";
import CoachLogoutButton from "./CoachLogoutButton";

const CoachFormPage = () => {
  return (
    <div className="h-full flex">
      {/* Left Side: Fixed Section */}
      <div className="lg:w-[30%] w-full h-auto bg-blue-500 hidden lg:block sticky top-0">
        <div className="m-5">
          <CoachLogoutButton />
        </div>
      </div>

      {/* Right Side: Scrollable Content */}
      <div className="lg:w-[70%] w-full h-full overflow-y-auto py-10 px-10">
        <CoachForm />
      </div>
    </div>
  );
};

export default CoachFormPage;
