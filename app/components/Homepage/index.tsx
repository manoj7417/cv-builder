import Link from "next/link";
import NewNavbar from "../../ui/newNav";
import Slider from "../../../components/component/Slider";
import { ServiceSection } from "@/components/component/service-section";
import Footer from "../../ui/newFooter";
import Navbar from "../../ui/newNav";
import { useState } from "react";
export default function Homepage() {
  const [hovered, setHovered] = useState(false);

  const toggleHover = () => {
    setHovered(!hovered);
  };

  return (
    <>
      {/* <Navbar /> */}
      <section
        className="flex items-center justify-center w-full h-screen py-12 md:py-24 lg:py-32 bg-white"
        // style={{
        //   backgroundImage: "url('/banner-bg.svg')",
        //   backgroundPosition: "center",
        // }}
      >
        <div className="container px-4 md:px-6 lg:pt-0 pt-20">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4 lg:px-20 px-5">
              <div className="space-y-2">
                <h1 className="2xl:text-6xl lg:text-4xl md:text-4xl font-bold tracking-tighter text-gray-900">
                  WHERE
                  <span className="bg-gradient-to-r from-cyan-600 to-blue-900 bg-clip-text text-transparent 2xl:ml-3 lg:ml-2">
                    RIGHT JOB
                  </span>{" "}
                  MEETS
                  <span className="bg-gradient-to-r from-cyan-600 to-blue-900 bg-clip-text text-transparent 2xl:ml-3 lg:ml-2">
                    RIGHT TALENT!
                  </span>
                </h1>
                <p className="max-w-[600px] text-gray-700 2xl:text-xl lg:text-base">
                Enriching Professional Experiences and Building Success Stories that Resonate with Dreams.
                </p>
              </div>
              <div className="flex lg:flex-row  flex-col gap-2 min-[400px]:flex-row ">
                {/* <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-900 px-8 text-sm font-medium text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                  href="/resume-dashboard"
                >
                  Resume Builder
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-bold text-blue-900 font-medium shadow transition-colors border-2 border-transparent hover:border-blue-900 mx-2"
                  href="/resumeAnalyzer-dashboard"
                >
                  Resume Analyzer
                </Link> */}
                <Link
                  className={`inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 ${
                    hovered
                      ? "bg-white text-blue-900 border-2 border-transparent"
                      : "bg-blue-900 text-white"
                  }`}
                  href="/resume-dashboard"
                  onMouseEnter={toggleHover}
                >
                  Resume Builder
                </Link>
                <Link
                  className={`inline-flex h-10 items-center justify-center rounded-md px-8 text-bold text-blue-900 font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 ${
                    hovered
                      ? "bg-blue-900 text-white border-2 border-transparent"
                      : "bg-white border-2"
                  }`}
                  href="/resumeAnalyzer-dashboard"
                  onMouseEnter={toggleHover}
                >
                  Resume Analyzer
                </Link>
              </div>
            </div>
            {/* <img
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              height="550"
              src="https://enhancv.com/_next/static/images/resume3-fdd7e3eafb8f16ef8e0aa6f5ef523dca.webp"
              width="550"
            /> */}
            <div className="FoldImageAnimated_card lg:h-[60vh] 2xl:h-[55vh]">
              <div className="FoldImageAnimated_content">
                <div className="FoldImageAnimated_front">
                  <div className="relative">
                    <img
                      alt="Resume Example 3"
                      src="/resume11.png"
                      width={550}
                      height={550}
                      decoding="async"
                      data-nimg={1}
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
                      style={{
                        color: "transparent",
                        maxWidth: "100%",
                        height: "500px",
                        objectFit: "contain",
                        zIndex: 1,
                      }}
                    />
                  </div>
                </div>
                <div className="FoldImageAnimated_back">
                  <div className="FoldImageAnimated_resumeFourContainer">
                    <div className="FoldImageAnimated_resumeFour">
                      <img
                        alt="Resume Example 4"
                        src="/resum12.png"
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
                        width={550}
                        height={550}
                        decoding="async"
                        data-nimg={1}
                        loading="lazy"
                        style={{
                          color: "transparent",
                          maxWidth: "100%",
                          height: "500px",
                          objectFit: "contain",
                          zIndex: 1,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Slider />
      <ServiceSection />
    </>
  );
}
