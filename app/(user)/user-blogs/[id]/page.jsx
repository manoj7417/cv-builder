"use client";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const SingleBlogPage = () => {
  const blogs = [
    {
      id: 1,
      date: "Dec 22, 2023",
      title: "Meet AutoManage, the best AI management tools",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      imageUrl: "/coach-6.png",
    },
    {
      id: 2,
      date: "Mar 15, 2023",
      title: "How to earn more money as a wellness coach",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      imageUrl: "/coach-7.png",
    },
    {
      id: 3,
      date: "Jan 05, 2023",
      title: "The no-fuss guide to upselling and cross selling",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      imageUrl: "/coach-8.png",
    },
  ];
  const { id } = useParams();

  const filteredBlog = blogs.filter((blog) => blog.id === id);
  console.log(filteredBlog)

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
        <h2>f;lsdjf;sljd;fj</h2>
      {/* <div
        className="bg-cover bg-center text-center overflow-hidden"
        style={{
          minHeight: "500px",
          backgroundImage: `url('${filteredBlog.imageUrl}')`,
        }}
        title={filteredBlog.title}
      />
      <div className="max-w-3xl mx-auto">
        <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div className="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <h1 className="text-gray-900 font-bold text-3xl mb-2">
              {filteredBlog.title}
            </h1>
            <p className="text-gray-600 text-base">{filteredBlog.description}</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SingleBlogPage;
