import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Editorial Guidelines: Genies Career Hub",
  description:
    "Know everything about the Brand’s style, structure, and strategy consistency of the Genies Career Hub as you join our prestigious community of Professionals.",
  openGraph: {
    title: "Editorial Guidelines: Genies Career Hub",
    description:
      "Know everything about the Brand’s style, structure, and strategy consistency of the Genies Career Hub as you join our prestigious community of Professionals.",
    url: "/editorial-guidlines",
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
    title: "Editorial Guidelines: Genies Career Hub",
    description:
      "Know everything about the Brand’s style, structure, and strategy consistency of the Genies Career Hub as you join our prestigious community of Professionals.",
    image:
      "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
  alternates: {
    canonical: 'https://www.geniescareerhub.com/editorial-guidlines',
  },
};


const Layout = ({ children }) => {
  return (
    <>
    <head>
    <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Organization",
              "url": "https://www.geniescareerhub.com/",
              "logo": "https://geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
              "name": "geniescareerhub.com",
              "description": "Genies Career Hub creates your resume through an easy process, offering over 23+ professional ATS-friendly resume templates. Services include CV Creator, CV Optimiser, CV Match, Psychometric Testing, and AI-powered Career Coach."
            })
          }} 
        />
    </head>
      <main className="terms_condition">
        <div className="terms_condition_container">
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
