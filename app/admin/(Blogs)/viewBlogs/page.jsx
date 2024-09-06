/** @format */

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
import Pagination from "@/app/admin/(AdminSidebar)/Pagination";

const ViewBlogsPage = () => {
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  // Get filtered blog data based on search term
  const filteredBlogData = blogData.filter((blog) =>
    blog.maintitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Get total pages
  const totalPages = Math.ceil(filteredBlogData?.length / itemsPerPage);
  console.log("totalPages:::", totalPages);

  //Get current page blog data
  const currentPageData = filteredBlogData.slice(
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  return (
    <div className='2xl:p-20 lg:p-10'>
      <div className='main_button flex justify-between items-center'>
        <div className='relative my-6'>
          <input
            id='id-s03'
            type='search'
            name='id-s03'
            placeholder='Search by Main Title'
            aria-label='Search content'
            value={searchTerm}
            onChange={handleSearchChange}
            className='peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-950 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400'
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='absolute right-4 top-2.5 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='1.5'
            aria-hidden='true'
            aria-label='Search icon'
            role='graphics-symbol'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </div>
        <div className='add_blog'>
          <button
            className='bg-blue-950 text-white text-sm px-5 py-2'
            onClick={handleAddBlog}>
            Add Blog
          </button>
        </div>
      </div>

      <div className='grid 2xl:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-5'>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index}>
              <div className='views_cards_blog'>
                <div className='w-[300px] rounded-md border'>
                  <Skeleton height={250} className='rounded-t-md' />
                  <div className='p-4'>
                    <Skeleton width={100} height={20} />
                    <Skeleton count={3} className='mt-3' />
                    <div className='mt-4'>
                      <Skeleton
                        width={60}
                        height={20}
                        className='mr-2 inline-block'
                      />
                      <Skeleton
                        width={60}
                        height={20}
                        className='mr-2 inline-block'
                      />
                    </div>
                    <Skeleton width='100%' height={30} className='mt-4' />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            {Array.isArray(currentPageData) && currentPageData.length > 0 ? (
              currentPageData.map((item, index) => (
                <div key={index}>
                  <div className='views_cards_blog'>
                    <div
                      className='2xl:w-[300px] lg:w-full min-h-[400px] rounded-md relative'
                      style={{
                        boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}>
                      <img
                        src={item?.mainImage?.url}
                        alt={item?.mainImage?.altText}
                        className='h-[200px] w-full rounded-t-md object-cover'
                      />
                      <div className='p-4 text-center'>
                        <h1 className='inline-flex items-center text-lg font-semibold'>
                          {item?.maintitle?.slice(0,20)}
                        </h1>
                        <p className='mt-3 text-sm text-gray-600'>
                          {parse(item?.description.slice(0, 100) || "")}
                        </p>
                        {/* Conditionally render the "Not Verified" label */}
                        <div className='verified_div absolute top-0 right-2'>
                          {isVerified === "false" ? (
                            <div className='mt-2'>
                              <span className='inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800'>
                                <FaTimesCircle className='text-base inline-flex mr-2' />
                                Not Verified
                              </span>
                            </div>
                          ) : (
                            <div className='mt-2'>
                              <span className='inline-block rounded-full bg-green-200 p-2  text-xs font-semibold text-green-800'>
                                <IoShieldCheckmark className='text-base inline-flex mr-2' />{" "}
                                Verified
                              </span>
                            </div>
                          )}
                        </div>
                        <div className='flex justify-between  items-baseline mt-4'>
                          <div className='view_more'>
                            <button
                              type='button'
                              className='mt-4 w-full rounded-sm  px-2 py-1.5 text-sm font-semibold text-black shadow-sm'
                              onClick={() => handleIndividualBlog(item?._id)}>
                              Read More...
                            </button>
                          </div>
                          <div className='action_button'>
                            <ResumeTooltip icon={FaEdit} title='Edit Blog'>
                              <button
                                type='button'
                                className='rounded-full p-2'
                                onClick={() => handleBlogEdit(item?._id)}>
                                <FaEdit className='text-sm' />
                              </button>
                            </ResumeTooltip>
                            <ResumeTooltip
                              icon={FaTrashAlt}
                              title='Delete Blog'>
                              <button
                                type='button'
                                className='rounded-full p-2'
                                onClick={() => handleDeleteBlog(item?._id)}>
                                <FaTrashAlt className='text-sm text-red-600' />
                              </button>
                            </ResumeTooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='col-span-3 text-center text-xl font-semibold'>
                No results found !!!
              </div>
            )}
          </>
        )}
      </div>
      <div className='pagination mt-10'>
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
