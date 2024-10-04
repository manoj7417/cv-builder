import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Contact the Genies Career Hub Support Team",
  description:
    "Looking for more or seeking a solution for your education problems? Contact us personally and get more information and support on Genies Career Hub now.",
  openGraph: {
    title: "Contact the Genies Career Hub Support Team",
    description:
      "Looking for more or seeking a solution for your education problems? Contact us personally and get more information and support on Genies Career Hub now.",
    url: "https://www.geniescareerhub.com/contact-us",
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
    title: "Contact the Genies Career Hub Support Team",
    description:
      "Looking for more or seeking a solution for your education problems? Contact us personally and get more information and support on Genies Career Hub now.",
    image:
      "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
};


const Layout = ({ children }) => {
  return (
    <>
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
