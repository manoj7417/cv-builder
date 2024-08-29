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
import { FaCrown, FaDownload, FaRegFilePdf } from "react-icons/fa";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Payment, printResume } from "../api/api";
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
import { FaFilePdf } from "react-icons/fa6";
import ContentDialog from "./ContentDialog";
import FullResumeModal from "./FullResumeModal";
import ServicesPopUp from "@/components/component/ServicesPopUp";

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
    src: "/Template6-1.png",
    alt: "Template6-1.png",
    type: templateType.premium,
  },
  {
    name: "Template7",
    src: "/Template7-1.png",
    alt: "Template7-1.png",
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
    src: "/Template10-1.png",
    alt: "Template10-1.png",
    type: templateType.premium,
  },
  {
    name: "Template11",
    src: "/Template11-(new).png",
    alt: "Template11-(new).png",
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
    src: "/Template19-(new).png",
    alt: "Template19-(new).png",
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
  const setResumeData = useResumeStore((state) => state.setResumeData);
  const { userState } = useUserStore((state) => state);
  const { userdata } = useUserStore((state) => state.userState);
  const resumeData = useResumeStore((state) => state.resume.data);
  const [funfact, setFunFact] = useState(funfacts[randomNumber]);
  const [animation, setAnimation] = useState(Loaders[randomAnimation]);
  const { undo, redo, canUndo, canRedo } = useTemporalResumeStore((state) => ({
    undo: state.undo,
    redo: state.redo,
    canUndo: state.canUndo,
    canRedo: state.canRedo,
  }));
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const updateRedirectPricingRoute = useUserStore(
    (state) => state.updateRedirectPricingRoute
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsToggleOpen(false);
    }
  };

  const checkUserTemplate = async () => {
    const { accessToken } = await GetTokens();
    if (!userdata.subscription.plan.includes('CVSTUDIO')) {
      setShowModal(true);
    } else {
      handleDownloadResume(accessToken.value);
    }
  };

  const handleDownloadResume = async (token) => {
    const el = document.getElementById("resume");
    const resume = el.innerHTML;
    const body = {
      html: resume,
    };
    setIsLoading(true);

    try {
      const response = await printResume(body, token);
      if (response.ok) {
        generateFunfact();
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "generated.pdf";
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        return;
      }
      const res = await response.json();
      if (
        response.status === 403 &&
        res.message === "You are not eligible for this feature"
      ) {
        toast.info("Subscribe to Genies Pro Suite to download your CV.", {
          autoclose: 3000,
        });
        updateRedirectPricingRoute("/resume-builder");
        return router.push("/pricing?scroll=1");
      }

      if (
        response.status === 403 &&
        res.message === "Your download CV tokens have expired"
      ) {
        toast.info("Your plan validity has expired.", { autoclose: 3000 });
        return router.push("/pricing?scroll=1");
      }
      if (
        response.status === 403 &&
        res.message === "You have no download CV tokens"
      ) {
        setIsServiceDialogOpen(true);
      }
      if (response.status === 500) {
        toast.error("Error downloading your CV , Please try again later");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadAsText = () => {
    const el = document.getElementById("resume");
    const resume = el.innerHTML;
    const resumeText = convert(resume, {
      wordwrap: 130,
      selectors: [{ selector: "a", options: { ignoreHref: true } }],
    });
    const blob = new Blob([resumeText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.txt";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    setShowModal(false);
  };

  const handleTemplateChange = (val) => {
    setResumeData("metadata.template", val);
    setIsDrawerOpen(false);
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

  return (
    <>
      <div className="flex justify-center items-center flex-col w-full relative bg-blue-100">
        {isLoading && (
          <Dialog open={isLoading} onClose={() => setIsLoading(false)}>
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
              <div className="text-center bg-white">
                <p>@Genies Career Hub</p>
              </div>
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
              <DialogContent className="sm:max-w-[60dvw] sm:h-[70dvh] p-0 bg-white"  showCloseButton={true}
               onClick={() => setShowModal(false)}>
                <DialogHeader>
                  <DialogTitle className="text-2xl 2xl:text-5xl lg:text-4xl text-center mt-10 sm:mt-20 text-blue-900">
                    Oops! You have not subscribed yet
                  </DialogTitle>
                  <p className="lg:w-full w-1/2 mx-auto text-center text-[12px] sm:text-base text-gray-600 mt-2">
                    You need to upgrade to download your CV as a PDF, or else
                    you can download as a Text for free
                  </p>
                </DialogHeader>
                <div className="modal_content_section flex flex-col sm:flex-row items-center justify-center sm:justify-between px-4 sm:px-6">
                  <div className="w-full sm:w-1/2 flex justify-center mb-6 sm:mb-0">
                    <div className="image_content text-center">
                      <Image
                        src="/illustration-manager-choosing-new-worker.png"
                        alt="choice-worker-concept-illustrated"
                        className="w-[200px] h-[200px] sm:w-[300px] sm:h-[250px] lg:w-[300px] lg:h-[200px] 2xl:w-[400px] 2xl:h-[400px] object-contain mx-auto"
                        width={400}
                        height={500}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 flex justify-center">
                    <div className="flex flex-col gap-4 sm:gap-8 p-4 sm:p-6 items-center w-full">
                      <button
                        className="w-full max-w-[250px] sm:max-w-[300px] border-2 border-blue-700 hover:border-blue-950 text-blue-700 py-2 sm:py-3 rounded-md text-xs sm:text-sm font-bold text-center"
                        onClick={downloadAsText}
                      >
                        Download as Text
                        <IoDocumentText className="text-blue-700 inline-flex ml-2 text-lg sm:text-xl animate-bounce" />
                      </button>
                      <Link
                        href="/pricing?scroll=1"
                        className="w-full max-w-[300px] py-3 sm:py-4 border-2 border-green-500 hover:border-green-700 text-green-500 rounded-md text-xs sm:text-sm font-bold text-center"
                        disabled
                      >
                        Download as PDF
                        <FaFilePdf className="text-green-500 inline-flex ml-2 text-lg sm:text-xl animate-bounce" />
                        <br />
                        (Upgrade Required)
                      </Link>
                    </div>
                  </div>
                </div>
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
