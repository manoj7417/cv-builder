import { SetTokens } from "@/app/actions";
import { useUserStore } from "@/app/store/UserStore";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

function CoachSignIn({ type }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [apiCalled, setApiCalled] = useState(false); // To prevent multiple API calls
  const loginUser = useUserStore((state) => state.loginUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (status === "authenticated" && session?.idToken && !apiCalled) {
        setIsLoading(true);
        setApiCalled(true);
        try {
          const response = await axios.post("/api/coachGoogleLogin", {
            idToken: session.idToken,
            accessToken: session?.user?.accessToken,
            refreshToken: session?.user?.refreshToken,
          });

          if (response.status === 200) {
            toast.success("Login Successful!");
            const { accessToken, refreshToken, userdata } = response.data.data;
            await SetTokens({ accessToken, refreshToken, isCoach: true });
            loginUser(userdata);
            if (userdata.isApproved) {
              return router.push("/coach-dashboard");
            }
            router.push("/coach-form");
          }
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleGoogleLogin();
  }, [status, session?.idToken, apiCalled]); // Trigger only when `status` or `session.idToken` changes

  return (
    <div className="my-5">
      <button
        type="button"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/coach-registration",
            isSignup: true,
          })
        }
        className="bg-gray-100 p-3  text-base rounded-md w-full flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <FaSpinner className="animate-spin ml-2" size={16} />
            <span className="ml-2">Signing in</span>
          </>
        ) : (
          <>
            <FcGoogle className="mr-2 text-red-500" />
            {`${type} with Google`}
          </>
        )}
      </button>
    </div>
  );
}

export default CoachSignIn;
