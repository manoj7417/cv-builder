"use client";
import AccordionItem from "@/components/component/AccordionItem";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import NewMultiForm from "./NewMultiForm";

const faqData = [
  {
    id: 1,
    ques: "When it comes to reaching your fullest potential, settling for anything less than the best is not an option.",
    ans: "answers will be here",
  },
  {
    id: 2,
    ques: "When it comes to reaching your fullest potential, settling for anything less than the best is not an option.",
    ans: "answers will be here",
  },
  {
    id: 3,
    ques: "When it comes to reaching your fullest potential, settling for anything less than the best is not an option.",
    ans: "answers will be here",
  },
];

const CoachNewPage = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [findCoachPopUp, setFindCoachPopup] = useState(false);

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };
  return (
    <div>
      <section className="w-full min-h-screen sm:top-0 p-4 pt-28 sm:p-18 bg-gray-100 text-black flex items-center">
        <div className="flex flex-col items-center justify-between gap-0 sm:gap-8 w-full mx-auto py-10">
          <div className="flex flex-col xs:flex-row items-center max-w-6xl 2xl:mt-10 lg:mt-5">
            <div className="text-start">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] 2xl:text-8xl font-extrabold mb-4 sm:mb-6 xs:text-start text-center">
                Guidance That Empowers,
                <br />
                <span className="text-blue-700">Results That Inspire.</span>
              </h1>
              <Image
                priority
                src="/newCoach.png"
                alt="newCoach"
                height={300}
                width={450}
                className="2xl:w-[500px] 2xl:h-[400px] lg:w-[800px] lg:h-[400px] object-contain"
              />
              <div className="flex justify-center xs:justify-start">
                <button
                  className="bg-blue-950 text-white py-3 px-8 rounded border-2 border-transparent transition duration-300 hover:bg-blue-700 hover:border-blue-500"
                  onClick={() => setFindCoachPopup(true)}
                >
                  Find Your Coach
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="faq py-20">
        <div className="main_heading text-center">
          <h2 className="text-3xl text-center text-bold font-semibold my-5">
            You <span className="text-blue-700">deserve</span> the{" "}
            <span className="text-blue-700">best coaches</span> in the world
          </h2>
          <p className="max-w-3xl mx-auto text-sm">
            When it comes to reaching your fullest potential, settling for
            anything less than the best is not an option. Our expert coaches are
            here to guide you with proven strategies, personalized insights, and
            a passion for helping you succeed.
          </p>
        </div>
        <div className="max-w-[70rem] mx-auto flex lg:flex-row flex-col py-10">
          <div className="faq_image lg:w-[50%] w-full lg:block hidden">
            <div className="image_div w-[400px] h-[400px]">
              <img
                src="/newCoachFaq.png"
                alt="faq"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="faq_content lg:w-[50%] w-full lg:p-1 p-5">
            <h2 className="text-3xl text-bold font-semibold my-5">
              You <span className="text-blue-700">deserve</span> the{" "}
              <span className="text-blue-700">best coaches</span> in the world
            </h2>
            {faqData?.map((item, index) => (
              <AccordionItem
                open={index === open}
                key={index}
                ques={item?.ques}
                ans={item?.ans}
                pathname={pathname}
                toggle={() => toggle(index)}
              />
            ))}
          </div>
        </div>
      </section>
      <NewMultiForm
        setFindCoachPopup={setFindCoachPopup}
        findCoachPopUp={findCoachPopUp}
      />
    </div>
  );
};

export default CoachNewPage;
