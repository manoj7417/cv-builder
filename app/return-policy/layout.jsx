import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Returns Policy: Genies Career Hub",
  description:
    "Want to register a return or exchange an unwanted purchase? Check out terms, conditions, and policies for returns for complete details regarding your purchase.",
  openGraph: {
    title: "Returns Policy: Genies Career Hub",
    description:
      "Want to register a return or exchange an unwanted purchase? Check out terms, conditions, and policies for returns for complete details regarding your purchase.",
    url: "/return-policy",
    images: [
      {
        url: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
        alt: "Returns Policy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@geniescareerhub",
    title: "Returns Policy: Genies Career Hub",
    description:
      "Want to register a return or exchange an unwanted purchase? Check out terms, conditions, and policies for returns for complete details regarding your purchase.",
    image:
      "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
  alternates: {
    canonical: 'https://www.geniescareerhub.com/return-policy',
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
              "description": "Genies Career Hub simplifies the resume creation process by offering over 23 professional ATS-friendly templates. We provide essential features such as a CV Creator, CV Optimiser, and CV Match. Additionally, our innovative Psychometric Tests, powered by AI, and personalized Career Coaching services ensure expert guidance in crafting the perfect resume."
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
