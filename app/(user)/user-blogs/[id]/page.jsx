"use client";
import Link from "next/link";
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
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
      imageUrl: "/coach-6.png",
       userName: "John Doe",
    },
    {
      id: 2,
      date: "Mar 15, 2023",
      title: "How to earn more money as a wellness coach",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
      imageUrl: "/coach-7.png",
      userName: "Jane Smith",
    },
    {
      id: 3,
      date: "Jan 05, 2023",
      title: "The no-fuss guide to upselling and cross selling",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
      imageUrl: "/coach-8.png",
      userName: "Chris Lee",
    },
  ];

  // Filter the blog data to find the matching blog by ID
  const filteredBlog = blogs.filter((blog) => blog.id == id);
  const singleBlog = filteredBlog[0];

  return (
    <div className="max-w-7xl mx-auto py-20 relative">
      <div>
        {/* Category Link */}

        {/* Blog Title */}
        <div className="py-10">
          <h1 className="text-blue-950 font-bold text-4xl">
            {singleBlog.title}
          </h1>
          {/* Blog Meta Information */}
          <div className="py-5 text-sm font-regular text-gray-900 flex">
            {/* Time Posted */}
            <span className="mr-3 flex flex-row items-center">
              {/* Clock Icon */}
              <svg
                className="text-indigo-600"
                fill="currentColor"
                height="13px"
                width="13px"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
              </svg>
              <span className="ml-1">6 mins ago</span>
            </span>

            {/* Author Link */}
            <div className="flex flex-row items-center hover:text-indigo-600 mr-3">
              {/* Author Icon */}
              <svg
                className="text-indigo-600"
                fill="currentColor"
                height="16px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                ></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
              <span className="ml-1">{singleBlog.userName}</span>
            </div>

            {/* Category Link */}
            <div>
              <div className="flex flex-row items-center hover:text-indigo-600">
                {/* Tag Icon */}
                <svg
                  className="text-indigo-600"
                  fill="currentColor"
                  height="16px"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.4496399,8.42490555 L8.66109799,1.63636364 L1.63636364,1.63636364 L1.63636364,8.66081885 L8.42522727,15.44178 C8.57869221,15.5954158 8.78693789,15.6817418 9.00409091,15.6817418 C9.22124393,15.6817418 9.42948961,15.5954158 9.58327627,15.4414581 L15.4486339,9.57610048 C15.7651495,9.25692435 15.7649133,8.74206554 15.4496399,8.42490555 Z M16.6084423,10.7304545 L10.7406818,16.59822 C10.280287,17.0591273 9.65554997,17.3181054 9.00409091,17.3181054 C8.35263185,17.3181054 7.72789481,17.0591273 7.26815877,16.5988788 L0.239976954,9.57887876 C0.0863319284,9.4254126 0,9.21716044 0,9 L0,0.818181818 C0,0.366312477 0.366312477,0 0.818181818,0 L9,0 C9.21699531,0 9.42510306,0.0862010512 9.57854191,0.239639906 L16.6084423,7.26954545 C17.5601275,8.22691012 17.5601275,9.77308988 16.6084423,10.7304545 Z M5,6 C4.44771525,6 4,5.55228475 4,5 C4,4.44771525 4.44771525,4 5,4 C5.55228475,4 6,4.44771525 6,5 C6,5.55228475 5.55228475,6 5,6 Z"></path>
                </svg>
                <span className="ml-1">activewear</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto relative">
        <div
          className="bg-cover bg-center text-center overflow-hidden"
          style={{
            minHeight: "500px",
            backgroundImage: `url('${singleBlog.imageUrl}')`,
          }}
          title={singleBlog.title}
        />
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="bg-white relative top-0 -mt-32 p-5 sm:p-10">
              <h1 className="text-blue-950 font-bold text-4xl">
                {singleBlog.title}
              </h1>
              <div className="text-base leading-8 my-5">
                {singleBlog.description}
              </div>
              <div className="text-base leading-8 my-5">
                {singleBlog.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
