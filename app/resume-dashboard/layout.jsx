import React from "react";
export const metadata = {
  title: "Professional Resume Template and Builder | CV Enhancer",
  description:
    "Find the best resumé template on the Genies Career Hub résumé builder. Make your resume online with expert CV Builder, CV Enhancer, and CV Building Tools.",
};
const Layout = ({ children }) => {
  return (
    <main className="resume_dashboard">
      <div className="resume_dashboard_container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
