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
import Link from "next/link";
import { isValidUrl } from "./ValidateUrl";
import { AiOutlineLink } from "react-icons/ai";

const Education = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.education
  );
  return (
    <div className="education_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="education_header">
            <h2
              className={`font-semibold font-serif p-2 ${fontStyle.subMianHeadingFont}`}
              style={{
                backgroundColor: colorBackground,
                color: colorText
              }}
            >
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-800">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="education1 my-5" key={index}>
                    <div className="education_names flex w-full justify-between my-1">
                      <div className="education_degree w-full">
                        <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                          {item?.degree}
                        </h3>
                        <h4 style={{ fontSize: fontStyle.paraFont }}>
                          {item?.institute}
                        </h4>
                      </div>
                      <div className="education_year text-end w-full">
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

const Awards = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.awards);
  return (
    <div className="education_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="education_header">
            <h2
              className={`font-semibold font-serif p-2  ${fontStyle.subMianHeadingFont}`}
              style={{
                backgroundColor: colorBackground,
                color: colorText
              }}
            >
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-800">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="education1 my-5" key={index}>
                    <div className="education_names flex w-full justify-between my-1">
                      <div className="education_degree w-full">
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
                      <div className="education_year text-end w-full">
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
              className={`font-semibold font-serif p-2 ${fontStyle.subMianHeadingFont}`}
              style={{
                backgroundColor: colorBackground,
                color: colorText
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
                        <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                          <span>{item.jobTitle}</span>
                          <span className="mx-1">{item.jobTitle && item.organization && ','}</span>
                          <span>{item?.organization}</span>
                        </h3>
                      </div>
                      <div className="references w-full flex justify-between">
                        <h4
                          style={{ fontSize: fontStyle.paraFont }}
                          className="font-bold"
                        >
                          {item?.email}
                        </h4>
                        <h4
                          style={{ fontSize: fontStyle.paraFont }}
                          className="font-bold"
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

const Experience = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume.data?.sections?.experience
  );

  return (
    <div className="experience_section w-full mt-2">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="experience_header w-full">
            <h2
              className={`font-semibold font-serif p-2 ${fontStyle.subMianHeadingFont}`}
              style={{
                backgroundColor: colorBackground,
                color: colorText
              }}
            >
              {data?.name}
            </h2>
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

const Projects = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.projects);
  return (
    <div className="project_section my-2">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div className="project_heading w-full">
            <h2
              className={`font-semibold font-serif p-2 ${fontStyle.subMianHeadingFont}`}
              style={{
                backgroundColor: colorBackground,
                color: colorText,
              }}
            >
              {data?.name}
            </h2>
          </div>
          {data?.items.map((item, index) => {
            return (
              <div className="projects1 w-full my-3" key={index}>
                <div className="post flex justify-between my-2 w-full">
                  <div className="post_title w-full">
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
                  <div className="year w-full text-end">
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
        <div className="skills_section px-5 py-10">
          <h2
            className={`text-3xl font-semibold p-2 mb-4 font-serif text-orange-400 ${fontStyle.headingFont}`}
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
                    className={`font-bold ${fontStyle.skillsFont} my-1 py-2 px-4`}
                    key={i}
                  >
                    <div className="text-start w-1/2 mb-1 whitespace-nowrap text-white">
                      <span>{item?.name}</span>
                    </div>
                    <div className="w-1/2 text-end bg-white h-2.5">
                      <div
                        className="bg-orange-400 h-2.5"
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

const Languages = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.language
  );

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
        <div className="language_section px-5 py-10">
          <h2
            className={`text-3xl font-semibold p-2 mb-4 font-serif text-orange-400 ${fontStyle.headingFont}`}
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
                    className={`font-bold ${fontStyle.skillsFont} my-1 py-2 px-4`}
                    key={i}
                  >
                    <div className="text-start w-1/2 mb-1 whitespace-nowrap text-white">
                      <span>{item?.name}</span>
                    </div>
                    <div className="w-1/2 text-end bg-white h-2.5">
                      <div
                        className="bg-orange-400 h-2.5"
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

const Hobbies = ({ fontStyle }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.hobbies
  );
  return (
    <div className="px-5 py-10">
      <h2
        className={`text-3xl font-semibold p-2 mb-4 font-serif text-orange-400 ${fontStyle.headingFont}`}
      >
        {data?.name}
      </h2>
      <div className="hobbies_section">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul>
              {data?.items?.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="text-15px text-white pl-4 py-2 font-semibold"
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

const Certificates = ({ fontStyle }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.certificates
  );
  return (
    <div className="px-5 py-10">
      <h2
        className={`text-3xl font-semibold p-2 mb-4 font-serif text-orange-400 ${fontStyle.headingFont}`}
      >
        {data?.name}
      </h2>
      <div className="hobbies_section">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul>
              {data?.items?.map((item, index) => {
                return (
                  <div className="certificate_section px-2" key={index}>
                    {isValidUrl(item?.url) ? (
                      <a
                        href={item?.url}
                        target="_blank"
                        className="break-words text-xl items-center font-bold text-white inline-flex"
                      >
                        {item?.name}
                        <AiOutlineLink className="ml-1" />
                      </a>
                    ) : (
                      <p className="break-words text-xl font-bold text-white">
                        {item.name}
                      </p>
                    )}
                    <div
                      className={`py-2 ${fontStyle.paraFont} break-words text-white`}
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

const Profile = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.summary);
  const htmlContent = data?.content;
  return (
    <div>
      {data?.visible && (
        <div className="profile_section w-full">
          <div className="profile_heading w-full">
            <h2
              className={`font-semibold font-serif p-2 ${fontStyle.subMianHeadingFont}`}
              style={{
                backgroundColor: colorBackground,
                color: colorText
              }}
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

const Template26 = () => {
  const metadata = useResumeStore((state) => state.resume.data.metadata);
  const basics = useResumeStore((state) => state.resume.data.basics);
  const data = useResumeStore((state) => state?.resume?.data?.sections);

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
      <div>
        <div className="w-full bg-white shadow-lg rounded-lg flex">
          <div className="p-4 w-[40%]" style={
            {
              backgroundColor: metadata?.theme?.primary
            }
          }>
            <div>
              <header className="px-6 py-16 whitespace-nowrap">
                <h1 className="text-4xl font-bold mb-2" style={{
                  color: metadata?.theme?.text
                }}>
                  {basics?.name}
                </h1>
                <h2 className="text-lg text-white">{basics?.jobtitle}</h2>
              </header>
              <section className="px-5">
                <h2
                  className={`text-3xl font-semibold p-2 mb-4 font-serif ${fontStyle.headingFont}`}
                  style={{
                    color: metadata?.theme?.text
                  }}
                >
                  Contact
                </h2>
                <ul className="flex flex-col gap-3 mt-2 px-2" style={{
                  color: metadata?.theme?.text
                }}>
                  <li className="flex items-center gap-3">
                    {basics?.phone && (
                      <a
                        href={`tel:${basics?.phone}`}
                        className="hover:underline flex items-center mt-1 text-wrap w-full text-white"
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
                        <IoLocationOutline className="mr-2 " />
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
              <section>
                <Skills
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </section>
              <section>
                <Hobbies
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </section>
              <section>
                <Languages
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </section>
              <section>
                <Certificates
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </section>
            </div>
          </div>
          <div className="p-8 w-[60%]">
            <div className="flex justify-center rounded-full items-center mb-4 border-l-8 p-6" style={{
              borderColor: metadata?.theme?.primary
            }}>
              {/* <img
                src="/pic.jpg"
                alt="Profile"
                className="rounded-full     h-44 object-cover"
              /> */}
              {basics?.picture?.url && (
                <div className="profile_pic">
                  <img
                    src={basics?.picture?.url}
                    alt="pic"
                    className="w-52 h-48 rounded-full object-cover"
                  />
                </div>
              )}
            </div>

            <section className="mb-8">
              <div className="profile">
                <Profile
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                  className="mt-0 pl-0"
                />
              </div>
              <div className="education py-2">
                <Education
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              <div className="experience py-2">
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
              <div className="reference">
                <References
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
            </section>
            <section className="mb-8"></section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template26;
