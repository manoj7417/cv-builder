"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useContext } from "react";
import HomepageNew from "./components/HomepageNew";
import LoaderUI from "./ui/LoaderUI";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useUserStore } from "./store/UserStore";
import { ResumeHeader } from "./Layout/ResumeHeader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { userState, loginUser, logoutUser } = useUserStore();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  // Conditionally render content only on the client
  if (!isClient) {
    return null; // Avoid rendering anything until client-side
  }

  return (
    <>
      <head>
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
              tool: {
                "@type": "HowToTool",
                name: "CV Builder",
              },
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

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is a Curriculum Vitae Builder?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A tool specifically built to create CVs and Resumes using <a href='https://www.geniescareerhub.com/resume'><strong>CV template</strong></a> format and designs is termed a <a href='https://www.geniescareerhub.com/resume'><strong>Curriculum Vitae Builder</strong></a>.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How can an ATS CV Checker help me?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "An ATS CV Checker helps determine if your resume follows <strong>ats friendly resume format</strong>. CV Optimiser by Genies Career Hub also analyses clarity, relevance, and content.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is CV Match tool?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "An innovative algorithm that helps match your job profile with the best resumes pre-written by <a href='https://www.geniescareerhub.com/job-cv'><strong>resume coach</strong></a> professionals.",
                  },
                },
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-16573743263/_wngCMO46roZEJ-B_d49',
      'transaction_id': '',
      'event_callback': callback
  });
  return false;
}
            `,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J1X213CSR4"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-J1X213CSR4');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
           (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5DKF3T7J');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-16573743263');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
               window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-3864YFJZRV');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:5154594,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: ` !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '452806670914263');
          fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=452806670914263&ev=PageView&noscript=1"
          />
        </noscript>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5DKF3T7J"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>
        </noscript>
      </head>
      <main>
        {isLoading ? (
          <LoaderUI />
        ) : (
          <>
            <ResumeHeader />
            <HomepageNew />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
