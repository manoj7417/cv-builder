import Footer from "../Layout/Footer";
import ResumeHeader from "../Layout/ResumeHeader";
// export const metadata = {
//   title: "Terms and Conditions: Genies Career Hub",
//   description:
//     "Read the important terms and conditions of the Genies Career Hub platform as you join our community. We are dedicated to ensuring your complete satisfaction.",
//   alternates: {
//     canonical: "https://www.geniescareerhub.com/terms-condition", // Adding the canonical URL
//   },
// };

const Layout = ({ children }) => {
  return (
    <>
      <head>
        <title>Terms and Conditions: Genies Career Hub</title>
        <meta
          name="description"
          content="Read the important terms and conditions of the Genies Career Hub platform as you join our community. We are dedicated to ensuring your complete satisfaction."
        />
        <link
          rel="canonical"
          href="https://www.geniescareerhub.com/terms-condition"
        />
        <meta
          property="og:url"
          content="https://www.geniescareerhub.com/terms-condition"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Terms and Conditions: Genies Career Hub"
        />
        <meta
          property="og:description"
          content="Read the important terms and conditions of the Genies Career Hub platform as you join our community. We are dedicated to ensuring your complete satisfaction."
        />
        <meta
          property="og:image"
          content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="geniescareerhub.com" />
        <meta
          property="twitter:url"
          content="https://www.geniescareerhub.com/terms-condition"
        />
        <meta
          name="twitter:title"
          content="Terms and Conditions: Genies Career Hub"
        />
        <meta
          name="twitter:description"
          content="Read the important terms and conditions of the Genies Career Hub platform as you join our community. We are dedicated to ensuring your complete satisfaction."
        />
        <meta
          name="twitter:image"
          content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
        />
      </head>

      <main className="terms_condition">
        <div className="terms_condition_container">
          <div className="wrapper">
            {children}
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
