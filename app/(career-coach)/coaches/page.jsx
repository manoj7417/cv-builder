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
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const CoachPage = () => {
  const [coaches, setAllCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  const [purchasedPrograms, setPurchasedPrograms] = useState({});
  const [getTestimonial, setGetTestimonial] = useState([]);

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
      const approvedCoaches = data.coaches
        .filter(
          (coach) => coach.isApproved && coach.approvalStatus === "approved"
        )
        .sort((a, b) => {
          const hasProgramsA = a.programs?.length > 0;
          const hasProgramsB = b.programs?.length > 0;
          return hasProgramsB - hasProgramsA;
        });
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

  const checkCoursePurchased = async (programId) => {
    const { accessToken } = await GetTokens();
    if (!accessToken || !accessToken.value) {
      return;
    }
    try {
      const response = await axios.post(
        "/api/programStatus",
        { programId },
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      if (response.data.purchased) {
        setPurchasedPrograms((prevState) => ({
          ...prevState,
          [programId]: true,
        }));
      }
    } catch (error) {}
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
          amount:
            currency === "INR"
              ? course.INRrate
              : currency === "USD"
              ? course.USDrate
              : course.amount,
          currency:
            currency === "INR" ? "INR" : currency === "USD" ? "USD" : "GBP",
          success_url: url,
          cancel_url: window.location.href,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken?.value}`,
          },
        }
      );
      if (response.status === 201) {
        window.location.href = response.data.url;
      } else if (response.status === 200) {
        toast.error(response.data.message);
      }

      setIsLoading(false);
      checkCoursePurchased(course._id);
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

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const fetchTestimonials = async () => {
    const id = selectedCoach?.id;
    console.log("coachId", id);
    try {
      const response = await axios.get(`/api/getTestimonial/${id}`);
      console.log("response", response.data.testimonials);
      setGetTestimonial(response.data.testimonials || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllCoaches();
  }, []);

  useEffect(() => {
    getGeoInfo();
  }, []);

  useEffect(() => {
    if (selectedProgram !== null) {
      checkCoursePurchased(selectedCoach?.programs[selectedProgram]?._id);
    }
  }, [selectedProgram, selectedCoach]);

  useEffect(() => {
    if (selectedCoach?.id) {
      fetchTestimonials();
    }
  }, [selectedCoach]);

  const programDetails = selectedCoach?.programs[selectedProgram];
  const isPurchased = purchasedPrograms[programDetails?._id];

  return (
    <>
      <div className="max-w-full mx-auto mt-[150px] mb-10 lg:px-20 px-4">
        <div className="coach_main_div w-full flex flex-col lg:flex-row gap-10">
          {/* Coach Selection Section */}
          <div className="coach_card lg:w-[30%] w-full lg:h-screen lg:sticky top-[100px] overflow-y-scroll h-[700px] pr-2">
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
                        className={`p-2 flex flex-row overflow-hidden items-center rounded shadow-md text-slate-500 shadow-slate-200 cursor-pointer lg:border-none border border-gray-300 transition-all duration-300 hover:border-blue-700 ${
                          selectedCoach?._id === item._id
                            ? "bg-blue-50 border-blue-700"
                            : ""
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
                              <Button
                                className="lg:hidden block px-2 py-1 w-20 h-10 text-xs my-2 cursor-pointer"
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
          <div className="lg:block hidden coach_details lg:w-[70%] w-full bg-blue-50 p-6 sm:p-10 rounded-md">
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
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          !showFullContent.coachingDescription
                            ? "max-h-16"
                            : "max-h-full"
                        }`}
                      >
                        <div
                          className={`text-sm text-gray-500 transition-all duration-300 ease-in-out ${
                            !showFullContent.coachingDescription
                              ? "line-clamp-3"
                              : ""
                          }`}
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: showFullContent.coachingDescription
                              ? "none"
                              : 3,
                            overflow: showFullContent.coachingDescription
                              ? "visible"
                              : "hidden",
                            height: showFullContent.coachingDescription
                              ? "auto"
                              : "4.5em",
                            maxHeight: !showFullContent.coachingDescription
                              ? "4.5em"
                              : "none",
                            opacity: showFullContent.coachingDescription
                              ? 1
                              : 0.7,
                            transition: "height 0.3s ease, opacity 0.3s ease",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: selectedCoach?.coachingDescription || "",
                          }}
                        />
                      </div>

                      <button
                        onClick={() => toggleContent("coachingDescription")}
                        className="text-[#f76918] mt-2 hover:underline"
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
                        className="rounded-md text-xs sm:text-base ms-0"
                      >
                        About
                      </TabsTrigger>
                      <TabsTrigger
                        value="reviews"
                        className="rounded-md text-xs sm:text-base ms-0"
                      >
                        Reviews
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
                            dangerouslySetInnerHTML={{
                              __html: selectedCoach?.bio || "", // Insert the HTML content here
                            }}
                          />
                        </div>

                        <button
                          onClick={() => toggleContent("bio")}
                          className="text-[#f76918] mt-2 hover:underline"
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
                        {getTestimonial.length > 0 ? (
                          getTestimonial.map((item) => (
                            <Card
                              key={item._id}
                              className="mb-4 shadow-lg border border-gray-200 transition-all duration-300 hover:border-blue-500 hover:shadow-xl"
                            >
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                  {renderStars(item.rating)}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-gray-700 lg:text-sm text-xs leading-relaxed">
                                  {item.review}
                                </p>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <p className="text-center text-gray-500 font-bold mt-20 lg:text-xl text-sm">
                            No reviews available.
                          </p>
                        )}
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
      <div className="lg:block hidden">
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
              {selectedCoach?.programs.filter((program) => program.isapproved)
                .length > 0 ? (
                <>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
                    {/* Coach Related Programs Section */}
                    <div className="coach_related_programs h-[75vh] overflow-y-scroll lg:hidden block">
                      <ul className="my-5">
                        {selectedCoach?.programs.map(
                          (program, index) =>
                            program.isapproved === true && (
                              <li
                                key={index}
                                className={`flex flex-col gap-4 py-4 px-4 cursor-pointer border-2 rounded-md ${
                                  selectedProgram === index
                                    ? "border-blue-500 bg-blue-100"
                                    : "border-transparent"
                                }`}
                                onClick={() => {
                                  if (selectedProgram !== index) {
                                    setSelectedProgram(index);
                                    // Optionally set additional program details
                                  }
                                }}
                              >
                                <div>
                                  <div className="program_title flex gap-2 items-center">
                                    <BsCheckCircleFill className="text-blue-500 w-4 h-4" />
                                    <h3 className="text-sm font-bold">
                                      {program.title}
                                    </h3>
                                  </div>
                                  <div
                                    className="text-xs px-5 py-2 programDescription-content"
                                    dangerouslySetInnerHTML={{
                                      __html: program.description,
                                    }}
                                  />
                                </div>
                                <div className="flex justify-between items-center">
                                  <div className="program_price font-bold text-sm">
                                    {currency === "INR"
                                      ? `₹${program.INRrate}`
                                      : currency === "USD"
                                      ? `$${program.USDrate}`
                                      : `£${program.amount}`}
                                  </div>
                                  <div className="schedule_meet">
                                    {isPurchased ? (
                                      <Button disabled>
                                        Already Purchased
                                      </Button>
                                    ) : (
                                      <Button
                                        onClick={() =>
                                          handleBuyProgram(program)
                                        }
                                      >
                                        {isLoading &&
                                        selectedProgram === index ? (
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
                                    )}
                                  </div>
                                </div>
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                    <div className="coach_related_programs h-[75vh] overflow-y-scroll lg:block hidden">
                      <ul className="my-5">
                        {selectedCoach?.programs.map(
                          (program, index) =>
                            program.isapproved === true && (
                              <li
                                key={index}
                                className={`flex gap-5 justify-between py-2 px-4 cursor-pointer border-2 rounded-md ${
                                  selectedProgram === index
                                    ? "border-blue-500 bg-blue-100"
                                    : "border-transparent"
                                }`}
                                onClick={() => {
                                  if (selectedProgram !== index) {
                                    setSelectedProgram(index);
                                    // setProgramDetails(program)
                                  }
                                }}
                              >
                                <div className="program_inner_content space-y-2 flex gap-5 items-center">
                                  <div>
                                    <div className="program_title flex gap-2 items-center">
                                      <BsCheckCircleFill className="text-blue-500 w-4 h-4" />
                                      <h3 className="text-sm font-bold">
                                        {program.title}
                                      </h3>
                                    </div>
                                    <div
                                      className="text-xs px-5 py-2 programDescription-content"
                                      dangerouslySetInnerHTML={{
                                        __html: program.description,
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="program_price font-bold text-sm">
                                  {currency === "INR"
                                    ? `₹${program.INRrate}`
                                    : currency === "USD"
                                    ? `$${program.USDrate}`
                                    : `£${program.amount}`}
                                </div>
                              </li>
                            )
                        )}
                      </ul>
                    </div>

                    {/* Coach Booking Section - Hidden on Mobile */}
                    <div className="coach_booking border p-5 rounded-md hidden lg:block  h-[75vh] overflow-y-scroll">
                      {selectedProgram !== null && (
                        <>
                          <div className="program_details flex justify-between ">
                            <div className="coach_program_heading flex gap-2">
                              <BsCheckCircleFill className="text-blue-500 w-8 h-8" />
                              <div>
                                <h2 className="text-sm font-bold">
                                  {programDetails?.title}
                                </h2>
                                <div
                                  className="text-xs programDescription-content"
                                  dangerouslySetInnerHTML={{
                                    __html: programDetails?.description,
                                  }}
                                />
                              </div>
                            </div>
                            <div className="coach_price">
                              <div className="text-sm font-bold">
                                {currency === "INR"
                                  ? `₹${programDetails?.INRrate}`
                                  : currency === "USD"
                                  ? `$${programDetails?.USDrate}`
                                  : `£${programDetails?.amount}`}
                              </div>
                            </div>
                          </div>
                          <div className="schedule_meet mt-5">
                            {isPurchased ? (
                              <Button disabled>Already Purchased</Button>
                            ) : (
                              <Button
                                onClick={() => handleBuyProgram(programDetails)}
                              >
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
                            )}
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
      </div>
      {/* Mobile Dialog */}
      <div className="lg:hidden block">
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
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      !showFullContent.coachingDescription
                        ? "max-h-16"
                        : "max-h-full"
                    }`}
                  >
                    <div
                      className={`text-sm text-gray-500 transition-all duration-300 ease-in-out ${
                        !showFullContent.coachingDescription
                          ? "line-clamp-3"
                          : ""
                      }`}
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: showFullContent.coachingDescription
                          ? "none"
                          : 3,
                        overflow: showFullContent.coachingDescription
                          ? "visible"
                          : "hidden",
                        height: showFullContent.coachingDescription
                          ? "auto"
                          : "4.5em",
                        maxHeight: !showFullContent.coachingDescription
                          ? "4.5em"
                          : "none",
                        opacity: showFullContent.coachingDescription ? 1 : 0.7,
                        transition: "height 0.3s ease, opacity 0.3s ease",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: selectedCoach?.coachingDescription || "",
                      }}
                    />
                  </div>

                  <button
                    onClick={() => toggleContent("coachingDescription")}
                    className="text-[#f76918] mt-2 hover:underline"
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
                        className="rounded-md text-xs sm:text-base ms-0"
                      >
                        About
                      </TabsTrigger>
                      <TabsTrigger
                        value="reviews"
                        className="rounded-md text-xs sm:text-base ms-0"
                      >
                        Reviews
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
                            dangerouslySetInnerHTML={{
                              __html: selectedCoach?.bio || "", // Insert the HTML content here
                            }}
                          />
                        </div>

                        <button
                          onClick={() => toggleContent("bio")}
                          className="text-[#f76918] mt-2 hover:underline"
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
                        {getTestimonial.length > 0 ? (
                          getTestimonial.map((item) => (
                            <Card key={item._id} className="mb-4 shadow-lg">
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  {renderStars(item.rating)}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-gray-700 text-xs">
                                  {item.review}
                                </p>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <p className="text-center text-gray-500 font-bold mt-20 lg:text-xl text-sm">
                            No reviews available.
                          </p>
                        )}
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
