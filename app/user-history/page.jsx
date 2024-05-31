"use client"
import TabsMain from "@/components/resume-templates/TabsMain";
import React from "react";
import Header from "../Layout/Header";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { useUserStore } from "../store/UserStore";


const UserHistoryPage = () => {
  const userState = useUserStore((state) => state.userState)
  return (
    <>
      {userState?.isAuthenticated ? <NewResumeHeader /> : <Header />}
      <div className="container mx-auto">
        <div className="flex justify-center items-center w-full h-full py-20">
          <TabsMain />
        </div>
      </div>
    </>
  );
};

export default UserHistoryPage;
