'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { FaGraduationCap, FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

const Education = ({ fontStyle, data }) => {
  return (
    <div className="education_section py-3">
      {
        data.visible && data?.items?.length > 0 &&
        <>
          <h2 className={`${fontStyle.headingFont} font-semibold uppercase`}>
            {data?.name}
          </h2>
          <div className="text-gray-800 my-5">
            {
              data?.items?.map((item, index) => {
                return <div className="education1 my-5" key={index}>
                  <h3 className={`${fontStyle.subHeadingFont} font-bold`}>{item?.degree}</h3>
                  <h4 style={{ fontSize: fontStyle.paraFont }}>{item?.institute}</h4>
                  <p className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}>
                    {item?.startDate && `${item?.startDate}${item?.endDate && ' - '}`}{item?.endDate}</p>
                  <div className={`py-2 ${fontStyle.paraFont} break-words`} dangerouslySetInnerHTML={{ __html: item?.description }}>
                  </div>
                </div>
              })
            }
          </div>
        </>
      }
    </div>
  )
}

const Experience = ({ fontStyle, data }) => {
  return (
    <div className="experience_section my-2">
      {
        data?.visible && data?.items?.length > 0 &&
        <>
          <div className="experience_heading flex gap-5 items-center">
            <div className="icon bg-gray-300 p-2">
              <FaGraduationCap />
            </div>
            <h2 style={{ fontSize: fontStyle.headingFont }} className="text-xl font-bold uppercase">
              {data?.name}
            </h2>
          </div>
          {
            data?.items?.map((item, index) => {
              return (
                <div className="experience_1 my-5" key={index}>
                  <div className="post flex  justify-between items-center my-2">
                    <div className="post_title">
                      <h3 style={{ fontSize: fontStyle.subHeadingFont }} className="font-bold">{item?.jobtitle}</h3>
                      <h4 style={{ fontSize: fontStyle.paraFont }} className="font-semibold">{item?.employer}</h4>
                    </div>
                    <div className="year font-bold">
                      <p className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}><span >{item?.startDate}</span>
                        <span>{item?.startDate && item?.endDate && ' - '}</span>
                        <span>{item?.endDate}</span></p>
                      {item?.city &&
                        <p className="text-13px flex font-normal items-center justify-end text-end"><IoLocationOutline className="mr-1" />{item?.city}</p>
                      }
                    </div>
                  </div>
                  <div className={`${fontStyle.paraFont} break-words`} dangerouslySetInnerHTML={{ __html: item?.description }}>

                  </div>
                </div>
              )
            })
          }
        </>
      }
    </div>
  )
}

const Projects = ({ fontStyle, data }) => {
  return (
    <div className="project_section my-4">
      {
        data?.visible && data?.items.length > 0 &&
        <>
          <div className="project_heading flex gap-5 items-center">
            <div className="icon bg-gray-300 p-2">
              <FaGraduationCap />
            </div>
            <h2 className={`${fontStyle.headingFont} font-bold uppercase`}>{data?.name}</h2>
          </div>
          {
            data?.items.map((item, index) => {
              return <div className="projects1 my-3" key={index}>
                <div className="post flex  justify-between items-center my-2">
                  <div className="post_title">
                    <h3 style={{ fontSize: fontStyle.subHeadingFont }} className="font-bold">{item?.title}</h3>
                    <h4 style={{ fontSize: fontStyle.paraFont }} className="font-semibold">{item?.subtitle}</h4>
                  </div>
                  <div className="year">
                    <p className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}>{item?.startDate && `${item.startDate}${item.endDate && ' - '}`}{item?.endDate}</p>
                  </div>
                </div>
                <div className={`key_points ${fontStyle.paraFont} break-words`} dangerouslySetInnerHTML={{ __html: item?.description }}>
                </div>
              </div>
            })
          }
        </>
      }
    </div >
  )
}

const Skills = ({ fontStyle, data }) => {
  return (
    <div className="skills_section border-b-2 border-gray-300 py-3">
      <h2 className={`${fontStyle.headingFont} text-gray-600 font-semibold uppercase`}>
        Skills
      </h2>
      <div className="text-gray-600 my-1">
        <ul className="list-disc pl-5">
          <li className={`font-bold text-gray-600 ${fontStyle.skillsFont}`}>React js</li>
          <li className={`font-bold text-gray-600 ${fontStyle.skillsFont}`}>Next js</li>
          <li className={`font-bold text-gray-600 ${fontStyle.skillsFont}`}>Node js</li>
          <li className={`font-bold text-gray-600 ${fontStyle.skillsFont}`}>Tailwind Css</li>
          <li className={`font-bold text-gray-600 ${fontStyle.skillsFont}`}>Redux</li>
          <li className={`font-bold text-gray-600 ${fontStyle.skillsFont}`}>Redux Toolkit</li>
          <li className={`font-bold text-gray-600 ${fontStyle.skillsFont}`}>React Query</li>
        </ul>
      </div>
    </div>
  )
}

const Profile = ({ data, fontStyle }) => {
  const htmlContent = data.content
  return (
    <div>
      {
        data?.visible &&
        <div className="profile_section">
          <div className="profile_heading flex gap-5 items-center">
            <div className="icon bg-gray-300 p-2">
              <FaUser />
            </div>
            <h2 className={`${fontStyle.headingFont} font-bold uppercase`}>{data?.name}</h2>
          </div>
          <div className={`my-5 ${fontStyle.subHeadingFont}`} dangerouslySetInnerHTML={{ __html: htmlContent }}>
          </div>
        </div>
      }
    </div>
  )
}

const Template3 = ({ resumeData }) => {

  const [fontStyle, setFontStyle] = useState({
    mainHeadingFont: "text-40px",
    jobtitleFont: "text-24px",
    headingFont: "text-22px",
    subHeadingFont: "text-16px",
    paraFont: "text-15px",
    paddingFont: "10px 0",
    dates: 'text-14px',
    datesStyle: "text-gray-500 font-normal",
    skillsFont: "text-15px",
    contactFont: "text-13px"
  })

  return (
    <>
      <div className="p-custom space-y-3 ">
        <div className="bg-white mx-auto">
          <div className="top_section flex justify-around items-center  py-10 border-2" style={{
            backgroundColor : resumeData?.metadata?.theme?.primary
          }
          }>
            <div className="name_profile w-[70%]  h-full px-10">
              <h1 className={`${fontStyle.mainHeadingFont} uppercase font-bold break-words`}>
                {resumeData?.basics?.name}
              </h1>
              <p className={`${fontStyle.jobtitleFont} break-words uppercase`}>
                {resumeData?.basics?.jobtitle}
              </p>
            </div>
            <div className="profile_pic w-[30%] flex items-center justify-center">
              <img
                src="/pic.jpg"
                alt="pic"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          </div>
          <div className="resume_section mt-5 flex flex-row">
            <div className="md:w-[30%] w-full left_side border-r-2 border-gray-300 p-5">
              <div className="contact_section border-b-2 border-gray-300 pb-3">
                <h2 className={`text-xl text-gray-600 font-semibold uppercase ${fontStyle.headingFont}`}>
                  Details
                </h2>
                <div className=
                  {`text-gray-600 my-4 ${fontStyle.contactFont}`} >
                  {resumeData?.basics?.email && <a
                    href={`mailto:${resumeData?.basics?.email}`}
                    className="hover:underline flex items-center mt-1  text-wrap w-full "
                  >
                    <MdOutlineMailOutline className="mr-2" />
                    <p className="w-[90%] text-wrap break-words">
                      {resumeData?.basics?.email}
                    </p>
                  </a>}
                  {resumeData?.basics?.phone && <a
                    href={`tel:${resumeData?.basics?.phone}`}
                    className="hover:underline flex items-center mt-1  text-wrap w-full "
                  >
                    <MdOutlinePhone className="mr-2" />
                    <p className="w-[90%] text-wrap break-words">
                      {resumeData?.basics?.phone}
                    </p>
                  </a>}
                  {
                    (resumeData?.basics?.city || resumeData?.basics?.country) && <p className="flex items-center"><IoLocationOutline className="mr-2" />
                      <span>{resumeData?.basics?.city}</span>
                      <span>{resumeData?.basics?.city && resumeData?.basics?.country && ' , '}</span>
                      <span className=" font-bold">{resumeData?.basics?.country}</span></p>
                  }
                </div>
              </div>
              <Skills fontStyle={fontStyle} data={resumeData?.sections?.skills
              } />
              <Education fontStyle={fontStyle} data={resumeData?.sections?.education} />
            </div>
            <div className="md:w-[70%] w-full right_side p-5">
              <Profile data={resumeData?.sections?.summary} fontStyle={fontStyle} />
              <Experience fontStyle={fontStyle} data={resumeData?.sections?.experience} />
              <Projects fontStyle={fontStyle} data={resumeData?.sections?.projects} />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template3;
