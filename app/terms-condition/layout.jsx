/** @format */

import Footer from "../Layout/Footer";
import ResumeHeader from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"), // Set your base URL
  title: "Terms and Conditions: Genies Career Hub",
  description:
    "Read the important terms & conditions of the Genies Career Hub platform as you join our community. We are dedicated to ensuring your complete satisfaction.",
  openGraph: {
    title: "Terms and Conditions: Genies Career Hub",
    description:
      "Read the important terms & conditions of the Genies Career Hub platform as you join our community. We are dedicated to ensuring your complete satisfaction.",
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
    image: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75", // Path is relative
  },
  alternates: {
    canonical: "https://www.geniescareerhub.com/terms-condition",
  },
};

const Layout = ({ children }) => {
  return (
    <>
      <main className='terms_condition'>
        <div className='terms_condition_container'>
          <div className='wrapper'>
            {children}
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
