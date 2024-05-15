'use client'
import React, { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { FaGraduationCap, FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const Template3 = ({ resumeData }) => {

  return (
    <>
      <div className="p-custom space-y-3">
        <div className="bg-white mx-auto">
          <div className="top_section flex justify-around items-center bg-gray-200 py-20">
            <div className="name_profile">
              <h1 className="text-4xl uppercase font-bold">
                {resumeData?.basics?.name}
              </h1>
              <p className="text-base font-medium mt-1">
                {resumeData?.basics?.jobtitle}
              </p>
            </div>
            <div className="profile_pic">
              <img
                src="/pic.jpg"
                alt="pic"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          </div>
          <div className="resume_section mt-5 flex md:flex-row flex-col">
            <div className="md:w-[30%] w-full left_side border-r-2 border-gray-300 p-8">
              <div className="contact_section border-b-2 border-gray-300 pb-3">
                <h2 className="text-xl text-gray-600 font-semibold uppercase">
                  Contact
                </h2>
                <div className="text-gray-600 my-4">
                  <a
                    href="#"
                    className="hover:underline flex items-center text-gray-700 text-base font-medium"
                  >
                    <FaLinkedinIn className="mr-2" />
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="hover:underline flex items-center mt-1"
                  >
                    <FaXTwitter className="mr-2" />
                    Twitter
                  </a>
                  <a
                    href="mailto:hello@justaashir.com"
                    className="hover:underline flex items-center mt-1"
                  >
                    <MdOutlineMailOutline className="mr-2" />
                    hello@justaashir.com
                  </a>
                  <a
                    href="https://justaashir.com"
                    className="hover:underline flex items-center mt-1"
                  >
                    <FaGlobe className="mr-2" />
                    www.justaashir.com
                  </a>
                </div>
              </div>
              <div className="skills_section border-b-2 border-gray-300 py-5">
                <h2 className="text-xl text-gray-600 font-semibold uppercase">
                  Skills
                </h2>
                <div className="text-gray-600 my-5">
                  <ul className="list-disc pl-5">
                    <li className="font-bold text-gray-600">React js</li>
                    <li className="font-bold text-gray-600">Next js</li>
                    <li className="font-bold text-gray-600">Node js</li>
                    <li className="font-bold text-gray-600">Tailwind Css</li>
                    <li className="font-bold text-gray-600">Redux</li>
                    <li className="font-bold text-gray-600">Redux Toolkit</li>
                    <li className="font-bold text-gray-600">React Query</li>
                  </ul>
                </div>
              </div>
              <div className="education_section py-5">
                <h2 className="text-xl text-gray-600 font-semibold uppercase">
                  Education
                </h2>
                <div className="text-gray-800 my-5">
                  <div className="education1 my-5">
                    <h3 className="font-bold">Post Graduation</h3>
                    <h4>Technical University Dehradun</h4>
                    <p>2014-2015</p>
                  </div>
                  <div className="education1">
                    <h3 className="font-bold">Bachelor of Technology</h3>
                    <h4>Technical University Dehradun</h4>
                    <p>2014-2015</p>
                  </div>
                  <div className="education1 my-5">
                    <h3 className="font-bold">Post Graduation</h3>
                    <h4>Technical University Dehradun</h4>
                    <p>2014-2015</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-[70%] w-full right_side p-8">
              <div className="about_section">
                <div className="about_heading flex gap-5 items-center">
                  <div className="icon bg-gray-300 p-2">
                    <FaUser />
                  </div>
                  <h2 className="text-xl font-bold uppercase">About Us</h2>
                </div>
                <p className="my-5">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorem ipsum culpa rem voluptatem non laudantium, quae
                  voluptatum maxime natus inventore accusantium dolor accusamus
                  velit debitis, sit ipsa itaque distinctio nobis, pariatur
                  expedita omnis officiis illum in. Veritatis, eligendi. Qui,
                  ratione.
                </p>
              </div>
              <div className="experience_section my-10">
                <div className="experience_heading flex gap-5 items-center">
                  <div className="icon bg-gray-300 p-2">
                    <FaGraduationCap />
                  </div>
                  <h2 className="text-xl font-bold uppercase">
                    Work Experience
                  </h2>
                </div>
                <div className="experience_1 my-5">
                  <div className="post flex  justify-between items-center my-2">
                    <div className="post_title">
                      <h3 className="font-bold">Senior Graphic Designer</h3>
                      <h4 className="font-semibold">Test Company</h4>
                    </div>
                    <div className="year font-bold">
                      <p>2010-2014</p>
                    </div>
                  </div>
                  <div className="key_points">
                    <p className="my-2">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem ipsum culpa rem voluptatem non laudantium, quae
                      voluptatum maxime natus inventore accusantium dolor
                      accusamus velit debitis, sit ipsa itaque distinctio nobis,
                      pariatur expedita omnis officiis illum in. Veritatis,
                      eligendi. Qui, ratione.
                    </p>
                  </div>
                </div>
                <div className="experience_2 my-5">
                  <div className="post flex  justify-between items-center my-2">
                    <div className="post_title">
                      <h3 className="font-bold">Senior Graphic Designer</h3>
                      <h4 className="font-semibold">Test Company</h4>
                    </div>
                    <div className="year font-bold">
                      <p>2010-2014</p>
                    </div>
                  </div>
                  <div className="key_points">
                    <p className="my-2">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem ipsum culpa rem voluptatem non laudantium, quae
                      voluptatum maxime natus inventore accusantium dolor
                      accusamus velit debitis, sit ipsa itaque distinctio nobis,
                      pariatur expedita omnis officiis illum in. Veritatis,
                      eligendi. Qui, ratione.
                    </p>
                  </div>
                </div>
              </div>
              <div className="project_section my-5">
                <div className="project_heading flex gap-5 items-center">
                  <div className="icon bg-gray-300 p-2">
                    <FaGraduationCap />
                  </div>
                  <h2 className="text-xl font-bold uppercase">Projects</h2>
                </div>
                <div className="projects1 my-3">
                  <div className="post flex  justify-between items-center my-2">
                    <div className="post_title">
                      <h3 className="font-bold">Senior Graphic Designer</h3>
                      <h4 className="font-semibold">Test Company</h4>
                    </div>
                    <div className="year font-bold">
                      <p>2010-2014</p>
                    </div>
                  </div>
                  <div className="key_points">
                    <p className="my-2">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem ipsum culpa rem voluptatem non laudantium, quae
                      voluptatum maxime natus inventore accusantium dolor.
                    </p>
                  </div>
                </div>
                <div className="projects1 my-2">
                  <div className="post flex  justify-between items-center my-2">
                    <div className="post_title">
                      <h3 className="font-bold">Senior Graphic Designer</h3>
                      <h4 className="font-semibold">Test Company</h4>
                    </div>
                    <div className="year font-bold">
                      <p>2010-2014</p>
                    </div>
                  </div>
                  <div className="key_points">
                    <p className="my-2">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem ipsum culpa rem voluptatem non laudantium, quae
                      voluptatum maxime natus inventore accusantium dolor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template3;
