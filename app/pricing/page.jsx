"use client";
import { CardDescription } from "@/components/ui/card";
import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import card1 from "@/public/banner-img-3.jpg";
import card2 from "@/public/se.webp";
import card3 from "@/public/easymeeting.png";
import card4 from "@/public/perfomance.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [loading, setLoading] = useState(false);
  const [geoinfo, setGeoInfo] = useState({
    ip: "",
    countryName: "",
    countryCode: "",
    city: "",
    timezone: "",
    currency: "",
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
        "Get a premium hold of services such as CV Creator, CV Optimiser, and CV Match to create the best Resume by integrating AI for perfection",
      imageUrl: card1,
      free: {
        title: "Free",
        link: "/cv-studio",
      },
      popUpDescription:"Build a job application that suits the exact description that your employers are looking forward to. With tools such as CV Creator, CV Optimiser, and CV Match, create the perfect Resume that is not only optimised for Application Tracking Software but also leaves an exemplary first impression",
      features: [
        "Access to Professional ATS Compatible CV Templates",
        "Create CVs through the AI-based CV Creator tool",
        "Download 20 CVs in PDF Format",
        "Get 20 scans through CV Optimiser and make a better CV",
        "Match the best resume with job-specific CVs with AI-based CV Match",
        "Enhance your CV with AI and increase the ATS Compatibility Score",
        ,
      ],
      planName: "CVSTUDIO",
    },
    {
      id: 2,
      cardTitle: "AI Career Coach",
      cardDescription:
        "Take career assistance anytime and anywhere in different domains with an Artificial Intelligence-based Career Coach",
      imageUrl: card2,
      free: {
        title: "Free",
        link: "/coming-soon",
      },
      popUpDescription:"Find solutions to your career problems at any moment with Artificial Intelligence based Career Coach, designed by professionals and inspired by leading Career Coaches across the globe. Easy and quick to use, get help and insights into a myriad set of domains",
      features: [
        "Personalised Career Guidance from an AI-based online Career Coach",
        "Ask as many questions, in as many domains as you seek assistance with",
        "Get instant solutions to your problems",
      ],
      planName: "AICareerCoach",
    },
    {
      id: 3,
      cardTitle: "Virtual 1-to-1 Coaching",
      cardDescription:
        "Get a more personalised approach to Career Coaching with Traditional Career Coaching from experienced coaches across the globe",
      imageUrl: card3,
      free: {
        title: "Free",
        link: "/coming-soon",
      },
      popUpDescription:"If you want a more personalised and manual approach to Career Coaching, connect with one of the renowned experts who have years of experience working with candidates of different disciplines and calibre. Our community consists of Career Coaches from across the globe who are here to assist you with your career development",
      features: [
        "Virtual Career Coach Connect through the Genies Career Hub platform",
        "Assured Career assistance for guaranteed solutions",
        "Get to choose from a selection of Career Coaching professionals",
        "Easy support and assistance from Genies Career Hub team",
      ],
      planName: "VirtualCoaching",
    },
    {
      id: 4,
      cardTitle: "Psychometric Testing Tool",
      cardDescription:
        "Identify your strengths and weaknesses with tests created by Psychometric professionals and find the best suited solution",
      imageUrl: card4,
      free: {
        title: "Free",
        link: "/coming-soon",
      },
      popUpDescription:"Designed by leading Psychometricians from all around the world, the Psychometric Tests offer you a comprehensive and compelling guide to understanding your cognitive and analytical abilities. This helps you gain a deeper insight into your career choices. Know your strengths, weaknesses, and areas of potential for identifying a better career path",
      features: [
        "Access to Psychometric Tests created by professionals",
        "A comprehensive report of your career strategy, strengths, and weaknesses.",
        "A record of your test results in your profile",
        "Solutions and recommendations based on the results of your test",
      ],
      planName: "PsychometricTestingTools",
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
    const pricing = PricingData[planName][geoinfo.currency || "USD"];
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
      console.log(response);
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
    } finally {
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
      planName: plan.planName,
    };
    setLoading(true);
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
      setLoading(false);
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
          className="sm:max-w-[800px] w-full sm:w-auto px-4 py-6 sm:px-8 sm:py-8"
          showCloseButton={true}
          onClick={handleCloseAIDialog}
        >
          <DialogHeader>
            <DialogTitle>
              <h2 className="lg:text-3xl text-xl sm:text-2xl my-2 text-center">
                {selectedCard?.cardTitle}
              </h2>
            </DialogTitle>
            <DialogDescription>
              <p className="text-sm sm:text-base text-justify">
                {selectedCard?.popUpDescription}
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid sm:grid-cols-2 grid-cols-1 items-center gap-4">
              <div className="modal_left">
                <div className="modal_list">
                  <ul className="space-y-2">
                    {selectedCard?.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-xs sm:text-base text-gray-600"
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
              <div className="modal_right bg-gray-100 px-4 py-6 sm:px-6 sm:py-8">
                <div className="text-center">
                  <p className="text-lg sm:text-xl text-gray-500">
                    Choose your plan
                  </p>
                  <div className="flex items-center justify-center mt-4">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 capitalize">
                      {selectedPlan === "monthly"
                        ? `${selectedCard?.symbol}${selectedCard?.price}`
                        : `${selectedCard?.symbol}${selectedCard?.price * 10}`}
                    </h1>
                    <p className="text-gray-500 text-xs sm:text-sm px-2">
                      {selectedPlan === "monthly" ? "per Month" : "per Year"}
                    </p>
                  </div>
                  <div className="mt-6 space-y-4 sm:space-y-8">
                    <div
                      className={`max-w-2xl px-6 py-4 sm:px-8 sm:py-5 mx-auto border cursor-pointer rounded-xl ${
                        selectedPlan === "monthly"
                          ? "border-blue-500 shadow-lg"
                          : ""
                      }`}
                      onClick={() => handlePlanChange("monthly")}
                    >
                      <div className="flex justify-between items-center">
                        <div className="subscription-panel-offer-commitment font-bold text-sm sm:text-base">
                          Monthly
                        </div>
                        <div className="subscription-panel-offer-commitment font-semibold text-sm sm:text-base">
                          {selectedCard?.symbol}
                          {selectedCard?.price}
                        </div>
                        <input
                          type="checkbox"
                          hidden
                          checked={selectedPlan === "monthly"}
                          onChange={() => handlePlanChange("monthly")}
                        />
                      </div>
                    </div>
                    <div
                      className={`max-w-2xl px-6 py-4 sm:px-8 sm:py-5 mx-auto border cursor-pointer rounded-xl ${
                        selectedPlan === "yearly"
                          ? "border-blue-500 shadow-lg"
                          : ""
                      }`}
                      onClick={() => handlePlanChange("yearly")}
                    >
                      <div className="flex justify-between items-center">
                        <div className="subscription-panel-offer-commitment font-bold text-sm sm:text-base">
                          Yearly
                        </div>
                        <div className="subscription-panel-offer-commitment font-semibold text-sm sm:text-base">
                          {selectedCard?.symbol}
                          {selectedCard?.price * 10}
                        </div>
                        <input
                          type="checkbox"
                          hidden
                          checked={selectedPlan === "yearly"}
                          onChange={() => handlePlanChange("yearly")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4 sm:mt-8">
            <Button
              className="bg-blue-950 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base cursor-pointer w-full sm:w-auto"
              onClick={() => UpgradePlan(selectedCard)}
              disabled={loading}
            >
              {loading ? (
                <>
                  Upgrading <FaSpinner className="animate-spin ml-2" />
                </>
              ) : (
                "Upgrade Now"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <section className="w-full h-screen 2xl:mt-40 lg:mt-52 md:mt-40  mt-10">
        <div className="w-full h-full flex justify-center items-center">
          <div className="text-start">
            <h1 className="text-[35px] sm:text-4xl md:text-5xl lg:text-[60px] 2xl:text-7xl font-extrabold mb-4 sm:mb-6 xs:text-start text-center">
              Grow beyond expectations with 
              <br/>
              <span className="text-blue-700"> Flexible Pricing</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium mb-4 sm:mb-10 lg:mb-5 lg:max-w-3xl w-[70%] text-center xs:text-start mx-auto">
              With careful plans designed to cater to all your needs, simple and
              transparent pricing, and secured pricing, you are one step closer
              to your dream career.
            </p>
            <div className="flex lg:flex-row flex-col lg:w-full w-[60%] mx-auto text-center justify-center xs:justify-start gap-5">
              <button
                className="bg-blue-950 text-white py-3 px-8 rounded border-2 border-transparent"
                onClick={scrollToServiceCards}
              >
                View Plans
              </button>
              <Link
                href={"/cv-studio"}
                className="bg-sky-100  text-blue-950 py-3 px-8 rounded border-2 border-blue-950"
              >
                Start Free Trial
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

      <section className="2xl:p-20 lg:p-20 p-10 bg-blue-50" ref={serviceCardsRef}>
        <div className="text-center card_main_title">
          <h2 className="lg:text-5xl text-3xl font-bold">
            Different Services,
            <span className="text-blue-700">Infinite possibilities.</span>{" "}
          </h2>
          <p className="lg:w-[40%] w-full mx-auto my-3 text-base">
            Our services are designed to help you navigate through career
            challenges with ease. Accordingly, we have created plans that help
            you approach your career with perfection.
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
                        className={`w-[350px] h-[270px]  border flex flex-col shadow-lg justify-between ${bgColor} rounded-md`}
                      >
                        <div className="p-4">
                          <h1 className="lg:text-2xl text-xl font-semibold text-white">
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
