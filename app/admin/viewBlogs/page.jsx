"use client";
import { GetTokens } from "@/app/actions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const ViewBlogsPage = () => {
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchBlogDetails = async () => {
    const { accessToken } = await GetTokens();
    if (!accessToken) return;
    const token = accessToken?.value;
    // Fetch blogs details from API or database
    try {
      const response = await axios.get("/api/getBlog", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log("response::", response);
      setBlogData(response?.data?.blog);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleIndividualBlog = (id) => {
    router.push(`/admin/viewBlogs/${id}`);
  };

  const handleDeleteBlog = async (id) => {
    const { accessToken } = await GetTokens();
    if (!accessToken) return;
    const token = accessToken?.value;
    try {
      const response = await axios.post(
        "/api/deleteIndividualBlog",
        { id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // Check if the delete was successful
      if (response.status === 200) {
        setBlogData((prevData) => prevData.filter((blog) => blog._id !== id));
        toast.success("Blog Deleted Successfully", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlogEdit = (id) => {
    router.push(`/admin/updateBlog/${id}`);
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  return (
    <div className="mx-auto w-[60%] my-20">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index}>
              <div className="views_cards_blog">
                <div className="w-[300px] rounded-md border">
                  <Skeleton height={250} className="rounded-t-md" />
                  <div className="p-4">
                    <Skeleton width={100} height={20} />
                    <Skeleton count={3} className="mt-3" />
                    <div className="mt-4">
                      <Skeleton
                        width={60}
                        height={20}
                        className="mr-2 inline-block"
                      />
                      <Skeleton
                        width={60}
                        height={20}
                        className="mr-2 inline-block"
                      />
                    </div>
                    <Skeleton width="100%" height={30} className="mt-4" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            {Array.isArray(blogData) &&
              blogData.length > 0 &&
              blogData.map((item, index) => (
                <div key={index}>
                  <div className="views_cards_blog">
                    <div className="w-[300px] h-[550px] rounded-md border">
                      <img
                        src={item?.mainImage?.url}
                        alt={item?.mainImage?.altText}
                        className="h-[300px] w-full rounded-t-md object-cover"
                      />
                      <div className="p-4">
                        <h1 className="inline-flex items-center text-lg font-semibold">
                          {item?.author}
                        </h1>
                        <p className="mt-3 text-sm text-gray-600">
                          {parse(item?.description.slice(0, 100) || "")}
                        </p>
                        <div className="mt-4">
                          {item?.meta?.keywords.map((keyitem, index) => (
                            <div key={index}>
                              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                                #{keyitem}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between  items-baseline mt-4">
                          <div className="view_more">
                            <button
                              type="button"
                              class="mt-4 w-full rounded-sm bg-blue-950 px-2 py-1.5 text-[10px] font-semibold text-white shadow-sm"
                              onClick={() => handleIndividualBlog(item?._id)}
                            >
                              Read More...
                            </button>
                          </div>
                          <div className="action_button">
                            <button
                              type="button"
                              className="rounded-full p-2"
                              onClick={() => handleBlogEdit(item?._id)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              className="rounded-full p-2"
                              onClick={() => handleDeleteBlog(item?._id)}
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewBlogsPage;
