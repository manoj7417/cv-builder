import React from "react";
// export const metadata = {
//   title: "Professional CV Builder | Expert Curriculum Vitae Format",
//   description:
//     "Check out the best curriculum vitae templates that follow industry-standard CV Format and create your resume in minutes with our Curriculum Vitae CV Builder.",
//   alternates: {
//     canonical: "https://www.geniescareerhub.com/resume",
//   },
// };
const Layout = ({ children }) => {
  return (
    <>
      <title>Professional CV Builder | Expert Curriculum Vitae Format</title>
      <meta
        name="description"
        content="Check out the best curriculum vitae templates that follow industry-standard CV Format and create your resume in minutes with our Curriculum Vitae CV Builder."
      />
      <link rel="canonical" href="https://www.geniescareerhub.com/resume" />
      <meta
        property="og:url"
        content="https://www.geniescareerhub.com/resume"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Professional CV Builder | Expert Curriculum Vitae Format"
      />
      <meta
        property="og:description"
        content="Check out the best curriculum vitae templates that follow industry-standard CV Format and create your resume in minutes with our Curriculum Vitae CV Builder."
      />
      <meta
        property="og:image"
        content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="geniescareerhub.com" />
      <meta
        property="twitter:url"
        content="https://www.geniescareerhub.com/resume"
      />
      <meta
        name="twitter:title"
        content="Professional CV Builder | Expert Curriculum Vitae Format"
      />
      <meta
        name="twitter:description"
        content="Check out the best curriculum vitae templates that follow industry-standard CV Format and create your resume in minutes with our Curriculum Vitae CV Builder."
      />
      <meta
        name="twitter:image"
        content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
      />

      <main className="resume_dashboard">
        <div className="resume_dashboard_container">
          <div className="wrapper">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
