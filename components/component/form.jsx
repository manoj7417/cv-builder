'use client'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GoGrabber } from "react-icons/go";
import { FaCrown } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { DatePicker } from "antd";
import CustomLabelInput from "../ui/customLabelInput";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { HexColorPicker } from "react-colorful";
import { colors } from '@/constants/colors'
import { cn } from "@/lib/utils";

export default function Form({ resumeData, setResumeData }) {
  const { sections } = resumeData;
  const [edit, setEdit] = useState({
    profileLabel: false,
    educationLabel: false,
    experienceLabel: false
  })

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    const updatedResumeData = { ...resumeData, basics: { ...resumeData.basics, [name]: value } }
    setResumeData(updatedResumeData)
  }

  const handleProileLabelChange = (e) => {
    const updatedResumeData = { ...resumeData, sections: { ...resumeData.sections, summary: { ...resumeData.sections.summary, name: e.target.value } } }
    setResumeData(updatedResumeData)
  }

  const handleChangeProfileSummaryChange = (val) => {
    console.log(val)
    const updatedResumeData = { ...resumeData, sections: { ...resumeData.sections, summary: { ...resumeData.sections.summary, content: val } } }
    setResumeData(updatedResumeData)
  }

  const handleEducationLabelChange = (e) => {
    const updatedResumeData = { ...resumeData, sections: { ...resumeData.sections, education: { ...resumeData.sections.education, name: e.target.value } } }
    setResumeData(updatedResumeData)
  }

  const handleEducationChange = (e, i) => {
    const { name, value } = e.target;
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, education: {
          ...resumeData.sections.education, items: resumeData.sections.education.items.map((item, index) => {
            if (index === i) {
              return {
                ...item, [name]: value
              }
            }
            return item
          })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleEducationStartDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = ''
    } else {
      let date = val['$d']
      const year = date.getFullYear();
      const monthName = date.toLocaleString('en-US', { month: 'short' });
      newDate = `${monthName}-${year}`;
    }
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, education: {
          ...resumeData.sections.education, items: resumeData.sections.education.items.map((item, index) => {
            if (index === i) {
              return {
                ...item, startDate: newDate
              }
            }
            return item
          })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleEducationEndDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = ''
    } else {
      let date = val['$d']
      const year = date.getFullYear();
      const monthName = date.toLocaleString('en-US', { month: 'short' });
      newDate = `${monthName}-${year}`;
    }
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, education: {
          ...resumeData.sections.education, items: resumeData.sections.education.items.map((item, index) => {
            if (index === i) {
              return {
                ...item, endDate: newDate
              }
            }
            return item
          })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleEducationDescriptionChange = (val, i) => {
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, education: {
          ...resumeData.sections.education, items: resumeData.sections.education.items.map((item, index) => {
            if (index === i) {
              return {
                ...item, description: val
              }
            }
            return item
          })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleExperienceLabelChange = (e) => {
    const updatedResumeData = { ...resumeData, sections: { ...resumeData.sections, experience: { ...resumeData.sections.experience, name: e.target.value } } }
    setResumeData(updatedResumeData)
  }

  const handleExperienceChange = (e, i) => {
    const { name, value } = e.target;
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, experience: {
          ...resumeData.sections.experience, items: resumeData.sections.experience.items.map((item, index) => {
            if (index === i) {
              return {
                ...item, [name]: value
              }
            }
            return item
          })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleExperienceDescriptionChange = (val, i) => {
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, experience: {
          ...resumeData.sections.experience, items: resumeData.sections.experience.items.map((item, index) => {
            if (index === i) {
              return {
                ...item, description: val
              }
            }
            return item
          })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleExperienceStartDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = ''
    } else {
      let date = val['$d']
      const year = date.getFullYear();
      const monthName = date.toLocaleString('en-US', { month: 'short' });
      newDate = `${monthName}-${year}`;
    }
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, experience: {
          ...resumeData.sections.experience, items: resumeData.sections.experience.items.map((item, index) => {
            if (index === i) {
              return {
                ...item, startDate: newDate
              }
            }
            return item
          })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleExperienceEndDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = ''
    } else {
      let date = val['$d']
      const year = date.getFullYear();
      const monthName = date.toLocaleString('en-US', { month: 'short' });
      newDate = `${monthName}-${year}`;
    }
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, experience: {
          ...resumeData.sections.experience, items: resumeData.sections.experience.items.map((item, index) => {
            if (index === i) {
              return {
                ...item, endDate: newDate
              }
            }
            return item
          })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleAddNewEducation = () => {
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, education: {
          ...resumeData.sections.education, items: [
            ...resumeData.sections.education.items,
            {
              institution: "",
              area: "",
              studyType: "",
              startDate: "",
              endDate: "",
              city: "",
              description: ""
            }
          ]
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleAddNewExperience = () => {
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, experience: {
          ...resumeData.sections.experience, items: [
            ...resumeData.sections.experience.items,
            {
              jobtitle: "",
              employer: "",
              startDate: "",
              endDate: "",
              description: "",
              city: ""
            }
          ]
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleDeleteExperienceSection = (i) => {
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, experience: {
          ...resumeData.sections.experience, items:
            resumeData.sections.experience.items.filter((el, index) => {
              return index !== i
            })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleDeleteEducationSection = (i) => {
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, education: {
          ...resumeData.sections.education, items:
            resumeData.sections.education.items.filter((el, index) => {
              return index !== i
            })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleProjectChange = (e, i) => {
    const { name, value } = e.target;
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, projects: {
          ...resumeData.sections.projects, items: resumeData.sections.projects.items.map((item, index) => {
            if (index === i) {
              return {
                ...item, [name]: value
              }
            }
            return item
          })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleProjectDescriptionChange = (val, i) => {
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, projects: {
          ...resumeData.sections.projects, items: resumeData.sections.projects.items.map((item, index) => {
            if (index === i) {
              return {
                ...item, description: val
              }
            }
            return item
          })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleDeleteProjectSection = (i) => {
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, projects: {
          ...resumeData.sections.projects, items:
            resumeData.sections.projects.items.filter((el, index) => {
              return index !== i
            })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleAddNewProject = () => {
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, projects: {
          ...resumeData.sections.projects, items: [
            ...resumeData.sections.projects.items,
            {
              title: '',
              subtitle: '',
              startDate: "",
              endDate: "",
              description: ""
            }
          ]
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleProjectStartDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = ''
    } else {
      let date = val['$d']
      const year = date.getFullYear();
      const monthName = date.toLocaleString('en-US', { month: 'short' });
      newDate = `${monthName}-${year}`;
    }
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, projects: {
          ...resumeData.sections.projects, items: resumeData.sections.projects.items.map((item, index) => {
            if (index === i) {
              return {
                ...item, startDate: newDate
              }
            }
            return item
          })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleProjectEndDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = ''
    } else {
      let date = val['$d']
      const year = date.getFullYear();
      const monthName = date.toLocaleString('en-US', { month: 'short' });
      newDate = `${monthName}-${year}`;
    }
    const updatedResumeData = {
      ...resumeData, sections: {
        ...resumeData.sections, projects: {
          ...resumeData.sections.projects, items: resumeData.sections.projects.items.map((item, index) => {
            if (index === i) {
              return {
                ...item, endDate: newDate
              }
            }
            return item
          })
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  const handleProjectLabelChange = (e) => {
    const updatedResumeData = { ...resumeData, sections: { ...resumeData.sections, projects: { ...resumeData.sections.projects, name: e.target.value } } }
    setResumeData(updatedResumeData)
  }

  const handleTemplateThemeChange = (color) => {
    const updatedResumeData = {
      ...resumeData,
      metadata: {
        ...resumeData.metadata,
        theme: {
          ...resumeData.metadata.theme,
          primary: color
        }
      }
    }
    setResumeData(updatedResumeData)
  }

  return (
    <>
<<<<<<< HEAD
      <div className="header_section bg-gray-800 md:p-1.5 p-1 flex flex-row 2xl:justify-around 2xl:p-5 justify-start items-center fixed top-0 left-0 w-full z-0">
        <Link href={'/resume-dashboard'} className="px-5 py-2 bg-blue-900 text-white hover:bg-blue-700 text-sm rounded-md"><MdOutlineKeyboardArrowLeft className="inline text-xl" />Back</Link>
      </div>
      <div className=" px-5 py-20">
        <div className="px-10">
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" name="name" onChange={handleBasicInfoChange} value={resumeData?.basics?.name} />
=======
     {/* <div className="header_section bg-gray-800 md:p-1.5 p-1 flex flex-row 2xl:justify-around 2xl:p-5 justify-start items-center fixed top-0 left-0 w-full z-0">
        <Link href={'/resume-dashboard'} className="px-5 py-2 bg-blue-900 text-white hover:bg-blue-700 text-sm rounded-md"><MdOutlineKeyboardArrowLeft className="inline text-xl"/>Back</Link>
      </div> */}
    <div className="py-14">
      <div className="px-10">
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" name="name" onChange={handleBasicInfoChange} value={resumeData?.basics?.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobtitle">Job Title</Label>
            <Input id="jobtitle" placeholder="Enter Job Title" name="jobtitle" type="text" onChange={handleBasicInfoChange} value={resumeData?.basics?.jobtitle} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email address" type="email" name="email" onChange={handleBasicInfoChange} value={resumeData?.basics?.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="Enter phone number" name="phone" value={resumeData?.basics?.phone} onChange={handleBasicInfoChange} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="Enter Country Name" value={resumeData?.basics?.country} name="country" onChange={handleBasicInfoChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Enter City Name" name="city" onChange={handleBasicInfoChange} value={resumeData?.basics?.city} />
          </div>
        </div>
      </div>

      {/* profile section */}
      <div className="py-5 my-5 px-10">
        <div className="space-y-2">
          <div className=" flex justify-between items-center">
            <div className=" w-[40%] group">
              <Label htmlFor="Profile" className="text-2xl group-hover:hidden">{resumeData?.sections?.summary?.name}</Label>
              <CustomLabelInput className='hidden group-hover:block' value={resumeData?.sections?.summary?.name} onChange={handleProileLabelChange} />
>>>>>>> a94d8110a0ecd856571cfc853e0b5a22095ac16a
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobtitle">Job Title</Label>
              <Input id="jobtitle" placeholder="Enter Job Title" name="jobtitle" type="text" onChange={handleBasicInfoChange} value={resumeData?.basics?.jobtitle} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email address" type="email" name="email" onChange={handleBasicInfoChange} value={resumeData?.basics?.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="Enter phone number" name="phone" value={resumeData?.basics?.phone} onChange={handleBasicInfoChange} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="Enter Country Name" value={resumeData?.basics?.country} name="country" onChange={handleBasicInfoChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Enter City Name" name="city" onChange={handleBasicInfoChange} value={resumeData?.basics?.city} />
            </div>
          </div>
        </div>

        {/* profile section */}
        <div className="py-5 my-5 px-10">
          <div className="space-y-2">
            <div className=" flex justify-between items-center">
              <div className=" w-[40%] group">
                <Label htmlFor="Profile" className="text-2xl group-hover:hidden">{resumeData?.sections?.summary?.name}</Label>
                <CustomLabelInput className='hidden group-hover:block' value={resumeData?.sections?.summary?.name} onChange={handleProileLabelChange} />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className=" bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-700 border-none"
                  >
                    Generate with AI
                    <FaCrown className=" text-yellow-500 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you are
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        defaultValue="@peduarte"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <p className=" text-gray-400 text-sm">
                Write 2-4 short & energetic sentences to interest the reader!
                Mention your role, experience & most importantly - your biggest
                achievements, best qualities and skills.
              </p>
            </div>
            <div className="no-scrollbar">
              <ReactQuill
                id="Profile"
                className="no-scrollbar"
                style={{
                  height: "200px",
                  zIndex: "-1",
                  position: "relative"
                }}
                value={resumeData?.sections?.summary?.content}
                onChange={handleChangeProfileSummaryChange}
              />
            </div>
          </div>
        </div>

        {/* education section */}
        <div className="py-5 my-20">
          <div className="space-y-2 px-10">
            <div className=" w-[40%] group">
              <Label className="text-2xl group-hover:hidden">{sections.education.name}</Label>
              <CustomLabelInput className='hidden group-hover:block' value={resumeData?.sections?.education?.name} onChange={handleEducationLabelChange} />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                A varied education on your resume sums up the value that your learnings and background will bring to job.
              </p>
            </div>
          </div>
          <div className=" my-5 h-auto ">
            {
              sections?.education?.items.length > 0 &&
              sections?.education?.items.map((item, index) => {
                return <div key={index} className="flex items-start justify-center group my-5 relative">
                  <GoGrabber className=" text-3xl
               font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out absolute top-2 left-1"/>
                  <Accordion type="single" collapsible className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out " defaultValue={`item-${index}`} defaultChecked>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="group-hover:text-blue-900">
                        <div className=" px-3 flex flex-col items-start ">
                          {(item?.degree || item?.institute) ? <p >
                            <span>{item?.degree}</span>
                            <span>{item?.degree && item?.institute && ' at '}</span>
                            <span>{item?.institute}</span>
                          </p>
                            : <p>(Not Specified)</p>
                          }
                          <p className="text-gray-500 text-sm">{item?.startDate && `${item.startDate} - `}{item?.endDate}</p>
                        </div></AccordionTrigger>
                      <AccordionContent>
                        <div className="w-full pt-5 px-5 pb-10">
                          <div className="grid grid-cols-2 gap-4 px-2 py-5">
                            <div className="space-y-2">
                              <Label htmlFor="institute">Institute</Label>
                              <Input id="institute" placeholder="Institute Name" value={item.institute} onChange={(e) => handleEducationChange(e, index)} name="institute" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="degree">Degree</Label>
                              <Input id="degree" placeholder="Degree Name" type="text" value={item.degree} name="degree" onChange={(e) => handleEducationChange(e, index)} />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 px-2">
                            <div className="flex flex-col md:flex-row ">
                              <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  pr-2">
                                <Label for="start_date" className="block">Start Date</Label>
                                <div className="w-full">
                                  <DatePicker picker="month" onChange={(e) => handleEducationStartDateChange(e, index)} name="startDate" />
                                </div>
                              </div>
                              <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  pl-2">
                                <Label for="end_date" className="block">End Date</Label>
                                <div className="w-full">
                                  <DatePicker picker="month" onChange={(e) => handleEducationEndDateChange(e, index)} name="endDate" />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input placeholder="Enter city name" type="text" value={item.city} name="city" onChange={(e) => handleEducationChange(e, index)} />
                            </div>
                          </div>
                          <div className="space-y-2 my-5 px-2">
                            <Label htmlFor="city" >Description</Label>
                            <ReactQuill
                              id="Profile"
                              className="no-scrollbar"
                              style={{
                                height: "200px",
                              }}
                              placeholder="eg. Graduated from the University "
                              value={item.description}
                              onChange={(e) => handleEducationDescriptionChange(e, index)}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <MdDeleteOutline className="absolute top-2 right-1 text-2xl
               font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out" onClick={() => handleDeleteEducationSection(index)} />
                </div>
              })

            }
          </div>
          <div className="px-10 ">
            <Button className="w-full bg-white text-blue-900 hover:bg-blue-100 h-8 flex justify-start rounded-none item-center" onClick={handleAddNewEducation}><IoIosAddCircleOutline className="text-xl mr-2" />Add one more {`${resumeData?.sections?.education?.name}`.toLowerCase()}</Button>
          </div>
        </div>

        {/* experience section */}
        <div className="py-5 mt-0 mb-10">
          <div className="space-y-2 px-10">
            <div className=" w-[40%] group">
              <Label className="text-2xl group-hover:hidden">{sections?.experience?.name}</Label>
              <CustomLabelInput className='hidden group-hover:block' value={resumeData?.sections?.experience?.name} onChange={handleExperienceLabelChange} />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z).
              </p>
            </div>
          </div>

          <div className=" my-5 h-auto">
            {
              sections?.experience?.items.length > 0 &&
              sections?.experience?.items.map((item, index) => {
                return <div key={index} className="flex items-start justify-between group my-5 ">
                  <GoGrabber className="mt-3 text-3xl
               font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out"/>
                  <Accordion type="single" collapsible className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out" defaultValue={`item-${index}`}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger>
                        <div className=" px-3 flex flex-col items-start">
                          {(item?.jobtitle || item?.employer) ? <p >{item?.jobtitle && `${item?.jobtitle}${item?.employer && ` at `} `}{item?.employer}</p> : <p>(Not Specified)</p>}
                          <p className="text-gray-500 text-sm">{item?.startDate && `${item.startDate} - `}{item?.endDate}</p>
                        </div></AccordionTrigger>
                      <AccordionContent>
                        <div className="w-full pt-5 px-5 pb-10">
                          <div className="grid grid-cols-2 gap-4 px-2 py-5">
                            <div className="space-y-2">
                              <Label htmlFor="institute">Job Title</Label>
                              <Input id="institute" placeholder="Enter Job title" value={item.jobtitle} name="jobtitle" onChange={(e) => handleExperienceChange(e, index)} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="degree">Employer</Label>
                              <Input id="degree" placeholder="Employer name" type="text" value={item.employer} name="employer" onChange={(e) => handleExperienceChange(e, index)} />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 px-2">
                            <div className="flex flex-col md:flex-row ">
                              <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  pr-2">
                                <Label for="start_date" className="block">Start Date</Label>
                                <div className="w-full">
                                  <DatePicker picker="month" onChange={(e) => handleExperienceStartDateChange(e, index)} />
                                </div>
                              </div>
                              <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  pl-2">
                                <Label for="end_date" className="block">End Date</Label>
                                <div className="w-full">
                                  <DatePicker picker="month" onChange={(e) => handleExperienceEndDateChange(e, index)} />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input id="city" placeholder="Enter city name" type="text" value={item.city} name="city" onChange={(e) => handleExperienceChange(e, index)} />
                            </div>
                          </div>
                          <div className="space-y-2 my-5 px-2">
                            <Label htmlFor="city" >Description</Label>
                            <ReactQuill
                              id="Profile"
                              theme="snow"
                              className="no-scrollbar"
                              style={{
                                height: "200px",
                              }}
                              placeholder="e.g.  Created and implemented lesson plans based on child-led interests and curiosities."
                              value={item.description}
                              onChange={(e) => handleExperienceDescriptionChange(e, index)}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <MdDeleteOutline className="mt-3 text-2xl
               font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out" onClick={() => handleDeleteExperienceSection(index)} />
                </div>
              })
            }
          </div>
          <div className="px-10 ">
            <Button className="w-full bg-white text-blue-900 hover:bg-blue-100 h-8 flex justify-start rounded-none item-center" onClick={handleAddNewExperience}><IoIosAddCircleOutline className="text-xl mr-2" />Add one more {`${resumeData?.sections?.experience?.name}`.toLowerCase()}</Button>
          </div>
        </div>

        {/* Projects */}
        <div className="py-5 mt-0 mb-10">
          <div className="space-y-2 px-10">
            <div className=" w-[40%] group">
              <Label className="text-2xl group-hover:hidden">{sections?.projects?.name}</Label>
              <CustomLabelInput className='hidden group-hover:block' value={resumeData?.sections?.projects?.name} onChange={handleProjectLabelChange} />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Show your best projects
              </p>
            </div>
          </div>

          <div className=" my-5 h-auto">
            {
              sections?.projects?.items.length > 0 &&
              sections?.projects?.items.map((item, index) => {
                return <div key={index} className="flex items-start justify-between group my-5 ">
                  <GoGrabber className="mt-3 text-3xl
               font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out"/>
                  <Accordion type="single" collapsible className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out" defaultValue={`item-${index}`}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger>
                        <div className=" px-3 flex flex-col items-start">
                          <p >{item?.title ? `${item?.title}` : "(Not Specified  )"}</p>
                          <p>{item?.subtitle}</p>
                          <p className="text-gray-500 text-sm">{item?.startDate && `${item.startDate} - `}{item?.endDate}</p>
                        </div></AccordionTrigger>
                      <AccordionContent>
                        <div className="w-full pt-5 px-5 pb-10">
                          <div className="grid grid-cols-2 gap-4 px-2 py-5">
                            <div className="space-y-2">
                              <Label htmlFor="institute">Title</Label>
                              <Input id="institute" placeholder="Enter Job title" value={item.title} name="title" onChange={(e) => handleProjectChange(e, index)} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="degree">Subtitle</Label>
                              <Input id="degree" placeholder="Employer name" type="text" value={item.subtitle} name="subtitle" onChange={(e) => handleProjectChange(e, index)} />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 px-2">
                            <div className="flex flex-col md:flex-row ">
                              <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  pr-2">
                                <Label for="start_date" className="block">Start Date</Label>
                                <div className="w-full">
                                  <DatePicker picker="month" onChange={(e) => handleProjectStartDateChange(e, index)} />
                                </div>
                              </div>
                              <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  pl-2">
                                <Label for="end_date" className="block">End Date</Label>
                                <div className="w-full">
                                  <DatePicker picker="month" onChange={(e) => handleProjectEndDateChange(e, index)} />
                                </div>
                              </div>
                            </div>

                          </div>
                          <div className="space-y-2 my-5 px-2">
                            <Label htmlFor="city" >Description</Label>
                            <ReactQuill
                              id="Profile"
                              theme="snow"
                              className="no-scrollbar"
                              style={{
                                height: "200px",
                              }}
                              placeholder="e.g.  Created and implemented lesson plans based on child-led interests and curiosities."
                              value={item.description}
                              onChange={(e) => handleProjectDescriptionChange(e, index)}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <MdDeleteOutline className="mt-3 text-2xl
               font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out" onClick={() => handleDeleteProjectSection(index)} />
                </div>
              })
            }
          </div>
          <div className="px-10 ">
            <Button className="w-full bg-white text-blue-900 hover:bg-blue-100 h-8 flex justify-start rounded-none item-center" onClick={handleAddNewProject}><IoIosAddCircleOutline className="text-xl mr-2" />Add one more {`${resumeData?.sections?.experience?.name}`.toLowerCase()}</Button>
          </div>
        </div>

        {/* theme */}
        <div className="px-10 rounded-md ">
          <div className="my-5">
            <Label className="text-2xl ">Theme</Label>
          </div>
          <div className="mb-2 grid grid-cols-6 flex-wrap justify-items-center gap-y-4 @xs/right:grid-cols-9">
            {colors.length > 0 && colors.map((color) => (
              <div
                key={color}
                onClick={() => handleTemplateThemeChange(color)}
                className={cn(
                  "flex size-6 cursor-pointer items-center justify-center rounded-full ring-primary ring-offset-1 ring-offset-background transition-shadow hover:ring-1",
                  resumeData.metadata.theme.primary === color && "ring-1",
                )}
              >
                <div className="size-5 rounded-full" style={{ backgroundColor: color }} />
              </div>
            ))}
          </div>
          <Label htmlFor="theme.primary">Primary Color</Label>
          <div className="relative my-2">
            <Popover >
              <PopoverTrigger asChild>
                <div
                  className="absolute inset-y-0 left-3 my-2.5 size-4 cursor-pointer rounded-full ring-primary ring-offset-2 ring-offset-background transition-shadow hover:ring-1"
                  style={{ backgroundColor: resumeData.metadata.theme.primary }}
                />
              </PopoverTrigger>
              <PopoverContent className="rounded-lg border-none bg-transparent p-0">
                <HexColorPicker
                  color={resumeData.metadata.theme.primary}
                  onChange={handleTemplateThemeChange}
                />
              </PopoverContent>
            </Popover>
            <Input
              id="theme.primary"
              value={resumeData.metadata.theme.primary}
              className="pl-10"
              onChange={(event) => {
                handleTemplateThemeChange(event.target.value);
              }}
            />
          </div>
          <div>

          </div>

          <div className=" my-5">

            <Label htmlFor="theme.primary">Font Color</Label>
            <div className="relative">
              <Popover >
                <PopoverTrigger asChild>
                  <div
                    className="absolute inset-y-0 left-3 my-2.5 size-4 cursor-pointer rounded-full ring-primary ring-offset-2 ring-offset-background transition-shadow hover:ring-1"
                    style={{ backgroundColor: resumeData.metadata.theme.primary }}
                  />
                </PopoverTrigger>
                <PopoverContent className="rounded-lg border-none bg-transparent p-0">
                  <HexColorPicker
                    color={resumeData.metadata.theme.primary}
                    onChange={handleTemplateThemeChange}
                  />
                </PopoverContent>
              </Popover>
              <Input
                id="theme.primary"
                value={resumeData.metadata.theme.primary}
                className="pl-10"
                onChange={(event) => {
                  handleTemplateThemeChange(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
