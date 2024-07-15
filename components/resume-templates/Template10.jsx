import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useResumeStore } from "@/app/store/ResumeStore";
import { FaXTwitter } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import { HiCube } from "react-icons/hi2";
import Link from "next/link";
import { isValidUrl } from "./ValidateUrl";
import { AiOutlineLink } from "react-icons/ai";

const Education = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.education
  );
  return (
    <div className="education_section">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <h2
            className={`py-2 pr-10 text-end w-[80%] font-semibold uppercase ${fontStyle.headingFont}`}
            style={{
              color: colorText,
              backgroundColor: colorBackground,
              paddingBottom: "0.25rem", // Space for the underline
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-800 px-5 py-5">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="education1 my-5" key={index}>
                    <div className="education_names flex  justify-between items-center my-2">
                      <div className="education_degree">
                        <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                          {item?.degree}
                        </h3>
                        <h4 style={{ fontSize: fontStyle.paraFont }}>
                          {item?.institute}
                        </h4>
                      </div>
                      <div className="education_year text-end">
                        <p
                          className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}
                        >
                          {item?.startDate &&
                            `${item?.startDate}${item?.endDate && " - "}`}
                          {item?.endDate}
                        </p>
                        {item?.city && (
                          <p className="text-13px flex font-normal items-center justify-end text-end">
                            <IoLocationOutline className="mr-1" />
                            {item?.city}
                          </p>
                        )}
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

const Experience = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume.data?.sections?.experience
  );

  return (
    <div className="experience_section">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="experience_heading flex gap-5 items-center">
            <h2
              className={`bg-orange-400 py-2 pr-10 text-end w-[80%] font-semibold uppercase ${fontStyle.headingFont}`}
              style={{
                color: colorText,
                backgroundColor: colorBackground,
                paddingBottom: "0.25rem", // Space for the underline
              }}
            >
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div className="experience_1 my-2 p-5" key={index}>
                <div className="post flex  justify-between items-center my-2">
                  <div className="post_title">
                    <h3
                      style={{ fontSize: fontStyle.subHeadingFont }}
                      className="font-bold"
                    >
                      {item?.jobtitle}
                    </h3>
                    <h4
                      style={{ fontSize: fontStyle.paraFont }}
                      className="font-semibold"
                    >
                      {item?.employer}
                    </h4>
                  </div>
                  <div className="year font-bold text-end">
                    <p
                      className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}
                    >
                      <span>{item?.startDate}</span>
                      <span>{item?.startDate && item?.endDate && " - "}</span>
                      <span>{item?.endDate}</span>
                    </p>
                    {item?.city && (
                      <p className="text-13px flex font-normal items-center justify-end text-end">
                        <IoLocationOutline className="mr-1" />
                        {item?.city}
                      </p>
                    )}
                  </div>
                </div>
                <div
                  className={`${fontStyle.paraFont} break-words`}
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
            );
          })}
        </>
      )}
    </div>
  );
};

const Projects = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.projects);
  return (
    <div className="project_section my-4">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div className="project_heading flex gap-5 items-center">
            <h2
              className={`bg-orange-400 py-2 pr-10 text-end w-[80%] font-semibold uppercase ${fontStyle.headingFont}`}
              style={{
                color: colorText,
                backgroundColor: colorBackground,
                paddingBottom: "0.25rem", // Space for the underline
              }}
            >
              {data?.name}
            </h2>
          </div>
          {data?.items.map((item, index) => {
            return (
              <div className="projects1 my-3 p-5" key={index}>
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
                      className="font-semibold"
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
        <div className="skills_section py-3">
          <h2
            className={`text-white text-center border-2 p-1 uppercase ${fontStyle.headingFont}`}
            style={{
              borderColor: colorBackground,
              paddingBottom: "0.25rem", // Space for the underline
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 my-1 w-full flex justify-end items-center">
            <ul className="w-full flex flex-col gap-5 underline underline-offset-2">
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`font-bold text-white ${fontStyle.skillsFont} my-1 py-1`}
                    key={i}
                  >
                    <div className="mb-1">
                      <span>{item?.name}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2.5">
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

const Profile = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.summary);
  const htmlContent = data?.content;
  return (
    <div>
      {data?.visible && (
        <div className="profile_section w-full">
          <div className="profile_heading w-full flex gap-5 items-center">
            <h2
              className={`py-2 pr-10 text-end w-[80%] font-semibold uppercase ${fontStyle.headingFont}`}
              style={{
                color: colorText,
                backgroundColor: colorBackground,
                paddingBottom: "0.25rem", // Space for the underline
              }}
            >
              {data?.name}
            </h2>
          </div>
          <div
            className={`my-5 p-5 ${fontStyle.subHeadingFont} break-words`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
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
          className={`text-white text-center border-2 p-1 uppercase ${fontStyle.headingFont}`}
          style={{ borderColor: colorBackground }}
        >
          {data?.name}
        </h2>
      )}
      <div className="hobbies_section mt-5">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul className="pl-5 list-disc">
              {data?.items?.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="text-15px py-2 font-semibold text-white"
                  >
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
        <div className="skills_section py-3">
          <h2
            className={`text-white text-center border-2 p-1 uppercase ${fontStyle.headingFont}`}
            style={{
              borderColor: colorBackground,
              paddingBottom: "0.25rem", // Space for the underline
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 my-1 w-full flex justify-end items-center">
            <ul className="w-full flex flex-col gap-5 underline underline-offset-2">
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`font-bold text-white ${fontStyle.skillsFont} my-1 py-1`}
                    key={i}
                  >
                    <div className="mb-1">
                      <span>{item?.name}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2.5">
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

const Awards = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.awards);
  return (
    <div className="awards_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="experience_heading flex gap-5 items-center">
            <h2
              className={`py-2 pr-10 text-end w-[80%] font-semibold uppercase ${fontStyle.headingFont}`}
              style={{
                color: colorText,
                backgroundColor: colorBackground,
              }}
            >
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-800 px-5">
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

const Certificates = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.certificates
  );
  return (
    <div>
      <div className="experience_heading flex gap-5 items-center">
        <h2
          className={`py-2 pr-10 text-end w-[80%] font-semibold uppercase ${fontStyle.headingFont}`}
          style={{
            color: colorText,
            backgroundColor: colorBackground,
          }}
        >
          {data?.name}
        </h2>
      </div>
      <div className="certificate_section mt-5 px-5">
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
                        className="break-words text-xl items-center font-bold inline-flex"
                      >
                        {item?.name}
                        <AiOutlineLink className="ml-1" />
                      </a>
                    ) : (
                      <p className="break-words text-xl font-bold">
                        {item.name}
                      </p>
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
          <div className="references_header">
            <h2
              className={`text-white text-center border-2 p-1 uppercase ${fontStyle.headingFont}`}
              style={{ borderColor: colorBackground }}
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
                            className="break-words text-16px items-center text-white inline-flex"
                          >
                            {item?.name}
                            <AiOutlineLink className="ml-1" />
                          </a>
                        ) : (
                          <p className="break-words text-15px text-white">
                            {item.name}
                          </p>
                        )}
                        <h3
                          className={`${fontStyle.subHeadingFont} text-white`}
                        >
                          {item.jobTitle}
                        </h3>
                        <h3
                          className={`${fontStyle.subHeadingFont} text-white`}
                        >
                          {item?.organization}
                        </h3>
                      </div>
                      <div className="references w-full text-white">
                        <h4 style={{ fontSize: fontStyle.paraFont }}>
                          {item?.email}
                        </h4>
                        <h4 style={{ fontSize: fontStyle.paraFont }}>
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

const Template10 = () => {
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
      <div className="template_10 w-full min-h-screen">
        <div className="h-full">
          <div className="grid grid-cols-12 h-full">
            <div className="col-span-8 bg-white">
              <div className="left_side">
                <div className="user_profile">
                  <div className="profile_section relative p-20 z-50">
                    {basics?.picture?.url && (
                      <img
                        src={basics.picture.url}
                        alt="pic"
                        className="w-52 h-52 rounded-full border-8 border-slate-800 bg-orange-400"
                      />
                    )}
                    <div
                      className="user_name h-[125px] w-full absolute -z-10 top-32 -right-64 -mr-2 py-5 text-start pl-14"
                      style={{
                        backgroundColor: metadata?.theme?.primary,
                        color: metadata?.theme?.text,
                      }}
                    >
                      <h2 className="text-4xl uppercase font-semibold">
                        {" "}
                        {basics?.name}
                      </h2>
                      <p className="text-base font-semibold">
                        {basics?.jobtitle}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="profile_detail">
                  <Profile
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div className="education">
                  <Education
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div className="experience">
                  <Experience
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div className="projects">
                  <Projects
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div className="awards">
                  <Awards
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div className="certificate">
                  <Certificates
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-4 bg-slate-800 w-full h-full">
              <div className="right_side p-10 h-full relative">
                <div className="contact_section pt-[330px]">
                  <h2
                    className="text-xl text-white text-center border-2 p-1 uppercase"
                    style={{ borderColor: metadata?.theme?.primary }}
                  >
                    Contact Me
                  </h2>
                  <div className="contact_details flex">
                    <div
                      className={`text-white my-4 ${fontStyle.contactFont} flex flex-col gap-2 text-center`}
                    >
                      {basics?.email && (
                        <a
                          href={`mailto:${basics?.email}`}
                          className="hover:underline flex items-center mt-1  text-wrap w-full "
                        >
                          <MdOutlineMailOutline className="mr-2 text-white" />
                          <p className="text-wrap break-words">
                            {basics?.email}
                          </p>
                        </a>
                      )}
                      {basics?.phone && (
                        <a
                          href={`tel:${basics?.phone}`}
                          className="hover:underline flex items-center mt-1  text-wrap w-full "
                        >
                          <MdOutlinePhone className="mr-2 text-white" />
                          <p className="text-wrap break-words">
                            {basics?.phone}
                          </p>
                        </a>
                      )}
                      {(basics?.city || basics?.country) && (
                        <p className="flex items-center break-words">
                          <IoLocationOutline className="mr-2 text-white" />
                          {basics?.city}
                          {basics?.city && basics?.country && " , "}
                          {basics?.country}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="skills mt-10">
                  <Skills
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div className="hobbies mt-10">
                  <Hobbies
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div className="languages mt-10">
                  <Languages
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div
                  className="references mt-10"
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                >
                  <References
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div className="socials absolute bottom-5 border-t-2 border-white w-[70%]">
                  <div className="flex justify-between mt-5 mx-4">
                    <FaXTwitter
                      className="text-base mr-2"
                      style={{ color: metadata?.theme?.primary }}
                    />
                    <MdOutlineMailOutline
                      className="text-base mr-2"
                      style={{ color: metadata?.theme?.primary }}
                    />
                    <FaGlobe
                      className="text-base mr-2"
                      style={{ color: metadata?.theme?.primary }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template10;
