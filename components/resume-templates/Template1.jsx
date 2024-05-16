"use client";
import React from "react";
import { ResumeData } from "@/constants/data";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";

const Template1 = () => {
  const val = ResumeData?.resume;
  return (
    <>
      <div className="resume_wrapper">
        <div className="resume_left">
          <div className="resume_image">
            <img src="/pic.jpg" alt="Resume_image" />
          </div>
          <div className="resume_bottom">
            <div className="resume_item resume_namerole">
              <div className="name">{val?.name}</div>
              <div className="role">{val?.role}</div>
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
            {/* <div className="resume_item resume_contact">
              <div className="resume_title">{val?.contact?.label}</div>
              {val?.contact?.section.length > 0 &&
                val?.contact?.section?.map((item, idx) => (
                  <>
                    {item?.phone && (
                      <div className="resume_info" key={idx}>
                        <div className="resume_subtitle">Phone</div>
                        <div className="resume_subinfo">{item?.phone}</div>
                      </div>
                    )}
                    {item?.email && (
                      <div className="resume_info" key={idx}>
                        <div className="resume_subtitle">Email</div>
                        <div className="resume_subinfo">{item?.email}</div>
                      </div>
                    )}
                    {item?.facebook && (
                      <div className="resume_info" key={idx}>
                        <div className="resume_subtitle">Facebook</div>
                        <div className="resume_subinfo">{item?.facebook}</div>
                      </div>
                    )}
                    {item?.twitter && (
                      <div className="resume_info" key={idx}>
                        <div className="resume_subtitle">Twitter</div>
                        <div className="resume_subinfo">{item?.twitter}</div>
                      </div>
                    )}
                  </>
                ))}
            </div> */}
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
                {/* <div className="skills_list">
                  <div className="skills_left">HTML</div>
                  <div className="skills_bar">
                    <p>
                      <span style={{ width: "90%" }} />
                    </p>
                  </div>
                </div>
                <div className="skills_list">
                  <div className="skills_left">CSS</div>
                  <div className="skills_bar">
                    <p>
                      <span style={{ width: "80%" }} />
                    </p>
                  </div>
                </div>
                <div className="skills_list">
                  <div className="skills_left">Javascript</div>
                  <div className="skills_bar">
                    <p>
                      <span style={{ width: "50%" }} />
                    </p>
                  </div>
                </div>
                <div className="skills_list">
                  <div className="skills_left">Photoshop</div>
                  <div className="skills_bar">
                    <p>
                      <span style={{ width: "95%" }} />
                    </p>
                  </div>
                </div> */}
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
            <div className="resume_title">{val?.education?.label}</div>
            <div className="resume_info">
              {val?.education?.section.length > 0 &&
                val?.education?.section.map((item, idx) => (
                  <>
                    <div className="resume_data">
                      <div className="year">{item?.year}</div>
                      <div className="content">
                        <p>{item?.title}</p>
                        <p>{item?.description}</p>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
          <div className="resume_item resume_experience">
            <div className="resume_title">{val?.experience?.label}</div>
            <div className="resume_info">
              {val?.experience?.section.length > 0 &&
                val?.experience?.section?.map((item, idx) => (
                  <>
                    <div className="resume_data">
                      <div className="year">{item?.year}</div>
                      <div className="content">
                        <p>{item?.title}</p>
                        <p>{item?.description}</p>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template1;
