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
          <div
            className="education_header flex items-center gap-3"
            style={{
              color: colorBackground,
            }}
          >
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont} px-5`}
            >
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-800 px-5">
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

const Experience = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume.data?.sections?.experience
  );

  return (
    <div className="experience_section w-full mt-5">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div
            className="experience_header flex items-center gap-3"
            style={{
              color: colorBackground,
            }}
          >
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont} px-5`}
            >
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div className="experience_1 w-full px-5 py-2" key={index}>
                <div className="post my-2">
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
                      <p className="text-13px flex font-normal items-center my-1">
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
    <div className="project_section my-4">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div
            className="project_heading w-full flex gap-3 items-center"
            style={{
              color: colorBackground,
            }}
          >
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont} px-5`}
            >
              {data?.name}
            </h2>
          </div>
          {data?.items.map((item, index) => {
            return (
              <div className="projects1 w-full my-3 px-5" key={index}>
                <div className="post my-2">
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
        <div className="skills_section py-3">
          <h2
            className={`my-2 uppercase text-2xl font-bold px-5 ${fontStyle.headingFont}`}
            style={{
              color: colorBackground,
              paddingBottom: "1rem", // Space for the underline
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 my-1 w-full flex justify-end items-center">
            <ul className="w-full">
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`flex items-center sfont-bold ${fontStyle.skillsFont} my-1 py-1 px-5`}
                    key={i}
                  >
                    <div className="text-start w-1/2 mb-1">
                      <span>{item?.name}</span>
                    </div>
                    <div className="w-1/2 text-end bg-gray-200 h-2.5">
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
            className={`my-2 uppercase text-2xl font-bold px-5 ${fontStyle.headingFont}`}
            style={{
              color: colorBackground,
              paddingBottom: "1rem", // Space for the underline
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 my-1 w-full flex justify-end items-center">
            <ul className="w-full">
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`flex items-center sfont-bold ${fontStyle.skillsFont} my-1 py-1 px-5`}
                    key={i}
                  >
                    <div className="text-start w-1/2 mb-1">
                      <span>{item?.name}</span>
                    </div>
                    <div className="w-1/2 text-end bg-gray-200 h-2.5">
                      <div
                        className="h-2.5"
                        style={{ width: `${level}%`,backgroundColor: colorBackground }}
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
    <div className="my-5 px-5">
      <h2
        className={`uppercase text-2xl font-bold ${fontStyle.headingFont}`}
        style={{
          color: colorBackground,
        }}
      >
        {data?.name}
      </h2>
      <div className="hobbies_section mt-5">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul className="pl-5 list-disc">
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
    <div className="awards_section w-full px-5">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div
            className="awards_header w-full"
            style={{
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
  const data = useResumeStore((state) => state?.resume.data.sections?.summary);
  const htmlContent = data?.content;
  return (
    <div>
      {data?.visible && (
        <div
          className="profile_section w-full"
          style={{
            color: colorText,
          }}
        >
          <div className="profile_heading w-full h-full flex gap-3 items-center justify-start mt-10">
            {/* <h2
              className={`font-semibold uppercase ${fontStyle.headingFont} px-5 py-2`}
            >
              {data?.name}
            </h2> */}
          </div>
          <div
            className={`px-5 ${fontStyle.subHeadingFont} break-words`}
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
    <div className="certificate_section w-full px-5">
      <div
        style={{
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

const References = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.reference
  );
  return (
    <div className="references_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div
            className="references_header"
            style={{
              color: colorBackground,
            }}
          >
            <h2
              className={`my-2 uppercase text-2xl font-bold px-5 ${fontStyle.headingFont}`}
              style={{
                paddingBottom: "1rem", // Space for the underline
              }}
            >
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-800">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="references my-5 px-5" key={index}>
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
                          <span className="mx-1">{item.jobTitle && item.organization && ','}</span>
                          <span>{item?.organization}</span>
                        </h3>
                      </div>
                      <div className="references w-full">
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

const Template13 = () => {
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
      <div className="w-full min-h-screen">
        <div className="bg-white">
          <div
            className="top_section p-10"
            style={{
              backgroundColor: metadata?.theme?.primary,
            }}
          >
            <div className="profile_details flex w-full h-auto justify-between items-center">
              <div className="profile_section w-1/2 mt-10">
                <Profile
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              <div className="user_profile text-center">
                <div
                  className="user_name py-10"
                  style={{
                    color: metadata?.theme?.text,
                  }}
                >
                  <h1 className="text-3xl uppercase font-medium tracking-widest">
                    {basics?.name}
                  </h1>
                  <h4 className="text-base tracking-widest mt-2">
                    {basics?.jobtitle}
                  </h4>
                </div>
                <div className="user_image -mb-[100px]">
                  {basics?.picture?.url && (
                    <img
                      src={basics.picture.url}
                      width={250}
                      height={250}
                      alt="pic"
                      className="mx-auto"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bottom_section flex gap-10">
            <div className="resume_details_1 w-[60%]">
              {/* work experiences */}
              <section>
                <div className="experience px-5">
                  <Experience
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
              </section>
              {/* projects  */}
              <section>
                <div className="projects px-5">
                  <Projects
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
              </section>
              {/* awards  */}
              <section>
                <div className="projects px-5">
                  <Awards
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
              </section>
              {/* certificate  */}
              <section>
                <div className="projects px-5">
                  <Certificates
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
              </section>
            </div>
            <div className="resume_details_2 w-[40%]">
              {/* education */}
              <section>
                <div className="education px-5 mt-20">
                  <Education
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
              </section>
              {/* skill  */}
              <div className="skills px-5 w-full">
                <Skills
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              {/* hobbies  */}
              <div className="skills px-5 w-full">
                <Hobbies
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              {/* language  */}
              <div className="skills px-5 w-full">
                <Languages
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              {/* references  */}
              <div className="skills px-5 w-full">
                <References
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
            </div>
          </div>
          <div className="footer_section mt-4">
            {/* contact details  */}
            <div className="contact_details p-2">
              <ul className="flex w-full justify-center gap-5 mt-2 px-2 ">
                <li className="flex items-center gap-3">
                  <FaPhone />
                  {basics?.phone && <p>{basics?.phone}</p>}
                </li>
                <li className="flex items-center gap-3">
                  {(basics?.city || basics?.country) && (
                    <p className="flex items-center break-words">
                      <IoLocationOutline className="mr-2" />
                      {basics?.city}
                      {basics?.city && basics?.country && " , "}
                      {basics?.country}
                    </p>
                  )}
                </li>
                <li className="flex items-center gap-3">
                  <FaLinkedin />
                  {basics?.email && <p> {basics?.email}</p>}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template13;
