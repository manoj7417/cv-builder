'use client'
import React from 'react'
import PricingCard from './PricingCard'
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
    <section className='w-full h-auto 2xl:mt-20 lg:mt-20 md:mt-20  mt-10'>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='text-start'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-[60px] 2xl:text-7xl font-extrabold mb-4 sm:mb-6 text-center xs:text-start'>
              Grow beyond expectations with
              <br />
              <span className='text-blue-700'>Flexible Pricing</span>
            </h1>
            <p className=' w-[60%] mx-auto my-3 text-base text-center'>
              Our professional CV Maker assists you in landing that interview
              call! Our professional tools like CV Creator, CV Optimiser, and CV
              Match create well-researched, analytically optimised resumes that
              are approved by recruiters across the globe and established ATS
              systems.
            </p>
            <div className='flex justify-center py-8'>
             <PricingCard/>
            </div>
          </div>
        </div>
      </section>
    </main>  
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      </>
  )
}

export default page