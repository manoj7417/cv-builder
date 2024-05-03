"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/app/components/ui/accordion";
import React from "react";
import { accordionData } from "@/constants/data";

const AccordionSection = () => {
  return (
    <>
      <div className="container mx-auto md:px-32 px-5">
        <h2 className="text-black md:text-5xl text-[25px] font-bold text-center my-10">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="md:w-6xl w-full mx-auto">
          {Array.isArray(accordionData) &&
            accordionData?.length > 0 &&
            accordionData?.map((val,i) => (
              <AccordionItem value={val?.id} className="py-2" key={i}>
                <AccordionTrigger className="text-base font-bold">{val?.ques}</AccordionTrigger>
                <AccordionContent className="text-sm font-semibold">
                 {val?.ans}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </>
  );
};

export default AccordionSection;
