/** @format */

"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { DatePicker } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { schema } from "./CoachValidation";
import {
  MdKeyboardArrowRight,
  MdOutlineFileUpload,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { FaCheckCircle, FaEye, FaSpinner, FaTimes } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImSpinner3, ImSpinner8 } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { GetTokens } from "@/app/actions";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCoachStore } from "@/app/store/coachStore";
import Image from "next/image";
import dayjs from "dayjs";
import { FcCancel } from "react-icons/fc";
import { CiCircleRemove } from "react-icons/ci";
const CoachForm = () => {
  const steps = [
    {
      id: "Step 1",
      name: "Personal Details",
      fields: [
        "profileImage",
        "name",
        "dateofBirth",
        "placeofBirth",
        "email",
        "phone",
        "address",
        "country",
        "city",
        "zip",
      ],
    },
    {
      id: "Step 2",
      name: "Other Details",
      fields: [
        "cvUpload",
        "experience",
        "typeOfCoaching",
        "skills",
        "bio",
        "coachingDescription",
      ],
    },
    {
      id: "Step 3",
      name: "Bank Details",
      fields: ["bankName", "bankAccountNumber", "ifscCode", "charges"],
    },
    {
      id: "Step 4",
      name: "Document Details",
      fields: ["docsUpload"],
    },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const delta = currentStep - previousStep;
  const defaultImage = "https://via.placeholder.com/150";
  const { userdata } = useCoachStore((state) => state.userState);
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    trigger,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: userdata?.email || "",
      name: userdata?.name || "",
    },
  });
  // { resolver: yupResolver(schema) }
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isCvLoading, setIsCvLoading] = useState(false);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);
  const [cvFileUrl, setCvFileUrl] = useState(null);
  const [docsUrl, setDocsUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileType, setFileType] = useState(null);
  const profileImageUrl = watch("profileImage");
  const [isUploadingCV, setIsUploadingCV] = useState(false);
  const [isUploadingDocs, setIsUploadingDocs] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUserData } = useCoachStore();
  const imageUrl = watch("profileImage");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  // Upload CV Functionlaity starts here

  //upload cv
  const cvFile = watch("cvUpload");
  const error = errors.cvUpload?.message;

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
  };

  // Upload CV Functionlaity ends here

  // Upload Docs Functionlaity starts here

  //upload docs
  const docsFile = watch("docsUpload");
  const docsError = errors.docsUpload?.message;

  // For Document Upload
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

  // Common function to remove uploaded file
  const handleRemoveDocs = () => {
    setValue("docsUpload", null); // Clear the uploaded file from form state
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

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setFileType(null); // Reset file type
  };

  // Upload Docs Functionlaity ends here

  const processForm = async (data) => {
    const { accessToken } = await GetTokens();
    setIsSubmitting(true);
    const payload = {
      name: data.name,
      phone: data.phone,
      profileImage: data.profileImage,
      address: data.address,
      country: data.country,
      city: data.city,
      zip: data.zip,
      cv: {
        link: data.cvUpload,
      },
      profileVideo: {
        url: data.profileVideo,
      },
      signedAggrement: {
        link: data.docsUpload,
      },
      experience: data.experience,
      typeOfCoaching: data.typeOfCoaching,
      skills: data.skills,
      dateofBirth: data.dateofBirth,
      placeofBirth: data.placeofBirth,
      bio: data.bio,
      bankDetails: {
        accountNumber: data.bankAccountNumber,
        code: {
          name: "IFSC",
          value: data.ifscCode,
        },
        bankName: data.bankName,
      },
      coachingDescription: data.coachingDescription,
      address: data.address,
      ratesPerHour: {
        charges: data.charges,
      },
      formFilled: true,
    };
    try {
      const response = await axios.patch("/api/coachForm", payload, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        updateUserData(response.data.coach);
        toast.success("Form submitted successfully");
      }
    } catch (error) {
      toast.error("Error in submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields, { shouldFocus: true });
    if (!output) return;
    if (currentStep < steps.length) {
      if (currentStep === steps.length - 1) {
        await handleSubmit(processForm)();
      } else {
        setPreviousStep(currentStep);
        setCurrentStep((step) => step + 1);
      }
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };
  //START-COACH PROFILE VIDEO UPLOAD
  const [profileVideo, setprofileVideo] = useState(""); // State to store YouTube link



  const handleInputChange = (e) => {
    setprofileVideo(e.target.value); // Update the state with the input value
  };
  // Handle removing the YouTube link
  const handleRemoveLink = () => {
    setprofileVideo(""); // Clear the input value
  };

  const handleCoachAuth = async () => {
    const { accessToken, refreshToken } = await GetTokens();
    try {
      const response = await axios.post("/api/coachAccount", { accessToken: accessToken.value, refreshToken: refreshToken.value });
      if (response.status === 200) {
        
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    if (userdata?.formFilled) {
      setIsDialogOpen(true);
    }
    // if (userdata?.profileVideo?.url) {
    //   setProfileVideo(userdata.profileVideo.url); // Set the default value from the database
    // }

  }, []);

  useEffect(() => {
    handleCoachAuth();
  }, []);

  return (
    <>
      {userdata?.formFilled ? (
        <>
          <section>
            {userdata.approvalStatus === "pending" ? (
              <>
                {/* START-IF FORMFILLED IS PENDING */}
                <div className="h-screen flex flex-col items-center justify-center">
                  <div className=" h-32 w-32 p-5 rounded-full bg-yellow-50">
                    <Image
                      src={"/hourglass.png"}
                      alt=""
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center py-4">
                    <h1 className="text-2xl font-bold text-gray-600">
                      Document Verification Pending
                    </h1>
                    <p className="mt-3 text-gray-500">
                      Your documents are now being verified , please wait
                    </p>
                  </div>
                </div>
                {/* END-IF FORMFILLED IS PENDING */}
              </>
            ) : userdata.approvalStatus === "rejected" ? (
              <>
                {/* START-IF FORMFILLED IS REJECTED OR CANCELLED */}
                <div className="h-screen flex flex-col items-center justify-center">
                  <div className=" h-32 w-32 p-5 rounded-full bg-yellow-50">
                    <Image
                      src={"/rejected.png"}
                      alt=""
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center py-4">
                    <h1 className="text-2xl font-bold text-gray-600">
                      Document Rejected
                    </h1>
                    <p className="mt-3 text-gray-500">
                      Unfortunately, your form has been rejected.
                    </p>
                  </div>
                </div>
                {/* END-IF FORMFILLED IS REJECTED OR CANCELLED */}
              </>
            ) : (
              <div className=" h-screen flex flex-col items-center justify-center">
                <div className="h-32 w-32 p-5 rounded-full bg-yellow-50">
                  <Image
                    src={"/approved.png"}
                    alt=""
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center py-4">
                  <h1 className="text-2xl font-bold text-gray-600">
                    Document Approved
                  </h1>
                  <p className="mt-3 text-gray-500">
                    Congratulations! Your form has been approved. You can now
                    access the coach dashboard.
                  </p>
                  <a href="/coach-dashboard">
                    <button className="bg-blue-950 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-900 transition duration-200 mt-5">
                      Go to Dashboard
                    </button>
                  </a>
                </div>
              </div>
            )}
          </section>
        </>
      ) : (
        <>
          <section className="px-10 py-5">
            {/* steps */}
            <nav aria-label="Progress">
              <ol
                role="list"
                className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 md:flex md:space-x-8 md:space-y-0"
              >
                {steps.map((step, index) => (
                  <li key={step.name} className="md:flex-1">
                    {currentStep > index ? (
                      <>
                        <div className="group flex w-full flex-col border-l-8 border-sky-600 py-4 pl-4 transition-colors sm:border-l-0 sm:border-t-4 sm:pb-0 sm:pl-0 sm:pt-4">
                          <span className="text-sm font-medium text-sky-600 transition-colors ">
                            {step.id}
                          </span>
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                        </div>
                      </>
                    ) : currentStep === index ? (
                      <div
                        className="flex w-full flex-col border-l-8 border-sky-600 py-4 pl-4 sm:border-l-0 sm:border-t-4 sm:pb-0 sm:pl-0 sm:pt-4"
                        aria-current="step"
                      >
                        <span className="text-sm font-medium text-sky-600">
                          {step.id}
                        </span>
                        <span className="text-sm font-medium">{step.name}</span>
                      </div>
                    ) : (
                      <div className="group flex w-full flex-col border-l-8 border-gray-200 py-4 pl-4 transition-colors sm:border-l-0 sm:border-t-4 sm:pb-0 sm:pl-0 sm:pt-4">
                        <span className="text-sm font-medium text-gray-500 transition-colors">
                          {step.id}
                        </span>
                        <span className="text-sm font-medium">{step.name}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Form */}
            <form
              className="py-10 relative"
              onSubmit={handleSubmit(processForm)}
            >
              {currentStep === 0 && (
                <motion.div
                  initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Provide your personal details.
                  </p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-full">
                      <div className="flex">
                        <div className="mt-4  w-1/2">
                          <div className="flex">
                            <img
                              src={imageUrl || defaultImage}
                              alt="profileimage"
                              className="w-40 h-40 rounded-full object-cover shadow-md"
                            />

                            <div className="px-4 justify-center flex flex-col ">
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
                              {imageUrl && (
                                <Button
                                  className="text-white bg-red-500 hover:bg-red-700 flex justify-center"
                                  onClick={removeImage}
                                >
                                  <RiDeleteBinLine className="m-1" /> Remove
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-red-400">
                            {errors?.profileImage?.message}
                          </p>
                        </div>
                        <div className="sm:col-span-3 w-1/2 flex flex-col justify-center pl-4">
                          <label
                            htmlFor="fullname"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full name
                          </label>
                          <div className="mt-2">
                            <Input
                              type="text"
                              {...register("name")}
                              autoComplete="given-name"
                            />
                            {errors.name?.message && (
                              <p className="mt-2 text-sm text-red-400">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="dateofBirth"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Date of Birth
                      </label>
                      <div className="mt-2">
                        <Controller
                          name="dateofBirth"
                          control={control}
                          // rules={{ required: "Date of Birth is required" }}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              className="w-full h-10"
                              selected={field.value}
                              onChange={(date) => field.onChange(date)}
                              maxDate={dayjs()}
                            />
                          )}
                        />
                        {errors.dateofBirth?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.dateofBirth.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="placeofBirth"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Place of Birth
                      </label>
                      <div className="mt-2">
                        <Input {...register("placeofBirth")} />
                        {errors.placeofBirth?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.placeofBirth.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          autoComplete="email"
                          disabled
                        />
                        {errors.email?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          id="phone"
                          {...register("phone")}
                          autoComplete="Phone Number"
                        />
                        {errors.phone && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Address
                      </label>
                      <div className="mt-2">
                        <Textarea
                          type="text"
                          {...register("address")}
                          autoComplete="Address"
                        />
                        {errors.address?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.address.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          id="country"
                          {...register("country")}
                          autoComplete="address-level2"
                        />
                        {errors.country?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          id="city"
                          {...register("city")}
                          autoComplete="address-level1"
                        />
                        {errors.city?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="zip"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          id="zip"
                          {...register("zip")}
                          autoComplete="postal-code"
                        />
                        {errors.zip?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.zip.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {currentStep === 1 && (
                <motion.div
                  initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Other Details
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Please provide any additional information that may help us
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

                              {/* View PDF Icon */}
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
                          {cvFileUrl && (
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
                        <Dialog
                          open={isModalOpen}
                          onOpenChange={setIsModalOpen}
                        >
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
                    {/* START- COACH INTRODUCTION VIDEO */}
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="profileVideo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Profile Video
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          {...register("profileVideo")}
                          id="profileVideo"
                          value={profileVideo}
                          onChange={handleInputChange}
                          placeholder="Enter video URL"
                          className="border border-gray-300 p-2 rounded w-full mt-2"
                        />
                        {/* Remove Button */}

                        {/* Remove Button with Icon */}

                        <button
                          type="button"
                          onClick={handleRemoveLink}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTimes className="text-sm" />
                        </button>
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
                            Please enter a valid YouTube URL to preview the
                            video.
                          </p>
                        )}
                      </div>
                    </div>
                    {/* END- COACH INTRODUCTION VIDEO */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="skills"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Skills
                      </label>
                      <div className="mt-2">
                        <Controller
                          name="skills"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a skills" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="leadership">
                                    Leadership Coaching
                                  </SelectItem>
                                  <SelectItem value="career">
                                    Career Coaching
                                  </SelectItem>
                                  <SelectItem value="life">
                                    Life Coaching
                                  </SelectItem>
                                  <SelectItem value="executive">
                                    Executive Coaching
                                  </SelectItem>
                                  <SelectItem value="personal-development">
                                    Personal Development
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.skills?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.skills.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Experience
                      </label>
                      <div className="mt-2">
                        <Input
                          type="number"
                          min="1"
                          {...register("experience")}
                        />
                        {errors.experience?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.experience.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="typeOfCoaching"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type of Coaching
                      </label>
                      <div className="mt-2">
                        <Controller
                          name="typeOfCoaching"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Coahing" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="careerDevelopment">
                                    Career Developement
                                  </SelectItem>
                                  <SelectItem value="webDevelopment">
                                    Web Development
                                  </SelectItem>
                                  <SelectItem value="networkSecurity">
                                    Network Security
                                  </SelectItem>
                                  <SelectItem value="cyberSecurity">
                                    Cyber Security
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.typeOfCoaching?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.typeOfCoaching.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="coachingDescription"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Coaching Desciption
                      </label>
                      <div className="mt-2">
                        <Textarea
                          type="text"
                          {...register("coachingDescription")}
                          autoComplete="coachingDescription"
                        />
                        {errors.coachingDescription?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.coachingDescription.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Bio of Coach
                      </label>
                      <div className="mt-2">
                        <Textarea
                          type="text"
                          {...register("bio")}
                          autoComplete="bio"
                        />
                        {errors.bio?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.bio.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <>
                  <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Bank Details
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Please provide any additional information that may help us
                    </p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="placeofBirth"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Bank Name
                        </label>
                        <div className="mt-2">
                          <Input {...register("bankName")} />
                          {errors.bankName?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.bankName.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="ifscCode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          IFSC Code
                        </label>
                        <div className="mt-2">
                          <Input type="text" {...register("ifscCode")} />
                          {errors.ifscCode?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.ifscCode.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="bankAccountNumber"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Bank Account Number
                        </label>
                        <div className="mt-2">
                          <Input
                            type="text"
                            {...register("bankAccountNumber")}
                          />
                          {errors.bankAccountNumber?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.bankAccountNumber.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Charges $/hr
                        </label>
                        <div className="mt-2">
                          <Input
                            {...register("charges")}
                            type="number"
                            min="1"
                          />
                          {errors.charges?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.charges.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Documentation
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Please provide a proper documentation
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                            <input
                              type="file"
                              id="docsUpload"
                              hidden
                              accept="application/pdf"
                              onChange={handleDocUpload}
                              className="hidden w-full text-gray-900 border rounded-md py-1.5"
                            />
                            {docsFile && (
                              <>
                                <div className="mt-2 flex items-center space-x-2 text-green-600 py-2">
                                  <span>{docsUrl?.split("/")?.pop()}</span>
                                  <FaCheckCircle className="text-xl" />
                                  {/* View PDF Icon */}
                                  {docsUrl && (
                                    <button
                                      type="button"
                                      onClick={() => handleViewFile("docs")}
                                      className="text-blue-600 hover:text-blue-800"
                                    >
                                      <FaEye className="text-xl" />{" "}
                                      {/* View Icon */}
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={handleRemoveDocs}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <FaTimes className="text-sm" />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                          <p className="mt-2 text-sm text-red-400">
                            {errors?.docsUpload?.message}
                          </p>
                        </div>

                        {/* ShadCN Dialog to display PDF */}
                        <Dialog
                          open={isModalOpen}
                          onOpenChange={setIsModalOpen}
                        >
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
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="absolute -bottom-10 w-full">
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prev}
                    disabled={currentStep === 0}
                    className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 flex items-center"
                  >
                    <MdOutlineKeyboardArrowLeft className="h-5 w-5" />
                    <span className="text-sm">Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={isSubmitting}
                    className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 flex items-center disabled:text-gray-500"
                  >
                    {isSubmitting ? (
                      <>
                        Submitting{" "}
                        <ImSpinner8 className="w-3 h-3 animate-spin ml-1" />
                      </>
                    ) : (
                      <>
                        {currentStep === steps.length - 1
                          ? "Submit"
                          : "Go Next"}
                        <MdKeyboardArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  );
};

export default CoachForm;
