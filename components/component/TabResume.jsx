import React, { useState } from "react";
import {
  FaRegFolderOpen,
  FaStore,
  FaDatabase,
  FaLaptop,
  FaPalette,
  FaPython,
  FaSuitcase,
} from "react-icons/fa6";
import Image from "next/image";
import { Button } from "../ui/button";
import { FaCogs, FaPencilRuler, FaUsersCog } from "react-icons/fa";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "../ui/tabs";
import CourseSlider from "./CourseSlider";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/UserStore";
import { useResumeStore } from "@/app/store/ResumeStore";
import { JobResumeSchema } from "@/lib/schema/JobResume/JobResumeSchema";
import { GetTokens } from "@/app/actions";
import { createNewJobProfileResume } from "@/app/api/api";
import { toast } from "react-toastify";

export default function TabResume() {
  const [loading, setIsLoading] = useState(false);
  const replaceResumeData = useResumeStore((state) => state.replaceResumeData);
  const router = useRouter();

  const TabsHeader = [
    {
      id: 1,
      name: "Business Analyst",
      icon: <FaPython className="text-[#3776AB]" />,
      src: "/Template20-1.png",
    },
    {
      id: 2,
      name: "Data Scientist",
      icon: <FaDatabase className="text-[#FF6F61]" />,
      src: "/Template19-1.png",
    },
    {
      id: 3,
      name: "Product Manager",
      icon: <FaUsersCog className="text-[#4CAF50]" />,
      src: "/Template18-1.png",
    },
    {
      id: 4,
      name: "Software Engineer",
      icon: <FaLaptop className="text-[#795548]" />,
      src: "/Template14-1.png",
    },
    {
      id: 5,
      name: "Sales",
      icon: <FaSuitcase className="text-[#FF9800]" />,
      src: "/Template17-1.png",
    },
    {
      id: 6,
      name: "Teacher",
      icon: <FaPencilRuler className="text-[#3F51B5]" />,
      src: "/Template12-1.png",
    },
    {
      id: 7,
      name: "Engineer",
      icon: <FaCogs className="text-[#9C27B0]" />,
      src: "/Template22-1.png",
    },
    {
      id: 8,
      name: "Accounting",
      icon: <FaRegFolderOpen className="text-[#009688]" />,
      src: "/Template15-1.png",
    },
    {
      id: 9,
      name: "Designer",
      icon: <FaPalette className="text-[#E91E63]" />,
      src: "/Template-design.png",
    },
    {
      id: 10,
      name: "Marketing",
      icon: <FaStore className="text-[#FF5722]" />,
      src: "/Template16-1.png",
    },
  ];

  const handleCreateCV = async (name) => {
    const { data } = JobResumeSchema.find((job) => job.name === name);
    if (!data) return;
    setIsLoading(true);
    const { accessToken } = await GetTokens();
    if (!accessToken) {
      setIsLoading(false);
      toast("Please login to use this job resume");
      router.push("/login");
      return;
    }
    try {
      const response = await createNewJobProfileResume(accessToken.value, data);
      if (response.status === 201) {
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
    <>
      <div className="">
        <div className="rounded-t-xl p-6">
          <div className="tabs_heading">
            <h2 className="2xl:text-6xl lg:text-5xl text-3xl font-bold mt-5 tracking-tighter text-gray-900 text-center">
              Discover CVs that fit your Dream Job
            </h2>
            <p className="w-1/2 mx-auto text-center my-4">
              Start your journey with Genies Career Hub and unlock the door to a world where your talents are valued and your career dreams become a reality with a personalised and perfectly tailored resume.
            </p>
          </div>
          <Tabs
            className="max-w-5xl mx-auto py-5"
            defaultValue="Business Analyst"
          >
            <div className="grid grid-cols-2 place-items-around items-center ">
              <div className="tabs_main">
                <TabsList className="flex flex-col w-full justify-start flex-wrap py-10 h-auto gap-4">
                  {TabsHeader?.map((item, index) => (
                    <TabsTrigger value={item?.name} key={index}>
                      <div className="tabs_header flex gap-2 items-center justify-start">
                        {item?.icon}
                        {item?.name}
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <div className="tabs_content">
                {TabsHeader?.map((item, index) => (
                  <TabsContent value={item?.name} key={index}>
                    <div className="relative flex justify-center  overflow-hidden group p-4">
                      <div className="relative h-[600px] w-[400px] p-3 flex items-center justify-center bg-gradient-to-t from-[#8181b9] to-[#dcecff] rounded-md">
                        <Image
                          src={item.src}
                          key={index}
                          width={800}
                          height={400}
                          alt={item.name}
                          className=" object-fit h-full rounded-md"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Button
                          className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-100 disabled:bg-[#82cdf0]"
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
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </div>
      <section className="grid grid-cols-2 py-20">
        <div className="discover_image flex align-middle overflow-hidden ">
          <Image
            src={"/home-creative-down.png"}
            width={2000}
            height={1500}
            alt="discover"
            loading="lazy"
            style={{
              marginLeft: "-150px",
            }}
          />
        </div>
        <div className="my-auto">
          <CourseSlider />
        </div>
      </section>
    </>
  );
}
