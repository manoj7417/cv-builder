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

const Education = ({ fontStyle, data, colorStyle }) => {
  return (
    <div className="education_section py-3">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="flex gap-5 items-center">
            <h2 className={`${fontStyle.headingFont} font-semibold uppercase text-white`} style={{
              color: colorStyle
            }}>
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

const Experience = ({ fontStyle, data, colorStyle }) => {
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
                <div className="year w-[30%] pr-2 relative">
                  {item?.startDate && (
                    <p className="">

                      {item.startDate}
                      {item?.endDate && " - "}
                    </p>
                  )}
                  {item?.endDate && <p>{item.endDate}</p>}
                  <div className="year_marker absolute top-1.5 right-0 w-2.5 h-2.5 bg-white border border-[#26252d] rounded-full" />
                  <div className="year_line absolute top-4 right-1 w-0.5 h-full" style={{
                    background: colorStyle
                  }} />
                </div>
                <div className="content w-[70%] pl-8 flex flex-col break-all">
                  <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                    {item?.jobtitle}
                  </h3>
                  <h4 style={{ fontSize: fontStyle.paraFont }}>
                    {item?.employer}
                  </h4>
                  <div
                    className={`py-2 ${fontStyle.paraFont} break-words`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

const Projects = ({ fontStyle, data, colorStyle }) => {
  return (
    <div className="project_section my-4">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div className="project_heading flex gap-5 items-center">
            <h2 className={`${fontStyle.headingFont} font-bold uppercase`} style={{
              color: colorStyle
            }}>
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


const Skills = ({ fontStyle, data, colorStyle }) => {
  return (
    <div>
      {data?.visible && data?.items?.length > 0 && (
        <div className="skills_section border-b-2 border-gray-300 py-3">
          <h2
            className={`${fontStyle.headingFont} text-white font-semibold uppercase`} style={{
              color: colorStyle
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

const Profile = ({ data, fontStyle, colorStyle }) => {
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

const Template1 = ({ resumeData }) => {


  
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
      <div className="resume_wrapper flex w-[210mm] h-[297mm] bg-white p-3 mx-auto">
        <div
          className="resume_left w-[35%]"
          style={{
            backgroundColor: resumeData?.metadata?.theme?.primary,
          }}
        >
          <div className="resume_image w-full">
            {resumeData?.basics?.picture?.url && (
              <img
                src={resumeData?.basics?.picture?.url}
                alt="Resume_image"
                className="w-40 h-40 block mx-auto my-5 rounded-full"
              />
            )}
          </div>
          <div className="resume_bottom py-5 px-8">
            <div className="resume_item resume_profile py-5">
              <Education
                fontStyle={fontStyle}
                data={resumeData?.sections?.education}
              />
            </div>

            <div className="resume_item resume_skills py-5">
              <div className="resume_info">
                <Skills
                  fontStyle={fontStyle}
                  data={resumeData?.sections?.skills}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="resume_right w-[65%] px-10 py-5 text-[#26252d]">
          <div className="resume_item resume_namerole">
            <h1
              className={`${fontStyle.mainHeadingFont} uppercase font-bold break-words`}
              style={{
                color: resumeData?.metadata?.theme?.primary
              }}>
              {resumeData?.basics?.name}
            </h1>
            <p className={`${fontStyle.jobtitleFont} break-words uppercase`} style={{
              color: resumeData?.metadata?.theme?.primary
            }}  >
              {resumeData?.basics?.jobtitle}
            </p>
            <div className="contact_details">
              <div
                className={`text-gray-800 my-4 ${fontStyle.contactFont} flex font-semibold`}
              >
                {resumeData?.basics?.email && (
                  <a
                    href={`mailto:${resumeData?.basics?.email}`}
                    className="hover:underline flex items-center mt-1  text-wrap w-full "
                  >
                    <MdOutlineMailOutline className="mr-2" />
                    <p className="w-[90%] text-wrap break-words">
                      {resumeData?.basics?.email}
                    </p>
                  </a>
                )}
                {resumeData?.basics?.phone && (
                  <a
                    href={`tel:${resumeData?.basics?.phone}`}
                    className="hover:underline flex items-center mt-1  text-wrap w-full "
                  >
                    <MdOutlinePhone className="mr-2" />
                    <p className="w-[90%] text-wrap break-words">
                      {resumeData?.basics?.phone}
                    </p>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="resume_item resume_address font-semibold">
            {(resumeData?.basics?.city || resumeData?.basics?.country) && (
              <p className="flex items-center">
                <IoLocationOutline className="text-black" />
                <span>{resumeData?.basics?.city}</span>
                <span>
                  {resumeData?.basics?.city &&
                    resumeData?.basics?.country &&
                    " , "}
                </span>
                <span className="">
                  {resumeData?.basics?.country}
                </span>
              </p>
            )}
          </div>
          <div className="resume_item resume_profile my-5">
            <div className="resume_info">
              <Profile
                data={resumeData?.sections?.summary}
                fontStyle={fontStyle}
                colorStyle={resumeData?.metadata?.theme?.primary}
              />
            </div>
          </div>
          <div className="resume_item resume_experience my-5">
            <div className="resume_info">
              <Experience
                fontStyle={fontStyle}
                data={resumeData?.sections?.experience}
                colorStyle={resumeData?.metadata?.theme?.primary}
              />
            </div>
          </div>
          <div className="resume_item projects my-5">
            <div className="resume_info">
              <Projects
                fontStyle={fontStyle}
                data={resumeData?.sections?.projects}
                colorStyle={resumeData?.metadata?.theme?.primary}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template1;
