"use client";

import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";

type BillingPeriod = "monthly" | "yearly";

// Plan configurations matching backend payments/config.py
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 19,
    priceYearly: 171, // $19 * 12 * 0.9 = ~$205.20 rounded to display value
    experiences: 5,
    description: "Great for trying out AI-powered ER simulations",
    features: [
      "5 new emergency scenarios per month",
      "Full AI-powered patient interactions",
      "Voice mode available",
      "Case review & feedback",
    ],
  },
  {
    id: "core",
    name: "Core",
    priceMonthly: 39,
    priceYearly: 351, // $39 * 12 * 0.9 = ~$421.20 rounded
    experiences: 15,
    description: "Perfect for residents running several sims each month",
    features: [
      "15 new emergency scenarios per month",
      "Full AI-powered patient interactions",
      "Voice mode available",
      "Case review & feedback",
      "Progress tracking",
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 79,
    priceYearly: 711, // $79 * 12 * 0.9 = ~$853.20 rounded
    experiences: 30,
    description: "Ideal for serious, ongoing practice",
    features: [
      "30 new emergency scenarios per month",
      "Full AI-powered patient interactions",
      "Voice mode available",
      "Case review & feedback",
      "Progress tracking",
      "Priority support",
    ],
  },
];

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ersimulator.com";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string>("core");
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [affiliateCode, setAffiliateCode] = useState<string | null>(null);
  const isYearly = billingPeriod === "yearly";

  // Check for affiliate code in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || params.get("via") || params.get("affiliate");
    if (ref) {
      setAffiliateCode(ref);
      // Store in localStorage for later use
      localStorage.setItem("affiliate_code", ref);
    } else {
      // Check localStorage for existing affiliate code
      const stored = localStorage.getItem("affiliate_code");
      if (stored) {
        setAffiliateCode(stored);
      }
    }
  }, []);

  const formatPrice = (plan: typeof PLANS[number]) => {
    const value = isYearly ? plan.priceYearly : plan.priceMonthly;
    return value;
  };

  const handleCheckout = async (planId: string) => {
    setIsLoading(planId);

    try {
      const res = await fetch(`${API_BASE_URL}/api/payments/checkout/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: planId,
          billing_cycle: isYearly ? "annual" : "monthly",
          success_url: `${window.location.origin}/subscription/success`,
          cancel_url: `${window.location.origin}/pricing`,
          affiliate_code: affiliateCode,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        window.location.href = data.checkout_url;
      } else {
        const error = await res.json();
        alert(error.error || "Failed to create checkout session. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-50 md:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Choose the plan that fits your learning goals.
              All plans include a <span className="font-semibold text-emerald-400">30-day free trial</span>.
            </p>

            {/* Affiliate banner */}
            {affiliateCode && (
              <div className="mx-auto mt-6 max-w-md rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4">
                <p className="text-sm text-emerald-300">
                  🎉 Special offer applied! You'll receive <span className="font-bold">6 months free</span> on your first year.
                </p>
              </div>
            )}
          </div>

          {/* Billing Toggle */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="inline-flex rounded-full border border-slate-700 bg-slate-900/70 p-1 text-sm font-semibold">
              <button
                className={`rounded-full px-6 py-2.5 transition ${
                  !isYearly
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-300 hover:text-slate-100"
                }`}
                onClick={() => setBillingPeriod("monthly")}
              >
                Monthly
              </button>
              <button
                className={`rounded-full px-6 py-2.5 transition ${
                  isYearly
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-300 hover:text-slate-100"
                }`}
                onClick={() => setBillingPeriod("yearly")}
              >
                Yearly
                <span className="ml-2 rounded-full bg-emerald-600 px-2 py-0.5 text-xs text-white">
                  Save 10%
                </span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => {
              const selected = selectedPlan === plan.id;
              const loading = isLoading === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border p-6 transition ${
                    plan.popular
                      ? "border-emerald-500/50 bg-gradient-to-b from-emerald-500/10 to-slate-900/50 shadow-lg shadow-emerald-500/10"
                      : "border-slate-700 bg-slate-900/50 hover:border-slate-600"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold uppercase text-slate-950">
                      Most Popular
                    </span>
                  )}

                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-slate-50">{plan.name}</h2>
                    <p className="mt-1 text-sm text-slate-400">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-emerald-400">
                        ${formatPrice(plan)}
                      </span>
                      <span className="text-slate-400">
                        /{isYearly ? "year" : "month"}
                      </span>
                    </div>
                    {isYearly && (
                      <p className="mt-1 text-sm text-slate-500">
                        ${(plan.priceYearly / 12).toFixed(0)}/month billed annually
                      </p>
                    )}
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                      30-day free trial
                    </p>
                  </div>

                  {/* Cases highlight */}
                  <div className="mb-6 rounded-xl border border-emerald-400/30 bg-slate-950/60 p-4 text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-300">
                      Emergency Scenarios
                    </p>
                    <p className="mt-1 text-4xl font-black text-emerald-200">
                      {plan.experiences}
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-300">
                      New Cases Per Month
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="mb-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleCheckout(plan.id)}
                    disabled={loading}
                    className={`w-full rounded-full px-6 py-3 text-sm font-semibold transition ${
                      plan.popular
                        ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400"
                        : "border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? "Loading..." : "Start Free Trial"}
                  </button>

                  <p className="mt-3 text-center text-xs text-slate-500">
                    No credit card required for trial
                  </p>
                </div>
              );
            })}
          </div>

          {/* Enterprise CTA */}
          <div className="mt-16 rounded-2xl border border-slate-700 bg-slate-900/50 p-8 text-center">
            <h3 className="text-xl font-bold text-slate-50">
              Need licenses for your team?
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-slate-400">
              Enterprise volume discounts available. Up to 60% off for residency programs,
              hospitals, and training organizations.
            </p>
            <Link
              href="/enterprise"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/50 px-6 py-3 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/10 transition"
            >
              View Enterprise Pricing
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h3 className="text-xl font-bold text-slate-50 text-center mb-8">
              Frequently Asked Questions
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-6">
                <h4 className="font-semibold text-slate-50">What is a Sim Experience?</h4>
                <p className="mt-2 text-sm text-slate-400">
                  A Sim Experience is one full run of an AI-powered simulation scenario. Each
                  plan includes a set number of Sim Experiences that reload every month.
                </p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-6">
                <h4 className="font-semibold text-slate-50">Do unused scenarios roll over?</h4>
                <p className="mt-2 text-sm text-slate-400">
                  No, scenarios reset at the beginning of each billing cycle. We encourage
                  consistent practice for best learning outcomes.
                </p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-6">
                <h4 className="font-semibold text-slate-50">Can I change plans later?</h4>
                <p className="mt-2 text-sm text-slate-400">
                  Yes! You can upgrade or downgrade your plan anytime. Changes take effect
                  immediately with prorated billing.
                </p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-6">
                <h4 className="font-semibold text-slate-50">What's your refund policy?</h4>
                <p className="mt-2 text-sm text-slate-400">
                  We offer a 30-day money-back guarantee. If you're not satisfied, contact
                  us for a full refund, no questions asked.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="mt-12 space-y-2 text-xs text-slate-500">
            <p>
              ER Simulator is an educational simulation tool for licensed clinicians.
              It does not replace formal medical education, CME, or hospital credentialing,
              and it must never be used to guide real patient care decisions.
            </p>
            <p>
              By joining, you certify that you will follow your governing body (AMA, ACOEP, NCCPA,
              ANCC, etc.), supervising physicians, and local legal requirements before applying any
              knowledge to practice.
            </p>
            <p>
              By purchasing, you agree to our{" "}
              <Link href="/terms" className="text-emerald-400 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/refund" className="text-emerald-400 hover:underline">
                Refund Policy
              </Link>.
              Payments processed securely by Stripe.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
