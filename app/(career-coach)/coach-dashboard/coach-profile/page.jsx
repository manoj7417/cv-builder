/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import {
  FaCheckCircle,
  FaEye,
  FaSpinner,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import ResumeTooltip from "@/components/component/ResumeTooltip";
import axios from "axios";
import { GetTokens } from "@/app/actions";
import { toast } from "react-toastify";
import { useCoachStore } from "@/app/store/coachStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImSpinner3, ImSpinner8 } from "react-icons/im";
import {
  MdOutlineFileUpload,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdCloudUpload, IoMdInformationCircleOutline } from "react-icons/io";
import ReactPlayer from "react-player";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import CoachSearchBar from "@/components/component/CoachSearchBar";

const CoachProfile = () => {
  const defaultImage = "https://via.placeholder.com/150";
  const { userdata } = useCoachStore((state) => state.userState);
  const { updateUserData } = useCoachStore();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting, isDirty },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: userdata?.name,
      email: userdata?.email,
      phone: userdata?.phone,
      profileImage: userdata?.profileImage,
      experience: userdata?.experience,
      typeOfCoaching: userdata?.typeOfCoaching,
      skills: userdata?.skills,
      dateofBirth: userdata?.dateofBirth
        ? new Date(userdata.dateofBirth).toISOString().split("T")[0]
        : "",
      placeofBirth: userdata?.placeofBirth,
      bio: userdata?.bio,
      coachingDescription: userdata?.coachingDescription,
      address: userdata?.address,
      city: userdata?.city,
      country: userdata?.country,
      zip: userdata?.zip,
      bankName: userdata?.bankDetails?.bankName,
      accountNumber: userdata?.bankDetails?.accountNumber,
      ifscCode: userdata?.bankDetails?.code?.value,
      ratesPerHour: userdata?.ratesPerHour?.charges,
      cv: userdata?.cv?.link,
      signedAggrement: userdata?.signedAggrement?.link,
      profileVideo: userdata?.profileVideo,
      socialLinks: userdata?.socialLinks || [],
    },
  });

  const [activeTab, setActiveTab] = useState("details");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const imageUrl = watch("profileImage");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [fileType, setFileType] = useState(null);
  const [isUploadingCV, setIsUploadingCV] = useState(false);
  const [isUploadingDocs, setIsUploadingDocs] = useState(false);
  const [isCvLoading, setIsCvLoading] = useState(false);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);
  const [cvFileUrl, setCvFileUrl] = useState(userdata?.cv?.link || "");
  const [docsUrl, setDocsUrl] = useState(userdata?.signedAggrement?.link || "");
  const [isApiLoading, setIsApiLoading] = useState(false);
  const coachingDescription = watch("coachingDescription");
  const bio = watch("bio");
  const [typeOfCoachingOptions, setTypeOfCoachingOptions] = useState([
    "Career Coaching",
    "Life Coaching",
    "Executive Coaching",
    "Health and Wellness Coaching",
    "Relationship Coaching",
    "Business Coaching",
    "Financial Coaching",
    "Parenting Coaching",
    "Spiritual Coaching",
    "Leadership Coaching",
  ]);

  const { fields } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const cvFile = watch("cvUpload");
  const docsFile = watch("docsUpload");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsImageUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post("/api/uploadImage", formData);
        if (response.status === 200) {
          const imageUrl = response.data.url;
          setValue("profileImage", imageUrl);
        } else {
          console.error("Image upload failed.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsImageUploading(false);
      }
    }
  };

  const removeImage = () => {
    setValue("profileImage", null);
    setValue("profileImage", null);
  };

  const openModal = (url) => {
    if (url) {
      setPdfUrl(url);
      setIsModalOpen(true);
    } else {
      toast.error("No document available to view");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleEditProfile = async (data) => {
    const { accessToken } = await GetTokens(true);
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      profileImage: data.profileImage,
      experience: data.experience,
      typeOfCoaching: data.typeOfCoaching,
      skills: data.skills,
      dateofBirth: data.dateofBirth,
      bio: data.bio,
      coachingDescription: data.coachingDescription,
      address: data.address,
      city: data.city,
      country: data.country,
      zip: data.zip,
      bankDetails: {
        accountNumber: data.accountNumber,
        code: {
          value: data.ifscCode,
        },
        bankName: data.bankName,
      },
      ratesPerHour: {
        charges: data.ratesPerHour,
      },
      cv: {
        link: cvFileUrl,
      },
      profileVideo: {
        url: data.profileVideo?.url,
      },
      signedAggrement: {
        link: docsUrl,
      },
      experience: data.experience,
      socialLinks: data?.socialLinks || [],
      typeOfCoaching: data.typeOfCoaching,
      skills: data.skills,
      dateofBirth: data.dateofBirth,
      placeofBirth: data.placeofBirth,
      bio: data.bio,
      coachingDescription: data.coachingDescription,
      address: data.address,
    };
    setIsApiLoading(true);
    try {
      const response = await axios.post("/api/editCoachInfo", payload, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        updateUserData(response.data.coach);
        toast.success("Form submitted successfully");
        setIsApiLoading(false);
      }
    } catch (error) {
      toast.error("An error occured in updating the profile details");
    } finally {
      setIsApiLoading(false);
      setIsEditable(false);
    }
  };

  const handleCVUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploadingCV(true);
      const formData = new FormData();
      formData.append("cvUpload", file);
      try {
        setIsCvLoading(true);
        const response = await axios.post("/api/uploadImage", formData);
        if (response.status === 200) {
          const cvUrl = response.data.url;
          setValue("cvUpload", cvUrl);
          setCvFileUrl(cvUrl);
        } else {
          console.error("CV upload failed.");
        }
      } catch (error) {
        console.error("Error uploading CV:", error);
      } finally {
        setIsUploadingCV(false);
        setIsCvLoading(false);
      }
    }
  };

  const handleRemovecvUpload = () => {
    setValue("cvUpload", null);
    setCvFileUrl(null);
  };

  const handleDocUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploadingDocs(true);
      const formData = new FormData();
      formData.append("docsUpload", file);
      try {
        setIsDocumentLoading(true);
        const response = await axios.post("/api/uploadImage", formData);
        if (response.status === 200) {
          const docUrl = response.data.url;
          setValue("docsUpload", docUrl);
          setIsDocumentLoading(false);
          setDocsUrl(docUrl);
        } else {
          console.error("Document upload failed.");
        }
      } catch (error) {
        console.error("Error uploading document:", error);
      } finally {
        setIsUploadingDocs(false);
      }
    }
  };

  const handleRemoveDocs = () => {
    setValue("docsUpload", "");
    setDocsUrl(null);
  };

  const googleViewerUrl =
    fileType === "cv"
      ? `https://docs.google.com/gview?url=${cvFileUrl}&embedded=true`
      : fileType === "docs"
      ? `https://docs.google.com/gview?url=${docsUrl}&embedded=true`
      : null;

  const handleViewFile = (type) => {
    setFileType(type);
    setIsModalOpen(true);
  };

  const profileVideo = watch("profileVideo");

  const handleRemoveLink = () => {
    setValue("profileVideo", "");
  };

  const handleCoachDescription = (value) => {
    setValue("coachingDescription", value);
  };

  const handleBioChange = (value) => {
    setValue("bio", value);
  };

  useEffect(() => {
    if (userdata?.cv?.link) {
      setValue("cv", userdata.cv.link);
      setCvFileUrl(userdata.cv.link);
    }
  }, [userdata, setValue]);

  useEffect(() => {
    if (userdata?.signedAggrement?.link) {
      setValue("docs", userdata.signedAggrement.link);
      setDocsUrl(userdata.signedAggrement.link);
    }
  }, [userdata, setValue]);

  useEffect(() => {
    if (userdata) {
      reset({
        name: userdata?.name,
        email: userdata?.email,
        phone: userdata?.phone,
        profileImage: userdata?.profileImage,
        experience: userdata?.experience,
        typeOfCoaching: userdata?.typeOfCoaching,
        skills: userdata?.skills,
        dateofBirth: userdata?.dateofBirth
          ? new Date(userdata.dateofBirth).toISOString().split("T")[0]
          : "",
        placeofBirth: userdata?.placeofBirth,
        bio: userdata?.bio,
        coachingDescription: userdata?.coachingDescription,
        address: userdata?.address,
        city: userdata?.city,
        country: userdata?.country,
        zip: userdata?.zip,
        bankName: userdata?.bankDetails?.bankName,
        accountNumber: userdata?.bankDetails?.accountNumber,
        ifscCode: userdata?.bankDetails?.code?.value,
        ratesPerHour: userdata?.ratesPerHour?.charges,
        profileVideo: userdata?.profileVideo?.url,
        socialLinks: userdata?.socialLinks || [],
      });
    }
  }, [userdata, reset]);

  return (
    <>
      <div className="w-full h-auto lg:mt-10 md:mt-16 mt-20 bg-white lg:p-10 p-5">
        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className="flex flex-col"
        >
          {userdata?.isEditRequestSent && (
            <div className="border-2 w-full p-3 rounded-md border-blue-300 bg-blue-100 flex items-start md:items-center">
              <IoMdInformationCircleOutline className="text-blue-400 text-xl md:text-lg mx-2 flex-shrink-0" />
              <p className="text-xs md:text-sm text-blue-400 leading-snug">
                Your request for updating profile information has been sent to
                the
                <span className="font-bold mx-1">admin</span> for approval. It
                may take up to 24 to 48 hours to verify them.
              </p>
            </div>
          )}
          {userdata?.isEditRequestSent === false && (
            <div className="main_heading_section flex justify-end w-full">
              <div className="approve_button flex gap-10 mt-4 border">
                {!isEditable && (
                  <Button
                    className="bg-blue-700 text-white px-10 py-2 rounded-md flex items-center"
                    type="button"
                    onClick={() => setIsEditable(true)}
                  >
                    Edit
                    <MdOutlineKeyboardArrowRight className="ml-2" size={16} />
                  </Button>
                )}
                {isEditable && (
                  <Button
                    className="bg-green-600 text-white px-10 py-2 rounded-md flex items-center"
                    type="submit"
                    disabled={isApiLoading}
                  >
                    {isApiLoading ? (
                      <>
                        Saving...
                        <ImSpinner3 className="animate-spin ml-2" size={16} />
                      </>
                    ) : (
                      <>
                        Save
                        <MdOutlineKeyboardArrowRight
                          className="ml-2"
                          size={16}
                        />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            defaultValue="details"
            className="w-full h-screen flex flex-col"
          >
            <TabsList className="flex justify-start lg:gap-5 gap-0">
              <TabsTrigger
                value="details"
                className="px-4  text-sm data-[state=active]:decoration-sky-500  data-[state=active]:shadow-none py-3 data-[state=active]:border-b-4 data-[state=active]:border-blue-500 rounded-none data-[state=active]:rounded-none data-[state=active]:text-[#1D4ED8]"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="bankDetails"
                className="px-4  text-sm data-[state=active]:decoration-sky-500  data-[state=active]:shadow-none py-3 data-[state=active]:border-b-4 data-[state=active]:border-blue-500 rounded-none data-[state=active]:rounded-none data-[state=active]:text-[#1D4ED8]"
              >
                Bank Details
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="px-4  text-sm data-[state=active]:decoration-sky-500  data-[state=active]:shadow-none py-3 data-[state=active]:border-b-4 data-[state=active]:border-blue-500 rounded-none data-[state=active]:rounded-none data-[state=active]:text-[#1D4ED8]"
              >
                Documents
              </TabsTrigger>
            </TabsList>
            <div className="lg:block hidden border-b-2 border-gray-300 my-3"></div>
            <TabsContent value="details" className="flex-grow p-6">
              <h2 className="text-xl font-bold">Personal Information</h2>
              <div className="personal_details_section flex lg:flex-row flex-col w-full gap-10 h-full mt-10">
                <div className="lg:w-[20%] w-full profile_image">
                  <div className="flex">
                    <div className="mt-4">
                      <div className="flex flex-col">
                        <img
                          src={userdata?.profileImage || defaultImage}
                          alt="profileimage"
                          className="w-40 h-40 rounded-full object-cover shadow-md"
                        />

                        <div className="px-4 justify-center flex flex-col ">
                          {isEditable && (
                            <label className=" cursor-pointer bg-blue-500 text-white px-2 py-2 rounded flex justify-center items-center w-auto text-sm mb-4">
                              {isImageUploading ? (
                                <>
                                  <ImSpinner3 className="m-1 animate-spin" />{" "}
                                  Uploading
                                </>
                              ) : (
                                <>
                                  <MdOutlineFileUpload className="inline-flex text-xl m-1" />{" "}
                                  Upload
                                </>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageUpload}
                              />
                            </label>
                          )}
                          {imageUrl && isEditable && (
                            <Button
                              type="button"
                              className="text-white bg-red-500 hover:bg-red-700 flex justify-center"
                              onClick={removeImage}
                            >
                              <RiDeleteBinLine className="m-1" /> Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-[80%] w-full personal_details">
                  <div className="lg:grid block lg:space-y-0 space-y-5 grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Input
                        {...register("email")}
                        className="w-full"
                        disabled={!isEditable}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <Input
                        {...register("phone")}
                        className="w-full"
                        disabled={!isEditable}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Experience
                      </label>
                      <Input
                        {...register("experience")}
                        className="w-full"
                        disabled={!isEditable}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Type of Coaching
                      </label>
                      {/* <Input
                        {...register("typeOfCoaching")}
                        className="w-full"
                        disabled={!isEditable}
                      /> */}
                      <CoachSearchBar
                        name="typeOfCoaching"
                        control={control}
                        options={typeOfCoachingOptions}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Skills
                      </label>
                      <Input
                        {...register("skills")}
                        className="w-full"
                        disabled={!isEditable}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <Input
                        type="date"
                        {...register("dateofBirth")}
                        className="w-full"
                        disabled={!isEditable}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Place of Birth
                      </label>
                      <Input
                        type="text"
                        {...register("placeofBirth")}
                        className="w-full"
                        disabled={!isEditable}
                      />
                    </div>

                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Social Links
                      </label>
                      {fields.map((item, index) => (
                        <div key={item.id} style={{ marginBottom: "10px" }}>
                          <label className="my-2 block text-base font-medium text-gray-700">
                            {item.name}
                          </label>
                          <Controller
                            name={`socialLinks.${index}.link`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                className="w-full"
                                disabled={!isEditable} // Disable input when not in edit mode
                                placeholder={`Link for ${item.name}`}
                              />
                            )}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      {/* <Textarea
                        {...register("bio")}
                        className='w-full'
                        disabled={!isEditable}
                      /> */}
                      <ReactQuill
                        theme="snow"
                        value={bio}
                        onChange={handleBioChange} // Handle changes
                        style={{
                          height: "auto",
                          margin: "10px 0px 50px",
                          border: "1px solid #E5E7EB",
                          borderRadius: "5px",
                        }}
                        placeholder="Write your bio here..."
                        readOnly={!isEditable}
                      />
                    </div>

                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700 lg:mt-0 mt-28">
                        Coaching Description
                      </label>
                      {/* <Textarea
                        {...register("coachingDescription")}
                        className='w-full'
                        disabled={!isEditable}
                      /> */}
                      <ReactQuill
                        theme="snow"
                        value={coachingDescription}
                        onChange={handleCoachDescription} // Handle changes
                        style={{
                          height: "auto",
                          margin: "10px 0px 50px",
                          border: "1px solid #E5E7EB",
                          borderRadius: "5px",
                        }}
                        placeholder="Write the coaching description here..."
                        disabled={!isEditable}
                        readOnly={!isEditable}
                      />
                    </div>

                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700 lg:mt-0 mt-20">
                        Address
                      </label>
                      <Input
                        {...register("address")}
                        className="w-full"
                        disabled={!isEditable}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="bankDetails" className="flex-grow p-6">
              <div className="mt-6">
                <h2 className="text-lg font-bold mb-4">Bank Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">
                      Bank Name
                    </p>
                    <Input
                      {...register("bankName")}
                      className="w-full"
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">
                      Account Number
                    </p>
                    <Input
                      {...register("accountNumber")}
                      className="w-full"
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">
                      IFSC Code
                    </p>
                    <Input
                      {...register("ifscCode")}
                      className="w-full"
                      disabled={!isEditable}
                    />
                  </div>

                  {/* <div className='mb-4'>
                    <p className='text-sm font-medium text-gray-700'>
                      Rates Per Hour
                    </p>
                    <Input
                      type='number'
                      {...register("ratesPerHour")}
                      className='w-full'
                      disabled={!isEditable}
                    />
                  </div> */}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="documents" className="flex-grow lg:p-6 p-2">
              <div className="mt-6">
                <h2 className="text-lg font-bold mb-4">Documents</h2>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="cvUpload"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Upload CV (PDF/Doc/Docs only)
                    <div className="lg:hidden block mt-2">
                      {/* Controller for handling file input */}
                      {isEditable && (
                        <label
                          htmlFor="cvUpload"
                          className="flex items-center cursor-pointer space-x-2 text-sky-600"
                        >
                          {isUploadingCV ? (
                            <>
                              <ImSpinner8 className="text-xl animate-spin" />
                              <span className="text-sm">Uploading</span>
                            </>
                          ) : (
                            <>
                              <IoMdCloudUpload className="text-xl" />
                              <span className="text-sm">Upload</span>
                            </>
                          )}
                        </label>
                      )}
                      <input
                        type="file"
                        id="cvUpload"
                        accept="application/pdf"
                        className="hidden"
                        onChange={handleCVUpload}
                      />
                    </div>
                  </label>
                  <div className="flex lg:gap-5 gap-0 items-center">
                    <div className="mt-2 lg:block hidden">
                      {/* Controller for handling file input */}
                      {isEditable && (
                        <label
                          htmlFor="cvUpload"
                          className="flex items-center cursor-pointer space-x-2 text-sky-600"
                        >
                          {isUploadingCV ? (
                            <>
                              <ImSpinner8 className="text-xl animate-spin" />
                              <span className="text-sm">Uploading</span>
                            </>
                          ) : (
                            <>
                              <IoMdCloudUpload className="text-xl" />
                              <span className="text-sm">Upload</span>
                            </>
                          )}
                        </label>
                      )}
                      <input
                        type="file"
                        id="cvUpload"
                        accept="application/pdf"
                        className="hidden"
                        onChange={handleCVUpload}
                      />
                    </div>
                    <div className="mt-2 flex items-center space-x-2 text-green-600">
                      {cvFileUrl ? (
                        <>
                          <span>{cvFileUrl?.split("/")?.pop()}</span>
                          <FaCheckCircle className="text-xl lg:block hidden" />
                          <button
                            type="button"
                            onClick={() => handleViewFile("cv")}
                            className="text-[#f76918] hover:text-[#f76918]"
                          >
                            <FaEye className="text-xl" /> {/* View Icon */}
                          </button>
                        </>
                      ) : (
                        <p>No file uploaded</p> // Message when no file is uploaded
                      )}

                      {/* Remove File Button */}
                      {isEditable && cvFileUrl && (
                        <button
                          type="button"
                          onClick={handleRemovecvUpload}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTimes className="text-sm" />
                        </button>
                      )}
                    </div>

                    {/* ShadCN Dialog to display PDF */}
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogContent
                        showCloseButton="true"
                        onClick={handleCloseModal}
                      >
                        <DialogHeader>
                          <DialogTitle>CV Upload Preview</DialogTitle>
                        </DialogHeader>
                        {/* PDF Display using iframe */}
                        <div className="relative w-full h-[80vh]">
                          {isCvLoading ? ( // Show loading spinner if PDF is still loading
                            <div className="flex justify-center items-center h-full">
                              <FaSpinner className="animate-spin text-4xl text-blue-500" />
                            </div>
                          ) : googleViewerUrl ? ( // Show iframe once the URL is available
                            <iframe
                              src={googleViewerUrl}
                              className="w-full h-full"
                              title="PDF Preview"
                            />
                          ) : (
                            <p>No PDF file available</p> // Display message if no URL
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <p className="mt-2 text-sm text-red-400">
                    {errors?.cvUpload?.message}
                  </p>
                </div>

                <div className="sm:col-span-full">
                  <label
                    htmlFor="cvUpload"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Signed and Accepted Agreement
                    <div className="lg:hidden block mt-2">
                      <div className="flex items-center ">
                        {isEditable && (
                          <label
                            htmlFor="docsUpload"
                            className="flex items-center cursor-pointer space-x-2 text-sky-600 mr-2 py-2 "
                          >
                            {isUploadingDocs ? (
                              <>
                                <ImSpinner8 className="text-xl animate-spin" />
                                <span className="text-sm">Uploading</span>
                              </>
                            ) : (
                              <>
                                <IoMdCloudUpload className="text-xl" />
                                <span className="text-sm">
                                  Upload Documents
                                </span>
                              </>
                            )}
                          </label>
                        )}

                        <input
                          type="file"
                          id="docsUpload"
                          hidden
                          accept="application/pdf"
                          onChange={handleDocUpload}
                          className="hidden w-full text-gray-900 border rounded-md py-1.5"
                        />
                      </div>
                      <p className="mt-2 text-sm text-red-400">
                        {errors?.docsUpload?.message}
                      </p>
                    </div>
                  </label>
                  <div className="flex lg:gap-5 gap-0 items-center">
                    <div className="lg:block hidden mt-2">
                      <div className="flex items-center ">
                        {isEditable && (
                          <label
                            htmlFor="docsUpload"
                            className="flex items-center cursor-pointer space-x-2 text-sky-600 mr-2 py-2 "
                          >
                            {isUploadingDocs ? (
                              <>
                                <ImSpinner8 className="text-xl animate-spin" />
                                <span className="text-sm">Uploading</span>
                              </>
                            ) : (
                              <>
                                <IoMdCloudUpload className="text-xl" />
                                <span className="text-sm">
                                  Upload Documents
                                </span>
                              </>
                            )}
                          </label>
                        )}

                        <input
                          type="file"
                          id="docsUpload"
                          hidden
                          accept="application/pdf"
                          onChange={handleDocUpload}
                          className="hidden w-full text-gray-900 border rounded-md py-1.5"
                        />
                      </div>
                      <p className="mt-2 text-sm text-red-400">
                        {errors?.docsUpload?.message}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center space-x-2 text-green-600">
                      {docsUrl ? (
                        <>
                          <span>{docsUrl?.split("/")?.pop()}</span>
                          <FaCheckCircle className="text-xl lg:block hidden" />

                          {/* View PDF Icon */}
                          <button
                            type="button"
                            onClick={() => handleViewFile("docs")}
                            className="text-[#f76918] hover:text-[#f76918]"
                          >
                            <FaEye className="text-xl" /> {/* View Icon */}
                          </button>
                        </>
                      ) : (
                        <p>No file uploaded</p> // Message when no file is uploaded
                      )}

                      {/* Remove File Button */}
                      {isEditable && docsUrl && (
                        <button
                          type="button"
                          onClick={handleRemoveDocs}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTimes className="text-sm" />
                        </button>
                      )}
                    </div>

                    {/* ShadCN Dialog to display PDF */}
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogContent
                        showCloseButton="true"
                        onClick={handleCloseModal}
                      >
                        <DialogHeader>
                          <DialogTitle>Document Upload Preview</DialogTitle>
                        </DialogHeader>
                        {/* PDF Display using iframe */}
                        <div className="relative w-full h-[80vh]">
                          {isDocumentLoading ? ( // Show loading spinner if PDF is still loading
                            <div className="flex justify-center items-center h-full">
                              <FaSpinner className="animate-spin text-4xl text-blue-500" />
                            </div>
                          ) : googleViewerUrl ? ( // Show iframe once the URL is available
                            <iframe
                              src={googleViewerUrl}
                              className="w-full h-full"
                              title="PDF Preview"
                            />
                          ) : (
                            <p>No PDF file available</p> // Display message if no URL
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* START- COACH INTRODUCTION VIDEO */}
                <div className="sm:col-span-6 mt-5">
                  <label
                    htmlFor="profileVideo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Profile Video
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      {...register("profileVideo")}
                      id="profileVideo"
                      // value={profileVideo?.url}
                      placeholder="Enter video URL"
                      disabled={!isEditable}
                      className="border border-gray-300 p-2 rounded w-full mt-2"
                    />
                    {/* Remove Button */}

                    {/* Remove Button with Icon */}

                    {isEditable && (
                      <button
                        type="button"
                        onClick={handleRemoveLink}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes className="text-sm" />
                      </button>
                    )}
                  </div>

                  {/* Displaying the YouTube video using ReactPlayer */}
                  <div className="mt-4">
                    {profileVideo?.url ? (
                      ReactPlayer.canPlay(profileVideo?.url) ? (
                        <ReactPlayer
                          url={profileVideo?.url}
                          controls
                          width="100%"
                          height="300px"
                        />
                      ) : (
                        <p className="text-sm">
                          Please enter a valid YouTube URL to preview the video.
                        </p>
                      )
                    ) : null}
                  </div>
                </div>
                {/* END- COACH INTRODUCTION VIDEO */}
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </>
  );
};

export default CoachProfile;
