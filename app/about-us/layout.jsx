import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "About Us: Genies Career Hub",
  description:
    "Know everything about Genies Career Hub and its services. Create a stellar resume, take psychometric tests, find a Coach or consult AI Career Coach and more.",
  openGraph: {
    title: "About Us: Genies Career Hub",
    description:
      "Know everything about Genies Career Hub and its services. Create a stellar resume, take psychometric tests, find a Coach or consult AI Career Coach and more.",
    url: "/about-us",
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
    title: "About Us: Genies Career Hub",
    description:
      "Know everything about Genies Career Hub and its services. Create a stellar resume, take psychometric tests, find a Coach or consult AI Career Coach and more.",
    image:
      "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
};


const Layout = ({ children }) => {
  return (
    <>
    <head>
      {/* Schema Markup for Organization */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Organization",
          "url": "https://www.geniescareerhub.com/",
          "logo": "https://geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
          "name": "Genies Career Hub",
          "description": "Genies Career Hub creates your resume in an easy-going process. We provide more than 23+ professional approved ATS-friendly resume templates and features like CV Creator, CV Optimiser, and CV Match. Additionally, our new Psychometric Test feature, incorporating AI, and Career Coach offer the best expertise in creating professional resumes."
        })}} />
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
