import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
// export const metadata = {
//   title: "GDPR Policy: Genies Career Hub",
//   description:
//     "We completely comply with the General Data Protection Regulation GDPR. Read about the protection of your personal data and information at Genies Career Hub.",
//   alternates: {
//     canonical: "https://www.geniescareerhub.com/gdpr",
//   },
// };

const Layout = ({ children }) => {
  return (
    <>
      <title>GDPR Policy: Genies Career Hub</title>
      <meta
        name="description"
        content="We completely comply with the General Data Protection Regulation GDPR. Read about the protection of your personal data and information at Genies Career Hub."
      />
      <link rel="canonical" href="https://www.geniescareerhub.com/gdpr" />
      <meta property="og:url" content="https://www.geniescareerhub.com/gdpr" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="GDPR Policy: Genies Career Hub" />
      <meta
        property="og:description"
        content="We completely comply with the General Data Protection Regulation GDPR. Read about the protection of your personal data and information at Genies Career Hub."
      />
      <meta
        property="og:image"
        content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="geniescareerhub.com" />
      <meta
        property="twitter:url"
        content="https://www.geniescareerhub.com/gdpr"
      />
      <meta name="twitter:title" content="GDPR Policy: Genies Career Hub" />
      <meta
        name="twitter:description"
        content="We completely comply with the General Data Protection Regulation GDPR. Read about the protection of your personal data and information at Genies Career Hub."
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
