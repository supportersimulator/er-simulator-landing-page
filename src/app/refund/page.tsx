import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

export default function RefundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-12 md:py-16 text-sm text-slate-200">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
            Refund Policy
          </h1>
          <p className="mt-3 text-xs text-slate-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <p className="mt-6 text-sm text-slate-300">
            ER Simulator is provided by{" "}
            <strong>Tjomsland LLC dba ER Simulator</strong>. We want you to have
            a fair and transparent experience. This policy describes how refunds
            are handled for purchases of ER Simulator.
          </p>

          <h2 className="mt-6 text-base font-semibold text-slate-50">
            1. Subscription cancellations
          </h2>
          <p className="mt-2">
            You may cancel your subscription at any time. When you cancel, you
            will retain access to the Service until the end of your current
            billing period. Future renewals will not be charged.
          </p>

          <h2 className="mt-4 text-base font-semibold text-slate-50">
            2. Refunds
          </h2>
          <p className="mt-2">
            Because ER Simulator is a digital subscription service, refunds are
            generally not provided for partial billing periods or unused time.
            However, we understand that situations happen. If you believe
            you&apos;ve been charged in error or have not been able to use the
            Service due to a technical issue, please contact us within 14 days
            of the charge and we will review your request.
          </p>

          <h2 className="mt-4 text-base font-semibold text-slate-50">
            3. Where refunds are processed
          </h2>
          <p className="mt-2">
            If you purchased through Paddle or another payment provider,
            applicable refund rules of that provider or app store may also
            apply. In some cases, refunds must be handled directly through the
            app store.
          </p>

          <h2 className="mt-4 text-base font-semibold text-slate-50">
            4. How to request a refund review
          </h2>
          <p className="mt-2">
            To request a refund review, email us at{" "}
            <a
              href="mailto:support@ersimulator.com"
              className="text-emerald-400 hover:underline"
            >
              support@ersimulator.com
            </a>{" "}
            with:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>The email address associated with your account</li>
            <li>The date and amount of the charge</li>
            <li>
              A brief explanation of the issue (for example: technical problem,
              duplicate charge, or mistaken purchase)
            </li>
          </ul>

          <p className="mt-4">
            We aim to respond to refund review requests within 7 business days.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}