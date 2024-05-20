import React from "react";

export const Template2 = () => {
  return (
    <>
      <div className="bg-gray-500 w-[219mm] h-[297mm] mx-auto">
        <div className=" bg-black mx-auto px-4 py-8 flex justify-between md:flex-no-wrap flex-wrap">
          <div className="md:w-1/3 w-full px-5">
            <header>
              <img
                src="https://i.ibb.co/fDB3tPT/Group-1.png"
                alt="Profile"
                className="ml-8 w-40 h-40"
              />
              <h2 className="text-xl text-white text-center mt-4">Rakesh Sharma</h2>
            </header>
            <section className="mt-5">
              <h3 className="uppercase text-white text-xl font-medium">
                Career Objectives
              </h3>
              <div className="h-1 bg-green w-48 my-4"></div>
              <p className="text-white text-base">
                I am a motivated team player and aspiring web developer with
                great design and branding knowledge. My ultimate goal is to grow
                my knowledge of the industry and use my conversational skills to
                help fast-paced startup design UI/UX charismas.
              </p>
            </section>
            <section className="mt-5">
              <h3 className="uppercase text-white font-medium text-xl">
                Specializations
              </h3>
              <div className="h-1 bg-green w-48 my-4"></div>
              <ul className="text-white list-disc list-inside">
                <li>Front End Design (HTML, CSS, Figma)</li>
                <li>
                  <a href="https://tailwindcss.com" className="hover:underline">
                    TailwindCSS (♥)
                  </a>
                </li>
                <li>
                  Javascript ES6/*7 (Data Modelling, Debugging, Async
                  Performance)
                </li>
                <li>Front End Development (Vue.js, React.js, Svelte)</li>
                <li>User Interface/User Experience</li>
                <li>Design Thinking &amp; Problem Solving </li>
                <li>
                  Can develop high-performant front-end interfaces which
                  interacts with backend API
                </li>
              </ul>
            </section>
            <section className="mt-5">
              <h3 className="uppercase text-white font-medium text-xl">
                Contact Info:
              </h3>
              <div className="h-1 bg-green w-48 my-4"></div>
              <div className="text-white">
                <a
                  href="https://linkedin.com/in/justaashir"
                  className="hover:underline flex items-center"
                >
                  <ion-icon name="logo-linkedin" className="mr-2" />
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com/justaashir"
                  className="hover:underline flex items-center mt-1"
                >
                  <ion-icon name="logo-twitter" className="mr-2" /> Twitter
                </a>
                <a
                  href="mailto:hello@justaashir.com"
                  className="hover:underline flex items-center mt-1"
                >
                  <ion-icon name="mail" className="mr-2" /> hello@justaashir.com
                </a>
                <a
                  href="https://justaashir.com"
                  className="hover:underline flex items-center mt-1"
                >
                  <ion-icon name="globe" className="mr-2" /> www.justaashir.com
                </a>
              </div>
            </section>
          </div>
          <div className="md:w-3/5 w-full px-5">
            <section className="mt-16 md:mt-0">
              <h3 className="uppercase text-white font-medium text-2xl">
                Work Summary
              </h3>
              <div className="h-1 bg-green w-48 my-4"></div>
              <div className="mt-8">
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
              </div>
              <section className="mt-5">
                <h3 className="uppercase text-white font-medium text-2xl">
                  Projects
                </h3>
                <div className="h-1 bg-green w-48 my-4"></div>
                <div className="mt-5">
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
                </div>
              </section>
              <section className="mt-5">
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
              </section>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template2;
