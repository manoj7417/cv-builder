"use client";
import { CardDescription } from "@/components/ui/card";
import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import card1 from "@/public/banner-img-3.jpg"
import card2 from "@/public/se.webp"
import card3 from "@/public/easymeeting.png"
import card4 from "@/public/perfomance.png"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { useUserStore } from "../store/UserStore";
import { PricingData } from "@/constants/prices";
import axios from "axios";
import { GetTokens } from "../actions";
import { loadRazorpayScript } from "../utils/razorpayUtils";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const PricingFunc = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const serviceCardsRef = useRef(null);
  const [loading, setLoading] = useState(false)
  const [geoinfo, setGeoInfo] = useState({
    ip: "",
    countryName: "",
    countryCode: "",
    city: "",
    timezone: "",
    currency: ""
  });
  const searchParams = useSearchParams();
  const scroll = searchParams.get('scroll')
  const userState = useUserStore((state) => state.userState);
  const [selectedPlan, setSelectedPlan] = useState("monthly");
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
      imageUrl: card1,
      free: {
        title: "Free",
        link: "/cv-studio",
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
      planName: "CVSTUDIO"
    },
    {
      id: 2,
      cardTitle: "AI Career Coach",
      cardDescription:
        "Get personalized career guidance with AI Career Coach, designed to help you navigate your career path effectively.",
      imageUrl: card2,
      free: {
        title: "Free",
        link: "/coming-soon",
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
      planName: "AICareerCoach"
    },
    {
      id: 3,
      cardTitle: "Traditional Virtual 1-to-1 Coaching",
      cardDescription:
        "Experience personalized coaching with our traditional virtual 1-to-1 sessions, tailored to your career needs.",
      imageUrl: card3,
      free: {
        title: "Free",
        link: "/coming-soon",
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
      planName: "VirtualCoaching"
    },
    {
      id: 4,
      cardTitle: "Psychometric Testing Tools",
      cardDescription:
        "Utilise  Psychometric Testing Tools to assess your abilities, personality traits, and career potential accurately.",
      imageUrl: card4,
      free: {
        title: "Free",
        link: "/coming-soon",
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
      planName: "PsychometricTestingTools"
    },
  ];

  const backgroundColors = [
    "bg-[#FFAB2E]",
    "bg-[#0C34A6]",
    "bg-[#75009E]",
    "bg-[#D10000]",
  ];

  const handleOpenAIDialog = (cardData) => {
    const planName = cardData.planName;
    const pricing = PricingData[planName][geoinfo.currency || "USD"]
    const { symbol, price } = pricing;
    setSelectedCard({ ...cardData, symbol, price });
    setIsDialogOpen(true);
  };

  const handleCloseAIDialog = () => {
    setIsDialogOpen(false);
    setSelectedCard(null); // Clear selected card on close
  };

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        let currency = data.currency || "USD";
        setGeoInfo({
          ...geoinfo,
          ip: data.ip,
          countryName: data.country_name,
          countryCode: data.country_calling_code,
          city: data.city,
          timezone: data.timezone,
          currency: currency,
        });
      })
      .catch((error) => {
        console.error("Error fetching geo information:", error);
      });
  };

  const GetPlanWithRazorpay = async (plan) => {
    const { accessToken } = await GetTokens();
    if (!accessToken) {
      return router.push("/login?redirect=new-pricing");
    }
    const data = {
      planName: plan?.planName,
      currency: geoinfo.currency,
      duration: selectedPlan,
    };
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/pricing",
        { data },
        {
          headers: {
            Authorization: "Bearer " + accessToken.value,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response)
      if (response.status === 200) {
        const { orderId, amount, currency, key } = response.data;
        const options = {
          key,
          amount,
          currency,
          name: "Genies Career Hub",
          description: "Upgrade Plan",
          order_id: orderId,
          handler: async (response) => {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
          },
          prefill: {
            email: userState?.userdata?.email,
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
    finally {
      setLoading(false); // Stop loader
    }
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const UpgradePlan = async (plan) => {
    const { accessToken } = await GetTokens();
    if (!accessToken) {
      return router.push("/login?redirect=pricing");
    }
    const data = {
      email: userState?.userdata?.email,
      plan,
      success_url: "http://localhost:3000/paymentSuccess",
      cancel_url: window.location.href,
      duration: selectedPlan,
      currency: geoinfo?.currency || "USD",
      planName: plan.planName
    };
    setLoading(true)
    try {
      const response = await axios.post(
        "/api/upgradePricing",
        { data },
        {
          headers: {
            Authorization: "Bearer " + accessToken.value,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const { url } = response.data;
        window.location = url;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };


  useEffect(() => {
    getGeoInfo();
  }, []);


  useEffect(() => {
    const serviceCardsSection = document.getElementById(`pricing-${scroll}`);
    if (serviceCardsSection) {
      const offsetTop = serviceCardsSection.offsetTop - 250;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }, [scroll])

  return (
    <>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          className="sm:max-w-[800px]"
          showCloseButton={true}
          onClick={handleCloseAIDialog}
        >
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-3xl my-2">{selectedCard?.cardTitle}</h2>
            </DialogTitle>
            <DialogDescription>
              <p>{selectedCard?.cardDescription}</p>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="modal_left">
                <div className="modal_list">
                  <ul className="space-y-2 flex-grow">
                    {selectedCard?.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <FaCheckCircle
                          className="text-blue-950 mr-2"
                          style={{ minWidth: "15px", minHeight: "15px" }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="modal_right bg-gray-100">
                <div className="">
                  <div className="container px-6 py-8 mx-auto">
                    <p className="text-xl text-center text-gray-500">
                      Choose your plan
                    </p>
                    <div className="flex items-center justify-center ">
                      <h1 className="mt-4 text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
                        {selectedPlan === 'monthly' ? `${selectedCard?.symbol}${selectedCard?.price}` : `${selectedCard?.symbol}${selectedCard?.price * 10}`}
                      </h1>
                      <p className=" text-gray-500 text-sm px-2">{selectedPlan === 'monthly' ? 'per Month' : "per Year"}</p>
                    </div>
                    <div className="mt-6 space-y-8 xl:mt-12 shadow-">
                      <div
                        className={`max-w-2xl px-8 py-5 mx-auto border cursor-pointer rounded-xl  ${selectedPlan === "monthly" ? "border-blue-500 shadow-lg" : ""
                          }`}
                        onClick={() => handlePlanChange("monthly")}
                      >
                        <div className="monthly_plan">
                          <div className="flex flex-row justify-between items-center">
                            <div className="subscription-panel-offer-commitment font-bold">
                              Monthly
                            </div>
                            <div className="subscription-panel-offer-commitment font-semibold">
                              {selectedCard?.symbol}{selectedCard?.price}
                            </div>
                            <input
                              type="checkbox"
                              hidden
                              checked={selectedPlan === "monthly"}
                              onChange={() => handlePlanChange("monthly")}
                              className="ml-4"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`max-w-2xl px-8 py-4 mx-auto border cursor-pointer rounded-xl ${selectedPlan === "yearly" ? "border-blue-500 shadow-lg" : ""
                          }`}
                        onClick={() => handlePlanChange("yearly")}
                      >
                        <div className="yearly_plan">
                          <div className="flex flex-row justify-between items-center">
                            <div className="subscription-panel-offer-commitment font-bold">
                              Yearly
                            </div>
                            <div className="subscription-panel-offer-commitment font-semibold">
                              {selectedCard?.symbol}{selectedCard?.price * 10}
                            </div>
                            <input
                              type="checkbox"
                              hidden
                              checked={selectedPlan === "yearly"}
                              onChange={() => handlePlanChange("yearly")}
                              className="ml-4"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-blue-950 text-white px-4 py-2 rounded-md text-sm cursor-pointer" onClick={() => UpgradePlan(selectedCard)} disabled={loading}>
              {loading ? (
                <>
                  Upgrading<FaSpinner className="animate-spin ml-2" />
                </>
              ) : (
                "Upgrade Now"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <section className="w-full h-screen 2xl:mt-20 lg:mt-32 mt-10">
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
            utilise  experts to guide you on how to excel within it.
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
                    <div key={index} className={`flex rounded-md ${index + 1 === scroll ? "animate-bounce" : ""} `} id={`pricing-` + `${index + 1}`}>
                      <div
                        className={`w-[350px] h-[250px]  border flex flex-col shadow-lg justify-between ${bgColor} rounded-md`}
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
                            Subscribe
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
                  </>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};


export default function Pricing() {
  return (
    <Suspense>
      <PricingFunc />
    </Suspense>
  )
}
