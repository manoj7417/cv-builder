'use client'
import { GetTokens } from "@/app/actions";
import axios from "axios";
import React, { useEffect, useState } from "react";

const viewBlogsPage = () => {
  const [blogData,setBlogData] = useState();


  console.log("blogData:::",blogData)

  const fetchBlogDetails = async () => {
    const { accessToken } = await GetTokens();
    if (!accessToken) return;
    const token = accessToken?.value;
    // Fetch user details from API or database
    try {
      const response = await axios.get("/api/getBlog", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log("response::",response)
      setBlogData(response?.data?.blog);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchBlogDetails();
  }, []);


  return (
    <div className="mx-auto w-[60%] my-20">
      <div className="views_cards_blog">
        <div className="w-[300px] rounded-md border">
          <img
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
            alt="Laptop"
            className="h-[200px] w-full rounded-t-md object-cover"
          />
          <div className="p-4">
            <h1 className="inline-flex items-center text-lg font-semibold">
              About Macbook
            </h1>
            <p className="mt-3 text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi, debitis?
            </p>
            <div className="mt-4">
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                #Macbook
              </span>
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                #Apple
              </span>
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                #Laptop
              </span>
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Read
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default viewBlogsPage;
