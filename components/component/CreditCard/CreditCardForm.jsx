"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "react-credit-cards-2";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";
import { Input } from "@/components/ui/input";
import 'react-credit-cards-2/dist/es/styles-compiled.css'

const CreditCardForm = ({handlerSubmit,loading,error}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      issuer: "",
    },
  });

  const [focused, setFocused] = useState("");
  const [formData, setFormData] = useState(null);

  const number = watch("number");
  const name = watch("name");
  const expiry = watch("expiry");
  const cvc = watch("cvc");

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setValue("issuer", issuer);
    }
  };

  const onSubmit = (data) => {
    handlerSubmit(data);
    setFormData(data);
    reset(); // Reset the form after submission
  };

  return (
    <div key="Payment" className="max-w-5xl mx-auto rounded-md bg-gray-100 p-10">
      <div className="App-payment p-5 grid lg:grid-cols-2 grid-cols-1">
        <Card
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          callback={handleCallback}
          style={{
            backgroundColor: "#1e293b",
            color: "#fff",
            borderRadius: "12px",
          }}
        />
        <form onSubmit={handleSubmit(onSubmit)} className="px-5 space-y-5">
          <div className="form-group">
            <Input
              type="tel"
              placeholder="Card Number"
              {...register("number", {
                required: "Card number is required",
                validate: (value) =>
                  /^[\d| ]{16,22}$/.test(formatCreditCardNumber(value)) ||
                  "Invalid card number",
              })}
              onChange={(e) => setValue("number", formatCreditCardNumber(e.target.value))}
              onFocus={(e) => setFocused(e.target.name)}
            />
            {errors.number && <p className="text-red-500">{errors.number.message}</p>}
          </div>

          <div className="form-group">
            <Input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              onFocus={(e) => setFocused(e.target.name)}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="flex gap-5">
            <div className="w-[50%]">
              <Input
                type="tel"
                placeholder="Valid Thru"
                {...register("expiry", {
                  required: "Expiration date is required",
                  validate: (value) =>
                    /^\d{2}\/\d{2}$/.test(formatExpirationDate(value)) ||
                    "Invalid expiration date",
                })}
                onChange={(e) => setValue("expiry", formatExpirationDate(e.target.value))}
                onFocus={(e) => setFocused(e.target.name)}
              />
              {errors.expiry && <p className="text-red-500">{errors.expiry.message}</p>}
            </div>

            <div className="w-[50%]">
              <Input
                type="tel"
                placeholder="CVC"
                {...register("cvc", {
                  required: "CVC is required",
                  validate: (value) =>
                    /^\d{3,4}$/.test(formatCVC(value)) || "Invalid CVC",
                })}
                onChange={(e) => setValue("cvc", formatCVC(e.target.value))}
                onFocus={(e) => setFocused(e.target.name)}
              />
              {errors.cvc && <p className="text-red-500">{errors.cvc.message}</p>}
            </div>
          </div>

          <Input type="hidden" {...register("issuer")} />

          <div className="form-actions">
            <button className="btn btn-primary btn-block">PAY</button>
          </div>
        </form>
        {/* {formData && (
          <div className="App-highlight">
            {formatFormData(formData).map((d, i) => (
              <div key={i}>{d}</div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CreditCardForm;
