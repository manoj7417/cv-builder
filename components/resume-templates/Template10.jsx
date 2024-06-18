import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useResumeStore } from "@/app/store/ResumeStore";
import { FaXTwitter } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import { HiCube } from "react-icons/hi2";

const Education = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.education
  );
  return (
    <div className="education_section">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <h2
            className={`bg-orange-400 py-2 pr-10 text-end w-[80%] font-semibold uppercase ${fontStyle.headingFont}`}
            style={{
              color: headingColor,
              paddingBottom: "0.25rem", // Space for the underline
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-800 px-5 py-5">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="education1 my-5" key={index}>
                    <div className="education_names flex  justify-between items-center my-2">
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
                          <p className="text-13px flex font-normal items-center justify-end text-end">
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
    <div className="experience_section">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="experience_heading flex gap-5 items-center">
            <h2
              className={`bg-orange-400 py-2 pr-10 text-end w-[80%] font-semibold uppercase ${fontStyle.headingFont}`}
              style={{
                color: headingColor,
                paddingBottom: "0.25rem", // Space for the underline
              }}
            >
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div className="experience_1 my-2 p-5" key={index}>
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
                  <div className="year font-bold text-end">
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
                  {
                    item?.highlights?.length > 0 &&
                    <ul className="list-disc">
                      {

                        item?.highlights?.map((item, key) => {
                          return <li key={key} className=" break-words text-15px">{item}</li>
                        })
                      }
                    </ul>
                  }
                </div>
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
          <div className="project_heading flex gap-5 items-center">
            <h2
              className={`bg-orange-400 py-2 pr-10 text-end w-[80%] font-semibold uppercase ${fontStyle.headingFont}`}
              style={{
                color: headingColor,
                paddingBottom: "0.25rem", // Space for the underline
              }}
            >
              {data?.name}
            </h2>
          </div>
          {data?.items.map((item, index) => {
            return (
              <div className="projects1 my-3 p-5" key={index}>
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
        <div className="skills_section py-3">
          <h2
            className={`text-white text-center border-2 border-orange-400 p-1 uppercase ${fontStyle.headingFont}`}
            style={{
              color: headingColor,
              paddingBottom: "0.25rem", // Space for the underline
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 my-1 w-full flex justify-end items-center">
            <ul className="w-full flex flex-col gap-5 underline underline-offset-2">
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`font-bold text-white ${fontStyle.skillsFont} my-1 py-1`}
                    key={i}
                  >
                    <div className="mb-1">
                      <span>{item?.name}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2.5">
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

const Profile = ({ fontStyle, headingColor }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.summary);
  const htmlContent = data?.content;
  return (
    <div>
      {data?.visible && (
        <div className="profile_section w-full">
          <div className="profile_heading w-full flex gap-5 items-center">
            <h2
              className={`bg-orange-400 py-2 pr-10 text-end w-[80%] font-semibold uppercase ${fontStyle.headingFont}`}
              style={{
                color: headingColor,
                paddingBottom: "0.25rem", // Space for the underline
              }}
            >
              {data?.name}
            </h2>
          </div>
          <div
            className={`my-5 p-5 ${fontStyle.subHeadingFont} break-words`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        </div>
      )}
    </div>
  );
};

const Template10 = () => {

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
      <div className="template_10 w-[210mm] h-[297mm]">
        <div className="h-full">
          <div className="grid grid-cols-12 h-full">
            <div className="col-span-8 bg-white">
              <div className="left_side">
                <div className="user_profile">
                  <div className="profile_section relative p-20 z-50">
                    {basics?.picture?.url && (
                      <img
                      src={"/pic.jpg" || basics.picture.url}
                        alt="pic"
                        className="w-52 h-52 rounded-full border-8 border-slate-800 bg-orange-400"
                      />
                    )}
                    <div className="user_name h-50 bg-orange-400 text-white w-full absolute -z-10 top-32 -right-64 -mr-2 py-5 text-start pl-14">
                      <h2 className="text-4xl uppercase"> {basics?.name}</h2>
                      <p className="text-base">{basics?.jobtitle}</p>
                    </div>
                  </div>
                </div>
                <div className="profile_detail">
                  <Profile
                    fontStyle={fontStyle}
                    colorStyle={metadata?.theme?.primary}
                  />
                </div>
                <div className="education">
                  <Education fontStyle={fontStyle} />
                </div>
                <div className="experience">
                  <Experience
                    fontStyle={fontStyle}
                    colorStyle={metadata?.theme?.primary}
                  />
                </div>
                <div className="projects">
                  <Projects
                    fontStyle={fontStyle}
                    colorStyle={metadata?.theme?.primary}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-4 bg-slate-800 w-full h-full">
              <div className="right_side p-10 h-full relative">
                <div className="contact_section pt-[330px]">
                  <h2 className="text-xl text-white text-center border-2 border-orange-400 p-1 uppercase">
                    Contact Me
                  </h2>
                  <div className="contact_details flex">
                    <div
                      className={`text-white my-4 ${fontStyle.contactFont} flex flex-col gap-2 text-center`}
                    >
                      {basics?.email && (
                        <a
                          href={`mailto:${basics?.email}`}
                          className="hover:underline flex items-center mt-1  text-wrap w-full "
                        >
                          <MdOutlineMailOutline className="mr-2 text-orange-400" />
                          <p className="text-wrap break-words">
                            {basics?.email}
                          </p>
                        </a>
                      )}
                      {basics?.phone && (
                        <a
                          href={`tel:${basics?.phone}`}
                          className="hover:underline flex items-center mt-1  text-wrap w-full "
                        >
                          <MdOutlinePhone className="mr-2 text-orange-400" />
                          <p className="text-wrap break-words">
                            {basics?.phone}
                          </p>
                        </a>
                      )}
                      {(basics?.city || basics?.country) && (
                    <p className="flex items-center break-words">
                      <IoLocationOutline className="mr-2 text-orange-400" />
                      {basics?.city}
                      {basics?.city && basics?.country && " , "}
                      {basics?.country}
                    </p>
                  )}
                    </div>
                  </div>
                </div>
                <div className="skills mt-10">
                  <Skills fontStyle={fontStyle} />
                </div>
                <div className="socials absolute bottom-5 border-t-2 border-white w-[70%]">
                  <div className="flex justify-between mt-5 mx-4">
                    <FaXTwitter className="text-base mr-2 text-white" />
                    <MdOutlineMailOutline className="text-base mr-2 text-white" />
                    <FaGlobe className="text-base mr-2 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template10;
