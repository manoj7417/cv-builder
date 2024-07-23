"use client";
import React, { useState } from "react";
import { ResumeData } from "@/constants/data";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";
import { FaGraduationCap, FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { useResumeStore } from "@/app/store/ResumeStore";
import Link from "next/link";
import { isValidUrl } from "./ValidateUrl";
import { AiOutlineLink } from "react-icons/ai";

const Education = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state.resume.data.sections.education);
  return (
    <div className="education_section py-3">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="flex gap-5 items-center" style={{ color: colorText }}>
            <h2 className={`${fontStyle.headingFont} font-semibold uppercase`}>
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-800 my-5">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div
                    className="education1 my-5"
                    key={index}
                    style={{ color: colorText }}
                  >
                    <div className="year" style={{ color: colorText }}>
                      {<p>item?.startDate</p> &&
                        `${item?.startDate}${item?.endDate && " - "}`}
                      {item?.endDate}
                      {/* <div className="year_marker absolute top-1.5 right-0 w-2.5 h-2.5 bg-white border border-[#26252d] rounded-full" />
                      <div className="year_line absolute top-4 right-1 w-0.5 h-full bg-[#0175b2]" /> */}
                    </div>
                    <div className="content flex flex-col break-all">
                      <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                        {item?.degree}
                      </h3>
                      <h4 style={{ fontSize: fontStyle.paraFont }}>
                        {item?.institute}
                      </h4>
                      <div
                        className={`py-2 ${fontStyle.paraFont} break-words`}
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const Experience = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.experience);
  return (
    <div className="experience_section my-2">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="experience_heading flex gap-5 items-center">
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{
                color: colorStyle,
              }}
            >
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div className="experience_1 flex my-5" key={index}>
                <div className="year relative">
                  <div className="year_marker absolute top-1.5 right-0 w-2.5 h-2.5 bg-white border border-[#26252d] rounded-full" />
                  <div
                    className="year_line absolute top-4 right-1 w-0.5 h-full"
                    style={{
                      background: colorStyle,
                    }}
                  />
                </div>
                <div className="content pl-8 break-all">
                  <div className="experience_conetnt flex justify-between w-full gap-5 items-baseline">
                    <div className="experience_title">
                      <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                        {item?.jobtitle}
                      </h3>
                      <h4 style={{ fontSize: fontStyle.paraFont }} className="font-medium">
                        {item?.employer}
                      </h4>
                    </div>
                    <div className="experience_year whitespace-nowrap">
                      <p
                        className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}
                      >
                        {item?.startDate &&
                          `${item.startDate}${item.endDate && " - "}`}
                        {item?.endDate}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`py-2 ${fontStyle.paraFont} break-words`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></div>
                  <div className="px-3">
                    {item?.highlights?.length > 0 && (
                      <ul className="list-disc">
                        {item?.highlights?.map((item, key) => {
                          return (
                            <li key={key} className=" break-words text-15px">
                              {item}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

const Projects = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.projects);
  return (
    <div className="project_section my-4">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div className="project_heading flex gap-5 items-center">
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{
                color: colorStyle,
              }}
            >
              {data?.name}
            </h2>
          </div>
          {data?.items.map((item, index) => {
            return (
              <div className="projects1 my-3" key={index}>
                <div className="post flex  justify-between my-2 gap-5 items-baseline">
                  <div className="post_title">
                    <h3
                      style={{ fontSize: fontStyle.subHeadingFont }}
                      className="font-bold"
                    >
                      {item?.title}
                    </h3>
                    <h4
                      style={{ fontSize: fontStyle.paraFont }}
                      className="font-medium"
                    >
                      {item?.subtitle}
                    </h4>
                  </div>
                  <div className="year whitespace-nowrap">
                    <p
                      className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}
                    >
                      {item?.startDate &&
                        `${item.startDate}${item.endDate && " - "}`}
                      {item?.endDate}
                    </p>
                  </div>
                </div>
                <div
                  className={`key_points ${fontStyle.paraFont} break-words`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

const Skills = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.skills);

  // Define the mapping of skill levels to percentages
  const levelMapping = {
    beginner: 25,
    intermediate: 50,
    advanced: 75,
    expert: 100,
  };

  return (
    <div>
      {data?.visible && data?.items?.length > 0 && (
        <div className="skills_section py-4">
          <h2
            className={`${fontStyle.headingFont} font-semibold uppercase`}
            style={{
              color: colorText,
            }}
          >
            {data?.name}
          </h2>
          <div className="w-full flex justify-end items-center">
            <ul className="w-full" style={{ color: colorText }}>
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`font-bold ${fontStyle.skillsFont} my-1 py-4 `}
                    key={i}
                  >
                    <div className="text-start mb-1">
                      <span>{item?.name}</span>
                    </div>
                    <div
                      className="w-[60%] text-end h-2.5"
                      style={{
                        backgroundColor: colorText,
                      }}
                    >
                      <div
                        className="h-2.5"
                        style={{
                          width: `${level}%`,
                          backgroundColor: colorBackground,
                        }}
                      ></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const Hobbies = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.hobbies
  );
  return (
    <div className="my-5">
      {data?.visible && data?.items.length > 0 && (
        <h2
          className={`uppercase text-2xl font-bold ${fontStyle.headingFont}`}
          style={{ color: colorText }}
        >
          {data?.name}
        </h2>
      )}
      <div className="hobbies_section mt-5">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul className="pl-5 list-disc" style={{ color: colorText }}>
              {data?.items?.map((item, index) => {
                return (
                  <li key={index} className="text-15px py-2 font-semibold">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const Awards = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.awards);
  return (
    <div className="awards_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="awards_header w-full">
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{
                color: colorStyle,
              }}
            >
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-800">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="awards my-5" key={index}>
                    <div className="awards_names flex w-full justify-between my-1">
                      <div className="awards_degree w-full">
                        {isValidUrl(item?.url) ? (
                          <a
                            href={item?.url}
                            target="_blank"
                            className="break-words text-16px items-center font-bold inline-flex"
                          >
                            {item?.name}
                            <AiOutlineLink className="ml-1" />
                          </a>
                        ) : (
                          <p className="break-words text-15px font-bold">
                            {item.name}
                          </p>
                        )}
                        <h4 style={{ fontSize: fontStyle.paraFont }}>
                          {item?.issuer}
                        </h4>
                      </div>
                      <div className="awards_year text-end w-full">
                        <p
                          className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}
                        >
                          {item?.date}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`py-2 ${fontStyle.paraFont} break-words`}
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    ></div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const Languages = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.language);

  // Define the mapping of skill levels to percentages
  const levelMapping = {
    beginner: 25,
    intermediate: 50,
    advanced: 75,
    expert: 100,
  };

  return (
    <div>
      {data?.visible && data?.items?.length > 0 && (
        <div className="skills_section py-4">
          <h2
            className={`${fontStyle.headingFont} font-semibold uppercase`}
            style={{
              color: colorText,
            }}
          >
            {data?.name}
          </h2>
          <div className="w-full flex justify-end items-center">
            <ul
              className="w-full"
              style={{
                color: colorText,
              }}
            >
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`font-bold ${fontStyle.skillsFont} my-1 py-4 `}
                    key={i}
                  >
                    <div className="text-start w-1/2 mb-1 whitespace-nowrap">
                      <span>{item?.name}</span>
                    </div>
                    <div
                      className="w-1/2 text-end h-2.5"
                      style={{
                        backgroundColor: colorText,
                      }}
                    >
                      <div
                        className="h-2.5"
                        style={{
                          width: `${level}%`,
                          backgroundColor: colorBackground,
                        }}
                      ></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const Profile = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.summary);
  const htmlContent = data?.content;
  return (
    <div>
      {data?.visible && (
        <div className="profile_section">
          {/* <div className="profile_heading flex gap-5 items-center">
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{ color: colorStyle }}
            >
              {data?.name}
            </h2>
          </div> */}
          <div
            className={`my-5 break-words ${fontStyle.subHeadingFont}`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        </div>
      )}
    </div>
  );
};

const Certificates = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.certificates
  );
  return (
    <div>
      <h2
        className={`${fontStyle.headingFont} font-bold uppercase`}
        style={{
          color: colorStyle,
        }}
      >
        {data?.name}
      </h2>
      <div className="hobbies_section mt-5">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul className="">
              {data?.items?.map((item, index) => {
                return (
                  <div className="certificate_section px-2 py-2" key={index}>
                    {isValidUrl(item?.url) ? (
                      <a
                        href={item?.url}
                        target="_blank"
                        className="break-words text-16px font-bold items-center inline-flex"
                      >
                        {item?.name}
                        <AiOutlineLink className="ml-1" />
                      </a>
                    ) : (
                      <p className="break-words text-15px">{item.name}</p>
                    )}
                    <div
                      className={`py-2 ${fontStyle.paraFont} break-words`}
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    ></div>
                  </div>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const References = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.reference
  );
  return (
    <div className="references_section w-full px-2 mt-5">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="references_header">
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{
                color: colorStyle,
              }}
            >
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-800">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="references my-5" key={index}>
                    <div className="references_names w-full my-1">
                      <div className="references w-full">
                        {isValidUrl(item?.url) ? (
                          <a
                            href={item?.url}
                            target="_blank"
                            className="break-words text-16px items-center font-bold text-gray-600 inline-flex"
                          >
                            {item?.name}
                            <AiOutlineLink className="ml-1" />
                          </a>
                        ) : (
                          <p className="break-words text-15px font-bold text-gray-600">
                            {item.name}
                          </p>
                        )}
                        <h3 className={`${fontStyle.subHeadingFont}`}>
                          <span>{item.jobTitle}</span>
                          <span className="mx-1">
                            {item.jobTitle && item.organization && ","}
                          </span>
                          <span>{item?.organization}</span>
                        </h3>
                      </div>
                      <div className="references w-full flex justify-between">
                        <h4
                          style={{ fontSize: fontStyle.paraFont }}
                          className=""
                        >
                          {item?.email}
                        </h4>
                        <h4
                          style={{ fontSize: fontStyle.paraFont }}
                          className=""
                        >
                          {item?.phone}
                        </h4>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const Template18 = () => {
  const metadata = useResumeStore((state) => state.resume.data.metadata);
  const basics = useResumeStore((state) => state.resume.data.basics);
  const [fontStyle, setFontStyle] = useState({
    mainHeadingFont: "text-40px",
    jobtitleFont: "text-24px",
    headingFont: "text-22px",
    subHeadingFont: "text-16px",
    paraFont: "text-15px",
    paddingFont: "10px 0",
    dates: "text-14px",
    datesStyle: "text-gray-500 font-normal",
    skillsFont: "text-15px",
    contactFont: "text-13px",
  });

  return (
    <>
      <div className="resume_wrapper flex bg-[#353535] p-3 mx-auto h-min-[297mm] w-min-[210mm]">
        <div className="resume_right w-[100%] px-10 py-5 text-[#26252d]">
          <div className="resume_item resume_namerole">
            <h1
              className={`${fontStyle.mainHeadingFont} uppercase font-bold break-words text-white`}
            >
              {basics?.name}
            </h1>
            <p
              className={`${fontStyle.jobtitleFont} break-words uppercase text-white`}
            >
              {basics?.jobtitle}
            </p>
            <div className="resume_info w-[65%] text-white mt-10">
              <Profile fontStyle={fontStyle} style={{ color: "white" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="resume_wrapper flex bg-white p-3 mx-auto h-min-[297mm] w-min-[210mm]">
        <div className="resume_right w-[65%] px-10 py-5 text-[#26252d]">
          <div className="resume_item resume_profile my-5"></div>
          <div className="resume_item resume_experience my-5">
            <div className="resume_info mb-3">
              <Experience
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
            </div>
          </div>
          <div className="resume_item projects my-5">
            <div className="resume_info">
              <Projects
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
            </div>
            <div className="resume_info">
              <Awards
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
            </div>
            <div className="resume_info">
              <Certificates
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
            </div>
            <div className="resume_info">
              <References
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
            </div>
          </div>
        </div>
        <div
          className="resume_left w-[35%] min-h-[1123px] "
          style={{
            backgroundColor: metadata?.theme?.background,
            borderRadius: "9rem 9rem 0rem 0rem",
            marginTop: "-17rem",
          }}
        >
          <div className="resume_image w-full h-auto">
            {basics?.picture?.url && (
              <img
                src={basics?.picture?.url}
                alt="Resume_image"
                className="w-40 h-40 block mx-auto my-5 rounded-full"
              />
            )}
          </div>
          <div
            className="contact_details"
            style={{ color: metadata?.theme?.text }}
          >
            <div
              className={`my-4 ${fontStyle.contactFont} flex flex-col font-semibold px-8`}
            >
              {basics?.email && (
                <a
                  href={`mailto:${basics?.email}`}
                  className="hover:underline flex items-center mt-1  text-wrap w-full "
                >
                  <MdOutlineMailOutline className="mr-2" />
                  <p className="w-[90%] text-wrap break-words">
                    {basics?.email}
                  </p>
                </a>
              )}
              {basics?.phone && (
                <a
                  href={`tel:${basics?.phone}`}
                  className="hover:underline flex items-center mt-1  text-wrap w-full "
                >
                  <MdOutlinePhone className="mr-2" />
                  <p className="w-[90%] text-wrap break-words">
                    {basics?.phone}
                  </p>
                </a>
              )}
              <div className="resume_item resume_address font-semibold">
                {(basics?.city || basics?.country) && (
                  <p className="flex items-center">
                    <IoLocationOutline />
                    <span>{basics?.city}</span>
                    <span>{basics?.city && basics?.country && " , "}</span>
                    <span className="">{basics?.country}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="resume_bottom px-8">
            <div className="resume_item resume_profile">
              <Education
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
            </div>

            <div className="resume_item resume_skills py-5">
              <div className="resume_info">
                <Skills
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
                <Hobbies
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
                <Languages
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template18;
