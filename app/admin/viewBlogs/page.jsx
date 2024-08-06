"use client";
import { GetTokens } from "@/app/actions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { FaEdit, FaEye, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import ResumeTooltip from "@/components/component/ResumeTooltip";
import { IoShieldCheckmark } from "react-icons/io5";
import Pagination from "../(AdminSidebar)/Pagination";

const ViewBlogsPage = () => {
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(blogData?.length / itemsPerPage);
  console.log("totalPages:::", totalPages);

  const currentPageData = blogData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );



  const router = useRouter();
  const isVerified = "false";

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

  const handleAddBlog = () => {
    router.push("/admin/createBlogs");
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  return (
    <div className="2xl:p-20 lg:p-10">
      <div className="add_blog flex justify-end 2xl:mb-10 lg:mb-5 mb-5">
        <button
          className="bg-blue-950 text-white text-sm px-5 py-2"
          onClick={handleAddBlog}
        >
          Add Blog
        </button>
      </div>
      <div className="grid 2xl:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-5">
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
            {Array.isArray(currentPageData) &&
              currentPageData.length > 0 &&
              currentPageData.map((item, index) => (
                <div key={index}>
                  <div className="views_cards_blog">
                    <div
                      className="2xl:w-[300px] w-full 2xl:h-[400px] h-full rounded-md relative"
                      style={{
                        boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                    >
                      <img
                        src={item?.mainImage?.url}
                        alt={item?.mainImage?.altText}
                        className="h-[200px] w-full rounded-t-md object-cover"
                      />
                      <div className="p-4 text-center">
                        <h1 className="inline-flex items-center text-lg font-semibold">
                          {item?.author}
                        </h1>
                        <p className="mt-3 text-sm text-gray-600">
                          {parse(item?.description.slice(0, 100) || "")}
                        </p>
                        {/* Conditionally render the "Not Verified" label */}
                        <div className="verified_div absolute top-0 right-2">
                          {isVerified === "false" ? (
                            <div className="mt-2">
                              <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
                                <FaTimesCircle className="text-base inline-flex mr-2" />
                                Not Verified
                              </span>
                            </div>
                          ) : (
                            <div className="mt-2">
                              <span className="inline-block rounded-full bg-green-200 p-2  text-xs font-semibold text-green-800">
                                <IoShieldCheckmark className="text-base inline-flex mr-2" />{" "}
                                Verified
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-between  items-baseline mt-4">
                          <div className="view_more">
                            <button
                              type="button"
                              class="mt-4 w-full rounded-sm  px-2 py-1.5 text-sm font-semibold text-black shadow-sm"
                              onClick={() => handleIndividualBlog(item?._id)}
                            >
                              Read More...
                            </button>
                          </div>
                          <div className="action_button">
                            <ResumeTooltip icon={FaEdit} title="Edit Blog">
                              <button
                                type="button"
                                className="rounded-full p-2"
                                onClick={() => handleBlogEdit(item?._id)}
                              >
                                <FaEdit className="text-sm" />
                              </button>
                            </ResumeTooltip>
                            <ResumeTooltip
                              icon={FaTrashAlt}
                              title="Delete Blog"
                            >
                              <button
                                type="button"
                                className="rounded-full p-2"
                                onClick={() => handleDeleteBlog(item?._id)}
                              >
                                <FaTrashAlt className="text-sm text-red-600" />
                              </button>
                            </ResumeTooltip>
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
      <div className="pagination mt-10">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default ViewBlogsPage;
