"use client";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useUserStore } from "../store/UserStore";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const tiers = [
  {
    name: "Basics",
    id: "free",
    href: "#",
    priceMonthly: "Free",
    description:
      "The perfect plan if you're just getting started with our product.",
    features: [
      "1 Resume Template",
      "Basic Formatting Options",
      "Download as PDF",
      "No Watermark",
      "Email Support",
    ],
    featured: false,
    isPaid: false, // Ensure this flag is set to false for free plan
  },
  {
    name: "Pro",
    id: "pro",
    href: "#",
    priceMonthly: "₹149",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited Resume Templates",
      "Advanced Formatting & Customization",
      "AI-Powered Resume Suggestions",
      "Download in PDF, DOCX & TXT",
      "Job-Specific Resume Tailoring",
      "One-on-One Resume Review",
      "Dedicated Customer Support",
    ],
    featured: true,
    isPaid: true, // Set to true for paid plans
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { userState } = useUserStore((state) => state);
  const userdata = userState?.userdata || {};
  const [loading, setLoading] = useState(false);

  const handlePayment = async (tier) => {
    console.log("tier", tier);
    if (!tier.isPaid) {
      toast.info("You have selected a free plan!");
      return; // Skip payment for free plans
    }

    try {
      setLoading(true);

      // Step 1: Create an order on the backend
      const { data } = await axios.post("/api/create-order", {
        userId: userdata?._id,
        planType: tier.id,
      });

      if (!data || !data.orderId) {
        throw new Error("Failed to create Razorpay order");
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Replace with your Razorpay key
        amount: data.amount, // Amount in paisa (INR 149 = 14900 paisa)
        currency: "INR",
        name: "Career Counselling",
        description: tier.name,
        order_id: data.orderId,
        handler: async function (response) {
          // Step 3: Verify payment
          const verifyResponse = await axios.post("/api/verify-payment", {
            orderId: data.orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            userId: userdata?._id, // Ensure you pass the correct user ID for verification
          });

          if (verifyResponse.data.success) {
            toast.success("Payment successful!");
          } else {
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9876543210",
        },
        theme: { color: "#6366F1" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
        Choose an affordable plan that’s packed with the best features for
        engaging your audience, creating customer loyalty, and driving sales.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-gray-900 shadow-2xl"
                : "bg-white/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? "text-indigo-400" : "text-indigo-600",
                "text-base/7 font-semibold"
              )}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? "text-white" : "text-gray-900",
                  "text-5xl font-semibold tracking-tight"
                )}
              >
                {tier.priceMonthly}
              </span>
              <span
                className={classNames(
                  tier.featured ? "text-gray-400" : "text-gray-500",
                  "text-base"
                )}
              >
                /month
              </span>
            </p>
            <p
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-6 text-base/7"
              )}
            >
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-8 space-y-3 text-sm/6 sm:mt-10"
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(
                      tier.featured ? "text-indigo-400" : "text-indigo-600",
                      "h-6 w-5 flex-none"
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePayment(tier)}
              className="mt-8 w-full bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Processing..." : "Get started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
