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
          <div className="education_header flex items-center gap-3">
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

const Experience = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume.data?.sections?.experience
  );

  return (
    <div className="experience_section w-full mt-5">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="experience_header flex items-center gap-3">
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

const Projects = ({ fontStyle, headingColor }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.projects);
  return (
    <div className="project_section my-4">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div className="project_heading w-full flex gap-3 items-center">
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont} px-5`}
              style={{
                color: headingColor,
              }}
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
        <div className="skills_section py-3">
          <h2
            className={`my-2 uppercase text-2xl font-bold px-5 ${fontStyle.headingFont}`}
            style={{
              color: headingColor,
              paddingBottom: "1rem", // Space for the underline
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 my-1 w-full flex justify-end items-center">
            <ul className="w-full">
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 0;
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
          <div className="profile_heading w-full h-full flex gap-3 items-center justify-start mt-10">
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont} text-white px-5`}
            >
              {data?.name}
            </h2>
          </div>
          <div
            className={`px-5 ${fontStyle.subHeadingFont} break-words text-white`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        </div>
      )}
    </div>
  );
};

const Template15 = () => {
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
      <div className="mx-auto w-[210mm] bg-white border-y-[15px] border-[#e4f2f2] my-20">
        <div className="top_section bg-[#e4f2f2]">
          <div className="bg-white py-3"></div>

          <div className="user-details flex">
            <div className="user_profile px-10">
              <Image
                src={"/pic.jpg"}
                alt="pic"
                width={150}
                height={150}
                className="w-100 h-100"
              />
            </div>
            <div className="user_content px-10 py-10">
              <h2 className="text-3xl uppercase font-medium text-black tracking-widest">
                Michael Larsson
              </h2>
              <h4 className="text-base text-black tracking-widest mt-2">
                Community Manager
              </h4>
            </div>
          </div>
        </div>
        <div className="resume_details_section h-full p-10">
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <div className="contact_details p-2">
                <ul className="flex flex-col gap-3 mt-2 px-2">
                  <li className="flex items-center gap-3">
                    <FaPhone />
                    <p className="underline underline-offset-4">+9876543210</p>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaLocationDot />
                    <p className="underline underline-offset-4">
                      123,Clock Tower,Paris
                    </p>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaLinkedin />
                    <p className="underline underline-offset-4">
                      test@test.com
                    </p>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaGlobe />
                    <p className="underline underline-offset-4">www.test.vpm</p>
                  </li>
                </ul>
              </div>
              <div className="skills w-full px-5">
                <div className="project_header mt-7">
                  <h2 className="uppercase font-semibold text-xl mb-3">
                    Skills
                  </h2>
                  <div className="border-b-2 border-gray-600 w-3/4"></div>
                </div>
                <div className="resume_info my-3">
                  {val?.skills?.section.length > 0 &&
                    val?.skills?.section?.map((item, idx) => (
                      <ul
                        className="list-disc skills_list text-center my-3 w-full h-full pl-5"
                        key={idx}
                      >
                        <li className="skills_left mb-2 text-black text-start w-1/2">
                          {item?.name}
                        </li>
                      </ul>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-span-8">
              {/* about me */}
              <section>
                <div className="profile_section">
                  <div className="profile_header w-full">
                    <h2 className="font-semibold text-xl uppercase my-2 text-gray-700">
                      Overview
                    </h2>
                    <div className="border-b-2 border-gray-600 w-full"></div>
                  </div>
                  <p className="text-sm py-2 mt-3">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Ratione facilis enim, dolorum voluptas numquam a fugiat
                    impedit. Itaque voluptate amet non, quis consequatur
                    assumenda libero excepturi voluptatibus voluptatem
                    accusantium totam?
                  </p>
                </div>
              </section>
              {/* projects  */}
              <section>
                <div className="projects">
                  <div className="project_header my-3">
                    <h2 className="uppercase font-semibold text-xl my-3">
                      Projects
                    </h2>
                    <div className="border-b-2 border-gray-600  w-full"></div>
                  </div>
                  <div className="resume_info py-2 mt-3">
                    {val?.experience?.section.length > 0 &&
                      val?.experience?.section?.map((item, idx) => (
                        <div className="resume_data flex mb-4 gap-5" key={idx}>
                          <div className="year w-[30%]">
                            <p className="font-semibold">{item?.year}</p>
                          </div>
                          <div className="content w-[70%]">
                            <p className="font-bold">{item?.title}</p>
                            <p>{item?.description}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </section>
              {/* work experiences */}
              <section>
                <div className="experience">
                  <div className="experience_header">
                    <h2 className="uppercase font-semibold text-xl my-3">
                      Work Experience
                    </h2>
                    <div className="border border-gray-600 w-full"></div>
                  </div>
                  <div className="resume_info py-2 mt-3">
                    {val?.experience?.section.length > 0 &&
                      val?.experience?.section?.map((item, idx) => (
                        <div className="resume_data flex mb-4 gap-5" key={idx}>
                          <div className="year w-[30%]">
                            <p className="font-semibold">{item?.year}</p>
                          </div>
                          <div className="content w-[70%]">
                            <p className="font-bold">{item?.title}</p>
                            <p>{item?.description}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </section>
              {/* education */}
              <section>
                <div className="education">
                  <div className="education_header">
                    <h2 className="font-semibold text-xl uppercase my-3">
                      Education
                    </h2>
                    <div className="border border-gray-600 w-full"></div>
                  </div>
                  <div className="resume_info py-2 mt-3">
                    {val?.education?.section.length > 0 &&
                      val?.education?.section.map((item, idx) => (
                        <div className="resume_data flex mb-4 gap-5" key={idx}>
                          <div className="year w-[30%]">
                            <p className="font-semibold">{item?.year}</p>
                          </div>
                          <div className="content w-[70%]">
                            <p className="font-bold">{item?.title}</p>
                            <p>{item?.description}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template15;
