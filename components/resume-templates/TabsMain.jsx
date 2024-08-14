import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "./TabsContent";
import Link from "next/link";
import { useUserStore } from "@/app/store/UserStore";
import {
  createNewResume,
  deleteUserResume,
  getUserResumes,
} from "@/app/api/api";
import { Button } from "../ui/button";
import { useResumeStore } from "@/app/store/ResumeStore";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaEllipsisVertical } from "react-icons/fa6";
import PlusIcon from "../ui/PlusIcon";
import { toast } from "react-toastify";
import { GetTokens } from "@/app/actions";
import dayjs from "dayjs";

const TabsMain = () => {
  const userdata = useUserStore((state) => state.userState.userdata);
  const resumes = useUserStore((state) => state.userState.resumes);
  const createResume = useUserStore((state) => state.createResume);
  const setResumes = useUserStore((state) => state.setResumes);
  const replaceResumeData = useResumeStore((state) => state.replaceResumeData);
  const getResumeById = useUserStore((state) => state.getResumeById);
  const deleteResume = useUserStore((state) => state.deleteResume);
  const router = useRouter();
  const [isCreatingResume, setisCreatingResume] = useState(false);

  const fetchUserResumes = async () => {
    const { accessToken } = await GetTokens();
    try {
      const response = await getUserResumes(accessToken.value);
      if (response?.data) {
        setResumes(response.data.data);
      }
    } catch (error) {
      if (error?.response?.data?.error === "No user resumes found") {
        setResumes([]);
      }
    }
  };

  const handlecreateResume = async () => {
    const { accessToken } = await GetTokens();
    setisCreatingResume(true);
    try {
      const response = await createNewResume(accessToken?.value, "Template3");
      if (response.data.data) {
        createResume(response.data.data);
        replaceResumeData(response.data.data);
        router.push("/resume-builder");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisCreatingResume(false);
    }
  };



  const handleDeleteResume = async (e, id) => {
    e.stopPropagation()
    const { accessToken } = await GetTokens();
    toast.promise(
      deleteUserResume(id, accessToken.value).then((response) => {
        if (response.status === 204) {
          deleteResume(id);
        }
      }),
      {
        pending: "Deleting resume...",
        success: "Resume deleted ",
        error: "Error deleting resume",
      }
    );
  };

  const handleResumeClick = (resumeId) => {
    const resume = getResumeById(resumeId);
    replaceResumeData(resume);
    router.push("/resume-builder");
  };

  useEffect(() => {
    fetchUserResumes();
  }, []);
  return (
    <>
      <div className="tabs_section">
        <h2 className="lg:text-2xl text-xl lg:text-start text-center my-5">
          Welcome back,{" "}
          <span className="font-semibold">{userdata?.fullname}</span>
        </h2>
        <Tabs>
          <Tab label="All Documents">
            <section className="flex lg:flex-row flex-col lg:px-0 px-10 gap-10 justify-center">
              <div className="grid lg:grid-cols-2 grid-cols-1 border border-gray-400 p-5 rounded-md lg:w-4/5 my-5 gap-2 place-content-center place-items-center h-full">
                <Button
                  className="file bg-blue-900 disabled:bg-gray-700 text-white p-3 rounded-md text-sm"
                  onClick={handlecreateResume}
                  disabled={isCreatingResume}
                >
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
                    Did you know that if you create a perfectly written Cover
                    Letter, you multiply your possibilities of selection?
                  </span>
                </div>
              </div>
            </section>

            <section className="overflow-hidden justify-center border border-gray-400 rounded-lg flex flex-wrap">
              <div
                className="relative w-[200px] group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 mx-5 cursor-pointer my-5"
                onClick={handlecreateResume}
              >
                <div className="h-48 flex items-center justify-center bg-slate-100">
                  <Button
                    className="bg-white rounded-full h-[100px] w-[100px] hover:bg-white"
                    disabled={isCreatingResume}
                  >
                    <PlusIcon />
                  </Button>
                </div>
                <div className="bg-white p-4 flex w-full justify-center items-center">
                  <h3 className="font-bold text-lg text-blue-900">
                    Create New
                  </h3>
                </div>
              </div>
              {resumes?.length > 0 &&
                resumes.map((item, index) => {
                  return (
                    <div
                      className="relative w-[200px] group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 m-5 cursor-pointer"
                      key={index}
                      onClick={() => handleResumeClick(item._id)}
                    >
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

                      <div className="flex justify-between items-start gap-2 px-3 py-2 bg-white h-full">
                        <div className="w-[90%]">

                          <h3 className="font-bold text-sm truncate text-blue-900 flex-grow break-words col-span-6">
                            {item.title}
                          </h3>
                          <div className="flex justify-between">
                            <p className="text-gray-400 text-xs">
                              {dayjs(item.createdAt).format('DD-MMM-YYYY')}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {dayjs(item.createdAt).format('hh:mm A')}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <FaEllipsisVertical className="text-md text-blue-900" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={(e) => handleDeleteResume(e, item._id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </section>
          </Tab>
          <Tab label="Cover Letter">
            <h1 className="text-xl md:text-2xl font-bold my-1 z-10">
              Coming Soon
            </h1>
            <p className=" text-sm md:text-base">
              We are working hard to bring something amazing for you. Stay
              tuned!
            </p>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default TabsMain;
