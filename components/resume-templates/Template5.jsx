import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { FaGraduationCap, FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useResumeStore } from "@/app/store/ResumeStore";

const Education = ({ fontStyle, headingColor }) => {
  const data = useResumeStore((state)=>state?.resume.data.sections?.education)
  return (
    <div className="education_section py-3">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <h2
            className={`${fontStyle.headingFont} font-semibold uppercase`}
            style={{
              color: headingColor,
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-800 my-5">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div
                    className="education1 my-1 flex justify-between"
                    key={index}
                  >
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
                    <div className="education_year">
                      <p
                        className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}
                      >
                        {item?.startDate &&
                          `${item?.startDate}${item?.endDate && " - "}`}
                        {item?.endDate}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`py-2 ${fontStyle.paraFont} break-words`}
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
  const data = useResumeStore((state)=>state?.resume.data.sections?.experience)
  return (
    <div className="experience_section my-2">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="experience_heading flex gap-5 items-center">
            <h2
              style={{ fontSize: fontStyle.headingFont, color: headingColor }}
              className="text-xl font-bold uppercase"
            >
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div className="experience_1 my-5" key={index}>
                <div className="post flex  justify-between items-center my-2">
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
                  <div className="year font-bold">
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
  const data = useResumeStore((state)=>state?.resume.data.sections?.projects)
  return (
    <div className="project_section my-4">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div className="project_heading flex gap-5 items-center">
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{
                color: headingColor,
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
  const data = useResumeStore((state)=>state?.resume.data.sections?.skills)
  return (
    <div>
      {data?.visible && data?.items?.length > 0 && (
        <div className="skills_section py-3">
          <h2
            className={`${fontStyle.headingFont} text-gray-600 font-semibold uppercase`}
            style={{
              color: headingColor,
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 my-1 w-full flex justify-end items-center">
            <ul>
              {data.items.map((item, i) => {
                return (
                  <li
                    className={`font-bold text-gray-600 ${fontStyle.skillsFont} border-b-4 border-dotted my-1 py-1`}
                    key={i}
                    style={{
                      borderColor:headingColor
                    }}
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
  const data = useResumeStore((state)=>state?.resume.data.sections?.summary)
  const htmlContent = data?.content;
  return (
    <div>
      {data?.visible && (
        <div className="profile_section">
          <div className="profile_heading flex gap-5 items-center">
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase`}
              style={{
                color: headingColor,
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

export const Template5 = () => {


  const resumeData = useResumeStore(state => state?.resume.data);


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
      <div className="max-w-[210mm] max-h-[297mm] w-full h-full">
        <div className="bg-white">
          <div className="grid grid-cols-12 p-10">
            <div className="resume_detailed_section col-span-9">
              <div>
                <div className="top_section flex items-start gap-5">
                  {resumeData?.basics?.picture?.url && (
                    <div className="profile_pic mt-2">
                      <img
                        src={resumeData?.basics?.picture?.url}
                        alt="pic"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div className="name_profile h-full">
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
                      {(resumeData?.basics?.city ||
                        resumeData?.basics?.country) && (
                        <p className="flex items-center">
                          <IoLocationOutline className="mr-2" />
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

                <Education
                  fontStyle={fontStyle}
                  data={resumeData?.sections?.education}
                  headingColor={resumeData?.metadata?.theme?.primary}
                />
              </div>
            </div>
            <div className="skills_section col-span-3 text-right">
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

export default Template5;
