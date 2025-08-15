import { Check, ArrowRight } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      period: "/mo",
      description: "For small fleets getting started with Servix.",
      cta: "Subscribe",
      highlight: false,
      features: [
        "Up to 10 vehicles",
        "Preventive maintenance",
        "Driver checklists",
        "Basic service logs",
      ],
    },
    {
      name: "Pro",
      price: "$49",
      period: "/mo",
      description: "Best for growing fleets that need alerts & exports.",
      cta: "Subscribe",
      highlight: true,
      popular: true,
      features: [
        "Up to 50 vehicles",
        "All Starter features",
        "Inventory & due alerts",
        "CSV exports & summaries",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large operations with advanced needs.",
      cta: "Contact us",
      highlight: false,
      features: [
        "Unlimited vehicles",
        "Dedicated support",
        "Custom integrations",
        "SLA & security reviews",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="scroll-mt-24 relative isolate bg-gradient-to-b from-white via-slate-50 to-white pt-24 pb-12 sm:pt-32 sm:pb-16"
    >
      {/* Decorative gradient blob */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-10 -z-10 overflow-hidden blur-3xl">
        <div
          className="mx-auto aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Choose the right plan for your fleet
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Scalable pricing with no hidden fees. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:mt-20 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={[
                "relative rounded-3xl p-8 ring-1 ring-inset transition-shadow sm:p-10",
                plan.highlight
                  ? "bg-slate-900 text-white ring-slate-900/10 shadow-2xl"
                  : "bg-white ring-slate-200 shadow-sm hover:shadow-xl",
              ].join(" ")}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-6">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className={plan.highlight ? "text-blue-300 font-semibold" : "text-blue-600 font-semibold"}>
                {plan.name}
              </h3>

              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={[
                    "text-5xl font-semibold tracking-tight",
                    plan.highlight ? "text-white" : "text-slate-900",
                  ].join(" ")}
                >
                  {plan.price}
                </span>
                <span className={plan.highlight ? "text-base text-slate-300" : "text-base text-slate-500"}>
                  {plan.period}
                </span>
              </p>

              <p className={["mt-6 text-base", plan.highlight ? "text-slate-300" : "text-slate-600"].join(" ")}>
                {plan.description}
              </p>

              <ul className={["mt-8 space-y-3 text-sm sm:mt-10", plan.highlight ? "text-slate-300" : "text-slate-700"].join(" ")}>
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-x-3">
                    <Check
                      className={`h-5 w-5 flex-none ${plan.highlight ? "text-blue-300" : "text-blue-600"}`}
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={[
                  "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md px-3.5 py-2.5 text-sm font-semibold sm:mt-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                  plan.highlight
                    ? "bg-blue-500 text-white hover:bg-blue-400 focus-visible:outline-blue-500"
                    : "text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-50 focus-visible:outline-blue-500",
                ].join(" ")}
                aria-label={`${plan.cta} - ${plan.name} plan`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
