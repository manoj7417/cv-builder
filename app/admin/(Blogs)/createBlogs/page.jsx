/** @format */

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
import { MdDeleteOutline, MdKeyboardArrowLeft } from "react-icons/md";
import { ImSpinner3 } from "react-icons/im";
import { FaTimes, FaTrash } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { GetTokens } from "@/app/actions";
import { uploadImage } from "@/app/api/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

function CreateBlogs() {
  const [blog, setBlog] = useState({
    slug: "",
    header: "",
    body: "",
    meta: {
      title: " ",
      description: "",
      keywords: [],
    },
    maintitle: "",
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploadMode, setIsUploadMode] = useState(true);
  const [keywordInput, setKeywordInput] = useState("");
  const router = useRouter();

  //Handle form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  // Handle changes to the alt text
  const handleAltTextChange = (e) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      mainImage: {
        ...prevBlog.mainImage,
        altText: e.target.value,
      },
    }));
  };

  // Handle changes to the caption
  const handleCaptionChange = (e) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      mainImage: {
        ...prevBlog.mainImage,
        caption: e.target.value,
      },
    }));
  };

  // Hnadle Meta Content Change
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

  //Handle Section Change
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

  //Handle Section Image Change
  // const handleSectionImageChange = (sectionIndex, imageIndex, e) => {
  //   const { name, value, files } = e.target;
  //   const updatedSections = blog.sections.map((section, i) => {
  //     if (i === sectionIndex) {
  //       const updatedImages = section.images.map((image, j) => {
  //         if (j === imageIndex) {
  //           if (files) {
  //             const file = files[0];
  //             const reader = new FileReader();
  //             reader.onloadend = () => {
  //               const newImage = {
  //                 ...image,
  //                 url: reader.result,
  //                 preview: reader.result,
  //               };
  //               const updatedImagesWithPreview = section.images.map(
  //                 (img, idx) => (idx === imageIndex ? newImage : img)
  //               );
  //               const updatedSection = {
  //                 ...section,
  //                 images: updatedImagesWithPreview,
  //               };
  //               setBlog((prevBlog) => {
  //                 const updatedSections = prevBlog.sections.map((sec, secIdx) =>
  //                   secIdx === sectionIndex ? updatedSection : sec
  //                 );
  //                 return { ...prevBlog, sections: updatedSections };
  //               });
  //             };
  //             reader.readAsDataURL(file);
  //             return { ...image, url: "", preview: "" };
  //           } else {
  //             return { ...image, [name]: value };
  //           }
  //         }
  //         return image;
  //       });
  //       return { ...section, images: updatedImages };
  //     }
  //     return section;
  //   });
  //   setBlog({ ...blog, sections: updatedSections });
  // };
  const handleSectionImageChange = async (sectionIndex, imageIndex, e) => {
    const { name, value, files } = e.target;
    const updatedSections = blog.sections.map((section, i) => {
      if (i === sectionIndex) {
        const updatedImages = section.images.map((image, j) => {
          if (j === imageIndex) {
            if (files) {
              const file = files[0];
              const reader = new FileReader();
              reader.onloadend = async () => {
                const previewUrl = reader.result;
                const newImage = {
                  ...image,
                  preview: previewUrl,
                };
                const updatedImagesWithPreview = section.images.map(
                  (img, idx) => (idx === imageIndex ? newImage : img)
                );
                const updatedSection = {
                  ...section,
                  images: updatedImagesWithPreview,
                };
                setBlog((prevBlog) => {
                  const updatedSections = prevBlog.sections.map((sec, secIdx) =>
                    secIdx === sectionIndex ? updatedSection : sec
                  );
                  return { ...prevBlog, sections: updatedSections };
                });

                try {
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", "careerg");
                  const cloudinaryUrl = await uploadImage(formData);
                  const imageUrl = cloudinaryUrl?.data?.secure_url;
                  setBlog((prevBlog) => {
                    const updatedImagesWithCloudinary = section.images.map(
                      (img, idx) =>
                        idx === imageIndex
                          ? { ...newImage, url: imageUrl }
                          : img
                    );
                    const updatedSectionWithCloudinary = {
                      ...section,
                      images: updatedImagesWithCloudinary,
                    };
                    const updatedSectionsWithCloudinary = prevBlog.sections.map(
                      (sec, secIdx) =>
                        secIdx === sectionIndex
                          ? updatedSectionWithCloudinary
                          : sec
                    );
                    return {
                      ...prevBlog,
                      sections: updatedSectionsWithCloudinary,
                    };
                  });
                } catch (error) {
                  console.error("Error uploading image to Cloudinary", error);
                }
              };
              reader.readAsDataURL(file);
              return { ...image, url: "", preview: "" };
            } else {
              return { ...image, [name]: value };
            }
          }
          return image;
        });
        return { ...section, images: updatedImages };
      }
      return section;
    });
    setBlog({ ...blog, sections: updatedSections });
  };

  //Handle Secton Remove Image Change
  const handleRemoveSectionImagePreview = (sectionIndex, imageIndex) => {
    const updatedSections = blog.sections.map((section, i) => {
      if (i === sectionIndex) {
        const updatedImages = section.images.map((image, j) =>
          j === imageIndex ? { ...image, url: "", preview: "" } : image
        );
        return { ...section, images: updatedImages };
      }
      return section;
    });
    setBlog({ ...blog, sections: updatedSections });
  };

  //Handle Add Section
  const handleAddSection = () => {
    setBlog({
      ...blog,
      sections: [
        ...blog.sections,
        { title: "", description: "", images: [""] },
      ],
    });
  };

  //Handle Editor Change
  const handleEditorStateChange = (newContent) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      description: newContent,
    }));
  };

  //Handle Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { accessToken } = await GetTokens();
    const token = accessToken?.value;
    // Prepare data for submission
    const formattedBlog = {
      ...blog,
      isVerified,
      sections: blog.sections.map((section) => ({
        ...section,
        images: section.images.map((image) => ({
          url: image.url,
          altText: image.altText,
          caption: image.caption,
        })),
      })),
    };

    try {
      const response = await axios.post("/api/blog", formattedBlog, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      router.push("/admin/viewBlogs");
      toast.success("Blog created successfully", {
        position: "top-right",
      });
      // Handle success (e.g., clear form, show success message)
    } catch (error) {
      console.error("Error creating blog:", error);
      // Handle error (e.g., show error message)
    }
  };

  //Handle Delete Section
  const handleDeleteSection = (i) => {
    const updatedSections = blog.sections.filter((_, j) => j !== i);
    setBlog({ ...blog, sections: updatedSections });
  };

  //Hanlde Section Change
  const handleSectionDescriptionChange = (e, i) => {
    const updatedSections = blog.sections.map((section, j) =>
      j === i ? { ...section, description: e } : section
    );
    setBlog({ ...blog, sections: updatedSections });
  };

  //handle Main Image Change
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setPreviewImage(reader.result);
  //     setBlog((prevBlog) => ({
  //       ...prevBlog,
  //       mainImage: {
  //         ...prevBlog.mainImage,
  //         url: reader.result,
  //         altText: prevBlog.mainImage.altText || "", // Preserve existing altText or set empty string
  //         caption: prevBlog.mainImage.caption || "", // Preserve existing caption or set empty string
  //       },
  //     }));
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //     setSelectedImage(file);
  //   }
  // };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "careerg");
      const cloudinaryUrl = await uploadImage(formData);
      const imageUrl = cloudinaryUrl?.data?.secure_url;
      setBlog((prevBlog) => ({
        ...prevBlog,
        mainImage: {
          ...prevBlog.mainImage,
          url: imageUrl,
          altText: prevBlog.mainImage.altText || "", // Preserve existing altText or set empty string
          caption: prevBlog.mainImage.caption || "", // Preserve existing caption or set empty string
        },
      }));
    } catch (error) {
      console.error("Error handling image upload", error);
    }
  };

  //Handle Image Url Change
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

  //  Handle Remove Preview Image Change
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

  //Toggle Upload Mode
  const toggleUploadMode = () => {
    setIsUploadMode((prev) => !prev);
  };

  //Toggle Section Upload Mode
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

  // Handle MetaKeywords Change
  const handleKeywordInputChange = (e) => {
    setKeywordInput(e.target.value);
  };

  // Handle Add MetaKeywords Change
  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      setBlog((prevBlog) => ({
        ...prevBlog,
        meta: {
          ...prevBlog.meta,
          keywords: [...prevBlog.meta.keywords, keywordInput.trim()],
        },
      }));
      setKeywordInput("");
    }
  };

  // Handle Remove MetaKeywords Change
  const handleRemoveKeyword = (keywordToRemove) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      meta: {
        ...prevBlog.meta,
        keywords: prevBlog.meta.keywords.filter(
          (keyword) => keyword !== keywordToRemove
        ),
      },
    }));
  };

  // Function to handle adding a new image entry
  const handleAddSectionImage = (sectionIndex) => {
    setBlog((prevBlog) => {
      // Create a new array of images with a new image entry
      const updatedSections = prevBlog.sections.map((section, idx) => {
        if (idx === sectionIndex) {
          return {
            ...section,
            images: [
              ...section.images,
              {
                url: "",
                altText: "",
                caption: "",
                isUploadMode: true, // Set default upload mode
                preview: "",
              },
            ],
          };
        }
        return section;
      });

      return { ...prevBlog, sections: updatedSections };
    });
  };

  // Function to handle remove a new image entry
  const handleRemoveSectionImage = (sectionIndex, imageIndex) => {
    setBlog((prevBlog) => {
      const updatedSections = prevBlog.sections.map((section, idx) => {
        if (idx === sectionIndex) {
          return {
            ...section,
            images: section.images.filter((_, imgIdx) => imgIdx !== imageIndex),
          };
        }
        return section;
      });

      return { ...prevBlog, sections: updatedSections };
    });
  };

  const handleBackButton = () => {
    router.push("/admin/viewBlogs");
  };

  return (
    <>
      <div className='back_button flex justify-end pt-5 pr-5'>
        <button
          className='bg-blue-950 text-white px-3 py-2 rounded-md'
          onClick={handleBackButton}>
          <MdKeyboardArrowLeft className='text-2xl inline-flex animate-pulse mr-3' />
          Back
        </button>
      </div>
      <div className='mt-24 mb-10  w-[60%] h-auto p-5 mx-auto rounded-xl shadow-xl '>
        <h1 className='text-center text-2xl text-blue-900 font-bold'>
          Create New Blog Post
        </h1>
        <form onSubmit={handleSubmit} className='p-4'>
          <div className='blog_header'>
            <Label>
              Blog Header <span className='text-red-500'>*</span>
            </Label>

            <Input
              type='text'
              name='header'
              value={blog.header}
              onChange={handleChange}
              required
              className=' p-2 w-full mt-1'></Input>
          </div>
          <div className='blog_body my-2'>
            <Label>
              Blog Body <span className='text-red-500'>*</span>
            </Label>
            <Textarea
              type='text'
              name='body'
              value={blog.body}
              onChange={handleChange}
              required
              className='border p-2 w-full mt-1'
            />
          </div>
          <div>
            <Label>
              Slug <span className='text-red-500'>*</span>
            </Label>
            <Input
              type='text'
              name='slug'
              value={blog.slug}
              onChange={handleChange}
              required
              className=' p-2 w-full mt-1'></Input>
          </div>
          <div className='meta_section flex gap-5'>
            <div className='w-1/2 my-2'>
              <Label>
                Meta Title<span className='text-red-500'>*</span>
              </Label>
              <Input
                type='text'
                name='title'
                value={blog.meta.title}
                onChange={handleMetaChange}
                required
                className='border p-2 w-full mt-1'
              />
            </div>
            <div className='my-2 w-1/2'>
              <Label>
                Meta Keywords<span className='text-red-500'>*</span>
              </Label>
              <div className='flex'>
                <Input
                  type='text'
                  name='keywords'
                  value={keywordInput}
                  onChange={handleKeywordInputChange}
                  className='border p-2 w-full mt-1'
                />
                <Button
                  type='button'
                  onClick={handleAddKeyword}
                  className='ml-2 mt-1'>
                  Add
                </Button>
              </div>
              <div className='flex gap-5 mt-3'>
                {blog?.meta?.keywords.map((keyword, index) => (
                  <div key={index} className='flex items-start gap-1'>
                    <span className='p-2 border rounded'>{keyword}</span>
                    <FaTimes
                      className='text-red-500 cursor-pointer'
                      onClick={() => handleRemoveKeyword(keyword)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='my-2'>
            <Label>
              Meta Description<span className='text-red-500'>*</span>
            </Label>
            <Textarea
              type='text'
              name='description'
              value={blog.meta.description}
              onChange={handleMetaChange}
              required
              className='border p-2 w-full mt-1'
            />
          </div>

          <div className='my-2'>
            <Label>
              Main Title<span className='text-red-500'>*</span>
            </Label>
            <Input
              type='text'
              name='maintitle'
              value={blog.maintitle}
              onChange={handleChange}
              required
              className='border p-2 w-full mt-1'
            />
          </div>
          <div className='my-2 flex gap-5'>
            <div className='my-2 w-1/3'>
              <div className='my-2 flex items-center gap-4'>
                <div className='flex items-center space-x-2'>
                  <Switch
                    id='toggle-switch'
                    checked={isUploadMode}
                    onCheckedChange={toggleUploadMode}
                    className='bg-gray-500 text-white'
                  />
                  <Label htmlFor='toggle-switch'>
                    {isUploadMode ? "Main Image Upload" : "Main Image URL"}
                  </Label>
                </div>
              </div>
              {isUploadMode ? (
                <div>
                  <Input
                    type='file'
                    name='mainImageUpload'
                    onChange={handleImageUpload}
                    required={!blog.mainImage.url}
                    className='border p-2 w-full mt-1'
                  />
                </div>
              ) : (
                <div>
                  <Input
                    type='text'
                    name='mainImageUrl'
                    value={blog.mainImage.url}
                    onChange={handleImageUrlChange}
                    required={!blog.mainImage.url}
                    placeholder='Enter image URL'
                    className='border p-2 w-full mt-1'
                  />
                </div>
              )}
              {isUploadMode && previewImage && (
                <div className='relative mt-2'>
                  <img
                    src={previewImage}
                    alt='Preview'
                    className='w-[200px] h-[200px] object-contain'
                  />
                  <button
                    type='button'
                    onClick={handleRemovePreviewImage}
                    className='absolute top-0 right-0 mt-2 mr-2 text-red-500 bg-white rounded-full p-1 shadow-lg'>
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='flex gap-5 my-2'>
            <div className='image_alt_text w-1/2'>
              <Label>
                Main Image Alt Text<span className='text-red-500'>*</span>
              </Label>
              <Input
                type='text'
                name='mainImage'
                value={blog.mainImage?.altText}
                onChange={handleAltTextChange}
                required
                className='border p-2 w-full mt-1'
              />
            </div>
            <div className='image_caption w-1/2'>
              <Label>
                Main Image Caption<span className='text-red-500'>*</span>
              </Label>
              <Input
                type='text'
                name='mainImage'
                value={blog.mainImage?.caption}
                onChange={handleCaptionChange}
                required
                className='border p-2 w-full mt-1'
              />
            </div>
          </div>
          <div className='my-2'>
            <Label>
              Author <span className='text-xs ml-1'>(optional)</span>
            </Label>
            <Input
              type='text'
              name='author'
              value={blog.author}
              onChange={handleChange}
              required
              className='border p-2 w-full mt-1'
            />
          </div>
          <div className='my-2'>
            <Label>
              Description<span className='text-red-500'>*</span>
            </Label>
            <JoditEditor
              ref={editor}
              name='description'
              value={blog?.description}
              onChange={handleEditorStateChange}
              required={true}
              className='border p-2 w-full mt-1'
            />
          </div>

          <div className='my-2 mt-10'>
            <div className='w-full flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-blue-900'>Sections</h2>
              <Button type='button' onClick={handleAddSection}>
                <FaPlus className='mr-1' /> Add Section
              </Button>
            </div>
            {blog.sections.map((section, index) => (
              <div key={index} className='p-2 mt-4 group relative'>
                <Accordion
                  type='single'
                  collapsible
                  className='w-full group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-4 bg-white'
                  defaultValue={`item-${index}`}
                  defaultChecked>
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>
                      <div className=' px-3 flex flex-col items-start'>
                        <h3 className='text-xl font-bold'>
                          {section?.title || "( not described )"}
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='p-2 '>
                        <Label>Section Title</Label>
                        <Input
                          type='text'
                          name='title'
                          value={section.title}
                          onChange={(e) => handleSectionChange(index, e)}
                          required
                          className='border p-2 w-full mt-1'
                        />
                      </div>
                      <div className='p-2'>
                        <Label>Section Description</Label>
                        <JoditEditor
                          ref={sectionEditor}
                          name='description'
                          value={section?.description}
                          onChange={(e) =>
                            handleSectionDescriptionChange(e, index)
                          }
                          required
                          className='border p-2 w-full mt-1'
                        />
                      </div>
                      <div className='section_images'>
                        {section?.images?.map((image, imageIndex) => (
                          <>
                            <div key={imageIndex} className='p-2'>
                              <div className='w-1/3'>
                                <div className='my-2 flex items-center gap-4'>
                                  <div className='flex items-center space-x-2'>
                                    <Switch
                                      id={`toggle-switch-section-${index}-image-${imageIndex}`}
                                      checked={image.isUploadMode}
                                      className='bg-gray-500 text-white'
                                      onCheckedChange={() =>
                                        toggleSectionImageUploadMode(
                                          index,
                                          imageIndex
                                        )
                                      }
                                    />
                                    <Label
                                      htmlFor={`toggle-switch-section-${index}-image-${imageIndex}`}>
                                      {image.isUploadMode
                                        ? "Section Image Upload"
                                        : "Section Image URL"}
                                    </Label>
                                  </div>
                                  {/* Remove Button */}
                                  {section?.images?.length > 1 &&
                                    imageIndex > 0 && (
                                      <Button
                                        type='button'
                                        variant='outline'
                                        className='ml-auto'
                                        onClick={() =>
                                          handleRemoveSectionImage(
                                            index,
                                            imageIndex
                                          )
                                        }>
                                        <FaTimes />
                                      </Button>
                                    )}
                                </div>
                                {image.isUploadMode ? (
                                  <Input
                                    type='file'
                                    name='url'
                                    className='border p-2 w-full mt-1'
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
                                    type='text'
                                    name='url'
                                    value={image.url}
                                    placeholder='Enter image URL'
                                    className='border p-2 w-full mt-1'
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
                                  <div className='relative mt-2'>
                                    <img
                                      src={image.preview}
                                      alt='Preview'
                                      className='w-[200px] h-[200px] object-contain rounded-md'
                                    />
                                    <Button
                                      type='button'
                                      variant='outline'
                                      className='absolute top-1 right-1'
                                      onClick={() =>
                                        handleRemoveSectionImagePreview(
                                          index,
                                          imageIndex
                                        )
                                      }>
                                      <FaTimes />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className='flex gap-10 p-2'>
                              <div className='section_alt_text w-1/2'>
                                <Label>Section Alt Text</Label>
                                <Input
                                  type='text'
                                  name='altText'
                                  value={image.altText}
                                  required
                                  className='border p-2 w-full mt-1'
                                  onChange={(e) =>
                                    handleSectionImageChange(
                                      index,
                                      imageIndex,
                                      e
                                    )
                                  }
                                />
                              </div>
                              <div className='section_image_caption w-1/2'>
                                <Label>Section Image Caption</Label>
                                <Input
                                  type='text'
                                  name='caption'
                                  value={image.caption}
                                  required
                                  className='border p-2 w-full mt-1'
                                  onChange={(e) =>
                                    handleSectionImageChange(
                                      index,
                                      imageIndex,
                                      e
                                    )
                                  }
                                />
                              </div>
                            </div>
                            {/* Add the button to add the section */}
                            <Button
                              type='button'
                              onClick={() => handleAddSectionImage(index)}
                              className='mt-4 text-sm'>
                              <FaPlus /> Add Image
                            </Button>
                          </>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <MdDeleteOutline
                  className='-right-5 top-8 text-2xl
               font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out absolute'
                  onClick={() => handleDeleteSection(index)}
                />
              </div>
            ))}
          </div>
          <div className='flex justify-center items-center'>
            <Button
              type='submit'
              className='bg-green-500 text-white text-base p-4 mt-4 hover:bg-green-700 flex items-center'>
              {isLoading ? (
                <>
                  Creating Blog{" "}
                  <ImSpinner3 className='h-4 w-4 animate-spin ml-1' />
                </>
              ) : (
                <>Create Blog</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateBlogs;
