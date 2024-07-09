"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaCamera, FaRegEdit } from "react-icons/fa";
import { useUserStore } from "@/app/store/UserStore";
import { useForm } from "react-hook-form";
import { uploadImage, updateUserProfile } from "@/app/api/api";
import { GetTokens, SetTokens } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Skeleton from "react-loading-skeleton";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Flat, Heat, Nested } from "@alptugidin/react-circular-progress-bar";

const ProfilePage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const { userState, updateUserData } = useUserStore((state) => ({
    userState: state.userState,
    updateUserData: state.updateUserData,
  }));
  const userdata = userState?.userdata || {};
  const [previewImage, setPreviewImage] = useState(
    userdata?.profilePicture || "https://via.placeholder.com/150"
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisData, setAnalysisData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const router = useRouter();

  const fileUploadRef = useRef(null);

  useEffect(() => {
    if (userState?.userdata) {
      setPreviewImage(
        userState.userdata.profilePicture || "https://via.placeholder.com/150"
      );
    }
  }, [userState?.userdata]);

  const handleImageUpload = (event) => {
    event.preventDefault();
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: userdata?.fullname,
      occupation: userdata?.occupation,
      address: userdata?.address,
    },
  });

  const userProfileHandler = async (data) => {
    setIsEditable(false);
    try {
      const { accessToken } = await GetTokens();

      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("upload_preset", "fr8vexzg");
        const uploadResponse = await uploadImage(formData);
        if (uploadResponse.status === 200) {
          const imageUrl = uploadResponse.data.secure_url;
          data.profilePicture = imageUrl;
        } else {
          throw new Error("Image upload failed");
        }
      }

      const response = await updateUserProfile(data, accessToken.value);
      if (response.status === 200) {
        const {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          userdata,
        } = response.data.data;
        updateUserData(userdata);
        setPreviewImage(userdata.profilePicture);
        reset(userdata);

        await SetTokens({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
        toast.success("Profile updated successfully", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchUserAnalysisHistory = async () => {
    const { accessToken } = await GetTokens();
    try {
      const response = await axios.get("/api/userCvAnalysis", {
        headers: {
          Authorization: "Bearer " + accessToken.value,
        },
      });
      setAnalysisData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserAnalysis = (id) => {
    router.push(`/analyser/${id}`);
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  const testSummary = [
    {
      actionableInsights: {
        skillDevelopment:
          "Focus on improving subject-specific knowledge through self-study or additional courses, and develop practical skills relevant to the careers suggested.",
        networking:
          "Join professional networks and attend industry conferences to build connections.",
        experience:
          "Seek internships and volunteer opportunities to gain practical experience.",
      },
      training: {
        courses:
          "Enroll in courses related to scientific research, public relations, or project management, depending on the chosen career path.",
        workshops:
          "Attend workshops and seminars to stay updated with industry trends.",
        certifications:
          "Pursue relevant certifications to enhance your qualifications.",
      },
      careerSuggestions: [
        {
          career: "Research Scientist",
          reason:
            "Strong interest in scientific theories and solving complex problems.",
          actions:
            "Pursue higher education in a scientific field, engage in independent research projects, and seek internships in research laboratories.",
          requiredSkills:
            "Analytical thinking, data analysis, research methodologies.",
          relevantCourses:
            "Advanced Chemistry, Molecular Biology, Data Science.",
        },
        {
          career: "Public Relations Specialist",
          reason:
            "Enjoys being the center of attention and energized by social interactions.",
          actions:
            "Take courses in communications and marketing, gain experience through internships with PR firms, and develop a strong portfolio.",
          requiredSkills: "Communication, marketing, social media management.",
          relevantCourses:
            "Public Relations, Digital Marketing, Media Relations.",
        },
        {
          career: "Project Manager",
          reason:
            "High value on work-life balance, enjoys solving complex problems, and is energized by social interactions.",
          actions:
            "Obtain a certification in project management (such as PMP), and develop soft skills such as leadership and communication.",
          requiredSkills: "Leadership, time management, problem-solving.",
          relevantCourses:
            "Project Management, Leadership Skills, Agile Methodologies.",
        },
      ],
      summary: {
        interests:
          "Solving complex problems, exploring scientific theories, social interactions.",
        strengths:
          "Enjoys solving complex problems, high interest in scientific theories, enjoys being the center of attention, energized by social interactions.",
        values:
          "High importance on work-life balance, prioritizes high salary.",
        weaknesses:
          "Responses indicate possible lack of detailed understanding in some subjects, as evidenced by the vague answers provided.",
        goals:
          "Achieve a balance between professional success and personal well-being, attain a high level of expertise in chosen field.",
        preferences:
          "Prefer roles with a mix of independent and team work, value opportunities for continuous learning.",
      },
    },
    {
      actionableInsights: {
        skillDevelopment:
          "Enhance communication skills and technical knowledge through workshops and online courses.",
        networking:
          "Participate in industry meetups and online forums to connect with professionals.",
        experience:
          "Engage in volunteer work and freelance projects to build a robust portfolio.",
      },
      training: {
        courses:
          "Enroll in courses related to software development, digital marketing, or healthcare administration.",
        workshops:
          "Attend bootcamps and hackathons to develop practical skills.",
        certifications:
          "Obtain certifications in areas such as cloud computing, digital marketing, or healthcare management.",
      },
      careerSuggestions: [
        {
          career: "Software Developer",
          reason:
            "Strong logical thinking and interest in technology and coding.",
          actions:
            "Learn programming languages, build projects, and contribute to open-source communities.",
          requiredSkills: "Programming, problem-solving, debugging.",
          relevantCourses:
            "Computer Science, Web Development, Data Structures and Algorithms.",
        },
        {
          career: "Digital Marketing Specialist",
          reason:
            "Creative mindset and strong interest in online trends and social media.",
          actions:
            "Take digital marketing courses, gain experience through internships, and build a portfolio showcasing your work.",
          requiredSkills: "SEO, content creation, analytics.",
          relevantCourses:
            "Digital Marketing, Content Strategy, Social Media Management.",
        },
        {
          career: "Healthcare Administrator",
          reason: "Interest in healthcare and strong organizational skills.",
          actions:
            "Pursue a degree in healthcare administration, gain experience through internships, and develop leadership skills.",
          requiredSkills:
            "Leadership, healthcare policies, financial management.",
          relevantCourses:
            "Healthcare Administration, Public Health, Financial Management in Healthcare.",
        },
      ],
      summary: {
        interests: "Technology, online marketing, healthcare management.",
        strengths:
          "Logical thinking, creativity, strong organizational skills.",
        values:
          "Commitment to professional growth, desire to make a positive impact.",
        weaknesses:
          "Needs to develop deeper expertise in certain technical areas.",
        goals:
          "Become a leader in the chosen field, continuously learn and adapt to new challenges.",
        preferences:
          "Roles that offer a mix of creative and analytical tasks, opportunities for professional development.",
      },
    },
    {
      actionableInsights: {
        skillDevelopment:
          "Improve problem-solving and analytical skills through challenging projects and advanced courses.",
        networking:
          "Engage in online communities and attend webinars to stay updated with industry trends.",
        experience:
          "Pursue part-time jobs and internships to gain hands-on experience.",
      },
      training: {
        courses:
          "Enroll in courses related to business analysis, graphic design, or cybersecurity.",
        workshops: "Participate in hands-on workshops and seminars.",
        certifications:
          "Achieve certifications in business analysis, design software, or cybersecurity.",
      },
      careerSuggestions: [
        {
          career: "Business Analyst",
          reason:
            "Strong analytical skills and interest in improving business processes.",
          actions:
            "Study business analysis techniques, gain experience through internships, and work on real-world projects.",
          requiredSkills: "Data analysis, process improvement, communication.",
          relevantCourses:
            "Business Analysis, Data Analytics, Process Improvement.",
        },
        {
          career: "Graphic Designer",
          reason: "Creative flair and interest in visual communication.",
          actions:
            "Learn design software, build a portfolio, and gain experience through freelance projects.",
          requiredSkills:
            "Creativity, software proficiency, visual communication.",
          relevantCourses: "Graphic Design, Typography, Adobe Creative Suite.",
        },
        {
          career: "Cybersecurity Specialist",
          reason: "Interest in technology and protecting digital information.",
          actions:
            "Study cybersecurity principles, gain hands-on experience through labs and simulations, and earn relevant certifications.",
          requiredSkills: "Network security, ethical hacking, risk assessment.",
          relevantCourses: "Cybersecurity, Ethical Hacking, Network Security.",
        },
      ],
      summary: {
        interests: "Business processes, visual arts, digital security.",
        strengths: "Analytical thinking, creativity, attention to detail.",
        values: "High value on job security and professional growth.",
        weaknesses: "Needs to improve technical skills in specific areas.",
        goals:
          "Excel in a professional role, contribute to significant projects, and achieve a healthy work-life balance.",
        preferences:
          "Roles with a focus on problem-solving and creativity, opportunities for continuous learning.",
      },
    },
  ];

  const handleReadMore = (data) => {
    setPopupData(data);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupData(null);
  };

  useEffect(() => {
    fetchUserAnalysisHistory();
  }, []);

  return (
    <>
      <section className="bg-gradient-to-r from-white to-[#dcecff] pt-32">
        <div className="container mx-auto px-5">
          <form onSubmit={handleSubmit(userProfileHandler)}>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/3 mb-4 p-5 h-auto">
                <div className="bg-white rounded shadow p-4 text-center">
                  <div className="w-30 flex items-center justify-center relative">
                    <img
                      src={previewImage}
                      alt="avatar"
                      className="rounded-full mx-auto mb-4 w-32 h-32 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                    {isEditable && (
                      <div className="image_preview h-40 flex item-center justify-center absolute top-0">
                        <button
                          type="button"
                          onClick={handleImageUpload}
                          className="w-32 h-32 flex items-baseline justify-end rounded-full border-2 relative"
                        >
                          <FaCamera className="bg-blue-900 text-white text-2xl border border-black/40 p-1 rounded-full absolute top-20" />
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileUploadRef}
                          onChange={handleImageChange}
                          className="mx-auto mb-4 hidden"
                        />
                      </div>
                    )}
                  </div>
                  <h5 className="text-xl font-medium my-3">
                    {userdata?.fullname}
                  </h5>
                  <p className="text-gray-500 mb-1 text-sm">
                    {userdata?.occupation}
                  </p>
                  <p className="text-gray-500 mb-4 text-sm">
                    {userdata?.address}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-2/3 p-5 h-auto">
                <div className="bg-gray-50 rounded shadow mb-4 p-4">
                  <div className="flex items-center justify-end">
                    {isEditable ? (
                      <Button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-4 rounded"
                      >
                        Save
                      </Button>
                    ) : (
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger>
                            <FaRegEdit
                              onClick={() => setIsEditable(true)}
                              className="text-2xl text-blue-900 cursor-pointer"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="bg-white py-2 px-5 border-1 shadow-lg rounded">
                              Edit
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center my-3">
                    <div className="w-full sm:w-1/3">
                      <p className="font-semibold text-base">Full Name</p>
                    </div>
                    <div className="w-full sm:w-2/3">
                      <div className="mt-2">
                        {isEditable ? (
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                            <input
                              type="text"
                              {...register("fullname")}
                              defaultValue={userdata?.fullname}
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        ) : (
                          <p className="text-gray-500">{userdata?.fullname}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="flex flex-wrap my-3 items-center">
                    <div className="w-full sm:w-1/3">
                      <p className="font-semibold text-base">Email</p>
                    </div>
                    <div className="w-full sm:w-2/3">
                      <div className="mt-2">
                        <p className="text-gray-500">{userdata?.email}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="flex flex-wrap my-3 items-center">
                    <div className="w-full sm:w-1/3">
                      <p className="font-semibold text-base">Occupation</p>
                    </div>
                    <div className="w-full sm:w-2/3">
                      <div className="mt-2">
                        {isEditable ? (
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                            <input
                              type="text"
                              {...register("occupation")}
                              defaultValue={userdata?.occupation}
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        ) : (
                          <p className="text-gray-500">
                            {userdata?.occupation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="flex flex-wrap my-3 items-center">
                    <div className="w-full sm:w-1/3">
                      <p className="font-semibold text-base">Address</p>
                    </div>
                    <div className="w-full sm:w-2/3">
                      <div className="mt-2">
                        {isEditable ? (
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                            <input
                              type="text"
                              {...register("address")}
                              defaultValue={userdata?.address}
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        ) : (
                          <p className="text-gray-500">{userdata?.address}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section className="w-full py-10 px-20">
        <h1 className="text-blue-950 text-2xl ">CV Analyser History</h1>

        <div className="flex flex-wrap">
          {analysisData.length === 0
            ? Array(5)
                .fill()
                .map((_, index) => (
                  <div className="w-[350px] mr-10 my-4 flex-1" key={index}>
                    <Skeleton width="100%" height={200} />
                  </div>
                ))
            : analysisData.map((item, index) => {
                console.log("items:::", item);
                return (
                  <Card
                    className="w-[350px] mr-10 my-4 cursor-pointer hover:shadow-2xl"
                    key={item._id}
                    onClick={() => handleUserAnalysis(item._id)}
                  >
                    <div className="p-4 flex justify-center items-center">
                      <div className="md:w-[40%] w-full graph">
                        <div className="p-4 relative z-10">
                          {/* <Heat
                          progress={item.analysis.resume_score}
                          range={{ from: 0, to: 100 }}
                          sign={{ value: "%", position: "end" }}
                          showValue={true}
                          revertBackground={false}
                          text={"Score"}
                          sx={{
                            barWidth: 10,
                            shape: "half",
                            valueSize: 13,
                            textSize: 13,
                            valueFamily: "Trebuchet MS",
                            textFamily: "Trebuchet MS",
                            valueWeight: "normal",
                            textWeight: "normal", 
                            textColor: "#000000",
                            valueColor: "#000000",
                            loadingTime: 1000,
                            strokeLinecap: "round",
                            valueAnimation: true,
                            intersectionEnabled: true,
                          }}
                        /> */}
                          <Flat
                            progress={item.analysis.resume_score}
                            text={"Score"}
                            sx={{
                              strokeColor: "#0075ff",
                              barWidth: 4,
                              valueSize: 20,
                              textSize: 10,
                              miniCircleColor: "#3b75ba",
                            }}
                          />
                        </div>
                      </div>
                      <div className="md:w-[60%] w-full analyser_content">
                        <ul className="text-sm list-disc pl-10">
                          <li className="my-1 text-red-400 flex justify-between">
                            <span className="font-medium">Analysis</span>
                            <span className="ml-2 text-blue-600">
                              {item.analysis.resume_score}
                            </span>
                          </li>
                          <li className="my-1 text-red-400 flex justify-between">
                            <span className="font-medium">Clarity</span>
                            <span className="text-blue-600 ml-2">
                              {item.clarity.score}
                            </span>
                          </li>
                          <li className="my-1 text-red-400 flex justify-between">
                            <span className="font-medium">Content Quality</span>
                            <span className="text-blue-600 ml-2">
                              {item.content_quality.score}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <div>
                      <div className="text-blue-600 text-end mx-2 text-sm p-2">
                        <span className="ml-2 ">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                    </div> */}
                  </Card>
                );
              })}
        </div>
      </section>
      <section className="w-full h-full py-10 px-20">
        <h1 className="text-blue-950 text-2xl py-5">
          Psychometric Test Summary
        </h1>
        <div className="summary_cards_wrapper">
          <div className="grid grid-cols-4 gap-10">
            {testSummary?.map((val, index) => (
              <div className="summary_cards relative" key={index}>
                <div className="max-w-2xl w-[250px] p-6 min-h-[220px] bg-white border border-gray-200 rounded-lg shadow">
                  <a href="#">
                    <h5 className="mb-2 text-xl font-bold text-gray-900">
                      User Summary
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-sm text-gray-700">
                    Interests: {val.summary.interests}
                  </p>
                  <div className="summary_card_footer absolute bottom-6 left-6 right-6">
                    <div
                      className="inline-flex items-center px-2 py-2 text-sm text-white bg-blue-950 rounded-md cursor-pointer"
                      onClick={() => handleReadMore(val)}
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-2.5 h-2.5 ms-2 mt-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {showPopup && popupData && (
              <div className="fixed top-0 inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white max-w-5xl h-[500px] w-full p-6 rounded-lg shadow-lg">
                  <button
                    onClick={closePopup}
                    className="absolute top-[4rem] right-[8rem] text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <Tabs
                    className="w-full py-5"
                    defaultValue="actionableInsights"
                  >
                    <TabsList className="mb-4 flex w-full justify-center flex-wrap h-auto">
                      <TabsTrigger
                        value="actionableInsights"
                        className=" text-blue-950 rounded-md text-base"
                      >
                        Actionable Insights
                      </TabsTrigger>
                      <TabsTrigger
                        value="training"
                        className=" text-blue-950 rounded-md text-base"
                      >
                        Training
                      </TabsTrigger>
                      <TabsTrigger
                        value="careerSuggestions"
                        className=" text-blue-950 rounded-md text-base"
                      >
                        Career Suggestions
                      </TabsTrigger>
                      <TabsTrigger
                        value="summary"
                        className=" text-blue-950 rounded-md text-base"
                      >
                        Summary
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="actionableInsights" className="mb-4">
                      <div className="actions_section max-w-4xl mx-auto">
                        <div>
                          <h2 className="text-xl font-bold mb-6 text-blue-950">
                            Actionable Insights
                          </h2>
                          <ul className="space-y-3 text-sm">
                            <li>
                              <strong>Skill Development:</strong>{" "}
                              {popupData.actionableInsights.experience}
                            </li>
                            <li>
                              <strong>Networking:</strong>
                              {popupData.actionableInsights.skillDevelopment}
                            </li>
                            <li>
                              <strong>Experience:</strong>
                              {popupData.actionableInsights.networking}
                            </li>
                            <li>
                              <strong>Weaknesses:</strong>
                              {popupData.summary.weaknesses}
                            </li>
                            <li>
                              <strong>Goals:</strong>
                              {popupData.summary.goals}
                            </li>
                            <li>
                              <strong>Preferences:</strong>
                              {popupData.summary.preferences}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent className="mb-6" value="training">
                      <div className="training_section max-w-4xl mx-auto summary_section">
                        <div>
                          <h2 className="text-xl font-bold mb-6 text-blue-950">
                            Training
                          </h2>

                          <ul className="space-y-3 text-sm">
                            <li>
                              <strong>Courses:</strong>
                              {popupData.training.courses}
                            </li>
                            <li>
                              <strong>Workshops:</strong>
                              {popupData.training.workshops}
                            </li>
                            <li>
                              <strong>Certifications:</strong>
                              {popupData.training.certifications}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent className="mb-6" value="careerSuggestions">
                      <div className="career_section max-w-4xl mx-auto">
                        <div className="space-y-3">
                          <h2 className="text-xl font-bold text-blue-950 flex items-center gap-3">
                            Career Suggestions
                          </h2>
                          <ul className="space-y-3 text-sm">
                            {popupData?.careerSuggestions.map(
                              (career, index) => (
                                <li key={index} className="py-2 space-y-2">
                                  <strong>Career:</strong> {career.career}
                                  <br />
                                  <strong>Reason:</strong> {career.reason}
                                  <br />
                                  <strong>Actions:</strong> {career.actions}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent className="mb-6" value="summary">
                      <div className="max-w-4xl mx-auto summary_section">
                        <div>
                          <h2 className="text-xl font-bold mb-6 text-blue-950">
                            Summary
                          </h2>
                          <ul className="space-y-3 text-sm">
                            <li>
                              <strong>Interests :</strong>
                              {popupData.summary.interests}
                            </li>
                            <li>
                              <strong>Strengths:</strong>
                              {popupData.summary.strengths}
                            </li>
                            <li>
                              <strong>Values:</strong>
                              {popupData.summary.values}
                            </li>
                            <li>
                              <strong>Weaknesses:</strong>
                              {popupData.summary.weaknesses}
                            </li>
                            <li>
                              <strong>Goals:</strong>
                              {popupData.summary.goals}
                            </li>
                            <li>
                              <strong>Preferences:</strong>
                              {popupData.summary.preferences}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  {/* <div className="summary_section">
                    <div className="summary_header mb-6">
                      <h2 className="text-2xl font-bold">Summary</h2>
                    </div>
                    <div className="flex">
                      <div className="bg-gray-100 p-4 rounded-l-lg w-1/4">
                        <ul className="space-y-3">
                          <li>
                            <strong>Interests:</strong>
                          </li>
                          <li>
                            <strong>Strengths:</strong>
                          </li>
                          <li>
                            <strong>Values:</strong>
                          </li>
                          <li>
                            <strong>Weaknesses:</strong>
                          </li>
                          <li>
                            <strong>Goals:</strong>
                          </li>
                          <li>
                            <strong>Preferences:</strong>
                          </li>
                        </ul>
                      </div>
                      <div className="p-4 w-3/4 space-y-3 text-sm">
                        <p>{popupData.summary.interests}</p>
                        <p>{popupData.summary.strengths}</p>
                        <p>{popupData.summary.values}</p>
                        <p>{popupData.summary.weaknesses}</p>
                        <p>{popupData.summary.goals}</p>
                        <p>{popupData.summary.preferences}</p>
                        <button
                        onClick={closePopup}
                        className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-md hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300"
                      >
                        Close
                      </button>
                      </div>
                    </div>
                  </div>
                  <div className="actions_section">
                    <div className="summary_header mb-6">
                      <h2 className="text-2xl font-bold">
                        Actionable Insights
                      </h2>
                    </div>
                    <div className="flex">
                      <div className="bg-gray-100 p-4 rounded-l-lg w-1/4">
                        <ul className="space-y-3">
                          <li>
                            <strong>Skill Development:</strong>
                          </li>
                          <li>
                            <strong>Networking:</strong>
                          </li>
                          <li>
                            <strong>Experience:</strong>
                          </li>
                          <li>
                            <strong>Weaknesses:</strong>
                          </li>
                          <li>
                            <strong>Goals:</strong>
                          </li>
                          <li>
                            <strong>Preferences:</strong>
                          </li>
                        </ul>
                      </div>
                      <div className="p-4 w-3/4 space-y-3 text-sm">
                        <p>{popupData.actionableInsights.experience}</p>
                        <p>{popupData.actionableInsights.skillDevelopment}</p>
                        <p>{popupData.actionableInsights.networking}</p>
                        <p>{popupData.summary.weaknesses}</p>
                        <p>{popupData.summary.goals}</p>
                        <p>{popupData.summary.preferences}</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default ProfilePage;
