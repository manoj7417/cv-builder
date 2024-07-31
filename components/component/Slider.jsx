"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from "@/components/ui/carousel";
import { FaUserCog, FaUserGraduate } from "react-icons/fa";
import {
  MdOutlineDesignServices,
  MdOutlineSettingsSuggest,
} from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoIosStar } from "react-icons/io";
import { useEffect, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import { ImSpinner8 } from "react-icons/im";
import { GetTokens } from "@/app/actions";
import { createNewResume } from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/app/store/ResumeStore";
import { useUserStore } from "@/app/store/UserStore";
import { toast } from "react-toastify";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export const templateType = {
  free: "Free",
  premium: "Premium",
  dummy: "Dummy",
};

const templatesData = [
  {
    name: "Template3",
    src: "/Template3.png",
    alt: "Template3.png",
    type: templateType.free,
  },
  {
    name: "Template5",
    src: "/Template5.png",
    alt: "Template5.png",
    type: templateType.dummy,
  },
  {
    name: "Template4",
    src: "/Template4.png",
    alt: "Template4.png",
    type: templateType.premium,
  },
  {
    name: "Template6",
    src: "/Template6-1.png",
    alt: "Template6-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template1",
    src: "/Template1.png",
    alt: "Template1.png",
    type: templateType.premium,
  },
  {
    name: "Template7",
    src: "/Template7-1.png",
    alt: "Template7-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template8",
    src: "/Template8.png",
    alt: "Template8.png",
    type: templateType.dummy,
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
    type: templateType.dummy,
  },
  {
    name: "Template11",
    src: "/Template11-(new).png",
    alt: "Template11-(new).png",
    type: templateType.dummy,
  },
  {
    name: "Template12",
    src: "/Template12-1.png",
    alt: "Template12-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template13",
    src: "/Template13-1.png",
    alt: "template13-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template14",
    src: "/Template14-1.png",
    alt: "Template14-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template15",
    src: "/Template15-1.png",
    alt: "Template15-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template16",
    src: "/Template16-1.png",
    alt: "Template16-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template17",
    src: "/Template17-1.png",
    alt: "Template17-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template18",
    src: "/Template18-1.png",
    alt: "Template18-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template19",
    src: "/Template19-(new).png",
    alt: "Template19-(new).png",
    type: templateType.free,
  },
  {
    name: "Template20",
    src: "/Template20-1.png",
    alt: "Template20-1.png",
    type: templateType.dummy,
  },
  {
    name: "Template21",
    src: "/Template21.png",
    alt: "Template21.png",
    type: templateType.premium,
  },
  {
    name: "Template22",
    src: "/Template22-1.png",
    alt: "Template22-1.png",
    type: templateType.dummy,
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
    type: templateType.dummy,
  },
  {
    name: "Template25",
    src: "/Template25.png",
    alt: "Template25.png",
    type: templateType.dummy,
  },
  {
    name: "Template26",
    src: "/Template26.png",
    alt: "Template26.png",
    type: templateType.dummy,
  },
];

export default function Slider() {
  const [userState, setUserState] = useState({});
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
        router.push("/resume-builder");
      }
    } catch (error) {
      console.log(error);
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
    <div className="w-full mx-auto px-4 py-12 md:py-16 lg:py-24 bg-gradient-to-b from-[#e4f5fc] to-[white] rounded-2xl">
      <div className="container mx-auto mb-10 ">
        <h2 className="mb-8 text-3xl text-black font-extrabold text-center lg:text-5xl">
          Creating CVs that Reflect
          <br />
          <span className="flex text-[#2C98CA] lg:text-5xl text-3xl justify-center mt-2">
            Perfection
            <Image src="/Vector.svg" height={37} width={39} />{" "}
          </span>
        </h2>
        <p className="text-center max-w-4xl mx-auto text-[#7C7C7C]">
          Explore unlimited possibilities with the power of a precision-crafted
          CV by creating a resume that aligns with your Professional Profile,
          employing our customised Curriculum Vitae template.
        </p>
        <div className="mt-10 lg:max-w-7xl flex flex-wrap gap-5 mx-auto justify-center items-center h-full">
          <div className="mt-10 lg:max-w-7xl w-full  mx-auto lg:h-[500px] h-auto cv_slider">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              centeredSlides={true}
              autoplay={{ delay: 7000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={false}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {templatesData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="group lg:w-auto lg:h-auto w-[220px] h-[320px] relative overflow-hidden rounded-lg shadow-lg px-3 py-2 bg-gradient-to-t from-[#8181b9] to-[#dcecff]">
                    {item.type === templateType.premium && (
                      <div className="card_box">
                        <span></span>
                      </div>
                    )}
                    <div className="images_section w-[200px] h-[300px]">
                      <Image
                        alt={item.alt}
                        className="h-full w-full object-fill transition-all duration-300 group-hover:scale-105"
                        src={item.src}
                        height={125}
                        width={130}
                      />
                    </div>
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ zIndex: "1" }}
                    >
                      <Button
                        className="inline-flex items-center justify-center rounded-md bg-[#0EA5E9] px-4 text-[12px] font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-100 disabled:bg-[#82cdf0]"
                        onClick={() => handleCreateCV(item.name)}
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
