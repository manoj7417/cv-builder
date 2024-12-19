import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: " About Us and Our Journey: Genies Career Hub",
  description:
    "Know everything about Genies Career Hub and its services. Create a stellar resume, take psychometric tests, find a Coach or consult AI Career Coach and more.",
  openGraph: {
    title: "About Us: Genies Career Hub",
    description:
      "Know everything about Genies Career Hub and its services. Create a stellar resume, take psychometric tests, find a Coach or consult AI Career Coach and more.",
    url: "/about-us",
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
  alternates: {
    canonical: 'https://www.geniescareerhub.com/about-us',
  },
};


const Layout = ({ children }) => {
  return (
    <>
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
