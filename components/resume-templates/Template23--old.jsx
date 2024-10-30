/** @format */

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
import { AiOutlineLink } from "react-icons/ai";
import { isValidUrl } from "./ValidateUrl";

const Education = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.education
  );
  return (
    <div className='education_section w-full'>
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className='education_header' style={{ color: colorBackground }}>
            <h2
              className={`font-semibold font-serif ${fontStyle.subMianHeadingFont}`}>
              {data?.name}
            </h2>
          </div>
          <div className='text-gray-800'>
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className='education1 my-5' key={index}>
                    <div className='education_names flex justify-between my-1'>
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
                      <div className='education_year text-end'>
                        <p
                          className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}>
                          {item?.startDate &&
                            `${item?.startDate}${item?.endDate && " - "}`}
                          {item?.endDate}
                        </p>
                        {item?.city && (
                          <p className='text-13px flex font-normal items-center justify-end mt-1'>
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

const Experience = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume.data?.sections?.experience
  );

  return (
    <div className='experience_section w-full mt-2'>
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div
            className='experience_header w-full'
            style={{ color: colorBackground }}>
            <h2
              className={`font-semibold font-serif ${fontStyle.subMianHeadingFont}`}>
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div className='experience_1 w-full py-2' key={index}>
                <div className='post flex  justify-between my-2'>
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
                  <div className='year font-bold text-end'>
                    <p
                      className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}>
                      <span>{item?.startDate}</span>
                      <span>{item?.startDate && item?.endDate && " - "}</span>
                      <span>{item?.endDate}</span>
                    </p>
                    {item?.city && (
                      <p className='text-13px flex font-normal items-center justify-end text-end my-1'>
                        <IoLocationOutline className='mr-1' />
                        {item?.city}
                      </p>
                    )}
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

const Awards = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.awards);
  return (
    <div className='education_section w-full'>
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className='education_header' style={{ color: colorBackground }}>
            <h2
              className={`font-semibold font-serif ${fontStyle.subMianHeadingFont}`}>
              {data?.name}
            </h2>
          </div>
          <div className='text-gray-800'>
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className='education1 my-5' key={index}>
                    <div className='education_names flex w-full justify-between my-1'>
                      <div className='education_degree w-full'>
                        {isValidUrl(item?.url) ? (
                          <a
                            href={item?.url}
                            target='_blank'
                            rel='noopener noreferrer'
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
                      <div className='education_year text-end w-full'>
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

const Projects = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.projects);
  return (
    <div className='project_section my-2'>
      {data?.visible && data?.items.length > 0 && (
        <>
          <div className='project_heading w-full'>
            <h2
              className={`font-semibold font-serif ${fontStyle.subMianHeadingFont}`}
              style={{ color: colorBackground }}>
              {data?.name}
            </h2>
          </div>
          {data?.items.map((item, index) => {
            return (
              <div className='projects1 w-full my-3' key={index}>
                <div className='post flex justify-between items-center my-2'>
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

const Skills = ({
  fontStyle,
  colorText,
  colorBackground,
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
        <div className='skills_section py-4'>
          <h2
            className={`-ml-10 text-3xl font-semibold border-t-2 border-b-2 border-r-2 p-2 mb-4 pl-8 font-serif ${fontStyle.headingFont}`}
            style={{
              color: colorText,
              borderColor: colorText,
            }}>
            {data?.name}
          </h2>
          <div className='w-full flex justify-end items-center'>
            <ul className='w-full' style={{ color: colorText }}>
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`flex items-center gap-2 font-medium ${fontStyle.skillsFont} my-1 py-4 `}
                    key={i}>
                    <div className='text-start w-1/2 mb-1'>
                      <span>{item?.name}</span>
                    </div>
                    <div className='w-1/2 text-end bg-gray-200 h-2.5'>
                      <div
                        className='bg-black h-2.5'
                        style={{
                          width: `${level}%`,
                          backgroundColor: secondaryBackground,
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

const Hobbies = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.hobbies
  );
  return (
    <div className='px-5 py-10'>
      {data?.visible && data?.items.length > 0 && (
        <h2
          className={`-ml-10 text-3xl font-semibold border-t-2 border-b-2 border-r-2 p-2 mb-4 pl-8 font-serif ${fontStyle.headingFont}`}
          style={{
            color: colorText,
            borderColor: colorText,
          }}>
          {data?.name}
        </h2>
      )}

      <div className='hobbies_section'>
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul style={{ color: colorText }}>
              {data?.items?.map((item, index) => {
                return (
                  <li key={index} className='text-15px py-2 font-semibold'>
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

const Certificates = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.certificates
  );
  return (
    <div className='my-2'>
      <div
        className='certificate_title my-2'
        style={{ color: colorBackground }}>
        <h2
          className={`font-semibold font-serif ${fontStyle.subMianHeadingFont}`}>
          {data?.name}
        </h2>
      </div>
      <div className='hobbies_section'>
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul>
              {data?.items?.map((item, index) => {
                return (
                  <div className='certificate_section py-2' key={index}>
                    {isValidUrl(item?.url) ? (
                      <a
                        href={item?.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='break-normal text-base items-center font-bold inline-flex'>
                        {item?.name}
                        <AiOutlineLink className='ml-1' />
                      </a>
                    ) : (
                      <p className='break-normal text-base font-bold'>
                        {item.name}
                      </p>
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
    </div>
  );
};

const Languages = ({
  fontStyle,
  colorBackground,
  colorText,
  secondaryBackground,
}) => {
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
        <div className='skills_section py-4'>
          <h2
            className={`-ml-10 text-3xl font-semibold border-t-2 border-b-2 border-r-2 p-2 mb-4 pl-8 font-serif ${fontStyle.headingFont}`}
            style={{
              color: colorText,
              borderColor: colorText,
            }}>
            {data?.name}
          </h2>
          <div className='w-full flex justify-end items-center'>
            <ul className='w-full' style={{ color: colorText }}>
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`flex items-center gap-2 font-medium ${fontStyle.skillsFont} my-1 py-4 `}
                    key={i}>
                    <div className='text-start w-1/2 mb-1'>
                      <span>{item?.name}</span>
                    </div>
                    <div className='w-1/2 text-end bg-gray-200 h-2.5'>
                      <div
                        className='h-2.5'
                        style={{
                          width: `${level}%`,
                          backgroundColor: secondaryBackground,
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

const Profile = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.summary);
  const htmlContent = data?.content;
  return (
    <div>
      {data?.visible && (
        <div className='profile_section w-full'>
          <div
            className='profile_heading w-full'
            style={{ color: colorBackground }}>
            <h2
              className={`font-semibold font-serif ${fontStyle.subMianHeadingFont}`}>
              {data?.name}
            </h2>
          </div>
          <div
            className={`text-sm py-2 ${fontStyle.subHeadingFont} break-normal`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
      )}
    </div>
  );
};

const References = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.reference
  );
  return (
    <div className='references_section w-full'>
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className='references_header' style={{ color: colorBackground }}>
            <h2
              className={`font-semibold font-serif ${fontStyle.subMianHeadingFont}`}>
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
                            rel='noopener noreferrer'
                            className='break-normal text-16px items-center font-bold text-gray-600 inline-flex'>
                            {item?.name}
                            <AiOutlineLink className='ml-1' />
                          </a>
                        ) : (
                          <p className='break-normal text-15px font-bold text-gray-600'>
                            {item.name}
                          </p>
                        )}
                        <h3 className={`${fontStyle.subHeadingFont}`}>
                          {item.jobTitle} ,{item?.organization}
                        </h3>
                      </div>
                      <div className='references w-full flex justify-between'>
                        <h4
                          style={{ fontSize: fontStyle.paraFont }}
                          className=''>
                          {item?.email}
                        </h4>
                        <h4
                          style={{ fontSize: fontStyle.paraFont }}
                          className=''>
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

const Template23 = () => {
  const metadata = useResumeStore((state) => state.resume.data.metadata);
  const basics = useResumeStore((state) => state.resume.data.basics);

  const [fontStyle, setFontStyle] = useState({
    mainHeadingFont: "text-40px",
    subMianHeadingFont: "text-30px",
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
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-[#ffffff] h-auto w-[793px] mx-auto shadow-lg rounded-lg flex relative'>
          <div className='text-white w-full'>
            <div
              className='w-[250px] h-full mx-6 px-4 py-10 relative z-20'
              style={{ backgroundColor: metadata?.theme?.primary }}>
              <div className='flex items-center justify-center mb-8'>
                {basics?.picture?.url && (
                  <div className='profile_pic'>
                    <img
                      src={basics?.picture?.url}
                      alt='pic'
                      className='w-52 h-48 rounded-full object-cover'
                    />
                  </div>
                )}
              </div>
              <section className='mb-8'>
                <Skills
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  secondaryBackground={metadata?.theme?.background}
                  colorText={metadata?.theme?.text}
                />
              </section>
              <section className='mb-8'>
                <h2
                  className='-ml-10 text-3xl font-semibold border-t-2 border-b-2 border-r-2 p-2 mb-4 pl-8 font-serif'
                  style={{
                    color: metadata?.theme?.text,
                    borderColor: metadata?.theme?.text,
                  }}>
                  Contact
                </h2>
                <ul
                  className='flex flex-col gap-5 mt-5 px-2'
                  style={{ color: metadata?.theme?.text }}>
                  <li className='flex items-center gap-3'>
                    {basics?.phone && (
                      <a
                        href={`tel:${basics?.phone}`}
                        className='hover:underline flex items-center mt-1  text-wrap w-full '>
                        <MdOutlinePhone className='mr-2' />
                        <p className='w-[90%] text-wrap break-normal'>
                          {basics?.phone}
                        </p>
                      </a>
                    )}
                  </li>
                  <li className='flex items-center gap-3'>
                    {(basics?.city || basics?.country) && (
                      <p className='flex items-center'>
                        <IoLocationOutline className='mr-2' />
                        <span>{basics?.city}</span>
                        <span>{basics?.city && basics?.country && " , "}</span>
                        <span className=''>{basics?.country}</span>
                      </p>
                    )}
                  </li>
                  <li className='flex items-center gap-3'>
                    {basics?.email && (
                      <a
                        href={`mailto:${basics?.email}`}
                        className='hover:underline flex items-center mt-1  text-wrap w-full '>
                        <MdOutlineMailOutline className='mr-2' />
                        <p className='w-[90%] text-wrap break-normal'>
                          {basics?.email}
                        </p>
                      </a>
                    )}
                  </li>
                </ul>
              </section>
              <section className='mb-8'>
                <Hobbies
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </section>
              <section className='mb-8'>
                <Languages
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                  secondaryBackground={metadata?.theme?.background}
                />
              </section>
            </div>
          </div>
          <div
            className='w-full absolute top-30 transform translate-y-10'
            style={{ backgroundColor: metadata?.theme?.background }}>
            <div
              className='text-center py-6 pl-56'
              style={{ color: metadata?.theme?.primary }}>
              <h1 className='text-6xl italic font-bold'>{basics?.name}</h1>
              <p className='text-xl pt-2 font-semibold'>{basics?.jobtitle}</p>
            </div>
          </div>
          <div className='px-4 py-44 relative z-20'>
            <section>
              <div className='profile_section pt-10 mb-8'>
                <Profile
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
            </section>
            <section className='mb-8'>
              <div className='education'>
                <Education
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              <div className='experience'>
                <Experience
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              <div className='projects'>
                <Projects
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              <div className='certificated'>
                <Certificates
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              <div className='awards'>
                <Awards
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              <div className='reference'>
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

export default Template23;
