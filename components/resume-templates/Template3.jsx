"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { FaGraduationCap, FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useResumeStore } from "@/app/store/ResumeStore";
import { isValidUrl } from "./ValidateUrl";
import { BiSolidGroup } from "react-icons/bi";
import { AiOutlineLink } from "react-icons/ai";

const Education = ({ fontStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.education);
  return (
    <div className="education_section py-3">
      {data.visible && data?.items?.length > 0 && (
        <>
          <h2
            className={`text-xl text-gray-600 font-semibold uppercase ${fontStyle.headingFont}`}
          >
            {data?.name}
          </h2>
          <div className="text-gray-800 my-5">
            {data?.items?.map((item, index) => {
              return (
                <div className="education1 my-5" key={index}>
                  <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                    {item?.degree}
                  </h3>
                  <h4 style={{ fontSize: fontStyle.paraFont }}>
                    {item?.institute}
                  </h4>
                  <p className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}>
                    {item?.startDate &&
                      `${item?.startDate}${item?.endDate && " - "}`}
                    {item?.endDate}
                  </p>
                  <div
                    className={`py-2 ${fontStyle.paraFont} break-words`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const Experience = ({ fontStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.experience);
  return (
    <div className="experience_section my-2">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="experience_heading flex gap-5 items-center">
            <div className="icon bg-gray-300 p-2">
              <FaGraduationCap />
            </div>
            <h2
              style={{ fontSize: fontStyle.headingFont }}
              className="text-xl font-bold uppercase"
            >
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div className="experience_1 my-5" key={index}>
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
                  <div className="year font-bold">
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

const Projects = ({ fontStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.projects);
  return (
    <div className="project_section my-4">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div className="project_heading flex gap-5 items-center">
            <div className="icon bg-gray-300 p-2">
              <FaGraduationCap />
            </div>
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

const Skills = ({ fontStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.skills);
  return (
    <div>
      {data.visible && data.items.length > 0 && (
        <div className="skills_section border-b-2 border-gray-300 py-3">
          <h2
            className={`text-xl text-gray-600 font-semibold uppercase ${fontStyle.headingFont}`}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 my-1">
            <ul className="list-disc pl-5">
              {data.items.map((item, i) => {
                return (
                  <li
                    className={`font-bold text-gray-600 ${fontStyle.skillsFont}`}
                    key={i}
                  >
                    {item?.name}
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

const Profile = ({ fontStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.summary);
  const htmlContent = data.content;
  return (
    <div>
      {data?.visible && (
        <div className="profile_section">
          <div className="profile_heading flex gap-5 items-center">
            <div className="icon bg-gray-300 p-2">
              <FaUser />
            </div>
            <h2 className={`${fontStyle.headingFont} font-bold uppercase`}>
              {data?.name}
            </h2>
          </div>
          <div
            className={`my-5 ${fontStyle.subHeadingFont} break-words`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        </div>
      )}
    </div>
  );
};

const Hobbies = ({ fontStyle }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.hobbies);

  return (
    <div className="border-b-2 border-gray-300 py-3">
      {data?.visible && data?.items.length > 0 && (
        <div className="hobbies_section">
          <h2
            className={`${fontStyle.headingFont} text-gray-600 font-semibold uppercase`}
          >
            {data?.name}
          </h2>
          <ul className="list-disc pl-5">
            {data?.items?.map((item, index) => {
              return (
                <li
                  key={index}
                  className="break-words text-15px font-bold text-gray-600"
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

const Certificates = ({ fontStyle }) => {
  const data = useResumeStore(
    (state) => state.resume.data.sections.certificates
  );
  return (
    <>
      {data.visible && data.items.length > 0 && (
        <div className="border-b-2 border-gray-300 py-3">
          <h2
            className={`text-xl text-gray-600 font-semibold uppercase ${fontStyle.headingFont} break-words`}
          >
            {data?.name}
          </h2>
          <div>
            {data?.items?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="break-words text-13px font-bold text-gray-600 my-2"
                >
                  <>
                    {isValidUrl(item?.url) ? (
                      <a
                        href={item?.url}
                        target="_blank"
                        className="break-words text-15px font-bold text-gray-600 inline-flex"
                      >
                        {item?.name}
                        <AiOutlineLink className="ml-1 mt-1" />
                      </a>
                    ) : (
                      <p className="break-words text-15px font-bold text-gray-600">
                        {item.name}
                      </p>
                    )}
                  </>
                  <div
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                    className="w-full font-normal"
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

const Awards = ({ fontStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.awards);
  console.log(data);
  return (
    <div className="">
      {data.visible && data?.items.length > 0 && (
        <div className="py-3">
          <div className="project_heading flex gap-5 items-center">
            <div className="icon bg-gray-300 p-2">
              <FaGraduationCap />
            </div>
            <h2 className={`${fontStyle.headingFont} font-bold uppercase`}>
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div
                key={index}
                className="break-words text-13px font-bold text-gray-600 my-3"
              >
                <>
                  <div className="mt-2 flex justify-between">
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
                    <p className="break-words text-14px font-thin text-gray-600">
                      {item?.date}
                    </p>
                  </div>
                </>
                <div className="w-full ">
                  <p className="text-15px"> {item.issuer}</p>
                  <div
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}{" "}
    </div>
  );
};

const Reference = ({ fontStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.reference);
  return (
    <>
      {data.visible && data?.items.length > 0 && (
        <div className="py-3">
          <div className="project_heading flex gap-5 items-center">
            <div className="icon bg-gray-300 p-2">
              <FaGraduationCap />
            </div>
            <h2 className={`${fontStyle.headingFont} font-bold uppercase`}>
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div
                key={index}
                className="break-words text-13px font-bold text-gray-600 my-3"
              >
                <>
                  <div className="mt-2">
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
                  </div>
                </>
                <div className="w-full ">
                  <p className="text-16px">
                    {" "}
                    {item.jobTitle} , <span>{item.organization}</span>
                  </p>
                  <p>{item.email}</p>
                  <p>{item.phone}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export const Template3 = () => {
  const metadata = useResumeStore((state) => state.resume.data.metadata);
  const data = useResumeStore((state) => state.resume.data);
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
      <div className="p-custom space-y-3">
        <div className="bg-white mx-auto">
          <div
            className="top_section flex justify-around items-center py-10"
            style={{
              backgroundColor: metadata?.theme?.primary,
            }}
          >
            <div
              className="name_profile w-[70%] h-full px-10"
              style={{ color: metadata?.theme?.text }}
            >
              <h1
                className={`${fontStyle.mainHeadingFont} uppercase font-bold break-words `}
              >
                {basics?.name}
              </h1>
              <p className={`${fontStyle.jobtitleFont} break-words uppercase`}>
                {basics?.jobtitle}
              </p>
            </div>
            {basics?.picture?.url && (
              <div className="profile_pic w-[30%] flex items-center justify-center">
                <img
                  src={basics?.picture?.url}
                  alt="pic"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="resume_section mt-5 flex flex-row">
            <div className="md:w-[30%] w-full left_side border-r-2 border-gray-300 p-5">
              <div className="contact_section border-b-2 border-gray-300 pb-3">
                <h2
                  className={`text-xl text-gray-600 font-semibold uppercase ${fontStyle.headingFont}`}
                >
                  Details
                </h2>
                <div className={`text-gray-600 my-4 ${fontStyle.contactFont}`}>
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
                  {(basics?.city || basics?.country) && (
                    <p className="flex items-center break-words">
                      <IoLocationOutline className="mr-2" />
                      {basics?.city}
                      {basics?.city && basics?.country && " , "}
                      {basics?.country}
                    </p>
                  )}
                </div>
              </div>
              <Skills fontStyle={fontStyle} />
              <Education fontStyle={fontStyle} />
              <Hobbies fontStyle={fontStyle} />
              <Certificates fontStyle={fontStyle} />
            </div>
            <div className="md:w-[70%] w-full right_side p-5">
              <Profile fontStyle={fontStyle} />
              <Experience fontStyle={fontStyle} />
              <Projects fontStyle={fontStyle} />
              <Reference fontStyle={fontStyle} />
              <Awards fontStyle={fontStyle} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template3;
