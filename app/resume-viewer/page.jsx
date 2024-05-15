"use client"
import Template3 from '@/components/resume-templates/Template3';
import { cn } from '@/lib/utils';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react'
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";


const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="tools">
      <button onClick={() => zoomIn()}>+</button>
      <button onClick={() => zoomOut()}>-</button>
      <button onClick={() => resetTransform()}>x</button>
    </div>
  );
};

const ResumeViewPage = () => {
  const [scale, setScale] = useState(0.8)
  const transformRef = useRef(null);

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
    <div className="flex justify-center items-center w-full h-screen overflow-hidden">
      <TransformWrapper
        initialScale={0.5}
        initialPositionX={200}
        initialPositionY={100}
        ref={transformRef}
        centerOnInit
        smooth
        minScale={0.4}

      >
        <TransformComponent>
          <div
            className={cn("relative bg-white shadow-2xl")}
            style={{
              width: `${pageSizeMap['a4'].width * MM_TO_PX}px`,
              minHeight: `${pageSizeMap['a4'].height * MM_TO_PX}px`,
            }}
          >
            <Template3 />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

export default ResumeViewPage