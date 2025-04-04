"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, Upload, LoaderCircle, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axios from "axios";
import ReactPlayer from "react-player";
import { GetTokens } from "@/app/actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const PrerequisitesFieldArray = dynamic(
  () => import("../../create/PrerequisitesFieldArray"),
  { ssr: false }
);
import { ProgramValidationSchema } from "../../create/ProgramValidationSchema";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

function UpdateProgram() {
  const { id } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef(null);
  const [isUploadingImage, setIsUploading] = useState(false);
  const [isCreatingProgram, setIscreatingProgram] = useState(false);
  const router = useRouter();
  const [isInfoLoading, setIsInfoLoading] = useState(true);

  const handleOpenFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(ProgramValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      prerequisites: [],
      days: [],
      currency: "GBP",
      amount: 0,
      programImage: "",
      programVideo: "",
      content: "",
    },
  });
  const profileImage = watch("programImage");
  const programVideo = watch("programVideo");
  const content = watch("content");
  const description = watch("description");
  const currency = watch("currency");

  const handleDescriptionChange = (value) => {
    setValue("description", value);
  };

  const handleUpateProgram = async (data) => {
    setIscreatingProgram(true);
    try {
      const { accessToken } = await GetTokens(true);
      const response = await axios.put(`/api/updateProgram/${id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        toast.success("Program updated successfully");
        router.push("/coach-dashboard/programs");
      }
    } catch (error) {
      console.error("Error updating program:", error);
      toast.error("Error updating program");
    } finally {
      setIscreatingProgram(false);
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post("/api/uploadImage", formData);
      if (response.status === 200) {
        const imageUrl = response.data.url;
        setValue("programImage", imageUrl);
        clearErrors("programImage");
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const handlecontentvalueChange = (e) => {
    setValue("content", e);
  };

  const handleGetProgramById = async (id) => {
    const { accessToken } = await GetTokens(true);
    try {
      const { data } = await axios.get(`/api/getProgramById/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      setValue("programVideo", data?.program?.programVideo || "");
      setValue("programImage", data?.program?.programImage || "");
      setValue("title", data?.program?.title || "");
      setValue("description", data?.program?.description || "");
      setValue("amount", data?.program?.amount || 0);
      setValue("content", data?.program?.content || "");
      setValue("days", data?.program?.days || []);
      setValue("prerequisites", data?.program?.prerequisites || []);
      setPreviewImage(data?.program?.programImage || "");
    } catch (error) {
    } finally {
      setIsInfoLoading(false);
    }
  };

  useEffect(() => {
    handleGetProgramById(id);
  }, [id]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <ArrowLeft
                    className="h-6 w-6 cursor-pointer hover:text-[#f76918]"
                    onClick={() => router.back()}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Go Back</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <h1 className="ml-4 text-xl font-semibold">Update Program</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit(handleUpateProgram)} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
            {/* Title Section */}
            <div>
              <Label className="text-base">
                Title<span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                placeholder="Enter program title"
                className="mt-2"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description Section */}
            <div>
              <Label className="text-base">
                Description<span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="mt-2 editor-wrapper">
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Enter program description"
                  className="editor-container"
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Image Upload Section */}
            <div className="mt-8">
              <Label className="text-base">
                Program Image<span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="mt-2">
                {profileImage ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-64 h-64 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={profileImage}
                        alt="Program preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setValue("programImage", "")}
                      className="self-start"
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full sm:w-64 h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleOpenFileInput}
                      disabled={isUploadingImage}
                      className="flex items-center gap-2"
                    >
                      {isUploadingImage ? (
                        <>
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          Upload Image
                        </>
                      )}
                    </Button>
                    <Input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleUploadImage}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Video Section */}
            <div>
              <Label className="text-base">Program Video</Label>
              <p className="text-sm text-gray-500 mt-1">
                Provide a YouTube video link for your program
              </p>
              <div className="mt-2">
                {programVideo ? (
                  <div className="space-y-4">
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <ReactPlayer
                        url={programVideo}
                        width="100%"
                        height="100%"
                        className="react-player"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setValue("programVideo", "")}
                    >
                      Remove Video
                    </Button>
                  </div>
                ) : (
                  <Input
                    placeholder="Enter YouTube URL"
                    {...register("programVideo")}
                  />
                )}
              </div>
            </div>

            {/* Amount Section */}
            <div>
              <Label className="text-base">Amount (£)</Label>
              <div className="mt-2 relative">
                <Input
                  type="number"
                  {...register("amount")}
                  placeholder="Enter amount"
                  min="1"
                  className="pl-8"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  £
                </span>
              </div>
            </div>

            {/* Prerequisites Section */}
            <PrerequisitesFieldArray
              control={control}
              register={register}
              errors={errors}
              name="prerequisites"
            />

            {/* Program Description Section */}
            <div>
              <Label className="text-base">
                Program Content<span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="mt-2 editor-wrapper">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={handlecontentvalueChange}
                  placeholder="Write your program content here..."
                  className="editor-container"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isCreatingProgram}
              className="min-w-[200px]"
            >
              {isCreatingProgram ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Updating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Update Program
                  <ChevronRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProgram;

<style jsx global>{`
  .editor-wrapper {
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .editor-container {
    display: flex;
    flex-direction: column;
    min-height: 200px;
  }

  .editor-container .ql-toolbar {
    border: none;
    border-bottom: 1px solid #e2e8f0;
    background: #f8fafc;
    padding: 0.75rem;
  }

  .editor-container .ql-container {
    border: none;
    flex: 1;
    height: auto;
  }

  .editor-container .ql-editor {
    min-height: 150px;
    max-height: 500px;
    overflow-y: auto;
    font-size: 1rem;
    line-height: 1.5;
    padding: 1rem;
  }

  .editor-container .ql-editor p {
    margin-bottom: 0.5rem;
  }

  /* Ensure content stays within bounds */
  .editor-container .ql-editor * {
    max-width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  /* Better toolbar responsiveness */
  @media (max-width: 640px) {
    .editor-container .ql-toolbar {
      padding: 0.5rem;
    }

    .editor-container .ql-toolbar .ql-formats {
      margin-right: 8px;
    }
  }

  /* Video player responsive styles */
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }

  .react-player > div {
    position: absolute;
  }
`}</style>;
