import Head from "next/head";
import Footer from "../Layout/Footer";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Professional CV Studio: Genies Career Hub",
  description:
    "Our CV Studio is an integrated solution comprising of CV Builder, ATS Resume Checker, and Professional CV Match to help you build a perfect CV.",
  openGraph: {
    title: "Professional CV Studio: Genies Career Hub",
    description:
      "Our CV Studio is an integrated solution comprising of CV Builder, ATS Resume Checker, and Professional CV Match to help you build a perfect CV.",
    url: "/cv-studio",
    images: [
      {
        url: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
        alt: "Genies Career Hub",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@geniescareerhub",
    title: "Professional CV Studio: Genies Career Hub",
    description:
      "Our CV Studio is an integrated solution comprising of Curriculum Vitae Builder, ATS Resume Checker, and Professional CV Match to help you build a perfect CV.",
    image: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
  alternates: {
    canonical: "https://www.geniescareerhub.com/cv-studio",
  },
};

const Layout = ({ children }) => {
  return (
    <>
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
