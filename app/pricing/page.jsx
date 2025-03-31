import React, { Suspense } from "react";
import NewPricingCard from "./NewPricingCard";
const PricingCard = React.lazy(() => import("./PricingCard"));
const page = () => {
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Organization",
    url: "https://www.geniescareerhub.com/",
    logo: "https://geniescareerhub.com/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
    name: "geniescareerhub.com",
    description:
      "Genies Career Hub creates your resume in an easy going process. We provide more than 23+ professional approved ATS-friendly resume templates and features like CV Creator, CV Optimiser and CV Match. Additionally, our new features of Psychometric Test with incorporating AI and Career Coach feature providing best expertise in creating professional resumes.",
  };
  return (
    <>
      <main>
        <section className="w-full h-auto">
          <div className="w-full h-full flex justify-center items-center">
            <div className="text-start">
              <div className="flex justify-center py-8">
                <Suspense fallback={<div>Loading Pricing plan ...</div>}>
                  <NewPricingCard />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default page;
