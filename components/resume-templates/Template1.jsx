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
import { isValidUrl } from "./ValidateUrl";
import { AiOutlineLink } from "react-icons/ai";

const Education = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore((state) => state.resume.data.sections.education);
  return (
    <div className="education_section py-3">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="flex gap-5 items-center">
            <h2
              className={`${fontStyle.headingFont} font-semibold uppercase`}
              style={{
                color: colorStyle,
              }}
            >
              {data?.name}
            </h2>
          </div>
          <div className="my-5">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="education1 my-5" key={index}>
                    <div className="year">
                      {<p>item?.startDate</p> &&
                        `${item?.startDate}${item?.endDate && " - "}`}
                      {item?.endDate}
                    </div>
                    <div className="content flex flex-col break-all ">
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
                  <div
                    className="year_line absolute top-4 right-1 w-0.5 h-full"
                    style={{
                      background: colorStyle,
                    }}
                  />
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
                  <div className="px-3 py-2">
                    {item?.highlights?.length > 0 && (
                      <ul className="list-disc pl-2">
                        {item?.highlights?.map((item, key) => {
                          return (
                            <li
                              key={key}
                              className=" break-words py-2 text-15px"
                            >
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
                      className="font-medium"
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

const Skills = ({
  fontStyle,
  colorBackground,
  colorText,
  secondaryBackground,
}) => {
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
        <div className="skills_section py-5">
          <h2
            className={`${fontStyle.headingFont} font-semibold uppercase`}
            style={{
              color: colorText,
            }}
          >
            {data?.name}
          </h2>
          <div className="w-full flex justify-end items-center">
            <ul
              className="w-full"
              style={{
                color: colorText,
              }}
            >
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`font-bold ${fontStyle.skillsFont} my-1 py-2`}
                    key={i}
                  >
                    <div className="text-start w-full mb-1 flex flex-wrap">
                      <span>{item?.name}</span>
                    </div>
                    <div className="w-[60%] text-end bg-white h-2.5">
                      <div
                        className="bg-gray-500 h-2.5"
                        style={{
                          width: `${level}%`,
                          backgroundColor: secondaryBackground,
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
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.language
  );

  // Define the mapping of skill levels to percentages
  const levelMapping = {
    basic: 20,
    conversational: 40,
    proficient: 60,
    fluent: 80,
    native: 100,
  };

  return (
    <div>
      {data?.visible && data?.items?.length > 0 && (
        <div className="language_section pt-5">
          <h2
            className={`${fontStyle.headingFont} font-semibold uppercase`}
            style={{
              color: colorText,
            }}
          >
            {data?.name}
          </h2>
          <div className="w-full flex justify-end items-center">
            <ul
              className="w-full"
              style={{
                color: colorText,
              }}
            >
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
                        className="bg-gray-500 h-2.5"
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

// const Languages = ({ fontStyle, colorStyle }) => {
//   const data = useResumeStore((state) => state.resume.data.sections.language);
//   const metadata = useResumeStore((state) => state.resume.data.metadata);
//   return (
//     <div>
//       {data?.visible && data?.items?.length > 0 && (
//         <div
//           className="skills_section py-3"
//           style={{
//             borderColor: metadata.theme.text,
//           }}
//         >
//           <h2
//             className={`${fontStyle.headingFont} font-semibold uppercase`}
//             style={{
//               color: colorStyle,
//             }}
//           >
//             {data?.name}
//           </h2>
//           <div className="text-gray-600 my-1">
//             <ul
//               className="list-disc pl-5"
//               style={{
//                 color: metadata?.theme.text,
//               }}
//             >
//               {data.items.map((item, i) => {
//                 return (
//                   <li
//                     className={`font-bold ${fontStyle.skillsFont} py-1`}
//                     key={i}
//                     style={{
//                       listStyle: metadata.theme.text,
//                     }}
//                   >
//                     {item?.name}
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

const Hobbies = ({ fontStyle, colorText, colorBackground }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.hobbies
  );
  return (
    <div className="py-4">
      <h2 className={`${fontStyle.headingFont} font-semibold uppercase`}>
        {data?.name}
      </h2>
      <div className="hobbies_section">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul className="list-disc pl-5">
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

const Certificates = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.certificates
  );
  return (
    <div>
      <h2
        className={`${fontStyle.headingFont} font-bold uppercase`}
        style={{
          color: colorStyle,
        }}
      >
        {data?.name}
      </h2>
      <div className="hobbies_section">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul>
              {data?.items?.map((item, index) => {
                return (
                  <div className="certificate_section py-3" key={index}>
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

const Awards = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.awards);
  return (
    <div className="education_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="education_header">
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{
                color: colorStyle,
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

const References = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.reference
  );
  return (
    <div className="references_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="references_header">
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{
                color: colorStyle,
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
                        <h3
                          className={`${fontStyle.subHeadingFont} font-medium`}
                        >
                          <span>{item.jobTitle}</span>
                          <span className="mx-1">
                            {item.jobTitle && item.organization && ","}
                          </span>
                          <span>{item?.organization}</span>
                        </h3>
                      </div>
                      <div className="references w-full flex justify-between">
                        <h4
                          style={{ fontSize: fontStyle.paraFont }}
                          className="font-medium"
                        >
                          {item?.email}
                        </h4>
                        <h4
                          style={{ fontSize: fontStyle.paraFont }}
                          className="font-medium"
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

const Template1 = () => {
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
      <div
        className="resume_wrapper flex bg-white p-3 mx-auto h-min-[297mm] w-min-[210mm]"
        id="resumeParentContent"
      >
        <div
          className="resume_left w-[35%] min-h-[1123px]"
          style={{
            backgroundColor: metadata?.theme?.primary,
            color: metadata?.theme?.text,
          }}
        >
          <div className="resume_image w- [400px] h-[300px]">
            {basics?.picture?.url && (
              <img
                src={basics?.picture?.url}
                alt="Resume_image"
                className="w-full h-full block object-cover"
              />
            )}
          </div>
          <div className="resume_bottom py-5 px-8">
            <div className="resume_item resume_profile">
              <div className="template_section">
                <Education fontStyle={fontStyle} />
              </div>
            </div>

            <div className="resume_item resume_skills">
              <div className="resume_info">
              <div className="template_section">
                <Skills
                  fontStyle={fontStyle}
                  colorText={metadata?.theme?.text}
                  colorBackground={metadata?.theme?.background}
                  secondaryBackground={metadata?.theme?.background}
                />
                </div>
              </div>
              <div className="resume_info">
              <div className="template_section">
                <Hobbies
                  fontStyle={fontStyle}
                  colorText={metadata?.theme?.text}
                  colorBackground={metadata?.theme?.background}
                  secondaryBackground={metadata?.theme?.background}
                />
                </div>
              </div>
              <div className="resume_info">
              <div className="template_section">
                <Languages
                  fontStyle={fontStyle}
                  colorText={metadata?.theme?.text}
                  colorBackground={metadata?.theme?.background}
                  secondaryBackground={metadata?.theme?.background}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="resume_right w-[65%] px-5 py-5 text-[#26252d]">
          <div className="resume_item resume_namerole">
            <h1
              className={`${fontStyle.mainHeadingFont} uppercase font-bold break-words`}
              style={{
                color: metadata?.theme?.primary,
              }}
            >
              {basics?.name}
            </h1>
            <p
              className={`${fontStyle.jobtitleFont} break-words uppercase`}
              style={{
                color: metadata?.theme?.primary,
              }}
            >
              {basics?.jobtitle}
            </p>
            <div className="contact_details">
              <div
                className={`text-gray-800 my-4 ${fontStyle.contactFont} flex justify-between items-center font-semibold gap-2`}
              >
                {basics?.email && (
                  <a
                    href={`mailto:${basics?.email}`}
                    className="hover:underline flex items-center text-wrap"
                  >
                    <MdOutlineMailOutline className="mr-2" />
                    <p className="text-wrap break-words">{basics?.email}</p>
                  </a>
                )}
                {basics?.phone && (
                  <a
                    href={`tel:${basics?.phone}`}
                    className="hover:underline flex items-center text-wrap"
                  >
                    <MdOutlinePhone className="mr-2" />
                    <p className="text-wrap break-words">{basics?.phone}</p>
                  </a>
                )}
                {(basics?.city || basics?.country) && (
                  <p className="flex items-center">
                    <IoLocationOutline className="text-black mr-2" />
                    <span>{basics?.city}</span>
                    <span>{basics?.city && basics?.country && " , "}</span>
                    <span className="">{basics?.country}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="resume_item resume_profile my-5">
            <div className="resume_info">
            <div className="template_section">
              <Profile
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
              </div>
            </div>
          </div>
          <div className="resume_item resume_experience my-5">
            <div className="resume_info">
            <div className="template_section">
              <Experience
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
              </div>
            </div>
          </div>
          <div className="resume_item projects my-5">
            <div className="resume_info">
            <div className="template_section">
              <Projects
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
              </div>
            </div>
            <div className="resume_info">
            <div className="template_section">
              <Awards
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
              </div>
            </div>
            <div className="resume_info">
            <div className="template_section">
              <Certificates
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
              </div>
            </div>
            <div className="resume_info">
            <div className="template_section">
              <References
                fontStyle={fontStyle}
                colorStyle={metadata?.theme?.primary}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template1;
