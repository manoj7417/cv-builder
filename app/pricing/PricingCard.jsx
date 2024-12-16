/** @format */
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
import { GetTokens, RemoveTokens } from "../actions";
import { loadRazorpayScript } from "../utils/razorpayUtils";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import PaymentSetup from "../components/PaymentSetup/PaymentSetup";
const PricingFunc = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFreeDialogOpen, setIsFreeDialogOpen] = useState(false);
  console.log("isFreeDialogOpen::", isFreeDialogOpen);
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
  const scroll = searchParams.get("scroll");
  const router = useRouter();
  const userState = useUserStore((state) => state.userState);
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setcouDiscount] = useState(0);
  const [couloading, setcouLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);

  const discountCode = searchParams.get("coupon") === "true";
  const [isTrialSelected, setIsTrialSelected] = useState(false);

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
      popUpDescription:
        "Our professional CV Maker assists you in landing that interview call! Our professional tools like CV Creator, CV Optimiser, and CV Match create well-researched, analytically optimised resumes that are approved by recruiters across the globe and established ATS systems.",
      features: [
        "ATS Compatible CV Templates",
        "AI-Based Smart  Resume Builder",
        "20+ Downloadable Professional CV Templates",
        "20 CV scans for Perfection",
        "AI-Based and Job-Specific CV Match Tool",
        "Enhance CV with AI and Increase ATS Compatibility Score",
        ,
      ],
      planName: "CVSTUDIO",
      discount: 65,
      monthLabel: "per month",
      yearLabel: "per year",
      choosePlan: true,
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
      popUpDescription:
        "Find solutions to your career problems at any moment with Artificial Intelligence based Career Coach, designed by professionals and inspired by leading Career Coaches across the globe. Easy and quick to use, get help and insights into a myriad set of domains",
      features: [
        "Personalised Career Assistance from Artificial Intelligence-based Career Coach",
        "Get access to one-on-one online virtual coaching",
        "No need to schedule an appointment, take assistance anytime and anywhere",
        "Get one comprehensive session including addressing the issue, finding the right solution, and getting suggestions on the same",
        "Find the best possible solutions from a limitless range of career options",
      ],
      planName: "AICareerCoach",
      discount: 97,
      monthLabel: "per test",
      yearLabel: "per test",
      choosePlan: false,
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
      popUpDescription:
        "If you want a more personalised and manual approach to Career Coaching, connect with one of the renowned experts who have years of experience working with candidates of different disciplines and calibre. Our community consists of Career Coaches from across the globe who are here to assist you with your career development",
      features: [
        "Virtual Career Coach Connect through the Genies Career Hub platform",
        "Assured Career assistance for guaranteed solutions",
        "Get to choose from a selection of Career Coaching professionals",
        "Easy support and assistance from Genies Career Hub team",
      ],
      planName: "VirtualCoaching",
      choosePlan: false,
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
      popUpDescription:
        "Designed by leading Psychometricians from all around the world, the Psychometric Tests offer you a comprehensive and compelling guide to understanding your cognitive and analytical abilities. This helps you gain a deeper insight into your career choices. Know your strengths, weaknesses, and areas of potential for identifying a better career path",
      features: [
        "Access to Psychometric Tests created by professionals",
        "A comprehensive report of your career strategy, strengths, and weaknesses.",
        "A record of your test results in your profile",
        "Solutions and recommendations based on the results of your test",
      ],
      planName: "PsychometricTestingTools",
      choosePlan: false,
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
    planName && setSelectedPlan("monthly");
    const pricing = PricingData[planName][geoinfo.currency || "USD"];
    const { MP, DP } = pricing;
    setSelectedCard({ ...cardData, MP, DP });
    setIsDialogOpen(true);
  };

  const handleOpenFreeDialog = (item) => {
    setIsFreeDialogOpen(true);
  };

  const handleCloseFreeDialog = () => {
    setIsFreeDialogOpen(false);
  };

  const handleCloseAIDialog = () => {
    setIsDialogOpen(false);
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
      setLoading(false); 
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
      success_url: "https://geniescareerhub.com/paymentSuccess",
      cancel_url: window.location.href,
      duration: selectedPlan,
      currency: geoinfo?.currency || "USD",
      planName: plan.planName,
      discount: discount,
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
      if(response.status === 200 && response.data.error === "Trial coupon already redeemed"){
        toast.error("Trial coupon already redeemed");
      }
      else if (response.status === 200 && response.data.message === "Setup link created. Card details need to be provided."){
        if (response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
          setIsFreeDialogOpen(true)
          setIsDialogOpen(false);
        } else {
          const { url } = response.data;
          window.location = url;
        }
      }
      
    } catch (error) {
    
      if (
        error.response.status === 401 &&
        error.response.data.error === "Unauthorized"
      ) {
        await RemoveTokens();
        toast("Please login again to proceed");
        router.push("/login?redirect=pricing");
      }
    } finally {
      setLoading(false);
    }
  };

  const applyCoupon = async () => {
    setcouLoading(true);
    setCouponError("");

    try {
      const response = await axios.post("/api/applyCoupon", {
        couponCode,
        planName: selectedCard.planName,
      });

      if (response.status === 200) {
        const { discount } = response.data;
        setcouDiscount(discount); // Update the discount state
        toast.success("Coupon applied successfully!");
        setcouLoading(false);
        setCouponApplied(true);
      }
    } catch (error) {
      setCouponError(error.response?.data?.message || "Invalid coupon code.");
      setcouLoading(false);
    } finally {
      setLoading(false);
      setCouponApplied(false);
    }
  };

  const handleTrialCheckboxChange = () => {
    setIsTrialSelected(!isTrialSelected);
    setCouponCode(isTrialSelected ? "" : "TRIAL14"); // Set TRIAL14 if selected, clear otherwise
    setCouponApplied(false); // Reset coupon applied status
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
        behavior: "smooth",
      });
    }
  }, [scroll]);

  useEffect(() => {
    if (discountCode && serviceCards?.length > 0 && geoinfo.currency) {
      handleOpenAIDialog(serviceCards[0]);
    }
  }, [discountCode, geoinfo.currency]);

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:gap-8 lg:gap-20 gap-5"
        ref={serviceCardsRef}
      >
        {serviceCards?.length > 0 &&
          serviceCards.map((item, index) => {
            const bgColor = backgroundColors[index % backgroundColors.length];
            const handleCardClick = () => {
              if (index === 0 || index === 1) {
                handleOpenAIDialog(item);
              } else if (index === 2) {
                router.push("/coaches");
              } else if (index === 3) {
                router.push("/pshycometric-test");
              }
            };
            return (
              <div
                key={item.id} // Ensure key prop is here on the top-level element
                className={`flex rounded-md ${
                  index + 1 === scroll ? "animate-bounce" : ""
                } `}
                id={`pricing-` + `${index + 1}`}
              >
                <div
                  className={`w-[350px] h-[270px]  border flex flex-col shadow-lg justify-between ${bgColor} rounded-md`}
                >
                  <div className="p-4">
                    <h2 className="lg:text-2xl text-xl font-semibold text-white">
                      {item?.cardTitle}
                    </h2>
                    <p className="mt-3 text-sm text-white">
                      {item?.cardDescription}
                    </p>
                  </div>
                  <div className="p-4 actions_buttons flex justify-between">
                    <button
                      type="button"
                      onClick={handleCardClick}
                      className="rounded-sm bg-white px-5 py-2 text-sm font-semibold text-black"
                    >
                      {index === 3
                        ? "Try now for free"
                        : index === 2
                        ? "View"
                        : "Subscribe"}
                    </button>
                  </div>
                </div>
                <div className="bg-white lg:block hidden">
                  <Image
                    priority
                    src={item?.imageUrl}
                    alt="Card Image"
                    width={500}
                    height={500}
                    className={`w-[350px] h-[250px] object-contain`}
                  />
                </div>
              </div>
            );
          })}
      </div>
      {/* <Dialog
        open={isFreeDialogOpen}
        onClose={() => setIsFreeDialogOpen(false)}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          className="w-[700px] h-[500px]"
          showCloseButton={true}
          onClick={handleCloseFreeDialog}
        >
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-xl sm:text-2xl lg:text-3xl my-2 text-center">
                Genies Pro Suite
              </h2>
            </DialogTitle>
            <DialogDescription>
              <p className="text-sm sm:text-base text-justify">
                Our professional CV Maker assists you in landing that interview
                call! Our professional tools like CV Creator, CV Optimiser, and
                CV Match create well-researched, analytically optimised resumes
                that are approved by recruiters across the globe and established
                ATS systems.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="modal_content">
            <div className="modal_list">
              <ul className="space-y-4">
                <li className="flex items-center text-xs sm:text-base text-gray-600">
                  <FaCheckCircle
                    className="text-blue-950 mr-2"
                    style={{ minWidth: "15px", minHeight: "15px" }}
                  />
                  ATS Compatible CV Templates
                </li>
                <li className="flex items-center text-xs sm:text-base text-gray-600">
                  <FaCheckCircle
                    className="text-blue-950 mr-2"
                    style={{ minWidth: "15px", minHeight: "15px" }}
                  />
                  AI-Based Smart Resume Builder
                </li>
                <li className="flex items-center text-xs sm:text-base text-gray-600">
                  <FaCheckCircle
                    className="text-blue-950 mr-2"
                    style={{ minWidth: "15px", minHeight: "15px" }}
                  />
                  20+ Downloadable Professional CV Templates
                </li>
                <li className="flex items-center text-xs sm:text-base text-gray-600">
                  <FaCheckCircle
                    className="text-blue-950 mr-2"
                    style={{ minWidth: "15px", minHeight: "15px" }}
                  />
                  20 CV scans for Perfection
                </li>
                <li className="flex items-center text-xs sm:text-base text-gray-600">
                  <FaCheckCircle
                    className="text-blue-950 mr-2"
                    style={{ minWidth: "15px", minHeight: "15px" }}
                  />
                  AI-Based and Job-Specific CV Match Tool
                </li>
                <li className="flex items-center text-xs sm:text-base text-gray-600">
                  <FaCheckCircle
                    className="text-blue-950 mr-2"
                    style={{ minWidth: "15px", minHeight: "15px" }}
                  />
                  Enhance CV with AI and Increase ATS Compatibility Score
                </li>
              </ul>
            </div>
            <div className="start_button text-center mt-10">
              <Link
                href={"/cv-studio"}
                className="bg-blue-950 text-white px-5 py-2 text-base"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog> */}
      <Dialog open={isFreeDialogOpen} onClose={() => setIsFreeDialogOpen(false)}>
      <DialogContent className="max-w-5xl mx-auto p-6" onClick={handleCloseFreeDialog} showCloseButton>
        <DialogHeader>
          <DialogTitle className="text-3xl text-blue-800">
            Enter Card Details
          </DialogTitle>
        </DialogHeader>
        <PaymentSetup
          clientSecret={clientSecret}
          onSuccess={() => {
            toast.success("Card details saved successfully!");
            setClientSecret(null);
            setIsDialogOpen(false);
          }}
        />
      </DialogContent>
      </Dialog>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          className="max-w-full lg:max-w-2xl 2xl:max-w-3xl mx-auto px-4 sm:px-6 py-6 2xl:h-[45%] ..
              lg:h-[95%] h-[500px] lg:overflow-visible overflow-y-scroll"
          showCloseButton={true}
          onClick={handleCloseAIDialog}
        >
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-xl sm:text-2xl lg:text-2xl my-2 text-center">
                {selectedCard?.cardTitle}
              </h2>
            </DialogTitle>
            <DialogDescription>
              <p className="text-sm sm:text-sm text-justify">
                {selectedCard?.popUpDescription}
              </p>
            </DialogDescription>
          </DialogHeader>
          {selectedCard && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start ">
                <div className="modal_left">
                  <div className="modal_list">
                    <ul className="space-y-2">
                      {selectedCard?.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-xs sm:text-sm text-gray-600"
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
                  {selectedCard?.id === 1 && (
                    <div className="coupon_section text-start mt-6">
                      <p className="font-semibold text-sm my-5">
                        Apply Coupon Code Here
                      </p>

                      {/* Trial checkbox */}
                      <div
                        className={`relative flex items-center mb-4 p-2 rounded-md border-2 cursor-pointer ${
                          isTrialSelected
                            ? "border-green-500"
                            : "border-blue-500"
                        }`}
                        onClick={handleTrialCheckboxChange}
                      >
                        <span className="ml-2 text-sm">
                          <strong
                            className={
                              isTrialSelected
                                ? "text-green-500"
                                : "text-blue-500"
                            }
                          >
                            TRIAL14
                          </strong>{" "}
                          is a 14 days free trial pack. After 14 days, the price
                          will be charged automatically.
                        </span>
                      </div>

                      {/* Input field and apply button */}
                      <div className="mb-4 flex justify-between items-center gap-5">
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          value={couponCode} // Bind the state
                          onChange={(e) => setCouponCode(e.target.value)} // Update state
                          disabled={couponApplied} // Disable input after applying coupon
                          className={`border px-4 py-2 rounded-md w-full ${
                            couponApplied ? "bg-gray-200" : "border-gray-300"
                          }`}
                        />
                        <button
                          onClick={applyCoupon}
                          className="bg-blue-950 text-white px-5 py-2 rounded-md text-base"
                          disabled={couloading || couponApplied || !couponCode}
                        >
                          {couloading
                            ? "Applying..."
                            : couponApplied
                            ? "Coupon Applied"
                            : "Apply"}
                        </button>
                      </div>

                      {/* Show success or error messages */}
                      {couponError && (
                        <p className="text-red-600 mt-2">{couponError}</p>
                      )}
                      {couponApplied && (
                        <p className="text-green-600 mt-2">
                          Coupon applied successfully! Discount: {discount}%
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className="modal_right bg-gray-100 px-4 py-6 sm:px-6 sm:py-8 relative">
                  <div className="text-center">
                    <p className=" text-xs text-center border rounded-lg border-violet-600 text-violet-600 bg-violet-100 px-2 w-20 absolute top-2 right-2">
                      {selectedCard?.discount}% off
                    </p>
                    {selectedCard?.choosePlan && (
                      <p className="text-lg sm:text-xl text-gray-500">
                        Choose your plan
                      </p>
                    )}
                    <div className="flex flex-col sm:flex-row items-center justify-center mt-4">
                      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 capitalize">
                        {selectedPlan === "monthly"
                          ? `${selectedCard["DP"].symbol}${selectedCard["DP"].price}`
                          : `${selectedCard["DP"].symbol}${
                              +selectedCard["DP"].price * 10
                            }`}
                      </h1>
                      <p className="text-gray-500 text-xs sm:text-sm px-2 line-through">
                        {selectedPlan === "monthly"
                          ? `${selectedCard["MP"].symbol}${selectedCard["MP"].price}`
                          : `${selectedCard["MP"].symbol}${
                              +selectedCard["MP"].price * 10
                            }`}
                      </p>
                      <p className="text-gray-500 text-xs  px-2">
                        {selectedPlan === "monthly"
                          ? selectedCard?.monthLabel
                          : selectedCard?.yearLabel}
                      </p>
                    </div>
                    {selectedCard?.choosePlan && (
                      <div className="mt-6 space-y-4 sm:space-y-8">
                        <div
                          className={`max-w-full sm:max-w-2xl px-6 py-4 sm:px-8 sm:py-5 mx-auto border cursor-pointer rounded-xl ${
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
                            <div className="subscription-panel-offer-commitment font-semibold text-sm sm:text-base flex items-center">
                              <p>
                                {selectedCard["DP"].symbol}
                                {selectedCard["DP"].price}
                              </p>
                              <p className="line-through text-xs ml-1">
                                {selectedCard["MP"].symbol}
                                {selectedCard["MP"].price}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={selectedPlan === "monthly"}
                              onChange={() => handlePlanChange("monthly")}
                              value="monthly"
                            />
                          </div>
                        </div>
                        <div
                          className={`max-w-full sm:max-w-2xl px-6 py-4 sm:px-8 sm:py-5 mx-auto border cursor-pointer rounded-xl ${
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

                            <div className="subscription-panel-offer-commitment font-semibold text-sm sm:text-base flex items-center">
                              <p>
                                {selectedCard["DP"].symbol}
                                {selectedCard["DP"].price * 10}
                              </p>
                              <p className="line-through text-xs ml-1">
                                {selectedCard["MP"].symbol}
                                {selectedCard["MP"].price * 10}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={selectedPlan === "yearly"}
                              onChange={() => handlePlanChange("yearly")}
                              value="yearly"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="mt-4 sm:mt-8 fixed bottom-[50px] right-[20px]">
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
    </>
  );
};

export default function Pricing() {
  return <PricingFunc />;
}
