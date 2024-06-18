import React from "react";

const ReturnPolicyPage = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-white to-[#dcecff] text-gray-800 py-20">
        <div className="container lg:max-w-6xl w-full mx-auto rounded-lg lg:p-0 p-5">
          <h1 className="text-3xl font-bold mb-5 mt-10">
            Returns and Cancellation Policy
          </h1>
          <div className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            <h2 className="text-2xl font-bold">Returns Policy</h2>
            <p className="text-base my-2">
              While we strive to achieve complete compliance with policies and
              ensure the satisfaction of the consumers with our services, we
              comprehend how certain situations can lead to an unsatisfied
              experience. Thus, we offer returns to confirm complete fulfilment.
            </p>
            <h2 className="text-2xl font-bold">Eligibility for Returns</h2>
            <ul className="list-disc ml-5">
              <li className="text-base my-2">
                Services purchased within the last 14 days are eligible for a
                full refund.
              </li>
              <li className="text-base my-2">
                Services that have not been accessed or utilized may be refunded
                in full.
              </li>
              <li className="text-base my-2">
                Partial refunds may be issued for services accessed or utilized
                partially, at the discretion of Genies Career Hub.
              </li>
            </ul>
            <h2 className="text-2xl font-bold">Process for Returns</h2>
            <ol className="list-decimal ml-5">
              <li className="text-base my-2">
                To initiate a return, please contact our customer support team
                at{" "}
                <a
                  href="mailto:support@geniescareerhub.com"
                  className="text-blue-600 hover:underline"
                >
                  support@geniescareerhub.com
                </a>{" "}
                with your order details.
              </li>
              <li className="text-base my-2">
                Our team will review your request and guide you through the
                steps to process the return.
              </li>
              <li className="text-base my-2">
                Once your return is approved, the refund will be processed to
                your original method of payment within 14 business days.
              </li>
            </ol>
            <h2 className="text-2xl font-bold">Exceptions</h2>
            <p className="text-base my-2">
              - Services that are fully utilized are not eligible for a return.
              - Refunds may not be granted if the service has been significantly
              consumed or if the user has benefited from the service.
            </p>

            <h2 className="text-2xl font-bold">Cancellation Policy</h2>
            <p className="text-base my-2">
              At Genies Career Hub, we strive to offer flexible and
              user-friendly services. We understand that plans can change, and
              we are here to accommodate your needs.
            </p>
            <h2 className="text-2xl font-bold">Cancellation Terms</h2>
            <ul className="list-disc ml-5">
              <li className="text-base my-2">
                Users may cancel their service subscriptions at any time.
              </li>
              <li className="text-base my-2">
                Cancellations made within 24 hours of service purchase will be
                eligible for a full refund.
              </li>
              <li className="text-base my-2">
                For cancellations made after 24 hours, a prorated refund will be
                issued based on the unused portion of the service.
              </li>
            </ul>
            <h2 className="text-2xl font-bold">Process for Cancellation</h2>
            <ol className="list-decimal ml-5">
              <li className="text-base my-2">
                To cancel a service, please contact our customer support team at{" "}
                <a
                  href="mailto:support@geniescareerhub.com"
                  className="text-blue-600 hover:underline"
                >
                  support@geniescareerhub.com
                </a>{" "}
                with your subscription details.
              </li>
              <li className="text-base my-2">
                Our team will assist you with the cancellation process and
                inform you about any applicable refunds.
              </li>
              <li className="text-base my-2">
                Refunds will be processed to the original method of payment
                within 14 business days of the cancellation confirmation.
              </li>
            </ol>
            <h2 className="text-2xl font-bold">Non-refundable Services</h2>
            <ul className="list-disc ml-5">
              <li className="text-base my-2">
                Certain services, such as personalized career coaching sessions,
                may be non-refundable once the session has been completed.
              </li>
              <li className="text-base my-2">
                Additionally, services that are part of a promotional bundle may
                have specific cancellation terms, which will be communicated at
                the time of purchase.
              </li>
            </ul>
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <p className="text-base my-2">
              For any questions or concerns regarding our returns and
              cancellation policy, please reach out to our customer support team
              at{" "}
              <a
                href="mailto:support@geniescareerhub.com"
                className="text-blue-600 hover:underline"
              >
                support@geniescareerhub.com
              </a>
              . We are here to assist you and ensure your satisfaction with our
              services.
            </p>
            <p className="text-base my-2">
              Thank you for choosing Genies Career Hub. Your satisfaction is our
              priority, and we aim to provide you with the flexibility you need
              to navigate your career path confidently.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReturnPolicyPage;
