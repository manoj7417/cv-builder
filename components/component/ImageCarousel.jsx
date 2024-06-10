import React, { useState } from "react";
import { CarouselItem } from "../ui/carousel";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { IoIosStar } from "react-icons/io";
import { templateType } from "./Slider";
import { Button } from "../ui/button";
import { ImSpinner8 } from "react-icons/im";
import { createNewResume } from "@/app/pages/api/api";
import { GetTokens } from "@/app/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/app/store/ResumeStore";
import { useUserStore } from "@/app/store/UserStore";

function ImageCarousel({ data }) {
  const [loading, setIsLoading] = useState(false);
  const createResume = useUserStore((state) => state.createResume);
  const replaceResumeData = useResumeStore((state) => state.replaceResumeData);
  const router = useRouter();
  
  const handleCreateCV = async (template) => {
    const { accessToken } = await GetTokens();

    if (!accessToken) {
      toast("Please login to use this template");
      router.push("/login");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await createNewResume(accessToken.value, template);
      if (response.data.data) {
        createResume(response.data.data);
        replaceResumeData(response.data.data);
        router.push("/builder");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <CarouselItem>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 pt-14">
        {data.map((image, index) => {
          return (
            <div
              className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#8181b9] to-[#dcecff]"
              key={index}
            >
              {image.type === templateType.premium && (
                <div className="card_box">
                  <span></span>
                </div>
              )}
              <Image
                alt={image.alt}
                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                src={image.src}
                height={900}
                width={600}
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Button
                  className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-100 disabled:bg-[#82cdf0]"
                  onClick={() => handleCreateCV(image.name)}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <ImSpinner8 className=" animate-spin mr-2" />
                      Loading
                    </>
                  ) : (
                    "Try Now"
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </CarouselItem>
  );
}

export default ImageCarousel;
