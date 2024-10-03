import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
// export const metadata = {
//   title: "Frequently Asked Question!",
//   description:
//     "Looking for more or seeking a solution for your education problems? Contact Us personally and get more information and support on Genies Career Hub now.",
//   alternates: {
//     canonical: "https://www.geniescareerhub.com/faq",
//   },
// };

const Layout = ({ children }) => {
  return (
    <>
      <head>
        <title>Frequently Asked Question! | Genies Career Hub</title>
        <meta
          name="description"
          content="Looking for more or seeking a solution for your education problems? Contact Us personally and get more information and support on Genies Career Hub now."
        />
        <link rel="canonical" href="https://www.geniescareerhub.com/faq" />
        <meta property="og:url" content="https://www.geniescareerhub.com/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Frequently Asked Question!" />
        <meta
          property="og:description"
          content="Looking for more or seeking a solution for your education problems? Contact Us personally and get more information and support on Genies Career Hub now."
        />
        <meta
          property="og:image"
          content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="geniescareerhub.com" />
        <meta
          property="twitter:url"
          content="https://www.geniescareerhub.com/faq"
        />
        <meta name="twitter:title" content="Frequently Asked Question!" />
        <meta
          name="twitter:description"
          content="Looking for more or seeking a solution for your education problems? Contact Us personally and get more information and support on Genies Career Hub now."
        />
        <meta
          name="twitter:image"
          content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
        />
      </head>
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
