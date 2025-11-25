// @ts-nocheck
"use client";

import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import Link from "next/link";
import { useState } from "react";

type BillingPeriod = "monthly" | "yearly";

const plans = [
  {
    name: "Starter",
    priceMonthly: 19,
    priceYearly: 190,
    experiences: 5,
    notes: [
      "Great for trying out AI-powered ER simulations",
      "5 new emergency scenarios reload every month",
      "First month free",
    ],
  },
  {
    name: "Core",
    priceMonthly: 39,
    priceYearly: 390,
    experiences: 15,
    notes: [
      "Perfect for residents running several sims each month",
      "15 new emergency scenarios reload every month",
      "First month free",
    ],
  },
  {
    name: "Pro",
    priceMonthly: 79,
    priceYearly: 790,
    experiences: 30,
    notes: [
      "Ideal for serious, ongoing practice",
      "30 new emergency scenarios reload every month",
      "First month free",
    ],
  },
  {
    name: "Summit Plan",
    priceMonthly: 119,
    priceYearly: 1190,
    experiences: 50,
    notes: [
      "Designed for fellows, faculty, and heavy users",
      "50 new emergency scenarios reload every month",
      "First month free",
    ],
  },
];

const simPacks = [
  {
    label: "Sim Pack +5",
    description: "Adds 5 extra emergency scenarios for this month",
    price: "$9.99",
    count: 5,
  },
  {
    label: "Sim Pack +20",
    description: "Adds 20 extra emergency scenarios for this month",
    price: "$22.99",
    count: 20,
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string>("Core");
  const isYearly = billingPeriod === "yearly";

  const formatPrice = (plan: (typeof plans)[number]) => {
    const value = isYearly ? plan.priceYearly : plan.priceMonthly;
    const suffix = isYearly ? "/ year" : "/ month";
    return `$${value}${suffix}`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-[2.4rem]">
                Sim Experiences that reload every month.
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                ER Simulator is an educational simulation tool for licensed clinicians.
                It does not replace formal medical education, CME, or hospital credentialing,
                and it must never be used to guide real patient care decisions.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                By joining, you certify that you will follow your governing body (AMA, ACOEP, NCCPA,
                ANCC, etc.), supervising physicians, and local legal requirements before applying any
                knowledge to practice.
              </p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex rounded-full border border-slate-800 bg-slate-900/70 p-1 text-xs font-semibold text-slate-300">
                <button
                  className={`rounded-full px-4 py-2 ${
                    !isYearly ? "bg-emerald-500 text-slate-950" : ""
                  }`}
                  onClick={() => setBillingPeriod("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`rounded-full px-4 py-2 ${
                    isYearly ? "bg-emerald-500 text-slate-950" : ""
                  }`}
                  onClick={() => setBillingPeriod("yearly")}
                >
                  Yearly (best value)
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Yearly plans include approximately two months free versus paying monthly.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => {
              const selected = selectedPlan === plan.name;
              return (
                <button
                  type="button"
                  key={plan.name}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`flex h-full flex-col rounded-2xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                    selected
                      ? "border-emerald-500/70 bg-slate-900 shadow-lg shadow-emerald-500/20"
                      : "border-slate-800 bg-slate-900/70 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-slate-500">
                        Plan
                      </p>
                      <h2 className="text-lg font-semibold text-slate-50">
                        {plan.name}
                      </h2>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                        selected
                          ? "bg-emerald-500/20 text-emerald-200"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {selected ? "Selected" : "Choose"}
                    </span>
                  </div>

                  <p className="mt-3 text-3xl font-bold text-emerald-400">
                    {formatPrice(plan)}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                    First month free
                  </p>

                  <div className="mt-4 rounded-xl border border-emerald-400/30 bg-slate-950/60 px-3 py-3 text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                      Emergency Scenarios
                    </p>
                    <p className="mt-1 text-4xl font-black text-emerald-200">
                      {plan.experiences}
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                      New Cases Per Month
                    </p>
                  </div>

                  <ul className="mt-3 flex flex-1 flex-col gap-2 text-sm text-slate-300">
                    {plan.notes.map((note) => (
                      <li key={note}>• {note}</li>
                    ))}
                  </ul>

                  <div className="mt-4">
                    <span className="inline-flex rounded-full border border-emerald-400/40 px-3 py-1 text-[11px] font-semibold text-emerald-200">
                      Sim Experiences reload monthly
                    </span>
                    <button
                      className="mt-4 w-full rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                      disabled
                    >
                      Early access coming soon
                    </button>
                    <p className="mt-2 text-xs text-slate-500">
                      For educational use only. Payments processed securely by Paddle
                      (Merchant of Record).
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-lg font-semibold text-slate-50">
              Need more runs this month? Add a Sim Pack.
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Sim Packs top up your balance immediately. They expire at the end of the
              current monthly cycle and do not roll over.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {simPacks.map((pack) => (
                <div
                  key={pack.label}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-50">
                      {pack.label}
                    </h4>
                    <span className="text-sm font-semibold text-emerald-300">
                      {pack.price}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{pack.description}</p>
                  <div className="mt-4 rounded-xl border border-emerald-400/30 bg-slate-900/70 px-3 py-3 text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                      Emergency Scenarios
                    </p>
                    <p className="mt-1 text-3xl font-black text-emerald-200">
                      +{pack.count}
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                      Added This Month
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-slate-50">
                How Sim Experiences appear in the app
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>
                  • Dashboard status:{" "}
                  <span className="font-semibold text-emerald-300">
                    “Sim Experiences remaining this month: X of Y”
                  </span>{" "}
                  plus a bar showing “This month’s Sim Experiences used.”
                </li>
                <li>
                  • Reminder text: “Sim Experiences reload every month with your subscription.”
                </li>
                <li>
                  • Start Simulation screen: “You have X Sim Experiences remaining this month.”
                </li>
                <li>
                  • Low balance nudge (≤2 remaining): “You’re almost out of Sim Experiences this
                  month. You can upgrade your plan or add a Sim Pack at any time.”
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-50">
                When a user runs out
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                New simulations pause until they upgrade or add a Sim Pack.
              </p>
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-200">
                <p className="font-semibold text-rose-300">
                  “You’ve used all your Sim Experiences for this month”
                </p>
                <p className="mt-2 text-slate-400">
                  “To run more simulations, you can upgrade your plan or add a Sim Pack.”
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-200">
                    Upgrade plan
                  </span>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-200">
                    Add a Sim Pack
                  </span>
                </div>
                <p className="mt-3 text-[11px] text-slate-500">
                  The Start Simulation button is disabled in this state with inline guidance.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-slate-50">
                First month free messaging
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>• Badge next to every plan price: “First month free.”</li>
                <li>
                  • Banner in account area for new users: “You’re in your free first month. Your
                  Sim Experiences will continue each month as long as your subscription stays active.”
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-50">
                FAQ (what is a Sim Experience?)
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                A Sim Experience is one full run of an AI-powered simulation scenario. Each
                plan includes a set number of Sim Experiences that reload every month.
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-2 text-xs text-slate-500">
            <p>
              Tjomsland LLC dba ER Simulator uses Paddle and app stores (Apple /
              Google) to securely process payments and manage taxes.
            </p>
            <p>
              By purchasing, you agree to our{" "}
              <Link href="/terms" className="text-emerald-400 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/refund"
                className="text-emerald-400 hover:underline"
              >
                Refund Policy
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}