import Head from "next/head";
import Footer from "../Layout/Footer";
import { ResumeHeader } from "../Layout/ResumeHeader";
// export const metadata = {
//   title: "Professional CV Studio: Genies Career Hub",
//   description:
//     "Our CV Studio is an integrated solution comprising of Curriculum Vitae Builder, ATS Resume Checker, and Professional CV Match to help you build a perfect CV.",
//     alternates: {
//       canonical: "https://www.geniescareerhub.com/cv-studio", // Adding the canonical URL
//     },
// };

const Layout = ({ children }) => {
  return (
    <>
      <head>
        <title>Professional CV Studio: Genies Career Hub</title>
        <meta
          name="description"
          content="Our CV Studio is an integrated solution comprising of Curriculum Vitae Builder, ATS Resume Checker, and Professional CV Match to help you build a perfect CV."
        />
        <link
          rel="canonical"
          href="https://www.geniescareerhub.com/cv-studio"
        />
        <meta
          property="og:url"
          content="https://www.geniescareerhub.com/cv-studio"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Professional CV Studio: Genies Career Hub"
        />
        <meta
          property="og:description"
          content="Our CV Studio is an integrated solution comprising of Curriculum Vitae Builder, ATS Resume Checker, and Professional CV Match to help you build a perfect CV."
        />
        <meta
          property="og:image"
          content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="geniescareerhub.com" />
        <meta
          property="twitter:url"
          content="https://www.geniescareerhub.com/cv-studio"
        />
        <meta
          name="twitter:title"
          content="Professional CV Studio: Genies Career Hub"
        />
        <meta
          name="twitter:description"
          content="Our CV Studio is an integrated solution comprising of Curriculum Vitae Builder, ATS Resume Checker, and Professional CV Match to help you build a perfect CV."
        />
        <meta
          name="twitter:image"
          content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
        />
      </head>
      <main className="resume_dashboard">
        <div className="resume_dashboard_container">
          <div className="wrapper">
            <ResumeHeader />
            {children}
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
