'use client'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
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
import { DatePickerDemo } from "./datepicker";


export default function Form({ resumeData, setResumeData }) {
  const { sections } = resumeData
  return (
    <div className="">
      <div className="px-10">
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Job Title</Label>
            <Input id="jobTitle" placeholder="Job Title" type="text" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="space-y-2">
            <Label htmlFor="email">Country</Label>
            <Input id="email" placeholder="" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">City</Label>
            <Input id="phone" placeholder="" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="space-y-2">
            <Label htmlFor="email">Address</Label>
            <Input id="email" placeholder="" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Postal Code</Label>
            <Input id="phone" placeholder="" />
          </div>
        </div>
      </div>

      {/* profile section */}
      <div className="py-5 my-5 px-10">
        <div className="space-y-2">
          <div className=" flex justify-between items-center">
            <Label htmlFor="Profile" className="text-2xl">Profile</Label>
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
              }}
            />
          </div>
        </div>
      </div>

      {/* education section */}
      <div className="py-5 my-20">
        <div className="space-y-2 px-10">
          <Label className="text-2xl">{sections.education.name}</Label>
          <div>
            <p className="text-sm text-gray-500">
              A varied education on your resume sums up the value that your learnings and background will bring to job.
            </p>
          </div>
        </div>
        <div className=" my-5 h-auto">
          {
            sections?.education?.items.length > 0 &&
            sections?.education?.items.map((item, index) => {
              return <div key={index} className="flex items-start justify-between group my-5 ">
                <GoGrabber className="mt-6 text-3xl
               font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out"/>
                <Accordion type="single" collapsible className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className=" px-3 flex flex-col items-start">
                        <p >{item?.degree && `${item?.degree} at `}{item?.institute}</p>
                        <p className="text-gray-500 text-sm">{item?.startDate && `${item.startDate} - `}{item?.endDate}</p>
                      </div></AccordionTrigger>
                    <AccordionContent>
                      <div className="w-full py-5">
                        <div className="grid grid-cols-2 gap-4 px-2 py-5">
                          <div className="space-y-2">
                            <Label htmlFor="institute">Institute</Label>
                            <Input id="institute" placeholder="Institute Name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="degree">Degree</Label>
                            <Input id="degree" placeholder="Degree Name" type="text" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 px-2">
                          <div className="flex flex-col md:flex-row ">
                            <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  px-2">
                              <Label for="start_date" className="block">Start Date</Label>
                              <div className="w-full">
                                <DatePickerDemo id="start_date" />
                              </div>
                            </div>
                            <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  px-2">
                              <Label for="end_date" className="block">End Date</Label>
                              <div className="w-full">
                                <DatePickerDemo id="end_date" />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Enter city name" type="text" />
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
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <MdDeleteOutline className="mt-7 text-2xl
               font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out"/>
              </div>
            })

          }
        </div>
      </div>

      {/* experience section */}
      <div className="py-5 mt-0 mb-10">
        <div className="space-y-2 px-10">
          <Label className="text-2xl">{sections.experience.name}</Label>
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
                <GoGrabber className="mt-6 text-3xl
               font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out"/>
                <Accordion type="single" collapsible className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className=" px-3 flex flex-col items-start">
                        <p >{item?.jobtitle && `${item?.jobtitle} at `}{item?.employer}</p>
                        <p className="text-gray-500 text-sm">{item?.startDate && `${item.startDate} - `}{item?.endDate}</p>
                      </div></AccordionTrigger>
                    <AccordionContent>
                      <div className="w-full py-5">
                        <div className="grid grid-cols-2 gap-4 px-2 py-5">
                          <div className="space-y-2">
                            <Label htmlFor="institute">Job Title</Label>
                            <Input id="institute" placeholder="Enter Job title" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="degree">Employer</Label>
                            <Input id="degree" placeholder="Employer name" type="text" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 px-2">
                          <div className="flex flex-col md:flex-row ">
                            <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  px-2">
                              <Label for="start_date" className="block">Start Date</Label>
                              <div className="w-full">
                                <DatePickerDemo id="start_date" />
                              </div>
                            </div>
                            <div className="flex flex-col w-full md:w-1/2 space-y-2 justify-around  px-2">
                              <Label for="end_date" className="block">End Date</Label>
                              <div className="w-full">
                                <DatePickerDemo id="end_date" />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Enter city name" type="text" />
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
                            placeholder="e.g.  Created and implemented lesson plans based on child-led interests and curiosities.  "
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <MdDeleteOutline className="mt-7 text-2xl
               font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out"/>
              </div>
            })
          }
        </div>
      </div>

    </div>
  );
}
