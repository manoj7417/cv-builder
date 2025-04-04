/** @format */

"use client";
import { GetTokens } from "@/app/actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";
import { Router } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
const EditCoachProgram = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [programData, setProgramData] = useState([]);
  const router = useRouter();
  const handleFetchCoachProgram = async () => {
    const { accessToken } = await GetTokens();
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/getAllProgram`, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      setProgramData(response?.data?.programs);
      setIsLoading(false);
    } catch (error) {}
  };
  const handleApprovalToggle = async (program) => {
    const { accessToken } = await GetTokens();
    const updatedStatus = !program.isapproved;
    setIsLoading(true);
    try {
      await axios.put(
        `/api/editCoachProgram/${id}`,
        { isapproved: updatedStatus, coachId: program.coachId, _id: id },
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      toast.success("Program approval status updated successfully.", {
        position: "top-right",
      });
      router.push(`/admin/coach-program`);
      setProgramData((prevData) =>
        prevData.map((p) =>
          p._id === program._id ? { ...p, isapproved: updatedStatus } : p
        )
      );
    } catch (error) {
      console.error("Failed to update approval status:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleFetchCoachProgram();
  }, []);

  return (
    <>
      <div className="card_coach max-w-5xl mx-auto mt-20">
        <div>
          {programData.length > 0 ? (
            programData
              .filter((program) => program._id === id)
              .map((program, index) => (
                <>
                  <div
                    className="bg-white shadow-md rounded-lg p-4 max-w-5xl mx-auto h-auto flex flex-col justify-between"
                    key={index}
                  >
                    <div className="program_video">
                      {program?.programVideo &&
                      ReactPlayer.canPlay(program?.programVideo) ? (
                        <ReactPlayer
                          url={program?.programVideo}
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

                    <div className="p-4 flex items-center gap-5">
                      <div className="program_image w-[140px] h-[120px]">
                        <img
                          src={program.programImage}
                          alt={program.title}
                          className="w-full h-full  object-cover rounded-full mb-4" // Set fixed width and height for the image
                        />
                      </div>

                      <div className="program_title">
                        <h2 className="text-xl font-bold mb-2">
                          <span>Course Title :</span>
                          {program.title}
                        </h2>
                        <p className="text-gray-700 mb-2 text-base">
                          <span className="font-bold">
                            Course Description :{" "}
                          </span>
                          {/* {program.description} */}
                          <div
                            className="program-description-content"
                            dangerouslySetInnerHTML={{
                              __html: program.description,
                            }}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="programs_days">
                      <h2 className="text-2xl font-bold mb-4">
                        Course content
                      </h2>
                      <Accordion type="single" collapsible className="">
                        {program?.days?.map((day, index) => (
                          <AccordionItem
                            key={index}
                            value={day._id}
                            className="border border-gray-200 p-2 my-2 rounded-md "
                          >
                            <AccordionTrigger className="font-semibold text-base">
                              {day?.title}
                            </AccordionTrigger>
                            <AccordionContent className="space-x-4 mt-2 text-base">
                              <div className="flex items-center space-x-4 text-base">
                                <p className="flex-1">{day?.description}</p>
                                <p className="font-medium">
                                  {day.timeToComplete} minutes
                                </p>
                              </div>
                              {/* Render Prerequisites */}
                              {day.prerequisites.length > 0 && (
                                <div className="mt-4">
                                  <h3 className="font-semibold">
                                    Prerequisites:
                                  </h3>
                                  <ul className="list-disc ml-5">
                                    {day.prerequisites.map((req) => (
                                      <li key={req._id}>
                                        <Link
                                          href={req.attachmentUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-500 hover:underline"
                                        >
                                          {req.description} ({req.type})
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Render Submodules */}
                              {day.subModules.length > 0 && (
                                <div className="mt-4">
                                  <h3 className="font-semibold">Submodules:</h3>
                                  <ul className="list-disc ml-5">
                                    {day.subModules.map((sub) => (
                                      <li key={sub._id}>
                                        {sub.title} - {sub.description} (
                                        {sub.timeToComplete} minutes)
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                    <div className="program_prerequisites mt-2">
                      <h2 className="text-2xl font-bold mb-4">
                        Course Prerequisites
                      </h2>
                      <ul className="list-disc list-inside space-y-4">
                        {program?.prerequisites.map((item) => (
                          <li key={item._id} className="text-md">
                            <span className="font-bold">
                              {item.description}:
                            </span>{" "}
                            <Link
                              href={item.attachmentUrl}
                              className="text-blue-500 underline"
                            >
                              {item.type}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Approve Button */}
                    <div className="mt-6 flex justify-end">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleApprovalToggle(program._id)}
                        disabled={isLoading}
                      >
                        {isLoading ? "Processing..." : "Approve Program"}
                      </button>
                    </div>
                  </div>
                </>
              ))
          ) : (
            <p className="text-center text-gray-500">No programs available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EditCoachProgram;
