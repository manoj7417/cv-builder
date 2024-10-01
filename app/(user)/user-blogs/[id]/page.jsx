"use client";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const SingleBlogPage = () => {
  const { id } = useParams();

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

  // Filter the blog data to find the matching blog by ID
  const filteredBlog = blogs.filter(blog => blog.id === id);
  console.log("filteredBlog::",filteredBlog)

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
      <h2>Blog Details Page</h2>
    </div>
  );
};

export default SingleBlogPage;
