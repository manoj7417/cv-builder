"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { selectResume } from "@/app/lib/redux/resumeSlice";
import { MdChecklist, MdHistory } from 'react-icons/md';
import { RiFileEditLine, RiOpenaiFill } from 'react-icons/ri';
import { GrScorecard } from 'react-icons/gr';
import { IoDownloadOutline, IoShareSocialOutline } from 'react-icons/io5';
import { GiMagicLamp } from 'react-icons/gi';
import { LuLayoutList } from 'react-icons/lu';


interface SidebarProps {
  setActiveTab: (tab: string) => void;  // Function type defined
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab }) => {

  return (
    <aside className="fixed ms-6 ps-10 p-4 bg-white rounded-xl shadow-xl text-center">
      <div className="mb-4 flex items-center space-x-4 p-4">
      <GiMagicLamp className='h-12 w-12 text-indigo-500 ' />
        <h5 className="text-xl font-semibold ">Ginie Builder</h5>
      </div>
      <ul className="flex flex-col space-y-6 mb-8">
        <li>
          <button  className="flex items-center justify-between w-full" onClick={() => setActiveTab('Content')}>
            <span className="flex items-center space-x-2">
            <LuLayoutList className="h-6 w-6 text-indigo-500" />
              <span className="text-gray-900 text-lg ps-3 ">Content</span>
            </span>
            
          </button>
         
        </li>
        <li>
          <button className="flex items-center justify-between w-full" onClick={() => setActiveTab('Design')}>
            <span className="flex items-center space-x-2">
              <MdChecklist className="h-6 w-6 text-indigo-500" />
              <span className=" text-gray-900 text-lg ps-3 ">Design</span>
            </span>
          </button>
         
        </li>
        <li>
          <button className="flex items-center justify-between w-full" onClick={() => setActiveTab('ATS')}>
            <span className="flex items-center space-x-2">
              <GrScorecard className="h-6 w-6 text-indigo-500" />
              <span className=" text-gray-900 text-lg ps-3 ">Gap Analyser</span>
            </span>
          </button>
         
        </li>
        <li>
        <button className="flex items-center justify-between w-full" onClick={() => setActiveTab('AI')}>
          <span className="flex items-center space-x-2">
            <RiOpenaiFill className="h-6 w-6 text-indigo-500" onClick={() => setActiveTab('AI')}/>
            <span className=" text-gray-900 text-lg ps-3 ">Genie</span>
          </span>
        </button>
         
        </li>
        {/* <li>
          <div className="flex items-center space-x-2">
          <IoDownloadOutline className="h-6 w-6 text-indigo-500" />
            
            <a
        className="text-gray-900 text-lg ps-3 "
        href={instance.url!}
        download={resume.profile.name + " - Resume"}
      >Download</a>
          </div>
        </li> */}
        <li>
          <div className="flex items-center space-x-2">
            <MdHistory className="h-6 w-6 text-indigo-500" />
            <span className=" text-gray-900 text-lg ps-3 ">History</span>
          </div>
        </li>
        <li>
          <div className="flex items-center space-x-2">
          <IoShareSocialOutline className="h-6 w-6 text-indigo-500" />
            <span className=" text-gray-900 text-lg ps-3 ">Share</span>
          </div>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
