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
      ques: "How does Genies Pro CV Creator with AI help me make better CV templates?",
      ans: "The Genies Career Hub integrates Artificial Intelligence to create CV templates and add content that exactly matches the job role. It rules out the possibility of mistakes and automates the process of resume creation.",
    },
    {
      id: 2,
      ques: "What does the Genies Career Hub’s Pro CV Curriculum Vitae Creator do?",
      ans: "The Genies Career Hub’s Pro CV Curriculum Vitae Creator helps you create your resume with its pre-created templates and provides specific suggestions with respect to content, skills, and designs. Additionally, the AI-based Genie assists you in creating a flawless resume that is grammatically correct and skillfully loaded.",
    },
    {
      id: 3,
      ques: "How is Genies Pro CV Optimiser different from other CV builder applications?",
      ans: "The Genies Pro CV Optimiser is much different from a CV Builder. It is an AI-integrated tool that helps you analyse and refine your CV by integrating the best available resources into your CV formation. The optimised CV that you can get through the Optimiser complies with the Application Tracking Software ATS and is built to impress potential recruiters.",
    },
    {
      id: 4,
      ques: "How does CV Match help me find the CV Vitae Template for my job role? ",
      ans: "The Genies Pro CV Match is the third tool in the CV Studio suit at the Genies Career Hub. It matches your inputs on job descriptions with the exact CV Vitae Template, as required by the job profile. Created by inculcating Artificial Intelligence, the CV Match is one of the easiest ways to automate the CV-making process while ensuring that a custom and tailored resume is produced.",
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
            Frequently Asked Questions!
          </h2>
          <p className="w-1/2 mx-auto text-center my-4">
            Want to know more about Genies Career Hub, Genies Pro CV Studio, and
            Career Coaching? <br />
            We have answered a few of your questions.
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
