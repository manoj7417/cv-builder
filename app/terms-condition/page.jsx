import React from "react";
import { ResumeHeader } from "../Layout/ResumeHeader";

const TermsConditionPage = () => {

  const jsonLd = {
   "@context": "https://schema.org/",
  "@type": "Organization",
  "url": "https://www.geniescareerhub.com/",
  "logo": "https://geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  "name": "geniescareerhub.com",
  "description": "Genies Career Hub creates your resume in an easy going process. We provide more than 23+ professional approved ATS-friendly resume templates and features like CV Creator, CV Optimiser and CV Match. Additionally, our new features of Psychometric Test with incorporating AI and Career Coach feature providing best expertise in creating professional resumes."
  }


  return (
    <>
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <ResumeHeader/>
      <div className="bg-gradient-to-r from-white to-[#dcecff] text-gray-800 py-20">
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-bold mb-6">Terms and Conditions</h1>
          <section className="mb-8">
            <h2 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4">
              1. CV Creator, Optimizer, and CV Match
            </h2>
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold mb-2">a. Eligibility:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                <li>
                  These tools will help you create, optimize, and match your CV.
                </li>
                <li>Relevant job opportunities.</li>
                <li>Use them to tailor your CV and enhance your job search.</li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold mb-2">b. Data Privacy:</h3>
              <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                We respect your privacy. Your CV is processed securely and
                solely to the benefit of your application.
              </p>
              <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                Please refer to our Privacy Statement for more information.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold mb-2">c. Accuracy:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                <li>
                  We strive to be accurate, but always check the CV generated
                  for discrepancies.
                </li>
                <li>
                  It is your responsibility to ensure that the information
                  matches your qualifications.
                </li>
              </ul>
            </div>
          </section>
          <section className="mb-8">
            <h3 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4">
              2. Psychometric Testing
            </h3>
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-2">a. Purpose:</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                <li>
                  Psychometric tests can provide insight into your personality,
                  abilities, and preferences.
                </li>
                <li>Make informed career choices by using these tools.</li>
              </ul>
            </div>
            <div className="mb-6">
              <h5 className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold mb-2">b. Interpretation:</h5>
              <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                It is important to consider the test results in conjunction with
                all other factors.
              </p>
              <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                If you need professional advice, seek it.
              </p>
            </div>
          </section>
          <section className="mb-8">
            <h3 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4">3. AI Career Coach</h3>
            <div className="mb-6">
              <h6 className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold mb-2">a. Guidance:</h6>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                <li>
                  AI Career Coach offers you personalized advice based on your
                  goals and profile.
                </li>
                <li>
                  Consider it a resource to support you, but seek human guidance
                  in complex situations.
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <p className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold mb-2">b. Limitations:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                <li>
                  AI Career Coach is not a replacement for professional career
                  counseling.
                </li>
                <li>
                  Use it as a tool to help you make decisions, but not the only
                  one.
                </li>
              </ul>
            </div>
          </section>
          <section className="mb-8">
            <p className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4">
              4. Career Coaching Services
            </p>
            <div className="mb-6">
              <p className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold mb-2">
                a. Service Details:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                <li>
                  Experienced professionals deliver our career coaching
                  services.
                </li>
                <li>
                  The sessions are customized to meet your goals and needs.
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <p className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold mb-2">b. Payment:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                <li>
                  The cost of career coaching is clearly stated at the time of
                  booking.
                </li>
                <li>Your payment confirms your booking.</li>
              </ul>
            </div>
          </section>
          <section className="mb-8">
            <p className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4">5. General Terms</p>
            <div className="mb-6">
              <p className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold mb-2">a. User Conduct:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                <li>Use our services ethically and responsibly.</li>
                <li>
                  Respect the community guidelines as well as your fellow users.
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <p className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold mb-2">b. Modifications:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
                <li>
                  These terms may be updated periodically. Please check for the
                  most recent version.
                </li>
                <li>
                  Continued use of the site implies acceptance of any changes.
                </li>
              </ul>
            </div>
          </section>
          <section className="mb-8">
            <p className="text-2xl font-semibold mb-4">Contact Us</p>
            <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
              Please contact our Customer Service team at{" "}
              <a
                href="mailto:support@geniescareerhub.com"
                className="text-blue-500 hover:underline"
              >
                support@geniescareerhub.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsConditionPage;
