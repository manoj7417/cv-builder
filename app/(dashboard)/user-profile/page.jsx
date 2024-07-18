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
import { Card } from "../../../components/ui/card";
import { useRouter } from "next/navigation";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Flat, Heat, Nested } from "@alptugidin/react-circular-progress-bar";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { GoKey } from "react-icons/go";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { ImSpinner3 } from "react-icons/im";
import { FaChevronRight } from "react-icons/fa6";
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
  const [popupData, setPopupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [showDialog, setShowDialog] = useState(false)
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [oldPasswordError, setOldPasswordError] = useState('')
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

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    value = value.trim()
    setPasswords({ ...passwords, [name]: value })
  }

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
      if (response.status === 200) {
        setAnalysisData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    const { accessToken } = await GetTokens();
    const token = accessToken?.value;
    try {
      const response = await axios.get("/api/getSummary", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.status === 200) {
        setPopupData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };


  const handleUserAnalysis = (id) => {
    router.push(`/analyser/${id}`);
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }


  const handleReadMore = (data) => {
    setCardData(data);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleResetPassword = () => {
    setPasswordError('')
    setOldPasswordError('')
  }

  const handleChangePassword = async () => {
    const { accessToken } = await GetTokens()
    let token = accessToken.value;
    handleResetPassword()
    let { oldPassword, newPassword, confirmPassword } = passwords
    if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
      setPasswordError('Please fill in all fields.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Please re-enter correct password.')
      return
    }
    setIsChangingPassword(true)
    try {
      const response = await axios.post('/api/changePassword', { oldPassword, newPassword }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      if (response.status === 200) {
        toast.success("Password changed successfully")
        handleDialogClose()
        setIsChangingPassword(false)
        setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' })
      }
    } catch (error) {
      if (error.response.status === 401) {
        setOldPasswordError("Incorrect old password")
      }
    }
  }

  const handleDialogClose = () => {
    setShowDialog(false);
    setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' })
    setPasswordError('')
    setOldPasswordError('')
  }

  const handleForgotPassword = () => {

    try {

    } catch (error) {

    }
  }



  useEffect(() => {
    fetchUserAnalysisHistory();
  }, []);

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <>
      <section className="bg-gradient-to-r from-white to-[#dcecff] pt-28">
        <Dialog open={showDialog} >
          <DialogContent showCloseButton onClick={handleDialogClose} className="w-96">
            <div className="w-full flex flex-col items-center">
              <div className="w-24  h-24 flex items-center justify-center rounded-full bg-blue-100">
                <GoKey className="text-5xl text-blue-800" />
              </div>
              <div className="py-4 text-xl w-full px-4 flex flex-col items-center">
                <h1>Set your new password</h1>
                <div className="w-full my-1">
                  <Label className=" text-sm">Old password</Label>
                  <Input type="password" className="mt-1" onChange={handleInputChange} name="oldPassword" value={passwords.oldPassword} />
                  <div className="w-full">
                    {oldPasswordError && <p className="text-xs text-red-600 text-start">{oldPasswordError}</p>}
                  </div>
                </div>

                <div className="w-full my-1">
                  <Label className=" text-sm">New password</Label>
                  <Input type="password" className="mt-1" onChange={handleInputChange} name="newPassword" value={passwords.newPassword} />
                </div>
                <div className="w-full my-1">
                  <Label className="mb-1">Confirm new password</Label>
                  <Input type="password" className="mt-1" onChange={handleInputChange} name="confirmPassword" value={passwords.confirmPassword} />
                </div>
                <div className="w-full">
                  {passwordError && <p className="text-xs text-red-600 text-start">{passwordError}</p>}
                </div>
                <div className="w-full my-2" >
                  <p className="text-sm cursor-pointer" onClick={handleForgotPassword}>Forgot password?</p>
                </div>
                <div className="pt-5 w-full">
                  <Button className="w-full" onClick={handleChangePassword} disabled={isChangingPassword}>
                    {
                      isChangingPassword ? (
                        <>
                          Changing Password<ImSpinner3 className="animate-spin w-3 h-3 text-white ml-1" />
                        </>
                      ) : (
                        <>
                          Change password<FaChevronRight className="w-3 h-3 text-white ml-1" />
                        </>
                      )
                    }
                  </Button>
                </div>
              </div>

            </div>
          </DialogContent>
        </Dialog>
        <div className="flex justify-end px-10">
          <Button className="" onClick={() => setShowDialog(true)}>Change Password</Button>
        </div>
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
      </section >
      <section className="w-full py-10 px-20">
        <h1 className="text-blue-950 text-4xl font-medium">CV Analyser History</h1>
        <div className="flex flex-wrap">
          {loading ? (
            Array(5)
              .fill()
              .map((_, index) => (
                <div className="w-[350px] mr-10 my-4 flex-1" key={index}>
                  <Skeleton width="100%" height={200} />
                </div>
              ))
          ) : analysisData.length === 0 ? (
            <div className="w-[350px] mr-10 my-4">
              <Card className="w-full h-[200px] flex items-center justify-center">
                <span>No analyzer data yet</span>
              </Card>
            </div>
          ) : (
            analysisData.map((item, index) => {
              return (
                <Card
                  className="w-[350px] mr-10 my-4 cursor-pointer hover:shadow-2xl"
                  key={item._id}
                  onClick={() => handleUserAnalysis(item._id)}
                >
                  <div className="p-4 flex justify-center items-center">
                    <div className="md:w-[40%] w-full graph">
                      <div className="p-4 relative z-10">
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
                </Card>
              );
            })
          )}
        </div>
      </section>
      <section className="w-full h-full py-10 px-20">
        <h1 className="text-blue-950 text-4xl py-5 font-medium">
          Psychometric Test Summary
        </h1>
        <div className="summary_cards_wrapper">
          <div className="grid grid-cols-4 gap-10">
            {loading ? (
              Array(5)
                .fill()
                .map((_, index) => (
                  <div className="w-[350px] mr-10 my-4 flex-1" key={index}>
                    <Skeleton width="100%" height={200} />
                  </div>
                ))
            ) : popupData?.length === 0 ? (
              <div className="w-[350px] mr-10 my-4">
                <Card className="w-full h-[200px] flex items-center justify-center">
                  <span>No Test Summary data yet</span>
                </Card>
              </div>
            ) : (
              popupData?.map((val, index) => (
                <div className="summary_cards relative" key={index}>
                  <div className="max-w-2xl w-[250px] p-6 min-h-[220px] bg-white border border-gray-200 rounded-lg shadow">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold text-gray-900">
                        User Summary
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-sm text-gray-700">
                      Interests: {val.summary.interests.slice(0, 100)}
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
              ))
            )}

            {showPopup && popupData && (
              <div className="fixed top-0 inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white max-w-5xl min-h-[500px] w-full p-6 rounded-lg shadow-lg relative">
                  <button
                    onClick={closePopup}
                    className="absolute top-[1rem] right-[1rem] text-gray-400 hover:text-gray-600 focus:outline-none"
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
                            {Object.entries(cardData?.actionableInsights).map(
                              ([key, value], idx) => (
                                <li key={idx}>
                                  <strong>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                    :
                                  </strong>{" "}
                                  <p>{value}</p>
                                </li>
                              )
                            )}
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
                            {cardData?.careerSuggestions?.map(
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
                            {Object.entries(cardData?.summary).map(
                              ([key, value], idx) => (
                                <li key={idx}>
                                  <strong>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                    :
                                  </strong>{" "}
                                  <p>{value}</p>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
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
