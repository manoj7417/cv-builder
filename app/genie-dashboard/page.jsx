'use client'

import { ChatDashboard } from "@/components/component/chat-dashboard";
import React from "react";
import ResumeHeader from "../Layout/ResumeHeader";
import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";

const page = () => {
  return (
    <>
      {/* <ResumeHeader /> */}
      <ResumeHeader/>
      <ChatDashboard />
      <Footer />
    </>
  );
};

export default page;
