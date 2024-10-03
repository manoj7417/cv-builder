import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
// export const metadata = {
//   title: "Editorial Guidlines: Genies Career Hub",
//   description:
//     "Know everything about the Brand’s style, structure, and strategy consistency of the Genies Career Hub as you join our prestigious community of Professionals.",
//   alternates: {
//     canonical: "https://www.geniescareerhub.com/editorial-guidlines",
//   },
// };

const Layout = ({ children }) => {
  return (
    <>
      <head>
      <title>Editorial Guidlines: Genies Career Hub</title>
        <meta
          name="description"
          content="Know everything about the Brand’s style, structure, and strategy consistency of the Genies Career Hub as you join our prestigious community of Professionals."
        />
        <link rel="canonical" href="https://www.geniescareerhub.com/editorial-guidlines" />
        <meta
          property="og:url"
          content="https://www.geniescareerhub.com/editorial-guidlines"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Editorial Guidelines: Genies Career Hub"
        />
        <meta
          property="og:description"
          content="Know everything about the Brand’s style, structure, and strategy consistency of the Genies Career Hub as you join our prestigious community of Professionals."
        />
        <meta
          property="og:image"
         content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="geniescareerhub.com" />
        <meta
          property="twitter:url"
          content="https://www.geniescareerhub.com/editorial-guidlines"
        />
        <meta
          name="twitter:title"
          content="Editorial Guidelines: Genies Career Hub"
        />
        <meta
          name="twitter:description"
          content="Know everything about the Brand’s style, structure, and strategy consistency of the Genies Career Hub as you join our prestigious community of Professionals."
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
