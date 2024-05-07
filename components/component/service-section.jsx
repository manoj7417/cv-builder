import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GiMagicLamp } from "react-icons/gi";

export function ServiceSection() {
  return (
    <div className="flex flex-col min-h-[100dvh] ">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-blue-100 bg-opacity-10  scroll-mt-20">
          <div className=" px-4 md:px-6 mb-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-2xl bg-gradient-to-b from-[#8181b9] to-[#131350] hover:bg-blue-900 text-white  px-5 py-1 mb-5">
                  CV Curator
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-950">
                  A Step Closer to Your Dream Job!
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                Get your CV engineered in minutes for a rapid job application that is professionally prolific and lands you on the job you always dreamt of.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6 mb-10">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-950">
                        CV Curator
                      </h3>
                      <p className="text-gray-500 ">
                        Looking for an impressive Resume Template? Find the best
                        Artificial Intelligence-Based Services in CV Building
                        here!
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-950">
                        Analyser
                      </h3>
                      <p className="text-gray-500 ">
                        Not Sure if Your Resume is Perfect for the Job you are
                        applying for? Get your CV analysed by Industry Experts
                        now!
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-950">
                        Genie
                      </h3>
                      <p className="text-gray-500 ">
                      Simplify your approach to Job Applications with an AI-based CV Builder that does all that you want while you sit back and relax!
                      </p>
                    </div>
                  </li>
                </ul>
                <div>
                  <button className=" px-7 py-2 rounded-md text-lg text-white bg-blue-900 hover:bg-blue-700">
                    <a href="/resume-dashboard">Curate Now</a>
                  </button>
                </div>
              </div>
              <div className="w-[600px] h-auto shadow-lg rounded-md">
                <video
                  width="1000"
                  height="1000"
                  autoPlay
                  muted
                  loop
                  preload="none"
                >
                  <source src="/builder.mp4" type="video/mp4" />
                  <track
                    src="/path/to/captions.vtt"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2"></div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              {/* <img
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-first"
                height="310"
                src="/new_section3.png"
                width="550"
              /> */}
              <div className="w-[550px] h-auto shadow-lg rounded-md pr-10">
                <video
                  width="1000"
                  height="1000"
                  autoPlay
                  muted
                  loop
                  preload="none"
                >
                  <source src="/aigenie.mp4" type="video/mp4" />
                  <track
                    src="/path/to/captions.vtt"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="flex flex-col justify-center space-y-4 ps-20">
                <div className="px-0 flex items-center rounded-2xl text-center py-1 ">
                  <h2 className="text-4xl font-bold text-blue-900">
                    Career Genie
                  </h2>
                  <GiMagicLamp className="h-14 w-14 ms-5 text-blue-900" />
                </div>
                <ul className="grid gap-6 mb-5">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-950">
                        Career Guidance
                      </h3>
                      <p className="text-gray-500 ">
                        Genie will help you find the right job and provide you
                        with the best career advice and builds your resume.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-950">
                        Solve your problems
                      </h3>
                      <p className="text-gray-500 ">
                        Not sure how to ask for a raise, looking for your next
                        job, or feeling stuck in your current role and unsure
                        about what to do next? Genie is here to guide you
                        through these challenges and help you navigate your
                        career journey.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-950">
                        Grant your wishes
                      </h3>
                      <p className="text-gray-500 ">
                        Wish to get a promotion or a raise at your next job, or
                        just want to make a change in your current role? Genie
                        can help you with these requests and grant your wishes.
                      </p>
                    </div>
                  </li>
                </ul>
                <div>
                  <button className="items-center flex px-7 py-2 rounded-md text-base text-white bg-blue-900 hover:bg-blue-700">
                    <a className="flex items-center" href="/genie-dashboard">
                      Connect with Genie{" "}
                      <GiMagicLamp className="h-8 w-8 ms-5 text-white" />
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="w-full py-12 md:py-24 lg:py-32 border-t lg:px-20  scroll-mt-20"
          style={{
            backgroundImage: "url('/banner-bg.svg')",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Get Matched to the Job that is Right for You!
              </h2>
              <p className="max-w-[600px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
              Find the perfect profession and get matched with the best job profile with the AI-Based Job Assistance Programme.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                href="#"
              >
                Contact Expert
              </Link>
              {/* <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50    "
                href="#"
              >
                Learn more
              </Link> */}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t  bg-opacity-25 scroll-mt-20">
          <div className=" grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Find the Exact Job you Need with Perfectly Crafted CVs
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                Subscribe to our newsletter and get latest updates.
                
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2 mb-5">
                <input
                  className="max-w-lg flex-1 px-3 bg-blue-900 bg-opacity-10 rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  placeholder="Enter your email"
                  type="email"
                />
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                  href="#"
                >
                  Sign up
                </Link>
              </form>
              <p className="text-xs text-gray-500">
                Sign up to get notified when we launch.
                <Link className="underline underline-offset-2" href="#">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
