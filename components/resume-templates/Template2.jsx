import React from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";


const Education = ({ fontStyle, data }) => {
  return (
    <div className="education_section py-3">
      {data.visible && data?.items?.length > 0 && (
        <>
          <div className="flex gap-5 items-center">
            <h2 className={`${fontStyle.headingFont} font-semibold uppercase`}>
              {data?.name}
            </h2>
          </div>
          <div className="text-gray-800 my-5">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="education1 flex my-5" key={index}>
                    <div className="year w-[150px] pr-8 relative text-[#0175b2]">
                      {<p>item?.startDate</p> &&
                        `${item?.startDate}${item?.endDate && " - "}`}
                      {item?.endDate}
                      <div className="year_marker absolute top-1.5 right-0 w-2.5 h-2.5 bg-white border border-[#26252d] rounded-full" />
                      <div className="year_line absolute top-4 right-1 w-0.5 h-full bg-[#0175b2]" />
                    </div>
                    <div className="content pl-8 flex flex-col break-all">
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
                  {/* <div
                    className={`py-2 ${fontStyle.paraFont} break-words`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></div> */}
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const Experience = ({ fontStyle, data }) => {
  return (
    <div className="experience_section my-2">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="experience_heading flex gap-5 items-center">
            <h2
              style={{ fontSize: fontStyle.headingFont }}
              className="text-xl font-bold uppercase"
            >
              {data?.name}
            </h2>
          </div>
          {data?.items?.map((item, index) => {
            return (
              // <div className="experience_1 my-5" key={index}>
              //   <div className="post flex  justify-between items-center my-2">
              //     <div className="post_title">
              //       <h3
              //         style={{ fontSize: fontStyle.subHeadingFont }}
              //         className="font-bold"
              //       >
              //         {item?.jobtitle}
              //       </h3>
              //       <h4
              //         style={{ fontSize: fontStyle.paraFont }}
              //         className="font-semibold"
              //       >
              //         {item?.employer}
              //       </h4>
              //     </div>
              //     <div className="year font-bold">
              //       <p
              //         className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}
              //       >
              //         <span>{item?.startDate}</span>
              //         <span>{item?.startDate && item?.endDate && " - "}</span>
              //         <span>{item?.endDate}</span>
              //       </p>
              //       {item?.city && (
              //         <p className="text-13px flex font-normal items-center justify-end text-end">
              //           <IoLocationOutline className="mr-1" />
              //           {item?.city}
              //         </p>
              //       )}
              //     </div>
              //   </div>
              //   <div
              //     className={`${fontStyle.paraFont} break-words`}
              //     dangerouslySetInnerHTML={{ __html: item?.description }}
              //   ></div>
              // </div>
              <div className="experience_1 flex my-5" key={index}>
                <div className="year w-[150px] pr-8 relative text-[#0175b2]">
                  {item?.startDate && (
                    <p className="text-center">
                      {item.startDate}
                      {item?.endDate && " - "}
                    </p>
                  )}
                  {item?.endDate && <p>{item.endDate}</p>}
                  <div className="year_marker absolute top-1.5 right-0 w-2.5 h-2.5 bg-white border border-[#26252d] rounded-full" />
                  <div className="year_line absolute top-4 right-1 w-0.5 h-full bg-[#0175b2]" />
                </div>
                <div className="content pl-8 flex flex-col break-all">
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
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

const Projects = ({ fontStyle, data }) => {
  return (
    <div className="project_section my-4">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div className="project_heading flex gap-5 items-center">
            <div className="icon bg-gray-300 p-2">
              <FaGraduationCap />
            </div>
            <h2 className={`${fontStyle.headingFont} font-bold uppercase`}>
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

const Skills = ({ fontStyle, data }) => {
  return (
    <div>
      {data.visible && data.items.length > 0 && (
        <div className="skills_section border-b-2 border-gray-300 py-3">
          <h2
            className={`${fontStyle.headingFont} text-white font-semibold uppercase`}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 my-1">
            <ul className="list-disc pl-5">
              {data.items.map((item, i) => {
                return (
                  <li
                    className={`font-bold text-white ${fontStyle.skillsFont}`}
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

const Profile = ({ data, fontStyle }) => {
  const htmlContent = data.content;
  return (
    <div>
      {data?.visible && (
        <div className="profile_section">
          <div className="profile_heading flex gap-5 items-center">
            <h2
              className={`${fontStyle.headingFont} font-bold uppercase text-white`}
            >
              {data?.name}
            </h2>
          </div>
          <div
            className={`text-white my-5 break-words ${fontStyle.subHeadingFont}`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        </div>
      )}
    </div>
  );
};

export const Template2 = ({resumeData}) => {

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
      <div className="bg-gray-500 w-[219mm] h-[297mm] mx-auto">
        <div className=" bg-black mx-auto px-4 py-8 flex justify-between md:flex-no-wrap flex-wrap" style={{
            backgroundColor: resumeData?.metadata?.theme?.primary,
          }}>
          <div className="md:w-1/3 w-full px-5">
            <header>
            {resumeData?.basics?.picture?.url && (
              <img
                src={resumeData?.basics?.picture?.url}
                alt="Resume_image"
                className="w-24 h-24 block mx-auto my-5 rounded-full"
              />
            )}
            <h1
              className={`${fontStyle.mainHeadingFont} uppercase font-bold break-words`}
            >
              {resumeData?.basics?.name}
            </h1>
            <p className={`${fontStyle.jobtitleFont} break-words uppercase`}>
              {resumeData?.basics?.jobtitle}
            </p>
            </header>
            <section className="mt-5">
              <h3 className="uppercase text-white text-xl font-medium">
                Career Objectives
              </h3>
              <div className="h-1 bg-green w-48 my-4"></div>
              <p className="text-white text-base">
              <Profile
                data={resumeData?.sections?.summary}
                fontStyle={fontStyle}
              />
              </p>
            </section>
            <section className="mt-5">
              <h3 className="uppercase text-white font-medium text-xl">
                Specializations
              </h3>
              <div className="h-1 bg-green w-48 my-4"></div>
              <ul className="text-white list-disc list-inside">
                <li>
                <Skills
                  fontStyle={fontStyle}
                  data={resumeData?.sections?.skills}
                />
                </li>
              </ul>
            </section>
            <section className="mt-5">
              <h3 className="uppercase text-white font-medium text-xl">
                Contact Info:
              </h3>
              <div className="h-1 bg-green w-48 my-4"></div>
              <div
                className={`text-gray-600 my-4 ${fontStyle.contactFont} flex`}
              >
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
              </div>
            </section>
          </div>
          <div className="md:w-3/5 w-full px-5">
            <section className="mt-16 md:mt-0">
              <h3 className="uppercase text-white font-medium text-2xl">
                Work Summary
              </h3>
              <div className="h-1 bg-green w-48 my-4"></div>
              <Experience
                fontStyle={fontStyle}
                data={resumeData?.sections?.experience}
              />
              {/* <div className="mt-8">
                <h4 className="font-medium text-green text-xl">
                  Junior Front-end engineer
                </h4>
                <h5 className="text-base text-green">
                  <a href="https://renetal.com" className="hover:underline">
                    Renetal
                  </a>{" "}
                  | <i>2019 - JULY 2020</i>
                </h5>
                <ul className="text-white list-disc list-inside mt-4">
                  <li> Designed high-performant UI Components </li>
                  <li> Complete SaaS app redesign using VueJs </li>
                  <li>
                    {" "}
                    Worked with an amazing remote-team from SIngapore in an
                    agile environment.
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <h4 className="font-medium text-green text-xl">
                  Founder &lt; CEO
                </h4>
                <h5 className="text-base  text-green">
                  <a
                    href="https://justifyagency.com"
                    className="hover:underline"
                  >
                    Justify Agency
                  </a>{" "}
                  | <i>2020 - Present</i>
                </h5>
                <ul className="text-white list-disc list-inside mt-4">
                  <li>
                    {" "}
                    Meeting with clients to discuss project requirements and
                    workflow. (Includes Startups &amp; Products){" "}
                  </li>
                  <li> Working with distributed network of freelancers </li>
                  <li>
                    &nbsp;Complete Branding &amp; Design System (Email, Social
                    Media, Website, Print){" "}
                  </li>
                </ul>
              </div> */}
              <section className="mt-5">
                <h3 className="uppercase text-white font-medium text-2xl">
                  Projects
                </h3>
                <div className="h-1 bg-green w-48 my-4"></div>
                <Projects
                fontStyle={fontStyle}
                data={resumeData?.sections?.projects}
              />
                {/* <div className="mt-5">
                  <h4 className="font-medium text-green text-xl mb-5">
                    Shopify Freelance Associate
                  </h4>
                  <p className="text-white text-sm">
                    Proud member of the shopify community, and their partner
                    program. Setting up Shopify stores and making custom themes
                    from a long time.
                  </p>
                </div>
                <div className="mt-5">
                  <h4 className="font-medium text-green text-xl">
                    <a
                      href="https://dev.to/justaashir"
                      className="hover:underline"
                    >
                      DEV Community
                    </a>{" "}
                    (Volunteer &amp; Technical Writer)
                  </h4>
                  <ul className="text-white list-disc list-inside mt-4 text-base">
                    <li>
                      Have written about Vuejs, career advice and resources...
                    </li>
                    <li> Top 500 Author (Award)</li>
                    <li> 16,000+ Followers + 150K+ Views</li>
                    <li> 5 Badges</li>
                  </ul>
                </div> */}
              </section>
              {/* <section className="mt-5">
                <div className="mt-8">
                  <h4 className="font-medium text-green text-xl">
                    <a
                      href="https://tailwindcssuikit.com"
                      className="hover:underline"
                    >
                      Tailwind CSS Ui Kit
                    </a>
                  </h4>
                  <p className="text-white mt-2">
                    Building this, in my free time. Making modern design systems
                    and kits possible with TailwindCSS
                  </p>
                </div>
                <div className="mt-5">
                  <h4 className="font-medium text-green text-xl">
                    <a
                      href="https://remoteworkjar.com"
                      className="hover:underline"
                    >
                      RemoteWorkJar
                    </a>
                  </h4>
                  <p className="text-white mt-2">
                    Remote Job Board, where the main focus is to manually screen
                    every job posted and help candidates get high-quality
                    remote-only job postings.
                  </p>
                </div>
              </section> */}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template2;
