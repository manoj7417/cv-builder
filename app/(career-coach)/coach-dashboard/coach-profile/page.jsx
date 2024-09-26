"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import useCoachesDetailStore from "@/app/store/coachDetailStore";
import { useParams } from "next/navigation";
import { FaCheckCircle, FaEye, FaTimesCircle } from "react-icons/fa";
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
import { ImSpinner3 } from "react-icons/im";
import { MdOutlineFileUpload } from "react-icons/md";

const CoachProfile = () => {
  const defaultImage = "https://via.placeholder.com/150";
  const { userdata } = useCoachStore((state) => state.userState);
  console.log("userdata::", userdata);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: userdata?.name,
      email: userdata?.email,
      phone: userdata?.phone,
      experience: userdata?.experience,
      typeOfCoaching: userdata?.typeOfCoaching,
      skills: userdata?.skills,
      dateofBirth: userdata?.dateofBirth
        ? new Date(userdata.dateofBirth).toISOString().split("T")[0]
        : "",
      bio: userdata?.bio,
      coachingDescription: userdata?.coachingDescription,
      address: userdata?.address,
      city: userdata?.city,
      country: userdata?.country,
      zip: userdata?.zip,
    },
  });

  const [activeTab, setActiveTab] = useState("details");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const imageUrl = watch("profileImage");
  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsImageUploading(true)
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
        setIsImageUploading(false)
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

  const handleEditProfile = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (userdata) {
      reset({
        name: userdata?.name,
        email: userdata?.email,
        phone: userdata?.phone,
        experience: userdata?.experience,
        typeOfCoaching: userdata?.typeOfCoaching,
        skills: userdata?.skills,
        dateofBirth: userdata?.dateofBirth
          ? new Date(userdata.dateofBirth).toISOString().split("T")[0] // Convert ISO date to YYYY-MM-DD
          : "",
        bio: userdata?.bio,
        coachingDescription: userdata?.coachingDescription,
        address: userdata?.address,
        city: userdata?.city,
        country: userdata?.country,
        zip: userdata?.zip,
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
            <div className="approve_button flex gap-10">
              <Button
                className="bg-blue-700 text-white px-10 py-2 rounded-md"
                type="submit"
              >
                Edit Profile
              </Button>
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
                <div className='flex'>
                    <div className='mt-4  w-1/2'>
                      <div className="flex">
                        <img src={imageUrl || defaultImage} alt="profileimage" className="w-40 h-40 rounded-full object-cover shadow-md" />

                        <div className="px-4 justify-center flex flex-col ">
                          <label className=' cursor-pointer bg-blue-500 text-white px-2 py-2 rounded flex justify-center items-center w-auto text-sm mb-4'>
                            {
                              isImageUploading ? <>
                                <ImSpinner3 className="m-1 animate-spin" />{" "}Uploading
                              </> :
                                <>
                                  <MdOutlineFileUpload className='inline-flex text-xl m-1' />{" "}
                                  Upload
                                </>
                            }
                            <input
                              type="file"
                              accept="image/*"
                              hidden="true"
                              onChange={handleImageUpload}
                            />
                          </label>
                          {
                            imageUrl && <Button className="text-white bg-red-500 hover:bg-red-700 flex justify-center" onClick={removeImage}><RiDeleteBinLine className="m-1" />{" "}Remove</Button>
                          }
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
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <Input
                        {...register("phone", {
                          required: "Phone is required",
                        })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Experience
                      </label>
                      <Input
                        {...register("experience", {
                          required: "Experience is required",
                        })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Type of Coaching
                      </label>
                      <Input
                        {...register("typeOfCoaching", {
                          required: "Type of Coaching is required",
                        })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Skills
                      </label>
                      <Input
                        {...register("skills", {
                          required: "Skills are required",
                        })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <Input
                        type="date"
                        {...register("dateofBirth", {
                          required: "Date of Birth is required",
                        })}
                        className="w-full"
                      />
                    </div>

                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <Textarea
                        {...register("bio", { required: "Bio is required" })}
                        className="w-full"
                      />
                    </div>

                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Coaching Description
                      </label>
                      <Textarea
                        {...register("coachingDescription", {
                          required: "Coaching Description is required",
                        })}
                        className="w-full"
                      />
                    </div>

                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <Input
                        {...register("address", {
                          required: "Address is required",
                        })}
                        className="w-full"
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
                      {...register("bankName", {
                        required: "Bank Name is required",
                      })}
                      className="w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">
                      Account Number
                    </p>
                    <Input
                      {...register("accountNumber", {
                        required: "Account Number is required",
                      })}
                      className="w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">
                      IFSC Code
                    </p>
                    <Input
                      {...register("ifscCode", {
                        required: "IFSC Code is required",
                      })}
                      className="w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">
                      Rates Per Hour
                    </p>
                    <Input
                      type="number"
                      {...register("ratesPerHour", {
                        required: "Rate per hour is required",
                      })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="documents" className="flex-grow p-6">
              <div className="mt-6">
                <h2 className="text-lg font-bold mb-4">Documents</h2>
                <div className="mb-4">
                  <div className="maint-title flex items-center gap-5">
                    <p className="text-xl font-bold text-gray-700">
                      Signed Aggrement
                    </p>
                  </div>
                </div>
                {/* Shadcn UI Modal for viewing PDF */}
                {/* <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogContent
                    showCloseButton="true"
                    onClick={handleCloseModal}
                    className=""
                  >
                    <DialogHeader>
                      <DialogTitle>PDF Viewer</DialogTitle>
                    </DialogHeader>
                    <div className="relative w-full h-full no-scrollbar overflow-auto max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] lg:max-h-[85vh] xl:max-h-[80vh]">
                      {pdfUrl && (
                        <iframe
                          src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
                          className="w-full h-[90vh]"
                          title="Document Viewer"
                        />
                      )}
                    </div>
                  </DialogContent>
                </Dialog> */}
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </>
  );
};

export default CoachProfile;
