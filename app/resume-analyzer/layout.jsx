import dynamic from "next/dynamic";
const Header = dynamic(() => import("../Layout/Header"), { ssr: false });
const NewResumeHeader = dynamic(() => import("../Layout/NewResumeHeader"), {
  ssr: false,
});

// export const metadata = {
//   title: "ATS Resume Checker | Build an ATS Enhanced Resume",
//   description:
//     "Use our Application Tracking System Resume Optimizer and Analyzer to create an enhanced resume with proper resume formatting and ATS CV Checker compatibility",
//   alternates: {
//     canonical: "https://www.geniescareerhub.com/resume-analyzer", // Adding the canonical URL
//   },
// };

const Layout = ({ children }) => {
  return (
    <>
    <head>
      <title>ATS Resume Checker | Build an ATS Enhanced Resume</title>
      <meta
        name="description"
        content="Use our Application Tracking System Resume Optimizer and Analyzer to create an enhanced resume with proper resume formatting and ATS CV Checker compatibility"
      />
      <link rel="canonical" href="https://www.geniescareerhub.com/resume-analyzer" />
      <meta
        property="og:url"
        content="https://www.geniescareerhub.com/resume-analyzer"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="ATS Resume Checker | Build an ATS Enhanced Resume"
      />
      <meta
        property="og:description"
        content="Use our Application Tracking System Resume Optimizer and Analyzer to create an enhanced resume with proper resume formatting and ATS CV Checker compatibility"
      />
      <meta
        property="og:image"
        content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="geniescareerhub.com" />
      <meta
        property="twitter:url"
        content="https://www.geniescareerhub.com/resume-analyzer"
      />
      <meta
        name="twitter:title"
        content="ATS Resume Checker | Build an ATS Enhanced Resume"
      />
      <meta
        name="twitter:description"
        content="Use our Application Tracking System Resume Optimizer and Analyzer to create an enhanced resume with proper resume formatting and ATS CV Checker compatibility"
      />
      <meta
        name="twitter:image"
        content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
      />
</head>
      <main className="resume_analyser">
        <div className="resume_analyser_container">
          <div className="wrapper">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
