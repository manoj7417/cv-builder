import Footer from "../Layout/Footer";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Career Services: Genies Career Hub",
  description:
    "Looking for Career Services, a Life Coach, or anything else? Check out our services in AI Career Coaching, 1-to-1 Career Coaching, and the Psychometric Test Tool.",
  openGraph: {
    title: "Career Services: Genies Career Hub",
    description:
      "Looking for Career Services, a Life Coach, or anything else? Check out our services in AI Career Coaching, 1-to-1 Career Coaching, and the Psychometric Test Tool.",
    url: "/career-services",
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
    title: "Career Services: Genies Career Hub",
    description:
      "Looking for Career Services, a Life Coach, or anything else? Check out our services in AI Career Coaching, 1-to-1 Career Coaching, and the Psychometric Test Tool.",
    image: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
  alternates: {
    canonical: "https://www.geniescareerhub.com/career-services",
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
