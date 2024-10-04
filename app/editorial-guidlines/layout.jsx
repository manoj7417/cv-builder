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
    url: "https://www.geniescareerhub.com/editorial-guidlines",
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
