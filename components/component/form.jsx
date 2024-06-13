"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Dialog, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { GoGrabber } from "react-icons/go";
import { FaCrown } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { DatePicker } from "antd";
import CustomLabelInput from "../ui/customLabelInput";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { HexColorPicker } from "react-colorful";
import { AccordianColor, colors } from "@/constants/colors";
import { cn } from "@/lib/utils";
import { SkillsSelect } from "./skills-select";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { AskBot, getBetterResume } from "@/app/pages/api/api";
import ImageUpload from "./ImageUpload";
import pdfToText from "react-pdftotext";
import NewResumeLoader from "@/app/ui/newResumeLoader";
import { MultiStepForm } from "./MultiStepForm";
import { useResumeStore } from "@/app/store/ResumeStore";
import { useUserStore } from "@/app/store/UserStore";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";
// import Template13 from "../resume-templates/Template13";

const ImageTemplates = ['Template1', "Template3", 'Template10','Template11','Template13']

export default function Form() {
  const data = useResumeStore((state) => state.resume.data);
  const resumeData = useResumeStore((state) => state.resume);
  const setResumeData = useResumeStore((state) => state.setResumeData);
  const updateBasicAndSectionsData = useResumeStore(
    (state) => state.updateBasicAndSectionsData
  );
  const updateResume = useUserStore((state) => state.updateResume);
  const { sections } = data;
  const [generatingResume, setIsGeneratingResume] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    experience: {
      startDate: "",
      endDate: "",
      companyName: "",
      location: "",
      description: "",
      jobTitle: "",
    },
    skills: "",
  });
  const [steps, setSteps] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChangeProfileSummaryChange = (val) => {
    if (val) {
      setResumeData("sections.summary.content", val);
    }
  };

  const handleEducationChange = (e, i) => {
    const { name, value } = e.target;
    const updatedEducationItems = data.sections.education.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      }
    );
    setResumeData("sections.education.items", updatedEducationItems);
  };

  const handleEducationStartDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = "";
    } else {
      let date = val["$d"];
      const year = date.getFullYear();
      const monthName = date.toLocaleString("en-US", { month: "short" });
      newDate = `${monthName}-${year}`;
    }
    const updatedEducationItems = data.sections.education.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            startDate: newDate,
          };
        }
        return item;
      }
    );
    setResumeData("sections.education.items", updatedEducationItems);
  };

  const handleEducationEndDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = "";
    } else {
      let date = val["$d"];
      const year = date.getFullYear();
      const monthName = date.toLocaleString("en-US", { month: "short" });
      newDate = `${monthName}-${year}`;
    }
    const updatedEducationItems = data.sections.education.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            endDate: newDate,
          };
        }
        return item;
      }
    );
    setResumeData("sections.education.items", updatedEducationItems);
  };

  const handleEducationDescriptionChange = (val, i) => {
    const updatedEducationItems = data.sections.education.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            description: val,
          };
        }
        return item;
      }
    );
    setResumeData("sections.education.items", updatedEducationItems);
  };

  const handleExperienceChange = (e, i) => {
    const { name, value } = e.target;
    const udpatedExperienceItems = data.sections.experience.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      }
    );
    setResumeData("sections.experience.items", udpatedExperienceItems);
  };

  const handleExperienceDescriptionChange = (val, i) => {
    const udpatedExperienceItems = data.sections.experience.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            description: val,
          };
        }
        return item;
      }
    );
    setResumeData("sections.experience.items", udpatedExperienceItems);
  };

  const handleExperienceStartDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = "";
    } else {
      let date = val["$d"];
      const year = date.getFullYear();
      const monthName = date.toLocaleString("en-US", { month: "short" });
      newDate = `${monthName}-${year}`;
    }
    const udpatedExperienceItems = data.sections.experience.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            startDate: newDate,
          };
        }
        return item;
      }
    );
    setResumeData("sections.experience.items", udpatedExperienceItems);
  };

  const handleExperienceEndDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = "";
    } else {
      let date = val["$d"];
      const year = date.getFullYear();
      const monthName = date.toLocaleString("en-US", { month: "short" });
      newDate = `${monthName}-${year}`;
    }
    const udpatedExperienceItems = data.sections.experience.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            endDate: newDate,
          };
        }
        return item;
      }
    );
    setResumeData("sections.experience.items", udpatedExperienceItems);
  };

  const handleAddNewEducation = () => {
    const newEducationItems = [
      ...data.sections.education.items,
      {
        institution: "",
        area: "",
        studyType: "",
        startDate: "",
        endDate: "",
        city: "",
        description: "",
      },
    ];
    setResumeData("sections.education.items", newEducationItems);
  };

  const handleAddNewExperience = () => {
    const udpatedExperienceItems = [
      ...data.sections.experience.items,
      {
        jobtitle: "",
        employer: "",
        startDate: "",
        endDate: "",
        description: "",
        city: "",
      },
    ];
    setResumeData("sections.experience.items", udpatedExperienceItems);
  };

  const handleExperienceHighlightsChange = (i, e) => {
    let val = e.target.value;
    const highlightsArray = val.split("\n");
    const udpatedExperienceItems = data.sections.experience.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            highlights: highlightsArray,
          };
        }
        return item;
      }
    );
    setResumeData("sections.experience.items", udpatedExperienceItems);
  };

  const handleDeleteExperienceSection = (i) => {
    const udpatedExperienceItems = data.sections.experience.items.filter(
      (el, index) => {
        return index !== i;
      }
    );
    setResumeData("sections.experience.items", udpatedExperienceItems);
  };

  const handleDeleteEducationSection = (i) => {
    const updatedEducationItems = data.sections.education.items.filter(
      (el, index) => {
        return index !== i;
      }
    );
    setResumeData("sections.education.items", updatedEducationItems);
  };

  const handleProjectChange = (e, i) => {
    const { name, value } = e.target;
    const updatedProjectItems = data.sections.projects.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      }
    );
    setResumeData("sections.projects.items", updatedProjectItems);
  };

  const handleProjectDescriptionChange = (val, i) => {
    const updatedProjectItems = data.sections.projects.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            description: val,
          };
        }
        return item;
      }
    );
    setResumeData("sections.projects.items", updatedProjectItems);
  };

  const handleDeleteProjectSection = (i) => {
    const updatedProjectItems = data.sections.projects.items.filter(
      (el, index) => {
        return index !== i;
      }
    );
    setResumeData("sections.projects.items", updatedProjectItems);
  };

  const handleAddNewProject = () => {
    const updatedProjectItems = [
      ...data.sections.projects.items,
      {
        title: "",
        subtitle: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ];
    setResumeData("sections.projects.items", updatedProjectItems);
  };

  const handleProjectStartDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = "";
    } else {
      let date = val["$d"];
      const year = date.getFullYear();
      const monthName = date.toLocaleString("en-US", { month: "short" });
      newDate = `${monthName}-${year}`;
    }
    const updatedProjectItems = data.sections.projects.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            startDate: newDate,
          };
        }
        return item;
      }
    );
    setResumeData("sections.projects.items", updatedProjectItems);
  };

  const handleProjectEndDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = "";
    } else {
      let date = val["$d"];
      const year = date.getFullYear();
      const monthName = date.toLocaleString("en-US", { month: "short" });
      newDate = `${monthName}-${year}`;
    }
    const updatedProjectItems = data.sections.projects.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            endDate: newDate,
          };
        }
        return item;
      }
    );
    setResumeData("sections.projects.items", updatedProjectItems);
  };

  const handleTemplateThemeChange = (color) => {
    if (color) {
      setResumeData("metadata.theme.primary", color);
    }
  };

  const handleSkillsLabelChange = (e) => {
    const updatedResumeData = {
      ...data,
      sections: {
        ...data.sections,
        skills: { ...data.sections.skills, name: e.target.value },
      },
    };
    setResumeData(updatedResumeData);
  };

  const handleAddNewSkills = () => {
    const updatedSkills = [
      ...data.sections.skills.items,
      {
        name: "",
        level: "",
      },
    ];
    setResumeData("sections.skills.items", updatedSkills);
  };

  const handleSkillNameChange = (val, i) => {
    const updatedSkills = data.sections.skills.items.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          name: val,
        };
      }
      return item;
    });
    setResumeData("sections.skills.items", updatedSkills);
  };

  const handleDeleteSkills = (i) => {
    const updatedSkills = data.sections.skills.items.filter((el, index) => {
      return index !== i;
    });
    setResumeData("sections.skills.items", updatedSkills);
  };

  const handleSkillLevelChange = (val, i) => {
    const updatedSkills = data.sections.skills.items.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          level: val,
        };
      }
      return item;
    });
    setResumeData("sections.skills.items", updatedSkills);
  };

  const handleGenerateProfileSummary = async () => {
    const data = JSON.stringify(formData);
    const message =
      data + " Generated profile summary using the data appended data";
    setIsLoading(true);
    try {
      const response = await AskBot(message);
      const data = JSON.parse(response[0]?.text?.value.split("\n")[2]);

      if (data) {
        setResumeData("sections.summary.content", data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setFormData({
        jobTitle: "",
        experience: {
          startDate: "",
          endDate: "",
          companyName: "",
          location: "",
          description: "",
          jobTitle: "",
        },
        skills: "",
      });
      setSteps(1);
      handleCloseAIDialog();
    }
  };

  const handleOpenAIDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAIDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const unsubs = useResumeStore.subscribe((state) => {
      console.log(state);
      updateResume(state.resume._id, state.resume);
    });
    return unsubs;
  });

  return (
    <>
      <div className="px-5 py-20 bg-slate-50">
        {generatingResume && (
          <div
            className="fixed w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center top-0 left-0"
            style={{
              zIndex: 9999,
            }}
          >
            <NewResumeLoader />
          </div>
        )}
        <div className="lg:px-10 px-5">
          {ImageTemplates.includes(data.metadata.template) && (
            <div className="w-full ">
              <Label>Avatar</Label>
              <ImageUpload />
            </div>
          )}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-2">
            <div className="space-y-2 my-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                name="name"
                onChange={(e) => setResumeData("basics.name", e.target.value)}
                value={data?.basics?.name}
              />
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="jobtitle">Job Title</Label>
              <Input
                id="jobtitle"
                placeholder="Enter Job Title"
                name="jobtitle"
                type="text"
                onChange={(e) =>
                  setResumeData("basics.jobtitle", e.target.value)
                }
                value={data?.basics?.jobtitle}
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-2">
            <div className="space-y-2 my-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email address"
                type="email"
                name="email"
                onChange={(e) => setResumeData("basics.email", e.target.value)}
                value={data?.basics?.email}
              />
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                name="phone"
                value={data?.basics?.phone}
                onChange={(e) => setResumeData("basics.phone", e.target.value)}
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-2">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Enter Country Name"
                value={data?.basics?.country}
                name="country"
                onChange={(e) =>
                  setResumeData("basics.country", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Enter City Name"
                name="city"
                onChange={(e) => setResumeData("basics.city", e.target.value)}
                value={data?.basics?.city}
              />
            </div>
          </div>
        </div>

        {/* profile section */}
        <div className="py-5 my-5 lg:px-10 px-5">
          <div className="space-y-2">
            <div className=" flex justify-between items-center">
              <div className=" w-[40%] group">
                <Label
                  htmlFor="Profile"
                  className="text-2xl group-hover:hidden"
                >
                  {data?.sections?.summary?.name}
                </Label>
                <CustomLabelInput
                  className="hidden group-hover:block"
                  value={data?.sections?.summary?.name}
                  onChange={(e) =>
                    setResumeData("sections.summary.name", e.target.value)
                  }
                />
              </div>
              <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className=" bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-700 border-none"
                    onClick={handleOpenAIDialog}
                  >
                    Generate with AI
                    <FaCrown className=" text-yellow-500 ml-2" />
                  </Button>
                </DialogTrigger>
                <MultiStepForm
                  handleCloseAIDialog={handleCloseAIDialog}
                  formData={formData}
                  setFormData={setFormData}
                  steps={steps}
                  setSteps={setSteps}
                  isLoading={isLoading}
                  handleGenerateProfileSummary={handleGenerateProfileSummary}
                />
              </Dialog>
            </div>
            <div>
              <p className=" text-gray-400 text-sm">
                A short summary of your professional experiences, skills,
                education, and achievements to interest the readers in your CV
                will appear at the beginning of your CV. You can write the
                summary on your own or Use the Generate with AI option to get
                the summary written by the Genie to create a better impression!
              </p>
            </div>
            <div className="no-scrollbar">
              <ReactQuill
                className="no-scrollbar"
                style={{
                  height: "200px",
                  position: "relative",
                }}
                value={data?.sections?.summary.content}
                onChange={handleChangeProfileSummaryChange}
              />
            </div>
          </div>
        </div>

        {/* education section */}
        <div className="py-5 my-20">
          <div className="space-y-2 lg:px-10 px-5">
            <div className="flex justify-between">
              <div className=" w-[40%] group">
                <Label className="text-2xl group-hover:hidden">
                  {sections?.education?.name}
                </Label>
                <CustomLabelInput
                  className="hidden group-hover:block"
                  value={data?.sections?.education?.name}
                  onChange={(e) =>
                    setResumeData("sections.education.name", e.target.value)
                  }
                />
              </div>
              <div className="flex items-center justify-center text-gray-400 text-lg">
                {sections?.education?.visible ? (
                  <GoEyeClosed
                    className=" cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.education.visible", false)
                    }
                  />
                ) : (
                  <GoEye
                    className="cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.education.visible", true)
                    }
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Input the details of your educational experiences, learnings,
                institutions joined, and much more that you feel are relevant to
                your job profile.
              </p>
            </div>
          </div>
          <div className=" my-5 h-auto ">
            {sections?.education?.items.length > 0 &&
              sections?.education?.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-start justify-center group my-5 relative"
                  >
                    <GoGrabber
                      className="mt-3 text-3xl
                      font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out"
                    />
                    <Accordion
                      type="single"
                      collapsible
                      className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                      defaultValue={`item-${index}`}
                      defaultChecked
                    >
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className="group-hover:text-blue-900">
                          <div className="px-3 flex flex-col items-start">
                            {item?.degree || item?.institute ? (
                              <p>
                                <span>{item?.degree}</span>
                                <span>
                                  {item?.degree && item?.institute && " at "}
                                </span>
                                <span>{item?.institute}</span>
                              </p>
                            ) : (
                              <p>(Not Specified)</p>
                            )}
                            <p className="text-gray-500 text-sm mt-1">
                              {item?.startDate && `${item.startDate} - `}
                              {item?.endDate}
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="w-full pt-5 px-5 pb-10">
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2 py-5">
                              <div className="space-y-2">
                                <Label htmlFor="institute">Institute</Label>
                                <Input
                                  id="institute"
                                  placeholder="Institute Name"
                                  value={item.institute}
                                  onChange={(e) =>
                                    handleEducationChange(e, index)
                                  }
                                  name="institute"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="degree">Degree</Label>
                                <Input
                                  id="degree"
                                  placeholder="Degree Name"
                                  type="text"
                                  value={item.degree}
                                  name="degree"
                                  onChange={(e) =>
                                    handleEducationChange(e, index)
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2 py-5">
                              <div className="flex flex-col md:flex-row ">
                                <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  pr-2">
                                  <Label htmlFor="start_date" className="block">
                                    Start Date
                                  </Label>
                                  <div className="w-full">
                                    <DatePicker
                                      picker="month"
                                      onChange={(e) =>
                                        handleEducationStartDateChange(e, index)
                                      }
                                      name="startDate"
                                      className="w-full"
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  lg:pl-2 pl-0 lg:py-0 py-5">
                                  <Label for="end_date" className="block">
                                    End Date
                                  </Label>
                                  <div className="w-full">
                                    <DatePicker
                                      picker="month"
                                      onChange={(e) =>
                                        handleEducationEndDateChange(e, index)
                                      }
                                      name="endDate"
                                      className="w-full"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                  placeholder="Enter city name"
                                  type="text"
                                  value={item.city}
                                  name="city"
                                  onChange={(e) =>
                                    handleEducationChange(e, index)
                                  }
                                />
                              </div>
                            </div>
                            <div className="space-y-2 my-5 px-2">
                              <Label htmlFor="city">Description</Label>
                              <ReactQuill
                                id="Profile"
                                className="no-scrollbar"
                                style={{
                                  height: "200px",
                                }}
                                placeholder="eg. Graduated from the University "
                                value={item.description}
                                onChange={(e) =>
                                  handleEducationDescriptionChange(e, index)
                                }
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <MdDeleteOutline
                      className="mt-3 text-2xl
                      font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out"
                      onClick={() => handleDeleteEducationSection(index)}
                    />
                  </div>
                );
              })}
          </div>
          <div className="px-10 ">
            <Button
              className="w-full bg-white text-blue-900 hover:bg-blue-100 h-8 flex justify-start rounded-none item-center"
              onClick={handleAddNewEducation}
            >
              <IoIosAddCircleOutline className="text-xl mr-2" />
              Add one more {`${data?.sections?.education?.name}`.toLowerCase()}
            </Button>
          </div>
        </div>

        {/* experience section */}
        <div className="py-5 mt-0 mb-10">
          <div className="space-y-2 px-10">
            <div className="flex justify-between">
              <div className=" w-[40%] group">
                <Label className="text-2xl group-hover:hidden">
                  {sections?.experience?.name}
                </Label>
                <CustomLabelInput
                  className="hidden group-hover:block"
                  value={data?.sections?.experience?.name}
                  onChange={(e) =>
                    setResumeData("sections.experience.name", e.target.value)
                  }
                />
              </div>
              <div className="flex items-center justify-center text-gray-400 text-lg">
                {sections?.experience?.visible ? (
                  <GoEyeClosed
                    className=" cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.experience.visible", false)
                    }
                  />
                ) : (
                  <GoEye
                    className="cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.experience.visible", true)
                    }
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Enter your experiences and professional endeavours and add
                specific details to add to the value of your profile by
                reflecting the necessary knowledge base.
              </p>
            </div>
          </div>

          <div className=" my-5 h-auto">
            {sections?.experience?.items.length > 0 &&
              sections?.experience?.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-start justify-between group my-5 "
                  >
                    <GoGrabber
                      className="mt-3 text-3xl
               font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out"
                    />
                    <Accordion
                      type="single"
                      collapsible
                      className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                      defaultValue={`item-${index}`}
                    >
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger>
                          <div className=" px-3 flex flex-col items-start">
                            {item?.jobtitle || item?.employer ? (
                              <p>
                                {item?.jobtitle &&
                                  `${item?.jobtitle}${
                                    item?.employer && ` at `
                                  } `}
                                {item?.employer}
                              </p>
                            ) : (
                              <p>(Not Specified)</p>
                            )}
                            <p className="text-gray-500 text-sm">
                              {item?.startDate && `${item.startDate} - `}
                              {item?.endDate}
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="w-full pt-5 px-5 pb-10">
                            <div className="grid lg:grid-cols-2 grid-cols-1  gap-4 px-2 py-5">
                              <div className="space-y-2">
                                <Label htmlFor="institute">Job Title</Label>
                                <Input
                                  id="institute"
                                  placeholder="Enter Job title"
                                  value={item.jobtitle}
                                  name="jobtitle"
                                  onChange={(e) =>
                                    handleExperienceChange(e, index)
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="degree">Employer</Label>
                                <Input
                                  id="degree"
                                  placeholder="Employer name"
                                  type="text"
                                  value={item.employer}
                                  name="employer"
                                  onChange={(e) =>
                                    handleExperienceChange(e, index)
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2">
                              <div className="flex flex-col md:flex-row ">
                                <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  pr-2 lg:py-0 py-5">
                                  <Label for="start_date" className="block">
                                    Start Date
                                  </Label>
                                  <div className="w-full">
                                    <DatePicker
                                      picker="month"
                                      onChange={(e) =>
                                        handleExperienceStartDateChange(
                                          e,
                                          index
                                        )
                                      }
                                      className="w-full"
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  lg:pl-2 pl-0">
                                  <Label for="end_date" className="block">
                                    End Date
                                  </Label>
                                  <div className="w-full">
                                    <DatePicker
                                      picker="month"
                                      onChange={(e) =>
                                        handleExperienceEndDateChange(e, index)
                                      }
                                      className="w-full"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                  id="city"
                                  placeholder="Enter city name"
                                  type="text"
                                  value={item.city}
                                  name="city"
                                  onChange={(e) =>
                                    handleExperienceChange(e, index)
                                  }
                                />
                              </div>
                            </div>
                            <div className="space-y-2 mt-5 mb-12 px-2">
                              <Label>Description</Label>
                              <ReactQuill
                                id="Profile"
                                theme="snow"
                                className="no-scrollbar"
                                style={{
                                  height: "150px",
                                }}
                                placeholder="e.g.  Created and implemented lesson plans based on child-led interests and curiosities."
                                value={item.description}
                                onChange={(e) =>
                                  handleExperienceDescriptionChange(e, index)
                                }
                              />
                            </div>
                            <div className="space-y-2  mt-9 px-2">
                              <Label>Highlights</Label>
                              <Textarea
                                value={item?.highlights?.join("\n") || []}
                                className="text-10px h-[150px] no-scrollbar"
                                onChange={(e) =>
                                  handleExperienceHighlightsChange(index, e)
                                }
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <MdDeleteOutline
                      className="mt-3 text-2xl
               font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out"
                      onClick={() => handleDeleteExperienceSection(index)}
                    />
                  </div>
                );
              })}
          </div>
          <div className="px-10 ">
            <Button
              className="w-full bg-white text-blue-900 hover:bg-blue-100 h-8 flex justify-start rounded-none item-center"
              onClick={handleAddNewExperience}
            >
              <IoIosAddCircleOutline className="text-xl mr-2" />
              Add one more {`${data?.sections?.experience?.name}`.toLowerCase()}
            </Button>
          </div>
        </div>

        {/* Projects */}
        <div className="py-5 mt-0 mb-10">
          <div className="space-y-2 px-10">
            <div className="flex justify-between">
              <div className=" w-[40%] group">
                <Label className="text-2xl group-hover:hidden">
                  {sections?.projects?.name}
                </Label>
                <CustomLabelInput
                  className="hidden group-hover:block"
                  value={data?.sections?.projects?.name}
                  onChange={(e) =>
                    setResumeData("sections.projects.name", e.target.value)
                  }
                />
              </div>
              <div className="flex items-center justify-center text-gray-400 text-lg">
                {sections?.projects?.visible ? (
                  <GoEyeClosed
                    className=" cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.projects.visible", false)
                    }
                  />
                ) : (
                  <GoEye
                    className="cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.projects.visible", true)
                    }
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                If you have pursued any independent or relative projects
                relevant to your job profile, mention them to create an
                impression of thorough practical experience.{" "}
              </p>
            </div>
          </div>

          <div className=" my-5 h-auto">
            {sections?.projects?.items.length > 0 &&
              sections?.projects?.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-start justify-between group my-5 "
                  >
                    <GoGrabber
                      className="mt-3 text-3xl
                      font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out"
                    />
                    <Accordion
                      type="single"
                      collapsible
                      className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                      defaultValue={`item-${index}`}
                    >
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger>
                          <div className=" px-3 flex flex-col items-start">
                            <p>
                              {item?.title
                                ? `${item?.title}`
                                : "(Not Specified  )"}
                            </p>
                            <p>{item?.subtitle}</p>
                            <p className="text-gray-500 text-sm">
                              {item?.startDate && `${item.startDate} - `}
                              {item?.endDate}
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="w-full pt-5 px-5 pb-10">
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2 py-5">
                              <div className="space-y-2">
                                <Label htmlFor="institute">Title</Label>
                                <Input
                                  id="institute"
                                  placeholder="Enter Job title"
                                  value={item.title}
                                  name="title"
                                  onChange={(e) =>
                                    handleProjectChange(e, index)
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="degree">Subtitle</Label>
                                <Input
                                  id="degree"
                                  placeholder="Enter project subtitle"
                                  type="text"
                                  value={item.subtitle}
                                  name="subtitle"
                                  onChange={(e) =>
                                    handleProjectChange(e, index)
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2">
                              <div className="flex flex-col md:flex-row ">
                                <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  pr-2">
                                  <Label htmlFor="start_date" className="block">
                                    Start Date
                                  </Label>
                                  <div className="w-full">
                                    <DatePicker
                                      picker="month"
                                      onChange={(e) =>
                                        handleProjectStartDateChange(e, index)
                                      }
                                      className="w-full"
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  lg:pl-2 pl-0 lg:py-0 py-5">
                                  <Label for="end_date" className="block">
                                    End Date
                                  </Label>
                                  <div className="w-full">
                                    <DatePicker
                                      picker="month"
                                      onChange={(e) =>
                                        handleProjectEndDateChange(e, index)
                                      }
                                      className="w-full"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2 my-5 px-2">
                              <Label htmlFor="city">Description</Label>
                              <ReactQuill
                                id="Profile"
                                theme="snow"
                                className="no-scrollbar"
                                style={{
                                  height: "200px",
                                }}
                                placeholder="e.g.Created and implemented lesson plans based on child-led interests and curiosities."
                                value={item.description}
                                onChange={(e) =>
                                  handleProjectDescriptionChange(e, index)
                                }
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <MdDeleteOutline
                      className="mt-3 text-2xl
                      font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out"
                      onClick={() => handleDeleteProjectSection(index)}
                    />
                  </div>
                );
              })}
          </div>
          <div className="px-10 ">
            <Button
              className="w-full bg-white text-blue-900 hover:bg-blue-100 h-8 flex justify-start rounded-none item-center"
              onClick={handleAddNewProject}
            >
              <IoIosAddCircleOutline className="text-xl mr-2" />
              Add one more {`${data?.sections?.projects?.name}`.toLowerCase()}
            </Button>
          </div>
        </div>

        {/* Skills */}
        <div className="py-5 mt-0 mb-10">
          <div className="space-y-2 px-10">
            <div className="flex justify-between">
              <div className=" w-[40%] group">
                <Label className="text-2xl group-hover:hidden">
                  {sections?.skills?.name}
                </Label>
                <CustomLabelInput
                  className="hidden group-hover:block"
                  value={sections?.skills?.name}
                  onChange={handleSkillsLabelChange}
                />
              </div>
              <div className="flex items-center justify-center text-gray-400 text-lg">
                {sections?.skills?.visible ? (
                  <GoEyeClosed
                    className=" cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.skills.visible", false)
                    }
                  />
                ) : (
                  <GoEye
                    className="cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.skills.visible", true)
                    }
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Choose 5 important skills that show you fit the position. Make
                sure they match the key skills mentioned in the job listing
                (especially when applying via an online system).
              </p>
            </div>
          </div>
          <div>
            {sections.skills.items.length > 0 &&
              sections.skills.items.map((skills, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-start justify-center group my-5 relative"
                  >
                    <GoGrabber
                      className=" text-3xl
                       font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out absolute top-2 left-1"
                    />
                    <Accordion
                      type="single"
                      collapsible
                      className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                      defaultValue={`item-${index}`}
                      defaultChecked
                    >
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className="group-hover:text-blue-900">
                          <div className=" px-3 flex flex-col items-start ">
                            <p>{skills.name || "(Not Specified)"}</p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className=" grid-cols-2 gap-2 flex px-2">
                            <div className=" w-1/2">
                              <Label htmlFor={`skills-${index}`}>Name</Label>
                              <Input
                                value={skills?.name}
                                onChange={(e) =>
                                  handleSkillNameChange(e.target.value, index)
                                }
                              />
                            </div>
                            <div className=" w-1/2 flex flex-col items-start justify-center">
                              <Label
                                htmlFor={`skills-${index}`}
                                className="mb-1"
                              >
                                Level
                              </Label>
                              <SkillsSelect
                                className="w-full"
                                onSelectChange={handleSkillLevelChange}
                                index={index}
                                value={skills?.level}
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <MdDeleteOutline
                      className="absolute top-2 right-1 text-2xl
                        font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out"
                      onClick={() => handleDeleteSkills(index)}
                    />
                  </div>
                );
              })}
          </div>
          <div className="mt-5 px-10">
            <div>
              <Button
                className="w-full bg-white text-blue-900 hover:bg-blue-100 h-8 flex justify-start rounded-none item-center"
                onClick={handleAddNewSkills}
              >
                <IoIosAddCircleOutline className="text-xl mr-2" />
                Add Skills
              </Button>
            </div>
          </div>
        </div>

        {/* theme */}
        <div className="lg:px-10 px-5 rounded-md ">
          <div className="my-5 flex justify-between w-full items-center">
            <Label className="text-2xl">Theme</Label>
            <div className="flex rounded-md items-center space-x-4 my-2">
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    className="rounded-full cursor-pointer ring-primary ring-offset-2 ring-offset-background transition-shadow hover:ring-1"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: data.metadata.theme.primary,
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent className="rounded-lg border-none bg-transparent p-0">
                  <HexColorPicker
                    color={data.metadata.theme.primary}
                    onChange={handleTemplateThemeChange}
                  />
                </PopoverContent>
              </Popover>
              <Input
                id="theme.primary"
                value={data.metadata.theme.primary}
                className="pl-2 w-36 rounded-md"
                onChange={(event) => {
                  setResumeData("metadata.theme.primary", event.target.value);
                }}
              />
            </div>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 bg-white"
          >
            <AccordionItem value="color">
              <AccordionTrigger className="group-hover:text-blue-900">
                <div className="grid grid-cols-6 flex-wrap justify-items-center gap-y-4 @xs/right:grid-cols-9 w-full">
                  {AccordianColor.map((color, index) => (
                    <div
                      key={color}
                      onClick={() =>
                        setResumeData("metadata.theme.primary", color)
                      }
                      className={cn(
                        "flex size-8 rounded-full cursor-pointer items-center justify-center ring-primary ring-offset-4 ring-offset-background transition-shadow hover:ring-1",
                        data?.metadata?.theme?.primary === color && "ring-1"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-2 grid grid-cols-6 flex-wrap justify-items-center gap-y-4 @xs/right:grid-cols-9  pr-4 py-2">
                  {colors.map((color, index) => (
                    <div
                      key={color}
                      onClick={() =>
                        setResumeData("metadata.theme.primary", color)
                      }
                      className={cn(
                        "flex size-8 rounded-full cursor-pointer items-center justify-center ring-primary ring-offset-4 ring-offset-background transition-shadow hover:ring-1",
                        data?.metadata?.theme?.primary === color && "ring-1"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div></div>
        </div>
      </div>
    </>
  );
}
