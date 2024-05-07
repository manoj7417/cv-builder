'use client'

import { ChatDashboard } from "@/components/component/chat-dashboard";
import React from "react";
import ResumeHeader from "../Layout/ResumeHeader";
import Footer from "../Layout/Footer";
import AuthHook from "../hooks/AuthHook";
import NewResumeHeader from "../Layout/NewResumeHeader";

const page = () => {
  AuthHook()
  return (
    <>
      {/* <ResumeHeader /> */}
      <NewResumeHeader/>
      <ChatDashboard />
      <Footer />
    </>
  );
};

export default page;
