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
    <div className="education_section">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="flex gap-5 items-center" style={{ color: colorText }}>
            <h2 className={`${fontStyle.headingFont} font-semibold uppercase`}>
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-800 my-2">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div
                    className="education1 my-2"
                    key={index}
                    style={{ color: colorText }}
                  >
                    <div className="year">
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
                      <h4 style={{ fontSize: fontStyle.paraFont }} className="font-medium">
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

const Experience = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state.resume.data.sections.experience);
  return (
    <div className="experience_section my-2">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div
            className="experience_heading flex gap-5 items-center"
            style={{
              borderBottom: `1px solid ${colorBackground}`,
              color: colorBackground,
            }}
          >
            <h2
              style={{ fontSize: fontStyle.headingFont }}
              className="text-xl font-bold uppercase"
            >
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div className="experience_1 flex my-5" key={index}>
                <div className="content w-[100%]  flex flex-col break-all">
                  <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                    {item?.jobtitle}
                  </h3>
                  <h4 style={{ fontSize: fontStyle.paraFont }} className="font-medium">
                    {item?.employer}
                  </h4>
                  {item?.startDate && (
                    <p className="flex">
                      {item.startDate}
                      {item?.endDate && " - "}
                      {item?.endDate && <p>{item.endDate}</p>}
                    </p>
                  )}
                  <div
                    className="year_line"
                    style={{
                      background: colorBackground,
                    }}
                  />
                  <div
                    className={`py-2 ${fontStyle.paraFont} break-words`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></div>
                  <div className="px-3 py-2">
                    {item?.highlights?.length > 0 && (
                      <ul className="list-disc pl-2">
                        {item?.highlights?.map((item, key) => {
                          return (
                            <li key={key} className="py-2 break-words text-15px">
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

const Projects = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state.resume.data.sections.projects);
  return (
    <div className="project_section my-4">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div
            className="project_heading flex gap-5 items-center"
            style={{
              borderBottom: `1px solid ${colorBackground}`,
              color: colorBackground,
            }}
          >
            <h2 className={`${fontStyle.headingFont} font-bold uppercase`}>
              {data?.name}
            </h2>
          </div>
          {data?.items.map((item, index) => {
            return (
              <div className="projects1 my-3" key={index}>
                <div className="post flex  justify-between items-center my-2">
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
                  <div className="year">
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

const Skills = ({
  fontStyle,
  colorBackground,
  colorText,
  secondaryBackground,
}) => {
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
                      className="w-1/2 text-end h-2.5"
                      style={{
                        backgroundColor: colorText,
                      }}
                    >
                      <div
                        className="h-2.5"
                        style={{
                          width: `${level}%`,
                          backgroundColor: secondaryBackground,
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

const Languages = ({
  fontStyle,
  colorBackground,
  colorText,
  secondaryBackground,
}) => {
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
                          backgroundColor: secondaryBackground,
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

const Awards = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.awards);
  return (
    <div className="awards_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div
            className="awards_header w-full"
            style={{
              borderBottom: `1px solid ${colorBackground}`,
              color: colorBackground,
            }}
          >
            <h2 className={`${fontStyle.headingFont} font-bold uppercase`}>
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

const Profile = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state.resume.data.sections.summary);
  const htmlContent = data?.content;
  return (
    <div>
      {data?.visible && (
        <div className="profile_section">
          <div
            className="profile_heading flex gap-5 items-center"
            style={{
              borderBottom: `1px solid ${colorBackground}`,
              color: colorBackground,
            }}
          >
            <h2 className={`${fontStyle.headingFont} font-bold uppercase`}>
              {data?.name}
            </h2>
          </div>
          <div
            className={`my-5 break-words ${fontStyle.subHeadingFont}`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        </div>
      )}
    </div>
  );
};

const Certificates = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.certificates
  );
  return (
    <div>
      <div
        style={{
          borderBottom: `1px solid ${colorBackground}`,
          color: colorBackground,
        }}
      >
        <h2 className={`${fontStyle.headingFont} font-bold uppercase`}>
          {data?.name}
        </h2>
      </div>
      <div className="hobbies_section mt-5">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul className="">
              {data?.items?.map((item, index) => {
                return (
                  <div className="certificate_section px-2" key={index}>
                    {isValidUrl(item?.url) ? (
                      <a
                        href={item?.url}
                        target="_blank"
                        className="break-words text-base items-center font-bold inline-flex"
                      >
                        {item?.name}
                        <AiOutlineLink className="ml-1" />
                      </a>
                    ) : (
                      <p className="break-words text-base">{item.name}</p>
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

const References = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.reference
  );
  return (
    <div className="references_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="references_header" style={{ color: colorText }}>
            <h2 className={`${fontStyle.headingFont} font-semibold uppercase`}>
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-800">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="references my-5" key={index}>
                    <div className="references_names w-full my-1">
                      <div
                        className="references w-full"
                        style={{ color: colorText }}
                      >
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
                        <h3 className={`${fontStyle.subHeadingFont}`}>
                          {item.jobTitle} ,{item?.organization}
                        </h3>
                      </div>
                      <div
                        className="references w-full"
                        style={{ color: colorText }}
                      >
                        <h4
                          style={{ fontSize: fontStyle.paraFont }}
                        >
                          {item?.email}
                        </h4>
                        <h4
                          style={{ fontSize: fontStyle.paraFont }}
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

const Template16 = () => {
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
      <div className="resume_wrapper flex bg-white  mx-auto w-full min-h-screen">
        <div
          className="resume_left w-[35%] min-h-[1123px]"
          style={{
            backgroundColor: metadata?.theme?.primary,
            color: metadata?.theme?.text,
          }}
        >
          <div style={{ height: "15px", background: "#004747" }}></div>
          <h1
            className={`${fontStyle.mainHeadingFont} uppercase font-bold break-words py-5 px-8`}
          >
            {basics?.name}
          </h1>

          <div className="resume_bottom px-8">
            <div className="resume_item resume_profile">
              <Education
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
            </div>

            <div className="resume_item resume_skills">
              <div className="resume_info my-5">
                <Skills
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                  secondaryBackground={metadata?.theme?.background}
                />
              </div>
              <div className="resume_info my-5">
                <Hobbies
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              <div className="resume_info">
                <Languages
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  secondaryBackground={metadata?.theme?.background}
                  colorText={metadata?.theme?.text}
                />
              </div>
              <div className="resume_info">
                <References
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="resume_right w-[65%] px-10 py-5 text-[#26252d]">
          <div className="resume_item resume_namerole">
            <p
              className={`${fontStyle.jobtitleFont} break-words uppercase font-bold`}
              style={{
                color: metadata?.theme?.primary,
              }}
            >
              {basics?.jobtitle}
            </p>
            <div className="contact_details w-full">
              <div
                className={`text-gray-800 my-4 ${fontStyle.contactFont} font-semibold w-full flex justify-between items-center`}
              >
                {basics?.phone && (
                  <a
                    href={`tel:${basics?.phone}`}
                    className="hover:underline flex items-center mt-1 text-wrap"
                  >
                    <MdOutlinePhone className="mr-2" />
                    <p className="w-[90%] text-wrap break-words">
                      {basics?.phone}
                    </p>
                  </a>
                )}
                {basics?.email && (
                  <a
                    href={`mailto:${basics?.email}`}
                    className="hover:underline flex items-center mt-1  text-wrap"
                  >
                    <MdOutlineMailOutline className="mr-2" />
                    <p className="w-[90%] text-wrap break-words">
                      {basics?.email}
                    </p>
                  </a>
                )}

                {(basics?.city || basics?.country) && (
                  <p className="flex items-center mt-1">
                    <IoLocationOutline className="text-black" />
                    <span>{basics?.city}</span>
                    <span>{basics?.city && basics?.country && " , "}</span>
                    <span className="">{basics?.country}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="resume_item resume_address font-semibold"></div>
          <div className="resume_item resume_profile my-5">
            <div className="resume_info">
              <Profile
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
            </div>
          </div>
          <div className="resume_item resume_experience my-5">
            <div className="resume_info">
              <Experience
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
            </div>
          </div>
          <div className="resume_item projects my-5">
            <div className="resume_info">
              <Projects
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
            </div>
            <div className="resume_info">
              <Awards
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
            </div>
            <div className="resume_info">
              <Certificates
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template16;
