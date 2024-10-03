import Footer from "../Layout/Footer";
import { ResumeHeader } from "../Layout/ResumeHeader";
// export const metadata = {
//   title: "Career Services: Genies Career Hub",
//   description:
//     "Looking for a Career Services, Life Coach, or anything else? Check out our services in AI Career Coaching, 1 to 1 Career Coaching, and Psychometric Test Tool",
//     alternates: {
//       canonical: "https://www.geniescareerhub.com/career-services", // Adding the canonical URL
//     },
// };

const Layout = ({ children }) => {
  return (
    <>
      <title>Career Services: Genies Career Hub</title>
      <meta
        name="description"
        content="Looking for a Career Services, Life Coach, or anything else? Check out our services in AI Career Coaching, 1 to 1 Career Coaching, and Psychometric Test Tool"
      />
      <link rel="canonical" href="https://www.geniescareerhub.com/career-services" />
      <meta
        property="og:url"
        content="https://www.geniescareerhub.com/career-services"
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Career Services: Genies Career Hub" />
      <meta
        property="og:description"
        content="Looking for a Career Services, Life Coach, or anything else? Check out our services in AI Career Coaching, 1 to 1 Career Coaching, and Psychometric Test Tool"
      />
      <meta
        property="og:image"
        content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="geniescareerhub.com" />
      <meta
        property="twitter:url"
        content="https://www.geniescareerhub.com/career-services"
      />
      <meta name="twitter:title" content="Career Services: Genies Career Hub" />
      <meta
        name="twitter:description"
        content="Looking for a Career Services, Life Coach, or anything else? Check out our services in AI Career Coaching, 1 to 1 Career Coaching, and Psychometric Test Tool"
      />
      <meta
        name="twitter:image"
        content="https://www.geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75"
      />

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
