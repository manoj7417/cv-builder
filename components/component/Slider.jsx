"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { GetTokens } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/app/store/ResumeStore";
import { useUserStore } from "@/app/store/UserStore";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";

export const templateType = {
  free: "Free",
  premium: "Premium",
  dummy: "Dummy",
};

const templatesData = [
  {
    name: "Template10",
    src: "/TemplateX-1.png",
    alt: "TemplateX-1",
    type: templateType.free,
    color: "#F9BC2F",
  },
  {
    name: "Template1",
    src: "/TemplateX-2.png",
    alt: "TemplateX-2",
    type: templateType.dummy,
    color: "#2047A8",
  },
  {
    name: "Template20",
    src: "/TemplateX-3.png",
    alt: "TemplateX-3",
    type: templateType.premium,
    color: "#15ABAB",
  },
  {
    name: "Template4",
    src: "/TemplateX-4.png",
    alt: "TemplateX-4",
    type: templateType.dummy,
    color: "#3A8DEF",
  },
];

export default function Slider() {
  const [userState, setUserState] = useState({});
  const [loading, setIsLoading] = useState(false);
  const createResume = useUserStore((state) => state.createResume);
  const replaceResumeData = useResumeStore((state) => state.replaceResumeData);
  const router = useRouter();

  const handleCreateCV = async (template, color) => {
    const { accessToken } = await GetTokens();
    if (!accessToken && !accessToken?.value) {
      toast("Please login to use this template");
      router.push("/login");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/createPrefilledResume",
        { template, color },
        { headers: { Authorization: `Bearer ${accessToken?.value}` } }
      );
      if (response.data.data) {
        createResume(response.data.data);
        replaceResumeData(response.data.data);
        router.push("/resume-builder?newresume=true");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userState"));
    if (user) {
      setUserState(user.userdata);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {templatesData.map((template, index) => (
          <div
            key={index}
            className="group relative overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <div className="h-[400px] w-full ">
              <Image
                src={template.src}
                alt={template.alt}
                layout="fill"
                objectFit="contain"
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-center">
                <Button
                  className="inline-flex items-center justify-center rounded-md bg-[#f76918] px-4 text-[12px] font-medium text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-100 disabled:bg-[#82cdf0]"
                  onClick={() =>
                    handleCreateCV(template?.name, template?.color)
                  }
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <ImSpinner8 className="animate-spin mr-2" />
                      Loading
                    </>
                  ) : (
                    "Try Now"
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
