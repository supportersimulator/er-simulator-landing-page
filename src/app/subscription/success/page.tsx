"use client";

import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SubscriptionSuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get("session_id"));

    // Clear any stored affiliate code after successful purchase
    localStorage.removeItem("affiliate_code");
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-2xl px-4 py-16 md:py-24">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <svg className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">
              Welcome to ER Simulator!
            </h1>

            <p className="mx-auto mt-4 max-w-md text-lg text-slate-400">
              Your subscription is now active. You're ready to start practicing emergency medicine scenarios.
            </p>

            {/* What's Next */}
            <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-900/50 p-6 text-left">
              <h2 className="text-lg font-semibold text-slate-50 mb-4">What's Next?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-slate-50">Download the App</p>
                    <p className="text-sm text-slate-400">Get ER Simulator on iOS or Android to start training.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-slate-50">Check Your Email</p>
                    <p className="text-sm text-slate-400">We've sent your receipt and account details.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-slate-50">Start Your First Simulation</p>
                    <p className="text-sm text-slate-400">Jump into an emergency scenario and test your skills!</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* App Download Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-50 hover:bg-slate-700 transition"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-50 hover:bg-slate-700 transition"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Google Play
              </a>
            </div>

            {/* Support Link */}
            <p className="mt-8 text-sm text-slate-500">
              Questions? Contact{" "}
              <a href="mailto:support@ersimulator.com" className="text-emerald-400 hover:underline">
                support@ersimulator.com
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
