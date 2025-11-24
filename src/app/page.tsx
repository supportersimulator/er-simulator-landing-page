// src/app/page.tsx
import Link from "next/link";
import type { ReactNode } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 gradient-hero">
        {/* Hero */}
        <section className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-4 py-12 md:flex-row md:items-center md:py-20">
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Built by an Emergency Medicine clinician & certified sim facilitator
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-600 bg-slate-900/60 px-3 py-1 text-[10px] font-semibold text-slate-200">
                For licensed clinicians · Educational simulation only
              </span>
            </div>

            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Emergency medicine simulations with{" "}
              <span className="text-emerald-400">AI voice-responsive patients</span>{" "}
              that feel like your own mobile sim lab.
            </h1>

            <p className="max-w-xl text-base text-slate-300 sm:text-lg">
              ER Simulator blends AI, live vitals, and voice-to-voice
              interaction so you can practice high-stakes cases anytime, from
              STEMI to septic shock. It is designed for physicians, PAs, NPs, and
              residents who already have formal medical training and want extra
              reps—similar to Rosh Review, OnlineMedEd, or FOAMed cases.
            </p>
            <p className="max-w-2xl text-xs text-slate-400">
              ER Simulator is for informal educational experiences only and is not a
              substitute for formal medical training or professional advice. By
              participating you agree to stay within your licensed scope, follow local
              hospital protocols, and comply with all applicable laws and governing
              bodies before making patient-care decisions.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400"
              >
                Join clinician waitlist — educational use only
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-100 hover:border-slate-500"
              >
                See how simulations work
              </Link>
            </div>

              <p className="text-xs text-slate-500">
                No credit card required during early access. Not for real patient
                use. Always defer to your supervising team, accrediting bodies
                (AMA, ACEP, NCCPA, ANCC, etc.), and local laws before acting on
                anything you practice here.
              </p>
          </div>

          {/* Simple “monitor” visual */}
          <div className="mt-8 flex flex-1 justify-center md:mt-0">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-black/60">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Sim Monitor</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                  Stable… for now
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-lg bg-slate-950/70 p-3">
                  <p className="text-[10px] uppercase text-slate-500">HR</p>
                  <p className="text-xl font-semibold text-emerald-400">132</p>
                  <p className="text-[10px] text-slate-500">Sinus tach</p>
                </div>
                <div className="rounded-lg bg-slate-950/70 p-3">
                  <p className="text-[10px] uppercase text-slate-500">BP</p>
                  <p className="text-xl font-semibold text-sky-400">82/46</p>
                  <p className="text-[10px] text-slate-500">MAP 58</p>
                </div>
                <div className="rounded-lg bg-slate-950/70 p-3">
                  <p className="text-[10px] uppercase text-slate-500">SpO₂</p>
                  <p className="text-xl font-semibold text-rose-400">88%</p>
                  <p className="text-[10px] text-slate-500">On NRB</p>
                </div>
              </div>
              <div className="mt-4 h-20 rounded-lg bg-slate-950/80">
                {/* Fake waveform bars */}
                <div className="flex h-full items-center gap-1 px-2">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-emerald-500/70"
                      style={{
                        height:
                          20 + Math.sin(i * 0.5) * 12 + (i % 5 === 0 ? 18 : 0),
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-[11px] text-slate-500">
                “Patient is a 54-year-old with chest pain and hypotension… What
                do you want to do first?”
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-t border-slate-800 bg-slate-950/60"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
              Built to sharpen your emergency department thinking.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              ER Simulator is being designed to mirror how you actually think,
              talk, and move in the ED—minus the 3 a.m. pager.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <FeatureCard
                title="Voice-to-voice, mock interactive encounters"
                description="Use natural language to take a brief history, get exam insights, give orders, and formulate your plan. No rigid menus—speak like you would in a real simulation center."
              />
              <FeatureCard
                title="Dynamic vitals & monitor"
                description="Watch the rhythm, pressure, SpO₂, and more respond in real-time to your interventions—or to delays."
              />
              <FeatureCard
                title="Case library you’ll actually remember"
                description="High-yield EM cases built around pattern recognition, cognitive traps, and debriefs so the learning sticks."
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="border-t border-slate-800 bg-slate-950"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
              How ER Simulator will work
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <StepCard
                step="1"
                title="Pick a case & acuity"
                text="Choose from chest pain, dyspnea, trauma, OB, peds, and more. Dial the chaos up or down."
              />
              <StepCard
                step="2"
                title="Talk & practice in real time"
                text="Speak to the simulated patient and nurse, get exam insights, give orders, and shape your plan—fictional practice only, never for real patients."
              />
              <StepCard
                step="3"
                title="Debrief & grow"
                text="See what went well, what was missed, and then reinforce the topic through your formal training, CME, or hospital simulation program."
              />
            </div>
          </div>
        </section>

        {/* Responsible use */}
        <section className="border-t border-slate-900 bg-slate-950/70">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:py-16 md:flex-row">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
                How to use ER Simulator responsibly
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                Think of ER Simulator as a study buddy: it encourages you to review
                clinical frameworks but never replaces formal education, credentialing,
                or CME. You remain solely responsible for your practice decisions.
              </p>
            </div>
            <div className="flex-1 space-y-3 text-sm text-slate-300">
              <Bullet>
                Not medical advice. This platform does not diagnose, treat, or
                prescribe. For authoritative instruction, follow your medical school,
                residency, or recognized associations (AMA, ACOEP, NCCPA, AANP, etc.).
              </Bullet>
              <Bullet>
                Stay within scope. Only licensed clinicians may use ER Simulator.
                You must adhere to your licensure requirements, supervising physicians,
                and institutional protocols at all times.
              </Bullet>
              <Bullet>
                Follow local law & policy. We provide no legal counsel. Consult your
                hospital, EMS agency, or legal advisors for documentation, billing,
                or regulatory questions.
              </Bullet>
              <Bullet>
                Fictional scenarios only. Never use ER Simulator to manage real patients.
                Translate lessons into practice only through approved pathways such as
                residency conferences, CME, or hospital simulations.
              </Bullet>
            </div>
          </div>
        </section>

        {/* Attribution */}
        <section className="border-t border-slate-900 bg-slate-950/40">
          <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
            <h2 className="text-xl font-semibold text-slate-50">Attribution & licensing</h2>
            <p className="mt-3 text-sm text-slate-400">
              Some scenario seeds draw from Creative Commons emergency medicine training
              resources (CC BY-SA 4.0). We always credit original authors and share
              adaptations under the same license. Original ER Simulator content ©{" "}
              {new Date().getFullYear()} Tjomsland LLC dba ER Simulator.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Full attribution details:{" "}
              <Link
                href="/attribution"
                className="text-emerald-300 underline-offset-2 hover:underline"
              >
                ersimulator.com/attribution
              </Link>
            </p>
          </div>
        </section>

        {/* Who it’s for */}
        <section
          id="who-its-for"
          className="border-t border-slate-800 bg-slate-950/80"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
              Designed for busy EM clinicians.
            </h2>
            <div className="mt-6 grid gap-4 text-sm text-slate-300 md:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                <h3 className="font-semibold text-slate-100">
                  PAs & NPs in the ED
                </h3>
                <p className="mt-2 text-slate-400">
                  Stay sharp between shifts, prep for new roles, or keep your
                  pattern recognition tuned for rare but critical cases.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                <h3 className="font-semibold text-slate-100">
                  Residents & students
                </h3>
                <p className="mt-2 text-slate-400">
                  Get more safe reps in high-stakes scenarios before they show
                  up in your department at 2 a.m.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                <h3 className="font-semibold text-slate-100">
                  Simulation programs
                </h3>
                <p className="mt-2 text-slate-400">
                  Extend your sim lab with remote, AI-assisted cases that
                  integrate vitals, voice, and debrief.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-xl text-xs text-slate-500">
                ER Simulator is currently in development. By joining the early
                access list, you’ll help shape the first release and get
                updates when we’re ready for pilot users.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Join early access
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimers */}
        <section className="border-t border-slate-900 bg-slate-950/50">
          <div className="mx-auto max-w-4xl px-4 py-12 text-sm text-slate-300">
            <h2 className="text-lg font-semibold text-slate-50">Disclaimers</h2>
            <p className="mt-4">
              By using ER Simulator, you agree not to interpret any content as medical
              advice for treating yourself or others, including but not limited to patients
              under your care. Always consult your own physician, supervising team, or
              governing medical association for personal or patient-specific guidance. This
              disclaimer applies to all contributors and guests. Under no circumstances
              shall Tjomsland LLC dba ER Simulator or its contributors be responsible for
              damages arising from use of the platform.
            </p>
            <p className="mt-4 text-slate-400">
              Furthermore, ER Simulator must not be used in any legal capacity whatsoever,
              including but not limited to establishing “standard of care,” supporting
              expert testimony, or serving as documentation for clinical decisions. No
              guarantee is provided regarding the accuracy or completeness of statements
              made within the simulation. Always perform independent verification through
              formal education, CME, and local hospital protocols.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
      <p>{children}</p>
    </div>
  );
}
function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
      <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-semibold text-emerald-300">
        {step}
      </div>
      <h3 className="mt-3 text-sm font-semibold text-slate-50">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{text}</p>
    </div>
  );
}