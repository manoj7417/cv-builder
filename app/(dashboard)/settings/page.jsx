"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";


const ProfilePage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push("/settings/profile")
  }, [router])

  return (
    <>
    </>
  );
};

export default ProfilePage;
