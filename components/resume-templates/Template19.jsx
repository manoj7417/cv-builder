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

const Education = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.education
  );
  return (
    <div className="education_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="education_header">
            <h2 className={`font-semibold uppercase ${fontStyle.headingFont}`}>
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-800">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="education1 my-5" key={index}>
                    <div className="education_names my-1">
                      <div className="education_degree">
                        <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                          {item?.degree}
                        </h3>
                        <h4 style={{ fontSize: fontStyle.paraFont }}>
                          {item?.institute}
                        </h4>
                      </div>
                      <div className="education_year">
                        <p
                          className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}
                        >
                          {item?.startDate &&
                            `${item?.startDate}${item?.endDate && " - "}`}
                          {item?.endDate}
                        </p>
                        {item?.city && (
                          <p className="text-13px flex font-normal items-center mt-1">
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

const Experience = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume.data?.sections?.experience
  );

  return (
    <div className="experience_section w-full mt-5">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="experience_header w-full">
            <h2 className={`font-semibold uppercase ${fontStyle.headingFont}`}>
              {data?.name}
            </h2>
            <div className="border-b-2 border-gray-600"></div>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div className="experience_1 w-full py-2" key={index}>
                <div className="post flex  justify-between my-2">
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
                      <p className="text-13px flex font-normal items-center justify-end text-end my-1">
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
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

const Projects = ({ fontStyle, headingColor }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.projects);
  return (
    <div className="project_section my-4">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div className="project_heading w-full">
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont}`}
              style={{
                color: headingColor,
              }}
            >
              {data?.name}
            </h2>
            <div className="border-b-2 border-gray-600"></div>
          </div>
          {data?.items.map((item, index) => {
            return (
              <div className="projects1 w-full my-3" key={index}>
                <div className="post flex justify-between items-center my-2">
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

const Skills = ({ fontStyle, headingColor }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.skills);
  console.log("skills data:::", data);

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
          <div className="skill_head">
            <h2
              className={`uppercase text-2xl font-bold ${fontStyle.headingFont}`}
              style={{
                color: headingColor,
              }}
            >
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-600 w-full">
            <ul className="w-full">
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`font-bold ${fontStyle.skillsFont} my-1`}
                    key={i}
                  >
                    <div className="text-start w-1/2 mb-1">
                      <span>{item?.name}</span>
                    </div>
                    <div className="w-1/2 text-end bg-white h-2.5">
                      <div
                        className="bg-black h-2.5"
                        style={{ width: `${level}%` }}
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

const Profile = ({ fontStyle, headingColor }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.summary);
  const htmlContent = data?.content;
  return (
    <div>
      {data?.visible && (
        <div className="profile_section w-full">
          <div className="profile_heading w-full">
            <h2
              className={`text-gray-700 font-semibold uppercase ${fontStyle.headingFont}`}
            >
              {data?.name}
            </h2>
            <div className="border-b-2 border-gray-600"></div>
          </div>
          <div
            className={`text-sm py-2 mt-3 ${fontStyle.subHeadingFont} break-words`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        </div>
      )}
    </div>
  );
};

export const Template19 = () => {
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
      <div className="p-custom space-y-3 mx-auto h-min-[297mm] w-min-[210mm]">
        <div className="bg-white mx-auto h-min-[297mm] w-min-[210mm]">
          <div
            className="top_section flex justify-around items-center text-white py-10 clip-resume"
            style={{
              backgroundColor: metadata?.theme?.primary,
            }}
          >
            {basics?.picture?.url && (
              <div className="profile_pic w-[30%] flex items-center justify-center">
                <img
                  src={basics?.picture?.url}
                  alt="pic"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
            <div className="name_profile w-[70%]  h-full px-10">
              <h1
                className={`${fontStyle.mainHeadingFont} uppercase font-bold break-words`}
              >
                {basics?.name}
              </h1>
              <p className={`${fontStyle.jobtitleFont} break-words uppercase`}>
                {basics?.jobtitle}
              </p>
            </div>
          </div>
          <div className="resume_section flex flex-row w-[210mm] h-full">
            <div className="md:w-[30%] w-full left_side bg-[#eee8e3] -mt-4">
              <div className="left_side p-5">
                <div className="contact_section mt-5">
                  <h2
                   className={`font-semibold uppercase text-xl`}
                  >
                    Contact Details
                  </h2>
                  <div
                    className={`text-gray-600 my-4 ${fontStyle.contactFont}`}
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
                <Education fontStyle={fontStyle} />
                <Skills fontStyle={fontStyle} />
              </div>
            </div>
            <div className="md:w-[70%] w-full right_side p-5">
              <Profile fontStyle={fontStyle} />
              <Experience fontStyle={fontStyle} />
              <Projects fontStyle={fontStyle} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template19;
