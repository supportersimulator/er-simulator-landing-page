"use client";

import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ersimulator.com";

export default function AffiliatePage() {
  const [affiliateCode, setAffiliateCode] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean;
    discount_type?: string;
    message?: string;
  } | null>(null);

  // Check for affiliate code in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || params.get("via") || params.get("code");
    if (ref) {
      setAffiliateCode(ref);
      verifyCode(ref);
    }
  }, []);

  const verifyCode = async (code: string) => {
    setIsVerifying(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/payments/affiliate/verify/?code=${encodeURIComponent(code)}`);
      if (res.ok) {
        const data = await res.json();
        setVerificationResult(data);
        // Store valid code in localStorage
        if (data.valid) {
          localStorage.setItem("affiliate_code", code);
        }
      } else {
        setVerificationResult({ valid: false, message: "Invalid or expired code" });
      }
    } catch (error) {
      setVerificationResult({ valid: false, message: "Could not verify code" });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get("code") as string;
    if (code) {
      setAffiliateCode(code);
      verifyCode(code);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-10 md:py-16">
          {/* Header */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Special Offer
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-5xl">
              You've Been Referred!
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Get exclusive benefits when you sign up through an affiliate partner.
            </p>
          </div>

          {/* Affiliate Benefits */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-slate-900/50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-50">6 Months Free</h3>
              <p className="mt-2 text-sm text-slate-400">
                Get 50% off your first year of any annual subscription. That's like getting 6 months completely free!
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 border border-slate-700">
                <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-50">15% Off Forever</h3>
              <p className="mt-2 text-sm text-slate-400">
                After your first year, enjoy 15% off all annual renewals for as long as you remain a subscriber.
              </p>
            </div>
          </div>

          {/* Code Verification */}
          <div className="mt-12 rounded-2xl border border-slate-700 bg-slate-900/50 p-8">
            {affiliateCode && verificationResult?.valid ? (
              // Valid code - show success
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-50">Code Verified!</h3>
                <p className="mt-2 text-slate-400">
                  Your affiliate discount will be automatically applied at checkout.
                </p>
                <div className="mt-4 inline-block rounded-full bg-emerald-500/10 border border-emerald-500/30 px-4 py-2">
                  <span className="text-sm font-mono text-emerald-300">{affiliateCode}</span>
                </div>
                <div className="mt-8">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-lg font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition"
                  >
                    Choose Your Plan
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ) : affiliateCode && verificationResult && !verificationResult.valid ? (
              // Invalid code
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 border border-red-500/30">
                  <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-50">Invalid Code</h3>
                <p className="mt-2 text-slate-400">
                  {verificationResult.message || "This code is not valid or has expired."}
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  Please check your referral link or contact the person who referred you.
                </p>
                <div className="mt-6">
                  <Link
                    href="/pricing"
                    className="text-emerald-400 hover:underline"
                  >
                    Continue without discount
                  </Link>
                </div>
              </div>
            ) : isVerifying ? (
              // Loading
              <div className="text-center py-8">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
                <p className="mt-4 text-slate-400">Verifying your code...</p>
              </div>
            ) : (
              // No code - show form
              <div>
                <h3 className="text-lg font-semibold text-slate-50 text-center">
                  Have a referral code?
                </h3>
                <p className="mt-2 text-sm text-slate-400 text-center">
                  Enter your code below to unlock your exclusive discount.
                </p>
                <form onSubmit={handleCodeSubmit} className="mt-6 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="text"
                    name="code"
                    placeholder="Enter referral code"
                    className="flex-1 rounded-full border border-slate-600 bg-slate-800 px-6 py-3 text-slate-50 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-400 transition"
                  >
                    Apply Code
                  </button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-500">
                  Don't have a code?{" "}
                  <Link href="/pricing" className="text-emerald-400 hover:underline">
                    View regular pricing
                  </Link>
                </p>
              </div>
            )}
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-slate-50 text-center mb-8">
              How Affiliate Discounts Work
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold">
                  1
                </div>
                <h3 className="mt-4 font-semibold text-slate-50">Click Your Link</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Use the referral link your friend or partner shared with you.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold">
                  2
                </div>
                <h3 className="mt-4 font-semibold text-slate-50">Choose a Plan</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Select any annual subscription plan that fits your needs.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold">
                  3
                </div>
                <h3 className="mt-4 font-semibold text-slate-50">Save Automatically</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Your discount is applied automatically at checkout.
                </p>
              </div>
            </div>
          </div>

          {/* Become an Affiliate CTA */}
          <div className="mt-16 rounded-2xl border border-slate-700 bg-slate-900/50 p-8 text-center">
            <h3 className="text-xl font-bold text-slate-50">
              Want to Become an Affiliate?
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-slate-400">
              Earn commissions by referring medical professionals to ER Simulator.
              Join our affiliate program and help others improve their emergency medicine skills.
            </p>
            <a
              href="mailto:affiliates@ersimulator.com"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/50 px-6 py-3 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/10 transition"
            >
              Apply to Join
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
