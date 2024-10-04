import { GetTemplate } from "@/components/resume-templates/GetTemplate";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { useResumeStore } from "../store/ResumeStore";
import { FaFilePdf } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { GetTokens } from "../actions";
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

function ContentDialog({ isContentVisible, setIsContentVisible }) {
  const randomNumber = Math.floor(Math.random() * 9);
  const randomAnimation = Math.floor(Math.random() * 4);
  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(0.5);
  const [funfact, setFunFact] = useState(funfacts[randomNumber]);
  const [animation, setAnimation] = useState(Loaders[randomAnimation]);
  const data = useResumeStore((state) => state.resume.data);
  const resumeData = useResumeStore((state) => state.resume.data);
  const setResumeData = useResumeStore((state) => state.setResumeData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { userdata } = useUserStore((state) => state.userState);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);

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
      const response = await axios.post('/api/printResume', body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        generateFunfact();
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'generated.pdf';
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
      {isContentVisible && (
        <div
          className=" bg-black bg-opacity-80 inset-0 z-50 w-full h-full fixed overflow-hidden lg:hidden block"
          // onClick={() => setIsContentVisible(false)}
        >
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
                                  priority
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
            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogContent
                className="sm:max-w-[60dvw] sm:h-[70dvh] p-0 bg-white"
                showCloseButton={true}
                onClick={() => setShowModal(false)}
              >
                <DialogHeader>
                  <DialogTitle className="text-xl 2xl:text-5xl lg:text-4xl text-center mt-10 sm:mt-20 text-blue-900">
                    Oops! You have not subscribed yet
                  </DialogTitle>
                  <p className="lg:w-full w-1/2 mx-auto text-center text-[12px] sm:text-base text-gray-600 mt-2">
                    You need to upgrade to download your CV as a PDF, or else
                    you can download as a Text for free
                  </p>
                </DialogHeader>
                <div className="modal_content_section flex flex-col sm:flex-row items-center justify-center sm:justify-between px-4 sm:px-6 border-2">
                  <div className="w-full sm:w-1/2 flex justify-center mb-6 sm:mb-0">
                    <div className="image_content text-center">
                      <Image
                        src="/illustration-manager-choosing-new-worker.png"
                        alt="choice-worker-concept-illustrated"
                        className="w-[200px] h-[200px] sm:w-[300px] sm:h-[250px] lg:w-[300px] lg:h-[200px] 2xl:w-[400px] 2xl:h-[400px] object-contain mx-auto "
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
                        href="/pricing"
                        className="w-full max-w-[250px] sm:max-w-[300px] py-2 sm:py-3 border-2 border-green-500 hover:border-green-700 text-green-500 rounded-md text-xs sm:text-sm font-bold text-center"
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
                margin: "-200px",
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
