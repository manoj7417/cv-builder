"use client";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { CiUndo } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { LuLayoutGrid } from "react-icons/lu";
import { FaCrown } from "react-icons/fa";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Payment, printResume } from "../pages/api/api";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { GetTemplate } from "@/components/resume-templates/GetTemplate";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BsFullscreen } from "react-icons/bs";
import { LiaTimesSolid } from "react-icons/lia";
import { useResumeStore, useTemporalResumeStore } from "../store/ResumeStore";
import { GetTokens, RemoveTokens } from "../actions";
import { useUserStore } from "../store/UserStore";
import { templateType } from "@/components/component/Slider";
import { tempType, TempTypes } from "@/lib/templateTypes/TempTypes";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImSpinner3 } from "react-icons/im";
import Lottie from "lottie-react";
import Loader1 from "@/public/animations/downloadLoader1.json";
import Loader2 from "@/public/animations/downloadLoader2.json";
import Loader3 from "@/public/animations/downloadLoader3.json";
import Loader4 from "@/public/animations/downloadLoader4.json";
import Loader5 from "@/public/animations/downloadLoader5.json";
import { funfacts } from "@/constants/funfacts";

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
    src: "/Template10-1.png",
    alt: "Template10-1.png",
    type: templateType.premium,
  },
  {
    name: "Template11",
    src: "/Template11-1.png",
    alt: "Template11-1.png",
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

const Loaders = [Loader1, Loader2, Loader3, Loader4, Loader5];

const ResumeViewPage = () => {
  const randomNumber = Math.floor(Math.random() * 9);
  const randomAnimation = Math.floor(Math.random() * 4);
  const [scale, setScale] = useState(0.8);
  const dropdownRef = useRef(null);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const containerRef = useRef();
  const data = useResumeStore((state) => state.resume.data);
  const setResumeData = useResumeStore((state) => state.setResumeData);
  const logoutUser = useUserStore((state) => state.logoutUser);
  const { userState } = useUserStore((state) => state);
  const resumeData = useResumeStore((state) => state.resume.data);
  const [funfact, setFunFact] = useState(funfacts[randomNumber]);
  const [animation, setAnimation] = useState(Loaders[randomAnimation]);
  const { undo, redo, canUndo, canRedo } = useTemporalResumeStore((state) => ({
    undo: state.undo,
    redo: state.redo,
    canUndo: state.canUndo,
    canRedo: state.canRedo,
  }));

  const handleLogout = async () => {
    await RemoveTokens();
    toast.success("User logout successfully", {
      position: "top-right",
    });
    logoutUser();
    router.push("/");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsToggleOpen(false);
    }
  };

  const handlepayment = async (type) => {
    const { accessToken } = await GetTokens();
    Payment(
      {
        amount: type === tempType.premium ? 20 : 10,
        email: userState.userdata.email,
        name: "aman",
        url: "https://career-genies-frontend.vercel.app/paymentSuccess",
        cancel_url: window.location.href,
        templateName: resumeData.metadata.template,
      },
      accessToken.value
    )
      .then((response) => {
        localStorage.setItem("purchasedItem", JSON.stringify(response.data));
        const { url } = response.data;
        window.location = url;
      })
      .catch((error) => {
        console.error(
          error.response ? error.response.data.error : error.message
        );
      });
  };

  const checkUserTemplate = async () => {
    const templateType = TempTypes.find(
      (template) => template?.name === resumeData?.metadata?.template
    );
    setIsLoading(true);
    const temp = resumeData?.metadata?.template;
    const userHasTemplate =
      userState?.userdata?.premiumTemplates?.includes(temp);
    if (!userHasTemplate) {
      await handlepayment(templateType?.type);
    } else {
      setIsLoading(true);
      handleDownloadResume();
    }
  };

  const handleDownloadResume = async () => {
    const el = document.getElementById("resume");
    const resume = el.innerHTML;
    const body = {
      html: resume,
    };
    setIsLoading(true);

    try {
      const response = await printResume(body);
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
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
      <div className="flex justify-center items-center w-full ">
        {isLoading && (
          <Dialog open={isLoading} onClose={() => setIsLoading(false)}>
            <DialogContent className="sm:max-w-[60vw] h-[60vh]">
              <div className="flex">
                <div className="w-[50%]">
                  <Lottie animationData={animation} />
                </div>
                <div className="w-[50%] flex flex-col  justify-center">
                  <div className="text-fancy text-5xl">
                    <h1>Did you know?</h1>
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
        <div>
          <div className="actions_button bg-slate-100 p-1 flex flex-row 2xl:justify-evenly 2xl:p-2 justify-evenly items-center fixed top-0 left-0 w-full h-[50px] z-20">
            <div className="header_section w-full md:block hidden">
              <Link
                href={"/user-history"}
                className="px-5 py-2 bg-blue-900 text-white hover:bg-blue-700 text-sm rounded-md"
              >
                <MdOutlineKeyboardArrowLeft className="inline text-xl" />
                Back
              </Link>
            </div>
            <div className="auth_section flex justify-end w-full gap-10 items-center">
              <button
                className="2xl:p-3 md:p-2 text-sm p-2 bg-blue-900 text-white disabled:bg-gray-600 font-semibold 2xl:text-sm md:text-sm text-[12px] lg:flex items-center justify-around rounded-md hidden"
                onClick={() => setIsContentVisible(true)}
              >
                <BsFullscreen className="h-4 w-4 text-white mr-2" />
                <span>Full Screen</span>
              </button>
              {/* <Controls /> */}
              <div className="tools">
                <button
                  className="2xl:p-3 md:p-2 p-2 bg-blue-900 text-white rounded-md"
                  onClick={handleZoomIn}
                >
                  <FiPlus className="text-white" />
                </button>
                <button
                  className="2xl:p-3 md:p-2 p-2 bg-blue-900 text-white mx-2 rounded-md"
                  onClick={handleZoomOut}
                >
                  <FiMinus />
                </button>
                <button
                  className="2xl:p-3 md:p-2 p-2 bg-blue-900 text-white rounded-md"
                  onClick={handleReset}
                >
                  <CiUndo />
                </button>
              </div>
              <button
                className="2xl:p-3 md:p-2 text-sm p-2 bg-blue-900 text-white disabled:bg-gray-600 font-semibold 2xl:text-sm md:text-sm text-[12px] flex items-center justify-around rounded-md"
                onClick={checkUserTemplate}
                disabled={isLoading}
              >
                Download PDF
                <FaCrown className="ml-1 text-yellow-300" />
              </button>
              <div className="choose_templates xl:block hidden">
                <Drawer
                  direction="right"
                  open={isDrawerOpen}
                  onOpenChange={setIsDrawerOpen}
                >
                  <DrawerTrigger
                    className="bg-blue-900 text-white 2xl:p-3 md:p-2 p-1 2xl:text-base md:text-sm text-[12px] font-semibold rounded-md"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    Templates <LuLayoutGrid className="inline" />
                  </DrawerTrigger>
                  <DrawerContent className="bg-white flex flex-col h-full w-[500px] mt-24 fixed right-0">
                    <DrawerHeader>
                      <DrawerTitle>Choose Templates</DrawerTitle>
                      <DrawerDescription>
                        <div className="grid grid-cols-2 gap-5 overflow-y-scroll h-screen no-scrollbar">
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
              </div>
            </div>

            <div className="profile_section">
              <div className="ml-auto flex items-center px-6 lg:ml-4 lg:p-0">
                {/* Avatar with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsToggleOpen(!isToggleOpen)}
                    className="relative inline-flex h-[2.4rem] w-10 items-center justify-center rounded-full text-white focus:outline-none"
                  >
                    <Image
                      src="/pic.jpg"
                      alt="user name"
                      title="user name"
                      width={30}
                      height={30}
                      className="max-w-full rounded-full"
                    />
                    <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 p-1 text-sm text-white">
                      <span className="sr-only"> 7 new emails </span>
                    </span>
                  </button>
                  {/* Dropdown */}
                  {isToggleOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <div className="py-1" role="none">
                        <Link
                          href="/user-profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Profile
                        </Link>
                        <div
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          role="menuitem"
                          onClick={handleLogout}
                        >
                          Logout
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* End Avatar with Dropdown */}
              </div>
            </div>
          </div>
          <div
            className="shadow-2xl overflow-y-scroll no-scrollbar h-screen"
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
              <div className=" text-center  text-gray-500">
                <p>@Genies Career Hub</p>
              </div>
            </div>
          </div>
          {isContentVisible && (
            <div
              className="min-w-screen h-auto h-min-[100vh] animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
              id="modal-id"
            >
              <div className="absolute bg-black opacity-80 inset-0 z-0 w-full" />

              {/*content*/}
              <div className="">
                <div
                  onClick={() => setIsContentVisible(false)}
                  className="z-50 absolute top-6 right-10 cursor-pointer"
                >
                  <LiaTimesSolid className="text-white text-3xl" />
                </div>
                <div
                  className="shadow-2xl relative no-scrollbar h-screen overflow-y-scroll"
                  style={{
                    scale: { scale },
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
                    <GetTemplate name={data?.metadata?.template} />
                    <div className="bg-white text-gray-500 text-end">
                      <p className="text-sm">@Genies Career Hub</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResumeViewPage;
