/** @format */

"use client";
import React, { useState } from "react";
import AccordionItem from "./AccordionItem";
import parse from "html-react-parser";

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
      ques: "How do I use the Curriculum Vitae Template to make my Resume?",
      ans: `
        There are a variety of options available on the CV Creator to build your resume that matches your sets of skills and professional experience. In order to use the pre-existing Curriculum Vitae Template to create your resume, you can simply follow the following steps:
        <ul>
          <li>Head to the CV Creator section tab on the header and tap to open the Creator tool.</li>
          <li>On the following page, there shall be a variety of templates available under the categories of All Templates, Simple, ATS, Designer, and Professional.</li>
          <li>Click on the respective category to load the template options.</li>
          <li>Click on the “Try Now” button to build the CV in the selected template design.</li>
          <li>The template shall open up along with the CV Maker tool.</li>
          <li>Enter the required details. You can also use the assistance of the AI to input the necessary information and frame the content.</li>
          <li>Post the creation of the resume, you can easily Preview it and check the Resume Score simultaneously.</li>
          <li>Download the CV in the preferred Curriculum Vitae format through the Resume Generator tool.</li>
        </ul>
      `,
    },
    {
      id: 2,
      ques: "How do I make an ATS Friendly Resume using available CV Templates?",
      ans: `
        To make an ATS Friendly Resume, the simple hack is to employ an Application Tracking System ATS Resume Template. These templates are specifically designed to build an ATS System CV. This CV shall easily pass through the software that analyses resumes and compacts them for information. To create a resume that is compatible with the ATS CV Checker, follow these steps:
        <ul>
          <li>Tap on the CV Creator tab on the header of the website.</li>
          <li>In the templates section, tap on the category of ATS. The templates that are compatible with the Application Tracking Software shall appear on the screen. These templates are formatted according to the ATS System CV formatting.</li>
          <li>Click on the “Try Now” option to create the resume in the selected template CV format.</li>
          <li>Enter all the necessary details and information about your profile and experience.</li>
          <li>Tap on the Preview option to check the formatted and created resume.</li>
          <li>You can easily download your ATS friendly Resume, specially crafted to go through the Application Tracking Software.</li>
          <li>Further, you can easily run the prepared CV through the ATS CV Checker available in the CV Optimiser tool. This will help you analyse your Curriculum Vitae and easily check its compatibility.</li>
          <li>In case, your Resume does not appear compatible with the analyser, you can edit it with the AI.</li>
        </ul>
      `,
    },
    ,
    {
      id: 3,
      ques: "How can resume professionals and resume services help me write my CV?",
      ans: `
        Taking services from a Career Coach who also offers services in Resume creation and professional writing can be very insightful. Often, for very high-profile jobs, the candidates miss out on the exact details and keywords that an employer is looking for in the job application. Therefore, a resume professional and resume services Career Coach can help you format the perfect resume for the job you are applying for. Additionally, they can help you figure out various aspects as you seek to switch your job or find employment. You can easily contact the best career coach who can help you. All you need to do is head to the Career Coach and contact to get connected with a potential Career Coach who can guide you through professional problems.
      `,
    },
    {
      id: 4,
      ques: "What are the different types of personality tests and how can they help me?",
      ans: `
        There are distinctive types of personality tests that you can take in order to identify your professional strengths and weaknesses. Additionally, you can take Psychometric Tests in order to figure out your professional inclinations. The tests are curated specifically to suit distinct personalities and psychologies and are designed by professional psychometricians. The types of personality tests analyse different aspects. The following psychometric examinations are available for judging personality types:
        <ul class="styled-list">
          <li>Numerical Reasoning</li>
          <li>Verbal Reasoning</li>
          <li>Diagrammatic Reasoning</li>
          <li>Situational Judgement</li>
          <li>Abstract Reasoning</li>
          <li>Spatial Reasoning</li>
          <li>Logical Reasoning</li>
          <li>Mechanical Reasoning</li>
        </ul>
      `,
    },
    // Uncomment and format the rest of the entries similarly if needed
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
      <div
        className='faq_section bg-gradient-to-b from-[#e4f5fc] to-[white]  px-10 py-20'
        id='FAQS'>
        <div className='faq_title pt-20'>
          <h1 className='2xl:text-6xl lg:text-5xl text-3xl font-bold mt-5 tracking-tighter text-black text-center'>
            Frequently Asked Questions!
          </h1>
          <div className="para py-2">
          <h2 className='w-full mx-auto text-center text-[#7C7C7C]'>
            Want to know more about Genies Career Hub?{" "}
          </h2>
          <h3 className="w-full mx-auto text-center text-[#7C7C7C]">We have answered a few of your
          questions.</h3>
          </div>
        </div>
        <div className='accordion_content max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-10'>
          {faqData?.map((item, index) => (
            <AccordionItem
              open={index === open}
              key={index}
              ques={item?.ques}
              ans={parse(item?.ans)}
              toggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQSection;
