"use client";
import CoachSkeltonCard from "@/components/component/CoachSkeltonCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiOutlineCheck } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { GetTokens } from "@/app/actions";
import { useRouter } from "next/navigation";

const CoachPage = () => {
  const [coaches, setAllCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(0);
  const [geoData, setGeoData] = useState(null);
  const [isBuyingProgram, setIsBuyingProgram] = useState(false);
  const [showFullContent, setShowFullContent] = useState({
    bio: false,
    coachingDescription: false,
  });
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [currency, setCurrency] = useState("USD");

  const toggleContent = (type) => {
    setShowFullContent((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleDialogToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMobileToggle = () => {
    setIsMobile((prev) => !prev);
  };

  const fetchAllCoaches = async () => {
    try {
      const response = await axios.get(`/api/getAllCoaches`);
      const data = await response.data;
      //   setAllCoaches(data.coaches);
      const approvedCoaches = data.coaches.filter(
        (coach) => coach.isApproved && coach.approvalStatus === "approved"
      ) .sort((a, b) => {
        const hasProgramsA = a.programs?.length > 0;
        const hasProgramsB = b.programs?.length > 0;
        return hasProgramsB - hasProgramsA;
      })
      setAllCoaches(approvedCoaches);

      if (approvedCoaches.length > 0) {
        setSelectedCoach(approvedCoaches[0]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectCoach = (coach) => {
    setSelectedCoach(coach);
  };

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setGeoData(data);
        setCurrency(data.currency);
      })
      .catch((error) => {
        console.error("Error fetching geo information:", error);
      });
  };

  const handleBuyProgram = async (course) => {
    const { accessToken } = await GetTokens();
    if (!accessToken || !accessToken.value) {
      return router.push(`/login?redirect=/coaches`);
    }
    setIsBuyingProgram(true);
    setIsLoading(true);
    try {
      const url = `${window.location.protocol}//${window.location.hostname}/user-dashboard`;
      const response = await axios.post(
        "/api/buyprogram",
        {
          programId: course._id,
          coachId: course.coachId,
          amount: currency === "INR" ? course.INRrate : currency === "USD" ? course.USDrate : course.amount,
          currency: currency === "INR" ? "INR" : currency === "USD" ? "USD" : "GBP",
          success_url: url,
          cancel_url: window.location.href,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken?.value}`,
          },
        }
      );
      window.location.href = response.data.url;
      setIsLoading(false);
    } catch (error) {
      toast.error("Error buying program");
    } finally {
      setIsBuyingProgram(false);
      setIsLoading(false);
    }
  };

  const handleMobileView = () => {
    setIsMobile(true);
  };

  useEffect(() => {
    fetchAllCoaches();
  }, []);

  useEffect(() => {
    getGeoInfo();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto mt-[150px] mb-10 px-4">
        <div className="coach_main_div w-full flex flex-col lg:flex-row gap-10">
          {/* Coach Selection Section */}
          <div className="coach_card lg:w-[30%] w-full lg:h-screen lg:sticky top-[100px] overflow-y-scroll h-[500px] pr-2">
            <h1 className="text-xl lg:text-2xl font-bold">
              Choose the <span className="text-blue-700">coach</span> who aligns
              best with your <span className="text-blue-700">goals.</span>
            </h1>
            <h2 className="text-sm my-5">
              Explore your top coach recommendations and select the one that
              best fits your needs below.
            </h2>

            <div className="coach_card_inner flex flex-col gap-5">
              {isLoading
                ? Array(4)
                    .fill(0)
                    .map((_, index) => <CoachSkeltonCard key={index} />)
                : coaches?.length > 0 &&
                  coaches
                    .filter(
                      (coach) =>
                        coach.isApproved && coach.approvalStatus === "approved"
                    )
                    .sort((a, b) => {
                      const hasProgramsA = a.programs?.length > 0;
                      const hasProgramsB = b.programs?.length > 0;
                      return hasProgramsB - hasProgramsA;
                    })
                    .map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectCoach(item)}
                        className={`p-2 flex flex-row overflow-hidden items-center rounded shadow-md text-slate-500 shadow-slate-200 cursor-pointer lg:border-none border border-gray-300 ${
                          selectedCoach?._id === item._id ? "bg-blue-50" : ""
                        }`}
                      >
                        <figure className="flex-shrink-0">
                          <img
                            alt={item.imageAlt}
                            src={item.profileImage}
                            className="object-cover w-24 h-24 sm:w-28 sm:h-28 rounded-md"
                          />
                        </figure>
                        <div className="flex-1 p-4 sm:p-6 sm:mx-6 sm:px-0">
                          <header className="flex gap-4">
                            <div>
                              <h3 className="text-base font-medium text-slate-900">
                                {item.name}
                              </h3>
                              <p className="text-xs text-slate-800 break-all">
                                {item?.email}
                              </p>
                              <Button
                                className="lg:hidden bolck px-2 py-1 w-20 h-10 text-xs my-2 cursor-pointer"
                                onClick={handleMobileView}
                              >
                                Book Now
                              </Button>
                            </div>
                          </header>
                        </div>
                      </div>
                    ))}
            </div>
          </div>

          {/* Coach Details Section */}
          <div className="lg:block hidden coach_details lg:w-[70%] w-full bg-blue-100 p-6 sm:p-10">
            {isLoading ? (
              <div className="animate-pulse space-y-5">
                {/* Skeleton for Top Match */}
                <div className="h-6 w-24 bg-gray-300 rounded"></div>

                {/* Skeleton for Coach Name */}
                <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded"></div>

                {/* Skeleton for Coach Description */}
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>

                {/* <div className="h-28 w-28 sm:h-40 sm:w-40 bg-gray-300 rounded-full mx-auto"></div> */}

                <div className="h-10 w-3/4 bg-gray-300 rounded mx-auto"></div>

                <div className="flex gap-4 mt-5">
                  <div className="h-6 w-24 bg-gray-300 rounded"></div>
                  <div className="h-6 w-32 bg-gray-300 rounded"></div>
                  <div className="h-6 w-20 bg-gray-300 rounded"></div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-row items-start lg:items-center">
                  {/* Coach Description */}
                  <div className="coach_description w-full lg:w-[70%]">
                    <span className="inline-flex items-center rounded-md px-4 py-2 text-xs font-medium bg-[#F89A14] text-white">
                      Top Match
                    </span>
                    <div className="coach_name my-5">
                      <h2 className="text-2xl lg:text-3xl font-bold">
                        {selectedCoach?.name}
                      </h2>
                      <h2 className="text-sm lg:text-base">
                        {selectedCoach?.typeOfCoaching}
                      </h2>
                    </div>
                    <div className="coach_details">
                      <p
                        className={`text-sm text-gray-500 ${
                          !showFullContent.coachingDescription
                            ? "line-clamp-3"
                            : ""
                        }`}
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {selectedCoach?.coachingDescription}
                      </p>
                      <button
                        onClick={() => toggleContent("coachingDescription")}
                        className="text-blue-600 mt-2 hover:underline"
                      >
                        {showFullContent?.coachingDescription
                          ? "Show Less"
                          : "Show More"}
                      </button>
                    </div>
                  </div>
                  {/* Coach Image */}
                  <div className="coach_image_div w-full lg:w-[30%] mt-5 lg:mt-0">
                    <div className="coach_image p-6 sm:p-10">
                      <img
                        alt={selectedCoach?.name}
                        src={selectedCoach?.profileImage}
                        className="object-cover w-28 h-28 sm:w-40 sm:h-40 mx-auto rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Book Appointment Button */}
                <div className="book_appointment mt-5">
                  <Button
                    className="w-full lg:w-auto"
                    onClick={handleDialogToggle}
                  >
                    Book Now
                  </Button>
                </div>

                {/* Tabs Section */}
                <div className="coach_details_tabs my-10">
                  <Tabs defaultValue="about">
                    <TabsList className="flex flex-wrap">
                      <TabsTrigger
                        value="about"
                        className="rounded-md text-xs sm:text-xl ms-0"
                      >
                        About
                      </TabsTrigger>
                    </TabsList>
                    <div className="tabs_inner_content my-5">
                      <TabsContent value="about">
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            !showFullContent.bio ? "max-h-16" : "max-h-full"
                          }`}
                        >
                          <p
                            className={`text-sm text-gray-500 transition-all duration-300 ease-in-out ${
                              !showFullContent.bio ? "line-clamp-3" : ""
                            }`}
                            style={{
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: showFullContent.bio ? "none" : 3,
                              overflow: showFullContent.bio
                                ? "visible"
                                : "hidden",
                              height: showFullContent.bio ? "auto" : "4.5em",
                              maxHeight: !showFullContent.bio
                                ? "4.5em"
                                : "none",
                              opacity: showFullContent.bio ? 1 : 0.7,
                              transition: "height 0.3s ease, opacity 0.3s ease",
                            }}
                          >
                            {selectedCoach?.bio}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleContent("bio")}
                          className="text-blue-600 mt-2 hover:underline"
                        >
                          {showFullContent?.bio ? "Show Less" : "Show More"}
                        </button>
                      </TabsContent>
                      <TabsContent value="coaching">
                        <p>
                          I have a experience of {selectedCoach?.experience} and
                          have a skill of {selectedCoach?.skills}
                        </p>
                      </TabsContent>
                      <TabsContent value="reviews">
                        Matt is a real pro—highly competent, engaged, and
                        insightful. Highly recommended.
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Shadcn UI Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="max-w-5xl mx-auto"
          showCloseButton={true}
          onClick={handleDialogToggle}
        >
          <DialogHeader>
            <DialogTitle>
              <div className="coach_header flex gap-5 items-center">
                <div className="coach_image">
                  <img
                    src={selectedCoach?.profileImage}
                    alt={selectedCoach?.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="coach_details">
                  <h1 className="text-lg font-bold">
                    Book a meeting with {selectedCoach?.name}
                  </h1>
                  <h2 className="text-sm">{selectedCoach?.typeOfCoaching}</h2>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div>
            {selectedCoach?.programs.length > 0 ? (
              <>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
                  <div className="coach_related_programs">
                    <ul className="my-5">
                      {selectedCoach?.programs.map(
                        (program, index) =>
                          program.isapproved === true && (
                            <li
                              key={index}
                              className={`flex gap-5 justify-between items-center py-2 px-4 cursor-pointer border-2 rounded-md ${
                                selectedProgram === index
                                  ? "border-blue-500 bg-blue-100"
                                  : "border-transparent"
                              }`}
                              onClick={() =>
                                setSelectedProgram(
                                  index === selectedProgram ? null : index
                                )
                              }
                            >
                              <div className="program_inner_content space-y-2 flex gap-5 items-center">
                                <BsCheckCircleFill className="text-blue-500 w-8 h-8" />
                                <div>
                                  <h3 className="text-sm font-bold">
                                    {program.title}
                                  </h3>
                                  <p className="text-xs">
                                    {program.description}
                                  </p>
                                </div>
                              </div>
                              <div className="program_price font-bold text-sm">
                                {currency === "INR" ? `₹${program.INRrate}` : currency === "USD" ? `$${program.USDrate}` : `£${program.amount}`}
                              </div>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                  <div className="coach_booking border p-5 rounded-md">
                    {selectedProgram !== null && (
                      <>
                        <div className="program_details flex">
                          <div className="coach_program_heading flex gap-2">
                            <BsCheckCircleFill className="text-blue-500 w-8 h-8" />
                            <div>
                              <h2 className="text-sm font-bold">
                                {
                                  selectedCoach?.programs[selectedProgram]
                                    ?.title
                                }
                              </h2>
                              <p className="text-xs">
                                {
                                  selectedCoach?.programs[selectedProgram]
                                    ?.description
                                }
                              </p>
                            </div>
                          </div>
                          <div className="coach_price">
                            <div className="text-sm font-bold">
                            {currency === "INR" ? `₹${selectedCoach?.programs[selectedProgram]?.INRrate}` : currency === "USD" ? `$${selectedCoach?.programs[selectedProgram]?.USDrate}` : `£${selectedCoach?.programs[selectedProgram]?.amount}`}
                            </div>
                          </div>
                        </div>
                        <div
                          className="schedule_meet mt-5"
                          onClick={() =>
                            handleBuyProgram(
                              selectedCoach?.programs[selectedProgram]
                            )
                          }
                        >
                          <Button>
                            {isLoading ? (
                              <span className="flex items-center gap-2">
                                <svg
                                  className="animate-spin h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                  ></path>
                                </svg>
                                Scheduling...
                              </span>
                            ) : (
                              "Schedule a Meet"
                            )}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="no_program_card flex flex-col items-center justify-center text-center p-5 bg-gray-100 rounded-lg mt-5">
                <h2 className="text-lg font-bold text-gray-600">
                  No Program Yet
                </h2>
                <p className="text-sm text-gray-500">
                  The selected coach does not have any programs at the moment.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      {/* Mobile Dialog */}
      <div className="lg:hidden">
        <Dialog open={isMobile} onOpenChange={handleMobileToggle}>
          <DialogContent
            className="w-full sm:w-[90%] md:w-[80%] max-w-lg p-6 bg-blue-100 h-[500px] overflow-y-scroll"
            showCloseButton={true}
            onClick={handleMobileToggle}
          >
            {isLoading ? (
              <div className="animate-pulse space-y-5">
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
                <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-10 w-3/4 bg-gray-300 rounded mx-auto"></div>
              </div>
            ) : (
              <div>
                <div className="flex flex-row items-start lg:items-center">
                  <div className="coach_description w-full lg:w-[70%]">
                    <span className="inline-flex items-center rounded-md px-4 py-2 text-xs font-medium bg-[#F89A14] text-white">
                      Top Match
                    </span>
                    <div className="coach_name my-5">
                      <h1 className="text-2xl lg:text-3xl font-bold">
                        {selectedCoach?.name}
                      </h1>
                      <h2 className="text-sm lg:text-base">
                        {selectedCoach?.typeOfCoaching}
                      </h2>
                    </div>
                  </div>

                  <div className="coach_image_div w-full lg:w-[30%] mt-5 lg:mt-0">
                    <div className="coach_image p-6 sm:p-10">
                      <img
                        alt={selectedCoach?.name}
                        src={selectedCoach?.profileImage}
                        className="object-cover w-28 h-28 sm:w-40 sm:h-40 mx-auto rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="coach_details">
                  <p
                    className={`text-sm text-gray-500 ${
                      !showFullContent.coachingDescription ? "line-clamp-3" : ""
                    }`}
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {selectedCoach?.coachingDescription}
                  </p>
                  <button
                    onClick={() => toggleContent("coachingDescription")}
                    className="text-blue-600 mt-2 hover:underline text-sm"
                  >
                    {showFullContent?.coachingDescription
                      ? "Show Less"
                      : "Show More"}
                  </button>
                </div>
                <div className="book_appointment mt-5">
                  <Button onClick={handleDialogToggle}>Book Now</Button>
                </div>

                <div className="coach_details_tabs my-10">
                  <Tabs defaultValue="about">
                    <TabsList className="flex flex-wrap">
                      <TabsTrigger
                        value="about"
                        className="rounded-md text-xs sm:text-xl ms-0"
                      >
                        About
                      </TabsTrigger>
                    </TabsList>
                    <div className="tabs_inner_content my-5">
                      <TabsContent value="about">
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            !showFullContent.bio ? "max-h-16" : "max-h-full"
                          }`}
                        >
                          <p
                            className={`text-sm text-gray-500 transition-all duration-300 ease-in-out ${
                              !showFullContent.bio ? "line-clamp-3" : ""
                            }`}
                            style={{
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: showFullContent.bio ? "none" : 3,
                              overflow: showFullContent.bio
                                ? "visible"
                                : "hidden",
                              height: showFullContent.bio ? "auto" : "4.5em",
                              maxHeight: !showFullContent.bio
                                ? "4.5em"
                                : "none",
                              opacity: showFullContent.bio ? 1 : 0.7,
                              transition: "height 0.3s ease, opacity 0.3s ease",
                            }}
                          >
                            {selectedCoach?.bio}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleContent("bio")}
                          className="text-blue-600 mt-2 hover:underline text-sm"
                        >
                          {showFullContent?.bio ? "Show Less" : "Show More"}
                        </button>
                      </TabsContent>
                      <TabsContent value="coaching">
                        <p>
                          I have a experience of {selectedCoach?.experience} and
                          have a skill of {selectedCoach?.skills}
                        </p>
                      </TabsContent>
                      <TabsContent value="reviews">
                        Matt is a real pro—highly competent, engaged, and
                        insightful. Highly recommended.
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CoachPage;
