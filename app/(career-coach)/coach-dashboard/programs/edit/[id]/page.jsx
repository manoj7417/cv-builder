/** @format */

"use client";
import { GetTokens } from "@/app/actions";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

function EditProgramfunc() {
  const { id } = useParams();
  const [isInfoLoading, setIsInfoLoading] = useState(true);
  const [viewPrograms, setViewPrograms] = useState([]);

  const handleGetProgrambyId = async (id) => {
    const { accessToken } = await GetTokens();
    try {
      const { data } = await axios.get(`/api/getProgramById/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      setViewPrograms(data?.program);
    } catch (error) {
      
    } finally {
      setIsInfoLoading(false);
    }
  };

  useEffect(() => {
    handleGetProgrambyId(id);
  }, [id]);

  return (
    <div className='w-full '>
      {isInfoLoading ? (
        <div className='h-screen w-full flex items-center justify-center'>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <>
            <div className='bg-white shadow-md rounded-lg p-4 max-w-5xl mx-auto h-auto flex flex-col justify-between'>
              <div className='program_video'>
                {viewPrograms?.programVideo &&
                ReactPlayer.canPlay(viewPrograms?.programVideo) ? (
                  <ReactPlayer
                    url={viewPrograms?.programVideo}
                    controls
                    width='100%'
                    height='300px'
                  />
                ) : (
                  <p>Please enter a valid YouTube URL to preview the video.</p>
                )}
              </div>

              <div className='p-4 flex items-center gap-5'>
                <div className='program_image w-[140px] h-[120px]'>
                  <img
                    src={viewPrograms.programImage}
                    alt={viewPrograms.title}
                    className='w-full h-full  object-cover rounded-full mb-4' // Set fixed width and height for the image
                  />
                </div>

                <div className='program_title'>
                  <h2 className='text-xl font-bold mb-2'>
                    <span>Course Title :</span>
                    {viewPrograms.title}
                  </h2>
                  <p className='text-gray-700 mb-2 text-base'>
                    <span className='font-bold'>Course Description : </span>
                    {viewPrograms.description}
                  </p>
                </div>
              </div>
              <div className='programs_days'>
                <h2 className='text-2xl font-bold mb-4'>Course content</h2>
                <Accordion type='single' collapsible className=''>
                  {viewPrograms?.days?.map((day, index) => (
                    <AccordionItem
                      key={index}
                      value={day._id}
                      className='border border-gray-200 p-2 my-2 rounded-md '>
                      <AccordionTrigger className='font-semibold text-base'>
                        {day?.title}
                      </AccordionTrigger>
                      <AccordionContent className='space-x-4 mt-2 text-base'>
                        <div className='flex items-center space-x-4 text-base'>
                          <p className='flex-1'>{day?.description}</p>
                          <p className='font-medium'>
                            {day.timeToComplete} minutes
                          </p>
                        </div>
                        {/* Render Prerequisites */}
                        {day.prerequisites.length > 0 && (
                          <div className='mt-4'>
                            <h3 className='font-semibold'>Prerequisites:</h3>
                            <ul className='list-disc ml-5'>
                              {day.prerequisites.map((req) => (
                                <li key={req._id}>
                                  <Link
                                    href={req.attachmentUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-blue-500 hover:underline'>
                                    {req.description} ({req.type})
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Render Submodules */}
                        {day.subModules.length > 0 && (
                          <div className='mt-4'>
                            <h3 className='font-semibold'>Submodules:</h3>
                            <ul className='list-disc ml-5'>
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
              <div className='program_prerequisites mt-2'>
                <h2 className='text-2xl font-bold mb-4'>
                  Course Prerequisites
                </h2>
                <ul className='list-disc list-inside space-y-4'>
                  {viewPrograms?.prerequisites.map((item) => (
                    <li key={item._id} className='text-md'>
                      <span className='font-bold'>{item.description}:</span>{" "}
                      <Link
                        href={item.attachmentUrl}
                        className='text-blue-500 underline'>
                        {item.type}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
}

const EditProgram = () => {
  return (
    <Suspense>
      <EditProgramfunc />
    </Suspense>
  );
};

export default EditProgram;
