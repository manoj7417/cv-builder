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

import { FaCrown } from "react-icons/fa";

export default function Form({ resumeData, setResumeData }) {
  return (
    <div className="p-10">
      <div className="">
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
      <div className="py-5 my-5">
        <div className="space-y-2">
          <div className=" flex justify-between items-center">
            <Label htmlFor="Profile">Profile</Label>
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
          <ReactQuill
            theme="snow"
            className=""
            id="Profile"
            style={{
              height: "200px",
              borderRadius: "20px",
            }}
          />
        </div>
      </div>

      <div className="py-5 my-20 border-2">
        <div className="space-y-2">
          <Label>Education</Label>
          <div></div>
        </div>
      </div>
    </div>
  );
}
