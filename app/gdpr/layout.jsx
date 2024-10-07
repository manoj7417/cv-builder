import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "GDPR Policy | Genies Career Hub",
  description:
    "We completely comply with the General Data Protection Regulation GDPR. Read about the protection of your personal data and information at Genies Career Hub.",
  openGraph: {
    title: "GDPR Policy | Genies Career Hub",
    description:
      "We completely comply with the General Data Protection Regulation GDPR. Read about the protection of your personal data and information at Genies Career Hub.",
    url: "/gdpr",
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
    title: "GDPR Policy | Genies Career Hub",
    description:
      "We completely comply with the General Data Protection Regulation GDPR. Read about the protection of your personal data and information at Genies Career Hub.",
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
              "description": "Genies Career Hub simplifies resume creation with over 23 professional ATS-friendly templates. Our services include CV Creator, CV Optimiser, CV Match, and AI-driven Psychometric Testing and Career Coaching."
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
