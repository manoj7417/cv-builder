/** @format */

"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useForm, Controller, useFieldArray } from "react-hook-form";
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
  MdDownload,
  MdKeyboardArrowRight,
  MdOutlineFileUpload,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import {
  FaCheckCircle,
  FaEye,
  FaGlobe,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImSpinner3, ImSpinner8 } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { GetTokens, RemoveTokens } from "@/app/actions";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCoachStore } from "@/app/store/coachStore";
import Image from "next/image";
import dayjs from "dayjs";
import { FcCancel } from "react-icons/fc";
import { CiCircleRemove } from "react-icons/ci";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaLink,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Plus } from "lucide-react";

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
      fields: ["bankName", "bankAccountNumber", "ifscCode"],
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
    getValues,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: userdata?.email || "",
      name: userdata?.name || "",
      socialLinks: [],
    },
  });
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
  const router = useRouter();
  const [options, setOptions] = useState([
    "Leadership Coaching",
    "Career Coaching",
    "Life Coaching",
    "Executive Coaching",
    "Personal Development",
  ]);
  const [newOption, setNewOption] = useState("");
  const [newOptionError, setNewOptionError] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const platformIcons = {
    facebook: <FaFacebook className="text-blue-600" />,
    instagram: <FaInstagram className="text-pink-500" />,
    linkedin: <FaLinkedin className="text-blue-700" />,
    youtube: <FaYoutube className="text-red-600" />,
    other: <FaGlobe className="text-gray-500" />,
  };

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
    setValue("profileImage", null); // Clear the value in the form
    clearErrors("profileImage"); // Clear validation errors if any
  };

  const cvFile = watch("cvUpload");

  const socialPlatform = watch("socialPlatform");
  const socialLink = watch("socialLink");

  const handleAddSocialLink = () => {
    // Get the values from the form
    const socialLink = getValues("socialLink");
    const socialPlatform = getValues("socialPlatform");

    // Validation
    if (!socialLink) {
      setError("socialLink", {
        type: "manual",
        message: "Please enter a social link",
      });
      return;
    }

    if (!socialPlatform) {
      setError("socialPlatform", {
        type: "manual",
        message: "Please select a social platform",
      });
      return;
    }

    // Add the social link and platform
    append({ name: socialPlatform, link: socialLink });

    // Clear the inputs
    setValue("socialLink", "");
    setValue("socialPlatform", "");

    // Clear errors after successful addition
    clearErrors("socialLink");
    clearErrors("socialPlatform");
  };

  const handleAddSocialPlatform = (value) => {
    setValue("socialPlatform", value);
    clearErrors("socialPlatform");
  };

  const error = errors.cvUpload?.message;

  // For CV UploadF
  // const handleCVUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setIsUploadingCV(true);
  //     const formData = new FormData();
  //     formData.append("cvUpload", file);
  //     try {
  //       setIsCvLoading(true);
  //       const response = await axios.post("/api/uploadImage", formData);
  //       if (response.status === 200) {
  //         const cvUrl = response.data.url;
  //         setValue("cvUpload", cvUrl);
  //         setCvFileUrl(cvUrl);
  //       } else {
  //         console.error("CV upload failed.");
  //       }
  //     } catch (error) {
  //       console.error("Error uploading CV:", error);
  //     } finally {
  //       setIsUploadingCV(false);
  //       setIsCvLoading(false);
  //     }
  //   }
  // };

  const handleCVUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type
      const validTypes = [
        "application/pdf", // PDF
        "application/msword", // DOC
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
      ];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid PDF or Word document.");
        return;
      }

      setIsUploadingCV(true);
      const formData = new FormData();
      formData.append("cvUpload", file); // Assuming "cvUpload" is the field expected by the backend

      try {
        setIsCvLoading(true);
        const response = await axios.post("/api/uploadImage", formData); // Adjust API endpoint if needed

        if (response.status === 200) {
          const cvUrl = response.data.url;
          setValue("cvUpload", cvUrl); // Set CV URL in form data
          setCvFileUrl(cvUrl); // Set URL to state for further use
          toast.success("Cv uploaded successfully.");
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
  // const handleDocUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setIsUploadingDocs(true);
  //     const formData = new FormData();
  //     formData.append("docsUpload", file);
  //     try {
  //       setIsDocumentLoading(true);
  //       const response = await axios.post("/api/uploadImage", formData);
  //       if (response.status === 200) {
  //         const docUrl = response.data.url;
  //         setValue("docsUpload", docUrl);
  //         setIsDocumentLoading(false);
  //         setDocsUrl(docUrl);
  //       } else {
  //         console.error("Document upload failed.");
  //       }
  //     } catch (error) {
  //       console.error("Error uploading document:", error);
  //     } finally {
  //       setIsUploadingDocs(false);
  //     }
  //   }
  // };

  // Common function to remove uploaded file

  const handleDocUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploadingDocs(true);
      const formData = new FormData();
      formData.append("docsUpload", file);

      try {
        setIsDocumentLoading(true);

        // Validate file type (now supports .doc, .docx, and .pdf)
        const allowedTypes = [
          "application/msword", // .doc
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
          "application/pdf", // .pdf
        ];

        if (!allowedTypes.includes(file.type)) {
          console.error(
            "Invalid file type. Please upload a DOC, DOCX, or PDF file."
          );
          toast.error(
            "Invalid file type. Only DOC, DOCX, and PDF files are supported."
          );
          setIsDocumentLoading(false);
          return;
        }

        // Upload file to the server
        const response = await axios.post("/api/uploadImage", formData); // Ensure this is the correct endpoint
        if (response.status === 200) {
          const docUrl = response.data.url;
          setIsDocumentLoading(false);
          setValue("docsUpload", docUrl);
          setDocsUrl(docUrl);

          toast.success("Document uploaded successfully.");
        } else {
          console.error("Document upload failed with status:", response.status);
          toast.error("Failed to upload the document.");
        }
      } catch (error) {
        console.error("Error uploading document:", error);
        toast.error("An error occurred during the upload.");
      } finally {
        setIsUploadingDocs(false);
        setIsDocumentLoading(false);
      }
    } else {
      toast.error("No file selected.");
    }
  };

  const handleRemoveDocs = () => {
    setValue("docsUpload", null);
  };

  const googleViewerUrl =
    fileType === "cv"
      ? `https://docs.google.com/gview?url=${encodeURIComponent(
          cvFileUrl
        )}&embedded=true`
      : fileType === "docs"
      ? `https://docs.google.com/gview?url=${encodeURIComponent(
          docsUrl
        )}&embedded=true`
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
    // Map over the socialLinks array and structure it as desired
    const formattedSocialLinks = data?.socialLinks?.map((socialLink) => ({
      name: socialLink.name,
      link: socialLink.link,
    }));
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
      socialLinks: formattedSocialLinks,
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
      const response = await axios.post("/api/coachAccount", {
        accessToken: accessToken.value,
        refreshToken: refreshToken.value,
      });
      if (response.status === 200) {
        const data = response.data.data.userdata;
        const date = dayjs(data.dateofBirth)
        if(data?.cv?.link){
          setCvFileUrl(data.cv.link);
        }
        if(data?.signedAggrement?.link){
          setDocsUrl(data.signedAggrement.link);
        }
        // reset(response.data.data.userdata);
        reset({
          name: data?.name || "",
          email: data?.email || "",
          profileImage: data?.profileImage || "",
          phone: data?.phone || "",
          profileVideo: data?.profileVideo?.url || "",
          address: data?.address || "",
          country: data?.country || "",
          city: data?.city || "",
          zip: data?.zip || "",
          placeofBirth: data?.placeofBirth || "",
          cv: data?.cv?.url || "",
          signedAggrement: data?.signedAggrement?.url || "",
          experience: data?.experience || "",
          typeOfCoaching: data?.typeOfCoaching || "",
          skills: data?.skills || "",
          placeofBirth: data?.placeofBirth || "",
          bio: data?.bio || "",
          coachingDescription: data?.coachingDescription || "",
          cvUpload: data?.cv?.link || "",
          bankAccountNumber: data?.bankDetails?.accountNumber || "",
          bankName: data?.bankDetails?.bankName || "",
          ifscCode: data?.bankDetails?.code?.value || "",
          docsUpload: data?.signedAggrement?.link || "",
          dateofBirth : date,

        });
        updateUserData(response.data.data.userdata);

        if (isApproved) {
          return router.push("/coach-dashboard");
        }
      }
    } catch (error) {}
  };

  // const handleAddSocialLink = () => {
  //   if (socialLink === "") {
  //     setError("socialLink", "Please fill all the fields", {
  //       shouldFocus: true,
  //     });
  //     return;
  //   }
  //   if (socialPlatform === "") {
  //     setError("socialPlatform", "Please fill all the fields", {
  //       shouldFocus: true,
  //     });
  //     return;
  //   }
  //   append({ name: socialPlatform, link: socialLink });
  //   setValue("socialLink", "");
  //   setValue("socialPlatform", "");
  // };

  const handleAddOption = () => {
    if (newOption.trim() === "") {
      setNewOptionError("Option cannot be empty");
      return;
    }
    if (options.includes(newOption)) {
      setNewOptionError("This option already exists");
      return;
    }
    setOptions([...options, newOption]);
    toast.success("Option added");
    setNewOption("");
    setIsDialogOpen(false);
  };

  const handleCloseAddoptionDialog = () => {
    setNewOption("");
    setNewOptionError(null);
    setIsDialogOpen(false);
  };

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
            {userdata.isApproved ? (
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
                  <Link href="/coach-dashboard">
                    <button className="bg-blue-950 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-900 transition duration-200 mt-5">
                      Go to Dashboard
                    </button>
                  </Link>
                </div>
              </div>
            ) : userdata.approvalStatus === "pending" ? (
              <>
                {/* START-IF FORMFILLED IS PENDING */}
                <div className="h-screen flex flex-col items-center justify-center">
                  <div className=" h-32 w-32 p-5 rounded-full bg-yellow-50">
                    <Image
                      src={"/hourglass.png"}
                      alt=""
                      width={100}
                      height={100}
                      className="w-full h-full object-contain animate-spin-slow"
                    />
                  </div>
                  <div className="text-center py-4">
                    <h1 className="text-2xl font-bold text-gray-600">
                      Document Verification Pending
                    </h1>
                    <p className="mt-3 text-gray-500">
                      Your documents are now being verified, please wait. It may
                      take up to <b>24 to 48 hours</b> to verify them.
                    </p>
                  </div>
                </div>
                {/* END-IF FORMFILLED IS PENDING */}
              </>
            ) : (
              userdata.approvalStatus === "rejected" && (
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
              )
            )}
          </section>
        </>
      ) : (
        <>
          <section className="lg:px-10 px-2 py-5">
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
                    Enter your personal details
                  </p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-full">
                      <div className="flex lg:flex-row flex-col">
                        <div className="mt-4  lg:w-1/2 w-full">
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
                                  hidden
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
                        <div className="sm:col-span-3 lg:w-1/2 w-full flex flex-col justify-center lg:pl-4 pl-0">
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
                      <div className="flex lg:flex-row flex-col gap-5 lg:items-center items-start">
                        <div className="mt-2">
                          {/* Controller for handling file input */}
                          <label
                            htmlFor="cvUpload"
                            className="flex items-center cursor-pointer space-x-2 text-sky-600 "
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
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleCVUpload}
                          />
                        </div>
                        <div className="mt-2 flex items-center space-x-2 text-green-600">
                          {cvFile ? (
                            <>
                              <span className="text-sm">{cvFileUrl?.split("/")?.pop()}</span>
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
                        className="block text-base font-bold leading-6 text-gray-900"
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
                        {/* {profileVideo && ReactPlayer.canPlay(profileVideo) ? (
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
                        )} */}
                        {profileVideo ? (
                          ReactPlayer.canPlay(profileVideo) ? (
                            <ReactPlayer
                              url={profileVideo}
                              controls
                              width="100%"
                              height="300px"
                            />
                          ) : (
                            <p className="text-red-500 text-sm">
                              Please enter a valid YouTube URL to preview the
                              video.
                            </p>
                          )
                        ) : null}
                      </div>
                    </div>
                    {/* END- COACH INTRODUCTION VIDEO */}
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="skills"
                        className="block text-base font-bold leading-6 text-gray-900"
                      >
                        Skills
                      </label>
                      <div className="mt-2 relative flex lg:flex-row flex-col gap-5 justify-between">
                        <Controller
                          name="skills"
                          className="absolute top-0 left-0"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="lg:w-[78%] w-full">
                                <SelectValue placeholder="Select a skills" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {options.map((option, index) => (
                                    <SelectItem value={option} key={index}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <Button
                          className="lg:w-[20%] w-full"
                          type="button"
                          onClick={() => setIsDialogOpen(true)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Option
                        </Button>
                        <Dialog
                          open={isDialogOpen}
                          onOpenChange={setIsDialogOpen}
                        >
                          <DialogTrigger asChild></DialogTrigger>
                          <DialogContent onClick={handleCloseAddoptionDialog}>
                            <DialogHeader>
                              <DialogTitle>Add New Option</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col space-y-4">
                              <Input
                                type="text"
                                placeholder="Enter new option"
                                value={newOption}
                                onChange={(e) => {
                                  setNewOption(e.target.value);
                                  setError(null);
                                }}
                              />
                              <Button onClick={handleAddOption}>
                                Add Option
                              </Button>
                              {newOptionError && (
                                <p className="text-sm text-red-500">
                                  {newOptionError}
                                </p>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      {errors.skills?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.skills.message}
                        </p>
                      )}
                    </div>
                    {/* social links */}
                    <div className="sm:col-span-2">
                      <Controller
                        name="socialPlatform"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={(value) =>
                              handleAddSocialPlatform(value)
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Social Links" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="facebook">
                                  Facebook
                                </SelectItem>
                                <SelectItem value="instagram">
                                  Instagram
                                </SelectItem>
                                <SelectItem value="linkedin">
                                  LinkedIn
                                </SelectItem>
                                <SelectItem value="youtube">YouTube</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.socialPlatform?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.socialPlatform.message}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <Input type="text" {...register("socialLink")} />
                      {errors.socialLink?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.socialLink.message}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <Button type="button" onClick={handleAddSocialLink}>
                        ADD
                      </Button>
                    </div>
                    <div className="sm:col-span-6">
                      {fields.map((field, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 mt-2"
                        >
                          <span className="text-xl">
                            {platformIcons[field.name] || (
                              <FaGlobe className="text-gray-500" />
                            )}{" "}
                          </span>
                          <a
                            href={field.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                          >
                            {field.link}
                          </a>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
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
                                <SelectValue placeholder="Select a Coaching" />
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
                        Coaching Description
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
                      {/* <div className="sm:col-span-3">
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
                      </div> */}
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
                      <div className="flex lg:flex-row gap-5 justify-between lg:items-center items-start">
                        <label
                          htmlFor="cvUpload"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Signed and Accepted Agreement
                        </label>
                        {/* <Button>
                            Download Agreement
                            <MdDownload className="inline ml-2 animate-pulse" />
                          </Button> */}
                        <Link
                          href={"/CoachingContract.pdf"}
                          download="Coaching Contract.pdf"
                          target="_blank"
                          downloaded
                          file
                          className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition"
                        >
                          Download Agreement
                          <MdDownload className="ml-2 animate-pulse" />
                        </Link>
                      </div>
                      <div className="flex gap-5 items-center">
                        <div className="mt-2">
                          <div className="flex lg:flex-row flex-col lg:items-center items-start">
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
                              accept=".doc,.docx,.pdf"
                              className="hidden"
                              onChange={handleDocUpload}
                            />
                            {docsFile && (
                              <>
                                <div className="mt-2 flex items-center space-x-2 text-green-600 py-2">
                                  <span className="text-sm">{docsUrl?.split("/")?.pop()}</span>
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
