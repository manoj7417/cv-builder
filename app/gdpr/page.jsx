/** @format */

"use client";
import Link from "next/link";
import React from "react";

const Page = () => {
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
      <section
        className='flex lg:items-center items-start pb-0 justify-center  w-full pt-24 md:pt-16 lg:pt-20  px-5 relative bg-gradient-to-r from-white to-[#dcecff]'
        id='free'>
        <div className='max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-bold mb-6'>
            Genies Career Hub GDPR Privacy Policy
          </h1>
          <section className='mb-8'>
            <h2 className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              Introduction
            </h2>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mb-4'>
              Welcome to Genies Career Hub, your trusted partner in career
              development. In the latest digital era, your personal data is more
              than just information; it’s a part of your self-identity. That’s
              why at Genies Career Hub, we ensure your privacy and are fully
              dedicated to the principles of the General Data Protection
              Regulation (GDPR). Our platform is specifically curated to enable
              data protection rights that are reserved for you. From the
              instance you join our esteemed community at the Genies Career Hub,
              we make sure that your personal data is handled with transparency,
              security, and consideration. We have a firm belief that an
              informed user is an authorized user, and our policies are
              formulated to give you control over your personal information.
            </p>
          </section>
          <section className='mb-8'>
            <h3 className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              Scope of the GDPR Policy
            </h3>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mb-4'>
              This GDPR policy is applicable to all the users of Genies Career
              Hub, including job applicants, employers, and any other
              individuals or associations that employ our services for their
              benefit. It encompasses all personal data processed by us, which
              includes but is not limited to:
            </p>
            <ul className='list-disc list-inside ml-4 mb-4 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              <li>
                Personal Identification Information: Such as name, date of
                birth, and government-issued identification numbers.
              </li>
              <li>
                Contact Information: Including email address, telephone number,
                and postal address.
              </li>
              <li>
                Employment Details: Like your employment history,
                qualifications, skills, and references.
              </li>
              <li>
                Data of the User Account: Username, password (accumulated
                securely), and other related account elements.
              </li>
              <li>
                Financial Information of the Users: Payment details and
                transaction history for any services purchased on the Genies
                Career Hub platform.
              </li>
              <li>
                Technical Data of the User: Such as IP addresses, browser types,
                and cookies help us understand how you interact with our
                platform.
              </li>
            </ul>
          </section>
          <section className='mb-8'>
            <h4 className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              Management of Consent of the Users
            </h4>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mb-4'>
              At the Genies Career Hub, consent is obtained by specific,
              affirmative measures that display acceptance of the processing of
              personal information. On our website or app, users usually give
              their approval through checkboxes or other options. We utilise our
              secure Consent Management Platform (CMP) to manage consent and
              record it with user IDs and timelines. Users of this site can
              quickly analyse, investigate, and modify their consent
              alternatives at any time.
            </p>
          </section>
          <section className='mb-8'>
            <h5 className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              Information Security
            </h5>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mb-4'>
              Data security is our foremost priority at the Genies Career Hub,
              and we take several organisational and technical safeguards to
              defend personal information, such as:
            </p>
            <ul className='list-disc list-inside ml-4 mb-4 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              <li>
                Data Encryption Both at Rest and in Transit: Industry-standard
                protocols are employed to encrypt all data, including data kept
                in our servers and data exchanged between users and our
                platform.
              </li>
              <li>
                Frequent Penetration Tests and Security Audits: We carry out
                regular assessments to identify vulnerabilities and address them
                promptly.
              </li>
              <li>
                Access Controls and Employee Training: Only authorized personnel
                handle personal data, and our staff undergoes regular training
                on data protection and security practices.
              </li>
              <li>
                Secure Development Practices: Our applications and
                infrastructure follow secure development practices to minimize
                risks.
              </li>
            </ul>
          </section>
          <section className='mb-8'>
            <h6 className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              Retention of Inactive Accounts
            </h6>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mb-4'>
              We understand that career paths may take unexpected turns, and
              there may be periods of inactivity on user accounts. Even during
              these times, we handle personal data with care and in compliance
              with GDPR.
            </p>
            <ul className='list-disc list-inside ml-4 mb-4 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              <li>
                Retention Period: For the accounts that are not active anymore,
                we preserve confidential data for a period of seven years. This
                course of time aligns with legal and regulatory conditions,
                assuring that we can sustain any future questions or shares
                related to users’ career journeys with us.
              </li>
              <li>
                Review and Deletion of necessary information: We constantly
                examine inactive accounts and associated information. If an
                account remains dormant for seven years, we take steps to
                securely remove the confidential data, unless retention is
                needed for legal reasons.
              </li>
              <li>
                Reactivation: Users can reactivate their accounts at any time,
                regaining full access to our services and any previously
                provided personal data.
              </li>
            </ul>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              We are dedicated to upholding these rights and will take every
              reasonable step to ensure that your wishes are met in a timely and
              respectful method. If you wish to exercise any of these liberties,
              please contact our Data Protection Team at{" "}
              <Link
                href='mailto:support@geniescareerhub.com'
                className='text-blue-500 hover:underline'>
                support@geniescareerhub.com
              </Link>
              .
            </p>
          </section>
          <section className='mb-8'>
            <h6 className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              Data Subject Rights at Genies Career Hub
            </h6>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mb-4'>
              As a user of Genies Career Hub, you have specific rights
              pertaining to your personal information, as bestowed by the
              General Data Protection Regulation (GDPR). These rights include:
            </p>
            <ul className='list-disc list-inside ml-4 mb-4 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              <strong>The Right to Access:</strong>
              <ul className='list-disc list-inside ml-4 mb-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                <li>
                  You can request access to your personal data that we keep a
                  track of.
                </li>
                <li>
                  We aim to provide translucent and timely access to your
                  information upon request.
                </li>
              </ul>
              <strong>The Right to Rectification:</strong>

              <ul className='list-disc list-inside ml-4 mb-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                <li>
                  If you believe any personal data we hold about you is not
                  correct or entirely complete, you can request its
                  modification.
                </li>
                <li>Contact us if you need any modifications to your data.</li>
              </ul>
              <strong>The Right to Erasure (‘Right to be Forgotten’):</strong>

              <ul className='list-disc list-inside ml-4 mb-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                <li>
                  You can request the deletion of your personal data when it is
                  no longer necessary for us to retain it.
                </li>
                <li>
                  We’ll ensure that your data is securely erased, subject to
                  legal requirements.
                </li>
              </ul>
              <strong>The Right to Restrict Processing:</strong>

              <ul className='list-disc list-inside ml-4 mb-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                <li>
                  Under certain conditions, you have the right to ‘block’ or
                  suppress further use of your personal data.
                </li>
                <li>Reach out to us if you wish to exercise this right.</li>
              </ul>
              <strong>The Right to Data Portability:</strong>

              <ul className='list-disc list-inside ml-4 mb-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                <li>
                  You have the right to receive your personal data in a
                  structured, commonly used, and machine-readable format.
                </li>
                <li>
                  If you wish to transfer this data to another controller, let
                  us know and we will facilitate the transfer.
                </li>
              </ul>
              <strong>The Right to Object:</strong>

              <ul className='list-disc list-inside ml-4 mb-2 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
                <li>
                  If your personal data is processed based on legitimate
                  interests, you have the right to object to such processing.
                </li>
                <li>
                  We will respect your preferences and will ensure your data is
                  not processed for such purposes.
                </li>
              </ul>
            </ul>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              We respect your preferences and are dedicated to upholding these
              rights, taking every reasonable measure to meet them quickly and
              in an ethical manner. If you wish to exercise any of your rights,
              please reach out to our Data Protection Officer via{" "}
              <Link
                href='mailto:support@geniescareerhub.com'
                className='text-blue-500 hover:underline'>
                support@geniescareerhub.com
              </Link>{" "}
              and they will assist you.
            </p>
          </section>
          <section className='mb-8'>
            <p className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              Data Sharing and International Transfers
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mb-4'>
              At Genies Career Hub, we prioritize data protection and
              transparency. Here is how we handle data sharing, international
              transfers, and safeguarding measures:
            </p>
            <ul className='list-disc list-inside ml-4 mb-4 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              <li>
                We only share your data when necessary for providing services or
                as legally mandated (for instance, service providers helping run
                our business operations or legal entities to protect our
                rights).
              </li>
              <li>
                All third parties comply with GDPR and confidentiality
                agreements, processing data as instructed by us.
              </li>
              <li>
                Every international transfer of personal data outside the
                European Economic Area (EEA) complies with GDPR. We ensure that
                receiving countries provide adequate safeguards.
              </li>
              <li>
                Robust safeguards such as contractual clauses approved by the
                European Commission help maintain data protection standards. You
                have a right to be informed about specific safeguards for data
                transfers and documentation showing their existence.
              </li>
            </ul>
          </section>
          <section className='mb-8'>
            <p className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              Data Security Measures
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mb-4'>
              Protective measures taken include:
            </p>
            <ul className='list-disc list-inside ml-4 mb-4 text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg'>
              <li>Encrypting data both while transmitting and at rest.</li>
              <li>
                Conducting regular security audits and penetration tests on
                systems used to store or process data.
              </li>
              <li>
                Access controls and employee training on authorized data
                handling.
              </li>
              <li>
                Adhering to secure development practices to minimize risks.
              </li>
              <li>
                In case of data breaches, structured responses include immediate
                isolation measures, scope and impact assessments, and
                notification of relevant authorities within 72 hours.
              </li>
              <li>
                Notifying affected individuals as soon as possible if there is a
                high risk, conducting post-incident analysis, and taking
                preventive steps after.
              </li>
            </ul>
          </section>
          <section className='mb-8'>
            <p className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              Third-Party Processors
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mb-4'>
              GDPR-compliant third-party processors undergo rigorous
              assessments. Our agreements guarantee their adherence to data
              protection standards with regular audits taking place.
            </p>
          </section>
          <section className='mb-8'>
            <p className='text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-4'>
              Policy Reviews
            </p>
            <p className='text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mb-4'>
              Our GDPR policy is reviewed every year or when necessary. Users
              are kept up-to-date through website updates and email
              notifications.
            </p>
          </section>
        </div>
      </section>
    </>
  );
};

export default Page;
