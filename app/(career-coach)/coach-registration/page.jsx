"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
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
  const people = [
    {
      id: 1,
      name: "Wade Cooper",
      profession: "Career Coach",
    },
    {
      id: 2,
      name: "Arlene Mccoy",
      profession: "Health Coach",
    },
    {
      id: 3,
      name: "Devon Webb",
      profession: "Fitness Coach",
    },
    {
      id: 4,
      name: "Tom Cook",
      profession: "Life Coach",
    },
    {
      id: 5,
      name: "Tanya Fox",
      profession: "Business Coach",
    },
    {
      id: 6,
      name: "Hellen Schmidt",
      profession: "Leadership Coach",
    },
    {
      id: 7,
      name: "Caroline Schultz",
      profession: "Relationship Coach",
    },
    {
      id: 8,
      name: "Mason Heaney",
      profession: "Nutrition Coach",
    },
    {
      id: 9,
      name: "Claudie Smitham",
      profession: "Mindfulness Coach",
    },
    {
      id: 10,
      name: "Emil Schaefer",
      profession: "Executive Coach",
    },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [selected, setSelected] = useState(people[3]);

  const handleCoachSignUp = (data)=>{
    console.log("data::",data)
  }

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
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Mobile Number
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="number"
                      placeholder="Mobile No."
                      id="mobile"
                      {...register("mobile", {
                        required: {
                          value: true,
                          message: "Mobile no is required",
                        },
                      })}
                    />
                    <div className="py-1">
                      <p className="text-xs text-red-500">
                        {errors?.mobile?.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
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

                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-800 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                <CheckIcon
                                  aria-hidden="true"
                                  className="h-5 w-5"
                                />
                              </span>
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                    <div className="py-1">
                      <p className="text-xs text-red-500">
                        {errors?.prefession?.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-blue-950 px-3.5 py-2.5 font-semibold leading-7 text-white"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
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
