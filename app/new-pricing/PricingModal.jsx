"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { prices } from '../../constants/prices'

const PricingModal = ({
  isDialogOpen,
  setIsDialogOpen,
  handleCloseAIDialog,
  pricingData,
}) => {

  const [selectedPlan, setSelectedPlan] = useState("monthly"); // Default selection
  const [geoinfo, setGeoInfo] = useState({
    ip: "",
    countryName: "",
    countryCode: "",
    city: "",
    timezone: ""
  });
 

  const [plandata, setPlandata] = useState({
    serviceName: "CV STUDIO",
    currency: "USD",
    sign: "$",
    pricePlan: {
      monthly: 0,
      yearly: 0,
    },
  });


  const getGeoInfo = () => {
    if (!pricingData?.cardTitle) {
      console.warn("No service key available from pricingData");
      return;
    }
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        let currency = data.currency || "USD"; // Fallback to USD if currency is not available
        let serviceKey = pricingData?.cardTitle; // Replace with your logic for selecting the service
        console.log("serviceKey:::",serviceKey)
  
        // Find the correct plan based on currency
        let plan = prices.find((el) => el.name === serviceKey);
        let currencyData = plan.plans[currency] || plan.plans["USD"]; // Fallback to USD if the currency is not available
  
        // Update state with selected plan details
        setPlandata({
          serviceName: serviceKey,
          currency: currency,
          sign: currencyData.sign,
          pricePlan: {
            monthly: currencyData.monthly,
            yearly: currencyData.yearly,
          },
        });
  
        // Update geo information
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

  useEffect(() => {
    if (isDialogOpen && pricingData?.cardTitle) {
      getGeoInfo();
    }
  }, [isDialogOpen, pricingData]);

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };


  console.log("plandata:::",plandata)



  return (
    <>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          className="sm:max-w-[800px]"
          showCloseButton={true}
          onClick={handleCloseAIDialog}
        >
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-3xl my-2">{pricingData?.cardTitle}</h2>
            </DialogTitle>
            <DialogDescription>
              <p>{pricingData?.cardDescription}</p>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="modal_left">
                <div className="modal_list">
                  <ul className="space-y-2 flex-grow">
                    {pricingData?.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <FaCheckCircle
                          className="text-blue-950 mr-2"
                          style={{ minWidth: "15px", minHeight: "15px" }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="modal_right bg-gray-100">
                <div className="">
                  <div className="container px-6 py-8 mx-auto">
                    <p className="text-xl text-center text-gray-500">
                      Choose your plan
                    </p>
                    <h1 className="mt-4 text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
                      Pricing Plan
                    </h1>
                    <div className="mt-6 space-y-8 xl:mt-12">
                      <div
                        className={`max-w-2xl px-8 py-5 mx-auto border cursor-pointer rounded-xl ${
                          selectedPlan === "monthly" ? "border-blue-500" : ""
                        }`}
                        onClick={() => handlePlanChange("monthly")}
                      >
                        <div className="monthly_plan">
                          <div className="flex flex-row justify-between items-center">
                            <div className="subscription-panel-offer-commitment font-bold">
                              Monthly
                            </div>
                            <div className="subscription-panel-offer-commitment font-semibold">
                              {plandata?.sign}{plandata?.pricePlan?.monthly}
                            </div>
                            <input
                              type="checkbox"
                              checked={selectedPlan === "monthly"}
                              onChange={() => handlePlanChange("monthly")}
                              className="ml-4"
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className={`max-w-2xl px-8 py-4 mx-auto border cursor-pointer rounded-xl ${
                          selectedPlan === "yearly" ? "border-blue-500" : ""
                        }`}
                        onClick={() => handlePlanChange("yearly")}
                      >
                        <div className="yearly_plan">
                          <div className="flex flex-row justify-between items-center">
                            <div className="subscription-panel-offer-commitment font-bold">
                              Yearly
                            </div>
                            <div className="subscription-panel-offer-commitment font-semibold">
                            {plandata?.sign}{plandata?.pricePlan?.yearly}
                            </div>
                            <input
                              type="checkbox"
                              checked={selectedPlan === "yearly"}
                              onChange={() => handlePlanChange("yearly")}
                              className="ml-4"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="bg-blue-950 text-white p-2 rounded-md text-sm">
              Buy Now
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PricingModal;
