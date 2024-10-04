"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GiMagicLamp } from "react-icons/gi";
import { FiBox } from "react-icons/fi";
import { useRef, useState } from "react";
import { GetTokens } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/UserStore";
import { toast } from "react-toastify";
import axios from "axios";

export function ServiceSection() {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const email = useRef("");
  const router = useRouter();
  const { userdata } = useUserStore((state) => state.userState);

  const handleSubscribe = async () => {
    const { accessToken } = await GetTokens();


    if (!email.current.value) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setIsSubscribing(true);

    try {
      const response = await axios.post('/api/newsletter', { email: email.current.value });
      if (response.status === 200) {
        setIsSubscribed(true);
        toast.success("You are subscribed to our newsletter", {
          position: "top-right"
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      email.current.value = "";
      setIsSubscribing(false);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#e4f5fc] to-[white] ">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-gradient-to-t from-white to-[#2C98CA33] scroll-mt-20">
          <div className=" grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="lg:text-5xl text-2xl font-bold text-black">
                Stay Ahead of the Curve!
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-sm">
                Subscribe to our newsletter and get the latest updates.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="flex lg:flex-row flex-col space-x-2 mb-5 gap-5">
                <div>
                  <input
                    className="max-w-lg lg:py-2 py-2 flex-1 px-3 bg-blue-900 bg-opacity-10 rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 opacity-55"
                    placeholder="Enter your email"
                    type="email"
                    ref={email}
                    disabled={isSubscribed}
                    required
                    onChange={() => setEmailError(false)}
                  />
                  {emailError && (
                    <p className="text-red-600 text-sm mt-2 ml-2 text-start">
                      Email is required
                    </p>
                  )}
                </div>

                {isSubscribed ? (
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-green-700 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 ">
                    Susbcribed
                  </Button>
                ) : (
                  <Button
                    className="inline-flex h-10 items-center justify-center rounded-md bg-blue-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    disabled={!email || isSubscribing}
                    onClick={handleSubscribe}
                  >
                    {isSubscribing ? "Subscribing.." : "Subscribe"}
                  </Button>
                )}
              </div>

              <p className="text-xs text-gray-500">
                <Link
                  className="underline underline-offset-2"
                  href="/terms-condition"
                >
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
