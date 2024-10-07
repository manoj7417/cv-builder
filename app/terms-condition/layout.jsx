import Footer from "../Layout/Footer";
import ResumeHeader from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"), // Set your base URL
  title: "Terms and Conditions: Genies Career Hub",
  description:
    "Read the important terms and conditions of the Genies Career Hub platform as you join our community. We are dedicated to ensuring your complete satisfaction.",
  openGraph: {
    title: "Terms and Conditions: Genies Career Hub",
    description:
      "Read the important terms and conditions of the Genies Career Hub platform as you join our community. We are dedicated to ensuring your complete satisfaction.",
    url: "/terms-condition",
    images: [
      {
        url: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75", // Path is relative
        alt: "Terms and Conditions",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@geniescareerhub",
    title: "Terms and Conditions: Genies Career Hub",
    description:
      "Read the important terms and conditions of the Genies Career Hub platform as you join our community. We are dedicated to ensuring your complete satisfaction.",
    image:
      "/_next/image?url=%2Fbeta-logo.png&w=128&q=75", // Path is relative
  },
  alternates: {
    canonical: 'https://www.geniescareerhub.com/terms-condition',
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
              "description": "Genies Career Hub simplifies the resume creation process with over 23 professional, ATS-friendly templates. Our services include a CV Creator, CV Optimiser, and CV Match, along with AI-driven Psychometric Tests and personalized Career Coaching."
            })
          }} 
        />
    </head>
      <main className="terms_condition">
        <div className="terms_condition_container">
          <div className="wrapper">
            {children}
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
