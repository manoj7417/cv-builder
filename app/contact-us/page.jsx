/** @format */

"use client";

import Image from "next/image";
import React, { useState } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";
import axios from "axios";
const locations = [
  {
    title: "Head office",
    timings: "Mon-Sat 9am to 5pm.",
    address: "The Career Genies Group UK LTD ,124 City Road,London,EC1V 2NX",
    contactNo: "0203 476 7492",
  },
  // {
  //   title: "India office",
  //   timings: "Mon-Sat 9am to 5pm.",
  //   address: "​​Jumpstart Tower, 2nd floor, Haridwar Bypass Rd, opp. Nilaya Hills, Saraswati Vihar, Ajabpur Kalan, Dehradun, Uttarakhand 248001.",
  //   contactNo: "9084712325"
  // }
];

export default function ContactPageTwo() {
  const [isLoading, setIsLoading] = useState(false);
  const [messageData, setMessageData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const checkFields = () => {
    for (const [key, value] of Object.entries(messageData)) {
      if (!value.trim()) {
        return true;
      }
    }
    return false;
  };

  const handleSendMessage = async () => {
    setIsLoading(true);
    if (checkFields()) {
      setIsLoading(false);
      return toast.error("Please fill all fields");
    }

    try {
      const response = await axios.post("/api/sendMessage", {
        message: messageData,
      });
      if (response.status === 200) {
        toast.success("Message sent successfully");
        setMessageData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageDataChange = (e) => {
    setMessageData({ ...messageData, [e.target.name]: e.target.value });
  };

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Organization",
    url: "https://www.geniescareerhub.com/",
    logo: "https://geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
    name: "geniescareerhub.com",
    description:
      "Genies Career Hub creates your resume in an easy going process. We provide more than 23+ professional approved ATS-friendly resume templates and features like CV Creator, CV Optimiser and CV Match. Additionally, our new features of Psychometric Test with incorporating AI and Career Coach feature providing best expertise in creating professional resumes.",
  };

  return (
    <div>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* <Header /> */}
      <div className='mx-auto max-w-7xl pt-14'>
        <div className='mx-auto max-w-7xl py-12 md:py-24'>
          <div className='grid items-center justify-items-center gap-x-4 gap-y-10  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'>
            <div className='flex items-center justify-center w-full'>
              <div className='px-2 md:px-5 w-full m-10 sm:m-10 md:m-0 lg:m-1 xl:m-0 2xl:m-0'>
                <h1 className='text-2xl sm:text-3xl font-bold text-blue-800 md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl'>
                  Get in touch
                </h1>
                <h2 className='mt-4 text-sm sm:text-lg md:text-lg xl:text-lg 2xl:text-lg text-gray-600'>
                  Our team would love to hear from you!
                </h2>
                <form action='' className='mt-8 space-y-4'>
                  <div className='grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2'>
                    <div className='grid w-full  items-center gap-1.5'>
                      <label
                        className='text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        htmlFor='first_name'>
                        First Name
                      </label>
                      <Input
                        type='text'
                        id='first_name'
                        placeholder='First Name'
                        value={messageData.firstName}
                        name='firstName'
                        onChange={handleMessageDataChange}
                      />
                    </div>
                    <div className='grid w-full  items-center gap-1.5'>
                      <label
                        className='text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        htmlFor='last_name'>
                        Last Name
                      </label>
                      <Input
                        type='text'
                        id='last_name'
                        placeholder='Last Name'
                        value={messageData.lastName}
                        name='lastName'
                        onChange={handleMessageDataChange}
                      />
                    </div>
                  </div>
                  <div className='grid w-full  items-center gap-1.5'>
                    <label
                      className='text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      htmlFor='email'>
                      Email
                    </label>
                    <Input
                      type='text'
                      id='email'
                      placeholder='Email'
                      name='email'
                      value={messageData.email}
                      onChange={handleMessageDataChange}
                    />
                  </div>
                  <div className='grid w-full  items-center gap-1.5'>
                    <label
                      className='text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      htmlFor='phone_number'>
                      Phone number
                    </label>
                    <Input
                      type='tel'
                      id='phone_number'
                      placeholder='Phone number'
                      name='phone'
                      value={messageData.phone}
                      onChange={handleMessageDataChange}
                    />
                  </div>
                  <div className='grid w-full  items-center gap-1.5'>
                    <label
                      className='text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      htmlFor='message'>
                      Message
                    </label>
                    <Textarea
                      className='flex h-10 w-full'
                      id='message'
                      placeholder='Leave us a message'
                      cols={3}
                      name='message'
                      value={messageData.message}
                      onChange={handleMessageDataChange}
                    />
                  </div>
                  <Button
                    type='button'
                    className='w-full rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black items-center flex'
                    onClick={handleSendMessage}
                    disabled={isLoading}>
                    {isLoading ? (
                      <>
                        Sending{" "}
                        <ImSpinner3 className='animate-spin w-4 h-4 ml-1' />
                      </>
                    ) : (
                      <>Send Message</>
                    )}
                  </Button>
                </form>
              </div>
            </div>
            <Image
              priority="true"
              alt='Contact us'
              className='hidden sm:hidden md:block lg:block xl:block 2xl:block'
              src='/contact-us.jpg'
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
      <div className='rounded-lg bg-gray-100'>
        <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <div className='py-20'>
            <div className='grid grid-cols-1 gap-x-20 gap-y-8 lg:grid-cols-2'>
              <div className='space-y-4'>
                <p className='w-full text-4xl font-bold text-gray-900'>
                  Our Offices
                </p>
                <p className='w-full text-lg text-gray-600'>
                  Find us at these locations.
                </p>
              </div>
              <div className='space-y-4 divide-y-2'>
                {locations.map((location) => (
                  <div
                    key={location.title}
                    className='flex flex-col space-y-2 pt-4 first:pt-0 lg:w-full'>
                    <p className='w-full text-xl font-semibold  text-gray-900'>
                      {location.title}
                    </p>
                    <p className='w-full text-base  text-gray-600'>
                      {location.timings}
                    </p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {location.address}
                    </p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {location.contactNo}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
