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
  alternates: {
    canonical: 'https://www.geniescareerhub.com/gdpr',
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
