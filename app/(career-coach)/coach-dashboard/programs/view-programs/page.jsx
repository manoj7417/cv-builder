"use client";
import { GetTokens } from "@/app/actions";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewProgramsPage = () => {
  const [viewPrograms, setViewPrograms] = useState([]);


//   const coachProgramBooking = [
//     {
//       "_id": { "$oid": "67176cc172c1d833b8e30514" },
//       "coachId": { "$oid": "670a872c4d51e9e8b40dbc4d" },
//       "title": "Confidence - The 3-month Package",
//       "description": "Together, we will explore your goals, values, and aspirations in a safe, nurturing and empowering environment. + End results: Clarity - Self-discovery - Direction - Motivation + Format: 6 x 60-minute calls + Validity: 3 months + Support: Email support + Bonus: Pre-coaching questionnaire, exercises in between calls, comprehensive session notes. A FREE 30-minute discovery call is included.",
//       "prerequisites": [
//         {
//           "type": "questionnaire",
//           "description": "Pre-coaching questionnaire",
//           "attachmentUrl": "https://example.com/questionnaire.pdf",
//           "_id": { "$oid": "67176cc172c1d833b8e30515" }
//         }
//       ],
//       "days": [
//         {
//           "timeToComplete": 60,
//           "title": "Self-Discovery & Goal Setting",
//           "description": "Explore your goals and clarify core values.",
//           "prerequisites": [],
//           "subModules": [
//             {
//               "title": "Introduction and Goal Clarification",
//               "description": "Clarify your primary goals for the coaching sessions.",
//               "timeToComplete": 30,
//               "_id": { "$oid": "67176cc172c1d833b8e30517" }
//             },
//             {
//               "title": "Core Values Exploration",
//               "description": "Understand your core values and how they influence your decisions.",
//               "timeToComplete": 30,
//               "_id": { "$oid": "67176cc172c1d833b8e30518" }
//             }
//           ],
//           "_id": { "$oid": "67176cc172c1d833b8e30516" }
//         },
//         {
//           "timeToComplete": 60,
//           "title": "Overcoming Self-Doubt",
//           "description": "Identifying and overcoming self-doubt triggers.",
//           "prerequisites": [
//             {
//               "type": "assignment",
//               "description": "List at least 5 personal achievements.",
//               "attachmentUrl": "https://example.com/assignment1.pdf",
//               "_id": { "$oid": "67176cc172c1d833b8e3051a" }
//             }
//           ],
//           "subModules": [
//             {
//               "title": "Identifying Self-Doubt Triggers",
//               "description": "Explore triggers for self-doubt and limiting beliefs.",
//               "timeToComplete": 30,
//               "_id": { "$oid": "67176cc172c1d833b8e3051b" }
//             },
//             {
//               "title": "Techniques to Overcome Limiting Beliefs",
//               "description": "Practical exercises to combat limiting beliefs.",
//               "timeToComplete": 30,
//               "_id": { "$oid": "67176cc172c1d833b8e3051c" }
//             }
//           ],
//           "_id": { "$oid": "67176cc172c1d833b8e30519" }
//         }
//       ],
//       "programImage": "https://geniescareerhubbucket.lon1.cdn.digitaloceanspaces.com/close-up-business-people-discussing-table_1048944-28807629-transformed.jpeg",
//       "programVideo": "https://example.com/confidence-video.mp4",
//       "isapproved": true,
//       "amount": 1200,
//       "createdAt": { "$date": "2024-10-22T09:13:37.556Z" },
//       "updatedAt": { "$date": "2024-10-22T09:13:37.556Z" }
//     },
//     {
//       "_id": { "$oid": "67176cc172c1d833b8e30524" },
//       "coachId": { "$oid": "670a872c4d51e9e8b40dbc4d" },
//       "title": "Leadership Development Program",
//       "description": "A 6-week intensive course to develop key leadership skills for aspiring managers and team leads. + Format: 6 x 60-minute coaching sessions + Support: Ongoing email support + Bonus: Access to leadership templates and tools.",
//       "prerequisites": [
//         {
//           "type": "questionnaire",
//           "description": "Leadership self-assessment",
//           "attachmentUrl": "https://example.com/self-assessment.pdf",
//           "_id": { "$oid": "67176cc172c1d833b8e30525" }
//         }
//       ],
//       "days": [
//         {
//           "timeToComplete": 60,
//           "title": "Building Leadership Foundations",
//           "description": "Understanding leadership principles and your role as a leader.",
//           "subModules": [
//             {
//               "title": "Introduction to Leadership",
//               "description": "Explore various leadership styles.",
//               "timeToComplete": 30,
//               "_id": { "$oid": "67176cc172c1d833b8e30526" }
//             },
//             {
//               "title": "Self-Reflection on Leadership",
//               "description": "Reflect on your own leadership style.",
//               "timeToComplete": 30,
//               "_id": { "$oid": "67176cc172c1d833b8e30527" }
//             }
//           ],
//           "_id": { "$oid": "67176cc172c1d833b8e30523" }
//         }
//       ],
//       "programImage": "https://example.com/leadership-program-image.jpeg",
//       "programVideo": "https://example.com/leadership-video.mp4",
//       "isapproved": true,
//       "amount": 1000,
//       "createdAt": { "$date": "2024-09-10T09:13:37.556Z" },
//       "updatedAt": { "$date": "2024-09-10T09:13:37.556Z" }
//     },
//     {
//       "_id": { "$oid": "67176cc172c1d833b8e30528" },
//       "coachId": { "$oid": "670a872c4d51e9e8b40dbc4d" },
//       "title": "Mindfulness Coaching",
//       "description": "A 4-week mindfulness coaching program to help you become more present and reduce stress. + Format: 4 x 45-minute sessions + Support: Email and text message support + Bonus: Daily mindfulness exercises.",
//       "prerequisites": [],
//       "days": [
//         {
//           "timeToComplete": 45,
//           "title": "Introduction to Mindfulness",
//           "description": "Learn the basics of mindfulness and how it can help you.",
//           "subModules": [
//             {
//               "title": "Understanding Mindfulness",
//               "description": "What mindfulness is and why it matters.",
//               "timeToComplete": 20,
//               "_id": { "$oid": "67176cc172c1d833b8e30529" }
//             },
//             {
//               "title": "Practicing Mindfulness",
//               "description": "Simple mindfulness exercises you can start today.",
//               "timeToComplete": 25,
//               "_id": { "$oid": "67176cc172c1d833b8e3052a" }
//             }
//           ],
//           "_id": { "$oid": "67176cc172c1d833b8e3052b" }
//         }
//       ],
//       "programImage": "https://example.com/mindfulness-program-image.jpeg",
//       "programVideo": "https://example.com/mindfulness-video.mp4",
//       "isapproved": true,
//       "amount": 800,
//       "createdAt": { "$date": "2024-08-15T09:13:37.556Z" },
//       "updatedAt": { "$date": "2024-08-15T09:13:37.556Z" }
//     },
//     {
//       "_id": { "$oid": "67176cc172c1d833b8e3052c" },
//       "coachId": { "$oid": "670a872c4d51e9e8b40dbc4d" },
//       "title": "Career Transition Coaching",
//       "description": "Designed for professionals looking to change careers. This 12-week program helps you make informed decisions and plan your transition effectively. + Format: 12 x 60-minute sessions + Support: Comprehensive career assessments.",
//       "prerequisites": [],
//       "days": [
//         {
//           "timeToComplete": 60,
//           "title": "Career Assessment and Planning",
//           "description": "Evaluate your current career path and plan your next steps.",
//           "subModules": [
//             {
//               "title": "Career Assessment",
//               "description": "Analyze your strengths and areas of interest.",
//               "timeToComplete": 30,
//               "_id": { "$oid": "67176cc172c1d833b8e3052d" }
//             },
//             {
//               "title": "Planning Next Steps",
//               "description": "Set actionable goals for your career transition.",
//               "timeToComplete": 30,
//               "_id": { "$oid": "67176cc172c1d833b8e3052e" }
//             }
//           ],
//           "_id": { "$oid": "67176cc172c1d833b8e3052f" }
//         }
//       ],
//       "programImage": "https://example.com/career-transition-image.jpeg",
//       "programVideo": "https://example.com/career-transition-video.mp4",
//       "isapproved": true,
//       "amount": 1500,
//       "createdAt": { "$date": "2024-07-20T09:13:37.556Z" },
//       "updatedAt": { "$date": "2024-07-20T09:13:37.556Z" }
//     },
//     {
//       "_id": { "$oid": "67176cc172c1d833b8e30530" },
//       "coachId": { "$oid": "670a872c4d51e9e8b40dbc4d" },
//       "title": "Emotional Intelligence Coaching",
//       "description": "A 6-week program focused on building emotional intelligence and improving interpersonal relationships. + Format: 6 x 60-minute coaching calls + Support: Weekly emotional intelligence exercises + Bonus: Free e-book on emotional intelligence.",
//       "prerequisites": [
//         {
//           "type": "questionnaire",
//           "description": "Emotional intelligence self-assessment",
//           "attachmentUrl": "https://example.com/ei-assessment.pdf",
//           "_id": { "$oid": "67176cc172c1d833b8e30531" }
//         }
//       ],
//       "days": [
//         {
//           "timeToComplete": 60,
//           "title": "Understanding Emotional Intelligence",
//           "description": "Explore the components of emotional intelligence.",
//           "subModules": [
//             {
//               "title": "Self-Awareness",
//               "description": "Learn about self-awareness and its impact.",
//               "timeToComplete": 30,
//               "_id": { "$oid": "67176cc172c1d833b8e30532" }
//             },
//             {
//               "title": "Emotional Regulation",
//               "description": "Techniques to manage emotions effectively.",
//               "timeToComplete": 30,
//               "_id": { "$oid": "67176cc172c1d833b8e30533" }
//             }
//           ],
//           "_id": { "$oid": "67176cc172c1d833b8e30534" }
//         }
//       ],
//       "programImage": "https://example.com/emotional-intelligence-image.jpeg",
//       "programVideo": "https://example.com/emotional-intelligence-video.mp4",
//       "isapproved": true,
//       "amount": 1100,
//       "createdAt": { "$date": "2024-06-25T09:13:37.556Z" },
//       "updatedAt": { "$date": "2024-06-25T09:13:37.556Z" }
//     }
//   ]
  

  const handleCoachProgramBookings = async () => {
    const { accessToken } = await GetTokens(true);
    try {
      const response = await axios.get("/api/getCoachProgramBooking", {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        setViewPrograms(response.data.bookings);
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleCoachProgramBookings();
  }, []);


  return (
    <div>
        <div className="main_title max-w-7xl mx-auto my-20">
         <h2 className="text-3xl font-bold">View Bookings Program</h2>
        </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl">
          {/* Card 1 */}
          <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 w-80">
            {/* Image */}
            <figure>
              <img
                src="https://picsum.photos/id/101/800/600"
                alt="card image"
                className="aspect-video w-full"
              />
            </figure>
            {/* Body */}
            <div className="p-6">
              <header className="mb-4">
                <h3 className="text-xl font-medium text-slate-700">
                  The easy way to go
                </h3>
                <p className="text-sm text-slate-400"> By George, Jun 3 2023</p>
              </header>
              <p>
                Experience the simple pleasures of a world with no cars, and
                only gentle walks through palm tree forests, and fallen
                coconuts.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 w-80">
            {/* Image */}
            <figure>
              <img
                src="https://picsum.photos/id/102/800/600"
                alt="card image"
                className="aspect-video w-full"
              />
            </figure>
            {/* Body */}
            <div className="p-6">
              <header className="mb-4">
                <h3 className="text-xl font-medium text-slate-700">
                  Adventures Await
                </h3>
                <p className="text-sm text-slate-400"> By Sarah, Jul 10 2023</p>
              </header>
              <p>
                Explore the untouched wilderness, with towering mountains,
                pristine rivers, and uncharted trails that lead to breathtaking
                vistas.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 w-80">
            {/* Image */}
            <figure>
              <img
                src="https://picsum.photos/id/103/800/600"
                alt="card image"
                className="aspect-video w-full"
              />
            </figure>
            {/* Body */}
            <div className="p-6">
              <header className="mb-4">
                <h3 className="text-xl font-medium text-slate-700">
                  The Beauty of Nature
                </h3>
                <p className="text-sm text-slate-400"> By John, Aug 5 2023</p>
              </header>
              <p>
                Embrace the beauty of nature, where every corner reveals a new
                wonder of the world, filled with flora and fauna in their purest
                form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProgramsPage;
