/** @format */

"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { FaAward, FaGraduationCap, FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useResumeStore } from "@/app/store/ResumeStore";
import { isValidUrl } from "./ValidateUrl";
import { BiSolidGroup } from "react-icons/bi";
import { AiOutlineLink } from "react-icons/ai";
import { GrCertificate, GrTestDesktop } from "react-icons/gr";
import { GoCrossReference } from "react-icons/go";
import { VscReferences } from "react-icons/vsc";

const Education = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state.resume.data.sections.education);
  return (
    <div className='education_section py-3 border-b-2 border-gray-300'>
      {data.visible && data?.items?.length > 0 && (
        <>
          <h2
            className={`text-xl font-semibold uppercase ${fontStyle.headingFont}`}
            style={{
              color: colorBackground,
            }}>
            {data?.name}
          </h2>
          <div className='text-gray-800 my-5'>
            {data?.items?.map((item, index) => {
              return (
                <div className='education1 my-5' key={index}>
                  <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                    {item?.degree}
                  </h3>
                  <h4 style={{ fontSize: fontStyle.paraFont }}>
                    {item?.institute}
                  </h4>
                  <p className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}>
                    {item?.startDate &&
                      `${item?.startDate}${item?.endDate && " - "}`}
                    {item?.endDate}
                  </p>
                  <div
                    className={`py-2 ${fontStyle.paraFont} break-normal`}
                    dangerouslySetInnerHTML={{
                      __html: item?.description,
                    }}></div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const Experience = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state.resume.data.sections.experience);
  return (
    <div className='experience_section my-2 border-b-2 border-gray-300 py-3'>
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className='experience_heading flex gap-5 items-center'>
            <div
              className='icon p-2'
              style={{ backgroundColor: colorBackground }}>
              <FaGraduationCap style={{ color: colorText }} />
            </div>
            <h2
              style={{
                fontSize: fontStyle.headingFont,
                color: colorBackground,
              }}
              className='text-xl font-bold uppercase'>
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div className='experience_1 my-5' key={index}>
                <div className='post flex  justify-between items-center my-2'>
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
                  <div className='year'>
                    <p
                      className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}>
                      <span>{item?.startDate}</span>
                      <span>{item?.startDate && item?.endDate && " - "}</span>
                      <span>{item?.endDate}</span>
                    </p>
                    {item?.city && (
                      <p className='text-13px flex font-normal items-center justify-end text-end'>
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
                          <li
                            key={key}
                            className=' break-normal py-2 text-15px'>
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

const Projects = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state.resume.data.sections.projects);
  return (
    <div className='project_section my-4'>
      {data?.visible && data?.items.length > 0 && (
        <>
          <div className='project_heading flex gap-5 items-center'>
            <div
              className='icon p-2'
              style={{ backgroundColor: colorBackground }}>
              <GrTestDesktop style={{ color: colorText }} />
            </div>
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{
                color: colorBackground,
              }}>
              {data?.name}
            </h2>
          </div>
          {data?.items.map((item, index) => {
            return (
              <div className='projects1 my-3' key={index}>
                <div className='post flex  justify-between items-center my-2'>
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

const Skills = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state.resume.data.sections.skills);
  return (
    <div>
      {data?.visible && data?.items?.length > 0 && (
        <div className='skills_section border-b-2 border-gray-300 py-3'>
          <h2
            className={`text-xl font-semibold uppercase ${fontStyle.headingFont}`}
            style={{ color: colorBackground }}>
            {data?.name}
          </h2>
          <div className='text-gray-600 my-1'>
            <ul className='list-disc pl-5'>
              {data.items.map((item, i) => {
                return (
                  <li
                    className={`font-bold text-gray-600 py-1 ${fontStyle.skillsFont}`}
                    key={i}>
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

const Languages = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state.resume.data.sections.language);
  return (
    <div>
      {data?.visible && data?.items?.length > 0 && (
        <div className='language_section py-3 border-b-2 border-gray-300'>
          <h2
            className={`relative inline-block font-bold uppercase w-full  ${fontStyle.headingFont}`}
            style={{
              color: colorBackground,
            }}>
            {data?.name}
          </h2>
          <div className='my-1'>
            <ul className='w-full list-disc pl-5'>
              {data.items.map((item, i) => {
                return (
                  <li
                    className={`font-bold  ${fontStyle.skillsFont} py-2 font-semibold`}
                    key={i}>
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

const Profile = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state.resume.data.sections.summary);
  const htmlContent = data.content;
  return (
    <div>
      {data?.visible && (
        <div className='profile_section'>
          <div className='profile_heading flex gap-5 items-center'>
            <div
              className='icon p-2'
              style={{ backgroundColor: colorBackground }}>
              <FaUser style={{ color: colorText }} />
            </div>
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{ color: colorBackground }}>
              {data?.name}
            </h2>
          </div>
          <div
            className={`my-5 ${fontStyle.subHeadingFont} break-normal`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
      )}
    </div>
  );
};

const Hobbies = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.hobbies);

  return (
    <div className='py-3'>
      {data?.visible && data?.items.length > 0 && (
        <div className='hobbies_section'>
          <h2
            className={`${fontStyle.headingFont} font-semibold uppercase`}
            style={{ color: colorBackground }}>
            {data?.name}
          </h2>
          <ul className='list-disc pl-5'>
            {data?.items?.map((item, index) => {
              return (
                <li
                  key={index}
                  className='break-normal py-1 text-15px font-bold text-gray-600'>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

const Certificates = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state.resume.data.sections.certificates
  );
  return (
    <>
      {data?.visible && data?.items?.length > 0 && (
        <div className='py-3'>
          <div className='project_heading flex gap-5 items-center'>
            <div
              className='icon bg-gray-300 p-2'
              style={{ backgroundColor: colorBackground }}>
              <GrCertificate style={{ color: colorText }} />
            </div>
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{ color: colorBackground }}>
              {data?.name}
            </h2>
          </div>
          <div>
            {data?.items?.map((item, index) => {
              return (
                <div
                  key={index}
                  className='break-normal text-13px font-bold text-gray-600 py-4 mt-2'>
                  <>
                    {isValidUrl(item?.url) ? (
                      <a
                        href={item?.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='break-normal text-15px font-bold text-gray-600 flex items-center'>
                        {item?.name}
                        <AiOutlineLink className='ml-1' />
                      </a>
                    ) : (
                      <p className='break-normal text-15px font-bold text-gray-600'>
                        {item.name}
                      </p>
                    )}
                  </>
                  <div
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                    className='w-full font-normal'></div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

const Awards = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state.resume.data.sections.awards);
  return (
    <div className=''>
      {data?.visible && data?.items?.length > 0 && (
        <div className='py-3'>
          <div className='project_heading flex gap-5 items-center'>
            <div
              className='icon bg-gray-300 p-2'
              style={{ backgroundColor: colorBackground }}>
              <FaAward style={{ color: colorText }} />
            </div>
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{ color: colorBackground }}>
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div
                key={index}
                className='break-normal text-13px  text-gray-600 py-5'>
                <>
                  <div className='mt-2 flex justify-between'>
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
                    <p className='break-normal text-14px font-thin text-gray-600'>
                      {item?.date}
                    </p>
                  </div>
                </>
                <div className='w-full '>
                  <p className='text-15px'> {item.issuer}</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item?.description,
                    }}></div>
                </div>
              </div>
            );
          })}
        </div>
      )}{" "}
    </div>
  );
};

const Reference = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state.resume.data.sections.reference);
  return (
    <>
      {data?.visible && data?.items?.length > 0 && (
        <div className='py-3'>
          <div className='project_heading flex gap-5 items-center'>
            <div
              className='icon p-2'
              style={{ backgroundColor: colorBackground }}>
              <VscReferences style={{ color: colorText }} />
            </div>
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{ color: colorBackground }}>
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div
                key={index}
                className='break-normal text-13px text-gray-600 my-3'>
                <>
                  <div className='mt-2'>
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
                      <p className='break-normal text-15px font-medium text-gray-600'>
                        {item.name}
                      </p>
                    )}
                  </div>
                </>
                <div className='w-full '>
                  <p className='text-16px'>
                    <span>{item.jobTitle}</span>
                    <span className='mx-1 font-medium'>
                      {item.jobTitle && item.organization && ","}
                    </span>
                    <span>{item?.organization}</span>
                  </p>
                  <p className='font-medium'>{item.email}</p>
                  <p className='font-medium'>{item.phone}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export const Template3 = () => {
  const metadata = useResumeStore((state) => state.resume.data.metadata);
  const data = useResumeStore((state) => state.resume.data);
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
      <div className='w-full min-h-screen p-custom space-y-3'>
        <div className='bg-white mx-auto'>
          <div
            className='top_section flex justify-around items-center py-10'
            style={{
              backgroundColor: metadata?.theme?.primary,
            }}>
            <div
              className='name_profile w-[70%] h-full px-10'
              style={{ color: metadata?.theme?.text }}>
              <h1
                className={`${fontStyle.mainHeadingFont} uppercase font-bold break-normal `}>
                {basics?.name}
              </h1>
              <p className={`${fontStyle.jobtitleFont} break-normal uppercase`}>
                {basics?.jobtitle}
              </p>
            </div>
            {basics?.picture?.url && (
              <div className='profile_pic w-[30%] flex items-center justify-center'>
                <img
                  src={basics?.picture?.url}
                  alt='pic'
                  className='w-24 h-24 rounded-full object-cover'
                />
              </div>
            )}
          </div>
          <div className='resume_section mt-5 flex flex-row'>
            <div className='md:w-[30%] w-full left_side border-r-2 border-gray-300 p-5'>
              <div className='contact_section border-b-2 border-gray-300 pb-3'>
                <h2
                  className={`text-xl font-semibold uppercase ${fontStyle.headingFont}`}
                  style={{
                    color: metadata?.theme?.primary,
                  }}>
                  Details
                </h2>
                <div
                  className={`text-gray-600 my-4 ${fontStyle.contactFont} space-y-3`}>
                  {basics?.email && (
                    <a
                      href={`mailto:${basics?.email}`}
                      className='hover:underline flex items-center mt-1  text-wrap w-full '>
                      <MdOutlineMailOutline className='mr-2' />
                      <p className='w-[90%] text-wrap break-all'>
                        {basics?.email}
                      </p>
                    </a>
                  )}
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
                  {(basics?.city || basics?.country) && (
                    <p className='flex items-center break-normal'>
                      <IoLocationOutline className='mr-2' />
                      {basics?.city}
                      {basics?.city && basics?.country && " , "}
                      {basics?.country}
                    </p>
                  )}
                </div>
              </div>

              <Education
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />

              <Skills
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
              <Languages
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
              <Hobbies
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
            </div>
            <div className='md:w-[70%] w-full right_side p-5'>
              <Profile
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
              <Experience
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
              <Projects
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
              <Reference
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
              <Awards
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
              <Certificates
                fontStyle={fontStyle}
                colorBackground={metadata?.theme?.primary}
                colorText={metadata?.theme?.text}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template3;
