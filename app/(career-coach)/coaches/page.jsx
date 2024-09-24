/** @format */

"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import CoachFilter from "./CoachFilter";
import { useRouter } from "next/navigation";

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

  const { coaches, isLoading, fetchAllCoaches } = useCoachesDetailStore();
  console.log("coaches manoj::", coaches);

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

  return (
    <>
      <div className="bg-gray-200">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="2xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold text-blue-950 text-center my-10">
            Popular instructor in Career Development
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {coaches?.length > 0 &&
              coaches
                ?.filter(
                  (coach) =>
                    coach.isApproved && coach.approvalStatus === "approved"
                )
                .slice(0, 4)
                .map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative bg-white cursor-pointer"
                    onClick={() => handleCoachDetails(item?._id)}
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        alt={item.imageAlt}
                        src={item.profileImage}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="coaching_name text-center mt-2">
                      <h3 className="text-sm text-gray-700">{item.name}</h3>
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
                ))}
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
                <h3 className="text-gray-600 text-sm sm:text-base">
                  {val?.categoryTitle}
                </h3>
                <p className="text-xs sm:text-sm">{val?.courses} courses</p>
              </div>
            ))}
        </div>

        {selectedCategoryDetails && (
          <div className="selected_category mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <h4 className="text-center text-sm sm:text-lg font-semibold text-gray-700 mt-5 sm:mt-3">
              Popular Keywords:
            </h4>
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
          handleCoachDetails={handleCoachDetails}
        />
      </div>
    </>
  );
}
