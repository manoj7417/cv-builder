"use client";

import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useSetDefaultScale } from "./hooks";
import { usePDF } from "@react-pdf/renderer";
import { useEffect } from "react";
import { LuCrown } from "react-icons/lu";
import { FaCrown } from "react-icons/fa";
import { WiStars } from "react-icons/wi";

const ResumeControlBar = ({
  scale,
  setScale,
  documentSize,
  document,
  fileName,
}: {
  scale: number;
  setScale: (scale: number) => void;
  documentSize: string;
  document: JSX.Element;
  fileName: string;
}) => {
  const { scaleOnResize, setScaleOnResize } = useSetDefaultScale({
    setScale,
    documentSize,
  });

  const [instance, update] = usePDF({ document });

  useEffect(() => {
    update(document);
  }, [update, document]);
  
  return (
    <div className="sticky bottom-0 left-0 right-0 flex h-[var(--resume-control-bar-height)]  items-center justify-center px-[var(--resume-padding)] text-gray-600 lg:justify-between" style={{padding:"0"}}>
      {/* <div className="flex items-center gap-2">
        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.01}
          value={scale}
          onChange={(e) => {
            setScaleOnResize(false);
            setScale(Number(e.target.value));
          }}
        />
        <div className="w-10">{`${Math.round(scale * 100)}%`}</div>
        <label className="hidden items-center gap-1 lg:flex">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4"
            checked={true}
            onChange={() => setScaleOnResize((prev) => !prev)}
          />
          <span className="select-none">Autoscale</span>
        </label>
      </div> */}
      <h3 className="font-semibold flex">Design Your Professional Destiny with Genie <WiStars className="h-7 w-7 text-indigo-700" /></h3>
      
      <a
        className="ml-1 flex items-center gap-1 rounded-md border bg-blue-600 text-white border-gray-300 px-3 py-0.5 hover:bg-blue-700 lg:ml-8"
        href={instance.url!}
        download={fileName}
      >
        <ArrowDownTrayIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">Download</span>
        <FaCrown className="text-yellow-200 h-4 w-4" />
      </a>
    </div>
  );
};

export const ResumeControlBarCSR = dynamic(
  () => Promise.resolve(ResumeControlBar),
  {
    ssr: false,
  }
);
