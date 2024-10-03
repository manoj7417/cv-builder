import dynamic from "next/dynamic";
const Header = dynamic(() => import("../Layout/Header"), { ssr: false });
const NewResumeHeader = dynamic(() => import("../Layout/NewResumeHeader"), {
  ssr: false,
});

export const metadata = {
  title: "ATS Resume Checker | Build an ATS Enhanced Resume",
  description:
    "Use our Application Tracking System Resume Optimizer and Analyzer to create an enhanced resume with proper resume formatting and ATS CV Checker compatibility",
    alternates: {
      canonical: "https://www.geniescareerhub.com/resume-analyzer", // Adding the canonical URL
    },
};
const Layout = ({ children }) => {
  return (
    <main className="resume_analyser">
      <div className="resume_analyser_container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
