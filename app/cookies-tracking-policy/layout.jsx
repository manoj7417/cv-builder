/** @format */

import Footer from "../Layout/Footer";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Cookies & Tracking Policy: Genies Career Hub",
  description:
    "Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information.",
  openGraph: {
    title: "Cookies & Tracking Policy: Genies Career Hub",
    description:
      "Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information.",
    url: "/cookies-tracking-policy",
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
    title: "Cookies & Tracking Policy: Genies Career Hub",
    description:
      "Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information.",
    image: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
  alternates: {
    canonical: "https://www.geniescareerhub.com/cookies-tracking-policy",
  },
};

const Layout = ({ children }) => {
  return (
    <>
      <main className='terms_condition'>
        <div className='terms_condition_container'>
          <div className='wrapper'>
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
