"use client";

import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

// Volume discount tiers
const VOLUME_TIERS = [
  { id: "standard", label: "Standard", range: "1-9 seats", discount: 0, minSeats: 1, maxSeats: 9 },
  { id: "tier40", label: "40% OFF", range: "10-24 seats", discount: 40, minSeats: 10, maxSeats: 24, popular: true },
  { id: "tier50", label: "50% OFF", range: "25-49 seats", discount: 50, minSeats: 25, maxSeats: 49 },
  { id: "tier60", label: "60% OFF", range: "50+ seats", discount: 60, minSeats: 50, maxSeats: 500, bestValue: true },
];

// Plan configurations
const PLANS = {
  starter: {
    name: "Starter",
    basePrice: 205.20,
    casesPerMonth: 5,
    description: "Great for small teams getting started",
  },
  core: {
    name: "Core",
    basePrice: 421.20,
    casesPerMonth: 15,
    description: "Perfect for residency programs",
  },
  pro: {
    name: "Pro",
    basePrice: 853.20,
    casesPerMonth: 30,
    description: "Ideal for large institutions",
  },
};

type PlanKey = keyof typeof PLANS;
type VolumeTierId = typeof VOLUME_TIERS[number]["id"];

// API base URL - use environment variable or default
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ersimulator.com";

export default function EnterprisePage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("pro");
  const [selectedTier, setSelectedTier] = useState<VolumeTierId>("tier50");
  const [seatCount, setSeatCount] = useState(25);
  const [isLoading, setIsLoading] = useState(false);
  const [pricing, setPricing] = useState<{
    tier_label: string;
    discount_percent: number;
    price_per_seat_annual: number;
    total_annual: number;
    total_monthly_equivalent: number;
    savings_annual: number;
    base_price_per_seat: number;
  } | null>(null);

  // Get current tier based on seat count
  const getCurrentTier = useCallback((seats: number) => {
    if (seats >= 50) return "tier60";
    if (seats >= 25) return "tier50";
    if (seats >= 10) return "tier40";
    return "standard";
  }, []);

  // Update tier when seat count changes
  useEffect(() => {
    const newTier = getCurrentTier(seatCount);
    if (newTier !== selectedTier) {
      setSelectedTier(newTier);
    }
  }, [seatCount, selectedTier, getCurrentTier]);

  // When tier is clicked, snap seat count to tier minimum
  const handleTierClick = (tierId: VolumeTierId) => {
    setSelectedTier(tierId);
    const tier = VOLUME_TIERS.find((t) => t.id === tierId);
    if (tier) {
      setSeatCount(tier.minSeats);
    }
  };

  // Fetch pricing from API
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/payments/enterprise/pricing/?tier=${selectedPlan}&quantity=${seatCount}`
        );
        if (res.ok) {
          const data = await res.json();
          setPricing(data.pricing);
        }
      } catch (error) {
        // Fallback to client-side calculation if API fails
        const plan = PLANS[selectedPlan];
        const tier = VOLUME_TIERS.find((t) => t.id === selectedTier);
        const discount = tier?.discount || 0;
        const pricePerSeat = plan.basePrice * (1 - discount / 100);
        const totalAnnual = pricePerSeat * seatCount;
        setPricing({
          tier_label: tier?.range || "",
          discount_percent: discount,
          price_per_seat_annual: pricePerSeat,
          total_annual: totalAnnual,
          total_monthly_equivalent: totalAnnual / 12,
          savings_annual: (plan.basePrice * seatCount) - totalAnnual,
          base_price_per_seat: plan.basePrice,
        });
      }
    };

    fetchPricing();
  }, [selectedPlan, seatCount, selectedTier]);

  // Handle checkout
  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/payments/enterprise/checkout/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: selectedPlan,
          quantity: seatCount,
          success_url: `${window.location.origin}/enterprise/success`,
          cancel_url: `${window.location.origin}/enterprise`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        window.location.href = data.checkout_url;
      } else {
        alert("Failed to create checkout session. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentTierData = VOLUME_TIERS.find((t) => t.id === selectedTier);
  const plan = PLANS[selectedPlan];

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          {/* Header */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Enterprise Volume Pricing
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-5xl">
              Training for Your Entire Team
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Self-service volume discounts for residency programs, hospitals, and medical training organizations.
              Up to <span className="font-bold text-emerald-400">60% off</span> for large teams.
            </p>
          </div>

          {/* Main Configuration */}
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Left Column - Plan & Tier Selection */}
            <div className="space-y-8">
              {/* Plan Selection */}
              <div>
                <h2 className="text-lg font-semibold text-slate-50 mb-4">
                  1. Choose Your Plan
                </h2>
                <div className="grid gap-3">
                  {(Object.entries(PLANS) as [PlanKey, typeof PLANS[PlanKey]][]).map(([key, planData]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedPlan(key)}
                      className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                        selectedPlan === key
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-slate-700 bg-slate-900/50 hover:border-slate-600"
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-slate-50">{planData.name}</p>
                        <p className="text-sm text-slate-400">{planData.description}</p>
                        <p className="mt-1 text-xs text-emerald-400">
                          {planData.casesPerMonth} cases/month per seat
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">From</p>
                        <p className="text-lg font-bold text-emerald-400">
                          ${(planData.basePrice * 0.4).toFixed(0)}
                        </p>
                        <p className="text-xs text-slate-500">/seat/year</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Tier Selection */}
              <div>
                <h2 className="text-lg font-semibold text-slate-50 mb-4">
                  2. Select Your Discount Tier
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {VOLUME_TIERS.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => handleTierClick(tier.id)}
                      className={`relative rounded-xl border p-4 text-left transition ${
                        selectedTier === tier.id
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-slate-700 bg-slate-900/50 hover:border-slate-600"
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2 right-3 rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                          Popular
                        </span>
                      )}
                      {tier.bestValue && (
                        <span className="absolute -top-2 right-3 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                          Best Value
                        </span>
                      )}
                      <p className={`text-2xl font-bold ${
                        tier.discount > 0 ? "text-emerald-400" : "text-slate-300"
                      }`}>
                        {tier.discount > 0 ? `${tier.discount}% OFF` : "Standard"}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">{tier.range}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Seat Count Slider */}
              <div>
                <h2 className="text-lg font-semibold text-slate-50 mb-4">
                  3. How Many Seats?
                </h2>
                <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-bold text-emerald-400">{seatCount}</span>
                    <span className="text-slate-400">seats</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={500}
                    value={seatCount}
                    onChange={(e) => setSeatCount(parseInt(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer bg-slate-700 accent-emerald-500"
                    style={{
                      background: `linear-gradient(to right, rgb(16 185 129) 0%, rgb(16 185 129) ${(seatCount / 500) * 100}%, rgb(51 65 85) ${(seatCount / 500) * 100}%, rgb(51 65 85) 100%)`,
                    }}
                  />
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>1</span>
                    <span className={seatCount >= 10 ? "text-emerald-400 font-semibold" : ""}>10</span>
                    <span className={seatCount >= 25 ? "text-emerald-400 font-semibold" : ""}>25</span>
                    <span className={seatCount >= 50 ? "text-emerald-400 font-semibold" : ""}>50</span>
                    <span>500</span>
                  </div>

                  {/* Tier indicator */}
                  {currentTierData && currentTierData.discount > 0 && (
                    <div className="mt-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-center">
                      <p className="text-sm text-emerald-300">
                        You qualify for <span className="font-bold">{currentTierData.discount}% volume discount!</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Pricing Summary */}
            <div>
              <div className="sticky top-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-xl shadow-emerald-500/5">
                <h2 className="text-xl font-bold text-slate-50 mb-6">
                  Your Enterprise Quote
                </h2>

                {/* Plan Summary */}
                <div className="space-y-4 border-b border-slate-700 pb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Plan</span>
                    <span className="font-semibold text-slate-50">{plan.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Seats</span>
                    <span className="font-semibold text-slate-50">{seatCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Discount Tier</span>
                    <span className={`font-semibold ${
                      currentTierData?.discount ? "text-emerald-400" : "text-slate-50"
                    }`}>
                      {currentTierData?.discount ? `${currentTierData.discount}% OFF` : "Standard"}
                    </span>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                {pricing && (
                  <div className="space-y-4 py-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Base price</span>
                      <span className="text-slate-300 line-through">
                        ${pricing.base_price_per_seat.toFixed(2)}/seat/year
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Your price</span>
                      <span className="font-bold text-emerald-400">
                        ${pricing.price_per_seat_annual.toFixed(2)}/seat/year
                      </span>
                    </div>

                    {pricing.savings_annual > 0 && (
                      <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3">
                        <p className="text-center text-sm text-emerald-300">
                          You save <span className="font-bold">${pricing.savings_annual.toLocaleString()}/year</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Total */}
                {pricing && (
                  <div className="border-t border-slate-700 pt-6">
                    <div className="text-center">
                      <p className="text-sm text-slate-400">Total Annual Cost</p>
                      <p className="mt-1 text-4xl font-bold text-emerald-400">
                        ${pricing.total_annual.toLocaleString()}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        ${pricing.total_monthly_equivalent.toLocaleString()}/month equivalent
                      </p>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="mt-6 w-full rounded-full bg-emerald-500 px-6 py-4 text-lg font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {isLoading ? "Loading..." : "Proceed to Checkout"}
                    </button>

                    <p className="mt-4 text-center text-xs text-slate-500">
                      You can adjust seat count at checkout.
                      <br />
                      Billed annually. Manage seats anytime.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="text-xl font-bold text-slate-50 mb-6 text-center">
              What's Included in Enterprise
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold text-slate-50">Self-Service Portal</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Add or remove seats anytime through Stripe's customer portal
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold text-slate-50">Automatic Proration</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Fair billing when you add seats mid-cycle
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold text-slate-50">Volume Discounts</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Tier automatically adjusts as you grow
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-slate-400">
              Questions about enterprise pricing?{" "}
              <a href="mailto:enterprise@ersimulator.com" className="text-emerald-400 hover:underline">
                Contact our team
              </a>
            </p>
          </div>

          {/* Disclaimers */}
          <div className="mt-10 space-y-2 text-xs text-slate-500">
            <p>
              ER Simulator is an educational simulation tool for licensed clinicians only.
              It does not replace formal medical education, CME, or hospital credentialing.
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
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
