"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import {
  FaCamera,
  FaFacebook,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { useUserStore } from "@/app/store/UserStore";
import { useForm } from "react-hook-form";
import { uploadProfilePicture } from "@/app/pages/api/api";
import { GetTokens } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'

const socialIcons = {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaInstagram,
};

const SocialLinkInput = ({ register, name, icon: Icon, url, color }) => (
  <li className="flex justify-between items-center p-3">
    <Icon className={`text-xl ${color}`} />
    {/* <p className="mb-0 text-sm font-semibold">{url}</p> */}
    <input
      type="text"
      defaultValue={url}
      {...register(name)}
      className="ml-4 text-sm font-semibold p-1 border border-gray-300 rounded"
    />
  </li>
);

const SocialLinkDisplay = ({ icon: Icon, url, color }) => (
  <li className="flex justify-between items-center p-3">
    <Icon className={`text-xl ${color}`} />
    <p className="ml-4 text-sm font-semibold">{url}</p>
  </li>
);

const ProfilePage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const { userdata } = useUserStore(state => state.userState)
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const userData = {
    userProfile: "pic.jpg",
    fullName: "Anuj Rawat",
    email: "text@test.com",
    occupation: "Software Developer",
    address: "Bay Area, San Francisco, CA",
    socialLinks: [
      {
        name: "Facebook",
        url: "www.facebook.com",
        icon: "FaFacebook",
        color: "text-blue-600",
      },
      {
        name: "Twitter",
        url: "www.twitter.com",
        icon: "FaTwitter",
        color: "text-blue-400",
      },
      {
        name: "Github",
        url: "www.github.com",
        icon: "FaGithub",
        color: "text-gray-800",
      },
      {
        name: "Instagram",
        url: "www.instagram.com",
        icon: "FaInstagram",
        color: "text-pink-600",
      },
    ],
    templates: {
      free: [
        {
          id: 1,
          name: "Free Template 1",
          images: "/5.png",
        },
        {
          id: 2,
          name: "Free Template 2",
          images: "/6.png",
        },
      ],
      premium: [
        {
          id: 1,
          name: "Premium Template 1",
          images: "/10.png",
        },
        {
          id: 2,
          name: "Premium Template 2",
          images: "/11.png",
        },
      ],
    },
  };
  const updateUserData = useUserStore(state => state.updateUserData)

  const fileUploadRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: userdata?.fullname,
      occupation: userdata?.occupation,
      address: userdata?.address,
      socialLinks: userData?.socialLinks?.map((link) => ({
        name: link.name,
        url: link.url,
      }))
    },
  });

  const userProfileHandler = (data) => {
    console.log(data)
    setIsEditable(false);
  };

  const handleImageChange = async (e) => {
    const { accessToken } = await GetTokens()
    const file = e.target.files[0];
    try {
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          const formData = new FormData();
          formData.append("file", file);
          const response = await uploadProfilePicture(formData, accessToken.value)
          if (response.status === 200) {
            updateUserData(response.data.userdata)
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      throw error
    }
  };




  return (
    <>
      <section className="bg-gradient-to-r from-white to-[#dcecff] py-20">
        <div className="container mx-auto px-5">
          <form onSubmit={handleSubmit(userProfileHandler)}>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/3 mb-4 p-5">
                <div className="bg-white rounded shadow p-4 text-center ">
                  <div className="w-30 flex items-center justify-center relative">
                    <img
                      src={userdata?.profilePicture}
                      alt="avatar"
                      className="rounded-full mx-auto mb-4 w-32 h-32 object-cover"
                    />
                    {isEditable && (
                      <div className="image_preview h-40 flex item-center justify-center absolute top-0">
                        <button
                          type='button'
                          onClick={handleImageUpload}
                          className='w-32 h-32 flex items-baseline justify-end rounded-full border-2 relative'>
                          <FaCamera className='bg-blue-900 text-white text-2xl border border-black/40 p-1 rounded-full absolute top-20' />
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileUploadRef}
                          onChange={handleImageChange}
                          className="mx-auto mb-4 hidden"
                          hidden
                        />
                      </div>
                    )
                    }
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
                <div className="bg-white rounded shadow p-0 mt-4">
                  <ul className="divide-y divide-gray-200">
                    {userData?.socialLinks?.map((link, index) =>
                      isEditable ? (
                        <SocialLinkInput
                          key={link.name}
                          icon={socialIcons[link.icon]}
                          name={link.name}
                          url={link.url}
                          color={link.color}
                          register={register}
                        />
                      ) : (
                        <SocialLinkDisplay
                          key={link.name}
                          icon={socialIcons[link.icon]}
                          url={link.url}
                          color={link.color}
                        />
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-2/3 p-5">
                <div className="bg-gray-50 rounded shadow mb-4 p-4">
                  <div className="flex items-center justify-end">
                    {isEditable ?
                      (
                        <Button
                          type="submit"
                          className="bg-green-500 text-white py-2 px-4 rounded"
                        >
                          Save
                        </Button>
                      ) :
                      (
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger >
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
                      {/* <p className="text-gray-500">Johnatan Smith</p> */}
                      <div className="mt-2">
                        {isEditable ? (
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                            <input
                              type="text"
                              {...register("fullName")}
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
                      {/* <p className="text-gray-500">example@example.com</p> */}
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
                      {/* <p className="text-gray-500">(098) 765-4321</p> */}
                      <div className="mt-2">
                        {isEditable ? (
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                            <input
                              type="text"
                              {...register("occupation")}
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
                      {/* <p className="text-gray-500">
                        Bay Area, San Francisco, CA
                      </p> */}
                      <div className="mt-2">
                        {isEditable ? (
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                            <input
                              type="text"
                              {...register("address")}
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
    </>
  );
};

export default ProfilePage;
