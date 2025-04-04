/** @format */

"use client";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { CiUndo } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { LuLayoutGrid } from "react-icons/lu";
import {
  FaCheckCircle,
  FaCrown,
  FaDownload,
  FaRegFilePdf,
} from "react-icons/fa";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { GetTemplate } from "@/components/resume-templates/GetTemplate";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BsFullscreen } from "react-icons/bs";
import { useResumeStore, useTemporalResumeStore } from "../store/ResumeStore";
import { GetTokens, RemoveTokens } from "../actions";
import { useUserStore } from "../store/UserStore";
import { templateType } from "@/components/component/Slider";
import { tempType, TempTypes } from "@/lib/templateTypes/TempTypes";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImSpinner3 } from "react-icons/im";
import Lottie from "lottie-react";
import Loader1 from "@/public/animations/downloadLoader1.json";
import Loader2 from "@/public/animations/downloadLoader2.json";
import Loader3 from "@/public/animations/downloadLoader3.json";
import Loader4 from "@/public/animations/downloadLoader4.json";
import Loader5 from "@/public/animations/downloadLoader5.json";
import { funfacts } from "@/constants/funfacts";
// import ResumeTooltip from "@/components/component/ResumeTooltip";
import dynamic from "next/dynamic";
import axios from "axios";
const ResumeTooltip = dynamic(
  () => import("@/components/component/ResumeTooltip"),
  { ssr: false }
);

import { convert } from "html-to-text";
import { IoDocumentText } from "react-icons/io5";
import Link from "next/link";
import { FaFilePdf, FaSpinner } from "react-icons/fa6";
import ContentDialog from "./ContentDialog";
import FullResumeModal from "./FullResumeModal";
import ServicesPopUp from "@/components/component/ServicesPopUp";
import { Button } from "@/components/ui/button";
import { PricingData } from "@/constants/prices";

const images = [
  {
    name: "Template1",
    src: "/TemplateX-2.png",
    alt: "Template1.png",
    type: templateType.premium,
  },
  {
    name: "Template4",
    src: "/TemplateX-4.png",
    alt: "Template4.png",
    type: templateType.premium,
  },
  {
    name: "Template7",
    src: "/TemplateX-5.png",
    alt: "Template7.png",
    type: templateType.premium,
  },
  {
    name: "Template10",
    src: "/TemplateX-1.png",
    alt: "Template10.png",
    type: templateType.premium,
  },
  {
    name: "Template20",
    src: "/TemplateX-3.png",
    alt: "Template20.png",
    type: templateType.premium,
  },
];

const Loaders = [Loader1, Loader2, Loader3, Loader4, Loader5];

const ResumeView = () => {
  const randomNumber = Math.floor(Math.random() * 9);
  const randomAnimation = Math.floor(Math.random() * 4);
  const [scale, setScale] = useState(0.8);
  const [isModalView, setIsModalView] = useState(false);
  const dropdownRef = useRef(null);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef();
  const data = useResumeStore((state) => state.resume.data);
  console.log("data:::", data);
  const setResumeData = useResumeStore((state) => state.setResumeData);
  const { userdata } = useUserStore((state) => state.userState);
  const resumeData = useResumeStore((state) => state.resume);
  const [funfact, setFunFact] = useState(funfacts[randomNumber]);
  const [animation, setAnimation] = useState(Loaders[randomAnimation]);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const updateRedirectPricingRoute = useUserStore(
    (state) => state.updateRedirectPricingRoute
  );
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const serviceCards = {
    id: 1,
    cardTitle: "Genies Pro Suite",
    cardDescription:
      "Get a premium hold of services such as CV Creator, CV Optimiser, and CV Match to create the best Resume by integrating AI for perfection",
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
  };
  const [geoinfo, setGeoInfo] = useState({
    ip: "",
    countryName: "",
    countryCode: "",
    city: "",
    timezone: "",
    currency: "",
  });
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const userState = useUserStore((state) => state.userState);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsToggleOpen(false);
    }
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

  const checkUserTemplate = async () => {
    const { accessToken } = await GetTokens();
    if (!userdata.subscription.plan.includes("CVSTUDIO")) {
      const pricing = PricingData["CVSTUDIO"][geoinfo.currency || "USD"];
      const { MP, DP } = pricing;
      setSelectedCard({ ...serviceCards, MP, DP });
      setShowModal(true);
    } else {
      handleDownloadResume(accessToken?.value);
    }
  };

  const handleDownloadResume = async (token) => {
    console.log("token", token);
    const el = document.getElementById("resume");
    const resume = el.innerHTML;
    if (!resume) {
      console.error("Resume HTML is empty!");
      return;
    }
    const body = {
      html: resume,
    };
    setIsLoading(true);

    try {
      const response = await axios.post("/api/printResume", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer",
      });

      console.log("response", response);

      if (response.status === 200) {
        generateFunfact();
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = resumeData.title;
        link.click();
        window.URL.revokeObjectURL(link.href);
        return;
      }
    } catch (error) {
      if (
        error?.response?.status === 403 &&
        res.message === "You are not eligible for this feature"
      ) {
        toast.info("Subscribe to Genies Pro Suite to download your CV.", {
          autoclose: 3000,
        });
        updateRedirectPricingRoute("/resume-builder");
        return router.push("/pricing?scroll=1");
      }

      if (
        error?.response?.status === 403 &&
        res.message === "Your download CV tokens have expired"
      ) {
        toast.info("Your plan validity has expired.", { autoclose: 3000 });
        return router.push("/pricing");
      }
      if (
        error?.response?.status === 403 &&
        res.message === "You have no download CV tokens"
      ) {
        setIsServiceDialogOpen(true);
      }
      if (error?.response?.status === 500) {
        toast.error("Error downloading your CV , Please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateChange = (val) => {
    setResumeData("metadata.template", val);
    setIsDrawerOpen(false);
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const UpgradePlan = async () => {
    const { accessToken } = await GetTokens();
    if (!accessToken) {
      return router.push("/login?redirect=pricing");
    }
    const data = {
      email: userState?.userdata?.email,
      success_url: "https://geniescareerhub.com/paymentSuccess?redirect=resume",
      cancel_url: window.location.href,
      duration: selectedPlan,
      currency: geoinfo?.currency || "USD",
      planName: "CVSTUDIO",
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const aspectRatio = 297 / 210;

        if (containerWidth / containerHeight > aspectRatio) {
          setSize({
            width: containerHeight * (210 / 297),
            height: containerHeight,
          });
        } else {
          setSize({
            width: containerWidth,
            height: containerWidth * (297 / 210),
          });
        }
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const pageSizeMap = {
    a4: {
      width: 210,
      height: 297,
    },
    letter: {
      width: 216,
      height: 279,
    },
  };

  const MM_TO_PX = 3.78;

  const updateScale = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = 210 / 297; // A4 aspect ratio

    if (width <= 768) {
      setScale(0.4); // Mobile devices
    } else if (width <= 1024) {
      setScale(0.4); // Tablets
    } else if (width <= 1440) {
      setScale(0.7);
    } else {
      setScale(0.7); // Desktops
    }
  };

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const handleFullScreen = () => {
    setIsModalView(true);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale * 1.2, 3));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale / 1.2, 0.5));
  };

  const handleReset = () => {
    updateScale();
  };

  const generateFunfact = () => {
    const randomNumber = Math.floor(Math.random() * 9);
    const randomAnimation = Math.floor(Math.random() * 4);
    const newFuncfact = funfacts[randomNumber];
    const newAnimation = Loaders[randomAnimation];
    setAnimation((state) => newAnimation);
    setFunFact((state) => newFuncfact);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getGeoInfo();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center flex-col w-full relative bg-blue-100">
        {isLoading && (
          <Dialog open={isLoading} onClose={() => setIsLoading(false)}>
            <DialogTitle></DialogTitle>
            <DialogContent className="sm:max-w-[60vw] h-[60vh] bg-white">
              <div className="flex">
                <div className="w-[50%]">
                  <Lottie animationData={animation} />
                </div>
                <div className="w-[50%] flex flex-col  justify-center">
                  <div className="text-fancy text-5xl text-center">
                    <h1 className="my-2">Did you know?</h1>
                    <p className="text-xl my-3">{funfact}</p>
                  </div>
                  <div className="flex mt-10 items-center justify-center">
                    <div className="flex items-center justify-center">
                      <ImSpinner3 className="mr-1 animate-spin" />
                    </div>
                    <p>Downloading...</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <Dialog open={isServiceDialogOpen}>
          <ServicesPopUp
            isServiceDialogOpen={isServiceDialogOpen}
            setIsServiceDialogOpen={setIsServiceDialogOpen}
            serviceName="CV-BUILDER"
          />
        </Dialog>
        <div>
          <div
            className="shadow-2xl overflow-y-scroll h-screen"
            style={{
              transform: `scale(${scale})`,
            }}
          >
            <div
              id="resume"
              className={cn("relative bg-white")}
              style={{
                width: `${pageSizeMap["a4"].width * MM_TO_PX}px`,
                height: `${pageSizeMap["a4"].height * MM_TO_PX}px`,
              }}
            >
              <GetTemplate name={data?.metadata?.template} resumeData={data} />
            </div>
          </div>
        </div>
        <div className="toolbar_floating_button absolute bottom-5 xl:w-[60%] md:w-[60%] w-full rounded-full shadow-2xl">
          <div className="auth_section flex justify-around w-full  items-center px-2">
            <ResumeTooltip icon={BsFullscreen} title="Fullscreen">
              <button
                className="2xl:p-3 md:p-2 text-sm p-2 text-black disabled:bg-gray-600 font-semibold 2xl:text-sm md:text-sm text-[12px] lg:flex items-center justify-around rounded-md hidden"
                onClick={handleFullScreen}
              >
                <BsFullscreen className="h-5 w-5 text-black font-bold" />
              </button>
            </ResumeTooltip>
            <ResumeTooltip icon={FiPlus} title="Zoom In">
              <button
                className="2xl:p-3 md:p-2 text-sm p-2  disabled:bg-gray-600 font-semibold 2xl:text-sm md:text-sm text-[12px] flex items-center justify-around rounded-md"
                onClick={handleZoomIn}
              >
                <FiPlus className="h-5 w-5 text-black font-bold" />
              </button>
            </ResumeTooltip>
            <ResumeTooltip icon={FiMinus} title="Zoom Out">
              <button
                className="2xl:p-3 md:p-2 text-sm p-2  disabled:bg-gray-600 font-semibold 2xl:text-sm md:text-sm text-[12px] flex items-center justify-around rounded-md"
                onClick={handleZoomOut}
              >
                <FiMinus className="h-5 w-5 text-black font-bold" />
              </button>
            </ResumeTooltip>
            <ResumeTooltip icon={CiUndo} title="Reset">
              <button
                className="2xl:p-3 md:p-2 text-sm p-2  disabled:bg-gray-600 font-semibold 2xl:text-sm md:text-sm text-[12px] flex items-center justify-around rounded-md"
                onClick={handleReset}
              >
                <CiUndo className="h-5 w-5 text-black font-bold" />
              </button>
            </ResumeTooltip>
            <ResumeTooltip icon={FaDownload} title="Download Template">
              <button
                className="2xl:p-3 md:p-2 text-sm p-2  disabled:bg-gray-600 font-semibold 2xl:text-sm md:text-sm text-[12px] flex items-center justify-around rounded-md"
                onClick={checkUserTemplate}
                disabled={isLoading}
              >
                <FaDownload className="h-4 w-4 text-black" />
              </button>
            </ResumeTooltip>
            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogContent
                className="max-w-full lg:max-w-2xl 2xl:max-w-3xl mx-auto px-4 sm:px-6 py-6"
                showCloseButton={true}
                onClick={handleCloseModal}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
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
                                  style={{
                                    minWidth: "15px",
                                    minHeight: "15px",
                                  }}
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
                          <div className="flex flex-col sm:flex-row items-center justify-center mt-4">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 capitalize">
                              {selectedPlan === "monthly"
                                ? `${selectedCard["DP"].symbol}${selectedCard["DP"].price}`
                                : `${selectedCard["DP"].symbol}${
                                    +selectedCard["DP"].price * 10
                                  }`}
                            </h1>
                            <p className="text-gray-500 text-xs sm:text-sm px-2">
                              {selectedPlan === "monthly"
                                ? "per Month"
                                : "per Year"}
                            </p>
                            <p className=" text-xs border rounded-lg border-violet-600 text-violet-600 bg-violet-100 px-2">
                              65% off
                            </p>
                          </div>
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
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter className="mt-4 sm:mt-8">
                  <Button
                    className="bg-[#f76918] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base cursor-pointer w-full sm:w-auto"
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

            <div className="choose_templates">
              <ResumeTooltip icon={LuLayoutGrid} title="Choose Templates">
                <Drawer
                  direction="right"
                  open={isDrawerOpen}
                  onOpenChange={setIsDrawerOpen}
                >
                  <DrawerTrigger
                    className="2xl:p-3 md:p-2 p-1 2xl:text-base md:text-sm text-[12px] font-semibold rounded-md flex items-center justify-center"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    <LuLayoutGrid className="h-5 w-5 text-black inline" />
                  </DrawerTrigger>
                  <DrawerContent className="bg-white flex flex-col h-full w-[500px] mt-24 fixed right-0">
                    <DrawerHeader>
                      <DrawerTitle>Choose Templates</DrawerTitle>
                      <DrawerDescription>
                        <div className="grid grid-cols-2 gap-5 overflow-y-scroll h-screen">
                          {images.map((image, index) => {
                            return (
                              <div
                                key={index}
                                className="image_section_1 "
                                onClick={() => handleTemplateChange(image.name)}
                              >
                                <Image
                                  priority="true"
                                  src={image.src}
                                  alt={image.alt}
                                  className="cursor-pointer hover:border-sky-700 hover:border-2 object-contain h-[300px] w-[300px]"
                                  width={500}
                                  height={500}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </DrawerDescription>
                    </DrawerHeader>
                  </DrawerContent>
                </Drawer>
              </ResumeTooltip>
            </div>
          </div>
        </div>
      </div>
      <FullResumeModal
        isModalView={isModalView}
        setIsModalView={setIsModalView}
      />
    </>
  );
};

export default ResumeView;
