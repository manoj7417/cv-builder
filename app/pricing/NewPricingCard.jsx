import { CheckIcon } from "@heroicons/react/20/solid";

const plan = {
  name: "Resume Download",
  id: "tier-download",
  href: "#",
  price: "₹149",
  description: "One-time payment to download your resume.",
  features: [
    "Access to Selected Resume Template",
    "Basic Formatting Options",
    "Download as PDF",
    "No Watermark",
    "Email Support",
  ],
};

export default function Pricing() {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold text-indigo-600">
          Download Resume
        </h2>
        <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          To download your resume, you need to pay ₹149.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-md">
        <div className="bg-white shadow-lg rounded-3xl p-8 ring-1 ring-gray-200">
          <h3
            id={plan.id}
            className="text-lg font-semibold text-indigo-600 text-center"
          >
            {plan.name}
          </h3>
          <p className="mt-4 text-center text-4xl font-bold text-gray-900">
            {plan.price}
          </p>
          <p className="mt-4 text-center text-gray-600">{plan.description}</p>
          <ul className="mt-6 space-y-3 text-sm text-gray-600">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-x-3">
                <CheckIcon className="h-5 w-5 text-indigo-600" />
                {feature}
              </li>
            ))}
          </ul>
          <a
            href={plan.href}
            className="mt-6 block w-full rounded-md bg-indigo-500 px-5 py-3 text-center text-white font-semibold shadow-md hover:bg-indigo-400"
          >
            Pay ₹49 & Download
          </a>
        </div>
      </div>
    </div>
  );
}
