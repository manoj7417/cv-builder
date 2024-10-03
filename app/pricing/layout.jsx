import Footer from "../Layout/Footer";
import { ResumeHeader } from "../Layout/ResumeHeader";
// export const metadata = {
//   title: "Pricing: Genies Career Hub",
//   description:
//     "Love what we have to offer? Check out Pricing quotation for Genies Career Hub and all the distinctive plans. Opt for the best plan and pay with convenience.",
//     alternates: {
//       canonical: "https://www.geniescareerhub.com/pricing",
//     },
// };
const Layout = ({ children }) => {
  return (
    <>
      <title>Pricing: Genies Career Hub</title>
      <meta
        name="description"
        content="Love what we have to offer? Check out Pricing quotation for Genies Career Hub and all the distinctive plans. Opt for the best plan and pay with convenience."
      />
      <link rel="canonical" href="https://www.geniescareerhub.com/pricing" />
      <meta
        property="og:url"
        content="https://www.geniescareerhub.com/pricing"
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Pricing: Genies Career Hub" />
      <meta
        property="og:description"
        content="Love what we have to offer? Check out Pricing quotation for Genies Career Hub and all the distinctive plans. Opt for the best plan and pay with convenience."
      />
      <meta
        property="og:image"
        content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="geniescareerhub.com" />
      <meta
        property="twitter:url"
        content="https://www.geniescareerhub.com/pricing"
      />
      <meta name="twitter:title" content="Pricing: Genies Career Hub" />
      <meta
        name="twitter:description"
        content="Love what we have to offer? Check out Pricing quotation for Genies Career Hub and all the distinctive plans. Opt for the best plan and pay with convenience."
      />
      <meta
        name="twitter:image"
        content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
      />

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
