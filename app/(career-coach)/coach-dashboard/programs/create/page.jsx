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
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const PrerequisitesFieldArray = dynamic(
  () => import("./PrerequisitesFieldArray"),
  { ssr: false }
);
import { ProgramValidationSchema } from "./ProgramValidationSchema";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CreateProgram() {
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef(null);
  const [isUploadingImage, setIsUploading] = useState(false);
  const [isCreatingProgram, setIscreatingProgram] = useState(false);
  const router = useRouter();
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
    },
  });
  const profileImage = watch("programImage");
  const programVideo = watch("programVideo");
  const content = watch("content");
  const currency = watch("currency");
  const handleCreateProgram = async (data) => {
    const { accessToken } = await GetTokens(true);
    console.log("accessToken", accessToken);
    try {
      setIscreatingProgram(true);
      const response = await axios.post("/api/createProgram", data, {
        headers: {
          Authorization: `Bearer ${accessToken?.value}`,
        },
      });

      if (response.status === 201) {
        toast.success("Program created successfully");
        reset();
        router.push("/coach-dashboard/programs");
      }
    } catch (error) {
      toast.error("Error creating program");
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

  const handleDescriptionChange = (value) => {
    setValue("description", value);
    register("description", { required: true });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full py-4">
      <div className="px-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <ArrowLeft
                className="cursor-pointer"
                onClick={() => router.back()}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Go Back</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="w-full h-full rounded-lg px-8 py-4">
        <form onSubmit={handleSubmit(handleCreateProgram)}>
          <h1 className="py-4 text-lg font-bold">Create a new program</h1>
          <div className="py-2">
            <Label>
              Title<span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              placeholder="Enter program title"
              className="my-2"
              {...register("title")}
            />
            <p className="text-red-500 text-sm ml-2">{errors.title?.message}</p>
          </div>
          <div className="my-5">
            <Label>
              Description<span className="text-red-500 ml-1">*</span>
            </Label>
            {/* <Textarea
              placeholder="Enter program description"
              className="my-2"
              {...register("description")}
            /> */}
            <ReactQuill
              theme="snow"
              onChange={handleDescriptionChange} // Handle changes
              style={{
                height: "auto",
                margin: "10px 0px",
                border: "1px solid #E5E7EB",
                borderRadius: "5px",
              }}
              placeholder="Enter program description"
            />
            <p className="text-red-500 text-sm ml-2">
              {errors.description?.message}
            </p>
          </div>
          <div className="lg:mt-14 mt-20 mb-5">
            <Label>Program Image</Label>
            {profileImage ? (
              <div className="flex items-center py-4">
                <img
                  src={profileImage}
                  alt="profile image"
                  className="w-52 h-52 object-cover rounded-lg"
                />
                <Button
                  className="ml-4 bg-red-600 hover:bg-red-700"
                  type="button"
                  onClick={() => setValue("programImage", "")}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="flex items-center py-2">
                <div className="w-2/5 flex items-center">
                  <Button
                    onClick={handleOpenFileInput}
                    disabled={isUploadingImage}
                    type="button"
                  >
                    {isUploadingImage ? (
                      <>
                        Uploading{" "}
                        <LoaderCircle className="h-4 ml-1 animate-spin" />
                      </>
                    ) : (
                      <>
                        Upload <Upload className="h-4 ml-1" />
                      </>
                    )}
                  </Button>
                  <Input
                    type="file"
                    className="my-2  hidden"
                    {...register("programImage")}
                    ref={fileInputRef}
                    onChange={handleUploadImage}
                  />
                </div>
              </div>
            )}
            <p className="text-red-500 text-sm ml-2">
              {errors.programImage?.message}
            </p>
          </div>
          <div className="py-2">
            <Label>Program Video</Label>
            <p className="mt-1 text-xs leading-6 text-gray-600">
              Please provide a youtube video link for your program video
            </p>
            {programVideo ? (
              <div className="flex items-center py-4">
                <ReactPlayer url={programVideo} />
                <Button
                  className="ml-4 bg-red-600 hover:bg-red-700"
                  type="button"
                  onClick={() => setValue("programVideo", "")}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <Input
                placeholder="Enter video url"
                className="my-2"
                {...register("programVideo")}
              />
            )}
            <p className="text-red-500 text-sm ml-2">
              {errors.programVideo?.message}
            </p>
          </div>
          <div className="py-2">
            <Label>Amount (£)</Label>
            <div className="flex items-center">
              <Input
                type="number"
                className="my-2"
                {...register("amount")}
                placeholder="Enter amount in GBP (£)"
                min={"1"}
              />
            </div>
          </div>
          <PrerequisitesFieldArray
            control={control}
            register={register}
            errors={errors}
            name={"prerequisites"}
          />
          <div>
            <h1 className="py-4 text-lg font-bold">Program Content</h1>
            <ReactQuill
              style={{
                height: "auto",
                margin: "10px 0px 50px",
                border: "1px solid #E5E7EB",
                borderRadius: "5px",
              }}
              theme="snow"
              value={content}
              onChange={handlecontentvalueChange}
              placeholder="Write your program here..."
            />
          </div>
          <div className="w-full flex justify-end py-4">
            <Button
              type="submit"
              disabled={isCreatingProgram}
              className="lg:mt-0 mt-10"
            >
              {isCreatingProgram ? (
                <>
                  Creating Program{" "}
                  <LoaderCircle className="h-4 ml-1 animate-spin" />
                </>
              ) : (
                <>
                  Create Program <ChevronRight className="h-4 " />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProgram;
