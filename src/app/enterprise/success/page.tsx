"use client";

import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EnterpriseSuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get("session_id"));
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

            <span className="mt-4 inline-block rounded-full bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Enterprise
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">
              Your Team is Ready!
            </h1>

            <p className="mx-auto mt-4 max-w-md text-lg text-slate-400">
              Your enterprise subscription is now active. Let's get your team set up and training.
            </p>

            {/* What's Next */}
            <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-900/50 p-6 text-left">
              <h2 className="text-lg font-semibold text-slate-50 mb-4">Getting Started</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-slate-50">Check Your Email</p>
                    <p className="text-sm text-slate-400">
                      We've sent your receipt and admin portal access instructions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-slate-50">Invite Your Team</p>
                    <p className="text-sm text-slate-400">
                      Use the admin dashboard to invite team members and assign seats.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-slate-50">Download the App</p>
                    <p className="text-sm text-slate-400">
                      Team members can download ER Simulator on iOS or Android.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Manage Subscription */}
            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="font-semibold text-slate-50">Manage Your Subscription</h3>
              <p className="mt-2 text-sm text-slate-400">
                Add or remove seats, update payment methods, and view invoices in the Stripe customer portal.
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/50 px-6 py-2.5 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/10 transition"
              >
                Open Customer Portal
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Support */}
            <div className="mt-8 text-sm text-slate-500">
              <p>
                Need help with enterprise setup?{" "}
                <a href="mailto:enterprise@ersimulator.com" className="text-emerald-400 hover:underline">
                  Contact our enterprise team
                </a>
              </p>
              <p className="mt-2">
                Technical support:{" "}
                <a href="mailto:support@ersimulator.com" className="text-emerald-400 hover:underline">
                  support@ersimulator.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
