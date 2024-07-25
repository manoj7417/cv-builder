import { GetTemplate } from "@/components/resume-templates/GetTemplate";
import { cn } from "@/lib/utils";
import React from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { useResumeStore } from "../store/ResumeStore";

function ContentDialog({ isContentVisible, setIsContentVisible }) {
  const data = useResumeStore((state) => state.resume.data);
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
      {isContentVisible && (
        <div
          className=" bg-black bg-opacity-80 inset-0 z-50 w-full h-full absolute overflow-hidden"
          onClick={() => setIsContentVisible(false)}
        >
          <div
            onClick={() => setIsContentVisible(false)}
            className="z-50 fixed top-6 right-10 cursor-pointer"
          >
            <LiaTimesSolid className="text-white text-3xl" />
          </div>
          <div className="shadow-lg fixed top-5 left-[25%] no-scrollbar h-screen overflow-y-scroll">
            <div
              id="resume"
              className={cn("relative bg-white")}
              style={{
                width: `${pageSizeMap["a4"].width * MM_TO_PX}px`,
                height: `${pageSizeMap["a4"].height * MM_TO_PX}px`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <GetTemplate name={data?.metadata?.template} />
              <div className="bg-white text-gray-500 text-end">
                <p className="text-sm">@Genies Career Hub</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContentDialog;
