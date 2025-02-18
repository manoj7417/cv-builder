import React from "react";
import { ResumeHeader } from "../Layout/ResumeHeader";
import Footer from "../Layout/Footer";

export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"), // Base URL
  title: "Professional Curriculum Vitae Match and Resume Coach",
  description: 
    "Get a professional Curriculum Vitae in minutes with Genies Career Hub CV Match: intelligent CV alignment algorithm inspired by expert CV coach guidelines",
  canonical: "https://www.geniescareerhub.com/job-cv",
  openGraph: {
    url: "https://www.geniescareerhub.com/job-cv",
    type: "website",
    title: "Professional Curriculum Vitae Match and Resume Coach",
    description: 
      "Get a professional Curriculum Vitae in minutes with Genies Career Hub CV Match: intelligent CV alignment algorithm inspired by expert CV coach guidelines",
    image: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
  twitter: {
    card: "summary_large_image",
    domain: "geniescareerhub.com",
    url: "/job-cv",
    title: "Professional Curriculum Vitae Match and Resume Coach",
    description: 
      "Get a professional Curriculum Vitae in minutes with Genies Career Hub CV Match: intelligent CV alignment algorithm inspired by expert resume coach guidelines",
    image: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
  alternates: {
    canonical: 'https://www.geniescareerhub.com/job-cv',
  },
};

const Layout = ({ children }) => {
  return (
    <>
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
