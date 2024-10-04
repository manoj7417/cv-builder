import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "About Us: Genies Career Hub",
  description:
    "Know everything about Genies Career Hub and its services. Create a stellar resume, take psychometric tests, find a Coach or consult AI Career Coach and more.",
  openGraph: {
    title: "About Us: Genies Career Hub",
    description:
      "Know everything about Genies Career Hub and its services. Create a stellar resume, take psychometric tests, find a Coach or consult AI Career Coach and more.",
    url: "https://www.geniescareerhub.com/about-us",
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
    title: "About Us: Genies Career Hub",
    description:
      "Know everything about Genies Career Hub and its services. Create a stellar resume, take psychometric tests, find a Coach or consult AI Career Coach and more.",
    image:
      "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
};


const Layout = ({ children }) => {
  return (
    <>
      {/* <head>
        <title>About Us: Genies Career Hub</title>
        <meta
          name="description"
          content="Know everything about Genies Career Hub and its services. Create a stellar resume, take scpimetric tests, find a Coach or consult AI Career Coach and more."
        />
        <link rel="canonical" href="https://www.geniescareerhub.com/about-us" />
        <meta
          property="og:url"
          content="https://www.geniescareerhub.com/about-us"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Us: Genies Career Hub" />
        <meta
          property="og:description"
          content="Know everything about Genies Career Hub and its services. Create a stellar resume, take psychometric tests, find a Coach or consult AI Career Coach and more."
        />
        <meta
          property="og:image"
          content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="geniescareerhub.com" />
        <meta
          property="twitter:url"
          content="https://www.geniescareerhub.com/about-us"
        />
        <meta name="twitter:title" content="About Us: Genies Career Hub" />
        <meta
          name="twitter:description"
          content="Know everything about Genies Career Hub and its services. Create a stellar resume, take psychometric tests, find a Coach or consult AI Career Coach and more."
        />
        <meta
          name="twitter:image"
          content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
        />
      </head> */}
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
