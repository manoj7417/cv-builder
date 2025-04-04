/** @format */

import Link from "next/link";
import React from "react";

const ReturnPolicyPage = () => {
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
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className='bg-gradient-to-r from-white to-[#dcecff] text-gray-800 py-20'>
        <div className='max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-bold mb-3'>
            Returns Policy
          </h1>
          <section className='mb-3'>
            <h2 className='text-sm sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl mb-2'>
              Understand the Importance of Returns
            </h2>
          </section>
          <section className='mb-8'>
            <h3 className='text-2xl sm:text-2xl  md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl  mb-2 font-bold'>
              Return to Work:
            </h3>
            <h3 className='text-xl font-semibold mb-2'>Recent Purchases</h3>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              All services purchased in the last 14 days will receive a full
              refund.
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              If you are not happy with your purchase, we will refund it.
            </p>
          </section>
          <section className='mb-8'>
            <h4 className='text-xl font-semibold mb-2'>Unused Services</h4>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              If you do not use or access a service, we will refund your full
              payment.
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              We are fair-minded and flexible.
            </p>
          </section>
          <section className='mb-8'>
            <h5 className='text-xl font-semibold mb-2'>Partial Refunds</h5>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              We may consider partial refunds of services partially used.
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              We are committed to finding a solution that is mutually
              beneficial.
            </p>
          </section>
          <section className='mb-8'>
            <h6 className='text-2xl font-semibold mb-2'>
              How can I get a refund for my purchase?
            </h6>
            <ol className='list-decimal pl-5 space-y-2'>
              <li className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                Contact Us: Reach out to our friendly customer support team at{" "}
                <Link
                  href='mailto:support@geniescareerhub.com'
                  className='text-blue-500 hover:underline'>
                  support@geniescareerhub.com
                </Link>{" "}
                with your order details.
              </li>
              <li className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                Review &amp; Approval: We will review your request, approve it,
                and guide you through the process.
              </li>
              <li className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                If your application is approved, you can expect to receive a
                refund within 14 business days.
              </li>
            </ol>
          </section>
          <section className='mb-8'>
            <p className='text-2xl font-semibold mb-2'>Exceptions</p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              Services that have been used to the fullest extent are not
              eligible for returns.
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              If you have benefited significantly from the service, we may amend
              your refund.
            </p>
          </section>
          <section className='mb-8'>
            <p className='text-2xl font-semibold mb-2'>Cancellation Policy</p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              We get it--plans change! Our cancellation policy is as follows:
            </p>
            <p className='text-xl font-semibold mb-2'>Flexible for You:</p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              Your order can be canceled at any time.
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              Refunds in Full within 24 Hours. Your order can be canceled at any
              time.
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              Refunds are made in full within 24 hours. You can cancel your
              order within 24 hours and receive a full refund.
            </p>
          </section>
          <section className='mb-8'>
            <p className='text-xl font-semibold mb-2'>How to Cancel:</p>
            <ol className='list-decimal pl-5 space-y-2'>
              <li className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                Contact Us: Email our helpful support team at{" "}
                <Link
                  href='mailto:support@geniescareerhub.com'
                  className='text-blue-500 hover:underline'>
                  support@geniescareerhub.com
                </Link>{" "}
                with your subscription details.
              </li>
              <li className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                This page will guide you through the steps to cancel your
                subscription.
              </li>
              <li className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                Timeframe for refund: Your refund will be processed within 14
                days of the confirmation date.
              </li>
            </ol>
          </section>
          <section className='mb-8'>
            <p className='text-xl font-semibold mb-2'>
              Non-refundable Services:
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              After completion, some services, such as career coaching, may not
              be refundable.
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              Do not worry; we will explain the cancellation policy for
              promotional bundles when you make your purchase.
            </p>
          </section>
          <section className='mb-8'>
            <p className='text-2xl font-semibold mb-2'>Contact Us</p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              Questions or any other concerns? Contact our team. We care about
              your satisfaction!
            </p>
          </section>
          <section className='mb-8'>
            <p className='text-2xl font-semibold mb-2'>Data Protection Law</p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              The Data Protection Law gives you the right to keep track of the
              information that a particular organization or a government agency
              stores on your behalf. The information that the organizations
              collect will be noted in order to maintain a record of your data
              and utilise the information for the purpose of processing your
              services.
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              You shall be informed concerning the essential information that
              the organization and government agencies shall record. They are as
              follows:
            </p>
            <ul className='list-disc pl-5 space-y-2'>
              <li className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                The way in which your data is used and employed by organizations
                and agencies.
              </li>
              <li className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                The manner in which your personal information and data are
                accessed by the organization.
              </li>
              <li className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                Any incorrect information or data that might be recorded.
              </li>
              <li className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                Any particular data that was erased.
              </li>
              <li className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                Restriction or resistance to the processing of personal
                information.
              </li>
              <li className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                Data portability that seeks permission for data reuse.
              </li>
              <li className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                Objection to data process in certain situations and occasions.
              </li>
            </ul>
          </section>
        </div>
      </section>
    </>
  );
};

export default ReturnPolicyPage;
