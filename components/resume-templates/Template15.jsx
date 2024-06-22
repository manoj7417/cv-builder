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
    <div className="education_section w-full px-10">
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
                    <div className="education_names flex justify-between w-full my-1">
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

const Experience = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume.data?.sections?.experience
  );

  return (
    <div className="experience_section w-full mt-5 px-10">
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
    <div className="project_section my-4 px-10">
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
        <div className="skills_section py-4">
          <h2
            className={`uppercase text-2xl font-bold ${fontStyle.headingFont}`}
            style={{
              color: headingColor,
            }}
          >
            {data?.name}
          </h2>
          <div className="border-b-2 border-gray-600"></div>
          <div className="text-gray-600 w-full">
            <ul className="w-full">
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`font-bold ${fontStyle.skillsFont} my-1 py-4 `}
                    key={i}
                  >
                    <div className="text-start mb-2">
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
        <div className="profile_section w-full px-10">
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

const Template15 = () => {
  const metadata = useResumeStore((state) => state.resume.data.metadata);
  const basics = useResumeStore((state) => state.resume.data.basics);
  console.log("image url",basics?.picture?.url)

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
      <div className="mx-auto w-[210mm] bg-white border-t-[20px] border-[#e4f2f2]">
        <div className="top_section bg-[#e4f2f2]">
          <div className="bg-white py-3"></div>
          <div className="user-details flex">
            <div className="user_profile px-10">
              {basics?.picture?.url && (
                <img
                  src={basics?.picture?.url}
                  width={250}
                  height={250}
                  alt="pic"
                  className="w-100 h-auto mx-auto"
                />
              )}
            </div>
            <div className="user_content px-1 py-10">
              <h2 className="text-3xl uppercase font-medium text-black tracking-widest">
                {basics?.name}
              </h2>
              <h4 className="text-base text-black tracking-widest mt-2">
                {basics?.jobtitle}
              </h4>
            </div>
          </div>
        </div>
        <div className="resume_details_section h-full p-10">
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <div className="contact_details p-2">
                <h2
                  className={`mb-2 font-semibold uppercase ${fontStyle.headingFont}`}
                >
                  Contact Me
                </h2>
                <div className="border-b-2 border-gray-600"></div>
                <ul className="flex flex-col gap-3 mt-2 px-2">
                  <li className="flex items-center gap-3">
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
                  </li>
                  <li className="flex items-center gap-3">
                    {(basics?.city || basics?.country) && (
                      <p className="flex items-center">
                        <IoLocationOutline className="text-black mr-2" />
                        <span>{basics?.city}</span>
                        <span>{basics?.city && basics?.country && " , "}</span>
                        <span className="">{basics?.country}</span>
                      </p>
                    )}
                  </li>
                  <li className="flex items-center gap-3">
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
              </div>
              <div className="skills w-full px-5">
                <Skills fontStyle={fontStyle} />
              </div>
            </div>
            <div className="col-span-8">
              {/* about me */}
              <section>
                <div className="profile_section">
                  <Profile
                    fontStyle={fontStyle}
                    colorStyle={metadata?.theme?.primary}
                  />
                </div>
              </section>
              {/* projects  */}
              <section>
                <div className="projects">
                  <Projects
                    fontStyle={fontStyle}
                    colorStyle={metadata?.theme?.primary}
                  />
                </div>
              </section>
              {/* work experiences */}
              <section>
                <div className="experience">
                  <Experience
                    fontStyle={fontStyle}
                    colorStyle={metadata?.theme?.primary}
                  />
                </div>
              </section>
              {/* education */}
              <section>
                <div className="education">
                  <Education fontStyle={fontStyle} />
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
