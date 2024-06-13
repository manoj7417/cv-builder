"use client";
import React, { useState } from "react";
import { ResumeData } from "@/constants/data";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";
import { FaGraduationCap, FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { useResumeStore } from "@/app/store/ResumeStore";

const Education = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.education);
  return (
    <div className="education_section py-3">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="flex gap-5 items-center">
            <h2
              className={`${fontStyle.headingFont} font-semibold uppercase text-white`}
              style={{
                color: colorStyle,
              }}
            >
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-800 my-5">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="education1 my-5" key={index}>
                    <div className="year text-white">
                      {<p>item?.startDate</p> &&
                        `${item?.startDate}${item?.endDate && " - "}`}
                      {item?.endDate}
                      {/* <div className="year_marker absolute top-1.5 right-0 w-2.5 h-2.5 bg-white border border-[#26252d] rounded-full" />
                      <div className="year_line absolute top-4 right-1 w-0.5 h-full bg-[#0175b2]" /> */}
                    </div>
                    <div className="content flex flex-col break-all text-white">
                      <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                        {item?.degree}
                      </h3>
                      <h4 style={{ fontSize: fontStyle.paraFont }}>
                        {item?.institute}
                      </h4>
                      <div
                        className={`py-2 ${fontStyle.paraFont} break-words`}
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></div>
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

const Experience = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.experience);
  return (
    <div className="experience_section my-2">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="experience_heading flex gap-5 items-center">
            <h2
              style={{ fontSize: fontStyle.headingFont, color: colorStyle }}
              className="text-xl font-bold uppercase"
            >
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              // <div className="experience_1 my-5" key={index}>
              //   <div className="post flex  justify-between items-center my-2">
              //     <div className="post_title">
              //       <h3
              //         style={{ fontSize: fontStyle.subHeadingFont }}
              //         className="font-bold"
              //       >
              //         {item?.jobtitle}
              //       </h3>
              //       <h4
              //         style={{ fontSize: fontStyle.paraFont }}
              //         className="font-semibold"
              //       >
              //         {item?.employer}
              //       </h4>
              //     </div>
              //     <div className="year font-bold">
              //       <p
              //         className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}
              //       >
              //         <span>{item?.startDate}</span>
              //         <span>{item?.startDate && item?.endDate && " - "}</span>
              //         <span>{item?.endDate}</span>
              //       </p>
              //       {item?.city && (
              //         <p className="text-13px flex font-normal items-center justify-end text-end">
              //           <IoLocationOutline className="mr-1" />
              //           {item?.city}
              //         </p>
              //       )}
              //     </div>
              //   </div>
              //   <div
              //     className={`${fontStyle.paraFont} break-words`}
              //     dangerouslySetInnerHTML={{ __html: item?.description }}
              //   ></div>
              // </div>
              <div className="experience_1 flex my-5" key={index}>
                <div className="year w-[10%] pr-2 relative">
                  <div className="year_marker absolute top-1.5 right-0 w-2.5 h-2.5 bg-white border border-[#26252d] rounded-full" />
                  <div
                    className="year_line absolute top-4 right-1 w-0.5 h-full"
                    style={{
                      background: colorStyle,
                    }}
                  />
                </div>
                <div className="content w-[90%] pl-8 flex flex-col break-all">
                  <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                    {item?.jobtitle}
                  </h3>
                  <h4 style={{ fontSize: fontStyle.paraFont }}>
                    {item?.employer}
                  </h4>
                  {item?.startDate && (
                    <p className="">
                      {item.startDate}
                      {item?.endDate && " - "}
                    </p>
                  )}
                  {item?.endDate && <p>{item.endDate}</p>}
                  <div
                    className={`py-2 ${fontStyle.paraFont} break-words`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></div>
                  <div className="px-3">
                    {item?.highlights?.length > 0 && (
                      <ul className="list-disc">
                        {item?.highlights?.map((item, key) => {
                          return (
                            <li key={key} className=" break-words text-15px">
                              {item}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

const Projects = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.projects);
  return (
    <div className="project_section my-4">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div className="project_heading flex gap-5 items-center">
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{
                color: colorStyle,
              }}
            >
              {data?.name}
            </h2>
          </div>
          {data?.items.map((item, index) => {
            return (
              <div className="projects1 my-3" key={index}>
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

const Skills = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.skills);
  return (
    <div>
      {data?.visible && data?.items?.length > 0 && (
        <div className="skills_section border-b-2 border-gray-300 py-3">
          <h2
            className={`${fontStyle.headingFont} text-white font-semibold uppercase`}
            style={{
              color: colorStyle,
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 my-1">
            <ul className="list-disc pl-5">
              {data.items.map((item, i) => {
                return (
                  <li
                    className={`font-bold text-white ${fontStyle.skillsFont}`}
                    key={i}
                  >
                    {item?.name}
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

const Profile = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.summary);
  const htmlContent = data?.content;
  return (
    <div>
      {data?.visible && (
        <div className="profile_section">
          <div className="profile_heading flex gap-5 items-center">
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{ color: colorStyle }}
            >
              {data?.name}
            </h2>
          </div>
          <div
            className={`my-5 break-words ${fontStyle.subHeadingFont}`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        </div>
      )}
    </div>
  );
};

const Template18 = () => {
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
      <div className="resume_wrapper flex bg-[#353535] p-3 mx-auto h-min-[297mm] w-min-[210mm]">
        <div className="resume_right w-[100%] px-10 py-5 text-[#26252d]">
          <div className="resume_item resume_namerole">
            <h1
              className={`${fontStyle.mainHeadingFont} uppercase font-bold break-words text-white`}
            >
              {basics?.name}
            </h1>
            <p
              className={`${fontStyle.jobtitleFont} break-words uppercase text-[#646464]`}
            >
              {basics?.jobtitle}
            </p>
            <div className="resume_info w-[65%] text-white">
              <Profile fontStyle={fontStyle} style={{ color: "white" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="resume_wrapper flex bg-white p-3 mx-auto h-min-[297mm] w-min-[210mm]">
        <div className="resume_right w-[65%] px-10 py-5 text-[#26252d]">
          <div className="resume_item resume_profile my-5"></div>
          <div className="resume_item resume_experience my-5">
            <div className="resume_info">
              <Experience
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
            </div>
          </div>
          <div className="resume_item projects my-5">
            <div className="resume_info">
              <Projects
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
            </div>
          </div>
        </div>
        <div
          className="resume_left w-[35%] min-h-[1123px] "
          style={{
            backgroundColor: metadata?.theme?.primary,
            borderRadius: "9rem 9rem 0rem 0rem",
            marginTop: "-29rem",
          }}
        >
          <div className="resume_image w-full">
            {basics?.picture?.url && (
              <img
                src={basics?.picture?.url}
                alt="Resume_image"
                className="w-40 h-40 block mx-auto my-5 rounded-full"
              />
            )}
          </div>
          <div className="contact_details">
            <div
              className={`text-white my-4 ${fontStyle.contactFont} flex flex-col font-semibold px-8`}
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
              <div className="resume_item resume_address font-semibold">
                {(basics?.city || basics?.country) && (
                  <p className="flex items-center">
                    <IoLocationOutline className="text-white" />
                    <span>{basics?.city}</span>
                    <span>{basics?.city && basics?.country && " , "}</span>
                    <span className="">{basics?.country}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="resume_bottom py-5 px-8">
            <div className="resume_item resume_profile py-5">
              <Education fontStyle={fontStyle} />
            </div>

            <div className="resume_item resume_skills py-5">
              <div className="resume_info">
                <Skills fontStyle={fontStyle} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template18;
