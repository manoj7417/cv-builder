"use client"
import TabsMain from "@/components/resume-templates/TabsMain";
import React from "react";
import Header from "../Layout/Header";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { useUserStore } from "../store/UserStore";
import { ResumeHeader } from "../Layout/ResumeHeader";


const UserHistoryPage = () => {
  const userState = useUserStore((state) => state.userState)
  return (
    <>
      {/* {userState?.isAuthenticated ? <ResumeHeader /> : <Header />} */}
      <div className=" mx-auto bg-gradient-to-t from-[#ebeef7] to-[white]">
        <div className="flex justify-center items-center w-full h-full py-20">
          <TabsMain />
        </div>
      </div>
    </>
  );
};

export default UserHistoryPage;
