"use client";
import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

const FAQSection = () => {
  const [open, setOpen] = useState(false);

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };
  const faqData = [
    {
      id: 1,
      ques: "What are the benefits of using AI-based services for CV creation?",
      ans: "Our AI tools help you create a professional CV with ease, ensuring it stands out to potential employers.",
    },
    {
      id: 2,
      ques: "How can I optimize my CV for a specific job application?",
      ans: "With our AI-powered services, you can optimize your CV for any job application, making you a top candidate.",
    },
    {
      id: 3,
      ques: "How do I tailor my CV to match the specific requirements of a job?",
      ans: "Tailor your CV to match the specific requirements of your dream job with our advanced AI solutions.",
    },
    {
      id: 4,
      ques: "What tools can help highlight my strengths and experiences on my CV?",
      ans: "Leverage our AI technology to highlight your strengths and experiences in the most effective way possible.",
    },
    // {
    //   id: 5,
    //   ques: "How can AI ensure my CV meets industry standards?",
    //   ans: "Our AI-driven CV creator ensures your resume meets industry standards and catches the eye of recruiters.",
    // },
    // {
    //   id: 6,
    //   ques: "What are the best ways to customize my CV for different job positions?",
    //   ans: "Use our AI services to customize your CV for any position, increasing your chances of landing an interview.",
    // },
    // {
    //   id: 7,
    //   ques: "Where can I find sample CVs to help create a standout resume?",
    //   ans: "Our sample CVs and AI enhancements provide the perfect starting point to create a standout resume.",
    // },
    // {
    //   id: 8,
    //   ques: "How can AI tools help format and polish my CV?",
    //   ans: "AI tools help you format and polish your CV to perfection, making it compelling and professional.",
    // },
    // {
    //   id: 9,
    //   ques: "How do I ensure my CV is error-free and impactful?",
    //   ans: "Ensure your CV is error-free and impactful with the help of our intelligent CV-making services.",
    // },
    // {
    //   id: 10,
    //   ques: "How can AI services adapt to my specific CV needs?",
    //   ans: "Our AI-based CV services adapt to your needs, helping you craft a resume that aligns perfectly with job requirements.",
    // },
  ];
  return (
    <>
      <div className="faq_section bg-gradient-to-b from-white to-[#2C98CA33] px-10 py-20">
        <div className="faq_title">
          <h2 className="2xl:text-6xl lg:text-5xl text-3xl font-bold mt-5 tracking-tighter text-gray-900 text-center">
            Frequently asked questions!
          </h2>
          <p className="w-1/2 mx-auto text-center my-4">
            Explore unlimited possibilities with the power of a perfectly
            crafted CV by creating one that aligns with your Professional
            Profile, employing our customised Curriculum Vitae templates
          </p>
        </div>
        <div className="accordion_content max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-10">
          {faqData?.map((item, index) => (
                <AccordionItem
                  open={index === open}
                  key={index}
                  ques={item?.ques}
                  ans={item?.ans}
                  toggle={() => toggle(index)}
                />
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQSection;
