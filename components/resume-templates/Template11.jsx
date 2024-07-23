import React, { useState } from "react";
import { MdOutlineMailOutline, MdOutlineSettings } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useResumeStore } from "@/app/store/ResumeStore";
import {
  FaAward,
  FaComputer,
  FaGraduationCap,
  FaXTwitter,
} from "react-icons/fa6";
import { FaGlobe, FaUserAlt } from "react-icons/fa";
import { HiCube } from "react-icons/hi2";
import Link from "next/link";
import { GrCertificate } from "react-icons/gr";
import { PiCertificateFill } from "react-icons/pi";
import { isValidUrl } from "./ValidateUrl";
import { AiOutlineLink } from "react-icons/ai";

const Education = ({ fontStyle, colorText, colorBackground }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.education
  );
  return (
    <div className="education_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="education_header flex items-center gap-3">
            <FaGraduationCap
              className="text-3xl"
              style={{ color: colorBackground }}
            />
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont}`}
              style={{ color: colorBackground }}
            >
              {data?.name}
            </h2>
            <div
              className="border w-full"
              style={{ borderColor: colorBackground }}
            ></div>
          </div>
          <div className="text-gray-800 px-5">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="education1 my-5 px-5" key={index}>
                    <div className="education_names flex  justify-between items-center my-1">
                      <div className="education_degree">
                        <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                          {item?.degree}
                        </h3>
                        <h4 style={{ fontSize: fontStyle.paraFont }}>
                          {item?.institute}
                        </h4>
                      </div>
                      <div className="education_year text-end">
                        <p
                          className={`${fontStyle?.dates} ${fontStyle.datesStyle}`}
                        >
                          {item?.startDate &&
                            `${item?.startDate}${item?.endDate && " - "}`}
                          {item?.endDate}
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

const Experience = ({ fontStyle, colorStyle, colorBackground }) => {
  const data = useResumeStore(
    (state) => state?.resume.data?.sections?.experience
  );

  return (
    <div className="experience_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="experience_header flex items-center gap-3">
            <FaComputer
              className="text-3xl"
              style={{ color: colorBackground }}
            />
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont}`}
              style={{ color: colorBackground }}
            >
              {data?.name}
            </h2>
            <div
              className="border w-full"
              style={{ borderColor: colorBackground }}
            ></div>
          </div>
          {data?.items?.map((item, index) => {
            return (
              <div className="experience_1 w-full px-10" key={index}>
                <div className="post flex  justify-between items-center my-2">
                  <div className="post_title">
                    <h3
                      style={{ fontSize: fontStyle.subHeadingFont }}
                      className="font-bold"
                    >
                      {item?.jobtitle}
                    </h3>
                    <h4
                      style={{ fontSize: fontStyle.paraFont }}
                      className="font-semibold"
                    >
                      {item?.employer}
                    </h4>
                  </div>
                  <div className="year font-bold text-end">
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
    <div className="awards_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="awards_header flex items-center gap-3">
            <FaAward className="text-3xl" style={{ color: colorBackground }} />
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont}`}
              style={{ color: colorBackground }}
            >
              {data?.name}
            </h2>
            <div
              className="border w-full"
              style={{ borderColor: colorBackground }}
            ></div>
          </div>
          <div className="text-gray-800">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="awards my-5 px-10" key={index}>
                    <div className="awards_names flex w-full justify-between my-1">
                      <div className="awards_degree w-full">
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

const Projects = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.projects);
  return (
    <div className="project_section my-4">
      {data?.visible && data?.items.length > 0 && (
        <>
          <div className="project_heading w-full flex gap-3 items-center">
            <MdOutlineSettings
              className="text-3xl"
              style={{ color: colorBackground }}
            />
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont}`}
              style={{ color: colorBackground }}
            >
              {data?.name}
            </h2>
            <div
              className="border w-full"
              style={{ borderColor: colorBackground }}
            ></div>
          </div>
          {data?.items.map((item, index) => {
            return (
              <div className="projects1 w-full my-3 px-10" key={index}>
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

const Skills = ({
  fontStyle,
  colorBackground,
  colorText,
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
        <div className="skills_section py-2">
          <h2
            className={`font-bold my-2 uppercase text-2xl ${fontStyle.headingFont}`}
            style={{
              color: colorText,
              paddingBottom: "1rem", // Space for the underline
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 my-1 w-full flex justify-end items-center">
            <ul className="w-full" style={{ color: colorText }}>
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`flex items-center sfont-bold ${fontStyle.skillsFont} my-1 py-1`}
                    key={i}
                  >
                    <div className="text-start w-1/2 mb-1">
                      <span>{item?.name}</span>
                    </div>
                    <div className="w-1/2 text-end bg-gray-200 h-2.5">
                      <div
                        className="bg-black h-2.5"
                        style={{
                          width: `${level}%`,
                          backgroundColor: secondaryBackground,
                        }}
                      ></div>
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
    <div className="py-2">
      {data?.visible && data?.items.length > 0 && (
        <h2
          className={`uppercase text-2xl font-bold ${fontStyle.headingFont}`}
          style={{ color: colorText }}
        >
          {data?.name}
        </h2>
      )}

      <div className="hobbies_section mt-5">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul style={{ color: colorText }}>
              {data?.items?.map((item, index) => {
                return (
                  <li key={index} className="text-15px py-2 font-semibold">
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

const Profile = ({ fontStyle, colorText, colorBackground }) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.summary);
  const htmlContent = data?.content;
  return (
    <div>
      {data?.visible && (
        <div className="profile_section w-full">
          <div className="profile_heading w-full flex gap-3 items-center">
            <FaUserAlt
              className="text-2xl"
              style={{ color: colorBackground }}
            />
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont}`}
              style={{
                color: colorBackground,
              }}
            >
              {data?.name}
            </h2>
            <div
              className="border w-full"
              style={{ borderColor: colorBackground }}
            ></div>
          </div>
          <div
            className={`mt-2 px-10 ${fontStyle.subHeadingFont} break-words`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        </div>
      )}
    </div>
  );
};

const Languages = ({
  fontStyle,
  colorText,
  colorBackground,
  secondaryBackground,
}) => {
  const data = useResumeStore((state) => state?.resume.data.sections?.language);

  // Define the mapping of skill levels to percentages
  const levelMapping = {
    basic: 20,
    conversational: 40,
    proficient: 60,
    fluent: 80,
    native: 100
  };

  return (
    <div>
      {data?.visible && data?.items?.length > 0 && (
        <div className="skills_section py-4">
          <h2
            className={`font-bold my-2 uppercase text-2xl ${fontStyle.headingFont}`}
            style={{
              color: colorText,
              paddingBottom: "1rem", // Space for the underline
            }}
          >
            {data?.name}
          </h2>
          <div className="text-gray-600 my-1 w-full flex justify-end items-center">
            <ul className="w-full">
              {data.items.map((item, i) => {
                const level = levelMapping[item?.level.toLowerCase()] || 25;
                return (
                  <li
                    className={`flex items-center sfont-bold text-white ${fontStyle.skillsFont} my-1 py-1`}
                    key={i}
                  >
                    <div className="text-start w-1/2 mb-1">
                      <span>{item?.name}</span>
                    </div>
                    <div className="w-1/2 text-end bg-gray-200 h-2.5">
                      <div
                        className="bg-gray-600 h-2.5"
                        style={{
                          width: `${level}%`,
                          backgroundColor: secondaryBackground,
                        }}
                      ></div>
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

const Certificates = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume?.data?.sections?.certificates
  );
  return (
    <div>
      <div className="awards_header flex items-center gap-3">
        <PiCertificateFill
          className="text-3xl"
          style={{ color: colorBackground }}
        />
        <h2
          className={`font-semibold uppercase ${fontStyle.headingFont}`}
          style={{ color: colorBackground }}
        >
          {data?.name}
        </h2>
        <div
          className="border w-full"
          style={{ borderColor: colorBackground }}
        ></div>
      </div>
      <div className="hobbies_section mt-5 px-10">
        {data?.visible && data?.items.length > 0 && (
          <div>
            <ul className="">
              {data?.items?.map((item, index) => {
                return (
                  <div className="certificate_section px-2" key={index}>
                    {isValidUrl(item?.url) ? (
                      <a
                        href={item?.url}
                        target="_blank"
                        className="break-words text-base items-center font-bold inline-flex"
                      >
                        {item?.name}
                        <AiOutlineLink className="ml-1" />
                      </a>
                    ) : (
                      <p className="break-words text-base font-bold">
                        {item.name}
                      </p>
                    )}
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

const References = ({ fontStyle, colorBackground, colorText }) => {
  const data = useResumeStore(
    (state) => state?.resume.data.sections?.reference
  );
  return (
    <div className="references_section w-full">
      {data?.visible && data?.items?.length > 0 && (
        <>
          <div className="awards_header flex items-center gap-3">
            <PiCertificateFill
              className="text-3xl"
              style={{ color: colorBackground }}
            />
            <h2
              className={`font-semibold uppercase ${fontStyle.headingFont}`}
              style={{ color: colorBackground }}
            >
              {data?.name}
            </h2>
            <div
              className="border w-full"
              style={{ borderColor: colorBackground }}
            ></div>
          </div>
          <div className="text-gray-800">
            {data?.items?.map((item, index) => {
              return (
                <>
                  <div className="references my-5" key={index}>
                    <div className="references_names w-full my-1 px-10">
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
                          <p className="break-words text-15px font-bold text-gray-600">
                            {item.name}
                          </p>
                        )}
                        <h3 className={`${fontStyle.subHeadingFont} font-bold`}>
                          <span>{item.jobTitle}</span>
                          <span className="mx-1">
                            {item.jobTitle && item.organization && ","}
                          </span>
                          <span>{item?.organization}</span>
                        </h3>
                      </div>
                      <div className="references w-full flex justify-between">
                        <h4
                          style={{ fontSize: fontStyle.paraFont }}
                          className="font-bold"
                        >
                          {item?.email}
                        </h4>
                        <h4
                          style={{ fontSize: fontStyle.paraFont }}
                          className="font-bold"
                        >
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

const Template11 = () => {
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
      <div className="template_10 w-full min-h-screen ">
        <div className="bg-white">
          <div className="flex justify-between w-full">
            <div
              className="left_section w-[35%]"
              style={{
                backgroundColor: metadata?.theme?.primary,
              }}
            >
              <div className="profile_section p-10">
                {basics?.picture?.url && (
                  <img
                    src={basics.picture.url}
                    alt="pic"
                    className="w-40 h-40 rounded-full"
                  />
                )}
              </div>
              <div className="contact_details p-5">
                <div
                  className="contact_section"
                  style={{ color: metadata?.theme?.text }}
                >
                  <h2 className="text-2xl uppercase font-bold my-2">
                    Contact Me
                  </h2>
                  <div
                    className="contact_details flex"
                    style={{ color: metadata?.theme?.text }}
                  >
                    <div
                      className={`my-4 ${fontStyle.contactFont} flex flex-col gap-2 text-center`}
                    >
                      {basics?.email && (
                        <a
                          href={`mailto:${basics?.email}`}
                          className="hover:underline flex items-center mt-1  text-wrap w-full "
                        >
                          <MdOutlineMailOutline className="mr-2" />
                          <p className="text-wrap break-words">
                            {basics?.email}
                          </p>
                        </a>
                      )}
                      {basics?.phone && (
                        <a
                          href={`tel:${basics?.phone}`}
                          className="hover:underline flex items-center mt-1  text-wrap w-full "
                        >
                          <MdOutlinePhone className="mr-2" />
                          <p className="text-wrap break-words">
                            {basics?.phone}
                          </p>
                        </a>
                      )}
                      {(basics?.city || basics?.country) && (
                        <p className="flex items-center break-words">
                          <IoLocationOutline className="mr-2" />
                          {basics?.city}
                          {basics?.city && basics?.country && " , "}
                          {basics?.country}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="skills px-5 py-4">
                <Skills
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                  secondaryBackground={metadata?.theme?.background}
                />
              </div>
              <div className="hobbies px-5 py-4">
                <Hobbies
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                />
              </div>
              <div className="language px-5 py-4">
                <Languages
                  fontStyle={fontStyle}
                  colorBackground={metadata?.theme?.primary}
                  colorText={metadata?.theme?.text}
                  secondaryBackground={metadata?.theme?.background}
                />
              </div>
            </div>
            <div className="right_section w-[65%]">
              <div
                style={{
                  backgroundColor: metadata?.theme?.primary,
                  color: metadata?.theme?.text,
                  opacity: 0.9,
                }}
              >
                <div className="user-detail p-10">
                  <h2 className="text-4xl uppercase font-medium">
                    {basics?.name}
                  </h2>
                  <h4 className="text-base">{basics?.jobtitle}</h4>
                </div>
                <div className="user_details h-[50px] relative"></div>
              </div>
              <div className="personal_details p-5">
                <div className="profile_section mb-4">
                  <Profile
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div className="education mb-4">
                  <Education
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div className="experience">
                  <Experience
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div className="projects">
                  <Projects
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div className="award">
                  <Awards
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div className="certificate">
                  <Certificates
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
                <div className="references">
                  <References
                    fontStyle={fontStyle}
                    colorBackground={metadata?.theme?.primary}
                    colorText={metadata?.theme?.text}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template11;
