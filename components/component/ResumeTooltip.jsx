'use client'
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Update with the correct path to your Tooltip components

const ResumeTooltip = ({ icon: Icon, title, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div>{children}</div>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-200 text-black">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ResumeTooltip;
