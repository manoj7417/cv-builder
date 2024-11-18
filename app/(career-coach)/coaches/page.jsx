/** @format */

"use client";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import CoachFilter from "./CoachFilter";
import { useRouter } from "next/navigation";
import CoachSkeltonCard from "@/components/component/CoachSkeltonCard";
import axios from "axios";

const categories = [
  {
    id: 1,
    categoryTitle: "HTML5",
    courses: "2736",
    subCategory: [
      "HTML5",
      "Web Development",
      "Responsive Developments",
      "Developments",
      "Programing",
    ],
  },
  {
    id: 2,
    categoryTitle: "CSS3",
    courses: "13,932",
    subCategory: [
      "CSS3",
      "Web Development",
      "Responsive Developments",
      "Developments",
      "Programing",
    ],
  },
  {
    id: 3,
    categoryTitle: "Javascript",
    courses: "52,822",
    subCategory: [
      "Javascript",
      "Web Development",
      "Responsive Developments",
      "Developments",
      "Programing",
    ],
  },
  {
    id: 4,
    categoryTitle: "Saas",
    courses: "20,126",
    subCategory: [
      "Saas",
      "Web Development",
      "Responsive Developments",
      "Developments",
      "Programing",
    ],
  },
  {
    id: 5,
    categoryTitle: "Laravel",
    courses: "6,196",
    subCategory: [
      "Laravel",
      "Web Development",
      "Responsive Developments",
      "Developments",
      "Programing",
    ],
  },
  {
    id: 6,
    categoryTitle: "Django",
    courses: "22,649",
    subCategory: [
      "Django",
      "Web Development",
      "Responsive Developments",
      "Developments",
      "Programing",
    ],
  },
];

export default function CoachesPage() {
  // Set the default selected category (e.g., the first category)
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id);
  const router = useRouter();


  const [coaches, setAllCoaches] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Find the currently selected category's details
  const selectedCategoryDetails = categories.find(
    (category) => category.id === selectedCategory
  );

  const handleCoachDetails = (id) => {
    router.push(`coaches/${id}`);
  };

  useEffect(() => {
    fetchAllCoaches();
  },[]);

  const fetchAllCoaches = async () => {
    try {
      const response = await axios.get(`/api/getAllCoaches`);
      const data = await response.data;
      setAllCoaches(data.coaches);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-gray-200">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="2xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold text-blue-950 text-center my-10">
            Popular instructor in Career Development
          </h1>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {isLoading  ? (
              <>
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <CoachSkeltonCard key={index} />
                  ))}
              </>
            ) : (
              coaches?.length > 0 &&
              coaches
                ?.filter(
                  (coach) =>
                    coach.isApproved && coach.approvalStatus === "approved"
                )
                .slice(0, 4)
                .map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative bg-white cursor-pointer rounded-md"
                    onClick={() => handleCoachDetails(item?._id)}
                  >
                    <div className="aspect-h-3 aspect-w-4 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60 rounded-t-md">
                      <img
                        alt={item.imageAlt}
                        src={item.profileImage}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="coaching_name text-center mt-2">
                      <p className="text-sm text-gray-700">{item.name}</p>
                      <p className="text-[12px] text-gray-700">
                        {item?.jobProfile?.title}
                      </p>
                    </div>
                    <div className="mt-4 p-5 flex justify-between border-t border-gray-200">
                      {/* <div className='flex items-center gap-2'>
                        <FaStar className='text-orange-500' />
                        <p className='text-sm text-gray-700'>{item.rating}</p>
                      </div>
                      <p className='text-sm font-medium text-gray-900'>
                        {item.students}{" "}
                        <span className='text-gray-500 ml-1 text-sm'>students</span>
                      </p> */}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <div className="coach_course py-10 sm:py-20">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-10">
          {categories?.length > 0 &&
            categories?.map((val) => (
              <div
                key={val.id}
                className="courses_box w-[150px] sm:w-[200px] h-[70px] sm:h-[90px] bg-gray-100 shadow-xl p-4 sm:p-5 text-center cursor-pointer"
                onClick={() => handleCategoryClick(val?.id)}
              >
                <p className="text-gray-600 text-sm sm:text-base">
                  {val?.categoryTitle}
                </p>
                <p className="text-xs sm:text-sm">{val?.courses} courses</p>
              </div>
            ))}
        </div>

        {selectedCategoryDetails && (
          <div className="selected_category mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <p className="text-center text-sm sm:text-lg font-semibold text-gray-700 mt-5 sm:mt-3">
              Popular Keywords:
            </p>
            <ul className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
              {selectedCategoryDetails.subCategory.map((subCat, idx) => (
                <li
                  key={idx}
                  className="bg-gray-100 px-3 py-1 sm:px-4 sm:py-2 rounded-md shadow-md text-gray-700 text-xs sm:text-sm"
                >
                  {subCat}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="coach_filter">
        <CoachFilter
          coaches={coaches}
          isLoading={isLoading}
          handleCoachDetails={handleCoachDetails}
        />
      </div>
    </>
  );
}
