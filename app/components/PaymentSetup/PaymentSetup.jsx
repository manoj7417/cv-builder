import React, { useState } from "react";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

if (typeof window !== "undefined") {
  stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}

const CardDetailsForm = ({ clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) {
      setError("Stripe is not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

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
      <div>
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
        className="bg-blue-900 text-white px-4 py-2 rounded mt-4 w-full"
      >
        {loading ? "Processing..." : "Save Card"}
      </button>
    </form>
  );
};

const PaymentSetup = ({ clientSecret, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <CardDetailsForm clientSecret={clientSecret} onSuccess={onSuccess} />
    </Elements>
  );
};

export default PaymentSetup;
