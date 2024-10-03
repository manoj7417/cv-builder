import React from "react";
import { ResumeHeader } from "../Layout/ResumeHeader";
import Footer from "../Layout/Footer";

// export const metadata = {
//   title: "Professional Curriculum Vitate Match and Resume Coach",
//   description:
//     " Get a professional Curriculum Vitae in minutes with Genies Career Hub CV Match: intelligent CV alignment algorithm inspired by expert resume coach guidelines",
//     alternates: {
//       canonical: "https://www.geniescareerhub.com/job-cv",
//     },
// };
const Layout = ({ children }) => {
  return (
    <>
      <head>
        <title>Professional Curriculum Vitate Match and Resume Coach</title>
        <meta
          name="description"
          content="Get a professional Curriculum Vitae in minutes with Genies Career Hub CV Match: intelligent CV alignment algorithm inspired by expert resume coach guidelines"
        />
        <link rel="canonical" href="https://www.geniescareerhub.com/job-cv" />
        <meta
          property="og:url"
          content="https://www.geniescareerhub.com/job-cv"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Professional Curriculum Vitate Match and Resume Coach"
        />
        <meta
          property="og:description"
          content="Get a professional Curriculum Vitae in minutes with Genies Career Hub CV Match: intelligent CV alignment algorithm inspired by expert resume coach guidelines"
        />
        <meta
          property="og:image"
          content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="geniescareerhub.com" />
        <meta
          property="twitter:url"
          content="https://www.geniescareerhub.com/job-cv"
        />
        <meta
          name="twitter:title"
          content="Professional Curriculum Vitate Match and Resume Coach"
        />
        <meta
          name="twitter:description"
          content="Get a professional Curriculum Vitae in minutes with Genies Career Hub CV Match: intelligent CV alignment algorithm inspired by expert resume coach guidelines"
        />
        <meta
          name="twitter:image"
          content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
        />
      </head>
      <main className="resume_dashboard">
        <div className="resume_dashboard_container">
          <div className="wrapper">{children}</div>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Layout;
