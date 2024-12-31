// /** @format */

// "use client";
// import { GetTokens } from "@/app/actions";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import React, { Suspense, useEffect, useState } from "react";
// import ReactPlayer from "react-player";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import Link from "next/link";

// function EditProgramfunc() {
//   const { id } = useParams();
//   const [isInfoLoading, setIsInfoLoading] = useState(true);
//   const [viewPrograms, setViewPrograms] = useState([]);

//   const handleGetProgrambyId = async (id) => {
//     const { accessToken } = await GetTokens(true);
//     try {
//       const { data } = await axios.get(`/api/getProgramById/${id}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken.value}`,
//         },
//       });
//       setViewPrograms(data?.program);
//     } catch (error) {
      
//     } finally {
//       setIsInfoLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleGetProgrambyId(id);
//   }, [id]);

//   return (
//     <div className='w-full '>
//       {isInfoLoading ? (
//         <div className='h-screen w-full flex items-center justify-center'>
//           <p>Loading...</p>
//         </div>
//       ) : (
//         <div>
//           <>
//             <div className='bg-white shadow-md rounded-lg p-4 max-w-5xl mx-auto h-auto flex flex-col justify-between'>
//               <div className='program_video'>
//                 {viewPrograms?.programVideo &&
//                 ReactPlayer.canPlay(viewPrograms?.programVideo) ? (
//                   <ReactPlayer
//                     url={viewPrograms?.programVideo}
//                     controls
//                     width='100%'
//                     height='300px'
//                   />
//                 ) : (
//                   <p>Please enter a valid YouTube URL to preview the video.</p>
//                 )}
//               </div>

//               <div className='p-4 flex items-center gap-5'>
//                 <div className='program_image w-[120px] h-[120px]'>
//                   <img
//                     src={viewPrograms.programImage}
//                     alt={viewPrograms.title}
//                     className='w-full h-full  object-cover rounded-full mb-4' // Set fixed width and height for the image
//                   />
//                 </div>

//                 <div className='program_title'>
//                   <h2 className='text-xl font-bold mb-2'>
//                     <span>Course Title :</span>
//                     {viewPrograms.title}
//                   </h2>
//                   <p className='text-gray-700 mb-2 text-base'>
//                     <span className='font-bold'>Course Description : </span>
//                     {viewPrograms.description}
//                   </p>
//                 </div>
//               </div>
//               <div className='programs_days'>
//                 <h2 className='text-2xl font-bold mb-4'>Course content</h2>
//                 <Accordion type='single' collapsible className=''>
//                   {viewPrograms?.days?.map((day, index) => (
//                     <AccordionItem
//                       key={index}
//                       value={day._id}
//                       className='border border-gray-200 p-2 my-2 rounded-md '>
//                       <AccordionTrigger className='font-semibold text-base'>
//                         {day?.title}
//                       </AccordionTrigger>
//                       <AccordionContent className='space-x-4 mt-2 text-base'>
//                         <div className='flex items-center space-x-4 text-base'>
//                           <p className='flex-1'>{day?.description}</p>
//                           <p className='font-medium'>
//                             {day.timeToComplete} minutes
//                           </p>
//                         </div>
//                         {/* Render Prerequisites */}
//                         {day.prerequisites.length > 0 && (
//                           <div className='mt-4'>
//                             <h3 className='font-semibold'>Prerequisites:</h3>
//                             <ul className='list-disc ml-5'>
//                               {day.prerequisites.map((req) => (
//                                 <li key={req._id}>
//                                   <Link
//                                     href={req.attachmentUrl}
//                                     target='_blank'
//                                     rel='noopener noreferrer'
//                                     className='text-blue-500 hover:underline'>
//                                     {req.description} ({req.type})
//                                   </Link>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         {/* Render Submodules */}
//                         {day.subModules.length > 0 && (
//                           <div className='mt-4'>
//                             <h3 className='font-semibold'>Submodules:</h3>
//                             <ul className='list-disc ml-5'>
//                               {day.subModules.map((sub) => (
//                                 <li key={sub._id}>
//                                   {sub.title} - {sub.description} (
//                                   {sub.timeToComplete} minutes)
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                       </AccordionContent>
//                     </AccordionItem>
//                   ))}
//                 </Accordion>
//               </div>
//               <div className='program_prerequisites mt-2'>
//                 <h2 className='text-2xl font-bold mb-4'>
//                   Course Prerequisites
//                 </h2>
//                 <ul className='list-disc list-inside space-y-4'>
//                   {viewPrograms?.prerequisites?.map((item) => (
//                     <li key={item._id} className='text-md'>
//                       <span className='font-bold'>{item.description}:</span>{" "}
//                       <Link
//                         href={item.attachmentUrl}
//                         className='text-blue-500 underline'>
//                         {item.type}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </>
//         </div>
//       )}
//     </div>
//   );
// }

// const EditProgram = () => {
//   return (
//     <Suspense>
//       <EditProgramfunc />
//     </Suspense>
//   );
// };

// export default EditProgram;

"use client";
import { GetTokens } from "@/app/actions";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useForm, useFieldArray } from "react-hook-form";
import { htmlToText } from "html-to-text";
import { XIcon } from "lucide-react";

function EditProgramfunc() {
  const { id } = useParams();
  const [isInfoLoading, setIsInfoLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState("");

  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      programVideo: "",
      programImage: "",
      title: "",
      description: "",
      amount: 0,
      content: "",
      days: [],
      prerequisites: [],
    },
  });

  const { fields: dayFields } = useFieldArray({
    control,
    name: "days",
  });

  const { fields: prerequisiteFields } = useFieldArray({
    control,
    name: "prerequisites",
  });

  const watchProgramVideo = watch("programVideo");
  const watchProgramImage = watch("programImage");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setValue("programImage", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleImageRemove = () => {
    setPreviewImage(""); // Clear the preview image
    setValue("programImage", ""); // Clear the form field value for programImage
  };

  const handleGetProgramById = async (id) => {
    const { accessToken } = await GetTokens(true);
    try {
      const { data } = await axios.get(`/api/getProgramById/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });

      // Populate form fields
      setValue("programVideo", data?.program?.programVideo || "");
      setValue("programImage", data?.program?.programImage || "");
      setValue("title", data?.program?.title || "");
      setValue("description", data?.program?.description || "");
      setValue("amount", data?.program?.amount || 0);
      // setValue("content", data?.program?.content || "");
      setValue("content", htmlToText(data?.program?.content || "", { wordwrap: 130 }));
      setValue("days", data?.program?.days || []);
      setValue("prerequisites", data?.program?.prerequisites || []);
      setPreviewImage(data?.program?.programImage || "");
    } catch (error) {
      console.error(error);
    } finally {
      setIsInfoLoading(false);
    }
  };

  useEffect(() => {
    handleGetProgramById(id);
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const { accessToken } = await GetTokens(true);
      await axios.put(`/api/updateProgram/${id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      alert("Program updated successfully!");
    } catch (error) {
      console.error("Error updating program:", error);
    }
  };

  return (
    <div className="w-full">
      {isInfoLoading ? (
        <div className="h-screen w-full flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-5 max-w-5xl mx-auto">
          <div className="program_video">
            <label className="block font-bold mb-2 ">Program Video URL</label>
            <input
              {...register("programVideo")}
              type="url"
              className="block w-full border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter a valid video URL"
            />
            {ReactPlayer.canPlay(watchProgramVideo) ? (
              <ReactPlayer url={watchProgramVideo} controls width="100%" height="300px" />
            ) : (
              <p className="text-red-500">Please enter a valid video URL.</p>
            )}
          </div>

          <div className="program_image my-4">
            <label className="block font-bold mb-2">Program Image</label>
            <div className="relative">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                onClick={() => document.getElementById("fileUpload").click()}
              >
                Upload Image
              </button>
              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            {previewImage ? (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Program Preview"
                  className="w-32 h-32 object-cover rounded-full mt-4"
                />
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <p className="text-gray-500 mt-2">No image selected</p>
            )}
          </div>


          <div className="program_details">
            <label className="block font-bold mb-2">Course Title</label>
            <input
              {...register("title")}
              type="text"
              className="block w-full border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter the course title"
            />

            <label className="block font-bold mb-2">Course Description</label>
            <textarea
              {...register("description")}
              className="block w-full border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter the course description"
            />

            <label className="block font-bold mb-2">Amount</label>
            <input
              {...register("amount")}
              type="number"
              className="block w-full border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter the amount"
            />

            <label className="block font-bold mb-2">Content</label>
            <textarea
              {...register("content")}
              className="block w-full border border-gray-300 rounded p-2"
              placeholder="Enter the content"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}

export default EditProgramfunc;


