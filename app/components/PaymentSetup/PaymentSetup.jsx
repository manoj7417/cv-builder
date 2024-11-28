import React, { useState } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
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

        const cardElement = elements.getElement(CardElement);

        // Confirm the Setup Intent
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
            onSuccess(); // Call the success handler
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
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
                    },
                }}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            >
                {loading ? "Processing..." : "Save Card"}
            </button>
        </form>
    );
};

// Wrap the form with Elements provider
const PaymentSetup = ({ clientSecret, onSuccess }) => {
    return (
        <Elements stripe={stripePromise}>
            <CardDetailsForm clientSecret={clientSecret} onSuccess={onSuccess} />
        </Elements>
    );
};

export default PaymentSetup;
