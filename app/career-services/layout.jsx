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
    canonical: 'https://www.geniescareerhub.com/career-services',
  },
};

const Layout = ({ children }) => {
  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Organization",
              url: "https://www.geniescareerhub.com/",
              logo: "https://geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
              name: "geniescareerhub.com",
              description:
                "Genies Career Hub creates your resume in an easy-going process. We provide more than 23+ professionally approved ATS-friendly resume templates and features like CV Creator, CV Optimiser, and CV Match. Additionally, our new features, such as the Psychometric Test incorporating AI and the Career Coach feature, provide the best expertise in creating professional resumes.",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Career Coach",
                  item: "https://www.geniescareerhub.com/career-services",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Career Counseling",
                  item: "https://www.geniescareerhub.com/career-services",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Career Advisor",
                  item: "https://www.geniescareerhub.com/career-services",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Define Career",
                  item: "https://www.geniescareerhub.com/career-services",
                },
              ],
            }),
          }}
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
