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

const programs = [
  {
    title: "Brand Strategy Development",
    description:
      "Crafting personalized strategies to build and enhance brand identity and market presence.",
    price: "$10",
  },
  {
    title: "Digital Marketing Optimization",
    description:
      "Guiding clients on effective SEO, social media marketing, email campaigns, and online advertising techniques.",
    price: "$10",
  },
  {
    title: "Content Marketing Mastery",
    description:
      "Providing insights on creating compelling content that drives engagement and generates leads.",
    price: "$10",
  },
  {
    title: "Performance Analytics & Growth Planning",
    description:
      "Helping clients analyze marketing data to optimize campaigns and plan for sustainable growth.",
    price: "$10",
  },
];

const CoachPage = () => {
  const [coaches, setAllCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(0);

  console.log("selectedCoach::",selectedCoach)

  const handleDialogToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const fetchAllCoaches = async () => {
    try {
      const response = await axios.get(`/api/getAllCoaches`);
      const data = await response.data;
      //   setAllCoaches(data.coaches);
      const approvedCoaches = data.coaches.filter(
        (coach) => coach.isApproved && coach.approvalStatus === "approved"
      );
      setAllCoaches(approvedCoaches);

      // Set the first approved coach as selected by default
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

  useEffect(() => {
    fetchAllCoaches();
  }, []);

  return (
    // <div className="max-w-7xl mx-auto my-40">
    //   <div className="coach_main_div w-full h-full flex gap-10">
    //     <div className="coach_card lg:w-[30%] w-full h-screen sticky top-[100px]">
    //       <h2 className="text-2xl font-bold">
    //         Choose the <span className="text-blue-700">coach</span> who aligns
    //         best with your <span className="text-blue-700">goals.</span>
    //       </h2>
    //       <p className="text-sm my-5">
    //         Explore your top coach recommendations and select the one that best
    //         fits your needs below.
    //       </p>

    //       <div className="coach_card_inner flex flex-col gap-5">
    //         {isLoading ? (
    //           <>
    //             {Array(4)
    //               .fill(0)
    //               .map((_, index) => (
    //                 <CoachSkeltonCard key={index} />
    //               ))}
    //           </>
    //         ) : (
    //           coaches?.length > 0 &&
    //           coaches
    //             ?.filter(
    //               (coach) =>
    //                 coach.isApproved && coach.approvalStatus === "approved"
    //             )
    //             ?.map((item, index) => (
    //               <div key={index}  onClick={() => handleSelectCoach(item)}
    //               className={`p-2 flex flex-col overflow-hidden rounded shadow-md text-slate-500 shadow-slate-200 sm:flex-row cursor-pointer ${
    //                 selectedCoach?._id === item._id ? "bg-blue-200" : ""
    //               }`}>
    //                 <figure className="flex-1">
    //                   <img
    //                     alt={item.imageAlt}
    //                     src={item.profileImage}
    //                     className="object-cover w-28 h-28"
    //                   />
    //                 </figure>
    //                 <div className="flex-1 p-6 sm:mx-6 sm:px-0">
    //                   <header className="flex gap-4 mb-4">
    //                     <div>
    //                       <h3 className="text-base font-medium text-slate-900">
    //                         {item.name}
    //                       </h3>
    //                       <p className="text-xs text-slate-800">
    //                         {/* {item?.jobProfile?.title} */}
    //                          {item?.email}
    //                       </p>
    //                     </div>
    //                   </header>
    //                 </div>
    //               </div>
    //             ))
    //         )}
    //       </div>
    //     </div>
    //     <div className="coach_details lg:w-[70%] w-full bg-blue-100 p-10">
    //       <div className="flex items-center">
    //         <div className="coach_description w-[70%]">
    //           <span className="inline-flex items-center rounded-md px-4 py-2 text-xs font-medium bg-[#F89A14] text-white">
    //             Top Match
    //           </span>
    //           <div className="coach_name my-5">
    //             <h1 className="text-3xl font-bold">{selectedCoach?.name}</h1>
    //             <h2 className="text-base">{selectedCoach?.typeOfCoaching}</h2>
    //           </div>
    //           <div className="coach_details">
    //             <p className="text-sm text-gray-500">
    //               {selectedCoach?.coachingDescription}
    //             </p>
    //           </div>
    //         </div>
    //         <div className="coach_image_div w-[30%]">
    //           <div className="coach_image p-10">
    //             <img
    //               alt={selectedCoach?.name}
    //               src={selectedCoach?.profileImage}
    //               className="object-cover w-40 h-40"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="book_appointment mt-5">
    //         <Button>Schedule A Meet</Button>
    //       </div>
    //       <div className="coach_details_tabs my-10">
    //         <Tabs defaultValue="about">
    //           <TabsList className="flex">
    //             <TabsTrigger value="about" className="rounded-md text-sm">
    //               About
    //             </TabsTrigger>
    //             <TabsTrigger value="coaching" className="rounded-md text-sm">
    //               Coaching Style And Experience
    //             </TabsTrigger>
    //             <TabsTrigger value="pricing" className="rounded-md text-sm">
    //               Pricing
    //             </TabsTrigger>
    //             <TabsTrigger value="reviews" className="rounded-md text-sm">
    //               Reviews
    //             </TabsTrigger>
    //           </TabsList>
    //           <div className="tabs_inner_content my-5">
    //             <TabsContent value="about">
    //               <p>
    //                 {selectedCoach?.bio}
    //               </p>
    //             </TabsContent>
    //             <TabsContent value="coaching">
    //               <p>
    //                 John Peter brings over 15 years of hands-on experience in
    //                 the marketing industry, helping businesses and individuals
    //                 navigate the complexities of branding, digital marketing,
    //                 and career development. His journey has seen him work with a
    //                 wide array of clients—from startups looking to make a mark
    //                 to established brands seeking to reposition or elevate their
    //                 market presence.
    //               </p>
    //             </TabsContent>
    //             <TabsContent value="pricing">
    //               Make changes to your account here. $450
    //             </TabsContent>
    //             <TabsContent value="reviews">
    //               Matt is a real pro - highly competent, engaged, and
    //               insightful. He hadn't previously advised anyone in my field -
    //               about which he was completely up-front - but he asked smart
    //               questions and listened carefully. His resume suggestions were
    //               perfect, often involving (in retrospect) simple solutions that
    //               had eluded me. Matt's strategic acumen also really came
    //               through during our consultation and was very helpful in
    //               reframing my approach to job hunting. Overall, a great
    //               experience thanks to Matt's skill as a coach combined with his
    //               willingness to go the extra mile for his clients. Highly
    //               recommended.
    //             </TabsContent>
    //           </div>
    //         </Tabs>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="max-w-7xl mx-auto mt-[150px] mb-10 px-4">
        <div className="coach_main_div w-full flex flex-col lg:flex-row gap-10">
          {/* Coach Selection Section */}
          <div className="coach_card lg:w-[30%] w-full h-auto lg:h-screen lg:sticky top-[100px]">
            <h2 className="text-xl lg:text-2xl font-bold">
              Choose the <span className="text-blue-700">coach</span> who aligns
              best with your <span className="text-blue-700">goals.</span>
            </h2>
            <p className="text-sm my-5">
              Explore your top coach recommendations and select the one that
              best fits your needs below.
            </p>

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
                    .map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectCoach(item)}
                        className={`p-2 flex flex-col sm:flex-row overflow-hidden rounded shadow-md text-slate-500 shadow-slate-200 cursor-pointer ${
                          selectedCoach?._id === item._id ? "bg-blue-50" : ""
                        }`}
                      >
                        <figure className="flex-1">
                          <img
                            alt={item.imageAlt}
                            src={item.profileImage}
                            className="object-cover w-24 h-24 sm:w-28 sm:h-28"
                          />
                        </figure>
                        <div className="flex-1 p-4 sm:p-6 sm:mx-6 sm:px-0">
                          <header className="flex gap-4 mb-4">
                            <div>
                              <h3 className="text-base font-medium text-slate-900">
                                {item.name}
                              </h3>
                              <p className="text-xs text-slate-800">
                                {item?.email}
                              </p>
                            </div>
                          </header>
                        </div>
                      </div>
                    ))}
            </div>
          </div>

          {/* Coach Details Section */}
          <div className="coach_details lg:w-[70%] w-full bg-blue-100 p-6 sm:p-10">
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
                <div className="flex flex-col lg:flex-row items-start lg:items-center">
                  {/* Coach Description */}
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
                    <div className="coach_details">
                      <p className="text-sm text-gray-500">
                        {selectedCoach?.coachingDescription}
                      </p>
                    </div>
                  </div>
                  {/* Coach Image */}
                  <div className="coach_image_div w-full lg:w-[30%] mt-5 lg:mt-0">
                    <div className="coach_image p-6 sm:p-10">
                      <img
                        alt={selectedCoach?.name}
                        src={selectedCoach?.profileImage}
                        className="object-cover w-28 h-28 sm:w-40 sm:h-40 mx-auto"
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
                    Schedule A Meet
                  </Button>
                </div>

                {/* Tabs Section */}
                <div className="coach_details_tabs my-10">
                  <Tabs defaultValue="about">
                    <TabsList className="flex flex-wrap">
                      <TabsTrigger
                        value="about"
                        className="rounded-md text-xs sm:text-sm"
                      >
                        About
                      </TabsTrigger>
                      <TabsTrigger
                        value="coaching"
                        className="rounded-md text-xs sm:text-sm"
                      >
                        Coaching Style & Experience
                      </TabsTrigger>
                      <TabsTrigger
                        value="reviews"
                        className="rounded-md text-xs sm:text-sm"
                      >
                        Reviews
                      </TabsTrigger>
                    </TabsList>
                    <div className="tabs_inner_content my-5">
                      <TabsContent value="about">
                        <p>{selectedCoach?.bio}</p>
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
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
              <div className="coach_related_programs">
                <ul className="my-5">
                  {programs.map((program, index) => (
                    <li
                      key={index}
                      className={`flex gap-5 items-center py-2 px-4 cursor-pointer border-2 rounded-md ${
                        selectedProgram === index
                          ? 'border-blue-500 bg-blue-100'
                          : 'border-transparent'
                      }`}
                      onClick={() =>
                        setSelectedProgram(
                          index === selectedProgram ? null : index
                        )
                      }
                    >
                      <BsCheckCircleFill className="text-blue-500 w-8 h-8" />
                      <div className="program_inner_content space-y-2">
                        <h3 className="text-sm font-bold">{program.title}</h3>
                        <p className="text-xs">{program.description}</p>
                      </div>
                      <div className="program_price font-bold text-sm">
                        {program.price}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="coach_booking border p-5 rounded-md">
                {/* Conditionally render the selected program details */}
                {selectedProgram !== null && (
                  <>
                    <div className="program_details flex">
                      <div className="coach_program_heading flex gap-2">
                        <BsCheckCircleFill className="text-blue-500 w-8 h-8" />
                        <div>
                          <h2 className="text-sm font-bold">
                            {programs[selectedProgram].title}
                          </h2>
                          <p className="text-xs">
                            {programs[selectedProgram].description}
                          </p>
                        </div>
                      </div>
                      <div className="coach_price">
                        <div className="text-sm font-bold">
                          {programs[selectedProgram].price}
                        </div>
                      </div>
                    </div>
                    <div className="program_details mt-2">
                      <ul className="list-disc p-5 space-y-3">
                        <li>
                          <strong className="text-sm">Brand Identity Creation</strong>
                          <ul>
                            <li className="text-xs">
                              Developing a unique brand name, logo, tagline, and
                              visual elements.
                            </li>
                            <li className="text-xs">
                              Crafting a consistent brand voice and tone to
                              communicate effectively with the target audience.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong className="text-sm">Market Research & Analysis</strong>
                          <ul>
                            <li className="text-xs">
                              Conducting competitor analysis and audience
                              segmentation.
                            </li>
                            <li className="text-xs">
                              Identifying market trends and customer needs to
                              position the brand effectively.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong className="text-sm">Value Proposition Development</strong>
                          <ul>
                            <li className="text-xs">
                              Defining the brand’s unique selling points (USPs).
                            </li>
                            <li className="text-xs">
                              Highlighting the benefits and values that
                              differentiate the brand from competitors.
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div className="schedule_meet">
                        <Button>Schedule a Meet</Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CoachPage;
