import React from "react";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Online CV Builder: Top Rated UK CV Format Template",
  description:
    "Find the best CV template and top-rated UK CV format options for your job application on our CV builder. Build your job-winning resume easily in minutes!",
  openGraph: {
    title: "Online CV Builder : Top Rated UK CV Format Template",
    description:
      "Find the best CV template and top-rated UK CV format options for your job application on our CV builder. Build your job-winning resume easily in minutes!",
    url: "/resume",
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
    title: "Online CV Builder : Top Rated UK CV Format Template",
    description:
      "Find the best CV template and top-rated UK CV format options for your job application on our CV builder. Build your job-winning resume easily in minutes!",
    image:
      "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
  alternates: {
    canonical: 'https://www.geniescareerhub.com/resume',
  }
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
