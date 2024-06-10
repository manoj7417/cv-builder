import React from "react";
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

const TabResume = () => {
  const TabsHeader = [
    {
      id: 1,
      name: "Business Analyst",
      icon: <FaPython />,
    },
    {
      id: 2,
      name: "Data Scientist",
      icon: <FaDatabase />,
    },
    {
      id: 3,
      name: "Product Manager",
      icon: <FaUserCog />,
    },
    {
      id: 4,
      name: "Software Engineer",
      icon: <FaLaptop />,
    },
    {
      id: 5,
      name: "Sales",
      icon: <FaSuitcase />,
    },
    {
      id: 6,
      name: "Teacher",
      icon: <FaPencilRuler />,
    },
    {
      id: 7,
      name: "Engineer",
      icon: <FaCogs />,
    },
    {
      id: 8,
      name: "Accounting",
      icon: <FaRegFolderOpen />,
    },
    {
      id: 9,
      name: "Designer",
      icon: <FaPalette />,
    },
    {
      id: 10,
      name: "Marketing",
      icon: <FaStore />,
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

  return (
    <>
      <div className="bg-white">
        <div className="rounded-t-xl border-t-8 border-blue-500 p-6 shadow-xl">
          <div className="tabs_heading">
            <h2 className="2xl:text-6xl lg:text-5xl text-3xl font-bold mt-5 tracking-tighter text-gray-900 text-center">
              Discover CV that fits your job role
            </h2>
            <p className="w-1/2 mx-auto text-center my-4">
              Explore unlimited possibilities with the power of a perfectly
              crafted CV by creating one that aligns with your Professional
              Profile, employing our customised Curriculum Vitae templates.{" "}
            </p>
          </div>

          <Tabs className="w-full py-5" defaultValue="all">
            <div className="grid grid-cols-2">
              <div className="tabs_main flex flex-col">
                <TabsList className="mb-4 flex w-full justify-center flex-wrap py-10 h-auto">
                  {TabsHeader?.map((item, index) => (
                    <TabsTrigger value={item?.name} key={index}>
                      <div className="tabs_header flex gap-5 items-center justify-start">
                      {item?.icon}
                      {item?.name}
                      </div>
                    </TabsTrigger>
                  ))}
                  <TabsTrigger value="all">
                    <FaBorderAll className="text-pink-600 h-8 w-8 me-3" />
                    All templates
                  </TabsTrigger>
                  {/* <TabsTrigger value="simple">
                    <PiFolderSimpleUser className="text-blue-700 h-8 w-8 me-3" />
                    Simple
                  </TabsTrigger>
                  <TabsTrigger value="ats">
                    <MdQueryStats className="text-orange-600 h-8 w-8 me-3" />
                    Ats
                  </TabsTrigger>
                  <TabsTrigger value="designer">
                    <IoShirt className="text-green-700 h-8 w-8 me-3" />
                    Designer
                  </TabsTrigger>
                  <TabsTrigger value="professional">
                    <RiShirtFill className="text-red-700 h-8 w-8 me-3" />
                    Professional
                  </TabsTrigger> */}
                </TabsList>
              </div>
              <div className="tabs_content">
                <TabsContent className="py-7" value="all">
                  <div>
                    {AllTemplates.map((item, index) => {
                      return (
                        <Image
                          src={item.src}
                          key={index}
                          width={500}
                          height={500}
                          alt={item.name}
                        />
                      );
                    })}
                  </div>
                </TabsContent>
                <TabsContent value="simple">
                  <div>
                    {SimpleTemplates?.map((item, index) => {
                      return (
                        <Image
                          src={item.src}
                          key={index}
                          width={500}
                          height={500}
                          alt={item.name}
                        />
                      );
                    })}
                  </div>
                </TabsContent>
                <TabsContent value="ats">
                  <div>
                    {ATSTemplates?.map((item, index) => {
                      return (
                        <Image
                          src={item.src}
                          key={index}
                          width={500}
                          height={500}
                          alt={item.name}
                        />
                      );
                    })}
                  </div>
                </TabsContent>
                <TabsContent value="designer">
                  <div>
                    {DesignerTemplates?.map((item, index) => {
                      return (
                        <Image
                          src={item.src}
                          key={index}
                          width={500}
                          height={500}
                          alt={item.name}
                        />
                      );
                    })}
                  </div>
                </TabsContent>
                <TabsContent value="professional">
                  <div>
                    {ProfessionalTemplates?.map((item, index) => {
                      return (
                        <Image
                          src={item.src}
                          key={index}
                          width={500}
                          height={500}
                          alt={item.name}
                        />
                      );
                    })}
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default TabResume;
