"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import useCoachesDetailStore from "@/app/store/coachDetailStore";
import { useParams } from "next/navigation";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const CoachDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const { singleCoach, fetchAllCoaches, filterCoachById, isLoading } =
    useCoachesDetailStore();
  const { id } = useParams();

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllCoaches();
    };

    fetchData();
  }, [fetchAllCoaches]);

  useEffect(() => {
    if (id) {
      console.log("Filtering coach with id:", id); // Debugging log
      filterCoachById(id);
    }
  }, [id, filterCoachById]);

  const {
    name,
    email,
    phone,
    bio,
    coachingDescription,
    profileImage,
    dateofBirth,
    experience,
    address,
    city,
    country,
    zip,
    bankDetails,
    ratesPerHour,
    cv,
    signedAggrement,
    typeOfCoaching,
    skills,
  } = singleCoach;

  console.log(singleCoach);

  return (
    <>
      <div className="w-full h-auto mt-10 bg-white m-10 p-10">
        <div className="main_heading_section flex justify-between">
          <h1 className="text-xl text-black font-bold">{name}</h1>
          <div className="approve_button">
            <Button className="bg-blue-700 text-white px-10 py-2 rounded-md">
              Approve
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
            <div className="personal_details_section flex w-full h-full mt-10">
              <div className="lg:w-[20%] w-full profile_image">
                <div className="image_section text-center flex justify-center">
                  <img
                    src={profileImage}
                    alt="profileImage"
                    className="rounded-full"
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
                  {bankDetails?.code?.ifscCode || "N/A"}
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
                <p className="text-base font-bold text-gray-700">CV</p>
                <div className="flex">
                  <div className="block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                    <div className="text-green-500 hover:underline flex gap-5">
                      <FaCheckCircle className="text-xl " />
                      {cv?.link ? cv?.link.split("/").pop() : "View CV"}
                    </div>
                    <div>
                      <p className="text-base my-2 font-medium text-gray-700">
                        Verified: {cv?.isVerified ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle
                      className="text-green-500 text-xl cursor-pointer"
                      title="Verified"
                    />
                    <FaTimesCircle
                      className="text-red-500 text-xl cursor-pointer"
                      title="Not Verified"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-base font-bold text-gray-700">
                  Signed Agreement
                </p>

                <div className="flex">
                  <div className="block w-full px-3 py-2 border-b border-gray-300 text-sm text-gray-900">
                    <div className="text-green-500 hover:underline flex gap-5">
                      <FaCheckCircle className="text-xl " />
                      {signedAggrement?.link
                        ? signedAggrement?.link.split("/").pop()
                        : "View CV"}
                    </div>
                    <div>
                      <p className="text-base my-2 font-medium text-gray-700">
                        Verified: {signedAggrement?.isVerified ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle
                      className="text-green-500 text-xl cursor-pointer"
                      title="Verified"
                    />
                    <FaTimesCircle
                      className="text-red-500 text-xl cursor-pointer"
                      title="Not Verified"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default CoachDetailsPage;
