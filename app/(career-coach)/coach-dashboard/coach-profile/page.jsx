"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import useCoachesDetailStore from "@/app/store/coachDetailStore";
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
import { useForm } from "react-hook-form";
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
import { IoMdCloudUpload } from "react-icons/io";
import ReactPlayer from "react-player";

const CoachProfile = () => {
  const defaultImage = "https://via.placeholder.com/150";
  const { userdata } = useCoachStore((state) => state.userState);
  const { updateUserData } = useCoachStore();

  const {
    register,
    handleSubmit,
    setValue,
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

  // Remove the uploaded image
  const removeImage = () => {
    setValue("profileImage", null);
    setValue("profileImage", null); // Clear the value in the form
    clearErrors("profileImage"); // Clear validation errors if any
  };

  const openModal = (url) => {
    if (url) {
      setPdfUrl(url); // Set the PDF URL only if it exists
      setIsModalOpen(true); // Open the modal
    } else {
      toast.error("No document available to view");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleEditProfile = async(data) => {
    const { accessToken } = await GetTokens();
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
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      ifscCode: data.ifscCode,
      ratesPerHour: data.ratesPerHour,
      cv: {
        link: cvFileUrl,
      },
      profileVideo: data.profileVideo,
      signedAggrement: {
        link: docsUrl,
      },
      experience: data.experience,
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
      const response = await axios.patch("/api/coachForm", payload, {
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
      console.log(error);
      toast.error("Error in submitting the form");
    } finally {
      setIsApiLoading(false); // Stop loading
      setIsEditable(false)
    }
  };

  // Upload CV Functionlaity starts here

  // For CV UploadF
  const handleCVUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploadingCV(true);
      const formData = new FormData();
      formData.append("cvUpload", file); // Assuming "cv" is the expected field in the backend
      try {
        setIsCvLoading(true);
        const response = await axios.post("/api/uploadImage", formData); // Change the API endpoint if needed
        if (response.status === 200) {
          const cvUrl = response.data.url;
          setValue("cvUpload", cvUrl); // Set CV URL in form data
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

  // For Document Upload
  const handleDocUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploadingDocs(true);
      const formData = new FormData();
      formData.append("docsUpload", file); // Assuming "document" is the expected field in the backend
      try {
        setIsDocumentLoading(true);
        const response = await axios.post("/api/uploadImage", formData); // Change the API endpoint if needed
        if (response.status === 200) {
          const docUrl = response.data.url;
          console.log(docUrl);
          setValue("docsUpload", docUrl); // Set document URL in form data
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

  // Common function to remove uploaded file
  const handleRemoveDocs = () => {
    setValue("docsUpload", ""); // Clear the form field (make sure "docsUpload" matches your field name)
    setDocsUrl(null); // Clear the state holding the file URL
  };

  // Use Google Docs Viewer if needed
  const googleViewerUrl =
    fileType === "cv"
      ? `https://docs.google.com/gview?url=${cvFileUrl}&embedded=true`
      : fileType === "docs"
      ? `https://docs.google.com/gview?url=${docsUrl}&embedded=true`
      : null;

  const handleViewFile = (type) => {
    setFileType(type);
    setIsModalOpen(true); // Open the modal when the view icon is clicked
  };

  //START-COACH PROFILE VIDEO UPLOAD
  // Watch for changes in the profileVideo field
  const profileVideo = watch("profileVideo"); // State to store YouTube link

  // Handle removing the YouTube link
  const handleRemoveLink = () => {
    setValue("profileVideo", "");
  };

  useEffect(() => {
    if (userdata?.cv?.link) {
      setValue("cv", userdata.cv.link); // Set CV URL in the form
      setCvFileUrl(userdata.cv.link); // Update state to show the file in UI
    }
  }, [userdata, setValue]);

  useEffect(() => {
    if (userdata?.signedAggrement?.link) {
      setValue("docs", userdata.signedAggrement.link); // Set CV URL in the form
      setDocsUrl(userdata.signedAggrement.link); // Update state to show the file in UI
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
          ? new Date(userdata.dateofBirth).toISOString().split("T")[0] // Convert ISO date to YYYY-MM-DD
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
        profileVideo: userdata?.profileVideo,
      });
    }
  }, [userdata, reset]);

  return (
    <>
      <div className="w-full h-auto mt-10 bg-white m-10 p-10">
        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className="flex flex-col"
        >
          <div className="main_heading_section flex justify-between">
            <h1 className="text-xl text-black font-bold">Anuj</h1>
            {/* <div className="approve_button flex gap-10">
              <Button
                className="bg-blue-700 text-white px-10 py-2 rounded-md flex items-center"
                type="submit"
              >
                Submit
              </Button>
            </div> */}
            <div className="approve_button flex gap-10 mt-4">
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
                      <MdOutlineKeyboardArrowRight className="ml-2" size={16} />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            defaultValue="details"
            className="w-full h-screen flex flex-col"
          >
            <TabsList className="flex justify-start">
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
            <div className="border-b-2 border-gray-300 my-3"></div>
            <TabsContent value="details" className="flex-grow p-6">
              <h2 className="text-xl font-bold">Personal Information</h2>
              <div className="personal_details_section flex w-full gap-10 h-full mt-10">
                <div className="lg:w-[20%] w-full profile_image">
                  <div className="flex">
                    <div className="mt-4  w-1/2">
                      <div className="flex">
                        <img
                          src={userdata?.profileImage || defaultImage}
                          alt="profileimage"
                          className="w-40 h-32 rounded-full object-cover shadow-md"
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
                                hidden="true"
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <Input
                        {...register("typeOfCoaching")}
                        className="w-full"
                        disabled={!isEditable}
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
                        Bio
                      </label>
                      <Textarea
                        {...register("bio")}
                        className="w-full"
                        disabled={!isEditable}
                      />
                    </div>

                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Coaching Description
                      </label>
                      <Textarea
                        {...register("coachingDescription")}
                        className="w-full"
                        disabled={!isEditable}
                      />
                    </div>

                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
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

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">
                      Rates Per Hour
                    </p>
                    <Input
                      type="number"
                      {...register("ratesPerHour")}
                      className="w-full"
                      disabled={!isEditable}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="documents" className="flex-grow p-6">
              <div className="mt-6">
                <h2 className="text-lg font-bold mb-4">Documents</h2>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="cvUpload"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Upload CV (PDF only)
                  </label>
                  <div className="flex gap-5 items-center">
                    <div className="mt-2">
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
                          <FaCheckCircle className="text-xl" />
                          <button
                            type="button"
                            onClick={() => handleViewFile("cv")}
                            className="text-blue-600 hover:text-blue-800"
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
                  </label>
                  <div className="flex gap-5 items-center">
                    <div className="mt-2">
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
                          <FaCheckCircle className="text-xl" />

                          {/* View PDF Icon */}
                          <button
                            type="button"
                            onClick={() => handleViewFile("docs")}
                            className="text-blue-600 hover:text-blue-800"
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
                      value={profileVideo}
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
                    {profileVideo && ReactPlayer.canPlay(profileVideo) ? (
                      <ReactPlayer
                        url={profileVideo}
                        controls
                        width="100%"
                        height="300px"
                      />
                    ) : (
                      <p>
                        Please enter a valid YouTube URL to preview the video.
                      </p>
                    )}
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
