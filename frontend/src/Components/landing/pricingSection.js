// src/components/Landing/PricingSection.js
import React from "react";

const plans = [
  {
    title: "Starter",
    price: "$19/mo",
    description: "For small fleets. Includes up to 10 vehicles.",
    features: ["Preventive Maintenance", "Driver Checklists", "Service Logs"],
    cta: "Subscribe",
  },
  {
    title: "Pro",
    price: "$49/mo",
    description: "Best for growing fleets. Includes up to 50 vehicles.",
    features: ["Everything in Starter", "Inventory Alerts", "CSV Exports"],
    cta: "Subscribe",
    featured: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "For large operations with custom needs.",
    features: ["Unlimited vehicles", "Dedicated support", "Custom pricing"],
    cta: "Contact Us",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Pricing Plans</h2>
        <p className="text-gray-600 mb-12">
          Simple pricing for every fleet size. No hidden fees.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl border shadow transition hover:shadow-xl ${
                plan.featured ? "border-blue-600" : "border-gray-200"
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {plan.title}
              </h3>
              <p className="text-3xl font-bold text-blue-600 mb-2">{plan.price}</p>
              <p className="text-gray-500 mb-4">{plan.description}</p>
              <ul className="text-left text-gray-600 mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="before:content-['✓'] before:text-green-500 before:mr-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 rounded-lg font-medium transition ${
                  plan.featured
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-blue-600 hover:bg-blue-100"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
