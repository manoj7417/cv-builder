'use client';
import React, { useState } from "react";

import Header from "./Header";
import CoachBlog from "./CoachBlog";


const CoachDashboardPage = () => {


  return (
    <>
      <div id="mainDiv">
          {/* START-HEADER */}
          <Header/>
          {/* END-HEADER */}
        <div id="sidebarCoach">
        
        </div>
        <div id="coachDashboard">
           <CoachBlog/>
        </div>
      </div>
    </>
  );
};

export default CoachDashboardPage;
