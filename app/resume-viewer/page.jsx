"use client";
import Template3 from "@/components/resume-templates/Template3";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { CiUndo } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
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

const ResumeViewPage = () => {
  const [scale, setScale] = useState(0.8);
  const transformRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsToggleOpen(false);
    }
  };

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
          <div className="actions_button  flex 2xl:justify-around 2xl:p-5 justify-evenly items-center absolute top-0 w-full z-10 my-1">
            <Controls />
            <button className="p-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 text-sm">
              Download PDF
            </button>
            {/* Profile Section  */}
            {/* <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsToggleOpen(!isToggleOpen)}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white focus:outline-none"
                >
                  <Image
                    src="/avatar.jpg"
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
                {isToggleOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Settings
                      </a>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        role="menuitem"
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </div> */}
            <Drawer direction="left">
              <DrawerTrigger className="bg-blue-900 text-white p-2 hover:bg-blue-700 text-sm rounded-md">Explore More Templates</DrawerTrigger>
              <DrawerContent className="bg-white flex flex-col h-full w-[400px] mt-24 fixed bottom-0 right-0">
                <DrawerHeader>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>
                    This action cannot be undone.
                  </DrawerDescription>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>

          <TransformComponent>
            <div
              className={cn("relative bg-white shadow-2xl")}
              style={{
                width: `${pageSizeMap["a4"].width * MM_TO_PX}px`,
                minHeight: `${pageSizeMap["a4"].height * MM_TO_PX}px`,
              }}
            >
              <Template3 />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </>
  );
};

export default ResumeViewPage;
