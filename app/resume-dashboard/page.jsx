"use client";
import Link from "next/link";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaBorderAll } from "react-icons/fa";
import { PiFolderSimpleUser } from "react-icons/pi";
import { MdQueryStats } from "react-icons/md";
import { IoShirt } from "react-icons/io5";
import { RiShirtFill } from "react-icons/ri";
import { Carousel } from "@/components/ui/carousel";
import { templateType } from "@/components/component/Slider";
import dynamic from "next/dynamic";
import NewResumeHeader from "../Layout/NewResumeHeader";
import Header from "../Layout/Header";
import { useUserStore } from "../store/UserStore";
import WorkTogether from "@/components/component/WorkTogether";

const ImageCarousel = dynamic(
  () => import("@/components/component/ImageCarousel"),
  { ssr: false }
);

const AllTemplates = [
  [
    {
      name: "Template1",
      src: "/Template1.png",
      alt: "Template1.png",
      type: templateType.premium,
    },
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "/Template3.png",
      type: templateType.free,
    },
    {
      name: "Template4",
      src: "/Template4.png",
      alt: "/Template4.png",
      type: templateType.free,
    },
    {
      name: "Template5",
      src: "/Template5.png",
      alt: "/Template5.png",
      type: templateType.premium,
    },
    {
      name: "Template6",
      src: "/Template6-1.png",
      alt: "/Template6-1.png",
      type: templateType.free,
    },
  ],
  [
    {
      name: "Template7",
      src: "/Template7-1.png",
      alt: "/Template7-1.png",
      type: templateType.free,
    },
    {
      name: "Template8",
      src: "/Template8.png",
      alt: "/Template8.png",
      type: templateType.premium,
    },
    {
      name: "Template9",
      src: "/Template9.png",
      alt: "/Template9.png",
      type: templateType.free,
    },
    {
      name: "Template10",
      src: "/Template10-1.png",
      alt: "/Template10-1.png",
      type: templateType.free,
    },
    {
      name: "Template11",
      src: "/Template11-1.png",
      alt: "/Template11-1.png",
      type: templateType.premium,
    },
  ],
  [
    {
      name: "Template12",
      src: "/Template12-1.png",
      alt: "/Template.png",
      type: templateType.free,
    },
    {
      name: "Template13",
      src: "/Template13-1.png",
      alt: "/Template13-1.png",
      type: templateType.free,
    },
    {
      name: "Template14",
      src: "/Template14-1.png",
      alt: "/Template14-1.png",
      type: templateType.free,
    },
    {
      name: "Template15",
      src: "/Template15-1.png",
      alt: "/Template15-1.png",
      type: templateType.free,
    },
    {
      name: "Template16",
      src: "/Template16-1.png",
      alt: "/Template16-1.png",
      type: templateType.free,
    },
  ],
  [
    {
      name: "Template17",
      src: "/Template17-1.png",
      alt: "/Template17-1.png",
      type: templateType.free,
    },
    {
      name: "Template18",
      src: "/Template18-1.png",
      alt: "/Template18-1.png",
      type: templateType.free,
    },
    {
      name: "Template19",
      src: "/Template19-1.png",
      alt: "/Template19-1.png",
      type: templateType.free,
    },
    {
      name: "Template20",
      src: "/Template20-1.png",
      alt: "/Template20-1.png",
      type: templateType.free,
    },
    {
      name: "Template21",
      src: "/Template21.png",
      alt: "/Template21.png",
      type: templateType.free,
    },
  ],
];

const SimpleTemplates = [
  [
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "Template3.png",
      type: templateType.premium,
    },
    {
      name: "Template4",
      src: "/Template4.png",
      alt: "/Template4.png",
      type: templateType.free,
    },
    {
      name: "Template5",
      src: "/Template5.png",
      alt: "/Template5.png",
      type: templateType.free,
    },
    {
      name: "Template6",
      src: "/Template6-1.png",
      alt: "/Template6-1.png",
      type: templateType.premium,
    },
    {
      name: "Template7",
      src: "/Template7-1.png",
      alt: "/Template7-1.png",
      type: templateType.free,
    },
  ],
  [
    {
      name: "Template8",
      src: "/Template8.png",
      alt: "/Template8.png",
      type: templateType.free,
    },
    {
      name: "Template9",
      src: "/Template9.png",
      alt: "/Template9.png",
      type: templateType.premium,
    },
    {
      name: "Template12",
      src: "/Template12-1.png",
      alt: "/Template12-1.png",
      type: templateType.free,
    },
    {
      name: "Template22",
      src: "/Template22-1.png",
      alt: "/Template22-1.png",
      type: templateType.free,
    },
    {
      name: "Template15",
      src: "/Template15-1.png",
      alt: "/Template15-1.png",
      type: templateType.premium,
    },
  ],
];

const ATSTemplates = [
  [
    {
      name: "Template8",
      src: "/Template8.png",
      alt: "/Template8.png",
      type: templateType.free,
    },
    {
      name: "Template9",
      src: "/Template9.png",
      alt: "/Template9.png",
      type: templateType.premium,
    },
    {
      name: "Template12",
      src: "/Template12-1.png",
      alt: "/Template12-1.png",
      type: templateType.free,
    },
    {
      name: "Template22",
      src: "/Template22-1.png",
      alt: "/Template22-1.png",
      type: templateType.free,
    },
    {
      name: "Template15",
      src: "/Template15-1.png",
      alt: "/Template15-1.png",
      type: templateType.premium,
    },
  ],
  [
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "Template3.png",
      type: templateType.premium,
    },
    {
      name: "Template4",
      src: "/Template4.png",
      alt: "/Template4.png",
      type: templateType.free,
    },
    {
      name: "Template5",
      src: "/Template5.png",
      alt: "/Template5.png",
      type: templateType.free,
    },
    {
      name: "Template6",
      src: "/Template6-1.png",
      alt: "/Template6-1.png",
      type: templateType.premium,
    },
    {
      name: "Template7",
      src: "/Template7-1.png",
      alt: "/Template7-1.png",
      type: templateType.free,
    },
  ],
];

const DesignerTemplates = [
  [
    {
      name: "Template18",
      src: "/Template18-1.png",
      alt: "Template18-1.png",
      type: templateType.premium,
    },
    {
      name: "Template20",
      src: "/Template20-1.png",
      alt: "/Template20-1.png",
      type: templateType.free,
    },
    {
      name: "Template21",
      src: "/Template21.png",
      alt: "/Template21.png",
      type: templateType.free,
    },
    {
      name: "Template23",
      src: "/Template23.png",
      alt: "/Template23.png",
      type: templateType.premium,
    },
    {
      name: "Template24",
      src: "/Template24.png",
      alt: "/Template24.png",
      type: templateType.free,
    },
  ],
  [
    {
      name: "Template25",
      src: "/Template25.png",
      alt: "/Template25.png",
      type: templateType.free,
    },
    {
      name: "Template26",
      src: "/Template26.png",
      alt: "/Template26.png",
      type: templateType.premium,
    },
    {
      name: "Template19",
      src: "/Template19-1.png",
      alt: "/Template19-1.png",
      type: templateType.free,
    },
    {
      name: "Template17",
      src: "/Template17-1.png",
      alt: "/Template17.png",
      type: templateType.free,
    },
    {
      name: "Template13",
      src: "/Template13-1.png",
      alt: "/Template13-1.png",
      type: templateType.premium,
    },
  ],
];

const ProfessionalTemplates = [
  [
    {
      name: "Template1",
      src: "/Template1.png",
      alt: "Template1.png",
      type: templateType.premium,
    },
    {
      name: "Template14",
      src: "/Template14-1.png",
      alt: "/Template14-1.png",
      type: templateType.free,
    },
    {
      name: "Template11",
      src: "/Template11-1.png",
      alt: "/Template11-1.png",
      type: templateType.free,
    },
    {
      name: "Template16",
      src: "/Template16-1.png",
      alt: "/Template16-1.png",
      type: templateType.premium,
    },
    {
      name: "Template22",
      src: "/Template22-1.png",
      alt: "/Template22-1.png",
      type: templateType.free,
    },
  ],
  [
    {
      name: "Template20",
      src: "/Template20-1.png",
      alt: "/Template20-1.png",
      type: templateType.free,
    },
    {
      name: "Template3",
      src: "/Template3.png",
      alt: "/Template3.png",
      type: templateType.premium,
    },
    {
      name: "Template18",
      src: "/Template18-1.png",
      alt: "/Template18-1.png",
      type: templateType.free,
    },
    {
      name: "Template15",
      src: "/Template15-1.png",
      alt: "/Template15-1.png",
      type: templateType.free,
    },
    {
      name: "Template12",
      src: "/Template12-1.png",
      alt: "/Template12-1.png",
      type: templateType.premium,
    },
  ],
];

export default function DashboardIdea() {
  const userState = useUserStore((state) => state.userState);

  return (
    <>
      {userState?.isAuthenticated ? <NewResumeHeader /> : <Header />}
      <main>
        <section className="w-full flex flex-col items-center justify-center bg-gradient-to-t from-[#a7d9ee] to-[white]">
          <div className="container w-full h-full resume-dashboard">
            <div className="flex 2lg:px-24 px-5 justify-between">
              <div className="space-y-2 2xl:mt-40 lg:mt-32 mt-20">
                <h1 className="text-3xl font-bold mb-5 text-gray-900 sm:text-5xl 2xl:text-6xl">
                  Craft the <span className="text-[#2C98CA]">Perfect CV </span>{" "}
                  for Your Dream Job
                </h1>
                <p className="text-gray-700 text-lg pe-10">
                  Created by Professionals and Industry Experts from all across
                  the globe and integrating Artificial Intelligence, we bring
                  forward Resume Template options that are custom-tailored to
                  the job you are applying for, to ensure that your CV gets
                  through every Application Tracking Software ATS CV Checker.
                </p>
                <div className="flex items-center space-x-4">
                  <Button className="text-base text-white bg-blue-900 hover:bg-blue-700 rounded-md px-5 mt-5 py-3">
                    <Link href="/user-history">Create CV Now</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="/resume.png"
                className="w-50 h-50 px-7 mt-20 pt-7 rounded-t-3xl lg:block hidden"
                alt="@shadcn"
                width={600}
                height={100}
                priority
              />
            </div>
          </div>
          <div className="w-full bg-gradient-to-b from-[#edf4f8] to-[white]">
            <div className="rounded-t-xl border-t-8 border-blue-900 p-6">
              <h2 className="2xl:text-6xl lg:text-5xl text-3xl font-bold mt-5 text-gray-900 text-center">
                Choose From Our Detailed Templates Options
              </h2>
              <Tabs className="w-full py-5" defaultValue="all">
                <TabsList className="mb-4 flex w-full justify-center flex-wrap py-10 h-auto">
                  <TabsTrigger value="all">
                    <FaBorderAll className="text-pink-600 h-8 w-8 me-3" />
                    All templates
                  </TabsTrigger>
                  <TabsTrigger value="simple">
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
                  </TabsTrigger>
                </TabsList>
                <TabsContent className="py-7" value="all">
                  <Carousel>
                    {AllTemplates.map((carousel, index) => (
                      <ImageCarousel data={carousel} key={index} />
                    ))}
                  </Carousel>
                </TabsContent>
                <TabsContent value="simple">
                  <Carousel>
                    {SimpleTemplates?.map((carousel, index) => (
                      <ImageCarousel data={carousel} key={index} />
                    ))}
                  </Carousel>
                </TabsContent>
                <TabsContent value="ats">
                  <Carousel>
                    {ATSTemplates?.map((carousel, index) => (
                      <ImageCarousel data={carousel} key={index} />
                    ))}
                  </Carousel>
                </TabsContent>
                <TabsContent value="designer">
                  <Carousel>
                    {DesignerTemplates?.map((carousel, index) => (
                      <ImageCarousel data={carousel} key={index} />
                    ))}
                  </Carousel>
                </TabsContent>
                <TabsContent value="professional">
                  <Carousel>
                    {ProfessionalTemplates?.map((carousel, index) => (
                      <ImageCarousel data={carousel} key={index} />
                    ))}
                  </Carousel>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        <WorkTogether />
        {/* <Footer /> */}
      </main>
    </>
  );
}
