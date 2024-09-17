/** @format */

"use client";
import React, { useState } from "react";
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
// import { schema } from "./CoachValidation";
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

const CoachForm = () => {
  const steps = [
    {
      id: "Step 1",
      name: "Personal Details",
      fields: [
        "image",
        "firstName",
        "lastName",
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
        "bioCoach",
        "coachingDescription",
      ],
    },
    {
      id: "Step 3",
      name: "Bank Details",
      fields: ["bankName", "bankAccountNumber", "ifscCode", "price", "charges"],
    },
    {
      id: "Step 4",
      name: "Document Details",
      fields: ["docsUpload", "pancard"],
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);

  const delta = currentStep - previousStep;
  const defaultImage = "https://via.placeholder.com/150"; // Set the default image URL

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isCvLoading, setIsCvLoading] = useState(false);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);
  const [preview, setPreview] = useState(null); // For image preview
  const [cvFileUrl, setCvFileUrl] = useState(null);
  const [docsUrl, setDocsUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileType, setFileType] = useState(null);

  // Watch for image field changes
  const image = watch("image");

  // Handle image upload and preview
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        setIsLoading(true);
        const response = await axios.post("/api/uploadImage", formData);
        if (response.status === 200) {
          const imageUrl = response.data.url;
          setPreview(imageUrl);
          setValue("image", imageUrl);
          setIsLoading(false);
        } else {
          console.error("Image upload failed.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Remove the uploaded image
  const removeImage = () => {
    setPreview(null); // Clear image preview
    setValue("image", null); // Clear image from the form state
  };

  // Upload CV Functionlaity starts here

  //upload cv
  const cvFile = watch("cvUpload");
  const error = errors.cvUpload?.message;

  // For CV Upload
  const handleCVUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("cvUpload", file); // Assuming "cv" is the expected field in the backend
      try {
        setIsCvLoading(true);
        const response = await axios.post("/api/uploadImage", formData); // Change the API endpoint if needed
        console.log("response", response);
        if (response.status === 200) {
          const cvUrl = response.data.url;
          setValue("cvUpload", cvUrl); // Set CV URL in form data
          setCvFileUrl(cvUrl);
          setIsCvLoading(false);
        } else {
          console.error("CV upload failed.");
        }
      } catch (error) {
        console.error("Error uploading CV:", error);
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
      const formData = new FormData();
      formData.append("docsUpload", file); // Assuming "document" is the expected field in the backend
      try {
        setIsDocumentLoading(true);
        const response = await axios.post("/api/uploadImage", formData); // Change the API endpoint if needed
        if (response.status === 200) {
          const docUrl = response.data.url;
          setValue("docsUpload", docUrl); // Set document URL in form data
          setIsDocumentLoading(false);
          setDocsUrl(docUrl);
        } else {
          console.error("Document upload failed.");
        }
      } catch (error) {
        console.error("Error uploading document:", error);
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

  const processForm = (data) => {
    alert("hi");
    console.log(data);
    reset();
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

  return (
    <>
      <section className='px-10 py-5'>
        {/* steps */}
        <nav aria-label='Progress'>
          <ol
            role='list'
            className='space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 md:flex md:space-x-8 md:space-y-0'>
            {steps.map((step, index) => (
              <li key={step.name} className='md:flex-1'>
                {currentStep > index ? (
                  <>
                    <div className='group flex w-full flex-col border-l-8 border-sky-600 py-4 pl-4 transition-colors sm:border-l-0 sm:border-t-4 sm:pb-0 sm:pl-0 sm:pt-4'>
                      <span className='text-sm font-medium text-sky-600 transition-colors '>
                        {step.id}
                      </span>
                      <span className='text-sm font-medium'>{step.name}</span>
                    </div>
                  </>
                ) : currentStep === index ? (
                  <div
                    className='flex w-full flex-col border-l-8 border-sky-600 py-4 pl-4 sm:border-l-0 sm:border-t-4 sm:pb-0 sm:pl-0 sm:pt-4'
                    aria-current='step'>
                    <span className='text-sm font-medium text-sky-600'>
                      {step.id}
                    </span>
                    <span className='text-sm font-medium'>{step.name}</span>
                  </div>
                ) : (
                  <div className='group flex w-full flex-col border-l-8 border-gray-200 py-4 pl-4 transition-colors sm:border-l-0 sm:border-t-4 sm:pb-0 sm:pl-0 sm:pt-4'>
                    <span className='text-sm font-medium text-gray-500 transition-colors'>
                      {step.id}
                    </span>
                    <span className='text-sm font-medium'>{step.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Form */}
        <form className='py-10 relative' onSubmit={handleSubmit(processForm)}>
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}>
              <h2 className='text-base font-semibold leading-7 text-gray-900'>
                Personal Information
              </h2>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Provide your personal details.
              </p>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='sm:col-span-full'>
                  <div className='flex flex-col items-start'>
                    <div className='relative'>
                      {isLoading ? (
                        <div className='w-32 h-32 flex items-center justify-center border rounded-lg mt-4'>
                          <div className='loader flex items-center gap-2'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              class='w-6 h-6 animate-spin'
                              viewBox='0 0 16 16'>
                              <path d='M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z' />
                              <path
                                fill-rule='evenodd'
                                d='M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z'
                              />
                            </svg>
                            <span className='text-sm'>Loading...</span>
                          </div>{" "}
                          {/* Custom loader */}
                        </div>
                      ) : preview ? (
                        <img
                          src={preview}
                          alt='Uploaded Preview'
                          className='w-32 h-32 object-cover border rounded-lg'
                        />
                      ) : (
                        <div className='w-32 h-32 flex items-center justify-center border rounded-lg'>
                          <img
                            src={defaultImage}
                            alt='Uploaded Preview'
                            className='w-32 h-32 object-cover border rounded-lg'
                          />
                        </div>
                      )}

                      {image && (
                        <button
                          className='absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full'
                          onClick={removeImage}>
                          <FaTimes /> {/* Remove icon */}
                        </button>
                      )}

                      {/* Error message */}
                      {errors.image && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.image.message}
                        </p>
                      )}
                    </div>

                    <div className='mt-4'>
                      <label className='text-sm cursor-pointer bg-blue-500 text-white px-4 py-2 rounded'>
                        <MdOutlineFileUpload className='inline-flex text-xl m-1' />{" "}
                        Upload
                        <Controller
                          name='image'
                          control={control}
                          defaultValue={null}
                          render={({ field }) => (
                            <input
                              type='file'
                              accept='image/*'
                              className='hidden'
                              onChange={(e) => {
                                const file = e.target.files[0];
                                field.onChange(file); // Update form state with file
                                handleImageUpload(e); // Handle image preview
                              }}
                            />
                          )}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='firstName'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    First name
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      {...register("firstName")}
                      autoComplete='given-name'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.firstName?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='lastName'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Last name
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      id='lastName'
                      {...register("lastName")}
                      autoComplete='family-name'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.lastName?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='dateofBirth'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Date of Birth
                  </label>
                  <div className='mt-2'>
                    <Controller
                      name='dateofBirth'
                      control={control}
                      // rules={{ required: "Date of Birth is required" }}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          className='w-full h-10'
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                        />
                      )}
                    />
                    {errors.dateofBirth?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.dateofBirth.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='placeofBirth'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Place of Birth
                  </label>
                  <div className='mt-2'>
                    <Controller
                      name='placeofBirth'
                      control={control}
                      // rules={{ required: "Place of Birth is required" }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select a country' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='canada'>Canada</SelectItem>
                              <SelectItem value='london'>London</SelectItem>
                              <SelectItem value='paris'>Paris</SelectItem>
                              <SelectItem value='finland'>Finland</SelectItem>
                              <SelectItem value='new-york'>New York</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.placeofBirth?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.placeofBirth.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Email address
                  </label>
                  <div className='mt-2'>
                    <input
                      id='email'
                      type='email'
                      {...register("email")}
                      autoComplete='email'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.email?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Phone Number
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      id='phone'
                      {...register("phone")}
                      autoComplete='Phone Number'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.phone && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Address
                  </label>
                  <div className='mt-2'>
                    <textarea
                      type='text'
                      {...register("address")}
                      autoComplete='Address'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.address?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className='sm:col-span-2 sm:col-start-1'>
                  <label
                    htmlFor='country'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Country
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      id='country'
                      {...register("country")}
                      autoComplete='address-level2'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.country?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='city'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    City
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      id='city'
                      {...register("city")}
                      autoComplete='address-level1'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.city?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='zip'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    ZIP / Postal code
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      id='zip'
                      {...register("zip")}
                      autoComplete='postal-code'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.zip?.message && (
                      <p className='mt-2 text-sm text-red-400'>
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
              transition={{ duration: 0.3, ease: "easeInOut" }}>
              <h2 className='text-base font-semibold leading-7 text-gray-900'>
                Other Details
              </h2>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Please provide any additional information that may help us
              </p>

              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='cvUpload'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Upload CV (PDF only)
                  </label>
                  <div className='flex gap-5 items-center'>
                    <div className='mt-2'>
                      {/* Controller for handling file input */}
                      <Controller
                        name='cvUpload'
                        control={control}
                        defaultValue={null}
                        render={({ field: { onChange } }) => (
                          <>
                            <label
                              htmlFor='cvUpload'
                              className='flex items-center cursor-pointer space-x-2 text-sky-600'>
                              <IoMdCloudUpload className='text-xl' />
                              <span className='text-sm'>Upload</span>
                            </label>
                            <input
                              type='file'
                              id='cvUpload'
                              accept='application/pdf'
                              className='hidden'
                              onChange={(e) => {
                                const file = e.target.files[0];
                                onChange(file); // Update form state with the uploaded file
                                handleCVUpload(e);
                              }}
                            />
                            {/* Error message if validation fails */}
                            {error && (
                              <p className='mt-2 text-sm text-red-400'>
                                {error}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>

                    {/* Display uploaded file name and allow removing it */}
                    <div className='mt-2 flex items-center space-x-2 text-green-600'>
                      {isCvLoading ? ( // Show loading spinner while fetching
                        <FaSpinner className='animate-spin text-xl text-blue-500' />
                      ) : cvFileUrl ? ( // Show file name and tick icon when file is uploaded
                        <>
                          <span>{cvFileUrl?.split("/")?.pop()}</span>
                          <FaCheckCircle className='text-xl' />

                          {/* View PDF Icon */}
                          <button
                            type='button'
                            onClick={() => handleViewFile("cv")}
                            className='text-blue-600 hover:text-blue-800'>
                            <FaEye className='text-xl' /> {/* View Icon */}
                          </button>
                        </>
                      ) : (
                        <p>No file uploaded</p> // Message when no file is uploaded
                      )}

                      {/* Remove File Button */}
                      {cvFileUrl && (
                        <button
                          type='button'
                          onClick={() => setCvFileUrl(null)}
                          className='text-red-500 hover:text-red-700'>
                          <FaTimes className='text-sm' />
                        </button>
                      )}
                    </div>

                    {/* ShadCN Dialog to display PDF */}
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogContent
                        showCloseButton='true'
                        onClick={handleCloseModal}>
                        <DialogHeader>
                          <DialogTitle>CV Upload Preview</DialogTitle>
                        </DialogHeader>
                        {/* PDF Display using iframe */}
                        <div className='relative w-full h-[80vh]'>
                          {isCvLoading ? ( // Show loading spinner if PDF is still loading
                            <div className='flex justify-center items-center h-full'>
                              <FaSpinner className='animate-spin text-4xl text-blue-500' />
                            </div>
                          ) : googleViewerUrl ? ( // Show iframe once the URL is available
                            <iframe
                              src={googleViewerUrl}
                              className='w-full h-full'
                              title='PDF Preview'
                            />
                          ) : (
                            <p>No PDF file available</p> // Display message if no URL
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='experience'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Skills
                  </label>
                  <div className='mt-2'>
                    <Controller
                      name='skills'
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select a skills' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='leadership'>
                                Leadership Coaching
                              </SelectItem>
                              <SelectItem value='career'>
                                Career Coaching
                              </SelectItem>
                              <SelectItem value='life'>
                                Life Coaching
                              </SelectItem>
                              <SelectItem value='executive'>
                                Executive Coaching
                              </SelectItem>
                              <SelectItem value='personal-development'>
                                Personal Development
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.skills?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.skills.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='experience'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Experience
                  </label>
                  <div className='mt-2'>
                    <Controller
                      name='experience'
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select a experience' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='1'>1</SelectItem>
                              <SelectItem value='2'>2</SelectItem>
                              <SelectItem value='3'>3</SelectItem>
                              <SelectItem value='4'>4</SelectItem>
                              <SelectItem value='5'>5</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.experience?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.experience.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='typeOfCoaching'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Type of Coaching
                  </label>
                  <div className='mt-2'>
                    <Controller
                      name='typeOfCoaching'
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select a Coahing' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='careerDevelopment'>
                                Career Developement
                              </SelectItem>
                              <SelectItem value='webDevelopment'>
                                Web Development
                              </SelectItem>
                              <SelectItem value='networkSecurity'>
                                Network Security
                              </SelectItem>
                              <SelectItem value='cyberSecurity'>
                                Cyber Security
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.typeOfCoaching?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.typeOfCoaching.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='coachingDescription'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Coaching Desciption
                  </label>
                  <div className='mt-2'>
                    <textarea
                      type='text'
                      {...register("coachingDescription")}
                      autoComplete='coachingDescription'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.coachingDescription?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.coachingDescription.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='bioCoach'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Bio of Coach
                  </label>
                  <div className='mt-2'>
                    <textarea
                      type='text'
                      {...register("bioCoach")}
                      autoComplete='bioCoach'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.bioCoach?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.bioCoach.message}
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
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <h2 className='text-base font-semibold leading-7 text-gray-900'>
                  Bank Details
                </h2>
                <p className='mt-1 text-sm leading-6 text-gray-600'>
                  Please provide any additional information that may help us
                </p>

                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                  <div className='sm:col-span-full'>
                    <label
                      htmlFor='placeofBirth'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Bank Name
                    </label>
                    <div className='mt-2'>
                      <Controller
                        name='bankName'
                        control={control}
                        // rules={{ required: "Place of Birth is required" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Select a Bank' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value='chase'>
                                  Chase Bank
                                </SelectItem>
                                <SelectItem value='wells-fargo'>
                                  Wells Fargo
                                </SelectItem>
                                <SelectItem value='bank-of-america'>
                                  Bank of America
                                </SelectItem>
                                <SelectItem value='citibank'>
                                  Citibank
                                </SelectItem>
                                <SelectItem value='hsbc'>HSBC</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.bankName?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bankName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='ifscCode'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      IFSC Code
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        {...register("ifscCode")}
                        autoComplete='street-address'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                      />
                      {errors.ifscCode?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.ifscCode.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='bankAccountNumber'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Bank Account Number
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        {...register("bankAccountNumber")}
                        autoComplete='street-address'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                      />
                      {errors.bankAccountNumber?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bankAccountNumber.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='price'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Price
                    </label>
                    <div className='mt-2'>
                      <Controller
                        name='price'
                        control={control}
                        // rules={{ required: "Place of Birth is required" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Select a price' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value='1000'>1000</SelectItem>
                                <SelectItem value='2000'>2000</SelectItem>
                                <SelectItem value='3000'>3000</SelectItem>
                                <SelectItem value='4000'>4000</SelectItem>
                                <SelectItem value='5000'>5000</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.price?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.price.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='charges'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Charges
                    </label>
                    <div className='mt-2'>
                      <Controller
                        name='charges'
                        control={control}
                        // rules={{ required: "Place of Birth is required" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Select a charges' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value='100'>100</SelectItem>
                                <SelectItem value='200'>200</SelectItem>
                                <SelectItem value='300'>300</SelectItem>
                                <SelectItem value='400'>400</SelectItem>
                                <SelectItem value='500'>500</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.charges?.message && (
                        <p className='mt-2 text-sm text-red-400'>
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
              transition={{ duration: 0.3, ease: "easeInOut" }}>
              <h2 className='text-base font-semibold leading-7 text-gray-900'>
                Documentation
              </h2>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Please provide a proper documentation
              </p>

              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='sm:col-span-full'>
                  <label
                    htmlFor='cvUpload'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Signed and Accepted Agreement
                  </label>
                  <div className='flex gap-5 items-center'>
                    <div className='mt-2'>
                      <Controller
                        name='docsUpload'
                        control={control}
                        defaultValue={null}
                        render={({ field: { onChange } }) => (
                          <>
                            <label
                              htmlFor='docsUpload'
                              className='flex items-center cursor-pointer space-x-2 text-sky-600'>
                              <IoMdCloudUpload className='text-xl' />
                              <span className='text-sm'>Upload Documents</span>
                            </label>
                            <input
                              type='file'
                              id='docsUpload'
                              accept='application/pdf'
                              onChange={(e) => {
                                const file = e.target.files[0];
                                onChange(file); // Update form state with the uploaded file
                                handleDocUpload(e);
                              }}
                              className='hidden w-full text-gray-900 border rounded-md py-1.5'
                            />
                            {/* Show error message if any */}
                            {docsError && (
                              <p className='mt-2 text-sm text-red-400'>
                                {docsError}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>
                    {/* Display uploaded file name and allow removing it */}
                    <div className='mt-2 flex items-center space-x-2 text-green-600'>
                      {isDocumentLoading ? ( // Show loading spinner while fetching
                        <FaSpinner className='animate-spin text-xl text-blue-500' />
                      ) : docsUrl ? ( // Show file name and tick icon when file is uploaded
                        <>
                          <span>{docsUrl?.split("/")?.pop()}</span>
                          <FaCheckCircle className='text-xl' />

                          {/* View PDF Icon */}
                          <button
                            type='button'
                            onClick={() => handleViewFile("docs")}
                            className='text-blue-600 hover:text-blue-800'>
                            <FaEye className='text-xl' /> {/* View Icon */}
                          </button>
                        </>
                      ) : (
                        <p>No file uploaded</p> // Message when no file is uploaded
                      )}

                      {/* Remove File Button */}
                      {docsUrl && (
                        <button
                          type='button'
                          onClick={() => setDocsUrl(null)}
                          className='text-red-500 hover:text-red-700'>
                          <FaTimes className='text-sm' />
                        </button>
                      )}
                    </div>

                    {/* ShadCN Dialog to display PDF */}
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogContent
                        showCloseButton='true'
                        onClick={handleCloseModal}>
                        <DialogHeader>
                          <DialogTitle>Document Upload Preview</DialogTitle>
                        </DialogHeader>
                        {/* PDF Display using iframe */}
                        <div className='relative w-full h-[80vh]'>
                          {isDocumentLoading ? ( // Show loading spinner if PDF is still loading
                            <div className='flex justify-center items-center h-full'>
                              <FaSpinner className='animate-spin text-4xl text-blue-500' />
                            </div>
                          ) : googleViewerUrl ? ( // Show iframe once the URL is available
                            <iframe
                              src={googleViewerUrl}
                              className='w-full h-full'
                              title='PDF Preview'
                            />
                          ) : (
                            <p>No PDF file available</p> // Display message if no URL
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='firstName'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Pan Card
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      {...register("pancard")}
                      autoComplete='given-name'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.pancard?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.pancard.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className='absolute -bottom-10 w-full'>
            <div className='flex justify-between'>
              <button
                type='button'
                onClick={prev}
                disabled={currentStep === 0}
                className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 flex items-center'>
                <MdOutlineKeyboardArrowLeft className='h-5 w-5' />
                <span className='text-sm'>Previous</span>
              </button>
              <button
                type='button'
                onClick={next}
                className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 flex items-center'>
                <span className='text-sm'>
                  {currentStep === steps.length - 1 ? "Submit" : "Go Next"}
                </span>
                <MdKeyboardArrowRight className='w-5 h-5' />
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default CoachForm;
