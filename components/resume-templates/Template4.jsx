/** @format */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { FaGraduationCap, FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useResumeStore } from "@/app/store/ResumeStore";
import { isValidUrl } from "./ValidateUrl";
import { AiOutlineLink } from "react-icons/ai";

const Education = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.education
  );
  return (
    <div className='education_section py-3'>
      {data?.visible && data?.items?.length > 0 && (
        <>
          <h2
            className={`${fontStyle.headingFont} font-semibold uppercase underline underline-offset-8`}
            style={{
              color: headingColor,
            }}>
            {data?.name}
          </h2>
          {data?.items?.map((item, index) => {
            return (
              <div
                className='experience_1 my-5 py-2 border-b-2 border-dotted border-gray-300'
                key={index}>
                <div className='post flex  justify-between items-center my-2'>
                  <div className='post_title'>
                    <h3
                      style={{
                        fontSize: fontStyle.subHeadingFont,
                        color: headingColor,
                      }}
                      className='font-bold'>
                      {item?.degree}
                    </h3>
                    <h4
                      style={{
                        fontSize: fontStyle.paraFont,
                        color: headingColor,
                      }}
                      className='font-medium'>
                      {item?.institute}
                    </h4>
                  </div>
                  <div className='year font-bold'>
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
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

const Experience = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.experience
  );
  return (
    <div className='experience_section my-2'>
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className='experience_heading flex gap-5 items-center'>
            <h2
              style={{ fontSize: fontStyle.headingFont, color: headingColor }}
              className='text-xl font-bold uppercase underline underline-offset-8'>
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div
                className='experience_1 my-5 py-2 border-b-2 border-dotted border-gray-300'
                key={index}>
                <div className='post flex  justify-between items-center my-2'>
                  <div className='post_title'>
                    <h3
                      style={{
                        fontSize: fontStyle.subHeadingFont,
                        color: headingColor,
                      }}
                      className='font-bold'>
                      {item?.jobtitle}
                    </h3>
                    <h4
                      style={{
                        fontSize: fontStyle.paraFont,
                        color: headingColor,
                      }}
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
          <div className='project_heading flex gap-5 items-center'>
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase underline underline-offset-8`}
              style={{
                color: headingColor,
              }}>
              {data?.name}
            </h2>
          </div>
          {data?.items.map((item, index) => {
            return (
              <div
                className='projects1 my-3 border-b-2 py-2 border-dotted border-gray-300'
                key={index}>
                <div className='post flex  justify-between items-center my-2'>
                  <div className='post_title'>
                    <h3
                      style={{
                        fontSize: fontStyle.subHeadingFont,
                        color: headingColor,
                      }}
                      className='font-bold'>
                      {item?.title}
                    </h3>
                    <h4
                      style={{
                        fontSize: fontStyle.paraFont,
                        color: headingColor,
                      }}
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
  return (
    <div>
      {data?.visible && data?.items.length > 0 && (
        <div className='skills_section py-2'>
          <h2
            className={`${fontStyle.headingFont} text-gray-600 font-semibold uppercase underline underline-offset-8`}
            style={{
              color: headingColor,
            }}>
            {data?.name}
          </h2>
          <div className='my-1'>
            <ul
              className='w-full flex flex-wrap gap-5'
              style={{ color: headingColor }}>
              {data?.items.map((item, i) => {
                return (
                  <li
                    className={`font-bold text-black py-2 ${fontStyle.skillsFont}`}
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

const Profile = ({ fontStyle, headingColor }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.summary);
  const htmlContent = data?.content;
  return (
    <div>
      {data?.visible && (
        <div className='profile_section'>
          <div className='profile_heading flex gap-5 items-center'>
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase underline underline-offset-8`}
              style={{
                color: headingColor,
              }}>
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

const Languages = ({ fontStyle, headingColor }) => {
  const data = useResumeStore((state) => state.resume.data.sections.language);
  return (
    <div>
      {data?.visible && data?.items?.length > 0 && (
        <div className='language_section py-3'>
          <h2
            className={`relative inline-block font-bold uppercase w-full  ${fontStyle.headingFont} underline underline-offset-8`}
            style={{
              color: headingColor,
              paddingBottom: "0.25rem", // Space for the underline
            }}>
            {data?.name}
          </h2>
          <div className='my-1'>
            <ul className='w-full flex flex-wrap gap-5'>
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

const Hobbies = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.hobbies
  );
  return (
    <div className='py-2'>
      {data?.visible && data?.items.length > 0 && (
        <h2
          className={`relative inline-block font-bold uppercase w-full ${fontStyle.headingFont} underline underline-offset-8`}
          style={{
            color: headingColor,
          }}>
          {data?.name}
        </h2>
      )}
      <div className='hobbies_section py-2'>
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul className='w-full flex flex-wrap gap-5'>
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

const Awards = ({ fontStyle, headingColor }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.awards);
  return (
    <div className='awards_section w-full'>
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className='awards_header w-full'>
            <h2
              className={`relative inline-block font-bold uppercase w-full ${fontStyle.headingFont} underline underline-offset-8`}
              style={{
                color: headingColor,
                paddingBottom: "0.25rem", // Space for the underline
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
                      <div
                        className='awards_degree w-full'
                        style={{
                          color: headingColor,
                        }}>
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

const Certificates = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.certificates
  );
  return (
    <div>
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div>
            <h2
              className={`relative inline-block font-bold uppercase w-full ${fontStyle.headingFont} underline underline-offset-8`}
              style={{
                color: headingColor,
                paddingBottom: "0.25rem", // Space for the underline
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
                        <div
                          className='certificate_top_section'
                          style={{
                            color: headingColor,
                          }}>
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
                        </div>
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

const References = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.reference
  );
  return (
    <div className='references_section w-full mt-2'>
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className='references_header'>
            <h2
              className={`relative inline-block font-bold uppercase w-full ${fontStyle.headingFont} underline underline-offset-8`}
              style={{
                color: headingColor,
                paddingBottom: "0.25rem", // Space for the underline
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
                            className='break-normal text-16px items-center font-bold text-gray-600 inline-flex'
                            style={{
                              color: headingColor,
                            }}>
                            {item?.name}
                            <AiOutlineLink className='ml-1' />
                          </a>
                        ) : (
                          <p className='break-normal text-15px font-bold text-gray-600'>
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

export const Template4 = () => {
  const resumeData = useResumeStore((state) => state?.resume.data);

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
      <div className='w-full min-h-screen'>
        <div className='bg-white p-2 mx-auto'>
          <div
            className='top_section flex justify-between items-center rounded-md p-5'
            style={{
              backgroundColor: resumeData?.metadata?.theme?.primary,
              color: resumeData?.metadata?.theme?.text,
            }}>
            <div className='name_profile w-full h-full'>
              <h1
                className={`${fontStyle.mainHeadingFont} uppercase font-bold break-normal`}>
                {resumeData?.basics?.name}
              </h1>
              <p className={`${fontStyle.jobtitleFont} break-normal uppercase`}>
                {resumeData?.basics?.jobtitle}
              </p>
            </div>
            <div className='userDetails flex items-center justify-center'>
              <div className={`my-4 ${fontStyle.contactFont}`}>
                {resumeData?.basics?.email && (
                  <a
                    href={`mailto:${resumeData?.basics?.email}`}
                    className='hover:underline flex items-center mt-1  text-wrap w-full '>
                    <MdOutlineMailOutline className='mr-2' />
                    <p className='w-[90%] text-wrap break-normal'>
                      {resumeData?.basics?.email}
                    </p>
                  </a>
                )}
                {resumeData?.basics?.phone && (
                  <a
                    href={`tel:${resumeData?.basics?.phone}`}
                    className='hover:underline flex items-center mt-1  text-wrap w-full '>
                    <MdOutlinePhone className='mr-2' />
                    <p className='w-[90%] text-wrap break-normal'>
                      {resumeData?.basics?.phone}
                    </p>
                  </a>
                )}
                {(resumeData?.basics?.city || resumeData?.basics?.country) && (
                  <p className='flex items-center w-full'>
                    <IoLocationOutline className='mr-2' />
                    <span>{resumeData?.basics?.city}</span>
                    <span>
                      {resumeData?.basics?.city &&
                        resumeData?.basics?.country &&
                        " , "}
                    </span>
                    <span>{resumeData?.basics?.country}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='resume_detailed_section px-10 py-8'>
            <Profile
              fontStyle={fontStyle}
              headingColor={resumeData?.metadata?.theme?.primary}
            />
            <Experience
              fontStyle={fontStyle}
              headingColor={resumeData?.metadata?.theme?.primary}
            />
            <Projects
              fontStyle={fontStyle}
              headingColor={resumeData?.metadata?.theme?.primary}
            />
            <Education
              fontStyle={fontStyle}
              headingColor={resumeData?.metadata?.theme?.primary}
            />
            <Skills
              fontStyle={fontStyle}
              headingColor={resumeData?.metadata?.theme?.primary}
            />
            <Hobbies
              fontStyle={fontStyle}
              headingColor={resumeData?.metadata?.theme?.primary}
            />
            <Languages
              fontStyle={fontStyle}
              headingColor={resumeData?.metadata?.theme?.primary}
            />
            <Awards
              fontStyle={fontStyle}
              headingColor={resumeData?.metadata?.theme?.primary}
            />
            <Certificates
              fontStyle={fontStyle}
              headingColor={resumeData?.metadata?.theme?.primary}
            />
            <References
              fontStyle={fontStyle}
              headingColor={resumeData?.metadata?.theme?.primary}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Template4;
