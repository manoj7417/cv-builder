import React, { useEffect, useState } from "react";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Card from "react-credit-cards-2";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";

let stripePromise;

// if (typeof window !== "undefined") {
//   stripePromise = loadStripe(stripeKey);
// }

const CardDetailsForm = ({ clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    // event.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) {
      setError("Stripe is not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    console.log("cardElement::", cardElement);

    const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (setupIntent?.status === "succeeded") {
      onSuccess();
    }

    setLoading(false);
  };

  const elementStyles = {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <CardNumberElement
            options={{ style: { base: elementStyles } }}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <CardExpiryElement
              options={{ style: { base: elementStyles } }}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <CardCvcElement
              options={{ style: { base: elementStyles } }}
              className="border rounded-lg p-2 w-full"
            />
          </div>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-[#f76918] text-white px-4 py-2 rounded mt-4 w-full"
        >
          {loading ? "Processing..." : "Save Card"}
        </button> */}
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <CardNumberElement
                options={{ style: { base: elementStyles } }}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div className="flex space-x-4 mt-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <CardExpiryElement
                  options={{ style: { base: elementStyles } }}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <CardCvcElement
                  options={{ style: { base: elementStyles } }}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <div className="md:w-1/2 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-[#f76918]">
              Trial Period Notice
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Your 14-days trial period will end soon. Once it finishes, your
              payment method will be charged for the selected plan.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              Make sure your payment details are correct to avoid interruptions
              to your service.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!stripe || loading}
            className="bg-[#f76918] text-white px-6 py-3 rounded mt-4"
          >
            {loading ? "Processing..." : "Save Card"}
          </button>
        </div>
      </div>
    </form>
  );
};

const PaymentSetup = ({ clientSecret, onSuccess }) => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const fetchStripeKey = async () => {
      try {
        const response = await fetch("/api/getStripeKey", { method: "GET" });

        if (!response.ok) {
          throw new Error("Failed to fetch the Stripe key");
        }
        const { stripeKey } = await response.json();

        if (stripeKey) {
          setStripePromise(loadStripe(stripeKey)); // Use the fetched key
        } else {
          console.error("No Stripe key found in the response");
        }
      } catch (error) {
        console.error("Error fetching Stripe key:", error);
      }
    };

    fetchStripeKey();
  }, []);

  if (!stripePromise) {
    return <div>Loading Stripe...</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <CardDetailsForm clientSecret={clientSecret} onSuccess={onSuccess} />
    </Elements>
  );
};

// export async function getServerSideProps() {

//   const stripeKey = process.env.STRIPE_PUBLISHABLE_KEY;

//   return {
//     props: {
//       stripeKey,
//     },
//   };
// }

export default PaymentSetup;
