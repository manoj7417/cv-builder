import Footer from "../Layout/Footer";
import { ResumeHeader } from "../Layout/ResumeHeader";
// export const metadata = {
//   title: " Privacy Policy Details | Genies Career Hub",
//   description:
//     "Check out the Privacy Policy details of the Genies Career Hub to know everything about how we collect, use, and share your personal information and data.",
//   alternates: {
//     canonical: "https://www.geniescareerhub.com/privacy-policy", // Adding the canonical URL
//   },
// };

const Layout = ({ children }) => {
  return (
    <>
    <head>
      <title>Privacy Policy Details | Genies Career Hub</title>
      <meta
        name="description"
        content="Check out the Privacy Policy details of the Genies Career Hub to know everything about how we collect, use, and share your personal information and data."
      />
      <link rel="canonical" href="https://www.geniescareerhub.com/privacy-policy" />
      <meta
        property="og:url"
        content="https://www.geniescareerhub.com/privacy-policy"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Privacy Policy Details | Genies Career Hub"
      />
      <meta
        property="og:description"
        content="Check out the Privacy Policy details of the Genies Career Hub to know everything about how we collect, use, and share your personal information and data."
      />
      <meta
        property="og:image"
        content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="geniescareerhub.com" />
      <meta
        property="twitter:url"
        content="https://www.geniescareerhub.com/privacy-policy"
      />
      <meta
        name="twitter:title"
        content="Privacy Policy Details | Genies Career Hub"
      />
      <meta
        name="twitter:description"
        content="Check out the Privacy Policy details of the Genies Career Hub to know everything about how we collect, use, and share your personal information and data."
      />
      <meta
        name="twitter:image"
        content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
      />
</head>
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
