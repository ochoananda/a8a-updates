import { setTier } from "./actions";

const tiers = [
  {
    key: "free" as const,
    name: "Free",
    price: "$0",
    perks: ["Daily headline updates", "End-of-day summary", "Last 7 days of archives"],
    cta: "Stay Free",
  },
  {
    key: "standard" as const,
    name: "Standard (Pro Insights)",
    price: "$29/mo",
    perks: [
      "Full daily commentary",
      "Weekly PDF report",
      "Custom price alerts",
      "Searchable archive",
      "Priority email support",
    ],
    cta: "Upgrade to Standard",
    highlight: true,
  },
  {
    key: "premium" as const,
    name: "Premium (Executive Access)",
    price: "$129/mo",
    perks: [
      "Early access to updates",
      "Weekly call/webinar + Q&A",
      "Extended charts & risk levels",
      "SMS alerts",
      "Client-only resource library",
      "Direct priority access",
    ],
    cta: "Upgrade to Premium",
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="text-center mb-10 space-y-2">
        <h1 className="text-3xl font-bold">Pricing</h1>
        <p className="text-muted-foreground">Choose the plan that fits your trading needs. Upgrade anytime.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <form
            key={tier.key}
            action={setTier}
            className={[
              "rounded-2xl shadow-sm border p-6 flex flex-col",
              tier.highlight ? "ring-2 ring-indigo-500 border-indigo-500" : "border-gray-200",
            ].join(" ")}
          >
            <input type="hidden" name="tier" value={tier.key} />
            <div className="flex-1 space-y-4">
              <h2 className="text-xl font-semibold">{tier.name}</h2>
              <p className="text-3xl font-bold">{tier.price}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span>•</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl border bg-black text-white py-2.5 hover:opacity-90 transition"
            >
              {tier.cta}
            </button>
          </form>
        ))}
      </section>

      <p className="text-center text-xs text-muted-foreground mt-6">
        Prices are placeholders for testing. Stripe will be added later.
      </p>
    </main>
  );
}
