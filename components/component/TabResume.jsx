import React, { useState, useEffect } from "react";
import {
  FaRegFolderOpen,
  FaDatabase,
  FaLaptop,
  FaPalette,
  FaPython,
  FaSuitcase,
} from "react-icons/fa6";
import Image from "next/image";
import { Button } from "../ui/button";
import { FaPencilRuler, FaUsersCog } from "react-icons/fa";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "../ui/tabs";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/app/store/ResumeStore";
import { JobResumeSchema } from "@/lib/schema/JobResume/JobResumeSchema";
import { GetTokens } from "@/app/actions";
import { toast } from "react-toastify";
import Link from "next/link";
import { MdOutlineReadMore } from "react-icons/md";
import axios from "axios";

export default function TabResume() {
  const [loading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const replaceResumeData = useResumeStore((state) => state.replaceResumeData);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Business Analyst");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const TabsHeader = [
    {
      id: 1,
      name: "Business Analyst",
      icon: <FaPython className='text-[#3776AB]' />,
      src: "/Template20-1.png",
    },
    {
      id: 2,
      name: "Data Scientist",
      icon: <FaDatabase className='text-[#FF6F61]' />,
      src: "/Template19-(new).png",
    },
    {
      id: 3,
      name: "Product Manager",
      icon: <FaUsersCog className='text-[#4CAF50]' />,
      src: "/Template18-1.png",
    },
    {
      id: 4,
      name: "Software Engineer",
      icon: <FaLaptop className='text-[#795548]' />,
      src: "/Template14-1.png",
    },
    {
      id: 5,
      name: "Sales",
      icon: <FaSuitcase className='text-[#FF9800]' />,
      src: "/Template17-1.png",
    },
    {
      id: 6,
      name: "Teacher",
      icon: <FaPencilRuler className='text-[#3F51B5]' />,
      src: "/Template12-1.png",
    },
    {
      id: 8,
      name: "Accounting",
      icon: <FaRegFolderOpen className='text-[#009688]' />,
      src: "/Template15-1.png",
    },
    {
      id: 9,
      name: "Designer",
      icon: <FaPalette className='text-[#E91E63]' />,
      src: "/Template-design.png",
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
      const response = await axios.post('/api/createNewJobProfileResume', data, {
        headers: {
          Authorization: `Bearer ${accessToken?.value}`
        }
      });
      if (response.status === 201) {
        replaceResumeData(response.data.data);
        router.push("/resume-builder");
      }
    } catch (error) {
      toast.error("Error creating new CV");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedTab(event.target.value);
  };

  const selectedIcon = TabsHeader.find((tab) => tab.name === selectedTab)?.icon;

  return (
    <>
      <div className='bg-gradient-to-b from-[#e4f5fc] to-[white]'>
        <div className='rounded-t-xl p-6'>
          <div className='tabs_heading'>
            <h5 className='2xl:text-6xl lg:text-5xl text-3xl font-bold mt-5 text-black text-center'>
              Discover CVs that fit your Dream Job
            </h5>
            <p className='lg:w-1/2 w-full mx-auto lg:text-xl text-sm text-center my-4 text-[#7C7C7C]'>
              Start your journey with Genies Career Hub CV Maker and unlock the
              door to a world where your talents are valued and your career
              dreams become a reality with a personalised and perfectly tailored
              resume.
            </p>
          </div>
          {isMobile ? (
            <div className='max-w-5xl mx-auto py-5'>
              <div className='relative flex items-center px-8 mb-5'>
                <div className='text-3xl mr-3'>{selectedIcon}</div>
                <div className='relative w-full'>
                  <select
                    className='w-full p-3 bg-white border border-gray-300 rounded-md text-xl font-semibold text-blue-950 focus:outline-none focus:ring focus:border-blue-500 appearance-none'
                    value={selectedTab}
                    onChange={handleSelectChange}
                    style={{ WebkitAppearance: "none", MozAppearance: "none" }}>
                    {TabsHeader.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700'>
                    <svg
                      className='fill-current h-5 w-5'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'>
                      <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                    </svg>
                  </div>
                </div>
              </div>
              {TabsHeader.map(
                (item) =>
                  item.name === selectedTab && (
                    <div key={item.id} className='py-5'>
                      <div className='relative flex justify-center overflow-hidden group'>
                        <div className='relative w-full max-w-xs p-3 flex items-center justify-center bg-gradient-to-t from-[#8181b9] to-[#dcecff] rounded-md'>
                          {isImageLoading && (
                            <div className='absolute inset-0 flex items-center justify-center bg-[#0EA5E9]'>
                              <ImSpinner8 className='animate-spin text-black text-2xl' />
                              <span className='mx-2'>Loading...</span>
                            </div>
                          )}
                          <Image priority
                            src={item.src}
                            width={800}
                            height={400}
                            alt={item.name}
                            className={`object-fit rounded-md w-full ${isImageLoading ? "hidden" : ""
                              }`}
                            onLoad={() => setIsImageLoading(false)}
                            placeholder='blur'
                            blurDataURL={`data:image/svg+xml;base64,${btoa(
                              '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="100%" height="100%" fill="#f0f0f0"/></svg>'
                            )}`}
                          />
                        </div>
                        <div className='absolute inset-0 flex items-center justify-center bg-opacity-50 opacity-100 transition-opacity duration-300 sm:opacity-100 sm:group-hover:opacity-100'>
                          <Button
                            className='inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-100 disabled:bg-[#82cdf0]'
                            onClick={() => handleCreateCV(item.name)}
                            disabled={loading}>
                            {loading ? (
                              <>
                                <ImSpinner8 className='animate-spin mr-2' />
                                Loading
                              </>
                            ) : (
                              "Try Now"
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className='mt-4 text-center'>
                        <Link href='/resume'>
                          <span className='text-[18px]  font-bold hover:underline'>
                            <MdOutlineReadMore className='inline-flex text-3xl text-orange-400 mr-2 ' />
                            View More
                          </span>
                        </Link>
                      </div>
                    </div>

                  )
              )}
            </div>
          ) : (
            <Tabs
              className='max-w-5xl mx-auto py-5'
              defaultValue='Business Analyst'>
              <div className='grid lg:grid-cols-2 grid-cols-1 place-items-around items-center '>
                <div className='tabs_main'>
                  <TabsList className='flex flex-col w-full justify-start flex-wrap py-10 h-auto gap-4'>
                    {TabsHeader?.map((item, index) => (
                      <TabsTrigger value={item?.name} key={index}>
                        <div className='tabs_header flex gap-2 items-center justify-start lg:text-xl text-sm'>
                          {item?.icon}
                          {item?.name}
                        </div>
                      </TabsTrigger>
                    ))}
                    <div className='view_more pl-6 pt-2'>
                      <Link href='/resume'>
                        <span className='text-[18px] animate-pulse font-bold'>
                          <MdOutlineReadMore className='inline-flex text-3xl text-orange-400 mr-1' />{" "}
                          View More
                        </span>
                      </Link>
                    </div>
                  </TabsList>
                </div>
                <div className='tabs_content'>
                  {TabsHeader.length > 0 &&
                    TabsHeader.map((item, index) => (
                      <TabsContent value={item?.name} key={index}>
                        <div className='relative flex justify-center overflow-hidden group p-4'>
                          <div className='relative w-full max-w-xs p-3 flex items-center justify-center bg-gradient-to-t from-[#8181b9] to-[#dcecff] rounded-md'>
                            {isImageLoading && (
                              <div className='absolute inset-0 flex items-center justify-center bg-[#0EA5E9]'>
                                <ImSpinner8 className='animate-spin text-black text-2xl' />
                                <span className='mx-2'>Loading...</span>
                              </div>
                            )}
                            <Image priority
                              src={item.src}
                              width={800}
                              height={400}
                              alt={item.name}
                              className={`object-fit rounded-md w-full ${isImageLoading ? "hidden" : ""
                                }`}
                              onLoad={() =>
                                setIsImageLoading(false)
                              }
                              placeholder='blur'
                              blurDataURL={`data:image/svg+xml;base64,${btoa(
                                '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="100%" height="100%" fill="#f0f0f0"/></svg>'
                              )}`}
                            />
                          </div>
                          <div className='absolute inset-0 flex items-center justify-center bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                            <Button
                              className='inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-100 disabled:bg-[#82cdf0]'
                              onClick={() => handleCreateCV(item.name)}
                              disabled={loading}>
                              {loading ? (
                                <>
                                  <ImSpinner8 className='animate-spin mr-2' />
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
          )}
        </div>
      </div>
    </>
  );
}
