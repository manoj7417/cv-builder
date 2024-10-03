import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
// export const metadata = {
//   title: "Refund Policy : Genies Career Hub",
//   description:
//     "Seeking a Refund for your recent purchase? Check our policies regarding refunds and get all the necessary information you must know before requesting a refund.",
//   alternates: {
//     canonical: "https://www.geniescareerhub.com/refund-policy",
//   },
// };

const Layout = ({ children }) => {
  return (
    <>
      <head>
        <title>Refund Policy: Genies Career Hub</title>
        <meta
          name="description"
          content="Seeking a Refund for your recent purchase? Check our policies regarding refunds and get all the necessary information you must know before requesting a refund."
        />
        <link rel="canonical" href="https://www.geniescareerhub.com/refund-policy" />
        <meta
          property="og:url"
          content="https://www.geniescareerhub.com/refund-policy"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Refund Policy: Genies Career Hub" />
        <meta
          property="og:description"
          content="Seeking a Refund for your recent purchase? Check our policies regarding refunds and get all the necessary information you must know before requesting a refund."
        />
        <meta
          property="og:image"
          content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="geniescareerhub.com" />
        <meta
          property="twitter:url"
          content="https://www.geniescareerhub.com/refund-policy"
        />
        <meta name="twitter:title" content="Refund Policy: Genies Career Hub" />
        <meta
          name="twitter:description"
          content="Seeking a Refund for your recent purchase? Check our policies regarding refunds and get all the necessary information you must know before requesting a refund."
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
