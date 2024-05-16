"use client";
import Template3 from "@/components/resume-templates/Template3";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { CiUndo } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { LuLayoutGrid } from "react-icons/lu";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../components/Button";
import { printResume } from "../pages/api/api";

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="tools">
      <button className="p-2 bg-white" onClick={() => zoomIn()}>
        <FiPlus />
      </button>
      <button className="p-2 bg-white mx-2" onClick={() => zoomOut()}>
        <FiMinus />
      </button>
      <button className="p-2 bg-white" onClick={() => resetTransform()}>
        <CiUndo />
      </button>
    </div>
  );
};

const ResumeViewPage = ({ resumeData }) => {
  const [scale, setScale] = useState(0.8);
  const transformRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsToggleOpen(false);
    }
  };

  const handleDownloadResume = async () => {
    const el = document.getElementById('resume')
    const resume = el.innerHTML
    const body = {
      html: resume
    }
    setIsLoading(true)
    try {
      const response = await printResume(body)
      if (response.ok) {
        const blob = await response.blob(); // Get response body as blob
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated.pdf';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
      // if (response.status === 200) {
      //   const blob = new Blob([response.data], { type: 'application/pdf' });
      //   const url = window.URL.createObjectURL(blob);
      //   const a = document.createElement('a');
      //   a.href = url;
      //   a.download = 'generated.pdf';
      //   a.target = '_blank'; // Open in new tab
      //   document.body.appendChild(a);
      //   a.click();
      //   document.body.removeChild(a);
      //   window.URL.revokeObjectURL(url);
      // } else {
      //   console.error('Failed to generate PDF:', response.status);
      //   // Handle error
      // }
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "ZOOM_IN") transformRef.current?.zoomIn(0.2);
      if (event.data.type === "ZOOM_OUT") transformRef.current?.zoomOut(0.2);
      if (event.data.type === "CENTER_VIEW") transformRef.current?.centerView();
      if (event.data.type === "RESET_VIEW") {
        // transformRef.current?.resetTransform(0);
        // setTimeout(() => transformRef.current?.centerView(0.4, 0.4), 10);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [transformRef]);


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

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen overflow-hidden relative">
        <TransformWrapper
          initialScale={0.5}
          initialPositionX={200}
          initialPositionY={100}
          ref={transformRef}
          centerOnInit
          smooth
          minScale={0.4}
        >
          <div className="actions_button hidden  bg-gray-600 md:flex 2xl:justify-around 2xl:p-5 justify-evenly items-center absolute top-0 w-full z-10">
            <Controls />
            <button className="p-2 bg-white text-black disabled:bg-gray-600 font-semibold text-sm flex items-center justify-around" onClick={handleDownloadResume} disabled={isLoading}>{
              isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            }
              Download PDF
            </button>
            <Drawer direction="right">
              <DrawerTrigger className="bg-white text-black p-2 text-sm font-semibold">Templates <LuLayoutGrid className="inline"/></DrawerTrigger>
              <DrawerContent className="bg-white flex flex-col h-full w-[500px] mt-24 fixed right-0">
                <DrawerHeader>
                  <DrawerTitle>Choose Templates</DrawerTitle>
                  <DrawerDescription>
                    <div className="grid grid-cols-2 gap-5 overflow-y-scroll h-screen no-scrollbar">
                        <div className="image_section_1 ">
                          <img src="/5.png" alt="pic1" className="cursor-pointer hover:border-sky-700 hover:border-4"/>
                        </div>
                        <div className="image_section_2">
                        <img src="/6.png" alt="pic1" className="cursor-pointer hover:border-sky-700 hover:border-4"/>
                        </div>
                        <div className="image_section_1">
                          <img src="/5.png" alt="pic1" className="cursor-pointer hover:border-sky-700 hover:border-4"/>
                        </div>
                        <div className="image_section_2">
                        <img src="/6.png" alt="pic1" className="cursor-pointer hover:border-sky-700 hover:border-4"/>
                        </div>
                        <div className="image_section_1">
                          <img src="/5.png" alt="pic1" className="cursor-pointer hover:border-sky-700 hover:border-4"/>
                        </div>
                        <div className="image_section_2">
                        <img src="/6.png" alt="pic1" className="cursor-pointer hover:border-sky-700 hover:border-4"/>
                        </div>
                        <div className="image_section_1">
                          <img src="/5.png" alt="pic1" className="cursor-pointer hover:border-sky-700 hover:border-4"/>
                        </div>
                        <div className="image_section_2">
                        <img src="/6.png" alt="pic1" className="cursor-pointer hover:border-sky-700 hover:border-4"/>
                        </div>
                    </div>
                  </DrawerDescription>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
          <TransformComponent>
            <div className="shadow-2xl">
              <div
                id="resume"
                className={cn("relative bg-white")}
                style={{
                  width: `${pageSizeMap["a4"].width * MM_TO_PX}px`,
                  minHeight: `${pageSizeMap["a4"].height * MM_TO_PX}px`,
                  maxHeight: `${pageSizeMap["a4"].height * MM_TO_PX}px`,
                  overflow: "hidden",
                }}
              >
                <Template3 resumeData={resumeData} />
              </div>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </>
  );
};

export default ResumeViewPage;
