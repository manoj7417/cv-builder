"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { GetTokens } from "../actions";
import { AddCreditData } from "@/constants/prices";
import { useUserStore } from "../store/UserStore";
import { toast } from "react-toastify";

export default function AddCreditPage() {
  const [loadingStates, setLoadingStates] = useState({});
  const plans = [
    {
      name: "CVCreator",
      defaultPrice: AddCreditData.CVCreator.GBP?.price,
      features: ["Get 20 additional CV downloads in PDF formats"],
    },
    {
      name: "CVOptimiser",
      defaultPrice: AddCreditData.CVCreator.GBP?.price,
      features: ["Scan your CV 20 additional times through the optimiser"],
    },
    {
      name: "CVMatch",
      defaultPrice: AddCreditData.CVCreator.GBP?.price,
      features: ["Create 20 CVs with the help of AI"],
    },
  ];

  const [geoinfo, setGeoInfo] = useState({
    ip: "",
    countryName: "",
    countryCode: "",
    city: "",
    timezone: "",
    currency: "USD",
  });

  const { userdata } = useUserStore((state) => state.userState);

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        let currency = data.currency || "GBP";
        setGeoInfo({
          ...geoinfo,
          ip: data.ip,
          countryName: data.country_name,
          countryCode: data.country_calling_code,
          city: data.city,
          timezone: data.timezone,
          currency: currency,
        });
      })
      .catch((error) => {
        console.error("Error fetching geo information:", error);
      });
  };

  const getPriceForPlan = (planName) => {
    const currency = geoinfo.currency;
    const planData = AddCreditData[planName];
    if (planData) {
      const currencyData = planData[currency] || planData["GBP"];
      const { price, symbol } = currencyData;
      return `${symbol} ${price}`;
    }

    return `${currency} ${
      plans.find((plan) => plan.name === planName).defaultPrice
    }`;
  };

  const handleAddMoreCredits = async (serviceName) => {
    const { accessToken } = await GetTokens();
    const amount = getPriceForPlan(serviceName);
    const data = {
      email: userdata.email,
      success_url: "https://geniescareerhub.com/paymentSuccess",
      cancel_url: window.location.href,
      currency: geoinfo.currency,
      serviceName,
      credits: 20,
      amount: +amount.split(" ")[1],
    };
    setLoadingStates((prev) => ({ ...prev, [serviceName]: true }));
    try {
      const response = await axios.post("/api/addcredits", data, {
        headers: {
          Authorization: "Bearer " + accessToken.value,
        },
      });
      if (response.status === 200) {
        window.location = response.data.url;
      }
    } catch (error) {
      toast.error("Error while adding credits");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [serviceName]: false }));
    }
  };

  useEffect(() => {
    getGeoInfo();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-2 md:px-4 pt-20">
      <div>
        {/* Hero Section */}
        <div className="flex flex-col space-y-8 pb-10 pt-12 text-center md:pt-24">
          <p className="text-3xl font-bold text-blue-900 md:text-5xl md:leading-10">
            ADD CREDITS, CONTINUE GROWING
          </p>
          <p className="mx-auto max-w-3xl text-base text-gray-600 md:text-xl">
            To continue availing of the Genies Pro Suite, you need to add more
            credits. Select the best plan depending on your requirements.
          </p>
        </div>
        <div className="mt-8 w-full space-y-4 md:mt-12">
          <div className="grid space-y-8 lg:grid-cols-3 lg:space-x-8 lg:space-y-0">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className=" rounded-2xl border border-gray-200 bg-white shadow"
              >
                <div className="flex w-full flex-col justify-start space-y-4 px-8 pt-10">
                  <p className="text-4xl font-bold leading-10 text-blue-900">
                    {plan.price}
                  </p>
                  <div className="flex w-full flex-col items-start justify-start space-y-1">
                    <p className="w-full text-2xl font-semibold leading-loose text-blue-900">
                      {plan.name}
                    </p>
                    <p className="w-full text-2xl font-semibold leading-loose text-blue-900">
                      {getPriceForPlan(plan.name)}
                    </p>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start justify-start px-8 pb-10 pt-8">
                  <div className="flex w-full flex-col space-y-4">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="inline-flex w-full space-x-3"
                      >
                        <div className="flex items-center justify-center rounded-full bg-gray-100 p-1">
                          <Check className="h-4 w-4 text-blue-900" />
                        </div>
                        <p className="w-full text-base leading-normal text-gray-800">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex w-full flex-col px-8 pb-8">
                  <div className="flex w-full flex-col items-start justify-start space-y-3">
                    <Button
                      type="button"
                      className="w-full rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                      onClick={() => handleAddMoreCredits(plan.name)}
                      disabled={loadingStates[plan.name]}
                    >
                      {loadingStates[plan.name] ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                          </svg>
                          Loading...
                        </span>
                      ) : (
                        "Add Credit"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
