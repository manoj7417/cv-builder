"use client";
import { RemoveTokens } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { toast } from "react-toastify";

const CoachLogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await RemoveTokens();
      toast.success("Logged out");
      await signOut({ redirect: false });
      router.push("/coach-signin");
    } catch (error) {
      console.error(error);
      toast.error("Error logging out");
    }
  };

  return (
    <div>
      <Button
        className="bg-white text-black animate-bounce"
        onClick={handleLogout}
      >
        <RiArrowLeftSLine className="inline text-base" /> Logout
      </Button>
    </div>
  );
};

export default CoachLogoutButton;
