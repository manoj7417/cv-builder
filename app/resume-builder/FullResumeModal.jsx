import { GetTemplate } from "@/components/resume-templates/GetTemplate";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useResumeStore } from "../store/ResumeStore";
import { FaTimes } from "react-icons/fa";

const FullResumeModal = ({ isModalView,setIsModalView }) => {
  const [scale, setScale] = useState(0.8);
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
      {isModalView && (
        <div>
          <div className="bg-black bg-opacity-80 inset-0 z-50 w-full h-full fixed overflow-hidden mt-10">
            <div>
              <div className="close_icon absolute top-[50px] right-[10%] text-white text-[25px]">
                <FaTimes className="cursor-pointer"onClick={()=>setIsModalView(false)}/>
              </div>
              <div
                className="shadow-2xl overflow-y-scroll h-screen w-[812px] mx-auto"
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
                  <GetTemplate
                    name={data?.metadata?.template}
                    resumeData={data}
                  />
                  <div className="text-center bg-white">
                    <p>@Genies Career Hub</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FullResumeModal;
