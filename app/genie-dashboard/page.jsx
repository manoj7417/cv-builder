'use client'

import { ChatDashboard } from "@/components/component/chat-dashboard";
import React from "react";
import ResumeHeader from "../Layout/ResumeHeader";
import Footer from "../Layout/Footer";
import AuthHook from "../hooks/AuthHook";

const page = () => {
  AuthHook()
  return (
    <>
      <ResumeHeader />
      <ChatDashboard />
      <Footer />
    </>
  );
};

export default page;
