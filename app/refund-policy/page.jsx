import Link from "next/link";
import React from "react";

const RefundPolicyPage = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-white to-[#dcecff] text-gray-800 py-20">
        <div className="container lg:max-w-6xl w-full mx-auto rounded-lg lg:py-10 p-5">
          <div className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-bold">Refund Policy</h2>
            <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg my-2">
              At Genies Career Hub, we are committed to providing services that
              help you as you strive to approach your dream career. Our efforts
              are consistently in the direction of your satisfaction. However,
              in case you feel certain issues with the provided services, you
              can seek assistance from us as per the ensuing regulations and
              policies.
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-bold">Refund Eligibility</h2>
            <ul className="list-disc ml-5">
              <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg my-2">
                Full refunds are available for services cancelled within 24
                hours of purchase.
              </li>
              <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg my-2">
                If a service is cancelled after 24 hours but has not been used,
                you may be eligible for a partial refund.
              </li>
              <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg my-2">
                Services that have been partially used will be evaluated on a
                case-by-case basis for potential partial refunds.
              </li>
            </ul>
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-bold">Non-refundable Services</h2>
            <ul className="list-disc ml-5">
              <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg my-2">
                Services that have been fully utilized or completed are
                non-refundable.
              </li>
              <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg my-2">
                Customized services, once commenced, are non-refundable due to
                their personalized nature.
              </li>
            </ul>
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-bold">
              Process for Requesting a Refund
            </h2>
            <ol className="list-decimal ml-5">
              <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg my-2">
                Contact our customer support team at{" "}
                <Link
                  href="mailto:support@geniescareerhub.com"
                  className="text-blue-600 hover:underline"
                >
                  support@geniescareerhub.com
                </Link>{" "}
                with your refund request and order details.
              </li>
              <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg my-2">
                Our team will review your request and respond within 3 business
                days with the outcome or request for additional information.
              </li>
              <li className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg my-2">
                Approved refunds will be credited back to your original method
                of payment within 14 business days.
              </li>
            </ol>
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-bold">Exceptions</h2>
            <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg my-2">
              In the event of extenuating circumstances, we may consider refund
              requests beyond the standard eligibility criteria at our
              discretion.
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-bold">Contact Information</h2>
            <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg my-2">
              For any inquiries regarding our refund policy or to discuss a
              specific case, please reach out to our customer support team. We
              value your business and will collaborate with you to resolve any
              issues to your satisfaction.
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-bold">Refund Processing Time</h2>
            <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg my-2">
              At Genies Career Hub, we process all refunds promptly and
              efficiently. Once a refund is approved, it will be processed and
              credited back to your original method of payment within 14
              business days. Please note that depending on your bank or credit
              card company, it may take an additional 3-5 business days for the
              refund to be reflected in your account.
            </p>
            <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg my-2">
              If you have not received your refund after this period, please
              contact our customer support team at{" "}
              <a
                href="mailto:support@geniescareerhub.com"
                className="text-blue-600 hover:underline"
              >
                support@geniescareerhub.com
              </a>
              , and we will assist you in tracking the status of your refund.
            </p>
            <p className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg my-2">
              We appreciate your patience and understanding during the refund
              process and are committed to ensuring that your experience with
              Genies Career Hub is positive and hassle-free.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default RefundPolicyPage;
