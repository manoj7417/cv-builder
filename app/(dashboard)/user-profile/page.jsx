"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FaCamera,
  FaRegEdit,
} from "react-icons/fa";
import { useUserStore } from "@/app/store/UserStore";
import { useForm } from "react-hook-form";
import { uploadProfilePicture, updateUserProfile, uploadImage } from "@/app/pages/api/api";
import { GetTokens, SetTokens } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { ToastContainer, toast } from "react-toastify";

const ProfilePage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const { userState, updateUserData } = useUserStore(state => ({
    userState: state.userState,
    updateUserData: state.updateUserData,
  }));
  const userdata = userState.userdata;
  const [previewImage, setPreviewImage] = useState(userdata?.profilePicture);
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image file

  const fileUploadRef = useRef();

  useEffect(() => {
    setPreviewImage(userdata?.profilePicture);
  }, [userdata]);

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
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
        formData.append("upload_preset", 'fr8vexzg'); // Ensure the upload preset is correct
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
        const { accessToken: newAccessToken, refreshToken: newRefreshToken, userdata } = response.data.data;
        updateUserData(userdata);
        setPreviewImage(userdata.profilePicture);
        reset(userdata);

        await SetTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the selected image file
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <section className="bg-gradient-to-r from-white to-[#dcecff] py-20">
        <div className="container mx-auto px-5">
          <form onSubmit={handleSubmit(userProfileHandler)}>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/3 mb-4 p-5">
                <div className="bg-white rounded shadow p-4 text-center">
                  <div className="w-30 flex items-center justify-center relative">
                    <img
                      src={previewImage}
                      alt="avatar"
                      className="rounded-full mx-auto mb-4 w-32 h-32 object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }} // Fallback image if the URL fails
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
                  <h5 className="text-xl font-medium my-3">{userdata?.fullname}</h5>
                  <p className="text-gray-500 mb-1 text-sm">{userdata?.occupation}</p>
                  <p className="text-gray-500 mb-4 text-sm">{userdata?.address}</p>
                </div>
              </div>
              <div className="w-full lg:w-2/3 p-5">
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
                            <FaRegEdit onClick={() => setIsEditable(true)} className="text-2xl text-blue-900 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="bg-white py-2 px-5 border-1 shadow-lg rounded">Edit</p>
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
                          <p className="text-gray-500">{userdata?.occupation}</p>
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
      <ToastContainer />
    </>
  );
};

export default ProfilePage;
