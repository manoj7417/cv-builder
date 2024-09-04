/** @format */
"use client";
import { CoachHeader } from "@/components/component/CoachHeader";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./user.css";

const UserDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <>
      <div className='mt-20 bg-[#E0F2FF] h-40 w-full flex justify-center '></div>
      <div className='max-w-5xl mx-auto'>
        <div className='profile_header'>
          <CoachHeader />
        </div>
        <div className='tabs_section mt-10'>
          <Tabs className='w-full py-5' defaultValue='dashboard'>
            <TabsList className='mb-4 flex w-full justify-center flex-wrap h-auto'>
              <TabsTrigger
                value='dashboard'
                className={`tabs-trigger text-blue-950 rounded-md text-base ${
                  activeTab === "dashboard" ? "active" : ""
                } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("dashboard")}>
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value='coaching'
                className={`tabs-trigger text-blue-950 rounded-md text-base ${
                  activeTab === "coaching" ? "active" : ""
                } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("coaching")}>
                Coaching
              </TabsTrigger>
              <TabsTrigger
                value='whishlist'
                className={`tabs-trigger text-blue-950 rounded-md text-base ${
                  activeTab === "whishlist" ? "active" : ""
                } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("whishlist")}>
                Whishlist
              </TabsTrigger>
              <TabsTrigger
                value='purchaseHistory'
                className={`tabs-trigger text-blue-950 rounded-md text-base ${
                  activeTab === "purchaseHistory" ? "active" : ""
                } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("purchaseHistory")}>
                Purchase History
              </TabsTrigger>
              <TabsTrigger
                value='settings'
                className={`tabs-trigger text-blue-950 rounded-md text-base ${
                  activeTab === "settings" ? "active" : ""
                } data-[state=active]:shadow-none`}
                onClick={() => setActiveTab("settings")}>
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value='dashboard' className='mb-4'>
              <div className='actions_section max-w-full md:max-w-5xl mx-auto'>
                <div>
                  <h2 className='text-xl font-bold mb-6 text-blue-950'>
                    Dashboard
                  </h2>
                  <h2>This is a dashboard</h2>
                </div>
              </div>
            </TabsContent>
            <TabsContent className='mb-6' value='coaching'>
              <div className='career_section max-w-full md:max-w-5xl mx-auto'>
                <div className='space-y-3'>
                  <h2 className='text-xl font-bold text-blue-950 flex items-center gap-3'>
                    Coaching
                  </h2>
                  <h2>This is a coaching tabs</h2>
                </div>
              </div>
            </TabsContent>
            <TabsContent className='mb-6' value='whishlist'>
              <div className='max-w-full md:max-w-5xl mx-auto summary_section'>
                <div>
                  <h2 className='text-xl font-bold mb-6 text-blue-950'>
                    Whishlist
                  </h2>
                  <h2>This is a Whishlist</h2>
                </div>
              </div>
            </TabsContent>
            <TabsContent className='mb-6' value='purchaseHistory'>
              <div className='max-w-full md:max-w-5xl mx-auto summary_section'>
                <div>
                  <h2 className='text-xl font-bold mb-6 text-blue-950'>
                    Purchase History
                  </h2>
                  <h2>This is a purchaseHistory</h2>
                </div>
              </div>
            </TabsContent>
            <TabsContent className='mb-6' value='settings'>
              <div className='max-w-full md:max-w-5xl mx-auto summary_section'>
                <div>
                  <h2 className='text-xl font-bold mb-6 text-blue-950'>
                    Settings
                  </h2>
                  <h2>This is a settings</h2>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default UserDashboardPage;
