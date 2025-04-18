/** @format */

import Head from "next/head";
import Footer from "../Layout/Footer";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: " Pricing and Payments: Genies Career Hub",
  description:
    "What we have to offer? Check out Pricing quotation for Genies Career Hub and all the distinctive plans. Opt for the best plan and pay with convenience.",
  openGraph: {
    title: "Pricing: Genies Career Hub",
    description:
      "What we have to offer? Check out Pricing quotation for Genies Career Hub and all the distinctive plans. Opt for the best plan and pay with convenience.",
    url: "/pricing",
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
    title: "Pricing: Genies Career Hub",
    description:
      "What we have to offer? Check out Pricing quotation for Genies Career Hub and all the distinctive plans. Opt for the best plan and pay with convenience.",
    image: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
  alternates: {
    canonical: "https://www.geniescareerhub.com/pricing",
  },
  keywords: "pricing, career hub, plans, Genies Career Hub",
  author: "Genies Career Hub Team",
};

const Layout = ({ children }) => {
  return (
    <>
      <ResumeHeader />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
