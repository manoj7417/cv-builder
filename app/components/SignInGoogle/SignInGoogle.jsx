"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { SetTokens } from "@/app/actions";
import { useUserStore } from "@/app/store/UserStore";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export default function SignIn({ type }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [apiCalled, setApiCalled] = useState(false); // To prevent multiple API calls
  const loginUser = useUserStore((state) => state.loginUser);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (status === "authenticated" && session?.idToken && !apiCalled) {
        setApiCalled(true);
        try {
          const response = await axios.post("/api/googleLogin", {
            idToken: session.idToken,
          });

          if (response.status === 200) {
            toast.success("Login Successful!");
            const { accessToken, refreshToken, userdata } = response.data.data;
            await SetTokens({ accessToken, refreshToken });
            loginUser(userdata);
            if (userdata.role === "admin") {
              return router.push("/admin");
            }
            router.push(redirect || "/");
          }
        } catch (error) {
          console.error("Google Login API Error:", error);
          toast.error("Sign-in failed, please try again.");
        }
      }
    };

    handleGoogleLogin();
  }, [status, session?.idToken, apiCalled]); // Trigger only when `status` or `session.idToken` changes

  return (
    <div>
      {/* {status === "authenticated" && session ? (
        <>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      )} */}
      <button
        type="button"
        onClick={() => signIn("google")}
        className="bg-gray-100 p-3  text-base rounded-md w-full flex items-center justify-center"
      >
        <FcGoogle className="mr-2 text-red-500" />
        {`${type} with Google`}{" "}
      </button>
    </div>
  );
}
