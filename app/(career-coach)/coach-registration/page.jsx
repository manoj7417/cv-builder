"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";

export default function CoachRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const goToNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const goToPreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);


  const people = [
    { id: 1, name: "Wade Cooper", profession: "Career Coach" },
    { id: 2, name: "Arlene Mccoy", profession: "Health Coach" },
    { id: 3, name: "Devon Webb", profession: "Fitness Coach" },
    { id: 4, name: "Tom Cook", profession: "Life Coach" },
    { id: 5, name: "Tanya Fox", profession: "Business Coach" },
    { id: 6, name: "Hellen Schmidt", profession: "Leadership Coach" },
    { id: 7, name: "Caroline Schultz", profession: "Relationship Coach" },
    { id: 8, name: "Mason Heaney", profession: "Nutrition Coach" },
    { id: 9, name: "Claudie Smitham", profession: "Mindfulness Coach" },
    { id: 10, name: "Emil Schaefer", profession: "Executive Coach" },
  ];
  const categories = [
    "Personal Development",
    "Professional Growth",
    "Health & Wellness",
    "Leadership",
    "Career Guidance",
  ];

  const coachingTypes = [
    "One-on-One",
    "Group Sessions",
    "Workshops",
    "Online Courses",
  ];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [selected, setSelected] = useState(people[3]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  // const [selectedCoachingTypes, setSelectedCoachingTypes] = useState([]);
  const [selectedCoachingType, setSelectedCoachingType] = useState("");
  const [image, setImage] = useState(null);

  const handleCoachSignUp = (data) => {
    console.log("data::", data);
    if (image) {
      console.log("Uploaded image:", image);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const [description, setDescription] = useState("");
  const currencies = ["USD", "EUR", "GBP", "INR"];

  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");

  const [phoneNumber, setPhoneNumber] = useState("");

  /******************************* */
  const [socialLinks, setSocialLinks] = useState([{ name: "", link: "" }]);

  const handleAddLink = () => {
    setSocialLinks([...socialLinks, { name: "", link: "" }]);
  };

  const handleRemoveLink = (index) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  };
  /******************************* */
  /*********************************** */
  const [desc, setDesc] = useState("");
  /*********************************** */
  return (
    <section className="max-w-7xl mx-auto my-20">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Coach Registration
            </h2>
            <form onSubmit={handleSubmit(handleCoachSignUp)} className="mt-8">
              <div className="space-y-5">
              {currentStep === 1 && (
                <div id="Step1">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900"
                    >
                      Full Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Full Name"
                        id="name"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "Name is required",
                          },
                        })}
                      />
                      <div className="py-1">
                        <p className="text-xs text-red-500">
                          {errors?.name?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Profile Picture */}
                  <div>
                    <label
                      htmlFor="image"
                      className="text-base font-medium text-gray-900"
                    >
                      Profile Picture
                    </label>
                    <div className="mt-2">
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file:bg-transparent file:border file:border-gray-300 file:rounded-md file:px-3 file:py-2 file:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      />
                      {image && (
                        <img
                          src={image}
                          alt="Preview"
                          className="mt-2 h-20 w-20 object-cover rounded-md"
                        />
                      )}
                    </div>
                  </div>
                  {/* Email address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      Email address{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        id="email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email is required",
                          },
                        })}
                      />
                      <div className="py-1">
                        <p className="text-xs text-red-500">
                          {errors?.email?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        id="password"
                        {...register("password", {
                          required: {
                            value: true,
                            message: "Password is required",
                          },
                        })}
                      />
                      <div className="py-1">
                        <p className="text-xs text-red-500">
                          {errors?.password?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Select Profession */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="profession"
                        className="text-base font-medium text-gray-900"
                      >
                        Select Profession
                      </label>
                    </div>
                    <div className="mt-2">
                      <Listbox
                        value={selected}
                        onChange={(value) => {
                          setSelected(value);
                          setValue("profession", value.profession); // Register the selected value in React Hook Form
                        }}
                      >
                        <div className="relative mt-2">
                          <ListboxButton className="relative h-10 w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                              <span className="ml-3 block truncate">
                                {selected.profession}
                              </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                              <ChevronUpDownIcon
                                aria-hidden="true"
                                className="h-5 w-5 text-gray-400"
                              />
                            </span>
                          </ListboxButton>

                          <ListboxOptions
                            transition
                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                          >
                            {people.map((person) => (
                              <ListboxOption
                                key={person.id}
                                value={person}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-800 data-[focus]:text-white"
                              >
                                <div className="flex items-center">
                                  <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                    {person.profession}
                                  </span>
                                </div>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-800 group-data-[selected]:data-[focus]:text-blue-900">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                  {/* Bio Info */}
                  <div>
                    <label
                      htmlFor="bio"
                      className="text-base font-medium text-gray-900"
                    >
                      Bio Info
                    </label>
                    <div className="mt-2">
                      <textarea
                        className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        placeholder="Tell us about yourself"
                        id="bio"
                        {...register("bio")}
                      />
                    </div>
                  </div>
                </div>
                )}
                {currentStep === 2 && (
                <div id="Step2">
                  {/* Bank Account Number */}
                  <div>
                    <label
                      htmlFor="accountNumber"
                      className="text-base font-medium text-gray-900"
                    >
                      Bank Account Number
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Account Number"
                        id="accountNumber"
                        {...register("bankDetails.accountNumber")}
                      />
                    </div>
                  </div>
                  {/* Bank Code */}
                  <div>
                    <label
                      htmlFor="bankCode"
                      className="text-base font-medium text-gray-900"
                    >
                      Bank Code
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Bank Code"
                        id="bankCode"
                        {...register("bankDetails.bankCode")}
                      />
                    </div>
                  </div>
                  {/* Categories Dropdown */}
                  <div>
                    <label
                      htmlFor="category"
                      className="text-base font-medium text-gray-900"
                    >
                      Select Category
                    </label>
                    <div className="mt-2">
                      <Listbox
                        value={selectedCategory}
                        onChange={(value) => {
                          setSelectedCategory(value);
                          setValue("category", value); // Register the selected value in React Hook Form
                        }}
                      >
                        <div className="relative mt-2">
                          <ListboxButton className="relative h-10 w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                              <span className="ml-3 block truncate">
                                {selectedCategory}
                              </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                              <ChevronUpDownIcon
                                aria-hidden="true"
                                className="h-5 w-5 text-gray-400"
                              />
                            </span>
                          </ListboxButton>

                          <ListboxOptions
                            transition
                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                          >
                            {categories.map((category, index) => (
                              <ListboxOption
                                key={index}
                                value={category}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-800 data-[focus]:text-white"
                              >
                                <div className="flex items-center">
                                  <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                    {category}
                                  </span>
                                </div>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-800 group-data-[selected]:data-[focus]:text-blue-900">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </div>
                      </Listbox>
                    </div>
                  </div>

                  {/* Coaching Type select */}
                  <div>
                    <label
                      htmlFor="coaching-types"
                      className="text-base font-medium text-gray-900"
                    >
                      Coaching Types
                    </label>
                    <div className="mt-2">
                      <Listbox
                        as="div"
                        value={selectedCoachingType}
                        onChange={(value) => setSelectedCoachingType(value)}
                      >
                        <div className="relative mt-2">
                          <Listbox.Button className="relative h-10 w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                              <span className="ml-3 block truncate">
                                {selectedCoachingType
                                  ? selectedCoachingType
                                  : "Select Coaching Type"}
                              </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                              <ChevronUpDownIcon
                                aria-hidden="true"
                                className="h-5 w-5 text-gray-400"
                              />
                            </span>
                          </Listbox.Button>

                          <Listbox.Options
                            transition
                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                          >
                            {coachingTypes.map((type) => (
                              <Listbox.Option
                                key={type}
                                value={type}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9"
                              >
                                {({ active, selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected
                                          ? "font-semibold"
                                          : "font-normal"
                                      }`}
                                    >
                                      {type}
                                    </span>

                                    {selected && (
                                      <span
                                        className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                          active
                                            ? "text-indigo-600"
                                            : "text-indigo-600"
                                        }`}
                                      >
                                        <CheckIcon className="h-5 w-5" />
                                      </span>
                                    )}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                  {/* Coaching Description */}
                  <div>
                    <label
                      htmlFor="coaching-description"
                      className="block text-base font-medium text-gray-900"
                    >
                      Coaching Description
                    </label>
                    <textarea
                      id="coaching-description"
                      name="coaching-description"
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-2 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Provide a detailed description of the coaching services offered..."
                    />
                  </div>
                  {/* Rate per Hour */}
                  <div>
                    <label
                      htmlFor="amount"
                      className="text-base font-medium text-gray-900"
                    >
                      Rate per Hour
                    </label>
                    <div className="mt-2 space-y-2">
                      <div>
                        <label
                          htmlFor="amount"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Amount
                        </label>
                        <input
                          id="amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="currency"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Currency
                        </label>
                        <select
                          id="currency"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          {currencies.map((curr) => (
                            <option key={curr} value={curr}>
                              {curr}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                )}
                {currentStep === 3 && (
                  <>
                   <div id="Step3">
                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="text-base font-medium text-gray-900"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter phone number"
                    />
                  </div>
                  {/* Social Links */}
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Social Links
                    </label>
                    {socialLinks.map((link, index) => (
                      <div
                        key={index}
                        className="mt-2 flex items-center space-x-2"
                      >
                        <input
                          type="text"
                          value={link.name}
                          onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                          }
                          placeholder="Social Media Name"
                          className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <input
                          type="url"
                          value={link.link}
                          onChange={(e) =>
                            handleChange(index, "link", e.target.value)
                          }
                          placeholder="Social Media URL"
                          className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddLink}
                      className="mt-2 inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-white shadow-sm hover:bg-indigo-600"
                    >
                      Add Link
                    </button>
                  </div>
                  {/* Description Field */}
                  <div>
                    {/* Description Field */}
                    <div className="mt-4">
                      <label
                        htmlFor="description"
                        className="text-base font-medium text-gray-900"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Enter description here"
                        rows="4"
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="group mt-8 inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-blue-600 ring-offset-1 transition-all hover:bg-blue-700 hover:ring-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
                >
                  Register{" "}
                  <ArrowRight className="ml-3 h-5 w-5 transition-all group-hover:translate-x-1" />
                </button>
                  </>
               
)}
                {/*  */}
                <div className="flex justify-between mt-4">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={goToPreviousStep}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-500 border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Previous
          </button>
        )}
        {currentStep < 3 && (
          <button
            type="button"
            onClick={goToNextStep}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Next
          </button>
        )}
      </div>
                {/*  */}
              </div>
            </form>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
