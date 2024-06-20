import React, { useState } from "react";
import { FaLinkedin, FaLocationDot, FaPhone } from "react-icons/fa6";
import Image from "next/image";
import { useResumeStore } from "@/app/store/ResumeStore";
import { MdOutlineMailOutline, MdOutlineSettings } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaComputer, FaGraduationCap, FaXTwitter } from "react-icons/fa6";
import { FaGlobe, FaUserAlt } from "react-icons/fa";
import { HiCube } from "react-icons/hi2";

const Education = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.education
  );
  return (
    <div className="education_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="education_header">
            <h2
              className={`font-semibold font-serif text-[#64665e] ${fontStyle.subMianHeadingFont}`}
            >
              {data?.name}
            </h2>
            <div className="border-b-2 border-gray-600"></div>
          </div>
          <div className="text-gray-800">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="education1 my-5" key={index}>
                    <div className="education_names flex justify-between my-1">
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
                          <p className="text-13px flex font-normal items-center justify-end mt-1">
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
    <div className="experience_section w-full mt-2">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="experience_header w-full">
            <h2
              className={`font-semibold font-serif text-[#64665e] ${fontStyle.subMianHeadingFont}`}
            >
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
                  <div className="year font-bold text-end">
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
    <div className="project_section my-2">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div className="project_heading w-full">
            <h2
              className={`font-semibold font-serif text-[#64665e] ${fontStyle.subMianHeadingFont}`}
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
            className={`text-3xl font-semibold p-2 mb-4 font-serif text-center ${fontStyle.headingFont}`}
            style={{
              color: headingColor,
            }}
          >
            {data?.name}
          </h2>
          <div className="w-full flex justify-end items-center">
            <ul className="w-full">
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
                    <div className="w-1/2 text-end bg-white h-2.5">
                      <div
                        className="bg-[#a78039] h-2.5"
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
              className={`font-semibold font-serif text-white ${fontStyle.subMianHeadingFont}`}
            >
              {data?.name}
            </h2>
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

const Template25 = () => {
  const metadata = useResumeStore((state) => state.resume.data.metadata);
  const basics = useResumeStore((state) => state.resume.data.basics);

  const [fontStyle, setFontStyle] = useState({
    mainHeadingFont: "text-40px",
    subMianHeadingFont: "text-30px",
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="h-auto w-[793px] mx-auto bg-white shadow-lg rounded-lg flex">
          <div className="bg-[#dec597] p-6 w-5/12">
            <div className="flex items-center justify-center mb-8">
              {basics?.picture?.url && (
                <div className="profile_pic">
                  <img
                    src={basics?.picture?.url}
                    alt="pic"
                    className="rounded-t-full w-52 h-52 object-cover"
                  />
                </div>
              )}
            </div>

            <section className="bg-[#a78039] p-4">
              <h2 className="flex justify-between items-center text-xl text-white font-semibold border-b-2 pb-2">
                CONTACT ME
              </h2>
              <ul className="flex flex-col gap-3 mt-2 px-2">
                <li className="flex items-center gap-3">
                  {basics?.phone && (
                    <a
                      href={`tel:${basics?.phone}`}
                      className="hover:underline flex items-center mt-1  text-wrap w-full text-white"
                    >
                      <MdOutlinePhone className="mr-2" />
                      <p className="w-[90%] text-wrap break-words">
                        {basics?.phone}
                      </p>
                    </a>
                  )}
                </li>
                <li className="flex items-center gap-3">
                  {(basics?.city || basics?.country) && (
                    <p className="flex items-center text-white">
                      <IoLocationOutline className="mr-2" />
                      <span>{basics?.city}</span>
                      <span>{basics?.city && basics?.country && " , "}</span>
                      <span className="">{basics?.country}</span>
                    </p>
                  )}
                </li>
                <li className="flex items-center gap-3 text-white">
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
                </li>
              </ul>
            </section>

            <section className="mb-8 pt-8">
              <Skills fontStyle={fontStyle} />
            </section>
          </div>
          <div className="bg-[#f0f0f0] w-2/3">
            <header className="px-6 text-[#a78039] text-center pt-4">
              <h1 className="text-left text-6xl border-b-2 border-[#a78039] p-2">
                {basics?.name}
              </h1>
              <p className="font-semibold text-left text-2xl text-black py-4 px-4">
                {basics?.jobtitle}
              </p>
            </header>

            <section className="bg-[#a78039] text-white px-8 py-4">
              <div className="profile_section">
                <Profile
                  fontStyle={fontStyle}
                  colorStyle={metadata?.theme?.primary}
                />
              </div>
            </section>

            <section className="px-6 pt-4">
              <div className="experience py-2">
                <Experience
                  fontStyle={fontStyle}
                  colorStyle={metadata?.theme?.primary}
                />
              </div>
                <div className="education py-2">
                <Education fontStyle={fontStyle} />
              </div>
              <div className="projects">
                  <Projects
                    fontStyle={fontStyle}
                    colorStyle={metadata?.theme?.primary}
                  />
                </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template25;
