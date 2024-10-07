import Footer from "../Layout/Footer";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Privacy Policy Details | Genies Career Hub",
  description:
    "Check out the Privacy Policy details of the Genies Career Hub to know everything about how we collect, use, and share your personal information and data.",
  openGraph: {
    title: "Privacy Policy Details | Genies Career Hub",
    description:
      "Check out the Privacy Policy details of the Genies Career Hub to know everything about how we collect, use, and share your personal information and data.",
    url: "/privacy-policy",
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
    title: "Privacy Policy Details | Genies Career Hub",
    description:
      "Check out the Privacy Policy details of the Genies Career Hub to know everything about how we collect, use, and share your personal information and data.",
    image:
      "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
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
              "name": "Genies Career Hub",
              "description": "Genies Career Hub simplifies the resume creation process with over 23 professional ATS-friendly templates. We offer features like CV Creator, CV Optimiser, and CV Match. Our services include AI-driven Psychometric Tests and personalized Career Coaching to help you craft the perfect resume."
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
