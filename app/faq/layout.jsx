import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Frequently Asked Questions | Genies Career Hub",
  description:
    "Looking for more or seeking a solution for your education problems? Contact Us personally and get more information and support on Genies Career Hub now.",
  openGraph: {
    title: "Frequently Asked Questions | Genies Career Hub",
    description:
      "Looking for more or seeking a solution for your education problems? Contact Us personally and get more information and support on Genies Career Hub now.",
    url: "/faq",
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
    title: "Frequently Asked Questions | Genies Career Hub",
    description:
      "Looking for more or seeking a solution for your education problems? Contact Us personally and get more information and support on Genies Career Hub now.",
    image:
      "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
};


const Layout = ({ children }) => {
  return (
    <>
    <head>
       {/* JSON-LD Schema for Organization */}
       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Organization",
          "url": "https://www.geniescareerhub.com/",
          "logo": "https://geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
          "name": "geniescareerhub.com",
          "description": "Genies Career Hub creates your resume in an easy going process. We provide more than 23+ professional approved ATS-friendly resume templates and features like CV Creator, CV Optimiser and CV Match. Additionally, our new features of Psychometric Test with incorporating AI and Career Coach feature providing best expertise in creating professional resumes."
        })}} />

        {/* JSON-LD Schema for FAQ */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I use the Curriculum Vitae Template to make my Resume?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `<p>There are a variety of options available on the <a href="https://www.geniescareerhub.com/job-cv">CV Creator</a> to build your resume that matches your sets of skills and professional experience. In order to use the pre-existing Curriculum Vitae Template to create your resume, you can simply follow the following steps:</p>
                  <ul>
                    <li>Head to the <a href="https://www.geniescareerhub.com/resume">CV Builder</a> section tab on the header and tap to open the Creator tool.</li>
                    <li>On the following page, there shall be a variety of templates available under the categories of All Templates, Simple, ATS, Designer, and Professional.</li>
                    <li>Click on the respective category to load the template options.</li>
                    <li>Click on the “Try Now” button to build the CV in the selected template design.</li>
                    <li>The template shall open up along with the CV Maker tool.</li>
                    <li>Enter the required details. You can also use the assistance of the AI to input the necessary information and frame the content.</li>
                    <li>Post the creation of the resume, you can easily Preview it and check the Resume Score simultaneously.</li>
                    <li>Download the CV in the preferred Curriculum Vitae format through the Resume Generator tool.</li>
                  </ul>`
              }
            },
            {
              "@type": "Question",
              "name": "How can resume professionals and resume services help me write my CV?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Taking services from a Career Coach who also offers services in Resume creation and professional writing can be very insightful. Often, for very high-profile jobs, the candidates miss out on the exact details and keywords that an employer is looking for in the job application. Therefore, a resume professional and resume services Career Coach can help you format the perfect resume for the job you are applying for. Additionally, they can help you figure out various aspects as you seek to switch your job or find employment. You can easily contact the best career coach who can help you. All you need to do is head to the Career Coach and contact to get connected with a potential Career Coach who can guide you through professional problems."
              }
            },
            {
              "@type": "Question",
              "name": "How do I make an ATS Friendly Resume using available CV Templates?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `<p>To make an ATS Friendly Resume, the simple hack is to employ an Application Tracking System ATS Resume Template. These templates are specifically designed to build an ATS System CV. This CV shall easily pass through the software that analyses resumes and compacts them for information. To create a resume that is compatible with the <a href="https://www.geniescareerhub.com/resume-analyzer">ATS CV Checker</a>, follow these steps:</p>
                  <ul>
                    <li>Tap on the CV Creator tab on the header of the website.</li>
                    <li>In the templates section, tap on the category of ATS. The templates that are compatible with the Application Tracking Software shall appear on the screen. These templates are formatted according to the ATS System CV formatting.</li>
                    <li>Click on the “Try Now” option to create the resume in the selected template CV format.</li>
                    <li>Enter all the necessary details and information about your profile and experience.</li>
                    <li>Tap on the Preview option to check the formatted and created resume.</li>
                    <li>You can easily download your ATS friendly Resume, specially crafted to go through the Application Tracking Software.</li>
                    <li>Further, you can easily run the prepared CV through the <a href="https://www.geniescareerhub.com/resume-analyzer">ATS Resume Checker</a> available in the CV Optimiser tool. This will help you analyse your Curriculum Vitae and easily check its compatibility.</li>
                    <li>In case, your Resume does not appear compatible with the analyser, you can edit it with the AI.</li>
                  </ul>`
              }
            }
          ]
        })}} />
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
