import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Refund Policy: Genies Career Hub",
  description:
    "Seeking a Refund for your recent purchase? Check our policies regarding refunds and get all the necessary information you must know before requesting a refund.",
  openGraph: {
    title: "Refund Policy: Genies Career Hub",
    description:
      "Seeking a Refund for your recent purchase? Check our policies regarding refunds and get all the necessary information you must know before requesting a refund.",
    url: "https://www.geniescareerhub.com/refund-policy",
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
    title: "Refund Policy: Genies Career Hub",
    description:
      "Seeking a Refund for your recent purchase? Check our policies regarding refunds and get all the necessary information you must know before requesting a refund.",
    image:
      "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
};


const Layout = ({ children }) => {
  return (
    <>
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
