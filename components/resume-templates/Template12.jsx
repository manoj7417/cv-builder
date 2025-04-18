/** @format */

import React, { useState } from "react";
import { MdOutlineMailOutline, MdOutlineSettings } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useResumeStore } from "@/app/store/ResumeStore";
import { FaComputer, FaGraduationCap, FaXTwitter } from "react-icons/fa6";
import { FaGlobe, FaUserAlt } from "react-icons/fa";
import { HiCube } from "react-icons/hi2";
import Link from "next/link";
import { isValidUrl } from "./ValidateUrl";
import { AiOutlineLink } from "react-icons/ai";

const Education = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.education
  );
  return (
    <div className='education_section w-full'>
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div
            className='education_header flex items-center gap-3'
            style={{ borderBottom: "3px solid black" }}>
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont}`}
              style={{
                color: headingColor,
              }}>
              {data?.name}
            </h2>
          </div>
          <div className='text-gray-800 '>
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className='education1  pt-5' key={index}>
                    <div className='education_names  justify-between items-center my-1'>
                      <div className='education_degree'>
                        <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                          {item?.degree}
                        </h3>
                        <h4
                          style={{ fontSize: fontStyle.paraFont }}
                          className='font-medium'>
                          {item?.institute}
                        </h4>
                      </div>
                      <div className='education_year'>
                        <p
                          className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}>
                          {item?.startDate &&
                            `${item?.startDate}${item?.endDate && " - "}`}
                          {item?.endDate}
                        </p>
                        {item?.city && (
                          <p className='text-13px flex font-normal '>
                            <IoLocationOutline className='mr-1' />
                            {item?.city}
                          </p>
                        )}
                      </div>
                    </div>
                    <div
                      className={`py-2 ${fontStyle.paraFont} break-normal`}
                      dangerouslySetInnerHTML={{
                        __html: item?.description,
                      }}></div>
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
    <div className='experience_section w-full'>
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div
            className='experience_header flex items-center gap-3'
            style={{ borderBottom: "3px solid black" }}>
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont}`}
              style={{
                color: headingColor,
              }}>
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div className='experience_1 w-full pt-5' key={index}>
                <div className='post   justify-between items-center my-2'>
                  <div className='post_title'>
                    <h3
                      style={{ fontSize: fontStyle.subHeadingFont }}
                      className='font-bold'>
                      {item?.jobtitle}
                    </h3>
                    <h4
                      style={{ fontSize: fontStyle.paraFont }}
                      className='font-medium'>
                      {item?.employer}
                    </h4>
                  </div>
                  <div className='year font-bold'>
                    <p
                      className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}>
                      <span>{item?.startDate}</span>
                      <span>{item?.startDate && item?.endDate && " - "}</span>
                      <span>{item?.endDate}</span>
                      <span className='text-13px flex font-normal '>
                        {item?.city && (
                          <>
                            <IoLocationOutline className='mr-1' />
                            {item.city}
                          </>
                        )}
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className={`${fontStyle.paraFont} break-normal`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}></div>
                <div className='px-3 py-2'>
                  {item?.highlights?.length > 0 && (
                    <ul className='list-disc pl-2'>
                      {item?.highlights?.map((item, key) => {
                        return (
                          <li key={key} className='py-2 break-normal text-15px'>
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  )}
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
    <div className='project_section my-4'>
      {data?.visible && data?.items.length > 0 && (
        <>
          <div
            className='project_heading w-full flex gap-3 items-center'
            style={{ borderBottom: "3px solid black" }}>
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont}`}
              style={{
                color: headingColor,
              }}>
              {data?.name}
            </h2>
          </div>
          {data?.items.map((item, index) => {
            return (
              <div className='projects1 w-full my-3 pt-5' key={index}>
                <div className='post  justify-between items-center my-2'>
                  <div className='post_title'>
                    <h3
                      style={{ fontSize: fontStyle.subHeadingFont }}
                      className='font-bold'>
                      {item?.title}
                    </h3>
                    <h4
                      style={{ fontSize: fontStyle.paraFont }}
                      className='font-medium'>
                      {item?.subtitle}
                    </h4>
                  </div>
                  <div className='year'>
                    <p
                      className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}>
                      {item?.startDate &&
                        `${item.startDate}${item.endDate && " - "}`}
                      {item?.endDate}
                    </p>
                  </div>
                </div>
                <div
                  className={`key_points ${fontStyle.paraFont} break-normal`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}></div>
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
        <div className='skills_section my-4'>
          <h2
            className={`font-semibold uppercase ${fontStyle.headingFont}`}
            style={{
              color: headingColor,
              borderBottom: "3px solid black", // Space for the underline
            }}>
            {data?.name}
          </h2>
          <div className='text-gray-600 my-1 w-full flex justify-end items-center'>
            <ul className='w-full'>
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`flex items-center sfont-bold text-black ${fontStyle.skillsFont} my-1 py-1`}
                    key={i}>
                    <div className='text-start w-1/2 mb-1'>
                      <span>{item?.name}</span>
                    </div>
                    <div className='w-1/2 text-end bg-gray-200 h-2.5'>
                      <div
                        className='h-2.5'
                        style={{
                          width: `${level}%`,
                          backgroundColor: headingColor,
                        }}></div>
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
        <div className='profile_section w-full'>
          <div
            className='profile_heading w-full flex gap-3 items-center'
            style={{ borderBottom: "3px solid black" }}>
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont}`}
              style={{
                color: headingColor,
              }}>
              {data?.name}
            </h2>
          </div>
          <div
            className={`pt-5 ${fontStyle.subHeadingFont} break-normal`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
      )}
    </div>
  );
};

const Awards = ({ fontStyle, colorStyle }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.awards);
  return (
    <div className='awards_section w-full'>
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div
            className='awards_header w-full'
            style={{ borderBottom: "3px solid black" }}>
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{
                color: colorStyle,
              }}>
              {data?.name}
            </h2>
          </div>
          <div className='text-gray-800'>
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className='awards my-5' key={index}>
                    <div className='awards_names flex w-full justify-between my-1'>
                      <div className='awards_degree w-full'>
                        {isValidUrl(item?.url) ? (
                          <a
                            href={item?.url}
                            target='_blank'
                            className='break-normal text-16px items-center font-bold inline-flex'>
                            {item?.name}
                            <AiOutlineLink className='ml-1' />
                          </a>
                        ) : (
                          <p className='break-normal text-15px font-bold'>
                            {item.name}
                          </p>
                        )}
                        <h4 style={{ fontSize: fontStyle.paraFont }}>
                          {item?.issuer}
                        </h4>
                      </div>
                      <div className='awards_year text-end w-full'>
                        <p
                          className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}>
                          {item?.date}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`py-2 ${fontStyle.paraFont} break-normal`}
                      dangerouslySetInnerHTML={{
                        __html: item?.description,
                      }}></div>
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

const Hobbies = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.hobbies
  );
  return (
    <div className='my-5'>
      {data?.visible && data?.items.length > 0 && (
        <h2
          className={`font-semibold uppercase ${fontStyle.headingFont}`}
          style={{
            color: headingColor,
            borderBottom: "3px solid black",
          }}>
          {data?.name}
        </h2>
      )}
      <div className='hobbies_section mt-5'>
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul>
              {data?.items?.map((item, index) => {
                return (
                  <li key={index} className='text-15px py-2 font-medium'>
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
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div style={{ borderBottom: "3px solid black" }}>
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{
                color: colorStyle,
              }}>
              {data?.name}
            </h2>
          </div>
          <div className='hobbies_section mt-5'>
            {data?.visible && data?.items.length > 0 && (
              <div>
                <ul className=''>
                  {data?.items?.map((item, index) => {
                    return (
                      <div className='certificate_section px-2' key={index}>
                        {isValidUrl(item?.url) ? (
                          <a
                            href={item?.url}
                            target='_blank'
                            className='break-normal text-16px font-bold items-center inline-flex'>
                            {item?.name}
                            <AiOutlineLink className='ml-1' />
                          </a>
                        ) : (
                          <p className='break-normal text-15px'>{item.name}</p>
                        )}
                        <div
                          className={`py-2 ${fontStyle.paraFont} break-normal`}
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}></div>
                      </div>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Languages = ({ fontStyle, headingColor }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.language);

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
        <div className='skills_section my-4'>
          <h2
            className={`font-semibold uppercase ${fontStyle.headingFont}`}
            style={{
              color: headingColor,
              borderBottom: "3px solid black", // Space for the underline
            }}>
            {data?.name}
          </h2>
          <div className='text-gray-600 my-1 w-full flex justify-end items-center'>
            <ul className='w-full'>
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`flex items-center sfont-bold text-black ${fontStyle.skillsFont} my-1 py-1`}
                    key={i}>
                    <div className='text-start w-1/2 mb-1'>
                      <span>{item?.name}</span>
                    </div>
                    <div className='w-1/2 text-end bg-gray-200 h-2.5'>
                      <div
                        className='h-2.5'
                        style={{
                          width: `${level}%`,
                          backgroundColor: headingColor,
                        }}></div>
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

const References = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.reference
  );
  return (
    <div className='references_section w-full'>
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className='references_header'>
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont}`}
              style={{
                color: headingColor,
                borderBottom: "3px solid black", // Space for the underline
              }}>
              {data?.name}
            </h2>
          </div>
          <div className='text-gray-800'>
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className='references my-5' key={index}>
                    <div className='references_names w-full my-1'>
                      <div className='references w-full'>
                        {isValidUrl(item?.url) ? (
                          <a
                            href={item?.url}
                            target='_blank'
                            className='break-normal text-16px items-center text-gray-600 inline-flex'>
                            {item?.name}
                            <AiOutlineLink className='ml-1' />
                          </a>
                        ) : (
                          <p className='break-normal text-15px text-gray-600'>
                            {item.name}
                          </p>
                        )}
                        <h3 className={`${fontStyle.subHeadingFont}`}>
                          <span>{item.jobTitle}</span>
                          <span className='mx-1'>
                            {item.jobTitle && item.organization && ","}
                          </span>
                          <span>{item?.organization}</span>
                        </h3>
                      </div>
                      <div className='references w-full flex justify-between'>
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

const Template12 = () => {
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
      <div className='template_10 w-full min-h-screen'>
        <div className='bg-white'>
          <div className='flex justify-between w-full'>
            <div className='right_section w-[100%]'>
              <div>
                <div className='user-detail p-10'>
                  <h2
                    className='text-4xl uppercase  text-black font-bold'
                    style={{
                      color: metadata?.theme?.primary,
                    }}>
                    {basics?.name}
                  </h2>
                  <h4 className='text-base text-black '>{basics?.jobtitle}</h4>
                  <div className='contact_details '>
                    <div className='contact_section'>
                      <div className='contact_details'>
                        <div
                          className={`text-black my-4 ${fontStyle.contactFont} flex justify-between gap-2 text-center`}>
                          {basics?.email && (
                            <a
                              href={`mailto:${basics?.email}`}
                              className='hover:underline flex items-center mt-1 text-wrap'>
                              <MdOutlineMailOutline className='mr-2 text-black' />
                              <p className='text-wrap break-normal'>
                                {basics?.email}
                              </p>
                            </a>
                          )}
                          {basics?.phone && (
                            <a
                              href={`tel:${basics?.phone}`}
                              className='hover:underline flex items-center mt-1 text-wrap'>
                              <MdOutlinePhone className='mr-2 text-black' />
                              <p className='text-wrap break-normal'>
                                {basics?.phone}
                              </p>
                            </a>
                          )}
                          {(basics?.city || basics?.country) && (
                            <p className='flex items-center'>
                              <IoLocationOutline className='mr-2 text-black' />
                              {basics?.city}
                              {basics?.city && basics?.country && " , "}
                              {basics?.country}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='personal_details flex gap-8'>
                    <div className='w-[60%]'>
                      <div className='profile_section mb-4'>
                        <Profile
                          fontStyle={fontStyle}
                          headingColor={metadata?.theme?.primary}
                        />
                      </div>
                      <div className='experience'>
                        <Experience
                          fontStyle={fontStyle}
                          headingColor={metadata?.theme?.primary}
                        />
                      </div>
                      <div className='projects'>
                        <Projects
                          fontStyle={fontStyle}
                          headingColor={metadata?.theme?.primary}
                        />
                      </div>
                      <div className='awards'>
                        <Awards
                          fontStyle={fontStyle}
                          colorStyle={metadata?.theme?.primary}
                        />
                      </div>
                      <div className='awards'>
                        <Certificates
                          fontStyle={fontStyle}
                          colorStyle={metadata?.theme?.primary}
                        />
                      </div>
                    </div>
                    <div className='w-[40%]'>
                      <div className='education mb-4'>
                        <Education
                          fontStyle={fontStyle}
                          headingColor={metadata?.theme?.primary}
                        />
                      </div>
                      <div className='skills mb-4'>
                        <Skills
                          fontStyle={fontStyle}
                          headingColor={metadata?.theme?.primary}
                        />
                      </div>
                      <div className='hobbies mb-4'>
                        <Hobbies
                          fontStyle={fontStyle}
                          headingColor={metadata?.theme?.primary}
                        />
                      </div>
                      <div className='languages mb-4'>
                        <Languages
                          fontStyle={fontStyle}
                          headingColor={metadata?.theme?.primary}
                        />
                      </div>
                      <div className='references mb-4'>
                        <References
                          fontStyle={fontStyle}
                          headingColor={metadata?.theme?.primary}
                        />
                      </div>
                    </div>
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

export default Template12;
