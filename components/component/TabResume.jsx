'use client'
import React, { useState } from "react";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { templateType } from "@/components/component/Slider";
import {
  FaBorderAll,
  FaCogs,
  FaPencilRuler,
  FaRegFolderOpen,
  FaStore,
  FaUserCog,
} from "react-icons/fa";
import { PiFolderSimpleUser } from "react-icons/pi";
import { MdQueryStats } from "react-icons/md";
import { IoShirt } from "react-icons/io5";
import { RiShirtFill } from "react-icons/ri";
import Image from "next/image";
import {
  FaDatabase,
  FaLaptop,
  FaPalette,
  FaPython,
  FaSuitcase,
} from "react-icons/fa6";
import { Tilt } from "react-tilt";
import { ImSpinner8 } from "react-icons/im";
import { Button } from "../ui/button";
import { createNewJobProfileResume } from "@/app/pages/api/api";
import { GetTokens } from "@/app/actions";
import { useRouter } from "next/navigation";
import { JobResumeSchema } from "@/lib/schema/JobResume/JobResumeSchema";
import { useResumeStore } from "@/app/store/ResumeStore";

const TabResume = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const replaceResumeData = useResumeStore((state) => state.replaceResumeData)
  const TabsHeader = [
    {
      id: 1,
      name: "Business Analyst",
      icon: <FaPython className="text-[#3776AB]" />,
      src: "/Template3.png",
    },
    {
      id: 2,
      name: "Data Scientist",
      icon: <FaDatabase className="text-[#FF6F61]" />,
      src: "/3.png",
    },
    {
      id: 3,
      name: "Product Manager",
      icon: <FaUserCog className="text-[#4CAF50]" />,
      src: "/4.png",
    },
    {
      id: 4,
      name: "Software Engineer",
      icon: <FaLaptop className="text-[#795548]" />,
      src: "/5.png",
    },
    {
      id: 5,
      name: "Sales",
      icon: <FaSuitcase className="text-[#FF9800]" />,
      src: "/6.png",
    },
    {
      id: 6,
      name: "Teacher",
      icon: <FaPencilRuler className="text-[#3F51B5]" />,
      src: "/7.png",
    },
    {
      id: 7,
      name: "Engineer",
      icon: <FaCogs className="text-[#9C27B0]" />,
      src: "/8.png",
    },
    {
      id: 8,
      name: "Accounting",
      icon: <FaRegFolderOpen className="text-[#009688]" />,
      src: "/9.png",
    },
    {
      id: 9,
      name: "Designer",
      icon: <FaPalette className="text-[#E91E63]" />,
      src: "/10.png",
    },
    {
      id: 10,
      name: "Marketing",
      icon: <FaStore className="text-[#FF5722]" />,
      src: "/11.png",
    },
  ];

  const AllTemplates = [
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate1",
      src: "/3.png",
      alt: "/3.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate2",
      src: "/4.png",
      alt: "/4.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate3",
      src: "/newResume1.png",
      alt: "/newResume1.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate4",
      src: "/6.png",
      alt: "/6.png",
      type: templateType.free,
    },
    {
      name: "AllTempalte5",
      src: "/resume-temp-example.png",
      alt: "/resume-temp-example.png",
      type: templateType.free,
    },
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "/Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate7",
      src: "/4.png",
      alt: "/4.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate8",
      src: "/5.png",
      alt: "/5.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate9",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.premium,
    },
  ];

  const SimpleTemplates = [
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate1",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate2",
      src: "/17.png",
      alt: "/17.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate3",
      src: "/newResume1.png",
      alt: "/newResume1.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate4",
      src: "/11.png",
      alt: "/11.png",
      type: templateType.free,
    },
    {
      name: "AllTempalte5",
      src: "/resume-temp-example.png",
      alt: "/resume-temp-example.png",
      type: templateType.free,
    },
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "/Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate7",
      src: "/4.png",
      alt: "/4.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate8",
      src: "/5.png",
      alt: "/5.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate9",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.premium,
    },
  ];

  const ATSTemplates = [
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate1",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate2",
      src: "/17.png",
      alt: "/17.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate3",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate4",
      src: "/11.png",
      alt: "/11.png",
      type: templateType.free,
    },
    {
      name: "AllTempalte5",
      src: "/resume-temp-example.png",
      alt: "/resume-temp-example.png",
      type: templateType.free,
    },
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "/Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate7",
      src: "/17.png",
      alt: "/17.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate8",
      src: "/16.png",
      alt: "/16.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate9",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.premium,
    },
  ];

  const DesignerTemplates = [
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate1",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate2",
      src: "/17.png",
      alt: "/17.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate3",
      src: "/newResume1.png",
      alt: "/newResume1.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate4",
      src: "/11.png",
      alt: "/11.png",
      type: templateType.free,
    },
    {
      name: "AllTempalte5",
      src: "/9.png",
      alt: "/9.png",
      type: templateType.free,
    },
    {
      name: "Template3",
      src: "/8.png",
      alt: "/8.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate7",
      src: "/6.png",
      alt: "/6.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate8",
      src: "/5.png",
      alt: "/5.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate9",
      src: "/7.png",
      alt: "/7.png",
      type: templateType.premium,
    },
  ];

  const ProfessionalTemplates = [
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate1",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate2",
      src: "/17.png",
      alt: "/17.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate3",
      src: "/newResume1.png",
      alt: "/newResume1.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate4",
      src: "/11.png",
      alt: "/11.png",
      type: templateType.free,
    },
    {
      name: "AllTempalte5",
      src: "/resume-temp-example.png",
      alt: "/resume-temp-example.png",
      type: templateType.free,
    },
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "/Template3.png",
      type: templateType.premium,
    },
    {
      name: "AllTemplate7",
      src: "/4.png",
      alt: "/4.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate8",
      src: "/5.png",
      alt: "/5.png",
      type: templateType.free,
    },
    {
      name: "AllTemplate9",
      src: "/15.png",
      alt: "/15.png",
      type: templateType.premium,
    },
  ];

  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  const handleCreateNewCV = async (name) => {
    const { data } = JobResumeSchema.find(job => job.name === name)
    if (!data) return;
    setIsLoading(true)
    const { accessToken } = await GetTokens()
    console.log(accessToken)
    if (!accessToken.value) {
      setIsLoading(false)
      toast("Please login to use this job resume")
      router.push('/login')
      return;
    }
    try {
      const response = await createNewJobProfileResume(accessToken.value, data)
      if (response.status === 201) {
        replaceResumeData(response.data.data)
        router.push('/builder')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <>
      <div className="bg-gradient-to-b from-white to-[#2C98CA33]">
        <div className="rounded-t-xl p-6 shadow-xl">
          <div className="tabs_heading">
            <h2 className="2xl:text-6xl lg:text-5xl text-3xl font-bold mt-5 tracking-tighter text-gray-900 text-center">
              Discover CV that fits your job role
            </h2>
            <p className="w-1/2 mx-auto text-center my-4">
              Explore unlimited possibilities with the power of a perfectly
              crafted CV by creating one that aligns with your Professional
              Profile, employing our customised Curriculum Vitae templates.
            </p>
          </div>
          <Tabs className="max-w-5xl mx-auto py-5" defaultValue="Business Analyst">
            <div className="grid grid-cols-2 place-items-center">
              <div className="tabs_main">
                <TabsList className="mb-4 flex w-full justify-start flex-wrap py-10 h-auto">
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
                <Tabs className="max-w-5xl mx-auto py-5" defaultValue="Business Analyst">
                  <div className="grid grid-cols-2 place-items-around items-center">
                    <div className="tabs_main">
                      <TabsList className=" flex w-full justify-start flex-wrap py-10 h-auto gap-4">
                        {TabsHeader?.map((item, index) => (
                          <TabsContent value={item?.name} key={index}>
                            <div className="group relative">
                              <Tilt options={defaultOptions} style={{ height: 500, width: 350 }}>
                                <Image
                                  src={item.src}
                                  key={index}
                                  width={400}
                                  height={400}
                                  alt={item.name}
                                  className="border-4 rounded-md border-gray-300 bg-gray-300 p-4"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-100 disabled:bg-[#82cdf0]" disabled={isLoading} onClick={() => handleCreateNewCV(item.name)}>
                                    {
                                      isLoading ? "Loading..." :
                                        "Try Now"
                                    }
                                  </Button>
                                </div>
                              </Tilt>
                            </div>
                          </TabsContent>
                        ))}
                      </TabsList>
                    </div>
                  </div>
                </Tabs>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default TabResume;
