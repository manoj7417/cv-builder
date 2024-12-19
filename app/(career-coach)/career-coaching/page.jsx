"use client";
import AccordionItem from "@/components/component/AccordionItem";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import NewMultiForm from "./NewMultiForm";
import CoachServiceSlider from "@/components/component/CoachServiceSlider";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import CoachWorksSlider from "@/components/component/CoachWorksSlider";

const faqData = [
  {
    id: 1,
    ques: "When it comes to reaching your fullest potential, settling for anything less than the best is not an option.",
    ans: "answers will be here",
  },
  {
    id: 2,
    ques: "When it comes to reaching your fullest potential, settling for anything less than the best is not an option.",
    ans: "answers will be here",
  },
  {
    id: 3,
    ques: "When it comes to reaching your fullest potential, settling for anything less than the best is not an option.",
    ans: "answers will be here",
  },
];

const topServices = [
  {
    id: 1,
    image: "/cv reviews.png",
    title: "CV Reviews",
    description:
      "Get help formulating the best job application by reviewing your resume for perfection!",
  },
  {
    id: 2,
    image: "/quick connect.png",
    title: "Quick Connect",
    description:
      "Need a quick response to your immediate questions? Connect with us and find your solutions.",
  },
  {
    id: 3,
    image: "/job search.png",
    title: "Job Search",
    description:
      "Do you need help finding your profile's most suitable job description and opportunities? We will help you!",
  },
  {
    id: 4,
    image: "/cv reviews.png",
    title: "CV Reviews",
    description:
      "Get help formulating the best job application by reviewing your resume for perfection!",
  },
  {
    id: 5,
    image: "/quick connect.png",
    title: "Quick Connect",
    description:
      "Need a quick response to your immediate questions? Connect with us and find your solutions.",
  },
  {
    id: 6,
    image: "/job search.png",
    title: "Job Search",
    description:
      "Do you need help finding your profile's most suitable job description and opportunities? We will help you!",
  },
];

const additionalServices = [
  {
    id: 1,
    image: "/Networking Strategy.png",
    title: "Networking Strategy",
    description:
      "Develop an understanding of building and utilising your professional networks in order to advance your career.",
  },
  {
    id: 2,
    image: "/newCoach12.png",
    title: "Cover Letter Writing",
    description:
      "Need more than a CV? Top recruiters and job application experts inspire you to create your cover letters!",
  },
  {
    id: 3,
    image: "/interview coaching.png",
    title: "Interview Coaching",
    description:
      "From introduction to intricate questions, prepare for the ultimate stage between you and your dream job.",
  },
  {
    id: 4,
    image: "/Leadership Coaching.png",
    title: "Leadership Coaching",
    description:
      "Lead your professional squad with more conviction and confidence by developing and honing your skills.",
  },
  {
    id: 5,
    image: "/career pathing.png",
    title: "Career Pathing",
    description:
      "Chart your career path with top experts and build your professional goals around your interests and skills.",
  },
  {
    id: 6,
    image: "/sliderImage.png",
    title: "Personal Branding",
    description:
      "Set yourself apart from the competition of job seekers by developing a strong personality and image.",
  },
  {
    id: 7,
    image: "/Work-Life Balance Coaching.png",
    title: "Work-Life Balance Coaching",
    description:
      "Move on from the work-life juggle and learn how to build a healthy balance between your personal and professional life.",
  },
  {
    id: 8,
    image: "/Salary Negotiation.png",
    title: "Salary Negotiation",
    description:
      "Learn strategising and negotiating for fair compensation and competitive salaries from the best Career Coaches.",
  },
  {
    id: 9,
    image: "/Career Transition Coaching.png",
    title: "Career Transition Coaching",
    description:
      "Do you wish to transition between your present job or an entire career? With structured guidance, you can avoid stress and confusion.",
  },
  {
    id: 10,
    image: "/remote work coaching.png",
    title: "Remote Work Coaching ",
    description:
      "Transition smoothly into work-from-home settings with a career coach without compromising your productivity.",
  },
  {
    id: 11,
    image: "/DEI Coaching.png",
    title: "DEI Coaching ",
    description:
      "Learn how to lead and develop a Diverse, Equitable, and Inclusive workplace environment for cultural competence.",
  },
  {
    id: 12,
    image: "/Resolution and Negotiation.png",
    title: "Conflict Resolution and Negotiation",
    description:
      "Resolve and negotiate workplace conflicts effortlessly and efficiently by training in conflict resolution strategies.",
  },
  // {
  //   id: 13,
  //   image: "/Time Management and Productivity.png",
  //   title: "Time Management and Productivity",
  //   description:
  //     "Make the best of your working hours and improve your professional performance with effective time management.",
  // },
];

// const workServicesData = [
//   {
//     id: 1,
//     image: "/professional development.png",
//     title: "Professional Development",
//     description:
//       "Get your help in Skill Enhancement, Self Awareness, and Continuous Learning to advance your professional development journey.Career Coaches can help you identify your aptitude and acumen and provide the best strategies to enhance them for maximum benefit. They can also help you gain profound insight into your strengths, weaknesses, and values. You shall develop self-awareness which will inspire independent professional thinking. The constant support will motivate you to learn and understand your personal growth path.",
//   },
//   {
//     id: 2,
//     image: "/career growth.png",
//     title: "Career Growth",
//     description:
//       "Setting a career goal, creating a growth mindset, and building a strong path can be challenging. Career coaches can ease this process efficiently with their experience and expertise. They can assist you in Goal Setting, Career Pathing, and Job Search Strategies to ensure maximum Career Growth.They can help you prepare actionable career plans to fix your professional mindset on ambitious, achievable goals. Based on these aspirations, career coaches will help you develop a path that allows the delivery of goals. To enhance your career further, you can also build job acquisition strategies.",
//   },
//   {
//     id: 3,
//     image: "/workplace contentment.png",
//     title: "Workplace Contentment",
//     description:
//       "With Career Coaches, achieving the ultimate Work-Life balance, Conflict Resolution Management, and Job Satisfaction is never a challenge. You can get help with impactful strategies and communication to achieve maximised professional success.Career coaches can ease your professional processes by helping with stress management, setting workplace priorities, teaching effective communication, and developing problem-solving skills. They can also assist with identifying passion and aligning career priorities with your values and cognition. Guidance can ease your pathway and help you achieve job satisfaction.",
//   },
// ];



const workServicesData = [
  {
    id: 1,
    image: "/professional development.png",
    title: "Professional Development",
    description:
      "Career Coaches can help you identify your strengths, weaknesses, and values to develop self-awareness for independent professional thinking. The constant support will motivate you to learn and understand your growth path.",
  },
  {
    id: 2,
    image: "/career growth.png",
    title: "Career Growth",
    description:
      "Setting a career goal, creating a growth mindset, and building a strong path can be challenging. Career coaches can ease this process efficiently. They can assist you with relative strategies to ensure maximum Career Growth.",
  },
  {
    id: 3,
    image: "/workplace contentment.png",
    title: "Workplace Contentment",
    description:
      "Ease your professional process with stress management, setting workplace priorities, learning effective communication, and developing problem-solving skills. Our guidance can help you achieve job satisfaction.",
  },
   {
    id: 4,
    image: "/professional development.png",
    title: "Professional Development",
    description:
      "Career Coaches can help you identify your strengths, weaknesses, and values to develop self-awareness for independent professional thinking. The constant support will motivate you to learn and understand your growth path.",
  },
  {
    id: 5,
    image: "/career growth.png",
    title: "Career Growth",
    description:
      "Setting a career goal, creating a growth mindset, and building a strong path can be challenging. Career coaches can ease this process efficiently. They can assist you with relative strategies to ensure maximum Career Growth.",
  },
  {
    id: 6,
    image: "/workplace contentment.png",
    title: "Workplace Contentment",
    description:
      "Ease your professional process with stress management, setting workplace priorities, learning effective communication, and developing problem-solving skills. Our guidance can help you achieve job satisfaction.",
  },
];




const CoachNewPage = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [findCoachPopUp, setFindCoachPopup] = useState(false);

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };


   const additionalServicesRef = useRef(null);

   const scrollToAdditionalServices = () => {
     additionalServicesRef.current?.scrollIntoView({
       behavior: 'smooth',
       block: 'start',
     });
   };


  return (
    <div>
      <section className="w-full min-h-screen sm:top-0 p-4 pt-28 sm:p-18 bg-gray-100 text-black flex items-center">
        <div className="flex flex-col items-center justify-between gap-0 sm:gap-8 w-full mx-auto py-10">
          <div className="flex flex-col xs:flex-row items-center max-w-6xl 2xl:mt-10 lg:mt-5">
            <div className="text-start">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] 2xl:text-8xl font-extrabold mb-4 sm:mb-6 xs:text-start text-center">
                Millions of Career Paths,
                <br />
                <span className="text-blue-700">One Right Approach</span>
              </h1>
              <Image
                priority
                src="/new_coach.gif"
                alt="newCoach"
                height={100}
                width={100}
                className="w-[500px] h-[500px] mx-auto object-contain"
              />
              <div className="flex lg:flex-row flex-col text-center justify-center xs:justify-start mt-5 gap-5">
                <button
                  className="bg-blue-950 text-white py-3 px-8 rounded border-2 border-transparent transition duration-300 hover:bg-blue-700 hover:border-blue-500"
                  onClick={() => setFindCoachPopup(true)}
                >
                  Find Your Coach
                </button>
                <Link
                href={"/coach-registration"}
                  className="bg-blue-950 text-white py-3 px-8 rounded border-2 border-transparent transition duration-300 hover:bg-blue-700 hover:border-blue-500"
                >
                  Register as a Coach
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="hows_it_work py-20">
        <div className="main_heading text-center">
          <h2 className="text-5xl text-center text-bold font-semibold my-5">
            How it <span className="text-blue-700">works?</span>
          </h2>
          <p className="max-w-3xl mx-auto text-base my-4">
          Our community of experienced career coaches, specialising in an extended horizon of career domains, is here to help you. We host coaches from across the globe who come together on this platform. They aim to assist you with your career puzzles and help you grow in your career path. All you need to do is identify your exact set of struggles and find the most suitable coach on this platform. 
          </p>
        </div>
        <div className="flex flex-wrap justify-between items-stretch gap-5 max-w-7xl mx-auto mt-5">
          <div className="step1 text-center lg:w-[20%] w-full bg-gray-50 p-5 rounded-md">
            <h2 className="text-3xl font-bold">Step 1</h2>
            <p className="text-sm my-2">
              Register on the Genies Career Hub platform by signing up and
              exploring the range of career services we offer.
            </p>
          </div>

          {/* Arrow between Step 1 and Step 2 */}
          <div className="hidden lg:flex items-center justify-center">
            <FaArrowRight className="text-blue-800 text-3xl animate-bounce" />
          </div>

          <div className="step2 text-center lg:w-[20%] w-full bg-gray-50 p-5 rounded-md">
            <h2 className="text-3xl font-bold">Step 2</h2>
            <p className="text-sm my-2">
              Identify your career conundrums and accordingly find the
              best-suited Coach who can help you navigate through them.
            </p>
          </div>

          {/* Arrow between Step 1 and Step 2 */}
          <div className="hidden lg:flex items-center justify-center">
            <FaArrowRight className="text-blue-800 text-3xl animate-bounce" />
          </div>

          <div className="step3 text-center lg:w-[20%] w-full bg-gray-50 p-5 rounded-md">
            <h2 className="text-3xl font-bold">Step 3</h2>
            <p className="text-sm my-2">
              Book an appointment with your preferred Coach and check out their
              courses to get enrolled in the most beneficial curriculum.
            </p>
          </div>

          {/* Arrow between Step 3 and Step 4 */}
          <div className="hidden lg:flex items-center justify-center">
            <FaArrowRight className="text-blue-800 text-3xl animate-bounce" />
          </div>

          <div className="step4 text-center lg:w-[20%] w-full bg-gray-50 p-5 rounded-md">
            <h2 className="text-3xl font-bold">Step 4</h2>
            <p className="text-sm my-2">
              Connect with your Coach as per your coaching appointment schedule and
              find the answers to all your questions.
            </p>
          </div>
        </div>
      </section>
      <NewMultiForm
        setFindCoachPopup={setFindCoachPopup}
        findCoachPopUp={findCoachPopUp}
      />
      <div className="top_services bg-gray-100 lg:p-10 p-5">
        <div className="flex lg:flex-row flex-col max-w-7xl mx-auto items-center">
          <div className="lg:w-[30%] w-full px-2">
            <h2 className="text-3xl font-bold">Our Top Services</h2>
            <p className="text-sm my-4">
              Career Coaching is more than just understanding what job role or
              career path you can pursue. Coaches can also help you grow within
              an organisation or do better in your academics. They can help you
              boost your present career profile or improve your job application.
              Check out our diverse selection of Coaching Services.
            </p>
            <Button onClick={scrollToAdditionalServices}>Explore More</Button>
          </div>
          <div className="lg:w-[70%] w-full">
            <CoachServiceSlider data={topServices} slidesPerView={2.5} setFindCoachPopup={setFindCoachPopup}/>
          </div>
        </div>
      </div>
      <div className="additional_services lg:p-10 p-5"  ref={additionalServicesRef} >
        <div className="max-w-7xl mx-auto ">
          <div className="max-w-5xl mx-auto text-center py-10 px-2">
            <h2 className="text-3xl font-bold">Additional Coaching Services</h2>
            <p className="text-sm my-4 w-[60%] mx-auto">
              When it comes to reaching your fullest potential, settling for
              anything less than the best is not an option. Our expert coaches
              are here to guide you with proven strategies, personalized
              insights, and a passion for helping you succeed.
            </p>
          </div>
          <div className="w-full h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {additionalServices.map((card) => (
                <div
                  key={card.id}
                  className="overflow-hidden rounded-lg bg-white text-gray-600 shadow-md shadow-gray-200 min-w-[300px] min-h-[200px] cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
                  onClick={()=>setFindCoachPopup(true)}
                >
                  <figure>
                    <img
                      src={card.image}
                      alt={`${card.title} image`}
                      className="w-[400px] h-[200px] object-cover"
                    />
                  </figure>
                  <div className="p-6">
                    <header className="mb-4 flex gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {card.title}
                        </h3>
                      </div>
                    </header>
                    <p className="text-sm">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="how_it_work bg-gray-100 lg:p-10 p-5">
        <div className="flex lg:flex-row flex-col max-w-7xl mx-auto items-center">
          <div className="lg:w-[30%] w-full py-5 px-2">
            <h2 className="text-3xl font-bold">
              How can Career Coaching help you?{" "}
            </h2>
            <p className="text-sm my-4">
              Career coaching can inspire your career path and improve your
              professional results. But what benefits can be observed as part of
              the bigger picture? The advantages of having constant guidance and
              the consistent presence of a Career Coach need to be realised. Get
              coached to unlock opportunities and improvements that can make the
              most significant difference in your career.
            </p>
          </div>
          <div className="lg:w-[70%] w-full">
            <CoachWorksSlider data={workServicesData} slidesPerView={2.5} setFindCoachPopup={setFindCoachPopup}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachNewPage;
