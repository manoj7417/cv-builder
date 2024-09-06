import Pagination from "@/app/admin/(AdminSidebar)/Pagination";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const coaches = [
  {
    id: 1,
    name: "Devon Lane",
    jobProfile: {
      title: "Web Developer",
      backgroundColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
    href: "#",
    imageSrc: "/coach-blog-1.png",
    rating: "5.0",
    students: "265.7k",
    price: "$49",
  },
  {
    id: 2,
    name: "Darrell Steward",
    jobProfile: {
      title: "React Native Developer",
      backgroundColor: "bg-green-100",
      textColor: "text-green-800",
    },
    href: "#",
    imageSrc: "/coach-blog-2.png",
    rating: "4.9",
    students: "265.7k",
    price: "$49",
  },
  {
    id: 3,
    name: "Jane Cooper",
    jobProfile: {
      title: "Mobile Developer",
      backgroundColor: "bg-purple-100",
      textColor: "text-purple-800",
    },
    href: "#",
    imageSrc: "/coach-blog-1.png",
    rating: "5.0",
    students: "265.7k",
    price: "$49",
  },
  {
    id: 4,
    name: "Albert Flores",
    jobProfile: {
      title: "Javascript Developer",
      backgroundColor: "bg-yellow-100",
      textColor: "text-yellow-800",
    },
    href: "#",
    imageSrc: "/coach-blog-1.png",
    rating: "5.0",
    students: "265.7k",
    price: "$49",
  },
  {
    id: 5,
    name: "Leslie Alexander",
    jobProfile: {
      title: "UX/UI Designer",
      backgroundColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
    href: "#",
    imageSrc: "/coach-blog-2.png",
    rating: "4.8",
    students: "145.3k",
    price: "$49",
  },
  {
    id: 6,
    name: "Wade Warren",
    jobProfile: {
      title: "Full Stack Developer",
      backgroundColor: "bg-red-100",
      textColor: "text-red-800",
    },
    href: "#",
    imageSrc: "/coach-blog-1.png",
    rating: "4.9",
    students: "320.1k",
    price: "$49",
  },
  {
    id: 7,
    name: "Kristin Watson",
    jobProfile: {
      title: "Data Scientist",
      backgroundColor: "bg-teal-100",
      textColor: "text-teal-800",
    },
    href: "#",
    imageSrc: "/coach-blog-2.png",
    rating: "5.0",
    students: "180.2k",
    price: "$49",
  },
  {
    id: 8,
    name: "Cameron Williamson",
    jobProfile: {
      title: "DevOps Engineer",
      backgroundColor: "bg-orange-100",
      textColor: "text-orange-800",
    },
    href: "#",
    imageSrc: "/coach-blog-1.png",
    rating: "4.7",
    students: "210.4k",
    price: "$49",
  },
  {
    id: 9,
    name: "Courtney Henry",
    jobProfile: {
      title: "Cybersecurity Specialist",
      backgroundColor: "bg-indigo-100",
      textColor: "text-indigo-800",
    },
    href: "#",
    imageSrc: "/coach-4.png",
    rating: "4.8",
    students: "170.8k",
    price: "$49",
  },
  {
    id: 10,
    name: "Brooklyn Simmons",
    jobProfile: {
      title: "Cloud Architect",
      backgroundColor: "bg-gray-100",
      textColor: "text-gray-800",
    },
    href: "#",
    imageSrc: "/coach-5.png",
    rating: "4.9",
    students: "140.5k",
    price: "$49",
  },
  {
    id: 11,
    name: "Darlene Robertson",
    jobProfile: {
      title: "Machine Learning Engineer",
      backgroundColor: "bg-cyan-100",
      textColor: "text-cyan-800",
    },
    href: "#",
    imageSrc: "/coach-6.png",
    rating: "4.8",
    students: "195.2k",
    price: "$59",
  },
  {
    id: 12,
    name: "Ronald Richards",
    jobProfile: {
      title: "AI Researcher",
      backgroundColor: "bg-pink-100",
      textColor: "text-pink-800",
    },
    href: "#",
    imageSrc: "/coach-7.png",
    rating: "5.0",
    students: "175.3k",
    price: "$69",
  },
  {
    id: 13,
    name: "Jerome Bell",
    jobProfile: {
      title: "Backend Developer",
      backgroundColor: "bg-lime-100",
      textColor: "text-lime-800",
    },
    href: "#",
    imageSrc: "/coach-8.png",
    rating: "4.9",
    students: "220.6k",
    price: "$49",
  },
  {
    id: 14,
    name: "Kathryn Murphy",
    jobProfile: {
      title: "Software Architect",
      backgroundColor: "bg-amber-100",
      textColor: "text-amber-800",
    },
    href: "#",
    imageSrc: "/coach-1.png",
    rating: "5.0",
    students: "160.8k",
    price: "$89",
  },
  {
    id: 15,
    name: "Annette Black",
    jobProfile: {
      title: "Database Administrator",
      backgroundColor: "bg-emerald-100",
      textColor: "text-emerald-800",
    },
    href: "#",
    imageSrc: "/coach-2.png",
    rating: "4.8",
    students: "210.2k",
    price: "$49",
  },
  {
    id: 16,
    name: "Jacob Jones",
    jobProfile: {
      title: "Network Engineer",
      backgroundColor: "bg-violet-100",
      textColor: "text-violet-800",
    },
    href: "#",
    imageSrc: "/coach-3.png",
    rating: "5.0",
    students: "140.9k",
    price: "$59",
  },
  {
    id: 17,
    name: "Arlene McCoy",
    jobProfile: {
      title: "System Administrator",
      backgroundColor: "bg-rose-100",
      textColor: "text-rose-800",
    },
    href: "#",
    imageSrc: "/coach-4.png",
    rating: "4.7",
    students: "180.3k",
    price: "$49",
  },
  {
    id: 18,
    name: "Esther Howard",
    jobProfile: {
      title: "Cloud Engineer",
      backgroundColor: "bg-fuchsia-100",
      textColor: "text-fuchsia-800",
    },
    href: "#",
    imageSrc: "/coach-5.png",
    rating: "4.9",
    students: "150.7k",
    price: "$69",
  },
  {
    id: 19,
    name: "Guy Hawkins",
    jobProfile: {
      title: "Blockchain Developer",
      backgroundColor: "bg-red-100",
      textColor: "text-red-800",
    },
    href: "#",
    imageSrc: "/coach-6.png",
    rating: "5.0",
    students: "130.5k",
    price: "$79",
  },
  {
    id: 20,
    name: "Eleanor Pena",
    jobProfile: {
      title: "Cybersecurity Analyst",
      backgroundColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
    href: "#",
    imageSrc: "/coach-7.png",
    rating: "4.8",
    students: "165.4k",
    price: "$49",
  },
  {
    id: 21,
    name: "Guy Hawkins",
    jobProfile: {
      title: "Next.js Developer",
      backgroundColor: "bg-red-100",
      textColor: "text-red-800",
    },
    href: "#",
    imageSrc: "/coach-6.png",
    rating: "5.0",
    students: "130.5k",
    price: "$79",
  },
  {
    id: 20,
    name: "Eleanor Pena",
    jobProfile: {
      title: "UX/UI",
      backgroundColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
    href: "#",
    imageSrc: "/coach-7.png",
    rating: "4.8",
    students: "165.4k",
    price: "$49",
  },
];

const CoachBlog = () => {
    const [showDialog,setShowDialog] = useState(false)
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  //Get total pages
  const totalPages = Math.ceil(coaches?.length / itemsPerPage);

  //Get current page blog data
  const currentPageData = coaches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <>
      <div className="max-w-5xl mx-auto coach_blog">
        <div className="blog flex justify-between items-center p-4  bg-[#E0F2FF] mt-10">
          <div className="blog_heading">
            <h3 className="text-xl font-semibold">Blog</h3>
          </div>
          <div className="add_blog_button">
            <Dialog>
              <DialogTrigger open={showDialog}>
                <div className="bg-blue-950 text-white px-5 py-2 cursor-pointer text-sm">
                  Add New Blog +
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]" showCloseButton={true} onClick={()=>setShowDialog(false)}>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Name
                    </label>
                    <input
                      id="name"
                      defaultValue="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="username" className="text-right">
                      Username
                    </label>
                    <input
                      id="username"
                      defaultValue="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <button type="submit">Save changes</button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <h1 className="text-xl font-semibold my-10">Coach Blogs</h1>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {coaches.slice(0, 6).map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white cursor-pointer"
              //   onClick={() => handleCoachDetails(item?.id)}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={item.imageAlt}
                  src={item.imageSrc}
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
                <div className="flex items-center gap-2">
                  <FaStar className="text-orange-500" />
                  <p className="text-sm text-gray-700">{item.rating}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {item.students}{" "}
                  <span className="text-gray-500 ml-1 text-sm">students</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination mt-10">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
};

export default CoachBlog;
