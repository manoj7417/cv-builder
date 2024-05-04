import Link from "next/link";
import NewNavbar from "../../ui/newNav";
import Slider from "../../../components/component/Slider";
import { ServiceSection } from "@/components/component/service-section";
import Footer from "../../ui/newFooter";
import Navbar from "../../ui/newNav";
export default function Homepage() {
  return (
    <>
      <Navbar />
      <section
        className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#E0F2FE] to-[#dcecff]"
        style={{
          backgroundImage: "url('/banner-bg.svg')",
          backgroundPosition: "center",
        }}
      >
        <div className="container px-4 md:px-6 lg:pt-0 pt-20">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4 lg:px-24 px-5">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-5xl xl:text-6xl/none">
                  Unlock Your Career Potential with Career Genie
                </h1>
                <p className="max-w-[600px] text-gray-700 md:text-xl">
                  Our AI-powered resume builder helps you craft a standout
                  resume and land your dream job.
                </p>
              </div>
              <div className="flex lg:flex-row  flex-col gap-2 min-[400px]:flex-row ">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                  href="/resume-dashboard"
                >
                  Resume Builder
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-bold text-blue-900 font-medium shadow transition-colors border-2 border-transparent hover:border-blue-900"
                  href="/resumeAnalyzer-dashboard"
                >
                  Resume Analyzer
                </Link>
              </div>
            </div>
            <img
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              height="550"
              src="https://enhancv.com/_next/static/images/resume3-fdd7e3eafb8f16ef8e0aa6f5ef523dca.webp"
              width="550"
            />
          </div>
        </div>
      </section>
      <Slider />
      <ServiceSection />
    </>
  );
}
