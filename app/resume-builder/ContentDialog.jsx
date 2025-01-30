import { GetTemplate } from "@/components/resume-templates/GetTemplate";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { useResumeStore } from "../store/ResumeStore";
import { FaCheckCircle, FaFilePdf } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { GetTokens, RemoveTokens } from "../actions";
import { toast } from "react-toastify";
import { funfacts } from "@/constants/funfacts";
import Loader1 from "@/public/animations/downloadLoader1.json";
import Loader2 from "@/public/animations/downloadLoader2.json";
import Loader3 from "@/public/animations/downloadLoader3.json";
import Loader4 from "@/public/animations/downloadLoader4.json";
import Loader5 from "@/public/animations/downloadLoader5.json";
import ResumeTooltip from "@/components/component/ResumeTooltip";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LuLayoutGrid } from "react-icons/lu";
import { templateType } from "@/components/component/Slider";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa6";
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
import { IoDocumentText } from "react-icons/io5";
import Link from "next/link";
import { useUserStore } from "../store/UserStore";
import { convert } from "html-to-text";
import ServicesPopUp from "@/components/component/ServicesPopUp";
import axios from "axios";
import { PricingData } from "@/constants/prices";
import { Button } from "@/components/ui/button";

const Loaders = [Loader1, Loader2, Loader3, Loader4, Loader5];
const images = [
  {
    name: "Template1",
    src: "/Template1.png",
    alt: "Template1.png",
    type: templateType.premium,
  },
  {
    name: "Template3",
    src: "/Template3.png",
    alt: "Template3.png",
    type: templateType.premium,
  },
  {
    name: "Template4",
    src: "/Template4.png",
    alt: "Template4.png",
    type: templateType.premium,
  },
  {
    name: "Template5",
    src: "/Template5.png",
    alt: "Template5.png",
    type: templateType.premium,
  },
  {
    name: "Template6",
    src: "/Template6.png",
    alt: "Template6.png",
    type: templateType.premium,
  },
  {
    name: "Template7",
    src: "/Template7.png",
    alt: "Template7.png",
    type: templateType.premium,
  },
  {
    name: "Template8",
    src: "/Template8.png",
    alt: "Template8.png",
    type: templateType.premium,
  },
  {
    name: "Template9",
    src: "/Template9.png",
    alt: "Template9.png",
    type: templateType.premium,
  },
  {
    name: "Template10",
    src: "/Template10.png",
    alt: "Template10.png",
    type: templateType.premium,
  },
  {
    name: "Template11",
    src: "/Template11.png",
    alt: "Template11.png",
    type: templateType.premium,
  },
  {
    name: "Template13",
    src: "/Template13.png",
    alt: "Template13.png",
    type: templateType.premium,
  },
  {
    name: "Template15",
    src: "/Template15.png",
    alt: "Template15.png",
    type: templateType.premium,
  },
  {
    name: "Template12",
    src: "/Template12.png",
    alt: "Template12.png",
    type: templateType.premium,
  },
  {
    name: "Template14",
    src: "/Template14.png",
    alt: "Template14.png",
    type: templateType.premium,
  },
  {
    name: "Template16",
    src: "/Template16.png",
    alt: "Template16.png",
    type: templateType.premium,
  },
  {
    name: "Template18",
    src: "/Template18.jpg",
    alt: "Template18.jpg",
    type: templateType.premium,
  },
  {
    name: "Template17",
    src: "/Template17.png",
    alt: "Template17.png",
    type: templateType.premium,
  },
  {
    name: "Template19",
    src: "/Template19.png",
    alt: "Template19.png",
  },
  {
    name: "Template20",
    src: "/Template20.png",
    alt: "Template20.png",
    type: templateType.premium,
  },
  {
    name: "Template21",
    src: "/Template21.png",
    alt: "Template21.png",
    type: templateType.premium,
  },
  {
    name: "Template22",
    src: "/Template22.png",
    alt: "Template22.png",
    type: templateType.premium,
  },
  {
    name: "Template23",
    src: "/Template23.png",
    alt: "Template23.png",
    type: templateType.premium,
  },
  {
    name: "Template24",
    src: "/Template24.png",
    alt: "Template24.png",
    type: templateType.premium,
  },
  {
    name: "Template25",
    src: "/Template25.png",
    alt: "Template25.png",
    type: templateType.premium,
  },
  {
    name: "Template26",
    src: "/Template26.png",
    alt: "Template26.png",
    type: templateType.premium,
  },
];

function ContentDialog({ isContentVisible, setIsContentVisible }) {
  const randomNumber = Math.floor(Math.random() * 9);
  const randomAnimation = Math.floor(Math.random() * 4);
  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(0.5);
  const [funfact, setFunFact] = useState(funfacts[randomNumber]);
  const [animation, setAnimation] = useState(Loaders[randomAnimation]);
  const data = useResumeStore((state) => state.resume.data);
  const resumeData = useResumeStore((state) => state.resume);
  const setResumeData = useResumeStore((state) => state.setResumeData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { userdata } = useUserStore((state) => state.userState);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("monthly");
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
  const pageWidth = pageSizeMap["a4"].width * MM_TO_PX;
  const pageHeight = pageSizeMap["a4"].height * MM_TO_PX;

  const checkUserTemplate = async () => {
    const { accessToken } = await GetTokens();
    if (!userdata.subscription.plan.includes("CVSTUDIO")) {
      const pricing = PricingData["CVSTUDIO"][geoinfo.currency || "USD"];
      const { MP, DP } = pricing;
      setSelectedCard({ ...serviceCards, MP, DP });
      setShowModal(true);
    } else {
      handleDownloadResume(accessToken.value);
    }
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const handleDownloadResume = async (token) => {
    const el = document.getElementById("resume");
    const resume = el.innerHTML;
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
      if (response.status === 200) {
        generateFunfact();
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = resumeData.title;
        link.click();
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
        return router.push("/pricing?scroll=1");
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

  const UpgradePlan = async () => {
    const { accessToken } = await GetTokens();
    if (!accessToken) {
      return router.push("/login?redirect=pricing");
    }
    const data = {
      email: userdata?.email,
      success_url: "https://geniescareerhub.com/paymentSuccess",
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
    getGeoInfo();
  }, []);

  return (
    <>
      {isContentVisible && (
        <div
          className=" bg-black bg-opacity-80 inset-0 z-50 w-full h-full fixed overflow-hidden lg:hidden block"
          // onClick={() => setIsContentVisible(false)}
        >
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent
              className="max-w-full lg:max-w-2xl 2xl:max-w-3xl mx-auto px-4 sm:px-6 py-6"
              showCloseButton={true}
              onClick={handleCloseModal}
            >
              <DialogHeader>
                <DialogTitle>
                  <h2 className="text-sm sm:text-2xl lg:text-2xl my-2 text-center">
                    {selectedCard?.cardTitle}
                  </h2>
                </DialogTitle>
                <DialogDescription>
                  <p className="text-xs sm:text-sm text-justify">
                    {selectedCard?.popUpDescription}
                  </p>
                </DialogDescription>
              </DialogHeader>
              {selectedCard && (
                <div className="grid gap-4 py-1 sm:py-4">
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
                                style={{ minWidth: "15px", minHeight: "15px" }}
                              />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="modal_right bg-gray-100 px-4  py-2 sm:px-6 sm:py-8">
                      <div className="text-center">
                        <p className="text-lg sm:text-xl text-gray-500">
                          Choose your plan
                        </p>
                        <div className="flex items-center justify-center mt-4">
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
          <div className="bg-gray-900 text-white flex justify-between items-center p-4">
            <div className="choose_templates">
              <ResumeTooltip icon={LuLayoutGrid} title="Choose Templates">
                <Drawer
                  direction="bottom"
                  open={isDrawerOpen}
                  onOpenChange={setIsDrawerOpen}
                >
                  <DrawerTrigger
                    className="2xl:p-3 md:p-2 p-1 2xl:text-base md:text-sm text-[12px] font-semibold rounded-md flex items-center justify-center flex-col"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    <LuLayoutGrid className="h-5 w-5 text-white inline" />
                    {/* <img src="/template_icon1.png" alt="icon" className="h-10 w-10"/> */}
                    <p className="text-white text-[10px]">Templates</p>
                  </DrawerTrigger>
                  <DrawerContent className="bg-white flex flex-col h-[500px] w-[425px] mt-24 fixed bottom-0">
                    <DrawerHeader>
                      <DrawerTitle className="my-2">
                        Choose Templates
                      </DrawerTitle>
                      <DrawerDescription>
                        <div className="grid grid-cols-2 gap-2 overflow-y-scroll h-screen no-scrollbar w-[420px]">
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
                                  className="cursor-pointer hover:border-sky-700 hover:border-2 object-contain h-[200px] w-[200px]"
                                  width={200}
                                  height={200}
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
            <div className="download_button mx-auto">
              <button
                onClick={checkUserTemplate}
                disabled={isLoading}
                className="bg-blue-950 text-white px-4 py-2 rounded flex items-center"
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin text-xl mr-2" />
                ) : (
                  <MdDownload className="text-xl mr-2" />
                )}
                {isLoading ? "Processing..." : "Download"}
              </button>
            </div>
            <Dialog open={isServiceDialogOpen}>
              <ServicesPopUp
                isServiceDialogOpen={isServiceDialogOpen}
                setIsServiceDialogOpen={setIsServiceDialogOpen}
                serviceName="CV-BUILDER"
              />
            </Dialog>
            <div
              onClick={() => setIsContentVisible(false)}
              className="z-50 close_icon"
            >
              <LiaTimesSolid className="text-white text-3xl" />
            </div>
          </div>
          <div className="shadow-lg no-scrollbar h-screen overflow-y-scroll w-screen">
            <div
              id="resume"
              className={cn("relative bg-white")}
              style={{
                width: `100%`,
                minWidth: `${pageWidth}px`,
                height: `100%`,
                minHeight: `${pageHeight}px`,
                overflow: "auto",
                transform: `scale(${scale})`,
                margin: "-235px -180px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <GetTemplate name={data?.metadata?.template} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContentDialog;
