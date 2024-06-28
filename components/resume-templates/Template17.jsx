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
          <div className="education_header" style={{ color: colorBackground }}>
            <h2 className={`font-semibold uppercase ${fontStyle.headingFont}`}>
              {data?.name}
            </h2>
            <div
              className="border-b-2"
              style={{ borderColor: colorBackground }}
            ></div>
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
                      <div className="education_year">
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

const Experience = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume.data?.sections?.experience
  );

  return (
    <div className="experience_section w-full mt-5">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div
            className="experience_header w-full"
            style={{ color: colorBackground }}
          >
            <h2 className={`font-semibold uppercase ${fontStyle.headingFont}`}>
              {data?.name}
            </h2>
            <div
              className="border-b-2"
              style={{ borderColor: colorBackground }}
            ></div>
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

const Projects = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.projects);
  return (
    <div className="project_section my-4">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div
            className="project_heading w-full"
            style={{ color: colorBackground }}
          >
            <h2 className={`font-semibold uppercase ${fontStyle.headingFont}`}>
              {data?.name}
            </h2>
            <div
              className="border-b-2 border-gray-600"
              style={{ borderColor: colorBackground }}
            ></div>
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
        <div className="skills_section py-4 mt-10">
          <h2
            className={`uppercase text-white text-2xl font-bold text-center ${fontStyle.headingFont}`}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 w-full flex justify-end items-center">
            <ul className="w-full">
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`flex items-center font-bold ${fontStyle.skillsFont} my-1 py-4 `}
                    key={i}
                  >
                    <div className="text-start w-1/2 mb-1 text-white">
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

const Hobbies = ({ fontStyle }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.hobbies
  );
  return (
    <div>
      <h2
        className={`uppercase text-white text-center text-2xl font-bold ${fontStyle.headingFont}`}
      >
        {data?.name}
      </h2>
      <div className="hobbies_section mt-5">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul className="-pl-5">
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
        <div className="skills_section py-4 mt-10">
          <h2
            className={`uppercase text-white text-2xl font-bold text-center ${fontStyle.headingFont}`}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 w-full flex justify-end items-center">
            <ul className="w-full">
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`flex items-center font-bold ${fontStyle.skillsFont} my-1 py-4 `}
                    key={i}
                  >
                    <div className="text-start w-1/2 mb-1 text-white">
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

const Certificates = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.certificates
  );
  return (
    <div>
      <h2
        className={`uppercase text-white text-center text-2xl font-bold ${fontStyle.headingFont}`}
      >
        {data?.name}
      </h2>
      <div className="hobbies_section mt-5">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul className="">
              {data?.items?.map((item, index) => {
                return (
                  <div className="certificate_section px-2 py-4" key={index}>
                    {isValidUrl(item?.url) ? (
                      <a
                        href={item?.url}
                        target="_blank"
                        className="break-words text-xl items-center font-bold inline-flex"
                        style={{ color: colorBackground }}
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
          <div
            className="profile_heading w-full"
            style={{ color:colorBackground }}
          >
            <h2 className={`font-semibold uppercase ${fontStyle.headingFont}`}>
              {data?.name}
            </h2>
            <div className="border-b-2" style={{borderColor:colorBackground}}></div>
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

const Awards = ({ fontStyle, colorBackground,colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.awards);
  return (
    <div className="awards_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="awards_header w-full" style={{color:colorBackground}}>
            <h2 className={`font-semibold uppercase ${fontStyle.headingFont}`}>
              {data?.name}
            </h2>
            <div className="border-b-2" style={{borderColor:colorBackground}}></div>
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

const References = ({ fontStyle, colorBackground,colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.reference
  );
  return (
    <div className="references_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="references_header w-full" style={{
            color:colorBackground
          }}>
            <h2 className={`font-semibold uppercase ${fontStyle.headingFont}`}>
              {data?.name}
            </h2>
            <div className="border-b-2" style={{
            borderColor:colorBackground
          }}></div>
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
                          {item.jobTitle} ,{item?.organization}
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

const Template17 = () => {
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
      <div className="mx-auto w-[210mm] h-[297mm] bg-white">
        <div className="w-full h-auto grid md:grid-cols-12 grid-cols-1">
          <div className="col-span-1 md:col-span-4 bg-black flex flex-col items-center justify-start">
            <div className="w-full h-80 bg-black">
              <div>
                <div className="profile-pic">
                  {basics?.picture?.url && (
                    <Image
                      src={basics.picture.url || "/pic.jpg"}
                      width={250}
                      height={250}
                      alt="pic"
                      className="mx-auto"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-start justify-start mt-6 gap-6">
              {/* phone */}
              <div className="w-full grid grid-cols-12">
                <div
                  className="col-span-3 w-full h-6"
                  style={{ backgroundColor: metadata?.theme?.primary }}
                ></div>
                <div className="col-span-9">
                  <div className="w-full h-6 bg-[rgba(45,45,45,0.6)] px-3 flex items-center">
                    <p className="text-sm font-semibold text-gray-200">Phone</p>
                  </div>
                  {basics?.phone && (
                    <a
                      href={`tel:${basics?.phone}`}
                      className="hover:underline flex items-center mt-1  text-wrap w-full "
                    >
                      <MdOutlinePhone className="mr-2" />
                      <p className="w-[90%] text-wrap break-words text-white">
                        {basics?.phone}
                      </p>
                    </a>
                  )}
                </div>
              </div>

              {/* email */}
              <div className="w-full grid grid-cols-12">
                <div
                  className="col-span-3 w-full h-6"
                  style={{ backgroundColor: metadata?.theme?.primary }}
                ></div>
                <div className="col-span-9">
                  <div className="w-full h-6 bg-[rgba(45,45,45,0.6)] px-3 flex items-center">
                    <p className="text-sm font-semibold text-gray-200">Email</p>
                  </div>
                  {basics?.email && (
                    <a
                      href={`mailto:${basics?.email}`}
                      className="hover:underline flex items-center mt-1  text-wrap w-full "
                    >
                      <MdOutlineMailOutline className="mr-2" />
                      <p className="w-[90%] text-wrap break-words text-white">
                        {basics?.email}
                      </p>
                    </a>
                  )}
                </div>
              </div>

              {/* website */}
              <div className="w-full grid grid-cols-12">
                <div
                  className="col-span-3 w-full h-6"
                  style={{ backgroundColor: metadata?.theme?.primary }}
                ></div>
                <div className="col-span-9">
                  <div className="w-full h-6 bg-[rgba(45,45,45,0.6)] px-3 flex items-center">
                    <p className="text-sm font-semibold text-gray-200">
                      Website
                    </p>
                  </div>
                  <p className="bg-transparent outline-none border-none text-xs px-3 mt-2 text-gray-200 w-full">
                    www.test.com
                  </p>
                </div>
              </div>

              {/* address */}
              <div className="w-full grid grid-cols-12">
                <div
                  className="col-span-3 w-full h-6"
                  style={{ backgroundColor: metadata?.theme?.primary }}
                ></div>
                <div className="col-span-9">
                  <div className="w-full h-6 bg-[rgba(45,45,45,0.6)] px-3 flex items-center">
                    <p className="text-sm font-semibold text-gray-200">
                      Address
                    </p>
                  </div>
                  {(basics?.city || basics?.country) && (
                    <p className="flex items-center text-white ml-2">
                      <IoLocationOutline className="text-white" />
                      <span>{basics?.city}</span>
                      <span>{basics?.city && basics?.country && " , "}</span>
                      <span className="">{basics?.country}</span>
                    </p>
                  )}
                </div>
              </div>
              {/* skill  */}
              <div className="skills p-5 w-full mb-4">
                <Skills
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              {/* hobbies  */}
              <div className="skills p-5 w-full mb-4">
                <Hobbies
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              {/* languages  */}
              <div className="skills p-5 w-full mb-4">
                <Languages
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              {/* certificates  */}
              <div className="skills p-5 w-full mb-4">
                <Certificates
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-8 flex flex-col items-center justify-start py-6 bg-white border border-gray-400">
            {/* User name and occupation */}
            <div
              className="w-full py-6"
              style={{
                backgroundColor: metadata?.theme?.primary,
              }}
            >
              <div
                className="user-details p-5"
                style={{
                  color: metadata?.theme?.text,
                }}
              >
                <h2 className="text-3xl uppercase font-medium">
                  <span className="font-bold">
                    {" "}
                    {basics?.name || "Michael"}
                  </span>
                </h2>
                <h4 className="text-base">
                  {basics?.jobtitle || "Inside Sales Manager"}
                </h4>
              </div>
            </div>
            {/* about me */}
            <section className="w-full">
              <div className="profile_section p-5">
                <Profile
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
            </section>
            {/* projects  */}
            <section className="w-full">
              <div className="projects p-5">
                <Projects
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
            </section>
            {/* work experiences */}
            <section className="w-full">
              <div className="experience p-5">
                <Experience
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
            </section>
            {/* education */}
            <section className="w-full">
              <div className="education p-5">
                <Education
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
            </section>
            {/* award */}
            <section className="w-full">
              <div className="education p-5">
                <Awards
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
            </section>
            {/* references */}
            <section className="w-full">
              <div className="education p-5">
                <References
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template17;
