import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useResumeStore } from "@/app/store/ResumeStore";
import Link from "next/link";
import { isValidUrl } from "./ValidateUrl";
import { AiOutlineLink } from "react-icons/ai";

const Education = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.education
  );
  return (
    <div className="education_section">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <h2
            className={`relative inline-block font-bold uppercase w-full underline underline-offset-8 ${fontStyle.headingFont}`}
            style={{
              color: headingColor,
              paddingBottom: "0.25rem", // Space for the underline
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-800 my-4">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="education1 my-1 text-start" key={index}>
                    <div className="education_names">
                      <h3
                        className={`${fontStyle.subHeadingFont} font-bold`}
                        style={{
                          color: headingColor,
                        }}
                      >
                        {item?.degree}
                      </h3>
                      <h4
                        style={{
                          fontSize: fontStyle.paraFont,
                          color: headingColor,
                        }}
                      >
                        {item?.institute}
                      </h4>
                    </div>
                    <div className="education_year gap-5">
                      <p
                        className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}
                      >
                        {item?.startDate &&
                          `${item?.startDate}${item?.endDate && " - "}`}
                        {item?.endDate}
                      </p>
                      {item?.city && (
                        <p className="text-13px font-normal flex gap-1 items-center">
                          <IoLocationOutline className="mr-1" />
                          {item?.city}
                        </p>
                      )}
                    </div>
                  </div>
                  <div
                    className={`py-2 ${fontStyle.paraFont} break-words text-justify`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></div>
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
    (state) => state?.resume.data.sections?.experience
  );
  return (
    <div className="experience_section">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="experience_heading flex gap-5 items-center">
            <h2
              className={`relative inline-block font-bold uppercase w-full underline underline-offset-8 ${fontStyle.headingFont}`}
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
              <div className="experience_1" key={index}>
                <div className="post my-2">
                  <div className="post_title">
                    <h3
                      style={{
                        fontSize: fontStyle.subHeadingFont,
                        color: headingColor,
                      }}
                      className="font-bold"
                    >
                      {item?.jobtitle}
                    </h3>
                    <h4
                      style={{
                        fontSize: fontStyle.paraFont,
                        color: headingColor,
                      }}
                      className="font-semibold"
                    >
                      {item?.employer}
                    </h4>
                  </div>
                  <div className="year flex gap-10 font-bold">
                    <p
                      className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}
                    >
                      <span>{item?.startDate}</span>
                      <span>{item?.startDate && item?.endDate && " - "}</span>
                      <span>{item?.endDate}</span>
                    </p>
                    {item?.city && (
                      <p className="text-13px flex justify-end items-center font-normal">
                        <IoLocationOutline className="mr-1" />
                        {item?.city}
                      </p>
                    )}
                  </div>
                </div>
                <div
                  className={`${fontStyle.paraFont} break-words text-justify`}
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
              className={`relative inline-block font-bold uppercase w-full underline underline-offset-8 ${fontStyle.headingFont}`}
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
              <div className="projects1 my-3" key={index}>
                <div className="post my-2">
                  <div className="post_title">
                    <h3
                      style={{
                        fontSize: fontStyle.subHeadingFont,
                        color: headingColor,
                      }}
                      className="font-bold"
                    >
                      {item?.title}
                    </h3>
                    <h4
                      style={{
                        fontSize: fontStyle.paraFont,
                        color: headingColor,
                      }}
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
  return (
    <div>
      {data?.visible && data?.items?.length > 0 && (
        <div className="skills_section py-3">
          <h2
            className={`relative inline-block font-bold uppercase w-full underline underline-offset-8 ${fontStyle.headingFont}`}
            style={{
              color: headingColor,
            }}
          >
            {data?.name}
          </h2>
          <div className="mt-3 list-disc">
            <ul className="pl-5 list-disc">
              {data.items.map((item, i) => {
                return (
                  <li
                    className={`font-bold ${fontStyle.skillsFont} my-1 py-1 text-black`}
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

const Profile = ({ fontStyle, headingColor }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.summary);
  const htmlContent = data?.content;
  return (
    <div>
      {data?.visible && (
        <div className="profile_section w-full">
          <div className="profile_heading w-full flex gap-5 items-center">
            <h2
              className={`relative inline-block font-bold uppercase w-full underline underline-offset-8 ${fontStyle.headingFont}`}
              style={{
                color: headingColor,
                paddingBottom: "0.25rem", // Space for the underline
              }}
            >
              {data?.name}
            </h2>
          </div>
          <div
            className={`my-5 ${fontStyle.subHeadingFont} break-words`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
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
        <div className="skills_section py-3">
          <h2
            className={`${fontStyle.headingFont} font-semibold uppercase underline underline-offset-8`}
            style={{
              color: headingColor,
            }}
          >
            {data?.name}
          </h2>
          <div className="my-1 mt-3">
            <ul className="list-disc pl-5">
              {data.items.map((item, i) => {
                return (
                  <li
                    className={`font-bold ${fontStyle.skillsFont} my-1 py-1 text-black`}
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

const Hobbies = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.hobbies
  );
  return (
    <div className="my-5">
      {data?.visible && data?.items.length > 0 && (
        <h2
          className={`uppercase text-2xl font-bold ${fontStyle.headingFont} underline underline-offset-4`}
          style={{
            color: headingColor,
          }}
        >
          {data?.name}
        </h2>
      )}
      <div className="hobbies_section mt-2">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul className="pl-5 list-disc">
              {data?.items?.map((item, index) => {
                return (
                  <li key={index} className="text-15px py-2 font-bold">
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
    <div className="awards_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="awards_header w-full">
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase underline underline-offset-8`}
              style={{
                color: headingColor,
              }}
            >
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-800">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="awards my-5" key={index}>
                    <div className="awards_names flex w-full justify-between my-1">
                      <div
                        className="awards_degree w-full"
                        style={{
                          color: headingColor,
                        }}
                      >
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
                      <div className="awards_year text-end w-full">
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

const Certificates = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.certificates
  );
  return (
    <div>
      <div>
        <h2
          className={`${fontStyle.headingFont} font-bold uppercase underline underline-offset-8`}
          style={{
            color: headingColor,
          }}
        >
          {data?.name}
        </h2>
      </div>
      <div className="hobbies_section mt-5">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul className="">
              {data?.items?.map((item, index) => {
                return (
                  <div className="certificate_section px-2" key={index}>
                    <div
                      className="certification"
                      style={{
                        color: headingColor,
                      }}
                    >
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
                    </div>
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

const References = ({ fontStyle, headingColor }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.reference
  );
  return (
    <div className="references_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="references_header">
            <h2
              className={`${fontStyle.headingFont} font-semibold uppercase underline underline-offset-4`}
              style={{
                color: headingColor,
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
                          <p className="break-words text-15px text-gray-600">
                            {item.name}
                          </p>
                        )}
                        <h3 className={`${fontStyle.subHeadingFont}`}>
                          <span>{item.jobTitle}</span>
                          <span className="mx-1">
                            {item.jobTitle && item.organization && ","}
                          </span>
                          <span>{item?.organization}</span>
                        </h3>
                      </div>
                      <div className="references w-full">
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

const Template8 = () => {
  const resumeData = useResumeStore((state) => state?.resume.data);

  const [fontStyle, setFontStyle] = useState({
    mainHeadingFont: "text-30px",
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
      <div className="template_8 py-10">
        <div className="bg-white w-full min-h-screen ">
          <div className="top_section flex items-start gap-1 justify-start px-10">
            <div className="name_profile">
              <h1
                className={`${fontStyle.mainHeadingFont} uppercase font-bold break-words`}
                style={{
                  color: resumeData?.metadata?.theme?.primary,
                }}
              >
                {resumeData?.basics?.name}
              </h1>
              <p
                className={`${fontStyle.jobtitleFont} break-words uppercase`}
                style={{
                  color: resumeData?.metadata?.theme?.primary,
                }}
              >
                {resumeData?.basics?.jobtitle}
              </p>
              <div className={`my-2 ${fontStyle.contactFont} flex gap-5`}>
                {resumeData?.basics?.email && (
                  <a
                    href={`mailto:${resumeData?.basics?.email}`}
                    className="hover:underline flex items-center mt-1  text-wrap"
                  >
                    <MdOutlineMailOutline
                      className="mr-2"
                      style={{
                        color: resumeData?.metadata?.theme?.primary,
                      }}
                    />
                    <p className="text-wrap break-words">
                      {resumeData?.basics?.email}
                    </p>
                  </a>
                )}
                {resumeData?.basics?.phone && (
                  <a
                    href={`tel:${resumeData?.basics?.phone}`}
                    className="hover:underline flex items-center mt-1  text-wrap"
                  >
                    <MdOutlinePhone
                      className="mr-2"
                      style={{
                        color: resumeData?.metadata?.theme?.primary,
                      }}
                    />
                    <p className="text-wrap break-words">
                      {resumeData?.basics?.phone}
                    </p>
                  </a>
                )}
                {(resumeData?.basics?.city || resumeData?.basics?.country) && (
                  <p className="flex items-center">
                    <IoLocationOutline
                      className="mr-2"
                      style={{
                        color: resumeData?.metadata?.theme?.primary,
                      }}
                    />
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
          <div className="grid grid-cols-12 px-10 py-2 gap-10">
            <div className="col-span-8 resume_detailed_section1">
              <div>
                <Profile
                  data={resumeData?.sections?.summary}
                  fontStyle={fontStyle}
                  headingColor={resumeData?.metadata?.theme?.primary}
                />
                <Experience
                  fontStyle={fontStyle}
                  data={resumeData?.sections?.experience}
                  headingColor={resumeData?.metadata?.theme?.primary}
                />
                <Projects
                  fontStyle={fontStyle}
                  data={resumeData?.sections?.projects}
                  headingColor={resumeData?.metadata?.theme?.primary}
                />
                <Awards
                  fontStyle={fontStyle}
                  data={resumeData?.sections?.projects}
                  headingColor={resumeData?.metadata?.theme?.primary}
                />
                <Certificates
                  fontStyle={fontStyle}
                  data={resumeData?.sections?.projects}
                  headingColor={resumeData?.metadata?.theme?.primary}
                />
              </div>
            </div>
            <div className="col-span-4 resume_other_section2">
              <Education
                fontStyle={fontStyle}
                data={resumeData?.sections?.education}
                headingColor={resumeData?.metadata?.theme?.primary}
              />
              <Skills
                fontStyle={fontStyle}
                data={resumeData?.sections?.skills}
                headingColor={resumeData?.metadata?.theme?.primary}
              />
              <Hobbies
                fontStyle={fontStyle}
                data={resumeData?.sections?.skills}
                headingColor={resumeData?.metadata?.theme?.primary}
              />
              <Languages
                fontStyle={fontStyle}
                data={resumeData?.sections?.skills}
                headingColor={resumeData?.metadata?.theme?.primary}
              />
              <References
                fontStyle={fontStyle}
                data={resumeData?.sections?.skills}
                headingColor={resumeData?.metadata?.theme?.primary}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template8;
