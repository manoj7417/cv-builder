/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import ReactPlayer from "react-player";
import { FiTerminal } from "react-icons/fi";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const CoachDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [singleCoach, setSingleCoach] = useState(null);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [pdfUrl, setPdfUrl] = useState("");
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isApprovingCoach, setIsApprovingCoach] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      isCvVerified: singleCoach?.cv?.isVerified,
      isAgreementVerified: singleCoach?.isAgreementVerified?.isVerified,
      isVideoVerified: singleCoach?.profileVideo?.isApproved,
    },
  });

  const isCvVerified = watch("isCvVerified", singleCoach?.cv?.isVerified);
  const isAgreementVerified = watch(
    "isAgreementVerified",
    singleCoach?.signedAggrement?.isVerified
  );
  const isVideoVerified = watch(
    "isVideoVerified",
    singleCoach?.video?.isVerified
  );

  const handleApproveData = async (data) => {
    setIsApprovingCoach(true);
    const { accessToken } = await GetTokens();
    const combinedData = {
      ...singleCoach,
      cv: {
        ...singleCoach.cv,
        isVerified: data?.isCvVerified,
      },
      signedAggrement: {
        ...singleCoach.signedAggrement,
        isVerified: data?.isAgreementVerified,
      },
      profileVideo: {
        ...singleCoach.profileVideo,
        isApproved: data?.isVideoVerified,
      },
    };
    try {
      const response = await axios.patch(
        `/api/verifyDocs/${id}`,
        {
          combinedData,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      if (response.status === 200) {
        router.push("/admin/coach");
        toast.success("Update Coach Details submitted successfully");
      }
    } catch (error) {
      toast.error("Error in submitting the detail");
    } finally {
      setIsApprovingCoach(false);
      setShowApproveDialog(false);
    }
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
    setIsModalOpen(false); // Close the modal
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const fetchCoachDetails = async () => {
    try {
      const response = await axios.get(`/api/getAllCoaches`);
      const data = response.data;
      const coach = data.coaches.find((coach) => coach._id === id);
      if (coach) {
        setSingleCoach(coach);
      } else {
        toast.error("Coach not found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching coach details");
    }
  };

  useEffect(() => {
    fetchCoachDetails();
  }, []);

  const {
    name = "",
    email = "",
    phone = "",
    bio = "",
    coachingDescription = "",
    profileVideo = {},
    profileImage = "/path/to/default-avatar.png",
    socialLinks = [],
    dateofBirth = "",
    experience = "",
    address = "",
    city = "",
    country = "",
    zip = "",
    bankDetails = {},
    ratesPerHour = {},
    cv = {},
    signedAggrement = {},
    typeOfCoaching = "",
    skills = [],
  } = singleCoach || {};

  const handleRejectCoach = () => {
    setShowDeleteDialog(true);
  }

  const handleApproveButtonClick = () => {
    handleSubmit(handleApproveData)();
  };
  return (
    <>
      <AlertDialog open={showDeleteDialog} >
        <AlertDialogContent className='bg-white'>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reject the coach request and coach wont be able to login to their dashboard
              <div className="py-3">
                <Label>
                  Rejection Reason
                </Label>
                <Textarea className="mt-1" placeholder="Type your rejection reason" />
                <Select >
                  <SelectTrigger className="w-full my-4">
                    <SelectValue placeholder="Select the rejection step" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Personal details</SelectItem>
                    <SelectItem value="1">Other details</SelectItem>
                    <SelectItem value="2">Bank details</SelectItem>
                    <SelectItem value="3">Document details</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-700 text-white" onClick={handleRejectCoach}>Reject</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className='h-full bg-white m-4 p-5'>
        <div className="h-full bg-white m-4 p-5">
          <form
            onSubmit={handleSubmit(handleApproveData)}
            className="flex flex-col"
          >
            <AlertDialog open={showApproveDialog} >
              <AlertDialogContent className='bg-white'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will approve the coach and coach can continue to their dashboard.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button onClick={() => setShowApproveDialog(false)} className="bg-white text-blue-900 border border-blue-800 my-3 sm:my-0">Cancel</Button>
                  <Button className="bg-green-700 text-white" onClick={handleApproveButtonClick} disabled={isApprovingCoach}>{isApprovingCoach ? "Approving..." : "Approve"}</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="main_heading_section flex justify-between">
              <h1 className="text-xl text-black font-bold">{name}</h1>
              <div className="approve_button flex gap-10">
                {singleCoach?.isApproved ? (
                  <Button className="bg-blue-700 text-white px-10 py-2 rounded-md">
                    Update Status
                  </Button>
                ) : (
                  <>
                    <Button className='bg-red-700 text-white px-10 py-2 rounded-md' type="button"
                      onClick={() => handleRejectCoach()}>
                      Reject
                    </Button>
                    <Button
                      className='bg-blue-700 text-white px-10 py-2 rounded-md'
                      type='button'
                      onClick={() => setShowApproveDialog(true)}
                      disabled={
                        !isCvVerified || !isAgreementVerified || isSubmitting
                      }>
                      Approve
                    </Button>
                  </>
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
                    <div className="image_section w-[200px] h-[200px] text-center flex justify-center">
                      <img
                        src={profileImage}
                        alt="profileImage"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:w-[80%] w-full personal_details">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <div className="mt-1 block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                          {email}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <div className="mt-1 block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                          {phone}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Experience
                        </label>
                        <div className="mt-1 block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                          {experience} years
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Type of Coaching
                        </label>
                        <div className="mt-1 block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                          {typeOfCoaching}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Skills
                        </label>
                        <div className="mt-1 block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                          {skills}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Date of Birth
                        </label>
                        <div className="mt-1 block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                          {new Date(dateofBirth).toLocaleDateString()}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Social Links
                        </label>
                        <ul className="flex">
                          {socialLinks.map((link, index) => (
                            <li key={link.id}>
                              <Link
                                href={`https://${link.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm mt-2"
                              >
                                {link.name},
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Bio
                        </label>
                        <div className="mt-1 block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                          {bio}
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Coaching Description
                        </label>
                        <div className="mt-1 block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                          {coachingDescription}
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <div className="mt-1 block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                          {address}, {city}, {country} - {zip}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="bankDetails" className="flex-grow p-6">
                <div className="mt-6">
                  <h2 className="text-lg font-bold mb-4">Bank Details</h2>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Bank Name</p>
                    <div className="block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                      {bankDetails?.bankName || "N/A"}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">
                      Account Number
                    </p>
                    <div className="block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                      {bankDetails?.accountNumber}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">IFSC Code</p>
                    <div className="block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                      {bankDetails?.code?.value || "N/A"}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">
                      Rates Per Hour
                    </p>
                    <div className="block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                      ${ratesPerHour?.charges}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="documents" className="flex-grow p-6">
                <div className="mt-6">
                  <h2 className="text-lg font-bold mb-4">Documents</h2>
                  <div className="mb-4">
                    <div className="maint-title flex items-center gap-5">
                      <p className="text-base font-bold text-gray-700">CV</p>
                    </div>
                    <div className="flex">
                      <div className="flex justify-between mt-5 w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                        <div className="text-green-500 hover:underline flex gap-5">
                          <FaCheckCircle className="text-xl " />
                          {cv?.link ? cv?.link.split("/").pop() : "View CV"}
                          <FaEye
                            className="text-blue-500 text-xl cursor-pointer"
                            onClick={() => openModal(cv?.link)}
                            title="View Cv"
                          />
                        </div>
                        <div>
                          <p className="text-base my-2 font-medium text-gray-700">
                            <div className="flex items-center space-x-2">
                              {singleCoach?.isApproved || isCvVerified ? (
                                <span className="text-xs text-green-800  px-2 py-1  rounded-lg bg-green-100">
                                  Approved
                                </span>
                              ) : (
                                <span className="text-xs text-red-800  px-2 py-1  rounded-lg bg-red-100">
                                  Not Approved
                                </span>
                              )}
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  {...register("isCvVerified")}
                                  className="hidden"
                                />
                                <div
                                  className={`relative w-12 h-6 bg-gray-200 rounded-full transition-colors duration-200 ${singleCoach?.isApproved || isCvVerified
                                    ? "bg-green-600"
                                    : ""
                                    }`}>
                                  <div
                                    className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ${singleCoach?.isApproved || isCvVerified
                                      ? "translate-x-full"
                                      : ""
                                      }`}
                                  />
                                </div>
                              </label>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="maint-title flex items-center gap-5">
                      <p className="text-xl font-bold text-gray-700">
                        Signed Aggrement
                      </p>
                    </div>
                    <div className="flex">
                      <div className="flex justify-between mt-5 w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                        <div className="text-green-500 hover:underline flex gap-5">
                          <FaCheckCircle className="text-xl " />
                          {signedAggrement?.link
                            ? signedAggrement?.link.split("/").pop()
                            : "View CV"}
                          <FaEye
                            className="text-blue-500 text-xl cursor-pointer"
                            onClick={() => openModal(signedAggrement?.link)}
                          />
                        </div>
                        <div>
                          <p className="text-base font-medium text-gray-700">
                            <p className="text-base font-medium text-gray-700">
                              <div className="flex items-center space-x-2">
                                {singleCoach?.isApproved ||
                                  isAgreementVerified ? (
                                  <span className='text-xs text-green-800  px-2 py-1  rounded-lg bg-green-100'>
                                    Approved
                                  </span>
                                ) : (
                                  <span className="text-xs text-red-800  px-2 py-1  rounded-lg bg-red-100">
                                    Not Approved
                                  </span>
                                )}
                                <label className="flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    {...register("isAgreementVerified")}
                                    className="hidden"
                                  />
                                  <div
                                    className={`relative w-12 h-6 bg-gray-200 rounded-full transition-colors duration-200 ${singleCoach?.isApproved ||
                                      isAgreementVerified
                                      ? "bg-green-600"
                                      : ""
                                      }`}>
                                    <div
                                      className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ${singleCoach?.isApproved ||
                                        isAgreementVerified
                                        ? "translate-x-full"
                                        : ""
                                        }`}
                                    />
                                  </div>
                                </label>
                              </div>
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-6 mt-10">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="profileVideo"
                        className="text-xl font-bold text-gray-700"
                      >
                        Profile Video
                      </label>
                      {profileVideo?.url && (
                        <div className="mr-2">
                          <p className="text-base font-medium text-gray-700">
                            <p className="text-base font-medium text-gray-700">
                              <div className="flex items-center space-x-2">
                                {singleCoach?.isApproved || isVideoVerified ? (
                                  <span className="text-xs text-green-800  px-2 py-1  rounded-lg bg-green-100">
                                    Approved
                                  </span>
                                ) : (
                                  <span className="text-xs text-red-800  px-2 py-1  rounded-lg bg-red-100">
                                    Not Approved
                                  </span>
                                )}
                                <label className="flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    {...register("isVideoVerified")}
                                    className="hidden"
                                  />
                                  <div
                                    className={`relative w-12 h-6 bg-gray-200 rounded-full transition-colors duration-200 ${singleCoach?.isApproved || isVideoVerified
                                      ? "bg-green-600"
                                      : ""
                                      }`}>
                                    <div
                                      className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ${singleCoach?.isApproved || isVideoVerified
                                        ? "translate-x-full"
                                        : ""
                                        }`}
                                    />
                                  </div>
                                </label>
                              </div>
                            </p>
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Displaying the YouTube video using ReactPlayer */}
                    <div className='mt-4'>
                      {profileVideo?.url &&
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
                      )}
                    </div>
                  </div>

                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
                  </Dialog>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </div>
      </div>
    </>
  );
};

export default CoachDetailsPage;
