export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "ATS Resume Checker | Build an ATS Enhanced Resume",
  description:
    "Use our Application Tracking System Resume Optimizer and Analyzer to create an enhanced resume with proper resume formatting and ATS CV Checker compatibility.",
  openGraph: {
    title: "ATS Resume Checker | Build an ATS Enhanced Resume",
    description:
      "Use our Application Tracking System Resume Optimizer and Analyzer to create an enhanced resume with proper resume formatting and ATS CV Checker compatibility.",
    url: "https://www.geniescareerhub.com/resume-analyzer",
    images: [
      {
        url: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
        alt: "ATS Resume Checker",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@geniescareerhub",
    title: "ATS Resume Checker | Build an ATS Enhanced Resume",
    description:
      "Use our Application Tracking System Resume Optimizer and Analyzer to create an enhanced resume with proper resume formatting and ATS CV Checker compatibility.",
    image:
      "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
};

const Layout = ({ children }) => {
  return (
    <>
      <main className="resume_analyser">
        <div className="resume_analyser_container">
          <div className="wrapper">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
