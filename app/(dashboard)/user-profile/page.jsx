"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaCamera, FaRegEdit } from "react-icons/fa";
import { useUserStore } from "@/app/store/UserStore";
import { useForm } from "react-hook-form";
import { uploadImage, updateUserProfile } from "@/app/api/api";
import { GetTokens, SetTokens } from "@/app/actions";
import { Button } from "@/components/ui/button";
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

  //   analysis
  // :
  // {resume_score: 92, feedback: Array(4)}
  // clarity
  // :
  // {score: 88, pointers: Array(3)}
  // content_quality
  // :
  // {score: 90, pointers: Array(3)}
  // createdAt
  // :
  // "2024-07-08T07:17:23.160Z"
  // relevancy
  // :
  // {score: 95, pointers: Array(3)}
  // updatedAt
  // :
  // "2024-07-08T07:17:23.160Z"
  // userId
  // :
  // "661e0a1b6402eb36403788b0"
  // __v
  // :
  // 0
  // _id
  // :
  // "668b92832817af8fa8a6f423"
  // [[Prototype]]
  // :
  // Object

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
                        <div className="p-4">
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
      <Toaster />
    </>
  );
};

export default ProfilePage;
