"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import HomepageNew from "./components/HomepageNew";
import LoaderUI from "./ui/LoaderUI";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useUserStore } from "./store/UserStore";
import { ResumeHeader } from "./Layout/ResumeHeader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { userState, loginUser, logoutUser } = useUserStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Head>
        {/* <meta
          name="google-site-verification"
          content="61LbG4ASq8urm_ZEHIr2jlNt13kGnN8n921g2EJF5po"
        /> */}

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Organization",
              url: "https://www.geniescareerhub.com/",
              logo: "https://geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
              name: "geniescareerhub.com",
              description:
                "Genies Career Hub creates your resume in an easy-going process. We provide more than 23+ professional approved ATS-friendly resume templates and features like CV Creator, CV Optimiser, and CV Match.",
            }),
          }}
        />

        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "CV Template",
                  item: "https://www.geniescareerhub.com/resume",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Resume Formatting",
                  item: "https://www.geniescareerhub.com/resume-analyzer",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "CV Creators",
                  item: "https://www.geniescareerhub.com/job-cv",
                },
              ],
            }),
          }}
        />

        {/* HowTo Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "HowTo",
              name: "build your resume quickly with CV Builder?",
              description:
                "To create your resume using a curriculum vitae builder and a CV enhancer, you can use the AI-integrated Genies Career Hub's CV Creator.",
              image:
                "https://geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
              tool: { "@type": "HowToTool", name: "CV Builder" },
              step: [
                {
                  "@type": "HowToStep",
                  text: "Open the Curriculum Vitae Builder and check out the variety of CV template options.",
                  image: "https://www.geniescareerhub.com/resume21.png",
                },
                {
                  "@type": "HowToStep",
                  text: "Select the best curriculum vitae format and start creating your CV with the help of AI.",
                  image: "https://www.geniescareerhub.com/resume22.png",
                },
                {
                  "@type": "HowToStep",
                  text: "Mention all the essential information in CV format and finalize the content of the CV with AI.",
                },
                {
                  "@type": "HowToStep",
                  text: "Review your finalized CV created using the CV Builder.",
                },
                {
                  "@type": "HowToStep",
                  text: "Download the created CV in PDF format.",
                },
              ],
            }),
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
           (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KJ9G6JTK')
          `,
          }}
        />
        <noscript>
          {/* <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5DKF3T7J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe> */}
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KJ9G6JTK"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>
        </noscript>
      </Head>

      <main>
        <>
          <ResumeHeader />
          <HomepageNew />
          <Footer />
        </>
      </main>
    </>
  );
}
