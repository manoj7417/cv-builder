import {
  A4_HEIGHT_PX,
  A4_WIDTH_PT,
  A4_WIDTH_PX,
  LETTER_HEIGHT_PX,
  LETTER_WIDTH_PT,
  LETTER_WIDTH_PX,
} from "@/app/lib/constants";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import Frame from "react-frame-component";
import { getAllFontFamiliesToLoad } from "../fonts/lib";

const getIFrameInitialContent = (isA4: boolean) => {
  const width = isA4 ? A4_WIDTH_PT : LETTER_WIDTH_PT;
  const allFontFamilies = getAllFontFamiliesToLoad();

  const allFontFamiliesPreloadLinks = allFontFamilies.map((font)=>`<link rel="preload" as="font" href="/fonts/${font}-Regular.ttf" type="font/ttf" crossorigin="anonymous">
  <link rel="preload" as="font" href="/fonts/${font}-Bold.ttf" type="font/ttf" crossorigin="anonymous">`).join("");

  const allFontFamiliesFontFaces = allFontFamilies
    .map(
      (
        font
      ) => `@font-face {font-family: "${font}"; src: url("/fonts/${font}-Regular.ttf");}
@font-face {font-family: "${font}"; src: url("/fonts/${font}-Bold.ttf"); font-weight: bold;}`
    )
    .join("");

  return `<!DOCTYPE html>
    <html style='scrollbar-width:none;'>
        <head>
        ${allFontFamiliesPreloadLinks}
            <style>
            ${allFontFamiliesFontFaces}
            </style>
        </head>
        <body style='height:100%; overlfow: hidden; width: ${width}pt; margin:0;padding:0; -webkit-text-size-adjust:none;'>
            <div></div>
        </body>
    <html>`;
};

const ResumeIFrame = ({
  documentSize,
  scale,
  children,
  enablePDFViewer = false,
}: {
  documentSize: string;
  scale: number;
  children: React.ReactNode;
  enablePDFViewer?: boolean;
}) => {
  const isA4 = documentSize === "A4";
  const iframeInitialContent = useMemo(
    () => getIFrameInitialContent(isA4),
    [isA4]
  );

  if (enablePDFViewer) {
    return (
      <DynamicPDFViewer className="h-full w-full">
        {children as any}
      </DynamicPDFViewer>
    );;
  }

  const width = isA4 ? A4_WIDTH_PX : LETTER_WIDTH_PX;
  const height = isA4 ? A4_HEIGHT_PX : LETTER_HEIGHT_PX;

  return (
    <div
      style={{
        maxWidth: `${width * scale}px`,
        maxHeight: `${height * scale}px`,
      }}
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
        }}
        className={`origin-top-left bg-white shadow-lg`}
      >
        <Frame
          initialContent={iframeInitialContent}
          style={{ width: "100%", height: "100%" }}
          key={isA4 ? "A4" : "LETTER"}
        >
          {children}
        </Frame>
      </div>
    </div>
  );
};

export const ResumeIFrameCSR = dynamic(() => Promise.resolve(ResumeIFrame), {
  ssr: false,
});


// PDFViewer is only used for debugging. Its size is quite large, so we make it dynamic import
const DynamicPDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFViewer),
  {
    ssr: false,
  }
);
