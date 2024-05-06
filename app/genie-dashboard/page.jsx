import { ChatDashboard } from "@/components/component/chat-dashboard";
import React from "react";
import ResumeHeader from "../Layout/ResumeHeader";
import Footer from "../Layout/Footer";

const page = () => {
  return (
    <>
      <ResumeHeader />
      <ChatDashboard />
      <Footer />
    </>
  );
};

export default page;
