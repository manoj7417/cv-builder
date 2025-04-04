/** @format */

"use client";
import { GetTokens } from "@/app/actions";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Link from "next/link";

const IndividualBlogPage = () => {
  const { id } = useParams();
  const [individualBlog, setIndividualBlog] = useState({});

  const fetchBlogIndividualDetails = async (id) => {
    const { accessToken } = await GetTokens();
    if (!accessToken) return;
    const token = accessToken?.value;
    // Fetch blogs details from API or database
    try {
      const response = await axios.post(
        "/api/getIndividualBlog",
        { id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setIndividualBlog(response?.data?.blog);
    } catch (error) {}
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  };

  useEffect(() => {
    fetchBlogIndividualDetails(id);
  }, [id]);

  return (
    <>
      <div className="mx-auto w-[60%] my-20">
        {/* Component Code */}
        <div className="relative">
          <div className="max-w-3xl mb-10 rounded overflow-hidden flex flex-col mx-auto text-center">
            <div className="max-w-3xl mx-auto text-xl sm:text-4xl font-semibold inline-block mb-2">
              {individualBlog?.maintitle}
            </div>
            <Link href="#">
              <img
                className="w-full my-4"
                src={individualBlog?.mainImage?.url}
                alt={individualBlog?.mainImage?.altText}
              />
            </Link>
            <p className="text-gray-700 text-base leading-8 max-w-2xl mx-auto">
              {/* {parse(individualBlog?.description)} */}
            </p>
            <div className="py-5 text-sm font-regular text-gray-900 flex items-center justify-center">
              <span className="mr-3 flex flex-row items-center">
                <svg
                  className="text-[#f76918]"
                  fill="currentColor"
                  height="13px"
                  width="13px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256
			c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128
			c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"
                      />
                    </g>
                  </g>
                </svg>
                <span className="ml-1">
                  {formatDate(individualBlog?.updatedAt)}
                </span>
              </span>
              <Link
                href="#"
                className="flex flex-row items-center hover:text-[#f76918]  mr-3"
              >
                <svg
                  className="text-[#f76918]"
                  fill="currentColor"
                  height="16px"
                  aria-hidden="true"
                  role="img"
                  focusable="false"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
                <span className="ml-1">{individualBlog?.author}</span>
              </Link>
            </div>
            <hr />
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
              <div className>
                <p className="text-base leading-8 my-5">
                  {parse(individualBlog?.description || "")}
                </p>
                {individualBlog?.sections?.map((val, index) => (
                  <div key={index}>
                    <div className="section_image">
                      {val?.images?.map((el, idx) => (
                        <div key={idx}>
                          <img
                            className="w-full my-4"
                            src={el?.url}
                            alt={el?.altText}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="section_content">
                      <h3 className="text-2xl font-bold my-5">#{val?.title}</h3>
                      <p className="text-base leading-8 my-5">
                        {parse(val?.description || "")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualBlogPage;
