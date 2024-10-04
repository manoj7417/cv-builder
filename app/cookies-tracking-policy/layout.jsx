import Footer from "../Layout/Footer";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  title: "Cookies & Tracking Policy: Genies Career Hub",
  description:
    "Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information.",
  openGraph: {
    title: "Cookies & Tracking Policy: Genies Career Hub",
    description:
      "Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information.",
    url: "https://www.geniescareerhub.com/cookies-tracking-policy",
    images: [
      {
        url: "https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
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
    image:
      "https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
};


const Layout = ({ children }) => {
  return (
    <>
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
