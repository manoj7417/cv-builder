"use client";
import { CardDescription } from "@/components/ui/card";
import Image from "next/image";
import React, { useRef, useState } from "react";
import PricingModal from "./PricingModal";
import Link from "next/link";
import card1 from "@/public/banner-img-3.jpg"
import card2 from "@/public/se.webp" 
import card3 from "@/public/easymeeting.png"
import card4 from "@/public/perfomance.png"

const Pricing = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const serviceCardsRef = useRef(null);

  // Function to scroll to the service cards section
  const scrollToServiceCards = () => {
    serviceCardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const serviceCards = [
    {
      id: 1,
      cardTitle: "Genies Pro Suite",
      cardDescription:
        "Unlock the full potential of your career with Genies Pro Suite, offering advanced tools for professional growth.",
        imageUrl:card1,
        free: {
        title: "Free",
        link: "/cv-studio",
      },
      subscribe: {
        title: "Subscribe",
        price: {
          monthly: "£20 per month",
          yearly: "£240 per year",
        },
      },
      features: [
        "Access to Professional and ATS Compatible CV Templates",
        "Download 20 CVs in PDF format",
        "Template Choices with all Colours and Customisations",
        "Unlimited Modification in Created CV",
        "20 CV Scan through CV Optimiser for passing the Recruiter’s ATS Software",
        "Unlimited CV Upgrade through AI-based CV Match",
        "Access to 10 psychometric Tests",
        "One-on-one consultation with Career Coach",
        "Email and On-Call Support Service",
      ],
    },
    {
      id: 2,
      cardTitle: "AI Career Coach",
      cardDescription:
        "Get personalized career guidance with AI Career Coach, designed to help you navigate your career path effectively.",
        imageUrl:card2,
        free: {
        title: "Free",
        link: "/coming-soon",
      },
      subscribe: {
        title: "Subscribe",
        price: {
          monthly: "£20 per month",
          yearly: "£240 per year",
        },
      },
      features: [
        "Personalized Career Guidance with AI-based Insights",
        "Access to Professional and ATS Compatible CV Templates",
        "Download 20 CVs in PDF format",
        "Template Choices with all Colours and Customisations",
        "Unlimited Modification in Created CV",
        "20 CV Scan through CV Optimiser for passing the Recruiter’s ATS Software",
        "Unlimited CV Upgrade through AI-based CV Match",
        "Access to 10 psychometric Tests",
        "One-on-one consultation with Career Coach",
        "Email and On-Call Support Service",
      ],
    },
    {
      id: 3,
      cardTitle: "Traditional Virtual 1-to-1 Coaching",
      cardDescription:
        "Experience personalized coaching with our traditional virtual 1-to-1 sessions, tailored to your career needs.",
        imageUrl:card3,
        free: {
        title: "Free",
        link: "/coming-soon",
      },
      subscribe: {
        title: "Subscribe",
        price: {
          monthly: "£20 per month",
          yearly: "£240 per year",
        },
      },
      features: [
        "Personalized Virtual 1-to-1 Coaching Sessions",
        "Access to Professional and ATS Compatible CV Templates",
        "Download 20 CVs in PDF format",
        "Template Choices with all Colours and Customisations",
        "Unlimited Modification in Created CV",
        "20 CV Scan through CV Optimiser for passing the Recruiter’s ATS Software",
        "Unlimited CV Upgrade through AI-based CV Match",
        "Access to 10 psychometric Tests",
        "One-on-one consultation with Career Coach",
        "Email and On-Call Support Service",
      ],
    },
    {
      id: 4,
      cardTitle: "Psychometric Testing Tools",
      cardDescription:
        "Utilize Psychometric Testing Tools to assess your abilities, personality traits, and career potential accurately.",
        imageUrl:card4,
        free: {
        title: "Free",
        link: "/coming-soon",
      },
      subscribe: {
        title: "Subscribe",
        price: {
          monthly: "£20 per month",
          yearly: "£240 per year",
        },
      },
      features: [
        "Comprehensive Psychometric Assessments",
        "Access to Professional and ATS Compatible CV Templates",
        "Download 20 CVs in PDF format",
        "Template Choices with all Colours and Customisations",
        "Unlimited Modification in Created CV",
        "20 CV Scan through CV Optimiser for passing the Recruiter’s ATS Software",
        "Unlimited CV Upgrade through AI-based CV Match",
        "Access to 10 psychometric Tests",
        "One-on-one consultation with Career Coach",
        "Email and On-Call Support Service",
      ],
    },
  ];

  // Define background colors
  const backgroundColors = [
    "bg-[#FFAB2E]",
    "bg-[#0C34A6]",
    "bg-[#75009E]",
    "bg-[#D10000]",
  ];

  const handleOpenAIDialog = (card) => {
    setSelectedCard(card);
    setIsDialogOpen(true);
  };

  const handleCloseAIDialog = () => {
    setIsDialogOpen(false);
    setSelectedCard(null); // Clear selected card on close
  };

  return (
    <>
      <section className="w-full h-screen 2xl:mt-20 lg:mt-44 mt-10">
        <div className="w-full h-full flex justify-center items-center">
          <div className="text-start">
            <h1 className="text-[45px] sm:text-4xl md:text-5xl lg:text-[60px] 2xl:text-8xl font-extrabold mb-4 sm:mb-6 xs:text-start text-center">
              Genies<span className="text-blue-700">Pricing</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium mb-4 sm:mb-10 lg:mb-5 lg:max-w-3xl w-[70%] text-center xs:text-start mx-auto">
              Get the services like CV Studio Resume Builder generative AI
              features. ( ADD ALL SERVICES NAME ) Get the Subscription now on
              monthly incl. GST.
            </p>
            <div className="flex lg:flex-row flex-col lg:w-full w-[60%] mx-auto text-center justify-center xs:justify-start gap-5">
              <button
                className="bg-blue-950 text-white py-3 px-8 rounded border-2 border-transparent"
                onClick={scrollToServiceCards}
              >
                View Subscription Plan
              </button>
              <Link
                href={"/cv-studio"}
                className="bg-sky-100  text-blue-950 py-3 px-8 rounded border-2 border-blue-950"
              >
                Go For Free Trial
              </Link>
            </div>
            {/* Add Image below the content */}
            <div className="mt-8 flex justify-center">
              <Image
                src="/pricing-pic.png" // replace with your image path
                alt="Pricing"
                width={500} // adjust as needed
                height={300} // adjust as needed
                className="lg:w-[500px] w-[400px] lg:h-[500px] h-[300px] lg:object-cover object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="p-20 bg-blue-50" ref={serviceCardsRef}>
        <div className="text-center card_main_title">
          <h2 className="lg:text-5xl text-xl font-bold">
            Different Services,
            <span className="text-blue-700">Infinite possibilities.</span>{" "}
          </h2>
          <p className="lg:w-[40%] w-full mx-auto my-3 text-base">
            We have a passion to mentor you on your entire career path, help you
            realize what you want to do, how to get into that career, and
            utilize experts to guide you on how to excel within it.
          </p>
        </div>
        <div className="flex justify-center py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:gap-8 lg:gap-20 gap-5">
            {serviceCards?.length > 0 &&
              serviceCards.map((item, index) => {
                // Assign background color based on index
                const bgColor =
                  backgroundColors[index % backgroundColors.length];
                return (
                  <>
                    <div key={index} className="flex rounded-md">
                      <div
                        className={`w-[350px] h-[250px]  border flex flex-col shadow-lg justify-between ${bgColor}`}
                      >
                        <div className="p-4">
                          <h1 className="text-2xl font-semibold text-white">
                            {item?.cardTitle}
                          </h1>
                          <p className="mt-3 text-sm text-white">
                            {item?.cardDescription}
                          </p>
                        </div>
                        <div className="p-4 actions_buttons flex justify-between">
                          <Link
                            href={item?.free?.link}
                            type="button"
                            className="rounded-sm bg-transparent px-5 py-2 text-sm font-semibold text-white border-2 border-white"
                          >
                            {item?.free?.title}
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleOpenAIDialog(item)}
                            className="rounded-sm bg-white px-5 py-2 text-sm font-semibold text-black"
                          >
                            {item?.subscribe?.title}
                          </button>
                        </div>
                      </div>
                      <div className="bg-white lg:block hidden">
                          <Image
                            src={item?.imageUrl} // replace with the correct image path
                            alt="Card Image"
                            width={500} // adjust as needed
                            height={500} // adjust as needed
                            className={`w-[350px] h-[250px] object-contain`}
                          />
                        </div>
                    </div>
                    <PricingModal
                      isDialogOpen={isDialogOpen}
                      setIsDialogOpen={setIsDialogOpen}
                      handleCloseAIDialog={handleCloseAIDialog}
                      pricingData={selectedCard}
                    />
                  </>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
