"use client";
import React from "react";
import { ResumeData } from "@/constants/data";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";



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


const Template1 = ({resumeData}) => {
  

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
      {/* <div className="resume_wrapper">
        <div className="resume_left">
          <div className="resume_image">
            <img src="/pic.jpg" alt="Resume_image" />
          </div>
          <div className="resume_bottom">
            <div className="resume_item resume_namerole">
              <div className={`${fontStyle.mainHeadingFont} name`}>{resumeData?.basics?.name}</div>
              <div className={`${fontStyle.jobtitleFont} role`}>{resumeData?.basics?.jobtitle}</div>
              <div className="links"></div>
            </div>
            <div className="resume_item resume_profile">
              <div className="resume_title">{val?.profile?.label}</div>
              <div className="resume_info">{val?.profile?.description}</div>
            </div>
            <div className="resume_item resume_address">
              <div className="resume_title">{val?.address?.label}</div>
              {val?.address?.section.length > 0 &&
                val?.address?.section?.map((item, idx) => (
                  <div className="resume_info" key={idx}>
                    {item?.line1}
                    <br />
                    {item?.line2}
                    <br />
                    {item?.city}, {item?.country}
                  </div>
                ))}
            </div>
            <div className="resume_item resume_skills">
              <div className="resume_title">{val?.skills?.label}</div>
              <div className="resume_info">
                {val?.skills?.section.length > 0 &&
                  val?.skills?.section?.map((item, idx) => (
                    <>
                      <div className="skills_list">
                        <div className="skills_left">{item?.name}</div>
                        <div className="skills_bar">
                          <p>
                            <span style={{ width: `${item?.percentage}%`}} />
                          </p>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="resume_right">
          <div className="resume_item resume_namerole">
            <div className="name">{val?.name}</div>
            <div className="role my-3">{val?.role}</div>
            <div className="contact_details flex justify-between mt-2">
              <div className="phone">
                <FaPhoneAlt className="inline mr-1" />
                {val?.phone}
              </div>
              <div className="email">
                <MdEmail className="inline mr-1" />
                {val?.email}
              </div>
              <div className="facebook">
                <FaFacebookF className="inline mr-1" />
                {val?.facebook}
              </div>
            </div>
          </div>
          <div className="resume_item resume_education">
            <div className="resume_info">
            <Education fontStyle={fontStyle} data={resumeData?.sections?.education} />
            </div>
          </div>
          <div className="resume_item resume_experience">
            <div className="resume_title">{val?.experience?.label}</div>
            <div className="resume_info">
            <Experience fontStyle={fontStyle} data={resumeData?.sections?.experience} />
            </div>
          </div>
        </div>
      </div> */}
       <div className="resume_wrapper flex w-[210mm] h-[297mm] bg-white p-3 mx-auto my-12">
      <div className="resume_left w-[35%] bg-[#26252d]">
        <div className="resume_image w-full">
          <img src="/pic.jpg" alt="Resume_image" className="w-full block"/>
        </div>
        <div className="resume_bottom py-5 px-8">
          <div className="resume_item resume_profile py-5 border-b-2 border-[#0175b2]">
            <div className="resume_title text-white uppercase font-bold text-base mb-3 tracking-wider">{val?.profile?.label}</div>
            <div className="resume_info text-[#84838b]">{val?.profile?.description}</div>
          </div>
          <div className="resume_item resume_address py-5 border-b-2 border-[#0175b2]">
            <div className="resume_title text-white uppercase font-bold text-base mb-3 tracking-wider">{val?.address?.label}</div>
            {val?.address?.section.length > 0 &&
              val?.address?.section?.map((item, idx) => (
                <div className="resume_info text-[#84838b]" key={idx}>
                  {item?.line1}
                  <br />
                  {item?.line2}
                  <br />
                  {item?.city}, {item?.country}
                </div>
              ))}
          </div>
          <div className="resume_item resume_skills py-5 border-b-2 border-[#0175b2]">
            <div className="resume_title text-white uppercase font-bold text-base mb-3 tracking-wider">{val?.skills?.label}</div>
            <div className="resume_info">
              {val?.skills?.section.length > 0 &&
                val?.skills?.section?.map((item, idx) => (
                  <div className="skills_list flex justify-between mb-2" key={idx}>
                    <div className="skills_left text-[#84838b]">{item?.name}</div>
                    <div className="skills_bar relative w-[125px] h-[20px] bg-white">
                      <p className="absolute top-0 left-0 h-full bg-[#0175b2]" style={{ width: `${item?.percentage}%` }} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="resume_right w-[65%] px-10 py-5 text-[#26252d]">
        <div className="resume_item resume_namerole">
          <div className="name text-4xl uppercase font-bold tracking-wider mb-2">{val?.name}</div>
          <div className="role text-lg uppercase mb-3">{val?.role}</div>
          <div className="contact_details flex flex-wrap gap-2 justify-between mt-2">
            <div className="phone flex items-center"><FaPhoneAlt className="inline mr-1" />{val?.phone}</div>
            <div className="email flex items-center"><MdEmail className="inline mr-1" />{val?.email}</div>
            <div className="facebook flex items-center"><FaFacebookF className="inline mr-1" />{val?.facebook}</div>
          </div>
        </div>
        <div className="resume_item resume_education my-10">
          <div className="resume_title text-[#26252d] uppercase font-bold text-base mb-3 tracking-wider">{val?.education?.label}</div>
          <div className="resume_info">
            {val?.education?.section.length > 0 &&
              val?.education?.section.map((item, idx) => (
                <div className="resume_data flex mb-4" key={idx}>
                  <div className="year w-[250px] pr-8 relative text-[#0175b2]">
                    {item?.year}
                    <div className="year_marker absolute top-1.5 right-0 w-2.5 h-2.5 bg-white border border-[#26252d] rounded-full" />
                    <div className="year_line absolute top-4 right-1 w-0.5 h-full bg-[#0175b2]" />
                  </div>
                  <div className="content pl-8">
                    <p className="font-bold">{item?.title}</p>
                    <p>{item?.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="resume_item resume_experience my-10">
          <div className="resume_title text-[#26252d] uppercase font-bold text-base mb-3 tracking-wider">{val?.experience?.label}</div>
          <div className="resume_info">
            {val?.experience?.section.length > 0 &&
              val?.experience?.section?.map((item, idx) => (
                <div className="resume_data flex mb-4" key={idx}>
                  <div className="year w-[250px] pr-8 relative text-[#0175b2]">
                    {item?.year}
                    <div className="year_marker absolute top-1.5 right-0 w-2.5 h-2.5 bg-white border border-[#26252d] rounded-full" />
                    <div className="year_line absolute top-4 right-1 w-0.5 h-full bg-[#0175b2]" />
                  </div>
                  <div className="content pl-8">
                    <p className="font-bold">{item?.title}</p>
                    <p>{item?.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div> 
    </>
  );
};

export default Template1;
