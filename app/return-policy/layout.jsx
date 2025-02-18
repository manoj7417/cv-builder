import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Returns Policy: Genies Career Hub",
  description:
    "Want to register a return or exchange an unwanted purchase? Check out our return policies for complete details regarding your purchase.",
  openGraph: {
    title: "Returns Policy: Genies Career Hub",
    description:
      "Want to register a return or exchange an unwanted purchase? Check out our return policies for complete details regarding your purchase.",
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
      "Want to register a return or exchange an unwanted purchase? Check out our return policies for complete details regarding your purchase.",
    image: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
  alternates: {
    canonical: "https://www.geniescareerhub.com/return-policy",
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
