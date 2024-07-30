"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import dynamic from "next/dynamic";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MdDeleteOutline } from "react-icons/md";
import { ImSpinner3 } from "react-icons/im";
import { FaTimes } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

function CreateBlogs() {
  const [blog, setBlog] = useState({
    slug: "",
    meta: {
      title: " ",
      description: "",
    },
    title: "",
    mainImage: {
      url: "",
      altText: "",
      caption: "",
    },
    author: "",
    description: "",
    sections: [
      {
        title: "",
        description: "",
        images: [
          {
            url: "",
            altText: "",
            caption: "",
          },
        ],
      },
    ],
  });

  const editor = useRef(null);
  const sectionEditor = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [sectionPreviewImage, setSectionPreviewImage] = useState(null);
  const [isUploadMode, setIsUploadMode] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      meta: {
        ...blog.meta,
        [name]: value,
      },
    });
  };

  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSections = blog.sections.map((section, i) =>
      i === index ? { ...section, [name]: value } : section
    );
    setBlog({
      ...blog,
      sections: updatedSections,
    });
  };

  const handleImageChange = (sectionIndex, imageIndex, e) => {
    const { name, value } = e.target;
    const updatedSections = blog.sections.map((section, i) => {
      if (i === sectionIndex) {
        const updatedImages = section.images.map((image, j) =>
          j === imageIndex ? { ...image, [name]: value } : image
        );
        return { ...section, images: updatedImages };
      }
      return section;
    });
    setBlog({
      ...blog,
      sections: updatedSections,
    });
  };

  const handleAddSection = () => {
    setBlog({
      ...blog,
      sections: [
        ...blog.sections,
        { title: "", description: "", images: [""] },
      ],
    });
  };

  const handleEditorStateChange = (e) => {
    console.log(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/blogs/create", blog);
      console.log(response.data);
      // Handle success (e.g., clear form, show success message)
    } catch (error) {
      console.error("Error creating blog:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleDeleteSection = (i) => {
    const updatedSections = blog.sections.filter((_, j) => j !== i);
    setBlog({ ...blog, sections: updatedSections });
  };

  const handleSectionDescriptionChange = (e, i) => {
    const updatedSections = blog.sections.map((section, j) =>
      j === i ? { ...section, description: e } : section
    );
    setBlog({ ...blog, sections: updatedSections });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setBlog({
        ...blog,
        mainImage: {
          ...blog.mainImage,
          url: reader.result,
        },
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    const { value } = e.target;
    setPreviewImage(value);
    setBlog({
      ...blog,
      mainImage: {
        ...blog.mainImage,
        url: value,
      },
    });
  };

  const handleRemovePreviewImage = () => {
    setPreviewImage(null);
    setBlog({
      ...blog,
      mainImage: {
        ...blog.mainImage,
        url: "",
      },
    });
  };

  const labelText = isUploadMode ? "Image Upload" : "Image URL";

  const toggleUploadMode = () => {
    console.log("toggle buttton");
    setIsUploadMode((prev) => !prev);
  };

  const toggleSectionImageUploadMode = (sectionIndex, imageIndex) => {
    const updatedSections = blog.sections.map((section, i) => {
      if (i === sectionIndex) {
        const updatedImages = section.images.map((image, j) =>
          j === imageIndex
            ? { ...image, isUploadMode: !image.isUploadMode }
            : image
        );
        return { ...section, images: updatedImages };
      }
      return section;
    });
    setBlog({
      ...blog,
      sections: updatedSections,
    });
  };

  const handleSectionImageChange = (sectionIndex, imageIndex, e) => {
    const { name, value, files } = e.target;
    const updatedSections = blog.sections.map((section, secIdx) => {
      if (secIdx === sectionIndex) {
        const updatedImages = section.images.map((image, imgIdx) => {
          if (imgIdx === imageIndex) {
            if (name === "url") {
              if (files) {
                // Handle file upload
                const file = files[0];
                const reader = new FileReader();

                reader.onloadend = () => {
                  const newImage = {
                    ...image,
                    url: reader.result,
                    preview: reader.result,
                  };
                  const updatedImages = section.images.map((img, idx) =>
                    idx === imageIndex ? newImage : img
                  );
                  setBlog({
                    ...blog,
                    sections: blog.sections.map((sec, idx) =>
                      idx === sectionIndex
                        ? { ...sec, images: updatedImages }
                        : sec
                    ),
                  });
                };

                if (file) {
                  reader.readAsDataURL(file);
                }
              } else {
                // Handle URL input
                return {
                  ...image,
                  url: value,
                  preview: value,
                };
              }
            } else if (name === "altText") {
              return {
                ...image,
                altText: value,
              };
            } else if (name === "caption") {
              return {
                ...image,
                caption: value,
              };
            }
          }
          return image;
        });
        return { ...section, images: updatedImages };
      }
      return section;
    });
    setBlog({
      ...blog,
      sections: updatedSections,
    });
  };

  const handleRemoveImage = (sectionIndex, imageIndex) => {
    setBlog(prevBlog => {
      // Update sections by removing the specified image
      const updatedSections = prevBlog.sections.map((section, secIdx) => {
        if (secIdx === sectionIndex) {
          // Remove the image at imageIndex
          const updatedImages = section.images.filter((_, imgIdx) => imgIdx !== imageIndex);
          return { ...section, images: updatedImages };
        }
        return section;
      });
  
      // Return the updated state
      return { ...prevBlog, sections: updatedSections };
    });
  }

  return (
    <div className="mt-24 mb-10  w-[60%] h-auto p-5 mx-auto rounded-xl shadow-xl ">
      <h1 className="text-center text-2xl text-blue-900 font-bold">
        Create New Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="p-4">
        <div>
          <Label>
            Slug <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="slug"
            value={blog.slug}
            onChange={handleChange}
            required
            className=" p-2 w-full mt-1"
          ></Input>
        </div>
        <div className="my-2">
          <Label>
            Meta Title<span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="title"
            value={blog.meta.title}
            onChange={handleMetaChange}
            required
            className="border p-2 w-full mt-1"
          />
        </div>
        <div className="my-2">
          <Label>
            Meta Description<span className="text-red-500">*</span>
          </Label>
          <Textarea
            type="text"
            name="description"
            value={blog.meta.description}
            onChange={handleMetaChange}
            required
            className="border p-2 w-full mt-1"
          />
        </div>

        <div className="my-2">
          <Label>
            Title<span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
            className="border p-2 w-full mt-1"
          />
        </div>
        <div className="my-2 flex gap-5">
          <div className="my-2 w-1/3">
            <div className="my-2 flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="toggle-switch"
                  checked={isUploadMode}
                  onCheckedChange={toggleUploadMode}
                  className="bg-gray-500 text-white"
                />
                <Label htmlFor="toggle-switch">{labelText}</Label>
              </div>
            </div>
            {isUploadMode ? (
              <div>
                <Input
                  type="file"
                  name="mainImageUpload"
                  onChange={handleImageUpload}
                  required={!blog.mainImage.url}
                  className="border p-2 w-full mt-1"
                />
              </div>
            ) : (
              <div>
                <Input
                  type="text"
                  name="mainImageUrl"
                  value={blog.mainImage.url}
                  onChange={handleImageUrlChange}
                  required={!blog.mainImage.url}
                  placeholder="Enter image URL"
                  className="border p-2 w-full mt-1"
                />
              </div>
            )}
            {isUploadMode && previewImage && (
              <div className="relative mt-2">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-[200px] h-[200px] object-contain"
                />
                <button
                  type="button"
                  onClick={handleRemovePreviewImage}
                  className="absolute top-0 right-0 mt-2 mr-2 text-red-500 bg-white rounded-full p-1 shadow-lg"
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-5 my-2">
          <div className="image_alt_text w-1/2">
            <Label>
              Main Image Alt Text<span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="mainImage"
              value={blog.mainImage?.altText}
              onChange={handleChange}
              required
              className="border p-2 w-full mt-1"
            />
          </div>
          <div className="image_caption w-1/2">
            <Label>
              Main Image Caption<span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="mainImage"
              value={blog.mainImage?.caption}
              onChange={handleChange}
              required
              className="border p-2 w-full mt-1"
            />
          </div>
        </div>
        <div className="my-2">
          <Label>
            Author <span className="text-xs ml-1">(optional)</span>
          </Label>
          <Input
            type="text"
            name="author"
            value={blog.author}
            onChange={handleChange}
            required
            className="border p-2 w-full mt-1"
          />
        </div>
        <div className="my-2">
          <Label>
            Description<span className="text-red-500">*</span>
          </Label>
          <JoditEditor
            ref={editor}
            name="description"
            value={blog?.description}
            onChange={handleEditorStateChange}
            required={true}
            className="border p-2 w-full mt-1"
          />
        </div>

        <div className="my-2 mt-10">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-2xl font-bold text-blue-900">Sections</h2>
            <Button type="button" onClick={handleAddSection}>
              <FaPlus className="mr-1" /> Add Section
            </Button>
          </div>
          {blog.sections.map((section, index) => (
            <div key={index} className="p-2 mt-4 group relative">
              <Accordion
                type="single"
                collapsible
                className="w-full group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-4 bg-white"
                defaultValue={`item-${index}`}
                defaultChecked
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>
                    <div className=" px-3 flex flex-col items-start">
                      <h3 className="text-xl font-bold">
                        {section?.title || "( not described )"}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-2 ">
                      <Label>Section Title</Label>
                      <Input
                        type="text"
                        name="title"
                        value={section.title}
                        onChange={(e) => handleSectionChange(index, e)}
                        required
                        className="border p-2 w-full mt-1"
                      />
                    </div>
                    <div className="p-2">
                      <Label>Section Description</Label>
                      <JoditEditor
                        ref={sectionEditor}
                        name="description"
                        value={section?.description}
                        onChange={(e) =>
                          handleSectionDescriptionChange(e, index)
                        }
                        required
                        className="border p-2 w-full mt-1"
                      />
                    </div>
                    <div className="section_images">
                      {section.images.map((image, imageIndex) => (
                        <>
                          <div key={imageIndex} className="p-2">
                            <div className="w-1/3">
                              <div className="my-2 flex items-center gap-4">
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    id={`toggle-switch-section-${index}-image-${imageIndex}`}
                                    checked={image.isUploadMode}
                                    onCheckedChange={() =>
                                      toggleSectionImageUploadMode(
                                        index,
                                        imageIndex
                                      )
                                    }
                                  />
                                  <Label
                                    htmlFor={`toggle-switch-section-${index}-image-${imageIndex}`}
                                  >
                                    {image.isUploadMode
                                      ? "Image Upload"
                                      : "Image URL"}
                                  </Label>
                                </div>
                              </div>
                              {image.isUploadMode ? (
                                <Input
                                  type="file"
                                  name="url"
                                  className="border p-2 w-full mt-1"
                                  onChange={(e) =>
                                    handleSectionImageChange(
                                      index,
                                      imageIndex,
                                      e
                                    )
                                  }
                                />
                              ) : (
                                <Input
                                  type="text"
                                  name="url"
                                  value={image.url}
                                  placeholder="Enter image URL"
                                  className="border p-2 w-full mt-1"
                                  onChange={(e) =>
                                    handleSectionImageChange(
                                      index,
                                      imageIndex,
                                      e
                                    )
                                  }
                                />
                              )}
                              {image.preview && (
                                <div className="flex items-start gap-2 my-2">
                                  <img
                                    src={image.preview}
                                    alt={image.altText}
                                    className="w-[200px] h-[200px] object-contain"
                                  />
                                  <button
                                    onClick={() => handleRemoveImage(index,imageIndex)}
                                    className="text-red-500"
                                  >
                                    <FaTimes />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-10 p-2">
                            <div className="section_alt_text w-1/2">
                              <Label>Section Alt Text</Label>
                              <Input
                                type="text"
                                name="altText"
                                value={image.altText}
                                required
                                onChange={(e) =>
                                  handleSectionImageChange(index, imageIndex, e)
                                }
                                className="border p-2 w-full mt-1"
                              />
                            </div>
                            <div className="section_image_caption w-1/2">
                              <Label>Section Image Caption</Label>
                              <Input
                                type="text"
                                name="caption"
                                value={image.caption}
                                required
                                onChange={(e) =>
                                  handleSectionImageChange(index, imageIndex, e)
                                }
                                className="border p-2 w-full mt-1"
                              />
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <MdDeleteOutline
                className="-right-5 top-8 text-2xl
               font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out absolute"
                onClick={() => handleDeleteSection(index)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            className="bg-green-500 text-white text-xl p-6 mt-4 hover:bg-green-700 flex items-center"
          >
            {isLoading ? (
              <>
                Creating Blog{" "}
                <ImSpinner3 className="h-4 w-4 animate-spin ml-1" />
              </>
            ) : (
              <>Create Blog</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlogs;
