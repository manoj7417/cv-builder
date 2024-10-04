import React from "react";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Professional CV Builder | Expert Curriculum Vitae Format",
  description:
    "Check out the best curriculum vitae templates that follow industry-standard CV Format and create your resume in minutes with our Curriculum Vitae CV Builder.",
  openGraph: {
    title: "Professional CV Builder | Expert Curriculum Vitae Format",
    description:
      "Check out the best curriculum vitae templates that follow industry-standard CV Format and create your resume in minutes with our Curriculum Vitae CV Builder.",
    url: "https://www.geniescareerhub.com/resume",
    images: [
      {
        url: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
        alt: "Professional CV Builder",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@geniescareerhub",
    title: "Professional CV Builder | Expert Curriculum Vitae Format",
    description:
      "Check out the best curriculum vitae templates that follow industry-standard CV Format and create your resume in minutes with our Curriculum Vitae CV Builder.",
    image:
      "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
};

const Layout = ({ children }) => {
  return (
    <>
      <main className="resume_dashboard">
        <div className="resume_dashboard_container">
          <div className="wrapper">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
