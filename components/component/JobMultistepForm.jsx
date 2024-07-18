import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { Checkbox } from "../ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { DatePicker } from "antd";
import { Textarea } from "../ui/textarea";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { Input } from "../ui/input";
import Lottie from "lottie-react";
import animation from "@/public/animations/JobCVLoader.json";
import { generateResumeOnFeeback } from "@/app/api/api";
import { GetTokens } from "@/app/actions";
import { useUserStore } from "@/app/store/UserStore";
import { useResumeStore } from "@/app/store/ResumeStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

function JobMultistepForm({
  handleCloseMultistepForm,
  steps,
  setSteps,
  formData,
  setFormData,
  jobRole,
  type,
}) {
  const replaceResumeData = useResumeStore((state) => state.replaceResumeData);
  const router = useRouter();
  const updateUserData = useUserStore((state) => state.updateUserData);
  const handleChangeStep1 = () => {
    if (
      !formData.fullname.trim() ||
      !formData.email.trim() ||
      !formData.jobTitle.trim() ||
      !formData.country.trim() ||
      !formData.city.trim()
    ) {
      return toast.error("Please fill all details");
    }
    setSteps((prevState) => prevState + 1);
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFreshercheck = () => {
    setFormData({ ...formData, isFresher: !formData.isFresher });
  };

  const handleExperienceChange = (e, i) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      experience: formData.experience.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      }),
    };
    setFormData(updatedFormData);
  };

  const handleDeleteExperience = (i) => {
    const updatedFromData = {
      ...formData,
      experience: formData.experience.filter((item, index) => index !== i),
    };
    setFormData(updatedFromData);
  };

  const handleAddExperience = () => {
    const updatedFromData = {
      ...formData,
      experience: [
        ...formData.experience,
        {
          jobTitle: "",
          employer: "",
          startDate: "",
          endDate: "",
          highlights: [],
        },
      ],
    };
    setFormData(updatedFromData);
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
    const updatedFormData = {
      ...formData,
      experience: formData.experience.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            startDate: newDate,
          };
        }
        return item;
      }),
    };
    setFormData(updatedFormData);
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
    const updatedFormData = {
      ...formData,
      experience: formData.experience.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            endDate: newDate,
          };
        }
        return item;
      }),
    };
    setFormData(updatedFormData);
  };

  const handleExperienceHighlightsChange = (i, val) => {
    let highlights = val.split("\n");
    const updatedFormData = {
      ...formData,
      experience: formData.experience.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            highlights,
          };
        }
        return item;
      }),
    };
    setFormData(updatedFormData);
  };

  const handlePrevStep = () => {
    setSteps((prevState) => prevState - 1);
  };

  const handleChangeStep2 = () => {
    if (!formData.isFresher && formData.experience.length === 0) {
      return toast.error("Please add experience");
    }

    if (formData.isFresher) {
      return setSteps((prevState) => prevState + 1);
    }

    setSteps((prevState) => prevState + 1);
  };

  const handleChangeStep3 = () => {
    setSteps((prevState) => prevState + 1);
  };

  const handleAddEducation = () => {
    const updatedFromData = {
      ...formData,
      education: [
        ...formData.education,
        {
          institute: "",
          degree: "",
          startDate: "",
          endDate: "",
        },
      ],
    };
    setFormData(updatedFromData);
  };

  const handleEducationChange = (e, i) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      education: formData.education.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      }),
    };
    setFormData(updatedFormData);
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
    const updatedFormData = {
      ...formData,
      education: formData.education.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            startDate: newDate,
          };
        }
        return item;
      }),
    };
    setFormData(updatedFormData);
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
    const updatedFormData = {
      ...formData,
      education: formData.education.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            endDate: newDate,
          };
        }
        return item;
      }),
    };
    setFormData(updatedFormData);
  };

  const handleDeleteEducation = (i) => {
    const updatedFromData = {
      ...formData,
      education: formData.education.filter((item, index) => index !== i),
    };
    setFormData(updatedFromData);
  };

  const handleAddProject = () => {
    const updatedFormData = {
      ...formData,
      projects: [
        ...formData.projects,
        {
          name: "",
          startDate: "",
          endDate: "",
          highlights: [],
        },
      ],
    };
    setFormData(updatedFormData);
  };

  const handleProjectnameChange = (val, i) => {
    let value = val;
    if (!value) return;
    const updatedFormData = {
      ...formData,
      projects: formData.projects.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            name: value,
          };
        }
        return item;
      }),
    };
    setFormData(updatedFormData);
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
    const updatedFormData = {
      ...formData,
      projects: formData.projects.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            startDate: newDate,
          };
        }
        return item;
      }),
    };
    setFormData(updatedFormData);
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
    const updatedFormData = {
      ...formData,
      projects: formData.projects.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            endDate: newDate,
          };
        }
        return item;
      }),
    };
    setFormData(updatedFormData);
  };

  const handleProjectHighlightsChange = (val, i) => {
    let highlights = val.split("\n");
    const updatedFormData = {
      ...formData,
      projects: formData.projects.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            highlights,
          };
        }
        return item;
      }),
    };
    setFormData(updatedFormData);
  };

  const handleDeleteProjects = (i) => {
    const updatedFormData = {
      ...formData,
      projects: formData.projects.filter((item, index) => index !== i),
    };
    setFormData(updatedFormData);
  };

  const handleChangeStep4 = () => {
    setSteps((prevState) => prevState + 1);
  };

  const handleSkillsChange = (e) => {
    let skills = e.target.value;
    skills = skills.split("\n");
    const updatedFromData = { ...formData, skills };
    setFormData(updatedFromData);
  };

  const fetchBetterResume = async (message) => {
    const { accessToken } = await GetTokens();
    try {
      const response = await axios.post(
        "/api/generateMultiStepFeedback",
        { message, type },
        {
          headers: {
            Authorization: "Bearer " + accessToken.value,
          },
        }
      );
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      if (
        error.response.status === 400 &&
        (error.response.data.error === "Insufficient JobCV tokens" ||
          error.response.data.error === "Subscription is inactive or expired" ||
          error.response.data.error === "Insufficient optimizer tokens")
      ) {
        router.push("/pricing");
      }
    }
  };

  const handleSubmitForm = async () => {
    setSteps(6);
    const message =
      JSON.stringify(formData) + `generate resume for this ${jobRole}`;
    try {
      const response = await fetchBetterResume(message);
      if (response?.data && response?.userdata) {
        replaceResumeData(response?.data);
        updateUserData(response?.userdata);
        return router.push("/resume-builder");
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleCloseMultistepForm();
      setSteps(1);
    }
  };

  if (steps === 1) {
    return (
      <DialogContent
        className="max-w-[70dvw] h-[80dvh] p-0 bg-blue-900"
        onClick={handleCloseMultistepForm}
        showCloseButton
      >
        <div className="flex justify-around overflow-hidden">
          <div className="lg:w-1/3 h-full">
            <Image
              src="/illustration-manager-choosing-new-worker.png"
              alt="choice-worker-concept-illustrated"
              className="absolute bottom-5"
              width={350}
              height={350}
            />
          </div>
          <div className=" w-2/3 py-5 h-full overflow-hidden">
            <div className="shadow-xl p-5 w-full h-full rounded-2xl bg-white">
              <div className="my-2">
                <h2 className="font-bold text-2xl text-blue-950 mb-5 text-center">
                  Design a winning <span className="text-blue-600">CV</span> in
                  just minutes with <br />{" "}
                  <span className="text-blue-600 text-3xl mt-5">
                    &#x201B; Genies Career Hub &#x2019;
                  </span>
                </h2>
              </div>
              <div className="flex gap-5">
                <div className="lg:w-1/2 w-full my-2">
                  <Label>Full Name</Label>
                  <Input
                    className="my-1"
                    placeholder="Enter full name"
                    value={formData.fullname}
                    onChange={handleFormDataChange}
                    name="fullname"
                  />
                </div>
                <div className="lg:w-1/2 w-full my-2">
                  <Label>Email</Label>
                  <Input
                    className="my-1"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleFormDataChange}
                    name="email"
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="lg:w-1/2 w-full">
                  <Label>City</Label>
                  <Input
                    className="my-1"
                    placeholder="Enter city name"
                    value={formData.city}
                    onChange={handleFormDataChange}
                    name="city"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <Label>Country</Label>
                  <Input
                    className="my-1"
                    placeholder="Enter Country name"
                    value={formData.country}
                    onChange={handleFormDataChange}
                    name="country"
                  />
                </div>
              </div>
              <div>
                <Label>Job Title</Label>
                <Input
                  className="my-1"
                  placeholder="Enter Job Title"
                  value={formData.jobtitle}
                  onChange={handleFormDataChange}
                  name="jobTitle"
                />
              </div>
              
              <div className="py-5 flex justify-end">
                <Button onClick={handleChangeStep1} className="text-sm px-5 py-1">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    );
  }

  if (steps === 2) {
    return (
      <DialogContent
        className="max-w-[70dvw] no-scrollbar h-[80dvh] p-0 bg-blue-900"
        onClick={handleCloseMultistepForm}
        showCloseButton
      >
        <div className="flex justify-around overflow-hidden">
          <div className="w-1/3 h-full">
            <Image
              src="/illustration-manager-choosing-new-worker.png"
              alt="choice-worker-concept-illustrated"
              className="absolute bottom-5"
              width={350}
              height={350}
            />
          </div>
          <div className=" w-2/3 py-5 h-full overflow-hidden">
            <div className=" shadow-xl px-10 py-5 w-full h-full max-h-full rounded-2xl overflow-hidden  bg-white">
              <div className="flex items-center">
                <Checkbox
                  checked={formData?.isFresher}
                  onCheckedChange={handleFreshercheck}
                  id="checkbox"
                />
                <Label htmlFor="checkbox" className="text-lg ml-4">
                  Are you a fresher
                </Label>
              </div>

              {!formData?.isFresher && (
                <>
                  <div className="overflow-y-scroll no-scrollbar h-[80%]">
                    <div className="my-2">
                      <hr />
                    </div>
                    <div className="max-h-[85%]">
                      <div className="flex justify-between items-center my-4 px-1">
                        <p className="text-blue-900">Add Experience</p>
                        {/* <IoIosAddCircle className='text-2xl text-blue-900 cursor-pointer' onClick={handleAddExperience} /> */}
                        <button
                          className="flex text-sm px-3 py-2 text-white rounded-md bg-blue-950 cursor-pointer hover:bg-green-500"
                          onClick={handleAddExperience}
                        >
                          Add <IoIosAddCircle className="text-xl ml-2" />
                        </button>
                      </div>
                      {formData.experience.length > 0 &&
                        formData.experience.map((item, index) => {
                          return (
                            <div
                              className=" flex justify-between items-center relative my-2"
                              key={index}
                            >
                              <Accordion
                                type="single"
                                collapsible
                                className="w-[92%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
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
                                        {item?.startDate &&
                                          `${item.startDate} - `}
                                        {item?.endDate}
                                      </p>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="w-full">
                                      <div className="grid lg:grid-cols-2 grid-cols-1  gap-4 px-2 py-5">
                                        <div className="space-y-1">
                                          <Label htmlFor="institute">
                                            Job Title
                                          </Label>
                                          <Input
                                            className="my-1"
                                            id="institute"
                                            placeholder="Enter Job title"
                                            value={item.jobtitle}
                                            name="jobtitle"
                                            onChange={(e) =>
                                              handleExperienceChange(e, index)
                                            }
                                          />
                                        </div>
                                        <div className="space-y-1">
                                          <Label htmlFor="degree">
                                            Employer
                                          </Label>
                                          <Input
                                            className="my-1"
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
                                          <div className="flex flex-col w-full md:w-1/2 space-y-1 justify-around  pr-2 lg:py-0 py-1">
                                            <Label
                                              for="start_date"
                                              className="block"
                                            >
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
                                          <div className="flex flex-col w-full md:w-1/2 space-y-1 justify-around  lg:pl-2 pl-0">
                                            <Label
                                              for="end_date"
                                              className="block"
                                            >
                                              End Date
                                            </Label>
                                            <div className="w-full">
                                              <DatePicker
                                                picker="month"
                                                onChange={(e) =>
                                                  handleExperienceEndDateChange(
                                                    e,
                                                    index
                                                  )
                                                }
                                                className="w-full"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="space-y-2">
                                          <Label htmlFor="city">City</Label>
                                          <Input
                                            className="my-1"
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
                                      <div className="space-y-2  mt-2 px-2">
                                        <Label>Highlights</Label>
                                        <Textarea
                                          value={
                                            item?.highlights?.join("\n") || []
                                          }
                                          className="text-10px h-[150px] no-scrollbar"
                                          onChange={(e) =>
                                            handleExperienceHighlightsChange(
                                              index,
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                              <MdDeleteOutline
                                className="absolute z-[200] right-0 top-6 cursor-pointer text-2xl text-red-600"
                                onClick={() => handleDeleteExperience(index)}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </>
              )}
              <DialogFooter>
                <div className="w-full mt-5 justify-between items-center flex">
                  <Button onClick={handlePrevStep}>Back</Button>
                  <Button
                    onClick={handleChangeStep2}
                    disabled={
                      !formData.isFresher && formData.experience.length === 0
                    }
                  >
                    Next
                  </Button>
                </div>
              </DialogFooter>
            </div>
          </div>
        </div>
      </DialogContent>
    );
  }

  if (steps === 3) {
    return (
      <DialogContent
        className="max-w-[70dvw] no-scrollbar h-[80dvh] p-0 bg-blue-900"
        onClick={handleCloseMultistepForm}
        showCloseButton
      >
        <div className="flex justify-around overflow-hidden">
          <div className="w-1/3 h-full ">
            <Image
              src="/illustration-manager-choosing-new-worker.png"
              alt="choice-worker-concept-illustrated"
              className="absolute bottom-5"
              width={350}
              height={350}
            />
          </div>
          <div className=" w-2/3 py-5 h-full overflow-hidden">
            <div className="shadow-xl px-10 py-5 w-full h-full max-h-full rounded-2xl overflow-hidden bg-white">
              <div className=" max-h-[85%]  overflow-scroll no-scrollbar">
                <div className="flex justify-between items-center my-4 px-1">
                  <p className="text-blue-900">Add Education</p>
                  <button
                    className="flex text-sm px-3 py-2 text-white rounded-md bg-blue-950 cursor-pointer hover:bg-green-500"
                    onClick={handleAddEducation}
                  >
                    Add <IoIosAddCircle className="text-xl ml-2" />
                  </button>
                  {/* <IoIosAddCircle className='text-2xl text-blue-900 cursor-pointer' onClick={handleAddEducation} /> */}
                </div>
                <div>
                  {formData.education.length > 0 &&
                    formData.education.map((item, index) => {
                      return (
                        <div
                          className=" flex justify-between items-center relative my-2"
                          key={index}
                        >
                          <Accordion
                            type="single"
                            collapsible
                            className="w-[95%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                          >
                            <AccordionItem value={`item-${index}`}>
                              <AccordionTrigger>
                                <div className=" px-3 flex flex-col items-start">
                                  {item?.degree || item?.institute ? (
                                    <p>
                                      {item?.degree &&
                                        `${item?.degree}${
                                          item?.institute && ` at `
                                        } `}
                                      {item?.institute}
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
                                      <Label htmlFor="institute">Degree</Label>
                                      <Input
                                        className="my-1"
                                        id="institute"
                                        placeholder="Enter Job title"
                                        value={item.degree}
                                        name="degree"
                                        onChange={(e) =>
                                          handleEducationChange(e, index)
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="degree">institute</Label>
                                      <Input
                                        className="my-1"
                                        id="degree"
                                        placeholder="Institute name"
                                        type="text"
                                        value={item.institute}
                                        name="institute"
                                        onChange={(e) =>
                                          handleEducationChange(e, index)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="flex px-2">
                                    <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  pr-2 lg:py-0 py-5">
                                      <Label for="start_date" className="block">
                                        Start Date
                                      </Label>
                                      <div className="w-full">
                                        <DatePicker
                                          picker="month"
                                          onChange={(e) =>
                                            handleEducationStartDateChange(
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
                                            handleEducationEndDateChange(
                                              e,
                                              index
                                            )
                                          }
                                          className="w-full"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                          <MdDeleteOutline
                            className="absolute right-0 top-6 cursor-pointer text-2xl text-red-600"
                            onClick={() => handleDeleteEducation(index)}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="w-full mt-5 justify-between items-center flex">
                <Button onClick={handlePrevStep}>Back</Button>
                <Button
                  onClick={handleChangeStep3}
                  disabled={formData.education.length === 0}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    );
  }

  if (steps === 4) {
    return (
      <DialogContent
        className="max-w-[70dvw] p-0 no-scrollbar h-[80dvh] bg-blue-900"
        onClick={handleCloseMultistepForm}
        showCloseButton
      >
        <div className="flex justify-around overflow-hidden">
          <div className="w-1/3 h-full ">
            <Image
              src="/illustration-manager-choosing-new-worker.png"
              alt="choice-worker-concept-illustrated"
              className="absolute bottom-5"
              width={350}
              height={350}
            />
          </div>
          <div className=" w-2/3 py-5 h-full overflow-hidden">
            <div className="shadow-xl px-10 py-5 w-full h-full max-h-full rounded-2xl overflow-hidden bg-white">
              <div className="max-h-[85%]  overflow-scroll no-scrollbar">
                <div className="flex justify-between items-center my-4 px-1">
                  <p className="text-blue-900">Add Projects</p>
                  <button
                    className="flex text-sm px-3 py-2 text-white rounded-md bg-blue-950 cursor-pointer hover:bg-green-500"
                    onClick={handleAddProject}
                  >
                    Add <IoIosAddCircle className="text-xl ml-2" />
                  </button>
                  {/* <IoIosAddCircle className='text-2xl text-blue-900 cursor-pointer' onClick={handleAddProject} /> */}
                </div>
                <div className=" max-h-[85%] overflow-scroll no-scrollbar">
                  {formData.projects.length > 0 &&
                    formData.projects.map((item, index) => {
                      return (
                        <div
                          className=" flex justify-between items-center relative my-2"
                          key={index}
                        >
                          <Accordion
                            type="single"
                            collapsible
                            className="w-[95%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                          >
                            <AccordionItem value={`item-${index}`}>
                              <AccordionTrigger>
                                <div className=" px-3 flex flex-col items-start">
                                  {item?.name ? (
                                    <p>{item?.name}</p>
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
                                  <div className="my-3 px-2">
                                    <Label htmlFor="institute">
                                      Project name
                                    </Label>
                                    <Input
                                      className="my-1"
                                      id="institute"
                                      placeholder="Enter Job title"
                                      value={item.name}
                                      name="name"
                                      onChange={(e) =>
                                        handleProjectnameChange(
                                          e.target.value,
                                          index
                                        )
                                      }
                                    />
                                  </div>

                                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2">
                                    <div className="flex flex-col w-full  space-y-2 justify-around  pr-2 lg:py-0 py-5">
                                      <Label for="start_date" className="block">
                                        Start Date
                                      </Label>
                                      <div className="w-full">
                                        <DatePicker
                                          picker="month"
                                          onChange={(e) =>
                                            handleProjectStartDateChange(
                                              e,
                                              index
                                            )
                                          }
                                          className="w-full"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex flex-col w-full  space-y-2 justify-around  lg:pl-2 pl-0">
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
                                  <div className="m-2 space-y-2">
                                    <Label>Description</Label>
                                    <Textarea
                                      value={item.highlights.join("\n")}
                                      onChange={(e) =>
                                        handleProjectHighlightsChange(
                                          e.target.value,
                                          index
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                          <MdDeleteOutline
                            className="absolute right-0 top-6 cursor-pointer text-2xl text-red-600"
                            onClick={() => handleDeleteProjects(index)}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="w-full mt-5 justify-between items-center flex">
                <Button onClick={handlePrevStep}>Back</Button>
                <Button
                  onClick={handleChangeStep4}
                  disabled={formData.projects.length === 0}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    );
  }

  if (steps === 5) {
    return (
      <DialogContent
        className="max-w-[70dvw] no-scrollbar p-0 h-[80dvh] bg-blue-900"
        onClick={handleCloseMultistepForm}
        showCloseButton
      >
        <div className="flex justify-around overflow-hidden">
          <div className="w-1/3 h-full ">
            <Image
              src="/illustration-manager-choosing-new-worker.png"
              alt="choice-worker-concept-illustrated"
              className="absolute bottom-5"
              width={350}
              height={350}
            />
          </div>
          <div className="w-2/3 py-5 h-full overflow-hidden">
            <div className="shadow-xl px-10 py-5 w-full h-full max-h-full rounded-2xl overflow-hidden bg-white">
              <Label>Skills</Label>
              <Textarea
                placeholder="Enter your skills"
                value={formData.skills.join("\n")}
                onChange={handleSkillsChange}
                className="mt-2 h-1/2"
              />
              <div className="w-full justify-between items-center py-10 flex">
                <Button onClick={handlePrevStep}>Back</Button>
                <Button
                  onClick={handleSubmitForm}
                  disabled={formData.skills.length === 0}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    );
  }

  if (steps === 6) {
    return (
      <DialogContent
        className="max-w-[80dvw] no-scrollbar h-[80dvh]"
        onClick={handleCloseMultistepForm}
        showCloseButton
      >
        <div className="flex justify-around">
          <div className="w-1/3 h-full ">
            <Image
              src="/illustration-manager-choosing-new-worker.png"
              alt="choice-worker-concept-illustrated"
              className="absolute bottom-5"
              width={350}
              height={350}
            />
          </div>
          <div className="w-1/2 h-full flex item-center">
            <div className="mx-auto flex items-center justify-center flex-col">
              <Lottie
                animationData={animation}
                className="w-[300px] h-[300px]"
              />
              <p className="mt-1">Preparing your CV</p>
            </div>
          </div>
        </div>
      </DialogContent>
    );
  }
}

export default JobMultistepForm;
