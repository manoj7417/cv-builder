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
            <h2 className={`font-semibold uppercase ${fontStyle.headingFont}`}>
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
        <div className="skills_section py-4 mt-10">
          <h2
            className={`uppercase text-white text-2xl font-bold text-center ${fontStyle.headingFont}`}
            style={{
              color: headingColor,
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 w-full flex justify-end items-center">
            <ul className="w-full">
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 0;
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
                        className="bg-yellow-400 h-2.5"
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
                  src={"/pic.jpg" || basics.picture.url}
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
                <div className="col-span-3 w-full h-6 bg-yellow-400"></div>
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
                <div className="col-span-3 w-full h-6 bg-yellow-400"></div>
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
                <div className="col-span-3 w-full h-6 bg-yellow-400"></div>
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
                <div className="col-span-3 w-full h-6 bg-yellow-400"></div>
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
              <Skills fontStyle={fontStyle} />
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-8 flex flex-col items-center justify-start py-6 bg-white border border-gray-400">
            {/* User name and occupation */}
            <div className="w-full bg-yellow-400 py-6">
              <div className="user-details p-5">
                <h2 className="text-3xl uppercase font-medium text-black">
                  <span className="font-bold"> {basics?.name || "Michael"}</span>
                </h2>
                <h4 className="text-base text-black tracking-wider">
                {basics?.jobtitle || "Inside Sales Manager"}
                </h4>
              </div>
            </div>
            {/* about me */}
            <section className="w-full">
              <div className="profile_section p-5">
              <Profile
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
              </div>
            </section>
            {/* projects  */}
            <section className="w-full">
              <div className="projects p-5">
              <Projects
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
              </div>
            </section>
            {/* work experiences */}
            <section className="w-full">
              <div className="experience p-5">
              <Experience
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
              </div>
            </section>
              {/* education */}
            <section className="w-full">
              <div className="education p-5">
              <Education fontStyle={fontStyle} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template17;
