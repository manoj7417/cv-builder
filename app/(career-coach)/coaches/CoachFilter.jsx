/** @format */

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { FaStar } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";
import { LuUser2 } from "react-icons/lu";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
];

const subCategories = [
  { name: "Devon Lane", href: "#" },
  { name: "Darrell Steward", href: "#" },
  { name: "Jane Cooper", href: "#" },
  { name: "Albert Flores", href: "#" },
];

const filters = [
  {
    id: "coachCourses",
    name: "Coach Courses",
    options: [
      { value: "javascript", label: "JavaScript", checked: false },
      { value: "react", label: "React", checked: false },
      { value: "nextjs", label: "Next.js", checked: false },
      { value: "mobile", label: "Mobile", checked: false },
      { value: "uxui", label: "UX/UI", checked: false },
      { value: "fullstack", label: "Full Stack", checked: false },
      { value: "data", label: "Data Science", checked: false },
      { value: "devops", label: "DevOps", checked: false },
      { value: "cybersecurity", label: "Cybersecurity", checked: false },
      { value: "cloud", label: "Cloud", checked: false },
      { value: "ml", label: "Machine Learning", checked: false },
      { value: "ai", label: "AI", checked: false },
      { value: "backend", label: "Backend", checked: false },
      { value: "software", label: "Software Architecture", checked: false },
      { value: "database", label: "Database", checked: false },
      { value: "network", label: "Network", checked: false },
      { value: "system", label: "System Administration", checked: false },
      { value: "blockchain", label: "Blockchain", checked: false },
    ],
  },
  {
    id: "coachProfile",
    name: "Coach Job Profile",
    options: [
      { value: "web", label: "Web Developer", checked: false },
      { value: "react", label: "React Native Developer", checked: false },
      { value: "mobile", label: "Mobile Developer", checked: false },
      { value: "javascript", label: "JavaScript Developer", checked: false },
      { value: "uxui", label: "UX/UI Designer", checked: false },
      { value: "fullstack", label: "Full Stack Developer", checked: false },
      { value: "data", label: "Data Scientist", checked: false },
      { value: "devops", label: "DevOps Engineer", checked: false },
      {
        value: "cybersecurity",
        label: "Cybersecurity Specialist",
        checked: false,
      },
      { value: "cloud", label: "Cloud Architect", checked: false },
      { value: "ml", label: "Machine Learning Engineer", checked: false },
      { value: "ai", label: "AI Researcher", checked: false },
      { value: "backend", label: "Backend Developer", checked: false },
      { value: "software", label: "Software Architect", checked: false },
      { value: "database", label: "Database Administrator", checked: false },
      { value: "network", label: "Network Engineer", checked: false },
      { value: "system", label: "System Administrator", checked: false },
      { value: "blockchain", label: "Blockchain Developer", checked: false },
    ],
  },
  {
    id: "rating",
    name: "Coach Rating",
    options: [
      { value: "4.7", label: "4.7", checked: false },
      { value: "4.8", label: "4.8", checked: false },
      { value: "4.9", label: "4.9", checked: false },
      { value: "5.0", label: "5.0", checked: true },
    ],
  },
];

// const coaches = [
//   {
//     id: 1,
//     name: "Devon Lane",
//     jobProfile: {
//       title: "Web Developer",
//       backgroundColor: "bg-blue-100",
//       textColor: "text-blue-800",
//     },
//     href: "#",
//     imageSrc: "/coach-1.png",
//     rating: "5.0",
//     students: "265.7k",
//     price: "$49",
//   },
//   {
//     id: 2,
//     name: "Darrell Steward",
//     jobProfile: {
//       title: "React Native Developer",
//       backgroundColor: "bg-green-100",
//       textColor: "text-green-800",
//     },
//     href: "#",
//     imageSrc: "/coach-2.png",
//     rating: "4.9",
//     students: "265.7k",
//     price: "$49",
//   },
//   {
//     id: 3,
//     name: "Jane Cooper",
//     jobProfile: {
//       title: "Mobile Developer",
//       backgroundColor: "bg-purple-100",
//       textColor: "text-purple-800",
//     },
//     href: "#",
//     imageSrc: "/coach-3.png",
//     rating: "5.0",
//     students: "265.7k",
//     price: "$49",
//   },
//   {
//     id: 4,
//     name: "Albert Flores",
//     jobProfile: {
//       title: "Javascript Developer",
//       backgroundColor: "bg-yellow-100",
//       textColor: "text-yellow-800",
//     },
//     href: "#",
//     imageSrc: "/coach-4.png",
//     rating: "5.0",
//     students: "265.7k",
//     price: "$49",
//   },
//   {
//     id: 5,
//     name: "Leslie Alexander",
//     jobProfile: {
//       title: "UX/UI Designer",
//       backgroundColor: "bg-blue-100",
//       textColor: "text-blue-800",
//     },
//     href: "#",
//     imageSrc: "/coach-5.png",
//     rating: "4.8",
//     students: "145.3k",
//     price: "$49",
//   },
//   {
//     id: 6,
//     name: "Wade Warren",
//     jobProfile: {
//       title: "Full Stack Developer",
//       backgroundColor: "bg-red-100",
//       textColor: "text-red-800",
//     },
//     href: "#",
//     imageSrc: "/coach-1.png",
//     rating: "4.9",
//     students: "320.1k",
//     price: "$49",
//   },
//   {
//     id: 7,
//     name: "Kristin Watson",
//     jobProfile: {
//       title: "Data Scientist",
//       backgroundColor: "bg-teal-100",
//       textColor: "text-teal-800",
//     },
//     href: "#",
//     imageSrc: "/coach-2.png",
//     rating: "5.0",
//     students: "180.2k",
//     price: "$49",
//   },
//   {
//     id: 8,
//     name: "Cameron Williamson",
//     jobProfile: {
//       title: "DevOps Engineer",
//       backgroundColor: "bg-orange-100",
//       textColor: "text-orange-800",
//     },
//     href: "#",
//     imageSrc: "/coach-3.png",
//     rating: "4.7",
//     students: "210.4k",
//     price: "$49",
//   },
//   {
//     id: 9,
//     name: "Courtney Henry",
//     jobProfile: {
//       title: "Cybersecurity Specialist",
//       backgroundColor: "bg-indigo-100",
//       textColor: "text-indigo-800",
//     },
//     href: "#",
//     imageSrc: "/coach-4.png",
//     rating: "4.8",
//     students: "170.8k",
//     price: "$49",
//   },
//   {
//     id: 10,
//     name: "Brooklyn Simmons",
//     jobProfile: {
//       title: "Cloud Architect",
//       backgroundColor: "bg-gray-100",
//       textColor: "text-gray-800",
//     },
//     href: "#",
//     imageSrc: "/coach-5.png",
//     rating: "4.9",
//     students: "140.5k",
//     price: "$49",
//   },
//   {
//     id: 11,
//     name: "Darlene Robertson",
//     jobProfile: {
//       title: "Machine Learning Engineer",
//       backgroundColor: "bg-cyan-100",
//       textColor: "text-cyan-800",
//     },
//     href: "#",
//     imageSrc: "/coach-6.png",
//     rating: "4.8",
//     students: "195.2k",
//     price: "$59",
//   },
//   {
//     id: 12,
//     name: "Ronald Richards",
//     jobProfile: {
//       title: "AI Researcher",
//       backgroundColor: "bg-pink-100",
//       textColor: "text-pink-800",
//     },
//     href: "#",
//     imageSrc: "/coach-7.png",
//     rating: "5.0",
//     students: "175.3k",
//     price: "$69",
//   },
//   {
//     id: 13,
//     name: "Jerome Bell",
//     jobProfile: {
//       title: "Backend Developer",
//       backgroundColor: "bg-lime-100",
//       textColor: "text-lime-800",
//     },
//     href: "#",
//     imageSrc: "/coach-8.png",
//     rating: "4.9",
//     students: "220.6k",
//     price: "$49",
//   },
//   {
//     id: 14,
//     name: "Kathryn Murphy",
//     jobProfile: {
//       title: "Software Architect",
//       backgroundColor: "bg-amber-100",
//       textColor: "text-amber-800",
//     },
//     href: "#",
//     imageSrc: "/coach-1.png",
//     rating: "5.0",
//     students: "160.8k",
//     price: "$89",
//   },
//   {
//     id: 15,
//     name: "Annette Black",
//     jobProfile: {
//       title: "Database Administrator",
//       backgroundColor: "bg-emerald-100",
//       textColor: "text-emerald-800",
//     },
//     href: "#",
//     imageSrc: "/coach-2.png",
//     rating: "4.8",
//     students: "210.2k",
//     price: "$49",
//   },
//   {
//     id: 16,
//     name: "Jacob Jones",
//     jobProfile: {
//       title: "Network Engineer",
//       backgroundColor: "bg-violet-100",
//       textColor: "text-violet-800",
//     },
//     href: "#",
//     imageSrc: "/coach-3.png",
//     rating: "5.0",
//     students: "140.9k",
//     price: "$59",
//   },
//   {
//     id: 17,
//     name: "Arlene McCoy",
//     jobProfile: {
//       title: "System Administrator",
//       backgroundColor: "bg-rose-100",
//       textColor: "text-rose-800",
//     },
//     href: "#",
//     imageSrc: "/coach-4.png",
//     rating: "4.7",
//     students: "180.3k",
//     price: "$49",
//   },
//   {
//     id: 18,
//     name: "Esther Howard",
//     jobProfile: {
//       title: "Cloud Engineer",
//       backgroundColor: "bg-fuchsia-100",
//       textColor: "text-fuchsia-800",
//     },
//     href: "#",
//     imageSrc: "/coach-5.png",
//     rating: "4.9",
//     students: "150.7k",
//     price: "$69",
//   },
//   {
//     id: 19,
//     name: "Guy Hawkins",
//     jobProfile: {
//       title: "Blockchain Developer",
//       backgroundColor: "bg-red-100",
//       textColor: "text-red-800",
//     },
//     href: "#",
//     imageSrc: "/coach-6.png",
//     rating: "5.0",
//     students: "130.5k",
//     price: "$79",
//   },
//   {
//     id: 20,
//     name: "Eleanor Pena",
//     jobProfile: {
//       title: "Cybersecurity Analyst",
//       backgroundColor: "bg-blue-100",
//       textColor: "text-blue-800",
//     },
//     href: "#",
//     imageSrc: "/coach-7.png",
//     rating: "4.8",
//     students: "165.4k",
//     price: "$49",
//   },
//   {
//     id: 21,
//     name: "Guy Hawkins",
//     jobProfile: {
//       title: "Next.js Developer",
//       backgroundColor: "bg-red-100",
//       textColor: "text-red-800",
//     },
//     href: "#",
//     imageSrc: "/coach-6.png",
//     rating: "5.0",
//     students: "130.5k",
//     price: "$79",
//   },
//   {
//     id: 20,
//     name: "Eleanor Pena",
//     jobProfile: {
//       title: "UX/UI",
//       backgroundColor: "bg-blue-100",
//       textColor: "text-blue-800",
//     },
//     href: "#",
//     imageSrc: "/coach-7.png",
//     rating: "4.8",
//     students: "165.4k",
//     price: "$49",
//   },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CoachFilter({ coaches, handleCoachDetails }) {
  const ITEMS_PER_PAGE = 6;
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  //Filter Func
  const [selectedFilters, setSelectedFilters] = useState({
    coachCourses: [],
    coachProfile: [],
    rating: [],
  });

  const handleFilterChange = (sectionId, value, isChecked) => {
    setSelectedFilters((prevState) => {
      const updatedFilters = [...prevState[sectionId]];
      if (isChecked) {
        updatedFilters.push(value);
      } else {
        const index = updatedFilters.indexOf(value);
        if (index > -1) {
          updatedFilters.splice(index, 1);
        }
      }
      return { ...prevState, [sectionId]: updatedFilters };
    });
  };

  const filteredCoaches = coaches.filter((coach) => {
    const courseMatch =
      selectedFilters.coachCourses.length === 0 ||
      selectedFilters.coachCourses.some((course) =>
        coach.jobProfile.title.toLowerCase().includes(course)
      );
    const profileMatch =
      selectedFilters.coachProfile.length === 0 ||
      selectedFilters.coachProfile.some((profile) =>
        coach.jobProfile.title.toLowerCase().includes(profile)
      );
    const ratingMatch =
      selectedFilters.rating.length === 0 ||
      selectedFilters.rating.includes(coach.rating);
    return courseMatch && profileMatch && ratingMatch;
  });

  //Filter Func

  //Pagination Functionality
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredCoaches.length / ITEMS_PER_PAGE);

  // Get the items for the current page
  const currentPageData = filteredCoaches.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  //Next page func
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  //Prev page func
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Generate Total Pages
  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  //Pagination Functionality

  return (
    <>
      <div className='bg-white'>
        <div>
          {/* Mobile filter dialog */}
          <Dialog
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
            className='relative z-40 lg:hidden'>
            <DialogBackdrop
              transition
              className='fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
            />

            <div className='fixed inset-0 z-40 flex'>
              <DialogPanel
                transition
                className='relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full'>
                <div className='flex items-center justify-between px-4'>
                  <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                  <button
                    type='button'
                    onClick={() => setMobileFiltersOpen(false)}
                    className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'>
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon aria-hidden='true' className='h-6 w-6' />
                  </button>
                </div>

                {/* Filters */}
                <form className='mt-4 border-t border-gray-200'>
                  <h3 className='sr-only'>Categories</h3>
                  <ul
                    role='list'
                    className='px-2 py-3 font-medium text-gray-900'>
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className='block px-2 py-3'>
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as='div'
                      className='border-t border-gray-200 px-4 py-6'>
                      <h3 className='-mx-2 -my-3 flow-root'>
                        <DisclosureButton className='group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                          <span className='font-medium text-gray-900'>
                            {section.name}
                          </span>
                          <span className='ml-6 flex items-center'>
                            <PlusIcon
                              aria-hidden='true'
                              className='h-5 w-5 group-data-[open]:hidden'
                            />
                            <MinusIcon
                              aria-hidden='true'
                              className='h-5 w-5 [.group:not([data-open])_&]:hidden'
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className='pt-6'>
                        <div className='space-y-6'>
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className='flex items-center'>
                              <input
                                defaultValue={option.value}
                                defaultChecked={option.checked}
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type='checkbox'
                                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className='ml-3 min-w-0 flex-1 text-gray-500'>
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24'>
              <h1 className='2xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold tracking-tight text-gray-900'>
                Best Coaches
              </h1>

              <div className='flex items-center'>
                <Menu as='div' className='relative inline-block text-left'>
                  <div>
                    <MenuButton className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
                      Sort
                      <ChevronDownIcon
                        aria-hidden='true'
                        className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'>
                    <div className='py-1'>
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                            )}>
                            {option.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type='button'
                  className='-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7'>
                  <span className='sr-only'>View grid</span>
                  <Squares2X2Icon aria-hidden='true' className='h-5 w-5' />
                </button>
                <button
                  type='button'
                  onClick={() => setMobileFiltersOpen(true)}
                  className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'>
                  <span className='sr-only'>Filters</span>
                  <FunnelIcon aria-hidden='true' className='h-5 w-5' />
                </button>
              </div>
            </div>

            <section aria-labelledby='products-heading' className='pb-24 pt-6'>
              <h2 id='products-heading' className='sr-only'>
                Products
              </h2>

              <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 sticky top-0'>
                {/* Filters */}
                <form className='hidden lg:block'>
                  {/* <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                  >
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href}>{category.name}</a>
                      </li>
                    ))}
                  </ul> */}

                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as='div'
                      className='border-b border-gray-200 py-6'>
                      <h3 className='-my-3 flow-root'>
                        <DisclosureButton className='group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'>
                          <span className='font-medium text-gray-900'>
                            {section.name}
                          </span>
                          <span className='ml-6 flex items-center'>
                            <PlusIcon
                              aria-hidden='true'
                              className='h-5 w-5 group-data-[open]:hidden'
                            />
                            <MinusIcon
                              aria-hidden='true'
                              className='h-5 w-5 [.group:not([data-open])_&]:hidden'
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className='pt-6'>
                        <div className='space-y-4'>
                          {section.options
                            .slice(0, showAll ? section.options.length : 6)
                            .map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className='flex items-center'>
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type='checkbox'
                                  checked={selectedFilters[section.id].includes(
                                    option.value
                                  )}
                                  onChange={(e) =>
                                    handleFilterChange(
                                      section.id,
                                      option.value,
                                      e.target.checked
                                    )
                                  }
                                  className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className='ml-3 text-sm text-gray-600'>
                                  {option.label}
                                </label>
                              </div>
                            ))}
                        </div>

                        {/* Show more/Show less link */}
                        {section.options.length > 6 && (
                          <div className='pt-4'>
                            <div
                              onClick={() => setShowAll(!showAll)}
                              className='text-sm text-blue-600 hover:underline cursor-pointer'>
                              {showAll ? "Show less" : "Show more"}
                            </div>
                          </div>
                        )}
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className='lg:col-span-3'>
                  <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
                    {currentPageData.map((item, index) => (
                      <div
                        key={item.id}
                        className='group relative bg-white cursor-pointer'
                        onClick={() => handleCoachDetails(item?.id)}>
                        <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                          />
                        </div>
                        <div className='main_top px-1 flex justify-between items-baseline'>
                          <div className='coaching_name my-2 w-[150px] h-[50px]'>
                            <p
                              className={`text-[12px] ${item?.jobProfile?.textColor} ${item?.jobProfile?.backgroundColor} text-center p-1 whitespace-nowrap`}>
                              {item?.jobProfile?.title}
                            </p>
                            <h3 className='text-sm text-gray-700 m-1'>
                              {item.name}
                            </h3>
                          </div>
                          <div className='price'>
                            <p>{item?.price}</p>
                          </div>
                        </div>
                        <div className='mt-4 px-2 py-3 flex justify-between border-t border-gray-200'>
                          <div className='flex items-center gap-2'>
                            <FaStar className='text-orange-500' />
                            <p className='text-sm text-gray-700'>
                              {item.rating}
                            </p>
                          </div>
                          <p className='text-sm font-medium text-gray-900 flex items-center'>
                            <LuUser2 className='text-blue-700 mr-2 text-base' />
                            {item.students}{" "}
                            <span className='text-gray-500 ml-1 text-sm'>
                              students
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <div className='pagination_section'>
        <div className='flex items-center justify-center gap-5'>
          <div
            className={`mx-1 cursor-${
              currentPage === 1 ? "not-allowed" : "pointer"
            } text-sm font-semibold text-gray-900`}
            onClick={handlePrevPage}>
            <BsArrowLeft className='text-xl text-blue-950' />
          </div>
          {generatePageNumbers().map((pageNumber) => (
            <div
              key={pageNumber}
              className={`relative cursor-pointer rounded-full inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                pageNumber === currentPage
                  ? "bg-blue-950 text-white"
                  : "bg-[#FFEEE8] text-gray-900"
              }`}
              onClick={() => handlePageClick(pageNumber)}>
              {pageNumber}
            </div>
          ))}
          <div
            onClick={handleNextPage}
            className={`mx-2 text-sm font-semibold text-gray-900 cursor-pointer`}>
            <BsArrowRight className='text-xl text-blue-950' />
          </div>
        </div>
      </div>
    </>
  );
}
