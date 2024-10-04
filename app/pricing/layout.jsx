import Head from "next/head";
import Footer from "../Layout/Footer";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  title: "Pricing: Genies Career Hub",
  description:
    "Love what we have to offer? Check out Pricing quotation for Genies Career Hub and all the distinctive plans. Opt for the best plan and pay with convenience.",
  openGraph: {
    title: "Pricing: Genies Career Hub",
    description:
      "Love what we have to offer? Check out Pricing quotation for Genies Career Hub and all the distinctive plans. Opt for the best plan and pay with convenience.",
    url: "https://www.geniescareerhub.com/pricing",
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
    title: "Pricing: Genies Career Hub",
    description:
      "Love what we have to offer? Check out Pricing quotation for Genies Career Hub and all the distinctive plans. Opt for the best plan and pay with convenience.",
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
