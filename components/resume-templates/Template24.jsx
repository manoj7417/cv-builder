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
import { isValidUrl } from "./ValidateUrl";
import { AiOutlineLink } from "react-icons/ai";

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

const Hobbies = ({ fontStyle, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.hobbies
  );
  return (
    <div className="py-10">
      {data?.visible && data?.items.length > 0 && (
        <h2
          className={`text-3xl font-semibold p-2 mb-4 font-serif text-center ${fontStyle.headingFont}`}
          style={{
            color: colorText,
          }}
        >
          {data?.name}
        </h2>
      )}

      <div className="hobbies_section">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul>
              {data?.items?.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="text-15px py-2 font-semibold"
                    style={{
                      color: colorText,
                    }}
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

const Awards = ({ fontStyle, headingColor }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.awards);
  return (
    <div className="education_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="education_header">
            <h2
              className={`font-semibold font-serif ${fontStyle.subMianHeadingFont}`}
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
                            className="break-words text-base items-center font-bold inline-flex"
                          >
                            {item?.name}
                            <AiOutlineLink className="ml-1" />
                          </a>
                        ) : (
                          <p className="break-words text-base font-bold">
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

const References = ({ fontStyle, headingColor, colorText }) => {
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
                color: colorText,
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
                            className="break-words text-16px items-center font-bold inline-flex"
                            style={{
                              color: colorText,
                            }}
                          >
                            {item?.name}
                            <AiOutlineLink className="ml-1" />
                          </a>
                        ) : (
                          <p
                            className="break-words text-15px font-bold"
                            style={{
                              color: colorText,
                            }}
                          >
                            {item.name}
                          </p>
                        )}
                        <h3
                          className={`${fontStyle.subHeadingFont}`}
                          style={{
                            color: colorText,
                          }}
                        >
                          {item.jobTitle}
                        </h3>

                        {/* <h3
                          className={`${fontStyle.subHeadingFont}`}
                          style={{
                            color: colorText,
                          }}
                        >
                          {item.jobTitle && item.organization && ","}
                        </h3> */}
                        <h3
                          className={`${fontStyle.subHeadingFont}`}
                          style={{
                            color: colorText,
                          }}
                        >
                          {item?.organization}
                        </h3>
                      </div>
                      <div
                        className="references w-full break-all"
                        style={{
                          color: colorText,
                        }}
                      >
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

const Certificates = ({ fontStyle }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.certificates
  );
  return (
    <div>
      <h2
        className={`text-3xl font-semibold p-2 mb-4 font-serif ${fontStyle.headingFont}`}
      >
        {data?.name}
      </h2>
      <div className="hobbies_section">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul>
              {data?.items?.map((item, index) => {
                return (
                  <div className="certificate_section px-2 py-2" key={index}>
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
                      <p className="break-words text-base font-bold">
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
          </div>
          {data?.items.map((item, index) => {
            return (
              <div className="projects1 w-full my-3" key={index}>
                <div className="post flex justify-between w-full my-2">
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
                  <div className="year text-end">
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

const Skills = ({ fontStyle, headingColor, colorText }) => {
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
              color: colorText,
            }}
          >
            {data?.name}
          </h2>
          <div
            className="w-full flex justify-end items-center"
            style={{
              color: colorText,
            }}
          >
            <ul className="w-full">
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`font-bold ${fontStyle.skillsFont} my-1 py-2`}
                    key={i}
                  >
                    <div
                      className="text-start w-full mb-1 flex flex-wrap"
                      style={{
                        color: colorText,
                      }}
                    >
                      <span>{item?.name}</span>
                    </div>
                    <div className="w-1/2 text-end bg-white h-2.5">
                      <div
                        className="bg-gray-600 h-2.5"
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

const Languages = ({ fontStyle, headingColor, colorText }) => {
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
            className={`text-3xl font-semibold p-2 mb-4 font-serif text-center ${fontStyle.headingFont}`}
            style={{
              color: colorText,
            }}
          >
            {data?.name}
          </h2>
          <div
            className="w-full flex justify-end items-center"
            style={{
              color: colorText,
            }}
          >
            <ul className="w-full">
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`font-bold ${fontStyle.skillsFont} my-1 py-2`}
                    key={i}
                  >
                    <div className="text-start w-1/2 mb-1 whitespace-nowrap">
                      <span>{item?.name}</span>
                    </div>
                    <div className="w-1/2 text-end bg-white h-2.5">
                      <div
                        className="bg-gray-600 h-2.5"
                        style={{
                          width: `${level}%`,
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

const Profile = ({ fontStyle, headingColor }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.summary);
  const htmlContent = data?.content;
  return (
    <div>
      {data?.visible && (
        <div className="profile_section w-full">
          <div className="profile_heading w-full">
            <h2
              className={`font-semibold font-serif text-[#64665e] ${fontStyle.subMianHeadingFont}`}
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

const Template24 = () => {
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
        <div className="h-auto w-[793px] shadow-lg rounded-lg flex">
          <div className="bg-gray-200 flex flex-col w-1/3">
            <div
              className="rounded-b-full pt-10"
              style={{
                backgroundColor: metadata?.theme?.primary,
                color: metadata?.theme?.text,
              }}
            >
              <header className="font-serif text-center mb-4">
                <h1 className="text-3xl">{basics?.name}</h1>
                <p className="text-lg">{basics?.jobtitle}</p>
              </header>

              <div className="pb-6 flex items-center justify-center">
                <div className="rounded-full border-4">
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
              </div>
            </div>
            <section className="py-12 px-8">
              <h2 className="flex justify-center items-center text-xl font-semibold border-b-2 p-2">
                CONTACT ME
              </h2>
              <ul className="flex flex-col gap-3 mt-2 px-2">
                <li className="flex items-center gap-3">
                  {basics?.phone && (
                    <a
                      href={`tel:${basics?.phone}`}
                      className="hover:underline flex items-center mt-1 text-wrap w-full"
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
                    <p className="flex items-center">
                      <IoLocationOutline className="mr-2" />
                      <span>{basics?.city}</span>
                      <span>{basics?.city && basics?.country && " , "}</span>
                      <span>{basics?.country}</span>
                    </p>
                  )}
                </li>
                <li className="flex items-center gap-3">
                  {basics?.email && (
                    <a
                      href={`mailto:${basics?.email}`}
                      className="hover:underline flex items-center mt-1 text-wrap w-full"
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
            <div
              className="rounded-t-full pt-16 px-8 flex-grow"
              style={{
                backgroundColor: metadata?.theme?.primary,
              }}
            >
              <Skills fontStyle={fontStyle} colorText={metadata?.theme?.text} />
              <Hobbies
                fontStyle={fontStyle}
                colorText={metadata?.theme?.text}
              />
              <Languages
                fontStyle={fontStyle}
                colorText={metadata?.theme?.text}
              />
              <References
                fontStyle={fontStyle}
                colorText={metadata?.theme?.text}
              />
            </div>
          </div>
          <div className="pt-10 px-5 w-2/3">
            <section>
              <div className="profile_section">
                <Profile
                  fontStyle={fontStyle}
                  colorStyle={metadata?.theme?.primary}
                />
              </div>
            </section>
            <section>
              <div className="projects py-2">
                <Projects
                  fontStyle={fontStyle}
                  colorStyle={metadata?.theme?.primary}
                />
              </div>
              <div className="experience py-2">
                <Experience
                  fontStyle={fontStyle}
                  colorStyle={metadata?.theme?.primary}
                />
              </div>
              <div className="education py-2">
                <Education fontStyle={fontStyle} />
              </div>
              <div className="awards py-2">
                <Awards fontStyle={fontStyle} />
              </div>
              <div className="certificate py-2">
                <Certificates fontStyle={fontStyle} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template24;
