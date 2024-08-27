import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../ui/button";
import Image from "next/image";

const ServicesPopUp = ({
  isServiceDialogOpen,
  setIsServiceDialogOpen,
  serviceName,
  serviceLink
}) => {
  return (
    <div>
      <DialogContent
        className="sm:max-w-[800px] w-full sm:w-auto px-4 py-6 sm:px-8 sm:py-8 text-center"
        showCloseButton={true}
        onClick={()=>setIsServiceDialogOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>
            <h2 className="lg:text-3xl text-xl sm:text-2xl my-2 text-center bg-clip-text text-transparent bg-blue-800 animate-bounce">
            YOU NEED MORE CREDITS!
            </h2>
          </DialogTitle>
          <DialogDescription>
            <p className="text-sm sm:text-base text-center text-black">
            To move ahead, you need to add credits to your plan
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="w-[80%] mx-auto text-base">
          <h2>You have exhausted the allotted credits but your plan is still active. Add more credits to download additional PDFs.</h2>
        </div>
        <DialogFooter className="mt-4 sm:mt-8">
         <div className="flex lg:flex-row flex-col justify-between lg:w-[50%] w-[80%] mx-auto gap-5">
         <Button
            className="bg-blue-800 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base cursor-pointer w-full sm:w-auto"
          >
            Back to Plan
          </Button>
          <Button
            className="bg-blue-800 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base cursor-pointer w-full sm:w-auto"
          >
            Upgrade Now
          </Button>
         </div>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default ServicesPopUp;
