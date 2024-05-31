
import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "./TabsContent";
import Link from "next/link";
import { useUserStore } from "@/app/store/UserStore";
import { createNewResume, deleteUserResume, getUserResumes } from "@/app/pages/api/api";
import { Button } from "../ui/button";
import { useResumeStore } from "@/app/store/ResumeStore";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import {
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { IoMdAddCircle } from "react-icons/io";
import PlusIcon from "../ui/PlusIcon";
import { toast } from "react-toastify";



const TabsMain = () => {
  const userdata = useUserStore(state => state.userState.userdata);
  const resumes = useUserStore(state => state.userState.resumes);
  const createResume = useUserStore(state => state.createResume);
  const setResumes = useUserStore(state => state.setResumes)
  const replaceResumeData = useResumeStore(state => state.replaceResumeData)
  const getResumeById = useUserStore(state => state.getResumeById)
  const deleteResume = useUserStore(state => state.deleteResume)
  const router = useRouter()
  const [isCreatingResume, setisCreatingResume] = useState(false)

  const fetchUserResumes = async () => {
    try {
      const response = await getUserResumes()
      if (response?.data?.data) {
        setResumes(response.data.data)
      }
    } catch (error) {
      if (error?.response?.data?.error === "No user resumes found") {
        setResumes([])
      }
    }
  }

  const handlecreateResume = async () => {
    setisCreatingResume(true)
    try {
      const response = await createNewResume()
      if (response.data.data) {
        createResume(response.data.data)
        replaceResumeData(response.data.data)
        router.push('/builder')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setisCreatingResume(false)
    }
  }

  const handleEditResume = (id) => {
    console.log(id)
  }

  const handleDeleteResume = async (id) => {
    toast.promise(
      deleteUserResume(id).then(response => {
        if (response.status === 204) {
          deleteResume(id);
        }
      }),
      {
        pending: 'Deleting resume...',
        success: 'Resume deleted ',
        error: 'Error deleting resume'
      }
    );
  }

  const handleResumeClick = (resumeId) => {
    const resume = getResumeById(resumeId);
    replaceResumeData(resume)
    router.push('/builder')
  }


  useEffect(() => {
    fetchUserResumes()
  }, [])
  return (
    <>
      <div className="tabs_section">
        <h2 className="lg:text-3xl text-xl text-center font-semibold my-5">
          Welcome back, {userdata?.fullname}! You have 1 document
        </h2>
        <Tabs >
          <Tab label="All Documents">
            <section className="flex lg:flex-row flex-col lg:px-0 px-10 gap-10 justify-center">
              <div className="grid lg:grid-cols-2 grid-cols-1 border border-gray-400 p-5 rounded-md lg:w-4/5 my-5 gap-2 place-content-center place-items-center h-full">
                <Button className="file bg-blue-900 disabled:bg-gray-700 text-white p-3 rounded-md text-sm" onClick={handlecreateResume} disabled={isCreatingResume}>
                  Create CV
                </Button>
                <div className="text-sm">
                  <p className="text-blue-900 my-3 font-bold text-base">
                    New CV
                  </p>
                  <b>TIP:</b>
                  <span>
                    {" "}
                    Did you know that if you tailor your resume to the job
                    description, you double your chances to get an interview?
                  </span>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 grid-cols-1 border border-gray-400 p-5 rounded-md lg:w-4/5 my-5 gap-2 place-content-center place-items-center h-full">
                <div className="file">
                  <Link
                    href={"/coming-soon"}
                    className="bg-blue-900 text-white p-3 rounded-md text-sm"
                  >
                    Create Cover Letter
                  </Link>
                </div>

                <div className="text-sm">
                  <p className="text-blue-900 my-3 font-bold text-base">
                    New Cover Letter
                  </p>
                  <b>TIP:</b>
                  <span>
                    {" "}
                    Did you know that if you tailor your resume to the job
                    description, you double your chances to get an interview?
                  </span>
                </div>
              </div>
            </section>

            <section className="overflow-hidden border border-gray-400 rounded-lg flex flex-wrap">
              <div className="relative w-[200px] group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 mx-5 cursor-pointer my-5" onClick={handlecreateResume} >
                <div className="h-48 flex items-center justify-center bg-slate-100">
                  <Button className="bg-white rounded-full h-[100px] w-[100px] hover:bg-white" disabled={isCreatingResume}>
                    <PlusIcon />
                  </Button>
                </div>
                <div className="bg-white p-4 flex w-full justify-center items-center">
                  <h3 className="font-bold text-lg text-blue-900">Create New</h3>

                </div>
              </div>
              {
                resumes?.length > 0 && resumes.map((item, index) => {
                  return <div className="relative w-[200px] group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 m-5 cursor-pointer" key={index} onClick={() => handleResumeClick(item._id)}>
                    <img
                      alt="CV Template"
                      className="object-cover w-full h-48"
                      height="200"
                      src="/16.png"
                      style={{
                        aspectRatio: "300/200",
                        objectFit: "cover",
                      }}
                      width="300"
                    />
                    <div className="bg-white p-4 flex w-full justify-between">
                      <h3 className="font-bold text-lg text-blue-900">{item.title}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger><DotsHorizontalIcon className="text-2xl text-blue-900" /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleEditResume(item._id)}>
                            Edit </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteResume(item._id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                })
              }
            </section>
          </Tab>
          <Tab label="CV">
          </Tab>
          <Tab label="Cover Letter">
            <h1 className="text-xl md:text-2xl font-bold my-1 z-10">
              Coming Soon
            </h1>
            <p className=" text-sm md:text-base">
              We are working hard to bring you something amazing.Stay tuned!
            </p>
          </Tab>
        </Tabs>
      </div >
    </>
  );
};

export default TabsMain;
