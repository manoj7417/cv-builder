import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useResumeStore } from "@/app/store/ResumeStore";

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
              paddingBottom: "0.25rem", // Space for the underline
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 my-1 w-full flex justify-end items-center">
            <ul className="w-full flex gap-5 flex-wrap underline underline-offset-2">
              {data.items.map((item, i) => {
                return (
                  <li
                    className={`font-bold text-gray-600 ${fontStyle.skillsFont} my-1 py-1`}
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

const Template9 = () => {
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
      <div className="template_8 min-w-[210mm] min-h-[297mm] ">
        <div
          className="w-full h-full bg-[#E0FBE2]"
        //   style={{
        //     backgroundImage: "url('/resumebg.jpg')",
        //     backgroundPosition: "top",
        //   }}
        >
          <div className="top_section flex items-start gap-1 justify-start px-10 bg-[#E0FBE2]">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template9;
