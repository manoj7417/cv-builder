/** @format */

import React from "react";
import CoachForm from "./CoachForm";
import { Button } from "@/components/ui/button";
import { RemoveTokens } from "@/app/actions";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CoachLogoutButton from "./CoachLogoutButton";

const CoachFormPage = () => {

 


  return (
    <div className="h-full">
      <div className="w-full h-full mx-auto">
        <div className="flex coach_form_section h-full">
          <div className="lg:w-[30%] w-full h-[1140px] bg-blue-500 lg:block hidden">
            <div className="m-5">
              <CoachLogoutButton/>
            </div>
          </div>
          <div className="lg:w-[70%] w-full  coach_form py-10 px-10">
            <CoachForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachFormPage;
