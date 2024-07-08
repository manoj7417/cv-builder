import dynamic from "next/dynamic";
const Header = dynamic(() => import("../Layout/Header"), { ssr: false });
const NewResumeHeader = dynamic(() => import("../Layout/NewResumeHeader"), {
  ssr: false,
});

export const metadata = {
  title: "Build ATS Friendly Resume with ATS CV Resume Checker Online",
  description:
    "Create an enhanced Application Tracking System ATS Friendly Resume with Genies Career Hub’s ATS Resume Checker and crack the Job Code with ATS Friendly Resume.",
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
