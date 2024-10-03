import Footer from "../Layout/Footer";
import { ResumeHeader } from "../Layout/ResumeHeader";
// export const metadata = {
//   title: "Cookies & Tracking Policy: Genies Career Hub",
//   description:
//     "Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information.",
//   metadataBase: new URL("https://www.geniescareerhub.com"),
//   alternates: {
//     canonical: "/cookies-tracking-policy",
//   },
//   openGraph: {
//     type: "website",
//     url: "/cookies-tracking-policy",
//     title: "Cookies & Tracking Policy: Genies Career Hub",
//     image: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
//     description:
//       "Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information",
//   },
//   twitter: {
//     card: "summary_large_image",
//     domain: "geniescareerhub.com",
//     url: "/cookies-tracking-policy",
//     title: "Cookies & Tracking Policy: Genies Career Hub",
//     image: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
//     description:
//       "Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information.",
//   },
// };

const Layout = ({ children }) => {
  return (
    <>
      <head>
        <title>Cookies & Tracking Policy: Genies Career Hub</title>
        <meta
          name="description"
          content="Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information."
        />
        <link rel="canonical" href="https://www.geniescareerhub.com/cookies-tracking-policy" />
        <meta
          property="og:title"
          content="Cookies &amp; Tracking Policy: Genies Career Hub"
        />
        <meta
          property="og:description"
          content="Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information"
        />
        <meta
          property="og:url"
          content="https://www.geniescareerhub.com/cookies-tracking-policy"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Cookies &amp; Tracking Policy: Genies Career Hub"
        />
        <meta
          name="twitter:description"
          content="Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information."
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
